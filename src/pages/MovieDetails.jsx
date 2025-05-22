import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import PreLoader from "../components/PreLoader";
import NoImg from "../assets/no-image.png"; 
function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiKey = import.meta.env.VITE_API_KEY;
  const apiUrl = import.meta.env.VITE_API_URL || "https://api.themoviedb.org/3";

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true);

        // Fetch movie details
        const movieResponse = await axios.get(
          `${apiUrl}/movie/${id}?api_key=${apiKey}&language=en-US`
        );
        setMovie(movieResponse.data);

        // Fetch movie videos to find a trailer
        const videosResponse = await axios.get(
          `${apiUrl}/movie/${id}/videos?api_key=${apiKey}&language=en-US`
        );
        const videos = videosResponse.data.results;
        // Look for the first video of type "Trailer" hosted on YouTube
        const trailer = videos.find(
          (video) => video.type === "Trailer" && video.site === "YouTube"
        );
        setTrailerKey(trailer ? trailer.key : null);

        setLoading(false);
      } catch (err) {
        setError("Failed to fetch movie details. Please try again later.");
        setLoading(false);
      }
    };
    fetchMovieDetails();
  }, [id, apiKey, apiUrl]);

  if (loading) return <PreLoader />;
  if (error)
    return <div className="text-center text-red-500 pt-4">{error}</div>;
  if (!movie)
    return <div className="text-center text-white pt-4">Movie not found.</div>;

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto p-4 py-8">
        {/* Trailer or Fallback Image */}
        <div className="relative mb-8">
          {trailerKey ? (
            <iframe
              className="w-full h-96 rounded-lg"
              src={`https://www.youtube.com/embed/${trailerKey}`}
              title={`${movie.title} Trailer`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          ) : (
            <img
              src={
                movie.backdrop_path
                  ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
                  : NoImg
              }
              alt={movie.title}
              className="w-full h-96 object-cover rounded-lg"
            />
          )}
        </div>

        {/* Movie Details */}
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/3">
            <img
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : NoImg
              }
              alt={movie.title}
              className="w-full rounded-lg shadow-md"
            />
          </div>
          <div className="md:w-2/3">
            <h1 className="text-4xl font-bold mb-2">{movie.title}</h1>
            <div className="flex items-center space-x-4 mb-4">
              <span>★ {movie.vote_average.toFixed(1)}/10</span>
              <span>{movie.release_date?.split("-")[0]}</span>
              <span>{movie.runtime ? `${movie.runtime} min` : "N/A"}</span>
            </div>
            <div className="mb-4">
              <h2 className="text-xl font-semibold">Genres</h2>
              <p>
                {movie.genres?.map((genre) => genre.name).join(", ") || "N/A"}
              </p>
            </div>
            <div className="mb-4">
              <h2 className="text-xl font-semibold">Overview</h2>
              <p>{movie.overview || "No overview available."}</p>
            </div>
            {movie.production_countries?.length > 0 && (
              <div className="mb-4">
                <h2 className="text-xl font-semibold">Production Countries</h2>
                <p>
                  {movie.production_countries
                    .map((country) => country.name)
                    .join(", ")}
                </p>
              </div>
            )}
            <Link
              to="/movies"
              className="inline-block bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Back to Movies
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetail;
