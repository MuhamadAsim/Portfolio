import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface AnimatedTextProps {
  text: string;
  className?: string;
  once?: boolean;
  delay?: number;
  speed?: number;
  as?: React.ElementType;
}

export default function AnimatedText({
  text,
  className,
  once = true,
  delay = 0,
  speed = 0.05,
  as: Component = "div",
}: AnimatedTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (containerRef.current) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        const container = containerRef.current;
        if (!container) return;

        const textNodes = Array.from(container.querySelectorAll(".text-animate"));

        textNodes.forEach((node, i) => {
          const charElement = node as HTMLSpanElement;
          charElement.style.animationDelay = `${delay + i * speed}s`;
          charElement.classList.add("animate-fade-in-right");
          charElement.style.opacity = "1";
        });
      }, 100);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [text, delay, speed, once]);

  // Split into words so each word can be wrapped in its own no-wrap
  // span — this keeps every word intact while still letting the line
  // break between words. The space between two words is rendered as
  // its own (breakable) span, outside any nowrap wrapper, so that's
  // the only place the browser is ever allowed to wrap. A running
  // charIndex keeps the stagger animation (delay + i * speed)
  // continuous left-to-right across the whole string.
  const words = text.split(" ");
  let charIndex = 0;

  return (
    <Component
      ref={containerRef}
      className={cn("inline-block", className)}
      aria-label={text}
    >
      {words.map((word, wi) => (
        <span key={`word-${wi}`}>
          <span className="inline-block whitespace-nowrap">
            {word.split("").map((char) => {
              const i = charIndex++;
              return (
                <span
                  key={`char-${i}`}
                  className="text-animate inline-block opacity-0 transform"
                  aria-hidden="true"
                >
                  {char}
                </span>
              );
            })}
          </span>
          {wi < words.length - 1 &&
            (() => {
              const i = charIndex++;
              return (
                <span
                  key={`space-${wi}`}
                  className="text-animate inline-block w-[0.3em] opacity-0 transform"
                  aria-hidden="true"
                >
                  {"\u00A0"}
                </span>
              );
            })()}
        </span>
      ))}
    </Component>
  );
}