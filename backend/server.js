import express from 'express'; 
import { APP_PORT, DATABASE_URL, FRONT_END_URL } from './config';
import router from './routes/api';
import path from 'path'; 
import errorHandler from './middlewares/errorHandler';
import mongoose from 'mongoose'; 
import cors from 'cors'; 
import cookieParser from 'cookie-parser'; 


const app = express(); 
app.use(express.urlencoded({extended: true}));  
app.use(express.json()); 
app.use(express.static(path.join(__dirname, '/public')));

app.use(cookieParser()); 

const corsOptions = { 

    credentials: true, 
    origin: [FRONT_END_URL]
}
app.use(cors(corsOptions)); 


// database connection
mongoose.connect(DATABASE_URL).then((res) => {
    console.log('connected'); 
}).catch((e)=> {
    console.log('not connected'); 
}); 


app.use('/api', router); 

const PORT = APP_PORT ? APP_PORT: 3001; 

app.use(errorHandler); 

app.listen(PORT, () => { 
    console.log(`The server has been ${PORT}`); 
});