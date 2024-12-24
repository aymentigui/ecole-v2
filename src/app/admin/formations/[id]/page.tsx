"use client"
import { notFound, useParams } from 'next/navigation'
import Image from 'next/image'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarIcon, MapPinIcon, PhoneIcon, ClockIcon,  InfoIcon } from 'lucide-react'
import { formationSchema } from '@/util/schema/formation'
import { z } from 'zod'
import { FaMoneyBill } from 'react-icons/fa6'
import { Formation } from '@/util/types'
import { useEffect, useState } from 'react'


type FormationFormValues = z.infer<typeof formationSchema>


export default function EventPage(params:any) {
  const [formation, setFormation] = useState<Formation | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams()
  const fetchData = async () => {
    try {
      const response = await fetch(`/api/formation?id=${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setFormation(data);
    } catch (error) {
      console.error("Error fetching formation:", error);
      notFound()
    } finally {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);


  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin w-16 h-16 border-4 border-blue-400 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!formation) {
    notFound()
  }

  const InfoItem = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: string | number | undefined }) => {
    if (value === undefined) return null;
    return (
      <div className="flex items-center space-x-2">
        {icon}
        <span className="font-semibold">{label}:</span>
        <span>{value}</span>
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">{formation.name}</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            {formation.photo && (
              <Image
                src={formation.photo}
                alt={formation.name}
                width={500}
                height={300}
                className="rounded-lg object-cover w-full h-64 mb-4"
              />
            )}
            <Card>
              <CardContent className="space-y-4 pt-6">
                {formation.startDate && formation.endDate && (
                  <InfoItem
                    icon={<CalendarIcon className="w-5 h-5 text-blue-500" />}
                    label="Dates"
                    value={`${format(formation.startDate, 'dd MMMM yyyy', { locale: fr })} - ${format(formation.endDate, 'dd MMMM yyyy', { locale: fr })}`}
                  />
                )}
                <InfoItem
                  icon={<FaMoneyBill className="w-5 h-5 text-green-500" />}
                  label="Prix"
                  value={formation.price !== undefined ? `${formation.price} DA` : undefined}
                />
                <InfoItem
                  icon={<MapPinIcon className="w-5 h-5 text-red-500" />}
                  label="Adresse"
                  value={formation.address}
                />
              </CardContent>
            </Card>
          </div>
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Informations de contact</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <InfoItem
                  icon={<PhoneIcon className="w-5 h-5 text-indigo-500" />}
                  label="Téléphone 1"
                  value={formation.phone1}
                />
                <InfoItem
                  icon={<PhoneIcon className="w-5 h-5 text-indigo-500" />}
                  label="Téléphone 2"
                  value={formation.phone2}
                />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Détails de la formation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <InfoItem
                  icon={<CalendarIcon className="w-5 h-5 text-orange-500" />}
                  label="Nombre de jours"
                  value={formation.numberOfDays}
                />
                <InfoItem
                  icon={<ClockIcon className="w-5 h-5 text-blue-500" />}
                  label="Nombre d'heures"
                  value={formation.numberOfHours}
                />
                <InfoItem
                  icon={<CalendarIcon className="w-5 h-5 text-orange-500" />}
                  label="Nombre de séances"
                  value={formation.numberOfSessions}
                />
                <InfoItem
                  icon={<ClockIcon className="w-5 h-5 text-blue-500" />}
                  label="Durée de chaque séance"
                  value={formation.sessionDuration ? `${formation.sessionDuration} heures` : undefined}
                />
              </CardContent>
            </Card>
            {formation.remarks && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Remarques</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-start space-x-2">
                    <InfoIcon className="w-5 h-5 text-yellow-500 mt-1" />
                    <p className="text-gray-600">{formation.remarks}</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

