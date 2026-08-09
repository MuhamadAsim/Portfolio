import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ExternalLink, Calendar, User, Tag, Github, Globe } from "lucide-react";
import Footer from "@/components/Footer";

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

const projectData: ProjectDetails[] = [
  {
    id: "1",
    title: "BidaWrap",
    description:
      "A MERN stack bidding platform where customers can post jobs and nearby shop owners can place bids in real-time.",
    fullDescription:
      "BidaWrap is a full-stack MERN application built for connecting customers with nearby shop owners through a smart bidding system. Customers can create jobs and set their location directly on the map, while nearby shops receive those jobs based on configurable distance filtering. Shop owners instantly receive notifications through SMS and email integrations using Twilio and SendGrid, allowing them to place competitive bids in real-time. Customers can compare offers and select the best one according to price, location, or service quality. The platform also integrates Stripe for secure online payments and uses WebSockets for realtime bid updates and notifications. BidaWrap is fully responsive and optimized for smooth performance across desktop and mobile devices.",
    image: "/bidawrap.png",
    tags: [
      "MongoDB", "Express", "React", "Node.js", "MERN", "Stripe",
      "Twilio", "SendGrid", "WebSockets", "Google Maps", "Realtime", "Tailwind CSS",
    ],
    date: "2026",
    client: "Client Project",
    role: "Full Stack Developer",
    liveDemo: "https://bidawrap.com",
  },
  {
    id: "2",
    title: "Unison",
    description:
      "A web and mobile alumni-student networking platform built with Next.js, React Native, and a graph database.",
    fullDescription:
      "Unison is a modern alumni and student networking platform available as both a web application and mobile app. Built using Next.js, React Native, the MERN stack, and a graph database, the platform helps universities strengthen connections between alumni and students. Alumni can post opportunities, events, mentorship programs, internships, and career updates, while students can explore opportunities, interact with posts, connect with alumni, and build professional networks. The graph database enables better relationship mapping and recommendation systems between users, institutions, opportunities, and events. The platform is designed with scalability, realtime interaction, and responsive user experience in mind.",
    image: "/unison.png",
    tags: [
      "Next.js", "React Native","Nestjs", "MongoDB", "Express", "Node.js",
      "Graph Database","Neo4j","Web Socket"
    ],
    date: "2026",
    client: "University Project",
    role: "Full Stack Developer",
    liveDemo: "https://unison-lovat.vercel.app/login",
  },
  {
    id: "3",
    title: "SpeakFlow (AI Voice Assistant)",
    description:
      "An AI-powered voice assistant for businesses to handle customer interactions, tasks, and inquiries efficiently.",
    fullDescription:
      "SpeakFlow is an advanced AI voice assistant built using the MERN stack, DeepSeek Qwen3 API, Piper TTS, and Whisper for speech recognition and synthesis. It is designed for companies to deploy as a virtual assistant for customer support, scheduling, FAQs, and automated responses. Users can interact with the assistant through voice commands, while businesses can customize responses and integrate it with their systems. The app supports real-time transcription, natural voice output, multi-language support, and role-based dashboards for managing conversation logs, analytics, and user settings. The platform can be extended to act as a virtual receptionist, onboarding assistant, or task automation tool.",
    image: "/voice-assistant.PNG",
    tags: [
      "AI", "React", "Node.js", "DeepSeekQwen3API", "Piper",
      "Whisper", "Express", "Fullstack", "Socket.IO", "Tailwind CSS",
    ],
    date: "July 2025",
    client: "Side Project",
    role: "Full Stack Developer",
    frontendRepo: "https://github.com/MuhamadAsim/speakflow-hub",
    backendRepo: "https://github.com/MuhamadAsim/avs-backend",
  },
  {
    id: "4",
    title: "Social Media App",
    description:
      "A mobile-friendly social platform for connecting and sharing media.",
    fullDescription:
      "This is a fully responsive MERN stack social media app that works smoothly on mobile, tablet, and desktop. Users can create posts with images or videos, like and comment on posts and comments, and reply to comment threads. Reels work the same way—users can like, comment, and reply. The app includes a real-time chat system like WhatsApp, where users can send text, images, videos, reply to messages, and react with emojis. There's also a profile section to update personal info, and a settings area to manage preferences like dark or light mode, mute notifications, hide online status, etc. Users can search for friends, send friend requests, and manage received/sent requests from the inbox. We use AI to build a personalized feed for each user based on what they and their friends like and watch. This feed is updated during off-peak hours to ensure fast performance.",
    image: "/social_app.PNG",
    tags: [
      "MongoDB", "Express", "React", "Node.js", "AI", "Fullstack",
      "Responsive", "Tailwind CSS", "JWT", "Socket.IO", "Lazy Loading",
    ],
    date: "June 2025",
    client: "Side Project",
    role: "Full Stack Developer",
    frontendRepo: "https://github.com/MuhamadAsim/insta-clone-frontend",
    backendRepo: "https://github.com/MuhamadAsim/insta-clone-backend",
  },
  {
    id: "5",
    title: "Ecommerce-App",
    description:
      "A mobile ecommerce application built in Flutter with product browsing, cart, and secure checkout features.",
    fullDescription:
      "A full-featured ecommerce mobile application developed using Flutter, providing a seamless shopping experience on both Android and iOS. It includes product browsing, detailed product pages, add-to-cart functionality, and a secure checkout system integrated with multiple payment gateways like Stripe, PayPal, and Google Pay. The app also supports user authentication with JWT, order tracking, and personalized recommendations. Built with a clean UI, smooth animations, and optimized performance to ensure a delightful and responsive user experience across devices.",
    image: "/ecommerse.jpg",
    tags: ["Flutter", "Dart", "Supabase"],
    date: "August 2025",
    client: "Friend",
    role: "Full Stack Developer",
    frontendRepo: "https://github.com/MuhamadAsim/ecommerce-app-flutter",
  },
  {
    id: "6",
    title: "Image Manager",
    description:
      "A MERN-based image upload and management system deployed on AWS with a serverless backend.",
    fullDescription:
      "A cloud-based image upload and management system built with the MERN stack and fully deployed on AWS. The backend is entirely serverless, powered by AWS Lambda functions handling authentication, image uploads, metadata management, and image retrieval. Images are securely stored in S3, while metadata is stored in MongoDB. The frontend is built with React and hosted on AWS EC2, providing a fast and responsive user experience.",
    image: "/image_manager.PNG",
    tags: ["MERN", "AWS Lambda", "EC2", "Serverless", "S3"],
    date: "March 2025",
    client: "Personal Tool",
    role: "Full Stack Developer",
    frontendRepo: "https://github.com/MuhamadAsim/image-manager-frontend",
  },
  {
    id: "7",
    title: "AutoChain",
    description:
      "An automation workflow built with n8n using OpenAI, Twilio, and SendGrid.",
    fullDescription:
      "AutoChain is a workflow automation system built using n8n. Incoming requests are captured through a webhook, processed using OpenAI APIs, structured through function nodes, and distributed through email and SMS channels using SendGrid and Twilio. The workflow demonstrates scalable process automation and AI-powered data extraction.",
    image: "/n8n.PNG",
    tags: ["n8n", "Postman", "Twilio", "SendGrid", "Automation"],
    date: "September 2025",
    client: "Personal Project",
    role: "Automation Developer",
    githubRepo: "https://github.com/MuhamadAsim/n8n-msg-email-sender",
  },
  {
    id: "8",
    title: "University Management System",
    description:
      "A comprehensive MERN stack application for managing university resources, students, faculty, and courses.",
    fullDescription:
      "A full-featured University Management System with dashboards for admins, faculty, and students. It includes course management, attendance tracking, assignment handling, grade management, schedules, and notifications with role-based authentication and responsive design.",
    image:
      "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?auto=format&fit=crop&w=1400&h=800",
    tags: ["MongoDB", "Express", "React", "Node.js", "MERN", "Tailwind CSS", "JWT"],
    date: "December 2024",
    client: "University of Engineering and Technology",
    role: "Full Stack Developer",
    frontendRepo: "https://github.com/MuhamadAsim/University-Frontend",
    backendRepo: "https://github.com/MuhamadAsim/University-Backend",
  },
  {
    id: "9",
    title: "Library Management System",
    description:
      "A web application for managing library resources, book checkouts, and member information.",
    fullDescription:
      "A MERN stack-based Library Management System for managing books, inventory, member records, borrowing history, fines, and book availability with responsive UI and secure authentication.",
    image:
      "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1400&h=800",
    tags: ["MongoDB", "Express", "React", "Node.js", "MERN"],
    date: "January 2025",
    client: "University of Engineering and Technology",
    role: "Web Developer",
    frontendRepo: "https://github.com/MuhamadAsim/admin-library-haven",
  },
  {
    id: "10",
    title: "Realtime Chat App",
    description:
      "A cross-platform realtime chat application built with Flutter and Supabase.",
    fullDescription:
      "A realtime chat application with one-to-one and group messaging, online presence, read receipts, push notifications, emoji reactions, and realtime synchronization powered by Supabase.",
    image: "/chatapp.png",
    tags: ["Flutter", "Dart", "Supabase", "Realtime", "Authentication"],
    date: "February 2025",
    client: "Personal Project",
    role: "Full Stack Developer",
    frontendRepo: "https://github.com/MuhamadAsim/chatapp-flutter",
  },
  {
    id: "11",
    title: "Cosmetics Landing Page",
    description:
      "A responsive landing page for a cosmetics store using React and Tailwind CSS.",
    fullDescription:
      "A responsive and visually engaging cosmetics landing page with modern UI, smooth animations, product showcase sections, newsletter integration, and mobile-first responsive design.",
    image: "/21.PNG",
    tags: ["React", "Tailwind CSS", "Frontend"],
    date: "July 2024",
    client: "E-commerce Brand",
    role: "Frontend Developer",
    frontendRepo: "https://github.com/MuhamadAsim/glam-shop-launchpad",
  },
  {
    id: "12",
    title: "Food App",
    description:
      "A ReactJS-based food delivery landing page with map and geolocation features.",
    fullDescription:
      "A food delivery frontend application built using ReactJS and LeafletJS with interactive maps, restaurant markers, location-based features, and responsive UI.",
    image: "/food-app.PNG",
    tags: ["ReactJS", "LeafletJS", "React-Leaflet", "Frontend"],
    date: "November 2024",
    client: "Side Project",
    role: "Frontend Developer",
    frontendRepo: "https://github.com/MuhamadAsim/delivery-app",
  },
  {
    id: "13",
    title: "MedMap",
    description:
      "A healthcare map tool to find nearby pharmacies, clinics, and hospitals.",
    fullDescription:
      "MedMap is a location-based healthcare directory built with the MERN stack, helping users discover nearby pharmacies, clinics, hospitals, and healthcare facilities through an integrated map interface.",
    image: "/medmap.PNG",
    tags: ["Next.js", "Express", "Node.js", "MongoDB"],
    date: "June 2024",
    client: "Contribution with Friend",
    role: "Full Stack Developer",
  },
];

