import { Link } from "react-router-dom";
import Notebook from "../../assets/notebook.svg";
import styles from "./home.module.css";
import { GiPencil } from "react-icons/gi";

const Home = () => (
	<div className={styles.cont}>
		<div className={styles.top}>
			<img className={styles.image} src={Notebook} alt="notebook" />
		</div>

		<div className={styles.bottom}>
			<h2 className={styles.logo}>ClenchKeep</h2>
			<GiPencil className={styles.pen} />
			<p className={styles.title}>
				A modern way to Keep and handle your notes digitally
			</p>
			<Link to="note" className={styles.link}>
				Get Started
			</Link>
		</div>
	</div>
);

export default Home;
