import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
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
  const [query, setQuery] = useState<string>("");
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const { data: movies = [], isLoading, isError } = useQuery({
    queryKey: ["movies", query],
    queryFn: () => fetchMovies(query),
    enabled: !!query,
  });

  useEffect(() => {
    if (query && !isLoading && !isError && movies.length === 0) {
      toast.error("No movies found for your request.");
    }
  }, [query, isLoading, isError, movies.length]);

  useEffect(() => {
    if (isError) {
      toast.error("There was an error, please try again...");
    }
  }, [isError]);

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
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
