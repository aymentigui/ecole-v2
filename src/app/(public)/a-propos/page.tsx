"use client"

import { motion } from 'framer-motion'
import { Footer } from '../components/Footer'
import { Navbar } from '../components/Navbar'
import { useEffect, useState } from 'react'
import { getAboutSettings } from '@/actions/settings'

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

export default function About() {
  const [about, setAbout] = useState(``)

  const [image, setImage] = useState<undefined | string>()
  useEffect(() => {
    getAboutSettings().then((data) => {
      setAbout((p) => data.siteDescription ?? `Créé en 2022 sous la dénomination Groupement Formactive Center, notre
collectif s'est fixé comme ambition principale de favoriser la formation
continue. Avec une approche novatrice centrée sur les entreprises et les
individus, de développement personnel et professionnel`)
      setImage(p => (data.descriptionImageUrl ?? "/formation.png"))
    })
  }, [])
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h1
            className="text-4xl font-bold text-center mb-8"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            À propos de nous
          </motion.h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              {image && <img src={image} alt="Notre Entreprise" className="rounded-lg w-[600px] h-[350px] object-cover object-top" />}
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className='flex flex-col justify-center items-center'
            >
              <h2 className="text-2xl font-semibold mb-4">Notre histoire</h2>
              <p className="mb-4 text-center leading-8">
                {about}
              </p>
            </motion.div>
          </div>
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
          <motion.div
            className="mt-12 mx-4 md:mx-auto max-w-4xl bg-gradient-to-br from-blue-50 to-blue-200 p-10 rounded-3xl shadow-xl transform hover:scale-105 transition-transform duration-300"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-blue-800 mb-8 text-center tracking-wide">
              Notre Vision
            </h2>
            <p className="text-lg text-gray-700 leading-8 mb-6 text-center">
              Le Grp Formactive Center aspire à transformer le paysage de la formation continue en répondant directement aux besoins en formation et inspirer la culture d’apprentissage tout au long de la vie.
            </p>
            <motion.div
              className="flex items-center justify-center mt-6"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center shadow-md">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12h6m2 2H7m8-6H9m4-4h-2m2 12h-2m2 6H9m12-12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

