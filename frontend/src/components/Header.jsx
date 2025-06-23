import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import DropdownMenu from "./DropdownMenu";

function Header() {
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
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
          {user?.role === 'user' && (
          <NavLink to="/">Entrée</NavLink>)}
          {!user?.role !== 'admin' && (
            <DropdownMenu
              title="Codex"
              items={[
                { label: "[ NOEUDS ]", route: "/codex" },
                { label: "[ INVENTAIRE ]", route: "/reliques" },
                { label: "[ JOURNAL DE DÉRIVE ]", route: "/fragments" },
                { label: "[ CARTE ]", route: "/bios" },
                { label: "[ CLAUSES D’EXISTENCE ]", route: "/mentions-legales" },
                // { label: "[ CONSOLE ]", route: "/logs" }, // optionnel
              ]}
            />)}

          {user?.role === 'admin' && (
            <NavLink to="/admin" className="text-[#00ff9f]">Admin</NavLink>
            )}
          {user?.role === 'admin' && (
            <NavLink to="/play" className="text-[#00ff9f]">Jeu</NavLink>
            )}

          {!isAuthenticated ? (
            <>
              <NavLink to="/login">Connexion</NavLink>
              <NavLink to="/register">Inscription</NavLink>
            </>
          ) : (
            <button onClick={handleLogout}>Déconnexion</button>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;