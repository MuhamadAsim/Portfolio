import AnimatedText from "./AnimatedText";
import ParticleNetworkBackground from "./ParticleNetworkBackground";
import { useEffect, useState } from "react";

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);
  // Tracks whether the photo is currently "pushed back" (hovered on
  // desktop, or tapped on mobile — hover doesn't reliably fire on touch
  // devices, so onClick handles that case).
  const [isPhotoActive, setIsPhotoActive] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 200);
    return () => clearTimeout(timer); // cleanup to avoid setState-after-unmount
  }, []);

  return (
    <section
      className="relative isolate flex min-h-screen items-end justify-center overflow-hidden bg-gradient-to-b from-purple-50 via-white to-white"
      id="about"
    >
      <ParticleNetworkBackground />

      {/*
        Outlined headline. z-index and opacity flip with isPhotoActive:
        normally sits behind the photo (z-10), but when the photo is
        hovered/tapped it jumps in front (z-30) and becomes fully opaque/
        crisp so it reads clearly over the now-receded photo.
      */}
      <div
        className={`absolute inset-x-0 top-1/2 w-full -translate-y-1/2 px-6 text-center transition-all duration-500 sm:px-4 ${
          isPhotoActive ? "z-30" : "z-10"
        }`}
      >
        <h1 className="sr-only">Muhammad Asim - Full Stack Developer</h1>

        <AnimatedText
          text="Full Stack Developer"
          delay={0.3}
          className="mx-auto block max-w-full whitespace-normal break-words font-display text-3xl font-extrabold uppercase leading-tight tracking-tight text-transparent [-webkit-text-stroke:1.5px_#a855f7] xs:text-4xl sm:whitespace-nowrap sm:text-6xl sm:leading-none md:text-7xl"
        />
        <AnimatedText
          text="and AI Engineer"
          delay={0.5}
          className="mx-auto block max-w-full whitespace-normal break-words font-display text-3xl font-extrabold uppercase leading-tight tracking-tight text-transparent [-webkit-text-stroke:1.5px_#a855f7] xs:text-4xl sm:whitespace-nowrap sm:text-6xl sm:leading-none md:text-7xl"
        />
      </div>

      {/*
        Photo. z-index flips to sit BEHIND the text on hover/tap, and
        fades/scales back slightly so it visually recedes rather than
        just instantly popping behind (which would look like a glitch).
      */}
      <div
        className={`relative h-[70vh] max-h-[780px] w-auto cursor-pointer scale-110 transition-all duration-500 sm:h-[85vh] ${
          isVisible ? "opacity-100" : "opacity-0"
        } ${
          isPhotoActive
            ? "z-0 scale-100 opacity-50" // pushed back: smaller, faded, behind text
            : "z-20 scale-110 opacity-100" // default: full size, in front
        }`}
        style={{ transitionDelay: isVisible ? "0s" : "0.6s" }}
        onMouseEnter={() => setIsPhotoActive(true)}
        onMouseLeave={() => setIsPhotoActive(false)}
        onClick={() => setIsPhotoActive((prev) => !prev)} // tap-to-toggle on mobile
      >
        <img
          src="/profilepic.png"
          alt="Muhammad Asim"
          className="h-full w-auto object-contain object-bottom"
        />
      </div>

      {/* Curved transition that crops the photo's legs — uses the theme's
          primary purple (same token as text-primary in Navbar) instead of
          a hardcoded hex, so it stays in sync if the theme color changes. */}
      <svg
        className="pointer-events-none absolute bottom-0 left-0 z-30 h-28 w-full fill-primary sm:h-40"
        viewBox="0 0 1920 200"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path d="M0,120 C480,220 1440,20 1920,100 L1920,200 L0,200 Z" />
      </svg>
    </section>
  );
}