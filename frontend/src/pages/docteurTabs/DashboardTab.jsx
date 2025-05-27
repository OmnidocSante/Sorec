import { usersAtom } from "@/main";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line, Bar, Doughnut } from "react-chartjs-2";
import { Users, Stethoscope, Clock, CheckCircle } from "lucide-react";
import instance from "@/auth/AxiosInstance";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export default function DashboardTab() {
  const [users, setUsers] = useAtom(usersAtom);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const fetchAppointments = async () => {
        const response = await instance.get("/api/rdvs/doctor");
        console.log(response.data);
        setAppointments(response.data);
      };

      const fetchUsers = async () => {
        setUsers("REFRESH");
      };

      await Promise.all([fetchUsers(), fetchAppointments()]);
    };

    fetchData();
  }, [setUsers]);

  const doctors = users.filter((user) => user.role === "MEDECIN");
  const monthlyLabels = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const monthlyCounts = Array(12).fill(0);
  appointments.forEach((appointment) => {
    if (["PLANIFIE", "TERMINE"].includes(appointment.statusRDV)) {
      const date = new Date(appointment.dateTime);
      const monthIndex = date.getMonth(); 
      monthlyCounts[monthIndex]++;
    }
  });

  const monthlyExaminationsData = {
    labels: monthlyLabels,
    datasets: [
      {
        label: "Examens Effectués",
        data: monthlyCounts,
        backgroundColor: "rgba(99, 102, 241, 0.6)",
        borderColor: "rgba(99, 102, 241, 1)",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          font: {
            family: "Inter",
          },
        },
      },
      title: {
        display: true,
        font: {
          size: 16,
          family: "Inter",
        },
        padding: {
          top: 10,
          bottom: 10,
        },
      },
      tooltip: {
        bodyFont: {
          family: "Inter",
        },
        titleFont: {
          family: "Inter",
        },
      },
    },
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen font-inter">
      <h1 className="text-3xl font-extrabold text-gray-800 mb-8 pb-4 border-b-2 border-gray-200">
        Tableau de Bord Médical
      </h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-xl shadow-lg text-white flex items-center justify-between transform transition-transform hover:scale-105">
          <div>
            <h3 className="text-lg font-semibold opacity-90">
              Utilisateurs Totaux
            </h3>
            <p className="text-4xl font-bold mt-2">{users.length}</p>
          </div>
          <Users size={48} className="opacity-70" />
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 p-6 rounded-xl shadow-lg text-white flex items-center justify-between transform transition-transform hover:scale-105">
          <div>
            <h3 className="text-lg font-semibold opacity-90">
              Médecins Actifs
            </h3>
            <p className="text-4xl font-bold mt-2">{doctors.length}</p>
          </div>
          <Stethoscope size={48} className="opacity-70" />
        </div>

        <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 p-6 rounded-xl shadow-lg text-white flex items-center justify-between transform transition-transform hover:scale-105">
          <div>
            <h3 className="text-lg font-semibold opacity-90">
              Examens en Attente
            </h3>
            <p className="text-4xl font-bold mt-2">
              {
                appointments?.filter(
                  (appointment) => appointment.statusRDV === "PLANIFIE"
                ).length
              }
            </p>
          </div>
          <Clock size={48} className="opacity-70" />
        </div>
      </div>

      <div className="w-full gap-6">
        <div className="bg-white p-6 rounded-xl w-full">
          <h2 className="text-xl font-bold text-gray-700 mb-4">
            Examens Mensuels
          </h2>
          <div className="h-80">
            <Bar
              data={monthlyExaminationsData}
              options={{
                ...chartOptions,
                title: {
                  ...chartOptions.title,
                  text: "Nombre d'examens effectués par mois",
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
