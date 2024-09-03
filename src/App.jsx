import { useState } from "react";
import { Route, Routes, NavLink } from "react-router-dom";
import HomePage from "./pages/HomePage";
import MoviesPage from "./pages/MoviesPage";
import MovieDetailsPage from "./pages/MovieDetailsPage";
import MovieReviews from "./components/MovieReviews/MovieReviews";
import MovieCast from "./components/MovieCast/MovieCast";
import "./App.css";

//https://developer.themoviedb.org/docs/getting-started
//API KEY: 6862d37066485f90139e04003f8d16a0
//APIT TOKEN: eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ODYyZDM3MDY2NDg1ZjkwMTM5ZTA0MDAzZjhkMTZhMCIsIm5iZiI6MTcyNDk5NTM2Ni44NzkzNDksInN1YiI6IjY2ZDE1Njg4Zjg0Nzg1YjVkMDZkZmVjMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hSanP0oPdQ2_i0ijaBDTWOtCYLW_oKZYyBBarD8kA_w
//
function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <header>
        <nav>
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/movies">Movies</NavLink>
            </li>
          </ul>
        </nav>
      </header>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movies" element={<MoviesPage />} />
        <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
          <Route path="cast" element={<MovieCast />} />
          <Route path="reviews" element={<MovieReviews />} />
        </Route>
        <Route path="*" element={<>Oops!</>} />
      </Routes>
    </div>
  );
}

export default App;
