import { useAppSelector } from "../../features/hook";
import styles from "./navbar.module.css";

const Navbar = () => {
	const user = useAppSelector(state => state.auth.user);

	console.log(user);

	return <div className={styles.container}>Navbar</div>;
};

export default Navbar;
