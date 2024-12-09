"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const books_controller_1 = require("../controllers/books.controller");
const booksRouter = express_1.default.Router();
booksRouter.route('/getBookById').post((req, res) => new books_controller_1.BooksController().getBookById(req, res));
booksRouter.route('/updateAmount').post((req, res) => new books_controller_1.BooksController().updateAmount(req, res));
booksRouter.route('/updateTimesTaken').post((req, res) => new books_controller_1.BooksController().updateTimesTaken(req, res));
booksRouter.route('/getAll').get((req, res) => new books_controller_1.BooksController().getAll(req, res));
booksRouter.route('/insertBook').post((req, res) => new books_controller_1.BooksController().insertBook(req, res));
booksRouter.route('/updateBook').post((req, res) => new books_controller_1.BooksController().updateBook(req, res));
booksRouter.route('/deleteBook').post((req, res) => new books_controller_1.BooksController().deleteBook(req, res));
booksRouter.route('/updateRating').post((req, res) => new books_controller_1.BooksController().updateRating(req, res));
exports.default = booksRouter;
//# sourceMappingURL=books.routes.js.map