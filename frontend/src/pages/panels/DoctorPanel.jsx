import { useState } from "react";
import { Menu, X, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import DashboardTab from "../docteurTabs/DashboardTab";
import DataCorrectionTab from "../docteurTabs/DataCorrectionTab";
import AppointmentsTab from "../docteurTabs/AppointmentsTab";

export default function DoctorPanel() {
  const [activeTab, setActiveTab] = useState("dashboard");

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardTab />;

      // case "data":
      //   return <DataCorrectionTab />;
      case "appointments":
        return <AppointmentsTab />;

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
          SOREC Médecin
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
          <button
            onClick={() => {
              setActiveTab("dashboard");
              setIsMobileMenuOpen(false);
            }}
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

          <button
            onClick={() => {
              setActiveTab("appointments");
              setIsMobileMenuOpen(false);
            }}
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

          <button
            onClick={handleLogout}
            className="w-9/12 hover:bg-bay-of-many-700/50 transition-all duration-300 flex items-center gap-3 p-3.5 mt-24 rounded-xl hover:pl-5 absolute bottom-8 left-6 right-6"
          >
            <LogOut className="w-5 h-5" />
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
