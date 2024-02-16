"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
const middlewares_1 = require("../middlewares");
const router = (0, express_1.Router)();
router.route("/register").post(controllers_1.register);
router.route("/login").post(controllers_1.login).get(controllers_1.guestLogin);
router.route("/logout").get(middlewares_1.authenticateUser, controllers_1.logout);
router.route("/me").get(middlewares_1.authenticateUser, controllers_1.getProfile);
exports.default = router;
//# sourceMappingURL=auth.js.map