import { z } from "zod";

export const formSchema = z.object({
    nom: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
    prenom: z.string().min(2, "Le prénom doit contenir au moins 2 caractères"),
    dateNaissance: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Format de date invalide"),
    telephone: z.string().regex(/^\d{10}$/, "Le numéro de téléphone doit contenir 10 chiffres"),
    email: z.string().email("Adresse e-mail invalide"),
    adresse: z.string().optional(),
  })