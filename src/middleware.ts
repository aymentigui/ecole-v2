import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { apiAuthPrefix, authRoutes, defaultRedirect, publicRoutes } from "./routes";
import { NextResponse } from "next/server";

const {auth} = NextAuth(authConfig)


export default auth((req)=> {
    const { nextUrl } = req;
    const isLogging = !!req.auth; // Vérifie si l'utilisateur est connecté

    const isApiAuthRoutes = nextUrl.pathname.startsWith(apiAuthPrefix);
    const isPublicRoutes = publicRoutes.some((route) => nextUrl.pathname.startsWith(route)) ||  nextUrl.pathname=="/";
    const isAuthRoutes = authRoutes.includes(nextUrl.pathname);
    
    
    if (isApiAuthRoutes) {
      return NextResponse.next();
    }
  
    if (isAuthRoutes) {
      if (isLogging) {
        const domainUrl = process.env.DOMAIN_URL;
    
      // Vérifiez si la variable d'environnement est définie
      if (!domainUrl) {
        throw new Error('DOMAIN_URL is not defined in the environment variables');
      }
    
      // Redirigez l'utilisateur vers DOMAIN_URL/auth/login
      return NextResponse.redirect(`${domainUrl}/${defaultRedirect}`);
      }
      return NextResponse.next();
    }
  
    if (!isPublicRoutes && !isLogging) {
      // Récupérez l'URL du domaine depuis la variable d'environnement
      const domainUrl = process.env.DOMAIN_URL;
    
      // Vérifiez si la variable d'environnement est définie
      if (!domainUrl) {
        throw new Error('DOMAIN_URL is not defined in the environment variables');
      }
    
      // Redirigez l'utilisateur vers DOMAIN_URL/auth/login
      return NextResponse.redirect(`${domainUrl}/auth/login`);
    }
    
  
    return NextResponse.next();
  })
  export const config = {
    matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
  };