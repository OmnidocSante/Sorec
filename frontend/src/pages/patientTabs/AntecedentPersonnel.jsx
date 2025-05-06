import instance from "@/auth/AxiosInstance";
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

export default function AntecedentPersonnel() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [jockey, setJockey] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await instance.get(`/api/jockeys/${id}`);
      setJockey(response.data);
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
          {/* Appareil Cardio-vasculaire */}
          <motion.div
            variants={cardVariants}
            whileHover={{ y: -5 }}
            onClick={() =>
              navigate(`/medecin/jockey/${id}/antecedent_personel/appareil-cardiovasculaire`)
            }
            className="bg-gradient-to-br from-red-50 to-red-100 p-6 rounded-xl shadow-sm border border-red-200 cursor-pointer transition-all hover:shadow-md"
          >
            <div className="flex justify-between items-start mb-4">
              <Heart className="w-8 h-8 text-red-600" />
              <ChevronRight className="w-5 h-5 text-red-400" />
            </div>
            <h3 className="text-lg font-semibold text-red-800 mb-1">
              Antécédents Cardio-vasculaires
            </h3>
            <p className="text-sm text-red-600">
              Informations sur les antécédents cardiovasculaires
            </p>
          </motion.div>

          {/* Appareil respiratoire */}
          <motion.div
            variants={cardVariants}
            whileHover={{ y: -5 }}
            onClick={() =>
              navigate(`/medecin/jockey/${id}/antecedent_personel/appareil-respiratoire`)
            }
            className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl shadow-sm border border-blue-200 cursor-pointer transition-all hover:shadow-md"
          >
            <div className="flex justify-between items-start mb-4">
              <Stethoscope className="w-8 h-8 text-blue-600" />
              <ChevronRight className="w-5 h-5 text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold text-blue-800 mb-1">
              Antécédents Respiratoires
            </h3>
            <p className="text-sm text-blue-600">
              Informations sur l'appareil respiratoire
            </p>
          </motion.div>

          {/* Système nerveux */}
          <motion.div
            variants={cardVariants}
            whileHover={{ y: -5 }}
            onClick={() =>
              navigate(`/medecin/jockey/${id}/antecedent_personel/systeme-nerveux`)
            }
            className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl shadow-sm border border-green-200 cursor-pointer transition-all hover:shadow-md"
          >
            <div className="flex justify-between items-start mb-4">
              <Brain className="w-8 h-8 text-green-600" />
              <ChevronRight className="w-5 h-5 text-green-400" />
            </div>
            <h3 className="text-lg font-semibold text-green-800 mb-1">
              Antécédents Neurologiques
            </h3>
            <p className="text-sm text-green-600">
              Informations sur le système nerveux
            </p>
          </motion.div>

          {/* ORL */}
          <motion.div
            variants={cardVariants}
            whileHover={{ y: -5 }}
            onClick={() => navigate(`/medecin/jockey/${id}/antecedent_personel/orl`)}
            className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl shadow-sm border border-purple-200 cursor-pointer transition-all hover:shadow-md"
          >
            <div className="flex justify-between items-start mb-4">
              <Ear className="w-8 h-8 text-purple-600" />
              <ChevronRight className="w-5 h-5 text-purple-400" />
            </div>
            <h3 className="text-lg font-semibold text-purple-800 mb-1">
              Antécédents ORL
            </h3>
            <p className="text-sm text-purple-600">Oreilles, nez et gorge</p>
          </motion.div>

          {/* Allergies */}
          <motion.div
            variants={cardVariants}
            whileHover={{ y: -5 }}
            onClick={() =>
              navigate(`/medecin/jockey/${id}/antecedent_personel/allergies`)
            }
            className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-6 rounded-xl shadow-sm border border-yellow-200 cursor-pointer transition-all hover:shadow-md"
          >
            <div className="flex justify-between items-start mb-4">
              <PillBottle className="w-8 h-8 text-yellow-600" />
              <ChevronRight className="w-5 h-5 text-yellow-400" />
            </div>
            <h3 className="text-lg font-semibold text-yellow-800 mb-1">
              Antécédents Allergiques
            </h3>
            <p className="text-sm text-yellow-600">
              Réactions allergiques connues
            </p>
          </motion.div>

          {/* Traumatologie */}
          <motion.div
            variants={cardVariants}
            whileHover={{ y: -5 }}
            onClick={() =>
              navigate(`/medecin/jockey/${id}/antecedent_personel/traumatologie`)
            }
            className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-xl shadow-sm border border-orange-200 cursor-pointer transition-all hover:shadow-md"
          >
            <div className="flex justify-between items-start mb-4">
              <Bone className="w-8 h-8 text-orange-600" />
              <ChevronRight className="w-5 h-5 text-orange-400" />
            </div>
            <h3 className="text-lg font-semibold text-orange-800 mb-1">
              Antécédents Traumatiques
            </h3>
            <p className="text-sm text-orange-600">
              Blessures ou antécédents d'accidents
            </p>
          </motion.div>

          {/* Appareil digestif */}
          <motion.div
            variants={cardVariants}
            whileHover={{ y: -5 }}
            onClick={() =>
              navigate(`/medecin/jockey/${id}/antecedent_personel/appareil-digestif`)
            }
            className="bg-gradient-to-br from-pink-50 to-pink-100 p-6 rounded-xl shadow-sm border border-pink-200 cursor-pointer transition-all hover:shadow-md"
          >
            <div className="flex justify-between items-start mb-4">
              <ClipboardList className="w-8 h-8 text-pink-600" />
              <ChevronRight className="w-5 h-5 text-pink-400" />
            </div>
            <h3 className="text-lg font-semibold text-pink-800 mb-1">
              Antécédents Digestifs
            </h3>
            <p className="text-sm text-pink-600">Estomac, foie, intestins...</p>
          </motion.div>

          {/* Endocrinologie */}
          <motion.div
            variants={cardVariants}
            whileHover={{ y: -5 }}
            onClick={() =>
              navigate(`/medecin/jockey/${id}/antecedent_personel/endocrinologie`)
            }
            className="bg-gradient-to-br from-indigo-50 to-indigo-100 p-6 rounded-xl shadow-sm border border-indigo-200 cursor-pointer transition-all hover:shadow-md"
          >
            <div className="flex justify-between items-start mb-4">
              <Package className="w-8 h-8 text-indigo-600" />
              <ChevronRight className="w-5 h-5 text-indigo-400" />
            </div>
            <h3 className="text-lg font-semibold text-indigo-800 mb-1">
              Antécédents Endocriniens
            </h3>
            <p className="text-sm text-indigo-600">
              Thyroïde, diabète, hormones...
            </p>
          </motion.div>

          {/* Autres */}
          <motion.div
            variants={cardVariants}
            whileHover={{ y: -5 }}
            onClick={() => navigate(`/medecin/jockey/${id}/antecedent_personel/autres`)}
            className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-xl shadow-sm border border-gray-200 cursor-pointer transition-all hover:shadow-md"
          >
            <div className="flex justify-between items-start mb-4">
              <Pill className="w-8 h-8 text-gray-600" />
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-1">
              Autres Antécédents
            </h3>
            <p className="text-sm text-gray-600">
              Antécédents non listés ci-dessus
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    );
  }
}
