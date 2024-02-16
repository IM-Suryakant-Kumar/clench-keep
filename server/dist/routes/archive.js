"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
const router = (0, express_1.Router)();
router.route("/add/:_id").patch(controllers_1.addToArchive);
router.route("/restore/:_id").patch(controllers_1.restoreFromArchive);
exports.default = router;
//# sourceMappingURL=archive.js.map