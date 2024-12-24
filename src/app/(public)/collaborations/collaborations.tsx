"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import { CollaborationCard } from "../components/collaboration-card"
import loadingAnimation from "@/../public/loading.json";
import dynamic from 'next/dynamic';
const Lottie = dynamic(() => import('react-lottie'), { ssr: false });
import { allCollaborations } from "@/actions/requetes"

export function CollaborationsContent() {
  const [search, setSearch] = useState("")
  const [collaborations, setCollaborations] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const filteredCollaborations = collaborations.filter((collaboration) =>
    collaboration.name.toLowerCase().includes(search.toLowerCase())
  )
  const fetchData = async () => {
    try {
      const responce = await allCollaborations();
      if(responce.success)
        setCollaborations(responce.data);
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
            {filteredCollaborations.map((collaboration, index) => (
              <motion.div
                key={collaboration.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: index * 0.1,
                  duration: 0.5,
                  ease: "easeInOut",
                }}
              >
                <CollaborationCard collaboration={collaboration} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
      {filteredCollaborations.length === 0 && !isLoading && (
        <p className="text-center text-gray-500 mt-8">
          Aucune collaborations ne correspond à votre recherche.
        </p>
      )}
    </div>
  )
}

