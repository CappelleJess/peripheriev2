import Profile from '../models/Profile.js';

// Obtenir tous les profils (admin)
export const getAllProfiles = async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', 'email');
    res.json(profiles);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// Obtenir le profil de l'utilisateur connecté
export const getMyProfile = async (req, res) => {
  const userId = req.user.userId;
  console.log("getMyProfile exécuté");
  console.log("Token décodé utilisateur :", userId);
  try {
    const profile = await Profile.findOne({ user: userId });
    if (!profile) {
      console.warn("Aucun profil trouvé pour cet utilisateur");
      return res.status(404).json({ message: 'Profil non trouvé' });
    }
    console.log("Profil trouvé :", profile);
    res.json(profile);
  } catch (error) {
    console.error("Erreur serveur dans getMyProfile :", error.message);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// Mettre à jour le profil de l'utilisateur connecté
export const updateMyProfile = async (req, res) => {
  try {
    console.log("updateMyProfile reçu avec :", req.body);
    console.log("Utilisateur extrait du token :", req.user.userId);
    const updatedProfile = await Profile.findOneAndUpdate(
      { user: req.user.userId },
      { $set: req.body },
      { new: true }
    );
    if (!updatedProfile) {
      console.warn("Aucun profil trouvé pour userId =", req.user.userId);
      return res.status(404).json({ message: 'Profil non trouvé' });
    }
    console.log("Profil mis à jour :", updatedProfile);
    res.json(updatedProfile);
  } catch (error) {
    console.error("Erreur updateMyProfile :", error.message);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// Supprimer son propre profil
export const deleteMyProfile = async (req, res) => {
  const userId = req.user.userId;
  try {
    const result = await Profile.findOneAndDelete({ user: userId });
    if (!result) {
      return res.status(404).json({ message: 'Profil non trouvé' });
    }
    res.json({ message: 'Profil supprimé' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};