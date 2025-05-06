import instance from "@/auth/AxiosInstance";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { ArrowLeft, Edit, Save } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";

export default function ExamenAbdominal() {
  const [isEditMode, setIsEditMode] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);

  const examAbdominaleSchema = z.object({
    id: z.number(),
    oropharynx: z.string().min(1, "Oropharynx est requis"),
    foie: z.string().min(1, "Foie est requis"),
    rate: z.string().min(1, "Rate est requise"),
    autres: z.string().min(1, "Autres observations sont requises"),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(examAbdominaleSchema),
    defaultValues: {
      id: 0,
      oropharynx: "",
      foie: "",
      rate: "",
      autres: "",
    },
  });

  const fetchData = async () => {
    try {
      const response = await instance.get(
        `/api/jockey/${id}/examen-abdominal`
      );
      reset({
        id: response.data.id,
        oropharynx: response.data.oropharynx ?? "",
        foie: response.data.foie ?? "",
        rate: response.data.rate ?? "",
        autres: response.data.autres ?? "",
      });
    } catch (err) {
      console.error("Error fetching ExamAbdominale:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const handleSave = async (data) => {
    try {
      await instance.put(`/api/jockey/${id}/examen-abdominal`, data);
      fetchData();
      setIsEditMode(false);
    } catch (err) {
      console.error("Error saving ExamAbdominale:", err);
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
        <h1 className="text-2xl font-bold text-gray-800">Examen Abdominale</h1>
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
      <div className="space-y-6">
        {[
          { key: "oropharynx", label: "Oropharynx" },
          { key: "foie", label: "Foie" },
          { key: "rate", label: "Rate" },
          { key: "autres", label: "Autres Observations" },
        ].map(({ key, label }) => (
          <div
            key={key}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 transition-all hover:shadow-md"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-800">{label}</h2>
            </div>
            <input
              {...register(key)}
              placeholder={label + "..."}
              disabled={!isEditMode}
              className={`w-full px-4 py-3 border ${
                isEditMode ? "border-blue-200" : "border-gray-200"
              } rounded-lg focus:outline-none focus:ring-2 ${
                isEditMode ? "focus:ring-blue-300" : "focus:ring-gray-300"
              } transition-all resize-none ${
                !isEditMode ? "bg-gray-50 cursor-not-allowed" : ""
              }`}
            />
            {errors[key] && (
              <p className="text-red-500 text-sm mt-2">{errors[key].message}</p>
            )}
          </div>
        ))}
      </div>
    </motion.form>
  );
}
