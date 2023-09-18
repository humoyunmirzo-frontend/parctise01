import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";

import Favicon from "react-favicon";
import logo from "./assets/log.png";
//* Import global css
import "./styles/globals.css";

import { Provider } from "react-redux";
import { store } from "./redux/store";

import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Favicon url={logo} />
    <ToastContainer />
    <Router>
      <Provider store={store}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <App />
        </LocalizationProvider>
      </Provider>
    </Router>
  </React.StrictMode>
);
