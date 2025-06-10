import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import MovieList from "./pages/MovieList";
import MovieDetails from "./pages/MovieDetails";
import Layout from "./components/Layout";
import Wishlist from "./pages/Wishlist";
import Signup from "./pages/SignUp";
import Login from "./pages/Login";
import NowPlayingMovies from "./pages/NowPlayingMovies";
import UpcomingMovies from "./pages/UpcomingMovies";
import PopularMovies from "./pages/PopularMovies";
import NotFound from "./pages/NotFound";  
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="movies" element={<MovieList />} />
          <Route path="movies/:id" element={<MovieDetails />} />
          <Route path="wishlist" element={<Wishlist />} />
          <Route path="now-playing" element={<NowPlayingMovies />} />
          <Route path="upcoming" element={<UpcomingMovies />} />
          <Route path="popular" element={<PopularMovies />} />
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);