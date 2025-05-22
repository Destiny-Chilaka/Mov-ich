import { Outlet } from "react-router-dom";

function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <>
      <footer className="bg-gray-800 text-white p-4 text-center">
        <p>
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
