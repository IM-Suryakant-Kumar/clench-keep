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
exports.restoreFromTrash = exports.AddToTrash = void 0;
const models_1 = require("../models");
const AddToTrash = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield models_1.Note.findByIdAndUpdate(req.params._id, { isTrashed: true });
    res.status(201).json({ success: true, message: "Note Added to trash" });
});
exports.AddToTrash = AddToTrash;
const restoreFromTrash = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield models_1.Note.findByIdAndUpdate(req.params._id, { isTrashed: false });
    res.status(200).json({ success: true, message: "Note restored from trash" });
});
exports.restoreFromTrash = restoreFromTrash;
//# sourceMappingURL=trash.js.map