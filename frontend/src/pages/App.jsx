import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import jockey from "../images/jockey.jpg";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const App = () => {
  const navigate = useNavigate();
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    document.title = "Sorec - Système de Gestion des Jockeys";
  }, []);

  useEffect(() => {
    const img = new Image();
    img.onload = () => setImageLoaded(true);
    img.src = jockey;
  }, [jockey]);

  

  const handleLogin = () => {
    navigate("/login");
  };
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 text-gray-800 font-sans">
      <Header />
      <div className="relative overflow-hidden min-h-screen">
        <div
          className={`absolute inset-0 bg-cover bg-center transform scale-105 transition-opacity duration-500 ${
            imageLoaded ? "opacity-100 blur-sm" : "opacity-0"
          }`}
          style={{ backgroundImage: `url(${jockey})` }}
        ></div>
        <div className="relative flex items-center justify-center min-h-screen px-6 md:px-12 lg:px-24 xl:px-32">
          <div className="max-w-3xl text-center backdrop-blur-md bg-white/30 rounded-xl py-16 px-8 md:px-16">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="space-y-10"
            >
              <motion.div variants={fadeIn}>
                <div className="inline-flex items-center px-5 py-3 rounded-full bg-blue-200/80 backdrop-blur-sm">
                  <span className="w-3 h-3 rounded-full bg-blue-600 animate-pulse mr-3"></span>
                  <span className="text-lg font-medium text-blue-800">
                    Optimisation & Sécurité
                  </span>
                </div>
              </motion.div>
              <motion.h1
                variants={fadeIn}
                className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-4"
              >
                Gestion universelle des dossiers médicaux des jockeys{" "}
              </motion.h1>
              <motion.p
                variants={fadeIn}
                className="text-base md:text-lg lg:text-xl text-gray-900 leading-relaxed opacity-80"
              >
                Une plateforme intuitive pour le suivi médical, la planification
                de rendez-vous et la sécurisation des informations de santé des
                professionnels équestres.
              </motion.p>
              <motion.div variants={fadeIn}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleLogin}
                  className="bg-gradient-to-br from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-10 py-4 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-blue-300/50"
                >
                  Accéder au Portail Médical
                </motion.button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
      <section className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeIn}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <div className="inline-flex items-center px-4 py-2 mb-6 rounded-full bg-blue-100 text-blue-800">
              <span className="w-2 h-2 rounded-full bg-blue-600 mr-2"></span>
              <span className="text-sm font-medium">
                Fonctionnalités Principales
              </span>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Une Solution Complète pour les Professionnels
            </h2>
            <p className="text-xl text-gray-600">
              Notre plateforme offre des outils puissants pour optimiser la
              gestion médicale des jockeys et améliorer l'efficacité des
              processus.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            <motion.div variants={fadeIn} className="relative group">
              <div className="bg-white rounded-2xl p-8 shadow-xl group-hover:translate-y-[-4px] group-hover:translate-x-[-4px] transition-all duration-300">
                <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center mb-6 text-blue-600 group-hover:scale-110 transition-transform duration-300">
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    ></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Dossiers Médicaux Sécurisés
                </h3>
                <p className="text-gray-600">
                  Stockage sécurisé et confidentiel de tous les dossiers
                  médicaux des jockeys avec un accès contrôlé et chiffré.
                </p>
              </div>
            </motion.div>

            <motion.div variants={fadeIn} className="relative group">
              <div className="bg-white rounded-2xl p-8 shadow-xl group-hover:translate-y-[-4px] group-hover:translate-x-[-4px] transition-all duration-300">
                <div className="w-16 h-16 rounded-2xl bg-indigo-50 flex items-center justify-center mb-6 text-indigo-600 group-hover:scale-110 transition-transform duration-300">
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    ></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Numérisation des Processus
                </h3>
                <p className="text-gray-600">
                  Digitalisation complète des examens médicaux et mises à jour
                  des dossiers, accessibles en ligne à tout moment.
                </p>
              </div>
            </motion.div>

            <motion.div variants={fadeIn} className="relative group">
              <div className="bg-white rounded-2xl p-8 shadow-xl group-hover:translate-y-[-4px] group-hover:translate-x-[-4px] transition-all duration-300">
                <div className="w-16 h-16 rounded-2xl bg-purple-50 flex items-center justify-center mb-6 text-purple-600 group-hover:scale-110 transition-transform duration-300">
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    ></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Planification des RDVs
                </h3>
                <p className="text-gray-600">
                  Système de prise de rendez-vous entre jockeys et médecins avec
                  notifications automatiques par email.
                </p>
              </div>
            </motion.div>

            <motion.div variants={fadeIn} className="relative group">
              <div className="bg-white rounded-2xl p-8 shadow-xl group-hover:translate-y-[-4px] group-hover:translate-x-[-4px] transition-all duration-300">
                <div className="w-16 h-16 rounded-2xl bg-pink-50 flex items-center justify-center mb-6 text-pink-600 group-hover:scale-110 transition-transform duration-300">
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    ></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Visualisation des KPIs
                </h3>
                <p className="text-gray-600">
                  Tableaux de bord visuels présentant les indicateurs clés de
                  performance pour les administrateurs et médecins.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default App;
