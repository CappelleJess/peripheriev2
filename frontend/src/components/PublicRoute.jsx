import { useAuth } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ element, path }) => {
  const { isAuthenticated } = useAuth();

  const allowedPaths = ["/news", "/play", "/gameuniverse"];
  
  if (isAuthenticated && allowedPaths.includes(path)) {
    return element;
  }
  return isAuthenticated ? <Navigate to="/dashboard" replace /> : element;
};

export default PublicRoute;