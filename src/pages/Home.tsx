import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';

function Counter({ from, to }: { from: number; to: number }) {
  const [count, setCount] = useState(from);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !isVisible) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;
    const steps = 30;
    const increment = (to - from) / steps;
    let current = from;
    const timer = setInterval(() => {
      current += increment;
      if (current >= to) { setCount(to); clearInterval(timer); }
      else setCount(Math.floor(current));
    }, 2000 / steps);
    return () => clearInterval(timer);
  }, [from, to, isVisible]);

  return <span ref={ref}>{count}</span>;
}

function HomeProductCard({ product, index }: { product: { name: string; detail: string; image: string; id: string }; index: number; key?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setHasAnimated(true); observer.disconnect(); } },
      { rootMargin: '-5%' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`flex items-center gap-4 sm:gap-6 md:gap-10 py-10 md:py-16 border-b border-[#1a2b4b]/5 last:border-0 transition-all duration-500 ${hasAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* Image */}
      <div className="w-2/5 sm:w-1/3 lg:w-1/2 flex justify-center shrink-0">
        <div className="relative w-full aspect-[4/5] flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-br from-red-50 via-white to-red-50 rounded-lg" />
          <div className="absolute inset-0 border-2 border-red-600/20 rounded-lg" />
          <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-red-600 rounded-tl-lg" />
          <div className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-red-600 rounded-tr-lg" />
          <div className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-red-600 rounded-bl-lg" />
          <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-red-600 rounded-br-lg" />
          <div className="relative w-full h-full flex items-center justify-center p-3">
            <img
              src={product.image}
              alt={product.name}
              className="h-full object-contain rounded shadow-[0_10px_30px_rgba(26,43,75,0.12)] bg-white/50"
              loading="lazy"
              decoding="async"
              width="200"
              height="250"
            />
          </div>
        </div>
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 md:gap-3 mb-3">
          <span className="h-[1px] w-5 md:w-8 bg-red-600 shrink-0" />
          <span className="font-sans text-[9px] md:text-xs uppercase tracking-[0.25em] text-red-600 font-bold truncate">
            {product.detail}
          </span>
        </div>
        <h3 className="font-serif text-xl sm:text-2xl md:text-3xl lg:text-5xl tracking-tighter text-[#1a2b4b] leading-tight mb-4 md:mb-6">
          {product.name}
        </h3>
        <Link
          to={`/products/${product.id}`}
          aria-label={`Shiko Detajet - ${product.name}`}
          className="inline-block border-b-2 border-red-600 pb-1 font-bold uppercase tracking-[0.25em] text-[9px] md:text-xs hover:text-red-600 transition-colors"
        >
          Shiko Detajet
        </Link>
      </div>
    </div>
  );
}

function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    // Play only after page is interactive to avoid blocking LCP
    const play = () => v.play().catch(() => {});
    if (document.readyState === 'complete') {
      play();
    } else {
      window.addEventListener('load', play, { once: true });
    }
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full -z-10 overflow-hidden">
      {/* Poster image shown immediately — also the LCP candidate */}
      <picture>
        <source srcSet="/hero.avif" type="image/avif" />
        <source srcSet="/hero.webp" type="image/webp" />
        <img
          src="/hero.png"
          alt="HaNeul - Produktet Premium Koreane"
          fetchPriority="high"
          loading="eager"
          decoding="sync"
          className="absolute inset-0 w-full h-full object-cover"
          width="560"
          height="315"
        />
      </picture>
      {/* Video plays on top once loaded — muted/autoplay/playsInline required for mobile */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        src="/hero_video.mp4"
        muted
        loop
        playsInline
        preload="none"
        aria-hidden="true"
      />
    </div>
  );
}

export default function Home() {
  const pastMarkets = [
    { id: "01", title: "America", desc: "Prani e fuqishme në tregun e Amerikës së Veriut." },
    { id: "02", title: "Europe", desc: "Zgjerimi në metropolet kryesore evropiane." },
    { id: "03", title: "China", desc: "Një nga tregjet më të mëdha aziatike për Nongshim." },
    { id: "04", title: "Japan", desc: "Cilësi dhe shije e certifikuar në tregun japonez." },
    { id: "05", title: "Australia", desc: "Zgjerim i suksesshëm në kontinentin e largët." },
    { id: "06", title: "Vietnam", desc: "Lider në rritje në tregun e Azisë Juglindore." },
  ];

  return (
    <div className="relative bg-[#fdfaf5] text-[#1a2b4b] selection:bg-red-600 selection:text-white">

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden z-10 pt-20 lg:pt-32">
        <HeroVideo />
        {/* Overlay */}
        <div className="absolute inset-0 bg-[#fdfaf5]/75 -z-10" />

        <div className="px-5 sm:px-8 max-w-7xl mx-auto w-full relative z-20">
          <div className="max-w-2xl">
            <span className="text-red-600 font-bold tracking-[0.4em] uppercase text-[10px] sm:text-xs mb-4 sm:mb-6 block">
              Distributori Zyrtar
            </span>
            <h1 className="font-serif text-4xl sm:text-6xl md:text-8xl lg:text-9xl leading-[0.85] tracking-tighter mb-5 sm:mb-8">
              Eleganca e <br />
              <span className="italic font-extralight text-red-600">traditës</span> koreane.
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-[#1a2b4b]/80 mb-7 sm:mb-10 max-w-md leading-relaxed font-light">
              HaNeul - Qielli Juaj i Shijes. Eksploroni gamën tonë të produkteve premium.
            </p>
            <Link
              to="/products"
              className="bg-[#1a2b4b] text-white px-8 sm:px-12 py-4 sm:py-5 rounded-full font-bold shadow-2xl hover:bg-red-600 transition-all duration-500 uppercase text-[10px] sm:text-xs tracking-widest inline-block"
            >
              Shiko Katalogun
            </Link>
          </div>
        </div>
      </section>

      {/* ── TANI NË SHQIPËRI ── */}
      <section className="relative py-24 sm:py-40 bg-[#1a2b4b] text-white z-10 overflow-hidden">
        {/* Ambient glows */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-600/8 blur-[160px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-red-600/5 blur-[140px] rounded-full pointer-events-none" />

        <div className="max-w-6xl mx-auto px-5 sm:px-8">

          {/* Header */}
          <div className="text-center mb-20 sm:mb-32">
            <span className="text-red-600 font-bold tracking-[0.5em] uppercase text-xs sm:text-sm mb-5 block">Destinacioni i Ri</span>
            <h2 className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-[9rem] tracking-tighter leading-[0.9] mb-8">
              Tani në <br /> <span className="text-red-600 italic font-extralight">Shqipëri.</span>
            </h2>
            <div className="w-16 h-[1px] bg-red-600 mx-auto mb-8" />
            <p className="max-w-lg mx-auto text-sm sm:text-base md:text-lg text-white/70 font-light leading-relaxed">
              Pas një suksesi të jashtëzakonshëm në tregjet botërore, HaNeul sjell zyrtarisht
              standardin më të lartë të produkteve koreane për konsumatorin shqiptar.
            </p>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Center line */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent -translate-x-1/2" />

            <div className="space-y-0">
              {pastMarkets.map((item, index) => {
                const isRight = index % 2 === 0;
                return (
                  <div key={item.id} className="relative group">
                    {/* Desktop layout */}
                    <div className="hidden md:flex items-center min-h-[120px]">
                      {/* Left half */}
                      <div className="w-1/2 pr-16 flex justify-end">
                        {!isRight && (
                          <div className="text-right max-w-xs py-8 opacity-50 group-hover:opacity-100 transition-all duration-500">
                            <span className="font-serif text-5xl text-white/20 block leading-none mb-2">{item.id}</span>
                            <h3 className="font-serif text-2xl md:text-3xl mb-2 group-hover:text-red-400 transition-colors duration-500">{item.title}</h3>
                            <p className="text-white/60 text-sm font-light leading-relaxed">{item.desc}</p>
                          </div>
                        )}
                      </div>

                      {/* Center dot */}
                      <div className="absolute left-1/2 -translate-x-1/2 z-10">
                        <div className="w-3 h-3 bg-white/20 rounded-full border border-white/30 group-hover:bg-red-600 group-hover:border-red-600 group-hover:scale-150 transition-all duration-500" />
                      </div>

                      {/* Right half */}
                      <div className="w-1/2 pl-16 flex justify-start">
                        {isRight && (
                          <div className="text-left max-w-xs py-8 opacity-50 group-hover:opacity-100 transition-all duration-500">
                            <span className="font-serif text-5xl text-white/20 block leading-none mb-2">{item.id}</span>
                            <h3 className="font-serif text-2xl md:text-3xl mb-2 group-hover:text-red-400 transition-colors duration-500">{item.title}</h3>
                            <p className="text-white/60 text-sm font-light leading-relaxed">{item.desc}</p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Mobile layout */}
                    <div className="md:hidden flex items-start gap-5 py-6 border-b border-white/5 last:border-0">
                      <div className="flex flex-col items-center gap-2 pt-1">
                        <div className="w-2 h-2 bg-red-600 rounded-full shrink-0" />
                        <div className="w-px flex-1 bg-white/10" />
                      </div>
                      <div className="pb-2">
                        <span className="font-serif text-3xl text-white/20 block leading-none mb-1">{item.id}</span>
                        <h3 className="font-serif text-xl mb-1">{item.title}</h3>
                        <p className="text-white/60 text-sm font-light">{item.desc}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── GAMA PREMIUM ── */}
      <section className="py-16 sm:py-24 md:py-40 bg-transparent z-10 relative">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-12">
          <div className="flex flex-col items-center text-center mb-12 sm:mb-20 gap-5">
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-8xl tracking-tighter leading-none">
              Gama <br /> <span className="text-red-600">Premium.</span>
            </h2>
            <Link to="/products" className="border-b-2 border-red-600 pb-1 font-bold uppercase tracking-[0.3em] text-xs hover:text-red-600 transition-colors">
              Eksploro të gjitha
            </Link>
          </div>
          <div>
            {[
              { name: "Shin Ramyun Original", detail: "Supa ikonike pikante", image: "/shin_ramuyn/shin_ramuyn(2).jpeg", id: "shin-ramyun" },
              { name: "Shin Ramyun Toomba", detail: "Kremoze & Stir-fry", image: "/Shin_Ramun_tomba/Shin_Ramun_tomba.jpeg", id: "shin-toomba" },
              { name: "Shrimp Crackers", detail: "Shije Oqeani & Pikante", image: "/Sgin_Crackers/Sgin_Crackers.jpeg", id: "shrimp-crackers" }
            ].map((item, i) => (
              <HomeProductCard product={item} index={i} key={item.id} />
            ))}
          </div>
        </div>
      </section>

      {/* ── LIDER GLOBAL ── */}
      <section className="py-20 sm:py-32 md:py-48 bg-white/80 backdrop-blur-md z-10 relative">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center">
            <div>
              <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tighter mb-4 sm:mb-6 text-red-600">Lider Global.</h2>
              <p className="text-base sm:text-lg md:text-xl text-[#1a2b4b]/80 font-light leading-relaxed">
                Ekskluzivitet i garantuar dhe cilësi e certifikuar për tregun shqiptar.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-8 sm:gap-12">
              <div>
                <div className="font-serif text-5xl sm:text-7xl md:text-8xl text-[#1a2b4b] mb-2">2.8B</div>
                <span className="text-[10px] uppercase tracking-[0.3em] text-[#1a2b4b]">Shitje Ndërkombëtare / Vit</span>
              </div>
              <div>
                <div className="font-serif text-5xl sm:text-7xl md:text-8xl text-red-600 mb-2">
                  <Counter from={0} to={12} />
                </div>
                <span className="text-[10px] uppercase tracking-[0.3em] text-[#1a2b4b]">Muaj Afatzgjatësi</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-32 sm:py-48 bg-[#1a2b4b] text-white text-center relative overflow-hidden z-10">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 relative z-10">
          <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-9xl tracking-tighter mb-8 sm:mb-12">Gati për HaNeul?</h2>
          <Link
            to="/contact"
            className="bg-red-600 text-white px-10 sm:px-16 py-5 sm:py-7 rounded-full font-bold uppercase tracking-[0.3em] text-xs hover:bg-white hover:text-red-600 transition-all duration-700 shadow-2xl inline-block"
          >
            Na Kontaktoni Sot
          </Link>
        </div>
      </section>
    </div>
  );
}
