import { motion } from "framer-motion";
import {
  LayoutDashboard,
  User,
  HeartPulse,
  Stethoscope,
  Pill,
  ClipboardList,
  ChevronRight,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

export default function PatientTab() {
  const { id } = useParams();
  const navigate = useNavigate();

  const patient = {
    firstName: "Jean",
    lastName: "Dupont",
    status: "Apte",
    dateNaissance: "27/12/2002",
    ville: "Casablanca",
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const statusColor = {
    Apte: "bg-green-100 text-green-800",
    Inapte: "bg-red-100 text-red-800",
    "En attente": "bg-amber-100 text-amber-800",
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-6 min-h-screen bg-bay-of-many-50"
    >
      <div className="w-full flex justify-end mb-8">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/medecin")}
          className="flex items-center gap-2 p-2 px-4 bg-gray-50 rounded-xl shadow-sm border border-bay-of-many-200 text-bay-of-many-600 hover:text-bay-of-many-800 transition-colors"
        >
          <LayoutDashboard className="w-5 h-5" />
          <span>Retour au tableau de bord</span>
        </motion.button>
      </div>

      <div className="flex flex-col md:flex-row gap-6 mb-8">
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.2 }}
          className="bg-white p-6 rounded-xl shadow-md border border-bay-of-many-100 flex-1"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-bay-of-many-100 p-3 rounded-full">
              <User className="w-6 h-6 text-bay-of-many-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-bay-of-many-900">
                {patient.firstName} {patient.lastName}
              </h1>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  statusColor[patient.status]
                }`}
              >
                {patient.status}
              </span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-bay-of-many-50 p-4 rounded-lg">
              <p className="text-sm text-bay-of-many-600">Date de naissance</p>
              <p className="font-medium">{patient.dateNaissance}</p>
            </div>
            <div className="bg-bay-of-many-50 p-4 rounded-lg">
              <p className="text-sm text-bay-of-many-600">Ville</p>
              <p className="font-medium">{patient.ville}</p>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial="hidden"
        animate="visible"
        transition={{ staggerChildren: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        <motion.div
          variants={cardVariants}
          whileHover={{ y: -5 }}
          onClick={() => navigate(`/medecin/patient/${id}/antecedent_personel`)}
          className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl shadow-sm border border-blue-200 cursor-pointer transition-all hover:shadow-md"
        >
          <div className="flex justify-between items-start mb-4">
            <HeartPulse className="w-8 h-8 text-blue-600" />
            <ChevronRight className="w-5 h-5 text-blue-400" />
          </div>
          <h3 className="text-lg font-semibold text-blue-800 mb-1">
            Antecedent personnel
          </h3>
          <p className="text-sm text-blue-600">
            Antecedent personnel du patient
          </p>
        </motion.div>

        <motion.div
          variants={cardVariants}
          whileHover={{ y: -5 }}
          onClick={() =>
            navigate(`/medecin/patient/${id}/antecedent_familiaux`)
          }
          className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl shadow-sm border border-purple-200 cursor-pointer transition-all hover:shadow-md"
        >
          <div className="flex justify-between items-start mb-4">
            <ClipboardList className="w-8 h-8 text-purple-600" />
            <ChevronRight className="w-5 h-5 text-purple-400" />
          </div>
          <h3 className="text-lg font-semibold text-purple-800 mb-1">
            Antecedant familaux
          </h3>
          <p className="text-sm text-purple-600">Historique familial médical</p>
        </motion.div>

        <motion.div
          variants={cardVariants}
          whileHover={{ y: -5 }}
          onClick={() =>
            navigate(`/medecin/patient/${id}/antecedent_familiaux/examens`)
          }
          className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl shadow-sm border border-green-200 cursor-pointer transition-all hover:shadow-md"
        >
          <div className="flex justify-between items-start mb-4">
            <Stethoscope className="w-8 h-8 text-green-600" />
            <ChevronRight className="w-5 h-5 text-green-400" />
          </div>
          <h3 className="text-lg font-semibold text-green-800 mb-1">Examens</h3>
          <p className="text-sm text-green-600">Résultats des examens</p>
        </motion.div>

        <motion.div
          variants={cardVariants}
          whileHover={{ y: -5 }}
          onClick={() =>
            navigate(`/medecin/patient/${id}/antecedent_familiaux/medications`)
          }
          className="bg-gradient-to-br from-amber-50 to-amber-100 p-6 rounded-xl shadow-sm border border-amber-200 cursor-pointer transition-all hover:shadow-md"
        >
          <div className="flex justify-between items-start mb-4">
            <Pill className="w-8 h-8 text-amber-600" />
            <ChevronRight className="w-5 h-5 text-amber-400" />
          </div>
          <h3 className="text-lg font-semibold text-amber-800 mb-1">
            Médication
          </h3>
          <p className="text-sm text-amber-600">Traitements en cours</p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
