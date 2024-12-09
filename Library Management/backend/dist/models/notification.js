"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let NotificationModel = new Schema({
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
});
exports.default = mongoose_1.default.model('notificationModel', NotificationModel, 'notifications');
//# sourceMappingURL=notification.js.map