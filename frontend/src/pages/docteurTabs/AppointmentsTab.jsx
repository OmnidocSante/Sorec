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
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md h-full border w-fit"
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
                  <SelectItem key={doctor.id} value={doctor.id.toString()}>
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
          <p className="text-bay-of-many-600">Aucun rendez-vous planifié</p>
        )}
      </div>
    </div>
  );
}