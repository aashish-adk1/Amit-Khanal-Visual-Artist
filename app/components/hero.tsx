import React, { useState, useRef, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { Camera, Video, Edit3, Mail, Phone, Instagram, Twitter, ArrowRight, Play, X } from "lucide-react";

// Blur Text Component
const BlurText = ({
  text = '',
  delay = 200,
  className = '',
  animateBy = 'words',
  direction = 'top',
  threshold = 0.1,
  rootMargin = '0px',
  animationFrom,
  animationTo,
  easing = (t) => t,
  onAnimationComplete,
  stepDuration = 0.35,
}) => {
  const elements = animateBy === 'words' ? text.split(' ') : text.split('');
  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(ref.current);
        }
      },
      { threshold, rootMargin }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  const defaultFrom = direction === 'top'
    ? { filter: 'blur(10px)', opacity: 0, y: -50 }
    : { filter: 'blur(10px)', opacity: 0, y: 50 };

  const defaultTo = [
    {
      filter: 'blur(5px)',
      opacity: 0.5,
      y: direction === 'top' ? 5 : -5,
    },
    { filter: 'blur(0px)', opacity: 1, y: 0 },
  ];

  const fromSnapshot = animationFrom ?? defaultFrom;
  const toSnapshots = animationTo ?? defaultTo;

  return (
    <p ref={ref} className={className} style={{ display: 'flex', flexWrap: 'wrap' }}>
      {elements.map((segment, index) => (
        <motion.span
          key={index}
          initial={fromSnapshot}
          animate={inView ? { filter: 'blur(0px)', opacity: 1, y: 0 } : fromSnapshot}
          transition={{
            duration: stepDuration,
            delay: (index * delay) / 1000,
            ease: "easeOut",
          }}
          style={{
            display: 'inline-block',
            willChange: 'transform, filter, opacity',
          }}
        >
          {segment === ' ' ? '\u00A0' : segment}
          {animateBy === 'words' && index < elements.length - 1 && '\u00A0'}
        </motion.span>
      ))}
    </p>
  );
};

// Count Up Component
const CountUp = ({
  to,
  from = 0,
  duration = 2,
  className = "",
  separator = "",
}) => {
  const ref = useRef(null);
  const [count, setCount] = useState(from);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(ref.current);
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    
    const startTime = Date.now();
    const startValue = from;
    const endValue = to;
    
    const updateCount = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / (duration * 1000), 1);
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);
      const currentCount = Math.floor(startValue + (endValue - startValue) * easeOutCubic);
      
      setCount(currentCount);
      
      if (progress < 1) {
        requestAnimationFrame(updateCount);
      }
    };
    
    requestAnimationFrame(updateCount);
  }, [isVisible, from, to, duration]);

  return <span ref={ref} className={className}>{count.toLocaleString()}</span>;
};

