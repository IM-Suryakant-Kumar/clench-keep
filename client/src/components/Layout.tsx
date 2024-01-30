import { Outlet } from "react-router-dom";
import { Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAppDispatch, useAppSelector } from "../features/hook";
import { useEffect, useRef, useState } from "react";
import { getProfile } from "../features/reducers";

const Layout = () => {
	const { user } = useAppSelector(state => state.auth);
	const dispatch = useAppDispatch();
	// Prevent login page render
	const [showOutlet, setShowOutlet] = useState<boolean>(false);
	const effectRan = useRef(true);

	useEffect(() => {
		if (effectRan.current) {
			(async () => {
				await (!user && dispatch(getProfile()));
				await new Promise(res => res(setShowOutlet(prevState => !prevState)));
			})();
		}
		return () => {
			effectRan.current = false;
		};
	}, [dispatch, user]);

	return (
		<div>
			{showOutlet && <Outlet />}
			<ToastContainer
				autoClose={1000}
				pauseOnFocusLoss={false}
				theme="colored"
				transition={Slide}
			/>
		</div>
	);
};

export default Layout;
