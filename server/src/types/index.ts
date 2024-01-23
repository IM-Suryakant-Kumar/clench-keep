import { Request } from "express";
import { Document } from "mongoose";

export interface IReq extends Request {
  body: { name?: string; email?: string; password?: string };
  user?: IUser & { role?: string };
}

// User
export interface IUser extends Document {
	name: string;
	email: string;
	password: string;

	comparePassword: (candidatePassword: string) => Promise<boolean>;
	createJWTToken: () => string;
}


// Note
export interface INote extends Document {
  title: string;
  content: string;
  backgound: string;
  labels: string[];
}
