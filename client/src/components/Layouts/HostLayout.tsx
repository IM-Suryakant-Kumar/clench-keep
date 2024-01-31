import { Navigate, Outlet, useLocation } from "react-router-dom";
import { Navbar } from "..";
import { useGetProfileQuery } from "../../features/apis";

const HostLayout = () => {
	const { data, isLoading, isError } = useGetProfileQuery(null);
	const pathname = useLocation().pathname;

  // console.log()

	return isLoading ? (
		<h3>Loading...</h3>
	) : isError ? (
		<Navigate
			to="/login"
			state={{ message: "You have to login first", redirectTo: pathname }}
			replace
		/>
	) : (
		<div>
			<Navbar />
			<Outlet />
		</div>
	);
};

export default HostLayout;
