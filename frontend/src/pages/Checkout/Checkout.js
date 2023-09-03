import React, {useEffect, useState} from 'react'
import { addNewAddress, fetchUserAddresses } from '../../http';
import { notyf } from "../../config";
import './checkout.css'; 

const Checkout = () => {
    const [addressLilst, setAddressList] = useState([]); 
    const [addAddress, setAdAddress] = useState(false); 
    const [isError, setIsError] = useState(false); 
    const [errorMessages, setErrorMessages] = useState({}); 


    const [addressDependancy, setAddressDependancy] = useState(false); 

    const [addressData, setAddressData]  = useState({
        recidence: "", 
        landmark: "", 
        city: "", 
        state: "", 
        pincode: ""
    })




    // destructuring the addressData
    const {recidence, landmark, city, state, pincode} = addressData; 


    // on change input 
    const onInpChange = (e) => { 
        setAddressData({...addressData, [e.target.name]: e.target.value}); 
    }


    useEffect(() => { 
        // loadAddresses
        async function loadAddresses(){ 
            try{ 
                let addresses = await fetchUserAddresses();                 
                console.log(addresses.data.addresses); 
                setAddressList(addresses.data.addresses); 
                setIsError(false); 
            }catch(e){ 
                setIsError(true); 
            }   
        }

        loadAddresses(); 
    }, [addressDependancy]); 



    //  submit new address
    async function submitAddress(e, addressData){
        e.preventDefault(); 

        try{ 
            await addNewAddress(addressData); 

            notyf.success("Address Added Succesfully"); 
            setAdAddress(false);    
            setAddressDependancy(true); 
        }catch(e){ 
            
            console.log(e); 
            if(e.response.status === 422){
                setErrorMessages(e.response.data.errorMessages);
            }
        }
    }


  return (
    <>
      {/* <!-- header banner --> */}
    <section class="header-banner bookpress-parallax" id="header-banner-id">
        <div class="container d-flex justify-content-between align-items-center text-white">
            <div class="overlay-out">
                <h1 class="banner-title">Checkout</h1>
                <p class="text-white"><a href="index.html" class="text-decoration-none text-white">Home</a> /
                    <a href="checkout.html" class="text-decoration-none text-white">Checkout</a>
                </p>
            </div>
            <img src="/assets/images/banner-image.png" class="img-fluid" alt="Books" />
            <div class="parallax start-0 top-0 w-100 h-100"></div>
        </div>
    </section> 
    {/* <!-- header banner end --> */}

    { 
        isError? 
        <div className='col-md-9 mt-5' >
            <div class="alert alert-danger text-left" role="alert">
                Oops! Something Went wrong.
            </div>
        </div>
        : 

        <>
         {/* <!-- billing section  --> */}
    <section class="billing-section py-5">
        <div class="container">
            <div className='address-area'>
                <div className='title-strip'>
                    <h4 className="">Select Addresses</h4>

                    <button className='btn btn-danger'>continue</button>
                </div>

                <div className='address-wrapper'>
                    { 
                        addressLilst.length >0? 
                        addressLilst.map((address) => (
                            <div className='single-address'>
                        <input type='checkbox'   />

                        <div className='address-line'>
                                <p>{address.addressString}</p>
                            </div>
                        </div>
                        )): <h4  className='error-message'>Oops, No Address Added, You need to add Adress First</h4>
                    }                   
                </div>

                <div className='add-address title-strip'>
                    <h4>Add Address</h4>
                    <buton onClick={e => setAdAddress((prev)=> !prev)} className="btn btn-danger"> Add</buton>
                </div>


              { 
                addAddress?
                <div className='add-address-form mt-4'>
                   <form onSubmit={e => submitAddress(e, addressData)}>
                        <div className='row'>
                            <div className='col-md-6 mt-3'>
                                    <label>Room No / Appartment / Plot number</label>
                                    <input className='w-100' 
                                    placeholder='recidence' 
                                    name='recidence'
                                    value={recidence}
                                    onChange={e => onInpChange(e)}

                                    />
                                    {
                                       errorMessages && errorMessages.recidence?<span className='err-message'>{errorMessages.recidence}</span>:''
                                    }
                                </div>

                                <div className='col-md-6 mt-3'>
                                    <lable>Landmark / Village</lable>
                                    <input className='w-100' 
                                    placeholder='Landmark / Villabe' 
                                    name='landmark'
                                    value={landmark}
                                    onChange={e => onInpChange(e)}

                                    />

                                    {
                                       errorMessages && errorMessages.landmark?<span className='err-message'>{errorMessages.landmark}</span>:''
                                    }
                                </div>


                                <div className='col-md-6 mt-3'>
                                    <label>City</label>
                                    <input className='w-100' placeholder='city' 
                                        name='city'
                                        value={city}
                                        onChange={e => onInpChange(e)}
                                    />
                                    {
                                       errorMessages && errorMessages.city?<span className='err-message'>{errorMessages.city}</span>:''
                                    }
                                </div>

                            <div className='col-md-6 mt-3'>
                                <label>State</label>
                                <input className='w-100' 
                                placeholder='state'
                                name='state'
                                value={state}
                                    onChange={e => onInpChange(e)}

                                />

                                {
                                    errorMessages && errorMessages.state?<span className='err-message'>{errorMessages.state}</span>:''
                                }
                            </div>


                            
                            <div className='col-md-6 mt-3'>
                                <label>Pincode</label>
                                <input className='w-100' placeholder='pincode' name='pincode'
                                value={pincode}
                                    onChange={e => onInpChange(e)}
                                 />

{
                                       errorMessages && errorMessages.pincode?<span className='err-message'>{errorMessages.pincode}</span>:''
                                    }
                            </div>
                        </div>

                        <div className='text-center'>
                            <button type='submit' className='btn btn-primary mt-4 text-center'>Add Address</button>
                        </div>
                   </form>
                </div>
                : ""
              }


              <div className='title-strip mt-5' style={{marginTop: "1rem"}}>
                    <h4 className="">Review Order</h4>
                    <button className='btn btn-danger'>continue</button>
               </div>


               <div className='review-order'>
                    <div className='order-items-wrapper'>
                        <div className='single-review-item'>
                            <img src='https://5.imimg.com/data5/SELLER/Default/2021/8/US/XL/ZL/133456484/atomic-habits-the-life-changing.jpg' alt='image' />

                            <div>
                                <span>$ 40</span>
                                <h2>Harry Potter and the Sorcerer's Stone</h2>
                            </div>
                        </div>
                    </div>

                    <div className='final-price-section'>
                        <h2>Total Price</h2>
                        <span> $200</span>
                    </div>
               </div>
            </div>
        </div>
    </section>
    {/* <!-- End billing section  --> */}

    {/* <!-- subscribers form --> */}
    <section id="section-subscriber-form" class="subscriber-form pb-5">
        <div class="container">
            <div class="text-center text-white subscriber-form-wrap p-5">
                <span class="d-block text-decoration-underline">Subscribe Now</span>
                <h2 class="display-5 fw-bold mt-3 mb-5">Get a free section of this book</h2>
                <form action="#" method="post" id="subscribe" class="mb-5">
                    <div class="row">
                        <div class="col-md-10 offset-md-1">
                            <input type="email" class="form-control ps-4" placeholder="Your Email Address here" />
                            <button type="submit" class="btn btn-dark mt-3 w-100">Subscribe <i
                                    class="bi bi-arrow-right"></i></button>
                        </div>
                    </div>
                </form>
                <p class="text-white">* eBook includes iBooks, PDF & ePub versions</p>
            </div>
        </div>
    </section>
        </>
    }
    </>
  )
}

export default Checkout
