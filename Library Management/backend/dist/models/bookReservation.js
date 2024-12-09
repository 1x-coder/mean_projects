"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let bookReservationModel = new Schema({
    idBookReservation: {
        type: Number
    },
    username: {
        type: String
    },
    idBook: {
        type: Number
    }
});
exports.default = mongoose_1.default.model('bookReservationModel', bookReservationModel, 'booksReservations');
//# sourceMappingURL=bookReservation.js.map