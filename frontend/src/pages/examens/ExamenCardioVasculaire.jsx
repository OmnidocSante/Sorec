import { motion } from "framer-motion";
import {
  ArrowLeft,
  Edit,
  Save,
  ChevronDown,
} from "lucide-react";
import { useState } from "react";

export default function ExamenCardioVasculaire() {
  const [toggle, setToggle] = useState(null); // true, false or null
  const [isEditMode, setIsEditMode] = useState(false);
  const [remarks, setRemarks] = useState("");

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="p-6 min-h-screen bg-white"
    >
      {/* Header Section */}
      <div className="flex items-center justify-between mb-4">
        <button>
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="text-xl font-bold">Antécédents personnels</h1>
        <div className="flex gap-2">
          <button onClick={() => setIsEditMode(true)}>
            <Edit className="h-5 w-5 text-blue-500" />
          </button>
          <button onClick={() => setIsEditMode(false)}>
            <Save className="h-5 w-5 text-green-600" />
          </button>
        </div>
      </div>

      {/* System Accordion */}
      <div className="border rounded-lg mb-4 overflow-hidden">
        <button className="w-full flex justify-between items-center p-4 bg-gray-100 hover:bg-gray-200 transition">
          <span className="font-medium">Nom du système</span>
          <ChevronDown className="h-4 w-4" />
        </button>

        <div className="p-4 space-y-6 bg-white">
          {/* Condition block */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-md font-semibold">Nom de la condition</h2>

              {/* Oui / Non Buttons */}
              <div className="flex gap-2">
                <button
                  disabled={!isEditMode}
                  onClick={() => setToggle(true)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition ${
                    toggle === true
                      ? "bg-green-500 text-white"
                      : "bg-gray-200 text-gray-700"
                  } ${!isEditMode ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  Oui
                </button>
                <button
                  disabled={!isEditMode}
                  onClick={() => setToggle(false)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition ${
                    toggle === false
                      ? "bg-red-500 text-white"
                      : "bg-gray-200 text-gray-700"
                  } ${!isEditMode ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  Non
                </button>
              </div>
            </div>

            <input
              type="text"
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              placeholder="Ajouter des remarques..."
              disabled={!isEditMode}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring ${
                !isEditMode ? "bg-gray-100 cursor-not-allowed" : ""
              }`}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
