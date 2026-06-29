import { Response } from "express";
import { IUser } from "../types";

export const sendToken = (
	res: Response,
	statusCode: number,
	user: IUser,
	message: string,
) => {
	const token = user.createJWTToken();
	res.status(statusCode).json({ success: true, token, message });
};
