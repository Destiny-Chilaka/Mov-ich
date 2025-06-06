import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import MovieList from "./pages/MovieList";
import MovieDetails from "./pages/MovieDetails";
// import Wishlist from "./pages/Wishlist";
// import Login from "./pages/Login";
import Layout from "./components/Layout";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="movies" element={<MovieList />} />
          <Route path="movies/:id" element={<MovieDetails />} />
          {/* <Route path="wishlist" element={<Wishlist />} />
          <Route path="login" element={<Login />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);