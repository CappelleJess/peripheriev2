import { useState, useEffect, useRef } from "react";
import FenetrePage from "../../components/FenetrePage";
import { motion } from "framer-motion";

const nodeBank = [
  { label: "oubli", text: "Il y a un mot que j’ai perdu. Il tenait mon équilibre. Je crois que je vacille depuis." },
  { label: "avatar corrompu", text: "Mon reflet me ressemble moins chaque jour. Peut-être que c’est lui qui me remplace." },
  { label: "répétition", text: "Les mêmes gestes, encore et encore. Un écho de moi dans une boucle sans fin." },
  { label: "brouillard", text: "Tout est là, juste derrière le voile. Mais je n’arrive pas à lever la main." },
  { label: "palimpseste", text: "Ma mémoire est une réécriture constante. Les anciennes versions saignent encore entre les lignes." },
  { label: "disjonction", text: "Une partie de moi agit avant que je décide. L’autre regarde, sans voix." },
  { label: "souvenir fantôme", text: "Je me rappelle d’une chose qui n’est jamais arrivée." },
  { label: "emprunt", text: "Certains souvenirs ne sont pas à moi. Je les reconnais pourtant." },
  { label: "interférence", text: "Des pensées étrangères prennent place dans mes silences." },
];

// Positions aléatoires sur l'écran
const generateRandomNodes = (count) => {
  const selected = [...nodeBank].sort(() => 0.5 - Math.random()).slice(0, count);
  return selected.map((node, index) => ({
    ...node,
    id: index,
    top: `${Math.random() * 60 + 10}%`,
    left: `${Math.random() * 60 + 10}%`,
  }));
};

function Bios() {
  const [nodes, setNodes] = useState(() => generateRandomNodes(6));
  const [selected, setSelected] = useState(null);
  const containerRef = useRef(null);

  const recompile = () => {
    setSelected(null);
    setNodes(generateRandomNodes(6));
  };

  // Fonction pour dessiner des lignes entre tous les nœuds
  const drawLines = () => {
    const svg = document.getElementById("bios-svg");
    if (!svg) return;
    svg.innerHTML = "";
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const nodeA = document.getElementById(`node-${nodes[i].id}`);
        const nodeB = document.getElementById(`node-${nodes[j].id}`);
        if (nodeA && nodeB) {
          const rectA = nodeA.getBoundingClientRect();
          const rectB = nodeB.getBoundingClientRect();
          const parent = svg.getBoundingClientRect();
          const x1 = rectA.left + rectA.width / 2 - parent.left;
          const y1 = rectA.top + rectA.height / 2 - parent.top;
          const x2 = rectB.left + rectB.width / 2 - parent.left;
          const y2 = rectB.top + rectB.height / 2 - parent.top;
          const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
          line.setAttribute("x1", x1);
          line.setAttribute("y1", y1);
          line.setAttribute("x2", x2);
          line.setAttribute("y2", y2);
          line.setAttribute("stroke", "#6b728e");
          line.setAttribute("stroke-width", "1");
          svg.appendChild(line);
        }
      }
    }
  };

  useEffect(() => {
    setTimeout(drawLines, 200);
  }, [nodes]);

  return (
    <FenetrePage titre="Profil altéré">
      <div className="relative w-full h-[70vh] bg-[#1b1f3b] border border-[#9b5de5] rounded-xl overflow-hidden" ref={containerRef}>
        <svg id="bios-svg" className="absolute top-0 left-0 w-full h-full z-0" />

        {nodes.map((node) => (
          <motion.div
            key={node.id}
            id={`node-${node.id}`}
            onClick={() => setSelected(node.id)}
            className="absolute z-10 cursor-pointer text-[#faf3e0] px-3 py-1 text-sm rounded-full border border-[#faf3e0] hover:bg-[#9b5de5] transition"
            style={{ top: node.top, left: node.left }}
            animate={{ y: [0, 4, 0], x: [0, -2, 0] }}
            transition={{ repeat: Infinity, duration: 3 }}
          >
            {node.label}
          </motion.div>
        ))}

        {selected !== null && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-[#2e2e2e] text-[#faf3e0] p-4 rounded-xl w-3/4 shadow-lg border border-[#9b5de5] z-20">
            <p className="text-sm italic">{nodes[selected].text}</p>
          </div>
        )}

        <button
          onClick={recompile}
          className="absolute top-2 right-4 z-20 bg-[#9b5de5] text-[#1b1f3b] px-3 py-1 text-sm font-bold rounded hover:bg-[#b28df5] transition"
        >
          Recompiler le profil
        </button>
      </div>
    </FenetrePage>
  );
}

export default Bios;
