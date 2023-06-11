import mongoose  from "mongoose";


const refreshSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true
    }, 


    token: { 
        type: String, 
        required: true
    }, 

})

export default new mongoose.model('Refreshe', refreshSchema)