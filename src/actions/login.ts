"use server"

import { LoginSchema } from "@/util/schema/user"
import { z } from "zod"
import { signIn } from "@/auth"
import { defaultRedirect } from "@/routes"
import { AuthError } from "next-auth"

const domainUrl = process.env.DOMAIN_URL;

export const login = async  (data: z.infer<typeof LoginSchema>)=>{
    const validateFileds=LoginSchema.safeParse(data)

    if(!validateFileds){
        return { error : "Invalide infos"}
    }

    const {email,password}= validateFileds.data!

    try {
        await signIn(
            "credentials",{    
                email,
                password,
                redirectTo: `${domainUrl}/${defaultRedirect}`
            }
        )
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
