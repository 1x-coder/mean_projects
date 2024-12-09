"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const requests_controller_1 = require("../controllers/requests.controller");
const requestsRouter = express_1.default.Router();
requestsRouter.route('/insertRequest').post((req, res) => new requests_controller_1.RequestsController().insertRequest(req, res));
requestsRouter.route('/setStatus').post((req, res) => new requests_controller_1.RequestsController().setStatus(req, res));
requestsRouter.route('/getAll').get((req, res) => new requests_controller_1.RequestsController().getAll(req, res));
exports.default = requestsRouter;
//# sourceMappingURL=requests.routes.js.map