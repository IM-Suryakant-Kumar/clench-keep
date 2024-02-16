import { Link } from "react-router-dom";
import { NoteCard } from "../../components";
import { useGetNotesQuery } from "../../features/apis";
import styles from "./archive.module.css";

const Archive = () => {
	const { data } = useGetNotesQuery();
	const archivedNotes = data?.notes.filter(note => note.isArchived);

	return (
		<div>
			{archivedNotes?.length === 0 && (
				<div className={styles.emptyCont}>
					<p className={styles.emptyDesc}>
						You don't have any note archived yet. Wanna archive?
					</p>
					<Link to="/note" className={styles.emptyBtn}>
						GO TO NOTE
					</Link>
				</div>
			)}
			<div className={styles.cards}>
				{archivedNotes?.reverse().map(note => (
					<NoteCard key={note._id} note={note} type="archive" />
				))}
			</div>
		</div>
	);
};

export default Archive;
