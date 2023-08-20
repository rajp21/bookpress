import dotenv from 'dotenv'; 
dotenv.config(); 



export const { 
        DEBUG_MODE,
        APP_PORT, 
        DATABASE_URL, 
        ACCESS_SECRET, 
        REFRESH_SECRET, 
        FRONT_END_URL, 
        RAZOR_PAY_API_KEY, 
        RAZOR_PAY_KEY_SECRET
} = process.env; 



