import { useEffect, useRef, useState } from "react";
import SkillBadge from "./SkillBadge";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const skills = [
  // Frontend
  "ReactJS",
  "NextJS",
  "React Native",
  "TypeScript",
  "JavaScript",
  "Tailwind CSS",

  // AI / Backend
  "Python",
  "FastAPI",
  "NodeJS",
  "ExpressJS",

  // Databases
  "MongoDB",
  "PostgreSQL",

  // Cloud / Infrastructure
  "AWS",
  "EC2",
  "Lambda",
  "Docker",

  // Tools / Automation
  "n8n",
  "Git/GitHub",
  "Postman",

  // AI Engineering
  "LLMs",
  "AI Agents",
  "RAG",
  "LLM Evals",
  "AI Guardrails",
  "Observability",
  "AI Integration",
  "Embeddings",
  "Vector DB",
];

// Tech stack shown on the rotating wheel (right side, replaces the old image)
const techStack = [
  { name: "React", logo: "./react.PNG" },
  { name: "Next.js", logo: "./nxt.png" },
  { name: "Node.js", logo: "./nodejs.PNG" },
  { name: "Express", logo: "./wxprs.PNG" },
  { name: "MongoDB", logo: "./mdb.PNG" },
  { name: "SQL", logo: "./sql.png" },
  { name: "n8n", logo: "🔗" },
  { name: "Roboflow", logo: "🤖" },
  { name: "GSAP", logo: "./gsap.png" },
  { name: "AWS", logo: "☁️" },
  { name: "Docker", logo: "🐳" },
  { name: "Flutter", logo: "./flutter.jpeg" },
  { name: "HTML5", logo: "./html.png" },
  { name: "CSS3", logo: "./css.png" },
  { name: "JavaScript", logo: "./js.PNG" },
  { name: "Python", logo: "./python.png" },
  { name: "WordPress", logo: "./wp.png" },
  { name: "Supabase", logo: "./supabase.jpeg" },
];

const isImageLogo = (logo: string) => /\.(png|jpe?g)$/i.test(logo);

// One full lap per slot, in ms — how long a card takes to go all the way around
const LAP_DURATION = 8000;

// Breakpoint matching the isMobile check used elsewhere in this file
const MOBILE_BREAKPOINT = 768;

// Wheel config differs by screen size — fewer, tighter slots on mobile
// so cards don't overlap or spill outside the smaller viewport.
type WheelConfig = { slotCount: number; radius: number };

const getWheelConfig = (): WheelConfig => {
  if (typeof window === "undefined") {
    return { slotCount: 8, radius: 150 }; // sensible default for SSR
  }
  return window.innerWidth < MOBILE_BREAKPOINT
    ? { slotCount: 6, radius: 110 }
    : { slotCount: 8, radius: 150 };
};

// ---- Image preload cache ----
// Module-level (not component state) so it persists across remounts —
// e.g. when wheelConfig changes and the wheel div remounts via
// `key={wheelConfig.slotCount}`, or if Skill itself unmounts/remounts
// during route changes. Once a logo is loaded, it's loaded for the
// lifetime of the page — img.src assignments after that resolve
// instantly from the browser's decoded image cache instead of firing
// a new network request.
const imageCache = new Map<string, HTMLImageElement>();

const preloadImage = (src: string): Promise<void> => {
  if (imageCache.has(src)) return Promise.resolve(); // already loaded, skip
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      imageCache.set(src, img);
      resolve();
    };
    img.onerror = () => resolve(); // don't let one bad path block the rest
    img.src = src;
  });
};

