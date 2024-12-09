import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import userRouter from './routes/user.routes';
import requestsRouter from './routes/requests.routes';
import loanRouter from './routes/loan.routes';
import booksRouter from './routes/books.routes';
import sysRouter from './routes/sys.routes';
import bookRequestsRouter from './routes/bookRequests.routes';
import reviewRouter from './routes/review.routes';
import bookReservationRouter from './routes/bookReservation.routes';
import notificationRouter from './routes/notification.routes';

const app = express();
app.use(cors())
app.use(express.json({limit: '50mb'}))


mongoose.connect('mongodb://localhost:27017/meanStackProject')
const connection = mongoose.connection
connection.once('open', ()=>{
    console.log('db connected')
})

const router = express.Router();
router.use('/users', userRouter);
router.use('/requests', requestsRouter);
router.use('/loan', loanRouter);
router.use('/books', booksRouter);
router.use('/sysService', sysRouter);
router.use('/bookRequests', bookRequestsRouter);
router.use('/review', reviewRouter);
router.use('/bookReservations', bookReservationRouter);
router.use('/notification', notificationRouter);



app.use('/', router);
app.listen(4000, () => console.log(`Express server running on port 4000`));