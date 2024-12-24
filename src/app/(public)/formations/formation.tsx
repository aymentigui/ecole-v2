"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import { FormationCard } from "../components/formation-card"
import loadingAnimation from "@/../public/loading.json";
import dynamic from 'next/dynamic';
const Lottie = dynamic(() => import('react-lottie'), { ssr: false });
import { allFormations } from "@/actions/requetes"

export function FormationsContent() {
  const [search, setSearch] = useState("")
  const [formations, setFormations] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const filteredFormations = formations.filter((formation) =>
    formation.name.toLowerCase().includes(search.toLowerCase())
  )

  const fetchData = async () => {
    try {
      const responce = await allFormations();
      if(responce.success)
        setFormations(responce.data);
    } catch (error) {
      console.error("Error fetching collaborations:", error);
    } finally {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setIsLoading(false);
    }
  };
  useEffect(() => {
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
    <div>
      <div className="mb-8 flex justify-center">
        <Input
          type="text"
          placeholder="Recherchez une Collaboration..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-md"
        />
      </div>
      <div>
        {isLoading ? (
          <div className="flex justify-center items-center h-56">
            {/* @ts-ignore */}
            <Lottie options={loadingOptions} height={200} width={200} />
          </div>
        ) : ( 
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredFormations.map((formation, index) => (
            <motion.div
              key={formation.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: index * 0.1,
                duration: 0.5,
                ease: "easeInOut",
              }}
            >
              <FormationCard formation={formation} />
            </motion.div>
          ))}
          </div>
        )}
        
      </div>
      {filteredFormations.length === 0 && !isLoading && (
        <p className="text-center text-gray-500 mt-8">
          Aucune collaborations ne correspond à votre recherche.
        </p>
      )}
    </div>
  )
}

