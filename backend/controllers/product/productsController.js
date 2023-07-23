import Book from "../../models/book";

const productController  = { 
    async allProducts(req, res, next) { 
        try{ 
            const books = await Book.find(); 
            return res.status(200).json({
                success: true, 
                data: books
            }); 

        }catch(e){ 
            return next(e); 
        }
    }
}


export default productController; 