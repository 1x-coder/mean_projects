import express from 'express';
import { NotificationController } from '../controllers/notification.controller';


const notificationRouter = express.Router();


notificationRouter.route('/getAll').get(
    (req, res)=> new NotificationController().getAll(req, res)
)

notificationRouter.route('/insertNotification').post(
    (req, res)=> new NotificationController().insertNotification(req, res)
)

notificationRouter.route('/getForUser').post(
    (req, res)=> new NotificationController().getForUser(req, res)
)

notificationRouter.route('/deleteNotification').post(
    (req, res)=> new NotificationController().deleteNotification(req, res)
)




export default notificationRouter;