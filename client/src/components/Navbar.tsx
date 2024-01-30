import { useAppSelector } from "../features/hook";
import styles from "../styles/navbar.module.css";

const Navbar = () => {
  const user = useAppSelector(state => state.auth.user)
  
  return (
    <div className={styles.container}>Navbar</div>
  );
}

export default Navbar;