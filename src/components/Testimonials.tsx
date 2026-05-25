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
      text: "Professional, cooperative, and skilled. Asim brought our vision to life perfectly. I’ll definitely collaborate again!",
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
    setFlippedCards(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${index < rating
            ? "fill-yellow-400 text-yellow-400"
            : "text-gray-300"
          }`}
      />
    ));
  };

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="section-container relative overflow-hidden bg-gradient-to-b from-white via-purple-50/30 to-white py-20"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-10 left-20 w-72 h-72 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl animate-pulse delay-700"></div>
      </div>

      {/* Heading */}
      <div
        ref={headingRef}
        className="mb-16 text-center opacity-0 transform translate-y-8"
      >
        <span className="inline-block px-4 py-2 mb-4 text-sm font-semibold text-black bg-gradient-to-r from-purple-100 to-pink-100 rounded-full border border-purple-200/50 animate-bounce">
          What Clients Say
        </span>
        <h2 className="heading-lg mb-6 bg-gradient-to-r bg-clip-text bg-black text-4xl font-bold">
          Testimonials
        </h2>
        <p className="mx-auto max-w-2xl text-lg text-gray-600 leading-relaxed">
          Don't just take my word for it — here's what my clients have to say
          about working with me. Click on any card to see the detailed work I did for them.
        </p>
      </div>

      {/* Testimonials Grid */}
      <div
        ref={cardsRef}
        className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
      >
        {testimonials.map((t, i) => (
          <div
            key={i}
            className="testimonial-card opacity-0 transform translate-y-8 h-80"
            style={{ perspective: "1000px" }}
          >
            <div
              className={`relative w-full h-full transition-transform duration-700 transform-style-preserve-3d cursor-pointer ${flippedCards[i] ? "rotate-y-180" : ""
                }`}
              onClick={() => handleCardFlip(i)}
            >
              {/* Front Side - Testimonial */}
              <div className="absolute inset-0 backface-hidden group bg-white/80 dark:bg-gray-900/80 border border-purple-200/40 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 backdrop-blur-sm p-8">
                {/* Client Image & Info */}
                <div className="flex items-center gap-4 mb-5">
                  <img
                    src={t.image}
                    alt={t.name}
                    className="w-14 h-14 rounded-full object-cover shadow-md group-hover:scale-110 transition-transform duration-300"
                    loading="lazy"
                    width={56}
                    height={56}
                  />
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {t.name}
                    </h4>
                    <span className="text-sm text-gray-500">{t.role}</span>
                  </div>
                </div>

                {/* Star Rating */}
                <div className="flex items-center gap-1 mb-4">
                  {renderStars(t.rating)}
                  <span className="ml-2 text-sm text-gray-600">({t.rating}/5)</span>
                </div>

                {/* Testimonial Text */}
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm mb-4 px-4 flex-1 text-justify">
                  "{t.text}"
                </p>

                {/* Flip Indicator */}
                <div className="text-center">
                  <span className="text-xs text-purple-600 bg-purple-100 px-3 py-1 rounded-full">
                    Click to see project details
                  </span>
                </div>
              </div>

              {/* Back Side - Project Details */}
              <div className="absolute inset-0 backface-hidden rotate-y-180 bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200/40 rounded-2xl shadow-lg p-6 overflow-y-auto">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      {t.projectDetails.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3">
                      {t.projectDetails.description}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-md font-semibold text-gray-800 mb-2">Key Features:</h4>
                    <ul className="text-xs text-gray-600 space-y-1">
                      {t.projectDetails.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-purple-500 mt-1">•</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-2 border-t border-purple-200">
                    <h4 className="text-sm font-semibold text-gray-800 mb-1">Technologies Used:</h4>
                    <p className="text-xs text-gray-600 bg-white/60 px-2 py-1 rounded">
                      {t.projectDetails.technologies}
                    </p>
                  </div>

                  <div className="text-center pt-2">
                    <span className="text-xs text-purple-600 bg-purple-100 px-3 py-1 rounded-full">
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