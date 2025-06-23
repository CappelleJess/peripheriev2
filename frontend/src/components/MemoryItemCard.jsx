const ICONES_MEMOIRE = {
  flower: "/img/flower.png",
  frame: "/img/frame.png",
  computer: "/img/pc.png",
  book: "/img/book.png",
  lavalamp: "/img/lavalamp.png",
  poster: "/img/poster.png",
  rug: "/img/rug.png",
  diskman: "/img/diskman.png",

};

const MemoryItemCard = ({ item }) => {
  const iconSrc = ICONES_MEMOIRE[item.toLowerCase()];

  return (
    <div className="group flex items-center gap-2 px-3 py-2 rounded-xl bg-[#2e2e2e] text-[#faf3e0] shadow-md hover:shadow-neon transition duration-300 border border-[#6b728e] relative">
      {iconSrc ? (
        <img src={iconSrc} alt={item} className="w-8 h-8 object-contain drop-shadow-md group-hover:scale-105 transition-transform"/>
      ) : (
        <span className="text-red-500 font-bold">?</span>
      )}
      <span className="font-mono text-sm">{item}</span>
      <div className="absolute inset-0 rounded-xl blur-sm opacity-30 group-hover:opacity-60 transition duration-300 pointer-events-none"
          style={{ boxShadow: "0 0 10px #9b5de5, 0 0 20px #9b5de5" }}
        ></div>
      </div>
  );
};

export default MemoryItemCard;

