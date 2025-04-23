import { motion } from "framer-motion";
import {
  ArrowLeft,
  ClipboardList,
  Edit,
  Save,
  X,
  Check,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import instance from "@/auth/AxiosInstance";

export default function AntecedentPersonnel() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);
  const [expandedSystem, setExpandedSystem] = useState(null);
  const [systemData, setSystemData] = useState([]);

  const formatAntecedentPersonnels = (antecedentPersonnels) => {
    const systemsData = [];
    const systemsMap = new Map();

    antecedentPersonnels.forEach((item) => {
      const systemName = item.condition.systeme.nom;
      const systemId = item.condition.systeme.id;

      if (!systemsMap.has(systemId)) {
        systemsMap.set(systemId, {
          id: systemId,
          name: systemName,
          displayName: systemName
            .replace(/_/g, " ")
            .toLowerCase()
            .split(" ")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" "),
          conditions: [],
        });
        systemsData.push(systemsMap.get(systemId));
      }

      systemsMap.get(systemId).conditions.push({
        id: item.id,
        name: item.condition.nom,
        displayName: item.condition.nom
          .replace(/_/g, " ")
          .toLowerCase()
          .split(" ")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" "),
        hasCondition: item.hasCondition,
        remarques: item.remarques,
      });
    });

    return systemsData;
  };

  const revertFormattedAntecedentPersonnels = (systemsData) => {
    const antecedentPersonnels = [];

    systemsData.forEach((system) => {
      system.conditions.forEach((condition) => {
        antecedentPersonnels.push({
          id: condition.id,
          condition: {
            id: condition.id,
            nom: condition.name,
            systeme: {
              id: system.id,
              nom: system.name,
            },
          },
          hasCondition: condition.hasCondition,
          remarques: condition.remarques,
        });
      });
    });

    return antecedentPersonnels;
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await instance.get("/api/dossier_medicale/5");
      const formatted = formatAntecedentPersonnels(response.data);
      console.log(formatted);

      setSystemData(formatted);
    };
    fetchData();
  }, []);

  const toggleSystem = (systemId) => {
    setExpandedSystem(expandedSystem === systemId ? null : systemId);
  };

  const handleConditionChange = (systemId, conditionId, field, value) => {
    setSystemData((prevData) =>
      prevData.map((system) =>
        system.id === systemId
          ? {
              ...system,
              conditions: system.conditions.map((condition) =>
                condition.id === conditionId
                  ? { ...condition, [field]: value }
                  : condition
              ),
            }
          : system
      )
    );
  };

  const handleSave = async () => {
    await instance.put(
      "/api/dossier_medicale/8",
      revertFormattedAntecedentPersonnels(systemData)
    );
    setEditMode(false);
  };

  const handleCancel = () => {
    setSystemData(systemData);
    setEditMode(false);
  };
  console.log(systemData);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="p-6 min-h-screen bg-bay-of-many-50"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <motion.button
          whileHover={{ x: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-bay-of-many-600 hover:text-bay-of-many-800 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Retour</span>
        </motion.button>

        <h1 className="text-2xl font-bold text-bay-of-many-900">
          Antécédents Personnels
        </h1>

        {editMode ? (
          <div className="flex gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCancel}
              className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-800 rounded-lg hover:bg-red-200 transition-colors"
            >
              <X className="w-5 h-5" />
              Annuler
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSave}
              className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-800 rounded-lg hover:bg-green-200 transition-colors"
            >
              <Save className="w-5 h-5" />
              Enregistrer
            </motion.button>
          </div>
        ) : (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setEditMode(true)}
            className="flex items-center gap-2 px-4 py-2 bg-bay-of-many-600 text-white rounded-lg hover:bg-bay-of-many-700 transition-colors"
          >
            <Edit className="w-5 h-5" />
            Modifier
          </motion.button>
        )}
      </div>

      {/* Systems List */}
      <div className="space-y-4">
        {systemData.length > 1 &&
          systemData.map((system) => (
            <motion.div
              key={system.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-xl shadow-md border border-bay-of-many-100 overflow-hidden"
            >
              {/* System Header */}
              <motion.div
                whileHover={{ backgroundColor: "#f0f4ff" }}
                className="flex items-center justify-between px-6 py-4 border-b border-bay-of-many-100 cursor-pointer"
                onClick={() => toggleSystem(system.id)}
              >
                <div className="flex items-center">
                  <ClipboardList
                    className={`w-5 h-5 ${getSystemColor(system.id)}`}
                  />
                  <h2 className="ml-3 text-lg font-semibold text-bay-of-many-800">
                    {system.displayName}
                  </h2>
                </div>
                {expandedSystem === system.id ? (
                  <ChevronUp className="w-5 h-5 text-bay-of-many-600" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-bay-of-many-600" />
                )}
              </motion.div>

              {/* Conditions List - Animated */}
              {expandedSystem === system.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="p-6 space-y-6">
                    {system.conditions.map((condition) => (
                      <div key={condition.id} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            {editMode ? (
                              <div className="flex items-center space-x-3">
                                <label className="relative inline-flex items-center cursor-pointer">
                                  <input
                                    type="checkbox"
                                    checked={condition.hasCondition}
                                    onChange={(e) =>
                                      handleConditionChange(
                                        system.id,
                                        condition.id,
                                        "hasCondition",
                                        e.target.checked
                                      )
                                    }
                                    className="sr-only peer"
                                  />
                                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                                </label>
                                <span className="text-sm font-medium text-bay-of-many-700">
                                  {condition.displayName}
                                </span>
                              </div>
                            ) : (
                              <>
                                {condition.hasCondition ? (
                                  <Check className="w-5 h-5 text-green-500 mr-2" />
                                ) : (
                                  <X className="w-5 h-5 text-red-500 mr-2" />
                                )}
                                <span className="text-sm font-medium text-bay-of-many-700">
                                  {condition.displayName}
                                </span>
                              </>
                            )}
                          </div>
                        </div>

                        {(condition.hasCondition || editMode) && (
                          <div className="ml-8">
                            <label className="block text-sm font-medium text-bay-of-many-700 mb-1">
                              Remarques
                            </label>
                            {editMode ? (
                              <input
                                type="text"
                                value={condition.remarques}
                                onChange={(e) =>
                                  handleConditionChange(
                                    system.id,
                                    condition.id,
                                    "remarques",
                                    e.target.value
                                  )
                                }
                                placeholder="Ajouter des remarques..."
                                className="w-full px-4 py-2 border border-bay-of-many-200 rounded-lg focus:ring-2 focus:ring-bay-of-many-500 focus:border-bay-of-many-500 transition-all hover:border-bay-of-many-600"
                              />
                            ) : (
                              <div className="w-full px-4 py-2 bg-bay-of-many-50 rounded-lg">
                                {condition.remarques || "Aucune remarque"}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
      </div>
    </motion.div>
  );
}

// Helper function to get color based on system
function getSystemColor(systemId) {
  const colors = [
    "text-red-600", // Cardio
    "text-blue-600", // Respiratoire
    "text-purple-600", // Nerveux
    "text-pink-600", // ORL
    "text-yellow-600", // Allergies
    "text-orange-600", // Traumatologie
    "text-green-600", // Digestif
    "text-indigo-600", // Endocrinologie
    "text-gray-600", // Autres
  ];
  return colors[systemId - 1] || "text-gray-600";
}
