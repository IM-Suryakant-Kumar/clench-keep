import { IUser } from "index";
import { Schema, model } from "mongoose";

const userSchema = new Schema<IUser>(
	{
		name: { type: String, required: [true, "Please provide name"] },
		email: { type: String, required: [true, "Please provide email"] },
		password: { type: String, required: [true, "Please provide password"] },
	},
	{ timestamps: true }
);

export default model<IUser>("User", userSchema);
