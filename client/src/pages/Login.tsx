import { useLocation } from "react-router-dom";
import styles from "../styles/login.module.css";

const Login = () => {
  const { message, redirectTo } = useLocation().state

  console.log(message, redirectTo)

  return (
    <div className={styles.container}>Login</div>
  );
}

export default Login;