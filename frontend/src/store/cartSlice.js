import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    items: { 

    }, 
    totalQty: 0, 
    totalPrice: 0
}; 

const cartSlice = createSlice({
    name: "cart", 
    initialState: initialState,     
    reducers: {
        addToCart(state, action){
            const {book, quantity} = action.payload; 

            if( state.items && !state.items[book._id]){ 
                state.items[book._id] = {
                    item: book, 
                    qty: quantity
                }
    
                state.totalQty = state.totalQty + quantity; 
                state.totalPrice = state.totalQty* book.price; 

            }else { 
                state.items[book._id].qty = state.items[book._id].qty + quantity; 
                state.totalQty = state.totalQty + quantity; 
                state.totalPrice  = state.totalPrice + quantity* book.price; 
            }
            
            
            return state; 
        }, 



        deleteFromCart(state, action){ 
            let itemToDelete = state.items[action.payload]; 
         
            let totalDeleteItemPrice = state.items[action.payload].item.price; 
            let totalQtyOfItem = state.items[action.payload].qty; 


            delete state.items[action.payload]; 
            state.totalPrice = state.totalPrice - totalDeleteItemPrice; 
            state.totalQty = state.totalQty - totalQtyOfItem; 

            return state; 

        }
    }
})



export const {addToCart,deleteFromCart }  = cartSlice.actions; 
export default cartSlice.reducer; 