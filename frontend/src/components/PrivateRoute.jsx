import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

/**
 * Composant pour protéger une route. 
 * Si l'utilisateur est connecté, affiche le composant donné.
 * Sinon, redirige vers /login.
 */
function PrivateRoute({ children, requiredRole }) {
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
  return children;
}

export default PrivateRoute;