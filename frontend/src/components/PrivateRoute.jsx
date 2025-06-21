import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function PrivateRoute({ element, requiredRole }) {
  const { user, isAuthenticated } = useAuth();
  const location = useLocation();

  // Pendant le chargement
  if (user === null) {
    return <div>Chargement...</div>;
  }

  // Si non connecté
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Si un rôle est requis mais ne correspond pas
  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to="/login" replace />;
  }

  // Tout est OK
  return element;
}

export default PrivateRoute;