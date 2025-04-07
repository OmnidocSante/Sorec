import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import instance from "@/auth/AxiosInstance";
import { useAtom } from "jotai";
import { usersAtom } from "@/main";

const Role = {
  MEDECIN: "MEDECIN",
  USER: "USER",
  JOCKEY: "JOCKEY",
};

const userSchema = z.object({
  nom: z.string().min(1, "Nom est requis"),
  prénom: z.string().min(1, "Prénom est requis"),
  sexe: z.enum(["M", "F"], { message: "Sexe doit être M ou F" }),
  dateNaissance: z.date().refine((date) => date < new Date(), {
    message: "La date doit être dans le passé",
  }),
  cinId: z
    .string()
    .regex(/^[A-Z]{1,2}\d{6}$/, "Format CIN invalide (ex: A123456)"),
  adresse: z.string().min(1, "Adresse est requise"),
  ville: z.string().min(1, "ville est requise"),
  telephone: z
    .string()
    .min(10, "Numéro de téléphone invalide")
    .max(10, "Numéro de téléphone invalide"),
  email: z.string().email("Email invalide"),
  sorecId: z.string().max(8, "SOREC ID doit avoir max 8 caractères"),
  password: z
    .string()
    .min(8, "Le mot de passe doit avoir au moins 8 caractères"),
  role: z.enum(["USER", "MEDECIN", "JOCKEY"], { message: "Rôle invalide" }),
});

export default function UserCreationTab() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(userSchema) });

  const [showAlert, setShowAlert] = useState(false);
  const [alertContent, setAlertContent] = useState({
    title: "",
    description: "",
  });

  const [, setUsers] = useAtom(usersAtom);

  const onSubmit = async (data) => {
    
    try {
      await instance.post("/api/users", data);
      await setUsers("REFRESH");

      setAlertContent({
        title: "succès",
        description: "utilisateur créé avec succès",
      });
      setShowAlert(true);
    } catch (error) {
      setAlertContent({
        title: "Erreur de connexion",
        description: error?.response?.data?.message || error.message,
      });
      setShowAlert(true);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow">
      <AnimatePresence>
        {showAlert && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="sm:mx-auto sm:w-full sm:max-w-md mb-4"
          >
            {alertContent.title === "Erreur de connexion" ? (
              <Alert className="text-red-500">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>{alertContent.title}</AlertTitle>
                <AlertDescription>{alertContent.description}</AlertDescription>
              </Alert>
            ) : (
              <Alert className="text-green-500">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>{alertContent.title}</AlertTitle>
                <AlertDescription>{alertContent.description}</AlertDescription>
              </Alert>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <h2 className="text-2xl font-bold text-bay-of-many-900 mb-6">
        Créer un Nouvel Utilisateur
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-bay-of-many-700 mb-1">Nom</label>
            <input
              {...register("nom")}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-bay-of-many-400"
            />
            {errors.nom && (
              <p className="text-red-600 text-sm">{errors.nom.message}</p>
            )}
          </div>

          <div>
            <label className="block text-bay-of-many-700 mb-1">Prénom</label>
            <input
              {...register("prénom")}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-bay-of-many-400"
            />
            {errors.prénom && (
              <p className="text-red-600 text-sm">{errors.prénom.message}</p>
            )}
          </div>

          <div>
            <label className="block text-bay-of-many-700 mb-1">Sexe</label>
            <select
              {...register("sexe")}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-bay-of-many-400"
            >
              <option value="M">Masculin</option>
              <option value="F">Féminin</option>
            </select>
            {errors.sexe && (
              <p className="text-red-600 text-sm">{errors.sexe.message}</p>
            )}
          </div>

          <div>
            <label className="block text-bay-of-many-700 mb-1">
              Date de Naissance
            </label>
            <input
              type="date"
              {...register("dateNaissance", { valueAsDate: true })}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-bay-of-many-400"
            />
            {errors.dateNaissance && (
              <p className="text-red-600 text-sm">
                {errors.dateNaissance.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-bay-of-many-700 mb-1">CIN</label>
            <input
              {...register("cinId")}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-bay-of-many-400"
            />
            {errors.cinId && (
              <p className="text-red-600 text-sm">{errors.cinId.message}</p>
            )}
          </div>

          <div>
            <label className="block text-bay-of-many-700 mb-1">Téléphone</label>
            <input
              type="tel"
              {...register("telephone")}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-bay-of-many-400"
            />
            {errors.telephone && (
              <p className="text-red-600 text-sm">{errors.telephone.message}</p>
            )}
          </div>

          <div className="md:col-span-2">
            <label className="block text-bay-of-many-700 mb-1">Email</label>
            <input
              type="email"
              {...register("email")}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-bay-of-many-400"
            />
            {errors.email && (
              <p className="text-red-600 text-sm">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block text-bay-of-many-700 mb-1">SOREC ID</label>
            <input
              {...register("sorecId")}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-bay-of-many-400"
            />
            {errors.sorecId && (
              <p className="text-red-600 text-sm">{errors.sorecId.message}</p>
            )}
          </div>

          <div>
            <label className="block text-bay-of-many-700 mb-1">ville</label>
            <input
              {...register("ville")}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-bay-of-many-400"
            />
            {errors.ville && (
              <p className="text-red-600 text-sm">{errors.ville.message}</p>
            )}
          </div>

          <div>
            <label className="block text-bay-of-many-700 mb-1">adresse</label>
            <input
              {...register("adresse")}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-bay-of-many-400"
            />
            {errors.adresse && (
              <p className="text-red-600 text-sm">{errors.adresse.message}</p>
            )}
          </div>

          <div>
            <label className="block text-bay-of-many-700 mb-1">Rôle</label>
            <select
              {...register("role")}
              className="w-full p-2  border rounded focus:ring-2 focus:ring-bay-of-many-400"
            >
              {Object.values(Role).map((role) => (
                <option key={role} value={role.toUpperCase()}>
                  {role.toLowerCase()}
                </option>
              ))}
            </select>
            {errors.role && (
              <p className="text-red-600 text-sm">{errors.role.message}</p>
            )}
          </div>

          <div className="md:col-span-2">
            <label className="block text-bay-of-many-700 mb-1">
              Mot de passe
            </label>
            <input
              type="password"
              {...register("password")}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-bay-of-many-400"
            />
            {errors.password && (
              <p className="text-red-600 text-sm">{errors.password.message}</p>
            )}
          </div>
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex justify-center py-2 px-4 rounded-md shadow-sm text-sm font-medium text-white bg-bay-of-many-600 hover:bg-bay-of-many-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-bay-of-many-500"
        >
          {isSubmitting
            ? "Création d'utilisateur en cours..."
            : "Créer Utilisateur"}
        </Button>
      </form>
    </div>
  );
}
