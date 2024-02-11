import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useGetProfileQuery } from "../../features/apis";

const AuthLayout = () => {
	const { isFetching, isError } = useGetProfileQuery();
	const state = useLocation().state;
	const pathname = state?.redirectTo || "/note";

	return isFetching ? (
		<h3>Loading...</h3>
	) : isError ? (
		<Outlet />
	) : (
		<Navigate to={pathname} replace />
	);
};

export default AuthLayout;
