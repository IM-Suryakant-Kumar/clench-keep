import { FaRegEdit } from "react-icons/fa";
import { INote } from "../../types";
import styles from "./noteCard.module.css";
import parse from "html-react-parser";
import {
	MdOutlineDeleteForever,
	MdSettingsBackupRestore,
} from "react-icons/md";
import { FaRegTrashCan } from "react-icons/fa6";
import { IoArchiveOutline } from "react-icons/io5";
import {
	useAddToArchiveMutation,
	useAddToTrashMutation,
	useDeleteNoteMutation,
	useRestoreFromArchiveMutation,
	useRestoreFromTrashMutation,
} from "../../features/apis";
import { UpdateModal } from "..";
import { useAppDispatch, useAppSelector } from "../../features/hook";
import { toggleUpdateModal } from "../../features/reducers";

type Props = {
	note: INote;
	type: string;
};

const NoteCard: React.FC<Props> = ({
	note: { _id, title, content, background, labels, createdAt, updatedAt },
	type,
}) => {
	const showUpdateModalId = useAppSelector(
		state => state.modal.showUpdateModalId
	);
	const dispatch = useAppDispatch();

	const [deleteNote, { isLoading: deleteNoteLoading }] =
		useDeleteNoteMutation();
	const [addToArchive, { isLoading: addToArchiveLoading }] =
		useAddToArchiveMutation();
	const [addToTrash, { isLoading: addToTrashLoading }] =
		useAddToTrashMutation();
	const [restoreFromArchive, { isLoading: restoreFromArchiveLoading }] =
		useRestoreFromArchiveMutation();
	const [restoreFromTrash, { isLoading: restoreFromTrashLoading }] =
		useRestoreFromTrashMutation();

	return (
		<div className={styles.container} style={{ background }}>
			<h4 className={styles.title}>{title}</h4>
			<div className={styles.content}>{parse(content)}</div>
			<div className={styles.date}>
				<p>
					<span className={styles.lightBold}>Created At: </span>
					{new Date(createdAt).toLocaleString()}
				</p>
				<p>
					<span className={styles.lightBold}>Updated At: </span>
					{new Date(updatedAt).toLocaleString()}
				</p>
			</div>
			<div className={styles.actionsAndLabels}>
				{/* labels */}
				<div className={styles.labels}>
					{labels.map((label, idx) => (
						<span className={styles.label} key={idx}>
							{label}
						</span>
					))}
				</div>
				{/* actions */}
				{type === "note" ? (
					<div className={styles.actions}>
						<FaRegEdit
							className={styles.actionIcon}
							onClick={() => dispatch(toggleUpdateModal(_id))}
						/>
						<IoArchiveOutline
							className={styles.actionIcon}
							aria-disabled={addToArchiveLoading}
							onClick={() => addToArchive({ _id } as INote)}
						/>
						<FaRegTrashCan
							className={styles.actionIcon}
							aria-disabled={addToTrashLoading}
							onClick={() => addToTrash({ _id } as INote)}
						/>
					</div>
				) : (
					<div className={styles.actions}>
						<MdSettingsBackupRestore
							className={styles.actionIcon}
							aria-disabled={
								restoreFromArchiveLoading || restoreFromTrashLoading
							}
							onClick={() =>
								type === "archive"
									? restoreFromArchive({ _id } as INote)
									: restoreFromTrash({ _id } as INote)
							}
						/>
						<MdOutlineDeleteForever
							className={styles.actionIcon}
							aria-disabled={deleteNoteLoading}
							onClick={() => deleteNote({ _id } as INote)}
						/>
					</div>
				)}
			</div>
			{/* Update Modal */}
			{showUpdateModalId === _id && (
				<UpdateModal
					note={{ _id, title, content, background, labels } as INote}
				/>
			)}
		</div>
	);
};

export default NoteCard;
