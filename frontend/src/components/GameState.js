const GameState = {
  souvenirScore: 0,
  ancragePasse: 0,
  emergenceNostalgie: 0,
  interactions: {},
  dialogueOpen: false,
  objectsInteracted: 0,
  subscribers: [],

  subscribe(callback) {
    this.subscribers.push(callback);
  },

  notify() {
    this.subscribers.forEach(cb => cb(this.getScores()));
  },

  updateScores(newScores) {
    this.souvenirScore = newScores.souvenirScore ?? this.souvenirScore;
    this.ancragePasse = newScores.ancragePasse ?? this.ancragePasse;
    this.emergenceNostalgie = newScores.emergenceNostalgie ?? this.emergenceNostalgie;
    this.notify();
  },

  getScores() {
    return {
      souvenirScore: this.souvenirScore,
      ancragePasse: this.ancragePasse,
      emergenceNostalgie: this.emergenceNostalgie,
    };
  },

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