// @/utils/schema/user.ts
import { z } from "zod";

// Définir le schéma pour le formulaire de login
export const LoginSchema = z.object({
  email: z.string().email({ message: "Adresse e-mail invalide" }),
  password: z.string().min(6, { message: "Le mot de passe doit contenir au moins 6 caractères" }),
});

export const RegisterSchema = z.object({
  email: z.string().email({ message: "Adresse e-mail invalide" }),
  password: z.string().min(6, { message: "Le mot de passe doit contenir au moins 6 caractères" }),
});

// Typage basé sur le schéma
export type LoginSchemaType = z.infer<typeof LoginSchema>;
