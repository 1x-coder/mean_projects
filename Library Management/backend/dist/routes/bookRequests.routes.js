"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bookRequests_controller_1 = require("../controllers/bookRequests.controller");
const bookRequestsRouter = express_1.default.Router();
bookRequestsRouter.route('/getAll').get((req, res) => new bookRequests_controller_1.BookRequestsController().getAll(req, res));
bookRequestsRouter.route('/insertRequest').post((req, res) => new bookRequests_controller_1.BookRequestsController().insertRequest(req, res));
bookRequestsRouter.route('/delete').post((req, res) => new bookRequests_controller_1.BookRequestsController().delete(req, res));
exports.default = bookRequestsRouter;
//# sourceMappingURL=bookRequests.routes.js.map