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

      case "data":
        return <DataCorrectionTab />;
      case "appointments":
        return <AppointmentsTab />;

      default:
        return <DashboardTab />;
    }
  };

  return (
    <div className="min-h-screen bg-bay-of-many-50 overflow-hidden">
      <div className="md:hidden bg-bay-of-many-900 text-white p-4 flex justify-between items-center">
        <h2 className="text-xl font-bold">SOREC M{"é"}decin</h2>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="text-2xl"
        >
          {isMobileMenuOpen ? (
            <div className="cursor-pointer hover:rounded-xl hover:bg-white/20 transition-all duration-500 w-fit h-fit p-2 grid place-items-center">
              <X />
            </div>
          ) : (
            <div className="cursor-pointer hover:rounded-xl hover:bg-white/20 transition-all duration-500 w-fit h-fit p-2 grid place-items-center">
              <Menu />
            </div>
          )}
        </button>
      </div>

      <div
        className={`fixed left-0 top-0 h-full w-64 bg-bay-of-many-900 text-white p-4 transition-transform duration-500 ease-in-out z-50
          ${
            isMobileMenuOpen
              ? "translate-x-0"
              : "-translate-x-full md:translate-x-0"
          }`}
      >
        <h2 className="text-xl font-bold mb-8 hidden md:block">
          SOREC M{"é"}decin
        </h2>
        <nav>
          <button
            onClick={() => {
              setActiveTab("dashboard");
              setIsMobileMenuOpen(false);
            }}
            className={`w-full cursor-pointer transition-all duration-500 text-left p-3 rounded-lg mb-2 ${
              activeTab === "dashboard"
                ? "bg-bay-of-many-700"
                : "hover:bg-bay-of-many-800"
            }`}
          >
            Tableau de Bord
          </button>

          <button
            onClick={() => {
              setActiveTab("data");
              setIsMobileMenuOpen(false);
            }}
            className={`w-full cursor-pointer transition-all duration-500 text-left p-3 rounded-lg mb-2 ${
              activeTab === "data"
                ? "bg-bay-of-many-700"
                : "hover:bg-bay-of-many-800"
            }`}
          >
            Correction des Données
          </button>

          <button
            onClick={() => {
              setActiveTab("appointments");
              setIsMobileMenuOpen(false);
            }}
            className={`w-full cursor-pointer transition-all duration-500 text-left p-3 rounded-lg mb-8 ${
              activeTab === "appointments"
                ? "bg-bay-of-many-700"
                : "hover:bg-bay-of-many-800"
            }`}
          >
            Rendez-vous
          </button>

          <button
            onClick={handleLogout}
            className="w-full cursor-pointer transition-all duration-500 text-left p-3 rounded-lg hover:bg-bay-of-many-800 flex items-center gap-2 mt-auto absolute float-end bottom-4 left-0"
          >
            <LogOut className="h-4 w-4" />
            Déconnexion
          </button>
        </nav>
      </div>

      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-gray-300/80 z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <div className={`p-4 md:ml-64 ${isMobileMenuOpen ? "ml-64" : ""}`}>
        {renderActiveTab()}
      </div>
    </div>
  );
}
