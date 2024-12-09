"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestsController = void 0;
const requests_1 = __importDefault(require("../models/requests"));
class RequestsController {
    constructor() {
        this.insertRequest = (req, res) => {
            let newRequest = new requests_1.default({
                username: req.body.username,
                password: req.body.password,
                name: req.body.name,
                lastName: req.body.lastName,
                address: req.body.address,
                contact: req.body.contact,
                email: req.body.email,
                type: req.body.type,
                picture: req.body.picture,
                status: req.body.status,
                processed: false
            });
            newRequest.save((err, isDone) => {
                if (err) {
                    console.log(err);
                }
                else
                    res.json({ "message": "ok" });
            });
        };
        this.getAll = (req, res) => {
            requests_1.default.find({ 'status': "na cekanju" }, (err, findedRequests) => {
                if (err)
                    console.log(err);
                else
                    res.json(findedRequests);
            });
        };
        this.setStatus = (req, res) => {
            let username = req.body.username;
            let status = req.body.status;
            requests_1.default.updateOne({ 'username': username }, { $set: { 'status': status, 'processed': "true" } }, (err, resp) => {
                if (err) {
                    console.log(err);
                }
                else
                    res.json({ "message": "ok" });
            });
        };
    }
}
exports.RequestsController = RequestsController;
//# sourceMappingURL=requests.controller.js.map