import { MdClose } from "react-icons/md";
import { useAppDispatch } from "../../features/hook";
import styles from "./modal.module.css";
import { toggleModal } from "../../features/reducers";

const Modal = () => {
	const dispatch = useAppDispatch();

	return (
		<div className={styles.container}>
			<div className={styles.wrapper}>
				<MdClose
					className={styles.closeBtn}
					onClick={() => dispatch(toggleModal())}
				/>
				<textarea
					className={styles.titleText}
					placeholder="Add title"></textarea>
				<div className={styles.actionContainer}></div>
				<textarea
					className={styles.briefText}
					placeholder="Add brief about notes"></textarea>
			</div>
		</div>
	);
};

export default Modal;
