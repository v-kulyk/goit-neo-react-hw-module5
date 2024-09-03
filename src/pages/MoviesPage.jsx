import { useEffect, useState } from "react";
import { searchMovies } from "../api/movies";
import {
  useLocation,
  useParams,
  useSearchParams,
  Link,
} from "react-router-dom";

export default function MoviesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [movies, setMovies] = useState(null);
  const location = useLocation();
  const search = searchParams.get("search");

  useEffect(() => {
    async function loadData() {
      try {
        const data = await searchMovies(search);
        setMovies(data.results);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }

    if (!search) {
      return;
    }

    setIsLoading(true);
    loadData();
  }, [search]);

  function handleSubmit(e) {
    e.preventDefault();
    setSearchParams({ search: e.target.elements.search.value });
  }

  let content = "";

  if (isLoading) {
    content = <div>Loading...</div>;
  } else if (isError) {
    content = <div>Ooops!</div>;
  } else if (search && (!movies || !movies.length)) {
    content = <div>No movies found</div>;
  } else if (search) {
    content = (
      <ul>
        {movies.map((movie) => {
          return (
            <li key={movie.id}>
              <Link to={`/movies/${movie.id}`} state={{ from: location }}>
                {movie.title}
              </Link>
            </li>
          );
        })}
      </ul>
    );
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="text" name="search" defaultValue={search} />
        <button type="submit">Search</button>
      </form>
      {content}
    </>
  );
}
