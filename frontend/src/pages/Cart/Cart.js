import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getSingleProduct } from "../../http";
import { addToCart } from "../../store/cartSlice";
import { useSelector } from "react-redux";
import { deleteFromCart } from "../../store/cartSlice";
import { notyf } from "../../config";
import { useDispatch } from "react-redux";
import { createOrder, createRazorPayOrder } from "../../http";


const Cart = () => {

  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function checkAuth() {
    return user.isLoggedIn;
  }

  const cartItems = useSelector((state) => state.cart);



  function loadScript(src) {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;
        script.onload = () => {
            resolve(true);
        };
        script.onerror = () => {
            resolve(false);
        };
        document.body.appendChild(script);
    });
}


  // proceed to checkout 
  async function proceedToCheckout(loginStatus) {
    if (loginStatus) {
      try {
        const orderData = await createOrder({
          cart: cartItems,
          payment: {
            amount: cartItems.totalPrice + 50,
            payment_mode: "online",
            payment_gateway: "r_pay",
          }
        }); 

        navigate(`/order-checkout/${orderData?.data?.data?._id}`)

        //  create razor pay order now
      //   let razorPayOrderData; 
      //   try{  
      //     razorPayOrderData = await createRazorPayOrder({orderId: orderData?.data?.data?._id})
      //   }catch(e){ 
      //     notyf.error("Something went Wrong"); 
      //   }

      //   let rPayOrderInfo = razorPayOrderData?.data?.data; 
        
        

      //   const res = await loadScript(
      //     "https://checkout.razorpay.com/v1/checkout.js"
      // );

      //   const options = { 
      //     key: process.env.REACT_APP_RAZOR_PAY_API_KEY, // Enter the Key ID generated from the Dashboard
      //     amount: rPayOrderInfo.amount.toString(),
      //     currency: rPayOrderInfo.currency,
      //     name: "BookPress.",
      //     description: "Order Place BookPress",
          
      //     order_id: rPayOrderInfo.id,
      //     handler: async function (response) {
      //         const data = {
      //             orderCreationId: rPayOrderInfo.id,
      //             razorpayPaymentId: response.razorpay_payment_id,
      //             razorpayOrderId: response.razorpay_order_id,
      //             razorpaySignature: response.razorpay_signature,
      //         };

              

      //         notyf.success("Payment successfull")
      //     },
          
      //     theme: {
      //         color: "#61dafb",
      //     },
      //   }

      //   const paymentObject = new window.Razorpay(options);
      //   paymentObject.open();
        
        
      } catch (e) {
        console.log(e); 
      }
    } else {
      navigate('/login');
    }
  }

  // delete cart item
  function deleteCartItem(itemID) {
    notyf.success("Item Deleted successfully");
    dispatch(deleteFromCart(itemID));
  }


  return (
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
            <section class="h-100 h-custom" style={{ backgroundColor: "#eee" }}>
              <div class="container py-5 h-100">
                {
                  Object.keys(cartItems.items)?.length > 0 ?
                    <div class="row d-flex justify-content-center align-items-center h-100">
                      <div class="col">
                        <div class="card">
                          <div class="card-body p-4">

                            <div class="row">

                              <div class="col-lg-7">
                                <h5 class="mb-3"><Link to="/products" class="text-body"><i
                                  class="fas fa-long-arrow-alt-left me-2"></i>Continue shopping</Link></h5>
                                <hr />

                                <div class="d-flex justify-content-between align-items-center mb-4">
                                  <div>
                                    <p class="mb-1">Shopping cart</p>
                                    {/* <p class="mb-0">You have 4 items in your cart</p> */}
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
                                                class="img-fluid rounded-3" alt="Shopping item" style={{ width: "65px" }} />
                                            </div>
                                            <div class="ms-3">
                                              <h5> {cartItems?.items[item]?.item?.book_name} </h5>
                                              <p class="small mb-0"> {cartItems?.items[item]?.item?.author_name} </p>
                                            </div>
                                          </div>
                                          <div class="d-flex flex-row align-items-center">
                                            <div style={{ width: "50px" }}>
                                              <h5 class="fw-normal mb-0">{cartItems?.items[item]?.qty}</h5>
                                            </div>
                                            <div style={{ width: "80px" }}>
                                              <h5 class="mb-0">{cartItems?.items[item]?.item?.price * cartItems?.items[item]?.qty}</h5>
                                            </div>
                                            <a href="#!" style={{ color: "#cecece" }} onClick={e => deleteCartItem(item)}><i class="fas fa-trash-alt"></i></a>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  ))
                                }

                              </div>
                              <div class="col-lg-5">

                                <div class="card bg-primary text-white rounded-3">
                                  <div class="card-body">
                                    <div class="d-flex justify-content-between align-items-center mb-4">
                                      <h5 class="mb-0">Price Breakdown</h5>
                                      <img src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp"
                                        class="img-fluid rounded-3" style={{ width: "45px" }} alt="Avatar" />
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
                                      <p class="mb-2">${(Number(cartItems.totalPrice) + 50).toFixed(2)}</p>
                                    </div>

                                    {
                                      checkAuth() ?

                                        <button type="button" class="btn btn-info btn-block btn-lg" onClick={e => proceedToCheckout(true)}>
                                          <div class="d-flex justify-content-between">
                                            <span>${(Number(cartItems.totalPrice) + 50).toFixed(2)}</span>  &nbsp;  |  &nbsp;
                                            <span>Checkout <i class="fas fa-long-arsssrow-alt-right ms-2"></i></span>
                                          </div>
                                        </button>
                                        : <button type="button" class="btn btn-info btn-block btn-lg" onClick={e => proceedToCheckout(false)}>
                                          <div class="d-flex justify-content-between">
                                            <span>${(Number(cartItems.totalPrice) + 50).toFixed(2)}</span>  &nbsp;  |  &nbsp;
                                            <span>Login to Checkout<i class="fas fa-long-arrow-alt-right ms-2"></i></span>
                                          </div>
                                        </button>

                                    }

                                  </div>
                                </div>

                              </div>

                            </div>

                          </div>
                        </div>
                      </div>
                    </div> : <h2>Ooops, Your Cart is Empty...</h2>
                }
              </div>
            </section>
          </div>
        </section>
      }
    </>

  )
}

export default Cart; 