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

  const getConditionInputConfig = (conditionName) => {
    switch (conditionName) {
      case "MALADIE_CARDIAQUE":
        return {
          placeholder: "lesquelles?",
          type: "text",
        };
      case "ELECTROCARDIOGRAMME":
        return {
          placeholder: "Date du dernier...",
          type: "date",
        };
      case "ECHOCARDIOGRAMME":
        return {
          placeholder: "Date du dernier...",
          type: "date",
        };
      case "Epreuve d'effort maximale":
        return {
          placeholder: "Date du dernier...",
          type: "date",
        };
      case "PROBLEMES_VERTEBRAUX_OU_ANOMALIE_MORPHOLOGIQUE":
        return {
          placeholder: "Lesquels?",
          type: "text",
        };
      case "LUXATION_ARTICULAIRE":
        return {
          type: "multi-field",
          fields: [
            { name: "Articulation", placeholder: "Articulation" },
            { name: "Date", placeholder: "Date", type: "date" },
            { name: "Circonstances", placeholder: "Circonstances" },
            { name: "Traitement", placeholder: "Traitement" },
          ],
        };
      case "FRACTURE":
        return {
          type: "multi-field",
          fields: [
            { name: "Os", placeholder: "Os" },
            { name: "Date", placeholder: "Date", type: "date" },
            { name: "Circonstances", placeholder: "Circonstances" },
            { name: "Traitement", placeholder: "Traitement" },
          ],
        };
      case "TENDINOPATHIE":
        return {
          type: "multi-field",
          fields: [
            { name: "Tendon", placeholder: "Tendon" },
            { name: "Date", placeholder: "Date", type: "date" },
            { name: "Circonstances", placeholder: "Circonstances" },
            { name: "Traitement", placeholder: "Traitement" },
          ],
        };
      default:
        return {
          placeholder: "Ajouter des remarques...",
          type: "text",
        };
    }
  };

  const parseRemarques = (remarques, conditionName) => {
    if (!remarques) return {};

    const config = getConditionInputConfig(conditionName);
    if (config.type !== "multi-field") return { value: remarques };

    const result = {};
    const fields = config.fields.map((f) => f.name);
    const regex = new RegExp(`(${fields.join("|")})\\s*:\\s*([^\\n]*)`, "g");

    let match;
    while ((match = regex.exec(remarques)) !== null) {
      result[match[1]] = match[2].trim();
    }

    return result;
  };

  const formatRemarques = (values, conditionName) => {
    const config = getConditionInputConfig(conditionName);
    if (config.type !== "multi-field") return values.value || "";

    return Object.entries(values)
      .map(([key, value]) => `${key}: ${value}`)
      .join("\n");
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await instance.get(`/api/dossier_medicale/${id}`);
      console.log(response.data);

      const formatted = formatAntecedentPersonnels(response.data);
      console.log(formatted);

      setSystemData(formatted);
    };
    fetchData();
  }, [id]);

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

  const handleMultiFieldChange = (
    systemId,
    conditionId,
    fieldName,
    fieldValue
  ) => {
    setSystemData((prevData) => {
      return prevData.map((system) => {
        if (system.id === systemId) {
          return {
            ...system,
            conditions: system.conditions.map((condition) => {
              if (condition.id === conditionId) {
                const currentValues = parseRemarques(
                  condition.remarques,
                  condition.name
                );
                const newValues = {
                  ...currentValues,
                  [fieldName]: fieldValue,
                };
                return {
                  ...condition,
                  remarques: formatRemarques(newValues, condition.name),
                };
              }
              return condition;
            }),
          };
        }
        return system;
      });
    });
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

  const renderRemarquesInput = (condition) => {
    const config = getConditionInputConfig(condition.name);

    if (config.type === "multi-field") {
      const values = parseRemarques(condition.remarques, condition.name);

      return (
        <>
          <div className="space-y-3">
            {config.fields.map((field) => (
              <>
                <div key={field.name} className="flex flex-col">
                  <label className="text-sm font-medium text-bay-of-many-700 mb-1">
                    {field.name}
                  </label>
                  <input
                    type={field.type || "text"}
                    value={values[field.name] || ""}
                    onChange={(e) =>
                      handleMultiFieldChange(
                        expandedSystem,
                        condition.id,
                        field.name,
                        e.target.value
                      )
                    }
                    placeholder={field.placeholder}
                    className="w-full px-4 py-2 border border-bay-of-many-200 rounded-lg focus:ring-2 focus:ring-bay-of-many-500 focus:border-bay-of-many-500 transition-all hover:border-bay-of-many-600"
                  />
                </div>
              </>
            ))}
          </div>
        </>
      );
    } else {
      return (
        <input
          type={config.type}
          value={condition.remarques || ""}
          onChange={(e) =>
            handleConditionChange(
              expandedSystem,
              condition.id,
              "remarques",
              e.target.value
            )
          }
          placeholder={config.placeholder}
          className="w-full px-4 py-2 border border-bay-of-many-200 rounded-lg focus:ring-2 focus:ring-bay-of-many-500 focus:border-bay-of-many-500 transition-all hover:border-bay-of-many-600"
        />
      );
    }
  };

  const renderRemarquesDisplay = (condition) => {
    const config = getConditionInputConfig(condition.name);

    if (!condition.remarques) {
      return (
        <div className="w-full px-4 py-2 bg-bay-of-many-50 rounded-lg">
          Aucune remarque
        </div>
      );
    }

    if (config.type === "multi-field") {
      const values = parseRemarques(condition.remarques, condition.name);

      return (
        <div className="w-full px-4 py-2 bg-bay-of-many-50 rounded-lg space-y-2">
          {config.fields.map((field) => (
            <div key={field.name}>
              <span className="font-medium">{field.name}: </span>
              <span>{values[field.name] || "Non spécifié"}</span>
            </div>
          ))}
        </div>
      );
    } else {
      return (
        <div className="w-full px-4 py-2 bg-bay-of-many-50 rounded-lg">
          {condition.remarques}
        </div>
      );
    }
  };

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
                      <>
                        {condition.name ===
                          "MALAISE_OU_PERTE_DE_CONNAISSANCE" && (
                          <>
                            <hr className="text-blue-500" />

                            <h1 className="font-bold">
                              Symptômes après effort{" "}
                            </h1>
                          </>
                        )}
                        <div key={condition.id} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              {editMode ? (
                                <div className="flex items-center space-x-3">
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
                                    className="w-4 h-4 text-bay-of-many-600 bg-gray-100 border-gray-300 rounded focus:ring-bay-of-many-500"
                                  />
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
                              {editMode
                                ? renderRemarquesInput(condition)
                                : renderRemarquesDisplay(condition)}
                            </div>
                          )}
                        </div>
                        {condition.name === "FATIGUE_INHABITUELLE" && (
                          <>
                            <hr className="text-blue-500" />
                          </>
                        )}{" "}
                      </>
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

function getSystemColor(systemId) {
  const colors = [
    "text-red-600",
    "text-blue-600",
    "text-purple-600",
    "text-pink-600",
    "text-yellow-600",
    "text-orange-600",
    "text-green-600",
    "text-indigo-600",
    "text-gray-600",
  ];
  return colors[systemId - 1] || "text-gray-600";
}
