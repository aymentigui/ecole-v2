import { z } from "zod";

export const collaborationSchema = z.object({
  name: z.string().min(1, "Le nom de la collaboration est requis"),
  photo: z
    .instanceof(File)
    .refine(file => file.size <= 5 * 1024 * 1024, "La taille du fichier ne doit pas dépasser 5 Mo")
    .refine(
      file => ["image/jpeg", "image/png", "image/jpg"].includes(file.type),
      "Le fichier doit être au format JPEG ou PNG"
    ).optional(),
  startDate: z.coerce.date({ required_error: "La date de début est requise" }),
  endDate: z.coerce.date({ required_error: "La date de fin est requise" }),
  company: z.string().min(1, "Le nom de la société est requis"),
  price: z.number().min(0, "Le prix doit être positif ou nul"),
  address: z.string().optional(),
  phone1: z.string().refine(
    (val) => (val===null || (val === "" || /^\+?[0-9]{10,14}$/.test(val))),
    {
      message: "Le numéro de téléphone 1 doit être null, vide, ou un numéro valide",
    }
  ),
  phone2: z.string().refine(
    (val) => (val===null || (val === "" || /^\+?[0-9]{10,14}$/.test(val))),
    {
      message: "Le numéro de téléphone 1 doit être null, vide, ou un numéro valide",
    }
  ),
  numberOfDays: z.number().int().positive("Le nombre de jours doit être positif").optional(),
  numberOfHours: z.number().int().positive("Le nombre d'heures doit être positif").optional(),
  numberOfSessions: z.number().int().positive("Le nombre de séances doit être positif").optional(),
  sessionDuration: z.number().positive("La durée de la séance doit être positive").optional(),
  remarks: z.string().optional(),
  isRegistrationAllowed: z.boolean().optional(),
}).refine(data => data.endDate >= data.startDate, {
  message: "La date de fin doit être postérieure ou égale à la date de début",
  path: ["endDate"],
});
