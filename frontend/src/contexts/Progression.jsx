import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import ScoreTotal from './ScoreTotal';
import '../styles/Progression.css';

const Progression = () => {
  const { token } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch('/api/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setProfile(data.profile);
      } catch (err) {
        console.error('Erreur lors du chargement du profil', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile(); // Lancement de la fonction asynchrone
  }, [token]);

  if (loading) return <div className="progression-box">Chargement...</div>;

  if (!profile) return <div className="progression-box">Profil introuvable</div>;

  const { souvenirScore, ancragePasse, emergenceNostalgie, unlockedAssets = [] } = profile;
  const moyenneScore = Math.round((souvenirScore + ancragePasse + emergenceNostalgie) / 3);

  return (
    <div className="progression-box">
      <h2>Progression du joueur</h2>
      <ScoreTotal score={moyenneScore} />

      <div className="scores">
        <p>Souvenir : <strong>{souvenirScore}</strong> /100</p>
        <p>Ancrage au passé : <strong>{ancragePasse}</strong> /100</p>
        <p>Nostalgie : <strong>{emergenceNostalgie}</strong> /100</p>
      </div>

      <h3>Souvenirs retrouvés</h3>
      <div className="unlocked-assets">
        {unlockedAssets.length === 0 ? (
          <p>Aucun objet débloqué pour le moment.</p>
        ) : (
          unlockedAssets.map((assetName, index) => (
            <span key={index} className="asset-tag">{assetName}</span>
          ))
        )}
      </div>
    </div>
  );
};

export default Progression;