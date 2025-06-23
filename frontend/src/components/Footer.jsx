function getRandomDate(fromYear = 1990, toYear = 2007) {
  const start = new Date(`${fromYear}-01-01`).getTime();
  const end = new Date(`${toYear}-12-31`).getTime();
  const randomTimestamp = Math.floor(Math.random() * (end - start)) + start;
  return new Date(randomTimestamp);
}

function Footer() {
  const fakeDate = getRandomDate();
  const formattedDate = fakeDate.toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  const quotes = [
    "Fichier mémoire : Périphérie",
    "Système : PÉRIPHÉRIE.ARCHIVE",
  ];

  // Sélection aléatoire d'une citation
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  return (
    <footer className="retro-footer">
      <p className="crt-text glitched-text">~ Dernière connexion : {formattedDate} ~</p>
      <p className="glitched-text">{randomQuote}</p>
      <p className="glitched-text">&copy; Projet Périphérie 2025 – Version 0.9</p>
    </footer>
  );
}

export default Footer;
