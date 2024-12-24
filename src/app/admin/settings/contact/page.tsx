'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { updateContactInfo, updateContactImage, getContactSettings, resetContactImage } from '@/actions/settings'

export default function ContactSettings() {
  const router = useRouter()
  const [contactInfo, setContactInfo] = useState({
    address: '',
    phone1: '',
    phone2: '',
    email: '',
  })
  const [contactImage, setContactImage] = useState('/contact.png')

  useEffect(() => {
    async function fetchData() {
      const data = await getContactSettings()
      setContactInfo({
        address: data.address ?? "",
        phone1: data.phone1 ?? "",
        phone2: data.phone2 ?? "",
        email: data.contactEmail?? "",
      })
      if(data.contactImageUrl)
        setContactImage(data.contactImageUrl)
    }
    fetchData()
  }, [])

  const handleContactInfoChange = async () => {
    await updateContactInfo(contactInfo)
    router.refresh()
  }

  const handleImageReset = async () => {
    await resetContactImage()
    setContactImage("/contact.png")
  }

  const handleContactImageChange = async (file: File) => {
    const newImageUrl = await updateContactImage(file)
    if(newImageUrl)
        setContactImage(newImageUrl)
  }

  return (
    <div className="space-y-6 m-8">
      <div>
        <Input
          type="text"
          value={contactInfo.address}
          onChange={(e) => setContactInfo(prev => ({ ...prev, address: e.target.value }))}
          placeholder="Address"
          className='m-4'
        />
        <Input
          type="tel"
          value={contactInfo.phone1}
          onChange={(e) => setContactInfo(prev => ({ ...prev, phone1: e.target.value }))}
          placeholder="Phone 1"
          className='m-4'
        />
        <Input
          type="tel"
          value={contactInfo.phone2}
          onChange={(e) => setContactInfo(prev => ({ ...prev, phone2: e.target.value }))}
          placeholder="Phone 2"
          className='m-4'
        />
        <Input
          type="email"
          value={contactInfo.email}
          onChange={(e) => setContactInfo(prev => ({ ...prev, email: e.target.value }))}
          placeholder="Email"
          className='m-4'
        />
        <Button onClick={handleContactInfoChange}>Confirm</Button>
      </div>

      <div>
        <div 
          onClick={() => document.getElementById('contact-image-input')?.click()}
          className="w-64 h-32 border cursor-pointer"
        >
          <Image src={contactImage} alt="Contact" width={256} height={128} />
        </div>
        <input
          id="contact-image-input"
          type="file"
          hidden
          onChange={(e) => e.target.files && handleContactImageChange(e.target.files[0])}
        />
        <Button className='my-8' onClick={() => handleImageReset()}>Reset</Button>
      </div>
    </div>
  )
}

