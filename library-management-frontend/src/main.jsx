import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";

import "./index.css";
import "./styles/Sidebar.css";
import "./styles/Navbar.css";
import "./styles/common.css";
import "./styles/Books.css";
import "./styles/Students.css";
import "./styles/Dashboard.css";
import "./styles/Forms.css";
import "./styles/IssueBooks.css";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);