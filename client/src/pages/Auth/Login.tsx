import { useLocation } from "react-router-dom";
import styles from "./auth.module.css";
import { Link } from "react-router-dom";
import { ErrorResponse, IUser } from "../../types";
import { useGuestLoginMutation, useLoginMutation } from "../../features/apis";

const Login = () => {
	const state = useLocation().state;
	const [login, { isLoading: isLoginLoading, error: loginError }] =
		useLoginMutation();
	const [guestLogin, { isLoading: isGuestLoading, error: guestLoginError }] =
		useGuestLoginMutation();

	// Extract errorMessage
	const error = loginError || guestLoginError;
	const errorMessage = (error as ErrorResponse)?.data.message;

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const email = formData.get("email") as string;
		const password = formData.get("password") as string;
		login({ email, password } as IUser);
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
					<button className={styles.lgbtn} disabled={isLoginLoading}>
						{isLoginLoading ? "Loggin in..." : "login"}
					</button>
					<button
						type="button"
						className={styles.glgbtn}
						onClick={() => guestLogin()}
						disabled={isGuestLoading}>
						{isGuestLoading ? "Guest Logging in..." : "Guest Login"}
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
