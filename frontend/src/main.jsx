import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./pages/App.jsx";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import Login from "./pages/Login";
import ProtectedRoute from "./pages/ProtectedRoute";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={App} />
        <Route path="/login" Component={Login} />
        {/* <Route Component={ProtectedRoute}> */}
          {/* <Route path="/admin" Component={AdminPanel} /> */}
        {/* </Route> */}
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
