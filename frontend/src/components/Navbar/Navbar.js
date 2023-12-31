import { logout } from "../../http";
import { Link, useNavigate } from "react-router-dom";
import { clearUser } from "../../store/userSlice";
import { useDispatch, useSelector } from "react-redux";
import {useState} from 'react'; 

const Navbar = () => { 
    const navigate = useNavigate(); 
    const dispatch = useDispatch(); 
    
   

    const crt = useSelector((state) => state.cart); 
    
   

    const logoutUser = async () => { 
        try { 
          await logout(); 
          dispatch(clearUser()); 
          navigate('/login'); 
        }catch(e) { 
           console.log(e); 
        }
    }




    return (
        <header id="navbar_top" class="bg-white">
        <div class="container">
            <nav class="navbar navbar-expand-lg  py-3">
                {/* <!--site logo --> */}
                <Link class="navbar-brand" to="/">
                    <img class="logo-dark" src="/assets/images/logo.png" alt="Site Logo" width="200" />
                    <img class="logo-white" src="/assets/images/logo.png" alt="Site Logo" width="200" />
                </Link>
                <button class="navbar-toggler me-3 ms-auto" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                    aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    {/* <!-- nav menu --> */}
                    <ul class="navbar-nav mx-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <a class="nav-link active" aria-current="page" href="#home">Home</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" aria-current="page" href="#about">About me</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#products">Shop</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" onClick={e => logoutUser(e)} >logout</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#newsletter">Blog</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#newsletter-feater">Contact</a>
                        </li>
                    </ul>


                    {/* <!-- Offcanvas --> */}
                    <div style={{position: "relative"}}>
                    <Link class="bi bi-cart fs-4 pe-30" data-bs-toggle="offcanvas" data-bs-target="#offcanvasCart"
                        aria-controls="offcanvasCart" to="/cart"></Link>

                        <span style={{
                            position: "absolute", 
                            right: "40%", 
                            width: "20px", 
                            height: "20px",
                            background: "red", 
                            borderRadius: "50%", 
                            fontSize: "12px"
                        }}>{crt.totalQty}</span>

                    </div>

                    <a class="bi bi-search fs-4 pe-35" data-bs-toggle="offcanvas" data-bs-target="#offcanvasSearch"
                        aria-controls="offcanvasSearch" href="#"></a>

                    {/* <!-- <a class="bi bi-search fs-4 pe-35" data-bs-toggle="modal" data-bs-target="#SearchModal" href="#"></a> --> */}

                    <Link to="/products" class="btn btn-primary rounded-pill text-white">Buy Now
                        Book</Link>


                </div>
                {/* <!-- .collapse --> */}
                <div class="header-seperator"></div>
            </nav>
        </div>
    </header>
    )
}

export default Navbar; 