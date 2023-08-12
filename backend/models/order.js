import mongoose from 'mongoose'; 


const paymentSchema = new mongoose.Schema({
    amount: {
      type: Number,
      required: true
    },
    payment_mode: {
      type: String,
      enum: ['online', 'debit_card', 'paypal', 'bank_transfer', 'cash'],
      required: true
    },
    payment_gateway: {
      type: String,
      required: true
    }
  })

const orderSchema = new mongoose.Schema({
    status: { 
        type: String,
        enum: ['ORDER_INITIATED', 'ORDER_PLACED', 'ORDER_CANCELLED', 'ORDER_DELIVERED', 'RETURNED'],
        required: true
    }, 
    customerId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true
    },

    cart: {
        type: Object, 
        required: true
    }, 

    payment: paymentSchema, 

    address: { 
        type: String, 
        required: true
    }
});


export default mongoose.model('Order', orderSchema);