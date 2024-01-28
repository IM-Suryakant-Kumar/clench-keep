import { useLocation, useNavigate } from "react-router-dom";
import styles from "../styles/login.module.css";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../features/hook";
import { guestLogin, login } from "../features/reducers";

const Login = () => {
	const state = useLocation().state;
	const { errorMessage, isSubmitting, isLoading } = useAppSelector(
		state => state.auth
	);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const pathname = state?.redirectTo || "/host";

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const name = formData.get("name") as string;
		const email = formData.get("email") as string;
		const password = formData.get("password") as string;
		dispatch(login({ name, email, password }));
		!errorMessage && navigate(pathname, { replace: true });
	};

	const handleGuestLogin = () => {
		dispatch(guestLogin());
		!errorMessage && navigate(pathname, { replace: true });
	};

	return (
		<div className={styles.container}>
			<div className={styles.wrapper}>
				<h2 className={styles.title}>Log In</h2>
				{state?.message && <p className={styles.message}>{state?.message}</p>}
				{errorMessage && <p className={styles.message}>{errorMessage}</p>}
				<form className={styles.form} onSubmit={handleSubmit}>
					<input
						className={styles.input}
						type="text"
						name="name"
						placeholder="Name:"
						minLength={3}
						required
						autoFocus
					/>
					<input
						className={styles.input}
						type="email"
						name="email"
						placeholder="email:"
						required
					/>
					<input
						className={styles.input}
						type="password"
						name="password"
						placeholder="password:"
						minLength={4}
						required
					/>
					<button className={styles.lgbtn} disabled={isLoading}>
						{isSubmitting ? "Loggin in..." : "login"}
					</button>
					<button
						type="button"
						className={styles.glgbtn}
						onClick={handleGuestLogin}
						disabled={isLoading}>
						{isLoading ? "Guest Logging in..." : "Guest Login"}
					</button>
					<div className={styles.subtitle}>
						Don't have an account?{" "}
						<Link
							className={styles.link}
							to="/signup"
							state={{ redirectTo: pathname }}>
							Signup
						</Link>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Login;
