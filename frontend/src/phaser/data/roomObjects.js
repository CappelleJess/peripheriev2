export const memoryObjectsConfig = [
  {
    key: 'flower',
    sprite: 'flower',
    x: 512,
    y: 384,
    scale: 1,
    choices: {
      examiner: {
        text: "Cette fleur te rappelle un souvenir agréable de l’époque où tout semblait plus simple.",
        scores: { souvenir: 1, ancrage: 1, nostalgie: 1 }
      },
      sentir: {
        text: "L'odeur de la fleur t'envahit, apportant avec elle des bribes de souvenirs.",
        scores: { souvenir: 2, ancrage: 2 }
      },
      ignorer: {
        text: "Ce n'est qu'un brin de fleur fâné.",
        scores: { ancrage: -1 }
      }
    }
  },
  {
    key: 'frame',
    sprite: 'frame',
    x: 300,
    y: 360,
    scale: 1,
    choices: {
      examiner: {
        text: "Un cadre photo usé... Tu reconnais à peine les visages, mais une ambiance familière en émane.",
        scores: { souvenir: 2, nostalgie: 2 }
      },
      ignorer: {
        text: "Tu passes devant sans t'arrêter.",
        scores: { ancrage: -2 }
      }
    }
  },
  {
    key: 'book',
    sprite: 'book',
    x: 470,
    y: 480,
    scale: 1,
    choices: {
      examiner: {
        text: "Un carnet griffonné de souvenirs, d’esquisses, de mots oubliés.",
        scores: { souvenir: 3, nostalgie: 1 }
      },
      ignorer: {
        text: "Tu inspectes rapidement la couverture, juste un journal sans importance.",
        scores: { ancrage: -1 }
      }
    }
  },
  {
    key: 'computer',
    sprite: 'computer',
    x: 470,
    y: 480,
    scale: 1,
    choices: {
      allumer: {
        text: "L'écran s'allume dans un cliquetis. Une lumière pâle, des formes familières... comme un rêve éveillé.",
        scores: { souvenir: 2, nostalgie: 1, emergence: 2 }
      },
      examiner: {
        text: "Tu observes l'écran éteint. Ton reflet t’y regarde en silence.",
        scores: { ancrage: 1 }
      },
      ignorer: {
        text: "Tu laisses l'écran éteint, il ne doit sans doute plus fonctionner. Il reste silencieux, comme figé dans le temps.",
        scores: { ancrage: -1 }
      }
    }
  },
  {
    key: 'lavalamp',
    sprite: 'lamp',
    x: 700,
    y: 380,
    scale: 1,
    choices: {
      examiner: {
        text: "Les bulles de cire montent et redescendent, lentes et hypnotiques.",
        scores: { nostalgie: 2, emergence: 2 }
      },
      toucher: {
        text: "Tu poses la main. C’est tiède, presque vivant. Tu as fait ce geste des dizaines de fois.",
        scores: { souvenir: 1, ancrage: 1, emergence: 1 }
      },
      ignorer: {
        text: "Tu préfères ne pas la regarder. Trop de choses remontent.",
        scores: { emergence: -1 }
      }
    }
  },
  {
    key: 'diskman',
    sprite: 'diskman',
    x: 420,
    y: 520,
    scale: 1,
    choices: {
      ecouter: {
        text: "Une piste démarre. Tu reconnais les premières notes, et ton cœur se serre.",
        scores: { nostalgie: 2, souvenir: 2, emergence: 3 }
      },
      ejecter: {
        text: "Tu ouvres le lecteur. Un disque gravé, écrit à la main. Tu ne le lis pas.",
        scores: { ancrage: 1 }
      },
      ignorer: {
        text: "Tu coupes le son.",
        scores: { emergence: -2 }
      }
    }
  },
  {
    key: 'poster',
    sprite: 'poster',
    x: 300,
    y: 280,
    scale: 1,
    choices: {
      examiner: {
        text: "Un poster abîmé. Tu te souviens de l’avoir fixé là, un été.",
      scores: { souvenir: 1, ancrage: 2, emergence: 1 }
      },
      retirer : {
        text: "Tu décroches le poster. Derrière, un petit mot griffonné apparaît.",
        scores: { nostalgie: 2, emergence: 2 }
      },
      ignorer: {
          text: "Tu ne regardes pas. C’est trop flou, trop loin.",
          scores: { ancrage: -1 }
      }
    }
  },
  {
    key: 'rug',
    sprite: 'rug',
    x: 500,
    y: 600,
    scale: 1,
    choices: {
      lever: {
        text: "Sous le tapis, une tache que tu avais essayer de cacher, elle a l'air d'avoir changé.",
        scores: { souvenir: 1, nostalgie: 1, emergence: 2 }
      },
        assis: {
          text: "Tu t’assieds sur le tapis. Une position familière. Tu fermes les yeux.",
          scores: { ancrage: 2, emergence: 1 }
        },
        ignorer: {
          text: "Tu ne regardes même pas ce tapis, ni ce qu’il cache.",
          scores: { souvenir: -1 }
        }
    }
  }
];