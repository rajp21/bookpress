import express from 'express'; 
import { loginController, registerController } from '../../controllers';
import auth from '../../middlewares/auth';


const router = express.Router(); 

router.post('/register', registerController.registerUser); 
router.post('/login', loginController.login); 
router.post('/logout', auth , loginController.logout); 
router.get('/refresh', loginController.refresh); 

export default router; 