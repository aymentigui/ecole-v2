
"use client"
import { useState, useTransition } from 'react';
import { FaCircleInfo } from "react-icons/fa6";
import {useForm} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import { RegisterSchema } from '@/util/schema/user';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { z } from 'zod';
import { register } from '@/actions/register';
/* eslint-disable */

export default function Login() {
  const [loading, setLoading] = useTransition();
  const [succes, setSucces] = useState<string | undefined>();
  const [erreur, setErreur] = useState<string | undefined>();

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password:""
    },
  })

  const handleSubmit = async (data: any) => {
    register(data).then(
        (data)=>{
            setSucces(data.succes)
            setErreur(data.error)
        }
    )
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-green-700 via-green-500 to-green-700">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        <h2 className="text-center text-2xl font-bold text-gray-800">Inscrire</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="mt-6 space-y-4">
            {/* Champ Email */}
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Entrez votre email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage></FormMessage>
                </FormItem>
              )}
            />

            {/* Champ Mot de passe */}
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mot de passe</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Entrez votre mot de passe"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage></FormMessage>
                </FormItem>
              )}
            />

            {/* Bouton de soumission */}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Chargement..." : "S'inscrire"}
            </Button>
          </form>
        </Form>
        {
            succes && 
            <div className='flex items-center justify-center p-2 bg-green-400 font-bold text-white my-2 rounded-md'>
            Inscreption reussite
            </div>
        }
        {
            erreur && 
            <div className='flex gap-2 text-sm items-center p-2 bg-red-200 font-semibold text-red-700 my-2 rounded-md'>
                <FaCircleInfo />
                {erreur}
            </div>
        }

        <p className="mt-4 text-center text-sm text-gray-600">
          Tu as un compte ?{" "}
          <a href="/auth/login" className="text-indigo-600 hover:underline">
            connecter-vous
          </a>
        </p>
      </div>
    </div>
  );
}