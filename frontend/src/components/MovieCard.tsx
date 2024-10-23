import { MovieDto } from "../dtos/Movie";

const MovieCard = ({ movie }: { movie: MovieDto }) => {
  return (
    <div key={movie.id} className="movie-card">
      <img
        src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
        alt={movie.title}
        className="movie-poster"
      />
      <div className="movie-list-details">
        <h2>{movie.title}</h2>
        <p>{movie.overview}</p>
        <p>Date de sortie : {movie.release_date}</p>
      </div>
    </div>
  );
};

export default MovieCard;
