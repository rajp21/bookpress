import Book from "../../models/book";

const productController  = { 
    async allProducts(req, res, next) {
        
        try{ 
            let perPage = 10;
            let pageNum = req.params.page || 1; 
            
            const books = await Book.find().sort({createdAt: -1}).skip(perPage*pageNum - perPage).limit(perPage); 
            const recentBooks = await Book.find().limit(3); 

            const totlaDocs = await Book.countDocuments(); 
            
            return res.status(200).json({
                success: true, 
                data: {
                    books, 
                    pagination: {
                        pageNum, 
                        totalPages: totlaDocs < perPage?1: Math.round(totlaDocs/perPage)
                    },                   
                }, 
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
