import { Router } from "express";
import { AddToTrash, restoreFromTrash } from "../controllers";

const router = Router();

router.route("/add/:_id").patch(AddToTrash);
router.route("/restore/:_id").patch(restoreFromTrash);

export default router;
