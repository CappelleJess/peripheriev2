
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

  // Hitbox personnalisée
  const zone = scene.add.zone(
    x + (hitbox?.offsetX || 0),
    y + (hitbox?.offsetY || 0)
  )
    .setSize(hitbox?.width || object.displayWidth, hitbox?.height || object.displayHeight / 2)
    .setOrigin(0.5, 1)
    .setInteractive({ useHandCursor: true })
    .setDepth(3);

  let isDialogueOpen = false;

  zone.on('pointerdown', () => {
    if (alreadyUsed || GameState.dialogueOpen || isDialogueOpen) return;

    GameState.dialogueOpen = true;
    isDialogueOpen = true;

    const objectTopY = object.y - object.displayHeight;

    const dialogBg = scene.add.rectangle(object.x, objectTopY - 20, 300, 100, 0x000000, 0.9)
      .setOrigin(0.5)
      .setDepth(10);

    const buttons = [];

    const keys = Object.keys(choices);
    keys.forEach((choiceKey, index) => {
      const button = scene.add.text(
        object.x - 80 + index * 80,
        objectTopY - 20,
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

          const memoryText = scene.add.text(object.x, objectTopY - 60, text, {
            fontSize: '14px',
            fill: '#ffffff',
            wordWrap: { width: 260, useAdvancedWrap: true }
          })
            .setOrigin(0.5)
            .setDepth(12);

          scene.time.delayedCall(3000, () => {
            memoryText.destroy();
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
}

function convertScoreKey(key) {
  switch (key) {
    case 'souvenir': return 'souvenirScore';
    case 'ancrage': return 'ancragePasse';
    case 'nostalgie': return 'emergenceNostalgie';
    default: return key;
  }
}