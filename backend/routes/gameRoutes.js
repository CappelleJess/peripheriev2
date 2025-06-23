import { Router } from 'express';
const router = Router();
import { verifyToken } from '../middleware/verifyToken.js';
import * as gameController from '../controllers/gameController.js';

// Récupérer le profil d'un utilisateur
router.get('/profile/:userId', gameController.getProfile);

// Mettre à jour le profil d'un utilisateur
router.put('/profile/:userId', gameController.updateProfile);

// Récupérer la progression du jeu (niveau, score, etc.)
router.get('/game/progress/:userId', gameController.getGameProgress);

// Enregistrer un choix du joueur
router.post('/game/choices/:userId', verifyToken, gameController.savePlayerChoice);

// Mettre à jour les scores du joueur
router.put('/game/scores/:userId', verifyToken, gameController.updateGameScores);

// Joueur inscrit accède aux données de progression du jeu
router.post('/choices/:userId', verifyToken, gameController.savePlayerChoice);
router.post('/session/:userId', verifyToken, gameController.saveSessionDuration);

router.get('/progress/:userId', verifyToken, gameController.getGameProgress);

router.get("/unlocked/:profileId", verifyToken, gameController.getUnlockedAssets);


export default router;
