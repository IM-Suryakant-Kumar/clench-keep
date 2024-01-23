import { Router } from "express";
import {
	createNote,
	deleteNote,
	getNote,
	getNotes,
	updateNote,
} from "../controllers/note";

const router = Router();

router.route("/").get(getNotes);
router
	.route("/_id")
	.post(createNote)
	.get(getNote)
	.patch(updateNote)
	.delete(deleteNote);

export default router;
