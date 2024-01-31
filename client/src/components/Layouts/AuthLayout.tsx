import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useGetProfileQuery } from "../../features/apis";

const AuthLayout = () => {
	const { isLoading, isError } = useGetProfileQuery(null);
	const state = useLocation().state;
	const pathname = state?.redirectTo || "/note";

	return isLoading ? (
		<h3>Loading...</h3>
	) : isError ? (
		<Outlet />
	) : (
		<Navigate to={pathname} replace />
	);
};

export default AuthLayout;
