// import { Collaboration, Formation, Inscription, Message } from './types';

// export const formations: Formation[] = [
//   {
//     id: "1",
//     photo: "/formation.png",  // Modifié de 'image' à 'photo'
//     name: "Formation en technologies émergentes",
//     remarks:
//       "Partenariat pour des stages en entreprise et des projets de recherche conjoints dans le domaine des technologies émergentes.",  // Modifié de 'description' à 'remarks'
//     startDate: new Date("2024-01-01"),
//     endDate: new Date("2024-12-31"),
//     price: 10000,
//     address: "TechCorp, 123 Rue de l'Innovation, Paris", // Ajouté l'adresse
//     phone1: "+33123456789", // Ajouté le numéro de téléphone
//     phone2: "+33123456780", // Optionnel
//     numberOfDays: 365, // Optionnel
//     numberOfHours: 500, // Optionnel
//     numberOfSessions: 50, // Optionnel
//     sessionDuration: 10, // Optionnel
//     isRegistrationAllowed: false,
//   },
//   {
//     id: "2",
//     photo: "/formation.png",  // Modifié de 'image' à 'photo'
//     name: "Développement de logiciels éducatifs",
//     remarks:
//       "Collaboration pour le développement de logiciels éducatifs innovants et l'intégration de nouvelles technologies dans nos programmes de formation.",  // Modifié de 'description' à 'remarks'
//     startDate: new Date("2024-02-01"),
//     endDate: new Date("2024-11-30"),
//     price: 12000,
//     address: "EduSoft, 456 Rue de l'Éducation, Lyon", // Ajouté l'adresse
//     phone1: "+33456789012", // Ajouté le numéro de téléphone
//     phone2: "+33456789013", // Optionnel
//     numberOfDays: 300, // Optionnel
//     numberOfHours: 400, // Optionnel
//     numberOfSessions: 40, // Optionnel
//     sessionDuration: 8, // Optionnel
//     isRegistrationAllowed: true,
//   },
//   {
//     id: "3",
//     photo: "/formation.png",  // Modifié de 'image' à 'photo'
//     name: "Formation professionnelle adaptée",
//     remarks:
//       "Échanges d'expertise en formation professionnelle et co-création de programmes de formation adaptés aux besoins du marché du travail.",  // Modifié de 'description' à 'remarks'
//     startDate: new Date("2024-03-01"),
//     endDate: new Date("2024-10-31"),
//     price: 9000,
//     address: "FormaPro, 789 Rue de la Formation, Marseille", // Ajouté l'adresse
//     phone1: "+33423456789", // Ajouté le numéro de téléphone
//     phone2: "+33423456780", // Optionnel
//     numberOfDays: 200, // Optionnel
//     numberOfHours: 350, // Optionnel
//     numberOfSessions: 30, // Optionnel
//     sessionDuration: 12, // Optionnel
//     isRegistrationAllowed: true,
//   },
//   {
//     id: "4",
//     photo: "/formation.png",  // Modifié de 'image' à 'photo'
//     name: "Projets innovants en laboratoire",
//     remarks:
//       "Partenariat pour l'accès à des équipements de pointe et la réalisation de projets innovants dans un environnement de laboratoire.",  // Modifié de 'description' à 'remarks'
//     startDate: new Date("2024-04-01"),
//     endDate: new Date("2024-09-30"),
//     price: 15000,
//     address: "InnovLab, 321 Rue de l'Innovation, Toulouse", // Ajouté l'adresse
//     phone1: "+33567890123", // Ajouté le numéro de téléphone
//     phone2: "+33567890124", // Optionnel
//     numberOfDays: 180, // Optionnel
//     numberOfHours: 600, // Optionnel
//     numberOfSessions: 60, // Optionnel
//     sessionDuration: 10, // Optionnel
//     isRegistrationAllowed: true,
//   },
//   {
//     id: "5",
//     photo: "/formation.png",  // Modifié de 'image' à 'photo'
//     name: "Échanges internationaux éducatifs",
//     remarks:
//       "Collaboration internationale pour des échanges d'étudiants et de professeurs, offrant une expérience multiculturelle enrichissante.",  // Modifié de 'description' à 'remarks'
//     startDate: new Date("2024-05-01"),
//     endDate: new Date("2024-08-31"),
//     price: 13000,
//     address: "GlobalEdu, 654 Rue des Échanges, Paris", // Ajouté l'adresse
//     phone1: "+33987654321", // Ajouté le numéro de téléphone
//     phone2: "+33987654322", // Optionnel
//     numberOfDays: 120, // Optionnel
//     numberOfHours: 250, // Optionnel
//     numberOfSessions: 25, // Optionnel
//     sessionDuration: 9, // Optionnel
//     isRegistrationAllowed: true,
//   },
// ]

