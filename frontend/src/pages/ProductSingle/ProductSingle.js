import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getSingleProduct } from "../../http";
import { addToCart } from "../../store/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { Notyf } from 'notyf';


const ProductSingle = () => { 
    const [book, setBook] = useState({});
    const [isReqLoading, setIsReqLoading] = useState(false); 
    const [counter, setCounter] = useState(1); 
    const {productId} = useParams(); 



    useEffect(() => { 
        function fetchProduct(){ 
            setIsReqLoading(true); 
            getSingleProduct(productId).then((productData) => { 
                setIsReqLoading(false); 
                setBook(productData.data.data); 
            }).catch((e) => {
                setIsReqLoading(false); 
            });     
        }

        
        fetchProduct(); 
    }, []); 

    //  increment counter
    function inc(counter){ 
        setCounter(counter+1); 
    }

    // decrement counter
    function dec(counter){ 
        if(counter > 1){
            setCounter(counter - 1); 
        }
    }

    const dispatch = useDispatch(); 

    const notyf = new Notyf();

    //  update cart
    function updateCart(selectedBook){
        notyf.success('Item Added to Cart');
        dispatch(addToCart({book:selectedBook, quantity: counter})); 
    }

    
    
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
                isReqLoading?<h2>Loading...</h2>: 
                <section class="product pt-100 pb-5">
        <div class="container">
            <div class="row border">
                <div class="col-md-5 ps-0">
                    {/* <!-- product thumbnail --> */}
                    <div class="p-3 bg-light border-bottom border-end">
                        <img src="/assets/images/shop/product-image.png" class="img-fluid" alt="Book" />
                    </div>

                    {/* <!-- product gallery --> */}
                    <div class="row row-cols-3 gx-3 py-3 ps-3">
                        <div class="col">
                            <div>
                                <img src={book.cover_photo} class="img-fluid"
                                    alt="Book Gallery" />
                            </div>
                        </div>
                        <div class="col">
                            <div>
                                <img src="/assets/images/shop/product-gallery-2.png" class="img-fluid"
                                    alt="Book Gallery" />
                            </div>
                        </div>
                        <div class="col">
                            <div>
                                <img src="/assets/images/shop/product-gallery-3.png" class="img-fluid"
                                    alt="Book Gallery" />
                            </div>
                        </div>
                    </div>

                </div>
                <div class="col-md-7">
                    <div class="p-3">
                        <div class="pb-3 border-bottom">
                            <p class="text-primary mb-2">Book Feature</p>
                            <h2 class="fs-2">{book.book_name}</h2>
                            <div class="pt-2">
                                <span class="fs-3 fw-bold text-muted text-decoration-line-through">55.00$</span>
                                <span class="fs-3 fw-bold text-primary ms-3"> ${book.price}.00</span>
                            </div>
                            {/* <!-- product rating --> */}
                            <div class="pt-2">
                                <i class="bi bi-star-fill text-warning"></i>
                                <i class="bi bi-star-fill text-warning"></i>
                                <i class="bi bi-star-fill text-warning"></i>
                                <i class="bi bi-star-fill text-warning"></i>
                                <i class="bi bi-star-fill text-secondary"></i>
                                <span class="ps-3">(50 Reviews)</span>
                            </div>
                        </div>
                        <div>
                            <p class="pt-4">{book.description}</p>

                            <ul class="list-col-2 li-unstyled responsive-grid ps-0 mb-0 check-icon-sm pt-4">
                                <li class="mb-3">
                                    <i class="bi bi-check-lg"></i><span class="ms-2">Publisher : {book.author_name}</span>
                                </li>
                                <li class="mb-3">
                                    <i class="bi bi-check-lg"></i><span class="ms-2">Publish Date : October 20,
                                        2022</span>
                                </li>
                                <li class="mb-3">
                                    <i class="bi bi-check-lg"></i><span class="ms-2">In Stock <span
                                            class="text-primary">(only {book.available_copies} Copies Left)</span></span>
                                </li>
                                <li class="mb-3">
                                    <i class="bi bi-check-lg"></i><span class="ms-2">ISBN-10 : 0236547851</span>
                                </li>
                                <li class="mb-3">
                                    <i class="bi bi-check-lg"></i><span class="ms-2">ISBN-13 : 2547810321560</span>
                                </li>
                            </ul>
                        </div>

                        <div
                            class="d-flex justify-content-between align-items-center pe-lg-5 border-top border-bottom mt-4 py-3">
                            <div class="d-flex gap-3 pe-5 border-end">
                                <img src="/assets/images/shop/author.png" class="img-fluid" alt="Author Image" />
                                <div class="d-flex flex-column my-auto">
                                    <span class="fs-4">{book.author_name}</span>
                                    <span class="d-inline-block">Author & Writer</span>
                                </div>
                            </div>

                            <div class="ps-2">
                                <img src="/assets/images/shop/author-signature.png" class="img-fluid"
                                    alt="Author Signature" />
                            </div>
                        </div>

                        {/* <!-- add to cart buttons --> */}
                        <div class="d-flex gap-4 align-items-center py-30 border-bottom">
                            <a class="btn btn-dark"><i class="fa-solid fa-plus" onClick={e => inc(counter)}></i> {counter} <i
                                    class="fa-solid fa-minus" onClick={e => dec(counter)}></i></a>
                            <a  class="btn btn-primary" onClick={e => updateCart(book)}>Add To Cart</a>
                        </div>

                        {/* <!-- product categories --> */}
                        <div class="pt-4">
                            <ul class="li-unstyled ps-0 mb-0">
                                <li><span class="fw-bold pe-5">SKU</span> : Food-Collections</li>
                                <li><span class="fw-bold pe-2">Category</span> : Photography</li>
                                <li><span class="fw-bold pe-5">Tags</span> : Book, Novel, Poems</li>
                                <li><span class="fw-bold pe-5">Share</span> :
                                    <ul class="d-inline-flex gap-4 ps-0 mb-0">
                                        <li class="list-unstyled"><a href="#"><i
                                                    class="fa-brands fa-facebook-f"></i></a></li>
                                        <li class="list-unstyled"><a href="#"><i class="fa-brands fa-twitter"></i></a>
                                        </li>
                                        <li class="list-unstyled"><a href="#"><i
                                                    class="fa-brands fa-linkedin-in"></i></a></li>
                                        <li class="list-unstyled"><a href="#"><i class="fa-brands fa-instagram"></i></a>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </div>

                    </div>
                </div>
            </div>
        </div>
            </section>
            }
        </>

    )
}

export default ProductSingle; 