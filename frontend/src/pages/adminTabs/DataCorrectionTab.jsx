export default function DataCorrectionTab() {
    return (
      <div>
        <h1 className="text-2xl font-bold text-bay-of-many-900 mb-6">
          Correction des Données
        </h1>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-3">Rechercher un Jockey</h2>
            <div className="flex">
              <input
                type="text"
                placeholder="SOREC ID"
                className="flex-1 p-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-bay-of-many-400"
              />
              <button className="bg-bay-of-many-600 text-white px-4 rounded-r-lg hover:bg-bay-of-many-700">
                Rechercher
              </button>
            </div>
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