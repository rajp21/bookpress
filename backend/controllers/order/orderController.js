import Order from "../../models/order";

const orderController = { 
    initiateOrder(req, res, next) { 
             
        let customerId = "64c501a3e9c6566b9cacbe0a"; 
        customerId = req.user?req.user._id: null; 

        // validation
        const {cart, payment} = req.body; 

       
        // ------------------ This is hard coded address please correct it later while creating address functonality--------------------------------------------------------------------------------
        let address = "Plot 28, Marol Cooperative Industrial Estate Rd, Gamdevi, Marol, Andheri East, Mumbai, Maharashtra 400059"; 


        // validate cart

        // if not cart
        if(!cart){ 
            return res.status(500).json({
                sucess: false, 
                message: "Cart is required"
            })
        }

        // if cart is empty
        if(cart.totalQty <= 0 ){ 
            return res.status(500).json({
                sucess: false, 
                message: "Cart is Empty"
            })
        }


        // payment
        if(!payment){ 
            return res.status(500).json({
                sucess: false, 
                message: "payment is required"
            })
        }




        let order = new Order({
            status: "ORDER_INITIATED", 
            customerId, 
            cart, 
            payment, 
            address
        });



        let result = order.save().then((response) => { 
            return res.status(200).json({
                success: true, 
                data: order
            })
        }).catch((e) => { 
            
            return next(e); 
        })
    }
}

export default orderController; 