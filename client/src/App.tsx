import {
	Route,
	RouterProvider,
	createBrowserRouter,
	createRoutesFromElements,
} from "react-router-dom";
import { AuthLayout, HostLayout, Layout } from "./components";
import { Home, Login, NotFound, Signup, Note, Archive, Trash } from "./pages";

function App() {
	const router = createBrowserRouter(
		createRoutesFromElements(
			<Route path="/" element={<Layout />}>
				<Route index element={<Home />} />
				<Route element={<HostLayout />}>
					<Route path="note" element={<Note />} />
					<Route path="archive" element={<Archive />} />
					<Route path="trash" element={<Trash />} />
				</Route>
				<Route element={<AuthLayout />}>
					<Route path="login" element={<Login />} />
					<Route path="signup" element={<Signup />} />
				</Route>
				<Route path="*" element={<NotFound />} />
			</Route>
		)
	);

	return <RouterProvider router={router} />;
}

export default App;
