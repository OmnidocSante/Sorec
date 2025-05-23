import instance from "@/auth/AxiosInstance";
import useUser from "@/auth/useUser";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { ArrowLeft, Ban, Edit, Plus, Save, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";

const medicationSchema = z.object({
  medicament: z.string().min(1, "Required"),
  dose: z.string().min(1, "Required"),
  causeDuTraitement: z.string().min(1, "Required"),
});

export default function Medications() {
  const user = useUser();

  const [isEditMode, setIsEditMode] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [existingMedications, setExistingMedications] = useState([]);
  const [toDelete, setToDelete] = useState([]);

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(
      z.object({
        medications: z.array(medicationSchema),
      })
    ),
    defaultValues: {
      medications: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "medications",
  });

  const fetchData = async () => {
    try {
      const response = await instance.get(`/api/jockey/${id}/medication`);
      setExistingMedications(response.data);
    } catch (err) {
      navigate("/unauthorized");

      console.error("Error fetching medications:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const handleSave = async (formData) => {
    try {
      await Promise.all(
        toDelete.map((medicationId) =>
          instance.delete(`/api/jockey/${id}/medication/${medicationId}`)
        )
      );

      if (formData.medications.length > 0) {
        await instance.post(
          `/api/jockey/${id}/medication`,
          formData.medications
        );
      }

      await fetchData();
      setIsEditMode(false);
      reset({ medications: [] });
      setToDelete([]);
    } catch (err) {
      console.error("Error saving medications:", err);
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
            Chargement des médicaments...
          </p>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.form
      onSubmit={handleSubmit(handleSave)}
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
          Gestion des Médicaments
        </h1>
        {user.role === "MEDECIN" && (
          <div className="flex gap-3">
            {isEditMode ? (
              <>
                <button
                  type="button"
                  onClick={() => setIsEditMode(false)}
                  className={`p-2 pl-4 rounded-lg flex items-center gap-2 transition-all `}
                >
                  <>
                    <Ban className="h-6 w-6 text-red-600" />
                    <span className="text-sm font-medium text-red-800">
                      Annuler
                    </span>
                  </>
                </button>
              </>
            ) : (
              <>
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
                  {existingMedications.length > 0 ? (
                    <>
                      <Edit className="h-6 w-6 text-blue-600" />
                      <span className="text-sm font-medium text-blue-800">
                        Modifier
                      </span>
                    </>
                  ) : (
                    <>
                      <Plus className="h-6 w-6 text-green-600" />
                      <span className="text-sm font-medium text-green-800">
                        Ajouter
                      </span>
                    </>
                  )}
                </button>
              </>
            )}

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
        )}
      </div>

      {/* Existing Medications */}
      <div className="space-y-6 mb-12">
        {existingMedications
          .filter((med) => !toDelete.includes(med.id))
          .map((medication) => (
            <div
              key={medication.id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 transition-all hover:shadow-md"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-800">
                  {medication.medicament}
                </h2>
                {isEditMode && (
                  <button
                    type="button"
                    onClick={() => setToDelete([...toDelete, medication.id])}
                    className="p-2 hover:bg-red-50 rounded-full transition-colors"
                  >
                    <Trash className="h-5 w-5 text-red-600" />
                  </button>
                )}
              </div>
              <div className="space-y-2">
                <p className="text-gray-600">
                  <span className="font-medium">Dose:</span> {medication.dose}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Raison:</span>{" "}
                  {medication.causeDuTraitement}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Docteur</span>{" "}
                  {medication.medecin.user.nom} {medication.medecin.user.prénom}
                </p>
              </div>
            </div>
          ))}
      </div>
      {existingMedications.length == 0 && !isEditMode && (
        <div className="w-full p-4 bg-white   text-blue-600 hover:text-blue-700">
          <div className="flex items-center justify-center gap-2">
            <span className="font-medium">
              {user.role === "MEDECIN"
                ? "Aucun médicament n’a encore été attribué. Cliquez sur « + » pour en ajouter un."
                : "Aucun médicament n’a encore été attribué. "}
            </span>
          </div>
        </div>
      )}

      {/* New Medications Form */}
      {isEditMode && (
        <div className="space-y-6">
          {fields.map((field, index) => (
            <motion.div
              key={field.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-sm border border-blue-200 p-6"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  Nouveau Médicament
                </h3>
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="p-2 hover:bg-red-50 rounded-full transition-colors"
                >
                  <Trash className="h-5 w-5 text-red-600" />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <input
                    {...register(`medications.${index}.medicament`)}
                    placeholder="Nom du médicament..."
                    className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all"
                  />
                  {errors.medications?.[index]?.medicament && (
                    <p className="text-red-500 text-sm mt-2">
                      {errors.medications[index].medicament.message}
                    </p>
                  )}
                </div>
                <div>
                  <input
                    {...register(`medications.${index}.dose`)}
                    placeholder="Dosage..."
                    className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all"
                  />
                  {errors.medications?.[index]?.dose && (
                    <p className="text-red-500 text-sm mt-2">
                      {errors.medications[index].dose.message}
                    </p>
                  )}
                </div>
                <div>
                  <input
                    {...register(`medications.${index}.causeDuTraitement`)}
                    placeholder="Raison du traitement..."
                    className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all"
                  />
                  {errors.medications?.[index]?.causeDuTraitement && (
                    <p className="text-red-500 text-sm mt-2">
                      {errors.medications[index].causeDuTraitement.message}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}

          <button
            type="button"
            onClick={() =>
              append({ medicament: "", dose: "", causeDuTraitement: "" })
            }
            className="w-full p-4 bg-white border-2 border-dashed border-blue-200 rounded-xl hover:border-blue-300 transition-colors text-blue-600 hover:text-blue-700"
          >
            <div className="flex items-center justify-center gap-2">
              <Plus className="h-5 w-5" />
              <span className="font-medium">Ajouter un médicament</span>
            </div>
          </button>
        </div>
      )}
    </motion.form>
  );
}
