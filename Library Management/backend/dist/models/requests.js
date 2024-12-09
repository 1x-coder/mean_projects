"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let modelReq = new Schema({
    username: {
        type: String
    },
    password: {
        type: String
    },
    name: {
        type: String
    },
    lastName: {
        type: String
    },
    address: {
        type: String
    },
    contact: {
        type: String
    },
    email: {
        type: String
    },
    type: {
        type: String
    },
    picture: {
        type: String
    },
    status: {
        type: String
    },
    processed: {
        type: Boolean
    }
});
exports.default = mongoose_1.default.model('Requests', modelReq, 'requests');
//# sourceMappingURL=requests.js.map