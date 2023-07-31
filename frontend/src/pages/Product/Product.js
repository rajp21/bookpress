import {useEffect,useState} from 'react'; 
import { loadAllProducts } from '../../http';
import { Link } from 'react-router-dom';



const Product = () => {

    const [products, setProducts] = useState([]); 
    const [recentBooks, setRecentBooks] = useState([]); 
    const [isError, setIsError] = useState(false); 
    const [pagination, setPagination] = useState({});

    useEffect(() => { 
        async function featchProducts(){
            const currentURL = window.location.href;
            const url = new URL(currentURL);
            const page = url.searchParams.get('page');

           
            try{ 

                let products = await loadAllProducts(page); 
                setProducts(products?.data?.data?.books); 
                setRecentBooks(products?.data?.recentBooks); 
                console.log(products?.data?.data?.pagination);
                setPagination(products?.data?.data?.pagination);

            }catch(e){
                // alert('error You api giving error'); 
                setIsError(true); 
            }
            
        }

        featchProducts(); 
    }, [pagination]); 
    return (
        <>
            <section class="header-banner bookpress-parallax" id="header-banner-id">
                <div class="container d-flex justify-content-between align-items-center text-white">
                    <div class="overlay-out">
                        <h1 class="banner-title">Authors Books</h1>
                        <p class="text-white"><Link to="/" class="text-decoration-none text-white">Home</Link> /
                            <Link to="/products" class="text-decoration-none text-white">Products</Link>
                        </p>
                    </div>
                    <img src="assets/images/banner-image.png" class="img-fluid" alt="Books" />
                    <div class="parallax start-0 top-0 w-100 h-100"></div>
                </div>
            </section>

            <section id="section-blog" class="blog-section">
                <div class="container">
                    <div class="row gx-5 gy-4">

                       {
                         !isError?  <div class="col-md-9">
                         {
                             products?.length > 0?
                             <div class="row row-cols-2 row-cols-md-3 gx-4 gy-4">

                             { 
                                 products.map((book)  => (
                                     <div class="col">
                                         <div class="bg-white p-3 bordered-shadow">
                                             <img src={book.cover_photo} alt="Product Image" class="img-fluid" />
                                             <p class="py-2">{book.genre.join(',')}</p>
                                             <Link to={`/products/${book._id}`} class="text-decoration-none">
                                                 <h3>{book.book_name}</h3>
                                             </Link>
                                             <div class="d-flex justify-content-between pt-3">
                                                 <h4 class="text-primary">{book.price}.00$</h4>
                                                 <h5 class="text-decoration-line-through">55.00$</h5>
                                             </div>
                                         </div>
                                     </div>
                                 ))
                             }



                             
                         </div>: <h2>Sorry, No products are Available Currently</h2>
                         }
                     </div>: 
                     
                     <div class="col-md-9">
                         <div class="alert alert-danger text-left" role="alert">
                            Oops! Something Went wrong.
                        </div>
                    </div>
                        
                       }
                        
                       
                        
                        {/* <!-- sidebar start --> */}
                        <div class="col-md-3 d-flex flex-column gap-4 border rounded-2 p-4 sidebar" style={{ textAlign: 'left' }}>
                            {/* <!-- search box --> */}
                            <div class="search-box">
                                <input type="search" class="form-control ps-4" name="s" placeholder="Search..." />
                                <i class="bi bi-search"></i>
                            </div>

                            {/* <!-- popular category --> */}
                            <div class="blog-category" style={{ textAlign: "left" }}>
                                <h3 class="py-3 border-bottom">Popular Category</h3>
                                <ul class="mt-3 ps-0">
                                    <li class="list-unstyled"><a href="#" class="ms-2">Biography</a></li>
                                    <li class="list-unstyled"><a href="#" class="ms-2">Uncategorized</a></li>
                                    <li class="list-unstyled"><a href="#" class="ms-2">Art & Design</a></li>
                                    <li class="list-unstyled"><a href="#" class="ms-2">Romance</a></li>
                                    <li class="list-unstyled"><a href="#" class="ms-2">Drama</a></li>
                                    <li class="list-unstyled"><a href="#" class="ms-2">Sports</a></li>
                                </ul>
                            </div>

                            {/* <!-- recent posts --> */}
                            <div class="blog-posts">
                                <h3 class="py-3 border-bottom">Our Recent Books</h3>

                                {
                                    recentBooks.map((book) => (
                                        <div class="d-flex responsive-wrap gap-3 border-bottom py-4">
                                            <img src={book.cover_photo} style={{height: "200px", width: "150px"}}  class="img-fluid" alt="Post Thumbnail" />
                                            <div class="d-flex flex-column gap-2">
                                                <a href="product-single.html">
                                                    <h6>Hans Christian Andersen</h6>
                                                </a>
                                                <span>$35.00</span>
                                            </div>
                                        </div>
                                    ))
                                }
                                

                                {/* <div class="d-flex responsive-wrap gap-3 border-bottom py-4">
                                    <img src="assets/images/shop/recent-book-2.png" class="img-fluid" alt="Post Thumbnail" />
                                    <div class="d-flex flex-column gap-2">
                                        <a href="blog-single.html">
                                            <h6>Hans Christian Andersen</h6>
                                        </a>
                                        <span>$35.00</span>
                                    </div>
                                </div>

                                <div class="d-flex responsive-wrap gap-3 py-4">
                                    <img src="assets/images/shop/recent-book-3.png" class="img-fluid" alt="Post Thumbnail" />
                                    <div class="d-flex flex-column gap-2">
                                        <a href="blog-single.html">
                                            <h6>Hans Christian Andersen</h6>
                                        </a>
                                        <span>$35.00</span>
                                    </div>
                                </div> */}
                            </div>

                            {/* <!-- post tags --> */}
                            <div>
                                <h3 class="py-3 border-bottom">BookPress Tags</h3>
                                <span class="d-block mt-3">Biography, bestseller, adventure, biography Design, Fiction, Novel,
                                    Books</span>
                            </div>

                            {/* <!-- social links --> */}
                            <div class="social-links">
                                <h3 class="py-3 border-bottom">Follows Us:</h3>
                                <ul class="mt-3 d-flex gap-4 ps-0">
                                    <li class="list-unstyled"><a href="#" target="_blank"><i
                                        class="fa-brands fa-facebook-f"></i></a></li>
                                    <li class="list-unstyled"><a href="#" target="_blank"><i
                                        class="fa-brands fa-twitter"></i></a></li>
                                    <li class="list-unstyled"><a href="#" target="_blank"><i
                                        class="fa-brands fa-linkedin-in"></i></a></li>
                                    <li class="list-unstyled"><a href="#" target="_blank"><i
                                        class="fa-brands fa-instagram"></i></a></li>
                                </ul>
                            </div>

                        </div>
                        {/* <!-- sidebar end --> */}


                    </div>
                    <div class="pagination-wrap my-7">
                        <ul class="d-flex justify-content-start align-items-center gap-3 ps-0">
                            {
                                
                                new Array(pagination.totalPages).fill(0)
                                .map((v, ind) => (
                                    <li className={`${(ind + 1) == pagination.pageNum?'active': ''}`}><Link to={`?page=${ind+1}`}>{ ind + 1 }</Link></li>
                                ))
                                
                            }
                            {/* <li class="active"><a href="#">2</a></li>
                            <li><a href="#">3</a></li>
                            <li><a href="#">4</a></li>
                            <li><a href="#">5</a></li> */}
                        </ul>
                    </div>
                </div>
            </section>
        </>
    )
}


export default Product; 