import { useEffect, useState } from "react";
import FenetrePage from "../../components/FenetrePage";

  const logLines = [
    "[SYSTEM] Initialisation du noyau de mémoire...",
    "[echo@peripherie] > Récupération des traces... ok",
    "[echo@peripherie] > Analyse des fragments liminaux... 42 trouvés",
    "[ERROR] > Fragment 00x13 : corruption détectée",
    "[WARNING] > Présence fantôme non identifiée",
    "[LOG] > 'Tu m'entends, n'est-ce pas ?'",
    "[RECONSTRUCTION] > Chambre n°1 : lumière, parquet, trace de pas",
    "[MEMORY] > Il ou elle a pleuré ici. Tu ne t'en souviens pas.",
    "[INFO] > Dernière connexion : 31 février 2047",
    "[echo@peripherie] > Synchronisation en cours █",
    ">> Quelqu’un ou quelque chose cherche encore à te joindre.",
    ">> Ce que tu es n’est peut-être qu’une réponse différée.",
    "[SYSFAIL] > echo_() : stack overflow detected in layer ‘souvenirScore’",
    "[echo] > ...Je ne suis plus sûr·e que tu sois encore là.",
    "█"
  ];

function Logs() {
  const [lines, setLines] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < logLines.length) {
      const timeout = setTimeout(() => {
        setLines((prev) => [...prev, logLines[index]]);
        setIndex(index + 1);
      }, 1200);
      return () => clearTimeout(timeout);
    }
  }, [index]);

  return (
    <FenetrePage titre="Console de l’écho">
      <div className="bg-[#1b1f3b] text-[#00ff9f] font-mono text-sm px-2 py-4 rounded-md border border-[#6b728e] shadow-inner h-[75vh] overflow-auto">
        {lines.map((line, i) => (
          <p key={i} className={line.includes("[ERROR]") ? "text-[#e60073]" : line.includes("[WARNING]") ? "text-[#d65a31]" : ""}>
            {line}
          </p>
        ))}
      </div>
    </FenetrePage>
  );
}

export default Logs;