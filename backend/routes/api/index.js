import express from 'express'; 
import { loginController, productController, registerController } from '../../controllers';
import auth from '../../middlewares/auth';



const router = express.Router(); 

router.post('/register', registerController.registerUser); 
router.post('/login', loginController.login); 
router.post('/logout', auth , loginController.logout); 
router.get('/refresh', loginController.refresh); 

//   products 

router.get('/products/all', productController.allProducts); 

export default router; 