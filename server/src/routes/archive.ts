import { Router } from "express";
import { deleteArchive, getArchives } from "../controllers/archive";

const router = Router();

router.route("/").get(getArchives);
router.route("/noteId").post(getArchives);
router.route("/:noteId").delete(deleteArchive);

export default router;
