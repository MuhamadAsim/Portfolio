import { useState, useMemo } from "react";
import ProjectCard from "./ProjectCard";
import { projectbriefs } from "../data/projects";

const FILTER_TAGS = [
  "All",
  "MERN",
  "React",
  "Next.js",
  "AI",
  "React Native & Flutter",
  "n8n",
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

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const projects = useMemo(() => projectbriefs, []);

  const filteredProjects = useMemo(
    () => projects.filter((p) => matchesFilter(p, activeFilter)),
    [projects, activeFilter]
  );

  const handleFilterSelect = (tag) => {
    setActiveFilter(tag);
    setDropdownOpen(false);
  };

  return (
    <section id="projects" className="section-container relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-primary/5 blur-[100px]" />

      {/* Header */}
      <div className="relative mb-10 text-center">
        <span className="subheading inline-block mb-3 px-3 py-1 rounded-full bg-secondary text-primary text-xs font-medium uppercase tracking-wider">
          My Work
        </span>
        <h2 className="heading-lg mb-2 font-display tracking-tight text-primary">
          Recent Projects
        </h2>
        {/* Live count — small, useful context for what the filter is showing,
            costs nothing and makes the filtering feel more "alive." */}
        <p className="text-sm text-muted-foreground">
          Showing {filteredProjects.length} of {projects.length} projects
        </p>
      </div>

      {/* ── Filter Controls ─────────────────────────────────────────────── */}
      <div className="relative mb-12 flex justify-center">
        {/* ── Desktop: pill row ── */}
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

        {/* ── Mobile: dropdown ── */}
        <div className="relative sm:hidden w-56">
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
      {filteredProjects.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center text-muted-foreground">
          <svg className="mb-4 h-12 w-12 opacity-30" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
              d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="mb-3 text-sm">No projects found for "{activeFilter}".</p>
          <button
            onClick={() => setActiveFilter("All")}
            className="text-sm font-medium text-primary hover:underline"
          >
            Clear filter
          </button>
        </div>
      ) : (
        /*
          ── Grid instead of the old infinite drag-scroll carousel ──
          Why this is a better pattern for a portfolio:
          - Every project is visible/scannable at once, not hidden behind
            drag/arrow interaction the visitor has to discover.
          - Works identically (and accessibly) on mobile, trackpad, and
            keyboard — no custom drag physics to get right.
          - No duplicated-array "infinite loop" hack, no scroll-boundary
            math, no risk of the loop-reset stutter that pattern is prone to.

          key={activeFilter} on the grid forces React to remount the whole
          grid when the filter changes, which re-triggers each ProjectCard's
          own IntersectionObserver reveal — so switching filters replays the
          staggered fade-in instead of the new set just appearing instantly.
        */
        <div
          key={activeFilter}
          className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.id} {...project} index={index} />
          ))}
        </div>
      )}
    </section>
  );
}