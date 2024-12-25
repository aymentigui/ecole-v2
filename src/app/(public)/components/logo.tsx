"use client"
import { getLogoURL } from '@/actions/settings'
import React, { useEffect, useState } from 'react'

export function LogoComponent (){

  const [logo,setLogo]=useState("")

  const getLogo=async ()=>{
    const logo=await getLogoURL()
    if(logo && logo.logoUrl)
        setLogo(logo.logoUrl)
    else 
      setLogo("/logo.png")
  }
  useEffect(()=>{
    getLogo()
  },[])

  return (
    <>
    { logo !="" && 
      <img src={logo} alt="Logo" className='rounded-full w-[60px] h-[60px]' />}
    </>
  )
}

