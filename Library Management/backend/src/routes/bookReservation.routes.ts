import express from 'express';
import { BookReservationController } from '../controllers/bookReservation.controller';




const bookReservationRouter = express.Router();


bookReservationRouter.route('/getAll').get(
    (req, res)=> new BookReservationController().getAll(req, res)
)


bookReservationRouter.route('/insertReservation').post(
    (req, res)=> new BookReservationController().insertReservation(req, res)
)

bookReservationRouter.route('/getAllForOneBook').post(
    (req, res)=> new BookReservationController().getAllForOneBook(req, res)
)

bookReservationRouter.route('/deleteReservation').post(
    (req, res)=> new BookReservationController().deleteReservation(req, res)
)





export default bookReservationRouter;

