"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationController = void 0;
const notification_1 = __importDefault(require("../models/notification"));
class NotificationController {
    constructor() {
        this.getAll = (req, res) => {
            notification_1.default.find((err, findedRequests) => {
                if (err)
                    console.log(err);
                else
                    res.json(findedRequests);
            });
        };
        this.insertNotification = (req, res) => {
            let newRequest = new notification_1.default({
                idNotification: req.body.idNotification,
                username: req.body.username,
                text: req.body.text,
                always: req.body.always
            });
            newRequest.save((err, isDone) => {
                if (err)
                    console.log(err);
                else
                    res.json({ "message": "ok" });
            });
        };
        this.getForUser = (req, res) => {
            let username = req.body.username;
            notification_1.default.find({ 'username': username }, (err, findedRequests) => {
                if (err)
                    console.log(err);
                else
                    res.json(findedRequests);
            });
        };
        this.deleteNotification = (req, res) => {
            let idNotification = req.body.idNotification;
            notification_1.default.deleteOne({ 'idNotification': idNotification }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'message': 'ok' });
            });
        };
    }
}
exports.NotificationController = NotificationController;
//# sourceMappingURL=notification.controller.js.map