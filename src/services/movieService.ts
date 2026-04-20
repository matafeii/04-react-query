import axios from "axios";
import type { Movie } from "../types/movie";

interface FetchMoviesResponse {
  results: Movie[];
}

export const fetchMovies = async (query: string): Promise<Movie[]> => {
  const token = import.meta.env.VITE_TMDB_TOKEN;

  const config = {
    params: {
      query,
      include_adult: false,
      language: "en-US",
      page: 1,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get<FetchMoviesResponse>(
    "https://api.themoviedb.org/3/search/movie",
    config,
  );

  return response.data.results;
};
