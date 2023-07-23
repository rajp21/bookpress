import { number } from 'joi';
import mongoose from 'mongoose'; 

const booksSchema = new mongoose.Schema({
    book_name: { 
        type: String, 
        required: true, 
    }, 
    author_name: { 
        type: String, 
        required: true
    }, 
    available_copies: { 
        type: String, 
        required: true
    }, 
    cover_photo: { 
        type: String, 
        required: true
    }, 
    description: { 
        type: String, 
        required: true, 
    }, 
    rating: { 
        type: Number,
        required: true, 
    }, 
    price: { 
        type: Number, 
        required: true
    },
    genre: { 
        type: Array, 
        required: true, 
    }, 

    publication_date: { 
        type: String, 
        required: true, 
    }, 
    language: { 
        type: String, 
        required: true
    }
}, {timestamps: true}); 


export default mongoose.model('Book', booksSchema); 