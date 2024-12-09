
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let NotificationModel = new Schema(
    {
        username: {
            type: String
        },
        text: {
            type: String
        },
        idNotification: {
            type: Number
        },
        always: {
            type: Boolean
        }

    }
)

export default mongoose.model('notificationModel', NotificationModel, 'notifications');
