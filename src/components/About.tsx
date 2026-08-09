import { useEffect, useRef, useState } from "react";

export default function About() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const paragraphs = [
    `I'm Muhammad Asim, a Full Stack Developer and AI Engineer focused on building modern, scalable, and production-ready software. I have experience developing full-stack applications using React, Next.js, React Native, Node.js, Express.js, Python, and FastAPI, allowing me to work across both frontend and backend systems.`,
    `My primary focus is AI Engineering, where I build practical AI-powered applications using Large Language Models and modern AI technologies. I work with LLM integrations, AI agents, RAG systems, chatbots, model evaluation, guardrails, observability, and AI application monitoring. I'm particularly interested in building reliable AI systems that go beyond basic model integration and can be properly evaluated, monitored, and improved in production.`,
    `I also have experience with cloud technologies such as AWS, including EC2, Lambda, and S3, and enjoy designing complete systems that combine software engineering, cloud infrastructure, and AI.`,
  ];

  return (
    <section
      className="relative bg-primary pb-32 pt-2 text-primary-foreground sm:pb-40 sm:pt-4"
      ref={sectionRef}
    >
      {/*
        Full-width now: no max-w-6xl/4xl caps, just horizontal padding.
        This is what makes the content actually stretch edge-to-edge
        instead of stopping with empty space on the right.
      */}
      <div className="w-full px-6 sm:px-12 lg:px-20">
        <h2
          className={`mb-8 font-display text-4xl font-extrabold uppercase tracking-tight transition-all duration-700 sm:text-5xl md:text-6xl ${
            isVisible ? "opacity-100" : "opacity-0 translate-y-8"
          }`}
        >
          About Me
        </h2>

        <div className="w-full space-y-6 text-lg text-primary-foreground/70 sm:text-xl">
          {paragraphs.map((text, i) => (
            <div key={i} className="w-full overflow-hidden">
              <p
                className="w-full transition-all ease-out"
                style={{
                  clipPath: isVisible
                    ? "inset(0 0% 0 0)"
                    : "inset(0 100% 0 0)",
                  opacity: isVisible ? 1 : 0,
                  transitionDuration: "900ms",
                  transitionDelay: `${i * 0.25}s`,
                }}
              >
                {text}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/*
        Bottom curve, same technique as Hero's — but here it transitions
        the section OUT of bg-primary into whatever comes next. fill-background
        assumes your next section uses your theme's "background" token; if the
        next section after About is a different color, swap this fill to match.
      */}
      <svg
        className="pointer-events-none absolute bottom-0 left-0 h-24 w-full fill-background sm:h-36"
        viewBox="0 0 1920 200"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path d="M0,80 C480,180 1440,0 1920,90 L1920,200 L0,200 Z" />
      </svg>
    </section>
  );
}