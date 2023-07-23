// import { createSlice } from "@reduxjs/toolkit";

// const cartSlice = createSlice({
//     name: 'cart', 
//     initialState: [{name:"Raj", sirname: "Pawar"}], 
//     reducers: {
//         addToCart(state, action){
//             return [...state, action.payload]; 
//         }
//     }
// }); 


// export const {addToCart} = cartSlice.actions; 
// export default cartSlice;


import { createSlice } from "@reduxjs/toolkit";


const initialState = []; 

const cartSlice = createSlice({
    name: "cart", 
    initialState: initialState,     
    reducers: {
        addToCart(state, action){
            state = [...state, action.payload]

            return state; 
        }
    }
})



export const {addToCart}  = cartSlice.actions; 
export default cartSlice.reducer; 