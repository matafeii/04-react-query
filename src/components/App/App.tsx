import { useState } from "react";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";
import type { Movie } from "../../types/movie";
import { fetchMovies } from "../../services/movieService";
import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";
import styles from "./App.module.css";

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const handleSearch = async (query: string) => {
    setMovies([]);
    setIsLoading(true);
    setIsError(false);

    try {
      const result = await fetchMovies(query);

      if (result.length === 0) {
        toast.error("No movies found for your request.");
        setMovies([]);
      } else {
        setMovies(result);
      }
    } catch {
      setIsError(true);
      toast.error("There was an error, please try again...");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectMovie = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
  };

  return (
    <>
      <div className={styles.container}>
        <SearchBar onSubmit={handleSearch} />

        {isLoading && <Loader />}
        {isError && <ErrorMessage />}
        {!isLoading && !isError && (
          <MovieGrid movies={movies} onSelect={handleSelectMovie} />
        )}

        {selectedMovie && (
          <MovieModal movie={selectedMovie} onClose={handleCloseModal} />
        )}
      </div>
      <Toaster position="top-right" />
    </>
  );
}
