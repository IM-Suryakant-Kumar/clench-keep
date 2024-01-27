import { useLocation } from "react-router-dom";

const Login = () => {
  const { message, redirectTo } = useLocation().state

  console.log(message, redirectTo)

  return (
    <div>Login</div>
  );
}

export default Login;