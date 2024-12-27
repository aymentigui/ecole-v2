'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { updateSiteName, updateSlice, resetSlice, updateLogo, getGeneralSettings, resetLogo, updateSlideTextName } from '@/actions/settings'

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
      if(data.slice1Text  )
        setSliceText1(data.slice1Text)  
      if(data.slice2Text  )
        setSliceText2(data.slice2Text)  
      if(data.slice3Text  )
        setSliceText3(data.slice3Text) 
      if(data.siteName  )
        setSiteName(data.siteName)
      if(data.logoUrl  ){
        setLogo(data.logoUrl)           
    }
      if(data.slice1Url){
        var x=data.slice1Url 
        setSlices((p)=>{const [s1,s2,s3]=p; return [x,s2,s3]})}
      if(data.slice2Url  ){
        var x=data.slice2Url 
        setSlices((p)=>{const [s1,s2,s3]=p; return [s1,x,s3]})
        }
      if(data.slice3Url  ){
        var x=data.slice3Url 
        setSlices((p)=>{const [s1,s2,s3]=p; return [s1,s2,x]})
        }
    }
    fetchData()
  }, [])

  const handleSiteNameChange = async () => {
    await updateSiteName(siteName)
    router.refresh()
  }
  const handleSlideTextChange = async (index:number) => {
    const text=index==1?sliceText1:index==2?sliceText2:sliceText3
    await updateSlideTextName(text,index)
    router.refresh()
  }

  const handleSliceChange = async (index: number, file: File) => {
    const newSliceUrl = await updateSlice(index + 1, file)
    if(newSliceUrl)
    setSlices(prev => {
      const newSlices = [...prev]
      newSlices[index] = newSliceUrl
      return newSlices
    })
  }

  const handleSliceReset = async (index: number) => {
    await resetSlice(index + 1)
    setSlices(prev => {
      const newSlices = [...prev]
      newSlices[index] = `/slice${index + 1}.png`
      return newSlices
    })
  }
  const handleLogoReset = async () => {
    await resetLogo()
    setLogo("/logo.png")
  }

  const handleLogoChange = async (file: File) => {
    const newLogoUrl = await updateLogo(file)
    if(newLogoUrl)
        setLogo(newLogoUrl)
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

