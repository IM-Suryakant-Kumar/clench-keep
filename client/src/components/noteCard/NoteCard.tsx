import { FaRegEdit } from "react-icons/fa";
import { IArchive, INote, ITrash } from "../../types";
import styles from "./noteCard.module.css";
import parse from "html-react-parser";
import { MdDeleteForever, MdRestore } from "react-icons/md";
import { FaRegTrashCan } from "react-icons/fa6";
import { IoArchiveOutline } from "react-icons/io5";
import {
	useCreateArchiveMutation,
	useCreateNoteMutation,
	useCreateTrashMutation,
	useDeleteArchiveMutation,
	useDeleteNoteMutation,
	useDeleteTrashMutation,
} from "../../features/apis";
import { UpdateModal } from "..";
import { useAppDispatch, useAppSelector } from "../../features/hook";
import { toggleUpdateModal } from "../../features/reducers";
import { toast } from "react-toastify";

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

	const [createNote, { isLoading: createNoteLoading }] =
		useCreateNoteMutation();
	const [deleteNote, { isLoading: deleteNoteLoading }] =
		useDeleteNoteMutation();
	const [createArchive, { isLoading: createArchiveLoading }] =
		useCreateArchiveMutation();
	const [deleteArchive, { isLoading: deleteArchiveLoading }] =
		useDeleteArchiveMutation();
	const [createTrash, { isLoading: createTrashLoading }] =
		useCreateTrashMutation();
	const [deleteTrash, { isLoading: deleteTrashLoading }] =
		useDeleteTrashMutation();

	const handleArchive = () => {
		createArchive({ noteId: _id } as IArchive);
		deleteNote({ _id } as INote);
    toast.success("Added to archive");
	};

	const handleTrash = () => {
		createTrash({ noteId: _id } as ITrash);
		deleteNote({ _id } as INote);
    toast.success("Added to Trash")
	};

	const handleRestore = () => {
		createNote({
			title,
			content,
			background,
			labels,
			createdAt,
			updatedAt,
		} as INote);
		type === "archive"
			? deleteArchive({ noteId: _id } as IArchive)
			: deleteTrash({ noteId: _id } as ITrash);
    toast.success("Note restored")
	};
  
	const handleDelete = () => {
    type === "archive"
    ? deleteArchive({ noteId: _id } as IArchive)
    : deleteTrash({ noteId: _id } as ITrash);
    toast.success("Note deleted")
	};

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
							aria-disabled={!(!createArchiveLoading && !deleteNoteLoading)}
							onClick={handleArchive}
						/>
						<FaRegTrashCan
							className={styles.actionIcon}
							aria-disabled={!(!createTrashLoading && !deleteNoteLoading)}
							onClick={handleTrash}
						/>
					</div>
				) : (
					<div className={styles.actions}>
						<MdRestore
							className={styles.actionIcon}
							onClick={handleRestore}
							aria-disabled={
								!(
									!createNoteLoading &&
									!deleteArchiveLoading &&
									!deleteTrashLoading
								)
							}
						/>
						<MdDeleteForever
							className={styles.actionIcon}
							aria-disabled={!(!deleteArchiveLoading && !deleteTrashLoading)}
							onClick={handleDelete}
						/>
					</div>
				)}
			</div>
			{/* Update Modal */}
			{showUpdateModalId === _id && (
				<UpdateModal note={{ _id, title, content, background, labels } as INote} />
			)}
		</div>
	);
};

export default NoteCard;
