"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const notification_controller_1 = require("../controllers/notification.controller");
const notificationRouter = express_1.default.Router();
notificationRouter.route('/getAll').get((req, res) => new notification_controller_1.NotificationController().getAll(req, res));
notificationRouter.route('/insertNotification').post((req, res) => new notification_controller_1.NotificationController().insertNotification(req, res));
notificationRouter.route('/getForUser').post((req, res) => new notification_controller_1.NotificationController().getForUser(req, res));
notificationRouter.route('/deleteNotification').post((req, res) => new notification_controller_1.NotificationController().deleteNotification(req, res));
exports.default = notificationRouter;
//# sourceMappingURL=notification.routes.js.map