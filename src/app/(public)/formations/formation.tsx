"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import { FormationCard } from "../components/formation-card"
import loadingAnimation from "@/../public/loading.json";
import dynamic from 'next/dynamic';
const Lottie = dynamic(() => import('react-lottie'), { ssr: false });
import { allFormations } from "@/actions/requetes"
import { categories } from "@/util/data"

export function FormationsContent() {
  const [search, setSearch] = useState("")
  const [searchCategory, setSearchCategory] = useState("")
  const [formations, setFormations] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredFormations = formations.filter((formation) =>
  {
    if(formation.category){
      return formation.name.toLowerCase().includes(search.toLowerCase()) &&
      formation.category.toLowerCase().includes(searchCategory.toLowerCase())
    }else{
      return formation.name.toLowerCase().includes(search.toLowerCase()) 
    }
  }
  )

  const fetchData = async () => {
    try {
      const responce = await allFormations();
      if(responce.success)
        setFormations(responce.data);
    } catch (error) {
      console.error("Error fetching formation:", error);
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
      <div className="mb-4">
        <div className="overflow-x-auto flex space-x-4 py-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() =>{ 
                if(category==selectedCategory){
                  setSelectedCategory("")
                  setSearchCategory("");
                }else{
                  setSelectedCategory(category)
                  setSearchCategory(category);
                }
              }}
              className={`h-16 text-nowrap font-bold text-xs px-4 rounded-lg transition duration-200 
                ${selectedCategory === category ? "bg-blue-500 text-white" : "bg-green-200 text-gray-700"}`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
      <div className="mb-8 flex justify-center">
        <Input
          type="text"
          placeholder="Recherchez une Formation..."
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
          Aucune formation ne correspond à votre recherche.
        </p>
      )}
    </div>
  )
}

