import { useState } from "react";
import axios from "axios";
import FenetrePage from "../components/FenetrePage";
import { useAuth } from "../contexts/AuthContext";

function TestEmail() {
  const { user } = useAuth();
  const [status, setStatus] = useState(null);

  const handleSendEmail = async () => {
    try {
      setStatus("Envoi en cours...");
      const token = localStorage.getItem("token");

      const res = await axios.post("http://localhost:5000/api/email/testemail", {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setStatus(`${res.data.message}`);
    } catch (err) {
      console.error("Erreur :", err);
      setStatus("Erreur lors de l'envoi de l'email.");
    }
  };

  return (
    <FenetrePage titre="Test Email">
      <p className="mb-2">Clique sur le bouton pour envoyer un email test via Mailtrap.</p>

      <button
        onClick={handleSendEmail}
        className="btn-retro px-4 py-2 mt-2"
      >
        Envoyer un email de test
      </button>

      {status && <p className="mt-4 font-mono">{status}</p>}
    </FenetrePage>
  );
}

export default TestEmail;