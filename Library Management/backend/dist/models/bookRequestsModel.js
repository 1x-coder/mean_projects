"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let bookRequestsModel = new Schema({
    idBookRequest: {
        type: Number
    },
    username: {
        type: String
    },
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
    picture: {
        type: String
    },
    processed: {
        type: Boolean
    }
});
exports.default = mongoose_1.default.model('bookRequestsModel', bookRequestsModel, 'bookRequests');
//# sourceMappingURL=bookRequestsModel.js.map