import { useEffect, useState } from "react";
import { getTrendingMovies } from "../api/movies";
import MovieList from "../components/MovieList/MovieList";

export default function HomePage() {
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function loadData() {
      const data = await getTrendingMovies();
      setMovies(data.results);
      setLoading(false);
    }

    setLoading(true);
    loadData();
  }, []);

  return (
    <>
      <h1>Trending today</h1>
      {loading && <div>Loading...</div>}
      {!loading && movies.length && <MovieList movies={movies} />}
    </>
  );
}
