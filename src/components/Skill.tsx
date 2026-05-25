import { useEffect, useRef } from "react";
import SkillBadge from "./SkillBadge";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const skills = [
  "ReactJS", "ExpressJS", "NodeJS", "Flutter", "NextJS",
  "MongoDB", "SQL", "n8n", "Roboflow", "Postman", "Selenium", "AI Integration",
  "FastAPI", "Python", "JavaScript","TypeScript", "HTML & CSS", 
  "Tailwind CSS", "Gsap", "Git/Github", "Docker", "AWS",
  "Lambda", "EC2", "S3", "Fargate", "ECS", "Supabase"
];

export default function Skill() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (leftRef.current && titleRef.current && imgRef.current) {
      const badges = leftRef.current.querySelectorAll(".skill-badge");

      const isMobile = window.innerWidth < 768;

      // Initial states
      gsap.set(titleRef.current, { opacity: 0, y: 60 });
      gsap.set(imgRef.current, { opacity: 0, x: 120 });

      if (isMobile) {
        // On mobile → animate half, show half instantly
        const half = Math.ceil(badges.length / 2);
        const animateBadges = Array.from(badges).slice(0, half);
        const visibleBadges = Array.from(badges).slice(half);

        // Animated half → start hidden
        gsap.set(animateBadges, { opacity: 0, y: 40 });
        // Other half → visible immediately
        gsap.set(visibleBadges, { opacity: 1, y: 0 });
      } else {
        // On desktop → all badges animate in
        gsap.set(badges, { opacity: 0, y: 40 });
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });

      // Animate image
      tl.to(imgRef.current, {
        x: 0,
        opacity: 1,
        ease: "power3.out",
        duration: isMobile ? 1.2 : 2,
      });

      // Animate title
      tl.to(
        titleRef.current,
        {
          y: 0,
          opacity: 1,
          rotation: isMobile ? 0 : 360,
          transformOrigin: "center center",
          ease: "power2.out",
          duration: isMobile ? 1 : 1.8,
        },
        "-=0.4"
      );

      // Animate badges
      if (isMobile) {
        const half = Math.ceil(badges.length / 2);
        const animateBadges = Array.from(badges).slice(0, half);

        tl.to(
          animateBadges,
          {
            opacity: 1,
            y: 0,
            ease: "power1.out",
            duration: 0.8,
            stagger: 0.08,
          },
          "-=0.3"
        );
      } else {
        tl.to(
          badges,
          {
            opacity: 1,
            y: 0,
            ease: "bounce.out",
            duration: 1.2,
            stagger: 0.08,
          },
          "-=0.3"
        );
      }
    }
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8">
        {/* Left: Title + badges */}
        <div ref={leftRef} className="text-center md:text-left overflow-hidden">
          <h3
            ref={titleRef}
            className="text-2xl font-bold mb-4 relative inline-block rainbow-text"
          >
            Skills & Expertise
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mt-4">
            {skills.map((skill, i) => (
              <SkillBadge key={skill} name={skill} index={i} className="skill-badge" />
            ))}
          </div>
        </div>

        {/* Right: Image */}
        <div className="md:ml-16 flex justify-center md:justify-start overflow-x-hidden pt-4 md:pt-8">
          <img
            ref={imgRef}
            src="/tech.jpeg"
            alt="Skills"
            className="w-full max-w-lg mt-6 rounded-xl mx-auto md:mx-0 will-change-transform will-change-opacity"
          />
        </div>
      </div>
    </section>
  );
}
