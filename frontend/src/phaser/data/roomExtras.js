export const decorationsConfig = [
  {
    sprite: 'bed',
    x: 512,
    y: 384,
    scale: 1,
    hitbox: {
      x: 154,
      y: 621,
      width: 242,
      height: 329
    },
    message: "Ton ancien lit. Te souviens-tu de la dernière nuit passé ici ?"
  },
  {
    key: 'desk',
    sprite: 'desk',
    x: 512,
    y: 384,
    scale: 1,
    hitbox: {
      x: 831.5,
      y: 411,
      width: 341,
      height: 73
    },
    message: "Un tas de feuilles jaunies jonchent le bureau.",
    unlockKey: 'desk'
  },
  {
    sprite: 'nightstand',
    x: 512,
    y: 384,
    scale: 1,
    hitbox: {
      x: 373,
      y: 471,
      width: 112,
      height: 79
    },
    message: "La table de nuit est encore là."
  },
  {
    key: 'window',
    sprite: 'window',
    x: 512,
    y: 384,
    scale: 1,
    hitbox: {
      x: 520,
      y: 279,
      width: 222,
      height: 270
    },
    message: "Le rideau bouge légèrement, pourtant la fenêtre est fermée ?",
    unlockKey: 'window'
  }
];

  // {
  //   key: 'chair',
  //   sprite: 'chair',
  //   x: 512,
  //   y: 384,
  //   scale: 1,
  //   message: "Une chaise vide, tournée vers la fenêtre.",
  //   unlockKey: 'chair'
  // },