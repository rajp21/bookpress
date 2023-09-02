import User from "../../models/user";
import { addressSchema } from "../../validators";


const userController = { 
    async getAllAddresses(req,res,next){ 
        let {_id} = req.user; 
        try{    
            const user = await User.findOne({_id: _id}); 
            console.log(user.addresses); 
            return res.status(200).json({success: true, addresses: user.addresses}); 
        }catch(e){ 
            return next(e); 
        }
    }, 


    async addAddress(req, res, next){ 
        const {_id} = req.user; 

        // validate the request
        const {error}  = addressSchema.validate(req.body); 
        if(error){ 
            const errorMessages = {};
            error.details.forEach((detail) => {
                errorMessages[detail.context.key] = detail.message;
            });

            return res.status(422).json({
                success: false, 
                errorMessages                
            })
        }
        //  get values from request
        const {recidence, landmark, city, state, pincode} = req.body; 
        
        // check if user is valid or not
        try{ 
            const user = await User.findOne({_id: _id}); 
            if(user && user.isDeleted){ 
                return res.status(401).json({
                    success: false, 
                    message: "Your Account has been blocked by admin"
                })
            }

        }catch(e){ 
            return next(e); 
        }


        //  adding addresss

        let finalAddressString = `${recidence}, ${landmark}, ${city}, ${state}, ${pincode}`; 
        const addressObj = { 
            recidence, 
            landmark, 
            city, 
            state, 
            pincode, 
            addressString: finalAddressString
        }

        
        try{ 
            const result = await User.findOne({_id: _id}, {
                $push: {addresses: addressObj}
            }); 
                

            if(result && result.modifiedCount == 1){ 
                return res.status(200).json({success: true, data: result}); 
            }

            return res.status(500).json({success: false, message: "Something went wrong"}); ``

        }catch(e){ 
            return next(e); 
        }





    }
}

export default userController; 