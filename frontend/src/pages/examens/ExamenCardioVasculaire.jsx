import { motion } from "framer-motion";
import {
  ArrowLeft,
  HeartPulse,
  Edit,
  Save,
  X,
  Check,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { z } from "zod";

// Define Zod schema for validation
const examenSchema = z.object({
  frequenceCardiaque: z.object({
    couche: z.number().min(30).max(200).optional(),
    debout: z.number().min(30).max(200).optional(),
    observation: z.string().optional(),
  }),
  tensionArterielle: z.object({
    couche: z.string().regex(/^\d{2,3}\/\d{2,3}$/).optional(),
    debout: z.string().regex(/^\d{2,3}\/\d{2,3}$/).optional(),
    observation: z.string().optional(),
  }),
  auscultation: z.object({
    couche: z.string().optional(),
    debout: z.string().optional(),
    observation: z.string().optional(),
  }),
  poulsNormal: z.object({
    hasCondition: z.boolean(),
    observation: z.string().optional(),
  }),
  bruitsCardiaquesNormaux: z.object({
    hasCondition: z.boolean(),
    observation: z.string().optional(),
  }),
  battementsCardiaquesNormaux: z.object({
    hasCondition: z.boolean(),
    observation: z.string().optional(),
  }),
  poulsPeripheriqueNormal: z.object({
    hasCondition: z.boolean(),
    observation: z.string().optional(),
  }),
  pressionArterielleNormale: z.object({
    hasCondition: z.boolean(),
    observation: z.string().optional(),
  }),
});

export default function ExamenCardiovasculaire() {
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);
  const [errors, setErrors] = useState({});
  const [expandedSection, setExpandedSection] = useState(null);

  // Initial data state
  const [formData, setFormData] = useState({
    frequenceCardiaque: {
      couche: undefined,
      debout: undefined,
      observation: "",
    },
    tensionArterielle: {
      couche: "",
      debout: "",
      observation: "",
    },
    auscultation: {
      couche: "",
      debout: "",
      observation: "",
    },
    poulsNormal: {
      hasCondition: false,
      observation: "",
    },
    bruitsCardiaquesNormaux: {
      hasCondition: false,
      observation: "",
    },
    battementsCardiaquesNormaux: {
      hasCondition: false,
      observation: "",
    },
    poulsPeripheriqueNormal: {
      hasCondition: false,
      observation: "",
    },
    pressionArterielleNormale: {
      hasCondition: false,
      observation: "",
    },
  });

  const toggleSection = (sectionId) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
  };

  const handleInputChange = (section, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const handleBooleanChange = (section, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        hasCondition: value,
      },
    }));
  };

  const validateForm = () => {
    try {
      examenSchema.parse(formData);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors = {};
        error.errors.forEach((err) => {
          const path = err.path.join('.');
          newErrors[path] = err.message;
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleSave = () => {
    if (validateForm()) {
      console.log("Form data is valid:", formData);
      setEditMode(false);
    }
  };

  const handleCancel = () => {
    setEditMode(false);
    setErrors({});
  };

  const sections = [
    {
      id: "frequenceCardiaque",
      title: "Fréquence Cardiaque",
      icon: <HeartPulse className="w-5 h-5 text-red-600" />,
      fields: [
        {
          id: "couche",
          label: "Couché (bpm)",
          type: "number",
          placeholder: "Ex: 72",
        },
        {
          id: "debout",
          label: "Debout (bpm)",
          type: "number",
          placeholder: "Ex: 78",
        },
        {
          id: "observation",
          label: "Observation",
          type: "textarea",
          placeholder: "Ajouter des observations...",
        },
      ],
    },
    {
      id: "tensionArterielle",
      title: "Tension Artérielle",
      icon: <HeartPulse className="w-5 h-5 text-blue-600" />,
      fields: [
        {
          id: "couche",
          label: "Couché (mmHg)",
          type: "text",
          placeholder: "Ex: 120/80",
        },
        {
          id: "debout",
          label: "Debout (mmHg)",
          type: "text",
          placeholder: "Ex: 118/82",
        },
        {
          id: "observation",
          label: "Observation",
          type: "textarea",
          placeholder: "Ajouter des observations...",
        },
      ],
    },
    {
      id: "auscultation",
      title: "Auscultation",
      icon: <HeartPulse className="w-5 h-5 text-purple-600" />,
      fields: [
        {
          id: "couche",
          label: "Couché",
          type: "textarea",
          placeholder: "Description couchée...",
        },
        {
          id: "debout",
          label: "Debout",
          type: "textarea",
          placeholder: "Description debout...",
        },
        {
          id: "observation",
          label: "Observation",
          type: "textarea",
          placeholder: "Ajouter des observations...",
        },
      ],
    },
    {
      id: "booleanConditions",
      title: "Évaluations",
      icon: <HeartPulse className="w-5 h-5 text-green-600" />,
      conditions: [
        {
          id: "poulsNormal",
          label: "Pouls normal",
        },
        {
          id: "bruitsCardiaquesNormaux",
          label: "Bruits cardiaques normaux",
        },
        {
          id: "battementsCardiaquesNormaux",
          label: "Battements cardiaques normaux",
        },
        {
          id: "poulsPeripheriqueNormal",
          label: "Pouls périphérique normal",
        },
        {
          id: "pressionArterielleNormale",
          label: "Pression artérielle normale",
        },
      ],
    },
  ];

  const getError = (path) => {
    return errors[path] ? (
      <span className="text-red-500 text-xs mt-1">{errors[path]}</span>
    ) : null;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="p-4 md:p-6 min-h-screen bg-gray-50"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6 md:mb-8">
        <motion.button
          whileHover={{ x: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="hidden sm:inline">Retour</span>
        </motion.button>

        <h1 className="text-xl md:text-2xl font-bold text-gray-800">
          Examen Cardiovasculaire
        </h1>

        {editMode ? (
          <div className="flex gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCancel}
              className="flex items-center gap-2 px-3 py-1 md:px-4 md:py-2 bg-red-100 text-red-800 rounded-lg hover:bg-red-200 transition-colors"
            >
              <X className="w-4 h-4 md:w-5 md:h-5" />
              <span className="hidden sm:inline">Annuler</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSave}
              className="flex items-center gap-2 px-3 py-1 md:px-4 md:py-2 bg-green-100 text-green-800 rounded-lg hover:bg-green-200 transition-colors"
            >
              <Save className="w-4 h-4 md:w-5 md:h-5" />
              <span className="hidden sm:inline">Enregistrer</span>
            </motion.button>
          </div>
        ) : (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setEditMode(true)}
            className="flex items-center gap-2 px-3 py-1 md:px-4 md:py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Edit className="w-4 h-4 md:w-5 md:h-5" />
            <span className="hidden sm:inline">Modifier</span>
          </motion.button>
        )}
      </div>

      {/* Sections List */}
      <div className="space-y-4">
        {sections.map((section) => (
          <motion.div
            key={section.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
          >
            {/* Section Header */}
            <motion.div
              whileHover={{ backgroundColor: "#f8fafc" }}
              className="flex items-center justify-between px-4 py-3 md:px-6 md:py-4 border-b border-gray-200 cursor-pointer"
              onClick={() => toggleSection(section.id)}
            >
              <div className="flex items-center">
                {section.icon}
                <h2 className="ml-3 text-base md:text-lg font-semibold text-gray-800">
                  {section.title}
                </h2>
              </div>
              {expandedSection === section.id ? (
                <ChevronUp className="w-5 h-5 text-gray-600" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-600" />
              )}
            </motion.div>

            {/* Section Content - Animated */}
            {expandedSection === section.id && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="p-4 md:p-6 space-y-4">
                  {section.fields ? (
                    section.fields.map((field) => (
                      <div key={field.id} className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                          {field.label}
                        </label>
                        {editMode ? (
                          <>
                            {field.type === "textarea" ? (
                              <textarea
                                value={formData[section.id][field.id] || ""}
                                onChange={(e) =>
                                  handleInputChange(
                                    section.id,
                                    field.id,
                                    e.target.value
                                  )
                                }
                                placeholder={field.placeholder}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all hover:border-gray-400"
                                rows={3}
                              />
                            ) : (
                              <input
                                type={field.type}
                                value={formData[section.id][field.id] || ""}
                                onChange={(e) =>
                                  handleInputChange(
                                    section.id,
                                    field.id,
                                    field.type === "number" 
                                      ? e.target.value === "" 
                                        ? undefined 
                                        : Number(e.target.value)
                                      : e.target.value
                                  )
                                }
                                placeholder={field.placeholder}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all hover:border-gray-400"
                              />
                            )}
                            {getError(`${section.id}.${field.id}`)}
                          </>
                        ) : (
                          <div className="w-full px-4 py-2 bg-gray-50 rounded-lg">
                            {formData[section.id][field.id] || "Non spécifié"}
                          </div>
                        )}
                      </div>
                    ))
                  ) : (
                    section.conditions.map((condition) => (
                      <div key={condition.id} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            {editMode ? (
                              <div className="flex items-center space-x-3">
                                <input
                                  type="checkbox"
                                  checked={formData[condition.id].hasCondition}
                                  onChange={(e) =>
                                    handleBooleanChange(
                                      condition.id,
                                      e.target.checked
                                    )
                                  }
                                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                                />
                                <span className="text-sm font-medium text-gray-700">
                                  {condition.label}
                                </span>
                              </div>
                            ) : (
                              <>
                                {formData[condition.id].hasCondition ? (
                                  <Check className="w-5 h-5 text-green-500 mr-2" />
                                ) : (
                                  <X className="w-5 h-5 text-red-500 mr-2" />
                                )}
                                <span className="text-sm font-medium text-gray-700">
                                  {condition.label}
                                </span>
                              </>
                            )}
                          </div>
                        </div>

                        {(formData[condition.id].hasCondition || editMode) && (
                          <div className="ml-8">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Observation
                            </label>
                            {editMode ? (
                              <>
                                <textarea
                                  value={formData[condition.id].observation || ""}
                                  onChange={(e) =>
                                    handleInputChange(
                                      condition.id,
                                      "observation",
                                      e.target.value
                                    )
                                  }
                                  placeholder="Ajouter des observations..."
                                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all hover:border-gray-400"
                                  rows={2}
                                />
                                {getError(`${condition.id}.observation`)}
                              </>
                            ) : (
                              <div className="w-full px-4 py-2 bg-gray-50 rounded-lg">
                                {formData[condition.id].observation || "Aucune observation"}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}