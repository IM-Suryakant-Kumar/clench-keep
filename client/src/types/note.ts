export interface INote {
  _id: string;
	userId: string;
	title: string;
	content: string;
	backgound: string;
	labels: string[];
	createdAt: Date;
}
