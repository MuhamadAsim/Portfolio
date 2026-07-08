import { ArrowDownCircle, FileText } from "lucide-react";
import AnimatedText from "./AnimatedText";
import { useEffect, useRef, useState } from "react";

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

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
      <div className="absolute inset-0 -z-10 opacity-30 bg-gradient-to-b from-secondary/70 via-transparent to-transparent" />

      <div className="container mx-auto max-w-6xl px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="sr-only">Muhammad Asim - Full Stack Web Developer</h1>

          <div
            className={`mb-4 transition-all duration-700 ${isVisible ? "opacity-100" : "opacity-0 translate-y-8"
              }`}
            style={{ transitionDelay: "0.1s" }}
          >
            <span className="subheading">Hello, I'm Muhammad Asim</span>
          </div>

          {/* Solution 1: Responsive text sizing with better mobile handling */}
          <div className="mb-6 font-display text-3xl font-bold leading-normal tracking-tight sm:text-4xl md:text-5xl md:leading-tight">
            <AnimatedText
              text="Full Stack Developer"
              delay={0.3}
              className="mb-4 block whitespace-nowrap sm:whitespace-normal"
            />
          </div>



          <p
            className={`mb-8 text-lg text-muted-foreground transition-all duration-700 md:text-xl ${isVisible ? "opacity-100" : "opacity-0 translate-y-8"
              }`}
            style={{ transitionDelay: "1.2s" }}
          >
            I build modern and scalable web and mobile applications, working on both
            frontend and backend to deliver complete solutions.
          </p>

          <div
            className={`flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-700 ${isVisible ? "opacity-100" : "opacity-0 translate-y-8"
              }`}
            style={{ transitionDelay: "1.4s" }}
          >
            <a
              href="#projects"
              className="relative overflow-hidden inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-transform duration-300 hover:scale-105 active:scale-95"
            >
              <span className="relative z-10">View My Work</span>
              {/* Flowing white light */}
              <span className="absolute inset-0 -translate-x-full bg-white/30 blur-lg animate-flowLight"></span>
            </a>

            <button
              onClick={handleDownloadCV}
              className="relative overflow-hidden inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-transform duration-300 hover:scale-105 active:scale-95"
            >
              <span className="relative z-10">Download CV</span>
              {/* Flowing white light */}
              <span className="absolute inset-0 -translate-x-full bg-white/30 blur-lg animate-flowLight"></span>
            </button>

          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-pulse ">
          <a
            href="#projects"
            className="flex flex-col items-center justify-center text-sm font-medium text-muted-foreground transition-colors duration-300 hover:text-foreground"
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