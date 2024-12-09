"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let reviewModel = new Schema({
    idReview: {
        type: Number
    },
    username: {
        type: String
    },
    rating: {
        type: Number
    },
    idBook: {
        type: Number
    },
    comment: {
        type: String
    },
    date: {
        type: Date
    },
    edited: {
        type: Boolean
    }
});
exports.default = mongoose_1.default.model('reviewModel', reviewModel, 'reviews');
//# sourceMappingURL=review.js.map