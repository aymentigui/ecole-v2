'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { collaborationSchema } from '@/util/schema/events'
import { ImageIcon as ImageLucide, Calendar, Building2, DollarSign, MapPin, Phone, Clock } from 'lucide-react'
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { notFound, useParams } from 'next/navigation'
import { Collaboration } from '@/util/types'

type EventFormValues = z.infer<typeof collaborationSchema>

export default function EditEventPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [collaboration, setCollaboration] = useState<Collaboration | null>(null);
  const { id } = useParams()
  const form = useForm<EventFormValues>({
    resolver: zodResolver(collaborationSchema),
  })

  const fetchData = async () => {
    try {
      const response = await fetch(`/api/collaboration?id=${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setCollaboration(data);
    } catch (error) {
      console.error("Error fetching collaboration:", error);
      notFound()
    } finally {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (form.formState.isDirty) {
      form.reset(form.getValues())
    }
    fetchData()
  }, [])

  useEffect(() => {
    if (collaboration) {
      form.reset({
        name: collaboration.name,
        startDate: new Date(collaboration.startDate),
        endDate: new Date(collaboration.endDate),
        company: collaboration.company,
        price: collaboration.price || 0,
        address: collaboration.address || '',
        phone1: collaboration.phone1 || '',
        phone2: collaboration.phone2 || '',
        numberOfDays: collaboration.numberOfDays || 1,
        numberOfHours: collaboration.numberOfHours || 1,
        numberOfSessions: collaboration.numberOfSessions || 1,
        sessionDuration: collaboration.sessionDuration || 1,
        remarks: collaboration.remarks || '',
        isRegistrationAllowed: collaboration.isRegistrationAllowed || false,
      });
      if (collaboration.photo) {
        setPreviewImage(collaboration.photo);
      }
    }
  }, [collaboration]);

  async function onSubmit(data: EventFormValues) {
    setIsSubmitting(true)
    try {
      const formData = new FormData()
      const {photo,...jsonData} = data

      if(photo)
        formData.append('photo', photo)
      formData.append('id', String(id))
      formData.append('data', JSON.stringify(jsonData))

      const response = await fetch('/api/collaboration', {
        method: 'PUT',
        body: formData,
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erreur inconnue');
      }
  
      await response.json();
      alert('Événement modifié avec succès !');
    } catch (error:any) {
      console.error('Erreur lors de la modification de l\'événement:', error);
      alert(error.message || 'Une erreur est survenue lors de la modification de l\'événement.');
    } finally {
      setIsSubmitting(false);
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewImage(reader.result as string)
        form.setValue('photo', e.target.files?.[0] as File)
      }
      reader.readAsDataURL(file)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin w-16 h-16 border-4 border-blue-400 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if(!collaboration)
    notFound()

  return (
    <div className="container max-w-4xl mx-auto px-4 py-8">
      <Card className="bg-white shadow-lg rounded-lg overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-blue-500 to-teal-500 text-white p-6">
          <CardTitle className="text-3xl font-bold">Modifier l'événement</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-semibold">Nom de l'événement</FormLabel>
                    <FormControl>
                      <Input placeholder="Nom de l'événement" {...field} className="border-2 border-gray-300 focus:border-blue-500 rounded-md p-2" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="flex items-center space-x-3 mb-4">
                <FormField
                  control={form.control}
                  name="isRegistrationAllowed"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-3 rounded-md border p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          id="isRegistrationAllowed"
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel htmlFor="isRegistrationAllowed">
                          Permettre les inscriptions
                        </FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-4">
                <FormLabel className="text-lg font-semibold">Photo de l'événement</FormLabel>
                <div className="flex items-center gap-4">
                  {previewImage ? (
                    <div className="w-32 h-32 border-2 border-blue-500 rounded-lg overflow-hidden flex">
                      <Image src={previewImage} alt="Prévisualisation" width={128} height={128} className="object-cover" />
                    </div>
                  ) : (
                    <div className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-400">
                      <ImageLucide size={48} />
                    </div>
                  )}
                  <label className="flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded-md cursor-pointer hover:bg-blue-600 transition duration-300">
                    <span>Changer l'image</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg font-semibold">Date de début</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <Input type="date" {...field} value={field.value ? new Date(field.value).toISOString().split('T')[0] : ''} className="!pl-10 border-2 border-gray-300 focus:border-blue-500 rounded-md p-2" />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="endDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg font-semibold">Date de fin</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <Input type="date" {...field} value={field.value ? new Date(field.value).toISOString().split('T')[0] : ''} className="!pl-10 border-2 border-gray-300 focus:border-blue-500 rounded-md p-2" />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="company"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg font-semibold">Société</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <Input placeholder="Nom de la société" {...field} className="!pl-10 border-2 border-gray-300 focus:border-blue-500 rounded-md p-2" />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg font-semibold">Prix</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <Input type="number" placeholder="0" {...field} onChange={e => field.onChange(parseFloat(e.target.value))} className="!pl-10 border-2 border-gray-300 focus:border-blue-500 rounded-md p-2" />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-semibold">Adresse</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <Input placeholder="Adresse de l'événement" {...field} className="!pl-10 border-2 border-gray-300 focus:border-blue-500 rounded-md p-2" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="phone1"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg font-semibold">Numéro de téléphone 1</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <Input placeholder="0556772333" {...field} className="!pl-10 border-2 border-gray-300 focus:border-blue-500 rounded-md p-2" />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone2"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg font-semibold">Numéro de téléphone 2 (optionnel)</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <Input placeholder="0556772333" {...field} className="!pl-10 border-2 border-gray-300 focus:border-blue-500 rounded-md p-2" />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="numberOfDays"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg font-semibold">Nombre de jours</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <Input type="number" {...field} onChange={e => field.onChange(parseInt(e.target.value, 10))} className="!pl-10 border-2 border-gray-300 focus:border-blue-500 rounded-md p-2" />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="numberOfHours"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg font-semibold">Nombre d'heures (optionnel)</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <Input type="number" {...field} onChange={e => field.onChange(e.target.value ? parseInt(e.target.value, 10) : undefined)} className="!pl-10 border-2 border-gray-300 focus:border-blue-500 rounded-md p-2" />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="numberOfSessions"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg font-semibold">Nombre de séances (optionnel)</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <Input type="number" {...field} onChange={e => field.onChange(e.target.value ? parseInt(e.target.value, 10) : undefined)} className="!pl-10 border-2 border-gray-300 focus:border-blue-500 rounded-md p-2" />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="sessionDuration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-semibold">Durée de chaque séance en heures (optionnel)</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <Input type="number" step="0.5" {...field} onChange={e => field.onChange(e.target.value ? parseFloat(e.target.value) : undefined)} className="!pl-10 border-2 border-gray-300 focus:border-blue-500 rounded-md p-2" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="remarks"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-semibold">Remarques (optionnel)</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Remarques supplémentaires" {...field} className="border-2 border-gray-300 focus:border-blue-500 rounded-md p-2 min-h-[100px]" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {Object.keys(form.formState.errors).length > 0 && (
                  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mt-6">
                    <h4 className="font-semibold">Erreurs détectées :</h4>
                    <ul className="list-disc pl-5">
                      {Object.entries(form.formState.errors).map(([field, error]) => (
                        <li key={field}>
                          <strong>{field}</strong> : {(error as any)?.message || 'Erreur non spécifiée'}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-blue-500 to-teal-500 text-white py-2 px-4 rounded-md hover:from-blue-600 hover:to-teal-600 transition duration-300"
              >
                {isSubmitting ? 'Mise à jour en cours...' : 'Mettre à jour l\'événement'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}

