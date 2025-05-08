import { useState, useEffect } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiKey = import.meta.env.VITE_API_KEY;
  const apiUrl = import.meta.env.VITE_API_URL || 'https://api.themoviedb.org/3';

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/movie/popular?api_key=${apiKey}&language=en-US&page=1`
        );
        setMovies(response.data.results.slice(0, 5));
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch movies. Please try again later.');
        setLoading(false);
      }
    };
    fetchMovies();
  }, [apiKey, apiUrl]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: true,
  };

  if (loading) return <div className="text-center text-white pt-16">Loading...</div>;
  if (error) return <div className="text-center text-red-500 pt-16">{error}</div>;

  return (
    <div className="pt-16">
      <Slider {...settings}>
        {movies.map((movie) => (
          <div key={movie.id} className="relative">
            <div
              className="min-h-screen bg-cover bg-center relative"
              style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
              <div className="container mx-auto p-4 text-white relative z-10">
                <h1 className="text-4xl md:text-5xl font-bold">{movie.title}</h1>
                <div className="flex items-center space-x-4 my-4">
                  <span>★ {movie.vote_average.toFixed(1)}/10</span>
                  <span>{Math.round(movie.popularity / 100)}%</span>
                </div>
                <p className="max-w-lg">{movie.overview}</p>
                <button className="bg-red-600 text-white px-4 py-2 rounded mt-4">
                  Watch Trailer
                </button>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default Home;