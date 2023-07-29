import {useState} from 'react'; 
import './register.css'; 
import { saveUser } from '../../http';
import {useNavigate} from 'react-router-dom'; 
import { Link } from 'react-router-dom';
import { setUser } from '../../store/userSlice';
import {useDispatch} from 'react-redux'; 



const Register = () => { 

    const [registerData, setRegisterData] = useState({
        name: "", 
        email: "", 
        phoneNo: "", 
        password: ""
    }); 

    const [reqLoading, setReqLoading] = useState(false); 
    const [reqSuccessful, setReqSuccessful] = useState(false); 
    const [isErrorinRequest, setIsErorInRequest] = useState({
        error: false, 
        message: ""
    });

    const navigate = useNavigate(); 
    const dispatch = useDispatch(); 


    const {fullName, email, phoneNo, password} = registerData; 

    // register user 

    const delay = (ms) => new Promise((resolve) => setTimeout(() => { 
        navigate('/'); 
        resolve(); 
    }, ms));
    
    async function registerUser(e, registerData){ 
     
        e.preventDefault();
        setReqLoading(true); 


        saveUser(registerData).then((user) => { 
           

            dispatch(setUser(user?.data)); 
            setReqLoading(false); 
            setReqSuccessful(true); 
            

            setTimeout(() => { 
                navigate('/');               
            }, 3000); 

        }).catch((e) => { 
            
            setReqLoading(false); 
            setIsErorInRequest({
                error: true, 
                errorMessage: e?.response?.data?.originalError || e.resopnse?.data?.message || "Something Went Wrong"
            }); 
        }); 

   
    }
    

    return ( 
        <div className="Register"> 
        <div className="container">
              <div className="col-lg-5 offset-lg-1 login-block">
                <form className="p-4 p-md-5 border rounded-3 bg-light" onSubmit={e => registerUser(e, registerData)}>
                    <h3 className="fs-4 mb-3">Sign Up for Free Ebook Download</h3>
                    
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
                        <input type="text" className="form-control" 
                         placeholder="Full name" 
                         aria-label="Full name" 
                         name='name'
                         value={fullName}
                         onChange={e => setRegisterData({...registerData, [e.target.name]: e.target.value})}
                         required
                        />
                    </div>
                    <div className="mb-3">
                        <input type="email" className="form-control" placeholder="Email address"
                            aria-label="Email address" 
                            name='email'                                
                            value={email}
                            onChange={e => setRegisterData({...registerData, [e.target.name]: e.target.value})}
                            required
                            />
                    </div>

                    <div className="mb-3">
                        <input type="text" className="form-control" placeholder="Phone No"
                            aria-label="Phone No" 
                            name ="phoneNo"
                            value={phoneNo}
                            onChange={e => setRegisterData({...registerData, [e.target.name]: e.target.value})}
                            required
                            />
                    </div>

                    <div className="mb-3">
                        <input type="password" className="form-control" placeholder="Password"
                            aria-label="Phone No"
                            name='password'
                            value={password}
                            onChange={e => setRegisterData({...registerData, [e.target.name]: e.target.value})}                            
                          required/>
                    </div>
                    <button className="w-100 btn btn-lg btn-primary" type="submit">SIGN UP NOW</button>
                    <hr className="my-4" />
                    <small className="text-muted">Already Have an account? <Link to="/login">Login here</Link></small>
                </form>
            </div>
        </div>
    </div>
    )
}


export default Register; 