import { Request } from "express";
import { Document } from "mongoose";

// User
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

// Note
export interface INote extends Document {
  userId: string;
	title: string;
	content: string;
	background: string;
	labels: string[];
  isArchived: boolean;
  isTrashed: boolean;
}

export interface INoteReq extends Request {
	body: {
		title: string;
		content: string;
		background?: string;
		labels?: string[];
	};
  user: IUser;
	params: { _id?: string };
}