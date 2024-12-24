"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Pagination from "../components/table/pagination-table";
import MessagesTable from "../components/table/messages/table";
import { Message } from "@/util/types";
import loadingAnimation from "@/../public/loading.json";
import dynamic from 'next/dynamic';
const Lottie = dynamic(() => import('react-lottie'), { ssr: false });
import SearchBar from "../components/table/searchBar-table";

export default function MessagesPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const itemsPerPage = 10;

  const filteredData = messages.filter((message) => {
    return (
      message.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });
  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/message");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setMessages(data);
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

  const handlerRead= async()=>{
    try {
      const data={}
      const jsonData=JSON.stringify(data)
      const response = await fetch('/api/message', {
        method: 'PATCH',
        body:jsonData,
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erreur inconnue');
      }
      await response.json();
      fetchData()
    } catch (error:any) {
      console.error('Erreur lors de la modification de la formation:', error);
      alert(error.message || 'Une erreur est survenue lors de la modification de la formation.');
    } 
  }

  return (
    <div className="container px-2 py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Messages</h1>
        <Button onClick={handlerRead}>Marquer</Button>
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
          <MessagesTable messages={paginatedData} />
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
