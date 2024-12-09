"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let bookModel = new Schema({
    idBook: {
        type: Number
    },
    title: {
        type: String
    },
    writer: {
        type: Array
    },
    genre: {
        type: Array
    },
    publisher: {
        type: String
    },
    pubYear: {
        type: Number
    },
    language: {
        type: String
    },
    averageRating: {
        type: Number
    },
    timesTaken: {
        type: Number
    },
    amount: {
        type: Number
    },
    picture: {
        type: String
    }
});
exports.default = mongoose_1.default.model('bookModel', bookModel, 'books');
//# sourceMappingURL=bookModel.js.map