import jwt from 'jsonwebtoken'; 
import { ACCESS_SECRET } from '../config';

class JwtService  { 
    static sign(payload, expiry, secret=ACCESS_SECRET){
        return jwt.sign(payload, secret, {
            expiresIn: expiry
        } ); 
    }


    static async verify(token, secret=ACCESS_SECRET){
        return jwt.verify(token, secret); 
    }
}

export default JwtService; 