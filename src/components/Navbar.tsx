import { useLayoutEffect, useRef, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { gsap } from "gsap";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeHash, setActiveHash] = useState(window.location.hash || "");

  const location = useLocation();

  // Animation refs
  const headerScope = useRef<HTMLElement | null>(null);
  const brandRef = useRef<HTMLSpanElement | null>(null);
  const linkRefs = useRef<HTMLLIElement[]>([]);

  linkRefs.current = [];

  const links = [
    { href: "/#about", label: "About", sectionId: "about" },
    { href: "/#projects", label: "Projects", sectionId: "projects" },
    { href: "/#skills", label: "Skills", sectionId: "skills" },
    { href: "/#testimonials", label: "Testimonials", sectionId: "testimonials" },
    { href: "/#contact", label: "Contact", sectionId: "contact" },
  ];

  // Scroll detection
  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Listen for hash changes
  useEffect(() => {
    const onHashChange = () => {
      setActiveHash(window.location.hash);
    };

    window.addEventListener("hashchange", onHashChange);

    return () => {
      window.removeEventListener("hashchange", onHashChange);
    };
  }, []);

  // Sync active hash on route change
  useEffect(() => {
    setActiveHash(window.location.hash);
  }, [location]);

  // GSAP navbar animation
  useLayoutEffect(() => {
    if (!headerScope.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
      });

      // Brand animation — kept subtle (no full rotation) on purpose:
      // a large rotation on a wide, full-viewport `position: fixed`
      // header can blow the element's bounding box past the visible
      // width mid-animation, and on mobile WebKit, `overflow-x-hidden`
      // on a `fixed` ancestor does NOT reliably clip a transformed
      // descendant. The nav appears to overflow the screen until a
      // scroll forces WebKit to repaint/re-layer and correct it.
      if (brandRef.current) {
        tl.fromTo(
          brandRef.current,
          {
            y: 20,
            opacity: 0,
            scale: 0.85,
            transformOrigin: "center center",
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.5,
            ease: "back.out(1.7)",
            clearProps: "all",
          }
        );
      }

      // Navigation links animation
      if (linkRefs.current.length) {
        tl.fromTo(
          linkRefs.current,
          {
            y: -30,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.4,
            stagger: 0.35,
            clearProps: "all",
          },
          "+=0.2"
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

    const el = document.getElementById(sectionId);

    if (el) {
      el.scrollIntoView({
        behavior: "smooth",
      });
    }

    const newHash = `#${sectionId}`;

    window.history.pushState(null, "", `/${newHash}`);

    setActiveHash(newHash);
  };

  return (
    <header
      ref={headerScope}
      className={cn(
        // overflow-x-hidden intentionally removed from this fixed
        // element — see note above. Clipping now happens on the
        // non-fixed wrapper div below instead, which WebKit handles
        // correctly even with transformed children.
        "fixed inset-x-0 top-0 z-50 w-full transition-all duration-300 ease-out",
        isScrolled
          ? "bg-background/80 backdrop-blur-md shadow-sm py-3"
          : "bg-transparent py-6"
      )}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 overflow-x-hidden px-4">
        {/* Left - Brand */}
        <div className="min-w-0 flex-1 shrink basis-0 md:flex-none">
          <span
            ref={brandRef}
            style={{ opacity: 0 }}
            className="block truncate font-display text-base font-bold tracking-tight text-primary will-change-transform md:text-xl md:tracking-tighter"
          >
            Muhammad Asim
          </span>
        </div>

        {/* Center - Desktop Navigation only */}
        <nav className="hidden shrink-0 md:block">
          <ul className="flex items-center gap-8">
            {links.map((link, i) => (
              <li
                key={link.href}
                ref={(el) => {
                  if (el) {
                    linkRefs.current[i] = el;
                  }
                }}
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
                      : "text-muted-foreground hover:text-primary"
                  )}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Right - Resume (visible on all screen sizes, no mobile dropdown) */}
        <div className="shrink-0">
          <a
            href="/Muhammad_Asim_CV.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex shrink-0 items-center gap-1.5 overflow-hidden whitespace-nowrap rounded-lg border border-primary/30 bg-primary px-3.5 py-2 text-xs font-semibold text-primary-foreground shadow-[0_0_15px_hsl(var(--primary)/0.15)] transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.03] hover:border-primary/60 hover:shadow-[0_0_25px_hsl(var(--primary)/0.35)] active:translate-y-0 active:scale-95 md:gap-2 md:rounded-xl md:px-5 md:py-2.5 md:text-sm"
          >
            {/* Moving shine */}
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

            {/* Glow */}
            <span className="absolute inset-0 rounded-lg bg-primary opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-40 md:rounded-xl" />

            <span className="relative z-10">Resume</span>

            <ArrowUpRight className="relative z-10 h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 md:h-4 md:w-4" />
          </a>
        </div>
      </div>
    </header>
  );
}