// ─── Reusable action button components ───────────────────────────────────────

/** Primary CTA — used for Live Demo only */
function LiveDemoButton({ href }: { href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="
        relative overflow-hidden inline-flex items-center gap-2 w-full
        justify-center rounded-lg px-4 py-2.5 text-sm font-semibold
        bg-primary text-white
        transition-all duration-300 hover:opacity-90 hover:shadow-lg
        hover:shadow-indigo-500/30
      "
    >
      <Globe className="h-4 w-4 shrink-0" />
      Live Demo
      <ExternalLink className="h-3.5 w-3.5 shrink-0 ml-auto opacity-70" />
      {/* shimmer sweep */}
      <span className="absolute inset-0 -translate-x-full bg-white/20 blur-lg animate-flowLight pointer-events-none" />
    </a>
  );
}

/** Ghost button — used for all GitHub repo links */
function RepoButton({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="
        inline-flex items-center gap-2 w-full justify-center rounded-lg
        px-4 py-2.5 text-sm font-medium border border-border
        text-foreground bg-transparent
        transition-all duration-200 hover:bg-secondary hover:border-foreground/30
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

  useEffect(() => {
    const timer = setTimeout(() => {
      const foundProject = projectData.find((p) => p.id === id) || null;
      setProject(foundProject);
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [id]);

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
            <h1 className="heading-lg mb-4">Project Not Found</h1>
            <p className="text-muted-foreground mb-6">
              The project you're looking for doesn't exist or has been removed.
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-all duration-300 hover:bg-foreground/90"
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

  // Determine whether any links exist to show the sidebar links section
  const hasLinks =
    project.liveDemo || project.frontendRepo || project.backendRepo || project.githubRepo;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <main className="flex-1 relative z-0 bg-background">

        {/* ── Hero ── */}
        <div className="relative h-[60vh] w-full overflow-hidden z-0">
          <img
            src={project.image}
            alt={project.title}
            className="h-full w-full object-cover"
          />
          {/* gradient overlay — stronger at bottom so text is always readable */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

          <div className="absolute bottom-0 left-0 w-full p-6 md:p-12">
            <div className="container mx-auto max-w-6xl">
              <h1 className="heading-xl text-primary mb-2">{project.title}</h1>
              <p className="max-w-3xl text-base text-primary font-bold mb-4">
                {project.description}
              </p>

              <Link
                to="/#projects"
                className="
                  mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-white
                  transition-all duration-300 px-4 py-2 rounded-lg
                  bg-primary
                  relative overflow-hidden group hover:opacity-90
                "
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Projects
                <span className="absolute top-0 left-0 h-full w-10 bg-white/30 blur-lg animate-flowLight pointer-events-none" />
              </Link>
            </div>
          </div>
        </div>

        {/* ── Body ── */}
        <div className="container mx-auto max-w-6xl px-4 py-16">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">

            {/* ── Sidebar ── */}
            <div className="glass-card rounded-xl p-6 lg:col-span-1 h-fit space-y-6">
              <h2 className="text-xl font-semibold text-primary">Project Details</h2>

              {/* Meta rows */}
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

              {/* ── Action buttons ── */}
              {hasLinks && (
                <div className="space-y-2.5 pt-2 border-t border-border">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider pt-2">
                    Links
                  </p>

                  {/* Live Demo — visually distinct, shown first */}
                  {project.liveDemo && (
                    <LiveDemoButton href={project.liveDemo} />
                  )}

                  {/* Repo buttons — ghost style */}
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

            {/* ── Main content ── */}
            <div className="lg:col-span-2">
              <h2 className="heading-md mb-6 text-primary">Project Overview</h2>

              <div className="prose prose-sm max-w-none text-muted-foreground">
                {project.fullDescription.split("\n\n").map((paragraph, index) => (
                  <p key={index} className="mb-4 leading-relaxed text-justify">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Tags */}
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

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}