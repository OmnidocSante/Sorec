import { usersAtom } from "@/main";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input"; // Make sure to install shadcn/ui input component

const mockAssignedJockeys = {
  "2025-04-07": [
    { id: 1, name: "Jean Dupont", status: "Apte" },
    { id: 2, name: "Marie Lambert", status: "En attente" },
  ],
  "2024-05-16": [
    { id: 3, name: "Pierre Durand", status: "Apte" },
    { id: 4, name: "Sophie Martin", status: "Apte" },
    { id: 5, name: "Lucie Petit", status: "Inapte" },
  ],
  "2024-05-17": [{ id: 6, name: "Thomas Moreau", status: "En attente" }],
  "2024-05-20": [
    { id: 7, name: "Emma Bernard", status: "Apte" },
    { id: 8, name: "Nicolas Roux", status: "En attente" },
  ],
};

export default function DashboardTab() {
  const [users, setUsers] = useAtom(usersAtom);
  const [date, setDate] = useState(() => new Date());
  const [selectedJockeys, setSelectedJockeys] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      setUsers("REFRESH");
    };
    fetchUsers();
  }, [setUsers]);

  useEffect(() => {
    if (date) {
      const dateString = date.toISOString().split("T")[0];
      const jockeys = mockAssignedJockeys[dateString] || [];
      setSelectedJockeys(jockeys);
    }
  }, [date]);

  const filteredJockeys = selectedJockeys.filter((jockey) =>
    jockey.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1 className="text-2xl font-bold text-bay-of-many-900 mb-6">
        Tableau de Bord
      </h1>
      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-bay-of-many-600">Utilisateurs Totaux</h3>
          <p className="text-3xl font-bold text-bay-of-many-900">
            {users.length}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-bay-of-many-600">Médecins Actifs</h3>
          <p className="text-3xl font-bold text-bay-of-many-900">23</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-bay-of-many-600">Examens en Attente</h3>
          <p className="text-3xl font-bold text-bay-of-many-900">17</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-bay-of-many-600">Jockeys Aptes</h3>
          <p className="text-3xl font-bold text-bay-of-many-900">89</p>
        </div>
      </div>

      {/* Jockeys Assignés Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="col-span-1 bg-white">
          <CardHeader>
            <CardTitle className="text-bay-of-many-900">
              Calendrier des Jockeys
            </CardTitle>
          </CardHeader>
          <CardContent className={"grid place-items-center"}>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border w-fit"
              modifiers={{
                hasJockeys: Object.keys(mockAssignedJockeys).map(
                  (dateStr) => new Date(dateStr)
                ),
              }}
              modifiersStyles={{
                hasJockeys: {
                  border: "2px solid var(--color-bay-of-many-500)",
                  backgroundColor: "var(--color-bay-of-many-100)",
                },
              }}
            />
          </CardContent>
        </Card>

        <Card className="col-span-2 bg-white">
          <CardHeader>
            <div className="flex justify-between items-center w-full ">
              <CardTitle className="text-bay-of-many-900">
                Jockeys Assignés -{" "}
                {date?.toLocaleDateString("fr-FR", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </CardTitle>
              <div className="w-64">
                <Input
                  type="text"
                  placeholder="Rechercher un jockey..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-white border-bay-of-many-200 focus-visible:ring-bay-of-many-500"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {filteredJockeys.length > 0 ? (
              <div className="space-y-4">
                {filteredJockeys.map((jockey) => (
                  <div
                    key={jockey.id}
                    className="p-4 border rounded-lg hover:bg-bay-of-many-50 transition-colors"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium text-bay-of-many-900">
                          {jockey.name}
                        </h3>
                        <p
                          className={`text-sm ${
                            jockey.status === "Apte"
                              ? "text-green-600"
                              : jockey.status === "Inapte"
                              ? "text-red-600"
                              : "text-yellow-600"
                          }`}
                        >
                          Statut: {jockey.status}
                        </p>
                      </div>
                      <button className="px-3 py-1 bg-bay-of-many-600 text-white rounded-md text-sm hover:bg-bay-of-many-700 transition-colors">
                        Voir dossier
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-bay-of-many-500">
                <p>
                  {searchTerm
                    ? "Aucun jockey ne correspond à votre recherche"
                    : "Aucun jockey assigné pour cette date"}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
