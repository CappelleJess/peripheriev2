import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import FenetrePage from "../components/FenetrePage";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const { login } = useAuth();  // Utiliser le hook du contexte Auth

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
        await window.grecaptcha.ready(async () => {
          //const captchaToken = await window.grecaptcha.execute(import.meta.env.VITE_RECAPTCHA_SITE_KEY, { action: 'submit' });
          const captchaToken = await window.grecaptcha.execute('6LeIgEArAAAAAPc76g2D1L-ts6PZ5iNpWW_DtDlO', { action: 'submit' }); // Pour développement

          await login(email, password, captchaToken);
          console.log("Connexion réussie, redirection...");
          navigate("/dashboard");
        });
      } catch (err) {
        console.error("Erreur attrapée lors de la connexion: ", err);
        setError(err.response?.data?.message || "Identifiants incorrects");
      } finally {
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
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