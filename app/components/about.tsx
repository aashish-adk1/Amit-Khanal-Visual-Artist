"use client";
import { Camera, Award, Users, Heart } from "lucide-react";
import profileImg from "../assets/profile.jpg";
import Image from "next/image";

export default function AboutSection() {
  const stats = [
    { icon: Camera, number: "25+", label: "Projects Completed" },
    { icon: Award, number: "4+", label: "Years Experience" },
    { icon: Users, number: "30+", label: "Happy Clients" },
    { icon: Heart, number: "1000+", label: "Memories Captured" },
  ];

  return (
    <section id="about" className="relative py-32 bg-white overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gray-100 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gray-50 rounded-full blur-3xl opacity-40"></div>
      </div>

      <div className="relative max-w-6xl mx-auto px-6 md:px-12">
        {/* Section header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-full px-6 py-3 mb-8">
            <div className="bg-gray-900 rounded-full p-2">
              <Camera className="size-4 text-white" />
            </div>
            <span className="text-gray-900 font-medium tracking-wide">
              About Me
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-gray-900 leading-tight tracking-tight mb-6">
            Behind the
            <br />
            <span className="font-semibold bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent">
              camera
            </span>
          </h2>
        </div>

        {/* Main content grid */}
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center mb-20">
          {/* Text content */}
          <div className="space-y-8">
            <p className="text-xl md:text-2xl text-gray-600 font-light leading-relaxed">
              I&apos;m Amit Khanal, a passionate visual storyteller with over 4
              years of experience in photography and videography.
            </p>

            <p className="text-lg text-gray-600 leading-relaxed">
              My journey began with a simple fascination for capturing fleeting
              moments. Today, I specialize in wedding photography, corporate
              events, and creative portrait sessions that reveal the authentic
              essence of my subjects.
            </p>

            <p className="text-lg text-gray-600 leading-relaxed">
              Every frame tells a story, and I believe in creating images that
              not only document moments but evoke emotions and preserve memories
              for generations to come.
            </p>

            {/* CTA Button */}
            <div className="pt-4">
              <a
                href="#contact"
                className="group inline-flex items-center gap-3 bg-gray-900 hover:bg-gray-800 text-white px-8 py-4 rounded-full transition-all duration-500 hover:scale-105 hover:shadow-xl"
              >
                <span className="font-medium text-lg tracking-wide">
                  Let&apos;s Work Together
                </span>
                <div className="w-2 h-2 bg-white rounded-full group-hover:scale-150 transition-transform duration-300"></div>
              </a>
            </div>
          </div>

          {/* Image placeholder */}
          <div className="relative">
            <div className="aspect-[4/5] bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl overflow-hidden">
              <Image
                src={profileImg.src}
                alt="Amit Khanal - Photographer"
                width={400}
                height={500}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Decorative frame */}
            <div className="absolute -inset-4 border-2 border-gray-200 rounded-3xl -z-10"></div>
            <div className="absolute -inset-8 border border-gray-100 rounded-3xl -z-20"></div>
          </div>
        </div>

        {/* Stats section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="group text-center p-8 bg-white/50 backdrop-blur-sm border border-gray-200 rounded-2xl hover:bg-white hover:shadow-xl transition-all duration-500 hover:-translate-y-2"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-900 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                <stat.icon className="size-8 text-white" />
              </div>
              <div className="text-3xl md:text-4xl font-light text-gray-900 mb-2 tracking-tight">
                {stat.number}
              </div>
              <div className="text-gray-600 font-medium tracking-wide">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Minimalistic decorative elements */}
        <div className="absolute top-1/2 left-8 transform -translate-y-1/2 opacity-10">
          <div className="w-px h-32 bg-gradient-to-b from-transparent via-gray-400 to-transparent"></div>
        </div>
        <div className="absolute top-1/2 right-8 transform -translate-y-1/2 opacity-10">
          <div className="w-px h-32 bg-gradient-to-b from-transparent via-gray-400 to-transparent"></div>
        </div>
      </div>
    </section>
  );
}
