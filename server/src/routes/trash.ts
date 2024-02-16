import { Router } from "express";
import {
	createTrash,
	deleteTrash
} from "../controllers";

const router = Router();

router.route("/create/:_id").patch(createTrash);
router.route("/delete/:_id").patch(deleteTrash);

export default router;
