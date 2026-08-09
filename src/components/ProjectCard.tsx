import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ProjectCardProps {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  index?: number;
  className?: string;
}

// Module-level image cache — persists across re-renders
const imageCache = new Set<string>();

// ── Animation tuning ──────────────────────────────────────────────────────
const TRANSITION_DURATION_MS = 400;
const STAGGER_STEP_MS = 60;
const MAX_STAGGER_STEPS = 6;

export default function ProjectCard({
  id,
  title,
  description,
  image,
  tags,
  index = 0,
  className,
}: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [imageLoaded, setImageLoaded] = useState(imageCache.has(image));
  const [imageError, setImageError] = useState(false);
  const [cardVisible, setCardVisible] = useState(false);

  const staggerDelayMs = Math.min(index, MAX_STAGGER_STEPS) * STAGGER_STEP_MS;

  useEffect(() => {
    const node = cardRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setCardVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -60px 0px",
      }
    );

    observer.observe(node);
    return () => observer.unobserve(node);
  }, []);

  const handleImageLoad = () => {
    setImageLoaded(true);
    imageCache.add(image);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(true);
  };

  return (
    <div
      ref={cardRef}
      style={{
        transitionDelay: cardVisible ? `${staggerDelayMs}ms` : "0ms",
        transitionDuration: `${TRANSITION_DURATION_MS}ms`,
        willChange: "opacity, transform",
      }}
      className={cn(
        "glass-card group overflow-hidden rounded-2xl flex flex-col transition-all ease-out",
        cardVisible ? "opacity-100 translate-y-0" : "opacity-60 translate-y-8",
        className
      )}
    >
      {/* ── Image container ────────────────────────────────────────────── */}
      <div className="relative h-48 w-full overflow-hidden bg-muted flex-shrink-0">
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-muted to-muted/80">
            <div className="text-center">
              <div className="animate-pulse mb-2">
                <div className="h-8 w-8 mx-auto rounded-full bg-muted-foreground/20" />
              </div>
              <span className="text-xs text-muted-foreground">Loading…</span>
            </div>
          </div>
        )}

        {imageError ? (
          <div className="absolute inset-0 flex items-center justify-center bg-muted/60">
            <span className="text-xs text-muted-foreground px-4 text-center">
              Image unavailable
            </span>
          </div>
        ) : (
          <img
            src={image}
            alt={title}
            className={cn(
              "h-full w-full object-cover object-top transition-all duration-300 ease-out group-hover:scale-105",
              imageLoaded ? "opacity-100" : "opacity-0"
            )}
            onLoad={handleImageLoad}
            onError={handleImageError}
            loading="lazy"
          />
        )}

        {/*
          Hover overlay tinted toward primary instead of a flat black gradient —
          ties the interaction back to your theme color instead of a generic
          "any dark site" effect.
        */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </div>

      {/* ── Card body ───────────────────────────────────────────────────── */}
      <div className="flex flex-1 flex-col p-6">
        {/* Tags — show first 4, rest hidden (still filterable) */}
        <div className="mb-3 flex flex-wrap gap-2">
          {tags.slice(0, 4).map((tag, i) => (
            <span
              key={i}
              className="rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground"
            >
              {tag}
            </span>
          ))}
          {tags.length > 4 && (
            <span className="rounded-full bg-secondary/60 px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
              +{tags.length - 4}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="mb-2 font-display text-xl font-semibold tracking-tight">
          {title}
        </h3>

        {/* Description with tooltip for full text */}
        <TooltipProvider delayDuration={75}>
          <Tooltip>
            <TooltipTrigger asChild>
              <p className="mb-6 flex-1 text-sm text-muted-foreground line-clamp-2 cursor-help">
                {description}
              </p>
            </TooltipTrigger>
            <TooltipContent side="top" className="max-w-xs">
              <p className="text-sm">{description}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {/*
          CTA — was a random purple/pink/indigo gradient with no relation to
          the actual theme. Now solid bg-primary, same token used everywhere
          else on the site (Navbar, Hero curve, About section).
        */}
        <Link
          to={`/project/${id}`}
          className="relative overflow-hidden inline-flex items-center justify-center gap-1 text-sm font-medium text-primary-foreground transition-all duration-300 hover:gap-2 hover:bg-primary/90 px-4 py-2 rounded-lg bg-primary"
        >
          <span className="relative z-10 flex items-center gap-1">
            View Project <ArrowUpRight className="h-3.5 w-3.5" />
          </span>
          <span className="absolute inset-0 -translate-x-full bg-white/30 blur-lg animate-flowLight pointer-events-none" />
        </Link>
      </div>
    </div>
  );
}