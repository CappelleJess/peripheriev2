import express from 'express';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();

const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.MAILTRAP_PASS
  }
});

router.get("/testemail", (req, res) => {
  res.send("La route /testemail est bien active (GET)");
});

router.post("/testemail", async (req, res) => {
  try {
    await transporter.sendMail({
      from: '"Périphérie Test" <test@peripherie.local>',
      to: "demo@peripherie.test",
      subject: "Test d’email depuis Périphérie",
      text: "Ceci est un email de test envoyé depuis le bouton React.",
    });
    res.status(200).json({ message: "Email de test envoyé avec succès." });
  } catch (error) {
    console.error("Erreur d'envoi d'email :", error.message, error);
    res.status(500).json({ message: "Échec de l'envoi de l'email." });
  }
});

export default router;