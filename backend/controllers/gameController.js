import fs from 'fs';
import path from 'path';
import Profile from '../models/Profile.js';
import Asset from '../models/Assets.js';

// Chargement dynamique du fichier JSON contenant la logique métier des choix
const rulesPath = path.resolve('data/choiceRules.json');
const choiceRules = JSON.parse(fs.readFileSync(rulesPath));

// Récupérer le profil d'un utilisateur
export async function getProfile(req, res) {
    try {
        const profile = await Profile.findOne({ user: req.params.userId });
        if (!profile) return res.status(404).json({ message: "Profil non trouvé" });
        res.status(200).json({ message: "Profil chargé", profile });
    } catch (err) {
        console.error("Erreur dans getProfile:", err);
        res.status(500).json({ message: "Erreur serveur", error: err.message });
    }
}

// Mettre à jour le profil d'un utilisateur
export async function updateProfile(req, res) {
    try {
        const profile = await Profile.findOneAndUpdate(
            { user: req.params.userId },
            req.body,
            { new: true }
        );
        if (!profile) return res.status(404).json({ message: "Profil non trouvé" });
        res.status(200).json({ message: "Profil mis à jour", profile });
    } catch (err) {
        console.error("Erreur dans updateProfile:", err);
        res.status(500).json({ message: "Erreur serveur", error: err.message });
    }
}

// Récupérer la progression du jeu (niveau, score, etc.)
export async function getGameProgress(req, res) {
    try {
        const profile = await Profile.findOne({ user: req.params.userId });
        if (!profile) return res.status(404).json({ message: "Profil non trouvé" });
        res.status(200).json({
            message: "Progression chargée",
            souvenirScore: profile.souvenirScore,
            ancragePasse: profile.ancragePasse,
            emergenceNostalgie: profile.emergenceNostalgie,
            currentLevel: profile.currentLevel
            });
    } catch (err) {
        console.error("Erreur dans getGameProgress:", err);
        res.status(500).json({ message: "Erreur serveur", error: err.message });
    }
}

export const getUnlockedAssets = async (req, res) => {
  try {
    const profileId = req.params.profileId;
    const assets = await Asset.find({ unlockedBy: profileId });
    res.status(200).json({ message: "Objets débloqués récupérés", assets });
  } catch (err) {
    console.error("Erreur dans getUnlockedAssets:", err);
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
};

// Enregistrer un choix du joueur
export async function savePlayerChoice(req, res) {
  const { choice } = req.body;

  if (!choice || !choice.objectKey || !choice.impactOnStory) {
    return res.status(400).json({ message: "Requête mal formée : données de choix manquantes." });
  }

  const userId = req.params.userId;

  try {
    const profile = await Profile.findOneAndUpdate(
      { user: userId },
      {
        $inc: {
          souvenirScore: choice.impactOnStory.souvenir || 0,
          ancragePasse: choice.impactOnStory.ancrage || 0,
          emergenceNostalgie: choice.impactOnStory.emergence || 0,
        },
        $push: {
          choices: {
            choice: choice.choiceKey,
            impactOnStory: choice.impactOnStory,
          }
        },
        $addToSet: choice.unlockAssetKey ? {
          objetsDebloques: choice.unlockAssetKey
        } : {}
      },
      { new: true }
    );

    if (!profile) {
      return res.status(404).json({ message: "Profil non trouvé" });
    }

    res.status(200).json({
      message: "Choix enregistré avec succès",
      souvenirScore: profile.souvenirScore,
      ancragePasse: profile.ancragePasse,
      emergenceNostalgie: profile.emergenceNostalgie,
      objetsDebloques: profile.objetsDebloques
    });
  } catch (err) {
    console.error("Erreur dans savePlayerChoice:", err);
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
}

// Mettre à jour les scores du joueur (souvenirScore, par exemple)
export async function updateGameScores(req, res) {
    try {
        const { souvenirScore, ancragePasse, emergenceNostalgie } = req.body;

        const profile = await Profile.findOneAndUpdate(
            { user: req.params.userId },
            {
                souvenirScore,
                ancragePasse,
                emergenceNostalgie
            },
            { new: true }
        );
        if (!profile) return res.status(404).json({ message: "Profil non trouvé" });
        res.json(profile);
    } catch (err) {
        console.error("Erreur dans updateGameScores:", err);
        res.status(500).json({ message: err.message });
    }
}

// Enregistrement de la durée de session
export const saveSessionDuration = async (req, res) => {
  const { duration } = req.body;
  const userId = req.params.userId;

  try {
    const profile = await Profile.findOne({ user: userId });
    if (!profile) return res.status(404).json({ message: "Profil non trouvé" });

    profile.lastSessionDuration = duration;
    await profile.save();

    res.status(200).json({ message: "Durée de session enregistrée" });
  } catch (err) {
    console.error("Erreur session :", err);
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
};