import { NavLink } from "react-router-dom";
import styles from "./sidebar.module.css";
import { TfiPencilAlt2 } from "react-icons/tfi";
import { IoArchiveOutline } from "react-icons/io5";
import { BsTrash } from "react-icons/bs";

const Sidebar = () => {
	return (
		<div className={styles.container}>
			<NavLink to="/note" className={styles.link}>
				<TfiPencilAlt2 className={styles.icon} />
				<span className={styles.title}>Note</span>
			</NavLink>
			<NavLink to="/archive" className={styles.link}>
				<IoArchiveOutline className={styles.icon} />
				<span className={styles.title}>Archive</span>
			</NavLink>
			<NavLink to="/trash" className={styles.link}>
				<BsTrash className={styles.icon} />
				<span className={styles.title}>Trash</span>
			</NavLink>
		</div>
	);
};

export default Sidebar;
