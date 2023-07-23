import Book from "../../models/book";

const productController  = { 
    async allProducts(req, res, next) {
        console.log(req.body); 
        try{ 
            let perPage = 12 ;
            let pageNum = req.params.page || 3; 
            
            const books = await Book.find().sort({createdAt: -1}).skip(perPage*pageNum - perPage).limit(perPage); 
            const recentBooks = await Book.find().limit(3); 
            
            return res.status(200).json({
                success: true, 
                data: books, 
                recentBooks: recentBooks
            }); 

        }catch(e){ 
            return next(e); 
        }
    }, 

    async getProduct(req, res,next) { 
        const {productId} = req.params; 
        try{
            const book = await Book.findOne({_id: productId}); 
          
            return res.status(200).json({
                success: true, 
                data: book
            });             
        }catch(e) { 
            return next(e);
        }
    }
}


export default productController; 
