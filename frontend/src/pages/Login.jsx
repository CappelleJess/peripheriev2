import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import FenetrePage from "../components/FenetrePage";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [emailSuggestions, setEmailSuggestions] = useState([]);

  const navigate = useNavigate();
  const { login } = useAuth();

  // Charger les emails connus au démarrage
  useEffect(() => {
    const savedEmails = JSON.parse(localStorage.getItem("loginEmails")) || [];
    setEmailSuggestions(savedEmails);
  }, []);

  // Enregistre l'email utilisé, en conservant les 5 derniers
  const saveEmailToSuggestions = (email) => {
    let emails = JSON.parse(localStorage.getItem("loginEmails")) || [];

    // Supprimer doublon si déjà présent
    emails = emails.filter((e) => e !== email);

    // Ajouter en tête de liste
    emails.unshift(email);

    // Limite à 5
    if (emails.length > 5) {
      emails = emails.slice(0, 5);
    }

    localStorage.setItem("loginEmails", JSON.stringify(emails));
    setEmailSuggestions(emails); // mise à jour immédiate si retour sur page
  };

  // Charge le script reCAPTCHA v3 si absent
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    console.log("Tentative de connexion...");

    try {
      if (!window.grecaptcha || !window.grecaptcha.execute) {
        throw new Error("reCAPTCHA non chargé ou indisponible.");
      }

      await window.grecaptcha.ready(async () => {
        try {
          const captchaToken = await window.grecaptcha.execute('6LeIgEArAAAAAPc76g2D1L-ts6PZ5iNpWW_DtDlO', {
            action: 'login',
          });

          await login(email, password, captchaToken);
          saveEmailToSuggestions(email);

          const userData = JSON.parse(localStorage.getItem("user"));
          console.log("Connexion réussie, redirection...");

          if (userData?.role === "admin") {
            navigate("/admin", { replace: true });
          } else {
            navigate("/intro", { replace: true });
          }
        } catch (err) {
          console.error("Erreur lors du login ou reCAPTCHA :", err);
          setError("Échec de la connexion ou du CAPTCHA.");
        } finally {
          setLoading(false);
        }
      });
    } catch (err) {
      console.error("Erreur générale lors de la connexion :", err);
      setError("Erreur générale lors de la connexion.");
      setLoading(false);
    }
  };

  return (
    <div>
      <FenetrePage className="cursor">
        <h1>Connexion<span className="cursor"></span></h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Email : </label>
            <input
              type="email"
              list="email-suggestions"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <datalist id="email-suggestions">
              {emailSuggestions.map((suggestion, index) => (
                <option key={index} value={suggestion} />
              ))}
            </datalist>
          </div>

          <div>
            <label>Mot de passe : </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button className="btn-retro" type="submit" disabled={loading}>
            {loading ? "Connexion..." : "Se connecter"}
          </button>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </form>
      </FenetrePage>
    </div>
  );
}

export default Login;