import { useState, useRef, useEffect } from "react";
import { MessageSquare, Send, X, MinusCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface ChatbotProps {
  /** Notifies the parent whenever the chat window opens/closes
   *  (used to hide the WhatsApp button while chat is open) */
  onOpenChange?: (isOpen: boolean) => void;
}

const botResponses: Record<string, string> = {
  skills: "Muhammad has skills in ReactJS, NextJS, ExpressJS, NodeJS, Fast Api, MongoDB, SQL, , C++, JavaScript, Python, TypeScript, HTML/CSS, Responsive Design, Git, REST APIs, AI integration, Firebase, Supabase, Tailwind CSS, AWS EC2, AWS ECS, Docker, and mobile app development.",
  age: "Muhammad is 21 years old.",
  cgpa: "Muhammad's CGPA is 3.73",
  contact: "You can contact Muhammad via email at muhammadasim123525@gmail.com or by phone at 03297208637.",
  location: "Muhammad is based in Multan, Pakistan and can travel to Lahore, Islamabad for meetings or work.",
  education: "Muhammad is a Computer Science student in his 7th semester at the University of Engineering and Technology Lahore. He completed his FSc from Punjab College Multan (2021-2023) with 86% marks, and his Matric from FG Public High School Multan (2019-2021) with 95% marks.",
  experience: "Muhammad has over One Year of professional experience as a full-stack developer working in a company and handling client projects. Additionally, he has freelancing experience for over 12 months, managing end-to-end web and mobile development projects.",
  about: "Muhammad Asim is a Full Stack Developer passionate about building web and mobile applications, integrating AI, and solving complex problems through code. He is experienced in both frontend and backend development, as well as handling clients and delivering projects professionally.",
  projects: "Muhammad has worked on SpeakFlow Hub (an AI voice assistant), a Social Media App (Instagram clone), a Realtime Chat App built in Flutter + Supabase, a TikTok-like app in Flutter, and several web applications using ReactJS, NextJS,React Native, Fast Api and NodeJS.",
  gender: "Muhammad's gender is male.",
  github: "You can visit Muhammad's GitHub profile at https://github.com/MuhamadAsim."
};

const getBotResponse = (message: string): string => {
  const lowercaseMsg = message.toLowerCase();

  if (lowercaseMsg.includes("skills") || lowercaseMsg.includes("technologies")) {
    return botResponses.skills;
  } else if (lowercaseMsg.includes("age") || lowercaseMsg.includes("old")) {
    return botResponses.age;
  } else if (lowercaseMsg.includes("cgpa") || lowercaseMsg.includes("gpa") || lowercaseMsg.includes("grade")) {
    return botResponses.cgpa;
  } else if (lowercaseMsg.includes("contact") || lowercaseMsg.includes("email") || lowercaseMsg.includes("phone") || lowercaseMsg.includes("call")) {
    return botResponses.contact;
  } else if (lowercaseMsg.includes("location") || lowercaseMsg.includes("city") || lowercaseMsg.includes("where")) {
    return botResponses.location;
  } else if (lowercaseMsg.includes("education") || lowercaseMsg.includes("university") || lowercaseMsg.includes("college") || lowercaseMsg.includes("school") || lowercaseMsg.includes("qualification") || lowercaseMsg.includes("fsc") || lowercaseMsg.includes("matric")) {
    return botResponses.education;
  } else if (lowercaseMsg.includes("experience") || lowercaseMsg.includes("work") || lowercaseMsg.includes("freelance") || lowercaseMsg.includes("client")) {
    return botResponses.experience;
  } else if (lowercaseMsg.includes("about") || lowercaseMsg.includes("yourself") || lowercaseMsg.includes("who")) {
    return botResponses.about;
  } else if (lowercaseMsg.includes("projects") || lowercaseMsg.includes("portfolio")) {
    return botResponses.projects;
  } else if (lowercaseMsg.includes("gender") || lowercaseMsg.includes("male") || lowercaseMsg.includes("female")) {
    return botResponses.gender;
  } else if (lowercaseMsg.includes("github") || lowercaseMsg.includes("repo") || lowercaseMsg.includes("code")) {
    return botResponses.github;
  } else {
    return "I'm Muhammad's virtual assistant. You can ask me about his skills, education, qualifications, projects, experience, contact information, or background.";
  }
};

export default function Chatbot({ onOpenChange }: ChatbotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [hasClickedOnce, setHasClickedOnce] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "Hi there! I'm Muhammad's virtual assistant. How can I help you today?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Report open/close state to parent (drives WhatsApp button visibility)
  useEffect(() => {
    onOpenChange?.(isOpen);
  }, [isOpen, onOpenChange]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage = {
      text: inputValue,
      isUser: true,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");

    // Simulate bot thinking
    setTimeout(() => {
      const botResponse = {
        text: getBotResponse(inputValue),
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
    }, 500);
  };

  const handleClick = () => {
    setIsOpen(true);
    setHasClickedOnce(true); // mark as clicked for the session
  };

  if (!isOpen) {
    return (
      <button
        onClick={handleClick}
        className={`fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-all hover:scale-105 active:scale-95 ${
          !hasClickedOnce ? "animate-bounce-shake" : ""
        }`}
        aria-label="Open chat"
      >
        <MessageSquare className="h-6 w-6" />
      </button>
    );
  }

  return (
    <div
      className={cn(
        "fixed bottom-0 right-0 z-50 flex flex-col overflow-hidden rounded-lg bg-card shadow-xl transition-all",
        "w-[calc(100%-1rem)] sm:w-96", // Use almost full width on very small screens
        isMinimized ? "h-14" : "h-[500px] max-h-[80vh]"
      )}
    >
      {/* Chat header */}
      <div className="flex items-center justify-between bg-primary p-3 text-primary-foreground">
        <h3 className="font-medium">Muhammad's Assistant</h3>
        <div className="flex gap-2">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="rounded-full p-1 transition-colors hover:bg-primary-foreground/20"
            aria-label={isMinimized ? "Expand chat" : "Minimize chat"}
          >
            <MinusCircle className="h-5 w-5" />
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="rounded-full p-1 transition-colors hover:bg-primary-foreground/20"
            aria-label="Close chat"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Chat messages */}
      {!isMinimized && (
        <>
          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={cn(
                    "flex max-w-[80%] flex-col",
                    message.isUser ? "ml-auto items-end" : "mr-auto items-start"
                  )}
                >
                  <div
                    className={cn(
                      "rounded-lg px-4 py-2",
                      message.isUser
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-secondary-foreground"
                    )}
                  >
                    <p className="text-sm">{message.text}</p>
                  </div>
                  <span className="mt-1 text-xs text-muted-foreground">
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Chat input */}
          <div className="border-t p-3">
            <form onSubmit={handleSubmit} className="flex items-center gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask about skills, experience, etc."
                className="flex-1 rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-primary"
              />
              <button
                type="submit"
                className="flex h-9 w-9 items-center justify-center rounded-md bg-primary text-primary-foreground transition-colors hover:bg-primary/90"
                aria-label="Send message"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
}