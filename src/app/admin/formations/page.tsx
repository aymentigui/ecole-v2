"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import SearchBar from "../components/table/searchBar-table";
import Pagination from "../components/table/pagination-table";
import FormationTable from "../components/table/formation/table";
import { Formation } from "@/util/types";
import loadingAnimation from "@/../public/loading.json";
import dynamic from 'next/dynamic';
const Lottie = dynamic(() => import('react-lottie'), { ssr: false });

export default function EventsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [formations, setFormations] = useState<Formation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const itemsPerPage = 10;

  const filteredData = formations.filter((formation) => {
    return (
      formation.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });
  const fetchData = async () => {
    try {
      const response = await fetch("/api/formation");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setFormations(data);
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


  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

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
        <h1 className="text-3xl font-bold">Formations</h1>
        <Link href="/admin/formations/add">
          <Button>Ajouter une formation</Button>
        </Link>
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
          <FormationTable formations={paginatedData} onDlt={fetchData} />
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
