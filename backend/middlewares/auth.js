import JwtService from "../services/JwtServices";

const auth = async (req,res,next)  => { 
    const {accessToken} = req.cookies; 

    console.log(accessToken); 
    try { 
        let data = await JwtService.verify(accessToken); 
        req.user = data; 
        next(); 
    }catch(e) { 
        return res.status(401).json({message: 'unauthorized Request'}); 
    }
}

export default auth; 