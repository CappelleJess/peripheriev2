import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { motion } from "framer-motion";
import {
  Gamepad2,
  BarChart4,
  BookOpen,
  Cpu,
  Brain,
  Terminal,
  ShieldAlert
} from "lucide-react";

function Codex() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="p-6 text-[#faf3e0] font-mono min-h-screen flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-8">Codex</h1>

      <div className="flex flex-col md:flex-row gap-6 justify-center items-center mb-12">
        {/* Carte Jeu */}
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

        {/* Carte Dashboard (protégée) */}
        <motion.div
          whileHover={isAuthenticated ? { scale: 1.08 } : {}}
          animate={{ y: [0, 5, 0, -5, 0] }}
          transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
          className={`w-80 h-64 p-6 rounded-2xl shadow-xl border 
            ${isAuthenticated 
              ? "bg-[#2e2e2e] border-[#6b728e] cursor-pointer" 
              : "bg-[#2e2e2e]/50 border-[#444] opacity-40 cursor-not-allowed"}`}
          onClick={() => {
            if (isAuthenticated) navigate("/dashboard");
          }}
        >
          <div className="flex flex-col items-center gap-2 text-center">
            <BarChart4 className="w-10 h-10" />
            <h2 className="text-xl font-semibold">Tableau de bord</h2>
            <p className="text-sm">
              {isAuthenticated
                ? "Suivi de votre progression et de vos états internes."
                : "Connecte-toi pour accéder au dashboard."}
            </p>
          </div>
        </motion.div>
      </div>

      {/* Cartes secondaires */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 w-full max-w-6xl">
        <SectionLink
          icon={<BookOpen />}
          title="Journal de Dérive"
          to="/fragments"
          desc="Entrées résiduelles extraites de la mémoire."
          disabled={!isAuthenticated}
        />
        <SectionLink
          icon={<Brain />}
          title="Profil Altéré"
          to="/bios"
          desc="Fragments d’identité en résonance instable."
          disabled={!isAuthenticated}
        />
        <SectionLink
          icon={<Cpu />}
          title="Inventaire Mémoriel"
          to="/reliques"
          desc="Objets conservés. Vestiges sensoriels."
        />
        <SectionLink
          icon={<Terminal />}
          title="Console de l’Écho"
          to="/logs"
          desc="Sortie texte du système. Échos anciens."
        />
        <SectionLink
          icon={<ShieldAlert />}
          title="Clauses d’existence"
          to="/mentions-legales"
          desc="Conditions implicites du souvenir et de la perte."
        />
      </div>
    </div>
  );
}

function SectionLink({ icon, title, to, desc, disabled = false }) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (!disabled) navigate(to);
  };
  
  return (
    <motion.div
      whileHover={!disabled ? { scale: 1.05 } : {}}
      animate={{ y: [0, -3, 0, 3, 0] }}
      transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
      onClick={handleClick}
      className={`p-4 rounded-xl shadow-md h-44 flex flex-col items-center justify-center text-center transition-colors
        ${disabled 
          ? "bg-[#2e2e2e]/50 border border-[#444] opacity-40 cursor-not-allowed"
          : "bg-[#2e2e2e] border border-[#6b728e] cursor-pointer"}`}
    >
      <div className="flex flex-col items-center gap-2">
        <div className="w-8 h-8">{icon}</div>
        <h3 className="text-lg font-medium">{title}</h3>
        <p className="text-xs opacity-80">{desc}</p>
      </div>
    </motion.div>
  );
}

export default Codex;