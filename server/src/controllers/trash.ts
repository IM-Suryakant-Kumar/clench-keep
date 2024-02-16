import { Response } from "express";
import { INoteReq } from "index";
import { Note } from "../models";

export const createTrash = async (req: INoteReq, res: Response) => {
	await Note.findOneAndUpdate({_id: req.params._id, userId: req.user}, { isTrashed: true });
	res.status(201).json({ success: true, message: "Note Added to trash" });
};

export const restoreTrash = async (req: INoteReq, res: Response) => {
	await Note.findOneAndUpdate({_id: req.params._id, userId: req.user}, { isTrashed: false });
	res.status(200).json({ success: true, message: "Note restored from trash" });
};
