import {
  Outlet,
  useParams,
  NavLink,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { getMovieDetails } from "../api/movies";
import { useEffect, useState } from "react";

export default function MovieDetailsPage() {
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [movie, setMovie] = useState(null);
  const { movieId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  console.log(location);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getMovieDetails(movieId);
        setMovie(data);
      } catch (error) {
        setIsError(true);
      } finally {
        setLoading(false);
      }
    }

    setIsError(false);
    setLoading(true);
    loadData();
  }, []);
  return (
    <>
      <button
        type="button"
        onClick={() => navigate(location?.state?.from ?? "/")}
      >
        Go back
      </button>
      {loading && <div>Loading...</div>}
      {!loading && isError && <div>Movie not found</div>}
      {!loading && !isError && movie && (
        <div>
          {movie.poster_path && (
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
          )}
          <h1>{movie.title}</h1>
          <h3>Overview</h3>
          <p>{movie.overview}</p>
          <h3>Genres</h3>
          <p>{movie.genres.map((genre) => genre.name).join(", ")}</p>
          <hr />
          <p>Additional information</p>
          <ul>
            <li>
              <NavLink to="cast" state={{ from: location.state.from }}>
                Cast
              </NavLink>
            </li>
            <li>
              <NavLink to="reviews" state={{ from: location.state.from }}>
                Reviews
              </NavLink>
            </li>
          </ul>
          <hr />
        </div>
      )}

      <Outlet />
    </>
  );
}
