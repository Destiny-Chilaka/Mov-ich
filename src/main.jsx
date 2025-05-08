import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import MovieList from "./pages/MovieList";
import MovieDetails from "./pages/MovieDetails";
import Genre from "./pages/Genre";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import "./index.css";

// Define the router with routes for the 6 pages
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // App.jsx serves as the layout (e.g., with a navbar)
    children: [
      { path: "/", element: <Home /> },
      { path: "/movies", element: <MovieList /> },
      { path: "/movies/:id", element: <MovieDetails /> },
      { path: "/genres", element: <Genre /> },
      { path: "/about", element: <About /> },
      { path: "*", element: <NotFound /> }, // Catches all invalid routes
    ],
  },
]);

// Render the app with RouterProvider
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
