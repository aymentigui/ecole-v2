"use client"

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Navbar } from './(public)/components/Navbar'
import { Footer } from './(public)/components/Footer'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa6'
import { useMediaQuery } from '@mui/material';
import Link from 'next/link'
import loadingAnimation from "@/../public/loading.json";
import dynamic from 'next/dynamic';
const Lottie = dynamic(() => import('react-lottie'), { ssr: false });
import { format } from 'date-fns'
import { da, fr } from 'date-fns/locale'
import { getAboutSettings, getGeneralSettings } from '@/actions/settings'
import { recentcollaborations, recentFormations } from '@/actions/requetes'



export default function Home() {
  const [collaborations, setCollaborations] = useState<any[]>([]);
  const [isLottie, setIsLottie] = useState(false);
  const [isLoadingC, setIsLoadingC] = useState(true);
  const [formations, setFormations] = useState<any[]>([]);
  const [isLoadingF, setIsLoadingF] = useState(true);
  const [about,setAbout]=useState(`Notre école de formation s'engage à fournir une éducation de qualité depuis plus de 20 ans. 
              Nous nous efforçons de préparer nos étudiants aux défis du monde professionnel en leur offrant 
              des formations innovantes et adaptées aux besoins du marché.`)
  const [slides,setSlides]=useState([
    { image: '/slice1.png', text: 'Excellence académique' },
    { image: '/slice2.png', text: 'Innovation pédagogique' },
    { image: '/slice3.png', text: 'Accompagnement personnalisé' },
  ])

  const [currentSlide, setCurrentSlide] = useState(0)
  const [currentIndexCollaboration, setCurrentIndexCollaboration] = useState(0);
  const [currentIndexFormation, setCurrentIndexFormation] = useState(0);
  const isSmallScreen = useMediaQuery('(max-width: 768px)');
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    content: "",
  });

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


  useEffect(() => {
    getGeneralSettings().then((data)=>{
      setSlides((p)=>([
        {image:data.slice1Url??p[0].image,text:p[0].text},
        {image:data.slice2Url??p[1].image,text:p[1].text},
        {image:data.slice3Url??p[2].image,text:p[2].text},
      ]))
    })
    getAboutSettings().then((data)=>{
      setAbout(p=>(data.siteDescription??p))
    })
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length)
    }, 5000)
    const interval = setInterval(() => {
      handleNextCollaboration();
      handleNextFormation();
    }, 5000);
    return () => {
      clearInterval(timer);
      clearInterval(interval);
    }
  }, [currentIndexCollaboration,currentIndexFormation])

  const handleNextCollaboration = () => {
    if(collaborations.length<4)
      return
    setCurrentIndexCollaboration((prevIndex) => (prevIndex + 1) % collaborations.length);
  };

  // Fonction pour aller au slide précédent
  const handlePrevCollaboration = () => {
    if(collaborations.length<4)
      return
    setCurrentIndexCollaboration((prevIndex) =>
      prevIndex === 0 ? collaborations.length - 1 : prevIndex - 1
    );
  };

  const handleNextFormation = () => {
    if(formations.length<4)
      return
    setCurrentIndexFormation((prevIndex) => (prevIndex + 1) % formations.length);
  };

  // Fonction pour aller au slide précédent
  const handlePrevFormation = () => {
    if(formations.length<4)
      return
    setCurrentIndexFormation((prevIndex) =>
      prevIndex === 0 ? formations.length - 1 : prevIndex - 1
    );
  };

  const getVisibleItemsCollaborations = () => {
    if (isSmallScreen) {
      return [collaborations[currentIndexCollaboration],];
    }
    if(collaborations.length<2)
      return [
        collaborations[currentIndexCollaboration],
      ];
    if(collaborations.length<3)
      return [
        collaborations[currentIndexCollaboration],
        collaborations[(currentIndexCollaboration + 1) % collaborations.length],
      ];

    return [
      collaborations[currentIndexCollaboration],
      collaborations[(currentIndexCollaboration + 1) % collaborations.length],
      collaborations[(currentIndexCollaboration + 2) % collaborations.length],
    ];
  };

  const getVisibleItemsFormations = () => {

    if (isSmallScreen) {
      return [formations[currentIndexFormation]];
    }

    return [
      formations[currentIndexFormation],
      formations[(currentIndexFormation + 1) % formations.length],
      formations[(currentIndexFormation + 2) % formations.length],
    ];
  };

  const fetchData = async () => {
    try {
      recentcollaborations().then((response)=>{
        if(response.success)
          setCollaborations(response.data)
      });
      recentFormations().then((response)=>{
        if(response.success)
          setFormations(response.data)
      });
    } catch (error) {
      console.error("Error fetching collaborations:", error);
    } finally {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setIsLoadingC(false);
      setIsLoadingF(false);
    }
  };
  useEffect(() => {
    setIsLottie(true)
    fetchData();
  }, []);

  const loadingOptions = {
    loop: true,
    autoplay: true,
    animationData: loadingAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-96 overflow-hidden">
          {slides.map((slide, index) => (
            <motion.div
              key={index}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: index === currentSlide ? 1 : 0 }}
              transition={{ duration: 0.5 }}
            >
              <Image src={slide.image} alt={slide.text} quality={50}  layout="fill" objectFit="cover" />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <h1 className="text-white text-4xl font-bold">{slide.text}</h1>
              </div>
            </motion.div>
          ))}
        </section>

        {/* Collaborations Section */}
        {
          <section className={(collaborations && collaborations.length>0)?"py-16 bg-gray-100":"py-0 bg-gray-100"} >
          {(isLoadingC )? (
            <div className="flex justify-center items-center h-56">
              {isLottie && <Lottie options={loadingOptions} height={200} width={200} />}
            </div>
           ) : 
           collaborations && collaborations.length>0 && (<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold text-center mb-8">Nos dernières collaborations</h2>
              <div className="relative">
                <div className={(collaborations.length==1?"md:grid-cols-1":collaborations.length==2?"md:grid-cols-2":"md:grid-cols-3 ")+" grid grid-cols-1 gap-8"}>
                  <AnimatePresence>
                    {getVisibleItemsCollaborations().map((collab, index) => (
                      <motion.div
                        key={index}
                        className="bg-white flex flex-col items-center rounded-lg shadow-md overflow-hidden"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -50 }}
                        transition={{ duration: 0.5 }}
                      ><Link href={`/collaborations/${collab.id}`}>
                        {collab.photo && <Image
                          src={collab.photo}
                          quality={50}
                          alt={collab.name}
                          width={300}
                          className={""+(collaborations.length<3 && "w-full h-[300px] object-contain")}
                          height={200}
                        />}
                        <div className={"p-4 "+(collaborations.length<3 && " text-center")}>
                          <h3 className="font-semibold text-xl mb-2">{collab.name}</h3>
                          <p className="text-sm text-gray-600 italic mb-2">{collab.company}</p>
                          <p className="text-sm text-gray-600 mb-2">
                          {`Du ${format(collab.startDate, 'dd MMMM yyyy', { locale: fr })} au ${format(collab.endDate, 'dd MMMM yyyy', { locale: fr })}`}
                          </p>
                          <p className="font-bold text-lg mb-2">{collab.price + ".00 DA"}</p>
                          <p>{collab.remarks}</p>
                        </div>
                      </Link>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                {/* Boutons pour navigation */}
                <button
                  onClick={handlePrevCollaboration}
                  className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-600"
                >
                  <FaArrowLeft />
                </button>
                <button
                  onClick={handleNextCollaboration}
                  className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-600"
                >
                  <FaArrowRight />
                </button>
              </div>
            </div>)
          }
        </section>
        }

        {/* Formations Section */}
        <section className={(formations && formations.length>0)?"py-16 bg-gray-100":"py-0 bg-gray-100"} >
          {(isLoadingF )? (
            <div className="flex justify-center items-center h-56">
              {/* @ts-ignore */}
              {isLottie && <Lottie options={loadingOptions} height={200} width={200} />}
            </div>
           ) : 
           formations && formations.length>0 && (<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-8">Nos formations récentes</h2>
            <div className="relative">
            <div className={(formations.length==1?"md:grid-cols-1":formations.length==2?"md:grid-cols-2":"md:grid-cols-3 ")+" grid grid-cols-1 gap-8"}>
                <AnimatePresence>
                  {getVisibleItemsFormations().map((formation, index) => (
                    <motion.div
                      key={index}
                      className="bg-white flex flex-col items-center rounded-lg shadow-md overflow-hidden"
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -50 }}
                      transition={{ duration: 0.5 }}
                    ><Link href={`/formations/${formation.id}`}>
                      {formation.photo&& <Image
                        src={formation.photo}
                        quality={50}
                        alt={formation.name}
                        width={300}
                        className={""+(formations.length<3 && "w-full h-[300px] object-contain")}
                        height={200}
                      />}
                      <div className={"p-4 "+(formations.length<3 && " text-center")}>
                        <h3 className="font-semibold text-xl mb-2">{formation.name}</h3>
                        <p className="text-sm text-gray-600 mb-2">
                          Du {formation.startDate.toLocaleDateString()} au {formation.endDate.toLocaleDateString()}
                        </p>
                        <p className="font-bold text-lg mb-2">{formation.price+".00 DA"}</p>
                        <p>{formation.remarks}</p>
                      </div>
                    </Link>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Boutons pour navigation */}
              <button
                onClick={handlePrevFormation}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-600"
              >
                <FaArrowLeft />
              </button>
              <button
                onClick={handleNextFormation}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-600"
              >
                <FaArrowRight />
              </button>
            </div>
          </div>
        )}
        </section>

        {/* About Section */}
        <section className="py-16 bg-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-8">À propos de notre école</h2>
            <p className="text-lg text-center mb-8">
              {about}
            </p>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="py-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-8">Contactez-nous</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input type="text" name="name" placeholder="name" value={formData.name} onChange={handleChange} />
              <Input
                type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
              <Textarea name="content" placeholder="content" value={formData.content} onChange={handleChange} />
              <Button type="submit" className="w-full">
                Envoyer
              </Button>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

