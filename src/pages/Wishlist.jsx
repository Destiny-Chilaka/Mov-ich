import { useState, useEffect } from "react";
import { auth } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { Link } from "react-router-dom";
import WishlistCard from "../components/WishlistCard";


function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const storedWishlist =
          JSON.parse(localStorage.getItem("wishlist")) || [];
        setWishlist(storedWishlist);
      } else {
        setWishlist([]);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleRemove = (movieId) => {
    setWishlist((prevWishlist) =>
      prevWishlist.filter((movie) => movie.id !== movieId)
    );
    // Update localStorage after state update
    localStorage.setItem(
      "wishlist",
      JSON.stringify(wishlist.filter((movie) => movie.id !== movieId))
    );
  };

  const handleClearWishlist = () => {
    setWishlist([]);
    localStorage.setItem("wishlist", JSON.stringify([]));
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-white text-gray-900flex items-center justify-center">
        <p>Please log in to view your wishlist.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-8">
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Your Wishlist</h1>
        {wishlist.length === 0 ? (
          <p className="text-gray-900 text-center text-3xl">
            Your wishlist is empty.{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mx-auto my-4 w-16 h-16 text-red-500 "
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
              />
              <circle cx="9" cy="10" r="1" fill="currentColor" />
              <circle cx="15" cy="10" r="1" fill="currentColor" />
              <path
                d="M9 16c1.333-1 4.667-1 6 0"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </p>
        ) : (
          <>
            <div className="flex md:justify-end sm:justify-center mb-4">
              <button
                onClick={handleClearWishlist}
                className="bg-[#BE123C] text-white px-4 py-2 rounded hover:bg-[#be123d9c] transition-colors"
              >
                Clear Wishlist
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {wishlist.map((movie) => (
                <div key={movie.id} className="relative">
                  <WishlistCard movie={movie} onRemove={handleRemove} />
                  <Link
                    to={`/movies/${movie.id}`}
                    className="mt-2 block text-center text-white hover:bg-[#be123d9c] px-2 py-1 rounded-md bg-[#BE123C] text-sm shadow-md transition-colors w-24 mx-auto"
                  >
                    View Details
                  </Link>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Wishlist;
