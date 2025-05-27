"use client";
import React, { useState, useEffect, useRef } from "react";
import { Mail, Phone, Instagram, Twitter, Facebook } from "lucide-react";

// Custom BlurText component using Intersection Observer
type BlurTextProps = {
  text: React.ReactNode;
  className?: string;
  delay?: number;
  threshold?: number;
};

const BlurText = ({
  text,
  className,
  delay = 0,
  threshold = 0.3,
}: BlurTextProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [delay, threshold]);

  return (
    <div
      ref={ref}
      className={`transition-all duration-800 ${
        isVisible ? "opacity-100 blur-0" : "opacity-0 blur-sm"
      } ${className}`}
      style={{
        transitionDelay: `${delay}ms`,
        filter: isVisible ? "blur(0px)" : "blur(4px)",
      }}
    >
      {text}
    </div>
  );
};

// Animated div component
const AnimatedDiv = ({
  children,
  className,
  direction = "up",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  direction?: "left" | "right" | "up";
  delay?: number;
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [delay]);

  const getTransform = () => {
    if (isVisible) return "translate(0, 0)";
    switch (direction) {
      case "left":
        return "translate(-50px, 0)";
      case "right":
        return "translate(50px, 0)";
      default:
        return "translate(0, 20px)";
    }
  };

  return (
    <div
      ref={ref}
      className={`transition-all duration-800 ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: getTransform(),
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
};

// Hover button component
const HoverButton = ({
  children,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      {...props}
      className={`transition-all duration-200 ${className}`}
      style={{
        transform: isHovered
          ? "scale(1.02) translateY(-2px)"
          : "scale(1) translateY(0)",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
    </button>
  );
};

// Social link component
const SocialLink = ({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a
      href={href}
      className={`transition-all duration-200 ${className}`}
      style={{
        transform: isHovered
          ? "scale(1.1) translateY(-2px)"
          : "scale(1) translateY(0)",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
    </a>
  );
};

const ContactSection = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    projectType: "Wedding Photography",
    message: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    console.log("Form submitted:", formData);
    // Handle form submission here
    alert("Message sent! (This is a demo)");
  };

  return (
    <section id="contact" className="py-20 bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <BlurText
            text="Let's Create Together"
            className="text-4xl md:text-5xl font-bold mb-6"
            delay={100}
            threshold={0.3}
          />
          <BlurText
            text="Ready to bring your vision to life? Let's discuss your next project"
            className="text-xl text-gray-300 max-w-2xl mx-auto"
            delay={150}
            threshold={0.3}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <AnimatedDiv direction="left" className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold mb-6">Get In Touch</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Mail className="text-gray-400" size={24} />
                  <div>
                    <p className="font-semibold">Email</p>
                    <a
                      href="mailto:amitskhanal911@gmail.com"
                      className="text-gray-300 hover:text-blue-400 cursor-pointer transition-colors duration-200"
                    >
                      amitskhanal911@gmail.com
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Phone className="text-gray-400" size={24} />
                  <div>
                    <p className="font-semibold">Phone</p>
                    <a
                      href="tel:+9779863642384"
                      className="text-gray-300 hover:text-green-400 cursor-pointer transition-colors duration-200"
                    >
                      +977-9863642384
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Follow My Work</h4>
              <div className="flex gap-4">
                <SocialLink
                  href="https://www.facebook.com/starkameet1998"
                  className="p-3 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors"
                >
                  <Facebook size={24} />
                </SocialLink>
                <SocialLink
                  href="https://www.instagram.com/kunaaaalll.k/"
                  className="p-3 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors"
                >
                  <Instagram size={24} />
                </SocialLink>
                <SocialLink
                  href="#"
                  className="p-3 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors"
                >
                  <Twitter size={24} />
                </SocialLink>
              </div>
            </div>
          </AnimatedDiv>

          <AnimatedDiv direction="right" delay={200}>
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-white transition-colors"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-white transition-colors"
                    placeholder="Doe"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-white transition-colors"
                  placeholder="john@example.com"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Project Type
                </label>
                <select
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-white transition-colors"
                >
                  <option>Wedding Photography</option>
                  <option>Corporate Event</option>
                  <option>Portrait Session</option>
                  <option>Video Production</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-white transition-colors resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>
              <HoverButton
                onClick={handleSubmit}
                className="w-full bg-white text-gray-900 py-4 rounded-lg font-medium hover:bg-gray-100 transition-colors"
              >
                Send Message
              </HoverButton>
            </div>
          </AnimatedDiv>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
