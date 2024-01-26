import { Outlet } from "react-router-dom";
import { Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Layout = () => {
	return (
		<div>
			<Outlet />
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
