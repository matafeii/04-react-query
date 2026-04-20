import axios from "axios";
import type { Movie } from "../types/movie";

interface FetchMoviesResponse {
  results: Movie[];
  total_pages: number;
}

export interface MoviesData {
  results: Movie[];
  totalPages: number;
}

export const fetchMovies = async (query: string, page: number = 1): Promise<MoviesData> => {
  const token = import.meta.env.VITE_TMDB_TOKEN;

  const config = {
    params: {
      query,
      include_adult: false,
      language: "en-US",
      page,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get<FetchMoviesResponse>(
    "https://api.themoviedb.org/3/search/movie",
    config,
  );

  return {
    results: response.data.results,
    totalPages: response.data.total_pages,
  };
};
