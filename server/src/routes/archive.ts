import { Router } from "express";
import { createArchive, restoreArchive } from "../controllers";

const router = Router();

router.route("/create/:_id").patch(createArchive);
router.route("/delete/:_id").patch(restoreArchive);

export default router;
