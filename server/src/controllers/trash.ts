import { Response } from "express";
import { ITrashReq } from "index";
import { Trash } from "../models";

export const getTrashes = async (req: ITrashReq, res: Response) => {
	const trashes = await Trash.find({ userId: req.user._id });
	res.status(200).json({ success: true, trashes });
};

export const createTrash = async (req: ITrashReq, res: Response) => {
	const trash = await Trash.create({
		userId: req.user._id,
		noteId: req.body.noteId,
	});
	res
		.status(201)
		.json({ success: true, Trash, message: "Note Added to trash" });
};

export const getTrash = async (req: ITrashReq, res: Response) => {
	const trash = await Trash.findOne({
		userId: req.user._id,
		noteId: req.params.noteId,
	});
	res.status(200).json({ success: true, trash });
};

export const updateTrash = async (req: ITrashReq, res: Response) => {
	const trash = await Trash.findOneAndUpdate(
		{ userId: req.user._id, noteId: req.params.noteId },
		req.body,
		{
			new: true,
		}
	);
	res
		.status(200)
		.json({ success: true, trash, message: "Trash Updated Successfully" });
};

export const deleteTrash = async (req: ITrashReq, res: Response) => {
	await Trash.findOneAndDelete({
		userId: req.user._id,
		noteId: req.params.noteId,
	});
	res.status(200).json({ success: true, message: "Note removed from trash" });
};
