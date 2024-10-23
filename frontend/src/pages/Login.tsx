import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

const Login: React.FC = () => {
  const navigate = useNavigate();

  // États pour gérer les inputs utilisateur via ses setter dans le JSX
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Fonction pour gérer la connexion
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Récupérer les utilisateurs du localStorage
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    // Chercher un utilisateur correspondant
    const user = users.find(
      (user: any) => user.email === email && user.password === password
    );

    if (user) {
      // Stocker l'utilisateur connecté dans une variable `userLoggedIn`
      localStorage.setItem("userLoggedIn", JSON.stringify(user));

      // Redirection vers /movies après la connexion réussie
      navigate("/movies");
    } else {
      alert("Email ou mot de passe incorrect.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-title">Connexion</h1>
        <form className="login-form" onSubmit={handleLogin}>
          <div className="form-group">
            {/* onChange en bas sert à modifer la valeur de l'input en temps reel */}
            <input type="email" id="email" name="email" placeholder="Email" value={email}
              onChange={(e) => setEmail(e.target.value)}
              required />
          </div>
          <div className="form-group">
            <input type="password" id="password" name="password" placeholder="Mot de passe" value={password}
              onChange={(e) => setPassword(e.target.value)}
              required />
          </div>
          <button type="submit" className="login-button">
            Se connecter
          </button>
        </form>
        <button className="back-button" onClick={() => navigate(-1)}>
          Retour
        </button>
      </div>
    </div>
  );
};

export default Login;
