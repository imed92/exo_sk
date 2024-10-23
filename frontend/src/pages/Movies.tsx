import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Movies.css";
import MovieCard from "../components/MovieCard";
import { MovieDto } from "../dtos/Movie";
import Details from "../components/Details";
import Header from "../components/Header";

declare global {
  var API_KEY: string;
  var TMDB_API: string;
}

global.API_KEY = "f7850f40bdef3a82fdbe8eaa2b496cfa";
global.TMDB_API = "https://api.themoviedb.org/3";

interface Genre {
  id: number;
  name: string;
}

interface Language {
  iso_639_1: string;
  name: string;
}

const SearchBar = ({
  searchQuery,
  setSearchQuery,
}: {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <input
      type="text"
      placeholder="Rechercher un film..."
      className="search-bar"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
    />
  );
};

const Movies: React.FC = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState<string | null>(null);
  const [movies, setMovies] = useState<MovieDto[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredMovies, setFilteredMovies] = useState<MovieDto[]>([]);
  const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);

  const [filter, setFilter] = useState(() => {
    const savedFilter = localStorage.getItem("filter");
    return savedFilter
      ? JSON.parse(savedFilter)
      : {
          year: new Date().getFullYear(),
          genre: "28",
          language: "fr",
        };
  });

  const [genres, setGenres] = useState<Genre[]>([]);
  const [languages, setLanguages] = useState<Language[]>([]);

  // useEffect c'est unen "fonction" qui s'execute au rafraichissement de la page
  useEffect(() => {
    const userLoggedIn = JSON.parse(
      localStorage.getItem("userLoggedIn") || "null"
    );

    if (userLoggedIn) {
      setIsLoggedIn(true);
      setUsername(userLoggedIn.username);
    }
  }, []); // si la valeur de ce qu'il y a dans la variable change, le useEffect s'executera au moment ou la variable change de valeur 

  const fetchMovies = async () => {
    try {
      const { year, genre, language } = filter;
      const url = `${global.TMDB_API}/discover/movie?api_key=${global.API_KEY}&language=fr&with_original_language=${language}&primary_release_year=${year}&with_genres=${genre}`;
      const response = await axios.get(url);
      setMovies(response.data.results);
      setFilteredMovies(response.data.results);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchFilterValues = async () => {
    const urlGenres = `${global.TMDB_API}/genre/movie/list?api_key=${global.API_KEY}&language=fr`;
    try {
      const res = await axios.get(urlGenres);
      const data = res.data.genres;
      setGenres(data);
    } catch (e) {
      console.log(e);
    }

    const urlLanguages = `${global.TMDB_API}/configuration/languages?api_key=${global.API_KEY}`;
    try {
      const res = await axios.get(urlLanguages);
      const data = res.data;
      setLanguages(data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const filtered = movies.filter((movie) =>
      movie.title.toLowerCase().includes(searchQuery.toLowerCase())
      // ici filtered sera = tableau avec tous les films qui commence par le nom qu'on a donné
      // si on cherche "scarface", filtered sera = a tout les films qui contiennent "scarface"
    );
    setFilteredMovies(filtered);
  }, [searchQuery, movies]);

  const handleFilterChange = (name: string, value: any) => {
    setFilter((prevFilter: any) => {
      const newFilter = { ...prevFilter, [name]: value };
      localStorage.setItem("filter", JSON.stringify(newFilter));
      return newFilter;
    });
  };

  useEffect(() => {
    fetchMovies();
  }, [filter]);

  useEffect(() => {
    fetchMovies();
    fetchFilterValues();
  }, []);

  const handleMovieClick = (movieId: number) => {
    setSelectedMovieId(movieId);
  };

  const closeModal = () => {
    setSelectedMovieId(null);
  };

  const Filter = () => (
    <div className="filter">
      <div className="filter-item">
        <label htmlFor="year">Année</label>
        <select
          name="year"
          value={filter.year}
          onChange={(e) => handleFilterChange("year", e.target.value)}
        >
          {Array.from(
            { length: 50 },
            (_, i) => new Date().getFullYear() - i
          ).map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-item">
        <label htmlFor="genre">Genre</label>
        <select
          name="genre"
          value={filter.genre}
          onChange={(e) => handleFilterChange("genre", e.target.value)}
        >
          {genres.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-item">
        <label htmlFor="language">Langue</label>
        <select
          name="language"
          value={filter.language}
          onChange={(e) => handleFilterChange("language", e.target.value)}
        >
          {languages.map((language) => (
            <option key={language.iso_639_1} value={language.iso_639_1}>
              {language.name !== ""
                ? language.name + " (" + language.iso_639_1.toUpperCase() + ")"
                : language.iso_639_1.toUpperCase()}
            </option>
          ))}
        </select>
      </div>
    </div>
  );

  if (!isLoggedIn) {
    return (
      <div className="movies-container">
        <div className="register-prompt">
          <h1>
            Enregistrez-vous pour profiter au maximum de notre service de
            bandes-annonces !
          </h1>
          <button
            className="register-button"
            onClick={() => navigate("/register")}
          >
            S'inscrire
          </button>
        </div>
      </div>
    );
  }
  return(<div>hello {username}</div>); // afficher ca a la fin de la premiere journée
  return (
    <>
      <Header />
      <div className="movies-page">
        <h1>Films Populaires</h1>
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <Filter />

        <div className="movies-list">
          {filteredMovies.length > 0 ? (
            filteredMovies.map((movie) => (
              <div key={movie.id} onClick={() => handleMovieClick(movie.id)}>
                <MovieCard movie={movie} />
              </div>
            ))
          ) : (
            <h2>Aucun film trouvé</h2>
          )}
        </div>

        {selectedMovieId && (
          <Details movieId={selectedMovieId} closeModal={closeModal} />
        )}
      </div>
    </>
  );
};

export default Movies;
