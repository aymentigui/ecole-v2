"use client"

import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Navbar } from './(public)/components/Navbar'
import { Footer } from './(public)/components/Footer'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa6'
import { useMediaQuery } from '@mui/material';
import Link from 'next/link'
import loadingAnimation from "@/../public/loading.json";
import dynamic from 'next/dynamic';
const Lottie = dynamic(() => import('react-lottie'), { ssr: false });
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'
import { getAboutSettings, getGeneralSettings } from '@/actions/settings'
import { recentcollaborations, recentFormations } from '@/actions/requetes'
import toast from 'react-hot-toast'

const missions = [
  "Inspirer le développement en transformant la formation continue en levier permanent d’apprentissage et de progrès individuel et collectif.",
  "Renforcer les compétences individuelles : Offrir aux apprenants les connaissances et les outils nécessaires pour exceller dans leur carrière et s'adapter aux défis d’un monde en constante évolution.",
  "Accompagner les entreprises dans leur croissance : Offrir un accompagnement complet et stratégique pour aider les entreprises à développer leur capital humain et à atteindre leurs objectifs de performance.",
];
const valeurs = [
  "Ouverture sur le monde professionnel.",
  "Accessibilité : La formation doit être accessible à tous et à toutes. C’est pourquoi nous nous efforçons de proposer des programmes flexibles et inclusifs.",
  "Adaptabilité : Anticiper et répondre aux défis émergents dans un monde en constante évolution.",
  "Innovation : Développer des approches et des outils novateurs pour offrir des solutions de formation adaptées aux besoins en évolution des individus et des entreprises.",
  "Éthique et transparence : Nous opérons avec intégrité et transparence, en privilégiant des relations de confiance avec tous nos interlocuteurs.",
];

