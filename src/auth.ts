import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/util/db"
import authConfig from "./auth.config"
import { LoginSchema } from "@/util/schema/user";
import Credentials from "next-auth/providers/credentials"
import { getUserByEmail, getUserById } from "./data/user";
import bcrypt from "bcrypt"
/* eslint-disable */
export const { handlers , auth, signIn, signOut } = 
  NextAuth({
    pages :{
      signIn : "/auth/login"
    },
    adapter: PrismaAdapter(prisma),
    session: { strategy : "jwt"},
    callbacks: {
      async jwt({token,}) {
        if(!token.sub) return token // bach tverifie ida connecta

        // token email name picture sub(howa id)....
        // bach tzid custom field :
        // token.customfield="exemple"

        return token
      },
      async session({token,session}) {
        // token linjiboh men jwt
        // token.customfield reh tel9aha "exemple" 

        // session fiha wech ykoun f token (simple) + date expiration
        // bach tzid fiha
        // if(session.user) session.user.customfield= token.customfield    
        
        // donc bach tab3at id if(session.user) session.user.id= token.sub

        // session hiya lirah tb3athe lel user, hiya litst3malha fel middelware

        return session
      },
      async signIn({user}) {
        // tendar avant matendar authentification
        if(!user || !user.id)
          return false
        const existinUser=await getUserById(user.id)
        console.log(user)
        /*
        if(!existinUser || !existinUser.emailVerified)
          return false
        */
        return true
      },
      ...authConfig,
    },
    providers: [
      Credentials({
        authorize: async (credentials) => {
          let user = null
   
          // logic to salt and hash password
          const validateFileds = LoginSchema.safeParse(credentials)
   
          if(validateFileds.success){
            const {email,password}=validateFileds.data
            
            const user=await getUserByEmail(email)
            if(!user || !user.password) return null

            const passwordMatch=await bcrypt.compare(
              password,
              user.password
            )
            if(passwordMatch) return user
            
          }
          return null
        },
      }),
    ],
  })
