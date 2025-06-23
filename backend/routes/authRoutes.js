import express from 'express';
import { register, login, verifyToken } from '../controllers/authController.js';
import rateLimit from "express-rate-limit";

const router = express.Router(); // Créer un routeur Express

// Limite de tentative de login (ex: 5 essais par IP toutes les 15 min)
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100000, // max 5 tentatives
  message: {
    message: "Trop de tentatives. Réessaie dans 15 minutes.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Route pour l'inscription
router.post('/register', register);

// Route pour la connexion
router.post('/login', loginLimiter, login);

router.get('/test', (req, res) => {
  res.send('API auth OK');
});

export default router;