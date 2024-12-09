"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewController = void 0;
const review_1 = __importDefault(require("../models/review"));
class ReviewController {
    constructor() {
        this.getAll = (req, res) => {
            let idBook = req.body.idBook;
            review_1.default.find({ 'idBook': idBook }, (err, findedRequests) => {
                if (err)
                    console.log(err);
                else
                    res.json(findedRequests);
            });
        };
        this.getAllFromAllUsers = (req, res) => {
            review_1.default.find((err, findedRequests) => {
                if (err)
                    console.log(err);
                else
                    res.json(findedRequests);
            });
        };
        this.insertReview = (req, res) => {
            let newRequest = new review_1.default({
                idReview: req.body.idReview,
                username: req.body.username,
                rating: req.body.rating,
                idBook: req.body.idBook,
                comment: req.body.comment,
                date: req.body.date,
                edited: req.body.edited
            });
            newRequest.save((err, isDone) => {
                if (err) {
                    console.log(err);
                }
                else
                    res.json({ "message": "ok" });
            });
        };
        this.updateReview = (req, res) => {
            let idReview = req.body.idReview;
            let rating = req.body.rating;
            let comment = req.body.comment;
            let date = req.body.date;
            let edited = req.body.edited;
            review_1.default.updateOne({ 'idReview': idReview }, { $set: { 'rating': rating, 'comment': comment, 'date': date, 'edited': edited } }, (err, resp) => {
                if (err) {
                    console.log(err);
                }
                else
                    res.json({ "message": "ok" });
            });
        };
    }
}
exports.ReviewController = ReviewController;
//# sourceMappingURL=review.controller.js.map