import React from 'react'

const Checkout = () => {
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

    {/* <!-- billing section  --> */}
    <section class="billing-section py-5">
        <div class="container">
            <form class="mt-5">
                <div class="row row-cols-1 row-cols-md-2 contact g-5 mx-2 px-3 py-2">
                    <div class="col">
                        <h3>Billign Address</h3>
                        <div class="mb-3 pt-3">
                            <label for="InputText1" class="form-label">
                                Full Name
                            </label>
                            <input type="text" class="form-control" id="InputText1" placeholder="Enter your name" />
                        </div>
                        <div class="mb-3">
                            <label for="InputEmail" class="form-label">
                                Email Address
                            </label> 
                            <input type="email" class="form-control" id="InputEmail" placeholder="Enter your email" />
                        </div>
                        <div class="row row-cols-1 row-cols-md-2 py-2">
                            <div class="col">
                                <div class="mb-3">
                                    <label for="InputText2" class="form-label">
                                        Country
                                    </label>
                                    <input type="text" class="form-control" id="InputText2"
                                        placeholder="Enter your country" />
                                </div>
                                <div class="mb-3">
                                    <label for="InputText3" class="form-label">
                                        Phone Number
                                    </label>
                                    <input type="text" class="form-control" id="InputText3"
                                        placeholder="Enter your number" />
                                </div>
                            </div>
                            <div class="col">
                                <div class="mb-3">
                                    <label for="InputText4" class="form-label">
                                        Country
                                    </label>
                                    <input type="text" class="form-control" id="InputText4"
                                        placeholder="Enter your country" />
                                </div>
                                <div class="mb-3">
                                    <label for="InputText5" class="form-label">
                                        Zip Code
                                    </label>
                                    <input type="text" class="form-control" id="InputText5"
                                        placeholder="Enter your zip code" />
                                </div>
                            </div>
                        </div>
                        <h3>Additional Information</h3>
                        <label for="message" class="form-label"></label>
                        <textarea id="message" class="form-control" name="story" placeholder="Enter your message"
                            rows="8" cols="30"></textarea>

                        <div class="my-5">
                            <h5 class="text-primary">* Have confidence. We won't spam at your inbox.</h5>
                        </div>
                    </div>

                    <div class="col">
                        <h3>Your Order</h3>

                        <table class="table-billing bg-white my-4">
                            <thead>
                                <tr class="border-bottom">
                                    <th class="text-start">
                                        Product
                                    </th>
                                    <th class="text-end">
                                        Total
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td class="text-start fw-lighter">Hate Glitterign Stars</td>
                                    <td class="text-end fw-lighter">$56.00</td>
                                </tr>
                                <tr>
                                    <td class="text-start fw-lighter">Where the Crawdads Sing</td>
                                    <td class="text-end fw-lighter"> $76.00</td>
                                </tr>
                                <tr class="border-top">
                                    <td class="text-start fw-lighter">Sub Total</td>
                                    <td class="text-end fw-lighter">$132.00</td>
                                </tr>
                                <tr>
                                    <td class="text-start fw-lighter">Shipping</td>
                                    <td class="text-end fw-lighter">Free Shipping</td>
                                </tr>
                                <tr class="border-top">
                                    <td class="text-start fs-5">
                                        Total
                                    </td>
                                    <td class="text-end fs-5">
                                        $132.00
                                    </td>
                                </tr>
                            </tbody>
                        </table>


                        <h3>Payment Method</h3>
                        <div class="row payment-method px-3 py-4 my-4 mx-1">
                            <div class="col-md-6">
                                <div class="form-check p-2">
                                    <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault1" />
                                    <label class="form-check-label" for="flexCheckDefault1">
                                        Direct Bank Transfer
                                    </label>
                                </div>
                                <div class="form-check p-2">
                                    <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault2" />
                                    <label class="form-check-label" for="flexCheckDefault2">
                                        Paypal
                                    </label>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-check p-2">
                                    <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault3" />
                                    <label class="form-check-label" for="flexCheckDefault3">
                                        Cash on delivery
                                    </label>
                                </div>
                                <div class="form-check p-2">
                                    <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault4" /> 
                                    <label class="form-check-label" for="flexCheckDefault4">
                                        Payonee
                                    </label>
                                </div>
                            </div>

                            <div class="row row-cols-1 row-cols-md-5 border-top gx-0 pt-4">
                                <div class="col">
                                    <img src="assets/images/checkout/payment-method-1.png" alt="Payment Img1"
                                        class="img-fluid pe-2" />
                                </div>
                                <div class="col">
                                    <img src="assets/images/checkout/payment-method-2.png" alt="Payment Img2"
                                        class="img-fluid pe-2" />
                                </div>
                                <div class="col">
                                    <img src="assets/images/checkout/payment-method-3.png" alt="Payment Img3"
                                        class="img-fluid pe-2" />
                                </div>
                                <div class="col">
                                    <img src="assets/images/checkout/payment-method-4.png" alt="Payment Img4"
                                        class="img-fluid pe-2" />
                                </div>
                                <div class="col">
                                    <img src="assets/images/checkout/payment-method-5.png" alt="Payment Img5"
                                        class="img-fluid pe-2" />
                                </div>
                            </div>
                        </div>
                        <div class="">
                            <button type="submit" class="btn btn-primary">Place Order</button>
                        </div>
                    </div>
                </div>
            </form>
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
  )
}

export default Checkout
