import { useEffect, useState } from "react";
import axios from "axios";
import instance from "@/auth/AxiosInstance";

export default function MedicalRecordTab() {
  const [tables, setTables] = useState([]);
  const [selectedTable, setSelectedTable] = useState("");
  const [fields, setFields] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    setTables([
      "antecedent_familiaux",
      "conclusion",
      "electrocardiogramme_effort",
      "electrocardiogramme_repos",
      "examen_abdominal",
      "examen_auditif",
      "examen_locomoteur",
      "examen_cardio_vasculaire",
      "examen_genito_urinaire",
      "examen_neurologique",
      "examen_ophtalmogique",
      "examen_pleuro_pulmonaire",
      "hygiene",
      "resultat_examen_paraclinique",
    ]);
  }, []);

  useEffect(() => {
    const fetchFields = async () => {
      setLoading(true);
      try {
        const response = await instance.get(
          `/api/field-visibility/${selectedTable}`
        );
        console.log(response.data);

        const data = response.data
          .filter(
            (item) =>
              item.fieldName !== "dossier_medicale_id" &&
              item.fieldName !== "id" &&
              item.fieldName !== "dossier_id"
          )
          .map((item) => ({
            name: item.fieldName,
            hidden: item.hidden,
          }));
        setFields(data);
      } catch (err) {
        console.error("Erreur de chargement", err);
      } finally {
        setLoading(false);
      }
    };
    if (!selectedTable) return;

    fetchFields();
  }, [selectedTable]);

  const handleSave = () => {
    const fieldMap = {};
    fields.forEach((field) => {
      fieldMap[field.name] = field.hidden;
    });

    setSaving(true);
    instance
      .put(`/api/field-visibility/${selectedTable}`, fieldMap)
      .then(() => setMessage("Modifications enregistrées !"))
      .catch(() => setMessage("Erreur lors de l'enregistrement"))
      .finally(() => setSaving(false));
  };

  const toggleVisibility = (fieldName) => {
    console.log(fields);

    setFields((prev) =>
      prev.map((field) =>
        field.name === fieldName ? { ...field, hidden: !field.hidden } : field
      )
    );
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Masquer des Champs</h1>

      <select
        className="p-2 rounded border"
        value={selectedTable}
        onChange={(e) => setSelectedTable(e.target.value)}
      >
        <option value="">-- Choisir une table --</option>
        {tables.map((table) => (
          <option key={table} value={table}>
            {table.split("_").join(" ")}
          </option>
        ))}
      </select>

      {loading ? (
        <p>Chargement des champs...</p>
      ) : selectedTable && fields.length > 0 ? (
        <>
          <table className="w-full border rounded shadow">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-2 text-left">Champ</th>
                <th className="p-2 text-left">Caché</th>
              </tr>
            </thead>
            <tbody>
              {fields.map((field) => (
                <tr key={field.name} className="hover:bg-gray-50">
                  <td className="p-2">{field.name}</td>
                  <td className="p-2">
                    <input
                      type="checkbox"
                      checked={field.hidden}
                      onChange={() => toggleVisibility(field.name)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <button
            onClick={handleSave}
            disabled={saving}
            className="mt-4 bg-bay-of-many-700 text-white px-4 py-2 rounded hover:bg-bay-of-many-800 transition"
          >
            {saving ? "Enregistrement..." : "Enregistrer"}
          </button>

          {message && <p className="text-green-600 mt-2">{message}</p>}
        </>
      ) : selectedTable ? (
        <p>Aucun champ trouvé pour cette table.</p>
      ) : null}
    </div>
  );
}
