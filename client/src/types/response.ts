import IArchive from "./archives";
import INote from "./note";
import { IUser } from "./user";

export interface Response {
	success: boolean;
	message: string;
	token: string;
	user: IUser;
	notes: INote[];
	note: INote;
	archives: IArchive[];
	archive: IArchive;
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

export default interface IApiRes extends SuccessRes, FailedRes {}
