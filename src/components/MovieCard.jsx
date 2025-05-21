import { useState, useEffect } from "react";
import { auth } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { Link } from "react-router-dom";
import tomato from "../assets/tomato.png";
import NoImg from "../assets/no-image.png";

function MovieCard({ movie }) {
  const [user, setUser] = useState(null);
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (user) {
      const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
      setIsWishlisted(wishlist.some((item) => item.id === movie.id));
    }
  }, [user, movie.id]);

  const handleWishlistToggle = (e) => {
    e.stopPropagation(); // Prevent triggering the card click event
    if (!user) return;
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    const isAlreadyWishlisted = wishlist.some((item) => item.id === movie.id);

    if (isAlreadyWishlisted) {
      const updatedWishlist = wishlist.filter((item) => item.id !== movie.id);
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
      setIsWishlisted(false);
    } else {
      const updatedWishlist = [...wishlist, movie];
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
      setIsWishlisted(true);
    }
  };

  const posterUrl = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : NoImg;

  return (
    <Link
      to={`/movies/${movie.id}`}
     className="bg-white overflow-hidden relative cursor-pointer hover:shadow-lg transition-shadow">
      <img
        src={posterUrl}
        alt={movie.title || "Movie Poster"}
        className="w-full min-h-96 object-cover"
        onError={(e) => {
          e.target.src =
            "https://via.placeholder.com/500x750?text=Image+Failed";
        }}
      />
      <div className="p-4">
        <div className="flex space-x-2 text-gray-400 text-base font-semibold">
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
      </div>
      {user && (
        <button
          onClick={handleWishlistToggle}
          className="absolute top-2 right-2 p-2 rounded-full bg-white shadow-md"
        >
          <svg
            className={`w-5 h-5 ${
              isWishlisted ? "text-red-600" : "text-gray-400"
            }`}
            fill={isWishlisted ? "currentColor" : "none"}
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
        </button>
      )}
    </Link>
  );
}

export default MovieCard;


// import { useState, useEffect } from 'react';
// import { auth } from '../firebase';
// import { onAuthStateChanged } from 'firebase/auth';

// function MovieCard({ movie, genres, loadingGenres }) {
//   const [user, setUser] = useState(null);
//   const [isWishlisted, setIsWishlisted] = useState(false);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       setUser(currentUser);
//     });
//     return () => unsubscribe();
//   }, []);

//   useEffect(() => {
//     if (user) {
//       const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
//       setIsWishlisted(wishlist.some((item) => item.id === movie.id));
//     }
//   }, [user, movie.id]);

//   const handleWishlistToggle = () => {
//     if (!user) return;
//     const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
//     const isAlreadyWishlisted = wishlist.some((item) => item.id === movie.id);

//     if (isAlreadyWishlisted) {
//       const updatedWishlist = wishlist.filter((item) => item.id !== movie.id);
//       localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
//       setIsWishlisted(false);
//     } else {
//       const updatedWishlist = [...wishlist, movie];
//       localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
//       setIsWishlisted(true);
//     }
//   };

//   // Map genre_ids to genre names only if genres are loaded
//   const genreNames = !loadingGenres && movie.genre_ids
//     ? movie.genre_ids
//         .map((id) => genres[id] || 'Unknown')
//         .filter(Boolean)
//         .slice(0, 2)
//         .join(', ') || 'Unknown'
//     : 'Loading...';

//   // Fallback image if poster_path is missing
//   const posterUrl = movie.poster_path
//     ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
//     : 'https://via.placeholder.com/500x750?text=No+Image+Available';

//   return (
//     <div className="bg-white rounded-lg shadow-md overflow-hidden relative">
//       <img
//         src={posterUrl}
//         alt={movie.title || 'Movie Poster'}
//         className="w-full h-64 object-cover"
//         onError={(e) => { e.target.src = 'https://via.placeholder.com/500x750?text=Image+Failed'; }}
//       />
//       <div className="p-4">
//         <h3 className="text-lg font-semibold">{movie.title}</h3>
//         <div className="flex space-x-2 text-gray-600 text-sm">
//           <p>{movie.release_date?.split('-')[0]}</p>
//           <span>|</span>
//           <p>{genreNames}</p>
//         </div>
//         {movie.trailerKey && (
//           <button className="mt-2 bg-red-600 text-white px-2 py-1 rounded text-sm">
//             Watch Trailer
//           </button>
//         )}
//       </div>
//       {user && (
//         <button
//           onClick={handleWishlistToggle}
//           className="absolute top-2 right-2 p-2 rounded-full bg-white shadow-md"
//         >
//           <svg
//             className={`w-5 h-5 ${isWishlisted ? 'text-red-600' : 'text-gray-400'}`}
//             fill={isWishlisted ? 'currentColor' : 'none'}
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth="2"
//               d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
//             />
//           </svg>
//         </button>
//       )}
//     </div>
//   );
// }

// export default MovieCard;
