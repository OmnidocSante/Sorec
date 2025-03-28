import { useState } from "react";
import UserCreationForm from "../UserCreationForm";
import { Menu, X } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [users, setUsers] = useState([
    { id: 1, name: "abdelbasset", role: "doctor", lastActive: "2023-05-15" },
    { id: 2, name: "test User", role: "user", lastActive: "2023-05-14" },
  ]);
  const [date, setDate] = useState(new Date());
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [selectedJockey, setSelectedJockey] = useState("");
  const [appointments, setAppointments] = useState([]);

  const doctors = [
    { id: 1, name: "Dr. Abdelbasset" },
    { id: 2, name: "Dr. test" },
  ];

  const jockeys = [
    { id: 1, name: "Abdelbasset Hmidchat", code: "fgerhigoiher" },
    { id: 2, name: "Test user", code: "frjegfheroihpgf" },
  ];

  const handleScheduleAppointment = () => {
    if (!date || !selectedDoctor || !selectedJockey) return;

    const newAppointment = {
      id: appointments.length + 1,
      date: format(date, "PPP", { locale: fr }),
      doctor: doctors.find((d) => d.id === parseInt(selectedDoctor))?.name,
      jockey: jockeys.find((j) => j.id === parseInt(selectedJockey))?.name,
      status: "planned",
    };

    setAppointments([...appointments, newAppointment]);
  };

  return (
    <>
      <div className="min-h-screen bg-bay-of-many-50">
        <div className="md:hidden bg-bay-of-many-900 text-white p-4 flex justify-between items-center">
          <h2 className="text-xl font-bold">SOREC Admin</h2>
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
            SOREC Admin
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
                setActiveTab("users");
                setIsMobileMenuOpen(false);
              }}
              className={`w-full cursor-pointer transition-all duration-500 text-left p-3 rounded-lg mb-2 ${
                activeTab === "users"
                  ? "bg-bay-of-many-700"
                  : "hover:bg-bay-of-many-800"
              }`}
            >
              Gestion des Utilisateurs
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
                setActiveTab("create-user");
                setIsMobileMenuOpen(false);
              }}
              className={`w-full cursor-pointer transition-all duration-500 text-left p-3 rounded-lg mb-2 ${
                activeTab === "create-user"
                  ? "bg-bay-of-many-700"
                  : "hover:bg-bay-of-many-800"
              }`}
            >
              Créer Utilisateur
            </button>
            <button
              onClick={() => {
                setActiveTab("appointments");
                setIsMobileMenuOpen(false);
              }}
              className={`w-full cursor-pointer transition-all duration-500 text-left p-3 rounded-lg ${
                activeTab === "appointments"
                  ? "bg-bay-of-many-700"
                  : "hover:bg-bay-of-many-800"
              }`}
            >
              Rendez-vous
            </button>
          </nav>
        </div>

        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 bg-gray-300/50 z-40 md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}

        <div className={`p-4 md:ml-64 ${isMobileMenuOpen ? "ml-64" : ""}`}>
          {activeTab === "create-user" && <UserCreationForm />}
          {activeTab === "dashboard" && (
            <div>
              <h1 className="text-2xl font-bold text-bay-of-many-900 mb-6">
                Tableau de Bord
              </h1>
              <div className="grid grid-cols-4 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg shadow">
                  <h3 className="text-bay-of-many-600">Utilisateurs Totaux</h3>
                  <p className="text-3xl font-bold text-bay-of-many-900">142</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                  <h3 className="text-bay-of-many-600">Médecins Actifs</h3>
                  <p className="text-3xl font-bold text-bay-of-many-900">23</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                  <h3 className="text-bay-of-many-600">Examens en Attente</h3>
                  <p className="text-3xl font-bold text-bay-of-many-900">17</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                  <h3 className="text-bay-of-many-600">Jockeys Aptes</h3>
                  <p className="text-3xl font-bold text-bay-of-many-900">89</p>
                </div>
              </div>
            </div>
          )}
          {activeTab === "users" && (
            <div>
              <h1 className="text-2xl font-bold text-bay-of-many-900 mb-6">
                Gestion des Utilisateurs
              </h1>
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="w-full">
                  <thead className="bg-bay-of-many-100">
                    <tr>
                      <th className="p-3 text-left">Nom</th>
                      <th className="p-3 text-left">Rôle</th>
                      <th className="p-3 text-left">Dernière Activité</th>
                      <th className="p-3 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id} className="border-b">
                        <td className="p-3">{user.name}</td>
                        <td className="p-3">
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${
                              user.role === "doctor"
                                ? "bg-bay-of-many-100 text-bay-of-many-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {user.role}
                          </span>
                        </td>
                        <td className="p-3">{user.lastActive}</td>
                        <td className="p-3 space-x-2">
                          <button className="text-bay-of-many-600 hover:text-bay-of-many-800">
                            Modifier
                          </button>
                          <button className="text-red-600 hover:text-red-800">
                            Supprimer
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          {activeTab === "data" && (
            <div>
              <h1 className="text-2xl font-bold text-bay-of-many-900 mb-6">
                Correction des Données
              </h1>
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="mb-6">
                  <h2 className="text-lg font-semibold mb-3">
                    Rechercher un Jockey
                  </h2>
                  <div className="flex">
                    <input
                      type="text"
                      placeholder="Nom, CIN ou SOREC ID"
                      className="flex-1 p-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-bay-of-many-400"
                    />
                    <button className="bg-bay-of-many-600 text-white px-4 rounded-r-lg hover:bg-bay-of-many-700">
                      Rechercher
                    </button>
                  </div>
                </div>
                <div>
                  <h2 className="text-lg font-semibold mb-3">
                    Historique des Modifications
                  </h2>
                  <div className="border rounded-lg p-4">
                    <p className="text-bay-of-many-700">
                      Sélectionnez un jockey pour voir son historique
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
          {activeTab === "appointments" && (
            <div className="space-y-6">
              <h1 className="text-2xl font-bold text-bay-of-many-900">
                Gestion des Rendez-vous
              </h1>

              <div className="grid grid-cols-1 lg:grid-cols-3  gap-6">
                <div className=" bg-white p-6 rounded-lg shadow border-red-500 grid place-items-center">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border w-fit"
                    locale={fr}
                  />
                </div>

                <div className="bg-white p-6 rounded-lg shadow space-y-4 lg:col-span-2">
                  <h3 className="text-lg font-semibold text-bay-of-many-800">
                    Planifier un Rendez-vous
                  </h3>

                  <div>
                    <label className="block text-sm font-medium text-bay-of-many-700 mb-1">
                      Médecin
                    </label>
                    <Select onValueChange={setSelectedDoctor}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Sélectionner un médecin" />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        {doctors.map((doctor) => (
                          <SelectItem
                            key={doctor.id}
                            value={doctor.id.toString()}
                          >
                            {doctor.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-bay-of-many-700 mb-1">
                      Jockey
                    </label>
                    <Select onValueChange={setSelectedJockey}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Sélectionner un jockey" />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        {jockeys.map((jockey) => (
                          <SelectItem
                            key={jockey.id}
                            value={jockey.id.toString()}
                          >
                            {jockey.name} ({jockey.code})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-bay-of-many-700 mb-1">
                      Date sélectionnée
                    </label>
                    <div className="p-3 border rounded bg-bay-of-many-50 text-bay-of-many-800">
                      {date
                        ? format(date, "PPPP", { locale: fr })
                        : "Aucune date sélectionnée"}
                    </div>
                  </div>

                  <button
                    onClick={handleScheduleAppointment}
                    className="w-full bg-bay-of-many-600 text-white py-2 px-4 rounded-lg hover:bg-bay-of-many-700 transition-colors"
                  >
                    Planifier le Rendez-vous
                  </button>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold text-bay-of-many-800 mb-4">
                  Rendez-vous à venir
                </h3>
                {appointments.length > 0 ? (
                  <div className="space-y-2">
                    {appointments.map((appointment) => (
                      <div
                        key={appointment.id}
                        className="p-3 border-b last:border-b-0"
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium">{appointment.jockey}</p>
                            <p className="text-sm text-bay-of-many-600">
                              {appointment.date}
                            </p>
                          </div>
                          <div>
                            <span className="bg-bay-of-many-100 text-bay-of-many-800 px-2 py-1 rounded-full text-xs">
                              {appointment.doctor}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-bay-of-many-600">
                    Aucun rendez-vous planifié
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
