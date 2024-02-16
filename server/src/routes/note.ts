import { Router } from "express";
import {
	createNote,
	deleteNote,
	getNotes,
	updateNote,
} from "../controllers";

const router = Router();

router.route("/").get(getNotes).post(createNote);
router.route("/:_id").patch(updateNote).delete(deleteNote);

export default router;
