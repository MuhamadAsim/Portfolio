// src/components/Loader.tsx
import { useEffect, useState } from "react";
import ParticleNetworkBackground from "./ParticleNetworkBackground";

interface LoaderProps {
  onComplete: () => void;
}

const DISPLAY_MS = 2000; // how long the loader stays fully visible
const FADE_MS = 400; // fade-out transition duration before unmount

export default function Loader({ onComplete }: LoaderProps) {
  // Controls the fade-out class; separate from "should this component
  // still be mounted" so the fade animation has time to play before
  // the parent removes the loader from the tree.
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setIsFadingOut(true), DISPLAY_MS);
    const completeTimer = setTimeout(
      () => onComplete(),
      DISPLAY_MS + FADE_MS
    );

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-gradient-to-b from-purple-50 via-white to-white transition-opacity duration-[400ms] ease-out ${
        isFadingOut ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
      aria-hidden={isFadingOut}
    >
      <ParticleNetworkBackground />

      <div className="relative z-10 flex flex-col items-center gap-4">
        <span className="animate-pulse font-display text-4xl font-extrabold uppercase tracking-tight text-transparent [-webkit-text-stroke:1.5px_#a855f7] sm:text-6xl">
          Muhammad Asim
        </span>

        {/* Simple 3-dot loading indicator, staggered via animation-delay */}
        <div className="flex gap-2">
          <span className="h-2 w-2 animate-bounce rounded-full bg-purple-500 [animation-delay:-0.3s]" />
          <span className="h-2 w-2 animate-bounce rounded-full bg-purple-500 [animation-delay:-0.15s]" />
          <span className="h-2 w-2 animate-bounce rounded-full bg-purple-500" />
        </div>
      </div>
    </div>
  );
}