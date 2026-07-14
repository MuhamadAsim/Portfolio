
import { useEffect, useRef, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Mail, MapPin, Send } from "lucide-react";
import emailjs from 'emailjs-com';

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const contactInfoRef = useRef<HTMLDivElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Initialize EmailJS with your public key
    emailjs.init("EHrEqq7w8Rqgs9EXc");

    // Use EmailJS to send the email
    emailjs.send(
      'service_fcf6be9', // Replace with your EmailJS service ID
      'template_uvdctvr', // Replace with your EmailJS template ID
      {
        from_name: formData.name,
        reply_to: formData.email,
        message: formData.message
      }
    )
      .then(() => {
        setIsSubmitting(false);
        toast({
          title: "Message sent",
          description: "Thank you for your message. I'll get back to you soon!",
        });
        setFormData({ name: "", email: "", message: "" });
      })
      .catch((error) => {
        console.error('Email sending failed:', error);
        setIsSubmitting(false);
        toast({
          title: "Error",
          description: "There was an error sending your message. Please try again.",
          variant: "destructive"
        });
      });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target === formRef.current) {
              entry.target.classList.add("opacity-100", "translate-y-0");
            }
            if (entry.target === contactInfoRef.current) {
              entry.target.classList.add("opacity-100", "translate-y-0");
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    if (formRef.current) observer.observe(formRef.current);
    if (contactInfoRef.current) observer.observe(contactInfoRef.current);

    return () => {
      if (formRef.current) observer.unobserve(formRef.current);
      if (contactInfoRef.current) observer.unobserve(contactInfoRef.current);
    };
  }, []);
