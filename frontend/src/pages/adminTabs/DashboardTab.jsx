import { usersAtom } from "@/main";
import { useAtom } from "jotai";
import { useEffect } from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import { Users, Stethoscope, Clock, CheckCircle } from 'lucide-react';

// Register Chart.js components
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

  useEffect(() => {
    const fetchUsers = async () => {
      setUsers("REFRESH");
    };
    fetchUsers();
  }, [setUsers]);

  const jockeyAptitudeData = {
    labels: ['Jockeys Aptes', 'Jockeys Non Aptes'],
    datasets: [
      {
        data: [89, 11],
        backgroundColor: ['#34D399', '#EF4444'], 
        borderColor: ['#10B981', '#DC2626'],
        borderWidth: 1,
      },
    ],
  };

  const monthlyExaminationsData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Examens Effectués',
        data: [30, 45, 38, 55, 48, 62], // Mock data for monthly examinations
        backgroundColor: 'rgba(99, 102, 241, 0.6)', // Indigo for bars
        borderColor: 'rgba(99, 102, 241, 1)',
        borderWidth: 1,
      },
    ],
  };


  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false, // Allows charts to fill their container
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            family: 'Inter',
          },
        },
      },
      title: {
        display: true,
        font: {
          size: 16,
          family: 'Inter',
        },
        padding: {
          top: 10,
          bottom: 10,
        },
      },
      tooltip: {
        bodyFont: {
          family: 'Inter',
        },
        titleFont: {
          family: 'Inter',
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-xl shadow-lg text-white flex items-center justify-between transform transition-transform hover:scale-105">
          <div>
            <h3 className="text-lg font-semibold opacity-90">Utilisateurs Totaux</h3>
            <p className="text-4xl font-bold mt-2">{users.length}</p>
          </div>
          <Users size={48} className="opacity-70" />
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 p-6 rounded-xl shadow-lg text-white flex items-center justify-between transform transition-transform hover:scale-105">
          <div>
            <h3 className="text-lg font-semibold opacity-90">Médecins Actifs</h3>
            <p className="text-4xl font-bold mt-2">23</p>
          </div>
          <Stethoscope size={48} className="opacity-70" />
        </div>

        <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 p-6 rounded-xl shadow-lg text-white flex items-center justify-between transform transition-transform hover:scale-105">
          <div>
            <h3 className="text-lg font-semibold opacity-90">Examens en Attente</h3>
            <p className="text-4xl font-bold mt-2">17</p>
          </div>
          <Clock size={48} className="opacity-70" />
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-6 rounded-xl shadow-lg text-white flex items-center justify-between transform transition-transform hover:scale-105">
          <div>
            <h3 className="text-lg font-semibold opacity-90">Jockeys Aptes</h3>
            <p className="text-4xl font-bold mt-2">89</p>
          </div>
          <CheckCircle size={48} className="opacity-70" />
        </div>
      </div>

      {/* Chart Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-lg col-span-1 lg:col-span-2">
          <h2 className="text-xl font-bold text-gray-700 mb-4">Examens Mensuels</h2>
          <div className="h-80"> {/* Fixed height for responsiveness */}
            <Bar data={monthlyExaminationsData} options={{ ...chartOptions, title: { ...chartOptions.title, text: 'Nombre d\'examens effectués par mois' } }} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg col-span-1">
          <h2 className="text-xl font-bold text-gray-700 mb-4">Aptitude des Jockeys</h2>
          <div className="h-80"> {/* Fixed height for responsiveness */}
            <Doughnut data={jockeyAptitudeData} options={{ ...chartOptions, title: { ...chartOptions.title, text: 'Répartition des jockeys par aptitude' } }} />
          </div>
        </div>

      </div>
    </div>
  );
}
