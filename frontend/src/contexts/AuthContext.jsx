import { createContext, useState, useContext,useEffect } from "react";
import 'react-toastify/dist/ReactToastify.css';

// Création du contexte utilisateur
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));

  // Vérifie si un utilisateur est déjà connecté (localStorage)
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // 
  const fetchProfileId = async (userId, token) => {
    try {
      const res = await fetch(`http://localhost:5000/api/game/profile/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });

      if (!res.ok) {
        throw new Error(`Erreur HTTP : ${res.status}`);
      }

      const data = await res.json();
      return data.profile._id;
    } catch (err) {
      console.error("Erreur lors du chargement du profil :", err);
      return null;
    }
  };

  // Connexion avec fetch
  const login = async (email, password, captchaToken) => {
    console.log("AuthContext + login()", email, password, captchaToken);
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({ email, password, captchaToken })
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || "Erreur lors de la connexion");
      }

      const data = await response.json();
      const { token, user } = data;
      const profileId = await fetchProfileId(user._id, token);

      const fullUser = { ...user, profileId };
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(fullUser));
      setUser(fullUser);
      console.log("Utilisateur connecté :", fullUser);
    } catch (err) {
      console.error("AuthContext -> erreur login: ", err.message);
      throw err;
    }
  };

  // Inscription avec fetch
  const register = async ({ username, email, password, captchaToken }) => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({ username, email, password, captchaToken })
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || "Erreur lors de l'inscription");
      }

      const data = await response.json();
      const { token, user } = data;
      const profileId = await fetchProfileId(user._id, token);
      const fullUser = { ...user, profileId };

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(fullUser));
      setUser(fullUser);
    } catch (err) {
      console.error("AuthContext -> erreur register: ", err.message);
      throw err;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);