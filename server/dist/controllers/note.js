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
exports.deleteNote = exports.updateNote = exports.createNote = exports.getNotes = void 0;
const models_1 = require("../models");
const getNotes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const notes = yield models_1.Note.find({ userId: req.user._id });
    res.status(200).json({ success: true, notes });
});
exports.getNotes = getNotes;
const createNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const note = yield models_1.Note.create(Object.assign({ userId: req.user._id }, req.body));
    res
        .status(201)
        .json({ success: true, note, message: "Note created successfully" });
});
exports.createNote = createNote;
const updateNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield models_1.Note.findByIdAndUpdate(req.params._id, req.body);
    res.status(200).json({ success: true, message: "Note updated successfully" });
});
exports.updateNote = updateNote;
const deleteNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield models_1.Note.findByIdAndDelete(req.params._id);
    res.status(201).json({ success: true, message: "Note deleted successfully" });
});
exports.deleteNote = deleteNote;
//# sourceMappingURL=note.js.map