import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { auth } from "../../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import Logo from "../assets/tv.png";
import { FaBars } from "react-icons/fa";
import { FaVideo } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaCalendarAlt } from "react-icons/fa";

function Navbar() {
  const [user, setUser] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchPopupOpen, setSearchPopupOpen] = useState(false);
  const navigate = useNavigate();
  const apiKey = import.meta.env.VITE_API_KEY;
  const apiUrl = import.meta.env.VITE_API_URL || "https://api.themoviedb.org/3";

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!searchQuery) {
      setSearchResults([]);
      setShowDropdown(false);
      return;
    }

    const fetchSearchResults = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/search/movie?api_key=${apiKey}&query=${encodeURIComponent(
            searchQuery
          )}&language=en-US&page=1`
        );
        setSearchResults(response.data.results.slice(0, 5));
        setShowDropdown(true);
      } catch (err) {
        console.error("Search error:", err);
        setSearchResults([]);
        setShowDropdown(false);
      }
    };

    const debounce = setTimeout(fetchSearchResults, 300);
    return () => clearTimeout(debounce);
  }, [searchQuery, apiKey, apiUrl]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery) {
      setShowDropdown(false);
      navigate(`/movies?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
    }
  };

  const handleResultClick = (movieId) => {
    setShowDropdown(false);
    setSearchQuery("");
    navigate(`/movies/${movieId}`);
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate("/");
      setSidebarOpen(false);
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  return (
    <nav className="bg-gray-900 p-4 text-white flex justify-between items-center dm-sans">
      <div className=" text-base sm:text-xl font-bold flex items-center">
        <img src={Logo} alt="Logo" className="w-8 h-8 mr-[5px] sm:mr-2" />
        <Link to="/">MovieBox</Link>
      </div>
      <div className="flex items-center ">
        <div className="relative">
          <form onSubmit={handleSearchSubmit}>
            <input
              type="text"
              name="search"
              placeholder="What do you want to watch?"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className=" hidden sm:block p-2 rounded-lg bg-transparent focus:outline-none placeholder:text-white border-2 border-white w-60 md:w-md text-white"
            />
          </form>
          {showDropdown && searchResults.length > 0 && (
            <div className="absolute top-10 left-0 w-full bg-white text-black rounded shadow-lg max-h-60 overflow-y-auto z-20">
              {searchResults.map((movie) => (
                <div
                  key={movie.id}
                  onClick={() => handleResultClick(movie.id)}
                  className="p-2 hover:bg-gray-200 cursor-pointer flex items-center space-x-2"
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                    alt={movie.title}
                    className="w-10 h-10 object-cover rounded"
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/92x138?text=No+Image";
                    }}
                  />
                  <div>
                    <p className="font-semibold">{movie.title}</p>
                    <p className="text-sm text-gray-600">
                      {movie.release_date?.split("-")[0]}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
          {/* Button to open popup on small screens */}
          <button
            className="sm:hidden py-[3px] px-3 rounded bg-transparent bg-opacity-20 border border-white flex items-center justify-between gap-2 text-white"
            onClick={() => setSearchPopupOpen(true)}
            aria-label="Open search"
          >
            <p>Search</p>
          </button>
        </div>
      </div>
      <div className="flex items-center space-x-[5px] sm:space-x-4">
        <div>
          {user ? (
            <span className="text-white">
              {user.displayName || (user.email ? user.email.slice(0, 4) : "")}
            </span>
          ) : (
            <Link to="/login" className=" text-white sm:px-2 ">
              Sign In
            </Link>
          )}
        </div>
        <button
          onClick={() => setSidebarOpen(true)}
          className="focus:outline-none bg-[#BE123C] text-white px-2 p-2 rounded-full cursor-pointer"
        >
          <FaBars className="h-3 w-3 sm:w-6 sm:h-6" />
        </button>
      </div>

      {/* Popup search for small screens */}
      {searchPopupOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black opacity-95  sm:hidden pt-3">
          <div className="bg-white rounded-lg p-4 w-11/12 max-w-md relative">
            <button
              className="absolute top-[1px] right-[1px] text-gray-500"
              onClick={() => setSearchPopupOpen(false)}
              aria-label="Close search"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <form
              onSubmit={(e) => {
                handleSearchSubmit(e);
                setSearchPopupOpen(false);
              }}
            >
              <input
                autoFocus
                type="text"
                placeholder="What do you want to watch?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full p-3 rounded-lg border-2 border-gray-300 focus:border-[#BE123C] focus:outline-none text-black placeholder:text-gray-400"
              />
            </form>
            {showDropdown && searchResults.length > 0 && (
              <div className="absolute left-0 right-0 mt-2 bg-white text-black rounded shadow-lg max-h-60 overflow-y-auto z-20">
                {searchResults.map((movie) => (
                  <div
                    key={movie.id}
                    onClick={() => {
                      handleResultClick(movie.id);
                      setSearchPopupOpen(false);
                    }}
                    className="p-2 hover:bg-gray-200 cursor-pointer flex items-center space-x-2"
                  >
                    <img
                      src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                      alt={movie.title}
                      className="w-10 h-10 object-cover rounded"
                    />
                    <div>
                      <p className="font-semibold">{movie.title}</p>
                      <p className="text-sm text-gray-600">
                        {movie.release_date?.split("-")[0]}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-white w-58  rounded-tr-[45px] rounded-br-[45px] border border-black/30 poppins shadow-lg transform transition-transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } z-30`}
      >
        <div className="flex items-center mb-2 px-4 pt-3">
          <span role="img" aria-label="movie" className="text-2xl mr-3">
            <img src={Logo} alt="" className="w-12 h-12" />
          </span>
          <Link to="/" className="text-xl text-black poppins font-bold">
            {" "}
            MovieBox
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="ml-auto text-black focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <nav className=" w-full  ">
          <Link
            to="/"
            className="flex items-center justify-center space-x-4 text-gray-700 hover:bg-[#BE123C1A] hover:text-[#BE123C] py-4 md:py-6 text-center border-r-6 border-white hover:border-[#BE123C] transition-colors duration-300"
            onClick={() => setSidebarOpen(false)}
          >
            <FaHome className="w-5 h-5" />
            <span>Home</span>
          </Link>
          <Link
            to="/movies"
            className="flex items-center justify-center space-x-4 text-gray-700  hover:bg-[#BE123C1A] hover:text-[#BE123C] py-4 md:py-6 text-center border-r-6 border-white hover:border-[#BE123C] transition-colors duration-300"
            onClick={() => setSidebarOpen(false)}
          >
            <FaVideo className="w-5 h-5" />
            <span>Movies</span>
          </Link>
          <Link
            to="/tv-series"
            className="flex items-center space-x-4 justify-center text-gray-700 hover:bg-[#BE123C1A] hover:text-[#BE123C] py-4 md:py-6 text-center border-r-6 border-white hover:border-[#BE123C] transition-colors duration-300"
            onClick={() => setSidebarOpen(false)}
          >
            <FaYoutube className="w-5 h-5" />
            <span>TV Series</span>
          </Link>
          <Link
            to="/upcoming"
            className="flex items-center space-x-4 justify-center text-gray-700 hover:bg-[#BE123C1A] hover:text-[#BE123C] py-4 md:py-6 text-center border-r-6 border-white hover:border-[#BE123C] transition-colors duration-300"
            onClick={() => setSidebarOpen(false)}
          >
            <FaCalendarAlt className="w-5 h-5" />
            <span>Upcoming</span>
          </Link>
          {user && (
            <Link
              to="/wishlist"
              className="flex items-center justify-center space-x-4 text-gray-700 hover:bg-[#BE123C1A] hover:text-[#BE123C] py-4 md:py-6 text-center border-r-6 border-white hover:border-[#BE123C] transition-colors duration-300"
              onClick={() => setSidebarOpen(false)}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
              <span>Wishlist</span>
            </Link>
          )}
          <div className="bg-[#F8E7EB66] p-4 m-4 rounded-xl mt-4 border border-[#BE123CB2]">
            <p className="text-sm text-gray-600">
              Play movie quizzes and earn free tickets
            </p>
            <p className="text-[12px] text-gray-600">
              50 people are playing now
            </p>
            <div className="flex items-center justify-center">
              <Link
              to="/quizzes"
                className="mt-2 w-3/4 mx-auto bg-[#BE123C33] text-[#BE123C] px-4 py-2 
            rounded-3xl text-[12px] cursor-pointer hover:bg-[#BE123C66] transition-colors duration-300"
              >
                Start Playing
              </Link>
            </div>
          </div>
          {user ? (
            <button
              onClick={() => {
                handleSignOut();
                setSidebarOpen(false);
              }}
              className="flex items-center justify-center space-x-4 text-gray-700 hover:bg-[#BE123C1A] hover:text-[#BE123C] py-4 md:py-6 text-center border-r-6 border-white hover:border-[#BE123C] transition-colors duration-300 mt-4
              mx-auto w-full rounded-br-[45px]"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              <span>Log Out</span>
            </button>
          ) : (
            <Link
              to="/login"
              className="flex items-center justify-center space-x-4 text-gray-700 hover:bg-[#BE123C1A] hover:text-[#BE123C] py-4 md:py-6 text-center border-r-6 border-white hover:border-[#BE123C] transition-colors duration-300 mt-7"
              onClick={() => setSidebarOpen(false)}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                />
              </svg>
              <span>Sign In</span>
            </Link>
          )}
        </nav>
      </div>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-transparent bg-opacity-50 z-20"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </nav>
  );
}

export default Navbar;
