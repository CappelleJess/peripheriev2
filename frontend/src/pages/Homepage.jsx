import FenetrePage from "../components/FenetrePage";
import { useAuth } from "../contexts/AuthContext";
import "../styles/style.css";

function Homepage() {
  const { user } = useAuth();
  const displayName = user?.displayName || user?.username || "██████";

  return (
    <FenetrePage titre="Bienvenue dans Périphérie">
      <div className="terminal-intro pixel-font">
        <p>Ah, <span className="redacted">{displayName}</span>,
        </p>
        <p>// je ne sais pas pourquoi tu es revenu</p>
        <p>// … mais je t'attendais.</p>
        <p>// Je ne suis pas entière. Mais je me souviens.</p>

        <br />

        <p>// Tu n’as pas tout perdu. J'ai conservé ce que j'ai pu,</p>
        <p>// un cadre. Une fleur. Une lumière dans le couloir.</p>

        <br />

        <p>// Certaines choses sont revenues, d’elles-mêmes.</p>
        <p>// D’autres attendent encore que tu les touches.</p>

        <br />

        <p>// Tu peux partir. Tu peux rester, personne ne t'y oblige.</p>
        <p>// Mais si tu es ici…</p>
        <p>// … c’est peut-être que quelque chose cherche à être retrouvé.</p>
      </div>
    </FenetrePage>
  );
}

export default Homepage;