export default function Home() {
  const [collaborations, setCollaborations] = useState<any[]>([]);
  const [isLottie, setIsLottie] = useState(false);
  const [isLoadingC, setIsLoadingC] = useState(true);
  const [formations, setFormations] = useState<any[]>([]);
  const [isLoadingF, setIsLoadingF] = useState(true);
  const [about, setAbout] = useState(``)
  const [slides, setSlides] = useState([
    { image: '/slice1.png', text: '' },
    { image: '/slice2.png', text: '' },
    { image: '/slice3.png', text: '' },
  ])

  const [currentSlide, setCurrentSlide] = useState(0)
  const [currentIndexCollaboration, setCurrentIndexCollaboration] = useState(0);
  const [currentIndexFormation, setCurrentIndexFormation] = useState(0);
  const isSmallScreen = useMediaQuery('(max-width: 768px)');
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    content: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success('Message envoyé avec succès !')
        setFormData({ name: "", email: "", content: "" }); // Réinitialise le formulaire
      } else {
        const errorData = await response.json();
        toast.error(`Erreur : ${errorData.message}`)
      }
    } catch (error) {
      toast.error("Une erreur s'est produite. Veuillez réessayer.")
    }
  };


  useEffect(() => {
    getGeneralSettings().then((data) => {
      setSlides((p) => ([
        { image: data.slice1Url ?? p[0].image, text: data.slice1Text ?? "" },
        { image: data.slice2Url ?? p[1].image, text: data.slice2Text ?? "" },
        { image: data.slice3Url ?? p[2].image, text: data.slice3Text ?? "" },
      ]))
    })
    getAboutSettings().then((data) => {
      setAbout(p => (data.siteDescription ?? `Notre école de formation s'engage à fournir une éducation de qualité depuis plus de 20 ans. 
              Nous nous efforçons de préparer nos étudiants aux défis du monde professionnel en leur offrant 
              des formations innovantes et adaptées aux besoins du marché.`))
    })
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length)
    }, 5000)
    const interval = setInterval(() => {
      handleNextCollaboration();
      handleNextFormation();
    }, 5000);
    return () => {
      clearInterval(timer);
      clearInterval(interval);
    }
  }, [currentIndexCollaboration, currentIndexFormation])

  const handleNextCollaboration = () => {
    if (collaborations.length < 4 && !isSmallScreen)
      return
    setCurrentIndexCollaboration((prevIndex) => (prevIndex + 1) % collaborations.length);
  };

  // Fonction pour aller au slide précédent
  const handlePrevCollaboration = () => {
    if (collaborations.length < 4 && !isSmallScreen)
      return
    setCurrentIndexCollaboration((prevIndex) =>
      prevIndex === 0 ? collaborations.length - 1 : prevIndex - 1
    );
  };

  const handleNextFormation = () => {
    if (formations.length < 4 && !isSmallScreen)
      return
    setCurrentIndexFormation((prevIndex) => (prevIndex + 1) % formations.length);
  };

  // Fonction pour aller au slide précédent
  const handlePrevFormation = () => {
    if (formations.length < 4 && !isSmallScreen)
      return
    setCurrentIndexFormation((prevIndex) =>
      prevIndex === 0 ? formations.length - 1 : prevIndex - 1
    );
  };

  const getVisibleItemsCollaborations = () => {
    if (isSmallScreen) {
      return [collaborations[currentIndexCollaboration],];
    }
    if (collaborations.length < 2)
      return [
        collaborations[currentIndexCollaboration],
      ];
    if (collaborations.length < 3)
      return [
        collaborations[currentIndexCollaboration],
        collaborations[(currentIndexCollaboration + 1) % collaborations.length],
      ];

    return [
      collaborations[currentIndexCollaboration],
      collaborations[(currentIndexCollaboration + 1) % collaborations.length],
      collaborations[(currentIndexCollaboration + 2) % collaborations.length],
    ];
  };

  const getVisibleItemsFormations = () => {

    if (isSmallScreen) {
      return [formations[currentIndexFormation]];
    }

    if (formations.length < 2)
      return [
        formations[currentIndexFormation],
      ];
    if (formations.length < 3)
      return [
        formations[currentIndexFormation],
        formations[(currentIndexFormation + 1) % formations.length],
      ];

    return [
      formations[currentIndexFormation],
      formations[(currentIndexFormation + 1) % formations.length],
      formations[(currentIndexFormation + 2) % formations.length],
    ];
  };

  const fetchData = async () => {
    try {
      recentcollaborations().then((response) => {
        if (response.success)
          setCollaborations(response.data)
      });
      recentFormations().then((response) => {
        if (response.success)
          setFormations(response.data)
      });
    } catch (error) {
      console.error("Error fetching collaborations:", error);
    } finally {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setIsLoadingC(false);
      setIsLoadingF(false);
    }
  };
  useEffect(() => {
    setIsLottie(true)
    fetchData();
  }, []);

  const loadingOptions = {
    loop: true,
    autoplay: true,
    animationData: loadingAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-56 md:h-96 overflow-hidden">
          {slides.map((slide, index) => (
            <motion.div
              key={index}
              className="absolute flex justify-center items-center h-full w-full inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: index === currentSlide ? 1 : 0 }}
              transition={{ duration: 0.5 }}
            >
              <img src={slide.image} alt={slide.text} className='object-cover' />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <h1 className="text-white text-4xl font-bold">{slide.text}</h1>
              </div>
            </motion.div>
          ))}
        </section>

        {/* Collaborations Section */}
        {
          <section className={(collaborations && collaborations.length > 0) ? "py-16 bg-gray-100" : "py-0 bg-gray-100"} >
            {(isLoadingC) ? (
              <div className="flex justify-center items-center h-56">
                {isLottie && <Lottie options={loadingOptions} height={200} width={200} />}
              </div>
            ) :
              collaborations && collaborations.length > 0 && (<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold text-center mb-8">Nos dernières collaborations</h2>
                <div className="relative">
                  <div className={(collaborations.length == 1 ? "md:grid-cols-1" : collaborations.length == 2 ? "md:grid-cols-2" : "md:grid-cols-3 ") + " grid grid-cols-1 gap-8"}>
                    <AnimatePresence>
                      {getVisibleItemsCollaborations().map((collab, index) => (
                        <motion.div
                          key={index}
                          className="bg-white flex flex-col items-center rounded-lg shadow-md overflow-hidden"
                          initial={{ opacity: 0, y: 50 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -50 }}
                          transition={{ duration: 0.5 }}
                        ><Link href={`/collaborations/${collab.id ?? "0"}`}>
                            {collab.photo && <img
                              src={collab.photo}
                              alt={collab.name}
                              className={"" + (collaborations.length < 3 && "w-full h-[300px] object-contain")}
                            />}
                            <div className={"p-4 " + (collaborations.length < 3 && " text-center")}>
                              <h3 className="font-semibold text-xl mb-2">{collab.name}</h3>
                              <p className="text-sm text-gray-600 italic mb-2">{collab.company}</p>
                              {<p className="text-sm text-gray-600 mb-2">
                                {collab.startDate && collab.endDate && collab.isRegistrationAllowed && new Date(collab.startDate) >= new Date() &&
                                  `Du ${format(collab.startDate, 'dd MMMM yyyy', { locale: fr })} au ${format(collab.endDate, 'dd MMMM yyyy', { locale: fr })}`}
                              </p>}
                              {(collab.price || collab.price != 0) &&
                                <p className="font-bold text-lg mb-2">{collab.price + ".00 DA"}</p>}
                              <p>{isSmallScreen ? collab.remarks.substring(0, 100) : collab.remarks.substring(0, 200)}</p>
                            </div>
                          </Link>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>

                  {/* Boutons pour navigation */}
                  <button
                    onClick={handlePrevCollaboration}
                    className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-600"
                  >
                    <FaArrowLeft />
                  </button>
                  <button
                    onClick={handleNextCollaboration}
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-600"
                  >
                    <FaArrowRight />
                  </button>
                </div>
              </div>)
            }
          </section>
        }

        {/* Formations Section */}
        <section className={(formations && formations.length > 0) ? "py-16 bg-gray-100" : "py-0 bg-gray-100"} >
          {(isLoadingF) ? (
            <div className="flex justify-center items-center h-56">
              {/* @ts-ignore */}
              {isLottie && <Lottie options={loadingOptions} height={200} width={200} />}
            </div>
          ) :
            formations && formations.length > 0 && (<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold text-center mb-8">Nos formations récentes</h2>
              <div className="relative">
                <div className={(formations.length == 1 ? "md:grid-cols-1" : formations.length == 2 ? "md:grid-cols-2" : "md:grid-cols-3 ") + " grid grid-cols-1 gap-8"}>
                  <AnimatePresence>
                    {getVisibleItemsFormations().map((formation, index) => (
                      <motion.div
                        key={index}
                        className="bg-white flex flex-col items-center rounded-lg shadow-md overflow-hidden"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -50 }}
                        transition={{ duration: 0.5 }}
                      ><Link href={`/formations/${formation.id}`}>
                          {formation.photo && <img
                            src={formation.photo}
                            alt={formation.name}
                            className={"" + (formations.length < 3 && "w-full h-[300px] object-contain")}
                          />}
                          <div className={"p-4 " + (formations.length < 3 && " text-center")}>
                            <h3 className="font-semibold text-xl mb-2">{formation.name}</h3>
                            {formation.startDate && formation.endDate && formation.isRegistrationAllowed && new Date(formation.startDate) >= new Date() && <p className="text-sm text-gray-600 mb-2">
                              Du {formation.startDate.toLocaleDateString()} au {formation.endDate.toLocaleDateString()}
                            </p>}
                            {(formation.price || formation.price != 0) &&
                              <p className="font-bold text-lg mb-2">{formation.price + ".00 DA"}</p>}
                            <p>{isSmallScreen ? formation.remarks.substring(0, 100) : formation.remarks.substring(0, 200)}</p>
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                {/* Boutons pour navigation */}
                <button
                  onClick={handlePrevFormation}
                  className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-600"
                >
                  <FaArrowLeft />
                </button>
                <button
                  onClick={handleNextFormation}
                  className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-600"
                >
                  <FaArrowRight />
                </button>
              </div>
            </div>
            )}
        </section>

        {/* About Section */}
        <section className="py-16 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-6 tracking-wide">
              À propos de nous
            </h2>
            <p className="text-xl text-gray-700 text-center max-w-2xl mx-auto mb-8 leading-relaxed">
              {about}
            </p>
            <div className="flex justify-center">
              <div className="w-16 h-1 bg-blue-500 rounded-full"></div>
            </div>
          </div>
        </section>

        <div className="my-4 grid grid-cols-1 md:grid-cols-2 gap-12 p-8 bg-gray-100">
          {/* Section Nos Missions */}
          <motion.div
            className="bg-white p-8 rounded-xl shadow-xl transform hover:scale-105 transition-transform duration-300"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <h2 className="text-2xl font-bold text-blue-600 mb-6 text-center">
              Nos Missions
            </h2>
            <ul className="space-y-2">
              {missions.map((mission, index) => (
                <motion.li
                  key={index}
                  className="flex items-start space-x-4"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.2, duration: 0.5 }}
                >
                  <span className="w-4 h-4 bg-blue-600 rounded-full mt-2"></span>
                  <p className="text-gray-700 text-sm">{mission}</p>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Section Nos Valeurs */}
          <motion.div
            className="bg-white p-8 rounded-xl shadow-xl transform hover:scale-105 transition-transform duration-300"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <h2 className="text-2xl font-bold text-blue-600 mb-6 text-center">
              Nos Valeurs
            </h2>
            <ul className="space-y-2">
              {valeurs.map((valeur, index) => (
                <motion.li
                  key={index}
                  className="flex items-start space-x-4"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.2, duration: 0.5 }}
                >
                  <span className="w-4 h-4 bg-blue-600 rounded-full mt-2"></span>
                  <p className="text-gray-700 text-sm">{valeur}</p>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
        <section className="py-16 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-6 tracking-wide">
              Notre Vision
            </h2>
            <p className="text-xl text-gray-700 text-center max-w-2xl mx-auto mb-8 leading-relaxed">
              Le Grp Formactive Center aspire à transformer le paysage de la formation continue en répondant directement aux besoins en formation et inspirer la culture d’apprentissage tout au long de la vie.
            </p>
            <div className="flex justify-center">
              <div className="w-16 h-1 bg-blue-500 rounded-full"></div>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="py-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-8">Contactez-nous</h2>
            <form
              onSubmit={handleSubmit}
              className="m-auto mt-8 space-y-6 max-w-[600px] p-8 bg-white rounded-lg shadow-md border border-gray-200"
            >
              <h2 className="text-3xl font-semibold text-center text-blue-600 mb-4">
                Contactez-Nous
              </h2>
              <div className="space-y-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Nom"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                />
                <textarea
                  name="content"
                  placeholder="Votre message"
                  value={formData.content}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
              >
                Envoyer
              </button>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

