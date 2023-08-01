import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getSingleProduct } from "../../http";
import { addToCart } from "../../store/cartSlice";
import { useSelector } from "react-redux";



const Cart = () => { 

    const cartItems = useSelector((state) => state.cart); 
    
    
   return( 
        <>
            {/*  sectio nbanner */}
            <section class="header-banner bookpress-parallax" id="header-banner-id">
                <div class="container d-flex justify-content-between align-items-center text-white">
                    <div class="overlay-out">
                        <h1 class="banner-title">Product Single</h1>
                        <p class="text-white"><Link to="/" class="text-decoration-none text-white">Home</Link> /
                            <Link to="/product" class="text-decoration-none text-white">Product</Link>
                        </p>
                    </div>
                    <img src="/assets/images/banner-image.png" class="img-fluid" alt="Books" />
                    <div class="parallax start-0 top-0 w-100 h-100"></div>
                </div>
            </section>

            {/* ----------- actual Product ---------- */}
            {
              
                <section class="product pt-100 pb-5">
        <div class="container">
        <section class="h-100 h-custom" style={{backgroundColor: "#eee"}}>
  <div class="container py-5 h-100">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col">
        <div class="card">
          <div class="card-body p-4">

            <div class="row">

              <div class="col-lg-7">
                <h5 class="mb-3"><a href="#!" class="text-body"><i
                      class="fas fa-long-arrow-alt-left me-2"></i>Continue shopping</a></h5>
                <hr />

                <div class="d-flex justify-content-between align-items-center mb-4">
                  <div>
                    <p class="mb-1">Shopping cart</p>
                    <p class="mb-0">You have 4 items in your cart</p>
                  </div>
                  <div>
                    <p class="mb-0"><span class="text-muted">Sort by:</span> <a href="#!"
                        class="text-body">price <i class="fas fa-angle-down mt-1"></i></a></p>
                  </div>
                </div>

                {
                    Object.keys(cartItems?.items).map((item) => (
                        <div class="card mb-3">
                        <div class="card-body">
                          <div class="d-flex justify-content-between">
                            <div class="d-flex flex-row align-items-center">
                              <div>
                                <img
                                  src={cartItems?.items[item]?.item?.cover_photo}
                                  class="img-fluid rounded-3" alt="Shopping item" style={{width: "65px"}} />
                              </div>
                              <div class="ms-3">
                                <h5> {cartItems?.items[item]?.item?.book_name} </h5>
                                <p class="small mb-0"> {cartItems?.items[item]?.item?.author_name} </p>
                              </div>
                            </div>
                            <div class="d-flex flex-row align-items-center">
                              <div style={{width: "50px"}}>
                                <h5 class="fw-normal mb-0">{cartItems?.items[item]?.qty}</h5>
                              </div>
                              <div style={{width: "80px"}}>
                                <h5 class="mb-0">{cartItems?.items[item]?.item?.price * cartItems?.items[item]?.qty}</h5>
                              </div>
                              <a href="#!" style={{color: "#cecece"}}><i class="fas fa-trash-alt"></i></a>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                }

                {/* <div class="card mb-3">
                  <div class="card-body">
                    <div class="d-flex justify-content-between">
                      <div class="d-flex flex-row align-items-center">
                        <div>
                          <img
                            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-shopping-carts/img1.webp"
                            class="img-fluid rounded-3" alt="Shopping item" style={{width: "65px"}} />
                        </div>
                        <div class="ms-3">
                          <h5>Iphone 11 pro</h5>
                          <p class="small mb-0">256GB, Navy Blue</p>
                        </div>
                      </div>
                      <div class="d-flex flex-row align-items-center">
                        <div style={{width: "50px"}}>
                          <h5 class="fw-normal mb-0">2</h5>
                        </div>
                        <div style={{width: "80px"}}>
                          <h5 class="mb-0">$900</h5>
                        </div>
                        <a href="#!" style={{color: "#cecece"}}><i class="fas fa-trash-alt"></i></a>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="card mb-3">
                  <div class="card-body">
                    <div class="d-flex justify-content-between">
                      <div class="d-flex flex-row align-items-center">
                        <div>
                          <img
                            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-shopping-carts/img2.webp"
                            class="img-fluid rounded-3" alt="Shopping item" style={{width: "65px"}} />
                        </div>
                        <div class="ms-3">
                          <h5>Samsung galaxy Note 10 </h5>
                          <p class="small mb-0">256GB, Navy Blue</p>
                        </div>
                      </div>
                      <div class="d-flex flex-row align-items-center">
                        <div style={{width: "50px"}}>
                          <h5 class="fw-normal mb-0">2</h5>
                        </div>
                        <div style={{width: "80px"}}>
                          <h5 class="mb-0">$900</h5>
                        </div>
                        <a href="#!" style={{color: "#cecece"}}><i class="fas fa-trash-alt"></i></a>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="card mb-3">
                  <div class="card-body">
                    <div class="d-flex justify-content-between">
                      <div class="d-flex flex-row align-items-center">
                        <div>
                          <img
                            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-shopping-carts/img3.webp"
                            class="img-fluid rounded-3" alt="Shopping item" style={{width: "65px"}} />
                        </div>
                        <div class="ms-3">
                          <h5>Canon EOS M50</h5>
                          <p class="small mb-0">Onyx Black</p>
                        </div>
                      </div>
                      <div class="d-flex flex-row align-items-center">
                        <div style={{width: "50px"}}>
                          <h5 class="fw-normal mb-0">1</h5>
                        </div>
                        <div style={{width: "80px"}}>
                          <h5 class="mb-0">$1199</h5>
                        </div>
                        <a href="#!" style={{color: "#cecece"}}><i class="fas fa-trash-alt"></i></a>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="card mb-3 mb-lg-0">
                  <div class="card-body">
                    <div class="d-flex justify-content-between">
                      <div class="d-flex flex-row align-items-center">
                        <div>
                          <img
                            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-shopping-carts/img4.webp"
                            class="img-fluid rounded-3" alt="Shopping item" style={{width: "65px"}} />
                        </div>
                        <div class="ms-3">
                          <h5>MacBook Pro</h5>
                          <p class="small mb-0">1TB, Graphite</p>
                        </div>
                      </div>
                      <div class="d-flex flex-row align-items-center">
                        <div style={{width: "50px"}}>
                          <h5 class="fw-normal mb-0">1</h5>
                        </div>
                        <div style={{width: "80px"}}>
                          <h5 class="mb-0">$1799</h5>
                        </div>
                        <a href="#!" style={{color: "#cecece"}}><i class="fas fa-trash-alt"></i></a>
                      </div>
                    </div>
                  </div>
                </div> */}

              </div>
              <div class="col-lg-5">

                <div class="card bg-primary text-white rounded-3">
                  <div class="card-body">
                    <div class="d-flex justify-content-between align-items-center mb-4">
                      <h5 class="mb-0">Price Breakdown</h5>
                      <img src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp"
                        class="img-fluid rounded-3" style={{width: "45px"}} alt="Avatar" />
                    </div>

                  

                    <hr class="my-4" />

                    <div class="d-flex justify-content-between">
                      <p class="mb-2">Subtotal</p>
                      <p class="mb-2">${cartItems.totalPrice}</p>
                    </div>

                    <div class="d-flex justify-content-between">
                      <p class="mb-2">Shipping</p>
                      <p class="mb-2">${50}</p>
                    </div>

                    <div class="d-flex justify-content-between mb-4">
                      <p class="mb-2">Total(Incl. taxes)</p>
                      <p class="mb-2">${Number(cartItems.totalPrice) + 50}</p>
                    </div>

                    <button type="button" class="btn btn-info btn-block btn-lg">
                      <div class="d-flex justify-content-between">
                        <span>${Number(cartItems.totalPrice) + 50}</span>  |  
                        <span>Checkout <i class="fas fa-long-arrow-alt-right ms-2"></i></span>
                      </div>
                    </button>

                  </div>
                </div>

              </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</section>
        </div>
            </section>
            }
        </>

    )
}

export default Cart; 