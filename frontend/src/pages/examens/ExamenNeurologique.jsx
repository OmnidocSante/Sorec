import instance from "@/auth/AxiosInstance";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Edit, Save, Ban, HistoryIcon, History } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function ExamenNeurologique() {
  const [isEditMode, setIsEditMode] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [hiddenFields, setHiddenFields] = useState(new Set());

  const [historique, setHistorique] = useState([]);
  const [showHistorique, setShowHistorique] = useState(false);
  const [isHistory, setIsHistory] = useState(false);

  const HIDE_VALUE = "HIDDEN";

  const examenNeurologiqueSchema = z.object({
    id: z.number(),
    reflexePupillaire: z.string().nullable().optional(),
    reflexesOstéoTendineux: z.string().nullable().optional(),
    coordination: z.string().nullable().optional(),
    equilibre: z.string().nullable().optional(),
    sensibilite: z.string().nullable().optional(),
    motricite: z.string().nullable().optional(),
    tonicite: z.string().nullable().optional(),
    autres: z.string().nullable().optional(),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(examenNeurologiqueSchema),
    defaultValues: {
      id: 0,
      reflexePupillaire: "",
      reflexesOstéoTendineux: "",
      coordination: "",
      equilibre: "",
      sensibilite: "",
      motricite: "",
      tonicite: "",
      autres: "",
    },
  });

  const fetchData = async (url) => {
    setLoading(true);
    try {
      const response = await instance.get(url);
      const data = response.data;
      console.log(data);

      const hidden = new Set();
      const fieldsToCheck = [
        "reflexePupillaire",
        "reflexesOstéoTendineux",
        "coordination",
        "equilibre",
        "sensibilite",
        "motricite",
        "tonicite",
        "autres",
      ];

      fieldsToCheck.forEach((key) => {
        if (data.hasOwnProperty(key) && data[key] === HIDE_VALUE) {
          hidden.add(key);
        }
      });
      setHiddenFields(hidden);

      const dataToReset = {
        id: data.id,
        reflexePupillaire:
          data.reflexePupillaire === HIDE_VALUE
            ? ""
            : data.reflexePupillaire ?? "",
        reflexesOstéoTendineux:
          data.reflexesOstéoTendineux === HIDE_VALUE
            ? ""
            : data.reflexesOstéoTendineux ?? "",
        coordination:
          data.coordination === HIDE_VALUE ? "" : data.coordination ?? "",
        equilibre: data.equilibre === HIDE_VALUE ? "" : data.equilibre ?? "",
        sensibilite:
          data.sensibilite === HIDE_VALUE ? "" : data.sensibilite ?? "",
        motricite: data.motricite === HIDE_VALUE ? "" : data.motricite ?? "",
        tonicite: data.tonicite === HIDE_VALUE ? "" : data.tonicite ?? "",
        autres: data.autres === HIDE_VALUE ? "" : data.autres ?? "",
      };

      reset(dataToReset);
    } catch (err) {
      console.error("Error fetching ExamenNeurologique:", err);
      reset({
        id: parseInt(id) || 0,
        reflexePupillaire: "",
        reflexesOstéoTendineux: "",
        coordination: "",
        equilibre: "",
        sensibilite: "",
        motricite: "",
        tonicite: "",
        autres: "",
      });
      setHiddenFields(
        new Set([
          "reflexePupillaire",
          "reflexesOstéoTendineux",
          "coordination",
          "equilibre",
          "sensibilite",
          "motricite",
          "tonicite",
          "autres",
        ])
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(`/api/jockey/${id}/examen-neurologique`);
  }, [id]);

  const handleSave = async (data) => {
    console.log(data);

    try {
      const payload = { id: data.id };

      if (!hiddenFields.has("reflexePupillaire"))
        payload.reflexePupillaire =
          data.reflexePupillaire === "" ? null : data.reflexePupillaire;
      if (!hiddenFields.has("reflexesOstéoTendineux"))
        payload.reflexesOstéoTendineux =
          data.reflexesOstéoTendineux === ""
            ? null
            : data.reflexesOstéoTendineux;
      if (!hiddenFields.has("coordination"))
        payload.coordination =
          data.coordination === "" ? null : data.coordination;
      if (!hiddenFields.has("equilibre"))
        payload.equilibre = data.equilibre === "" ? null : data.equilibre;
      if (!hiddenFields.has("sensibilite"))
        payload.sensibilite = data.sensibilite === "" ? null : data.sensibilite;
      if (!hiddenFields.has("motricite"))
        payload.motricite = data.motricite === "" ? null : data.motricite;
      if (!hiddenFields.has("tonicite"))
        payload.tonicite = data.tonicite === "" ? null : data.tonicite;
      if (!hiddenFields.has("autres"))
        payload.autres = data.autres === "" ? null : data.autres;

      console.log(payload);

      await instance.put(`/api/jockey/${id}/examen-neurologique`, payload);

      fetchData(`/api/jockey/${id}/examen-neurologique`);
      setIsEditMode(false);
    } catch (err) {
      console.error("Error saving ExamenNeurologique:", err);
    }
  };

  const onSubmit = (data) => handleSave(data);

  const handleHistoriqueClick = async () => {
    if (isEditMode) return;

    if (isHistory) {
      fetchData(`/api/jockey/${id}/examen-neurologique`);
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

  const fetchItem = async (dossierid) => {
    fetchData(`/api/jockey/${id}/examen-neurologique/historique/${dossierid}`);
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

  const fieldConfigs = [
    { key: "reflexePupillaire", label: "Réflexe Pupillaire" },
    {
      key: "reflexesOstéoTendineux",
      label: "Réflexes Ostéo‑Tendineux",
    },
    { key: "coordination", label: "Coordination" },
    { key: "equilibre", label: "Équilibre" },
    { key: "sensibilite", label: "Sensibilité" },
    { key: "motricite", label: "Motricité" },
    { key: "tonicite", label: "Tonicité" },
    { key: "autres", label: "Autres Observations" },
  ].filter(({ key }) => !hiddenFields.has(key));

  const hasVisibleData = fieldConfigs.length > 0;

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
          Examen Neurologique
        </h1>

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
                fetchData(`/api/jockey/${id}/examen-neurologique`);
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
              <span className="text-sm font-medium text-red-800">Annuler</span>
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

      {hasVisibleData && (
        <div className="space-y-6">
          {fieldConfigs.map(({ key, label }) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 transition-all hover:shadow-md"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-800">{label}</h2>
              </div>
              <div>
                <input
                  id={key}
                  {...register(key)}
                  placeholder={label + "..."}
                  disabled={!isEditMode || isHistory}
                  type="text"
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

      {!hasVisibleData && !loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-gray-500 italic mt-8"
        >
          Aucune donnée d'examen neurologique enregistrée ou visible pour ce
          dossier.
        </motion.div>
      )}
    </motion.form>
  );
}
