import express from 'express'; 
import { loginController, productController, registerController, orderController } from '../../controllers';
import auth from '../../middlewares/auth';



const router = express.Router(); 

router.post('/register', registerController.registerUser); 
router.post('/login', loginController.login); 
router.post('/logout', auth , loginController.logout); 
router.get('/refresh', loginController.refresh); 

//   products 

router.get('/products/all/:page', productController.allProducts); 
router.get('/products/get/:productId', productController.getProduct); 

// orders 

router.post('/order/create-order', auth, orderController.initiateOrder); 

export default router; 