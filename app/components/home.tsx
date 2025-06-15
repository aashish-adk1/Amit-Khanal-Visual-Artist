"use client";
import { Camera, Aperture } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Navbar } from "./navbar";

export default function HomeSection() {
  return (
    <>
      {/* Full screen background image with enhanced overlay - now min-h-screen */}
      <div className="relative w-full min-h-screen">
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/34/BA1yLjNnQCI1yisIZGEi_2013-07-16_1922_IMG_9873.jpg")',
            backgroundSize: "cover",
            backgroundPosition: "center center",
            minHeight: "100vh"
          }}
        ></div>
        {/* Enhanced gradient overlay for better aesthetics */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/20 to-transparent"></div>

        <header className="relative z-10">
          <Navbar />
        </header>
        
        <main className="relative z-10 flex items-center min-h-screen">
          <section className="relative w-full">
            <div className="relative py-16 sm:py-24 md:py-32 lg:py-40">
              <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-12">
                <div className="text-center sm:mx-auto lg:mx-auto max-w-4xl">
                  
                  {/* Enhanced badge - smaller on mobile */}
                  <div className="inline-flex items-center gap-2 sm:gap-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 sm:px-6 sm:py-3 mb-8 sm:mb-12">
                    <div className="bg-white/20 backdrop-blur-sm rounded-full p-1.5 sm:p-2">
                      <Aperture className="size-3 sm:size-4 text-white" />
                    </div>
                    <span className="text-white font-medium tracking-wide text-sm sm:text-base">Amit Khanal</span>
                    <div className="w-px h-4 sm:h-5 bg-white/30"></div>
                    <span className="text-white/80 text-xs sm:text-sm">Visual Artist</span>
                  </div>

                  {/* Enhanced typography - much smaller on mobile */}
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light text-white leading-tight tracking-tight mb-6 sm:mb-8">
                    Capturing life through
                    <br />
                    <span className="font-semibold bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
                      the lens
                    </span>
                    <br />
                    <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-white/90 font-extralight">
                      One frame at a time
                    </span>
                  </h1>

                  {/* Enhanced description - smaller on mobile */}
                  <p className="mx-auto max-w-2xl text-base sm:text-lg md:text-xl lg:text-2xl text-white/85 font-light leading-relaxed mb-12 sm:mb-16 tracking-wide px-2 sm:px-0">
                    Passionate photographer and videographer crafting
                    <br className="hidden sm:block" />
                    cinematic memories that last forever
                  </p>

                  {/* Enhanced CTA button - smaller on mobile */}
                  <div className="flex justify-center mb-16 sm:mb-0">
                    <Button 
                      size="lg" 
                      asChild
                      className="group relative overflow-hidden"
                    >
                      <a
                        href="#gallery"
                        className="bg-white/15 backdrop-blur-md hover:bg-white/25 border-2 border-white/30 hover:border-white/50 rounded-full px-6 py-3 sm:px-8 sm:py-4 flex items-center gap-2 sm:gap-3 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-white/20"
                      >
                        <Camera className="size-4 sm:size-5 text-white group-hover:rotate-12 transition-transform duration-300" />
                        <span className="text-white font-medium text-base sm:text-lg tracking-wide">
                          View My Work
                        </span>
                        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      </a>
                    </Button>
                  </div>
                </div>

                {/* Minimalistic decorative elements - hidden on small screens */}
                <div className="absolute top-1/2 left-8 transform -translate-y-1/2 opacity-20 hidden md:block">
                  <div className="w-px h-32 bg-gradient-to-b from-transparent via-white to-transparent"></div>
                </div>
                <div className="absolute top-1/2 right-8 transform -translate-y-1/2 opacity-20 hidden md:block">
                  <div className="w-px h-32 bg-gradient-to-b from-transparent via-white to-transparent"></div>
                </div>
                
                {/* Bottom fade indicator - hidden on mobile, visible on larger screens */}
                <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 hidden sm:block">
                  <div className="flex flex-col items-center gap-1 sm:gap-2 opacity-60">
                    <div className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-white/40 rounded-full flex justify-center">
                      <div className="w-1 h-2 sm:h-3 bg-white/60 rounded-full mt-1.5 sm:mt-2 animate-bounce"></div>
                    </div>
                    <span className="text-white/60 text-xs uppercase tracking-widest">Scroll</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
