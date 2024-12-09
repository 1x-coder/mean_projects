import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let modelReq = new Schema(
    {
        
        username: {
            type: String
        },
        password: {
            type: String
        },
        name: {
            type: String
        },
        lastName: {
            type: String
        },
        address:{
            type: String
        },
        contact: {
            type: String
        },
        email: {
            type: String
        },
        type: {
            type: String
        },
        picture: {
            type: String
        },
        status: {
            type: String
        },
        processed: {
            type: Boolean
        }


    }
)

export default mongoose.model('Requests', modelReq, 'requests');