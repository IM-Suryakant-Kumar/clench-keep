import { useLocation } from "react-router-dom";
import styles from "../styles/login.module.css";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../features/hook";
import { getProfile, guestLogin, login } from "../features/reducers";
import { IUser } from "../types";

const Login = () => {
	const state = useLocation().state;
	const { errorMessage, isSubmitting, isLoading } = useAppSelector(
		state => state.auth
	);
	const dispatch = useAppDispatch();

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const email = formData.get("email") as string;
		const password = formData.get("password") as string;
		dispatch(login({ email, password } as IUser));
		setTimeout(() => dispatch(getProfile()), 1000);
	};

	const handleGuestLogin = async () => {
		dispatch(guestLogin());
		setTimeout(() => dispatch(getProfile()), 500);
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
						type="email"
						name="email"
						placeholder="Email:"
						required
						autoFocus
					/>
					<input
						className={styles.input}
						type="password"
						name="password"
						placeholder="Password:"
						minLength={4}
						required
					/>
					<button className={styles.lgbtn} disabled={isSubmitting}>
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
						<Link className={styles.link} to="/signup">
							Signup
						</Link>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Login;
