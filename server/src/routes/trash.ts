import { Router } from "express";
import { createTrash, restoreTrash } from "../controllers";

const router = Router();

router.route("/create/:_id").patch(createTrash);
router.route("/delete/:_id").patch(restoreTrash);

export default router;