// export const collaborations: Collaboration[] = [
//   {
//     id: "1",
//     photo: "/formation.png",  // Modifié de 'image' à 'photo'
//     company: "TechCorp",  // Modifié de 'compagne' à 'company'
//     name: "Formation en technologies émergentes",
//     remarks:
//       "Partenariat pour des stages en entreprise et des projets de recherche conjoints dans le domaine des technologies émergentes.",  // Modifié de 'description' à 'remarks'
//     startDate: new Date("2024-12-22"),
//     endDate: new Date("2024-12-31"),
//     price: 10000,
//     address: "TechCorp, 123 Rue de l'Innovation, Paris", // Ajouté l'adresse
//     phone1: "+33123456789", // Ajouté le numéro de téléphone
//     phone2: "+33123456780", // Optionnel
//     numberOfDays: 365, // Optionnel
//     numberOfHours: 500, // Optionnel
//     numberOfSessions: 50, // Optionnel
//     sessionDuration: 10, // Optionnel
//     isRegistrationAllowed: false,
//   },
//   {
//     id: "2",
//     photo: "/formation.png",  // Modifié de 'image' à 'photo'
//     company: "EduSoft",  // Modifié de 'compagne' à 'company'
//     name: "Développement de logiciels éducatifs",
//     remarks:
//       "Collaboration pour le développement de logiciels éducatifs innovants et l'intégration de nouvelles technologies dans nos programmes de formation.",  // Modifié de 'description' à 'remarks'
//     startDate: new Date("2024-02-01"),
//     endDate: new Date("2024-12-30"),
//     price: 12000,
//     address: "EduSoft, 456 Rue de l'Éducation, Lyon", // Ajouté l'adresse
//     phone1: "+33456789012", // Ajouté le numéro de téléphone
//     phone2: "+33456789013", // Optionnel
//     numberOfDays: 300, // Optionnel
//     numberOfHours: 400, // Optionnel
//     numberOfSessions: 40, // Optionnel
//     sessionDuration: 8, // Optionnel
//     isRegistrationAllowed: true,
//   },
// ]


// export const inscriptions: Inscription[] = [
//   {
//     id: "1",
//     entityId: "1",
//     entityType: "formation",
//     dateInscription: new Date("2024-01-02"),
//     status: "confirmed",
//     user: {
//       firstName: "Alice",
//       lastName: "Dupont",
//       birthDate: new Date("1995-06-15"),
//       phone: "+33123456789",
//       email: "alice.dupont@example.com",
//       address: "123 Rue de Paris, Paris",
//     },
//   },
//   {
//     id: "2",
//     entityId: "2",
//     entityType: "formation",
//     dateInscription: new Date("2024-02-05"),
//     status: "pending",
//     user: {
//       firstName: "Jean",
//       lastName: "Martin",
//       birthDate: new Date("1990-10-20"),
//       phone: "+33456789012",
//       email: "jean.martin@example.com",
//       address: "45 Avenue de Lyon, Lyon",
//     },
//   },
//   {
//     id: "3",
//     entityId: "3",
//     entityType: "collaboration",
//     dateInscription: new Date("2024-03-10"),
//     status: "cancelled",
//     user: {
//       firstName: "Sophie",
//       lastName: "Durand",
//       birthDate: new Date("1988-03-12"),
//       phone: "+33987654321",
//       email: "sophie.durand@example.com",
//       address: "",
//     },
//   },
// ];
