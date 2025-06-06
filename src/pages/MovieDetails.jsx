import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import PreLoader from "../components/PreLoader";
import Tickets from "../assets/tickets.png";
import List from "../assets/list.png";
import NoImg from "../assets/no-image.png"; 
import MoreShows from "../assets/more-shows.png"; // Assuming you have a more shows image
function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [credits, setCredits] = useState({
    director: "Unknown",
    writer: "Unknown",
    stars: ["Unknown"],
  });
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

  useEffect(() => {
    const fetchCredits = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/movie/${id}/credits?api_key=${apiKey}`
        );
        const director =
          response.data.crew.find((person) => person.job === "Director")
            ?.name || "Unknown";
        const writer =
          response.data.crew.find(
            (person) => person.job === "Writer" || person.job === "Screenplay"
          )?.name || "Unknown";
        // Fetch top 3 stars from the cast array
        const stars = response.data.cast
          .slice(0, 3)
          .map((actor) => actor.name) || ["Unknown"];
        setCredits({
          director,
          writer,
          stars: stars.length > 0 ? stars : ["Unknown"],
        });
      }  catch (err) {
        console.error("Failed to fetch credits:", err);
        setCredits({ director: "Unknown", writer: "Unknown", star: "Unknown" });
      }
    };
    fetchCredits();
  }, [id, apiKey, apiUrl]);


  if (loading) return <PreLoader />;
  if (error)
    return <div className="text-center text-red-500 pt-4">{error}</div>;
  if (!movie)
    return <div className="text-center text-white pt-4">Movie not found.</div>;

  return (
    <div className="min-h-screen bg-white text-[#333333] poppins">
      <div className="mx-auto  px-6 py-8">
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
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-3/4">
            <div className="flex items-center space-x-3 md:space-x-4 mb-4 flex-col xs:flex-row space-y-1.5 xs:space-y-0">
              <h1 className=" xs:text-sm sm:text-3xl font-bold ">
                {movie.title}
              </h1> 
              <span className="font-semibold text-sm  ">
                 {movie.release_date?.split("-")[0]} 
              </span>
              <span className="font-semibold text-sm  ">
                {movie.runtime ? `${movie.runtime} min` : "N/A"}
              </span>
              
              <span>
                {movie.genres && movie.genres.length > 0
                  ? movie.genres.map((genre) => (
                      <span
                        key={genre.id}
                        className="border border-[#BE123C] rounded-3xl px-[2px] py-[2px] md:py-1 md:px-2 mr-[3px] md:mx-1 text-[12px] md:text-base "
                      >
                        {genre.name}
                      </span>
                    ))
                  : "N/A"}
              </span>
            </div>
            <div className="mb-4">
              <h2 className=" text-xl md:text-2xl font-semibold">Overview</h2>
              <p className="text-[12px] sm:text-base">
                {movie.overview || "No overview available."}
              </p>
              <div className="mt-4 text-[#333] space-y-4">
                <p>
                  <span className="font-semibold">Director:</span>{" "}
                  <span className="text-[#BE123C]">{credits.director}</span>
                </p>
                <p>
                  <span className="font-semibold">Writer:</span>{" "}
                  <span className="text-[#BE123C]">{credits.writer}</span>
                </p>
                <p>
                  <span className="font-semibold">Stars:</span>{" "}
                  <span className="text-[#BE123C]">
                    {credits.stars.join(", ")}
                  </span>
                </p>
              </div>
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
              to="/"
              className="inline-block bg-[#BE123C] text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Back to Home
            </Link>
          </div>
          <div className="lg:flex justify-center lg:w-1/4 hidden ">
            <div className="max-w-2xl">
              <div className="mb-5 flex justify-end">
                <span className="pb-2">
                  <span className="text-yellow-400 text-2xl">★</span>{" "}
                  <span className="text-xl">
                    {movie.vote_average.toFixed(1)}
                  </span>
                  /10
                </span>
              </div>
              <div className="w-full mb-2">
                <a
                  href="# "
                  className="rounded-lg w-full block bg-[#BE123C] px-7 py-3 text-white text-center font-semibold"
                >
                  <img
                    src={Tickets}
                    alt="Tickets"
                    className="inline-block mr-2"
                  />
                  See Showtimes
                </a>
              </div>
              <div className="w-full mb-2">
                <a
                  href="# "
                  className="rounded-lg w-full block bg-[#be123c1a] px-7 py-3 text-[#333] text-center font-semibold border border-[#BE123C] "
                >
                  <img src={List} alt="Tickets" className="inline-block mr-2" />
                  More watch options
                </a>
              </div>
              <div className="w-full">
                <a href="#">
                  <img
                    src={MoreShows}
                    alt="Tickets"
                    className="rounded w-full"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetail;
