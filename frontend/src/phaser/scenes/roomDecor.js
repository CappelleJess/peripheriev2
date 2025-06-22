export function createInteractiveObject(scene, config) {
  const { sprite, x, y, scale = 1, message = "Objet interactif." } = config;
  const tempImage = scene.textures.get(sprite).getSourceImage();
  const offsetY = tempImage.height / 2;

  const object = scene.add.image(x, y + offsetY, sprite)
    .setOrigin(0.5, 1)
    .setInteractive({ useHandCursor: true })
    .setScale(scale)
    .setDepth(1)
    .setName(sprite);

    object.on('pointerdown', () => {
    const text = scene.add.text(x, y - 40, message, {
      fontSize: '16px',
      fill: '#ffffff',
      backgroundColor: '#000000',
      padding: { x: 8, y: 4 }
    })
      .setOrigin(0.5)
      .setDepth(5)
      .disableInteractive?.();

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