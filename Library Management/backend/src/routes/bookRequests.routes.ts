import express from 'express';
import { BookRequestsController } from '../controllers/bookRequests.controller';




const bookRequestsRouter = express.Router();



bookRequestsRouter.route('/getAll').get(
    (req, res)=> new BookRequestsController().getAll(req, res)
)

bookRequestsRouter.route('/insertRequest').post(
    (req, res)=> new BookRequestsController().insertRequest(req, res)
)

bookRequestsRouter.route('/delete').post(
    (req, res)=> new BookRequestsController().delete(req, res)
)







export default bookRequestsRouter;

