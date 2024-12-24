"use client";

import { useEffect, useState } from "react";
import Pagination from "../components/table/pagination-table";
import InscriptionsTable from "../components/table/clients/table";
import SearchBar from "../components/table/searchBar-table";
import { useSearchParams } from "next/navigation";
import { Inscription } from "@/util/types";
import loadingAnimation from "@/../public/loading.json";
import dynamic from 'next/dynamic';
const Lottie = dynamic(() => import('react-lottie'), { ssr: false });

export default function ClientsPage(props:any) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const itemsPerPage = 30;
  const id = props.params.id 
  const [inscriptions, setInscriptions] = useState<Inscription[]>([]);

  const filteredByUrlParams = inscriptions.filter((inscription) => {
    if (id ) {
      return (  
        inscription.Formation.id == id 
      );
    }
    return true; // Si aucun paramètre n'est spécifié, ne filtre pas
  });

  // Appliquer les filtres basés sur la barre de recherche
  const filteredBySearch = filteredByUrlParams.filter((inscription) => {
    return (
      inscription.nom.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inscription.prenom.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inscription.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inscription.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inscription.Formation.id === searchQuery
    );
  });

  const totalPages = Math.ceil(filteredBySearch.length / itemsPerPage);
  const paginatedData = filteredBySearch.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const fetchData = async () => {
    try {
      const response = await fetch("/api/inscription");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setInscriptions(data);
    } catch (error) {
      console.error("Error fetching collaborations:", error);
    } finally {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setIsLoading(false)
      setCurrentPage(1);
      //setIsLoading(false);
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
    <div className="container px-2 py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Inscriptions</h1>
      </div>
      <SearchBar searchQuery={searchQuery} onSearchChange={(query) => {
        setSearchQuery(query);
        setCurrentPage(1);
      }} />
      {isLoading ? (
        <div className="flex justify-center items-center h-96">
          {/* @ts-ignore */}
          <Lottie options={loadingOptions} height={200} width={200} />
        </div>
      ) : (
        <>
          <InscriptionsTable inscriptions={paginatedData}  />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      )}
      
    </div>
  );

}
