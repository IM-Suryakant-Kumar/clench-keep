export interface INote {
  _id: string;
	title: string;
	content: string;
	background: string;
	labels: string[];
  isArchived: boolean;
  isTrashed: boolean;
	createdAt: string;
  updatedAt: string;
}
