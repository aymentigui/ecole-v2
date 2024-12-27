"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { getContactSettings } from "@/actions/settings";
import toast from "react-hot-toast";
import { InfoIcon, Mail, Phone } from "lucide-react";
import { Card } from "@/components/ui/card";

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
        toast.success("Message envoyé avec succès !");
        setFormData({ name: "", email: "", content: "" }); // Réinitialise le formulaire
      } else {
        const errorData = await response.json();
        toast.error(`Erreur : ${errorData.message}`);
      }
    } catch (error) {
      toast.error("Une erreur s'est produite. Veuillez réessayer.");
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
              {image && <img src={image} alt="Notre école" className="rounded-lg w-[600px] h-[350px] object-cover object-top" />}
            </motion.div>
            <div className="flex flex-col items-center justify-center p-6 bg-gray-50 rounded-lg shadow-lg">
              {(
                <h2 className="text-2xl  font-bold text-blue-600 mb-6">
                  <InfoIcon name="info-circle" className="mr-2 inline-block" />
                  Informations de contact
                </h2>
              )}

              <Card className="w-full max-w-md bg-white border border-gray-200 rounded-lg p-4">
                {phone1 && (
                  <p className="text-lg text-gray-800 mb-4 flex items-center">
                    <Phone name="phone" className="text-blue-500 mr-2" />
                    Téléphone: {phone1}
                  </p>
                )}
                {phone2 && (
                  <p className="text-lg text-gray-800 mb-4 flex items-center">
                    <Phone name="phone-alt" className="text-blue-500 mr-2" />
                    Téléphone: {phone2}
                  </p>
                )}
                {email && (
                  <p className="text-lg text-gray-800 mb-4 flex items-center">
                    <Mail  name="envelope" className="text-blue-500 mr-2" />
                    Email: {email}
                  </p>
                )}
                {adresse && (
                  <p className="text-lg text-gray-800 mb-4 flex items-center">
                    <InfoIcon name="map-marker-alt" className="text-blue-500 mr-2" />
                    Adresse: {adresse}
                  </p>
                )}
              </Card>
            </div>
          </motion.div>
          <form
              onSubmit={handleSubmit}
              className="m-auto mt-8 space-y-6 max-w-[600px] p-8 bg-white rounded-lg shadow-md border border-gray-200"
            >
              <h2 className="text-3xl font-semibold text-center text-blue-600 mb-4">
                Contactez-Nous
              </h2>
              <div className="space-y-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Nom"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                />
                <textarea
                  name="content"
                  placeholder="Votre message"
                  value={formData.content}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
              >
                Envoyer
              </button>
            </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}
