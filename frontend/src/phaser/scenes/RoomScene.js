import Phaser from 'phaser';
import { createMemoryObject } from './memoryItems';
import { createInteractiveObject } from './interactiveItems';
import GameState from '../data/GameState';
import { memoryObjectsConfig } from '../data/roomObjects';
import { interactiveExtrasConfig } from '../data/roomExtras';
import api from '../../utils/api';

export default class RoomScene extends Phaser.Scene {
  constructor() {
    super('RoomScene');
    this.interactionLocked = false; // Évite les doubles clics
  }

  create() {
    // Apparition en fondu
    this.cameras.main.fadeIn(1000, 0, 0, 0); // this.cameras.main.fadeIn(1000);    
    this.cameras.main.setBackgroundColor('#000000'); // this.add.image(0, 0, "background").setOrigin(0);


    /* Son d’ambiance prévu mais non utilisé dans cette version
    Son d'ambiance
    this.ambience = this.sound.add('ambience', { loop: true, volume: 0.4 });
    this.ambience.play(); */

    // Curseur personnalisé
    this.input.setDefaultCursor('url(assets/images/arrow.png), pointer');

    // Fond
    this.add.image(512, 384, 'room')
      .setOrigin(0.5)
      .setDisplaySize(1024, 768)
      .setDepth(-1);

    // Profile
    this.loadPlayerProfile();

    // Texte de score
    this.souvenirText = this.add.text(20, 20, `Souvenirs : ${GameState.souvenirScore}`, {
      fontSize: '20px',
      fill: '#ffffff'
    });

    this.ancrageText = this.add.text(20, 50, `Ancrage : ${GameState.ancragePasse}`, {
      fontSize: '20px',
      fill: '#ffffff'
    });

    this.nostalgieText = this.add.text(20, 80, `Nostalgie : ${GameState.emergenceNostalgie}`, {
      fontSize: '20px',
      fill: '#ffffff'
    });

    this.startTime = Date.now(); // Init du timer
    this.timerText = this.add.text(20, 110, '00:00:00', {
      fontSize: '20px',
      fill: '#ffffff'
    });

    // Chargement des scores backend
    this.initGameProgress();

    // Objets mémoires
    memoryObjectsConfig.forEach(config => {
      createMemoryObject(this, config);
    });

    // Objets non-impactants
    interactiveExtrasConfig.forEach(config => {
      createInteractiveObject(this, config);
    });

    // Initialisation de la progression/Nb d'interactions réalisées
    GameState.objectsInteracted = 0;
  }

  update() {
    // Fin du niveau après 3 interactions
    if (GameState.objectsInteracted >= 3 && !this.transitioning) {
      this.transitioning = true;
      this.cameras.main.fadeOut(1000, 0, 0, 0);
      this.time.delayedCall(1000, () => {
        this.sendGameScoresUpdate(); // Sauvegarde finale facultative
        console.log('Fin du niveau atteinte. Transition à venir.');
        // TODO : transition vers scène suivante
      });
    }

    if (!this.isPaused && this.timerText) {
      const elapsed = Date.now() - this.startTime;
      const hours = Math.floor(elapsed / 3600000).toString().padStart(2, '0');
      const minutes = Math.floor((elapsed % 3600000) / 60000).toString().padStart(2, '0');
      const seconds = Math.floor((elapsed % 60000) / 1000).toString().padStart(2, '0');
      this.timerText.setText(`${hours}:${minutes}:${seconds}`);
    }
  }

  // MàJ des scores
  updateScoreDisplay() {
    this.souvenirText.setText(`Souvenirs : ${GameState.souvenirScore}`);
    this.ancrageText.setText(`Ancrage : ${GameState.ancragePasse}`);
    this.nostalgieText.setText(`Nostalgie : ${GameState.emergenceNostalgie}`);
  }

  // Récupère la progression du joueur via un appel GET à l’API
  initGameProgress() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user?._id) {
      console.error("Utilisateur non authentifié.");
      return;
    }

    api.get(`/game/progress/${user._id}`)
      .then(res => {
        GameState.souvenirScore = res.data.souvenirScore || 0;
        GameState.ancragePasse = res.data.ancragePasse || 0;
        GameState.emergenceNostalgie = res.data.emergenceNostalgie || 0;
        this.updateScoreDisplay();
      })
      .catch(err => {
        console.error("Erreur lors de la récupération des scores :", err);
      });
  }

  // Envoie choix du joueur vers backend via POST
  sendPlayerChoice(choiceKey, impactOnStory) {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user?._id) return;

    api.post(`/game/choices/${user._id}`, {
      choice: choiceKey,
      impactOnStory
    })
      .then(res => {
        GameState.souvenirScore = res.data.souvenirScore;
        GameState.ancragePasse = res.data.ancragePasse;
        GameState.emergenceNostalgie = res.data.emergenceNostalgie;
        this.updateScoreDisplay();
      })
      .catch(err => {
        console.error("Erreur lors de l'enregistrement du choix :", err);
      });
  }

  // Envoie scores actuels vers backend via PUT (trigger fin de scène)
  sendGameScoresUpdate() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user?._id) return;

    api.put(`/game/scores/${user._id}`, {
      souvenirScore: GameState.souvenirScore,
      ancragePasse: GameState.ancragePasse,
      emergenceNostalgie: GameState.emergenceNostalgie
    })
      .then(res => {
        console.log("Scores mis à jour :", res.data);
      })
      .catch(err => {
        console.error("Erreur lors de la mise à jour des scores :", err);
      });
  }

  // Fonction pour récupérer le profil du joueur
  async loadPlayerProfile() {
    const token = localStorage.getItem('token');
    if (!token) {
      console.warn("Aucun token détecté, impossible de charger le profil.");
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/profile', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Erreur HTTP : ${response.status}`);
      }

      const profile = await response.json();
      console.log("Profil chargé depuis le backend :", profile);

      // Utilisation des données
      this.displayName = profile.displayName;
      this.souvenirScore = profile.souvenirScore;
      this.ancragePasse = profile.ancragePasse;
    } catch (error) {
      console.error("Erreur lors du chargement du profil :", error.message);
    }
  }
}