import { Response } from "express";
import { INoteReq } from "index";
import { Note } from "../models";

export const getNotes = async (req: INoteReq, res: Response) => {
	const notes = await Note.find({ userId: req.user._id });
	res.status(200).json({ success: true, notes });
};

export const createNote = async (req: INoteReq, res: Response) => {
	const note = await Note.create({ userId: req.user._id, ...req.body });
	res
		.status(201)
		.json({ success: true, note, message: "Note created successfully" });
};

export const getNote = async (req: INoteReq, res: Response) => {
	const note = await Note.findOne({
		_id: req.params.noteId,
		userId: req.user._id,
	});
	res.status(200).json({ success: true, note });
};

export const updateNote = async (req: INoteReq, res: Response) => {
	const note = await Note.findOneAndUpdate(
		{ _id: req.params.noteId, userId: req.user._id },
		req.body,
		{
			new: true,
		}
	);
	res
		.status(200)
		.json({ success: true, note, message: "Note updated successfully" });
};

export const deleteNote = async (req: INoteReq, res: Response) => {
	await Note.findOneAndDelete({ _id: req.params.noteId, userId: req.user._id });
	res.status(201).json({ success: true, message: "Note deleted successfully" });
};
