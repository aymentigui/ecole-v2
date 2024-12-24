import type { Metadata } from "next";
import {Poppins} from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"], // Supporte les caractères latins
  weight: ["400", "500", "600", "700"], // Choisissez les poids désirés
  variable: "--font-poppins", // Définissez une variable CSS
});

export const metadata: Metadata = {
  title: "Ecole",
  description: "Ecole de formation",
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
        {children}
      </body>
    </html>
  );
}
