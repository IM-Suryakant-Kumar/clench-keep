import { Router } from "express";
import {
	getProfile,
	gusetLogin,
	login,
	logout,
	register,
} from "../controllers/auth";
import { authenticateUser } from "../middlewares/authentication";

const router = Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/guest-login").post(gusetLogin);
router.route("/logout").post(logout);
router.route("/me").post(authenticateUser, getProfile);

export default router;
