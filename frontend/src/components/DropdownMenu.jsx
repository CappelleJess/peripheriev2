import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/style.css";

function DropdownMenu({ title = "Accès", items = [] }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const toggle = () => setOpen(!open);
  const handleClick = (route) => {
    setOpen(false);
    navigate(route);
  };

  return (
    <div className="dropdown-retro">
      <button className="dropdown-button" onClick={toggle}>
        {title} ▾
      </button>
      {open && (
        <div className="dropdown-content">
          {items.map((item, index) => (
            <button
              key={index}
              className="dropdown-item"
              onClick={() => handleClick(item.route)}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default DropdownMenu;


