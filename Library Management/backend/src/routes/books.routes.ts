import express from 'express';
import { BooksController } from '../controllers/books.controller';



const booksRouter = express.Router();


booksRouter.route('/getBookById').post(
    (req, res)=> new BooksController().getBookById(req, res)
)


booksRouter.route('/updateAmount').post(
    (req, res)=> new BooksController().updateAmount(req, res)
)

booksRouter.route('/updateTimesTaken').post(
    (req, res)=> new BooksController().updateTimesTaken(req, res)
)

booksRouter.route('/getAll').get(
    (req, res)=> new BooksController().getAll(req, res)
)

booksRouter.route('/insertBook').post(
    (req, res)=> new BooksController().insertBook(req, res)
)

booksRouter.route('/updateBook').post(
    (req, res)=> new BooksController().updateBook(req, res)
)

booksRouter.route('/deleteBook').post(
    (req, res)=> new BooksController().deleteBook(req, res)
)

booksRouter.route('/updateRating').post(
    (req, res)=> new BooksController().updateRating(req, res)
)



export default booksRouter;

