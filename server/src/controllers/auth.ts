import { Request, Response } from "express";
import { BadRequestError, UnauthenticatedError } from "../errors";
import { User } from "../models";
import { sendToken } from "../utils";
import { IReq } from "../types";

export const register = async (req: IReq, res: Response) => {
	const { name, email, password } = req.body;

	if (!(name && email && password))
		throw new BadRequestError("Please provide all values");

	const emailAlreadyExists = await User.findOne({ email });
	if (emailAlreadyExists) {
		throw new BadRequestError("Email is already exists");
	}

	const user = await User.create({ name, email, password });

	sendToken(res, 201, user, "Registered Successfuly!");
};

export const login = async (req: IReq, res: Response) => {
	const { email, password } = req.body;

	if (!(email && password))
		throw new BadRequestError("Please provide all values");

	const user = await User.findOne({ email }).select("+password");

	if (!user) throw new UnauthenticatedError("Invalid Credentials!");

	const isPasswordCorrect = await user.comparePassword(password);

	if (!isPasswordCorrect)
		throw new UnauthenticatedError("Invalid Credentials!");

	sendToken(res, 200, user, "Logged in successfully!");
};

export const guestLogin = async (req: Request, res: Response) => {
	const email = process.env.GUEST_EMAIL;
	const password = process.env.GUEST_PASSWORD;

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
	res.status(200).json({ success: true, message: "Successfully logout!" });
};

// get profile
export const getProfile = async (req: IReq, res: Response) => {
	const user = req.user;
	res.status(200).json({ success: true, user });
};
