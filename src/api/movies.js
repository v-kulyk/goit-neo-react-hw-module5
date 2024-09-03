import axios from "axios";

axios.defaults.baseURL = "https://api.themoviedb.org/3";
axios.defaults.headers = {
  accept: "application/json",
  Authorization:
    "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ODYyZDM3MDY2NDg1ZjkwMTM5ZTA0MDAzZjhkMTZhMCIsIm5iZiI6MTcyNTE5Nzk2MC45MjU3MjIsInN1YiI6IjY2ZDE1Njg4Zjg0Nzg1YjVkMDZkZmVjMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.StMJe9fE3nNCNTqrrXvi0-aH9EDW3Aq9jWG5O3A2iYc",
};

export async function getTrendingMovies() {
  return (await axios.get("/trending/movie/day?language=en-US")).data;
}

export async function searchMovies(query) {
  return (
    await axios.get(
      `/search/movie?query=${query}&include_adult=false&language=en-US&page=1`
    )
  ).data;
}

export async function getMovieDetails(movie_id) {
  return (await axios.get(`/movie/${movie_id}?language=en-US`)).data;
}

export async function getMovieCast(movie_id) {
  return (await axios.get(`/movie/${movie_id}/credits?language=en-US`)).data;
}

export async function getMovieReviews(movie_id) {
  return (await axios.get(`/movie/${movie_id}/reviews?language=en-US&page=1`))
    .data;
}
