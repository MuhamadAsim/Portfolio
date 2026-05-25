import { useEffect, useRef } from "react";
import { Code, Smartphone, Cloud, Workflow, Layout, Settings } from "lucide-react";

export default function Services() {
    const sectionRef = useRef<HTMLElement>(null);
    const servicesRef = useRef<HTMLDivElement>(null);
    const headingRef = useRef<HTMLDivElement>(null);
    const techScrollerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // GSAP-like animations using CSS and Intersection Observer
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        if (entry.target === headingRef.current) {
                            entry.target.classList.add("animate-fade-in-up");
                        }
                        if (entry.target === servicesRef.current) {
                            const cards = entry.target.querySelectorAll('.service-card');
                            cards.forEach((card, index) => {
                                setTimeout(() => {
                                    card.classList.add("animate-fade-in-up");
                                }, index * 150);
                            });
                        }
                        if (entry.target === techScrollerRef.current) {
                            entry.target.classList.add("animate-fade-in");
                        }
                    }
                });
            },
            { threshold: 0.1 }
        );

        if (headingRef.current) observer.observe(headingRef.current);
        if (servicesRef.current) observer.observe(servicesRef.current);
        if (techScrollerRef.current) observer.observe(techScrollerRef.current);

        return () => {
            if (headingRef.current) observer.unobserve(headingRef.current);
            if (servicesRef.current) observer.unobserve(servicesRef.current);
            if (techScrollerRef.current) observer.unobserve(techScrollerRef.current);
        };
    }, []);

    const services = [
        {
            title: "Web Development",
            shortDesc: "Modern full-stack applications with cutting-edge technologies",
            fullDesc: "I create stunning, responsive web applications using the latest technologies like React, Next.js, Node.js, and MongoDB. From landing pages to complex web platforms, I ensure optimal performance, SEO optimization, and exceptional user experiences.",
            icon: <Code className="h-8 w-8" />,
            image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=250&fit=crop&crop=entropy&auto=format",
            iconBg: "bg-gradient-to-br from-blue-500 to-cyan-500",
            cardBg: "from-blue-50/50 to-cyan-50/30"
        },
        {
            title: "Mobile Apps",
            shortDesc: "Cross-platform mobile solutions that users love",
            fullDesc: "I develop beautiful, performant mobile applications using Flutter and React Native. Whether you need iOS, Android, or both platforms, I create apps that provide seamless user experiences with robust functionality and intuitive design.",
            icon: <Smartphone className="h-8 w-8" />,
            image: "./mobile.png",
            cardBg: "from-green-50/50 to-emerald-50/30"
        },
        {
            title: "Automation",
            shortDesc: "Intelligent workflow automation for your business",
            fullDesc: "I help businesses automate repetitive tasks and complex workflows using advanced tools like n8n and custom integrations. From email automation to sophisticated business processes, I create solutions that save time, reduce errors, and boost productivity.",
            icon: <Workflow className="h-8 w-8" />,
            image: "./auto.jpeg",
            iconBg: "bg-gradient-to-br from-purple-500 to-violet-500",
            cardBg: "from-purple-50/50 to-violet-50/30"
        },
        {
            title: "Cloud Solutions",
            shortDesc: "Scalable cloud infrastructure and DevOps excellence",
            fullDesc: "I design and implement robust cloud infrastructure using AWS and Docker. My DevOps expertise includes CI/CD pipelines, automated deployments, comprehensive monitoring, and intelligent scaling solutions for rapidly growing businesses.",
            icon: <Cloud className="h-8 w-8" />,
            image: "./cloud.jpeg",
            iconBg: "bg-gradient-to-br from-orange-500 to-yellow-500",
            cardBg: "from-orange-50/50 to-yellow-50/30"
        },
        {
            title: "WordPress Solutions",
            shortDesc: "Custom WordPress development and e-commerce",
            fullDesc: "I create custom WordPress themes, powerful plugins, and feature-rich WooCommerce stores. From simple blogs to complex e-commerce platforms, I provide solutions that are easy to manage, built for performance, and optimized for search engines.",
            icon: <Layout className="h-8 w-8" />,
            image: "https://images.unsplash.com/photo-1555421689-d68471e189f2?w=400&h=250&fit=crop&crop=entropy&auto=format",
            iconBg: "bg-gradient-to-br from-indigo-500 to-blue-500",
            cardBg: "from-indigo-50/50 to-blue-50/30"
        },
        {
            title: "AI Agents & Bots",
            shortDesc: "Intelligent conversational solutions",
            fullDesc: "I build custom AI agents and chatbots that can handle customer support, automate workflows, and provide real-time assistance. Using technologies like NLP and LLMs, I create smart assistants that integrate seamlessly into websites, apps, or business systems.",
            icon: <Settings className="h-8 w-8" />, // you can switch to a better icon, e.g., Bot or Brain
            image: "./ai.jpeg",
            iconBg: "bg-gradient-to-br from-indigo-500 to-purple-500",
            cardBg: "from-indigo-50/50 to-purple-50/30"
        }


    ];

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
        { name: "JavaScript", logo: "./js.PNG", type: "image" },
        { name: "Python", logo: "./python.png" },
        { name: "WordPress", logo: "./wp.png" },
        { name: "Supabase", logo: "./supabase.jpeg" },
    ];

    return (
        <section id="services" ref={sectionRef} className="section-container relative overflow-hidden bg-gradient-to-b from-white via-gray-50/30 to-white">
            {/* Enhanced Background Elements */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-purple-400/20 via-violet-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-r from-blue-400/15 to-purple-400/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-purple-300/10 to-pink-300/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
            </div>

            <div ref={headingRef} className="mb-16 text-center md:mb-20 opacity-0 transform translate-y-8">
                <span className="inline-block px-4 py-2 mb-4 text-sm font-semibold text-black bg-gradient-to-r from-purple-100 to-pink-100 rounded-full border border-purple-200/50 animate-bounce">
                    What I Offer
                </span>
                <h2 className="heading-lg mb-6 bg-gradient-to-r bg-black dark:from-white dark:via-purple-300 dark:to-white bg-clip-text ">
                    Premium Services
                </h2>
                <p className="mx-auto max-w-3xl text-lg text-gray-600 leading-relaxed">
                    I provide modern, reliable, and scalable solutions tailored to elevate your business to the next level.
                </p>
            </div>

            {/* Enhanced Services Grid */}
            <div
                ref={servicesRef}
                className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
            >
                {services.map((service, i) => (
                    <div
                        key={i}
                        className="service-card opacity-0 transform translate-y-8 group perspective-1000"
                    >
                        <div className="relative w-full h-96 transform-style-preserve-3d transition-all duration-700 group-hover:rotate-y-180 group-hover:scale-105">
                            {/* Enhanced Front Face */}
                            <div
                                className={`absolute inset-0 w-full h-full backface-hidden rounded-2xl overflow-hidden bg-gradient-to-br ${service.cardBg} border border-white/60 shadow-xl hover:shadow-2xl transition-all duration-500 backdrop-blur-sm`}
                            >
                                {/* Card Header with Image */}
                                <div className="relative h-48 overflow-hidden">
                                    <img
                                        src={service.image}
                                        alt={service.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

                                    {/* Floating Icon */}
                                    <div className="absolute bottom-4 left-4">
                                        <div className={`flex items-center justify-center w-14 h-14 rounded-xl ${service.iconBg} text-white shadow-lg transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300`}>
                                            {service.icon}
                                        </div>
                                    </div>
                                </div>

                                {/* Card Content */}
                                <div className="p-6 flex flex-col h-48">
                                    <h3 className="mb-3 text-xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors duration-300">
                                        {service.title}
                                    </h3>
                                    <p className="text-gray-600 leading-relaxed mb-4 flex-grow">
                                        {service.shortDesc}
                                    </p>

                                    {/* Enhanced Hover Indicator */}
                                    <div className="flex items-center text-sm font-semibold text-purple-600 group-hover:text-purple-700 transition-colors duration-300">
                                        <span>Hover to explore</span>
                                        <svg
                                            className="w-5 h-5 ml-2 transform group-hover:translate-x-2 group-hover:scale-110 transition-all duration-300"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M17 8l4 4m0 0l-4 4m4-4H3"
                                            />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            {/* Enhanced Back Face */}
                            <div
                                className={`absolute inset-0 w-full h-full backface-hidden rotate-y-180 rounded-2xl p-8 bg-gradient-to-br from-white via-purple-50/30 to-white border border-purple-200/50 shadow-2xl backdrop-blur-sm`}
                            >
                                <div className="flex flex-col h-full">
                                    {/* Header */}
                                    <div className="mb-6 flex items-center">
                                        <div className={`flex items-center justify-center w-12 h-12 rounded-xl ${service.iconBg} text-white shadow-lg mr-4`}>
                                            {service.icon}
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900">
                                            {service.title}
                                        </h3>
                                    </div>

                                    {/* Description */}
                                    <div className="flex-grow mb-4">
                                        <p className="text-gray-700 leading-relaxed text-sm text-justify">
                                            {service.fullDesc}
                                        </p>
                                    </div>


                                    {/* Enhanced CTA Button */}
                                    <div className="pt-4 border-t border-purple-200/30">
                                        <a
                                            href="#contact"
                                            className="group/btn relative block w-full text-center py-4 px-6 bg-gradient-to-r from-gray-900 to-black text-white rounded-xl font-bold text-sm overflow-hidden transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl"
                                        >
                                            <span className="relative z-10">Get Started Today</span>
                                            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-purple-500 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                                            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-purple-500/20 scale-x-0 group-hover/btn:scale-x-100 origin-left transition-transform duration-300"></div>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Enhanced Tech Logos Scroller */}
            <div ref={techScrollerRef} className="mt-24 opacity-0">
                <h3 className="text-center text-2xl font-bold mb-12 bg-gradient-to-r bg-clip-text bg-black">
                    Technologies I Work With
                </h3>
                <div className="relative overflow-hidden">
                    <div className="flex animate-marquee space-x-8 py-6">
                        {techStack.concat(techStack, techStack).map((tech, i) => (
                            <div
                                key={i}
                                className="flex flex-col items-center justify-center flex-shrink-0 w-28 h-28 bg-gradient-to-br from-white via-purple-50/30 to-white backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transform hover:scale-110 hover:rotate-3 transition-all duration-300 border border-purple-200/30 group"
                            >
                                {tech.logo.endsWith(".png") || tech.logo.endsWith(".jpg") || tech.logo.endsWith(".jpeg") || tech.logo.endsWith(".PNG") ? (
                                    <img
                                        src={tech.logo}
                                        alt={tech.name}
                                        className="w-12 h-12 object-contain mb-2 group-hover:scale-110 transition-transform duration-300"
                                    />
                                ) : (
                                    <span className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">{tech.logo}</span>
                                )}
                                <span className="text-xs font-semibold text-gray-700 text-center px-2 group-hover:text-purple-600 transition-colors duration-300">
                                    {tech.name}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <style jsx>{`
                .perspective-1000 {
                    perspective: 1000px;
                }
                .transform-style-preserve-3d {
                    transform-style: preserve-3d;
                }
                .backface-hidden {
                    backface-visibility: hidden;
                }
                .rotate-y-180 {
                    transform: rotateY(180deg);
                }
                .group:hover .group-hover\\:rotate-y-180 {
                    transform: rotateY(180deg);
                }
                
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translate3d(0, 60px, 0);
                    }
                    to {
                        opacity: 1;
                        transform: translate3d(0, 0, 0);
                    }
                }
                
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: scale(0.95);
                    }
                    to {
                        opacity: 1;
                        transform: scale(1);
                    }
                }
                
                .animate-fade-in-up {
                    animation: fadeInUp 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
                }
                
                .animate-fade-in {
                    animation: fadeIn 1.2s ease-out forwards;
                }
                
                @keyframes marquee {
                    0% {
                        transform: translateX(0);
                    }
                    100% {
                        transform: translateX(-33.333333%);
                    }
                }
                
                .animate-marquee {
                    animation: marquee 30s linear infinite;
                }
                
                /* Enhanced glassmorphism effect */
                .service-card::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0));
                    border-radius: 1rem;
                    z-index: -1;
                    opacity: 0;
                    transition: opacity 0.3s ease;
                }
                
                .service-card:hover::before {
                    opacity: 1;
                }
                
                /* Custom scrollbar for better aesthetics */
                ::-webkit-scrollbar {
                    width: 8px;
                    height: 8px;
                }
                
                ::-webkit-scrollbar-track {
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 4px;
                }
                
                ::-webkit-scrollbar-thumb {
                    background: linear-gradient(to bottom, #8B5CF6, #A855F7);
                    border-radius: 4px;
                }
                
                ::-webkit-scrollbar-thumb:hover {
                    background: linear-gradient(to bottom, #7C3AED, #9333EA);
                }
            `}</style>
        </section>
    );
}