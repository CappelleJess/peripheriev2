import FenetrePage from "../../components/FenetrePage";

function MentionsLegales() {
  return (
    <FenetrePage titre="Clauses d’existence">
      <div className="text-[#faf3e0] font-mono text-sm space-y-4 mt-2">

        <p className="italic text-[#d6c7ae]">// Ce document est une transcription partielle. Certaines lignes peuvent manquer.</p>

        <ul className="list-disc pl-6 space-y-2">
          <li>En accédant à cet espace, vous acceptez de ne plus vous souvenir exactement de qui vous étiez.</li>
          <li>Tout fragment mémoriel déposé ici pourra être copié, altéré, ou absorbé par l’environnement local.</li>
          <li>Les souvenirs enfouis ne seront pas protégés. Le système n’est pas tenu de garantir leur confidentialité.</li>
          <li>En cas de désancrage, veuillez rester immobile. Une entité viendra vous recadrer.</li>
          <li>L’écho de votre passage pourra persister après votre déconnexion. Nous ne sommes pas responsables des rémanences.</li>
          <li>Vous êtes autorisé à vous perdre. Mais pas à vous effacer complètement sans laisser de trace.</li>
          <li>Le passé est fourni tel quel, sans garantie d’authenticité, de cohérence ni de bienveillance.</li>
        </ul>

        <p className="text-[#9b5de5] italic">// Pour continuer, vous devez accepter ces conditions d’existence altérée.</p>
      </div>
    </FenetrePage>
  );
}

export default MentionsLegales;
