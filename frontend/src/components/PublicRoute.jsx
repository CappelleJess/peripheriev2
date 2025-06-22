import { useAuth } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ element }) => {
  const { isAuthenticated } = useAuth();

  // Redirige les utilisateurs connectés vers le dashboard uniquement pour login/register
  return isAuthenticated ? <Navigate to="/dashboard" replace /> : element;
};

export default PublicRoute;