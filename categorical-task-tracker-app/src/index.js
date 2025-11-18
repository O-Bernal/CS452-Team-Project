import React from "react";
import ReactDOM from "react-dom/client";

// Global styles for the entire app
import "./styles/global.css";
import "./styles/layout.css";
import "./styles/components.css";

import App from "./App";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
