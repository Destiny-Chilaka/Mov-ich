import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-white mb-4">404</h1>
        <p className="text-xl text-white mb-6">Page Not Found</p>
        <p className="text-gray-400 mb-6">
          Oops! The page you’re looking for doesn’t exist or has been moved.
        </p>
        <Link
          to="/"
          className="bg-[#BE123C] text-white px-6 py-2 rounded hover:underline transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
