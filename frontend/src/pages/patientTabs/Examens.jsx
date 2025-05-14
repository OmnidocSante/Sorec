import instance from "@/auth/AxiosInstance";
import { format, parseISO } from "date-fns";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  User,
  HeartPulse,
  Stethoscope,
  Pill,
  ClipboardList,
  ChevronRight,
  Heart,
  Eye,
  Ear,
  Bone,
  Brain,
  Package,
  PillBottle,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function Examens() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [jockey, setJockey] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await instance.get(`/api/jockey/${id}`);
        setJockey(response.data);
      } catch (error) {
        navigate("/unauthorized");
      }
    };
    fetchData();
  }, [id]);
  console.log(jockey);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const statusColor = {
    APTE: "bg-green-100 text-green-800",
    NON_APTE: "bg-red-100 text-red-800",
    EN_ATTENTE_DE_REEVALUATION: "bg-amber-100 text-amber-800",
    EXAMEN_ANNUEL_A_PREVOIR: "bg-blue-100 text-blue-800",
  };
  if (!jockey) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen flex items-center justify-center bg-bay-of-many-50"
      >
        <motion.div
          className="flex flex-col items-center space-y-4 p-6 bg-white border border-bay-of-many-200 rounded-xl shadow-md"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        >
          <motion.div
            className="w-12 h-12 border-4 border-bay-of-many-400 border-t-transparent rounded-full animate-spin"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          />
          <p className="text-bay-of-many-700 font-medium text-sm tracking-wide">
            Chargement du profil du jockey...
          </p>
        </motion.div>
      </motion.div>
    );
  } else {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="p-6 min-h-screen bg-bay-of-many-50"
      >
        <div className="w-full flex justify-between mb-8">
          <motion.div
            onClick={() => navigate(-1)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 p-2 px-4 bg-gray-50 rounded-xl shadow-sm border border-bay-of-many-200 text-bay-of-many-600 hover:text-bay-of-many-800 transition-colors cursor-pointer"
          >
            <div className="bg-bay-of-many-100 p-3 rounded-full">
              <User className="w-6 h-6 text-bay-of-many-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-bay-of-many-900">
                {jockey.nom} {jockey.prénom}
              </h1>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  statusColor[jockey.status]
                }`}
              >
                {jockey.status}
              </span>
            </div>
          </motion.div>
          <div className="align-middle justify-self-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 p-2 px-4 bg-gray-50 rounded-xl shadow-sm border border-bay-of-many-200 text-bay-of-many-600 hover:text-bay-of-many-800 transition-colors h-fit"
            >
              <LayoutDashboard className="w-5 h-5" />
              <span>Retour au tableau de bord</span>
            </motion.button>
          </div>
        </div>

        <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <motion.div
            variants={cardVariants}
            whileHover={{ y: -5 }}
            onClick={() =>
              navigate(`/medecin/jockey/${id}/examens/cardiovasculaire`)
            }
            className="bg-gradient-to-br from-red-50 to-red-100 p-6 rounded-xl shadow-sm border border-red-200 cursor-pointer transition-all hover:shadow-md"
          >
            <div className="flex justify-between items-start mb-4">
              <Heart className="w-8 h-8 text-red-600" />
              <ChevronRight className="w-5 h-5 text-red-400" />
            </div>
            <h3 className="text-lg font-semibold text-red-800 mb-1">
              Examen Cardio-vasculaire
            </h3>
            <p className="text-sm text-red-600">
              Examen du système cardiovasculaire
            </p>
          </motion.div>

          <motion.div
            variants={cardVariants}
            whileHover={{ y: -5 }}
            onClick={() =>
              navigate(`/medecin/jockey/${id}/examens/pleuropulmonaire`)
            }
            className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl shadow-sm border border-blue-200 cursor-pointer transition-all hover:shadow-md"
          >
            <div className="flex justify-between items-start mb-4">
              <Stethoscope className="w-8 h-8 text-blue-600" />
              <ChevronRight className="w-5 h-5 text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold text-blue-800 mb-1">
              Examen Pleuro-pulmonaire
            </h3>
            <p className="text-sm text-blue-600">
              Examen des poumons et de la plèvre
            </p>
          </motion.div>

          <motion.div
            variants={cardVariants}
            whileHover={{ y: -5 }}
            onClick={() =>
              navigate(`/medecin/jockey/${id}/examens/ophtalmologique`)
            }
            className="bg-gradient-to-br from-indigo-50 to-indigo-100 p-6 rounded-xl shadow-sm border border-indigo-200 cursor-pointer transition-all hover:shadow-md"
          >
            <div className="flex justify-between items-start mb-4">
              <Eye className="w-8 h-8 text-indigo-600" />
              <ChevronRight className="w-5 h-5 text-indigo-400" />
            </div>
            <h3 className="text-lg font-semibold text-indigo-800 mb-1">
              Examen Ophtalmologique
            </h3>
            <p className="text-sm text-indigo-600">
              Examen de la vue et des yeux
            </p>
          </motion.div>

          <motion.div
            variants={cardVariants}
            whileHover={{ y: -5 }}
            onClick={() => navigate(`/medecin/jockey/${id}/examens/auditif`)}
            className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl shadow-sm border border-purple-200 cursor-pointer transition-all hover:shadow-md"
          >
            <div className="flex justify-between items-start mb-4">
              <Ear className="w-8 h-8 text-purple-600" />
              <ChevronRight className="w-5 h-5 text-purple-400" />
            </div>
            <h3 className="text-lg font-semibold text-purple-800 mb-1">
              Examen Auditif
            </h3>
            <p className="text-sm text-purple-600">
              Examen de l'audition et des oreilles
            </p>
          </motion.div>

          <motion.div
            variants={cardVariants}
            whileHover={{ y: -5 }}
            onClick={() => navigate(`/medecin/jockey/${id}/examens/locomoteur`)}
            className="bg-gradient-to-br from-amber-50 to-amber-100 p-6 rounded-xl shadow-sm border border-amber-200 cursor-pointer transition-all hover:shadow-md"
          >
            <div className="flex justify-between items-start mb-4">
              <Bone className="w-8 h-8 text-amber-600" />
              <ChevronRight className="w-5 h-5 text-amber-400" />
            </div>
            <h3 className="text-lg font-semibold text-amber-800 mb-1">
              Examen Locomoteur
            </h3>
            <p className="text-sm text-amber-600">
              Examen du système musculo-squelettique
            </p>
          </motion.div>

          <motion.div
            variants={cardVariants}
            whileHover={{ y: -5 }}
            onClick={() =>
              navigate(`/medecin/jockey/${id}/examens/neurologique`)
            }
            className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl shadow-sm border border-green-200 cursor-pointer transition-all hover:shadow-md"
          >
            <div className="flex justify-between items-start mb-4">
              <Brain className="w-8 h-8 text-green-600" />
              <ChevronRight className="w-5 h-5 text-green-400" />
            </div>
            <h3 className="text-lg font-semibold text-green-800 mb-1">
              Examen Neurologique
            </h3>
            <p className="text-sm text-green-600">Examen du système nerveux</p>
          </motion.div>

          <motion.div
            variants={cardVariants}
            whileHover={{ y: -5 }}
            onClick={() => navigate(`/medecin/jockey/${id}/examens/abdominal`)}
            className="bg-gradient-to-br from-emerald-50 to-emerald-100 p-6 rounded-xl shadow-sm border border-emerald-200 cursor-pointer transition-all hover:shadow-md"
          >
            <div className="flex justify-between items-start mb-4">
              <Package className="w-8 h-8 text-emerald-600" />
              <ChevronRight className="w-5 h-5 text-emerald-400" />
            </div>
            <h3 className="text-lg font-semibold text-emerald-800 mb-1">
              Examen Abdominal
            </h3>
            <p className="text-sm text-emerald-600">
              Examen des organes abdominaux
            </p>
          </motion.div>

          <motion.div
            variants={cardVariants}
            whileHover={{ y: -5 }}
            onClick={() =>
              navigate(`/medecin/jockey/${id}/examens/genito-urinaire`)
            }
            className="bg-gradient-to-br from-pink-50 to-pink-100 p-6 rounded-xl shadow-sm border border-pink-200 cursor-pointer transition-all hover:shadow-md"
          >
            <div className="flex justify-between items-start mb-4">
              <PillBottle className="w-8 h-8 text-pink-600" />
              <ChevronRight className="w-5 h-5 text-pink-400" />
            </div>
            <h3 className="text-lg font-semibold text-pink-800 mb-1">
              Examen Génito-urinaire
            </h3>
            <p className="text-sm text-pink-600">
              Examen du système génital et urinaire
            </p>
          </motion.div>
          <motion.div
            variants={cardVariants}
            whileHover={{ y: -5 }}
            onClick={() => navigate(`/medecin/jockey/${id}/examens/ecg-repos`)}
            className="bg-gradient-to-br from-cyan-50 to-cyan-100 p-6 rounded-xl shadow-sm border border-cyan-200 cursor-pointer transition-all hover:shadow-md"
          >
            <div className="flex justify-between items-start mb-4">
              <HeartPulse className="w-8 h-8 text-cyan-600" />
              <ChevronRight className="w-5 h-5 text-cyan-400" />
            </div>
            <h3 className="text-lg font-semibold text-cyan-800 mb-1">
              Electrocardiogramme au repos
            </h3>
            <p className="text-sm text-cyan-600">
              Examen cardiographique en état de repos
            </p>
          </motion.div>

          <motion.div
            variants={cardVariants}
            whileHover={{ y: -5 }}
            onClick={() => navigate(`/medecin/jockey/${id}/examens/ecg-effort`)}
            className="bg-gradient-to-br from-teal-50 to-teal-100 p-6 rounded-xl shadow-sm border border-teal-200 cursor-pointer transition-all hover:shadow-md"
          >
            <div className="flex justify-between items-start mb-4">
              <HeartPulse className="w-8 h-8 text-teal-600" />
              <ChevronRight className="w-5 h-5 text-teal-400" />
            </div>
            <h3 className="text-lg font-semibold text-teal-800 mb-1">
              Electrocardiogramme à l'effort
            </h3>
            <p className="text-sm text-teal-600">
              Examen cardiographique pendant l'activité physique
            </p>
          </motion.div>

          <motion.div
            variants={cardVariants}
            whileHover={{ y: -5 }}
            onClick={() =>
              navigate(`/medecin/jockey/${id}/examens/autres-paracliniques`)
            }
            className="bg-gradient-to-br from-slate-50 to-slate-100 p-6 rounded-xl shadow-sm border border-slate-200 cursor-pointer transition-all hover:shadow-md"
          >
            <div className="flex justify-between items-start mb-4">
              <ClipboardList className="w-8 h-8 text-slate-600" />
              <ChevronRight className="w-5 h-5 text-slate-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-800 mb-1">
              Autres examens paracliniques
            </h3>
            <p className="text-sm text-slate-600">
              Examens complémentaires supplémentaires
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    );
  }
}
