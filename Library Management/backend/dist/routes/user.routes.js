"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
const userRouter = express_1.default.Router();
userRouter.route('/loginToSystem').post((req, res) => new user_controller_1.UserController().loginToSystem(req, res));
userRouter.route('/checkUsername').post((req, res) => new user_controller_1.UserController().checkUsername(req, res));
userRouter.route('/checkEmail').post((req, res) => new user_controller_1.UserController().checkEmail(req, res));
userRouter.route('/updateInfo').post((req, res) => new user_controller_1.UserController().updateInfo(req, res));
userRouter.route('/changePassword').post((req, res) => new user_controller_1.UserController().changePassword(req, res));
userRouter.route('/insertUser').post((req, res) => new user_controller_1.UserController().insertUser(req, res));
userRouter.route('/incNumBook').post((req, res) => new user_controller_1.UserController().incNumBook(req, res));
userRouter.route('/getAll').get((req, res) => new user_controller_1.UserController().getAll(req, res));
userRouter.route('/deleteUser').post((req, res) => new user_controller_1.UserController().deleteUser(req, res));
userRouter.route('/changePrivilegies').post((req, res) => new user_controller_1.UserController().changePrivilegies(req, res));
userRouter.route('/blockOrUnblock').post((req, res) => new user_controller_1.UserController().blockOrUnblock(req, res));
exports.default = userRouter;
//# sourceMappingURL=user.routes.js.map