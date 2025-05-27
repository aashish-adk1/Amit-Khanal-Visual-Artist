"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { X, Menu as MenuIcon } from "lucide-react";
import Link from "next/link";

export function Navbar({ className }: { className?: string }) {
  const [activeItem, setActiveItem] = useState<string>("Home");
  const [menuState, setMenuState] = useState(false);
  const router = useRouter();
  
  // Scroll detection effect
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "gallery", "contact"];
      const scrollPosition = window.scrollY + 100; // Offset for better detection
      
      let currentSection = "Home"; // Default to Home
      
      for (let i = 0; i < sections.length; i++) {
        const section = sections[i];
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          
          // Check if we're in this section
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            currentSection = section.charAt(0).toUpperCase() + section.slice(1);
            break;
          }
          
          // Special handling for sections after home
          if (i > 0 && scrollPosition < offsetTop) {
            // We're above this section, so we must be in the previous one
            const prevSection = sections[i - 1];
            currentSection = prevSection.charAt(0).toUpperCase() + prevSection.slice(1);
            break;
          }
        }
      }
      
      // If we're at the very top of the page, ensure Home is active
      if (window.scrollY < 50) {
        currentSection = "Home";
      }
      
      setActiveItem(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial position

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  const handleMenuClick = (item: string, href: string) => {
    setActiveItem(item);
    setMenuState(false);
    
    // Check if it's a route navigation or section scroll
    if (href.startsWith('/')) {
      router.push(href);
    } else {
      // Handle home section specifically
      if (href === '#home') {
        // Try multiple approaches for home section
        const homeElement = document.getElementById('home') || 
                           document.querySelector('[data-section="home"]') ||
                           document.querySelector('.hero-section') ||
                           document.querySelector('main') ||
                           document.body;
        
        if (homeElement === document.body) {
          // Scroll to top if no home section found
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          homeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      } else {
        // Smooth scroll to other sections
        const sectionId = href.replace('#', '');
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          console.warn(`Section with ID "${sectionId}" not found`);
        }
      }
    }
  };
  
  return (
    <div
      className={cn(
        "fixed top-4 inset-x-0 max-w-6xl mx-auto z-50 px-4",
        className
      )}
    >
      <div className="flex items-center justify-between h-16 bg-white/95 backdrop-blur-md shadow-lg rounded-full border border-gray-200/30 px-8">
        {/* Logo Section */}
        <div className="flex-shrink-0">
          <Link
            href="/"
            aria-label="home"
            className="flex items-center space-x-2 font-bold text-gray-800"
          >
            <span className="text-xl tracking-wide">
              <span className="bg-gray-800 text-white px-2 py-1 rounded-md text-xl tracking-wider">
                K
              </span>
              UNAL
            </span>
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center space-x-8">
          <div className="flex items-center space-x-8">
            <button 
              onClick={() => handleMenuClick("Home", "#home")}
              className={cn(
                "relative text-gray-800 hover:text-gray-900 transition-colors pb-1 group",
                activeItem === "Home" && "text-gray-900"
              )}
            >
              Home
              <span className={cn(
                "absolute left-0 bottom-0 h-0.5 bg-gray-800 transition-all duration-300",
                activeItem === "Home" ? "w-full" : "w-0 group-hover:w-full"
              )}></span>
            </button>
            
            <button 
              onClick={() => handleMenuClick("About", "#about")}
              className={cn(
                "relative text-gray-800 hover:text-gray-900 transition-colors pb-1 group",
                activeItem === "About" && "text-gray-900"
              )}
            >
              About
              <span className={cn(
                "absolute left-0 bottom-0 h-0.5 bg-gray-800 transition-all duration-300",
                activeItem === "About" ? "w-full" : "w-0 group-hover:w-full"
              )}></span>
            </button>
            
            <button 
              onClick={() => handleMenuClick("Gallery", "#gallery")}
              className={cn(
                "relative text-gray-800 hover:text-gray-900 transition-colors pb-1 group",
                activeItem === "Gallery" && "text-gray-900"
              )}
            >
              Gallery
              <span className={cn(
                "absolute left-0 bottom-0 h-0.5 bg-gray-800 transition-all duration-300",
                activeItem === "Gallery" ? "w-full" : "w-0 group-hover:w-full"
              )}></span>
            </button>
          </div>
          
          {/* Separate Contact Button */}
          <button
            onClick={() => handleMenuClick("Contact", "#contact")}
            className={cn(
              "px-6 py-2 rounded-full font-medium transition-all duration-300 transform hover:scale-105",
              activeItem === "Contact" 
                ? "bg-gray-900 text-white shadow-lg" 
                : "bg-gray-800 text-white hover:bg-gray-700 hover:shadow-md"
            )}
          >
            Contact
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuState(!menuState)}
          aria-label={menuState ? 'Close Menu' : 'Open Menu'}
          className="relative z-20 p-2 lg:hidden text-gray-800 hover:text-gray-600 transition-colors"
        >
          {menuState ? (
            <X className="size-6" />
          ) : (
            <MenuIcon className="size-6" />
          )}
        </button>

        {/* Mobile Menu Overlay */}
        {menuState && (
          <div className="fixed inset-0 top-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden">
            <div className="fixed top-20 left-4 right-4 bg-white/98 backdrop-blur-md shadow-xl rounded-2xl border border-gray-200/30 p-8">
              <div className="flex flex-col space-y-6">
                <button
                  onClick={() => handleMenuClick("Home", "#home")}
                  className={cn(
                    "relative font-medium py-3 text-lg transition-colors text-left",
                    activeItem === "Home" 
                      ? "text-gray-900" 
                      : "text-gray-800 hover:text-gray-600"
                  )}
                >
                  Home
                  <span className={cn(
                    "absolute left-0 bottom-2 h-0.5 bg-gray-800 transition-all duration-300",
                    activeItem === "Home" ? "w-full" : "w-0"
                  )}></span>
                </button>
                
                <button
                  onClick={() => handleMenuClick("About", "#about")}
                  className={cn(
                    "relative font-medium py-3 text-lg transition-colors text-left",
                    activeItem === "About" 
                      ? "text-gray-900" 
                      : "text-gray-800 hover:text-gray-600"
                  )}
                >
                  About
                  <span className={cn(
                    "absolute left-0 bottom-2 h-0.5 bg-gray-800 transition-all duration-300",
                    activeItem === "About" ? "w-full" : "w-0"
                  )}></span>
                </button>
                
                <button
                  onClick={() => handleMenuClick("Gallery", "#gallery")}
                  className={cn(
                    "relative font-medium py-3 text-lg transition-colors text-left",
                    activeItem === "Gallery" 
                      ? "text-gray-900" 
                      : "text-gray-800 hover:text-gray-600"
                  )}
                >
                  Gallery
                  <span className={cn(
                    "absolute left-0 bottom-2 h-0.5 bg-gray-800 transition-all duration-300",
                    activeItem === "Gallery" ? "w-full" : "w-0"
                  )}></span>
                </button>
                
                <button
                  onClick={() => handleMenuClick("Contact", "#contact")}
                  className={cn(
                    "px-6 py-3 rounded-full font-medium text-center text-lg transition-all duration-300 transform hover:scale-105",
                    activeItem === "Contact" 
                      ? "bg-gray-900 text-white shadow-lg" 
                      : "bg-gray-800 text-white hover:bg-gray-700 hover:shadow-md"
                  )}
                >
                  Contact
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}