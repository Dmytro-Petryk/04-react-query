export interface Movie {
  backdrop_path: string;
  overview: string;
  release_date: string;
  vote_average: string;
  id: number;
  title: string;
  poster_path: string;
}
export interface MovieResponse {
  page: number;
  total_pages: number;
  results: Movie[];
}
