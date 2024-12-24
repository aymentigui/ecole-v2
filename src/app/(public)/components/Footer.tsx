"use client"
import Link from 'next/link'
import { LogoComponent } from './logo'
import { useEffect, useState } from 'react'
import { getAboutSettings, getContactSettings } from '@/actions/settings'

export function Footer() {

  const [about,setAbout]=useState(`Notre école de formation s'engage à fournir une éducation de qualité depuis plus de 20 ans. 
              Nous nous efforçons de préparer nos étudiants aux défis du monde professionnel en leur offrant 
              des formations innovantes et adaptées aux besoins du marché.`)
  
  const [email,setEmail]=useState<undefined | string | null>()
  const [phone1,setPhone1]=useState<undefined | string | null>()
  const [phone2,setPhone2]=useState<undefined | string | null>()
  const [adresse,setAdresse]=useState<undefined | string | null>()

  useEffect(()=>{
    getAboutSettings().then((data)=>setAbout(p=>(data.siteDescription??p)))
    getContactSettings().then(data=>{
      setEmail(data.contactEmail)
      setPhone1(data.phone1)
      setPhone2(data.phone2)
      setAdresse(data.address)
    })
  },[])
  
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <LogoComponent />
            <p className="mt-2 text-xs">{about}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Liens rapides</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="hover:underline">Accueil</Link></li>
              <li><Link href="/a-propos" className="hover:underline">À propos</Link></li>
              <li><Link href="/contact" className="hover:underline">Contact</Link></li>
              <li><Link href="/collaborations" className="hover:underline">Collaboration</Link></li>
              <li><Link href="/formations" className="hover:underline">Formations</Link></li>
            </ul>
          </div>
          <div>
            {(phone1 || phone2 || email || adresse)&&<h3 className="text-lg font-semibold mb-4">Contact</h3>}
            {phone1 && <p>Téléphone: {phone1}</p>}
            {phone2 && <p>Téléphone: {phone2}</p>}
            {email && <p>Email: {email}</p>}
            {adresse && <p>Adresse: {adresse}</p>}
          </div>
        </div>
      </div>
    </footer>
  )
}

