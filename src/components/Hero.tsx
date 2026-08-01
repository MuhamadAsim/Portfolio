import { ArrowDownCircle, FileText } from "lucide-react";
import AnimatedText from "./AnimatedText";
import ParticleOrb from "./ParticleOrb";
import { useEffect, useRef, useState } from "react";
import { useResponsiveOrb } from "../hooks/useResponsiveOrb";

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const { size: orbSize, numPoints: orbPoints } = useResponsiveOrb();

  useEffect(() => {
    setTimeout(() => {
      setIsVisible(true);
    }, 200);
  }, []);

  const handleDownloadCV = () => {
    const link = document.createElement("a");
    link.href = "/Muhammad_Asim_CV.pdf"; // Update this path with your actual PDF file
    link.download = "Muhammad_Asim_CV.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section
      ref={heroRef}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden py-20"
      id="home"
    >
      {/* Existing subtle background gradient */}
      <div className="absolute inset-0 -z-10 opacity-30 bg-gradient-to-b from-secondary/70 via-transparent to-transparent" />

      {/*
        Rotating particle-sphere orb. Size/density now comes from
        useResponsiveOrb, which reads viewport width and updates on
        resize. Wrapper below still only handles centering.
      */}
      <div
        className="absolute left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-1/2"
        aria-hidden="true"
      >
        <ParticleOrb size={orbSize} numPoints={orbPoints} />
      </div>

      <div className="container relative z-10 mx-auto max-w-6xl px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="sr-only">Muhammad Asim - Full Stack Web Developer</h1>

          <div
            className={`mb-4 transition-all duration-700 ${
              isVisible ? "opacity-100" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "0.1s" }}
          >
            <span className="subheading">Hello, I'm Muhammad Asim</span>
          </div>

          <div className="mb-6 font-display text-3xl font-bold leading-normal tracking-tight sm:text-4xl md:text-5xl md:leading-tight">
            <AnimatedText
              text="Full Stack Developer"
              delay={0.3}
              className="mb-4 block whitespace-nowrap sm:whitespace-normal"
            />
          </div>

          <p
            className={`mb-8 text-lg text-muted-foreground transition-all duration-700 md:text-xl ${
              isVisible ? "opacity-100" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "1.2s" }}
          >
            I build modern and scalable web and mobile applications, working on both
            frontend and backend to deliver complete solutions.
          </p>

          <div
            className={`flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-700 ${
              isVisible ? "opacity-100" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "1.4s" }}
          >
            <a
              href="#projects"
              className="relative overflow-hidden inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-transform duration-300 hover:scale-105 active:scale-95"
            >
              <span className="relative z-10">View My Work</span>
              <span className="absolute inset-0 -translate-x-full bg-white/30 blur-lg animate-flowLight"></span>
            </a>

            <button
              onClick={handleDownloadCV}
              className="relative overflow-hidden inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-transform duration-300 hover:scale-105 active:scale-95"
            >
              <span className="relative z-10">Download CV</span>
              <span className="absolute inset-0 -translate-x-full bg-white/30 blur-lg animate-flowLight"></span>
            </button>
          </div>

          {/* Scroll indicator - now in normal document flow, sits below the buttons instead of being pinned to the section's bottom edge */}
          <a
            href="#projects"
            className="mt-10 flex flex-col items-center justify-center text-sm font-medium text-muted-foreground transition-colors duration-300 hover:text-foreground animate-pulse"
            aria-label="Scroll to projects"
          >
            <span className="mb-2 text-xs">Scroll</span>
            <ArrowDownCircle className="h-6 w-6" />
          </a>
        </div>
      </div>
    </section>
  );
}