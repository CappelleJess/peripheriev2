import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

function Logout() {
  const { setCurrentUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    setCurrentUser(null); 
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <button onClick={handleLogout}>Déconnexion</button>
  );
}

export default Logout;