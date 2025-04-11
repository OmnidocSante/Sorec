import { motion } from "framer-motion";
import { ArrowLeft, ClipboardList, Edit, Save, X } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

export default function AntecedentPersonnel() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);
  const [activeTab, setActiveTab] = useState("Antécédents Médicaux");

  const [formData, setFormData] = useState({
    medicalHistory: {
      chronicDiseases: "Diabète type 2",
      hospitalizations: "Appendicectomie en 2015",
      allergies: "Pénicilline",
    },
    surgicalHistory: {
      interventions: "Appendicectomie",
      complications: "Aucune",
      dates: "2015",
    },
    lifestyle: {
      smoking: "Ancien fumeur (10 paquets/année)",
      alcohol: "Occasionnel",
      physicalActivity: "3 fois/semaine",
    },
  });

  const formSections = [
    {
      title: "Antécédents Médicaux",
      icon: <ClipboardList className="w-5 h-5 text-pink-600" />,
      key: "medicalHistory",
      inputs: [
        {
          name: "chronicDiseases",
          label: "Maladies chroniques",
          placeholder: "Diabète, hypertension...",
        },
        {
          name: "hospitalizations",
          label: "Hospitalisations",
          placeholder: "Dates et raisons",
        },
        {
          name: "allergies",
          label: "Allergies",
          placeholder: "Médicaments, aliments...",
        },
      ],
    },
    {
      title: "Antécédents Chirurgicaux",
      icon: <ClipboardList className="w-5 h-5 text-purple-600" />,
      key: "surgicalHistory",
      inputs: [
        {
          name: "interventions",
          label: "Interventions",
          placeholder: "Appendicectomie, 2015...",
        },
        {
          name: "complications",
          label: "Complications",
          placeholder: "Décrivez les complications",
        },
        {
          name: "dates",
          label: "Dates",
          placeholder: "Dates des interventions",
        },
      ],
    },
    {
      title: "Habitudes de Vie",
      icon: <ClipboardList className="w-5 h-5 text-green-600" />,
      key: "lifestyle",
      inputs: [
        {
          name: "smoking",
          label: "Tabagisme",
          placeholder: "Paquets/année, durée...",
        },
        {
          name: "alcohol",
          label: "Alcool",
          placeholder: "Consommation hebdomadaire",
        },
        {
          name: "physicalActivity",
          label: "Activité physique",
          placeholder: "Fréquence, type...",
        },
      ],
    },
  ];

  const handleInputChange = (section, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const handleSave = () => {
    console.log("Saving data:", formData);
    setEditMode(false);
  };

  const handleCancel = () => {
    setEditMode(false);
  };

  const activeSection = formSections.find(
    (section) => section.title === activeTab
  );

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

      {/* Tabs */}
      <div className="flex gap-4 mb-6">
        {formSections.map((section) => (
          <button
            key={section.title}
            onClick={() => setActiveTab(section.title)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all ${
              activeTab === section.title
                ? "bg-bay-of-many-600/80 text-white border-bay-of-many-600"
                : "bg-white text-bay-of-many-700 border-bay-of-many-200 hover:bg-bay-of-many-100"
            }`}
          >
            {section.icon}
            <span>{section.title}</span>
          </button>
        ))}
      </div>

      {/* Active Section */}
      {activeSection && (
        <motion.div
          key={activeSection.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="bg-white rounded-xl shadow-md border border-bay-of-many-100 overflow-hidden"
        >
          {/* Section Header */}
          <div className="flex items-center bg-bay-of-many-50 px-6 py-4 border-b border-bay-of-many-100">
            {activeSection.icon}
            <h2 className="ml-3 text-lg font-semibold text-bay-of-many-800">
              {activeSection.title}
            </h2>
          </div>

          {/* Inputs */}
          <div className="p-6 space-y-4">
            {activeSection.inputs.map((input, idx) => (
              <motion.div
                key={idx}
                // whileHover={{ scale: editMode ? 1.01 : 1 }}
                className="space-y-1"
              >
                <label className="block text-sm font-medium text-bay-of-many-700">
                  {input.label}
                </label>
                {editMode ? (
                  <input
                    type="text"
                    value={formData[activeSection.key][input.name]}
                    onChange={(e) =>
                      handleInputChange(
                        activeSection.key,
                        input.name,
                        e.target.value
                      )
                    }
                    placeholder={input.placeholder}
                    className="w-full px-4 py-2 border border-bay-of-many-200 rounded-lg focus:ring-2 focus:ring-bay-of-many-500 focus:border-bay-of-many-500 transition-all hover:border-bay-of-many-600"
                  />
                ) : (
                  <div className="w-full px-4 py-2 bg-bay-of-many-50 rounded-lg">
                    {formData[activeSection.key][input.name] || "Non renseigné"}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
