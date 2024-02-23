import styles from "./navbar.module.css";
import { TfiPencilAlt2 } from "react-icons/tfi";
import { MdOutlineLogout, MdSearch } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../../features/apis";
import { debounce } from "../../utils";

const Navbar = () => {
	const [logout] = useLogoutMutation();
	const navigate = useNavigate();

	const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		value ? navigate(`/note?search=${value}`) : navigate(`/note`);
	};

	const debounceChangeHandler = debounce(changeHandler, 500);

	return (
		<div className={styles.container}>
			<Link to="/" className={styles.logoCont}>
				<TfiPencilAlt2 className={styles.logoIcon} />
				<h3 className={styles.logoTitle}>ClenchKeep</h3>
			</Link>
			<div className={styles.actionCont}>
				<div className={styles.searchBar}>
					<input
						type="text"
						className={styles.searchInput}
						placeholder="Search..."
						onChange={debounceChangeHandler}
					/>
					<div className={styles.searchBtn}>
						<MdSearch className={styles.searchIcon} />
					</div>
				</div>
				<div className={styles.logoutCont} onClick={() => logout()}>
					<MdOutlineLogout className={styles.logoutIcon} />
				</div>
			</div>
		</div>
	);
};

export default Navbar;
