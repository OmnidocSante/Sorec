import instance from "@/auth/AxiosInstance";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { ArrowLeft, Edit, Save } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";
import { AnimatePresence } from "framer-motion";
import { Ban, HistoryIcon, History } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import useUser from "@/auth/useUser";

const paramLocSchema = z.object({
  id: z.number(),
  parametre: z.object({ id: z.number(), nom: z.string() }),
  observations: z.string().nullable().optional(),
  hasCondition: z.string().nullable().optional(),
});

const examenLocomoteurSchema = z.object({
  id: z.number(),
  parametresExamenLocomoteurs: z.array(paramLocSchema).nullable().optional(),
  forceHanche: z.string().nullable().optional(),
  forceGenoux: z.string().nullable().optional(),
  forceCheville: z.string().nullable().optional(),
  souplesseMusculaire: z.string().nullable().optional(),
  forceTendons: z.string().nullable().optional(),
  forceEpaule: z.string().nullable().optional(),
  forceCoude: z.string().nullable().optional(),
  forcePoignet: z.string().nullable().optional(),
});

export default function ExamenLocomoteur() {
  const user = useUser();

  const [isEditMode, setIsEditMode] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [hiddenFields, setHiddenFields] = useState(new Set());

  const HIDE_VALUE = "HIDDEN";

  const {
    register,
    control,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(examenLocomoteurSchema),
    defaultValues: {
      id: 0,
      parametresExamenLocomoteurs: [],
      forceHanche: "",
      forceGenoux: "",
      forceCheville: "",
      souplesseMusculaire: "",
      forceTendons: "",
      forceEpaule: "",
      forceCoude: "",
      forcePoignet: "",
    },
  });
  console.log(errors);

  const { fields } = useFieldArray({
    name: "parametresExamenLocomoteurs",
    control,
  });
  const allValues = watch();

  const fetchData = async (url) => {
    setLoading(true);
    try {
      const res = await instance.get(url);
      const data = res.data;
      console.log(data);

      const hidden = new Set();
      const topLevelKeys = [
        "forceHanche",
        "forceGenoux",
        "forceCheville",
        "souplesseMusculaire",
        "forceTendons",
        "forceEpaule",
        "forceCoude",
        "forcePoignet",
      ];

      topLevelKeys.forEach((key) => {
        if (data.hasOwnProperty(key) && data[key] === HIDE_VALUE) {
          hidden.add(key);
        }
      });
      setHiddenFields(hidden);

      const dataToReset = {
        id: data.id,
        parametresExamenLocomoteurs: data.parametresExamenLocomoteurs
          ? data.parametresExamenLocomoteurs.map((item) => ({
              ...item,
              observations: item.observations ?? "",
              hasCondition: item.hasCondition ?? "false",
            }))
          : [],
        forceHanche:
          data.forceHanche === HIDE_VALUE ? "" : data.forceHanche ?? "",
        forceGenoux:
          data.forceGenoux === HIDE_VALUE ? "" : data.forceGenoux ?? "",
        forceCheville:
          data.forceCheville === HIDE_VALUE ? "" : data.forceCheville ?? "",
        souplesseMusculaire:
          data.souplesseMusculaire === HIDE_VALUE
            ? ""
            : data.souplesseMusculaire ?? "",
        forceTendons:
          data.forceTendons === HIDE_VALUE ? "" : data.forceTendons ?? "",
        forceEpaule:
          data.forceEpaule === HIDE_VALUE ? "" : data.forceEpaule ?? "",
        forceCoude: data.forceCoude === HIDE_VALUE ? "" : data.forceCoude ?? "",
        forcePoignet:
          data.forcePoignet === HIDE_VALUE ? "" : data.forcePoignet ?? "",
      };

      reset(dataToReset);
    } catch (err) {
      console.error(err);
      reset({
        id: parseInt(id) || 0,
        parametresExamenLocomoteurs: [],
        forceHanche: "",
        forceGenoux: "",
        forceCheville: "",
        souplesseMusculaire: "",
        forceTendons: "",
        forceEpaule: "",
        forceCoude: "",
        forcePoignet: "",
      });
      setHiddenFields(
        new Set([
          "forceHanche",
          "forceGenoux",
          "forceCheville",
          "souplesseMusculaire",
          "forceTendons",
          "forceEpaule",
          "forceCoude",
          "forcePoignet",
        ])
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(`/api/jockey/${id}/examen-locomoteur`);
  }, [id]);

  const handleToggle = (index, value) => {
    if (!isEditMode || isHistory) return;
    setValue(`parametresExamenLocomoteurs.${index}.hasCondition`, value, {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  const onSubmit = async (data) => {
    console.log("Form data before processing:", data);

    const payload = {
      id: data.id,
      parametresExamenLocomoteurs: data.parametresExamenLocomoteurs
        ? data.parametresExamenLocomoteurs.map((item) => ({
            ...item,
            observations: item.observations === "" ? null : item.observations,
            hasCondition: item.hasCondition
              ? item.hasCondition.toString()
              : "false",
            parametre: item.parametre,
          }))
        : [],
      ...Object.fromEntries(
        Object.entries(data)
          .filter(
            ([key]) =>
              key !== "parametresExamenLocomoteurs" &&
              key !== "id" &&
              !hiddenFields.has(key)
          )
          .map(([key, value]) => [key, value === "" ? null : value])
      ),
    };

    console.log("Saving payload:", payload);

    try {
      await instance.put(`/api/jockey/${id}/examen-locomoteur`, payload);

      fetchData(`/api/jockey/${id}/examen-locomoteur`);
      setIsEditMode(false);
    } catch (err) {
      console.error("Error saving ExamenLocomoteur:", err);
    }
  };

  const [historique, setHistorique] = useState([]);
  const [showHistorique, setShowHistorique] = useState(false);
  const handleHistoriqueClick = async () => {
    if (isEditMode) return;

    if (isHistory) {
      fetchData(`/api/jockey/${id}/examen-locomoteur`);
      setIsHistory(false);
      setShowHistorique(false);
    } else {
      if (historique.length === 0) {
        try {
          const response = await instance.get(`/api/jockey/${id}/historique`);
          setHistorique(response.data);
        } catch (err) {
          console.error("Error fetching history:", err);
          setHistorique([]);
        }
      }
      setShowHistorique(true);
    }
  };

  const [isHistory, setIsHistory] = useState(false);

  const fetchItem = async (dossierid) => {
    fetchData(`/api/jockey/${id}/examen-locomoteur/historique/${dossierid}`);
    setIsHistory(true);
    setIsEditMode(false);
    setShowHistorique(false);
  };

  if (loading) {
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

  const topLevelFieldConfigs = [
    { key: "forceHanche", label: "Force Hanche" },
    { key: "forceGenoux", label: "Force Genoux" },
    { key: "forceCheville", label: "Force Cheville" },
    { key: "souplesseMusculaire", label: "Souplesse Musculaire" },
    { key: "forceTendons", label: "Force Tendons" },
    { key: "forceEpaule", label: "Force Epaule" },
    { key: "forceCoude", label: "Force Coude" },
    { key: "forcePoignet", label: "Force Poignet" },
  ];

  const visibleTopLevelFields = topLevelFieldConfigs.filter(
    ({ key }) => !hiddenFields.has(key)
  );
  const visibleNestedItems = fields;

  const hasVisibleData =
    visibleNestedItems.length > 0 || visibleTopLevelFields.length > 0;

  return (
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
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
                  ce mode{" "}
                  <span
                    onClick={handleHistoriqueClick}
                    className="text-red-500 cursor-pointer hover:underline"
                  >
                    restaurer
                  </span>
                </div>
              </AlertDescription>
            </Alert>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center justify-between mb-8">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ArrowLeft className="h-6 w-6 text-gray-700" />
        </button>
        <h1 className="lg:absolute lg:left-1/2 lg:transform lg:-translate-x-1/2 text-2xl font-bold text-gray-800">
          Examen Locomoteur
        </h1>
        {user.role === "MEDECIN" && (
          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleHistoriqueClick}
              className={`p-2 pl-4 rounded-lg flex items-center gap-2 transition-all ${
                isEditMode || isHistory || !hasVisibleData
                  ? "bg-gray-200 cursor-not-allowed"
                  : "hover:bg-blue-50 hover:-translate-y-0.5"
              }`}
              disabled={isEditMode || isHistory || !hasVisibleData}
            >
              <History className="h-6 w-6 text-gray-600" />
              <span className="text-sm font-medium text-gray-800">
                {showHistorique ? "Cacher l'historique" : "Voir historique"}
              </span>
            </button>

            {isEditMode ? (
              <button
                type="button"
                onClick={() => {
                  fetchData(`/api/jockey/${id}/examen-locomoteur`);
                  setIsEditMode(false);
                }}
                className={`p-2 pl-4 ${
                  isHistory && "cursor-not-allowed"
                } rounded-lg flex items-center gap-2 transition-all ${
                  isEditMode ? " " : "hover:bg-blue-50 hover:-translate-y-0.5"
                }`}
                disabled={isHistory || !hasVisibleData}
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
                disabled={isEditMode || isHistory || !hasVisibleData}
              >
                <Edit className="h-6 w-6 text-blue-600" />
                <span className="text-sm font-medium text-blue-800">
                  Modifier
                </span>
              </button>
            )}

            <button
              type="submit"
              className={`p-2 pl-4 rounded-lg flex items-center gap-2 transition-all ${
                !isEditMode || isHistory || !hasVisibleData
                  ? "bg-gray-200 cursor-not-allowed"
                  : "hover:bg-green-50 hover:-translate-y-0.5"
              } `}
              disabled={!isEditMode || isHistory || !hasVisibleData}
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
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="my-4 space-y-2 bg-white p-4 rounded-xl shadow-inner"
        >
          <h3 className="text-lg font-semibold text-gray-700 mb-3 border-b pb-2">
            Versions Historiques
          </h3>
          {historique.length > 0 ? (
            historique.map((item) => (
              <div
                key={item.id}
                onClick={() => fetchItem(item.id)}
                className="p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors border border-gray-200"
              >
                <p className="text-sm font-medium text-gray-700">
                  <span className="mr-2 text-gray-500">Date du dossier:</span>
                  {new Date(item.date).toLocaleString("fr-FR", {
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
            ))
          ) : (
            <p className="text-gray-500 text-sm italic">
              Aucun historique disponible.
            </p>
          )}
        </motion.div>
      )}

      <div className="space-y-6">
        {visibleNestedItems.length > 0 && (
          <div className="space-y-6 mb-6">
            {visibleNestedItems.map((field, idx) => (
              <motion.div
                key={field.id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 transition-all hover:shadow-md"
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    {field.parametre?.nom?.replace(/_/g, " ") ||
                      `Paramètre ${idx + 1}`}
                  </h3>
                  <div className="flex gap-2">
                    <button
                      disabled={!isEditMode || isHistory}
                      type="button"
                      onClick={() => handleToggle(idx, "true")}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                        watch(
                          `parametresExamenLocomoteurs.${idx}.hasCondition`
                        ) === "true"
                          ? "bg-green-500 text-white shadow-inner"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      } ${
                        !isEditMode || isHistory
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                      }`}
                    >
                      Oui
                    </button>
                    <button
                      disabled={!isEditMode || isHistory}
                      type="button"
                      onClick={() => handleToggle(idx, "false")}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                        watch(
                          `parametresExamenLocomoteurs.${idx}.hasCondition`
                        ) === "false"
                          ? "bg-red-500 text-white shadow-inner"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      } ${
                        !isEditMode || isHistory
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                      }`}
                    >
                      Non
                    </button>
                  </div>
                </div>
                {errors.parametresExamenLocomoteurs?.[idx]?.hasCondition && (
                  <p className="text-red-500 text-sm mt-2">
                    {
                      errors.parametresExamenLocomoteurs[idx].hasCondition
                        .message
                    }
                  </p>
                )}

                <div>
                  <input
                    id={`parametresExamenLocomoteurs.${idx}.observations`}
                    {...register(
                      `parametresExamenLocomoteurs.${idx}.observations`
                    )}
                    placeholder="Observations..."
                    disabled={!isEditMode || isHistory}
                    rows={3}
                    className={`w-full px-4 py-3 border ${
                      isEditMode && !isHistory
                        ? "border-blue-200"
                        : "border-gray-200"
                    } rounded-lg focus:outline-none focus:ring-2 ${
                      isEditMode && !isHistory
                        ? "focus:ring-blue-300"
                        : "focus:ring-gray-300"
                    } transition-all resize-y ${
                      !isEditMode || isHistory
                        ? "bg-gray-50 cursor-not-allowed"
                        : ""
                    }`}
                  />
                  {errors.parametresExamenLocomoteurs?.[idx]?.observations && (
                    <p className="text-red-500 text-sm mt-2">
                      {
                        errors.parametresExamenLocomoteurs[idx].observations
                          .message
                      }
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {visibleTopLevelFields.length > 0 && (
          <div className="space-y-6">
            {visibleTopLevelFields.map(({ key, label }) => (
              <motion.div
                key={key}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 transition-all hover:shadow-md"
              >
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold text-gray-800">
                    {label}
                  </h2>
                </div>
                <div>
                  <input
                    id={key}
                    type="text"
                    {...register(key)}
                    placeholder={label + "..."}
                    disabled={!isEditMode || isHistory}
                    className={`w-full px-4 py-3 border ${
                      isEditMode && !isHistory
                        ? "border-blue-200"
                        : "border-gray-200"
                    } rounded-lg focus:outline-none focus:ring-2 ${
                      isEditMode && !isHistory
                        ? "focus:ring-blue-300"
                        : "focus:ring-gray-300"
                    } transition-all ${
                      !isEditMode || isHistory
                        ? "bg-gray-50 cursor-not-allowed"
                        : ""
                    }`}
                  />
                  {errors[key] && errors[key].message && (
                    <p className="text-red-500 text-sm mt-2">
                      {errors[key].message}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {!hasVisibleData && !loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-gray-500 italic mt-8"
        >
          Aucune donnée d'examen locomoteur enregistrée ou visible pour ce
          dossier.
        </motion.div>
      )}
    </motion.form>
  );
}
