import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppSelector } from "../features/hook";
import { Navbar } from ".";
import styles from "../styles/hostlayout.module.css";

const HostLayout = () => {
	const user = useAppSelector(state => state.auth.user);
	const pathname = useLocation().pathname;

	return user ? (
		<div className={styles.container}>
      <Navbar />
			<Outlet />
		</div>
	) : (
		<Navigate
			to="/login"
			state={{ message: "You have to login first", redirectTo: pathname }}
			replace
		/>
	);
};

export default HostLayout;
