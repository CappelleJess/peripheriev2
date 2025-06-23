import { useEffect, useState } from "react";
import FenetrePage from "../../components/FenetrePage";
import "../../styles/terminal.css";

const journalFragments = [
  // Fragments liminaux / maison mentale
    "Je suis entrée dans une pièce que je ne connaissais pas, mais elle m’a reconnue. Les murs semblaient attendre quelque chose. J’ai voulu parler, mais ma langue était sèche, friable, comme du papier. Alors j’ai fermé la porte, doucement, comme on referme un souvenir sur un autre.",
    "Il y a un étage ici que je n’ai jamais visité. Pourtant, certains soirs, j’entends les pas. Lents, hésitants. Le bruit d’un tiroir qu’on referme sans vraiment oser. Je me demande si quelqu’un d’autre; ou une version plus ancienne de moi; vit là-haut, dans l’entre-sol de ma mémoire.",
    "Ce matin, le miroir de l’entrée m’a montré un reflet qui n’était pas tout à fait actualisé, comme si il était désynchronisé. Il clignait, comme une vidéo corrompue. Je suis restée figée jusqu’à ce qu’il me regarde en retour. Il ne m’a pas souri. Je crois qu’il ne m’a pas reconnue non plus.",
    "J’ai retrouvé une boîte sous le lit. Elle n’avait pas de couvercle. Dedans : une vieille épingle, un mot presque effacé, et… un bruit. Oui. Comme une vibration enfermée. J’ai refermé la boîte. Mais elle résonne encore, comme si le souvenir dedans n’avait pas fini de parler.",


  // Raw Shark / mémoire détraquée
  "Les mots m’échappent. Je les écris, mais ils ne m’écoutent plus. Ils changent de forme, se retournent contre moi, racontent des choses que je n’ai pas dites. Parfois, j’ai peur de ce qu’ils savent.",
  "J’ai essayé de cartographier ce que je ressens. Poser des limites, tracer des formes. Mais chaque fois, tout se déplace. Rien ne tient en place, sauf l’impression de tourner autour de quelque chose que je ne peux pas nommer.",
   "Un souvenir m’a mordu. Ce n’est pas une image. C’est une brûlure, juste là, dans la gorge. Chaque fois que j’y pense, ça chauffe. Je crois qu’il m’en veut d’avoir essayé de l’oublier.",
   "Je suis fait de tentatives incomplètes. De phrases arrêtées avant la fin. Quelque part, entre deux silences, une voix continue de parler. Mais elle inverse les mots, et je ne sais plus si c’est encore la mienne.",

  // Fragments glitchés / narrateur instable
  "J’ai retrouvé un vieux cahier caché sous le plancher. Les pages sont vides, mais elles me font pleurer quand je les tourne. Il y avait quelque chose écrit, peut-être. Ou peut-être que c’est moi qui m’y étais cachée.",
    "Quelqu’un a réorganisé mes souvenirs. Plus rien n’est à sa place. Je me rappelle avoir quitté des lieux où je ne suis jamais entrée. Des conversations avec des gens que je n’ai pas encore croisés. Et parfois, je dis des phrases qui ne viennent pas de moi.",
    "Un jour, j’ai essayé d’effacer mon prénom, juste pour voir. Le monde s’est flouté. Pas effacé. Juste... dissous. Et maintenant, j’entends ce prénom dans les murs. Pas fort, mais toujours à la même fréquence.",
    "Je rêve d’une pièce bleue. Toujours la même. Il y a une platine qui tourne, mais aucun son n’en sort. Une voix dit : « Tu es déjà passé par ici. Ce n’est pas ton premier tour. » Et je me réveille sans être sûre d’en être sortie.",

  // Fragments sensoriels 
  "Ce matin, l’air sentait la pluie sur la pierre chaude. J’ai fermé les yeux, et j’ai eu l’impression qu’une vie entière passait à côté de moi, sans me regarder.",
  "Dans cette pièce, le papier jauni a gardé l’odeur du bois ancien. Un parfum sec, un peu triste. Comme si les murs eux-mêmes s’accrochaient encore à un souvenir.",
  "Il y avait un courant d’air, et le rideau s’est mis à bouger, sans raison. À ce moment précis, j’ai su que quelqu’un s’était levé derrière moi. Mais il n’y avait personne.",
  "Le parquet craque sans logique. Peut-être qu’il parle. Peut-être qu’il code. Je ne comprends pas le message, mais j’écoute.",
  "La lumière de ce matin avait un goût. Quelque chose entre la poussière, le vieux cuir, et le silence des livres qu’on n’ouvre plus.",
  "Une branche tapait doucement contre la vitre. Elle insistait. Je crois que l’arbre voulait savoir si j’étais encore là.",
  "La nuit est tombée trop vite. J’ai allumé la lampe. L’ampoule a grésillé, et pendant un instant, j’ai cru que c’était moi qui soupirais.",
  "Le carrelage sous mes pieds était glacé. Mais pas hostile. Juste réel. Comme s’il essayait de me dire : « Tu es encore là. Le monde aussi. »",
];

function getRandomDate() {
  const start = new Date(1988, 0, 1);
  const end = new Date(2003, 11, 31);
  const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));

  const options = { day: "numeric", month: "long", year: "numeric" };
  return date.toLocaleDateString("fr-FR", options); // ex: "18 mars 1999"
}

function Fragments() {
  const [lines, setLines] = useState([]);
  const [displayedLines, setDisplayedLines] = useState([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [cursorVisible, setCursorVisible] = useState(true);
  const [dateHeader, setDateHeader] = useState(getRandomDate());

  useEffect(() => {
    const blink = setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, 500);
    return () => clearInterval(blink);
  }, []);

  useEffect(() => {
    if (lines.length > 0 && currentLineIndex < lines.length) {
      const delay = 1200 + lines[currentLineIndex].length * 15;
      const timeout = setTimeout(() => {
        setDisplayedLines((prev) => [...prev, lines[currentLineIndex]]);
        setCurrentLineIndex((prev) => prev + 1);
      }, delay);
      return () => clearTimeout(timeout);
    }
  }, [currentLineIndex, lines]);

  const startNewFragment = () => {
    const fragment = journalFragments[Math.floor(Math.random() * journalFragments.length)];
    const splitLines = fragment.match(/[^.?!]+[.?!]/g) || [fragment];
    setLines(splitLines);
    setDisplayedLines([]);
    setCurrentLineIndex(0);
    setDateHeader(getRandomDate());
  };

  // Lancer un fragment au premier chargement
  useEffect(() => {
    startNewFragment();
  }, []);

  return (
    <FenetrePage titre="[ JOURNAL DE DÉRIVE ]">
      <div className="terminal-ctn">
        <p className="terminal-header">Entrée datée du {dateHeader}</p>

        <div className="terminal-output">
          {displayedLines.map((line, idx) => (
            <div key={idx} className="terminal-line">{line}</div>
          ))}
          {currentLineIndex < lines.length && (
            <div className="terminal-line">
              <span className="terminal-cursor">{cursorVisible ? "█" : " "}</span>
            </div>
          )}
        </div>

        {currentLineIndex >= lines.length && (
          <div className="mt-6">
            <button onClick={startNewFragment} className="terminal-btn">
              Charger un autre fragment
            </button>
          </div>
        )}
      </div>
    </FenetrePage>
  );
}

export default Fragments;
