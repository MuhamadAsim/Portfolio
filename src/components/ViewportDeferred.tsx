import React, { useState, useEffect, useRef, Suspense } from "react";
import { cn } from "@/lib/utils";

interface ViewportDeferredProps {
  /** The anchor id for the section (e.g. "projects", "skills") */
  id: string;
  /** Responsive Tailwind min-height classes to preserve layout & avoid CLS across breakpoints */
  minHeightClass: string;
  /** IntersectionObserver rootMargin (defaults to 300px ahead of scroll) */
  rootMargin?: string;
  /** Additional container classes */
  className?: string;
  /** Child component (typically React.lazy component) */
  children: React.ReactNode;
}

export default function ViewportDeferred({
  id,
  minHeightClass,
  rootMargin = "300px 0px",
  className,
  children,
}: ViewportDeferredProps) {
  // If the initial URL hash already targets this section, hydrate immediately
  const isTargetOfHash =
    typeof window !== "undefined" &&
    window.location.hash.toLowerCase() === `#${id.toLowerCase()}`;

  const [isLoaded, setIsLoaded] = useState<boolean>(isTargetOfHash);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isLoaded) return;

    // Check again in case hash was updated dynamically
    if (
      typeof window !== "undefined" &&
      window.location.hash.toLowerCase() === `#${id.toLowerCase()}`
    ) {
      setIsLoaded(true);
      return;
    }

    const node = containerRef.current;
    if (!node || !("IntersectionObserver" in window)) {
      // Fallback for environments without IntersectionObserver
      setIsLoaded(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsLoaded(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [id, isLoaded, rootMargin]);

  if (!isLoaded) {
    return (
      <div
        id={id}
        ref={containerRef}
        className={cn("relative w-full", minHeightClass, className)}
        aria-hidden="true"
      />
    );
  }

  return (
    <Suspense
      fallback={
        <div
          id={id}
          className={cn("relative w-full", minHeightClass, className)}
          aria-hidden="true"
        />
      }
    >
      {children}
    </Suspense>
  );
}
