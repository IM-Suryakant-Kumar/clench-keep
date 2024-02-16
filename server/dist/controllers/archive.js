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
exports.restoreFromArchive = exports.addToArchive = void 0;
const models_1 = require("../models");
const addToArchive = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield models_1.Note.findByIdAndUpdate(req.params._id, { isArchived: true });
    res.status(200).json({ success: true, message: "Note Added to archive" });
});
exports.addToArchive = addToArchive;
const restoreFromArchive = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield models_1.Note.findByIdAndUpdate(req.params._id, { isArchived: false });
    res
        .status(200)
        .json({ success: true, message: "Note restored from Archive" });
});
exports.restoreFromArchive = restoreFromArchive;
//# sourceMappingURL=archive.js.map