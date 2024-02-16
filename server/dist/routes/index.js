"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.trashRouter = exports.archiveRouter = exports.noteRouter = exports.authRouter = void 0;
var auth_1 = require("./auth");
Object.defineProperty(exports, "authRouter", { enumerable: true, get: function () { return __importDefault(auth_1).default; } });
var note_1 = require("./note");
Object.defineProperty(exports, "noteRouter", { enumerable: true, get: function () { return __importDefault(note_1).default; } });
var archive_1 = require("./archive");
Object.defineProperty(exports, "archiveRouter", { enumerable: true, get: function () { return __importDefault(archive_1).default; } });
var trash_1 = require("./trash");
Object.defineProperty(exports, "trashRouter", { enumerable: true, get: function () { return __importDefault(trash_1).default; } });
//# sourceMappingURL=index.js.map