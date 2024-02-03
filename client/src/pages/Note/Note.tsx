import { useGetNotesQuery } from "../../features/apis";

const Note = () => {
	const { data } = useGetNotesQuery();
	// console.log(data?.notes);

	return <div>Note</div>;
};

export default Note;
