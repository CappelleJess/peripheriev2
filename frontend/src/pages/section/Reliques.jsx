import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import FenetrePage from "../../components/FenetrePage";
import { memoryObjectsConfig } from "../../phaser/data/roomObjects";
import { interactiveExtrasConfig } from "../../phaser/data/roomExtras";
import api from "../../utils/api";

function Reliques() {
  const { user } = useAuth();
  const [debloques, setDebloques] = useState([]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get(`/game/unlocked/${user.profileId || user._id}`)
        const objets = res.data.assets.map(a => a.key) || [];
        setDebloques(objets);
      } catch (err) {
        console.error("Erreur chargement des reliques:", err);
      }
    };

    if (user?._id) {
      fetchProfile();
    }
  }, [user]);

  const allObjects = [...memoryObjectsConfig, ...interactiveExtrasConfig];
  const objetsTrouves = allObjects.filter(obj => debloques.includes(obj.unlockKey));

  return (
    <FenetrePage titre="Reliques retrouvées">
      {objetsTrouves.length === 0 ? (
        <p>{/* Aucune relique retrouvée pour le moment. */}</p>
      ) : (
        <ul className="space-y-2">
          {objetsTrouves.map((obj) => (
            <li key={obj.key} className="border-b border-gray-600 py-2">
              <strong>{obj.key}</strong> —{" "}
              {obj.message || Object.values(obj.choices ?? {})[0]?.text}
            </li>
          ))}
        </ul>
      )}
    </FenetrePage>
  );
}

export default Reliques;