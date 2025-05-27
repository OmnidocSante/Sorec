import { useState } from "react";
import { Menu, X, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import DashboardTab from "../adminTabs/DashboardTab";
import UsersTab from "../adminTabs/UsersTab";
import DataCorrectionTab from "../adminTabs/DataCorrectionTab";
import AppointmentsTab from "../adminTabs/AppointmentsTab";
import UserCreationTab from "../adminTabs/UserCreationTab";
import PatientTab from "../patientTabs/PatientTab";
import MedicalRecordTab from "../adminTabs/MedicalRecordTab";
import useUser from "@/auth/useUser";

export default function AdminPanel({ tab }) {
  const [activeTab, setActiveTab] = useState("dashboard");
  if (tab && tab !== "dashboard") {
    setActiveTab(tab);
  }
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  const user = useUser();
  console.log(user.role);

  const renderActiveTab = () => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardTab />;
      case "users":
        return <UsersTab />;
      case "data":
        return <DataCorrectionTab />;
      case "create-user":
        return <UserCreationTab />;
      case "appointments":
        return <AppointmentsTab />;
      case "hide":
        return <MedicalRecordTab />;

      default:
        return <DashboardTab />;
    }
  };

  return (
    <div className="min-h-screen bg-bay-of-many-50 overflow-hidden">
      {/* Mobile Header */}
      <div className="md:hidden bg-gradient-to-r from-bay-of-many-800 to-bay-of-many-900 text-white p-4 flex justify-between items-center shadow-xl">
        <h2 className="text-xl font-bold tracking-tight flex items-center gap-2">
          <svg
            className="w-6 h-6 text-blue-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          SOREC Admin
        </h2>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 rounded-lg hover:bg-white/10 transition-all duration-300"
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Desktop Sidebar */}
      <div
        className={`fixed left-0 top-0 h-full w-64 bg-gradient-to-b from-bay-of-many-800 to-bay-of-many-900 text-white p-6 transition-all duration-500 ease-in-out z-50 shadow-2xl
          ${
            isMobileMenuOpen
              ? "translate-x-0"
              : "-translate-x-full md:translate-x-0"
          }`}
      >
        <h2 className="text-2xl font-bold mb-10 hidden md:block flex items-center gap-3">
          SOREC
        </h2>
        <nav className="space-y-2">
          {/* Dashboard */}
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`w-full flex items-center gap-3 p-3.5 rounded-xl transition-all duration-300 group
              ${
                activeTab === "dashboard"
                  ? "bg-gradient-to-r from-blue-500 to-blue-600 shadow-lg"
                  : "hover:bg-bay-of-many-700/50 hover:pl-5"
              }`}
          >
            <svg
              className={`w-5 h-5 ${
                activeTab === "dashboard" ? "text-white" : "text-blue-300"
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              ></path>
            </svg>
            Tableau de Bord
          </button>

          {/* User Management */}
          <button
            onClick={() => setActiveTab("users")}
            className={`w-full flex items-center gap-3 p-3.5 rounded-xl transition-all duration-300 group
              ${
                activeTab === "users"
                  ? "bg-gradient-to-r from-blue-500 to-blue-600 shadow-lg"
                  : "hover:bg-bay-of-many-700/50 hover:pl-5"
              }`}
          >
            <svg
              className={`w-5 h-5 ${
                activeTab === "users" ? "text-white" : "text-blue-300"
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              ></path>
            </svg>
            Gestion des Utilisateurs
          </button>

          {/* Jockey History */}
          <button
            onClick={() => setActiveTab("data")}
            className={`w-full flex items-center gap-3 p-3.5 rounded-xl transition-all duration-300 group
              ${
                activeTab === "data"
                  ? "bg-gradient-to-r from-blue-500 to-blue-600 shadow-lg"
                  : "hover:bg-bay-of-many-700/50 hover:pl-5"
              }`}
          >
            <svg
              className={`w-5 h-5 ${
                activeTab === "data" ? "text-white" : "text-blue-300"
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
              ></path>
            </svg>
            Historique des jockeys
          </button>

          {/* Create User */}

          <button
            onClick={() => setActiveTab("create-user")}
            className={`w-full flex items-center gap-3 p-3.5 rounded-xl transition-all duration-300 group
              ${
                activeTab === "create-user"
                  ? "bg-gradient-to-r from-blue-500 to-blue-600 shadow-lg"
                  : "hover:bg-bay-of-many-700/50 hover:pl-5"
              }`}
          >
            <svg
              className={`w-5 h-5 ${
                activeTab === "create-user" ? "text-white" : "text-blue-300"
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
              ></path>
            </svg>
            Créer Utilisateur
          </button>

          {/* Appointments */}
          <button
            onClick={() => setActiveTab("appointments")}
            className={`w-full flex items-center gap-3 p-3.5 rounded-xl transition-all duration-300 group
              ${
                activeTab === "appointments"
                  ? "bg-gradient-to-r from-blue-500 to-blue-600 shadow-lg"
                  : "hover:bg-bay-of-many-700/50 hover:pl-5"
              }`}
          >
            <svg
              className={`w-5 h-5 ${
                activeTab === "appointments" ? "text-white" : "text-blue-300"
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              ></path>
            </svg>
            Rendez-vous
          </button>

          {/* Medical Records */}
          <button
            onClick={() => setActiveTab("hide")}
            className={`w-full flex items-center gap-3 p-3.5 rounded-xl transition-all duration-300 group
              ${
                activeTab === "hide"
                  ? "bg-gradient-to-r from-blue-500 to-blue-600 shadow-lg"
                  : "hover:bg-bay-of-many-700/50 hover:pl-5"
              }`}
          >
            <svg
              className={`w-5 h-5 ${
                activeTab === "hide" ? "text-white" : "text-blue-300"
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              ></path>
            </svg>
            Dossier Médical
          </button>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="w-9/12 hover:bg-bay-of-many-700/50 transition-all duration-300 flex items-center gap-3 p-3.5 mt-8 rounded-xl hover:pl-5 absolute bottom-8 left-6 right-6"
          >
            <LogOut className="w-5 h-5  " />
            Déconnexion
          </button>
        </nav>
      </div>

      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <div className={`p-4 md:ml-64 ${isMobileMenuOpen ? "ml-64" : ""}`}>
        {renderActiveTab()}
      </div>
    </div>
  );
}
