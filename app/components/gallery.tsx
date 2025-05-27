"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X, ChevronLeft, ChevronRight } from 'lucide-react';

// BlurText component for animations - fixed to handle direct navigation
type BlurTextProps = {
  text: string;
  className?: string;
  delay?: number;
  threshold?: number;
};

const BlurText = ({ text, className, delay = 0, threshold = 0.3 }: BlurTextProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animation on mount with a small delay
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <motion.div
      initial={{ opacity: 0, filter: 'blur(10px)' }}
      animate={isVisible ? { opacity: 1, filter: 'blur(0px)' } : {}}
      whileInView={{ opacity: 1, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: `-${threshold * 100}%` }}
      transition={{ duration: 0.6 }}
      className={className}
    >
      {text}
    </motion.div>
  );
};

// Lightbox component for fullscreen image viewing
type LightboxProps = {
  images: Array<{
    id: number;
    src: string;
    category: string;
    title: string;
    description?: string;
  }>;
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
};

const Lightbox = ({ images, currentIndex, onClose, onNext, onPrev }: LightboxProps) => {
  const currentImage = images[currentIndex];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [onClose, onNext, onPrev]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 backdrop-blur-xl z-50 flex items-center justify-center"
      style={{
        background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.8) 80%)'
      }}
      onClick={onClose}
    >
      {/* Navigation buttons */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors backdrop-blur-sm text-white z-10"
      >
        <ChevronLeft size={24} />
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors backdrop-blur-sm text-white z-10"
      >
        <ChevronRight size={24} />
      </button>

      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors backdrop-blur-sm text-white z-10"
      >
        <X size={24} />
      </button>

      {/* Image container */}
      <motion.div
        key={currentIndex}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="relative w-full h-full flex items-center justify-center p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Main image with 80% coverage and curved edges */}
        <div className="relative w-4/5 h-4/5 max-w-5xl">
          <img
            src={currentImage.src}
            alt={currentImage.title}
            className="w-full h-full object-cover rounded-3xl shadow-2xl"
          />
          
          {/* Image info overlay - inside the photo */}
          <div className="absolute bottom-6 left-6 text-white z-10">
            <h3 className="text-2xl font-semibold mb-2 drop-shadow-lg">{currentImage.title}</h3>
            <p className="text-white/90 text-sm drop-shadow-md">{currentImage.category}</p>
            {currentImage.description && (
              <p className="text-white/80 text-sm mt-1 max-w-md drop-shadow-md">{currentImage.description}</p>
            )}
          </div>

          {/* Image counter - inside the photo */}
          <div className="absolute bottom-6 right-6 text-white/80 text-sm z-10 drop-shadow-md">
            {currentIndex + 1} / {images.length}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Videos Section
type VideoType = {
  id: number;
  thumbnail: string;
  title: string;
  duration: string;
  category: string;
};

// Gallery Section
const GallerySection = () => {
  const images = [
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=600&fit=crop",
      category: "Wedding",
      title: "Elegant Wedding Ceremony",
      description: "A beautiful outdoor ceremony captured during golden hour with natural lighting"
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1494790108755-2616c668bc04?w=800&h=600&fit=crop",
      category: "Portrait",
      title: "Professional Headshot",
      description: "Studio portrait session with dramatic lighting and professional styling"
    },
    {
      id: 3,
      src: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=800&h=600&fit=crop",
      category: "Event",
      title: "Corporate Event",
      description: "Annual company conference documenting key moments and networking"
    },
    {
      id: 4,
      src: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&h=600&fit=crop",
      category: "Wedding",
      title: "Romantic Couple",
      description: "Intimate engagement session in a natural outdoor setting"
    },
    {
      id: 5,
      src: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&h=600&fit=crop",
      category: "Portrait",
      title: "Creative Portrait",
      description: "Artistic portrait exploring creative lighting and composition techniques"
    },
    {
      id: 6,
      src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&h=600&fit=crop",
      category: "Event",
      title: "Business Conference",
      description: "Professional event photography capturing speakers and audience engagement"
    }
  ];

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const categories = ['All', 'Wedding', 'Portrait', 'Event'];

  const filteredImages = selectedCategory === 'All' 
    ? images 
    : images.filter(img => img.category === selectedCategory);

  const openLightbox = (imageId: number) => {
    const index = filteredImages.findIndex(img => img.id === imageId);
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const nextImage = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filteredImages.length);
    }
  };

  const prevImage = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex(lightboxIndex === 0 ? filteredImages.length - 1 : lightboxIndex - 1);
    }
  };

  return (
    <section id="gallery" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <BlurText
            text="Gallery"
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
            delay={100}
            threshold={0.3}
          />
          <BlurText
            text="A collection of my favorite captures and creative projects"
            className="text-xl text-gray-600 max-w-2xl mx-auto mb-8"
            delay={150}
            threshold={0.3}
          />
        </div>

        <div className="flex justify-center mb-12">
          <div className="bg-white rounded-full p-1.5 shadow-lg">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 py-1.5 sm:px-6 sm:py-2 rounded-full transition-all duration-300 text-sm sm:text-base ${
                  selectedCategory === category
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {filteredImages.map((image, index) => (
              <motion.div
                key={image.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -10 }}
                className="group relative overflow-hidden rounded-2xl bg-white shadow-lg cursor-pointer"
                onClick={() => openLightbox(image.id)}
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={image.src}
                    alt={image.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-4 left-4 right-4 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 opacity-0 group-hover:opacity-100">
                  <h3 className="font-semibold text-lg">{image.title}</h3>
                  <p className="text-sm text-gray-200">{image.category}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            images={filteredImages}
            currentIndex={lightboxIndex}
            onClose={closeLightbox}
            onNext={nextImage}
            onPrev={prevImage}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

// Videos Section
const VideosSection = () => {
  const [selectedVideo, setSelectedVideo] = useState<VideoType | null>(null);
  
  const videos = [
    {
      id: 1,
      thumbnail: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&h=450&fit=crop",
      title: "Wedding Highlight Reel",
      duration: "3:45",
      category: "Wedding"
    },
    {
      id: 2,
      thumbnail: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=450&fit=crop",
      title: "Corporate Brand Video",
      duration: "2:30",
      category: "Commercial"
    },
    {
      id: 3,
      thumbnail: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=450&fit=crop",
      title: "Music Video Production",
      duration: "4:20",
      category: "Music"
    }
  ];

  return (
    <section id="videos" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <BlurText
            text="Video Portfolio"
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
            delay={100}
            threshold={0.3}
          />
          <BlurText
            text="Motion pictures that tell compelling stories and evoke emotions"
            className="text-xl text-gray-600 max-w-2xl mx-auto"
            delay={150}
            threshold={0.3}
          />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ y: -10 }}
              className="group relative overflow-hidden rounded-2xl bg-gray-100 cursor-pointer"
              onClick={() => setSelectedVideo(video)}
            >
              <div className="aspect-video relative">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-300" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center backdrop-blur-sm"
                  >
                    <Play className="text-gray-900 ml-1" size={24} />
                  </motion.div>
                </div>
                <div className="absolute top-4 right-4 bg-black/60 text-white px-2 py-1 rounded text-sm">
                  {video.duration}
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-semibold text-xl text-gray-900 mb-2">{video.title}</h3>
                <p className="text-gray-600">{video.category}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedVideo(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white rounded-2xl p-6 max-w-4xl w-full"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold text-gray-900">{selectedVideo.title}</h3>
                <button
                  onClick={() => setSelectedVideo(null)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
              <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                <p className="text-gray-600">Video player would be embedded here</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

// Main component that renders both sections
export default function Portfolio() {
  return (
    <div className="min-h-screen bg-white">
      <GallerySection />
      <VideosSection />
    </div>
  );
}