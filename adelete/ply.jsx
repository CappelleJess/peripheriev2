import { useEffect, useState } from 'react';
import Phaser from 'phaser';
import gameConfig from '../phaser/gameConfig';
import FenetrePageJeu from '../components/FenetrePageJeu';
import GameState from '../phaser/data/GameState';
import api from '../utils/api';

let gameInstance = null;

const Play = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Lancer Phaser
    if (!gameInstance) {
      gameInstance = new Phaser.Game(gameConfig);
    }

    // Appliquer overflow: hidden au body uniquement ici
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Délai pour effet d’apparition
    setTimeout(() => setVisible(true), 300);

    return () => {
      // Nettoyage : détruire Phaser + rétablir overflow
      if (gameInstance) {
        gameInstance.destroy(true);
        gameInstance = null;
      }
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  return (
    <FenetrePageJeu sceneName="Chambre" 
      souvenirScore={GameState.souvenirScore}
      ancragePasse={GameState.ancragePasse}
      emergenceNostalgie={GameState.emergenceNostalgie}>
      <div id="phaser-container"
        className={`w-full h-full transition-opacity duration-700 ${visible ? 'opacity-100' : 'opacity-0'}`}
  style={{ padding: 0, margin: 0, boxSizing: 'border-box' }} />
    </FenetrePageJeu>
  );
};

export default Play;