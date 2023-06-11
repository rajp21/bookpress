import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    isLoggedIn: false, 
    user: { }
}

const userSlice = createSlice({
    name: "user", 
    initialState: initialState,     
    reducers: {
        setUser(state, action){
            state = { 
                isLoggedIn: true, 
                user: {...action.payload}
            }

            return state; 
        }, 

        clearUser (state, action) { 
            return {
                isLoggedIn: false, 
                user: {}
            }
        }
    }
})



export const {setUser, clearUser}  = userSlice.actions; 
export default userSlice.reducer; 