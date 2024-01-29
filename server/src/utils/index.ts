import { Response } from "express";
import { IUser } from "index";

export const sendToken = (
	res: Response,
	statusCode: number,
	user: IUser,
	message: string
) => {
	const token = user.createJWTToken();

	const COOKIE_LIFETIME: number = Number(process.env.COOKIE_LIFETIME);
	res
		.cookie("token", token, {
			expires: new Date(Date.now() + COOKIE_LIFETIME * 24 * 60 * 60 * 1000),
			httpOnly: true,
		})
		.status(statusCode)
		.json({ success: true, token, message });
};
