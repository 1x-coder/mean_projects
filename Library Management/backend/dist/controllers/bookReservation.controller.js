"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookReservationController = void 0;
const bookReservation_1 = __importDefault(require("../models/bookReservation"));
class BookReservationController {
    constructor() {
        this.getAll = (req, res) => {
            bookReservation_1.default.find((err, findedRequests) => {
                if (err)
                    console.log(err);
                else
                    res.json(findedRequests);
            });
        };
        this.insertReservation = (req, res) => {
            let newRequest = new bookReservation_1.default({
                idBookReservation: req.body.idBookReservation,
                idBook: req.body.idBook,
                username: req.body.username
            });
            newRequest.save((err, isDone) => {
                if (err)
                    console.log(err);
                else
                    res.json({ "message": "ok" });
            });
        };
        this.getAllForOneBook = (req, res) => {
            let idBook = req.body.idBook;
            bookReservation_1.default.find({ 'idBook': idBook }, (err, findedRequests) => {
                if (err)
                    console.log(err);
                else
                    res.json(findedRequests);
            });
        };
        this.deleteReservation = (req, res) => {
            let idBookReservation = req.body.idBookReservation;
            bookReservation_1.default.deleteOne({ 'idBookReservation': idBookReservation }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'message': 'ok' });
            });
        };
    }
}
exports.BookReservationController = BookReservationController;
//# sourceMappingURL=bookReservation.controller.js.map