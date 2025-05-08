import instance from "@/auth/AxiosInstance";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usersAtom } from "@/main";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAtom } from "jotai";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function DataCorrectionTab() {
  const [jockeySearch, setJockeySearch] = useState("");
  const [jockeyCityFilter, setJockeyCityFilter] = useState("all");
  const [users] = useAtom(usersAtom);

  const jockeySchema = z.object({
    jockeyId: z.string().min(1, "Jockey est requis"),
  });

  const {
    formState: { errors },
    setValue,
    handleSubmit,
  } = useForm({
    resolver: zodResolver(jockeySchema),
    defaultValues: {
      jockeyId: "",
    },
  });

  const jockeys = users.filter((user) => user.role === "JOCKEY");

  const jockeyCities = useMemo(() => {
    const cities = new Set();
    jockeys.forEach((jockey) => jockey.ville && cities.add(jockey.ville));
    return Array.from(cities).filter((city) => city && city.trim() !== "");
  }, [jockeys]);

  const filteredJockeys = useMemo(() => {
    return jockeys.filter((jockey) => {
      const matchesSearch =
        jockey.nom.toLowerCase().includes(jockeySearch.toLowerCase()) ||
        jockey.prénom.toLowerCase().includes(jockeySearch.toLowerCase()) ||
        jockey.sorecId.toLowerCase().includes(jockeySearch.toLowerCase());
      const matchesCity =
        jockeyCityFilter === "all" ? true : jockey.ville === jockeyCityFilter;
      return matchesSearch && matchesCity;
    });
  }, [jockeys, jockeySearch, jockeyCityFilter]);

  const [historique, setHistorique] = useState([]);

  const onSubmit = async (data) => {
    const response = await instance.get(
      `/api/jockey/${data.jockeyId}/historique/status`
    );
    setHistorique(response.data);
  };
  const statusTranslations = {
    EXAMEN_ANNUEL_A_PREVOIR: "Examen annuel à prévoir",
    APTE: "Apte",
    EN_ATTENTE_DE_REEVALUATION: "En attente de réévaluation",
  };
  const formatDate = (isoString) => {
    const [date] = isoString.split("T");
    return date.split("-").reverse().join("/");
  };
  return (
    <div>
      <h1 className="text-2xl font-bold text-bay-of-many-900 mb-6">
        Historique de status
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6  rounded-lg shadow"
      >
        <div>
          <label className="block text-sm font-medium text-bay-of-many-700 mb-1">
            Jockey
          </label>

          <div className="mb-2">
            <label className="block text-xs font-medium text-bay-of-many-500 mb-1">
              Filtrer par ville
            </label>
            <Select
              onValueChange={setJockeyCityFilter}
              value={jockeyCityFilter}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Toutes les villes" />
              </SelectTrigger>
              <SelectContent className="bg-white max-h-60">
                <SelectItem
                  value="all"
                  className="cursor-pointer my-2 transition-all hover:bg-gray-100"
                >
                  Toutes les villes
                </SelectItem>
                {jockeyCities.map((city) => (
                  <SelectItem
                    className="cursor-pointer my-2 transition-all hover:bg-gray-100"
                    key={city}
                    value={city}
                  >
                    {city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <input
            type="text"
            placeholder="Rechercher un jockey..."
            className="w-full p-2 mb-2 border rounded-md text-sm"
            value={jockeySearch}
            onChange={(e) => setJockeySearch(e.target.value)}
          />

          <Select onValueChange={(val) => setValue("jockeyId", val)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Sélectionner un jockey" />
            </SelectTrigger>
            <SelectContent className="bg-white max-h-60">
              {filteredJockeys.length > 0 ? (
                filteredJockeys.map((jockey) => (
                  <SelectItem
                    className="cursor-pointer my-2 transition-all hover:bg-gray-100"
                    key={jockey.id}
                    value={jockey.id.toString()}
                  >
                    {jockey.nom} {jockey.prénom} ({jockey.sorecId})
                    {jockey.ville && ` (${jockey.ville})`}
                  </SelectItem>
                ))
              ) : (
                <div className="p-2 text-sm text-gray-500">
                  Aucun jockey trouvé
                </div>
              )}
            </SelectContent>
          </Select>
          {errors.jockeyId && (
            <p className="text-red-500 text-sm mt-1">
              {errors.jockeyId.message}
            </p>
          )}

          <button
            type="submit"
            className="w-full mb-4 bg-bay-of-many-600 text-white py-2.5 px-4 rounded-md hover:bg-bay-of-many-700 transition-colors mt-2"
          >
            Sélectionner
          </button>
        </div>
        {historique.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-bay-of-many-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-bay-of-many-700 uppercase tracking-wider">
                  Docteur
                </th>

                <th className="px-4 py-3 text-left text-xs font-medium text-bay-of-many-700 uppercase tracking-wider">
                  Jockey
                </th>

                <th className="px-4 py-3 text-left text-xs font-medium text-bay-of-many-700 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-bay-of-many-700 uppercase tracking-wider">
                  Statut
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {historique.map((entry, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                    {entry.doctorLastName.trim()} {entry.doctorName}
                  </td>

                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                    {entry.jockeyLastName} {entry.jockeyName}
                  </td>

                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatDate(entry.date)}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                      {statusTranslations[entry.status]}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-bay-of-many-700 ">
          Sélectionnez un jockey pour voir son historique
        </p>
      )}
      </form>

    </div>
  );
}
