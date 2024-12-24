"use server"

import { prisma } from "@/util/db"
import {  RegisterSchema } from "@/util/schema/user"
import { z } from "zod"
import bcrypt from "bcrypt";
import { getUserByEmail } from "@/data/user";

export const register = async  (data: z.infer<typeof RegisterSchema>)=>{
    const validateFileds=RegisterSchema.safeParse(data)

    if(!validateFileds){
        return { error : "Invalide infos"}
    }

    const {email, password} = validateFileds.data!
    const hashPassword = await bcrypt.hash(password,10)

    const existinUser= await getUserByEmail(email)
    
    if(existinUser){
        return { error : "Email already exisit"}
    }

    await prisma.user.create({
        data:{
            email,
            password:hashPassword
        }
    })

    return { succes : "Login !"}
}