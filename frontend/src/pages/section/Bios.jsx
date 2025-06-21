import { useEffect, useState } from "react";
import FenetrePage from "../../components/FenetrePage";

const versions = [
  {
    id: "UID-Δ00X1",
    nom: "Lethe",
    statut: "Fragment partiel détecté",
    humeur: "Inconnue / Indéfinissable",
    erreurs: ["Empathie surchargée", "SouvenirScore instable", "Connexion au passé : échouée"]
  },
  {
    id: "UID-∇778Z",
    nom: "???",
    statut: "Synchronisation impossible",
    humeur: "Silencieuse",
    erreurs: ["Données temporelles inversées", "Identité fracturée", "Présence fantôme détectée"]
  },
  {
    id: "UID-λ404",
    nom: "Echo",
    statut: "Profil récupéré à 36%",
    humeur: "Variable selon conditions météo internes",
    erreurs: ["Syntaxe émotionnelle corrompue", "Retard dans le reflet"]
  }
];

function Bios() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const cycle = setInterval(() => {
      setCurrent((prev) => (prev + 1) % versions.length);
    }, 6000); // changement toutes les 6 secondes
    return () => clearInterval(cycle);
  }, []);

  const { id, nom, statut, humeur, erreurs } = versions[current];

  return (
    <FenetrePage titre="Profil altéré">
      <div className="bg-[#1b1f3b] text-[#faf3e0] font-mono text-sm px-4 py-6 rounded border border-[#6b728e] shadow-lg space-y-4 animate-fade-in">
        <div>
          <p><span className="text-[#9b5de5]">Identifiant :</span> {id}</p>
          <p><span className="text-[#4a90e2]">Alias :</span> {nom}</p>
          <p><span className="text-[#00ff9f]">Statut :</span> {statut}</p>
          <p><span className="text-[#d65a31]">Humeur :</span> {humeur}</p>
        </div>

        <div>
          <p className="text-[#e60073] italic">Anomalies détectées :</p>
          <ul className="list-disc list-inside text-[#d6c7ae]">
            {erreurs.map((err, i) => (
              <li key={i}>{err}</li>
            ))}
          </ul>
        </div>

        <p className="italic text-[#6b728e]">// Données sujettes à altération spontanée. Veuillez ne pas faire confiance à ce que vous voyez.</p>
      </div>
    </FenetrePage>
  );
}

export default Bios;
