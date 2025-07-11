import express from 'express';
import { config } from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import profileRoutes from './routes/profileRoutes.js';
console.log("Tentative d'importation de profileRoutes...");
import gameRoutes from './routes/gameRoutes.js';
import assetRoutes from './routes/assetRoutes.js';
import emailRoutes from './routes/emailRoutes.js';

config();
connectDB();

console.log("authRoutes.js bien importé");

const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.use(express.json());

// Route de test
app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend opérationnel' });
});

// Routes principales
app.use('/api/auth', (req, res, next) => {
  console.log('Appel à /api/auth');
  next();
}, authRoutes);

app.use('/api/profile', (req, res, next) => {
  console.log('Appel à /api/profile');
  next();
}, profileRoutes);

app.use('/api/game', gameRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serveur backend lancé sur http://localhost:${PORT}`);
});

app.use('/api/assets', assetRoutes);

app.use('/api/email', (req, res, next) => {
  console.log('Appel à /api/email');
  next();
}, emailRoutes);

// Route non trouvée
app.use((req, res) => {
  res.status(404).json({ message: "Route introuvable" });
});