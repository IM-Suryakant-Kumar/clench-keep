import { useAppDispatch, useAppSelector } from "../features/hook";

const Note = () => {
	const { notes } = useAppSelector(state => state.note);

	console.log(notes);

	return <div>Note</div>;
};

export default Note;
