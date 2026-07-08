import { useEffect, useState } from "react";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Chatbot from "@/components/Chatbot";
import WhatsAppButton from "@/components/WhatsAppButton"; // 👈 new import
import Skill from "@/components/Skill";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";

export default function Index() {
  // Tracks whether the chatbot window is open, so the WhatsApp button
  // can hide itself and not collide with the chat window
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.substring(1);
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
    document.title = "Muhammad Asim | Portfolio";
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <Projects />
        <About />
        <Skill />
        <Services />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <Chatbot onOpenChange={setIsChatOpen} />
      <WhatsAppButton phoneNumber="923297208637" visible={!isChatOpen} />
    </div>
  );
}