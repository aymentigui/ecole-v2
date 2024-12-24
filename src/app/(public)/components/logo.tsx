"use client"
import { getLogoURL } from '@/actions/settings'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

export function LogoComponent (){

  const [logo,setLogo]=useState("/logo.png")

  const getLogo=async ()=>{
    const logo=await getLogoURL()
    if(logo && logo.logoUrl)
        setLogo(logo.logoUrl)
  }
  useEffect(()=>{
    getLogo()
  },[])

  return (
    <Image src={logo} alt="Logo" className='rounded-full' width={60} height={60} />
  )
}

