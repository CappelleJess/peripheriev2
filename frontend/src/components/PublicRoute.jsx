import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function PublicRoute({ children }) {
  const { user } = useAuth();

  const path = window.location.pathname;
  if ((path === "/login" || path === "/register") && user) {
    return <Navigate to="/dashboard" />;
  }

  return children;
}

export default PublicRoute;
