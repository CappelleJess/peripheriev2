import GameState from '../data/GameState';
import api from '../../utils/api';

export function createMemoryObject(scene, config) {
  const { key, sprite, x, y, scale = 1, choices } = config;

  // Vérifie si une interaction a déjà été enregistrée pour cet objet
  const alreadyUsed = GameState.interactions[key] !== null;

  const object = scene.add.image(x, y, sprite)
    .setInteractive({ useHandCursor: true })
    .setScale(scale)
    .setName(key)
    .setAlpha(alreadyUsed ? 0.5 : 1); // Rend l’objet semi-transparent s’il est déjà utilisé

  let isDialogueOpen = false;

  object.on('pointerdown', () => {
    if (alreadyUsed || GameState.dialogueOpen || isDialogueOpen) return;

    GameState.dialogueOpen = true;
    isDialogueOpen = true;

    // Boîte de dialogue principale (fond noir)
    const dialogBg = scene.add.rectangle(object.x, object.y - 80, 300, 100, 0x000000, 0.9).setOrigin(0.5);
    const buttons = [];

    const keys = Object.keys(choices);
    keys.forEach((choiceKey, index) => {
      const button = scene.add.text(object.x - 80 + index * 80, object.y - 80, choiceKey, {
        fontSize: '14px',
        color: '#ffffff',
        backgroundColor: '#444',
        padding: { x: 6, y: 4 }
      })
        .setInteractive({ useHandCursor: true })
        .setOrigin(0.5)
        .on('pointerdown', async () => {
          const { text, scores } = choices[choiceKey];

          // Met à jour les scores de manière sécurisée via GameState.updateScore
          for (const [scoreKey, delta] of Object.entries(scores)) {
            GameState.updateScore(convertScoreKey(scoreKey), delta);
          }

          // Marque l’objet comme utilisé dans GameState
          GameState.interactions[key] = choiceKey;
          GameState.objectsInteracted += 1;

          object.setAlpha(0.5); // rend l’objet semi-transparent

          // Affiche le texte souvenir temporairement
          const memoryText = scene.add.text(object.x, object.y - 130, text, {
            fontSize: '14px',
            fill: '#ffffff',
            wordWrap: { width: 260, useAdvancedWrap: true }
          }).setOrigin(0.5);

          scene.time.delayedCall(3000, () => {
            memoryText.destroy();
          });

          // Appel API vers /game/choices/:id
          const user = JSON.parse(localStorage.getItem('user'));
          if (user?._id) {
            try {
              await api.post(`/game/choices/${user._id}`, {
                choice: {
                  objectKey: key, choiceKey,
                  unlockAssetKey: config.unlockKey,
                  impactOnStory: scores
                }
              });
              console.log("Interaction enregistrée côté backend :", key, choiceKey);
            } catch (err) {
              console.error("Erreur lors de l’envoi de l’interaction :", err);
            }
          }

          // Nettoyage de la boîte de dialogue
          buttons.forEach(btn => btn.destroy());
          dialogBg.destroy();

          GameState.dialogueOpen = false;
        });

      buttons.push(button);
    });
  });
}

// Convertit les noms simplifiés en noms utilisés dans GameState
function convertScoreKey(key) {
  switch (key) {
    case 'souvenir': return 'souvenirScore';
    case 'ancrage': return 'ancragePasse';
    case 'nostalgie': return 'emergenceNostalgie';
    default: return key;
  }
}


/**
 * PLAN OPTIONNEL : Utiliser une version noir et blanc d’un sprite
 *
 * Préparer deux versions du sprite :
 *  - Ex. : 'flower.png' (normal) et 'flower_bw.png' (noir & blanc)
 *
 * Charger les deux dans preload() de Phaser :
 *   this.load.image('flower', 'flower.png');
 *   this.load.image('flower_bw', 'flower_bw.png');
 *
 * Dans createMemoryObject :
 *   const spriteKey = alreadyUsed ? `${sprite}_bw` : sprite;
 *   const object = scene.add.image(x, y, spriteKey)...
 *
 * Lorsqu’un choix est fait :
 *   object.setTexture(`${sprite}_bw`);
 *
 */