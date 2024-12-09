import express from 'express';
import { ReviewController } from '../controllers/review.controller';


const reviewRouter = express.Router();


reviewRouter.route('/getAll').post(
    (req, res)=> new ReviewController().getAll(req, res)
)

reviewRouter.route('/insertReview').post(
    (req, res)=> new ReviewController().insertReview(req, res)
)

reviewRouter.route('/getAllFromAllUsers').get(
    (req, res)=> new ReviewController().getAllFromAllUsers(req, res)
)

reviewRouter.route('/updateReview').post(
    (req, res)=> new ReviewController().updateReview(req, res)
)


export default reviewRouter;