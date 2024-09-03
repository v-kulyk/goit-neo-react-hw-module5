import { useEffect, useState } from "react";
import { getMovieReviews } from "../../api/movies";
import { Link, useParams, useLocation } from "react-router-dom";

export default function MovieReviews() {
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [movieReviews, setMovieReviews] = useState(null);
  const { movieId } = useParams();

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getMovieReviews(movieId);
        setMovieReviews(data.results);
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

  if (loading) {
    return <div>Loading...</div>;
  } else if (isError) {
    return <div>Oops!</div>;
  } else if (!movieReviews || !movieReviews.length) {
    return <div>No reviews</div>;
  }

  const reviewList = movieReviews.map((review) => (
    <li key={review.id}>
      <h3>Author: {review.author}</h3>
      <p>{review.content}</p>
    </li>
  ));

  return (
    <>
      <h2>Reviews</h2>
      <ul className="movie-reviews">{reviewList}</ul>
    </>
  );
}
