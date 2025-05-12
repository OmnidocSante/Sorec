import instance from "@/auth/AxiosInstance";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, Ban, Edit, History, HistoryIcon, Save } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";

const conclusionSchema = z.object({
  id: z.number(),
  cardioVasculaire: z.enum(["true", "false"]).nullable().optional(),
  pleuropulmonaire: z.enum(["true", "false"]).nullable().optional(),
  ophtalmique: z.enum(["true", "false"]).nullable().optional(),
  auditif: z.enum(["true", "false"]).nullable().optional(),
  neurologique: z.enum(["true", "false"]).nullable().optional(),
  abdominal: z.enum(["true", "false"]).nullable().optional(),
  urogénital: z.enum(["true", "false"]).nullable().optional(),
  paraclinique: z.enum(["true", "false"]).nullable().optional(),
});

export default function Conclusion() {
  const [isEditMode, setIsEditMode] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [hiddenFields, setHiddenFields] = useState(new Set());
  const [historique, setHistorique] = useState([]);
  const [showHistorique, setShowHistorique] = useState(false);
  const [isHistory, setIsHistory] = useState(false);

  const HIDE_VALUE = "HIDDEN";

  const {
    watch,
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(conclusionSchema),
    defaultValues: {
      id: 0,
      cardioVasculaire: null,
      pleuropulmonaire: null,
      ophtalmique: null,
      auditif: null,
      neurologique: null,
      abdominal: null,
      urogénital: null,
      paraclinique: null,
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
        'cardioVasculaire', 'pleuropulmonaire', 'ophtalmique',
        'auditif', 'neurologique', 'abdominal', 'urogénital', 'paraclinique'
      ];

      fieldsToCheck.forEach(key => {
          if (data.hasOwnProperty(key) && data[key] === HIDE_VALUE) {
              hidden.add(key);
          }
      });
      setHiddenFields(hidden);

       const dataToReset = {
           id: data.id,
           cardioVasculaire: data.cardioVasculaire === HIDE_VALUE ? null : (data.cardioVasculaire ?? null),
           pleuropulmonaire: data.pleuropulmonaire === HIDE_VALUE ? null : (data.pleuropulmonaire ?? null),
           ophtalmique: data.ophtalmique === HIDE_VALUE ? null : (data.ophtalmique ?? null),
           auditif: data.auditif === HIDE_VALUE ? null : (data.auditif ?? null),
           neurologique: data.neurologique === HIDE_VALUE ? null : (data.neurologique ?? null),
           abdominal: data.abdominal === HIDE_VALUE ? null : (data.abdominal ?? null),
           urogénital: data.urogénital === HIDE_VALUE ? null : (data.urogénital ?? null),
           paraclinique: data.paraclinique === HIDE_VALUE ? null : (data.paraclinique ?? null),
       };


      reset(dataToReset);

    } catch (err) {
      console.error("Error fetching Conclusion:", err);
       reset({
         id: parseInt(id) || 0,
         cardioVasculaire: null, pleuropulmonaire: null, ophtalmique: null,
         auditif: null, neurologique: null, abdominal: null, urogénital: null, paraclinique: null,
       });
       setHiddenFields(new Set([
         'cardioVasculaire', 'pleuropulmonaire', 'ophtalmique',
         'auditif', 'neurologique', 'abdominal', 'urogénital', 'paraclinique'
       ]));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(`/api/jockey/${id}/conclusion`);
  }, [id]);

  const handleToggle = (fieldName, value) => {
    if (!isEditMode || isHistory) return;
    setValue(fieldName, value ? "true" : "false", {
      shouldValidate: true,
    });
  };

  const handleSave = async (data) => {
    console.log(data);
    try {
      const payload = { id: data.id };
      console.log(hiddenFields);

      if (!hiddenFields.has('cardioVasculaire')) payload.cardioVasculaire = data.cardioVasculaire;
      if (!hiddenFields.has('pleuropulmonaire')) payload.pleuropulmonaire = data.pleuropulmonaire;
      if (!hiddenFields.has('ophtalmique')) payload.ophtalmique = data.ophtalmique;
      if (!hiddenFields.has('auditif')) payload.auditif = data.auditif;
      if (!hiddenFields.has('neurologique')) payload.neurologique = data.neurologique;
      if (!hiddenFields.has('abdominal')) payload.abdominal = data.abdominal;
      if (!hiddenFields.has('urogénital')) payload.urogénital = data.urogénital;
      if (!hiddenFields.has('paraclinique')) payload.paraclinique = data.paraclinique;

      console.log(payload);

      await instance.put(`/api/jockey/${id}/conclusion`, payload);
      fetchData(`/api/jockey/${id}/conclusion`);
      setIsEditMode(false);
    } catch (err) {
      console.error("Error saving Conclusion:", err);
    }
  };

  const onSubmit = (data) => handleSave(data);

  const handleHistoriqueClick = async () => {
    if (isEditMode) return;
    if (isHistory) {
      fetchData(`/api/jockey/${id}/conclusion`);
      setIsHistory(false);
      setShowHistorique(false);
    } else {
      if (historique.length === 0) {
        try {
          const response = await instance.get(`/api/jockey/${id}/historique`);
          setHistorique(response.data);
        } catch(err) {
           console.error("Error fetching history:", err);
           setHistorique([]);
        }
      }
      setShowHistorique(true);
    }
  };

  const fetchItem = async (dossierid) => {
    fetchData(`/api/jockey/${id}/conclusion/historique/${dossierid}`);
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
    { key: "cardioVasculaire", label: "Cardiovasculaire" },
    { key: "pleuropulmonaire", label: "Pleuropulmonaire" },
    { key: "ophtalmique", label: "Ophtalmique" },
    { key: "auditif", label: "Auditif" },
    { key: "neurologique", label: "Neurologique" },
    { key: "abdominal", label: "Abdominal" },
    { key: "urogénital", label: "Urogénital" },
    { key: "paraclinique", label: "Paraclinique" },
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
          Conclusion Médicale
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
                 fetchData(`/api/jockey/${id}/conclusion`);
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
          <h3 className="text-lg font-semibold text-gray-700 mb-3 border-b pb-2">Versions Historiques</h3>
          {historique.length > 0 ? historique.map((item) => (
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
          )) : (
             <p className="text-gray-500 text-sm italic">Aucun historique disponible.</p>
          )}
        </motion.div>
      )}

      {hasVisibleData && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
             {fieldConfigs.map(({ key, label }) => (
                 <motion.div
                     key={key}
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     exit={{ opacity: 0, y: 20 }}
                     transition={{ duration: 0.3 }}
                     className="h-full bg-white rounded-xl shadow-sm border border-gray-200 p-6 transition-all hover:shadow-md"
                 >
                     <div className="flex flex-col h-full justify-between">
                         <div className="mb-4">
                             <h2 className="text-lg font-semibold text-gray-800">
                                 Examen {label}
                             </h2>
                         </div>

                         <div className="flex flex-col gap-4">
                             <div className="flex gap-4">
                                 <button
                                     type="button"
                                     disabled={!isEditMode || isHistory}
                                     onClick={() => handleToggle(key, true)}
                                     className={`w-full px-4 py-2 rounded-full text-sm font-medium transition-all ${
                                         watch(key) === "true"
                                             ? "bg-green-500 text-white shadow-inner"
                                             : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                     } ${(!isEditMode || isHistory) ? "opacity-50 cursor-not-allowed" : ""}`}
                                 >
                                     Favorable
                                 </button>
                                 <button
                                     type="button"
                                     disabled={!isEditMode || isHistory}
                                     onClick={() => handleToggle(key, false)}
                                     className={`w-full px-4 py-2 rounded-full text-sm font-medium transition-all ${
                                         watch(key) === "false"
                                             ? "bg-red-500 text-white shadow-inner"
                                             : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                     } ${(!isEditMode || isHistory) ? "opacity-50 cursor-not-allowed" : ""}`}
                                 >
                                     Non-Favorable
                                 </button>
                             </div>
                             {errors[key] && errors[key].message && (
                                 <p className="text-red-500 text-sm mt-2">
                                     {errors[key].message}
                                 </p>
                             )}
                         </div>
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
             Aucune donnée de conclusion enregistrée ou visible pour ce dossier.
           </motion.div>
       )}
    </motion.form>
  );
}