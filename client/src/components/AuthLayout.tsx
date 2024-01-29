import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppSelector } from "../features/hook";

const AuthLayout = () => {
  const state = useLocation().state;
  const pathname = state?.redirectTo || "/note";
  const user = useAppSelector(state => state.auth.user)

  return user ? <Navigate to={pathname} replace /> :  <Outlet />; 
}

export default AuthLayout;