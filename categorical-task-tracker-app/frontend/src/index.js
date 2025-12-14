import React from "react";
import ReactDOM from "react-dom/client";

/* ✅ ADD THIS LINE */
import "bootstrap/dist/css/bootstrap.min.css";

import App from "./App";
import { AuthProvider } from "./AuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
