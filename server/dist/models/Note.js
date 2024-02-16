"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const NoteSchema = new mongoose_1.Schema({
    userId: { type: String, required: true },
    title: { type: String, required: [true, "Please provide title"] },
    content: { type: String, required: [true, "Please provide content"] },
    background: { type: String },
    labels: [{ type: String }],
    isArchived: { type: Boolean, default: false },
    isTrashed: { type: Boolean, default: false },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("Note", NoteSchema);
//# sourceMappingURL=Note.js.map