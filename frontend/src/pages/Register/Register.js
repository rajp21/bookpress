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

    const navigate = useNavigate(); 
    const dispatch = useDispatch(); 

    const {fullName, email, phoneNo, password} = registerData; 

    // register user 
    async function registerUser(e, registerData){ 
        e.preventDefault();
        try {   
            let user = await saveUser(registerData); 
            dispatch(setUser(user.data)); 
            navigate('/');               
        }catch(e) { 
            console.log(e); 
        }
    }
    

    return ( 
        <div className="Register"> 
        <div className="container">
              <div className="col-lg-5 offset-lg-1 login-block">
                <form className="p-4 p-md-5 border rounded-3 bg-light" onSubmit={e => registerUser(e, registerData)}>
                    <h3 className="fs-4 mb-3">Sign Up for Free Ebook Download</h3>
                    <h6 className="text-muted fw-normal mb-3">All fields are required*</h6>
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