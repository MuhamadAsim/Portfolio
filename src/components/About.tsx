import { useEffect, useRef, useState } from "react";

export default function About() {
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [imageVisible, setImageVisible] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target === imageRef.current) setImageVisible(true);
            if (entry.target === contentRef.current) setContentVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (imageRef.current) observer.observe(imageRef.current);
    if (contentRef.current) observer.observe(contentRef.current);

    // Fallback: if for any reason the section is already in view at mount
    // (common on mobile when it's near the top), reveal immediately instead
    // of waiting on an observer callback that may never re-fire.
    const revealIfAlreadyVisible = () => {
      const check = (ref: React.RefObject<HTMLElement>, setter: (v: boolean) => void) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) setter(true);
      };
      check(imageRef, setImageVisible);
      check(contentRef, setContentVisible);
    };
    revealIfAlreadyVisible();

    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="section-container relative overflow-hidden py-24">
      <div className="absolute top-0 right-0 -z-10 h-[500px] w-[500px] rounded-full bg-purple-500/5 blur-[120px]" />
      <div className="absolute bottom-0 left-0 -z-10 h-[400px] w-[400px] rounded-full bg-blue-500/5 blur-[100px]" />

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12 md:items-center">
        <div
          ref={imageRef}
          className={`transition-all duration-1000 ease-out order-2 md:order-1 ${imageVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
            }`}
        >
          <div className="relative mr-2">
            <div className="absolute -left-6 -top-6 h-24 w-24 rounded-xl bg-secondary/50 -z-10" />
            <div className="overflow-hidden rounded-2xl border border-border/30 shadow-xl h-[600px]">
              <img src="/image.png" alt="Muhammad Asim" className="w-full h-full object-cover object-top" />
            </div>
            <div className="absolute -bottom-6 -right-6 h-32 w-32 rounded-full bg-primary/5 -z-10" />
          </div>
        </div>

        <div
          ref={contentRef}
          className={`transition-all duration-1000 ease-out order-1 md:order-2 w-full min-w-0 px-4 md:px-0 ${contentVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
        >
          <span className="subheading inline-block mb-3 px-3 py-1 rounded-full bg-secondary text-primary text-xs font-medium uppercase tracking-wider">
            About Me
          </span>
          <h2 className="heading-lg mb-6 font-display tracking-tight">Nice to meet you</h2>

          <div className="space-y-5 text-muted-foreground w-full">
            <p className="relative pl-3 border-l-2 border-primary/20 leading-relaxed text-justify">
              I'm Muhammad Asim, a Full Stack Developer passionate about building scalable, efficient, and user-focused web and mobile applications.
            </p>

            <p className="leading-relaxed text-justify">
              I build modern frontend applications with React.js, Next.js, and React Native (Expo), while developing scalable backend services and APIs using Node.js, Express.js, and FastAPI.
            </p>

            <p className="leading-relaxed text-justify">
              I also work with AI and machine learning, including fine-tuning models, building RAG applications, AI chatbots, autonomous agents, and integrating LLMs and computer vision into real-world solutions.
            </p>

            <p className="leading-relaxed text-justify">
              My experience includes deploying applications on AWS EC2, building serverless solutions with Lambda, and using Amazon S3 to create scalable cloud-based systems.
            </p>

            <p className="leading-relaxed text-justify">
              I enjoy writing clean, maintainable code and continuously learning new technologies to build reliable software that combines full-stack development, cloud, and AI.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}