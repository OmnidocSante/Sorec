import Header from "@/components/Header";
import Footer from "@/components/Footer";
import jockey from "../images/jockey.jpg";
import { Bell, Cross, FolderCheck, Lock } from "lucide-react";

function App() {

  return (
    <>
      <Header />
      <section className="bg-white font-sans">
        <section className="container mx-auto px-4 py-12 md:py-16">
          <div className="flex justify-center mb-8 md:mb-12">
            <img
              src={jockey}
              alt="Jockey"
              className="w-full max-w-4xl h-auto rounded-lg shadow-xl object-cover"
            />
          </div>

          <h1 className="text-3xl md:text-5xl font-bold text-center text-black mb-4">
            Suivi Médical des Jockeys 100% Digital
          </h1>

          <h2 className="text-lg md:text-2xl text-center text-black max-w-3xl mx-auto">
            Gérez les dossiers médicaux, examens et certificats en temps réel.
          </h2>
        </section>
        <section className="bg-white py-12 px-4 md:px-8">
          <div className="container mx-auto">
            {/* Grid Container */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Card 1 */}
              <div className="flex flex-col p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <div className="bg-bay-of-many-800/20 w-fit p-3 rounded-xl mb-4">
                  <FolderCheck className="text-bay-of-many-500" size={28} />
                </div>
                <h1 className="text-xl font-semibold text-bay-of-many-800 mb-2">
                  Dossier Médical Digital
                </h1>
                <p className="text-sm text-bay-of-many-600">
                  Accédez à un dossier complet avec antécédents, examens
                  récents, prescriptions et recommandations. Sécurisé et
                  accessible 24h/24 depuis n'importe quel appareil.
                </p>
              </div>

              {/* Card 2 */}
              <div className="flex flex-col p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <div className="bg-bay-of-many-800/20 w-fit p-3 rounded-xl mb-4">
                  <Cross className="text-bay-of-many-500" size={28} />
                </div>
                <h1 className="text-xl font-semibold text-bay-of-many-800 mb-2">
                  Suivi Personnalisé
                </h1>
                <p className="text-sm text-bay-of-many-600">
                  Les consultants peuvent consulter le statut d'aptitude,
                  télécharger leurs certificats et recevoir des rappels
                  personnalisés pour les prochains contrôles.
                </p>
              </div>

              {/* Card 3 */}
              <div className="flex flex-col p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <div className="bg-bay-of-many-800/20 w-fit p-3 rounded-xl mb-4">
                  <Bell className="text-bay-of-many-500" size={28} />
                </div>
                <h1 className="text-xl font-semibold text-bay-of-many-800 mb-2">
                  Restez informé en continu
                </h1>
                <p className="text-sm text-bay-of-many-600">
                  Recevez des notifications instantanées sur les examens
                  médicaux, les certificats à renouveler et les disponibilités
                  des médecins. Toutes vos alertes centralisées dans
                  l'application.
                </p>
              </div>

              {/* Card 4 */}
              <div className="flex flex-col p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <div className="bg-bay-of-many-800/20 w-fit p-3 rounded-xl mb-4">
                  <Lock className="text-bay-of-many-500" size={28} />
                </div>
                <h1 className="text-xl font-semibold text-bay-of-many-800 mb-2">
                  Sécurité des Données
                </h1>
                <p className="text-sm text-bay-of-many-600">
                  Chiffrement des données, accès sécurisé par authentification
                  forte et historique des modifications pour une traçabilité
                  totale.
                </p>
              </div>
            </div>
          </div>
        </section>
      </section>
      <Footer />
    </>
  );
}
export default App;
