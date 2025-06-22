// Objets interactifs non impactants
export function createInteractiveObject(scene, config) {
  const { sprite, x, y, scale = 1, message = "Objet interactif." } = config;

  const object = scene.add.image(x, y, sprite)
    .setOrigin(0, 1)
    .setInteractive({ useHandCursor: true })
    .setScale(scale)
    .setName(sprite);

  object.on('pointerdown', () => {
    scene.tweens.add({
      targets: object,
      scale: scale * 0.95,
      yoyo: true,
      duration: 100,
    });

    const text = scene.add.text(x, y - 40, message, {
      fontSize: '16px',
      fill: '#ffffff',
      backgroundColor: '#000000',
      padding: { x: 8, y: 4 }
    }).setOrigin(0.5);

    scene.time.delayedCall(1800, () => {
      scene.tweens.add({
        targets: text,
        alpha: 0,
        duration: 400,
        onComplete: () => text.destroy()
      });
    });
  });

  return object;
}