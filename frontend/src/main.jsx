import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./pages/App.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/auth/Login";
import ProtectedRoute from "./pages/ProtectedRoute";
import AdminPanel from "./pages/panels/AdminPanel";
import DoctorPanel from "./pages/panels/DoctorPanel";
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
import Autres from "./pages/patientTabs/antecedents/Autres";
import AppareilCardioVasculaire from "./pages/patientTabs/antecedents/AppareilCardioVasculaire";
import SystemeNerveux from "./pages/patientTabs/antecedents/SystemeNerveux";
import ORL from "./pages/patientTabs/antecedents/ORL";
import Allergies from "./pages/patientTabs/antecedents/Allergies";
import Traumatologie from "./pages/patientTabs/antecedents/Traumatologie";
import AppareilDigestif from "./pages/patientTabs/antecedents/AppareilDigestif";
import Endocrinologie from "./pages/patientTabs/antecedents/Endocrinologie";
import AppareilRespiratoire from "./pages/patientTabs/antecedents/AppareilRespiratoire";
import ExamenPleuroPulmonaire from "./pages/examens/ExamenPleuroPulmonaire";
import ExamenOphtalmogique from "./pages/examens/ExamenOphtalmogique";
import ExamenAuditif from "./pages/examens/ExamenAuditif";
import ExamenNeurologique from "./pages/examens/ExamenNeurologique";
import ExamenAbdominal from "./pages/examens/ExamenAbdominal";
import ExamenGenitoUrinaire from "./pages/examens/ExamenGenitoUrinaire";
import ECR from "./pages/examens/ECR";
import ECE from "./pages/examens/ECE";
import ExamenParaclinique from "./pages/examens/ExamenParaclinique";
import Hygiene from "./pages/patientTabs/Hygiene";
import AntecedentFamiliaux from "./pages/patientTabs/AntecedentFamiliaux";
import ExamenLocomoteur from "./pages/examens/ExamenLocomoteur";
import Medications from "./pages/patientTabs/Medications";
import Conclusion from "./pages/patientTabs/Conclusion";

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
        {/* Public Routes */}
        <Route path="/" Component={App} />
        <Route path="/login" Component={Login} />
        <Route path="/create-password" Component={PasswordCreation} />
        <Route path="/reset-password" Component={PasswordReset} />
        <Route path="/forgot-password" Component={PasswordForgot} />
        <Route path="/unauthorized" Component={Unauthorized} />
        <Route path="*" Component={NotFound} />

        {/* Admin */}
        <Route element={<ProtectedRoute allowedRoles={["ADMIN"]} />}>
          <Route path="/admin" Component={AdminPanel} />
        </Route>

        {/* Doctor */}
        <Route
          element={<ProtectedRoute allowedRoles={["MEDECIN", "JOCKEY"]} />}
        >
          <Route path="/medecin" Component={DoctorPanel} />
          <Route path="/jockey/:id" Component={PatientTab} />
          <Route path="/jockey/:id/conclusion" Component={Conclusion} />
          <Route path="/jockey/:id/examens" Component={Examens} />
          <Route
            path="/jockey/:id/examens/locomoteur"
            Component={ExamenLocomoteur}
          />
          <Route path="/jockey/:id/medications" Component={Medications} />
          <Route path="/jockey/:id/examens/ecg-repos" Component={ECR} />
          <Route
            path="/jockey/:id/antecedent_familiaux"
            Component={AntecedentFamiliaux}
          />
          <Route path="/jockey/:id/hygiene" Component={Hygiene} />
          <Route path="/jockey/:id/examens/ecg-effort" Component={ECE} />
          <Route
            path="/jockey/:id/examens/autres-paracliniques"
            Component={ExamenParaclinique}
          />
          <Route
            path="/jockey/:id/examens/genito-urinaire"
            Component={ExamenGenitoUrinaire}
          />
          <Route
            path="/jockey/:id/examens/neurologique"
            Component={ExamenNeurologique}
          />
          <Route
            path="/jockey/:id/examens/abdominal"
            Component={ExamenAbdominal}
          />
          <Route
            path="/jockey/:id/examens/cardiovasculaire"
            Component={ExamenCardioVasculaire}
          />
          <Route
            path="/jockey/:id/examens/pleuropulmonaire"
            Component={ExamenPleuroPulmonaire}
          />
          <Route
            path="/jockey/:id/examens/ophtalmologique"
            Component={ExamenOphtalmogique}
          />
          <Route path="/jockey/:id/examens/auditif" Component={ExamenAuditif} />
          <Route
            path="/jockey/:id/antecedent_personel"
            Component={AntecedentPersonnel}
          />
          <Route
            path="/jockey/:id/antecedent_personel/autres"
            Component={Autres}
          />
          <Route
            path="/jockey/:id/antecedent_personel/appareil-cardiovasculaire"
            Component={AppareilCardioVasculaire}
          />
          <Route
            path="/jockey/:id/antecedent_personel/appareil-respiratoire"
            Component={AppareilRespiratoire}
          />
          <Route
            path="/jockey/:id/antecedent_personel/systeme-nerveux"
            Component={SystemeNerveux}
          />
          <Route path="/jockey/:id/antecedent_personel/orl" Component={ORL} />
          <Route
            path="/jockey/:id/antecedent_personel/allergies"
            Component={Allergies}
          />
          <Route
            path="/jockey/:id/antecedent_personel/traumatologie"
            Component={Traumatologie}
          />
          <Route
            path="/jockey/:id/antecedent_personel/appareil-digestif"
            Component={AppareilDigestif}
          />
          <Route
            path="/jockey/:id/antecedent_personel/endocrinologie"
            Component={Endocrinologie}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
