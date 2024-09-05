import { Suspense, lazy, useState } from "react";
import { Route, Routes, NavLink } from "react-router-dom";
import "./App.css";
import Navigation from "./components/Navigation/Navigation";

function App() {
  const [count, setCount] = useState(0);
  const HomePage = lazy(() => import("./pages/HomePage"));
  const MoviesPage = lazy(() => import("./pages/MoviesPage"));
  const MovieDetailsPage = lazy(() => import("./pages/MovieDetailsPage"));
  const MovieReviews = lazy(() =>
    import("./components/MovieReviews/MovieReviews")
  );
  const MovieCast = lazy(() => import("./components/MovieCast/MovieCast"));

  return (
    <div className="App">
      <header>
        <Navigation />
      </header>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
            <Route path="cast" element={<MovieCast />} />
            <Route path="reviews" element={<MovieReviews />} />
          </Route>
          <Route path="*" element={<>Oops!</>} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
