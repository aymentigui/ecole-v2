"use client"

import {
  CalendarClock,
  UsersRound,
  Settings2,
  Mail,
} from "lucide-react"

import { NavMain } from "@/app/admin/components/nav-main"
import { NavUser } from "@/app/admin/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarRail,
} from "@/components/ui/sidebar"
import { NavClient } from "./nav-client"
import { useEffect, useState } from "react"
import { getLogoURL, getUserLogin } from "@/actions/settings"

// This is sample data.
const data = {
  navMain: [
    // {
    //   title: "Playground",
    //   url: "#",
    //   icon: SquareTerminal,
    //   items: [
    //     {
    //       title: "History",
    //       url: "admin/home",
    //     },
    //     {
    //       title: "Starred",
    //       url: "#",
    //     },
    //     {
    //       title: "Settings",
    //       url: "#",
    //     },
    //   ],
    // },
    {
      title: "Events",
      url: "#",
      icon: CalendarClock,
      isActive: true,
      items: [
        {
          title: "Events",
          url: "/admin/events",
        },
        {
          title: "Formations",
          url: "/admin/formations",
        },
      ],
    },],
    navClient:[{
      title: "Clients",
      url: "/admin/clients",
      icon: UsersRound,
    },],
    navMessage:[{
      title: "Messages",
      url: "/admin/messages",
      icon: Mail,
    },],
    navSetting:[{
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "Général",
          url: "/admin/settings/generale",
        },
        {
          title: "A propos",
          url: "/admin/settings/about",
        },
        {
          title: "Adresses et contact",
          url: "/admin/settings/contact",
        },
        {
          title: "Admins",
          url: "/admin/settings/admin",
        },
      ],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  
  const [user,setUser]=useState({name:"",email:"",avatar:"/logo.png"})
  useEffect(()=> {
    getUserLogin().then((user)=>{
      if(user)
        setUser(p=>({...p,email:user.email??""}))
    })
    getLogoURL().then((logo)=>{
      if(logo && logo.logoUrl)
        setUser(p=>({...p,avatar:logo.logoUrl??"/logo.png"}))
    })
  },[])

  return (
    <Sidebar collapsible="icon" {...props}>

      <SidebarContent>
        <NavMain title="Dashboard" items={data.navMain} />
        <NavClient items={data.navClient} />
        <NavClient items={data.navMessage} />
        <NavMain title="Reglage" items={data.navSetting} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
