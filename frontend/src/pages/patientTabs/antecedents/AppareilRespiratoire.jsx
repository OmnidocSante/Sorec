import instance from "@/auth/AxiosInstance";
import { motion } from "framer-motion";
import { ArrowLeft, Edit, Save } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Ban, HistoryIcon, History } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import useUser from "@/auth/useUser";

export default function AppareilRespiratoire() {
  const user = useUser();

  const [isEditMode, setIsEditMode] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const fetchData = async (url) => {
    try {
      const response = await instance.get(url);
      setConditions(response.data);
    } catch (error) {
      navigate("/unauthorized");
    }
  };
  useEffect(() => {
    fetchData(`/api/jockey/${id}/antecedent-personnel/appareil-respiratoire`);
  }, [id]);

  const [conditions, setConditions] = useState(null);

  const handleToggle = (conditionId, value) => {
    setConditions(
      conditions.map((cond) =>
        cond.id === conditionId ? { ...cond, hasCondition: value } : cond
      )
    );
  };

  const handleRemarksChange = (conditionId, value) => {
    setConditions(
      conditions.map((cond) =>
        cond.id === conditionId ? { ...cond, remarques: value } : cond
      )
    );
  };

  const handleSave = async () => {
    await Promise.all([
      await instance.put(`/api/jockey/${id}/antecedent-personnel`, conditions),
      fetchData(`/api/jockey/${id}/antecedent-personnel/appareil-respiratoire`),
    ]);

    setIsEditMode(false);
  };
  const [historique, setHistorique] = useState([]);
  const [showHistorique, setShowHistorique] = useState(false);
  const handleHistoriqueClick = async () => {
    if (isHistory) {
      fetchData(`/api/jockey/${id}/antecedent-personnel/appareil-respiratoire`);
      setIsHistory(false);
      setShowHistorique(!showHistorique);
    } else {
      if (historique.length === 0) {
        const response = await instance.get(`/api/jockey/${id}/historique`);

        setHistorique(response.data);
      }
      setShowHistorique(!showHistorique);
    }
  };

  const [isHistory, setIsHistory] = useState(false);

  const fetchItem = async (dossierid) => {
    fetchData(
      `/api/jockey/${id}/antecedent-personnel/appareil-respiratoire/historique/${dossierid}`
    );
    setIsHistory(true);
    setIsEditMode(false);
  };

  if (!conditions) {
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
            Chargement des informations
          </p>
        </motion.div>
      </motion.div>
    );
  } else {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="p-6 min-h-screen bg-gradient-to-b from-blue-50 to-indigo-50"
      >
        <AnimatePresence>
          {isHistory && (
            <motion.div
              className="w-full max-w-md fixed top-20 left-1/2 -translate-x-1/2 z-50"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20, transition: { duration: 0.2 } }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Alert
                variant="default"
                className="bg-white/95 backdrop-blur-sm border border-blue-100 shadow-lg"
              >
                <HistoryIcon className="size-5 text-blue-600 shrink-0" />
                <AlertTitle className="text-sm font-semibold text-blue-800 mb-1">
                  Historique Mode Active
                </AlertTitle>
                <AlertDescription className="text-sm text-blue-700 leading-snug">
                  <div>
                    Consultation seule - Les modifications sont désactivées dans
                    ce mode{"              "}
                    <span
                      onClick={handleHistoriqueClick}
                      className="text-red-500 cursor-pointer "
                    >
                      restaurer
                    </span>
                  </div>
                </AlertDescription>
              </Alert>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Header Section */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft className="h-6 w-6 text-gray-700" />
          </button>
          <h1 className="text-2xl font-bold text-gray-800">
            Appareil Respiratoire
          </h1>
          {user.role === "MEDECIN" && (
            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleHistoriqueClick}
                className={`p-2 pl-4 rounded-lg flex items-center gap-2 transition-all ${
                  isEditMode
                    ? "bg-gray-200 cursor-not-allowed"
                    : "hover:bg-blue-50 hover:-translate-y-0.5"
                }`}
                disabled={isEditMode}
              >
                <History className="h-6 w-6 text-gray-600" />
                <span className="text-sm font-medium text-gray-800">
                  {showHistorique ? "Cacher l'historique" : "Voir historique"}
                </span>
              </button>

              {isEditMode ? (
                <button
                  type="button"
                  onClick={() => setIsEditMode(false)}
                  className={`p-2 pl-4 ${
                    isHistory && "cursor-not-allowed"
                  } rounded-lg flex items-center gap-2 transition-all ${
                    isEditMode ? " " : "hover:bg-blue-50 hover:-translate-y-0.5"
                  }`}
                  disabled={isHistory}
                >
                  <Ban className="h-6 w-6 text-red-600" />
                  <span className="text-sm font-medium text-red-800">
                    Annuler
                  </span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsEditMode(true)}
                  className={`p-2 pl-4 ${
                    isHistory && "cursor-not-allowed"
                  } rounded-lg flex items-center gap-2 transition-all ${
                    isEditMode ? "" : "hover:bg-blue-50 hover:-translate-y-0.5"
                  }`}
                  disabled={isEditMode || isHistory}
                >
                  <Edit className="h-6 w-6 text-blue-600" />
                  <span className="text-sm font-medium text-blue-800">
                    Modifier
                  </span>
                </button>
              )}

              <button
                onClick={handleSave}
                className={`p-2 pl-4 rounded-lg flex items-center gap-2 transition-all ${
                  !isEditMode && isHistory
                    ? "bg-gray-200 cursor-not-allowed"
                    : "hover:bg-green-50 hover:-translate-y-0.5"
                } `}
                disabled={!isEditMode || isHistory}
              >
                <Save className="h-6 w-6 text-green-600" />
                <span className="text-sm font-medium text-green-800">
                  Enregistrer
                </span>
              </button>
            </div>
          )}
        </div>
        {showHistorique && (
          <div className="my-4 space-y-2">
            {historique.map((item) => (
              <div
                key={item.id}
                onClick={() => fetchItem(item.id)}
                className="p-3 bg-gray-50 rounded-lg cursor-pointer"
              >
                <p className="text-sm font-medium">
                  <span className="mr-2">rdv date:</span>

                  {new Date(item.date).toLocaleString("en-US", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                    hour12: false,
                  })}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Conditions Container */}
        <div className="space-y-6">
          {conditions.map((condition) => (
            <div
              key={condition.id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 transition-all hover:shadow-md"
            >
              {/* Condition Header */}
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-800">
                  {condition.name}
                </h2>

                {/* Toggle Buttons */}
                <div className="flex gap-2">
                  <button
                    disabled={!isEditMode}
                    onClick={() => handleToggle(condition.id, true)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      condition.hasCondition === true
                        ? "bg-green-500 text-white shadow-inner"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    } ${!isEditMode ? "opacity-50 cursor-not-allowed" : ""}`}
                  >
                    Oui
                  </button>
                  <button
                    disabled={!isEditMode}
                    onClick={() => handleToggle(condition.id, false)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      condition.hasCondition === false
                        ? "bg-red-500 text-white shadow-inner"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    } ${!isEditMode ? "opacity-50 cursor-not-allowed" : ""}`}
                  >
                    Non
                  </button>
                </div>
              </div>

              {/* Remarks Input */}
              <input
                value={condition.remarques}
                onChange={(e) =>
                  handleRemarksChange(condition.id, e.target.value)
                }
                placeholder="Remarques..."
                disabled={!isEditMode}
                rows={3}
                className={`w-full px-4 py-3 border ${
                  isEditMode ? "border-blue-200" : "border-gray-200"
                } rounded-lg focus:outline-none focus:ring-2 ${
                  isEditMode ? "focus:ring-blue-300" : "focus:ring-gray-300"
                } transition-all resize-none ${
                  !isEditMode ? "bg-gray-50 cursor-not-allowed" : ""
                }`}
              />
            </div>
          ))}
        </div>
      </motion.div>
    );
  }
}
