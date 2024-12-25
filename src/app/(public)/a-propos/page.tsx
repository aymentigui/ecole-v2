"use client"

import { motion } from 'framer-motion'
import { Footer } from '../components/Footer'
import { Navbar } from '../components/Navbar'
import { useEffect, useState } from 'react'
import { getAboutSettings } from '@/actions/settings'

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
          <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
            <motion.div
              className="mt-16 bg-gradient-to-r from-blue-50 to-blue-100 p-8 rounded-lg shadow-lg"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <h2 className="text-3xl font-extrabold text-blue-800 mb-6 text-center">Nos Mission</h2>
              <p className="mb-4 leading-8">
                Le Groupement Formactive Center poursuit une mission claire
              </p>
              <ul className="space-y-4">
                {[
                  'Inspirer le développement en transformant la formation continue en levier',
                  'permanent d’apprentissage et de progrès individuel et collectif ',
                  'Renforcer les compétences individuellesOffrir aux apprenants les connaissances et les outils nécessaires pour exceller dans leur carrière et s\'adapter aux défis d\’un monde en constante évolution.',
                  'Accompagner les entreprises dans leur croissance Offrir un accompagnement complet et stratégique pour aider les entreprises à développer leur capital humain et à atteindre leurs objectifs de performance.',
                ].map((mission, index) => (
                  <motion.li
                    key={index}
                    className="flex items-center space-x-4"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.2, duration: 0.4 }}
                  >
                    <span className="w-3 h-3 bg-blue-500 rounded-full flex-shrink-0"></span>
                    <span className="text-lg font-medium text-gray-700">{mission}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              className="mt-16 bg-gradient-to-r from-blue-50 to-blue-100 p-8 rounded-lg shadow-lg"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <h2 className="text-3xl font-extrabold text-blue-800 mb-6 text-center">Nos Valeurs</h2>
              <ul className="space-y-4">
                {[
                  'Ouverture sur le monde professionnel',
                  'Accessibilité : La formation doit être accessible à tous et à toutes. C\’est pourquoi nous nous efforçons de proposer des programmes flexibles et inclusifs.',
                  'Adaptabilité : Anticiper et répondre aux défis émergents dans un monde en constante évolution.',
                  'Innovation : Développer des approches et des outils novateurs pour offrir des solutions de formation adaptées aux besoins en évolution des individus et des entreprises.',
                  'Éthique et transparence : Nous opérons avec intégrité et transparence, en privilégiant des relations de confiance avec tous nos interlocuteurs.'
                ].map((valeur, index) => (
                  <motion.li
                    key={index}
                    className="flex items-center space-x-4"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.2, duration: 0.4 }}
                  >
                    <span className="w-3 h-3 bg-blue-500 rounded-full flex-shrink-0"></span>
                    <span className="text-lg font-medium text-gray-700">{valeur}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
          <motion.div
            className="mt-16 bg-gradient-to-r from-blue-50 to-blue-100 p-8 rounded-lg shadow-lg"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <h2 className="text-3xl font-extrabold text-blue-800 mb-6 text-center">Notre Vision</h2>
            <ul className="space-y-4">
              {[
                'Le Grp Formactive Center aspire à transformer le paysage de la formation continue en répondant directement aux besoins en formation et inspirer la culture d\’apprentissage tout au long de la vie.',
              ].map((mission, index) => (
                <motion.li
                  key={index}
                  className="flex items-center space-x-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.2, duration: 0.4 }}
                >
                  <span className="w-3 h-3 bg-blue-500 rounded-full flex-shrink-0"></span>
                  <span className="text-lg font-medium text-gray-700">{mission}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

