import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Register.css";
import { UserDto } from "../dtos/User"; // Importation du DTO

const Register: React.FC = () => {
  const navigate = useNavigate();

  // États pour gérer les inputs utilisateur
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Fonction pour gérer l'inscription
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    // Vérifier si l'email est déjà utilisé
    const users: UserDto[] = JSON.parse(localStorage.getItem("users") || "[]");
    const existingUser = users.find((user) => user.email === email);

    if (existingUser) {
      alert("Cet email est déjà utilisé.");
      return;
    }

    // Créer un nouvel utilisateur
    const newUser: UserDto = {
      id: Date.now().toString(),
      username: username,
      email : email,
      password: password,
      favoriteMovies: [],
    };

    // Sauvegarder l'utilisateur dans le localStorage
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    // Redirection après l'inscription
    alert("Inscription réussie !");
    navigate("/login");
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <button className="back-button" onClick={() => navigate("/")}>
          Retour
        </button>
        <h1 className="register-title">Créer un compte</h1>
        <form className="register-form" onSubmit={handleRegister}>
          <div className="form-group">
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Nom d'utilisateur"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="register-button">
            S'inscrire
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
