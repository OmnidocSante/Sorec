import instance from "@/auth/AxiosInstance";
import useUser from "@/auth/useUser";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Status } from "@/utils/enums";
import { zodResolver } from "@hookform/resolvers/zod";
import { format, parseISO } from "date-fns";
import { AnimatePresence, motion } from "framer-motion";
import {
  LayoutDashboard,
  User,
  HeartPulse,
  Stethoscope,
  Pill,
  ClipboardList,
  ChevronRight,
  Pencil,
  Brush,
  FileText,
  Camera,
  LogOut,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";

export default function PatientTab() {
  const user = useUser();

  const { id } = useParams();
  const navigate = useNavigate();
  const [jockey, setJockey] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [status, setStatus] = useState();
  const detailsSchema = z.object({
    plisDroit: z.number(),
    plisGauche: z.number(),
    matieresGrasses: z
      .number()
      .max(100, { message: "Le pourcentage ne peut pas dépasser 100%." }),
  });

  const {
    handleSubmit,
    formState: { errors },
    register,
    setValue,
  } = useForm({
    resolver: zodResolver(detailsSchema),
  });

  const fetchData = async () => {
    try {
      const [jockeyResponse, imageResponse] = await Promise.all([
        instance.get(`/api/jockey/${id}`),
        instance.get(`/api/jockey/${id}/image`, { responseType: "blob" }),
      ]);

      const jockeyData = jockeyResponse.data;

      if (imageResponse.status == 204) {
        setJockey({ ...jockeyData, image: null });
      } else {
        const imageData = URL.createObjectURL(imageResponse.data);
        setJockey({ ...jockeyData, image: imageData });
      }

      setValue("plisDroit", jockeyData.plisDroit);
      setValue("plisGauche", jockeyData.plisGauche);
      setValue("matieresGrasses", jockeyData.matieresGrasses);
    } catch (error) {
      console.error("Error fetching jockey data:", error);
      navigate("/unauthorized");
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);
  console.log(jockey);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const statusColor = {
    APTE: "bg-green-100 text-green-800",
    NON_APTE: "bg-red-100 text-red-800",
    EN_ATTENTE_DE_REEVALUATION: "bg-amber-100 text-amber-800",
    EXAMEN_ANNUEL_A_PREVOIR: "bg-blue-100 text-blue-800",
  };

  const onSubmit = async (data) => {
    await instance.patch(`/api/jockey/${id}`, data);
    setIsDialogOpen(false);
    fetchData();
  };

  const [isStatusDialogOpen, setIsStatusDialogOpen] = useState(false);

  const toggleStatus = async () => {
    try {
      await Promise.all([
        instance.patch(`/api/jockey/${id}/status`, { status }),
        instance.post(`/api/jockey/${id}/historique/status`, { status }),
      ]);

      fetchData();
      setIsStatusDialogOpen(false);
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const [isImageDialogOpen, setIsImageDialogOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleImageUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      await instance.patch(`/api/jockey/${id}/image`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const response = await instance.get(`/api/jockey/${id}/image`, {
        responseType: "blob",
      });

      if (response.status == 204) {
        setJockey({ ...jockey, image: null });
      } else {
        const imageData = URL.createObjectURL(response.data);
        setJockey({ ...jockey, image: imageData });
      }
      setIsImageDialogOpen(false);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };
  console.log("here");
  console.log(user);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  if (!jockey) {
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
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <motion.div
            className="w-12 h-12 border-4 border-bay-of-many-400 border-t-transparent rounded-full animate-spin"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          />
          <p className="text-bay-of-many-700 font-medium text-sm tracking-wide">
            Chargement du profil du jockey...
          </p>
        </motion.div>
      </motion.div>
    );
  } else {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="p-6 min-h-screen bg-bay-of-many-50"
      >
        {user.role == "MEDECIN" ? (
          <div className="w-full flex justify-end mb-8">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/medecin")}
              className="flex items-center gap-2 p-2 px-4 bg-gray-50 rounded-xl shadow-sm border border-bay-of-many-200 text-bay-of-many-600 hover:text-bay-of-many-800 transition-colors"
            >
              <LayoutDashboard className="w-5 h-5" />
              <span>Retour au tableau de bord</span>
            </motion.button>
          </div>
        ) : (
          <div className="w-full flex justify-end mb-8">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogout}
              className="flex items-center gap-2 p-2 px-4 bg-gray-50 rounded-xl shadow-sm border border-bay-of-many-200 text-bay-of-many-600 hover:text-bay-of-many-800 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span>Deconnexion</span>
            </motion.button>
          </div>
        )}

        <div className="flex flex-col md:flex-row gap-6 mb-8">
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
            className="bg-white p-6 rounded-xl shadow-md border border-bay-of-many-100 flex-1"
          >
            <div className="flex w-full items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-4">
                <div
                  className={`bg-bay-of-many-100 ${
                    jockey.image ?? "p-3"
                  }  rounded-full`}
                >
                  {jockey.image ? (
                    <img
                      src={jockey.image}
                      alt={`${jockey.nom} ${jockey.prénom}`}
                      className="w-24 h-24 rounded-full object-cover"
                    />
                  ) : (
                    <User className="w-6 h-6 text-bay-of-many-600" />
                  )}
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-bay-of-many-900">
                    {jockey.nom} {jockey.prénom}
                  </h1>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      statusColor[jockey.status]
                    }`}
                  >
                    {jockey.status}
                  </span>
                </div>
              </div>
              {user.role === "MEDECIN" && (
                <div className="space-x-4">
                  <Dialog
                    open={isStatusDialogOpen}
                    onOpenChange={setIsStatusDialogOpen}
                  >
                    <DialogTrigger onClick={() => setIsStatusDialogOpen(true)}>
                      <button className="px-4 py-2 bg-transparent border border-bay-of-many-600 text-bay-of-many-600 rounded-lg text-sm font-medium hover:bg-bay-of-many-300 duration-300 transition-all flex items-center justify-around gap-x-4">
                        <ClipboardList className="size-4" />
                        <p>Changement status du jockey</p>
                      </button>
                    </DialogTrigger>
                    <DialogContent className="bg-white">
                      <DialogHeader>
                        <DialogTitle>Modifier le statut du jockey</DialogTitle>
                        <div className="flex flex-col gap-4 mt-4">
                          <div className="flex flex-col gap-1">
                            <label
                              className="text-sm font-medium text-bay-of-many-600"
                              htmlFor="status"
                            >
                              Statut
                            </label>
                            <select
                              onChange={(e) => setStatus(e.target.value)}
                              id="status"
                              className="border border-bay-of-many-400 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-bay-of-many-600"
                              defaultValue={jockey.status}
                            >
                              {Status.map((status) => (
                                <option key={status.label} value={status.label}>
                                  {status.value}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </DialogHeader>
                      <DialogFooter className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                        <button
                          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-bay-of-many-500"
                          onClick={() => setIsStatusDialogOpen(false)}
                        >
                          Annuler
                        </button>
                        <button
                          className="px-4 py-2 text-sm font-medium text-white bg-bay-of-many-600 rounded-md hover:bg-bay-of-many-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-bay-of-many-500 disabled:opacity-50 disabled:cursor-not-allowed"
                          onClick={toggleStatus}
                        >
                          Confirmer
                        </button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                  <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger onClick={() => setIsDialogOpen(true)}>
                      <button className="px-4 py-2 bg-transparent border border-bay-of-many-600 text-bay-of-many-600 rounded-lg text-sm font-medium hover:bg-bay-of-many-300 duration-300 transition-all flex items-center justify-around gap-x-4">
                        <Pencil className="size-4" />
                        <p>Modifier les informations</p>
                      </button>
                    </DialogTrigger>
                    <DialogContent className="bg-white">
                      <DialogHeader>
                        <DialogTitle>Modifier les informations</DialogTitle>
                        <div className="flex flex-col gap-4 mt-4">
                          <div className="flex flex-col gap-1">
                            <label
                              className="text-sm font-medium text-bay-of-many-600"
                              htmlFor="plis-cutané-plisDroit"
                            >
                              Plis Cutané Droit (mm)
                            </label>
                            <input
                              {...register("plisDroit", {
                                valueAsNumber: true,
                              })}
                              id="plis-cutané-plisDroit"
                              type="number"
                              placeholder="Ex: 12.5"
                              className="border border-bay-of-many-400 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-bay-of-many-600"
                            />
                            {errors.plisDroit && (
                              <p className="text-red-600 text-sm">
                                {errors.plisDroit.message}
                              </p>
                            )}
                          </div>
                          <div className="flex flex-col gap-1">
                            <label
                              className="text-sm font-medium text-bay-of-many-600"
                              htmlFor="plis-cutané-plisGauche"
                            >
                              Plis Cutané Gauche (mm)
                            </label>
                            <input
                              {...register("plisGauche", {
                                valueAsNumber: true,
                              })}
                              id="plis-cutané-plisGauche"
                              type="number"
                              placeholder="Ex: 13.2"
                              className="border border-bay-of-many-400 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-bay-of-many-600"
                            />
                            {errors.plisGauche && (
                              <p className="text-red-600 text-sm">
                                {errors.plisGauche.message}
                              </p>
                            )}
                          </div>
                          <div className="flex flex-col gap-1">
                            <label
                              className="text-sm font-medium text-bay-of-many-600"
                              htmlFor="matiere-grasse"
                            >
                              Matière Grasse (%)
                            </label>
                            <input
                              {...register("matieresGrasses", {
                                valueAsNumber: true,
                              })}
                              id="matiere-grasse"
                              type="number"
                              placeholder="Ex: 18.5"
                              className="border border-bay-of-many-400 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-bay-of-many-600"
                            />
                            {errors.matieresGrasses && (
                              <p className="text-red-600 text-sm">
                                {errors.matieresGrasses.message}
                              </p>
                            )}
                          </div>
                        </div>
                      </DialogHeader>
                      <DialogFooter className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                        <button
                          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-bay-of-many-500"
                          onClick={() => setIsDialogOpen(false)}
                        >
                          Annuler
                        </button>
                        <button
                          className="px-4 py-2 text-sm font-medium text-white bg-bay-of-many-600 rounded-md hover:bg-bay-of-many-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-bay-of-many-500 disabled:opacity-50 disabled:cursor-not-allowed"
                          onClick={handleSubmit(onSubmit)}
                        >
                          Confirmer
                        </button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                  <Dialog
                    open={isImageDialogOpen}
                    onOpenChange={setIsImageDialogOpen}
                  >
                    <DialogTrigger onClick={() => setIsImageDialogOpen(true)}>
                      <button className="px-4 py-2 bg-transparent border border-bay-of-many-600 text-bay-of-many-600 rounded-lg text-sm font-medium hover:bg-bay-of-many-300 duration-300 transition-all flex items-center justify-around gap-x-4">
                        <Camera className="size-4" />
                        <p>Changer la photo</p>
                      </button>
                    </DialogTrigger>
                    <DialogContent className="bg-white">
                      <DialogHeader>
                        <DialogTitle>Changer la photo du jockey</DialogTitle>
                        <DialogDescription>
                          Téléchargez une nouvelle photo pour ce jockey (formats
                          acceptés: JPEG, PNG).
                        </DialogDescription>
                      </DialogHeader>
                      <div className="flex flex-col gap-4 mt-4">
                        <input
                          type="file"
                          lang="fr"
                          accept="image/jpeg, image/png, image/jpg"
                          onChange={(e) => setSelectedFile(e.target.files[0])}
                          className="border border-bay-of-many-400 rounded-lg p-2"
                        />
                      </div>
                      <DialogFooter className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                        <button
                          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                          onClick={() => setIsImageDialogOpen(false)}
                        >
                          Annuler
                        </button>
                        <button
                          className="px-4 py-2 text-sm font-medium text-white bg-bay-of-many-600 rounded-md hover:bg-bay-of-many-700"
                          onClick={handleImageUpload}
                        >
                          Enregistrer
                        </button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-bay-of-many-50 p-4 rounded-lg">
                <p className="text-sm text-bay-of-many-600">
                  Date de naissance
                </p>
                <p className="font-medium">
                  {format(jockey.dateNaissance, "yyyy/MM/dd")}
                </p>
              </div>
              <div className="bg-bay-of-many-50 p-4 rounded-lg">
                <p className="text-sm text-bay-of-many-600">Ville</p>
                <p className="font-medium ">
                  {jockey.ville.charAt(0).toUpperCase() +
                    jockey.ville.slice(1).toLowerCase()}
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            <motion.div
              variants={cardVariants}
              whileHover={{ y: -5 }}
              onClick={() => navigate(`/jockey/${id}/antecedent_personel`)}
              className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl shadow-sm border border-blue-200 cursor-pointer transition-all hover:shadow-md"
            >
              <div className="flex justify-between items-start mb-4">
                <HeartPulse className="w-8 h-8 text-blue-600" />
                <ChevronRight className="w-5 h-5 text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold text-blue-800 mb-1">
                Antecedent personnel
              </h3>
              <p className="text-sm text-blue-600">
                Antecedent personnel du jockey
              </p>
            </motion.div>

            <motion.div
              variants={cardVariants}
              whileHover={{ y: -5 }}
              onClick={() => navigate(`/jockey/${id}/antecedent_familiaux`)}
              className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl shadow-sm border border-purple-200 cursor-pointer transition-all hover:shadow-md"
            >
              <div className="flex justify-between items-start mb-4">
                <ClipboardList className="w-8 h-8 text-purple-600" />
                <ChevronRight className="w-5 h-5 text-purple-400" />
              </div>
              <h3 className="text-lg font-semibold text-purple-800 mb-1">
                Antecedant familaux
              </h3>
              <p className="text-sm text-purple-600">
                Historique familial médical
              </p>
            </motion.div>

            <motion.div
              variants={cardVariants}
              whileHover={{ y: -5 }}
              onClick={() => navigate(`/jockey/${id}/examens`)}
              className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl shadow-sm border border-green-200 cursor-pointer transition-all hover:shadow-md"
            >
              <div className="flex justify-between items-start mb-4">
                <Stethoscope className="w-8 h-8 text-green-600" />
                <ChevronRight className="w-5 h-5 text-green-400" />
              </div>
              <h3 className="text-lg font-semibold text-green-800 mb-1">
                Examens
              </h3>
              <p className="text-sm text-green-600">Résultats des examens</p>
            </motion.div>

            <motion.div
              variants={cardVariants}
              whileHover={{ y: -5 }}
              onClick={() => navigate(`/jockey/${id}/medications`)}
              className="bg-gradient-to-br from-amber-50 to-amber-100 p-6 rounded-xl shadow-sm border border-amber-200 cursor-pointer transition-all hover:shadow-md"
            >
              <div className="flex justify-between items-start mb-4">
                <Pill className="w-8 h-8 text-amber-600" />
                <ChevronRight className="w-5 h-5 text-amber-400" />
              </div>
              <h3 className="text-lg font-semibold text-amber-800 mb-1">
                Médication
              </h3>
              <p className="text-sm text-amber-600">Traitements en cours</p>
            </motion.div>
            <motion.div
              variants={cardVariants}
              whileHover={{ y: -5 }}
              onClick={() => navigate(`/jockey/${id}/hygiene`)}
              className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl shadow-sm border border-green-200 cursor-pointer transition-all hover:shadow-md"
            >
              <div className="flex justify-between items-start mb-4">
                <Brush className="w-8 h-8 text-green-600" />
                <ChevronRight className="w-5 h-5 text-green-400" />
              </div>
              <h3 className="text-lg font-semibold text-green-800 mb-1">
                Hygiène
              </h3>
              <p className="text-sm text-green-600">
                Médication et soins d'hygiène
              </p>
            </motion.div>
            <motion.div
              variants={cardVariants}
              whileHover={{ y: -5 }}
              onClick={() => navigate(`/jockey/${id}/conclusion`)}
              className="bg-gradient-to-br from-indigo-50 to-indigo-100 p-6 rounded-xl shadow-sm border border-indigo-200 cursor-pointer transition-all hover:shadow-md"
            >
              <div className="flex justify-between items-start mb-4">
                <FileText className="w-8 h-8 text-indigo-600" />
                <ChevronRight className="w-5 h-5 text-indigo-400" />
              </div>
              <h3 className="text-lg font-semibold text-indigo-800 mb-1">
                Conclusion
              </h3>
              <p className="text-sm text-indigo-600">
                Déterminer si le Jockey est apte ou non apte
              </p>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    );
  }
}
