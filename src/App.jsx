import { Outlet } from "react-router-dom";

function App() {
  const currentYear = new Date().getFullYear();
  return (
    <>
      <main>
        <Outlet />
      </main>
      <footer className="bg-gray-800 text-white p-4 text-center">
        <p>
          © {currentYear} MovieBox By <a href="#" target="blank">Chilaka Destiny</a>
        </p>
      </footer>
    </>
  );
}

export default App;
