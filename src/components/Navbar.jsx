import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

function Navbar() {
  const [user, setUser] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

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
    <nav className="bg-gray-900 p-4 text-white flex justify-between items-center">
      <div className="text-xl font-bold flex items-center">
        <span role="img" aria-label="movie" className="text-2xl mr-2">
          🎬
        </span>
        MovieBox
      </div>
      <div className="flex items-center space-x-4">
        <div className="relative">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              navigate(
                `/movies?search=${encodeURIComponent(e.target.search.value)}`
              );
              e.target.search.value = "";
            }}
          >
            <input
              type="text"
              name="search"
              placeholder="What do you want to watch?"
              className="p-2 rounded text-black bg-white focus:outline-none w-64"
            />
          </form>
        </div>
        <div>
          {user ? (
            <span className="text-white">{user.displayName || user.email}</span>
          ) : (
            <Link
              to="/login"
              className="bg-red-600 text-white px-4 py-2 rounded"
            >
              Sign In
            </Link>
          )}
        </div>
        <button
          onClick={() => setSidebarOpen(true)}
          className="text-white focus:outline-none"
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
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-white w-64 p-4 shadow-lg transform transition-transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } z-30`}
      >
        <div className="flex items-center mb-6">
          <span role="img" aria-label="movie" className="text-2xl mr-2">
            🎬
          </span>
          <h2 className="text-xl font-bold">MovieBox</h2>
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
        <nav className="space-y-4">
          <Link
            to="/"
            className="flex items-center space-x-2 text-gray-700 hover:text-red-600"
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
                d="M3 12l2-2m0 0l7-7 7 7m-9 9l-2 2m2-2l7-7m-4 7v-8m-4 4h.01"
              />
            </svg>
            <span>Home</span>
          </Link>
          <Link
            to="/movies"
            className="flex items-center space-x-2 text-gray-700 hover:text-red-600"
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
                d="M7 4v16m10-16v16M3 8h18M3 16h18"
              />
            </svg>
            <span>Movies</span>
          </Link>
          <Link
            to="/tv-series"
            className="flex items-center space-x-2 text-gray-700 hover:text-red-600"
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
                d="M9 5v14l7-7-7-7z"
              />
            </svg>
            <span>TV Series</span>
          </Link>
          <Link
            to="/upcoming"
            className="flex items-center space-x-2 text-gray-700 hover:text-red-600"
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
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>Upcoming</span>
          </Link>
          {user && (
            <Link
              to="/wishlist"
              className="flex items-center space-x-2 text-gray-700 hover:text-red-600"
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
          <div className="bg-red-100 p-4 rounded-lg mt-4">
            <p className="text-sm text-gray-600">
              Play movie quizzes and earn free tickets
            </p>
            <p className="text-sm text-gray-600">50 people are playing now</p>
            <button className="mt-2 w-full bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
              Start Playing
            </button>
          </div>
          {user ? (
            <button
              onClick={() => {
                handleSignOut();
                setSidebarOpen(false);
              }}
              className="flex items-center space-x-2 text-gray-700 hover:text-red-600 mt-4"
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
              className="flex items-center space-x-2 text-gray-700 hover:text-red-600 mt-4"
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
          className="fixed inset-0 bg-black bg-opacity-50 z-20"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </nav>
  );
}

export default Navbar;
