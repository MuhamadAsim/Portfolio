import { useEffect, useState, lazy, Suspense } from "react";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ViewportDeferred from "@/components/ViewportDeferred";

// Lazy-load below-the-fold components to minimize initial bundle size and initial load compute
const About = lazy(() => import("@/components/About"));
const Projects = lazy(() => import("@/components/Projects"));
const Skill = lazy(() => import("@/components/Skill"));
const Testimonials = lazy(() => import("@/components/Testimonials"));
const Contact = lazy(() => import("@/components/Contact"));
const Chatbot = lazy(() => import("@/components/Chatbot"));

export default function Index() {
  // Tracks whether the chatbot window is open, so WhatsApp button can hide
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Defer floating chatbot mounting until after initial paint / browser idle
  const [mountChatbot, setMountChatbot] = useState(false);

  useEffect(() => {
    if ("requestIdleCallback" in window) {
      const idleId = (window as unknown as { requestIdleCallback: (cb: () => void, opts: { timeout: number }) => number }).requestIdleCallback(
        () => setMountChatbot(true),
        { timeout: 1500 }
      );
      return () => {
        (window as unknown as { cancelIdleCallback?: (id: number) => void }).cancelIdleCallback?.(idleId);
      };
    } else {
      const timer = setTimeout(() => setMountChatbot(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  // Handle deep-link scrolling (e.g. /#projects, /#skills)
  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.substring(1);
      const scrollToHash = (attempt = 0) => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        } else if (attempt < 5) {
          setTimeout(() => scrollToHash(attempt + 1), 100);
        }
      };
      setTimeout(() => scrollToHash(0), 120);
    }
    document.title = "Muhammad Asim | Portfolio";
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />

        {/* Below-the-fold sections are viewport-deferred and only load when scrolled near */}
        <ViewportDeferred
          id="about-me"
          minHeightClass="min-h-[550px] sm:min-h-[480px] lg:min-h-[420px]"
        >
          <About />
        </ViewportDeferred>

        <ViewportDeferred
          id="projects"
          minHeightClass="min-h-[1400px] sm:min-h-[900px] lg:min-h-[800px]"
        >
          <Projects />
        </ViewportDeferred>

        <ViewportDeferred
          id="skills"
          minHeightClass="min-h-[850px] md:min-h-[600px]"
        >
          <Skill />
        </ViewportDeferred>

        <ViewportDeferred
          id="testimonials"
          minHeightClass="min-h-[800px] md:min-h-[550px]"
        >
          <Testimonials />
        </ViewportDeferred>

        <ViewportDeferred
          id="contact"
          minHeightClass="min-h-[800px] md:min-h-[600px]"
        >
          <Contact />
        </ViewportDeferred>
      </main>

      <Footer />

      {/* Floating Chatbot: deferred mounting after hero is established */}
      {mountChatbot && (
        <Suspense fallback={null}>
          <Chatbot onOpenChange={setIsChatOpen} />
        </Suspense>
      )}

      <WhatsAppButton phoneNumber="923297208637" visible={!isChatOpen} />
    </div>
  );
}