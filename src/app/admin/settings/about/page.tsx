'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { updateDescription, updateDescriptionImage, getAboutSettings, resetPhotoDescription } from "@/actions/settings"

export default function AboutSettings() {
  const router = useRouter()
  const [description, setDescription] = useState('')
  const [descriptionImage, setDescriptionImage] = useState('/formation.png')

  useEffect(() => {
    async function fetchData() {
      const data = await getAboutSettings()
      if(data.siteDescription)
        setDescription(data.siteDescription)
      if(data.descriptionImageUrl)
        setDescriptionImage(data.descriptionImageUrl)
    }
    fetchData()
  }, [])

  const handleDescriptionChange = async () => {
    await updateDescription(description)
    router.refresh()
  }

  const handleDescriptionImageChange = async (file: File) => {
    const newImageUrl = await updateDescriptionImage(file)
    if(newImageUrl)
        setDescriptionImage(newImageUrl)
  }

  const handleDescriptionReset = async () => {
    await resetPhotoDescription()
    setDescriptionImage("/formation.png")
  }

  return (
    <div className="space-y-6 p-8">
      <div>
        <h1 className='text-xl font-bold my-4'>la description de site :</h1>
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Site Description"
          rows={5}
        />
        <Button className='my-4' onClick={handleDescriptionChange}>Confirm</Button>
      </div>

      <div className='overflow-hidden'>
        <div 
          onClick={() => document.getElementById('description-image-input')?.click()}
          className="w-64 h-32 border cursor-pointer"
        >
          <Image src={descriptionImage} alt="Description" className='w-64 h-32 object-contain' width={256} height={128} />
        </div>
        <input
          id="description-image-input"
          type="file"
          hidden
          onChange={(e) => e.target.files && handleDescriptionImageChange(e.target.files[0])}
        />
        <Button className='my-8' onClick={() => handleDescriptionReset()}>Reset</Button>
      </div>
    </div>
  )
}

