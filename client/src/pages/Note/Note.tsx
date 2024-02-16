import styles from "./note.module.css";
import { useGetNotesQuery } from "../../features/apis";
import { INote } from "../../types";
import { useAppDispatch, useAppSelector } from "../../features/hook";
import { toggleCreateModal } from "../../features/reducers";
import { CreateModal, NoteCard } from "../../components";
import { IoPencilOutline } from "react-icons/io5";

const Note = () => {
	const showCreateModal = useAppSelector(state => state.modal.showCreateModal);
	const dispatch = useAppDispatch();
	const { data } = useGetNotesQuery();
	const notes = data?.notes as INote[];

	console.log("notes", JSON.stringify(notes, null, 2));

	return (
		<div>
			{notes?.length === 0 && (
				<div className={styles.emptyCont}>
					<p className={styles.emptyDesc}>
						You don't have any note yet. Create one
					</p>
					<button
						className={styles.emptyBtn}
						onClick={() => dispatch(toggleCreateModal())}>
						CREATE NOTE
					</button>
				</div>
			)}
			{showCreateModal && <CreateModal />}
			<div className={styles.cards}>
				{notes?.filter(note => !note.isArchived || !note.isTrashed).map(note => (
					<NoteCard key={note._id} note={note} type="note" />
				))}
			</div>
			<button
				className={styles.modalBtn}
				onClick={() => dispatch(toggleCreateModal())}>
				<IoPencilOutline className={styles.btnIcon} />
			</button>
		</div>
	);
};

export default Note;
