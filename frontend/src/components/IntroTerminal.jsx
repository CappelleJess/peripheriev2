import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/style.css";

const phrases = [
  "Initialisation du terminal...",
  "Chargement des souvenirs...",
  "Connexion établie.",
];

function IntroTerminal() {
  const [displayedText, setDisplayedText] = useState("");
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const alreadyPlayed = sessionStorage.getItem("introDone");

    if (alreadyPlayed === "true") {
      navigate("/dashboard");
      return;
    }

    if (currentPhraseIndex < phrases.length) {
      const phrase = phrases[currentPhraseIndex];

      if (charIndex < phrase.length) {
        const timeout = setTimeout(() => {
          setDisplayedText((prev) => prev + phrase[charIndex]);
          setCharIndex(charIndex + 1);
        }, 20); // vitesse de frappe
        return () => clearTimeout(timeout);
      } else {
        const pause = setTimeout(() => {
          setDisplayedText("");
          setCharIndex(0);
          setCurrentPhraseIndex(currentPhraseIndex + 1);
        }, 1000); // pause entre phrases
        return () => clearTimeout(pause);
      }
    } else {
      const done = setTimeout(() => navigate('/dashboard'), 800);
      return () => clearTimeout(done);
    }
  }, [charIndex, currentPhraseIndex, navigate]);

  return (
    <div className="terminal-intro pixel-font">
      <p>{displayedText}<span className="cursor"></span></p>
    </div>
  );
}

export default IntroTerminal;