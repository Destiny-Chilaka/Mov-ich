import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import MovieCard from "../components/MovieCard";
import PreLoader from "../components/PreLoader";

function MoviesList() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const apiKey = import.meta.env.VITE_API_KEY;
  const apiUrl = import.meta.env.VITE_API_URL || "https://api.themoviedb.org/3";

  // Extract search query from URL
  const query = new URLSearchParams(location.search).get("search");

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        // Fetch movies based on search query or default to popular movies
        let url = query
          ? `${apiUrl}/search/movie?api_key=${apiKey}&query=${encodeURIComponent(
              query
            )}&language=en-US&page=1`
          : `${apiUrl}/movie/popular?api_key=${apiKey}&language=en-US&page=1`;

        const movieResponse = await axios.get(url);
        setMovies(movieResponse.data.results);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch movies. Please try again later.");
        setLoading(false);
      }
    };
    fetchMovies();
  }, [query, apiKey, apiUrl]);

  if (loading) return <PreLoader />;
  if (error)
    return <div className="text-center text-red-500 pt-4">{error}</div>;

  return (
    <div className="min-h-screen bg-white py-8">
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          {query ? `Showing results for "${query}"` : "Movies"}
        </h1>
        {movies.length === 0 ? (
          <p className="text-white text-center">No movies found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MoviesList;
