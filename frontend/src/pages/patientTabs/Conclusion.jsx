import instance from "@/auth/AxiosInstance";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { ArrowLeft, Edit, Save } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";

export default function Conclusion() {
  const [isEditMode, setIsEditMode] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);

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

  const fetchData = async () => {
    try {
      const response = await instance.get(`/api/jockey/${id}/conclusion`);
      reset({
        id: response.data.id,
        cardioVasculaire: response.data.cardioVasculaire ?? null,
        pleuropulmonaire: response.data.pleuropulmonaire ?? null,
        ophtalmique: response.data.ophtalmique ?? null,
        auditif: response.data.auditif ?? null,
        neurologique: response.data.neurologique ?? null,
        abdominal: response.data.abdominal ?? null,
        urogénital: response.data.urogénital ?? null,
        paraclinique: response.data.paraclinique ?? null,
      });
    } catch (err) {
      console.error("Error fetching Conclusion:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const handleToggle = (fieldName, value) => {
    setValue(fieldName, value ? "true" : "false", {
      shouldValidate: true,
    });
  };

  const handleSave = async (data) => {
    console.log(data);

    try {
      await instance.put(`/api/jockey/${id}/conclusion`, data);
      fetchData();
      setIsEditMode(false);
    } catch (err) {
      console.error("Error saving Conclusion:", err);
    }
  };

  const onSubmit = (data) => handleSave(data);

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

  return (
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="p-6 min-h-screen bg-gradient-to-b from-blue-50 to-indigo-50"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ArrowLeft className="h-6 w-6 text-gray-700" />
        </button>
        <h1 className="text-2xl font-bold text-gray-800">
          Conclusion Médicale
        </h1>
        <div className="flex gap-3">
          <button
            type="button"
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
            type="submit"
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

      {/* Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {[
          { key: "cardioVasculaire", label: "Cardiovasculaire" },
          { key: "pleuropulmonaire", label: "Pleuropulmonaire" },
          { key: "ophtalmique", label: "Ophtalmique" },
          { key: "auditif", label: "Auditif" },
          { key: "neurologique", label: "Neurologique" },
          { key: "abdominal", label: "Abdominal" },
          { key: "urogénital", label: "Urogénital" },
          { key: "paraclinique", label: "Paraclinique" },
        ].map(({ key, label }) => (
          <div
            key={key}
            className="h-full bg-white rounded-xl shadow-sm border border-gray-200 p-6 transition-all hover:shadow-md"
          >
            <div className="flex flex-col h-full justify-between">
              <div className="mb-4">
                <h2 className="text-lg font-semibold text-gray-800"> Examen {label}</h2>
              </div>

              <div className="flex flex-col gap-4">
                <div className="flex gap-4">
                  <button
                    type="button"
                    disabled={!isEditMode}
                    onClick={() => handleToggle(key, true)}
                    className={`w-full px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      watch(key) === "true"
                        ? "bg-green-500 text-white shadow-inner"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    } ${!isEditMode ? "opacity-50 cursor-not-allowed" : ""}`}
                  >
                    Favorable
                  </button>
                  <button
                    type="button"
                    disabled={!isEditMode}
                    onClick={() => handleToggle(key, false)}
                    className={`w-full px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      watch(key) === "false"
                        ? "bg-red-500 text-white shadow-inner"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    } ${!isEditMode ? "opacity-50 cursor-not-allowed" : ""}`}
                  >
                    Non-Favorable
                  </button>
                </div>
                {errors[key] && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors[key].message}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.form>
  );
}
