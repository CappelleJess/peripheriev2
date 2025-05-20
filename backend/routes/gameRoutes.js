import { Router } from 'express';
const router = Router();
import { verifyToken } from '../middleware/verifyToken.js';
import { getProfile, updateProfile, getGameProgress, savePlayerChoice, updateGameScores, saveSessionDuration } from '../controllers/gameController.js';

// Récupérer le profil d'un utilisateur
router.get('/profile/:userId', getProfile);

// Mettre à jour le profil d'un utilisateur
router.put('/profile/:userId', updateProfile);

// Récupérer la progression du jeu (niveau, score, etc.)
router.get('/game/progress/:userId', getGameProgress);

// Enregistrer un choix du joueur
router.post('/game/choices/:userId', savePlayerChoice);

// Mettre à jour les scores du joueur
router.put('/game/scores/:userId', updateGameScores);

// Joueur inscrit accède aux données de progression du jeu
router.post('/choices/:userId', verifyToken, savePlayerChoice);
router.put('/scores/:userId', verifyToken, updateGameScores);
router.get('/progress/:userId', verifyToken, getGameProgress);
router.post('/session/:userId', verifyToken, saveSessionDuration);

export default router;
