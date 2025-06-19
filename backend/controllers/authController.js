import '../loadEnv.js';
import { genSalt, hash, compare } from 'bcryptjs';
import pkg from 'jsonwebtoken';
import Joi from 'joi';
import axios from 'axios';
const { sign, verify } = pkg;
import User from '../models/User.js';
import Profile from '../models/Profile.js';

const { JWT_SECRET, RECAPTCHA_SECRET } = process.env;

// Vérification que le fichier .env est bien chargé
if (!process.env.JWT_SECRET) {
  throw new Error("Clé JWT manquante dans le fichier .env");
}
//console.log("Clé JWT chargée :", process.env.JWT_SECRET);

// Middleware pour vérifier le token JWT
const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  console.log('Authorization header:', authHeader);

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(403).json({ message: 'Non authentifié' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = verify(token, JWT_SECRET);
    console.log('Token décodé :', decoded);
    req.user = decoded;
    next();
  } catch (err) {
    console.error('Erreur de décodage JWT:', err.message);
    return res.status(403).json({ message: 'Token invalide ou expiré' });
  }
};

// Schéma de validation Joi
const registerSchema = Joi.object({
  username: Joi.string().min(2).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(64).required(),
  captchaToken: Joi.string().required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(64).required(),
  captchaToken: Joi.string().required(),
});

// Fonction utilitaire pour valider reCAPTCHA
const verifyCaptcha = async (captchaToken) => {
  try {
    const response = await axios.post(
      'https://www.google.com/recaptcha/api/siteverify',
      null,
      {
        params: {
          secret: RECAPTCHA_SECRET,
          response: captchaToken,
        },
      }
    );
    return response.data.success;
  } catch (err) {
    console.error("Erreur lors de la vérification du CAPTCHA :", err.message);
    return false;
  }
};

// Contrôleur d’inscription avec vérification du CAPTCHA
const register = async (req, res) => {
  const { error } = registerSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const { username, email, password, captchaToken } = req.body;
  console.log("Requête d'inscription reçue :", req.body);

  const captchaValid = await verifyCaptcha(captchaToken);
  if (!captchaValid) {
    return res.status(403).json({ message: "CAPTCHA invalide ou absent." });
  }

  try {
    // Vérifier si l'utilisateur existe déjà
    const userExists = await User.findOne({ email });
    if (userExists) {
      console.log("Email déjà pris :", email);
      return res.status(400).json({ message: 'Email déjà utilisé' });
    }

    // Hacher le mot de passe avec bcrypt
    const salt = await genSalt(10); // Créer un "sel" pour le hachage
    const hashedPassword = await hash(password, salt); // Hacher le mot de passe

    // Créer un nouvel utilisateur
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save(); // Sauvegarder l'utilisateur dans la base de données

    // Créer automatiquement un profil vide lié à l'utilisateur
    const newProfile = new Profile({
      user: newUser._id,
      displayName: username, // ou email.split('@')[0]
      avatar: '',
      souvenirScore: 0,
      ancragePasse: 0,
      emergenceNostalgie: 0,
      score: 0,
      currentLevel: 1,
      lastLoginDate: new Date(),
      choices: []
    });
    await newProfile.save();
    console.log("Profil lié sauvegardé :", newProfile);

    // Créer un token JWT pour l'utilisateur
    const token = sign({ userId: User._id, role: User.roles[0]  }, process.env.JWT_SECRET, {
      expiresIn: '10h',
    });

    // Renvoyer le token et l'objet user (attendu par le frontend)
    res.status(201).json({
      token, user: {
        _id: newUser._id,
        username: newUser.username,
        email: newUser.email,
         },
    });
  } catch (error) {
    console.error("Erreur serveur :", error.message);
    res.status(500).json({ message: "Erreur interne, veuillez réessayer plus tard." });
  }
};

// Contrôleur de connexion avec vérification du CAPTCHA
const login = async (req, res) => {
  const { error } = loginSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const { email, password, captchaToken } = req.body;

  const captchaValid = await verifyCaptcha(captchaToken);
  if (!captchaValid) {
    return res.status(403).json({ message: "CAPTCHA invalide ou absent." });
  }

  try {
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(400).json({ message: 'Utilisateur non trouvé' });
    }

    const isMatch = await compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Mot de passe incorrect' });
    }

    const token = sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(200).json({
      token,
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.roles[0],
      },
    });
  } catch (error) {
    console.error("Erreur serveur :", error.message);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

export { register, login, verifyToken };