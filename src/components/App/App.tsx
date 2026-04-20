import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import ReactPaginate from "react-paginate";
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
  const [page, setPage] = useState<number>(1);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["movies", query, page],
    queryFn: () => fetchMovies(query, page),
    enabled: !!query,
  });

  const movies = data?.results || [];
  const totalPages = data?.totalPages || 0;

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
    setPage(1);
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
        {!isLoading && !isError && movies.length > 0 && (
          <MovieGrid movies={movies} onSelect={handleSelectMovie} />
        )}

        {!isLoading && !isError && totalPages > 1 && (
          <ReactPaginate
            pageCount={totalPages}
            pageRangeDisplayed={5}
            marginPagesDisplayed={1}
            onPageChange={({ selected }) => setPage(selected + 1)}
            forcePage={page - 1}
            containerClassName={styles.pagination}
            activeClassName={styles.active}
            nextLabel="→"
            previousLabel="←"
          />
        )}

        {selectedMovie && (
          <MovieModal movie={selectedMovie} onClose={handleCloseModal} />
        )}
      </div>
      <Toaster position="top-right" />
    </>
  );
}
