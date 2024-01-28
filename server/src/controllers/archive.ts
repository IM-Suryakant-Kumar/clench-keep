import { Response } from "express";
import { IArchiveReq } from "index";
import { Archive } from "../models";

export const getArchives = async (req: IArchiveReq, res: Response) => {
	const archives = await Archive.find({ userId: req.user._id });
	res.status(200).json({ success: true, archives });
};

export const createArchive = async (req: IArchiveReq, res: Response) => {
	const archive = await Archive.create({
		userId: req.user._id,
		noteId: req.body.noteId,
	});
	res
		.status(201)
		.json({ success: true, archive, message: "Note Added to archive" });
};

export const getArchive = async (req: IArchiveReq, res: Response) => {
	const archive = await Archive.findOne({
		userId: req.user._id,
		noteId: req.params.noteId,
	});
	res.status(200).json({ success: true, archive });
};

export const updateArchive = async (req: IArchiveReq, res: Response) => {
	const archive = await Archive.findOneAndUpdate(
		{ userId: req.user._id, noteId: req.params.noteId },
		req.body,
		{
			new: true,
		}
	);
	res
		.status(200)
		.json({ success: true, archive, message: "Archive Updated Successfully" });
};

export const deleteArchive = async (req: IArchiveReq, res: Response) => {
	await Archive.findOneAndDelete({
		userId: req.user._id,
		noteId: req.params.noteId,
	});
	res.status(200).json({ success: true, message: "Note removed from Archive" });
};
