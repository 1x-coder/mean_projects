
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let bookReservationModel = new Schema(
    {
        idBookReservation: {
            type: Number
        },
        username: {
            type: String
        },
        idBook: {
            type: Number
        }
    }
)

export default mongoose.model('bookReservationModel', bookReservationModel, 'booksReservations');
