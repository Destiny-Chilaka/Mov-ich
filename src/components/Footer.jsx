import { Outlet } from "react-router-dom";

function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <>
      <footer className="bg-white text-gray-500 p-4 text-center dm-sans mt-10">
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
