import { ITrash } from "index";
import { Schema, model } from "mongoose";

const TrashSchema = new Schema<ITrash>(
	{
		userId: { type: String, required: true },
		noteId: { type: String, required: true },
	},
	{ timestamps: true }
);

export default model<ITrash>("Trash", TrashSchema);
