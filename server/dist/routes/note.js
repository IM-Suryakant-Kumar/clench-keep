"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
const router = (0, express_1.Router)();
router.route("/").get(controllers_1.getNotes).post(controllers_1.createNote);
router.route("/:_id").patch(controllers_1.updateNote).delete(controllers_1.deleteNote);
exports.default = router;
//# sourceMappingURL=note.js.map