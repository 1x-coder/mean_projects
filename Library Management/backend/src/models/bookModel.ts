import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let bookModel = new Schema(
    {
        
        idBook: {
            type: Number
        },
        title: {
            type: String
        },
        writer: {
            type: Array
        },
        genre: {
            type: Array
        },
        publisher:{
            type: String
        },
        pubYear: {
            type: Number
        },
        language: {
            type: String
        },
        averageRating: {
            type: Number
        },
        timesTaken: {
            type: Number
        },
        amount: {
            type: Number
        },
        picture: {
            type: String
        }



    }
)

export default mongoose.model('bookModel', bookModel, 'books');
