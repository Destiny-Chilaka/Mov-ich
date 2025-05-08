import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App"; // Assuming you have an App component
import "./index.css"; // Assuming you have a CSS file for styling

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
