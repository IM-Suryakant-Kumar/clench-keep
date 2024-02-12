import styles from "./note.module.css";
import { useGetNotesQuery } from "../../features/apis";
import { INote } from "../../types";
import { useState } from "react";

const Note = () => {
	const { data } = useGetNotesQuery();
	const notes = data?.notes as INote[];
	const [showModal, setShowModal] = useState<boolean>(false);

	return (
		<div>
			{notes?.length === 0 && (
				<div className={styles.emptyCont}>
					<p className={styles.emptyDesc}>
						You don't have any note yet. Create one
					</p>
					<button className={styles.emptyBtn}>CREATE NOTE</button>
				</div>
			)}
      {showModal && }
		</div>
	);
};

export default Note;
