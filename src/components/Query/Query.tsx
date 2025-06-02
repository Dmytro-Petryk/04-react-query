import { useQuery } from "@tanstack/react-query";
import { fetchMovies } from "../../services/movieService";

export const useMoviesQuery = (
  query: string,
  page: number,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _p0?: {
    enabled: boolean;
    keepPreviousData: boolean;
    placeholderData: (previous: string) => string;
  }
) => {
  return useQuery({
    queryKey: ["movies", query, page],
    queryFn: () => fetchMovies(query, page),
    staleTime: 1000 * 60 * 5,
  });
};
