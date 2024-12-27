"use server"

import { LoginSchema } from "@/util/schema/user"
import { z } from "zod"
import { signIn, signOut } from "@/auth"
import { AuthError } from "next-auth"
import { redirect } from "next/navigation"

const domainUrl = process.env.DOMAIN_URL;

export const login = async  (data: z.infer<typeof LoginSchema>)=>{
    const validateFileds=LoginSchema.safeParse(data)

    if(!validateFileds){
        return { error : "Invalide infos"}
    }

    const {email,password}= validateFileds.data!

    try {
        const login=await signIn(
            "credentials",{    
                email,
                password,
                redirect:false
            }
        )
        if(login)
            redirect(domainUrl+"/admin/clients")
    } catch (error) {
        if(error instanceof AuthError){
            switch(error.type){
                case "CredentialsSignin":
                    return { error : "Invalide infos"}
                default :
                    return { error : "Something went wrong !"}
            }
        }
        throw error
    }   
}

export const logOut=async ()=>{
    const logout=await signOut({redirect:false})
    if(logout)
        redirect(domainUrl+"/auth/login")
}