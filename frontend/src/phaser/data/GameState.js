// Gestion de l'état de la progression du joueur

const GameState = {
  souvenirScore: 0,
  ancragePasse: 0,
  emergenceNostalgie: 0,

  interactions: {
    flower: null, // examine, smell, ignore
    frame: null,
    book: null
  },

  dialogueOpen: false,
  objectsInteracted: 0,

  // Réinitialise les scores à zéro si besoin
  /* reset() {
    this.souvenirScore = 0;
    this.ancragePasse = 0;
    this.emergenceNostalgie = 0;
    this.interactions = {
      flower: null,
      frame: null,
      book: null
    };
    this.dialogueOpen = false;
    this.objectsInteracted = 0;
  }, */

  // MàJ des scores depuis le backend
  syncWithBackend(data) {
    this.souvenirScore = Math.min(100, Math.max(0,data.souvenirScore || 0));
    this.ancragePasse = Math.min(100, Math.max(0,data.ancragePasse || 0));
    this.emergenceNostalgie = Math.min(100, Math.max(0,data.emergenceNostalgie || 0));
    this.interactions = data.interactions || this.interactions;
    this.objectsInteracted = data.objectsInteracted || 0;
  },

  // MàJ un score sécurisée
  updateScore(key, value) {
    if (this.hasOwnProperty(key)) {
      this[key] = this._clamp(this[key] + value);
    } else {
      console.warn(`Clé invalide dans GameState.updateScore : ${key}`);
    }
  },

  // Empêche un score de sortir de l'intervalle [0, 100]
  _clamp(val) {
    return Math.max(0, Math.min(100, val));
  }
};

export default GameState;