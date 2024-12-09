"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bookReservation_controller_1 = require("../controllers/bookReservation.controller");
const bookReservationRouter = express_1.default.Router();
bookReservationRouter.route('/getAll').get((req, res) => new bookReservation_controller_1.BookReservationController().getAll(req, res));
bookReservationRouter.route('/insertReservation').post((req, res) => new bookReservation_controller_1.BookReservationController().insertReservation(req, res));
bookReservationRouter.route('/getAllForOneBook').post((req, res) => new bookReservation_controller_1.BookReservationController().getAllForOneBook(req, res));
bookReservationRouter.route('/deleteReservation').post((req, res) => new bookReservation_controller_1.BookReservationController().deleteReservation(req, res));
exports.default = bookReservationRouter;
//# sourceMappingURL=bookReservation.routes.js.map