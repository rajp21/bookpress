import User from "../../models/user";
import {registerSchema} from "../../validators";
import bcrypt from 'bcrypt'; 
import CustomErrorHandler from "../../services/CustomErrorHandler";
import JwtService from "../../services/JwtServices";
import { REFRESH_SECRET } from "../../config";
import Refresh from "../../models/refresh";



const registerController =  { 
    async registerUser(req, res, next){ 
        // validate the request
        const {error} = registerSchema.validate(req.body); 

        if(error){
            console.log(error); 
            return next(error); 
        }

        const {name, email, phoneNo, password} = req.body; 

        // check weather user is already registered or not
        try {
            const user = await User.findOne({$or: [{email: email}, {phoneNo: phoneNo}]});

            if(user && user.email === email){
                return next(CustomErrorHandler.emailAlreadyExists("Email address is already registered")); 
            }

            if(user && user.phoneNo === phoneNo){
                return next(CustomErrorHandler.phoneNoAlreadyExists("Phone Number is already Registered")); 
            }

        }catch(e){
            console.log(e); 
            return next(e); 
        }

        // hash the password
        let hashedPassword;
        try{ 
            hashedPassword = await bcrypt.hash(password, 10); 
        }catch(e) {
            return next(e); 
        }
       
        // store user 
        let user = new User({
            name, email, phoneNo, password: hashedPassword
        }); 


        let refreshToken, accessToken; 
        let result; 
        try{ 
            result = await user.save(); 
            accessToken = JwtService.sign({_id: result._id}, '1m'); 
            refreshToken = JwtService.sign({_id: result._id},'1y', REFRESH_SECRET ); 
        }catch(e){
            return next(e); 
        }
        
        try { 
            Refresh.create({
                userId: result._id, 
                token: refreshToken
            }); 
        }catch(e){ 
            return next(e); 
        }

        res.cookie('accessToken', accessToken, { 
            httpOnly: true, 
            maxAge: 60 * 60 * 24 * 30 * 10000
        });         
        res.cookie('refreshToken', refreshToken, { 
            httpOnly: true, 
            maxAge: 60 * 60 * 24 * 30 * 10000
        });         


        return res.status(200).json(user); 
    }   
}

export default registerController; 