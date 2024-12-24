"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import Image from "next/image";
import { getContactSettings } from "@/actions/settings";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    content: "",
  });
  const [image,setImage]=useState<null|string>()
  const [email,setEmail]=useState<undefined | string | null>()
  const [phone1,setPhone1]=useState<undefined | string | null>()
  const [phone2,setPhone2]=useState<undefined | string | null>()
  const [adresse,setAdresse]=useState<undefined | string | null>()
  
  useEffect(()=>{
    getContactSettings().then(data=>{
      setEmail(data.contactEmail)
      setPhone1(data.phone1)
      setPhone2(data.phone2)
      setAdresse(data.address)
      setImage(data.contactImageUrl)
    })
  },[])

  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Message envoyé avec succès !");
        setFormData({ name: "", email: "", content: "" }); // Réinitialise le formulaire
      } else {
        const errorData = await response.json();
        alert(`Erreur : ${errorData.message}`);
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi du message :", error);
      alert("Une erreur s'est produite. Veuillez réessayer.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h1
            className="text-4xl font-bold text-center mb-8"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Contactez-nous
          </motion.h1>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              {image && <Image src={image} alt="Notre école" width={600} height={400} className="rounded-lg h-[350px] object-cover object-top" />}
            </motion.div>
            <div>
              {(phone1 || phone2 || email || adresse)&& <h2 className="text-2xl font-semibold mb-4">Informations de contact</h2>}
              {phone1 && <p className="mb-2">Téléphone: {phone1}</p>}
              {phone2 && <p className="mb-2">Téléphone: {phone2}</p>}
              {email && <p className="mb-2">Email: {email}</p>}
              {adresse && <p className="mb-2">Adresse: {adresse}</p>}
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="text"
                name="name"
                placeholder="name"
                value={formData.name}
                onChange={handleChange}
              />
              <Input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
              />
              <Textarea
                name="content"
                placeholder="content"
                value={formData.content}
                onChange={handleChange}
              />
              <Button type="submit" className="w-full">
                Envoyer
              </Button>
            </form>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
