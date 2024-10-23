import React, { useEffect, useState } from "react";
import "../styles/Profile.css";
import { MovieDto } from "../dtos/Movie";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";

const Profile: React.FC = () => {
  const [favorites, setFavorites] = useState<MovieDto[]>([]);
  const [userInfo, setUserInfo] = useState<{
    username: string;
    email: string;
    password: string;
  } | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUsername, setEditedUsername] = useState("");
  const [editedEmail, setEditedEmail] = useState("");
  const [editedPassword, setEditedPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("userLoggedIn");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setFavorites(user.favoriteMovies);
      setUserInfo({
        username: user.username,
        email: user.email,
        password: user.password,
      });
      setEditedUsername(user.username);
      setEditedEmail(user.email);
      setEditedPassword(user.password);
    }
  }, []);

  const handleSave = () => {
    if (userInfo) {
      const updatedUser = {
        ...userInfo,
        username: editedUsername,
        email: editedEmail,
        password: editedPassword,
        favoriteMovies: favorites,
      };

      localStorage.setItem("userLoggedIn", JSON.stringify(updatedUser));
      // find "users" in localStorage and update the user object
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const updatedUsers = users.map((user: any) =>
        user.email === userInfo.email ? updatedUser : user
      );
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      setUserInfo({
        username: editedUsername,
        email: editedEmail,
        password: editedPassword,
      });
      setIsEditing(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("userLoggedIn"); // Supprimer les infos du user dans le localStorage
    navigate("/login"); // Rediriger vers la page de login
  };

  return (
    <>
      <Header />
      <div className="profile-page">
        <h1>Mon Profil</h1>

        {userInfo ? (
          <div className="user-info">
            <h2>Informations utilisateur</h2>

            {isEditing ? (
              <div className="edit-form">
                <label>
                  Nom d'utilisateur :
                  <input
                    type="text"
                    value={editedUsername}
                    onChange={(e) => setEditedUsername(e.target.value)}
                  />
                </label>
                <label>
                  Email :
                  <input
                    type="email"
                    value={editedEmail}
                    onChange={(e) => setEditedEmail(e.target.value)}
                  />
                </label>
                <label>
                  Mot de passe :
                  <input
                    type={showPassword ? "text" : "password"}
                    value={editedPassword}
                    onChange={(e) => setEditedPassword(e.target.value)}
                  />
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={showPassword}
                    onChange={() => setShowPassword(!showPassword)}
                  />
                  Afficher le mot de passe
                </label>
                <button onClick={handleSave}>Sauvegarder</button>
                <button onClick={() => setIsEditing(false)}>Annuler</button>
              </div>
            ) : (
              <div className="user-details">
                <p>
                  <strong>Nom d'utilisateur:</strong> {userInfo.username}
                </p>
                <p>
                  <strong>Email:</strong> {userInfo.email}
                </p>
                <button onClick={() => setIsEditing(true)}>Modifier</button>
              </div>
            )}
          </div>
        ) : (
          <p>Vous n'êtes pas connecté.</p>
        )}

        <h2>Mes films favoris</h2>
        {favorites.length > 0 ? (
          <div className="favorites-list">
            {favorites.map((movie) => (
              <div key={movie.id} className="favorite-item">
                <img
                  src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                  alt={movie.title}
                  className="favorite-poster"
                />
                <div className="favorite-details">
                  <h3>{movie.title}</h3>
                  <p>{movie.release_date}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>Vous n'avez pas encore de films favoris.</p>
        )}
        <button className="logout-button" onClick={handleLogout}>
          Se déconnecter
        </button>
      </div>
    </>
  );
};

export default Profile;
