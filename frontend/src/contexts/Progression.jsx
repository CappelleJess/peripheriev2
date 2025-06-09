import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import '../styles/Progression.css';

const Progression = () => {
  const { token } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch('/api/profile', {
          // Appel GET vers le backend pour récupérer les infos du profil
          headers: {
            Authorization: `Bearer ${token}`, // Passe le token JWT dans l'en-tête
          },
        });
        const data = await res.json(); // On récupère les données JSON de la réponse
        setProfile(data.profile); // On stocke les données de profil dans l’état
      } catch (err) {
        console.error('Erreur lors du chargement du profil', err);
        // Affiche une erreur en cas de souci réseau ou JWT invalide
      } finally {
        setLoading(false); // Dans tous les cas, le chargement s
      }
    };

    fetchProfile(); // Lancement de la fonction asynchrone
  }, [token]); // Le hook dépend du token (utile si l'utilisateur change)

  // Pendant le chargement, on affiche un message temporaire
  if (loading) return <div className="progression-box">Chargement...</div>;

  // Si aucun profil n'est disponible (erreur), on affiche un message
  if (!profile) return <div className="progression-box">Profil introuvable</div>;

  // Déstructure les scores et les assets débloqués depuis le profil
  const { souvenirScore, ancragePasse, emergenceNostalgie, unlockedAssets = [] } = profile;

  return (
    <div className="progression-box">
      <h2>Progression du joueur</h2>

      {/* Affichage des 3 scores clés */}
      <div className="scores">
        <p>Souvenir : <strong>{souvenirScore}</strong> /100</p>
        <p>Ancrage au passé : <strong>{ancragePasse}</strong> /100</p>
        <p>Nostalgie : <strong>{emergenceNostalgie}</strong> /100</p>
      </div>

      {/* Section affichant les objets mémoriels débloqués */}
      <h3>Souvenirs retrouvés</h3>
      <div className="unlocked-assets">
        {/* Si aucun asset débloqué, affiche un message */}
        {unlockedAssets.length === 0 ? (
          <p>Aucun objet débloqué pour le moment.</p>
        ) : (
          // Sinon, liste les noms des objets débloqués
          unlockedAssets.map((assetName, index) => (
            <span key={index} className="asset-tag">{assetName}</span>
          ))
        )}
      </div>
    </div>
  );
};

export default Progression;