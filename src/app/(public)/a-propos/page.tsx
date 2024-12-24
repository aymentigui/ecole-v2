"use client"

import Image from 'next/image'
import { motion } from 'framer-motion'  
import { Footer } from '../components/Footer'
import { Navbar } from '../components/Navbar'
import { useEffect, useState } from 'react'
import { getAboutSettings } from '@/actions/settings'

export default function About() {
  const [about,setAbout]=useState(`Fondée il y a plus de 20 ans, notre école de formation s'est toujours efforcée de fournir une éducation de qualité et innovante. Nous avons commencé avec une petite équipe passionnée et avons grandi pour devenir l'un des leaders de la formation professionnelle en France.
                          Notre mission est de préparer nos étudiants aux défis du monde professionnel en leur offrant des formations adaptées aux besoins du marché et en constante évolution.`)
  
  const [image,setImage]=useState<undefined|string>()
  useEffect(()=>{
    getAboutSettings().then((data)=>{
      setAbout((p)=>data.siteDescription??about)
      setImage(p=>(data.descriptionImageUrl??"/formation.png"))
    })
  },[])
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
            À propos de notre école
          </motion.h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              {image && <Image src={image} alt="Notre école" width={600} height={400} className="rounded-lg h-[350px] object-cover object-top" />}
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <h2 className="text-2xl font-semibold mb-4">Notre histoire</h2>
              <p className="mb-4 leading-8">
                {about}
              </p>
            </motion.div>
          </div>
          
    <motion.div
      className="mt-16 bg-gradient-to-r from-blue-50 to-blue-100 p-8 rounded-lg shadow-lg"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.5 }}
    >
      <h2 className="text-3xl font-extrabold text-blue-800 mb-6 text-center">Nos Valeurs</h2>
      <ul className="space-y-4">
        {[
          'Excellence académique',
          'Innovation pédagogique',
          'Accompagnement personnalisé',
          'Éthique et responsabilité',
          'Ouverture sur le monde professionnel',
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
      </main>
      <Footer />
    </div>
  )
}

