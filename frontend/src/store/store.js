import {configureStore} from '@reduxjs/toolkit'; 
import userSlice from './userSlice'; 
import cartSlice from './cartSlice';
import storage from 'redux-persist/lib/storage'; 
import { combineReducers } from '@reduxjs/toolkit';
import {    
    persistReducer, FLUSH,  REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER
}  from 'redux-persist'; 

// store 

const persistConfig = { 
    key: 'user', 
    storage
}


const rootReducer = combineReducers({ 
    user: userSlice, 
    cart: cartSlice
}); 

let persistedReducer =  persistReducer(persistConfig, rootReducer); 


const store = configureStore({ 
        reducer: persistedReducer,

        middleware: (getDefaultMiddleware) => getDefaultMiddleware({ 
            serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },    
    })
}); 


export default store; 