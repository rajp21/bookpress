import mongoose from 'mongoose'; 

const userSchema = new mongoose.Schema({
    name: { 
        type: String, required: true
    }, 

    email: { 
        type: String, 
        required: true,
    }, 

    phoneNo: { 
        type: String, required: true, 
    }, 

    password: { 
        type: String, 
        required: true, 
    }, 

    addresses: { 
        type: Array
    }, 

    profilePhoto: { 
        type: String, 
    }, 

    isDeleted: {
        type: Boolean, 
        default: false
    }

}, {timestamps: true}); 


export default mongoose.model('User', userSchema); 