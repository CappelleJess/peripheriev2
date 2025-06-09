import { createContext, useState, useContext, useEffect } from "react";
import { login as loginService, register as registerService, logout as logoutService } from "../services/authService";
import { useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';

// Créer un contexte pour l'authentification
const AuthContext = createContext();

// Créer un hook personnalisé pour accéder au contexte
export const useAuth = () => useContext(AuthContext);

// Créer le AuthProvider pour gérer l'état d'authentification
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // utilisateur actuel
  const [loading, setLoading] = useState(true); //chargement initial
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

    // Chargement initial depuis localStorage
    useEffect(() => {
      const token = localStorage.getItem("token");

      if (!token || isTokenExpired(token)) {
        localStorage.removeItem("token");
        setUser(null);
        setProfile(null);
        setLoading(false);
        return;
      }
    }, [navigate]);

  // Fonction pour se connecter/connexion via API
  const login = async (email, password, captchaToken) => {
    console.log("AuthContext + login()", email, password, captchaToken);
    try {
      const { token, user } = await loginService({ email, password, captchaToken  });
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        setUser(user);
    } catch (err) {
      console.error("AuthContext -> erreur login: ", err.response?.data || err.message);
      throw err;
    }
  };

  // Fonction pour s'inscrire - via API
  const register = async ({ username, email, password, captchaToken }) => {
    try {
      const { token, user } = await registerService({ username, email, password, captchaToken });
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);
    } catch (err) {
      console.error("Erreur complète backend register():", err);
      if (err.response) {
        console.error("Status:", err.response.status);
        console.error("Data:", err.response.data);
      }
      throw new Error(err.response?.data?.message || "Échec de l'inscription.");
    }
  };

  function isTokenExpired(token) {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const now = Date.now() / 1000;
      return payload.exp < now;
    } catch {
      return true;
    }
  }


  // Fonction pour se déconnecter
  const logout = () => {
    logoutService();
    setUser(null);  // Effacer l'utilisateur de l'état
    localStorage.removeItem("user");  // Supprimer l'utilisateur du localStorage
  };

  // // Vérifier si un utilisateur est connecté
  // const value = { user, login, register, logout, isAuthenticated: !!user };

  return (
  <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, register, logout, profile }}>
    {!loading && children}
  </AuthContext.Provider>
  );
};