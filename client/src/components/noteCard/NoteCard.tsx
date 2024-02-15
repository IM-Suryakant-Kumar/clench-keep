import { FaRegEdit } from "react-icons/fa";
import { INote } from "../../types";
import styles from "./noteCard.module.css";
import parse from "html-react-parser";
import { MdDeleteForever, MdRestore } from "react-icons/md";
import { FaRegTrashCan } from "react-icons/fa6";
import { IoArchiveOutline } from "react-icons/io5";

type Props = {
	note: INote;
	type: string;
};

const NoteCard: React.FC<Props> = ({
	note: { title, content, background, labels, createdAt, updatedAt },
	type,
}) => {
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
						<FaRegEdit className={styles.actionIcon} />
						<IoArchiveOutline className={styles.actionIcon} />
						<FaRegTrashCan className={styles.actionIcon} />
					</div>
				) : (
					<div className={styles.actions}>
						<MdRestore className={styles.actionIcon} />
            <MdDeleteForever className={styles.actionIcon} />
					</div>
				)}
			</div>
		</div>
	);
};

export default NoteCard;