return (
  <section id="contact" ref={sectionRef} className="section-container">
    <div className="mb-12 text-center md:mb-16">
      <span className="subheading mb-2 block">Get In Touch</span>
      <h2 className="heading-lg mb-4">Let's Work Together</h2>
      <p className="mx-auto max-w-2xl text-muted-foreground">
        Have a project in mind or just want to say hello? I'd love to hear from you.
        Fill out the form below and I'll get back to you as soon as possible.
      </p>
    </div>

    <div className="grid grid-cols-1 gap-12 md:grid-cols-5 md:gap-8 lg:gap-16">
      {/* LEFT SIDE – Contact Info + Socials */}
     <div
  ref={contactInfoRef}
  className="space-y-6 opacity-0 translate-y-8 transition-all duration-700 ease-out delay-300 md:col-span-2"
>
  {/* Contact Info Card */}
  <div className="glass-card rounded-xl p-6 shadow-md shadow-gray-300/30 dark:shadow-black/30 hover:shadow-xl hover:shadow-purple-500/20 transition-shadow duration-500">
    <h3 className="mb-4 font-display text-xl font-semibold">Contact Information</h3>

    <div className="space-y-4">
      {/* Email */}
      <div className="flex items-start gap-3">
        <Mail className="h-5 w-5 text-muted-foreground" />
        <div>
          <p className="text-sm font-medium">Email</p>
          <a
            href="mailto:raomuhamadasim@gmail.com"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            raomuhamadasim@gmail.com
          </a>
        </div>
      </div>

      {/* Phone */}
      <div className="flex items-start gap-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-muted-foreground"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 5a2 2 0 012-2h1.28a2 2 0 011.933 1.516l.518 2.07a2 2 0 01-.516 1.868l-1.2 1.2a16 16 0 006.364 6.364l1.2-1.2a2 2 0 011.868-.516l2.07.518A2 2 0 0121 17.72V19a2 2 0 01-2 2h-1C9.82 21 3 14.18 3 6V5z"
          />
        </svg>
        <div>
          <p className="text-sm font-medium">Phone</p>
          <a
            href="tel:+923297208637"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            +92 329 7208637
          </a>
        </div>
      </div>

      {/* Location */}
      <div className="flex items-start gap-3">
        <MapPin className="h-5 w-5 text-muted-foreground" />
        <div>
          <p className="text-sm font-medium">Location</p>
          <p className="text-sm text-muted-foreground">
            Multan, Punjab, Pakistan
          </p>
        </div>
      </div>
    </div>
  </div>
{/* Social Links Card */}
<div className="glass-card rounded-xl p-6 shadow-md shadow-gray-300/30 dark:shadow-black/30 hover:shadow-xl hover:shadow-purple-500/20 transition-shadow duration-500">
  <h3 className="mb-4 font-display text-xl font-semibold">Let's Connect</h3>
  <p className="mb-4 text-sm text-muted-foreground">
    Follow me on social media or check out my work on these platforms.
  </p>

  <div className="flex gap-3">
    {/* LinkedIn */}
    <a
      href="https://www.linkedin.com/in/muhammad-asim-30a654352/"
      className="glass-card flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 dark:border-gray-600 shadow-sm transition-colors transition-transform duration-300 hover:scale-110 hover:bg-blue-600 hover:text-white"
      aria-label="LinkedIn"
      target="_blank"
      rel="noopener noreferrer"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
        <rect x="2" y="9" width="4" height="12"></rect>
        <circle cx="4" cy="4" r="2"></circle>
      </svg>
    </a>

    {/* Fiverr */}
    <a
      href="https://www.fiverr.com/users/asim_fullstack_/"
      className="glass-card flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 dark:border-gray-600 shadow-sm transition-colors transition-transform duration-300 hover:scale-110 hover:bg-green-500 hover:text-white"
      aria-label="Fiverr"
      target="_blank"
      rel="noopener noreferrer"
    >
      <span className="font-bold text-sm">Fv</span>
    </a>



     {/* GitHub */}
    <a
      href="https://github.com/MuhamadAsim"
      className="glass-card flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 dark:border-gray-600 shadow-sm transition-colors transition-transform duration-300 hover:scale-110 hover:bg-black hover:text-white"
      aria-label="GitHub"
      target="_blank"
      rel="noopener noreferrer"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
      </svg>
    </a>

    {/* WhatsApp */}
    <a
      href="https://wa.me/923297208637"
      className="glass-card flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 dark:border-gray-600 shadow-sm transition-colors transition-transform duration-300 hover:scale-110 hover:bg-green-500 hover:text-white"
      aria-label="WhatsApp"
      target="_blank"
      rel="noopener noreferrer"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 32 32"
        fill="currentColor"
        className="transition-colors duration-300"
      >
        <path d="M16 .396c-8.837 0-16 7.163-16 16 
                 0 2.819.742 5.563 2.146 7.963L0 32l7.852-2.057c2.34 
                 1.28 4.986 1.954 7.748 1.954h.006c8.837 0 
                 16-7.163 16-16 0-4.272-1.664-8.293-4.688-11.313C24.293 
                 2.06 20.272.396 16 .396zM16 29.7c-2.357 
                 0-4.654-.633-6.65-1.829l-.477-.283-4.658 
                 1.217 1.242-4.539-.31-.48C4.96 22.232 
                 4.3 19.687 4.3 16.994c0-6.43 5.23-11.661 
                 11.7-11.661 3.128 0 6.063 1.217 8.268 
                 3.429 2.21 2.206 3.433 5.144 
                 3.433 8.272-.001 6.431-5.231 11.666-11.701 
                 11.666zm6.425-8.73c-.352-.176-2.086-1.028-2.411-1.145-.324-.12-.56-.176-.797.176s-.914 
                 1.145-1.121 1.382c-.207.24-.414.266-.766.09-.352-.176-1.487-.547-2.835-1.746-1.047-.933-1.75-2.085-1.957-2.437-.207-.352-.022-.542.154-.718.158-.158.352-.414.528-.62.176-.207.235-.352.352-.586.118-.24.06-.448-.03-.62-.09-.176-.797-1.923-1.09-2.637-.287-.69-.58-.595-.797-.606l-.682-.012c-.207 
                 0-.62.088-.945.442-.324.352-1.239 
                 1.21-1.239 2.95 0 1.74 1.268 3.422 1.445 3.659.177.24 
                 2.497 3.814 6.05 5.348.846.366 1.505.585 2.02.75.848.27 
                 1.62.232 2.232.141.681-.102 2.086-.852 2.379-1.674.293-.82.293-1.525.207-1.674-.086-.15-.322-.24-.674-.414z"/>
      </svg>
    </a>

   
  </div>
</div>


</div>

      {/* RIGHT SIDE – Contact Form */}
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="glass-card rounded-xl p-6 md:p-8 opacity-0 translate-y-8 transition-all duration-700 ease-out md:col-span-3 shadow-lg shadow-gray-300/40 dark:shadow-black/40 hover:shadow-2xl hover:shadow-purple-500/20 transition-shadow duration-500"
      >
        <div className="mb-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">
              Name
            </label>
            <input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              type="text"
              className="w-full rounded-lg border border-input bg-background px-4 py-2 text-sm focus:border-foreground focus:outline-none focus:ring-1 focus:ring-foreground"
              placeholder="Your name"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              type="email"
              className="w-full rounded-lg border border-input bg-background px-4 py-2 text-sm focus:border-foreground focus:outline-none focus:ring-1 focus:ring-foreground"
              placeholder="Your email"
              required
            />
          </div>
        </div>

        <div className="mb-6 space-y-2">
          <label htmlFor="message" className="text-sm font-medium">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={6}
            className="w-full rounded-lg border border-input bg-background px-4 py-2 text-sm focus:border-foreground focus:outline-none focus:ring-1 focus:ring-foreground"
            placeholder="Your message"
            required
          />
        </div>

<button
  type="submit"
  disabled={isSubmitting}
  className="relative overflow-hidden inline-flex items-center gap-2 rounded-lg bg-foreground px-6 py-2.5 text-sm font-medium text-white 
             transition-all duration-300 ease-out
             hover:scale-105 hover:shadow-lg hover:shadow-purple-500/30
             focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-2
             active:scale-95 disabled:opacity-70"
>
  <span className="relative z-10 flex items-center gap-2">
    {isSubmitting ? (
      <>
        <svg className="h-4 w-4 animate-spin text-white" viewBox="0 0 24 24">
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
            fill="none"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
        Sending...
      </>
    ) : (
      <>
        Send Message <Send className="h-4 w-4 text-white" />
      </>
    )}
  </span>

  {/* Flowing light effect */}
  <span className="absolute inset-0 -translate-x-full bg-white/30 blur-lg animate-flowLight pointer-events-none"></span>
</button>

      </form>
    </div>
  </section>
);

}
