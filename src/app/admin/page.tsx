"use client"
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

const Admin =  () => {
  const route=useRouter()
  useEffect(()=>{
    route.push("/admin/clients")
  },[])
  
  return (
    <div>
        
    </div>
  )
}

export default Admin
