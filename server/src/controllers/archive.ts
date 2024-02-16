import { Response } from "express";
import { INoteReq } from "index";
import { Note } from "../models";

export const createArchive = async (req: INoteReq, res: Response) => {
	await Note.findOneAndUpdate(
		{ _id: req.params._id, userId: req.user },
		{ isArchived: true }
	);
	res.status(201).json({ success: true, message: "Note Added to archive" });
};

export const deleteArchive = async (req: INoteReq, res: Response) => {
	await Note.findOneAndUpdate(
		{ _id: req.params._id, userId: req.user },
		{ isArchived: false }
	);
	res.status(200).json({ success: true, message: "Note removed from Archive" });
};
