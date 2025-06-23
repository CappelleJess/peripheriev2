import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import GameState from '../components/GameState';

const FenetrePageJeu = ({ children, sceneName }) => {
  const navigate = useNavigate();

  const [scores, setScores] = useState({
    souvenirScore: GameState.souvenirScore,
    ancragePasse: GameState.ancragePasse,
    emergenceNostalgie: GameState.emergenceNostalgie,
  });
  const [elapsedTime, setElapsedTime] = useState('00:00');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user?._id) return;

    // Chargement des scores depuis le backend
    api.get(`/game/progress/${user._id}`)
      .then(res => {
        GameState.syncWithBackend(res.data);
        setScores({
          souvenirScore: res.data.souvenirScore,
          ancragePasse: res.data.ancragePasse,
          emergenceNostalgie: res.data.emergenceNostalgie,
        });
      })
      .catch(err => {
        console.error("Erreur chargement scores HUD :", err);
      });

    // Timer de session
    const start = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      const minutes = Math.floor(elapsed / 60000).toString().padStart(2, '0');
      const seconds = Math.floor((elapsed % 60000) / 1000).toString().padStart(2, '0');
      setElapsedTime(`${minutes}:${seconds}`);

    setScores({
        souvenirScore: GameState.souvenirScore,
        ancragePasse: GameState.ancragePasse,
        emergenceNostalgie: GameState.emergenceNostalgie,
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex justify-center items-center h-screen bg-[#111]">
      <div className="relative w-[1024px] h-[768px] border-2 border-blue-500 bg-black shadow-lg flex flex-col box-border">
        {/* Bande HUD */}
        <div className="h-10 w-full bg-[#1b1f3b] text-[#00ff9f] text-sm font-mono flex items-center justify-between px-4 border-b border-blue-500">
          <span>
            Scène : {sceneName} – 
            Souvenir : {scores.souvenirScore} | 
            Ancrage : {scores.ancragePasse} | 
            Nostalgie : {scores.emergenceNostalgie} | 
            Temps : {elapsedTime}
          </span>
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