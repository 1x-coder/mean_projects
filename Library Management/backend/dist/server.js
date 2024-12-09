"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const requests_routes_1 = __importDefault(require("./routes/requests.routes"));
const loan_routes_1 = __importDefault(require("./routes/loan.routes"));
const books_routes_1 = __importDefault(require("./routes/books.routes"));
const sys_routes_1 = __importDefault(require("./routes/sys.routes"));
const bookRequests_routes_1 = __importDefault(require("./routes/bookRequests.routes"));
const review_routes_1 = __importDefault(require("./routes/review.routes"));
const bookReservation_routes_1 = __importDefault(require("./routes/bookReservation.routes"));
const notification_routes_1 = __importDefault(require("./routes/notification.routes"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json({ limit: '50mb' }));
mongoose_1.default.connect('mongodb://localhost:27017/meanStackProject');
const connection = mongoose_1.default.connection;
connection.once('open', () => {
    console.log('db connected');
});
const router = express_1.default.Router();
router.use('/users', user_routes_1.default);
router.use('/requests', requests_routes_1.default);
router.use('/loan', loan_routes_1.default);
router.use('/books', books_routes_1.default);
router.use('/sysService', sys_routes_1.default);
router.use('/bookRequests', bookRequests_routes_1.default);
router.use('/review', review_routes_1.default);
router.use('/bookReservations', bookReservation_routes_1.default);
router.use('/notification', notification_routes_1.default);
app.use('/', router);
app.listen(4000, () => console.log(`Express server running on port 4000`));
//# sourceMappingURL=server.js.map