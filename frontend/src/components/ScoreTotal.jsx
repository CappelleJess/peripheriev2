import { motion } from 'framer-motion';

// Obtenir une couleur dynamique selon le score
const getColor = (score) => {
  if (score >= 80) return '#00ff9f'; // vert flashy
  if (score >= 50) return '#4a90e2'; // bleu calme
  return '#d65a31';                  // orange nostalgie
};

// Obtenir une description qualitative
const getLabel = (score) => {
  if (score >= 80) return 'Souvenirs intenses';
  if (score >= 50) return 'Mémoire partielle';
  if (score > 0) return 'Écho lointain';
  return 'Amnésie totale';
};

const ScoreTotal = ({ score }) => {
  return (
    <div className="bg-[#1b1f3b] p-4 rounded-2xl shadow-md text-[#faf3e0] w-full max-w-md mx-auto">
      <img src="/img/icons/forgetmenot.png"
        alt="Symbole du souvenir"
        className="w-8 h-8 mb-2 mx-auto"
      />
      <h3 className="text-lg font-semibold mb-2 text-center">Score global</h3>
      <div className="relative w-full h-6 bg-[#6b728e] rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{
            width: `${score}%`,
            backgroundColor: getColor(score),
          }}
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ duration: 1.2 }}
        />
      </div>
      <p className="text-sm mt-2 text-center">{score}/100</p>
      <p className="italic text-xs mt-1 text-center text-[#d6c7ae]">{getLabel(score)}</p>
    </div>
  );
};

export default ScoreTotal;