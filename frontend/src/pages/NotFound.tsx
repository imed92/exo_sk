import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/NotFound.css"; // Assurez-vous d'ajouter le CSS pour cette page

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="error-page">
      {/* Vidéo en arrière-plan */}
      <video className="background-video" autoPlay loop muted>
        <source
          src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>

      <div className="error-content">
        <h1>404</h1>
        <h2>Oups ! La page que vous recherchez est introuvable.</h2>
        <p>Il semble que la page que vous avez demandée n'existe pas.</p>
        <button className="home-button" onClick={() => navigate("/")}>
          Retour à l'accueil
        </button>
      </div>
    </div>
  );
};

export default NotFound;
