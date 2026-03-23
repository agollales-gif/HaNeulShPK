import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';

function Counter({ from, to }) {
  const [count, setCount] = useState(from);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (isVisible) {
      const duration = 2000;
      const steps = 30;
      const increment = (to - from) / steps;
      let current = from;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= to) {
          setCount(to);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [from, to, isVisible]);

  return <span ref={ref}>{count}</span>;
}

function HomeProductCard({ product, index }: { product: any, index: number; key?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setHasAnimated(true); observer.disconnect(); } },
      { rootMargin: '-10%' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`flex items-center gap-6 md:gap-10 py-12 md:py-16 border-b border-[#1a2b4b]/5 last:border-0 transition-all duration-400 ${hasAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="w-2/5 lg:w-1/2 flex justify-center">
        <div className="relative w-full aspect-[4/5] flex items-center justify-center p-1">
          <div className="absolute inset-0 bg-gradient-to-br from-red-50 via-white to-red-50 rounded-lg opacity-60"></div>
          <div className="absolute inset-0 border-2 border-red-600/20 rounded-lg"></div>
          <div className="absolute inset-0 border border-red-600/10 rounded-md m-1"></div>
          
          <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-red-600 rounded-tl-lg"></div>
          <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-red-600 rounded-tr-lg"></div>
          <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-red-600 rounded-bl-lg"></div>
          <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-red-600 rounded-br-lg"></div>
          
          <div className="absolute top-2 left-2 w-2 h-2 bg-red-600 rounded-full opacity-80"></div>
          <div className="absolute top-2 right-2 w-2 h-2 bg-red-600 rounded-full opacity-80"></div>
          <div className="absolute bottom-2 left-2 w-2 h-2 bg-red-600 rounded-full opacity-80"></div>
          <div className="absolute bottom-2 right-2 w-2 h-2 bg-red-600 rounded-full opacity-80"></div>
          
          <div className="relative w-full h-full flex items-center justify-center p-2">
            <div className="absolute top-2 right-2 text-[#1a2b4b]/5 font-serif text-xl md:text-3xl lg:text-4xl pointer-events-none">
              辛
            </div>
            <img 
              src={product.image} 
              alt={product.name} 
              className="h-full object-contain rounded shadow-[0_20px_40px_rgba(26,43,75,0.15)] border border-red-600/10 bg-white/50" 
              loading="lazy"
              decoding="async"
              width="200"
              height="250"
            />
          </div>
        </div>
      </div>

      <div className="w-3/5 lg:w-1/2 flex items-center justify-center">
        <div
          className={`space-y-4 md:space-y-6 max-w-xs md:max-w-lg transition-all duration-400 ${hasAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          style={{ transitionDelay: `${index * 100 + 100}ms` }}
        >
          <div className="flex items-center gap-2 md:gap-4">
            <span className="h-[1px] w-6 md:w-8 lg:w-12 bg-red-600" />
            <span className="font-sans text-[8px] md:text-xs uppercase tracking-[0.3em] text-red-600 font-bold">
              {product.detail}
            </span>
          </div>
          
          <h3 className="font-serif text-2xl md:text-3xl lg:text-5xl tracking-tighter text-[#1a2b4b] leading-tight">{product.name}</h3>
          
          <Link 
            to={`/products/${product.id}`}
            aria-label={`Shiko Detajet - ${product.name}`}
            className="inline-block border-b-2 border-red-600 pb-1 md:pb-2 font-bold uppercase tracking-[0.3em] text-[8px] md:text-xs hover:text-red-600 transition-all mt-4 md:mt-6"
          >
            Shiko Detajet
          </Link>
        </div>
      </div>
    </div>
  );
}

