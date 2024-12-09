import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let loanModel = new Schema(
    {
        
        idBook: {
            type: Number
        },
        title: {
            type: String
        },
        deadLine: {
            type: Date
        },
        username: {
            type: String
        },
        writer:{
            type: Array
        },
        loanDate: {
            type: Date
        },
        returnDate: {
            type: Date
        },
        picture: {
            type: String
        },
        processed: {
            type: Boolean
        },
        extended: {
            type: Boolean
        },
        returnedBook: {
            type: Boolean
        },
        idLoan: {
            type: Number
        },
        extendPeriod: {
            type: Number
        }


    }
)

export default mongoose.model('loanModel', loanModel, 'loan');
