import { Request, Response } from "express";
import { IReq } from "index";
import { BadRequestError, UnauthenticatedError } from "../errors";
import User from "../modles/User";
import sendToken from "../utils/sendToken";

export const register = async (req: Request, res: Response) => {
	const {
		body: { name, email, password },
	} = req as IReq;

	if (!(name && email && password))
		throw new BadRequestError("Please provide all values");

	const user = await User.create({ name, email, password });

	sendToken(res, 201, user, "Registered Successfuly!");
};

export const login = async (req: Request, res: Response) => {
	const {
		body: { email, password },
	} = req as IReq;

	if (!(email && password))
		throw new BadRequestError("Please provide all values");

	const user = await User.findOne({ email }).select("+password");

	if (!user) throw new UnauthenticatedError("Invalid Credentials!");

	const isPasswordCorrect = await user.comparePassword(password);

	if (!isPasswordCorrect)
		throw new UnauthenticatedError("Invalid Credentials!");

	sendToken(res, 200, user, "Logged in successfully!");
};

export const gusetLogin = async (req: Request, res: Response) => {
	const email: string = process.env.GUEST_EMAIL;
	const password: string = process.env.GUEST_PASSWORD;

	if (!(email && password))
		throw new BadRequestError("Please provide all values");

	const user = await User.findOne({ email }).select("+password");

	if (!user) throw new UnauthenticatedError("Invalid Credentials!");

	const isPasswordCorrect = await user.comparePassword(password);

	if (!isPasswordCorrect)
		throw new UnauthenticatedError("Invalid Credentials!");

	sendToken(res, 200, user, "Logged in successfully!");
};

export const logout = async (req: Request, res: Response) => {
	res.cookie("token", null, { expires: new Date(Date.now()), httpOnly: true });
};

// get profile
export const getProfile = async (req: Request, res: Response) => {
	const { user } = req as IReq;
	res.status(200).json({ success: true, user });
};
