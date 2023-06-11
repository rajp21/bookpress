import Joi from 'joi'; 

const registerSchema = Joi.object({
    name: Joi.string().min(3).max(1000).required().messages({
        'base' : 'Name Should be string', 
        'min' : 'Name should at least have 3 characters', 
        'required': 'Name is required'
    }), 

    email: Joi.string().email().required(), 
    phoneNo: Joi.string().required(), 
    password: Joi.string().required(), 
    confirmPassword: Joi.ref('password')
    
}); 


export default registerSchema; 