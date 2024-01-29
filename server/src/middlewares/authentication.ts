import { NextFunction, Request, Response } from "express";
import { UnauthenticatedError, UnauthorizedError } from "../errors";
import jwt from "jsonwebtoken";
import User from "../models/User";
import { IReq } from "index";

export const authenticateUser = async (
	req: IReq,
	res: Response,
	next: NextFunction
) => {
	let { token } = req.cookies;

	if (!token || token === "undefined") {
		const authHeader = req.headers.authorization;
		if (!authHeader || !authHeader.startsWith("Bearer"))
			throw new UnauthenticatedError("Authentication Failed!");
		token = authHeader.split(" ")[1];
	}

	if (!token || token === "null" || token === "undefined")
		throw new UnauthenticatedError("Authentication Failed!");

	const JWT_SECRET: string = process.env.JWT_SECRET;
	const { _id } = jwt.verify(token, JWT_SECRET) as { _id: string };
	req.user = await User.findById(_id);
	next();
};

export const authorizedUser = (...roles: string[]) => {
	return (req: IReq, res: Response, next: NextFunction) => {
		if (!roles.includes(req.user.role))
			throw new UnauthorizedError("Unauthorized to access this route!");
		next();
	};
};
