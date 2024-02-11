import styles from "./note.module.css";
import { useGetNotesQuery } from "../../features/apis";
import { INote } from "../../types";

const Note = () => {
	const { data } = useGetNotesQuery();
	const notes = data?.notes as INote[];
	console.log(notes);

	return notes?.length > 0 ? (
		<div>Note</div>
	) : (
		<div className={styles.emptyCont}>
			<p className={styles.emptyDesc}>
				You don't have any note yet. Create One
			</p>
			<button className={styles.emptyBtn}>CREATE NOTE</button>
		</div>
	);
};

export default Note;
