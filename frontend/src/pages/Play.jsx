import { useEffect, useState } from 'react';
import Phaser from 'phaser';
import gameConfig from '../phaser/gameConfig';
import FenetrePageJeu from '../components/FenetrePageJeu';
import GameState from '../phaser/data/GameState';
import api from '../utils/api';

// Variable globale pour garder une seule instance du jeu Phaser
let gameInstance = null;

const Play = () => {
  const [visible, setVisible] = useState(false); // Pour effet de fade-in progressif du jeu

  useEffect(() => {
    const token = localStorage.getItem('token');

    // Chargement des scores et de la progression du backend uniquement si connecté
    const loadProfile = async () => {
      try {
        const res = await api.get('/profile');
        if (res.data?.profile) {
          // Synchronise les scores depuis le backend vers GameState
          GameState.syncWithBackend(res.data.profile);
          console.log("GameState synchronisé avec le backend :", GameState);
        }
      } catch (err) {
        console.error("Erreur lors de la récupération du profil :", err);
      }
    };

    if (token) {
      loadProfile();
    } else {
      console.warn("Aucun token trouvé : lancement du jeu en mode invité.");
    }

    // Démarrage du moteur Phaser 
    if (!gameInstance) {
      gameInstance = new Phaser.Game(gameConfig);
    }

    // Prévention du scroll de la page pendant le jeu
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Affichage progressif de la scène pour un effet visuel doux
    setTimeout(() => setVisible(true), 300);

    // Nettoyage lors du démontage du composant
    return () => {
      if (gameInstance) {
        gameInstance.destroy(true); // true = suppression forcée de tous les enfants
        gameInstance = null;
      }
      document.body.style.overflow = originalOverflow;
    };
  }, []); // Dépendances vides = exécution une seule fois au montage

  // Retour du composant JSX — Conteneur du jeu encapsulé dans FenetrePageJeu
  return (
    <FenetrePageJeu
      sceneName="Chambre"
      souvenirScore={GameState.souvenirScore}
      ancragePasse={GameState.ancragePasse}
      emergenceNostalgie={GameState.emergenceNostalgie}
    >
      {/* Zone dans laquelle Phaser injecte le canvas du jeu */}
      <div
        id="phaser-container"
        className={`w-full h-full transition-opacity duration-700 ${visible ? 'opacity-100' : 'opacity-0'}`}
        style={{ padding: 0, margin: 0, boxSizing: 'border-box' }}
      />
    </FenetrePageJeu>
  );
};

export default Play;