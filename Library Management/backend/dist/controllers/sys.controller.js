"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SysController = void 0;
const sysModel_1 = __importDefault(require("../models/sysModel"));
class SysController {
    constructor() {
        this.getExtendPeriod = (req, res) => {
            sysModel_1.default.findOne({ 'id': 1 }, (err, findedRequests) => {
                if (err)
                    console.log(err);
                else
                    res.json(findedRequests);
            });
        };
        this.updateExtendPeriod = (req, res) => {
            let extendPeriod = req.body.extendPeriod;
            sysModel_1.default.updateOne({ 'id': 1 }, { $set: { 'extendPeriod': extendPeriod } }, (err, resp) => {
                if (err) {
                    console.log(err);
                }
                else
                    res.json({ "message": "ok" });
            });
        };
    }
}
exports.SysController = SysController;
//# sourceMappingURL=sys.controller.js.map