interface TechSpecs {
  [key: string]: string;
}

export default function ProductSpecs({ tech, onOrderClick }: { tech: TechSpecs; onOrderClick?: () => void }) {
  return (
    <div className="mt-16 relative">
      {/* Background decoration */}
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-red-600/5 blur-3xl rounded-full" />
      <div className="absolute -top-10 -left-10 w-32 h-32 bg-[#1a2b4b]/5 blur-2xl rounded-full" />
      
      <div className="relative border-t border-[#1a2b4b]/10 pt-12">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-6">
            <div className="relative">
              <span className="h-[1px] w-20 bg-red-600 block" />
              <div className="absolute -top-1 -right-2 w-2 h-2 bg-red-600 rounded-full animate-pulse" />
            </div>
            <div>
              <h4 className="font-sans text-[10px] uppercase tracking-[0.4em] text-red-600 font-bold mb-1">Technical Blueprint</h4>
              <p className="font-serif text-xs text-[#1a2b4b]/60 italic">Precision Engineering Details</p>
            </div>
          </div>
          <div className="text-right">
            <span className="font-serif text-2xl text-[#1a2b4b]/30">{Object.keys(tech).length}</span>
            <p className="font-sans text-[8px] uppercase tracking-[0.3em] text-[#1a2b4b]/50">Specs</p>
          </div>
        </div>

        {/* POROSIT TANI Button */}
        <div className="relative group">
          {/* Glow effect on hover */}
          <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-[#1a2b4b]/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-xl" />
          
          <button onClick={onOrderClick} className="relative w-full bg-[#233554] text-white px-12 py-6 rounded-full font-bold shadow-2xl hover:bg-[#1a2b4b] transition-all duration-500 uppercase text-sm tracking-widest transform hover:scale-105 group-hover:shadow-[0_25px_50px_-12px_rgba(35,53,84,0.5)]">
            {/* Button inner decoration */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            <span className="relative z-10">POROSIT TANI</span>
            
            {/* Button shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 rounded-full" />
          </button>
        </div>

        {/* Footer note */}
        <div className="mt-8 text-center">
          <p className="font-serif text-xs text-[#1a2b4b]/50 italic">
            Premium quality specifications for professional standards
          </p>
        </div>
      </div>
    </div>
  );
}
