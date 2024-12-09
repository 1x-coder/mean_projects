"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookRequestsController = void 0;
const bookRequestsModel_1 = __importDefault(require("../models/bookRequestsModel"));
class BookRequestsController {
    constructor() {
        this.getAll = (req, res) => {
            bookRequestsModel_1.default.find((err, findedRequests) => {
                if (err)
                    console.log(err);
                else
                    res.json(findedRequests);
            });
        };
        this.insertRequest = (req, res) => {
            let newRequest = new bookRequestsModel_1.default({
                idBookRequest: req.body.idBookRequest,
                username: req.body.username,
                title: req.body.title,
                writer: req.body.writer,
                genre: req.body.genre,
                publisher: req.body.publisher,
                pubYear: req.body.pubYear,
                language: req.body.language,
                picture: req.body.picture,
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
        this.delete = (req, res) => {
            let idBookRequest = req.body.idBookRequest;
            bookRequestsModel_1.default.deleteOne({ 'idBookRequest': idBookRequest }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'message': 'ok' });
            });
        };
    }
}
exports.BookRequestsController = BookRequestsController;
//# sourceMappingURL=bookRequests.controller.js.map