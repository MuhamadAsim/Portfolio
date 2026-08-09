import { useRef, useEffect, useState, useMemo } from "react";
import ProjectCard from "./ProjectCard";

const projects = [
  {
    id: "1",
    title: "BidaWrap",
    description:
      "A MERN stack bidding platform where customers can post jobs and nearby shop owners can place bids on them. Customers select their location using maps, and shops receive job notifications based on distance filtering through SMS and email integrations.",
    image: "/bidawrap-front.png",
    tags: ["MongoDB", "Express", "React", "Node.js", "Stripe", "Twilio", "SendGrid", "WebSockets", "Maps", "MERN"],
  },
  {
    id: "2",
    title: "Unison",
    description:
      "A web and mobile platform built using Next.js, React Native, and the MERN stack with a graph database. The platform connects alumni and students where alumni can share opportunities, events, and updates while students can explore, interact, and build professional connections.",
    image: "/unison-login.png",
    tags: ["Next.js", "React Native", "Graph Database"],
  },
  {
    id: "3",
    title: "SpeakFlow",
    description:
      "An AI-powered voice assistant for companies and businesses to act as a virtual assistant. Built using the MERN stack, DeepSeek Qwen3 API, Piper TTS, and Whisper for speech recognition and synthesis.",
    image: "/voice-assistant.PNG",
    tags: ["MongoDB", "Express", "React", "Node.js", "DeepSeekQwen3API", "Piper", "Whisper", "AI"],
  },
  {
    id: "4",
    title: "Social Media App",
    description:
      "A full-stack responsive social media platform built using the MERN stack. Includes posts, reels, likes, comments, friend system, messaging, personalized feed, and upcoming AI-based recommendations.",
    image: "social_app.PNG",
    tags: ["MongoDB", "Express", "React", "Node.js", "AI", "Fullstack", "Responsive"],
  },
  {
    id: "5",
    title: "Ecommerce-App",
    description:
      "A mobile ecommerce application built with Flutter, featuring product browsing, cart, and secure checkout.",
    image: "/ecommerse.jpg",
    tags: ["Flutter", "Dart", "Supabase"],
  },
  {
    id: "6",
    title: "Image Manager",
    description:
      "A MERN-based image upload and management system with frontend deployed on EC2 and backend powered by AWS Lambda. User authentication, image uploads, and metadata storage are handled via serverless architecture and MongoDB.",
    image: "/image_manager.PNG",
    tags: ["MERN", "AWS Lambda", "EC2", "Serverless"],
  },
  {
    id: "7",
    title: "AutoChain",
    description:
      "An automation workflow built with n8n where a Webhook captures incoming requests, OpenAI processes and extracts key details, a Function structures the response, and SendGrid + Twilio send parallel email and SMS notifications.",
    image: "/n8n.PNG",
    tags: ["n8n", "Postman", "Twilio", "Sendgrid"],
  },
  {
    id: "8",
    title: "University Management System",
    description:
      "A comprehensive MERN stack application for managing university resources, students, faculty, and courses.",
    image: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?auto=format&fit=crop&w=800&h=450",
    tags: ["MongoDB", "Express", "React", "Node.js", "MERN"],
  },
  {
    id: "9",
    title: "Library Management System",
    description:
      "A MERN stack application to manage books, members, and lending operations in a library setting.",
    image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=800&h=450",
    tags: ["MongoDB", "Express", "React", "Node.js", "MERN"],
  },
  {
    id: "10",
    title: "Realtime Chat App",
    description:
      "A cross-platform realtime chat application built with Flutter and Supabase, supporting instant messaging and group chats.",
    image: "/chatapp.png",
    tags: ["Flutter", "Dart", "Supabase", "Realtime", "Authentication"],
  },
  {
    id: "11",
    title: "Cosmetics Landing Page",
    description:
      "A responsive and visually appealing landing page for a cosmetics store, built using React and styled with Tailwind CSS.",
    image: "/21.PNG",
    tags: ["React", "Tailwind CSS", "Frontend"],
  },
  {
    id: "12",
    title: "Food App",
    description:
      "A food delivery app landing page built using ReactJS, LeafletJS for maps, and React-Leaflet for geolocation and mapping features.",
    image: "/food-app.PNG",
    tags: ["React", "Leaflet", "React-Leaflet", "Tailwind CSS"],
  },
  {
    id: "13",
    title: "MedMap",
    description:
      "A MERN stack application that helps users find nearby medical stores, hospitals, and pharmacies.",
    image: "/medmap.PNG",
    tags: ["Next.js", "Express", "MongoDB", "Node.js"],
  },
];

