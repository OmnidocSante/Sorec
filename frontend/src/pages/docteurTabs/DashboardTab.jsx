import { usersAtom } from "@/main";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input"; // Make sure to install shadcn/ui input component
import instance from "@/auth/AxiosInstance";
import { isSameDate } from "@/utils/isSameDate";
import { STATUS_RDV } from "@/utils/enums";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { CalendarT } from "@/components/CalendarT";

export default function DashboardTab() {
  const [users, setUsers] = useAtom(usersAtom);
  const [date, setDate] = useState(() => new Date());


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

  const fetchAppointments = async () => {
    const response = await instance.get("/api/rdvs/doctor");

    setAppointments(response.data);
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <div>
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
          <h3 className="text-bay-of-many-600">Examens en Attente</h3>
          <p className="text-3xl font-bold text-bay-of-many-900">17</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-bay-of-many-600">Jockeys Aptes</h3>
          <p className="text-3xl font-bold text-bay-of-many-900">89</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-y-6 md:gap-x-6">
        <Card className="col-span-1 bg-white w-full">
          <CardHeader>
            <CardTitle className="text-bay-of-many-900">
              Calendrier des Jockeys
            </CardTitle>
          </CardHeader>
          <CardContent className={"grid place-items-center h-full"}>
            <CalendarT onDateSelect={setDate} className="w-fit" />
          </CardContent>
        </Card>

        <Card className="col-span-2 bg-white">
          <CardHeader>
            <div className="flex justify-between items-center w-full ">
              <CardTitle className="text-bay-of-many-900">
                Jockeys Assignés{" "}
                {date
                  ? date.toLocaleDateString("fr-FR", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : new Date().toLocaleDateString("fr-Fr", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent
            className={`${filteredAppointments.length > 0 && "p-0"}`}
          >
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
                          Statut
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-bay-of-many-700 uppercase tracking-wider"
                        >
                          Action
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
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 cursor-pointer  text-blue-500">
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
              <p className="text-bay-of-many-600">Aucun rendez-vous planifié</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
