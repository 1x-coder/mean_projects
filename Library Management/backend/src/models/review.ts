import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let reviewModel = new Schema(
    {
        
        idReview: {
            type: Number
        },
        username: {
            type: String
        },
        rating: {
            type: Number
        },
        idBook: {
            type: Number
        },
        comment:{
            type: String
        },
        date: {
            type: Date
        },
        edited: {
            type: Boolean
        }


    }
)

export default mongoose.model('reviewModel', reviewModel, 'reviews');
