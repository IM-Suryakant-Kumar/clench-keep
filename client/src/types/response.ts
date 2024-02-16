import { INote, IUser } from ".";

export interface SuccessResponse {
	success: boolean;
	message: string;
	token: string;
	user: IUser;
	notes: INote[];
}

export interface ErrorResponse {
	data: { success: boolean; message: string };
}
