import { useState, useEffect, useCallback, useRef } from 'react';
import FenetreRetro from './FenetreRetro';
import ProfilUser from './ProfilUser';
import Souvenirs from './Souvenirs';
//import api from '../utils/api';
import ScoreTotal from './ScoreTotal.jsx';
import ChargementRetro from './ChargementRetro.jsx';

console.log("Tu charges le bon fichier grosse neuneu");

const DashboardContainer = () => {
  // État pour gérer les fenêtres ouvertes
  const [fenetres, setFenetres] = useState([]);
  const hasOpenedOnce = useRef(false);

  // État pour gérer le profil et son setter
  const [profil, setProfil] = useState({  displayName: 'Test',
  souvenirScore: 0,
  ancragePasse: 0,
  emergenceNostalgie: 0,
  score: 0,
  objetsDebloques: [],
  lastLoginDate: new Date().toISOString()
});

  const toggleFenetre = useCallback((type, titre) => {
    setFenetres((fenetres) => {
      const fenetreExistante = fenetres.find(f => f.type === type);
      if (fenetreExistante) {
        return fenetres.filter(f => f.type !== type);
      } else {
        return [...fenetres, { id: Date.now(), type, titre }];
      }
    });
  }, []);

  // Chargement des données du profil utilisateur
  useEffect(() => {
    console.log("Tentative d'appel à /profile avec FETCH GODDAMMIT");
    const token = localStorage.getItem('token');
    fetch('http://localhost:5000/api/profile', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(`Erreur HTTP ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        console.log("Profil chargé :", data);
        setProfil(data);
      })
      .catch(err => {
        console.error("Erreur de chargement du profil :", err.message);
      });
  }, []);

  useEffect(() => {
    if (profil && fenetres.length === 0 && !hasOpenedOnce.current) {
      toggleFenetre('profil', 'Mon Profil');
      hasOpenedOnce.current = true;
    }
  }, [profil, fenetres.length, toggleFenetre]);

  const fermerFenetre = (id) => {
    setFenetres(fenetres.filter(f => f.id !== id));
  };

    const getContenu = (type) => {
      // Garde-fou global - protection de l'accès 
      if (!profil) return <ChargementRetro message="Chargement des souvenirs..." />;
      switch (type) {
        case "profil":
          return <ProfilUser profile={profil} setProfil={setProfil} />;
        case "souvenirs":
          return <Souvenirs profile={profil} />;
        case "progression":
          return (
            <>
              <div className="mt-4">
                <ScoreTotal score={profil.score} />
              </div>
            </>
          );
        default:
          return <div>Contenu inconnu</div>;
      }
    };

  return (
    <div className="dashboard-retro">
      <div className="dashboard-bar">
        <button className="btn-retro" onClick={() => toggleFenetre('profil', 'Mon Profil')}>
          Profil
        </button>
        <button className="btn-retro" onClick={() => toggleFenetre('souvenirs', 'Souvenirs')}>
          Souvenirs
        </button>
        <button className="btn-retro" onClick={() => toggleFenetre('progression', 'Progression')}>
          Progression
        </button>
      </div>

      <div className="dashboard-fenetres">
        {fenetres.map((f) => (
          <div key={f.id} className="dashboard-fenetre-wrapper">
            <FenetreRetro titre={f.titre} onClose={() => fermerFenetre(f.id)}>
              {getContenu(f.type)}
            </FenetreRetro>
          </div>
        ))}
      </div>
    </div>
  );
};

console.log("DashboardContainer monté !");

export default DashboardContainer;