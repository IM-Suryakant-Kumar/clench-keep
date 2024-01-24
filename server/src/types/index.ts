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
	title: string;
	content: string;
	backgound: string;
	labels: string[];
}

export interface INoteReq extends Request {
	body: {
		title: string;
		content: string;
		background?: string;
		labels?: string[];
	};
	params: { _id?: string };
}

// Archive
export interface IArchive extends Document {
	userId: string;
	noteId: string;
}

export interface IArchiveReq extends Request {
	body: { _id?: string };
  params: { _id?: string };
  user: IUser;
}
