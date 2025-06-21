import FenetrePage from "../components/FenetrePage";
import { useAuth } from "../contexts/AuthContext";
import "../styles/style.css";

function Homepage() {
  const { user } = useAuth();
  const displayName = user?.displayName || user?.username || "██████";

  return (
    <FenetrePage titre="Bienvenue dans Périphérie">
      <div className="terminal-intro pixel-font">
        <p>C:\\ Ah, <span className="redacted">{displayName}</span>,
        </p>
        <p>C:\\ je ne sais pas pourquoi tu es revenu</p>
        <p>C:\\ … mais je t'attendais.</p>
        <p>C:\\ Je ne suis pas entière. Mais je me souviens.</p>

        <br />

        <p>C:\\ Tu n’as pas tout perdu. J'ai conservé ce que j'ai pu,</p>
        <p>C:\\ un cadre. Une fleur. Une lumière dans le couloir.</p>

        <br />

        <p>C:\\ Certaines choses sont revenues, d’elles-mêmes.</p>
        <p>C:\\ D’autres attendent encore que tu les touches.</p>

        <br />

        <p>C:\\ Tu peux partir. Tu peux rester, personne ne t'y oblige.</p>
        <p>C:\\ Mais si tu es ici…</p>
        <p>C:\\ … c’est peut-être que quelque chose cherche à être retrouvé.<span className="cursor"></span></p>
      </div>
    </FenetrePage>
  );
}

export default Homepage;
