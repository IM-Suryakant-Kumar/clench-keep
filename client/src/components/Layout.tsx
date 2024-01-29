import { Outlet } from "react-router-dom";
import { Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAppDispatch, useAppSelector } from "../features/hook";
import { useEffect } from "react";
import { getProfile } from "../features/reducers";

const Layout = () => {
	const { user, isProfileLoading } = useAppSelector(state => state.auth);
	const dispatch = useAppDispatch();

	useEffect(() => {
		return () => {
			!user && dispatch(getProfile());
		};
	}, [dispatch, user]);

	return (
		!isProfileLoading && (
			<div>
				<Outlet />
				<ToastContainer
					autoClose={1000}
					pauseOnFocusLoss={false}
					theme="colored"
					transition={Slide}
				/>
			</div>
		)
	);
};

export default Layout;
