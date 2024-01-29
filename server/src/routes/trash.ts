import { Router } from "express";
import {
	createTrash,
	deleteTrash,
	getTrash,
	getTrashes,
	updateTrash,
} from "../controllers";

const router = Router();

router.route("/").get(getTrashes).post(createTrash);
router
	.route("/:noteId")
	.get(getTrash)
	.patch(updateTrash)
	.delete(deleteTrash);

export default router;
