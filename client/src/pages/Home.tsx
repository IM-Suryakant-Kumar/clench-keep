import Notebook from "../assets/notebook.svg";
import styles from "../styles/home.module.css";

const Home = () => {
	return (
		<div className={styles.cont}>
			<div className={styles.top}>
				<img className={styles.image} src={Notebook} alt="notebook" />
			</div>

			<div className={styles.bottom}>
				<h2 className={styles.logo}>ClenchKeep</h2>
				<p className={styles.title}>A modern way to Keep and handle your notes digitally</p>
				<button className={styles.button}>Get Started</button>
			</div>
		</div>
	);
};

export default Home;
