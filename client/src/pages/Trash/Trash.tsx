import { Link } from "react-router-dom";
import { NoteCard } from "../../components";
import { useGetNotesQuery } from "../../features/apis";
import styles from "./trash.module.css";

const Trash = () => {
	const { data } = useGetNotesQuery();
	const trashedNotes = data?.notes.filter(note => note.isTrashed);

	return (
		<div>
			{trashedNotes?.length === 0 && (
				<div className={styles.emptyCont}>
					<p className={styles.emptyDesc}>
						You don't have any note trashed yet. Wanna trash?
					</p>
					<Link to="/note" className={styles.emptyBtn}>
						GO TO NOTE
					</Link>
				</div>
			)}
			<div className={styles.cards}>
				{trashedNotes?.reverse().map(note => (
					<NoteCard key={note._id} note={note} type="trash" />
				))}
			</div>
		</div>
	);
};

export default Trash;
