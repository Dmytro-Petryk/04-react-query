import { useState, useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";
import ReactPaginate from "react-paginate";
import styles from "./App.module.css";
import { type Movie } from "../../types/movie";
import { useMoviesQuery } from "../Query/Query";

import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";

const App = () => {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [movies, setMovies] = useState<Movie[]>([]);

  const { data, isPending, isError, isSuccess } = useMoviesQuery(query, page, {
    enabled: query.trim().length > 0,
    keepPreviousData: true,
    placeholderData: (previous: string) => previous,
  });

  useEffect(() => {
    if (data?.results) {
      setMovies(data.results);
    }
  }, [data]);

  useEffect(() => {
    if (isSuccess && data?.results.length === 0) {
      toast("No results found");
    }
  }, [isSuccess, data]);

  function handleSearch(query: string): void {
    setQuery(query);
    setPage(1);
  }

  function handleSelectMovie(movie: Movie): void {
    setSelectedMovie(movie);
  }

  function handleCloseModal(): void {
    setSelectedMovie(null);
  }

  return (
    <div>
      <h1>Movie Search</h1>
      <Toaster />

      {isPending && <p>Loading...</p>}
      {isError && <p>Something went wrong</p>}

      {data && data.total_pages > 1 && (
        <ReactPaginate
          pageCount={data.total_pages}
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
      <SearchBar onSubmit={handleSearch} />
      <main>
        {isPending && <Loader />}
        {isError && <ErrorMessage />}
        {!isPending && !isError && movies.length > 0 && (
          <MovieGrid movies={movies} onSelect={handleSelectMovie} />
        )}
      </main>
      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default App;
