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
import PatientTab from "./pages/patientTabs/PatientTab";
import AntecedentPersonnel from "./pages/patientTabs/AntecedentPersonnel";
import PasswordCreation from "./pages/auth/PasswordCreation";
import PasswordReset from "./pages/auth/PasswordReset";
import PasswordForgot from "./pages/auth/PasswordForgot";
import Examens from "./pages/patientTabs/Examens";
import ExamenCardioVasculaire from "./pages/examens/ExamenCardioVasculaire";

const usersAsyncAtom = atom([]);

export const usersAtom = atom(
  (get) => get(usersAsyncAtom),
  async (get, set, action) => {
    let refreshed;
    console.log("hi");

    switch (action) {
      case "REFRESH": {
        refreshed = await instance.get("/api/users");
        set(usersAsyncAtom, refreshed.data);
        break;
      }

      default:
        throw new Error("Unknown action type");
    }
  }
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={App} />
        <Route path="/login" Component={Login} />
        <Route path="/create-password" Component={PasswordCreation} />
        <Route path="/reset-password" Component={PasswordReset} />
        <Route path="/forgot-password" Component={PasswordForgot} />

        <Route element={<ProtectedRoute allowedRoles={["ADMIN"]} />}>
          <Route path="/admin" Component={AdminPanel} />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={["MEDECIN"]} />}>
          <Route path="/medecin" Component={DoctorPanel} />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={["USER"]} />}>
          <Route path="/user" Component={UserPanel} />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={["MEDECIN", "ADMIN"]} />}>
          <Route path="/medecin/jockey/:id" Component={PatientTab} />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={["MEDECIN"]} />}>
          <Route
            path="/medecin/jockey/:id/antecedent_personel"
            Component={AntecedentPersonnel}
          />
        </Route>
        <Route element={<ProtectedRoute allowedRoles={["MEDECIN"]} />}>
          <Route
            path="/medecin/jockey/:id/examens"
            Component={Examens}
          />
        </Route>
        <Route element={<ProtectedRoute allowedRoles={["MEDECIN"]} />}>
          <Route
            path="/medecin/jockey/:id/examens/cardiovasculaire"
            Component={ExamenCardioVasculaire}
          />
        </Route>
        <Route path="/unauthorized" Component={Unauthorized} />
        <Route path="*" Component={NotFound} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
