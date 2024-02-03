import styles from "./navbar.module.css";

const Navbar = () => {
	return (
		<div className={styles.container}>
			<div className={styles.logo_cont}>
        <h3 className={styles.title}>ClenchKeep</h3>
      </div>
			<div className={styles.search_bar}>SearchBar</div>
			<div className={styles.logout_cont}>Logout</div>
		</div>
	);
};

export default Navbar;
