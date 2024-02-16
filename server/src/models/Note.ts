import { INote } from "index";
import { Schema, model } from "mongoose";

const NoteSchema = new Schema<INote>(
	{
		userId: { type: String, required: true },
		title: { type: String, required: [true, "Please provide title"] },
		content: { type: String, required: [true, "Please provide content"] },
		background: { type: String },
		labels: [{ type: String }],
    isArchived: { type: Boolean, default: false},
    isTrashed: { type: Boolean, default: false},
	},
	{ timestamps: true }
);

export default model<INote>("Note", NoteSchema);
