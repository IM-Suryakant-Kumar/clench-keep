import { Router } from "express";
import { createArchive, deleteArchive } from "../controllers";

const router = Router();

router.route("/create/:_id").patch(createArchive);
router.route("/delete/:_id").patch(deleteArchive);

export default router;
