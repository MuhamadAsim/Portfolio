
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

  return (
    <Component 
      ref={containerRef}
      className={cn("inline-block", className)}
      aria-label={text}
    >
      {text.split("").map((char, i) => (
        <span
          key={`${char}-${i}`}
          className={cn(
            "text-animate inline-block opacity-0 transform",
            char === " " ? "w-[0.3em]" : ""
          )}
          aria-hidden="true"
        >
          {char}
        </span>
      ))}
    </Component>
  );
}
