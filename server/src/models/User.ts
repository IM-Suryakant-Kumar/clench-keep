import { IUser } from "index";
import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const UserSchema = new Schema<IUser>(
	{
		name: {
			type: String,
			minlength: [3, "name should not be less than 3 characters"],
			required: [true, "Please provide name"],
		},
		email: {
			type: String,
			required: [true, "Please provide email"],
			unique: true,
		},
		password: {
			type: String,
			minlength: [4, "password should not be less than 4 chracters"],
			required: [true, "Please provide password"],
			select: false,
		},
	},
	{ timestamps: true }
);

UserSchema.pre("save", async function () {
	if (!this.isModified("password")) return;
	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.comparePassword = async function (
	candidatePassword: string
) {
	return await bcrypt.compare(candidatePassword, this.password);
};

UserSchema.methods.createJWTToken = function () {
	const JWT_SECRET: string = process.env.JWT_SECRET;
	const JWT_LIFETIME: string = process.env.JWT_LIFETIME;

	return jwt.sign({ _id: this._id, name: this.name }, JWT_SECRET, {
		expiresIn: JWT_LIFETIME,
	});
};

export default model<IUser>("User", UserSchema);
