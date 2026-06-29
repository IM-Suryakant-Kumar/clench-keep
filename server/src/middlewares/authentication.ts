import { NextFunction, Request, Response } from "express";
import { UnauthenticatedError, UnauthorizedError } from "../errors";
import jwt from "jsonwebtoken";
import User from "../models/User";
import { IReq } from "../types";

export const authenticateUser = async (
	req: any,
	res: Response,
	next: NextFunction,
) => {
	const token = req.headers.authorization?.split(" ")[1];

	if (!token || token === "null" || token === "undefined")
		throw new UnauthenticatedError("Authentication Failed!");

	const { _id } = jwt.verify(token, process.env.JWT_SECRET!) as { _id: string };
	req.user = await User.findById(_id);
	next();
};
