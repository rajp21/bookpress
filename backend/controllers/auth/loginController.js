import { ACCESS_SECRET, REFRESH_SECRET } from "../../config";
import Refresh from "../../models/refresh";
import User from "../../models/user";
import CustomErrorHandler from "../../services/CustomErrorHandler";
import JwtService from "../../services/JwtServices";
import {loginSchema} from "../../validators";
import bcrypt from 'bcrypt'; 


const loginController = { 
    async login(req, res, next){

        
        // validate the request
        let {error}  = loginSchema.validate(req.body); 

        
        if(error){
            return next(error); 
        }

        const { email, password}  = req.body; 
        let user; 
        try { 

            user =  await User.findOne({email: email});
            
            if(!user){ 
                return next(CustomErrorHandler.userNotFound("Email not registered")); 
            }
        }catch(e){
            return next(e); 
        }   

        let match = await bcrypt.compare(password, user.password); 
        console.log(user); 

        if(!match){ 
            return next(CustomErrorHandler.passwordNotMatched("Password Didn't matched")); 
        }


        // generate the tokens
        let accessToken = JwtService.sign({_id: user._id}, "1m"); 
        let refreshToken = JwtService.sign({_id: user._id}, "1y", REFRESH_SECRET); 
        

        // if not deleted return token for user to login
        try { 
            Refresh.create({
                userId: user._id, 
                token: refreshToken
            })            
        }catch(e){ 
            return next(e); 
        }

        res.cookie('accessToken', accessToken, { 
            maxAge: 60 * 60 * 24 * 30 * 1000, 
            httpOnly: true
        }); 
        res.cookie('refreshToken', refreshToken, {
            maxAge: 60 * 60 * 24 * 30 * 1000, 
            httpOnly: true
        }); 

        return res.status(200).json(user); 
    }, 

    async logout(req, res, next) { 
        const {_id} = req.user; 
        
        try{
            await Refresh.deleteOne({_id: _id}); 
        }catch(e){ 
           return next(e); 
        }

        return res.status(200).json({message:  "logged Out successfully"}); 
        
    }, 

    async refresh(req, res, next) { 
        const {refreshToken} = req.cookies; 
         
        // check if token is valid or not
        let userData; 
        try { 
           userData = await JwtService.verify(refreshToken, REFRESH_SECRET); 
        }catch(e) {
            console.log('from jwt verify');  
            return next(CustomErrorHandler.invalidToken("Invalid Token")); 
        }

        // check if token is in db or not
        try {
           let valid = await Refresh.findOne({userId: userData._id, token: refreshToken}); 
           if(!valid) { 
            console.log('while checking in db');  

             return next(CustomErrorHandler.invalidToken("Inalid Token")); 
           }
        }catch(e) {
            return next(e); 
         }


         // check if user is valid or not
        let user; 
         try{  
             user = await User.findOne({_id: userData._id}); 

            if(!user) { 
                return next(CustomErrorHandler.invalidUser("Invalid User")); 
            }
         }catch(e) { 
            return next(e);  
         }


         // generate new tokens 
       
         let accessToken = JwtService.sign({_id: user._id}, "1m"); 
         let newRefreshToken = JwtService.sign({_id: user._id}, "1y", REFRESH_SECRET); 

         // update the refresh Toekn in db
         try {
            await Refresh.updateOne({_id: userData._id}, {token: newRefreshToken}); 
         }catch(e){ 
            return next(e); 
         }
       
         // put in cookie
         res.cookie('refreshToken', newRefreshToken, {
            maxAge: 1000 * 60 * 60 * 24 * 30,
            httpOnly: true,
        });

        res.cookie('accessToken', accessToken, {
            maxAge: 1000 * 60 * 60 * 24 * 30,
            httpOnly: true,
        });


        return res.status(200).json(user); 


    }
}


export default loginController;