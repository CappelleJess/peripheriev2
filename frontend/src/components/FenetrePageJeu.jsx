import { useNavigate } from 'react-router-dom';

const FenetrePageJeu = ({ children, sceneName, souvenirScore, ancragePasse, emergenceNostalgie }) => {
    const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center h-screen bg-[#111]">
      <div className="relative w-[1024px] h-[768px] border-2 border-blue-500 bg-black shadow-lg flex flex-col box-border">
        {/* Bande HUD */}
        <div className="h-10 w-full bg-[#1b1f3b] text-[#00ff9f] text-sm font-mono flex items-center justify-between px-4 border-b border-blue-500">
          <span>Scène 01 : {sceneName} – Score mémoire : {souvenirScore} | Ancrage: {ancragePasse} | Nostalgie: {emergenceNostalgie}</span>
          <div className="space-x-2">
            <button
              onClick={() => navigate('/dashboard')}
              className="px-2 py-0.5 border border-[#00ff9f] hover:bg-[#00ff9f] hover:text-black transition"
            >
              ← Retour
            </button>
            <button
              onClick={() => {
                if (!document.fullscreenElement) {
                  document.documentElement.requestFullscreen();
                } else {
                  document.exitFullscreen();
                }
              }}
              className="px-2 py-0.5 border border-[#00ff9f] hover:bg-[#00ff9f] hover:text-black transition"
            >
              ⛶ Plein écran
            </button>
          </div>
        </div>

        {/* Canvas Phaser */}
        <div className="w-full h-[728px] box-border overflow-hidden">{children}</div>
      </div>
    </div>
  );
};

export default FenetrePageJeu;