const FILTER_TAGS = [
  "All",
  "MERN",
  "React",
  "React Native & Flutter",
  "AI",
  "Next.js",
  "n8n",
  "Frontend",
];

const MOBILE_TAGS = new Set(["flutter", "react native", "dart"]);

function matchesFilter(project, filter) {
  if (filter === "All") return true;
  if (filter === "React Native & Flutter") {
    return project.tags.some((tag) => MOBILE_TAGS.has(tag.toLowerCase()));
  }
  return project.tags.some(
    (tag) => tag.toLowerCase() === filter.toLowerCase()
  );
}

const preloadImage = (src) =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(src);
    img.onerror = reject;
    img.src = src;
  });

export default function Projects() {
  const sectionRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const dropdownRef = useRef(null);

  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [visibleImages, setVisibleImages] = useState(new Set());
  const [activeFilter, setActiveFilter] = useState("All");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  const handleFilterSelect = (tag) => {
    setActiveFilter(tag);
    setDropdownOpen(false);
  };

  const filteredProjects = useMemo(
    () => projects.filter((p) => matchesFilter(p, activeFilter)),
    [activeFilter]
  );

  const useInfiniteScroll = filteredProjects.length > 3;
  const infiniteProjects = useInfiniteScroll
    ? [...filteredProjects, ...filteredProjects, ...filteredProjects]
    : filteredProjects;

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;
    requestAnimationFrame(() => {
      container.scrollLeft = useInfiniteScroll
        ? container.scrollWidth / 3
        : 0;
    });
  }, [activeFilter, useInfiniteScroll]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target.querySelector("img");
            if (img && !visibleImages.has(img.src)) {
              preloadImage(img.src)
                .then((src) => setVisibleImages((prev) => new Set([...prev, src])))
                .catch((err) => console.warn("Image preload failed:", err));
            }
          }
        });
      },
      { rootMargin: "100px", threshold: 0.1 }
    );
    document.querySelectorAll(".project-card").forEach((c) => observer.observe(c));
    return () => observer.disconnect();
  }, [visibleImages]);

  const scrollTo = (direction) => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const cardWidth = container.querySelector(".project-card")?.offsetWidth || 0;
    const gap = 32;
    container.scrollTo({
      left: container.scrollLeft + (direction === "left" ? -(cardWidth + gap) : cardWidth + gap),
      behavior: "smooth",
    });
  };

  const handleMouseDown = (e) => {
    if (!scrollContainerRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
    scrollContainerRef.current.style.cursor = "grabbing";
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    scrollContainerRef.current.scrollLeft = scrollLeft - (x - startX) * 2;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    if (scrollContainerRef.current)
      scrollContainerRef.current.style.cursor = "grab";
  };

  const handleTouchStart = (e) => {
    if (!scrollContainerRef.current) return;
    setIsDragging(true);
    setStartX(e.touches[0].pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  };

  const handleTouchMove = (e) => {
    if (!isDragging || !scrollContainerRef.current) return;
    const x = e.touches[0].pageX - scrollContainerRef.current.offsetLeft;
    scrollContainerRef.current.scrollLeft = scrollLeft - (x - startX) * 2;
  };

  const handleTouchEnd = () => setIsDragging(false);

  const handleScroll = () => {
    if (!useInfiniteScroll) return;
    const container = scrollContainerRef.current;
    if (!container) return;
    const oneSet = container.scrollWidth / 3;
    if (container.scrollLeft <= oneSet * 0.5) {
      container.scrollLeft += oneSet;
    } else if (container.scrollLeft >= oneSet * 2.5) {
      container.scrollLeft -= oneSet;
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;
    if (useInfiniteScroll) container.scrollLeft = container.scrollWidth / 3;

    container.addEventListener("scroll", handleScroll);
    container.addEventListener("mousedown", handleMouseDown);
    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseup", handleMouseUp);
    container.addEventListener("mouseleave", handleMouseUp);
    container.addEventListener("touchstart", handleTouchStart);
    container.addEventListener("touchmove", handleTouchMove);
    container.addEventListener("touchend", handleTouchEnd);

    return () => {
      container.removeEventListener("scroll", handleScroll);
      container.removeEventListener("mousedown", handleMouseDown);
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseup", handleMouseUp);
      container.removeEventListener("mouseleave", handleMouseUp);
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchmove", handleTouchMove);
      container.removeEventListener("touchend", handleTouchEnd);
    };
  }, [useInfiniteScroll]);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="section-container relative overflow-hidden"
    >
      {/*
        Background blobs — both now use the primary token at low opacity
        instead of one being primary and the other an unrelated blue-500.
        Kept two different opacities so they still read as distinct layers.
      */}
      <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-primary/5 blur-[100px]" />

      {/* Header */}
      <div className="relative mb-10 text-center">
        <span className="subheading inline-block mb-3 px-3 py-1 rounded-full bg-secondary text-primary text-xs font-medium uppercase tracking-wider">
          My Work
        </span>
        <h2 className="heading-lg mb-5 font-display tracking-tight text-primary">Recent Projects</h2>
       
      </div>

      {/* ── Filter Controls ─────────────────────────────────────────────── */}
      <div className="relative mb-8 flex justify-center">
        {/* ── Desktop: pill row ──
            Active state was hardcoded gray-900/white (a literal black-and-
            white toggle with no relation to your theme). Now uses
            bg-primary/text-primary-foreground, same tokens as everywhere
            else. Inactive state uses border-border/text-muted-foreground
            (theme-aware) instead of hardcoded gray-200/gray-500, and hovers
            toward primary instead of a generic darker gray.
        */}
        <div className="hidden sm:flex flex-wrap justify-center gap-2">
          {FILTER_TAGS.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveFilter(tag)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-200
                ${
                  activeFilter === tag
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-background text-muted-foreground border-border hover:border-primary hover:text-primary"
                }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* ── Mobile: custom dropdown ── */}
        <div ref={dropdownRef} className="relative sm:hidden w-56">
          <button
            onClick={() => setDropdownOpen((prev) => !prev)}
            className="w-full flex items-center justify-between gap-2 px-4 py-2.5 rounded-xl text-sm font-medium border border-border bg-background text-foreground shadow-sm transition-all duration-200"
          >
            <span className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-primary" />
              {activeFilter}
            </span>
            <svg
              className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${
                dropdownOpen ? "rotate-180" : ""
              }`}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {dropdownOpen && (
            <div className="absolute top-full left-0 mt-2 w-full z-20 rounded-xl border border-border bg-background shadow-xl overflow-hidden">
              {FILTER_TAGS.map((tag) => (
                <button
                  key={tag}
                  onClick={() => handleFilterSelect(tag)}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm text-left transition-colors duration-150
                    ${
                      activeFilter === tag
                        ? "bg-primary text-primary-foreground font-medium"
                        : "text-foreground hover:bg-secondary"
                    }`}
                >
                  <span className="h-4 w-4 flex-shrink-0">
                    {activeFilter === tag && (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-4 w-4">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </span>
                  {tag}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Empty state */}
      {filteredProjects.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center text-muted-foreground">
          <svg className="mb-4 h-12 w-12 opacity-30" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
              d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-sm">No projects found for "{activeFilter}".</p>
        </div>
      )}

      {/* Scroll area */}
      {filteredProjects.length > 0 && (
        <div className="relative">
          {/*
            Arrow buttons — border-gray-200/text-gray-700 -> border-border/
            text-foreground so they respect light/dark theme instead of
            being hardcoded to light-mode-only gray values.
          */}
          <button
            onClick={() => scrollTo("left")}
            className="absolute left-0 top-1/2 z-10 -translate-y-1/2 -translate-x-4 h-12 w-12 rounded-full bg-background/90 backdrop-blur-sm shadow-lg border border-border flex items-center justify-center hover:shadow-xl hover:border-primary"
          >
            <svg className="h-5 w-5 text-foreground" viewBox="0 0 24 24" stroke="currentColor" fill="none">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={() => scrollTo("right")}
            className="absolute right-0 top-1/2 z-10 -translate-y-1/2 translate-x-4 h-12 w-12 rounded-full bg-background/90 backdrop-blur-sm shadow-lg border border-border flex items-center justify-center hover:shadow-xl hover:border-primary"
          >
            <svg className="h-5 w-5 text-foreground" viewBox="0 0 24 24" stroke="currentColor" fill="none">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <div
            ref={scrollContainerRef}
            className="flex gap-8 overflow-x-auto overflow-y-hidden scrollbar-hide cursor-grab select-none"
          >
            {infiniteProjects.map((project, index) => (
              <div
                key={`${project.id}-${index}`}
                className="project-card flex-shrink-0 w-80 sm:w-96"
              >
                <ProjectCard {...project} index={index} />
              </div>
            ))}
          </div>
        </div>
      )}

      <style jsx>{`
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
      `}</style>
    </section>
  );
}