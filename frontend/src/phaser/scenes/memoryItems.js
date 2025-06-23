import GameState from '../data/GameState';
import api from '../../utils/api';

export function createMemoryObject(scene, config) {
  const { key, sprite, x, y, scale = 1, choices, hitbox } = config;

  if (!scene.textures.exists(sprite)) {
    console.warn(`Le sprite "${sprite}" n'est pas chargé dans BootScene !`);
    return;
  }

  const tempImage = scene.textures.get(sprite).getSourceImage();
  const offsetY = tempImage.height / 2;

  if (!GameState.interactions.hasOwnProperty(key)) {
    GameState.interactions[key] = null;
  }

  const alreadyUsed = GameState.interactions[key] !== null;

  const object = scene.add.image(x, y + offsetY, sprite)
    .setOrigin(0.5, 1)
    .setScale(scale)
    .setDepth(2)
    .setName(key)
    .setAlpha(alreadyUsed ? 0.5 : 1); 

    // Hitbox
    const zone = scene.add.zone(
    hitbox?.x || x,
    hitbox?.y || y
  )
    .setSize(hitbox?.width || object.displayWidth, hitbox?.height || object.displayHeight / 2)
    .setOrigin(0.5, 1)
    .setInteractive({ useHandCursor: true })
    .setDepth(3);

  let isDialogueOpen = false;
  let memoryText = null;

  zone.on('pointerdown', () => {
    if (alreadyUsed || GameState.dialogueOpen || isDialogueOpen) return;

    GameState.dialogueOpen = true;
    isDialogueOpen = true;

    const objectTopY = zone.y - zone.height;

    // Boîte de dialogue principale
    const dialogBg = scene.add.rectangle(object.x, objectTopY + 40, 300, 100, 0x000000, 0.9)
      .setOrigin(0.5)
      .setDepth(10)
      .disableInteractive?.();

    const buttons = [];

    const keys = Object.keys(choices);
    keys.forEach((choiceKey, index) => {
      const button = scene.add.text(
        object.x - 80 + index * 80,
        objectTopY + 40,
        choiceKey,
        {
          fontSize: '14px',
          color: '#ffffff',
          backgroundColor: '#444',
          padding: { x: 6, y: 4 }
        }
      )
      .setInteractive({ useHandCursor: true })
      .setOrigin(0.5)
      .setDepth(11)
      .on('pointerdown', async () => {
        const { text, scores } = choices[choiceKey];

        for (const [scoreKey, delta] of Object.entries(scores)) {
          GameState.updateScore(convertScoreKey(scoreKey), delta);
        }

        GameState.interactions[key] = choiceKey;
        GameState.objectsInteracted += 1;
        object.setAlpha(0.9); 

        memoryText = scene.add.text(object.x, objectTopY + 30, text, {
          fontSize: '18px',
          fill: '#ffffff',
          wordWrap: { width: 320, useAdvancedWrap: true },
          backgroundColor: '#000000',
          padding: { x: 8, y: 4 }
        })
          .setOrigin(0.5)
          .setDepth(12)
          .setVisible(true);

        scene.time.delayedCall(5000, () => {
          if (memoryText) memoryText.setVisible(false);
        });

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
            console.log("Interaction envoyée :", key, choiceKey);
          } catch (err) {
            console.error("Erreur API :", err);
          }
        }

        buttons.forEach(btn => btn.destroy());
        dialogBg.destroy();
        GameState.dialogueOpen = false;
      });

      buttons.push(button);
    });
  });

  /* if (process.env.NODE_ENV !== 'production') {
    scene.add.rectangle(
      zone.x, zone.y,
      zone.width, zone.height,
      0xff0000, 0.3
    ).setOrigin(0.5, 1).setDepth(4);
  } */

    zone.on('pointerover', () => {
    scene.input.setDefaultCursor('default');
    if (GameState.interactions[key] && memoryText && !GameState.dialogueOpen) {
      memoryText.setVisible(true);
      scene.time.delayedCall(3000, () => {
        memoryText?.setVisible(false);
      });
    }
  });

  zone.on('pointerout', () => {
    scene.input.setDefaultCursor('default');
  });
}

// Convertit les noms en clefs
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