"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoanController = void 0;
const loanModel_1 = __importDefault(require("../models/loanModel"));
class LoanController {
    constructor() {
        this.getAllFromAllUsers = (req, res) => {
            loanModel_1.default.find((err, findedRequests) => {
                if (err)
                    console.log(err);
                else
                    res.json(findedRequests);
            });
        };
        this.getAll = (req, res) => {
            let username = req.body.username;
            let wantReturned = req.body.wantReturned;
            loanModel_1.default.find({ 'returnedBook': wantReturned, 'username': username }, (err, findedRequests) => {
                if (err)
                    console.log(err);
                else
                    res.json(findedRequests);
            });
        };
        this.getAllBookAndUsername = (req, res) => {
            let username = req.body.username;
            let idBook = req.body.idBook;
            loanModel_1.default.find({ 'username': username, 'idBook': idBook, 'returnedBook': true }, (err, findedRequests) => {
                if (err)
                    console.log(err);
                else
                    res.json(findedRequests);
            });
        };
        this.getAllForOneBook = (req, res) => {
            let idBook = req.body.idBook;
            let wantReturned = req.body.wantReturned;
            loanModel_1.default.find({ 'idBook': idBook, 'returnedBook': wantReturned }, (err, findedRequests) => {
                if (err)
                    console.log(err);
                else
                    res.json(findedRequests);
            });
        };
        this.extendDate = (req, res) => {
            let idLoan = req.body.idLoan;
            let deadLine = req.body.deadLine;
            loanModel_1.default.updateOne({ 'idLoan': idLoan }, { $set: { 'deadLine': deadLine, 'extended': true } }, (err, resp) => {
                if (err) {
                    console.log(err);
                }
                else
                    res.json({ "message": "ok" });
            });
        };
        this.checkIfUserTookBook = (req, res) => {
            let idBook = req.body.idBook;
            let username = req.body.username;
            loanModel_1.default.findOne({ 'idBook': idBook, 'username': username, 'returnedBook': false }, (err, findedRequests) => {
                if (err)
                    console.log(err);
                else
                    res.json(findedRequests);
            });
        };
        this.insertLoan = (req, res) => {
            let newRequest = new loanModel_1.default({
                idLoan: req.body.idLoan,
                idBook: req.body.idBook,
                title: req.body.title,
                deadLine: req.body.deadLine,
                username: req.body.username,
                writer: req.body.writer,
                loanDate: req.body.loanDate,
                returnDate: null,
                picture: req.body.picture,
                processed: false,
                extended: false,
                returnedBook: false
            });
            newRequest.save((err, isDone) => {
                if (err)
                    console.log(err);
                else
                    res.json({ "message": "ok" });
            });
        };
        this.updateReturnedDateAndBook = (req, res) => {
            let idLoan = req.body.idLoan;
            let returnDate = req.body.returnDate;
            let returnedBook = req.body.returnBook;
            loanModel_1.default.updateOne({ 'idLoan': idLoan }, { $set: { 'returnDate': returnDate, 'returnedBook': returnedBook } }, (err, resp) => {
                if (err) {
                    console.log(err);
                }
                else
                    res.json({ "message": "ok" });
            });
        };
    }
}
exports.LoanController = LoanController;
//# sourceMappingURL=loan.controller.js.map