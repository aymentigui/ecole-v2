'use client'

import { useState } from 'react'
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

type EventFormValues = z.infer<typeof collaborationSchema>

export default function AddEventPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [previewImage, setPreviewImage] = useState<string | null>(null)

  const form = useForm<EventFormValues>({
    resolver: zodResolver(collaborationSchema),
    defaultValues: {
      name: '',
      startDate: new Date(),
      endDate: new Date(),
      company: '',
      price: 0,
      address: '',
      phone1: '',
      phone2: '',
      numberOfDays: 1,
      numberOfHours: undefined,
      numberOfSessions: undefined,
      sessionDuration: undefined,
      remarks: '',
    },
  })

  async function onSubmit(data: EventFormValues) {
    setIsSubmitting(true);
    
    try {
      const formData = new FormData()
      const {photo,...jsonData} = data
      if(photo)
        formData.append('photo', photo)
      else 
        throw new Error('Il faut ajouter une image');
      formData.append('data', JSON.stringify(jsonData))

      const response = await fetch('/api/collaboration', {
        method: 'POST',
        body: formData,
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erreur inconnue');
      }
  
      await response.json();
      alert('Événement ajouté avec succès !');
      form.reset();
      setPreviewImage(null);
    } catch (error:any) {
      console.error('Erreur lors de l\'ajout de l\'événement:', error);
      alert(error.message || 'Une erreur est survenue lors de l\'ajout de l\'événement.');
    } finally {
      setIsSubmitting(false);
    }
  }
  

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      form.setValue('photo', file); 
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="container max-w-4xl mx-auto px-4 py-8">
      <Card className="bg-white shadow-lg rounded-lg overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-blue-900 to-blue-500 text-white p-6">
          <CardTitle className="text-3xl font-bold">Ajouter un événement</CardTitle>
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
                      <Input placeholder="Nom de l'événement" {...field} className="border-2 border-gray-300 focus:border-purple-500 rounded-md p-2" />
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
                    <div className="w-32 h-32 border-2 border-purple-500 rounded-lg overflow-hidden flex">
                      <Image src={previewImage} alt="Prévisualisation" width={128} height={128} className="object-cover" />
                    </div>
                  ) : (
                    <div className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-400">
                      <ImageLucide size={48} />
                    </div>
                  )}
                  <label className="flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded-md cursor-pointer hover:bg-blue-900 transition duration-300">
                    <span>Choisir une image</span>
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

              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-blue-900 to-blue-500 text-white py-2 px-4 rounded-md hover:from-blue-600 hover:to-blue-600 transition duration-300"
              >
                {isSubmitting ? 'Ajout en cours...' : 'Ajouter l\'événement'}
              </Button>
              {Object.keys(form.formState.errors).length > 0 && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                  <strong className="font-bold">Erreurs de validation :</strong>
                  <ul className="mt-2 ml-4 list-disc">
                    {Object.entries(form.formState.errors).map(([key, error]) => (
                      <li key={key}>{error.message}</li>
                    ))}
                  </ul>
                </div>
              )}
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}

