import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Gamepad2, BarChart4, BookOpen, Cpu, Brain, Terminal, ShieldAlert } from "lucide-react";

function Codex() {
  return (
    <div className="p-6 text-[#faf3e0] font-mono min-h-screen flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-8">Codex</h1>

      <div className="flex flex-col md:flex-row gap-6 justify-center items-center mb-12">
        <motion.div
          whileHover={{ scale: 1.08 }}
          animate={{ y: [0, -6, 0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
          className="w-80 h-64 bg-[#1b1f3b] border-2 border-[#9b5de5] p-6 rounded-2xl shadow-2xl"
        >
          <Link to="/play" className="flex flex-col items-center gap-2 text-center">
            <Gamepad2 className="w-10 h-10" />
            <h2 className="text-xl font-semibold">Lancer le jeu</h2>
            <p className="text-sm">Exploration active des nœuds de mémoire.</p>
          </Link>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.08 }}
          animate={{ y: [0, 5, 0, -5, 0] }}
          transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
          className="w-80 h-64 bg-[#2e2e2e] border border-[#6b728e] p-6 rounded-2xl shadow-xl"
        >
          <Link to="/dashboard" className="flex flex-col items-center gap-2 text-center">
            <BarChart4 className="w-10 h-10" />
            <h2 className="text-xl font-semibold">Tableau de bord</h2>
            <p className="text-sm">Suivi de votre progression et de vos états internes.</p>
          </Link>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 w-full max-w-6xl">
        <SectionLink icon={<BookOpen />} title="Journal de Dérive" to="/fragments" desc="Entrées résiduelles extraites de la mémoire." />
        <SectionLink icon={<Brain />} title="Profil Altéré" to="/bios" desc="Fragments d’identité en résonance instable." />
        <SectionLink icon={<Cpu />} title="Inventaire Mémoriel" to="/reliques" desc="Objets conservés. Vestiges sensoriels." />
        <SectionLink icon={<Terminal />} title="Console de l’Écho" to="/log" desc="Sortie texte du système. Échos anciens." />
        <SectionLink icon={<ShieldAlert />} title="Clauses d’existence" to="/mentions-legales" desc="Conditions implicites du souvenir et de la perte." />
      </div>
    </div>
  );
}

function SectionLink({ icon, title, to, desc }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      animate={{ y: [0, -3, 0, 3, 0] }}
      transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
      className="bg-[#2e2e2e] border border-[#6b728e] p-4 rounded-xl shadow-md h-44 flex flex-col items-center justify-center text-center"
    >
      <Link to={to} className="flex flex-col items-center gap-2">
        <div className="w-8 h-8">{icon}</div>
        <h3 className="text-lg font-medium">{title}</h3>
        <p className="text-xs opacity-80">{desc}</p>
      </Link>
    </motion.div>
  );
}

export default Codex;