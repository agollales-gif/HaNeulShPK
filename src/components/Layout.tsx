import { ReactNode, useEffect, useState, useCallback, useMemo, lazy, Suspense } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { Menu, X } from 'lucide-react';
import MagneticButton from './MagneticButton';

export default function Layout({ children }: { children: ReactNode }) {
  const [scrolled, setScrolled] = useState(false);
  const [navVisible, setNavVisible] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = useMemo(() => [
    { path: '/', label: 'KREU' },
    { path: '/about', label: 'Rreth Nesh' },
    { path: '/products', label: 'PRODUKTET' },
    { path: '/contact', label: 'KONTAKTI' }
  ], []);

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    const threshold = 100;

    if (currentScrollY > threshold) {
      setScrolled(true);
      setNavVisible(true);
    } else {
      setScrolled(false);
      setNavVisible(true);
    }
  }, []);

  useEffect(() => {
    const throttledHandleScroll = () => {
      requestAnimationFrame(handleScroll);
    };
    
    window.addEventListener('scroll', throttledHandleScroll, { passive: true });
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', throttledHandleScroll);
    };
  }, [handleScroll]);

  useEffect(() => {
    window.scrollTo(0, 0);
    setMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [mobileMenuOpen]);

  return (
    <div className="min-h-screen bg-ivory text-navy selection:bg-crimson selection:text-white font-sans flex flex-col">
      
      {/* NAVIGATION BAR */}
      <nav
        className={`fixed top-0 w-full z-[120] transition-all duration-300 ${
          scrolled ? 'py-4 bg-white/95 backdrop-blur-md border-b border-navy/5' : 'py-8 bg-transparent'
        }`}
        style={{ transform: navVisible ? 'translateY(0)' : 'translateY(-100%)' }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="relative z-[120] flex items-center gap-3">
            <picture>
              <source srcSet="/HaNeul_logo_sm.webp" type="image/webp" />
              <img 
                src="/HaNeul_logo_sm.png" 
                alt="HaNeul Logo" 
                className="h-10 md:h-14 object-contain"
                loading="eager"
                decoding="async"
                width="56"
                height="56"
              />
            </picture>
            <span className="font-serif text-lg md:text-2xl font-bold tracking-tighter text-navy">
              하늘 <span className="text-crimson italic font-light">HaNeul</span>
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-12">
            {navLinks.map((link) => (
              <Link key={link.path} to={link.path} className="relative group overflow-hidden">
                <span className="font-sans text-xs uppercase tracking-[0.2em] font-medium text-[#1a2b4b] group-hover:opacity-100 transition-opacity">
                  {link.label}
                </span>
                <span
                  className={`absolute -bottom-2 left-0 right-0 h-px bg-crimson transition-transform duration-300 origin-left ${
                    location.pathname === link.path ? 'scale-x-100' : 'scale-x-0'
                  }`}
                />
              </Link>
            ))}
          </div>

          {/* Mobile Toggle Button (Hamburger) */}
          {!mobileMenuOpen && (
            <div className="md:hidden flex items-center z-[130]">
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="p-3 text-navy bg-white rounded-full shadow-xl border border-navy/10 hover:scale-105 transition-all"
                aria-label="Open menu"
              >
                <Menu size={20} />
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* --- MENUJA MOBILE (OVERLAY) --- */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[1000] bg-white flex flex-col items-center justify-center px-6"
          >
            {/* Butoni i mbylljes (X) - Pozicionuar brenda menusë lart djathtas */}
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="absolute top-8 right-6 p-4 text-navy bg-ivory rounded-full shadow-lg border border-navy/5 active:scale-95 transition-transform z-[1010]"
              aria-label="Close menu"
            >
              <X size={24} />
            </button>

            {/* Logo dekorative në sfond */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none flex items-center justify-center">
              <img 
                src="/HaNeul_logo_sm.png" 
                alt="" 
                className="w-4/5 object-contain"
                loading="lazy"
                decoding="async"
              />
            </div>

            {/* Lista e linqeve (Navy Blue) */}
            <div className="flex flex-col items-center space-y-10 relative z-[1002]">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.1 }}
                >
                  <Link
                    to={link.path}
                    className={`font-serif text-4xl tracking-tight transition-colors ${
                      location.pathname === link.path ? 'text-crimson' : 'text-navy hover:text-crimson'
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label.toUpperCase()}
                  </Link>
                </motion.div>
              ))}

              {/* Rrjetet Sociale */}
              <div className="pt-12 flex gap-10">
                <a 
                  href="https://www.instagram.com/haneulshpk" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[10px] tracking-[0.3em] uppercase text-[#1a2b4b]/70 hover:text-crimson transition-all"
                >
                  Instagram
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MAIN CONTENT */}
      <main className="flex-grow pt-24">
        {children}
      </main>

      {/* FOOTER */}
      <footer className="bg-white text-[#1a2b4b] py-8 md:py-12 border-t border-[#1a2b4b]/5 mt-auto">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-12 flex flex-col md:flex-row justify-between items-start gap-8 md:gap-12">
          <div className="md:w-1/3">
            <div className="flex items-center gap-3 md:gap-4 mb-4">
              <picture>
                <source srcSet="/HaNeul_logo_lg.webp" type="image/webp" />
                <img 
                  src="/HaNeul_logo_lg.png" 
                  alt="HaNeul Logo" 
                  className="h-10 md:h-16 lg:h-24 object-contain"
                  loading="lazy"
                  decoding="async"
                  width="96"
                  height="96"
                />
              </picture>
              <span className="font-serif text-2xl md:text-4xl lg:text-5xl font-bold tracking-tighter block text-[#1a2b4b]">
                하늘 <span className="text-red-600 italic font-light">HaNeul</span>
              </span>
            </div>
            <p className="font-sans text-xs md:text-sm uppercase tracking-widest text-[#1a2b4b] mt-2 md:mt-4">
              Nga tasi në kafshatë, ne sjellim kënaqësi.
            </p>
          </div>

          <div className="md:w-1/3 flex flex-col gap-3 md:gap-4 font-sans text-xs md:text-sm text-[#1a2b4b]">
            <p className="uppercase tracking-[0.2em] text-[#1a2b4b] opacity-70 mb-2 text-[10px] md:text-xs font-bold">Kontakti</p>
            <p>📍 Rruga e Dritës, Ndërtesa 4, Tiranë, Shqipëri</p>
            <p>📞 +44 7464 729114</p>
            <p>✉️ info@haneul.com</p>
          </div>

          <div className="md:w-1/3 flex gap-4 md:gap-8 md:justify-end w-full">
            <a
              href="https://www.instagram.com/haneulshpk"
              target="_blank"
              rel="noopener noreferrer"
            >
              <MagneticButton>
                <span className="font-sans text-[10px] md:text-xs uppercase tracking-[0.2em] text-[#1a2b4b]/70 hover:text-red-600 transition-all">
                  Instagram
                </span>
              </MagneticButton>
            </a>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-12 mt-12 md:mt-16 pt-6 md:pt-8 border-t border-navy/5">
          <div className="text-center">
            <p className="font-sans text-[10px] md:text-xs uppercase tracking-widest text-[#1a2b4b]/60">
              © 2026 HaNeul Powered by <a href="https://www.blackbear-solutions.com/" target="_blank" rel="noopener noreferrer" className="text-[#1a2b4b]/60 hover:text-red-600 transition-colors">Black Bear Solutions</a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}