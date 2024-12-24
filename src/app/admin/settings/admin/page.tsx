'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { getUsers, updateUserEmail, deleteUser, addUser } from "@/actions/settings"

export default function AdminSettings() {
  const router = useRouter()
  const [users, setUsers] = useState<{id:string,email:string | null }[]>([])
  const [newUserEmail, setNewUserEmail] = useState('')
  const [newUserPassword, setNewUserPassword] = useState('')
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  useEffect(() => {
    async function fetchUsers() {
      const fetchedUsers = await getUsers()
      if(fetchedUsers)
         setUsers(fetchedUsers)        
    }
    fetchUsers()
  }, [])

  const handleUpdateEmail = async (id: string, newEmail: string) => {
    await updateUserEmail(id, newEmail)
    setUsers(users.map(user => user.id === id ? { ...user, email: newEmail } : user))
    router.refresh()
  }

  const handleDeleteUser = async (id: string) => {
    await deleteUser(id)
    setUsers(users.filter(user => user.id !== id))
    router.refresh()
  }

  const handleAddUser = async () => {
    const newUser = await addUser(newUserEmail, newUserPassword)
    setUsers([...users, newUser])
    setNewUserEmail('')
    setNewUserPassword('')
    setIsDialogOpen(false)
    router.refresh()
  }

  return (
    <div className="space-y-6 m-8">
      <h1 className="text-2xl font-bold">Admin Settings</h1>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button>Add User</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New User</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              type="email"
              placeholder="Email"
              value={newUserEmail}
              onChange={(e) => setNewUserEmail(e.target.value)}
            />
            <Input
              type="password"
              placeholder="Password"
              value={newUserPassword}
              onChange={(e) => setNewUserPassword(e.target.value)}
            />
            <Button onClick={handleAddUser}>Add User</Button>
          </div>
        </DialogContent>
      </Dialog>
      <div className="space-y-4">
        {users.map((user) => (
          <div key={user.id} className="flex items-center space-x-4">
            
            {/* @ts-ignore */}
            <Input  type="email"  value={user.email}
              disabled
              onChange={(e) => handleUpdateEmail(user.id, e.target.value)}
            />
            <Button onClick={() => handleDeleteUser(user.id)} variant="destructive">
              Delete
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}

