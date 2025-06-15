"use client";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { X, Menu as MenuIcon } from "lucide-react";
import Link from "next/link";

export function Navbar({ className }: { className?: string }) {
  const [activeItem, setActiveItem] = useState<string>("Home");
  const [menuState, setMenuState] = useState(false);
  
  const handleNavClick = (item: string, sectionId: string) => {
    setActiveItem(item);
    setMenuState(false);
    
    // Simple navigation - just scroll to the section
    if (sectionId === 'home') {
      window.scrollTo(0, 0);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const toggleMenu = () => {
    setMenuState(!menuState);
  };

  const closeMenu = () => {
    setMenuState(false);
  };
  
  return (
    <>
      <div
        className={cn(
          "fixed top-4 inset-x-0 max-w-6xl mx-auto z-100 px-4",
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
                onClick={() => handleNavClick("Home", "home")}
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
                onClick={() => handleNavClick("About", "about")}
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
                onClick={() => handleNavClick("Gallery", "gallery")}
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
            
            <button
              onClick={() => handleNavClick("Contact", "contact")}
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
            onClick={toggleMenu}
            className="relative z-50 p-2 lg:hidden text-gray-800 hover:text-gray-600 transition-colors"
          >
            {menuState ? (
              <X className="size-6" />
            ) : (
              <MenuIcon className="size-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {menuState && (
        <div className="fixed inset-0 top-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden">
          <div 
            className="absolute inset-0" 
            onClick={closeMenu}
          ></div>
          
          {/* Menu Content */}
          <div className="fixed top-20 left-4 right-4 bg-white/98 backdrop-blur-md shadow-xl rounded-2xl border border-gray-200/30 p-8">
            <div className="flex flex-col space-y-6">
              <button
                onClick={() => handleNavClick("Home", "home")}
                className="font-medium py-3 text-lg text-left text-gray-800 hover:text-gray-600"
              >
                Home
              </button>
              
              <button
                onClick={() => handleNavClick("About", "about")}
                className="font-medium py-3 text-lg text-left text-gray-800 hover:text-gray-600"
              >
                About
              </button>
              
              <button
                onClick={() => handleNavClick("Gallery", "gallery")}
                className="font-medium py-3 text-lg text-left text-gray-800 hover:text-gray-600"
              >
                Gallery
              </button>
              
              <button
                onClick={() => handleNavClick("Contact", "contact")}
                className="px-6 py-3 rounded-full font-medium text-center text-lg bg-gray-800 text-white hover:bg-gray-700"
              >
                Contact
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
