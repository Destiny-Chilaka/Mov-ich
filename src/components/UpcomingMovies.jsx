import { useState, useEffect } from "react";
import axios from "axios";
import MovieCard from "./MovieCard";
import PreLoader from "./PreLoader";
import { Link } from "react-router-dom";

function UpcomingMovies({ onLoadingChange }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiKey = import.meta.env.VITE_API_KEY;
  const apiUrl = import.meta.env.VITE_API_URL || "https://api.themoviedb.org/3";

  useEffect(() => {
    let isMounted = true;

    const fetchMovies = async () => {
      try {
        setLoading(true);
        const movieResponse = await axios.get(
          `${apiUrl}/movie/upcoming?api_key=${apiKey}&language=en-US&page=1`
        );
        if (isMounted) {
          const upcomingMovies = movieResponse.data.results.slice(0, 4);
          setMovies(upcomingMovies);
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setError("Failed to fetch upcoming movies. Please try again later.");
          setLoading(false);
        }
      }
    };

    fetchMovies();

    return () => {
      isMounted = false;
    };
  }, [apiKey, apiUrl]);

  useEffect(() => {
    if (onLoadingChange) {
      onLoadingChange(loading); // Call only when loading changes
    }
  }, [loading, onLoadingChange]); // Depend on loading, not on every render

  if (loading) return <PreLoader />;
  if (error)
    return <div className="text-center text-red-500 pt-4">{error}</div>;

  return (
    <div className="container mx-auto p-4 py-8 dm-sans">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-black">Upcoming Movies</h2>
        <Link href="/upcoming" className="text-red-600 hover:underline">
          See more {" > "}
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default UpcomingMovies;
