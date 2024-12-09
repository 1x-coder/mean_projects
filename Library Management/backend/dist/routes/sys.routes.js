"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const sys_controller_1 = require("../controllers/sys.controller");
const sysRouter = express_1.default.Router();
sysRouter.route('/getExtendPeriod').get((req, res) => new sys_controller_1.SysController().getExtendPeriod(req, res));
sysRouter.route('/updateExtendPeriod').post((req, res) => new sys_controller_1.SysController().updateExtendPeriod(req, res));
exports.default = sysRouter;
//# sourceMappingURL=sys.routes.js.map