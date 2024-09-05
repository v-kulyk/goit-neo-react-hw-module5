import { useEffect, useState } from "react";
import { getMovieCast } from "../../api/movies";
import { useParams } from "react-router-dom";

export default function MovieCast() {
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [movieCast, setMovieCast] = useState(null);
  const { movieId } = useParams();

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getMovieCast(movieId);
        setMovieCast(data.cast);
      } catch (error) {
        setIsError(true);
      } finally {
        setLoading(false);
      }
    }

    setIsError(false);
    setLoading(true);
    loadData();
  }, [movieId]);

  if (loading) {
    return <div>Loading...</div>;
  } else if (isError) {
    return <div>Oops!</div>;
  } else if (!movieCast || !movieCast.length) {
    return <div>No reviews</div>;
  }

  const castList = movieCast.map((cast) => (
    <li key={cast.id}>
      {cast.name} {cast.character ?? ""}
    </li>
  ));

  return (
    <>
      <h2>Cast</h2>
      <ul className="movie-cast">{castList}</ul>
    </>
  );
}
