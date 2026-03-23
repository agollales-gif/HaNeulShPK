import { motion } from 'framer-motion';
import React from 'react';

// --- SILUETA E TELEFONIT (TEJDUKSHME & FIKSE) ---
const PhoneSilhouette = () => {
  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-5 overflow-hidden md:overflow-visible">
      <motion.svg
        viewBox="0 0 400 800"
        className="absolute right-[-10%] md:right-[-5%] top-1/2 -translate-y-1/2 w-[50%] md:w-[35%] opacity-[0.07] text-[#1a2b4b]"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 0.07, x: 0 }}
        transition={{ duration: 2, ease: "easeOut" }}
      >
        {/* Trupi i telefonit me vija më të holla */}
        <rect x="50" y="50" width="300" height="650" rx="45" stroke="currentColor" strokeWidth="1" fill="none" />
        {/* Dynamic Notch */}
        <motion.rect 
          x="150" y="80" width="100" height="20" rx="10" fill="currentColor"
          animate={{ width: [100, 120, 100] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Elementi i pulsues për realizëm */}
        <motion.circle 
          cx="200" cy="500" r="50" stroke="currentColor" strokeWidth="0.5" fill="none"
          animate={{ scale: [0.9, 1.4], opacity: [0.4, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      </motion.svg>
    </div>
  );
};

export default function Contact() {
  return (
    <div className="relative min-h-screen bg-[#fdfaf5] text-[#1a2b4b] pt-20 md:pt-40 pb-16 md:pb-32 overflow-hidden selection:bg-red-100">
      
      {/* 1. GLOBAL BACKGROUND VIDEO (E Fiksuar dhe pak më e dukshme) */}
      <div className="fixed inset-0 z-0">
        <video 
          autoPlay muted loop playsInline
          className="w-full h-full object-cover opacity-[0.10]" // Rritur nga 0.03 në 0.10
        >
          <source src="/hero_video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {/* Mjegullim i lehtë i videos për të mos vrarë tekstin */}
        <div className="absolute inset-0 bg-white/20 backdrop-blur-[1px]" />
        <PhoneSilhouette />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-center">
          
          {/* LEFT SIDE: HEADER & CONTACT INFO (Mbetet e njëjtë) */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-red-600 font-sans font-bold tracking-[0.4em] uppercase text-xs mb-6">
              HaNeul Heritage
            </p>
            <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.9] tracking-tighter text-[#1a2b4b] mb-8 md:mb-12">
              NA <br/>
              <span className="text-red-600 italic font-extralight ml-[-5px]">GJENI</span>
            </h1>
            
            <div className="space-y-12 md:space-y-16 mt-12 md:mt-20">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div>
                  <p className="font-sans text-[10px] uppercase tracking-[0.3em] opacity-70 mb-4">Inquiry Center</p>
                  <p className="font-serif text-lg md:text-xl hover:text-red-600 transition-colors">info@haneul.al</p>
                </div>
                <div>
                  <p className="font-sans text-[10px] uppercase tracking-[0.3em] opacity-70 mb-4">Haneul Connect</p>
                  <p className="font-serif text-lg md:text-xl">+44 7464 729114</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT SIDE: KOREAN-INSPIRED LOCATION CARD */}
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative h-[400px] md:h-[650px] bg-gradient-to-br from-red-50 via-white to-red-50 overflow-hidden shadow-[0_30px_60px_-15px_rgba(26,43,75,0.15)] rounded-lg"
          >
            {/* Korean-inspired border frame */}
            <div className="absolute inset-0 border-2 border-red-600/20 rounded-lg"></div>
            <div className="absolute inset-0 border border-red-600/10 rounded-md m-1"></div>
            
            {/* Decorative corner elements - Korean pattern inspired */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-red-600 rounded-tl-lg"></div>
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-red-600 rounded-tr-lg"></div>
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-red-600 rounded-bl-lg"></div>
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-red-600 rounded-br-lg"></div>
            
            {/* Traditional Korean knot pattern accents */}
            <div className="absolute top-2 left-2 w-3 h-3 bg-red-600 rounded-full opacity-80"></div>
            <div className="absolute top-2 right-2 w-3 h-3 bg-red-600 rounded-full opacity-80"></div>
            <div className="absolute bottom-2 left-2 w-3 h-3 bg-red-600 rounded-full opacity-80"></div>
            <div className="absolute bottom-2 right-2 w-3 h-3 bg-red-600 rounded-full opacity-80"></div>

            {/* Google Maps iframe with Korean frame */}
            <div className="absolute inset-4 p-1 bg-white/50 rounded border border-red-600/10">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2995.123456789!2d19.8187!3d41.3275!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDHCsDE5JzQzLjAiTiAxOcKwNDknMTEuMCJF!5e0!3m2!1sen!2s!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full rounded"
              />
            </div>

            {/* Korean-style location label */}
            <div className="absolute top-6 right-6 bg-red-600 text-white px-4 py-2 rounded-full shadow-lg">
              <div className="flex items-center gap-2">
                <span className="font-serif text-lg">하늘</span>
                <div className="w-px h-4 bg-white/30"></div>
                <span className="font-sans text-xs uppercase tracking-[0.2em] font-bold">Tirana</span>
              </div>
            </div>

            {/* Korean-inspired launch button */}
            <motion.a 
                href="https://maps.app.goo.gl/gWQM5q6JCZXBCijk6" 
                target="_blank"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="absolute bottom-6 left-6 bg-red-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-red-700 transition-all duration-300 font-sans text-xs uppercase tracking-[0.3em] font-bold border border-red-700"
            >
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Harta e Plotë
                </span>
            </motion.a>

            {/* Traditional Korean pattern overlay */}
            <div className="absolute inset-0 pointer-events-none opacity-5">
              <div className="absolute top-1/4 left-1/4 w-32 h-32 border-4 border-red-600 rounded-full"></div>
              <div className="absolute bottom-1/4 right-1/4 w-24 h-24 border-4 border-red-600 rounded-full"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-red-600 font-serif text-6xl opacity-20">
                辛
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}