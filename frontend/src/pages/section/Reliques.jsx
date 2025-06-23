import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import FenetrePage from "../../components/FenetrePage";
import { memoryObjectsConfig } from "../../phaser/data/roomObjects";
import { decorationsConfig } from "../../phaser/data/roomExtras";
import MemoryItemCard from "../../components/MemoryItemCard";

function Reliques() {
  const { user } = useAuth();
  const [objetsDebloques, setObjetsDebloques] = useState([]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:5000/api/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setObjetsDebloques(data.objetsDebloques || []);
      } catch (err) {
        console.error("Erreur chargement des reliques:", err);
      }
    };

    if (user?._id) {
      fetchProfile();
    }
  }, [user]);

  const allObjects = [...memoryObjectsConfig, ...decorationsConfig];
  const objetsTrouves = allObjects.filter(obj => objetsDebloques.includes(obj.key));

  return (
    <FenetrePage titre="Reliques retrouvées">
      {objetsTrouves.length === 0 ? (
        <p className="italic text-[#d6c7ae]">Aucun artéfact retrouvée pour le moment.</p>
      ) : (
        <div className="bg-[#1b1f3b] border border-[#6b728e] rounded-2xl p-4 shadow-lg text-sm text-[#faf3e0] w-full max-w-md mt-4">
          <h3 className="text-lg font-bold text-[#9b5de5] mb-2">Artéfacts retrouvés</h3>
          <ul className="flex flex-wrap gap-2">
            {objetsTrouves.map((obj, index) => (
              <li key={index} className="px-2 py-1 bg-[#2e2e2e] rounded text-xl flex items-center">
                <MemoryItemCard item={obj.key} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </FenetrePage>
  );
}

export default Reliques;