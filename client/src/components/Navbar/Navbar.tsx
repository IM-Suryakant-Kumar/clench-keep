import styles from "./navbar.module.css";
import { TfiPencilAlt2 } from "react-icons/tfi";
import { MdOutlineLogout, MdSearch } from "react-icons/md";
import { Link } from "react-router-dom";
import { useLogoutMutation } from "../../features/apis";

const Navbar = () => {
	const [logout] = useLogoutMutation();

	return (
		<div className={styles.container}>
			<Link to="/" className={styles.logoCont}>
				<TfiPencilAlt2 className={styles.logoIcon} />
				<h3 className={styles.logoTitle}>ClenchKeep</h3>
			</Link>
			<div className={styles.actionCont}>
				<form className={styles.searchBar}>
					<input
						type="text"
						className={styles.searchInput}
						placeholder="Search..."
					/>
					<div className={styles.searchBtn}>
						<MdSearch className={styles.searchIcon} />
					</div>
				</form>
				<div className={styles.logoutCont} onClick={() => logout()}>
					<MdOutlineLogout className={styles.logoutIcon} />
				</div>
			</div>
		</div>
	);
};

export default Navbar;
