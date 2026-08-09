


export interface ProjectDetails {
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
}



export interface ProjectBrief {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
}







export const projectbriefs: ProjectBrief[] = [
  {
    id: "1",
    title: "BidaWrap",
    description:
      "A MERN stack bidding platform where customers can post jobs and nearby shop owners can place bids on them. Customers select their location using maps, and shops receive job notifications based on distance filtering through SMS and email integrations.",
    image: "/bidawrap-front.png",
    tags: ["MongoDB", "Express", "React", "Node.js", "Stripe", "Twilio", "SendGrid", "WebSockets", "Maps", "MERN"],
  },
  {
    id: "14",
    title: "DevMind AI",
    description:
      "A personal AI software engineering workspace that helps developers understand, explore, and work with their codebases through an AI coding assistant with repository integration and persistent conversations.",
    image: "/devmind.png",
    tags: [
      "Next.js",
      "TypeScript",
      "OpenRouter",
      "MongoDB",
      "AI",
      "Vercel AI SDK",
      "GitHub",
      "Zustand",
    ],
  },
  {
    id: "15",
    title: "ContentMind (QA Assistant)",
    description:
      "An AI-powered video and meeting Q&A assistant that converts spoken content into searchable knowledge, allowing users to ask questions about uploaded videos and live meetings.",
    image: "/contentmind.png",
    tags: [
      "FastAPI",
      "Whisper",
      "OpenRouter",
      "Embeddings",
      "MongoDB",
      "WebSockets",
      "AI",
    ],
  },
  {
    id: "2",
    title: "Unison",
    description:
      "A web and mobile platform built using Next.js, React Native, and the MERN stack with a graph database. The platform connects alumni and students where alumni can share opportunities, events, and updates while students can explore, interact, and build professional connections.",
    image: "/unison-login.png",
    tags: ["Next.js", "React Native", "Graph Database", "MongoDB", "Express", "Node.js", "MERN"],
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








export const projectData: ProjectDetails[] = [
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
    id: "14",
    title: "DevMind AI",
    description:
      "A personal AI software engineering workspace that helps developers understand, explore, and work with their codebases through an AI coding assistant with repository integration, persistent conversations, and remote control through WhatsApp.",
    fullDescription:
      "DevMind AI is a personal AI software engineering workspace designed to help developers work more effectively with their codebases. Built with Next.js, TypeScript, the Vercel AI SDK, OpenRouter, MongoDB, and Zustand, it provides an AI coding assistant capable of streaming responses and maintaining persistent conversations. The platform integrates with local and GitHub repositories, allowing the AI to work with project files and provide context-aware assistance. Conversations and messages are persisted in MongoDB, while context management uses a sliding-window approach to control the amount of conversation history sent to the model. DevMind also integrates with WhatsApp, allowing users to remotely interact with and control the assistant through WhatsApp messages, making the AI workspace accessible even when the user is away from the main application.",
    image: "/devmind.png",
    tags: [
      "Next.js",
      "TypeScript",
      "OpenRouter",
      "MongoDB",
      "Vercel AI SDK",
      "GitHub",
      "Zustand",
      "WhatsApp",
      "AI",
    ],
    date: "2026",
    client: "Personal Project",
    role: "AI Engineer / Full Stack Developer",
    githubRepo: "https://github.com/MuhamadAsim/Dev-Mind.git",
  },
  {
    id: "15",
    title: "ContentMind (QA Assistant)",
    description:
      "An AI-powered video and meeting Q&A assistant that converts spoken content into searchable knowledge, allowing users to ask questions about uploaded videos and live meetings.",
    fullDescription:
      "QA Assistant is an AI-powered knowledge and question-answering system designed to let users interact with information contained in videos, live meetings, audios and text files. The system extracts audio from uploaded videos using FFmpeg, transcribes speech using faster-whisper, and processes the resulting text into manageable knowledge chunks. Embeddings are generated using a local embedding service powered by BAAI/bge-small-en-v1.5 and stored for semantic retrieval. When a user asks a question, relevant knowledge is retrieved and passed to an LLM through OpenRouter to generate an answer based on the available context. The system also includes a live meeting workflow using browser audio capture, MediaRecorder, WebSockets, and real-time transcription, allowing meeting conversations to become another source of searchable knowledge.",
    image: "/contentmind.png",
    tags: [
      "FastAPI",
      "Python",
      "faster-whisper",
      "FFmpeg",
      "Embeddings",
      "OpenRouter",
      "WebSockets",
      "MongoDB",
      "AI",
    ],
    date: "2026",
    client: "Personal Project",
    role: "AI Engineer / Full Stack Developer",
    frontendRepo: "https://github.com/MuhamadAsim/ContentMind-Frontend.git",
    backendRepo: "https://github.com/MuhamadAsim/ContentMind.git",
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
      "Next.js", "React Native", "Nestjs", "MongoDB", "Express", "Node.js",
      "Graph Database", "Neo4j", "Web Socket"
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