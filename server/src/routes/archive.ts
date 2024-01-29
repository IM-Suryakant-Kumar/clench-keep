import { Router } from "express";
import {
	createArchive,
	deleteArchive,
	getArchive,
	getArchives,
	updateArchive,
} from "../controllers";

const router = Router();

router.route("/").get(getArchives).post(createArchive);
router
	.route("/:noteId")
	.get(getArchive)
	.patch(updateArchive)
	.delete(deleteArchive);

export default router;
