import React from "react";

function Footer() {
  // Tableau de citations
  const quotes = [
    "Le temps perdu n'est jamais perdu, il est toujours retrouvé dans un souvenir.",
    "Les souvenirs sont la seule chose que nous possédons vraiment.",
    "La nostalgie, c'est le désir de revenir à un passé qui n'existe plus.",
    "Le souvenir est une sorte de retour. Mais il est toujours un retour dans le futur.",
    "Le souvenir est ce qui demeure de nous dans l’âme des autres.",
    "La mémoire est le regard avec lequel on se voit à travers le temps.",
  ];

  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  function formatQuote(quote) {
    if (!quote.includes("—")) {
      return <p className="crt-text">"{quote}"</p>;
    }

    const [text, authorAndBook] = quote.split(" — ");
    const [author, book] = authorAndBook.split(", ");

    return (
      <>
        <p className="crt-text">"{text}"</p>
        <p className="crt-text author-book">
          <strong>{author}</strong>, <em>{book}</em>
        </p>
      </>
    );
  }

  return (
    <footer className="retro-footer">
      <p className="crt-text">~ Dernière connexion : {new Date().toLocaleDateString()} ~</p>
      {formatQuote(randomQuote)}
      <p>&copy; Projet Périphérie 2025 - Version 0.9</p>
    </footer>
  );
}

export default Footer;