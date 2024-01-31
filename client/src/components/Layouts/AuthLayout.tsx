import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useGetProfileQuery } from "../../features/apis";

const AuthLayout = () => {
	const { data, isLoading } = useGetProfileQuery(null);
	const state = useLocation().state;
	const pathname = state?.redirectTo || "/note";

	if (isLoading) return <h3>Loading...</h3>;

	return data?.user ? <Navigate to={pathname} replace /> : <Outlet />;
};

export default AuthLayout;
