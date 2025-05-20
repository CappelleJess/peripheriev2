import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import FenetrePage from "../components/FenetrePage";

function Register() {
  const [formData, setFormData] = useState({
    username:"",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { register } = useAuth();

  // Charger reCAPTCHA v3 si pas déjà injecté
  useEffect(() => {
    const scriptId = "recaptcha-script";
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.src = `https://www.google.com/recaptcha/api.js?render=6LeIgEArAAAAAPc76g2D1L-ts6PZ5iNpWW_DtDlO`;
      script.async = true;
      script.id = scriptId;
      document.body.appendChild(script);
    }
  }, []);

  // Met à jour les champs du formulaire
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Validation des champs du formulaire
  const validateForm = () => {
    const formErrors = {};
    if (!formData.username) formErrors.username = "Le nom d'utilisateur est requis";
    if (!formData.email) formErrors.email = "L'email est requis";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      formErrors.email = "Email invalide";
    if (!formData.password) formErrors.password = "Le mot de passe est requis";
    else if (formData.password.length < 6)
      formErrors.password = "Le mot de passe doit contenir au moins 6 caractères";
    if (formData.password !== formData.confirmPassword)
      formErrors.confirmPassword = "Les mots de passe ne correspondent pas";

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  // Soumission du formulaire d'inscription
   const handleSubmit = async (e) => {
  e.preventDefault();
  setSuccessMessage("");
  setErrors({});
  setLoading(true);

  if (!validateForm()) {
    setLoading(false);
    return;
  }

  try {
    if (!window.grecaptcha) {
      throw new Error("grecaptcha non chargé !");
    }

    const siteKey = "6LeIgEArAAAAAPc76g2D1L-ts6PZ5iNpWW_DtDlO";

    // ATTENDRE que grecaptcha soit *prêt*
    const captchaToken = await new Promise((resolve, reject) => {
      window.grecaptcha.ready(() => {
        window.grecaptcha.execute(siteKey, { action: "submit" })
          .then((token) => {
            if (!token) reject(new Error("Token null"));
            else resolve(token);
          })
          .catch(reject);
      });
    });

    console.log("Token généré :", captchaToken);

    await register({
      username: formData.username,
      email: formData.email,
      password: formData.password,
      captchaToken,
    });

    setSuccessMessage("Compte créé avec succès !");
    setTimeout(() => navigate("/dashboard"), 2000);
  } catch (err) {
    console.error("Erreur d'inscription :", err);
    alert("Échec de l'inscription : " + err.message);
  } finally {
    setLoading(false);
  }
};

  return (
    <div>
      <FenetrePage>
        <h1>Inscription</h1>
        {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
        <form onSubmit={handleSubmit}>
          <input type="text" name="username" placeholder="Nom" value={formData.username} onChange={handleChange} />
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
          <input type="password" name="password" placeholder="Mot de passe" value={formData.password} onChange={handleChange} />
          <input type="password" name="confirmPassword" placeholder="Confirmez le mot de passe" value={formData.confirmPassword} onChange={handleChange} />
          <button type="submit" disabled={loading}>{loading ? "Création..." : "S'inscrire"}</button>
        </form>
        {Object.values(errors).map((msg, i) => (
          <p key={i} style={{ color: "red" }}>{msg}</p>
        ))}
      </FenetrePage>
    </div>
  );
}

export default Register;