import api from "./axios";

// Inscription
export const register = async ({ username, email, password, captchaToken }) => {
  try {
    const res = await api.post("/auth/register", { 
      username, 
      email, 
      password, 
      captchaToken 
    });

    const { token, user } = res.data;
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    return { token, user };
  } catch (error) {
    if (error.response) {
      console.error("Erreur de réponse du serveur :", error.response.data);
    } else {
      console.error("Erreur lors de la requête :", error.message);
    }
    throw new Error("Échec de l'inscription.");
  }
};

// Connexion via backend
export const login = async ({ email, password, captchaToken }) => {
    const res = await api.post("/auth/login", { 
      email, 
      password, 
      captchaToken 
    });

    const { token, user } = res.data;
    
    if (!token || !user) throw new Error("Réponse backend incomplète");

    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    
    return { token, user };
  };

// Déconnexion
export const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
};

// Utilitaire
export const getToken = () => {
    return localStorage.getItem("token");
};