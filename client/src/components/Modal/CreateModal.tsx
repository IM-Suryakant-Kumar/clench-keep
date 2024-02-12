import { MdClose } from "react-icons/md";
import { useAppDispatch } from "../../features/hook";
import styles from "./modal.module.css";
import { toggleCreateModal } from "../../features/reducers";
import { Editor } from "..";
import { useState } from "react";

const CreateModal = () => {
	const dispatch = useAppDispatch();
	const [content, setContent] = useState<string>("");
	const [color, setColor] = useState<string>("#ebf2fa");

	return (
		<div className={styles.container}>
			<div className={styles.wrapper} style={{ background: `${color}` }}>
				<MdClose
					className={styles.closeBtn}
					onClick={() => dispatch(toggleCreateModal())}
				/>
				<form>
					<input
						name="title"
						className={styles.title}
						placeholder="Add title"
            required
					/>
					<Editor content={content} setContent={setContent} />
					<div className={styles.colors}>
						<div
							className={styles.color}
							onClick={() => setColor("#f7622b")}></div>
						<div
							className={styles.color}
							onClick={() => setColor("#d8bd42")}></div>
						<div
							className={styles.color}
							onClick={() => setColor("#5bd842")}></div>
						<div
							className={styles.color}
							onClick={() => setColor("#42d5d8")}></div>
						<div
							className={styles.color}
							onClick={() => setColor("#ebf2fa")}></div>
					</div>
					<div className={styles.labels}>
						<label>
							<input type="checkbox" name="study" value="study" /> Study
						</label>
						<label>
							<input type="checkbox" name="health" value="health" /> Health
						</label>
						<label>
							<input type="checkbox" name="office" value="office" /> Office
						</label>
					</div>
          <button className={styles.button}>Create</button>
				</form>
			</div>
		</div>
	);
};

export default CreateModal;
