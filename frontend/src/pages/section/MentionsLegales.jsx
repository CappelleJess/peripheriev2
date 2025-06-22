import { useState } from "react";
import FenetrePage from "../../components/FenetrePage";

function MentionsLegales() {
  const [status, setStatus] = useState(null);

  const handleSendEmail = async () => {
    try {
      setStatus("Envoi en cours...");
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:5000/api/email/testemail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (res.ok) {
        setStatus(`${data.message}`);
      } else {
        setStatus(`Erreur : ${data.message || "envoi échoué"}`);
      }
    } catch (err) {
      console.error("Erreur d'envoi :", err);
      setStatus("Échec de l'envoi de l'email.");
    }
  };

  return (
    <FenetrePage titre="[ CLAUSES D'EXISTENCE ]">
      <div className="space-y-4 font-mono text-sm">
        <p><strong>Identité du site</strong></p>
        <p>
          Ce site, intitulé PÉRIPHÉRIE, est une œuvre fictive développée dans le cadre d’un travail de fin d’études en développement web. 
          Il n’a aucun but commercial. Responsable de publication : [Ton Nom]. Contact : demo@peripherie.local
        </p>

        <p><strong>Données personnelles</strong></p>
        <p>
          Le site collecte des données minimales : pseudonyme, email, scores liés à la progression dans le jeu. 
          Ces données sont utilisées uniquement pour permettre la sauvegarde de la progression narrative et l'affichage personnalisé des contenus.
          Aucune donnée n’est partagée avec des tiers.
        </p>
        <p>
          Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez des droits suivants :
          accès, rectification, suppression de vos données. Pour exercer ces droits : demo@peripherie.local
        </p>

        <p><strong>Cookies & sessions</strong></p>
        <p>
          Des cookies strictement techniques sont utilisés pour gérer la session de connexion. 
          Aucune publicité, aucun traqueur, et aucun cookie tiers ne sont utilisés.
        </p>

        <p><strong>Outil de messagerie</strong></p>
        <p>
          Ce site utilise Mailtrap.io comme environnement de test pour simuler les envois d’emails. Aucun email réel n’est envoyé.
        </p>

        <hr className="my-4 border-[#6b728e]" />

        <div className="space-y-2">
          <p className="text-sm italic">Besoin de nous contacter ou de tester le système d'envoi ?</p>
          <button
            onClick={handleSendEmail}
            className="btn-retro px-4 py-2"
          >
            Envoyer un email de test
          </button>
          {status && (
            <p className="mt-2 font-mono text-xs">{status}</p>
          )}
        </div>
      </div>
    </FenetrePage>
  );
}

export default MentionsLegales;