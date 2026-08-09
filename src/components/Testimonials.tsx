import { useEffect, useRef, useState } from "react";
import { Star } from "lucide-react";

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [flippedCards, setFlippedCards] = useState<{ [key: number]: boolean }>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target === headingRef.current) {
              entry.target.classList.add("animate-fade-in-up");
            }
            if (entry.target === cardsRef.current) {
              const cards = entry.target.querySelectorAll(".testimonial-card");
              cards.forEach((card, index) => {
                setTimeout(() => {
                  card.classList.add("animate-fade-in-up");
                }, index * 200);
              });
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    if (headingRef.current) observer.observe(headingRef.current);
    if (cardsRef.current) observer.observe(cardsRef.current);

    return () => {
      if (headingRef.current) observer.unobserve(headingRef.current);
      if (cardsRef.current) observer.unobserve(cardsRef.current);
    };
  }, []);

  const testimonials = [
    {
      name: "Muneeb ur Rehman",
      role: "CEO, Startup",
      image: "./muneeb.PNG",
      text: "Working with Asim was an absolute pleasure. He delivered our project with exceptional quality and ahead of schedule. Highly recommended!",
      rating: 5,
      projectDetails: {
        title: "Mass Email Sender Web Application",
        description: "Developed a comprehensive web application for mass email marketing campaigns using SendGrid integration with verified domain authentication.",
        features: [
          "Send thousands of emails in a single click",
          "SendGrid API integration with verified domains",
          "Email campaign summary and analytics",
          "Delivery status tracking",
          "User-friendly dashboard interface"
        ],
        technologies: "React, Node.js, SendGrid API, MongoDB"
      }
    },
    {
      name: "Zain",
      role: "Owner, Online Cosmetic Store",
      image: "./zain.PNG",
      text: "Asim's ability to understand our needs and translate them into a beautiful, functional product was beyond impressive.",
      rating: 5,
      projectDetails: {
        title: "E-Commerce Cosmetic Store Platform",
        description: "Built a modern, responsive e-commerce platform specifically designed for cosmetic products with advanced filtering and shopping features.",
        features: [
          "Product catalog with advanced filtering",
          "Shopping cart and checkout system",
          "Payment gateway integration",
          "Inventory management system",
          "Customer reviews and ratings",
          "Mobile-responsive design"
        ],
        technologies: "React, Express.js, Stripe API, PostgreSQL"
      }
    },
    {
      name: "Ahmed Al-Farouqi",
      role: "Civil Engineer",
      image: "./arbi.PNG",
      text: "Professional, cooperative, and skilled. Asim brought our vision to life perfectly. I'll definitely collaborate again!",
      rating: 4.5,
      projectDetails: {
        title: "Worker Attendance Management Android App",
        description: "Created a comprehensive Android application for managing worker attendance with role-based access, holiday management, and payroll calculations.",
        features: [
          "Role-based worker management",
          "Attendance tracking with GPS location",
          "Holiday and leave management",
          "Automated payroll calculations",
          "Real-time reporting and analytics",
          "Offline functionality with sync"
        ],
        technologies: "Flutter, Supabase, SQLite"
      }
    },
  ];

  const handleCardFlip = (index: number) => {
    setFlippedCards((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  // Stars now use the theme's primary color instead of a hardcoded yellow —
  // yellow/gold stars are a common convention, but on a purple-branded site
  // it read as an unrelated color dropped in from a template. Empty stars
  // use a muted border-tone outline instead of flat gray.
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${
          index < rating
            ? "fill-primary text-primary"
            : "fill-transparent text-muted-foreground/30"
        }`}
      />
    ));
  };

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="section-container relative overflow-hidden py-20 sm:py-28"
    >
      {/*
        Background blobs — same technique/tokens as Projects.tsx (primary at
        two opacities) instead of the previous purple/pink + blue/cyan mix,
        so every section's ambient background reads as one consistent site
        instead of each section inventing its own palette.
      */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-10 left-10 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-0 right-10 h-72 w-72 rounded-full bg-primary/5 blur-3xl" />
      </div>

      {/* Header — same pill -> heading -> subtitle pattern as About/Projects/Skills */}
      <div
        ref={headingRef}
        className="mb-16 translate-y-8 text-center opacity-0"
      >
        <span className="subheading mb-4 inline-block rounded-full bg-secondary px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-primary">
          What Clients Say
        </span>
        <h2 className="heading-lg mb-5 font-display text-4xl font-bold text-primary tracking-tight">
          Testimonials
        </h2>
       
      </div>

      {/* Testimonials Grid */}
      <div ref={cardsRef} className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((t, i) => (
          <div
            key={i}
            className="testimonial-card h-96 translate-y-8 opacity-0"
            style={{ perspective: "1000px" }}
          >
            <div
              className={`relative h-full w-full transform-style-preserve-3d cursor-pointer transition-transform duration-700 ${
                flippedCards[i] ? "rotate-y-180" : ""
              }`}
              onClick={() => handleCardFlip(i)}
            >
              {/*
                Front — restyled to match the card language already
                established in Skill.tsx: bg-card/50 + backdrop-blur +
                border-border, hover lift + primary-tinted glow, instead of
                white/80 with a hardcoded purple-200 border.
              */}
              <div className="group backface-hidden absolute inset-0 flex flex-col rounded-2xl border border-border bg-card/50 p-8 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10">
                <div className="mb-5 flex items-center gap-4">
                  <img
                    src={t.image}
                    alt={t.name}
                    className="h-14 w-14 rounded-full object-cover shadow-md transition-transform duration-300 group-hover:scale-110"
                    loading="lazy"
                    width={56}
                    height={56}
                  />
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-foreground">
                      {t.name}
                    </h4>
                    <span className="text-sm text-muted-foreground">{t.role}</span>
                  </div>
                </div>

                <div className="mb-4 flex items-center gap-1">
                  {renderStars(t.rating)}
                  <span className="ml-2 text-sm text-muted-foreground">
                    ({t.rating}/5)
                  </span>
                </div>

                <p className="mb-4 flex-1 text-sm leading-relaxed text-foreground/80">
                  "{t.text}"
                </p>

                <div className="text-center">
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-xs text-primary">
                    Click to see project details
                  </span>
                </div>
              </div>

              {/*
                Back — was a purple-to-pink gradient (pink has no place in
                this theme at all). Now uses primary at low opacity, staying
                inside the same single-hue palette as everything else.
              */}
              <div className="backface-hidden rotate-y-180 absolute inset-0 overflow-y-auto rounded-2xl border border-border bg-gradient-to-br from-primary/10 to-primary/5 p-6 shadow-sm">
                <div className="space-y-4">
                  <div>
                    <h3 className="mb-2 text-lg font-bold text-foreground">
                      {t.projectDetails.title}
                    </h3>
                    <p className="mb-3 text-sm text-muted-foreground">
                      {t.projectDetails.description}
                    </p>
                  </div>

                  <div>
                    <h4 className="mb-2 text-sm font-semibold text-foreground">
                      Key Features:
                    </h4>
                    <ul className="space-y-1 text-xs text-muted-foreground">
                      {t.projectDetails.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="mt-1 text-primary">•</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="border-t border-border pt-2">
                    <h4 className="mb-1 text-sm font-semibold text-foreground">
                      Technologies Used:
                    </h4>
                    <p className="rounded bg-background/60 px-2 py-1 text-xs text-muted-foreground">
                      {t.projectDetails.technologies}
                    </p>
                  </div>

                  <div className="pt-2 text-center">
                    <span className="rounded-full bg-primary/10 px-3 py-1 text-xs text-primary">
                      Click to flip back
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translate3d(0, 40px, 0);
          }
          to {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .transform-style-preserve-3d {
          transform-style: preserve-3d;
        }

        .backface-hidden {
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }

        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </section>
  );
}