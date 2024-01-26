import { IUser } from "./user";

export interface Response {
	success: boolean;
	message: string;
	token: string;
	user: IUser;
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
