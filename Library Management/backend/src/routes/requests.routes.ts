import express from 'express';
import { RequestsController } from '../controllers/requests.controller';


const requestsRouter = express.Router();

requestsRouter.route('/insertRequest').post(
    (req, res)=> new RequestsController().insertRequest(req, res)
)


requestsRouter.route('/setStatus').post(
    (req, res)=> new RequestsController().setStatus(req, res)
)

requestsRouter.route('/getAll').get(
    (req, res)=> new RequestsController().getAll(req, res)
)





export default requestsRouter;