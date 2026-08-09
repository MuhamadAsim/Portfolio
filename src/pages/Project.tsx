import { useEffect, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ExternalLink, Calendar, User, Tag, Github, Globe } from "lucide-react";
import Footer from "@/components/Footer";
import { projectData } from "../data/projects";

type ProjectDetails = {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  image: string;
  tags: string[];
  date: string;
  client: string;
  role: string;
  liveDemo?: string;
  frontendRepo?: string;
  backendRepo?: string;
  githubRepo?: string;
};

// ─── Reusable action button components ───────────────────────────────────────

function LiveDemoButton({ href }: { href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="
        relative overflow-hidden inline-flex items-center gap-2 w-full
        justify-center rounded-lg px-4 py-2.5 text-sm font-semibold
        bg-primary text-primary-foreground
        transition-all duration-300 hover:bg-primary/90 hover:shadow-lg
        hover:shadow-primary/30
      "
    >
      <Globe className="h-4 w-4 shrink-0" />
      Live Demo
      <ExternalLink className="h-3.5 w-3.5 shrink-0 ml-auto opacity-70" />
      <span className="absolute inset-0 -translate-x-full bg-white/20 blur-lg animate-flowLight pointer-events-none" />
    </a>
  );
}

function RepoButton({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="
        inline-flex items-center gap-2 w-full justify-center rounded-lg
        px-4 py-2.5 text-sm font-medium border border-primary/30
        text-primary bg-transparent
        transition-all duration-200 hover:bg-primary hover:text-primary-foreground hover:border-primary
      "
    >
      <Github className="h-4 w-4 shrink-0" />
      {label}
      <ExternalLink className="h-3.5 w-3.5 shrink-0 ml-auto opacity-50" />
    </a>
  );
}

// ─── Page component ───────────────────────────────────────────────────────────

export default function Project() {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<ProjectDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  const contentRef = useRef<HTMLDivElement>(null);
  const [sectionsVisible, setSectionsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      const foundProject = projectData.find((p) => p.id === id) || null;
      setProject(foundProject);
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [id]);

  useEffect(() => {
    if (!isLoading && project) {
      const timer = setTimeout(() => setIsVisible(true), 100);
      return () => clearTimeout(timer);
    }
  }, [isLoading, project]);

  useEffect(() => {
    const node = contentRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSectionsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [project]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="h-8 w-48 bg-muted rounded-md" />
          <div className="text-muted-foreground text-sm">
            Loading project details...
          </div>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="heading-lg mb-4 text-primary">Project Not Found</h1>
            <p className="text-muted-foreground mb-6">
              The project you're looking for doesn't exist or has been removed.
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-full text-white bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-all duration-300 hover:bg-primary/90"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const hasLinks =
    project.liveDemo || project.frontendRepo || project.backendRepo || project.githubRepo;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <main className="flex-1 bg-background">

        {/* ── Hero image — full-bleed, edge-to-edge ── */}
        <div
          className={`h-[40vh] w-full overflow-hidden transition-all duration-700 sm:h-[50vh] ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
          }`}
        >
          <img
            src={project.image}
            alt={project.title}
            className="h-full w-full object-cover"
          />
        </div>

        {/*
          ── Header ──
          Filled bg-primary back button (restored per your last note),
          then title, then description — meta info (date/client/role)
          lives in the sidebar "Project Details" card below, same boxed
          style as the Links card, matching your original layout.
        */}
        <div className="container mx-auto max-w-5xl px-4 pt-10 sm:px-6 lg:px-8">
          <Link
            to="/#projects"
            className={`relative mb-5 inline-flex items-center gap-1.5 overflow-hidden rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-all duration-700 hover:bg-primary/90 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Projects
            <span className="absolute top-0 left-0 h-full w-10 bg-white/30 blur-lg animate-flowLight pointer-events-none" />
          </Link>

          <h1
            className={`heading-xl mb-4 max-w-3xl text-foreground transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: isVisible ? "0.1s" : "0s" }}
          >
            {project.title}
          </h1>

          <p
            className={`max-w-3xl border-t border-border pt-5 text-base leading-relaxed text-muted-foreground transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: isVisible ? "0.2s" : "0s" }}
          >
            {project.description}
          </p>
        </div>

        {/* ── Body ── */}
        <div className="container mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8" ref={contentRef}>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-3 lg:gap-12">

            {/* ── Main content — now leads (col-span-2 first) since it's
                the primary reading content, sidebar follows ── */}
            <div
              className={`order-2 lg:order-1 lg:col-span-2 transition-all duration-700 ${
                sectionsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <h2 className="heading-md mb-6 text-primary">Project Overview</h2>

              <div className="prose prose-sm max-w-none text-muted-foreground">
                {project.fullDescription.split("\n\n").map((paragraph, index) => (
                  <p key={index} className="mb-4 leading-relaxed text-justify">
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-4 text-primary">Technologies &amp; Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* ── Sidebar — Project Details card (date/client/role, same
                boxed glass-card style as the Links card below) + Links ── */}
            <div
              className={`order-1 lg:order-2 lg:col-span-1 space-y-6 transition-all duration-700 ${
                sectionsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: sectionsVisible ? "0.1s" : "0s" }}
            >
              <div className="glass-card rounded-xl p-6 space-y-4">
                <h2 className="text-xl font-semibold text-primary">Project Details</h2>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Calendar className="h-5 w-5 text-muted-foreground mt-0.5 shrink-0" />
                    <div>
                      <p className="text-sm font-medium">Date</p>
                      <p className="text-sm text-muted-foreground">{project.date}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <User className="h-5 w-5 text-muted-foreground mt-0.5 shrink-0" />
                    <div>
                      <p className="text-sm font-medium">Client</p>
                      <p className="text-sm text-muted-foreground">{project.client}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Tag className="h-5 w-5 text-muted-foreground mt-0.5 shrink-0" />
                    <div>
                      <p className="text-sm font-medium">Role</p>
                      <p className="text-sm text-muted-foreground">{project.role}</p>
                    </div>
                  </div>
                </div>
              </div>

              {hasLinks && (
                <div className="glass-card sticky top-24 rounded-xl p-6 space-y-2.5">
                  <p className="mb-1 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Links
                  </p>

                  {project.liveDemo && <LiveDemoButton href={project.liveDemo} />}
                  {project.frontendRepo && (
                    <RepoButton href={project.frontendRepo} label="Frontend Repo" />
                  )}
                  {project.backendRepo && (
                    <RepoButton href={project.backendRepo} label="Backend Repo" />
                  )}
                  {project.githubRepo && (
                    <RepoButton href={project.githubRepo} label="GitHub Repo" />
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}