"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const loan_controller_1 = require("../controllers/loan.controller");
const loanRouter = express_1.default.Router();
loanRouter.route('/getAll').post((req, res) => new loan_controller_1.LoanController().getAll(req, res));
loanRouter.route('/getAllForOneBook').post((req, res) => new loan_controller_1.LoanController().getAllForOneBook(req, res));
loanRouter.route('/extendDate').post((req, res) => new loan_controller_1.LoanController().extendDate(req, res));
loanRouter.route('/checkIfUserTookBook').post((req, res) => new loan_controller_1.LoanController().checkIfUserTookBook(req, res));
loanRouter.route('/insertLoan').post((req, res) => new loan_controller_1.LoanController().insertLoan(req, res));
loanRouter.route('/getAllBookAndUsername').post((req, res) => new loan_controller_1.LoanController().getAllBookAndUsername(req, res));
loanRouter.route('/updateReturnedDateAndBook').post((req, res) => new loan_controller_1.LoanController().updateReturnedDateAndBook(req, res));
loanRouter.route('/getAllFromAllUsers').get((req, res) => new loan_controller_1.LoanController().getAllFromAllUsers(req, res));
exports.default = loanRouter;
//# sourceMappingURL=loan.routes.js.map