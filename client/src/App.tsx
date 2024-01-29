import {
	Route,
	RouterProvider,
	createBrowserRouter,
	createRoutesFromElements,
} from "react-router-dom";
import { AuthLayout, HostLayout, Layout } from "./components";
import { Home, Login, NotFound, Signup } from "./pages";

function App() {
	const router = createBrowserRouter(
		createRoutesFromElements(
			<Route path="/" element={<Layout />}>
				<Route index element={<Home />} />
				<Route path="host" element={<HostLayout />}>
					<Route index element={<h1>Note</h1>} />
					<Route path="archive" element={<h1>Archive</h1>} />
					<Route path="trash" element={<h1>Trash</h1>} />
				</Route>
				<Route path="/login" element={<AuthLayout />}>
					<Route index element={<Login />} />
					<Route path="signup" element={<Signup />} />
				</Route>
				<Route path="*" element={<NotFound />} />
			</Route>
		)
	);

	return <RouterProvider router={router} />;
}

export default App;
