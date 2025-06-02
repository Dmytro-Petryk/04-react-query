import { useQuery } from "@tanstack/react-query";
import { fetchMovies } from "../../services/movieService";

export const useMoviesQuery = (query: string, page: number) => {
  return useQuery({
    queryKey: ["movies", query, page],
    queryFn: () => fetchMovies(query, page),
    staleTime: 1000 * 60 * 5,
  });
};
