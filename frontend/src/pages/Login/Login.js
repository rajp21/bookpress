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

    
    const [reqLoading, setReqLoading] = useState(false); 
    const [reqSuccessful, setReqSuccessful] = useState(false); 
    const [isErrorinRequest, setIsErorInRequest] = useState({
        error: false, 
        message: ""
    });

    const navigate = useNavigate(); 

    const {email, password} = loginData; 


     function logUserIn(e, loginData){ 
        setIsErorInRequest({ 
            error: false, 
            message: ""
        }); 
        setReqLoading(true); 
        e.preventDefault(); 
        loginUser(loginData).then((data) => { 
            
           dispatch(setUser(data.data)); 
           setReqLoading(false); 
           setReqSuccessful(true); 

           setTimeout(() => { 
               navigate('/'); 
           }, 3000); 
        }).catch((e) => { 
            setTimeout(() => { 
                setReqLoading(false); 
                setIsErorInRequest({
                    error: true, 
                    errorMessage: e.response.data.originalError || e.resopnse.data.message
                }); 
            }, 2000); 
        }); 
    }



    return ( 
        <div className="Login"> 
            <div className="container">
                  <div className="col-lg-5 offset-lg-1 login-block">
                    <form className="p-4 p-md-5 border rounded-3 bg-light"
                    onSubmit={e => logUserIn(e,loginData)}
                    >
                        <h3 className="fs-4 mb-3">Login To Access BookPress</h3>
                        {
                        reqLoading?<div class="alert alert-primary text-left" role="alert">
                      <img style={{width: "20px", marginRight: ".5rem"}} src='https://i.gifer.com/origin/34/34338d26023e5515f6cc8969aa027bca_w200.gif' className='mr-3'  alt="loader" />
                      Please Wait
                    </div>
                        :""
                    }
                    {
                        reqSuccessful?<div class="alert alert-success text-left" role="alert">
                      <img style={{width: "20px", marginRight: ".5rem"}} src='https://i.gifer.com/origin/34/34338d26023e5515f6cc8969aa027bca_w200.gif' className='mr-3'  alt="loader" />
                      Redirecting
                    </div>
                        :""
                    }


                    {
                        isErrorinRequest.error?<div class="alert alert-danger text-left" role="alert">
                      {isErrorinRequest.errorMessage}
                    </div>
                        :""
                    }
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