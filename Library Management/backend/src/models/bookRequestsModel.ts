import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let bookRequestsModel = new Schema(
    {
        idBookRequest: {
            type: Number
        },
        username: {
            type: String
        },
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
        picture: {
            type: String
        },
        processed: {
            type: Boolean
        }




    }
)

export default mongoose.model('bookRequestsModel', bookRequestsModel, 'bookRequests');
