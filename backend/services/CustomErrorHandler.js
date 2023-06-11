

class CustomErrorHandler extends Error { 
    constructor(status, msg){ 
        super(); 
        this.status = status;
        this.message = msg; 
    }


    // already exists user 
    static emailAlreadyExists(message) { 
        return new CustomErrorHandler(422, message);
    }

    // phoneNo already exists 
    static phoneNoAlreadyExists (message) { 
        return new CustomErrorHandler(422, message); 
    }

    // user not found 
    static userNotFound(message){ 
        return new CustomErrorHandler(422, message); 
    }

    // password didn't matched 
    static passwordNotMatched(message){ 
        return new CustomErrorHandler(422, message); 
    }

    // invalid token 

    static invalidToken(message) { 
       return new CustomErrorHandler(401, message); 
    }

    // invalid user
    static invalidUser(message){ 
        return new CustomErrorHandler(401, message); 
    }


}



export default CustomErrorHandler; 