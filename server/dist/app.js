"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("express-async-errors");
const dotenv_1 = require("dotenv");
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./db"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const middlewares_1 = require("./middlewares");
const routes_1 = require("./routes");
(0, dotenv_1.config)();
const app = (0, express_1.default)();
// constant
const PORT = parseInt(process.env.PORT, 10) || 4000;
const CLIENT_URL = process.env.CLIENT_URL;
const MONGO_URL = process.env.MONGO_URL;
// middleware
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, helmet_1.default)());
app.use((0, morgan_1.default)("tiny"));
app.use((0, cors_1.default)({ origin: CLIENT_URL, credentials: true }));
app.use((0, cookie_parser_1.default)());
// routers
app.use("/auth", routes_1.authRouter);
app.use("/note", middlewares_1.authenticateUser, routes_1.noteRouter);
app.use("/archive", middlewares_1.authenticateUser, routes_1.archiveRouter);
app.use("/trash", middlewares_1.authenticateUser, routes_1.trashRouter);
app.use(middlewares_1.notFoundMiddleware);
app.use(middlewares_1.errorHandlerMiddleware);
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, db_1.default)(MONGO_URL);
        app.listen(PORT, () => console.log(`Server is listening on port ${PORT}...`));
    }
    catch (error) {
        console.error(error);
    }
});
start();
//# sourceMappingURL=app.js.map