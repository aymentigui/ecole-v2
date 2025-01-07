import type { Metadata } from "next";
import {Poppins} from "next/font/google";
import "./globals.css";
import {Toaster} from "react-hot-toast"

const poppins = Poppins({
  subsets: ["latin"], // Supporte les caractères latins
  weight: ["400", "500", "600", "700"], // Choisissez les poids désirés
  variable: "--font-poppins", // Définissez une variable CSS
});

export const metadata: Metadata = {
  title: "Groupe formactive center dz",
  description: "Créé en 2022 sous la dénomination Groupement Formactive Center, notre collectif s'est fixé pour mission principale de favoriser la formation continue en Algérie. Avec une approche novatrice centrée sur les entreprises et les individus, le Groupement Formactive Center se distingue par son engagement à répondre aux besoins spécifiques de développement personnel et professionnel. Notre ambition est de devenir un acteur clé dans le paysage de la formation, en proposant des solutions sur mesure et alignées avec les exigences du marché local et international.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} antialiased`}
      >
        <Toaster />
        {children}
      </body>
    </html>
  );
}
