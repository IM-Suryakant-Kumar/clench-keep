import { Request } from "express";
import { Document } from "mongoose";

export interface IUser extends Document {
	name: string;
	email: string;
	password: string;

	comparePassword: (candidatePassword: string) => Promise<boolean>;
	createJWTToken: () => string;
}

export interface IReq extends Request {
	body: { name?: string; email?: string; password?: string };
  user?: IUser & { role?: string };
}
