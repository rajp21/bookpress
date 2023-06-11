import { Link, useNavigate } from 'react-router-dom';
import './login.css'; 
import {useEffect, useState } from 'react';
import { loginUser } from '../../http';
import { setUser } from '../../store/userSlice';
import { useDispatch } from 'react-redux';


const Login  = ()  => { 
    
    const dispatch = useDispatch(); 
    // 
    const [loginData, setLoginData] = useState({ 
        email: "", 
        password: ""
    }); 

    const navigate = useNavigate(); 

    const {email, password} = loginData; 


    async function logUserIn(e, loginData){ 
     
        e.preventDefault(); 
        try { 
          const data = await loginUser(loginData); 
          dispatch(setUser(data.data)); 
           navigate('/'); 
        }catch(e){ 
             console.log(e); 
        }
    }



    return ( 
        <div className="Login"> 
            <div className="container">
                  <div className="col-lg-5 offset-lg-1 login-block">
                    <form className="p-4 p-md-5 border rounded-3 bg-light"
                    onSubmit={e => logUserIn(e,loginData)}
                    >
                        <h3 className="fs-4 mb-3">Login To Access BookPress</h3>
                        <h6 className="text-muted fw-normal mb-3">All fields are required*</h6>
                        <div className="mb-3">
                            <input type="email" name="email" className="form-control" placeholder="Email address"
                                aria-label="Email address"  
                                value={email}
                                onChange={e => setLoginData({...loginData, [e.target.name]: e.target.value})}

                                required/>
                        </div>

                        <div className="mb-3">
                            <input type="password" className="form-control" placeholder="Password" 
                            aria-label="password" name="password"
                            value ={password}
                            onChange={e =>  setLoginData({...loginData, [e.target.name]: e.target.value})}
                            required/>
                        </div>

                        <button className="w-100 btn btn-lg btn-primary" type="submit">Login Now</button>
                        <hr className="my-4" />
                        <small className="text-muted">Dont have an account? <Link to="/register">Register here</Link></small>
                    </form>
                </div>
            </div>
        </div>
    )
}


export default Login; 