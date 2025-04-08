import { useState } from "react";
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
import { CalendarT } from "@/components/CalendarT";

export default function AppointmentsTab() {
  const [date, setDate] = useState(new Date());
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [selectedJockey, setSelectedJockey] = useState("");
  const [appointments, setAppointments] = useState([]);

  const doctors = [
    { id: 1, name: "Dr. Abdelbasset" },
    { id: 2, name: "Dr. test" },
  ];

  const jockeys = [
    { id: 1, name: "Abdelbasset Hmidchat", code: "abdo1" },
    { id: 2, name: "Test user", code: "abdo2" },
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
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-bay-of-many-900">
        Gestion des Rendez-vous
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow border-red-500 grid place-items-center">
          <CalendarT onDateSelect={setDate} className="w-fit" />

        </div>

        <div className="bg-white p-6 rounded-lg shadow space-y-4 lg:col-span-2">
          <h3 className="text-lg font-semibold text-bay-of-many-800">
            Planifier un Rendez-vous
          </h3>

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
                  <SelectItem key={jockey.id} value={jockey.id.toString()}>
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

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-bay-of-many-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-bay-of-many-700 uppercase tracking-wider"
                >
                  Date et Heure
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-bay-of-many-700 uppercase tracking-wider"
                >
                  Patient
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-bay-of-many-700 uppercase tracking-wider"
                >
                  Médecin
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-bay-of-many-700 uppercase tracking-wider"
                >
                  Statut
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-bay-of-many-700 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            {/* <tbody className="bg-white divide-y divide-gray-200">
              {appointments.length > 0 &&
                appointments.map((appointment, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {format(new Date(appointment.dateTime), "PPPp", {
                        locale: fr,
                      })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {appointment.userLastName} {appointment.userName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      Dr. {appointment.doctorLastName} {appointment.doctorName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Confirmé
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-bay-of-many-600 hover:text-bay-of-many-900 mr-3">
                        Modifier
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        Annuler
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody> */}
          </table>
        </div>
      </div>
    </div>
  );
}
