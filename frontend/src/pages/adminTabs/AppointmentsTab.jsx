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
import { useAtom } from "jotai";
import { usersAtom } from "@/main";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import { DateTimePicker } from "react-datetime-picker";

export default function AppointmentsTab() {
  const [date, setDate] = useState(new Date());
  const [dateSelect, setDateSelect] = useState(new Date());
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [selectedJockey, setSelectedJockey] = useState("");

  const [appointments, setAppointments] = useState([]);

  const [users, setUsers] = useAtom(usersAtom);

  const doctors = users.filter((user) => user.role === "MEDECIN");

  const jockeys = users.filter((user) => user.role === "JOCKEY");

  const handleRDVclick = () => {
  };

  return (
    <>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-bay-of-many-900">
          Gestion des Rendez-vous
        </h1>
        <div className="grid grid-cols-1 gap-6">
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md border border-bay-of-many-100">
            <h3 className="text-lg font-semibold text-bay-of-many-800 mb-4">
              Planifier un Rendez-vous
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-bay-of-many-700 mb-1">
                  Médecin
                </label>
                <Select onValueChange={setSelectedDoctor}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Sélectionner un médecin" />
                  </SelectTrigger>
                  <SelectContent className="bg-white max-h-60">
                    {doctors.map((doctor) => (
                      <SelectItem
                        className="hover:bg-bay-of-many-50 transition-colors cursor-pointer"
                        key={doctor.id}
                        value={doctor.id.toString()}
                      >
                        {doctor.nom} {doctor.prénom}
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
                  <SelectContent className="bg-white max-h-60">
                    {jockeys.map((jockey) => (
                      <SelectItem
                        className="hover:bg-bay-of-many-50 transition-colors  cursor-pointer"
                        key={jockey.id}
                        value={jockey.id.toString()}
                      >
                        <div className="flex items-center gap-2">
                          <span>
                            {jockey.nom} {jockey.prénom}
                          </span>
                          <span className="text-xs text-bay-of-many-500">
                            ({jockey.sorecId})
                          </span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-bay-of-many-700 mb-1">
                    Date et Heure
                  </label>
                  <div className="border border-bay-of-many-200 rounded-md p-2 bg-white">
                    <DateTimePicker
                      onChange={setDate}
                      value={date}
                      format="dd/MM/yyyy HH:mm"
                      locale="fr-FR"
                      disableClock
                      className="w-full [&>div]:border-none h-fit"
                      clearIcon={null}
                      minDate={new Date()}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-bay-of-many-700 mb-1">
                    Rendez-vous sélectionné
                  </label>
                  <div className="p-3 border border-bay-of-many-200 rounded-md bg-bay-of-many-50 text-bay-of-many-800  flex items-center h-fit">
                    {date ? (
                      <div>
                        <div className="font-medium">
                          {format(date, "EEEE dd MMMM yyyy", { locale: fr })}
                        </div>
                        <div className="text-sm">
                          à {format(date, "HH:mm", { locale: fr })}
                        </div>
                      </div>
                    ) : (
                      "Aucune date sélectionnée"
                    )}
                  </div>
                </div>
              </div>

              <button
                onClick={handleRDVclick}
                className="w-full bg-bay-of-many-600 text-white py-2.5 px-4 rounded-md hover:bg-bay-of-many-700 transition-colors mt-2"
              >
                Planifier le Rendez-vous
              </button>
            </div>
          </div>
        </div>
        <div className="md:flex md:gap-x-5 ">
          <div className="bg-white md:flex-1  p-6 rounded-lg shadow border-red-500 grid place-items-center md:w-fit w-full mb-5 md:mb-0">
            <h1 className="text-xl font-bold my-2 text-bay-of-many-900">
              Rechercher RDV
            </h1>
            <Calendar
              mode="single"
              selected={dateSelect}
              onSelect={setDateSelect}
              className="rounded-md h-full border w-fit"
            />
          </div>
          <div className="bg-white p-6 rounded-lg shadow  w-full  ">
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
      </div>
    </>
  );
}
