import { useEffect, useState, useMemo } from "react";
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
import { AnimatePresence } from "framer-motion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { motion } from "framer-motion";
import { AlertCircle } from "lucide-react";
import instance from "@/auth/AxiosInstance";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toLocalISOString } from "@/utils/toLocalISOString";
import { STATUS_RDV } from "@/utils/enums";
import { isSameDate } from "@/utils/isSameDate";
import { CalendarT } from "@/components/CalendarT";

const appointmentSchema = z.object({
  medecinId: z.string().min(1, "Médecin est requis"),
  jockeyId: z.string().min(1, "Jockey est requis"),
  date: z.date().refine((d) => d > new Date(), {
    message: "La date doit être dans le futur",
  }),
});

export default function AppointmentsTab() {
  const [dateSelect, setDateSelect] = useState(new Date());
  const [appointments, setAppointments] = useState([]);
  const [users] = useAtom(usersAtom);
  const [doctorSearch, setDoctorSearch] = useState("");
  const [jockeySearch, setJockeySearch] = useState("");
  const [doctorCityFilter, setDoctorCityFilter] = useState("all");
  const [jockeyCityFilter, setJockeyCityFilter] = useState("all");

  const filteredAppointments = appointments.filter((appointment) => {
    const appointmentDate = new Date(appointment.dateTime);
    if (appointmentDate && dateSelect) {
      return isSameDate(appointmentDate, dateSelect);
    } else {
      return appointments;
    }
  });

  const [alertContent, setAlertContent] = useState({
    status: null,
    content: null,
  });

  const doctors = users.filter((user) => user.role === "MEDECIN");
  const jockeys = users.filter((user) => user.role === "JOCKEY");

  const doctorCities = useMemo(() => {
    const cities = new Set();
    doctors.forEach((doctor) => doctor.ville && cities.add(doctor.ville));
    return Array.from(cities).filter((city) => city && city.trim() !== "");
  }, [doctors]);

  const jockeyCities = useMemo(() => {
    const cities = new Set();
    jockeys.forEach((jockey) => jockey.ville && cities.add(jockey.ville));
    return Array.from(cities).filter((city) => city && city.trim() !== "");
  }, [jockeys]);

  const filteredDoctors = useMemo(() => {
    return doctors.filter((doctor) => {
      const matchesSearch =
        doctor.nom.toLowerCase().includes(doctorSearch.toLowerCase()) ||
        doctor.prénom.toLowerCase().includes(doctorSearch.toLowerCase());
      const matchesCity =
        doctorCityFilter === "all" ? true : doctor.ville === doctorCityFilter;
      return matchesSearch && matchesCity;
    });
  }, [doctors, doctorSearch, doctorCityFilter]);

  const filteredJockeys = useMemo(() => {
    return jockeys.filter((jockey) => {
      const matchesSearch =
        jockey.nom.toLowerCase().includes(jockeySearch.toLowerCase()) ||
        jockey.prénom.toLowerCase().includes(jockeySearch.toLowerCase()) ||
        jockey.sorecId.toLowerCase().includes(jockeySearch.toLowerCase());
      const matchesCity =
        jockeyCityFilter === "all" ? true : jockey.ville === jockeyCityFilter;
      return matchesSearch && matchesCity;
    });
  }, [jockeys, jockeySearch, jockeyCityFilter]);

  const {
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      medecinId: "",
      jockeyId: "",
      date: new Date(),
    },
  });

  const selectedDate = watch("date");

  const fetchAppointments = async () => {
    const response = await instance.get("/api/rdvs");
    setAppointments(response.data);
  };

  const onSubmit = async (data) => {
    try {
      const payload = {
        medecinId: data.medecinId,
        jockeyId: data.jockeyId,
        date: toLocalISOString(data.date),
      };

      await instance.post("/api/rdvs", payload);

      setAlertContent({
        content: "Rendez-vous planifié avec succès",
        status: "success",
      });
      fetchAppointments();
    } catch (error) {
      setAlertContent({
        content: error?.response?.data?.message || error.message,
        status: "error",
      });
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <div className="space-y-6">
      <AnimatePresence>
        {alertContent.content && (
          <motion.div
            className="w-2/3 mx-auto mt-1"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Alert
              className={`${
                alertContent.status === "success"
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              <AlertCircle className="size-4" />
              <AlertTitle>
                {alertContent.status === "success" ? "Succès" : "Erreur"}
              </AlertTitle>
              <AlertDescription>{alertContent.content}</AlertDescription>
            </Alert>
          </motion.div>
        )}
      </AnimatePresence>

      <h1 className="text-2xl font-bold text-bay-of-many-900">
        Gestion des Rendez-vous
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 gap-6"
      >
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md border border-bay-of-many-100">
          <h3 className="text-lg font-semibold text-bay-of-many-800 mb-4">
            Planifier un Rendez-vous
          </h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-bay-of-many-700 mb-1">
                Médecin
              </label>

              <div className="mb-2">
                <label className="block text-xs font-medium text-bay-of-many-500 mb-1">
                  Filtrer par ville
                </label>
                <Select
                  onValueChange={setDoctorCityFilter}
                  value={doctorCityFilter}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Toutes les villes" />
                  </SelectTrigger>
                  <SelectContent className="bg-white max-h-60">
                    <SelectItem
                      className="cursor-pointer my-2 transition-all hover:bg-gray-100"
                      value="all"
                    >
                      Toutes les villes
                    </SelectItem>
                    {doctorCities.map((city) => (
                      <SelectItem
                        className="cursor-pointer my-2 transition-all hover:bg-gray-100"
                        key={city}
                        value={city}
                      >
                        {city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <input
                type="text"
                placeholder="Rechercher un médecin..."
                className="w-full p-2 mb-2 border rounded-md text-sm"
                value={doctorSearch}
                onChange={(e) => setDoctorSearch(e.target.value)}
              />

              <Select onValueChange={(val) => setValue("medecinId", val)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Sélectionner un médecin" />
                </SelectTrigger>
                <SelectContent className="bg-white max-h-60">
                  {filteredDoctors.length > 0 ? (
                    filteredDoctors.map((doctor) => (
                      <SelectItem
                        className="cursor-pointer my-2 transition-all hover:bg-gray-100"
                        key={doctor.id}
                        value={doctor.id.toString()}
                      >
                        {doctor.nom} {doctor.prénom}
                        {doctor.ville && ` (${doctor.ville})`}
                      </SelectItem>
                    ))
                  ) : (
                    <div className="p-2 text-sm text-gray-500">
                      Aucun médecin trouvé
                    </div>
                  )}
                </SelectContent>
              </Select>
              {errors.medecinId && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.medecinId.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-bay-of-many-700 mb-1">
                Jockey
              </label>

              <div className="mb-2">
                <label className="block text-xs font-medium text-bay-of-many-500 mb-1">
                  Filtrer par ville
                </label>
                <Select
                  onValueChange={setJockeyCityFilter}
                  value={jockeyCityFilter}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Toutes les villes" />
                  </SelectTrigger>
                  <SelectContent className="bg-white max-h-60">
                    <SelectItem
                      value="all"
                      className="cursor-pointer my-2 transition-all hover:bg-gray-100"
                    >
                      Toutes les villes
                    </SelectItem>
                    {jockeyCities.map((city) => (
                      <SelectItem
                        className="cursor-pointer my-2 transition-all hover:bg-gray-100"
                        key={city}
                        value={city}
                      >
                        {city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <input
                type="text"
                placeholder="Rechercher un jockey..."
                className="w-full p-2 mb-2 border rounded-md text-sm"
                value={jockeySearch}
                onChange={(e) => setJockeySearch(e.target.value)}
              />

              <Select onValueChange={(val) => setValue("jockeyId", val)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Sélectionner un jockey" />
                </SelectTrigger>
                <SelectContent className="bg-white max-h-60">
                  {filteredJockeys.length > 0 ? (
                    filteredJockeys.map((jockey) => (
                      <SelectItem
                        className="cursor-pointer my-2 transition-all hover:bg-gray-100"
                        key={jockey.id}
                        value={jockey.id.toString()}
                      >
                        {jockey.nom} {jockey.prénom} ({jockey.sorecId})
                        {jockey.ville && ` (${jockey.ville})`}
                      </SelectItem>
                    ))
                  ) : (
                    <div className="p-2 text-sm text-gray-500">
                      Aucun jockey trouvé
                    </div>
                  )}
                </SelectContent>
              </Select>
              {errors.jockeyId && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.jockeyId.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-bay-of-many-700 mb-1">
                  Date et Heure
                </label>
                <div className="border border-bay-of-many-200 rounded-md p-2 bg-white">
                  <DateTimePicker
                    onChange={(val) => setValue("date", val)}
                    value={selectedDate}
                    format="dd/MM/yyyy HH:mm"
                    locale="fr-FR"
                    disableClock
                    className="w-full [&>div]:border-none h-fit"
                    clearIcon={null}
                    minDate={new Date()}
                  />
                </div>
                {errors.date && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.date.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-bay-of-many-700 mb-1">
                  Rendez-vous sélectionné
                </label>
                <div className="p-3 border border-bay-of-many-200 rounded-md bg-bay-of-many-50 text-bay-of-many-800  flex items-center h-fit">
                  {selectedDate ? (
                    <div>
                      <div className="font-medium">
                        {format(selectedDate, "EEEE dd MMMM yyyy", {
                          locale: fr,
                        })}
                      </div>
                      <div className="text-sm">
                        à {format(selectedDate, "HH:mm", { locale: fr })}
                      </div>
                    </div>
                  ) : (
                    "Aucune date sélectionnée"
                  )}
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-bay-of-many-600 text-white py-2.5 px-4 rounded-md hover:bg-bay-of-many-700 transition-colors mt-2"
            >
              Planifier le Rendez-vous
            </button>
          </div>
        </div>
      </form>

      <div className="md:flex md:gap-x-5">
        <div className="bg-white p-6 rounded-lg shadow border-red-500 grid place-items-center md:w-fit w-full mb-5 md:mb-0">
          <h1 className="text-xl font-bold my-2 text-bay-of-many-900">
            Rechercher RDV
          </h1>
          <CalendarT onDateSelect={setDateSelect} className="w-fit" />
        </div>

        <div className="bg-white p-6 rounded-lg shadow w-full">
          <h3 className="text-lg font-semibold text-bay-of-many-800 mb-4">
            Rendez-vous à venir
          </h3>
          {filteredAppointments.length > 0 ? (
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y w-full divide-gray-200">
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
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredAppointments.map((appointment, index) => (
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
                          Dr. {appointment.doctorLastName}{" "}
                          {appointment.doctorName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {appointment.statusRDV === STATUS_RDV.PLANIFIE && (
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              Plannifié
                            </span>
                          )}
                          {appointment.statusRDV ===
                            STATUS_RDV.PATIENT_ABSENT && (
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-500">
                              patient absent
                            </span>
                          )}
                          {appointment.statusRDV === STATUS_RDV.TERMINE && (
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-500">
                              Terminé
                            </span>
                          )}
                          {appointment.statusRDV === STATUS_RDV.ANNULE && (
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-500">
                              Annulé
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <p className="text-bay-of-many-600">Aucun rendez-vous planifié aujourd'hui</p>
          )}
        </div>
      </div>
    </div>
  );
}
