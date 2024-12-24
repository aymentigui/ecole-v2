"use client"

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Menu } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { LogoComponent } from './logo';
import { useEffect, useState } from 'react';
import { getGeneralSettings } from '@/actions/settings';

const navItems = [
  { name: 'Accueil', href: '/' },
  { name: 'À propos', href: '/a-propos' },
  { name: 'Contact', href: '/contact' },
  { name: 'Collaboration', href: '/collaborations' },
  { name: 'Formations', href: '/formations' },
];

export function Navbar() {
  const pathname = usePathname();
  const [title,setTitlte]=useState("École de Formation")

  useEffect(()=>{
    getGeneralSettings().then(data=>{
      setTitlte(p=>(data.siteName??p))
    })
  },[])

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/">
              <LogoComponent/>
            </Link>
            <span className="ml-2 text-xl font-bold">{title}</span>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`relative px-3 py-2 rounded-md text-sm font-medium transition-all ${
                  pathname === item.href
                    ? 'text-blue-600 font-bold'
                    : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                {item.name}
                <span
                  className={`absolute left-0 right-0 -bottom-1 h-1 bg-blue-600 rounded-full transition-transform transform ${
                    pathname=== item.href
                      ? 'scale-x-100'
                      : 'scale-x-0 hover:scale-x-100'
                  }`}
                />
              </Link>
            ))}
          </div>
          <div className="md:hidden flex items-center">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <div className="flex flex-col space-y-4 mt-4">
                  {navItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium ${
                        pathname === item.href ? 'text-blue-600 font-bold' : ''
                      }`}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