// Navigation Component
const Navigation = () => {
  const [activeSection, setActiveSection] = useState('home');
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setVisible(latest > 100);
  });

  const navItems = [
    { name: 'Home', id: 'home' },
    { name: 'About', id: 'about' },
    { name: 'Gallery', id: 'gallery' },
    { name: 'Videos', id: 'videos' },
    { name: 'Contact', id: 'contact' },
  ];

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: visible ? 0 : -100 }}
      transition={{ duration: 0.3 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200"
    >
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-2xl font-bold text-gray-900"
          >
            Alex Chen
          </motion.div>
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`transition-colors duration-200 ${
                  activeSection === item.id
                    ? 'text-gray-900 font-medium'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

// Hero Section
const HeroSection = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8"
        >
          <div className="w-32 h-32 mx-auto mb-8 rounded-full bg-gray-200 overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face"
              alt="Alex Chen"
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>
        
        <BlurText
          text="Capturing Moments, Creating Stories"
          className="text-5xl md:text-7xl font-bold text-gray-900 mb-6"
          delay={100}
          animateBy="words"
        />
        
        <BlurText
          text="Visual storyteller specializing in photography, videography, and creative editing"
          className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto"
          delay={150}
          animateBy="words"
        />

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => document.getElementById('gallery').scrollIntoView({ behavior: 'smooth' })}
            className="bg-gray-900 text-white px-8 py-4 rounded-full font-medium flex items-center gap-2 hover:bg-gray-800 transition-colors"
          >
            View My Work <ArrowRight size={20} />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
            className="border-2 border-gray-900 text-gray-900 px-8 py-4 rounded-full font-medium hover:bg-gray-900 hover:text-white transition-colors"
          >
            Get In Touch
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

// About Section
const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <BlurText
            text="About Me"
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
            delay={100}
            threshold={0.3}
          />
          <BlurText
            text="Passionate about visual storytelling and creating compelling narratives through imagery"
            className="text-xl text-gray-600 max-w-2xl mx-auto"
            delay={150}
            threshold={0.3}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <p className="text-gray-700 leading-relaxed">
              With over 8 years of experience in visual storytelling, I specialize in capturing authentic moments 
              and creating compelling narratives through photography, videography, and post-production editing.
            </p>
            <p className="text-gray-700 leading-relaxed">
              My work spans across wedding photography, corporate events, commercial projects, and artistic 
              portraits. I believe every frame tells a story, and I'm passionate about helping clients 
              preserve their most precious memories.
            </p>
            
            <div className="grid grid-cols-3 gap-8 pt-8">
              <div className="text-center">
                <CountUp to={500} className="text-3xl font-bold text-gray-900" />
                <p className="text-gray-600 mt-2">Projects</p>
              </div>
              <div className="text-center">
                <CountUp to={150} className="text-3xl font-bold text-gray-900" />
                <p className="text-gray-600 mt-2">Happy Clients</p>
              </div>
              <div className="text-center">
                <CountUp to={8} className="text-3xl font-bold text-gray-900" />
                <p className="text-gray-600 mt-2">Years Experience</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="bg-gray-50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Services</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Camera className="text-gray-600" size={24} />
                  <div>
                    <h4 className="font-semibold text-gray-900">Photography</h4>
                    <p className="text-gray-600 text-sm">Weddings, Portraits, Events, Commercial</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Video className="text-gray-600" size={24} />
                  <div>
                    <h4 className="font-semibold text-gray-900">Videography</h4>
                    <p className="text-gray-600 text-sm">Documentaries, Music Videos, Commercials</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Edit3 className="text-gray-600" size={24} />
                  <div>
                    <h4 className="font-semibold text-gray-900">Post-Production</h4>
                    <p className="text-gray-600 text-sm">Color Grading, Editing, Visual Effects</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Gallery Section
const GallerySection = () => {
  const images = [
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=600&fit=crop",
      category: "Wedding",
      title: "Elegant Wedding Ceremony"
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1494790108755-2616c668bc04?w=800&h=600&fit=crop",
      category: "Portrait",
      title: "Professional Headshot"
    },
    {
      id: 3,
      src: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=800&h=600&fit=crop",
      category: "Event",
      title: "Corporate Event"
    },
    {
      id: 4,
      src: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&h=600&fit=crop",
      category: "Wedding",
      title: "Romantic Couple"
    },
    {
      id: 5,
      src: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&h=600&fit=crop",
      category: "Portrait",
      title: "Creative Portrait"
    },
    {
      id: 6,
      src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&h=600&fit=crop",
      category: "Event",
      title: "Business Conference"
    }
  ];

  const [selectedCategory, setSelectedCategory] = useState('All');
  const categories = ['All', 'Wedding', 'Portrait', 'Event'];

  const filteredImages = selectedCategory === 'All' 
    ? images 
    : images.filter(img => img.category === selectedCategory);

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
          <div className="bg-white rounded-full p-2 shadow-lg">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full transition-all duration-300 ${
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
    </section>
  );
};

// Videos Section
const VideosSection = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  
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

// Contact Section
const ContactSection = () => {
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
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold mb-6">Get In Touch</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Mail className="text-gray-400" size={24} />
                  <div>
                    <p className="font-semibold">Email</p>
                    <p className="text-gray-300">alex@alexchen.photo</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Phone className="text-gray-400" size={24} />
                  <div>
                    <p className="font-semibold">Phone</p>
                    <p className="text-gray-300">+1 (555) 123-4567</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Follow My Work</h4>
              <div className="flex gap-4">
                <motion.a
                  href="#"
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="p-3 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors"
                >
                  <Instagram size={24} />
                </motion.a>
                <motion.a
                  href="#"
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="p-3 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors"
                >
                  <Twitter size={24} />
                </motion.a>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">First Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-white transition-colors"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Last Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-white transition-colors"
                    placeholder="Doe"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-white transition-colors"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Project Type</label>
                <select className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-white transition-colors">
                  <option>Wedding Photography</option>
                  <option>Corporate Event</option>
                  <option>Portrait Session</option>
                  <option>Video Production</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Message</label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-white transition-colors resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-white text-gray-900 py-4 rounded-lg font-medium hover:bg-gray-100 transition-colors"
              >
                Send Message
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Main Portfolio Component
const PhotographerPortfolio = () => {
  return (
    <div className="relative">
      <Navigation />
      <HeroSection />
      <AboutSection />
      <GallerySection />