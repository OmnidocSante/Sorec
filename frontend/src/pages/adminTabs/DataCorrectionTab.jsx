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
  return (
    <div>
      <h1 className="text-2xl font-bold text-bay-of-many-900 mb-6">
        Correction des Données
      </h1>
      <div className="bg-white p-6  rounded-lg shadow">
        <div className="my-8">
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
        </div>
        <div>
          <h2 className="text-lg font-semibold mb-3">
            Historique des Modifications
          </h2>
          <div className="border rounded-lg p-4">
            <p className="text-bay-of-many-700">
              Sélectionnez un jockey pour voir son historique
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
