import styles from "./note.module.css";
import { useGetNotesQuery } from "../../features/apis";
import { INote } from "../../types";
import { useAppDispatch, useAppSelector } from "../../features/hook";
import { toggleModal } from "../../features/reducers";
import { Modal } from "../../components";

const Note = () => {
	const showModal = useAppSelector(state => state.modal.showModal);
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
						onClick={() => dispatch(toggleModal())}>
						CREATE NOTE
					</button>
				</div>
			)}
			{showModal && <Modal />}
		</div>
	);
};

export default Note;
