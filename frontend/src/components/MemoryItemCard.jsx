const ICONES_MEMOIRE = {
  fleur: "/img/flower.png",
  cadre: "/img/frame.png",
  ordinateur: "img/pc.png",
  journal: "img/diary.png",
};

const MemoryItemCard = ({ item }) => {
const icone = ICONES_MEMOIRE[item.toLowerCase()] || "?";
  return (
    <div className="px-2 py-1 bg-[#2e2e2e] rounded text-xl flex items-center shadow">
      <span>{icone}</span>
      <span className="ml-2 text-sm font-mono text-[#faf3e0]">{item}</span>
    </div>
  );
};

export default MemoryItemCard;