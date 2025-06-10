import { useState, useEffect } from "react";
import { auth } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { FaTimesCircle } from "react-icons/fa";
import tomato from "../assets/tomato.png";
import NoImg from "../assets/no-image.png";

function WishlistCard({ movie, onRemove }) {
  const [user, setUser] = useState(null);
  const [isWishlisted, setIsWishlisted] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleRemove = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) return;
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    const updatedWishlist = wishlist.filter((item) => item.id !== movie.id);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    setIsWishlisted(false);
    onRemove(movie.id); // Notify parent to update wishlist state
  };

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : NoImg;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden relative hover:shadow-lg transition-shadow">
      <img
        src={posterUrl}
        alt={movie.title || "Movie Poster"}
        className="w-full h-64 object-cover"
        onError={(e) => {
          e.target.src =
            NoImg;
        }}
      />
      <div className="p-4">
        
        <div className="flex space-x-2 text-gray-600 text-base font-semibold">
          <p>{movie.release_date}</p>
        </div>
        <h3 className="text-xl font-semibold text-[#111827]">{movie.title}</h3>
                <div className="flex items-center space-x-10 my-4 text-sm">
                  <p className="flex gap-1 items-center">
                    <span className="bg-[#fab003]  inline-block px-1 py-[1px] text-black font-bold rounded-sm">
                      IMDb
                    </span>
                    {movie.vote_average.toFixed(1)}/10
                  </p>
        
                  <p className="flex gap-2 items-center">
                    <img src={tomato} alt="" className="w-4 h-5" />
                    {Math.round(movie.popularity / 100)}%
                  </p>
                </div>
        {user && (
          <button
            onClick={handleRemove}
            className="mt-2 bg-transparent text-white px-1 py-1 cursor-pointer hover:scale-150 transition-colors"
          >
            <FaTimesCircle className="text-[#BE123C]" />
          </button>
        )}
      </div>
      {user && isWishlisted && (
        <div className="absolute top-2 right-2 p-2 rounded-full bg-white shadow-md">
          <svg
            className="w-5 h-5 text-red-600"
            fill="currentColor"
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
        </div>
      )}
    </div>
  );
}

export default WishlistCard;
