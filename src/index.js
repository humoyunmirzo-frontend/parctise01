import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";

import Favicon from "react-favicon";
import logo from "./assets/log.png";
//* Import global css
import "./styles/globals.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Favicon url={logo} />
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);
