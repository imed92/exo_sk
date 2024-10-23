import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Details.css"; // Styles pour la modal
import { MovieDto } from "../dtos/Movie"; // Assurez-vous d'importer le MovieDto
import AddToFavoriteSVG from "./AddToFavorite.svg";

interface DetailsProps {
  movieId: number|null; // soit un nombre soit null
  closeModal: () => void;
}

const DisplayVideo = ({ videos }: { videos: any }) => {
  const index = Math.floor(Math.random() * videos.length);
  const video = videos[index];

  if (!video) {
    return <p>Aucune vidéo disponible pour ce film.</p>;
  }

  return (
    <iframe
      width="99%"
      height="315"
      src={`https://www.youtube.com/embed/${video.key}`}
      title={video.name}
      className="movie-details-video"
    ></iframe>
  );
};

const Details: React.FC<DetailsProps> = ({ movieId, closeModal }) => {
  const [movie, setMovie] = useState<MovieDto | any>(null);
  const [videos, setVideos] = useState<any[]>([]);
  const [isFavorite, setIsFavorite] = useState(false);

  // Récupérer les détails du film et vérifier s'il est déjà dans les favoris
  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(
          `${global.TMDB_API}/movie/${movieId}?api_key=${global.API_KEY}&language=en-US`
        );
        setMovie(response.data);

        // Vérifier si le film est déjà dans les favoris
        const storedUser = localStorage.getItem("userLoggedIn");
        if (storedUser) {
          const user = JSON.parse(storedUser);
          const isFav = user.favoriteMovies.find(
            (fav: MovieDto) => fav.id === response.data.id
          );
          setIsFavorite(!!isFav); // Si le film est dans les favoris, définir isFavorite à true
        }
      } catch (error) {
        console.error(error);
      }
    };

    const fetchVideos = async () => {
      try {
        const response = await axios.get(
          `${global.TMDB_API}/movie/${movieId}/videos?api_key=${global.API_KEY}&language=en-US`
        );
        setVideos(response.data.results);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMovie();
    fetchVideos();
  }, [movieId]);

  // Fonction pour ajouter le film aux favoris
  const addToFavorites = () => {
    const storedUser = localStorage.getItem("userLoggedIn");

    if (storedUser && movie) {
      const user = JSON.parse(storedUser);

      // Ajouter aux favoris uniquement si le film n'est pas déjà dans la liste
      if (!isFavorite) {
        user.favoriteMovies.push(movie);
        localStorage.setItem("userLoggedIn", JSON.stringify(user));
        setIsFavorite(true); // Mettre à jour l'état isFavorite
        // alert(`${movie.title} a été ajouté à vos favoris !`);
      }
    }
  };

  const deleteFromFavorites = () => {
    const storedUser = localStorage.getItem("userLoggedIn");

    if (storedUser && movie) {
      const user = JSON.parse(storedUser);
      const updatedFavorites = user.favoriteMovies.filter(
        (fav: MovieDto) => fav.id !== movie.id
      );
      user.favoriteMovies = updatedFavorites;
      localStorage.setItem("userLoggedIn", JSON.stringify(user));
      setIsFavorite(false); // Mettre à jour l'état isFavorite
      // alert(`${movie.title} a été supprimé de vos favoris.`);
    }
  };

  if (!movie) {
    return (
      <div className="modal">
        <div className="modal-content">
          <span className="close" onClick={closeModal}>
            &times;
          </span>
          <h1>Loading...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={closeModal}>
          &times;
        </span>
        <AddToFavoriteSVG
          isFavorite={isFavorite}
          addToFavorites={addToFavorites}
          deleteFromFavorites={deleteFromFavorites}
        />

        <h1>{movie.title}</h1>
        <DisplayVideo videos={videos} />
        <p>{movie.overview}</p>
        <p>Genre : {movie.genres.map((genre: any) => genre.name).join(", ")}</p>
        <p>Date de sortie : {movie.release_date}</p>
        <p>
          Note : {movie.vote_average}/10 ({movie.vote_count} votes)
        </p>
      </div>
    </div>
  );
};

export default Details;
