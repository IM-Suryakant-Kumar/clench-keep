"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendToken = void 0;
const sendToken = (res, statusCode, user, message) => {
    const token = user.createJWTToken();
    const COOKIE_LIFETIME = Number(process.env.COOKIE_LIFETIME);
    res
        .cookie("token", token, {
        expires: new Date(Date.now() + COOKIE_LIFETIME * 24 * 60 * 60 * 1000),
        httpOnly: true,
    })
        .status(statusCode)
        .json({ success: true, token, message });
};
exports.sendToken = sendToken;
//# sourceMappingURL=index.js.map