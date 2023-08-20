import RazorPay from 'razorpay'; 
import { RAZOR_PAY_API_KEY, RAZOR_PAY_KEY_SECRET } from '../../config';


let razorPayInstance =  new RazorPay({
    key_id:  RAZOR_PAY_API_KEY, 
    key_secret: RAZOR_PAY_KEY_SECRET, 
})


export default razorPayInstance; 