import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./pages/App.jsx";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import Login from "./pages/auth/Login";
import ProtectedRoute from "./pages/ProtectedRoute";
import AdminPanel from "./pages/panels/AdminPanel";
import DoctorPanel from "./pages/panels/DoctorPanel";
import UserPanel from "./pages/panels/UserPanel";
import Unauthorized from "./pages/auth/Unauthorized";
import NotFound from "./pages/NotFound";
import { atom } from "jotai";
import instance from "./auth/AxiosInstance";

export const usersAtom = atom(async () => {
  const response = await instance.get("/api/users");
  return response.data;
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={App} />
        <Route path="/login" Component={Login} />

        <Route element={<ProtectedRoute allowedRoles={["ADMIN"]} />}>
          <Route path="/admin" Component={AdminPanel} />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={["DOCTOR"]} />}>
          <Route path="/doctor" Component={DoctorPanel} />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={["USER"]} />}>
          <Route path="/user" Component={UserPanel} />
        </Route>

        <Route path="/unauthorized" Component={Unauthorized} />
        <Route path="*" Component={NotFound} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
