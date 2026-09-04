import AnimatedText from "./AnimatedText";
import ParticleNetworkBackground from "./ParticleNetworkBackground";
import { useEffect, useRef, useState } from "react";

export default function Hero() {
  // True because profile image was already pre-downloaded & decoded by Loader
  const [imageLoaded, setImageLoaded] = useState(true);
  const [isHeroInView, setIsHeroInView] = useState(true);
  const heroRef = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  // Tracks whether the photo is currently "pushed back" (hovered on
  // desktop, or tapped on mobile — hover doesn't reliably fire on touch
  // devices, so onClick handles that case).
  const [isPhotoActive, setIsPhotoActive] = useState(false);

  useEffect(() => {
    if (imgRef.current?.complete) {
      setImageLoaded(true);
    }
  }, []);

  // Compute power optimization: pause particles RAF loop when Hero is scrolled out of view
  useEffect(() => {
    const node = heroRef.current;
    if (!node || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsHeroInView(entry.isIntersecting);
      },
      { threshold: 0 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative isolate flex min-h-screen items-end justify-center overflow-hidden bg-gradient-to-b from-purple-50 via-white to-white"
      id="about"
    >
      <ParticleNetworkBackground isActive={isHeroInView} />

      {/* Text renders instantly — no entrance delay */}
      {/* Sits higher up on mobile (top-[22%]); centers vertically from sm: up */}
      <div
        className={`absolute inset-x-0 top-[22%] w-full px-6 text-center transition-all duration-500 sm:top-1/2 sm:-translate-y-1/2 sm:px-4 ${
          isPhotoActive ? "z-30" : "z-10"
        }`}
      >
        <h1 className="sr-only">Muhammad Asim - Full Stack Developer</h1>

        <AnimatedText
          text="Full Stack Developer"
          delay={0.4}
          className="mx-auto block max-w-full whitespace-normal break-normal font-display text-3xl font-extrabold uppercase leading-tight tracking-tight text-transparent [-webkit-text-stroke:1.5px_#a855f7] xs:text-5xl sm:whitespace-nowrap sm:text-6xl sm:leading-none md:text-7xl"
        />
        <AnimatedText
          text="and AI Engineer"
          delay={0.6}
          className="mx-auto block max-w-full whitespace-normal break-normal font-display text-3xl font-extrabold uppercase leading-tight tracking-tight text-transparent [-webkit-text-stroke:1.5px_#a855f7] xs:text-5xl sm:whitespace-nowrap sm:text-6xl sm:leading-none md:text-7xl"
        />
      </div>

      <div
        className={`relative h-[70vh] max-h-[780px] w-auto cursor-pointer transition-all duration-700 ease-out sm:h-[85vh] ${
          imageLoaded
            ? "translate-y-0 opacity-100"
            : "translate-y-full opacity-0"
        } ${
          isPhotoActive
            ? "z-0 scale-100 opacity-50" // pushed back: smaller, faded, behind text
            : "z-20 scale-110" // default: full size, in front
        }`}
        onMouseEnter={() => setIsPhotoActive(true)}
        onMouseLeave={() => setIsPhotoActive(false)}
        onClick={() => setIsPhotoActive((prev) => !prev)} // tap-to-toggle on mobile
      >
        <img
          ref={imgRef}
          src="/profilepic.png"
          alt="Muhammad Asim"
          onLoad={() => setImageLoaded(true)}
          className="h-full w-auto object-contain object-bottom"
        />
      </div>

      {/* Curved transition that crops the photo's legs */}
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