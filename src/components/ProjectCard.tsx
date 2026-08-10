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

const imageCache = new Set<string>();

// ── Animation tuning ──────────────────────────────────────────────────────
// Shared by both the scroll-reveal entrance AND the hover tilt-reset, since
// only one inline `transitionDuration` can apply to the element's `transform`
// property at a time. 300ms is a good middle ground — snappy enough for the
// tilt to feel responsive, slow enough that the entrance doesn't feel rushed.
const TRANSITION_DURATION_MS = 300;
const STAGGER_STEP_MS = 60;
const MAX_STAGGER_STEPS = 6;

// Max tilt rotation in degrees, and max "float toward cursor" translation
// in pixels. Bumped up significantly from the first pass — 6px was barely
// perceptible; this is a real, felt displacement now.
const MAX_TILT_DEG = 8;
const MAX_FLOAT_PX = 18;
const LIFT_PX = 10; // additional constant upward lift while hovering at all

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
  const [tagsPaused, setTagsPaused] = useState(false);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0, x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  // Whether the card is currently on screen at all. Unlike `cardVisible`
  // below (a one-shot "has it ever been revealed" flag used only for the
  // entrance animation), this tracks live in/out-of-view state for as long
  // as the card exists, so the infinite tag marquee can be paused the
  // moment the card scrolls off screen and resumed when it scrolls back —
  // instead of running its CSS animation indefinitely in the background
  // regardless of whether anyone can actually see it.
  const [isInViewport, setIsInViewport] = useState(false);

  const staggerDelayMs = Math.min(index, MAX_STAGGER_STEPS) * STAGGER_STEP_MS;

  // One-shot entrance reveal: fires once, then stops observing.
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

  // Continuous viewport tracking, kept alive for the card's whole
  // lifetime, purely to drive the marquee pause/resume below.
  useEffect(() => {
    const node = cardRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsInViewport(entry.isIntersecting),
      { threshold: 0 }
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

  // ── Magnetic tilt ──
  // Tracks cursor position relative to the card's center (-1 to 1 on each
  // axis) and converts that into a slight 3D rotation + a small translate
  // toward the cursor — the card visually "leans"/"floats" toward wherever
  // you're pointing, rather than just sitting flat.
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    if (!isHovering) setIsHovering(true);

    const rect = card.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width; // 0 -> 1 across the card
    const py = (e.clientY - rect.top) / rect.height;
    const offsetX = px - 0.5; // -0.5 -> 0.5
    const offsetY = py - 0.5;

    setTilt({
      rotateX: -offsetY * MAX_TILT_DEG * 2,
      rotateY: offsetX * MAX_TILT_DEG * 2,
      // LIFT_PX is a constant upward offset (-Y) applied on top of the
      // cursor-following displacement — this is what makes the card
      // actually leave its resting position rather than just pivot in
      // place, similar to how the whole card physically rises off the
      // page toward you before also leaning toward the cursor.
      x: offsetX * MAX_FLOAT_PX * 2,
      y: offsetY * MAX_FLOAT_PX * 2 - LIFT_PX,
    });
  };

  const handleMouseLeave = () => {
    setTagsPaused(false);
    setIsHovering(false);
    setTilt({ rotateX: 0, rotateY: 0, x: 0, y: 0 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transitionDelay: cardVisible ? `${staggerDelayMs}ms` : "0ms",
        transitionDuration: `${TRANSITION_DURATION_MS}ms`,
        willChange: "opacity, transform",
        // Once the card has finished its entrance, hand transform control
        // over to the tilt state. Before that, leave transform alone so the
        // Tailwind translate-y-8 -> translate-y-0 entrance classes below
        // still drive the reveal animation untouched.
        transform: cardVisible
          ? `perspective(900px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) translate3d(${tilt.x}px, ${tilt.y}px, 0) scale(${
              isHovering ? 1.03 : 1
            })`
          : undefined,
      }}
      className={cn(
        "glass-card group overflow-hidden rounded-2xl flex flex-col transition-all ease-out",
        cardVisible ? "opacity-100" : "opacity-60 translate-y-8",
        isHovering && "shadow-2xl shadow-primary/20",
        className
      )}
    >
      <style>{`
        @keyframes tagMarquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .tag-marquee-track {
          animation: tagMarquee 14s linear infinite;
        }
      `}</style>

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

        <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </div>

      {/* ── Card body ───────────────────────────────────────────────────── */}
      <div className="flex flex-1 flex-col p-6">
        <div
          className="mb-3 overflow-hidden"
          onMouseEnter={() => setTagsPaused(true)}
          onMouseLeave={() => setTagsPaused(false)}
        >
          <div
            className="tag-marquee-track flex w-max gap-2"
            style={{
              // Paused whenever hovered OR the card isn't currently on
              // screen — so the infinite marquee never keeps animating
              // (and consuming compositor time) off screen.
              animationPlayState:
                tagsPaused || !isInViewport ? "paused" : "running",
            }}
          >
            {[...tags, ...tags].map((tag, i) => (
              <span
                key={i}
                className="shrink-0 rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <h3 className="mb-2 font-display text-xl font-semibold tracking-tight">
          {title}
        </h3>

        <TooltipProvider delayDuration={10}>
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