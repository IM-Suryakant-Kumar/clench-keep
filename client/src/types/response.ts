import { IArchive, INote, ITrash, IUser } from ".";

export interface Response {
	success: boolean;
	message: string;
	token: string;
	user: IUser;
	notes: INote[];
	note: INote;
	archives: IArchive[];
	archive: IArchive;
	trashes: ITrash[];
	trash: ITrash;
}

export interface ErrorResponse {
	data: { success: boolean; message: string };
}

interface SuccessRes {
	data: Response;
}

interface FailedRes {
	response: {
		data: Response;
		status: string;
		statusText: string;
	};
}

export interface IApiRes extends SuccessRes, FailedRes {}
