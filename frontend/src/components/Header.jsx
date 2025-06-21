import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import DropdownMenu from "./DropdownMenu";

function Header() { 
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate(); // Hook pour naviguer dynamiquement
  // const [showMenu, setShowMenu] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
};

  return (
    <header className="custom-header">
      <div className="header-content">
        <NavLink to="/">
          <div className="logo">
            <img src="/img/logo_glitch_mini.gif" alt="Logo Périphérie" className="logo-img" />
          </div>
        </NavLink>

        <nav className="nav-links items-center">
          {!isAuthenticated ? ( 
            <>
              <NavLink to="/">Accueil</NavLink>
              <NavLink to="/play">Jouer</NavLink>
              <NavLink to="/gameuniverse">Univers du jeu</NavLink>
              <NavLink to="/news">Actualites</NavLink>
              <NavLink to="/about">À propos</NavLink>
              <NavLink to="/login">Connexion</NavLink>
              <NavLink to="/register">Inscription</NavLink>
            </>
          ) : (
            <>
              <NavLink to="/">Entrée</NavLink>
              {user?.role === 'user' && (
                <>
                  <NavLink to="/play">Jouer</NavLink>
                  <DropdownMenu title="Univers du jeu" items={[
                    { label: "[ NOEUDS : MÉMOIRE ]", route: "/gameuniverse" },
                    { label: "[ INVENTAIRE MÉMORIEL ]", route: "/reliques" },
                    { label: "[ JOURNAL DE DÉRIVE ]", route: "/fragments" },
                    { label: "[ PROFIL ALTÉRÉ ]", route: "/bios" },
                    { label: "[ CLAUSES D’EXISTENCE ]", route: "/mentions-legales" },
                    { label: "[ CONSOLE DE L’ÉCHO ]", route: "/log" },
                  ]}/>
                  <NavLink to="/news">Actualites</NavLink>
                  <NavLink to="/dashboard">Dashboard</NavLink>
                </>
              )}
              {user?.role === 'admin' && (
                <NavLink to="/admin" className="text-[#00ff9f]">Admin</NavLink>
              )}
              <button onClick={handleLogout}>Déconnexion</button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;