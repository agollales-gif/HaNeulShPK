import React, { useRef } from 'react';
import { motion } from 'framer-motion';

const GrandBirdMap = () => {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
      <div className="absolute top-1/2 right-[-5%] -translate-y-1/2 w-[70%] h-[60%] opacity-40">
        <svg viewBox="0 0 800 400" className="w-full h-full filter blur-[0.5px]">
          <g fill="#1a2b4b" fillOpacity="0.3">
            <circle cx="150" cy="120" r="1.5" />
            <circle cx="580" cy="110" r="1.5" />
            <motion.circle 
              cx="595" cy="125" r="7" fill="#dc2626" 
              animate={{ opacity: [0.6, 1, 0.6], scale: [1, 2, 1] }} 
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </g>
          <path 
            d="M150,120 Q350,50 595,125" 
            stroke="url(#grad1)" 
            strokeWidth="1" 
            fill="none" 
            strokeDasharray="5,5"
          />
          <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style={{ stopColor: '#1a2b4b', stopOpacity: 0 }} />
              <stop offset="100%" style={{ stopColor: '#dc2626', stopOpacity: 1 }} />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
};

const corporateMilestones = [
  { 
    id: '01', 
    name: 'Distributori i Parë Zyrtar', 
    desc: 'HaNeul shënon pikën e parë të kontaktit zyrtar për produktet Nongshim në tregun shqiptar, duke formalizuar prezencën e tregtisë së autorizuar.', 
    isNew: true 
  },
  { 
    id: '02', 
    name: 'Distributori më i Madh në Shqipëri', 
    desc: 'Zotërojmë infrastrukturën më të gjerë të furnizimit në vend, duke menaxhuar volumet parësore dhe duke garantuar mbulim strategjik kombëtar.', 
    isNew: false 
  },
  { 
    id: '03', 
    name: 'Lidership Operacional', 
    desc: 'Pozicionimi ynë si partneri kryesor i sektorit tregtar na lejon të diktojmë standardet më të larta të cilësisë dhe origjinalitetit.', 
    isNew: false 
  },
];

export default function About() {
  const containerRef = useRef(null);

  return (
    <div className="relative bg-[#fdfaf5] text-[#1a2b4b] selection:bg-red-100 overflow-x-hidden">
      
      {/* SECTION 1: HERO - Teksti majtas dhe imazhi djathtas */}
      <section className="relative h-screen flex items-center justify-center px-6 overflow-hidden pb-48">
        <GrandBirdMap />

        <div className="relative z-10 max-w-7xl w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-left"
            >
              <h4 className="text-red-600 font-sans font-bold tracking-[0.5em] uppercase text-[12px] mb-8">
                Përfaqësia Zyrtare e Nongshim
              </h4>
              <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.9] tracking-tighter text-[#1a2b4b] mb-12">
                Distributori <br /> 
                <span className="text-red-600 italic font-extralight">më i madh në Shqipëri</span>
              </h1>
              <div className="flex flex-col items-start gap-6">
                <div className="h-[1px] w-24 bg-[#1a2b4b]/40" />
                <p className="font-sans text-sm md:text-base opacity-70 uppercase tracking-[0.2em] max-w-xl leading-relaxed">
                  Pika e parë dhe kryesore e shpërndarjes së autorizuar në Republikën e Shqipërisë.
                </p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className="flex justify-center lg:justify-end"
            >
              <img 
                src="/hero.png" 
                alt="Hero" 
                className="w-full max-w-lg h-auto object-contain lg:max-w-xl"
              />
            </motion.div>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-40">
          <span className="text-[9px] uppercase tracking-[0.4em]">Profil Strategjik</span>
          <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }} className="w-[1px] h-16 bg-[#1a2b4b]" />
        </div>
      </section>

      {/* SECTION 2: MILESTONES - Rreshtimi majtas për profesionalizëm */}
      <section ref={containerRef} className="relative z-20 bg-[#fdfaf5] py-32 text-left">
        <div className="max-w-6xl mx-auto px-6">
          {corporateMilestones.map((item) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
              className="group flex flex-col md:flex-row items-baseline gap-10 md:gap-16 py-16 md:py-24 border-b border-[#1a2b4b]/10 last:border-0"
            >
              <span className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-[9rem] leading-none text-transparent group-hover:text-red-600 transition-all duration-700" 
                    style={{ WebkitTextStroke: '0.5px rgba(26, 43, 75, 0.3)' }}>
                {item.id}
              </span>
              <div className="flex-1">
                <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl mb-6 tracking-tight group-hover:text-red-600 transition-colors duration-500 text-[#1a2b4b]">
                  {item.name}
                </h2>
                <p className="font-sans text-base md:text-lg lg:text-xl opacity-60 leading-relaxed max-w-xl">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SECTION 3: VIZIONI DHE AUTORITETI */}
      <section className="py-48 bg-[#1a2b4b] text-[#fdfaf5] text-left">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
              <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl tracking-tighter mb-10 leading-none">
                Lidership i <br /> <span className="text-red-600">Konfirmuar</span>.
              </h2>
              <p className="text-xl md:text-2xl opacity-80 leading-relaxed font-light">
                HaNeul zë vendin qendror si distributori i parë që formalizoi partneritetin me Nongshim në Shqipëri. Si forca më e madhe shpërndarëse, ne integrojmë logjistikën e avancuar me integritetin e markës.
              </p>
            </motion.div>

            <div className="space-y-14">
              {[
                { title: "Mbulim Kapilar", desc: "Shtrirje e plotë në të gjithë territorin, duke furnizuar pikat kryesore të konsumit me efikasitet maksimal." },
                { title: "Partneritet Zyrtar", desc: "I vetmi entitet i autorizuar që menaxhon drejtpërdrejt importin dhe shpërndarjen e aseteve të Nongshim." },
                { title: "Standardi i Sigurisë", desc: "Certifikim dhe gjurmueshmëri e plotë për çdo produkt, duke garantuar origjinën." }
              ].map((item, i) => (
                <motion.div key={i} className="border-l-2 border-red-600 pl-10">
                  <h4 className="font-serif text-2xl md:text-3xl mb-4">{item.title}</h4>
                  <p className="opacity-50 text-base md:text-lg leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}