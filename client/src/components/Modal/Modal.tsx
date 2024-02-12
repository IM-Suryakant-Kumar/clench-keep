import { MdClose } from "react-icons/md";
import { useAppDispatch } from "../../features/hook";
import styles from "./modal.module.css";
import { toggleModal } from "../../features/reducers";
import { Editor } from "..";

const Modal = () => {
	const dispatch = useAppDispatch();

	return (
		<div className={styles.container}>
			<div className={styles.wrapper}>
				<MdClose
					className={styles.closeBtn}
					onClick={() => dispatch(toggleModal())}
				/>
				<Editor />
				{/* <form>
					<textarea
						name="title"
						className={styles.title}
						placeholder="Add title"
					/>
					<div className={styles.actionContainer}></div>
					<textarea
						name="content"
						className={styles.content}
						placeholder="Add brief about notes"
					/>
				</form> */}
			</div>
		</div>
	);
};

export default Modal;
