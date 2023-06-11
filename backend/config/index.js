import dotenv from 'dotenv'; 
dotenv.config(); 



export const { 
        APP_PORT, 
        DEBUG_MODE ,
        DATABASE_URL, 
        ACCESS_SECRET, 
        REFRESH_SECRET, 
        FRONT_END_URL
} = process.env; 