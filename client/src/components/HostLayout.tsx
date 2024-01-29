import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppSelector } from "../features/hook";

const HostLayout = () => {
	const user = useAppSelector(state => state.auth.user);
	const pathname = useLocation().pathname;

	return user ? (
		<Outlet />
	) : (
		<Navigate
			to="/login"
			state={{ message: "You have to login first", redirectTo: pathname }}
			replace
		/>
	);
};

export default HostLayout;
