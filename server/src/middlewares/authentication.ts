import { NextFunction, Request, Response } from "express";
import { UnauthenticatedError, UnauthorizedError } from "../errors";
import jwt from "jsonwebtoken";
import User from "../models/User";
import { IReq } from "../types";

export const authenticateUser = async (
	req: any,
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
  
	const { _id } = jwt.verify(token, process.env.JWT_SECRET!) as { _id: string };
	req.user = await User.findById(_id);
	next();
};
