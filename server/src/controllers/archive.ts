import { Response } from "express";
import { INoteReq } from "index";
import { Note } from "../models";

export const addToArchive = async (req: INoteReq, res: Response) => {
	await Note.findByIdAndUpdate(req.params._id, { isArchived: true });
	res.status(200).json({ success: true, message: "Note Added to archive" });
};

export const restoreFromArchive = async (req: INoteReq, res: Response) => {
	await Note.findByIdAndUpdate(req.params._id, { isArchived: false });
	res
		.status(200)
		.json({ success: true, message: "Note restored from Archive" });
};
