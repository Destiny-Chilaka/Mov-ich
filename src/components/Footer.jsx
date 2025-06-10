import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <>
      <footer className="bg-white text-gray-500 p-4 text-center dm-sans mt-10">
        <div className="flex justify-center items-center space-x-6 mb-4">
          <a
            href="https://web.facebook.com/destiny.chilaka.125"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebook className="text-black text-base md:text-2xl hover:text-[#1877f3] transition-colors" />
          </a>
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram className="text-black text-base md:text-2xl hover:text-[#e4405f] transition-colors" />
          </a>
          <a
            href="https://x.com/Destiny_Chilaka"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTwitter className="text-black text-base md:text-2xl hover:text-[#1da1f2] transition-colors" />
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer">
            <FaYoutube className="text-black text-base md:text-2xl hover:text-[#ff0000] transition-colors" />
          </a>
        </div>
        <div className="space-x-4 text-sm md:text-base">
          <Link to="/conditions" className="text-gray-900 font-semibold">
            Conditions of Use
          </Link>
          <Link to="/privacy" className="text-gray-900 font-semibold">
            Privacy & Policy
          </Link>
          <Link to="/Press" className="text-gray-900 font-semibold">
            Press Room
          </Link>
        </div>
        <p className="mt-4 text-sm md:text-base">
          © {currentYear} MovieBox By{" "}
          <a href="#" target="blank">
            Chilaka Destiny
          </a>
        </p>
      </footer>
    </>
  );
}

export default Footer;
