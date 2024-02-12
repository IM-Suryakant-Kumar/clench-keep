import styles from "./note.module.css";
import { useGetNotesQuery } from "../../features/apis";
import { INote } from "../../types";
import { useAppDispatch, useAppSelector } from "../../features/hook";
import { toggleCreateModal } from "../../features/reducers";
import { CreateModal } from "../../components";

const Note = () => {
	const showCreateModal = useAppSelector(state => state.modal.showCreateModal);
	const dispatch = useAppDispatch();
	const { data } = useGetNotesQuery();
	const notes = data?.notes as INote[];

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
		</div>
	);
};

export default Note;
