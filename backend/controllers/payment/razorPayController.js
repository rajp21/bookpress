import Order from "../../models/order";
import razorPayInstance from "../../services/PaymentService/payment";


const razorPayController = { 
    async createOrder(req, res, next){ 
        

        // get order id only
        const {orderId} = req.body; 

        // get order details 
        let order; 
        try { 
            order = await Order.findOne({_id: orderId}); 

            if(!order){ 
                return res.status(422).json({
                    success: false, 
                    message: "Invalid Order"
                })
            }

            if(order.status != "ORDER_INITIATED"){ 
                return res.status(422).json({
                    success: false, 
                    message: "Order Already Paid"
                })
            }
        }catch(e){ 
            return next(e); 
        }

        

        // create razor pay order
        const options ={ 
            amount: order.payment.amount * 100, 
            currency: "INR", 
            receipt: order._id
        }


        razorPayInstance.orders.create(options, (er, orderData) => { 
            if(er) { 
                return next(er); 
            }

            return res.status(200).json({
                success: true, 
                data: orderData
            })
        }); 
        

    }
}

export default razorPayController; 