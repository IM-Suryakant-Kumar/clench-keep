import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppSelector } from "../features/hook";

const HostLayout = () => {
	const user = useAppSelector(state => state.auth.user);
	const pathname = useLocation().pathname;

	console.log(user);
	console.log(pathname);

	return user ? (
		<Outlet />
	) : (
		<Navigate
			to="/login"
			state={{ message: "You have to login first", redirectTo: pathname }}
		/>
	);
};

export default HostLayout;
