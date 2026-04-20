import { useState, useEffect } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
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

function getVisiblePages(currentPage: number, totalPages: number) {
  const startPage = Math.max(1, currentPage - 2);
  const endPage = Math.min(totalPages, startPage + 4);
  const adjustedStartPage = Math.max(1, endPage - 4);

  return Array.from(
    { length: endPage - adjustedStartPage + 1 },
    (_, index) => adjustedStartPage + index,
  );
}

export default function App() {
  const [query, setQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const hasSearchQuery = query.trim() !== "";

  const { data, isPending, isError } = useQuery({
    queryKey: ["movies", query, page],
    queryFn: () => fetchMovies(query, page),
    enabled: hasSearchQuery,
    placeholderData: keepPreviousData,
  });

  const movies = data?.results || [];
  const totalPages = data?.totalPages || 0;
  const visiblePages = getVisiblePages(page, totalPages);

  useEffect(() => {
    if (hasSearchQuery && !isPending && !isError && movies.length === 0) {
      toast.error("No movies found for your request.");
    }
  }, [hasSearchQuery, isPending, isError, movies.length]);

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
      <div className={styles.app}>
        <SearchBar onSubmit={handleSearch} />

        {hasSearchQuery && isPending && <Loader />}
        {isError && <ErrorMessage />}

        {hasSearchQuery && !isPending && !isError && totalPages > 1 && (
          <nav aria-label="Pagination">
            <ul className={styles.pagination}>
              <li>
                <button
                  type="button"
                  onClick={() => setPage((currentPage) => currentPage - 1)}
                  disabled={page === 1}
                  aria-label="Previous page"
                >
                  &larr;
                </button>
              </li>

              {visiblePages.map((pageNumber) => (
                <li
                  key={pageNumber}
                  className={pageNumber === page ? styles.active : undefined}
                >
                  <button
                    type="button"
                    onClick={() => setPage(pageNumber)}
                    aria-current={pageNumber === page ? "page" : undefined}
                    aria-label={`Page ${pageNumber}`}
                  >
                    {pageNumber}
                  </button>
                </li>
              ))}

              <li>
                <button
                  type="button"
                  onClick={() => setPage((currentPage) => currentPage + 1)}
                  disabled={page === totalPages}
                  aria-label="Next page"
                >
                  &rarr;
                </button>
              </li>
            </ul>
          </nav>
        )}

        {hasSearchQuery && !isPending && !isError && movies.length > 0 && (
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
