import { Router } from "express";
import { addToArchive, restoreFromArchive } from "../controllers";

const router = Router();

router.route("/add/:_id").patch(addToArchive);
router.route("/restore/:_id").patch(restoreFromArchive);

export default router;
