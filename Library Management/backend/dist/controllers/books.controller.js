"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BooksController = void 0;
const bookModel_1 = __importDefault(require("../models/bookModel"));
class BooksController {
    constructor() {
        this.getBookById = (req, res) => {
            let idBook = req.body.idBook;
            bookModel_1.default.findOne({ 'idBook': idBook }, (err, findedRequests) => {
                if (err)
                    console.log(err);
                else
                    res.json(findedRequests);
            });
        };
        this.getAll = (req, res) => {
            bookModel_1.default.find((err, findedRequests) => {
                if (err)
                    console.log(err);
                else
                    res.json(findedRequests);
            });
        };
        this.updateAmount = (req, res) => {
            let idBook = req.body.idBook;
            let howMuch = req.body.howMuch;
            bookModel_1.default.updateOne({ 'idBook': idBook }, { $inc: { 'amount': howMuch } }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ "message": "ok" });
            });
        };
        this.updateTimesTaken = (req, res) => {
            let idBook = req.body.idBook;
            let howMuch = req.body.howMuch;
            bookModel_1.default.updateOne({ 'idBook': idBook }, { $inc: { 'timesTaken': howMuch } }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ "message": "ok" });
            });
        };
        this.insertBook = (req, res) => {
            let newRequest = new bookModel_1.default({
                idBook: req.body.idBook,
                title: req.body.title,
                writer: req.body.writer,
                genre: req.body.genre,
                publisher: req.body.publisher,
                pubYear: req.body.pubYear,
                language: req.body.language,
                picture: req.body.picture,
                averageRating: null,
                timesTaken: 0,
                amount: 0
            });
            newRequest.save((err, isDone) => {
                if (err) {
                    console.log(err);
                }
                else
                    res.json({ "message": "ok" });
            });
        };
        this.updateBook = (req, res) => {
            let idBook = req.body.idBook;
            let title = req.body.title;
            let writer = req.body.writer;
            let genre = req.body.genre;
            let publisher = req.body.publisher;
            let pubYear = req.body.pubYear;
            let language = req.body.language;
            let picture = req.body.picture;
            let amount = req.body.amount;
            bookModel_1.default.updateOne({ 'idBook': idBook }, { $set: { 'title': title, 'writer': writer, 'genre': genre, 'publisher': publisher, 'pubYear': pubYear, 'language': language, 'picture': picture, 'amount': amount } }, (err, resp) => {
                if (err) {
                    console.log(err);
                }
                else
                    res.json({ "message": "ok" });
            });
        };
        this.deleteBook = (req, res) => {
            let idBook = req.body.idBook;
            bookModel_1.default.deleteOne({ 'idBook': idBook }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'message': 'ok' });
            });
        };
        this.updateRating = (req, res) => {
            let idBook = req.body.idBook;
            let howMuch = req.body.howMuch;
            bookModel_1.default.updateOne({ 'idBook': idBook }, { $set: { 'averageRating': howMuch } }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ "message": "ok" });
            });
        };
    }
}
exports.BooksController = BooksController;
//# sourceMappingURL=books.controller.js.map