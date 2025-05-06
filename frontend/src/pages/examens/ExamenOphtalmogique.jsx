import instance from "@/auth/AxiosInstance";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { ArrowLeft, Edit, Save } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";
export default function ExamenOphtalmogique() {
  const [isEditMode, setIsEditMode] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const fetchData = async () => {
    try {
      const response = await instance.get(
        `/api/jockey/${id}/examen-ophtalmogique`
      );
      reset({
        id: response.data.id,
        paupieresEtCorneesNormale:
          response.data.paupieresEtCorneesNormale || "",
        odCorrige: response.data.odCorrige || "",
        odNonCorrige: response.data.odNonCorrige || "",
        ogCorrige: response.data.ogCorrige || "",
        ogNonCorrige: response.data.ogNonCorrige || "",
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, [id]);

  const onSubmit = (data) => {
    console.log(errors);

    console.log(data);
    handleSave(data);
    setIsEditMode(false);
  };

  const handleToggle = (field, value) => {
    setValue(field, value); // React Hook Form function to update form field
  };

  const examenPleuroPulmonaireSchema = z.object({
    id: z.number().optional(),
    odCorrige: z.string(),
    odNonCorrige: z.string(),
    ogCorrige: z.string(),
    ogNonCorrige: z.string(),
    paupieresEtCorneesNormale: z.string(),
  });

  const {
    handleSubmit,
    formState: { errors },
    register,
    setValue,
    watch,
    reset,
  } = useForm({
    resolver: zodResolver(examenPleuroPulmonaireSchema),
    defaultValues: {
      odCorrige: "",
      odNonCorrige: "",
      ogCorrige: "",
      ogNonCorrige: "",
      paupieresEtCorneesNormale: "",
    },
  });
  console.log(errors);

  const handleSave = async (data) => {
    await instance.put(`/api/jockey/${id}/examen-ophtalmogique`, data);
    fetchData();
    setIsEditMode(false);

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
  } else {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="p-6 min-h-screen bg-gradient-to-b from-blue-50 to-indigo-50"
      >
        {/* Header Section */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft className="h-6 w-6 text-gray-700" />
          </button>
          <h1 className="text-2xl font-bold text-gray-800">
            Examen CardioVasculaire
          </h1>
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
              <span className="text-sm font-medium text-blue-800">
                Modifier
              </span>
            </button>

            <button
              onClick={handleSubmit(onSubmit)}
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

        {/* Conditions Container */}
        {/* Conditions Container */}
        <div className="space-y-6">
          {/* Paupières et cornées normales - boolean-like string field */}
          {/* Paupières et cornées normales - boolean-like string field */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 transition-all hover:shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-800">
                Paupières et cornées normales
              </h2>
            </div>
            <div className="flex gap-2">
              <button
                disabled={!isEditMode}
                onClick={() =>
                  handleToggle("paupieresEtCorneesNormale", "true")
                }
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  watch("paupieresEtCorneesNormale") === "true"
                    ? "bg-green-500 text-white shadow-inner"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                } ${!isEditMode ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                Oui
              </button>
              <button
                disabled={!isEditMode}
                onClick={() =>
                  handleToggle("paupieresEtCorneesNormale", "false")
                }
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  watch("paupieresEtCorneesNormale") === "false"
                    ? "bg-red-500 text-white shadow-inner"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                } ${!isEditMode ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                Non
              </button>
            </div>
            {errors.paupieresEtCorneesNormale && (
              <p className="text-red-500 text-sm mt-2">
                {errors.paupieresEtCorneesNormale.message}
              </p>
            )}
          </div>

          {/* OD corrigé */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 transition-all hover:shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-800">
                OD Corrigé
              </h2>
            </div>
            <input
              {...register("odCorrige")}
              placeholder="Ex: 10/10"
              disabled={!isEditMode}
              className={`w-full px-4 py-3 border ${
                isEditMode ? "border-blue-200" : "border-gray-200"
              } rounded-lg focus:outline-none focus:ring-2 ${
                isEditMode ? "focus:ring-blue-300" : "focus:ring-gray-300"
              } transition-all ${
                !isEditMode ? "bg-gray-50 cursor-not-allowed" : ""
              }`}
            />
            {errors.odCorrige && (
              <p className="text-red-500 text-sm mt-2">
                {errors.odCorrige.message}
              </p>
            )}
          </div>

          {/* OD non corrigé */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 transition-all hover:shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-800">
                OD Non Corrigé
              </h2>
            </div>
            <input
              {...register("odNonCorrige")}
              placeholder="Ex: 8/10"
              disabled={!isEditMode}
              className={`w-full px-4 py-3 border ${
                isEditMode ? "border-blue-200" : "border-gray-200"
              } rounded-lg focus:outline-none focus:ring-2 ${
                isEditMode ? "focus:ring-blue-300" : "focus:ring-gray-300"
              } transition-all ${
                !isEditMode ? "bg-gray-50 cursor-not-allowed" : ""
              }`}
            />
            {errors.odNonCorrige && (
              <p className="text-red-500 text-sm mt-2">
                {errors.odNonCorrige.message}
              </p>
            )}
          </div>

          {/* OG corrigé */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 transition-all hover:shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-800">
                OG Corrigé
              </h2>
            </div>
            <input
              {...register("ogCorrige")}
              placeholder="Ex: 10/10"
              disabled={!isEditMode}
              className={`w-full px-4 py-3 border ${
                isEditMode ? "border-blue-200" : "border-gray-200"
              } rounded-lg focus:outline-none focus:ring-2 ${
                isEditMode ? "focus:ring-blue-300" : "focus:ring-gray-300"
              } transition-all ${
                !isEditMode ? "bg-gray-50 cursor-not-allowed" : ""
              }`}
            />
            {errors.ogCorrige && (
              <p className="text-red-500 text-sm mt-2">
                {errors.ogCorrige.message}
              </p>
            )}
          </div>

          {/* OG non corrigé */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 transition-all hover:shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-800">
                OG Non Corrigé
              </h2>
            </div>
            <input
              {...register("ogNonCorrige")}
              placeholder="Ex: 7/10"
              disabled={!isEditMode}
              className={`w-full px-4 py-3 border ${
                isEditMode ? "border-blue-200" : "border-gray-200"
              } rounded-lg focus:outline-none focus:ring-2 ${
                isEditMode ? "focus:ring-blue-300" : "focus:ring-gray-300"
              } transition-all ${
                !isEditMode ? "bg-gray-50 cursor-not-allowed" : ""
              }`}
            />
            {errors.ogNonCorrige && (
              <p className="text-red-500 text-sm mt-2">
                {errors.ogNonCorrige.message}
              </p>
            )}
          </div>
        </div>
      </motion.div>
    );
  }
}
