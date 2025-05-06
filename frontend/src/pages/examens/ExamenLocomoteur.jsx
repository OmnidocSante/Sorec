import instance from "@/auth/AxiosInstance";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { ArrowLeft, Edit, Save } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";

export default function ExamenLocomoteur() {
  const [isEditMode, setIsEditMode] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);

  const paramLocSchema = z.object({
    id: z.number(),
    parametre: z.object({ id: z.number(), nom: z.string() }),
    observations: z.string(),
    hasCondition: z.string().optional(),
  });
  const examenLocomoteurSchema = z.object({
    id: z.number(),
    parametresExamenLocomoteurs: z.array(paramLocSchema),
    forceHanche: z.string(),
    forceGenoux: z.string(),
    forceCheville: z.string(),
    souplesseMusculaire: z.string(),
    forceTendons: z.string(),
    forceEpaule: z.string(),
    forceCoude: z.string(),
    forcePoignet: z.string(),
  });

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

  const fetchData = async () => {
    try {
      const res = await instance.get(`/api/jockey/${id}/examen-locomoteur`);
      const data = res.data;
      data.parametresExamenLocomoteurs = data.parametresExamenLocomoteurs.map(
        (p) => ({
          ...p,
          observations: p.observations ?? "",
          hasCondition: p.hasCondition ?? false,
        })
      );
      [
        "forceHanche",
        "forceGenoux",
        "forceCheville",
        "souplesseMusculaire",
        "forceTendons",
        "forceEpaule",
        "forceCoude",
        "forcePoignet",
      ].forEach((k) => (data[k] = data[k] ?? ""));
      reset(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const handleToggle = (index, value) => {
    console.log(value);

    setValue(`parametresExamenLocomoteurs.${index}.hasCondition`, value, {
      shouldDirty: true,
    });
  };

  const onSubmit = async (data) => {
    // convert boolean hasCondition to string
    const payload = {
      ...data,
      parametresExamenLocomoteurs: data.parametresExamenLocomoteurs.map(
        (p) => ({
          ...p,
          hasCondition: p.hasCondition.toString(),
        })
      ),
    };
    try {
      await instance.put(`/api/jockey/${id}/examen-locomoteur`, payload);
      setIsEditMode(false);
      fetchData();
    } catch (err) {
      console.error(err);
    }
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

  return (
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="p-6 min-h-screen bg-gradient-to-b from-blue-50 to-indigo-50"
    >
      <div className="flex items-center justify-between mb-8">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ArrowLeft className="h-6 w-6 text-gray-700" />
        </button>
        <h1 className="text-2xl font-bold text-gray-800">Examen Locomoteur</h1>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => setIsEditMode(true)}
            disabled={isEditMode}
            className={`p-2 pl-4 rounded-lg flex items-center gap-2 transition-all ${
              isEditMode
                ? "bg-gray-200 cursor-not-allowed"
                : "hover:bg-blue-50 hover:-translate-y-0.5"
            }`}
          >
            <Edit className="h-6 w-6 text-blue-600" />
            <span className="text-sm font-medium text-blue-800">Modifier</span>
          </button>
          <button
            type="submit"
            disabled={!isEditMode}
            className={`p-2 pl-4 rounded-lg flex items-center gap-2 transition-all ${
              !isEditMode
                ? "bg-gray-200 cursor-not-allowed"
                : "hover:bg-green-50 hover:-translate-y-0.5"
            }`}
          >
            <Save className="h-6 w-6 text-green-600" />
            <span className="text-sm font-medium text-green-800">
              Enregistrer
            </span>
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {fields.map((field, idx) => (
          <div
            key={field.id}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 transition-all hover:shadow-md"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-800">
                {field.parametre.nom.replace(/_/g, " ")}
              </h2>
            </div>
            <textarea
              {...register(`parametresExamenLocomoteurs.${idx}.observations`)}
              placeholder="Observations..."
              disabled={!isEditMode}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all resize-none"
            />
            {errors.parametresExamenLocomoteurs?.[idx]?.observations && (
              <p className="text-red-500 text-sm mt-2">
                {errors.parametresExamenLocomoteurs[idx].observations.message}
              </p>
            )}
            <div className="flex gap-2 mt-2">
              <button
                disabled={!isEditMode}
                type="button"
                onClick={() => handleToggle(idx, "true")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  allValues.parametresExamenLocomoteurs[idx].hasCondition ===
                  "true"
                    ? "bg-green-500 text-white shadow-inner"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                } ${!isEditMode ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                Oui
              </button>
              <button
                disabled={!isEditMode}
                type="button"
                onClick={() => handleToggle(idx, "false")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  allValues.parametresExamenLocomoteurs[idx].hasCondition ===
                  "false"
                    ? "bg-red-500 text-white shadow-inner"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                } ${!isEditMode ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                Non
              </button>
            </div>
          </div>
        ))}

        {/* Strength fields */}
        {[
          { key: "forceHanche", label: "Force Hanche" },
          { key: "forceGenoux", label: "Force Genoux" },
          { key: "forceCheville", label: "Force Cheville" },
          { key: "souplesseMusculaire", label: "Souplesse Musculaire" },
          { key: "forceTendons", label: "Force Tendons" },
          { key: "forceEpaule", label: "Force Epaule" },
          { key: "forceCoude", label: "Force Coude" },
          { key: "forcePoignet", label: "Force Poignet" },
        ].map(({ key, label }) => (
          <div
            key={key}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 transition-all hover:shadow-md"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-800">{label}</h2>
            </div>
            <input
              type="text"
              {...register(key)}
              placeholder={label + "..."}
              disabled={!isEditMode}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all"
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
