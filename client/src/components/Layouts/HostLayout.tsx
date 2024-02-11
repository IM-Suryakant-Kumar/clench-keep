import { Navigate, Outlet, useLocation } from "react-router-dom";
import { Navbar, Sidebar } from "..";
import { useGetProfileQuery } from "../../features/apis";

const HostLayout = () => {
	const { isFetching, isError } = useGetProfileQuery();
	const pathname = useLocation().pathname;

	return isFetching ? (
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
			<div className="hostLayout">
				<Outlet />
			</div>
      <Sidebar />
		</div>
	);
};

export default HostLayout;
