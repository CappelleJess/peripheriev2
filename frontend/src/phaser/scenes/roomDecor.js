import GameState from '../data/GameState';

export function createInteractiveObject(scene, config) {
  const { sprite, x, y, scale = 1, message = "Objet interactif.", hitbox, key } = config;
  const tempImage = scene.textures.get(sprite).getSourceImage();
  const offsetY = tempImage.height / 2;

  const object = scene.add.image(x, y + offsetY, sprite)
    .setOrigin(0.5, 1)
    .setInteractive({ useHandCursor: true })
    .setScale(scale)
    .setDepth(1)
    .setName(sprite);

    // Hitbox
    const zone = scene.add.zone(
      hitbox?.x || x,
      hitbox?.y || y
    )
    .setSize(hitbox?.width || object.displayWidth, hitbox?.height || object.displayHeight / 2)
    .setOrigin(0.5, 1)
    .setInteractive({ useHandCursor: true })
    .setDepth(2);

    if (key && !GameState.interactions.hasOwnProperty(key)) {
      GameState.interactions[key] = null;
    }

    let memoryText = null;

    zone.on('pointerdown', () => {
      if (key) {
        GameState.interactions[key] = true;
      }
    memoryText = scene.add.text(x, y + 20, message, {
      fontSize: '16px',
      fill: '#ffffff',
      backgroundColor: '#000000',
      padding: { x: 8, y: 4 }
    })
      .setOrigin(0.5)
      .setDepth(12)
      .setVisible(true);

    scene.time.delayedCall(1800, () => {
      memoryText?.setVisible(false);
    });
  });

  zone.on('pointerover', () => {
    if (key && GameState.interactions[key] && memoryText && !GameState.dialogueOpen) {
      memoryText.setVisible(true);
      scene.time.delayedCall(1800, () => {
        memoryText?.setVisible(false);
      });
    }
  });

  zone.on('pointerout', () => {
    scene.input.setDefaultCursor('default');
  });

  return object;
}