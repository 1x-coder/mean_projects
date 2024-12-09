"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const review_controller_1 = require("../controllers/review.controller");
const reviewRouter = express_1.default.Router();
reviewRouter.route('/getAll').post((req, res) => new review_controller_1.ReviewController().getAll(req, res));
reviewRouter.route('/insertReview').post((req, res) => new review_controller_1.ReviewController().insertReview(req, res));
reviewRouter.route('/getAllFromAllUsers').get((req, res) => new review_controller_1.ReviewController().getAllFromAllUsers(req, res));
reviewRouter.route('/updateReview').post((req, res) => new review_controller_1.ReviewController().updateReview(req, res));
exports.default = reviewRouter;
//# sourceMappingURL=review.routes.js.map