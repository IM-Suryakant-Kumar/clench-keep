import { IArchive } from "index";
import { Schema, model } from "mongoose";

const ArchiveSchema = new Schema<IArchive>(
	{
		userId: { type: String, required: true },
		noteId: { type: String, required: true },
	},
	{ timestamps: true }
);

export default model<IArchive>("Archive", ArchiveSchema);
