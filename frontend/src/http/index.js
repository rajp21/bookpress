import { original } from '@reduxjs/toolkit';
import axios from 'axios'; 

let api = axios.create({ 
    baseURL: "http://localhost:5000/api",
    withCredentials: true, 
    headers: { 
        'Content-Type': 'application/json', 
        Accept: 'application/json'
    }
}); 


export const saveUser = (data) => api.post('/register', data); 
export const loginUser = (data) => api.post('/login', data); 
export const logout = () => api.post('/logout'); 
export const loadAllProducts = (page) =>  api.get(`/products/all/${page}`);  
export const getSingleProduct = (productId) =>  api.get(`/products/get/${productId}`);  
export const createOrder = (data) =>  api.post(`/order/create-order`, data);  
export const fetchUserAddresses = () => api.get('/user/get-addresses');
export const addNewAddress = (data) => api.post(`user/add-addrses`, data); 

//  razor pay
export const createRazorPayOrder = data =>  api.post('/payment/r-pay/create-order', data);


api.interceptors.response.use(
    (config) => {
        return config; 
    }, 

    async (error) => { 
        const originalRequest = error.config; 

        if(
            error.response.status === 401 && originalRequest && !originalRequest._isRetry
        ){ 
            originalRequest._isRetry = true; 
            try{ 
                //refresh the token 
                await axios.get("http://localhost:5000/api/refresh", { 
                    withCredentials:  true
                }); 

                // return original Request
                return api.request(originalRequest); 
            }catch(err) { 

            }
        }

        throw error; 
    }

)