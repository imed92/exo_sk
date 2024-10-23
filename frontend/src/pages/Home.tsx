import React from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css"; // Importer le fichier CSS

const url =
  "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4";

const Home: React.FC = () => {
  return (
    <div className="home-container">
      <video className="background-video" autoPlay loop muted>
        <source src={url} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="home-content">
        <h1 className="home-title">Bienvenue sur CinéTime</h1>
        <p className="home-description">
          Découvrez les dernières bandes-annonces et informations sur les films
          les plus populaires du moment. Connectez-vous ou créez un compte pour
          accéder à notre sélection exclusive !
        </p>
        <div className="home-buttons">
          <Link to="/login">
            <button className="home-button login-button">Connexion</button>
          </Link>
          <Link to="/register">
            <button className="home-button register-button">S'inscrire</button>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Home;
