import instance from "@/auth/AxiosInstance";
import { motion } from "framer-motion";
import { ArrowLeft, Edit, Save } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function Traumatologie() {
  const [isEditMode, setIsEditMode] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const [conditions, setConditions] = useState(null);

  const parseField = (remarks, field) => {
    const regex = new RegExp(`${field}:\\s*(.*?)\\s*(?=\\w+:|$)`, "is");
    const match = remarks?.match(regex);
    return match ? match[1].trim() : "";
  };

  const updateRemarkField = (remarks, field, newValue) => {
    const fields = {
      Articulation: parseField(remarks, "Articulation"),
      Date: parseField(remarks, "Date"),
      Circonstances: parseField(remarks, "Circonstances"),
      Traitement: parseField(remarks, "Traitement"),
      [field]: newValue,
    };

    return `Articulation: ${fields.Articulation}
Date: ${fields.Date}
Circonstances: ${fields.Circonstances}
Traitement: ${fields.Traitement}`;
  };

  const fetchData = async () => {
    const response = await instance.get(
      `/api/jockey/${id}/antecedent-personnel/traumatologie`
    );
    setConditions(response.data);
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const handleToggle = (conditionId, value) => {
    setConditions((prev) =>
      prev.map((cond) =>
        cond.id === conditionId ? { ...cond, hasCondition: value } : cond
      )
    );
  };

  const handleFieldChange = (conditionId, field, value) => {
    setConditions((prev) =>
      prev.map((cond) =>
        cond.id === conditionId
          ? {
              ...cond,
              remarques: updateRemarkField(cond.remarques, field, value),
            }
          : cond
      )
    );
  };

  const handleSave = async () => {
    await instance.put(`/api/jockey/${id}/antecedent-personnel`, conditions);
    fetchData();
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
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="p-6 min-h-screen bg-gradient-to-b from-blue-50 to-indigo-50"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <ArrowLeft className="h-6 w-6 text-gray-700" />
        </button>
        <h1 className="text-2xl font-bold text-gray-800">Traumatologie</h1>
        <div className="flex gap-3">
          <button
            onClick={() => setIsEditMode(true)}
            className={`p-2 pl-4 rounded-lg flex items-center gap-2 transition-all ${
              isEditMode
                ? "bg-gray-200 cursor-not-allowed"
                : "hover:bg-blue-50 hover:-translate-y-0.5"
            }`}
            disabled={isEditMode}
          >
            <Edit className="h-6 w-6 text-blue-600" />
            <span className="text-sm font-medium text-blue-800">Modifier</span>
          </button>

          <button
            onClick={handleSave}
            className={`p-2 pl-4 rounded-lg flex items-center gap-2 transition-all ${
              !isEditMode
                ? "bg-gray-200 cursor-not-allowed"
                : "hover:bg-green-50 hover:-translate-y-0.5"
            }`}
            disabled={!isEditMode}
          >
            <Save className="h-6 w-6 text-green-600" />
            <span className="text-sm font-medium text-green-800">
              Enregistrer
            </span>
          </button>
        </div>
      </div>

      {/* Conditions List */}
      <div className="space-y-6">
        {conditions.map((condition) => (
          <div
            key={condition.id}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md"
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-800">
                {condition.name}
              </h2>
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

            {/* Input Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label htmlFor="">Articulation</label>
              <input
                value={parseField(condition.remarques, "Articulation")}
                onChange={(e) =>
                  handleFieldChange(
                    condition.id,
                    "Articulation",
                    e.target.value
                  )
                }
                placeholder="Articulation"
                disabled={!isEditMode}
                className="w-full px-4 py-2 border rounded-lg"
              />
              <label htmlFor="">Date</label>

              <input
                value={parseField(condition.remarques, "Date")}
                onChange={(e) =>
                  handleFieldChange(condition.id, "Date", e.target.value)
                }
                placeholder="Date"
                disabled={!isEditMode}
                className="w-full px-4 py-2 border rounded-lg"
              />
              <label htmlFor="">Circonstances</label>

              <input
                value={parseField(condition.remarques, "Circonstances")}
                onChange={(e) =>
                  handleFieldChange(
                    condition.id,
                    "Circonstances",
                    e.target.value
                  )
                }
                placeholder="Circonstances"
                disabled={!isEditMode}
                className="w-full px-4 py-2 border rounded-lg"
              />
              <label htmlFor="">Traitement</label>

              <input
                value={parseField(condition.remarques, "Traitement")}
                onChange={(e) =>
                  handleFieldChange(condition.id, "Traitement", e.target.value)
                }
                placeholder="Traitement"
                disabled={!isEditMode}
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
