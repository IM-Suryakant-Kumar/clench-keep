import { NextFunction, Request, Response } from "express";

export const errorHandlerMiddleware = (
	err: { statusCode: number; message: string } | any,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const customError = {
		statusCode: err.statusCode || 500,
		message: err.message || "Something went wrong",
	};

	res
		.status(customError.statusCode)
		.json({ success: false, message: customError.message });
};
