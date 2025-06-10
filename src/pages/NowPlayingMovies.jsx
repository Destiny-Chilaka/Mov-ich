import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import MovieCard from "../components/MovieCard";
import PreLoader from "../components/PreLoader";

function NowPlayingMovies() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiKey = import.meta.env.VITE_API_KEY;
  const apiUrl = import.meta.env.VITE_API_URL || "https://api.themoviedb.org/3";

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${apiUrl}/movie/now_playing?api_key=${apiKey}&language=en-US&page=${page}`
        );
        setMovies((prevMovies) => [...prevMovies, ...response.data.results]);
        setTotalPages(response.data.total_pages);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch movies. Please try again later.");
        setLoading(false);
      }
    };
    fetchMovies();
  }, [page, apiKey, apiUrl]);

  const handleLoadMore = () => {
    if (page < totalPages) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  if (loading && page === 1) return <PreLoader />;
  if (error)
    return <div className="text-center text-red-500 pt-4">{error}</div>;

  return (
    <div className="min-h-screen bg-white py-8">
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Now Playing Movies
        </h1>
        {movies.length === 0 ? (
          <p className="text-gray-900 text-center">No movies found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
        {page < totalPages && (
          <div className="text-center mt-6">
            <button
              onClick={handleLoadMore}
              className="bg-[#BE123C] text-white px-6 py-2 rounded hover:bg-[#be123dc0] transition-colors"
              disabled={loading}
            >
              {loading ? "Loading..." : "Load More Movies"}
            </button>
          </div>
        )}
        <div className="text-center mt-4">
          <Link to="/" className="text-[#BE123C] hover:underline">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NowPlayingMovies;