export default function Skill() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  // Wheel refs
  const wheelWrapRef = useRef<HTMLDivElement>(null);
  const slotRefs = useRef<(HTMLDivElement | null)[]>([]);
  const imgRefs = useRef<(HTMLImageElement | null)[]>([]);
  const emojiRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const nameRefs = useRef<(HTMLSpanElement | null)[]>([]);

  // Responsive wheel config (slot count + radius) — recalculated on resize
  const [wheelConfig, setWheelConfig] = useState<WheelConfig>(getWheelConfig);

  // True once every logo image in techStack has been preloaded into
  // imageCache. The wheel animation waits for this before it starts
  // painting slots, so the very first lap doesn't trigger live fetches.
  const [imagesReady, setImagesReady] = useState(false);

  useEffect(() => {
    const uniqueLogos = Array.from(
      new Set(techStack.filter((t) => isImageLogo(t.logo)).map((t) => t.logo))
    );
    Promise.all(uniqueLogos.map(preloadImage)).then(() => setImagesReady(true));
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setWheelConfig((prev) => {
        const next = getWheelConfig();
        // Avoid pointless re-renders/remounts if nothing actually changed
        if (prev.slotCount === next.slotCount && prev.radius === next.radius) {
          return prev;
        }
        return next;
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ---- Badge / title / wheel-wrap entrance animation ----
  // On mobile: everything is set straight to its final, visible state —
  // no GSAP tween runs at all. This is a deliberate performance choice
  // (mobile devices/browsers are noticeably heavier when running
  // ScrollTrigger + multiple simultaneous tweens), and it also fixes a
  // real bug: the wheel-wrap used to get `x: 120` applied unconditionally
  // (not gated by isMobile), which shifted it 120px past the viewport
  // edge on load and made the page wider than the screen — that stray
  // horizontal overflow was what caused the fixed navbar's mobile
  // clipping glitch until the first scroll event. Setting x straight to
  // 0 on mobile removes that overflow at the source.
  //
  // Desktop keeps the full entrance animation (wheel slide-in, title
  // spin, badge bounce-stagger) exactly as before.
  //
  // The continuous rotating wheel (separate effect below) is untouched
  // on every screen size — it's a functional loop, not a decorative
  // entrance animation.
  useEffect(() => {
    if (leftRef.current && titleRef.current) {
      const badges = leftRef.current.querySelectorAll(".skill-badge");
      const isMobile = window.innerWidth < MOBILE_BREAKPOINT;

      if (isMobile) {
        // No entrance animation on mobile — everything visible immediately,
        // in its natural resting position. No ScrollTrigger tween needed.
        gsap.set(badges, { opacity: 1, y: 0 });
        gsap.set(titleRef.current, { opacity: 1, y: 0, rotation: 0 });
        if (wheelWrapRef.current) {
          gsap.set(wheelWrapRef.current, { opacity: 1, x: 0 });
        }
        return;
      }

      // Desktop: original animated entrance
      gsap.set(titleRef.current, { opacity: 0, y: 60 });
      if (wheelWrapRef.current) {
        gsap.set(wheelWrapRef.current, { opacity: 0, x: 120 });
      }
      gsap.set(badges, { opacity: 0, y: 40 });

      const tl = gsap.timeline({
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
      });

      if (wheelWrapRef.current) {
        tl.to(wheelWrapRef.current, {
          x: 0,
          opacity: 1,
          ease: "power3.out",
          duration: 2,
        });
      }

      tl.to(
        titleRef.current,
        {
          y: 0,
          opacity: 1,
          rotation: 360,
          transformOrigin: "center center",
          ease: "power2.out",
          duration: 1.8,
        },
        "-=0.4"
      );

      tl.to(
        badges,
        { opacity: 1, y: 0, ease: "bounce.out", duration: 1.2, stagger: 0.08 },
        "-=0.3"
      );
    }
  }, []);

  // ---- Front-facing wheel: fixed spokes rotating together, content
  // swapped one at a time whenever a spoke passes the bottom (6 o'clock).
  // Re-runs whenever wheelConfig changes (mobile <-> desktop), since the
  // slot count and radius both feed directly into the position math.
  // Also waits on imagesReady so no slot paints a logo before it's
  // actually preloaded.
  //
  // Runs on every screen size, including mobile — this is the one
  // animation intentionally kept everywhere. ----
  useEffect(() => {
    if (!imagesReady) return; // wait until every logo is in imageCache

    const { slotCount, radius } = wheelConfig;
    const N = techStack.length;
    const speed = 1 / LAP_DURATION; // laps-per-ms

    // progress: 0 -> 1 represents one full lap, with 0 defined as "at the bottom"
    // (so the swap-on-wrap always lands exactly at the 6 o'clock position).
    // Slots are spaced evenly around the circle from the start.
    const progress = Array.from({ length: slotCount }, (_, k) => k / slotCount);
    const currentTechIndex = Array.from({ length: slotCount }, (_, k) => k % N);
    let nextTechIndex = slotCount % N;

    const paintSlot = (k: number) => {
      const tech = techStack[currentTechIndex[k]];
      const img = imgRefs.current[k];
      const emoji = emojiRefs.current[k];
      const name = nameRefs.current[k];
      if (!img || !emoji || !name) return;

      if (isImageLogo(tech.logo)) {
        // Backed by imageCache at this point — this is a cache read,
        // not a network request.
        img.src = tech.logo;
        img.alt = tech.name;
        img.style.display = "block";
        emoji.style.display = "none";
      } else {
        emoji.textContent = tech.logo;
        emoji.style.display = "block";
        img.style.display = "none";
      }
      name.textContent = tech.name;
    };

    for (let k = 0; k < slotCount; k++) paintSlot(k);

    let lastTime = performance.now();
    let frameId: number;

    const animate = (time: number) => {
      const delta = time - lastTime;
      lastTime = time;

      for (let k = 0; k < slotCount; k++) {
        progress[k] += speed * delta;

        if (progress[k] >= 1) {
          // Completed a full lap right as it passes the bottom -> swap content
          progress[k] -= 1;
          currentTechIndex[k] = nextTechIndex;
          nextTechIndex = (nextTechIndex + 1) % N;
          paintSlot(k);
        }

        const el = slotRefs.current[k];
        if (!el) continue;

        // theta = 0 at bottom (6 o'clock), increases clockwise: bottom -> left -> top -> right -> bottom
        const theta = Math.PI + progress[k] * Math.PI * 2;
        const x = radius * Math.sin(theta);
        const y = -radius * Math.cos(theta);

        el.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px)`;
      }

      frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [wheelConfig, imagesReady]);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 overflow-x-hidden"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8">
        {/* Left: Title + badges */}
        <div ref={leftRef} className="text-center md:text-left overflow-hidden">
          <h3
            ref={titleRef}
            className="text-2xl font-bold mb-4 relative inline-block text-primary"
          >
            Skills & Expertise
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mt-4">
            {skills.map((skill, i) => (
              <SkillBadge key={skill} name={skill} index={i} className="skill-badge" />
            ))}
          </div>
        </div>

        {/* Right: Front-facing rotating wheel — spokes around a circle,
            count/radius adapt to screen size via wheelConfig */}
        <div className="md:ml-16 flex justify-center md:justify-start pt-4 md:pt-8 w-full">
          <div
            ref={wheelWrapRef}
            className="relative w-full max-w-sm aspect-square"
          >
            {/* key forces a clean remount (fresh ref arrays) when slot count changes */}
            <div key={wheelConfig.slotCount} className="absolute inset-0">
              {Array.from({ length: wheelConfig.slotCount }).map((_, k) => (
                <div
                  key={k}
                  ref={(el) => (slotRefs.current[k] = el)}
                  className="absolute top-1/2 left-1/2 w-20 h-16 flex flex-col items-center justify-center gap-1 bg-gradient-to-br from-white via-purple-50/30 to-white rounded-2xl shadow-lg border border-purple-200/30"
                  style={{ willChange: "transform" }}
                >
                  <img
                    ref={(el) => (imgRefs.current[k] = el)}
                    className="w-10 h-10 object-contain"
                    style={{ display: "none" }}
                  />
                  <span
                    ref={(el) => (emojiRefs.current[k] = el)}
                    className="text-lg"
                    style={{ display: "none" }}
                  />
                  <span
                    ref={(el) => (nameRefs.current[k] = el)}
                    className="text-[10px] font-semibold text-gray-700 text-center px-1 leading-tight"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}