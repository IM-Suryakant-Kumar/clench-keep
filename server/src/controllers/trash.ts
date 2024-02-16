import { Response } from "express";
import { INoteReq } from "index";
import { Note } from "../models";

export const AddToTrash = async (req: INoteReq, res: Response) => {
	await Note.findByIdAndUpdate(req.params._id, { isTrashed: true });
	res.status(201).json({ success: true, message: "Note Added to trash" });
};

export const restoreFromTrash = async (req: INoteReq, res: Response) => {
	await Note.findByIdAndUpdate(req.params._id, { isTrashed: false });
	res.status(200).json({ success: true, message: "Note restored from trash" });
};
