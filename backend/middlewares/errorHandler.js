import { DEBUG_MODE } from "../config";
import { ValidationError } from "joi";
import CustomErrorHandler from "../services/CustomErrorHandler";

const errorHandler = (err, req, res, next) => { 
    let statusCode = 500; 
    let data =  { 
        message: 'Something went Wrong', 
        ...(DEBUG_MODE === "true" && {originalError: err.message})
    }

    if(err instanceof ValidationError) { 
        statusCode = 422; 
    }

    if(err instanceof CustomErrorHandler){ 
        statusCode = err.status;
        
    }

    return res.status(statusCode).json(data); 
}


export default errorHandler; 