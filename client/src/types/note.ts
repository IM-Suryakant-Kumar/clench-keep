export default interface INote {
	userId: string;
	title: string;
	content: string;
	backgound: string;
	labels: string[];
	createdAt: Date;
}
