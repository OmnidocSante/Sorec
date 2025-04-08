import { usersAtom } from "@/main";
import { useAtom } from "jotai";
import { useEffect } from "react";

export default function DashboardTab() {
  const [users, setUsers] = useAtom(usersAtom);

  useEffect(() => {
    const fetchUsers = async () => {
      setUsers("REFRESH");
    };
    fetchUsers();
  }, [setUsers]);

  return (
    <div>
      <h1 className="text-2xl font-bold text-bay-of-many-900 mb-6">
        Tableau de Bord
      </h1>
      <div className=" space-y-4 md:space-y-0 md:grid grid-cols-4 gap-6 mb-8">
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
    </div>
  );
}
