
import { useEffect, useRef } from "react";
import SkillBadge from "./SkillBadge";


export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target === imageRef.current) {
              entry.target.classList.add("opacity-100", "translate-x-0");
            }
            if (entry.target === contentRef.current) {
              entry.target.classList.add("opacity-100", "translate-x-0");
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    if (imageRef.current) observer.observe(imageRef.current);
    if (contentRef.current) observer.observe(contentRef.current);

    return () => {
      if (imageRef.current) observer.unobserve(imageRef.current);
      if (contentRef.current) observer.unobserve(contentRef.current);
    };
  }, []);

  return (
    <section id="about" ref={sectionRef} className="section-container relative overflow-hidden py-24">
      {/* Background elements */}
      <div className="absolute top-0 right-0 -z-10 h-[500px] w-[500px] rounded-full bg-purple-500/5 blur-[120px]" />
      <div className="absolute bottom-0 left-0 -z-10 h-[400px] w-[400px] rounded-full bg-blue-500/5 blur-[100px]" />

      <div className="grid grid-cols-1 gap-16 md:grid-cols-2">
        <div
          ref={imageRef}
          className="opacity-0 -translate-x-8 transition-all duration-1000 ease-out order-2 md:order-1"
        >
          <div className="relative mr-2">
            <div className="absolute -left-6 -top-6 h-24 w-24 rounded-xl bg-secondary/50 -z-10" />
            <div className="overflow-hidden rounded-2xl border border-border/30 shadow-xl relative">
              <img
                src="/profile.png"
                alt="Muhammad Asim"
                className="w-full h-auto object-contain"
              />
              {/* <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div> */}
            </div>
            <div className="absolute -bottom-6 -right-6 h-32 w-32 rounded-full bg-primary/5 -z-10" />
          </div>
        </div>
        <div
          ref={contentRef}
          className="opacity-0 translate-x-8 transition-all duration-1000 ease-out order-1 md:order-2 overflow-x-auto mr-4"
        >
          <span className="subheading inline-block mb-3 px-3 py-1 rounded-full bg-secondary text-primary text-xs font-medium uppercase tracking-wider">About Me</span>
          <h2 className="heading-lg mb-6 font-display tracking-tight">Nice to meet you</h2>


          <div className="space-y-5 text-muted-foreground mr-8 max-w-2xl">
            <p className="relative pl-5 border-l-2 border-primary/20 leading-relaxed text-justify">
              I'm Muhammad Asim, a Full Stack Developer focused on building scalable and efficient web and mobile applications.
            </p>
            <p className="leading-relaxed text-justify pr-2">
              On the frontend, I craft modern, responsive interfaces with ReactJS, while also exploring Angular and Flutter for cross-platform solutions.
              On the backend, I specialize in Node.js, Express.js, and FastAPI for high-performance services.
            </p>
            <p className="leading-relaxed text-justify pr-2">
              My experience spans AWS Cloud — deploying apps on EC2, building serverless workflows with Lambda, and using S3 for storage.
              I also integrate AI models, fine-tune pre-trained ones, and develop data-driven solutions.
            </p>
            <p className="leading-relaxed text-justify pr-2">
              I work with automation tools like n8n and Selenium to streamline workflows and connect services seamlessly.
            </p>
            <p className="leading-relaxed text-justify pr-2">
              Beyond coding, I focus on writing clean, maintainable systems while continuously learning new technologies.
              My goal is to combine engineering, automation, and cloud to build innovative, reliable solutions.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
