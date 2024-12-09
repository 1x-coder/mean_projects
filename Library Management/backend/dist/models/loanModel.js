"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let loanModel = new Schema({
    idBook: {
        type: Number
    },
    title: {
        type: String
    },
    deadLine: {
        type: Date
    },
    username: {
        type: String
    },
    writer: {
        type: Array
    },
    loanDate: {
        type: Date
    },
    returnDate: {
        type: Date
    },
    picture: {
        type: String
    },
    processed: {
        type: Boolean
    },
    extended: {
        type: Boolean
    },
    returnedBook: {
        type: Boolean
    },
    idLoan: {
        type: Number
    },
    extendPeriod: {
        type: Number
    }
});
exports.default = mongoose_1.default.model('loanModel', loanModel, 'loan');
//# sourceMappingURL=loanModel.js.map