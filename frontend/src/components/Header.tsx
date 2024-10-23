import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Header.css"; // Importation des styles pour le Header

const Header: React.FC = () => {
  const navigate = useNavigate();

  return (
    <header className="header">
      <div className="logo" onClick={() => navigate("/")}>
        CinéTime
      </div>
      <nav className="navigation">
        <span onClick={() => navigate("/")}>Accueil</span>{" "}
        <span onClick={() => navigate("/movies")}>Films</span>{" "}
        <span onClick={() => navigate("/profile")}>Profil</span>
      </nav>
    </header>
  );
};

export default Header;
