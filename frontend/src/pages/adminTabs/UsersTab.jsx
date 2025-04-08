import { useAtom } from "jotai";
import { usersAtom } from "@/main";
import { useState } from "react";
import instance from "@/auth/AxiosInstance";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { motion, AnimatePresence } from "framer-motion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, AlertCircleIcon } from "lucide-react";

const userFormSchema = z.object({
  email: z.string().email("Email invalide"),

  role: z.enum(["MEDECIN", "JOCKEY", "USER"]),
  sexe: z.enum(["M", "F"]),
  ville: z.string().min(1, "L'ville est requise"),
});

export default function UsersTab() {
  const [users, setUsers] = useAtom(usersAtom);
  const [alertContent, setAlertContent] = useState(null);

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm({
    resolver: zodResolver(userFormSchema),
  });

  const handleEditClick = (user) => {
    setCurrentUser(user);
    setValue("email", user.email);
    setValue("role", user.role);
    setValue("sexe", user.sexe);
    setValue("ville", user.ville);
    setValue("adresse", user.adresse);
    setIsEditDialogOpen(true);
  };

  const handleCloseClick = (user) => {
    setCurrentUser(user);
    setIsDeleteDialogOpen(true);
  };

  const onSubmit = async (data) => {
    try {
      await instance.patch(`/api/users/${currentUser.id}`, data);
      setUsers("REFRESH");
      setAlertContent({
        status: "success",
        content: "utilisateur avec succès",
      });
      setTimeout(() => {
        setAlertContent(null);
        setIsEditDialogOpen(false);
      }, 2000);
    } catch (error) {
      console.error("Error updating user:", error);

      setAlertContent({
        status: "error",
        content: error?.response?.data?.message || error.message,
      });
      setTimeout(() => {
        setAlertContent(null);
        setIsEditDialogOpen(false);
      }, 2000);
    }
  };

  const handleCloseConfirm = async () => {
    try {
      await instance.delete(`/api/users/${currentUser.id}`);
      setAlertContent({
        status: "success",
        content: "utilisateur supprimé avec succés",
      });
      setTimeout(() => {
        setUsers("REFRESH");
        setAlertContent(null);
        setIsDeleteDialogOpen(false);
      }, 3000);
    } catch (error) {
      setAlertContent({
        status: "error",
        content: error?.response?.data?.message || error.message,
      });
      setTimeout(() => {
        setAlertContent(null);
        setIsDeleteDialogOpen(false);
      }, 3000);
    }
  };

  return (
    <div className="min-h-full p-6">
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-bold text-bay-of-many-900 mb-6"
      >
        Gestion des Utilisateurs
      </motion.h1>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-lg shadow overflow-hidden border border-bay-of-many-200"
      >
        <table className="w-full">
          <thead className="bg-bay-of-many-50">
            <tr>
              <th className="p-3 text-left text-bay-of-many-700 font-medium">
                Nom
              </th>
              <th className="p-3 text-left text-bay-of-many-700 font-medium">
                Rôle
              </th>
              <th className="p-3 text-left text-bay-of-many-700 font-medium">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {users.length > 0 ? (
                users.map((user) => (
                  <motion.tr
                    key={user.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="border-b border-bay-of-many-100 hover:bg-bay-of-many-50"
                  >
                    <td className="p-3 text-bay-of-many-800">
                      {user.nom + " " + user.prénom}
                    </td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          user.role === "MEDECIN"
                            ? "bg-bay-of-many-100 text-bay-of-many-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {user.role.toLowerCase()}
                      </span>
                    </td>
                    <td className="p-3 space-x-2">
                      <Dialog
                        open={isEditDialogOpen && currentUser?.id === user.id}
                        onOpenChange={setIsEditDialogOpen}
                      >
                        <DialogTrigger asChild>
                          <motion.button
                            onClick={() => handleEditClick(user)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="text-bay-of-many-600 hover:text-bay-of-many-800 text-sm"
                          >
                            Modifier
                          </motion.button>
                        </DialogTrigger>
                        <DialogContent className="bg-white p-6 rounded-lg shadow-lg border border-bay-of-many-200 max-w-[600px]">
                          <AnimatePresence>
                            {alertContent && (
                              <motion.div
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="mt-5"
                              >
                                <Alert
                                  className={`${
                                    alertContent.status === "error"
                                      ? "text-red-500"
                                      : "text-green-500"
                                  }`}
                                >
                                  <AlertCircleIcon className="size-4" />
                                  <AlertTitle>Erreur</AlertTitle>
                                  <AlertDescription>
                                    {alertContent.content}
                                  </AlertDescription>
                                </Alert>
                              </motion.div>
                            )}
                          </AnimatePresence>

                          <DialogHeader>
                            <DialogTitle className="text-xl font-bold text-bay-of-many-900">
                              Modifier l'utilisateur
                            </DialogTitle>
                            <DialogDescription className="text-bay-of-many-600">
                              Modifier les détails de {user.nom} {user.prénom}
                            </DialogDescription>
                          </DialogHeader>

                          <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="space-y-4 mt-4"
                          >
                            <div>
                              <label className="block text-sm font-medium text-bay-of-many-700 mb-1">
                                Email
                              </label>
                              <input
                                {...register("email")}
                                className="w-full p-2 border border-bay-of-many-300 rounded-md focus:ring-2 focus:ring-bay-of-many-400 focus:border-transparent"
                              />
                              {errors.email && (
                                <p className="text-red-500 text-sm mt-1">
                                  {errors.email.message}
                                </p>
                              )}
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-bay-of-many-700 mb-1">
                                  Rôle
                                </label>
                                <select
                                  {...register("role")}
                                  className="w-full p-2 border border-bay-of-many-300 rounded-md focus:ring-2 focus:ring-bay-of-many-400 focus:border-transparent"
                                >
                                  <option value="MEDECIN">Médecin</option>
                                  <option value="JOCKEY">Jockey</option>
                                  <option value="USER">
                                    Utilisateur de consultation
                                  </option>
                                </select>
                                {errors.role && (
                                  <p className="text-red-500 text-sm mt-1">
                                    {errors.role.message}
                                  </p>
                                )}
                              </div>

                              <div>
                                <label className="block text-sm font-medium text-bay-of-many-700 mb-1">
                                  Sexe
                                </label>
                                <select
                                  {...register("sexe")}
                                  className="w-full p-2 border border-bay-of-many-300 rounded-md focus:ring-2 focus:ring-bay-of-many-400 focus:border-transparent"
                                >
                                  <option value="M">Masculin</option>
                                  <option value="F">Féminin</option>
                                </select>
                                {errors.sexe && (
                                  <p className="text-red-500 text-sm mt-1">
                                    {errors.sexe.message}
                                  </p>
                                )}
                              </div>
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-bay-of-many-700 mb-1">
                                Ville
                              </label>
                              <input
                                {...register("ville")}
                                className="w-full p-2 border border-bay-of-many-300 rounded-md focus:ring-2 focus:ring-bay-of-many-400 focus:border-transparent"
                              />
                              {errors.ville && (
                                <p className="text-red-500 text-sm mt-1">
                                  {errors.ville.message}
                                </p>
                              )}
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-bay-of-many-700 mb-1">
                                Adresse
                              </label>
                              <input
                                {...register("adresse")}
                                className="w-full p-2 border border-bay-of-many-300 rounded-md focus:ring-2 focus:ring-bay-of-many-400 focus:border-transparent"
                              />
                              {errors.adresse && (
                                <p className="text-red-500 text-sm mt-1">
                                  {errors.adresse.message}
                                </p>
                              )}
                            </div>
                            <DialogFooter className="mt-6">
                              <motion.button
                                type="button"
                                onClick={() => setIsEditDialogOpen(false)}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="px-4 py-2 border border-bay-of-many-300 rounded-md hover:bg-bay-of-many-50 transition-colors"
                              >
                                Annuler
                              </motion.button>
                              <motion.button
                                type="submit"
                                disabled={isSubmitting}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="px-4 py-2 bg-bay-of-many-600 text-white rounded-md hover:bg-bay-of-many-700 transition-colors disabled:opacity-50"
                              >
                                {isSubmitting
                                  ? "Enregistrement..."
                                  : "Enregistrer"}
                              </motion.button>
                            </DialogFooter>
                          </form>
                        </DialogContent>
                      </Dialog>
                      <Dialog
                        open={isDeleteDialogOpen && currentUser?.id === user.id}
                        onOpenChange={setIsDeleteDialogOpen}
                      >
                        <DialogTrigger asChild>
                          <motion.button
                            onClick={() => handleCloseClick(user)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="text-red-500 hover:text-red-800 text-sm"
                          >
                            Supprimer
                          </motion.button>
                        </DialogTrigger>
                        <DialogContent className="bg-white p-6 rounded-lg shadow-lg border border-bay-of-many-200 max-w-[600px]">
                          <AnimatePresence>
                            {alertContent && (
                              <motion.div
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="mt-5"
                              >
                                <Alert
                                  className={`${
                                    alertContent.status === "error"
                                      ? "text-red-500"
                                      : "text-green-500"
                                  }`}
                                >
                                  <AlertCircleIcon className="size-4" />
                                  <AlertTitle>Erreur</AlertTitle>
                                  <AlertDescription>
                                    {alertContent.content}
                                  </AlertDescription>
                                </Alert>
                              </motion.div>
                            )}
                          </AnimatePresence>
                          <DialogHeader>
                            <DialogTitle className="text-xl font-bold text-bay-of-many-900">
                              Confirmation de suppression
                            </DialogTitle>
                            <DialogDescription className="text-bay-of-many-600">
                              Vous êtes sur le point de supprimer {user.nom}
                              {user.prénom}
                            </DialogDescription>
                          </DialogHeader>
                          Êtes-vous sûr de vouloir continuer ?
                          <DialogFooter>
                            <motion.button
                              type="submit"
                              disabled={isSubmitting}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              className="px-4 py-2 w-fit bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors disabled:opacity-50"
                              onClick={handleCloseConfirm}
                            >
                              {isSubmitting
                                ? "Suppression en cours..."
                                : "Confirmer la suppression"}
                            </motion.button>
                            <motion.button
                              type="button"
                              onClick={() => setIsDeleteDialogOpen(false)}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              className="px-4 py-2 border border-bay-of-many-300 rounded-md hover:bg-bay-of-many-50 transition-colors"
                            >
                              Annuler
                            </motion.button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </td>
                  </motion.tr>
                ))
              ) : (
                <motion.tr
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-4"
                >
                  <td
                    colSpan={3}
                    className="text-center text-bay-of-many-600 py-4"
                  >
                    Aucun utilisateur n'est trouvé
                  </td>
                </motion.tr>
              )}
            </AnimatePresence>
          </tbody>
        </table>
      </motion.div>
    </div>
  );
}
