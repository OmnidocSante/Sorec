import instance from "@/auth/AxiosInstance";
import useUser from "@/auth/useUser";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, Ban, Edit, History, HistoryIcon, Save } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";

export default function AntecedentFamiliaux() {
  const user = useUser();

  const [isEditMode, setIsEditMode] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  // State to track hidden fields based on backend value being "HIDDEN"
  const [hiddenFields, setHiddenFields] = useState(new Set());

  // Define the specific value that triggers hiding
  const HIDE_VALUE = "HIDDEN";

  // Zod schema remains the same, allowing null/optional strings
  const antecedentSchema = z.object({
    id: z.number(),
    medicaux: z.string().nullable().optional(),
    asthme: z.string().nullable().optional(),
    mortSubite: z.string().nullable().optional(),
    maladiesMetaboliques: z.string().nullable().optional(),
    autres: z.string().nullable().optional(),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    // getValues // No longer strictly needed for this pattern logic
  } = useForm({
    resolver: zodResolver(antecedentSchema),
    defaultValues: {
      id: 0,
      medicaux: "", // Default to empty string or null
      asthme: "",
      mortSubite: "",
      maladiesMetaboliques: "",
      autres: "",
    },
  });

  const fetchData = async (url) => {
    setLoading(true); // Set loading to true before fetch
    try {
      const response = await instance.get(url);

      const data = response.data;
      console.log("Fetched data:", data); // Log fetched data

      // Determine hidden fields based on backend value being "HIDDEN"
      const hidden = new Set();
      const fieldsToCheck = [
        "medicaux",
        "asthme",
        "mortSubite",
        "maladiesMetaboliques",
        "autres",
      ];

      fieldsToCheck.forEach((key) => {
        // Check if the key exists in the response data and its value is "HIDDEN"
        if (data.hasOwnProperty(key) && data[key] === HIDE_VALUE) {
          hidden.add(key);
        }
      });
      setHiddenFields(hidden);

      // Prepare data for reset.
      // If a field's value was "HIDDEN", reset it to "" or null for the form state.
      // Otherwise, use the fetched value (which could be null or a string).
      const dataToReset = {
        id: data.id,
        medicaux: data.medicaux === HIDE_VALUE ? "" : data.medicaux ?? "",
        asthme: data.asthme === HIDE_VALUE ? "" : data.asthme ?? "",
        mortSubite: data.mortSubite === HIDE_VALUE ? "" : data.mortSubite ?? "",
        maladiesMetaboliques:
          data.maladiesMetaboliques === HIDE_VALUE
            ? ""
            : data.maladiesMetaboliques ?? "",
        autres: data.autres === HIDE_VALUE ? "" : data.autres ?? "",
      };

      reset(dataToReset);
    } catch (err) {
      navigate("/unauthorized");

      console.error("Error fetching AntecedentFamiliaux:", err);
      // On error, reset to default empty state and clear hidden fields
      reset({
        id: parseInt(id) || 0, // Attempt to use id from params if fetch failed completely
        medicaux: "",
        asthme: "",
        mortSubite: "",
        maladiesMetaboliques: "",
        autres: "",
      });
      setHiddenFields(new Set()); // Clear hidden state on fetch error
    } finally {
      setLoading(false); // Set loading to false after fetch attempt
    }
  };

  useEffect(() => {
    fetchData(`/api/jockey/${id}/antecedent-familiaux`);
  }, [id]);

  const handleSave = async (data) => {
    console.log("Form data before processing:", data); // Log form data

    try {
      // Create payload with only non-hidden fields.
      // The form data for hidden fields will be "" due to reset,
      // but they are excluded from the payload here.
      const payload = { id: data.id };
      // Include field only if it was NOT hidden (i.e., not "HIDDEN" from backend)
      // Convert empty strings in non-hidden fields to null if the backend expects null for empty.
      if (!hiddenFields.has("medicaux"))
        payload.medicaux = data.medicaux === "" ? null : data.medicaux;
      if (!hiddenFields.has("asthme"))
        payload.asthme = data.asthme === "" ? null : data.asthme;
      if (!hiddenFields.has("mortSubite"))
        payload.mortSubite = data.mortSubite === "" ? null : data.mortSubite;
      if (!hiddenFields.has("maladiesMetaboliques"))
        payload.maladiesMetaboliques =
          data.maladiesMetaboliques === "" ? null : data.maladiesMetaboliques;
      if (!hiddenFields.has("autres"))
        payload.autres = data.autres === "" ? null : data.autres;

      console.log("Saving payload:", payload); // Log payload being sent

      await instance.put(`/api/jockey/${id}/antecedent-familiaux`, payload);

      // Refetch data to get the latest state from the backend, including potential "HIDDEN" values
      fetchData(`/api/jockey/${id}/antecedent-familiaux`);
      setIsEditMode(false);
    } catch (err) {
      console.error("Error saving AntecedentFamiliaux:", err);
      // Potentially show a user-facing error message here
    }
  };

  // Use handleSubmit provided by react-hook-form
  const onSubmit = (data) => handleSave(data);

  const [historique, setHistorique] = useState([]);
  const [showHistorique, setShowHistorique] = useState(false);
  // isHistory state remains for historical view logic
  const [isHistory, setIsHistory] = useState(false);

  const handleHistoriqueClick = async () => {
    // Disable if in edit mode
    if (isEditMode) return;

    if (isHistory) {
      // If currently viewing history, restore main view
      fetchData(`/api/jockey/${id}/antecedent-familiaux`);
      setIsHistory(false);
      setShowHistorique(false); // Hide historique list when restoring
    } else {
      // If not viewing history, fetch and show history
      if (historique.length === 0) {
        try {
          // Assuming this endpoint fetches general history items applicable to this section
          const response = await instance.get(`/api/jockey/${id}/historique`);
          setHistorique(response.data);
        } catch (err) {
          console.error("Error fetching history:", err);
          setHistorique([]); // Clear history or set to empty on error
        }
      }
      setShowHistorique(true); // Show historique list
    }
  };

  const fetchItem = async (dossierid) => {
    // Fetch specific history item and treat it as historical view
    fetchData(`/api/jockey/${id}/antecedent-familiaux/historique/${dossierid}`);
    setIsHistory(true);
    setIsEditMode(false); // History view is read-only
    setShowHistorique(false); // Hide the history list itself when viewing an item
  };

  // Define field configurations
  const allFieldConfigs = [
    { key: "medicaux", label: "Médicaux" }, // Assuming textarea is appropriate
    { key: "asthme", label: "Asthme" },
    { key: "mortSubite", label: "Mort Subite" },
    {
      key: "maladiesMetaboliques",
      label: "Maladies Métaboliques",
      type: "textarea",
    },
    { key: "autres", label: "Autres Observations", type: "textarea" },
  ];

  // Filter out hidden fields for rendering
  const visibleFieldConfigs = allFieldConfigs.filter(
    ({ key }) => !hiddenFields.has(key)
  );

  // Determine if there is any visible data
  const hasVisibleData = visibleFieldConfigs.length > 0;

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
                  ce mode
                  <span
                    onClick={handleHistoriqueClick} // Click to restore original view
                    className="text-red-500 cursor-pointer hover:underline"
                  >
                    {" "}
                    restaurer
                  </span>
                </div>
              </AlertDescription>
            </Alert>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ArrowLeft className="h-6 w-6 text-gray-700" />
        </button>
        <h1 className="lg:absolute lg:left-1/2 lg:transform lg:-translate-x-1/2 text-2xl font-bold text-gray-800">
          Antécédents Familiaux
        </h1>
        {user.role === "MEDECIN" && (
          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleHistoriqueClick}
              // Disable history button if in edit mode, already in history mode, or no visible data to view history for
              className={`p-2 pl-4 rounded-lg flex items-center gap-2 transition-all ${
                isEditMode || isHistory || !hasVisibleData
                  ? "bg-gray-200 cursor-not-allowed"
                  : "hover:bg-blue-50 hover:-translate-y-0.5"
              }`}
              disabled={isEditMode || isHistory || !hasVisibleData} // Disabled when editing, viewing history, or no visible data
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
                  // When cancelling, reset form to initial fetched data
                  fetchData(`/api/jockey/${id}/antecedent-familiaux`);
                  setIsEditMode(false);
                }}
                className={`p-2 pl-4 ${
                  isHistory && "cursor-not-allowed"
                } rounded-lg flex items-center gap-2 transition-all ${
                  isEditMode ? " " : "hover:bg-blue-50 hover:-translate-y-0.5"
                }`}
                disabled={isHistory || !hasVisibleData} // Cannot cancel edit mode if in history view or no visible data
              >
                <Ban className="h-6 w-6 text-red-600" />
                <span className="text-sm font-medium text-red-800">
                  Annuler
                </span>
              </button>
            ) : (
              // Disable "Modifier" if there is no visible data
              <button
                type="button"
                onClick={() => setIsEditMode(true)}
                className={`p-2 pl-4 ${
                  isHistory && "cursor-not-allowed"
                } rounded-lg flex items-center gap-2 transition-all ${
                  isEditMode ? "" : "hover:bg-blue-50 hover:-translate-y-0.5"
                }`}
                disabled={isEditMode || isHistory || !hasVisibleData} // Cannot enter edit mode if already editing, viewing history, or no visible data
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
                !isEditMode || isHistory || !hasVisibleData // Disable if not in edit mode, in history, OR if no visible data to save
                  ? "bg-gray-200 cursor-not-allowed"
                  : "hover:bg-green-50 hover:-translate-y-0.5"
              } `}
              disabled={!isEditMode || isHistory || !hasVisibleData} // Disabled unless in edit mode and not history, and there's visible data
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
                    // Changed to fr-FR for locale consistency
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
          {visibleFieldConfigs.map(({ key, label }) => (
            <motion.div
              key={key}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 transition-all hover:shadow-md"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-800">{label}</h2>
              </div>
              <input
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

              {/* Errors for top-level fields */}
              {errors[key] && errors[key].message && (
                <p className="text-red-500 text-sm mt-2">
                  {errors[key].message}
                </p>
              )}
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
          Aucun antécédent familial enregistré ou visible pour ce dossier.
        </motion.div>
      )}
    </motion.form>
  );
}
