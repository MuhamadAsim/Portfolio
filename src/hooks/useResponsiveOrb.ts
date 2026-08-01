import { useEffect, useState } from "react";

interface OrbConfig {
  size: number;
  numPoints: number;
}

/**
 * Returns orb size/density tuned to viewport width, and keeps it in sync
 * on resize/orientation change (debounced so it doesn't fire on every pixel).
 *
 * Breakpoints match Tailwind's sm/md defaults so it lines up with the
 * rest of the layout's responsive behavior.
 */
export function useResponsiveOrb(): OrbConfig {
  const getConfig = (): OrbConfig => {
    const width = window.innerWidth;

    if (width < 480) {
      // Small phones — keep the orb subtle so it doesn't fight with text
      return { size: 240, numPoints: 130 };
    }
    if (width < 768) {
      // Larger phones / small tablets
      return { size: 320, numPoints: 190 };
    }
    if (width < 1024) {
      // Tablets
      return { size: 380, numPoints: 260 };
    }
    // Desktop
    return { size: 450, numPoints: 320 };
  };

  const [config, setConfig] = useState<OrbConfig>(() =>
    typeof window !== "undefined" ? getConfig() : { size: 240, numPoints: 120 }
  );

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    const handleResize = () => {
      // Debounce — resize fires continuously while dragging, we don't
      // want to recompute + remount the canvas on every single frame.
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => setConfig(getConfig()), 150);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return config;
}