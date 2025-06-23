import { useState } from "react";
import api from "../utils/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProfilUser = ({ profile, setProfile }) => {
  const [displayName, setDisplayName] = useState(profile.displayName || '');
  const [isSaving, setIsSaving] = useState(false);

  if (!profile) {
    return <div>Chargement du profil...</div>;
  }

  const handleSave = async () => {
    try {
      setIsSaving(true);
      const updatedProfile = { ...profile, displayName };
      const res = await api.put('/profile', updatedProfile);

      if (res.status === 200 && res.data) {
        if (typeof setProfile === "function") {
          setProfile(res.data);
        }
        toast.success("Nom mis à jour !");
      } else {
        throw new Error("Réponse inattendue du serveur");
      }
    } catch (error) {
      console.error("Erreur de mise à jour du profil :", error);
      toast.error(error.response?.data?.message || "Erreur lors de la mise à jour du profil.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="profil-container">
      <h2 className="profil-title">Mon Profil</h2>

      <div className="profil-line">
        <label className="profil-label">Nom :</label>
        <input
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          className="profil-input"
        />
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="btn-retro"
        >
          {isSaving ? "Enregistrement..." : "Enregistrer"}
        </button>
      </div>

      <div><span className="profil-tag tag-mint">Souvenirs :</span> {profile.souvenirScore}</div>
      <div><span className="profil-tag tag-lilas">Ancrage au passé :</span> {profile.ancragePasse}</div>
      <div><span className="profil-tag tag-peche">Émergence nostalgique :</span> {profile.emergenceNostalgie}</div>
      <div><span className="profil-tag">Score total :</span> {profile.score}</div>
      <div className="profil-footer">Dernière connexion : {new Date(profile.lastLoginDate).toLocaleDateString("fr-BE")}</div>
    </div>
  );
};

export default ProfilUser;