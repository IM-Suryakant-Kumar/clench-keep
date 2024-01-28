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
