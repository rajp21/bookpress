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

            if(!state.items[book._id]){ 
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
        }
    }
})



export const {addToCart}  = cartSlice.actions; 
export default cartSlice.reducer; 