import { useEffect, useState } from "react";
import { getTrendingMovies } from "../api/movies";
import { Link, useLocation } from "react-router-dom";

export default function HomePage() {
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState([]);
  const location = useLocation();

  useEffect(() => {
    async function loadData() {
      const data = await getTrendingMovies();
      setMovies(data.results);
      setLoading(false);
    }

    setLoading(true);
    loadData();
  }, []);

  const moviesHtml = movies.map((movie) => {
    return (
      <li key={movie.id}>
        <Link to={`/movies/${movie.id}`} state={{ from: location }}>
          {movie.title}
        </Link>
      </li>
    );
  });

  return (
    <>
      <h1>Trending today</h1>
      {loading && <div>Loading...</div>}
      {!loading && moviesHtml.length && <ul>{moviesHtml}</ul>}
    </>
  );
}
