import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let SystemUser = new Schema(
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
        blocked: {
            type: Boolean
        },
        numOfTakenBooks: {
            type: Number
        }

    }
)

export default mongoose.model('User', SystemUser, 'users');