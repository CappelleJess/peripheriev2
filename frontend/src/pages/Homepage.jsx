import { useState } from "react";
import IntroTerminal from "../components/IntroTerminal";
import FenetrePage from "../components/FenetrePage";

function Homepage() {
  const [introDone, setIntroDone] = useState(false);

  return (
    <>
      {!introDone ? (
        <IntroTerminal onFinish={() => setIntroDone(true)} />
      ) : (
          <FenetrePage titre="Bienvenue dans Périphérie">
          <p>
            <strong>*Périphérie*</strong> est une aventure narrative centrée sur l’introspection, les souvenirs et les liens au passé. Vous explorez une chambre où chaque objet raconte une histoire oubliée.
          </p>

          <h2>Explorez vos souvenirs</h2>
          <p>
            Interagissez avec des objets clés (comme une fleur séchée, un écran cathodique ou un vieux cadre photo) pour réveiller des bribes de mémoire.
          </p>

          <h2>Suivez votre progression</h2>
          <ul>
            <li>Un tableau de bord rétro vous permet de voir votre score mémoire</li>
            <li>Chaque choix influence les variables : <em>souvenirScore</em>, <em>ancragePasse</em> et <em>emergenceNostalgie</em></li>
          </ul>

          <p>
            À vous de reconstruire le fil de vos souvenirs. Rien n’est figé… sauf peut-être le passé.
          </p>
        </FenetrePage>
      )}
    </>
  );
}

export default Homepage;