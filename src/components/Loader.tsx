// src/components/Loader.tsx
import { useEffect, useState } from "react";
import ParticleNetworkBackground from "./ParticleNetworkBackground";

interface LoaderProps {
  onComplete: () => void;
}

const MIN_DISPLAY_MS = 700; // Minimum branding time to prevent jarring flicker
const MAX_WAIT_MS = 5000; // Emergency fallback timeout if network stalls
const FADE_MS = 400; // Fade-out transition duration before unmount

export default function Loader({ onComplete }: LoaderProps) {
  // Controls the fade-out class before the parent removes the loader from tree
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    let isMounted = true;
    let minTimeElapsed = false;
    let imageReady = false;
    let fadeOutStarted = false;

    const startFadeOut = () => {
      if (fadeOutStarted || !isMounted) return;
      fadeOutStarted = true;
      setIsFadingOut(true);
      setTimeout(() => {
        if (isMounted) onComplete();
      }, FADE_MS);
    };

    const tryComplete = () => {
      if (minTimeElapsed && imageReady) {
        startFadeOut();
      }
    };

    // Minimum display timer
    const minTimer = setTimeout(() => {
      minTimeElapsed = true;
      tryComplete();
    }, MIN_DISPLAY_MS);

    // Emergency backstop timeout (in case of stalled TCP)
    const emergencyTimer = setTimeout(() => {
      console.warn("Loader safety timeout reached, proceeding to show hero.");
      imageReady = true;
      minTimeElapsed = true;
      startFadeOut();
    }, MAX_WAIT_MS);

    // Preload & decode the hero profile picture
    const img = new Image();
    img.src = "/profilepic.png";

    const handleImageReady = () => {
      imageReady = true;
      tryComplete();
    };

    // Handle instant cached resolution
    if (img.complete && img.naturalWidth > 0) {
      handleImageReady();
    } else {
      img.onload = () => {
        // If supported, decode before resolving so first paint is instant
        if ("decode" in img) {
          img.decode().then(handleImageReady).catch(handleImageReady);
        } else {
          handleImageReady();
        }
      };

      // Explicit onerror handling: immediately unblock without waiting for timeout
      img.onerror = (err) => {
        console.warn("Hero image failed to load or was blocked, continuing:", err);
        handleImageReady();
      };
    }

    return () => {
      isMounted = false;
      clearTimeout(minTimer);
      clearTimeout(emergencyTimer);
      img.onload = null;
      img.onerror = null;
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-gradient-to-b from-purple-50 via-white to-white transition-opacity duration-500 ease-out ${
        isFadingOut ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
      aria-hidden={isFadingOut}
    >
      <ParticleNetworkBackground id="loader-particles" />

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