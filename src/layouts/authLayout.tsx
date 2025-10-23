import { useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router";
import { getTokenFromCookies } from "../api/auth";

const AuthLayout = () => {
  const navigate = useNavigate();
  const token = getTokenFromCookies();

  useEffect(() => {
    if (!token) {
      navigate("/login", { replace: true });
    }
  }, [token, navigate]);

  if (!token) {
    return null; // Or a loading spinner
  }

  return <Outlet />;
};

export default AuthLayout;
