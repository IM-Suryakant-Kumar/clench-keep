import { Router } from "express";
import {
	getProfile,
	guestLogin,
	login,
	logout,
	register,
} from "../controllers";
import { authenticateUser } from "../middlewares";

const router = Router();

router.route("/register").post(register);
router.route("/login").post(login).get(guestLogin);
router.route("/logout").get(authenticateUser, logout);
router.route("/me").get(authenticateUser, getProfile);

export default router;
