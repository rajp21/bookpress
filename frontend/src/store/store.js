import {configureStore} from '@reduxjs/toolkit'; 
import userSlice from './userSlice'; 
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

let persistedReducer =  persistReducer(persistConfig, userSlice); 


const store = configureStore({ 
        reducer: {
            user: persistedReducer, 
        },  

        middleware: (getDefaultMiddleware) => getDefaultMiddleware({ 
            serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },    
    })
}); 


export default store; 