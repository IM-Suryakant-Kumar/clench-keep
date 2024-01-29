import styles from "../styles/signup.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../features/hook";
import { register } from "../features/reducers";
import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";

const Signup = () => {
	const state = useLocation().state;
	const { user, errorMessage, isSubmitting } = useAppSelector(
		state => state.auth
	);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const pathname = state?.redirectTo || "/host";
	const effectRan = useRef(true);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const name = formData.get("name") as string;
		const email = formData.get("email") as string;
		const password = formData.get("password") as string;
		dispatch(register({ name, email, password }));
		// isNavigate && navigate(pathname, { replace: true });
	};

	useEffect(() => {
		if (effectRan.current) {
			user && navigate(pathname, { replace: true });
		}
		return () => {
			effectRan.current = false;
		};
	}, [navigate, pathname, user]);

	return (
		<div className={styles.container}>
			<div className={styles.wrapper}>
				<h2 className={styles.title}>Sign Up</h2>
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
						placeholder="Email:"
						required
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
						{isSubmitting ? "signing up..." : "Signup"}
					</button>
					<div className={styles.subtitle}>
						Already have an account?{" "}
						<Link
							className={styles.link}
							to="/login"
							state={{ redirectTo: pathname }}>
							Login
						</Link>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Signup;
