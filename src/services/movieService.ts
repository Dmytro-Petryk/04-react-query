import axios from "axios";
import type { MovieResponse } from "../types/movie";
import { useQuery } from "@tanstack/react-query";

const BASE_URL = "https://api.themoviedb.org/3";
const API_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNTUwMGE2NWIxMTVlNmM1Y2Q0OTg4MzRlYzg4MDg1ZiIsIm5iZiI6MTc0ODIxMTE4Ni43NzksInN1YiI6IjY4MzM5NWYyYzIwYWY5ODZlNmI2YjM0MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.M6w396RXCHYbvtgZp5Sk_GV-QcR0bHfDVQDc_HwMWS4";
if (!API_TOKEN) {
  throw new Error("VITE_TMDB_TOKEN environment variable is not set");
}
export const fetchMovies = async (
  searchTerm: string,
  page: number
): Promise<MovieResponse> => {
  const response = await axios.get(`${BASE_URL}/search/movie`, {
    params: {
      query: searchTerm,
      page,
    },
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
    },
  });
  return response.data;
};

export const useMoviesQuery = (
  query: string,
  page: number,
  {
    enabled,

    placeholderData,
  }: {
    enabled: boolean;
    keepPreviousData: string;
    placeholderData?: MovieResponse;
  }
) => {
  return useQuery({
    queryKey: ["movies", query, page],
    queryFn: () => fetchMovies(query, page),
    staleTime: 1000 * 60 * 5,
    enabled,

    placeholderData,
  });
};
