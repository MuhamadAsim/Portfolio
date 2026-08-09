import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface SkillBadgeProps {
  name: string;
  className?: string;
  index?: number;
}

export default function SkillBadge({ name, className, index = 0 }: SkillBadgeProps) {
  const badgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!badgeRef.current) return;

    const isMobile = window.innerWidth < 768;

    if (isMobile) {
      // ❌ No animation on mobile → make visible instantly
      gsap.set(badgeRef.current, { opacity: 1, x: 0, y: 0, scale: 1 });
    } else {
      // ✅ Desktop → random fly-in or fade-in
      const doFlyIn = Math.random() < 0.5;

      if (doFlyIn) {
        const directions = [
          { x: -150, y: 0 },
          { x: 150, y: 0 },
          { x: 0, y: -150 },
          { x: 0, y: 150 },
          { x: -120, y: -120 },
          { x: 120, y: 120 },
        ];
        const dir = directions[Math.floor(Math.random() * directions.length)];

        gsap.fromTo(
          badgeRef.current,
          { x: dir.x, y: dir.y, opacity: 0 },
          {
            x: 0,
            y: 0,
            opacity: 1,
            ease: "back.out(1.7)",
            duration: 2,
            delay: index * 0.03,
            scrollTrigger: {
              trigger: badgeRef.current,
              start: "top 95%",
              toggleActions: "play none none none",
            },
          }
        );
      } else {
        // Simple fade-in
        gsap.fromTo(
          badgeRef.current,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 2,
            delay: index * 0.1,
            ease: "power1.out",
            scrollTrigger: {
              trigger: badgeRef.current,
              start: "top 95%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    }
  }, [index]);

  return (
    <div
      ref={badgeRef}
      className={cn(
        "skill-badge relative overflow-hidden shimmer-light",
        "hover:animate-wiggle hover:bg-primary hover:text-white text-center flex items-center justify-center",
        "glass-card rounded-full py-1.5 px-3 text-sm font-medium cursor-default transition-colors duration-300",
        "will-change-transform will-change-opacity",
        className
      )}
    >
      {name}
    </div>
  );
}
