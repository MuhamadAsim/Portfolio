import { useLayoutEffect, useRef, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { gsap } from "gsap";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeHash, setActiveHash] = useState(window.location.hash || "");
  const location = useLocation();

  // Animation refs
  const headerScope = useRef<HTMLDivElement>(null);
  const brandRef = useRef<HTMLSpanElement>(null);
  const linkRefs = useRef<HTMLLIElement[]>([]);
  linkRefs.current = []; // reset on render

  const links = [
    { href: "/#projects", label: "Projects", sectionId: "projects" },
    { href: "/#about", label: "About", sectionId: "about" },
    { href: "/#skills", label: "Skills", sectionId: "skills" },
    { href: "/#services", label: "Services", sectionId: "services" }, // 👈 Add this
    { href: "/#testimonials", label: "Testimonials", sectionId: "testimonials" },
    { href: "/#contact", label: "Contact", sectionId: "contact" },
  ];

  // Scroll detection
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Listen for hash changes
  useEffect(() => {
    const onHashChange = () => setActiveHash(window.location.hash);
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setActiveHash(window.location.hash); // update active link when navigating
  }, [location]);

  // Animate brand and links
  useLayoutEffect(() => {
    if (!headerScope.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Brand animation
      if (brandRef.current) {
        tl.fromTo(
          brandRef.current,
          { y: 100, opacity: 0, rotation: 720, transformOrigin: "center center" },
          {
            y: 0,
            opacity: 1,
            rotation: 0,
            duration: 1.5,
            ease: "back.out(1.7)",
            clearProps: "all",
          }
        );
      }

      // Nav links animation
      if (linkRefs.current.length) {
        tl.fromTo(
          linkRefs.current,
          { y: -30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.35,
            clearProps: "all",
          },
          "+=1"
        );
      }
    }, headerScope);

    return () => ctx.revert();
  }, []);

  const isActive = (href: string) => {
    if (href.startsWith("/#")) {
      const section = href.replace("/#", "#");
      return activeHash === section;
    }
    return location.pathname === href;
  };

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    sectionId: string
  ) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);

    const el = document.getElementById(sectionId);
    if (el) el.scrollIntoView({ behavior: "smooth" });

    const newHash = `#${sectionId}`;
    window.history.pushState(null, "", `/${newHash}`);
    setActiveHash(newHash); // ✅ immediately update active state
  };

  return (
    <header
      ref={headerScope}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300 ease-out",
        isScrolled
          ? "bg-background/80 backdrop-blur-md shadow-sm py-3"
          : "bg-transparent py-6"
      )}
    >
      <div className="container mx-auto flex max-w-6xl items-center justify-between px-4">
        {/* Brand */}
        <Link to="/" className="focus:outline-none" aria-label="Home">
          <span
            ref={brandRef}
            style={{ opacity: 0 }}
            className="font-display text-xl font-bold tracking-tighter text-primary will-change-transform"
          >
            Muhammad Asim
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex items-center gap-8">
            {links.map((link, i) => (
              <li
                key={link.href}
                ref={(el) => el && (linkRefs.current[i] = el)}
                style={{ opacity: 0 }}
                className="will-change-transform"
              >
                <a
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.sectionId)}
                  className={cn(
                    "link-hover text-sm font-medium transition-colors duration-300",
                    isActive(link.href)
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="group md:hidden"
          onClick={() => setIsMobileMenuOpen(true)}
          aria-label="Open menu"
        >
          <Menu className="h-6 w-6 text-primary" />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transform transition-transform duration-500 ease-[cubic-bezier(0.68,-0.55,0.27,1.55)] md:hidden",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="w-full bg-white dark:bg-neutral-900/95 shadow-lg relative rounded-b-2xl py-3">
          {/* Close button */}
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-neutral-700 transition"
            aria-label="Close menu"
          >
            <X className="h-6 w-6 text-black dark:text-white" />
          </button>

          {/* Menu Links */}
          <nav className="h-full flex flex-col items-center justify-center">
            <ul className="flex flex-col gap-4 text-center">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.sectionId)}
                    className={cn(
                      "text-lg font-semibold text-black dark:text-white transition-colors duration-300 hover:text-primary",
                      isActive(link.href) && "text-primary"
                    )}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
