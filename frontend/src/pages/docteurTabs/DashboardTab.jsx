import { usersAtom } from "@/main";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import instance from "@/auth/AxiosInstance";
import { isSameDate } from "@/utils/isSameDate";
import { STATUS_RDV } from "@/utils/enums";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { CalendarT } from "@/components/CalendarT";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogOverlay,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function DashboardTab() {
  const [users, setUsers] = useAtom(usersAtom);
  const [date, setDate] = useState(() => new Date());
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);
  const [openStates, setOpenStates] = useState({});

  useEffect(() => {
    const fetchUsers = async () => {
      setUsers("REFRESH");
    };
    fetchUsers();
  }, [setUsers]);

  const [appointments, setAppointments] = useState([]);

  const filteredAppointments = appointments.filter((appointment) => {
    const appointmentDate = new Date(appointment.dateTime);

    if (appointmentDate && date) {
      return isSameDate(appointmentDate, date);
    } else {
      return appointments;
    }
  });

  const handleStatusUpdate = async (appointmentId, newStatus) => {
    await instance.patch(`/api/rdvs/${appointmentId}`, { status: newStatus });
    fetchAppointments();
    setOpenStates({});
  };

  const fetchAppointments = async () => {
    const response = await instance.get("/api/rdvs/doctor");

    setAppointments(response.data);
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <h1 className="text-2xl font-bold text-bay-of-many-900 mb-6">
        Tableau de Bord
      </h1>
      <div className=" space-y-4 md:space-y-0 md:grid grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-bay-of-many-600">Utilisateurs Totaux</h3>
          <p className="text-3xl font-bold text-bay-of-many-900">
            {users.length}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-bay-of-many-600">Médecins Actifs</h3>
          <p className="text-3xl font-bold text-bay-of-many-900">23</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-bay-of-many-600">Examens Plannifié</h3>
          <p className="text-3xl font-bold text-bay-of-many-900">17</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-bay-of-many-600">Jockeys Actifs</h3>
          <p className="text-3xl font-bold text-bay-of-many-900">89</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-y-6 md:gap-x-6">
        <Card className="col-span-1 bg-white w-full h-fit">
          <CardHeader>
            <CardTitle className="text-bay-of-many-900">
              Calendrier des Jockeys
            </CardTitle>
          </CardHeader>
          <CardContent className={"grid place-items-center h-fit"}>
            <CalendarT onDateSelect={setDate} className="w-fit" />
          </CardContent>
        </Card>

        <div className="bg-white p-6 col-span-2 rounded-lg shadow w-full">
          <h3 className="text-lg font-semibold text-bay-of-many-800 mb-4">
            Rendez-vous à venir
          </h3>
          {filteredAppointments.length > 0 ? (
            <div className="bg-white col-span-2 p-6 rounded-lg shadow">
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
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredAppointments.map((appointment, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {format(new Date(appointment.dateTime), "PPPp", {
                            locale: fr,
                          })}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {appointment.userName.toUpperCase()}{" "}
                          {appointment.userLastName}
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap">
                          <Dialog
                            key={appointment.id}
                            open={openStates[appointment.id] || false}
                            onOpenChange={(open) =>
                              setOpenStates((prev) => ({
                                ...prev,
                                [appointment.id]: open,
                              }))
                            }
                          >
                            <DialogTrigger
                              onClick={() => {
                                setSelectedAppointmentId(appointment.id);
                                setSelectedStatus(appointment.statusRDV);
                              }}
                              asChild
                            >
                              <button
                                className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                                  appointment.statusRDV === STATUS_RDV.PLANIFIE
                                    ? "bg-green-100 text-green-800 hover:bg-green-200"
                                    : appointment.statusRDV ===
                                      STATUS_RDV.PATIENT_ABSENT
                                    ? "bg-red-100 text-red-600 hover:bg-red-200"
                                    : appointment.statusRDV ===
                                      STATUS_RDV.TERMINE
                                    ? "bg-green-100 text-green-600 hover:bg-green-200"
                                    : appointment.statusRDV ===
                                      STATUS_RDV.ANNULE
                                    ? "bg-red-100 text-red-600 hover:bg-red-200"
                                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                }`}
                              >
                                {appointment.statusRDV === STATUS_RDV.PLANIFIE
                                  ? "Plannifié"
                                  : appointment.statusRDV ===
                                    STATUS_RDV.PATIENT_ABSENT
                                  ? "Patient absent"
                                  : appointment.statusRDV === STATUS_RDV.TERMINE
                                  ? "Terminé"
                                  : appointment.statusRDV === STATUS_RDV.ANNULE
                                  ? "Annulé"
                                  : "Inconnu"}
                              </button>
                            </DialogTrigger>
                            <DialogContent className="bg-white rounded-lg shadow-lg border border-gray-200 max-w-md">
                              <DialogTitle className="text-lg font-semibold text-bay-of-many-900 pb-3 border-b border-gray-200">
                                Changer le statut
                              </DialogTitle>
                              <div className="py-4">
                                <p className="text-gray-600 mb-4">
                                  Pour {appointment.userName.toUpperCase()}{" "}
                                  {appointment.userLastName}
                                </p>

                                <div className="grid grid-cols-2 gap-3">
                                  <button
                                    onClick={() =>
                                      setSelectedStatus(STATUS_RDV.PLANIFIE)
                                    }
                                    className={`p-3 rounded-lg border text-left transition-colors ${
                                      selectedStatus === STATUS_RDV.PLANIFIE
                                        ? "border-green-500 bg-green-50"
                                        : "border-gray-200 hover:bg-gray-50"
                                    }`}
                                  >
                                    <div className="flex items-center space-x-2">
                                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                      <span className="text-sm font-medium">
                                        Plannifié
                                      </span>
                                    </div>
                                  </button>

                                  <button
                                    onClick={() =>
                                      setSelectedStatus(STATUS_RDV.TERMINE)
                                    }
                                    className={`p-3 rounded-lg border text-left transition-colors ${
                                      selectedStatus === STATUS_RDV.TERMINE
                                        ? "border-green-500 bg-green-50"
                                        : "border-gray-200 hover:bg-gray-50"
                                    }`}
                                  >
                                    <div className="flex items-center space-x-2">
                                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                      <span className="text-sm font-medium">
                                        Terminé
                                      </span>
                                    </div>
                                  </button>

                                  <button
                                    onClick={() =>
                                      setSelectedStatus(STATUS_RDV.ANNULE)
                                    }
                                    className={`p-3 rounded-lg border text-left transition-colors ${
                                      selectedStatus === STATUS_RDV.ANNULE
                                        ? "border-red-500 bg-red-50"
                                        : "border-gray-200 hover:bg-gray-50"
                                    }`}
                                  >
                                    <div className="flex items-center space-x-2">
                                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                      <span className="text-sm font-medium">
                                        Annulé
                                      </span>
                                    </div>
                                  </button>

                                  <button
                                    onClick={() =>
                                      setSelectedStatus(
                                        STATUS_RDV.PATIENT_ABSENT
                                      )
                                    }
                                    className={`p-3 rounded-lg border text-left transition-colors ${
                                      selectedStatus ===
                                      STATUS_RDV.PATIENT_ABSENT
                                        ? "border-red-500 bg-red-50"
                                        : "border-gray-200 hover:bg-gray-50"
                                    }`}
                                  >
                                    <div className="flex items-center space-x-2">
                                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                      <span className="text-sm font-medium">
                                        Patient absent
                                      </span>
                                    </div>
                                  </button>
                                </div>
                              </div>
                              <DialogFooter className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                                <button
                                  onClick={() => {
                                    setOpenStates((prev) => ({
                                      ...prev,
                                      [appointment.id]: false,
                                    }));
                                  }}
                                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-bay-of-many-500"
                                >
                                  Annuler
                                </button>
                                <button
                                  onClick={() =>
                                    handleStatusUpdate(
                                      selectedAppointmentId,
                                      selectedStatus
                                    )
                                  }
                                  disabled={!selectedStatus}
                                  className="px-4 py-2 text-sm font-medium text-white bg-bay-of-many-600 rounded-md hover:bg-bay-of-many-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-bay-of-many-500 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                  Confirmer
                                </button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            onClick={() =>
                              navigate(
                                `/medecin/jockey/${appointment.jockeyId}`
                              )
                            }
                            className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 cursor-pointer  text-blue-500"
                          >
                            Voir dossier
                          </span>
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
    </motion.div>
  );
}
