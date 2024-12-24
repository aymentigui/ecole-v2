import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/app/admin/components/app-sidebar"
import { signOut } from "@/auth"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
      <div className="flex justify-between m-3">
        <SidebarTrigger />  
        <form action={
          async ()=>{
            "use server"
            await signOut()
          }
        }>
          <Button className="bg-red-600" type='submit'>
            <LogOut></LogOut>
          </Button>
        </form>
      </div>
        {children}
      </main>
    </SidebarProvider>
  )
}