function HeroBackgroundVideo() {
  return (
    <div 
      className="absolute inset-0 w-full h-full -z-10"
      style={{ contain: 'layout style paint' }}
    >
      <picture>
        <source srcSet="/hero.webp" type="image/webp" />
        <img
          src="/hero.png"
          alt=""
          aria-hidden="true"
          fetchPriority="high"
          loading="eager"
          decoding="sync"
          className="w-full h-full object-cover"
          width="560"
          height="315"
        />
      </picture>
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
      
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden z-10 pt-24 lg:pt-32">
        {/* Optimized Background Video */}
        <HeroBackgroundVideo />
        
        {/* Overlay to ensure text readability */}
        <div className="absolute inset-0 bg-[#fdfaf5]/80 -z-10" />
        
        <div className="px-6 max-w-7xl mx-auto w-full relative z-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 text-left">
              <span className="text-red-600 font-bold tracking-[0.4em] uppercase text-xs mb-6 block animate-fade-in">Distributori Zyrtar</span>
              <h1 className="font-serif text-5xl sm:text-6xl md:text-8xl lg:text-9xl leading-[0.8] tracking-tighter mb-6 sm:mb-8 animate-fade-in">
                Eleganca e <br /> <span className="italic font-extralight text-red-600">traditës</span> koreane.
              </h1>
              <p className="text-lg sm:text-xl opacity-70 mb-8 sm:mb-10 max-w-lg leading-relaxed font-light animate-fade-in">
                HaNeul - Qielli Juaj i Shijes. Eksploroni gamën tonë të produkteve premium.
              </p>
              <Link 
                to="/products"
                className="bg-[#1a2b4b] text-white px-8 sm:px-12 py-4 sm:py-5 rounded-full font-bold shadow-2xl hover:bg-red-600 transition-all duration-500 uppercase text-xs tracking-widest inline-block animate-fade-in"
              >
                 Shiko Katalogun
              </Link>
            </div>
            <div className="lg:col-span-5" />
          </div>
        </div>
      </section>

      <section className="relative py-48 bg-[#1a2b4b] text-white z-10 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 blur-[150px] rounded-full" />
        
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col items-center text-center mb-32">
            <div className="inline-block">
              <span className="text-red-600 font-bold tracking-[0.5em] uppercase text-sm mb-4 block">Destinacioni i Ri</span>
              <h2 className="font-serif text-4xl sm:text-5xl md:text-7xl lg:text-[10rem] tracking-tighter leading-none mb-6 sm:mb-8">
                Tani në <br /> <span className="text-red-600 italic">Shqipëri.</span>
              </h2>
              <p className="max-w-2xl text-base sm:text-lg md:text-xl text-white/80 font-light leading-relaxed">
                Pas një suksesi të jashtëzakonshëm në tregjet botërore, HaNeul sjell zyrtarisht 
                standardin më të lartë të produkteve koreane për konsumatorin shqiptar.
              </p>
            </div>
          </div>

          <div className="relative mt-20 px-6 sm:px-8 md:px-12">
            <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-white/10 -translate-x-1/2" />
            
            <div className="space-y-24 sm:space-y-32">
              <div className="relative flex items-center justify-center">
                 <div className="absolute left-1/2 w-14 h-14 bg-red-600/20 border-2 border-red-600 rounded-full -translate-x-1/2 z-20 animate-pulse flex items-center justify-center">
                    <div className="w-4 h-4 bg-red-600 rounded-full" />
                 </div>
              </div>

              {pastMarkets.map((item, index) => (
                <div
                  key={item.id}
                  className={`relative flex items-center justify-between w-full transition-all duration-400 ${index % 2 === 0 ? "flex-row-reverse" : "flex-row"}`}
                >
                  <div className="w-full md:w-[42%] pl-12 md:pl-0 pr-0 md:pr-0 opacity-60 hover:opacity-100 transition-opacity duration-500">
                    <div className={index % 2 === 0 ? "text-right" : "text-left"}>
                      <span className="font-serif text-4xl block mb-2 text-white/40" aria-hidden="true">{item.id}</span>
                      <h3 className="font-serif text-3xl mb-3">{item.title}</h3>
                      <p className="text-white/70 text-base font-light">{item.desc}</p>
                    </div>
                  </div>
                  <div className="absolute left-1/2 w-8 h-8 bg-[#1a2b4b] border border-white/20 rounded-full -translate-x-1/2 z-10 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 bg-white/20 rounded-full" />
                  </div>
                  <div className="hidden md:block w-[42%]" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 md:py-48 bg-transparent z-10 relative">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
            <div className="flex flex-col items-center text-center mb-16 md:mb-24 gap-8">
                <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-8xl tracking-tighter leading-none text-center">
                  Gama <br /> <span className="text-red-600">Premium.</span>
                </h2>
                <Link to="/products" className="border-b-2 border-red-600 pb-2 font-bold uppercase tracking-[0.3em] text-xs hover:text-red-600 transition-all text-center">
                  Eksploro të gjitha
                </Link>
            </div>
            <div className="space-y-0">
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

      <section className="py-48 bg-white/80 backdrop-blur-md z-10 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
            <div>
              <h2 className="font-serif text-4xl sm:text-5xl md:text-7xl lg:text-8xl tracking-tighter mb-6 sm:mb-8 text-red-600">Lider Global.</h2>
              <p className="text-base sm:text-lg md:text-xl opacity-80 font-light leading-relaxed">Ekskluzivitet i garantuar dhe cilësi e certifikuar për tregun shqiptar.</p>
            </div>
            <div className="grid grid-cols-2 gap-12">
                <div>
                  <div className="font-serif text-8xl text-[#1a2b4b] mb-2">2.8B</div>
                  <span className="text-[10px] uppercase tracking-[0.4em] text-[#1a2b4b]/80">Shitje Ndërkombëtare / Vit</span>
                </div>
                <div>
                  <div className="font-serif text-8xl text-red-600 mb-2"><Counter from={0} to={12} /></div>
                  <span className="text-[10px] uppercase tracking-[0.4em] text-[#1a2b4b]/80">Muaj Afatzgjatësi</span>
                </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-60 bg-[#1a2b4b] text-white text-center relative overflow-hidden z-10">
        <div className="max-w-4xl mx-auto px-6 relative z-10">
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-9xl tracking-tighter mb-8 sm:mb-12">Gati për HaNeul?</h2>
            <Link 
                to="/contact"
                className="bg-red-600 text-white px-12 sm:px-16 py-5 sm:py-7 rounded-full font-bold uppercase tracking-[0.3em] text-xs hover:bg-white hover:text-red-600 transition-all duration-700 shadow-2xl"
              >
                Na Kontaktoni Sot
              </Link>
        </div>
      </section>
    </div>
  );
};