'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { updateSiteName, updateSlice, resetSlice, updateLogo, getGeneralSettings, resetLogo, updateSlideTextName } from '@/actions/settings'
import toast from 'react-hot-toast'

export default function GeneralSettings() {
  const router = useRouter()
  const [siteName, setSiteName] = useState('')
  const [logo, setLogo] = useState('/logo.png')
  const [slices, setSlices] = useState(['/slice1.png', '/slice2.png', '/slice3.png'])
  const [sliceText1, setSliceText1] = useState('')
  const [sliceText2, setSliceText2] = useState('')
  const [sliceText3, setSliceText3] = useState('')

  useEffect(() => {
    async function fetchData() {
      const data = await getGeneralSettings()
      setSliceText1(p=>data.slice1Text??p)
      setSliceText2(p=>data.slice2Text??p)
      setSliceText3(p=>data.slice3Text??p)
      setSiteName(p=>data.siteName??p)
      setLogo(p=>data.logoUrl??p)    
      setSlices(p=>[data.slice1Url??p[0], data.slice2Url??p[1], data.slice3Url??p[2]])
    }
    fetchData()
  }, [])

  const handleSiteNameChange = async () => {
    try{
      await updateSiteName(siteName)
      router.refresh()
      toast.success("modification réussie")
    }catch(erreur){
      toast.error("modification échouée")
    }
  }
  const handleSlideTextChange = async (index:number) => {  
    try{
      const text=index==1?sliceText1:index==2?sliceText2:sliceText3
      await updateSlideTextName(text,index)
      router.refresh()
      toast.success("modification réussie")
    }catch(erreur){
      toast.error("modification échouée")
    }
  }

  const handleSliceChange = async (index: number, file: File) => {
    try{
      const newSliceUrl = await updateSlice(index + 1, file)
      if(newSliceUrl)
      setSlices(prev => {
        const newSlices = [...prev]
        newSlices[index] = newSliceUrl
        return newSlices
      })
      toast.success("modification réussie")
    }catch(erreur){
      toast.error("modification échouée")
    }
  }

  const handleSliceReset = async (index: number) => {  
    try{
      await resetSlice(index + 1)
      setSlices(prev => {
        const newSlices = [...prev]
        newSlices[index] = `/slice${index + 1}.png`
        return newSlices
      })
      toast.success("modification réussie")
    }catch(erreur){
      toast.error("modification échouée")
    }
  }

  const handleLogoReset = async () => {
    try{
      await resetLogo()
      setLogo("/logo.png")
      toast.success("modification réussie")
    }catch(erreur){
      toast.error("modification échouée")
    }
  }

  const handleLogoChange = async (file: File) => {    
    try{
      const newLogoUrl = await updateLogo(file)
      if(newLogoUrl)
          setLogo(newLogoUrl)
      toast.success("modification réussie")
    }catch(erreur){
      toast.error("modification échouée")
    }
  }

  return (
    <div className="space-y-6">
      <div className='m-12'>
      <h1 className='my-4 text-xl font-bold'>Nom de site</h1>
        <Input
          type="text"
          value={siteName}
          onChange={(e) => setSiteName(e.target.value)}
          placeholder="Nom de site"
          className='my-4'
        />
        <Button onClick={handleSiteNameChange}>Confirm</Button>
      </div>


      <div className='m-12 inline-block'>
      <h1 className='my-4 text-sm font-bold'>Text dans slide 1</h1>
        <Input
          type="text"
          value={sliceText1}
          onChange={(e) => setSliceText1(e.target.value)}
          placeholder="Text slide 1"
          className='my-4'
        />
        <Button onClick={()=>handleSlideTextChange(1)}>Confirm</Button>
      </div>

      <div className='m-12 inline-block'>
      <h1 className='my-4 text-sm font-bold'>Text dans slide 2</h1>
        <Input
          type="text"
          value={sliceText2}
          onChange={(e) => setSliceText2(e.target.value)}
          placeholder="Text slide 2"
          className='my-4'
        />
        <Button onClick={()=>handleSlideTextChange(2)}>Confirm</Button>
      </div>

      <div className='m-12 inline-block'>
      <h1 className='my-4 text-sm font-bold'>Text dans slide 3</h1>
        <Input
          type="text"
          value={sliceText3}
          onChange={(e) => setSliceText3(e.target.value)}
          placeholder="Text slide 3"
          className='my-4'
        />
        <Button onClick={()=>handleSlideTextChange(3)}>Confirm</Button>
      </div>




      <div className='m-12'>
        <h1 className='my-4 text-xl font-bold'>Logo de site</h1>
        <div 
          onClick={() => document.getElementById('logo-input')?.click()}
          className="w-32 h-32 border cursor-pointer"
        >
          <img src={logo} alt="Logo" className='w-[128px] h-[128px] '  />
        </div>
        <input
          id="logo-input"
          type="file"
          hidden
          onChange={(e) => e.target.files && handleLogoChange(e.target.files[0])}
        />
        <Button className='my-8' onClick={() => handleLogoReset()}>Reset</Button>
      </div>

      {slices.map((slice, index) => (
        <div className='m-12 inline-block' key={index}>
          <div 
            onClick={() => document.getElementById(`slice-input-${index}`)?.click()}
            className="w-64 h-32 border cursor-pointer"
          >
            <img src={slice} alt={`Slice ${index + 1}`} className="w-[256px] h-[128px] " />
          </div>
          <input
            id={`slice-input-${index}`}
            type="file"
            hidden
            onChange={(e) => e.target.files && handleSliceChange(index, e.target.files[0])}
          />
          <Button className='my-8' onClick={() => handleSliceReset(index)}>Reset</Button>
        </div>
      ))}
    </div>
  )
}

