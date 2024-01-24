import { Response } from "express";
import { IArchiveReq } from "index";
import Archive from "../modles/Archive";

export const createArchive = async (req: IArchiveReq, res: Response) => {
	const archive = await Archive.create({
		userId: req.user._id,
		...req.body,
	});
	res
		.status(201)
		.json({ success: true, archive, message: "Note Added to archive" });
};

export const getArchives = async (req: IArchiveReq, res: Response) => {
	const archives = await Archive.find({ userId: req.user._id });
	res.status(200).json({ success: true, archives });
};

export const deleteArchive = async (req: IArchiveReq, res: Response) => {
	await Archive.findByIdAndDelete(req.params.noteId);
	res.status(200).json({ success: true, message: "Note removed from Archive" });
};
