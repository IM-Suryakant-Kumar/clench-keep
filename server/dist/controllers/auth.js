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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProfile = exports.logout = exports.guestLogin = exports.login = exports.register = void 0;
const errors_1 = require("../errors");
const models_1 = require("../models");
const utils_1 = require("../utils");
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    if (!(name && email && password))
        throw new errors_1.BadRequestError("Please provide all values");
    const emailAlreadyExists = yield models_1.User.findOne({ email });
    if (emailAlreadyExists) {
        throw new errors_1.BadRequestError("Email is already exists");
    }
    const user = yield models_1.User.create({ name, email, password });
    (0, utils_1.sendToken)(res, 201, user, "Registered Successfuly!");
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!(email && password))
        throw new errors_1.BadRequestError("Please provide all values");
    const user = yield models_1.User.findOne({ email }).select("+password");
    if (!user)
        throw new errors_1.UnauthenticatedError("Invalid Credentials!");
    const isPasswordCorrect = yield user.comparePassword(password);
    if (!isPasswordCorrect)
        throw new errors_1.UnauthenticatedError("Invalid Credentials!");
    (0, utils_1.sendToken)(res, 200, user, "Logged in successfully!");
});
exports.login = login;
const guestLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = process.env.GUEST_EMAIL;
    const password = process.env.GUEST_PASSWORD;
    if (!(email && password))
        throw new errors_1.BadRequestError("Please provide all values");
    const user = yield models_1.User.findOne({ email }).select("+password");
    if (!user)
        throw new errors_1.UnauthenticatedError("Invalid Credentials!");
    const isPasswordCorrect = yield user.comparePassword(password);
    if (!isPasswordCorrect)
        throw new errors_1.UnauthenticatedError("Invalid Credentials!");
    (0, utils_1.sendToken)(res, 200, user, "Logged in successfully!");
});
exports.guestLogin = guestLogin;
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res
        .cookie("token", null, { expires: new Date(Date.now()), httpOnly: true })
        .status(200)
        .json({ success: true, message: "Successfully logout!" });
});
exports.logout = logout;
// get profile
const getProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    res.status(200).json({ success: true, user });
});
exports.getProfile = getProfile;
//# sourceMappingURL=auth.js.map