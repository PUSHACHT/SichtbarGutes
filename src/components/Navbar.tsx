import React, { useState } from 'react';
import { Aperture, Menu, X, ArrowRight } from 'lucide-react';

interface NavbarProps {
  onCheckClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onCheckClick }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-[#162d50] border-b border-[#2f5b7a]/40 backdrop-blur-md">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-8 lg:px-16 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="w-10 h-10 rounded-lg bg-[#2f5b7a] flex items-center justify-center text-white shadow-inner">
            <Aperture className="w-6 h-6 text-[#d8e2f0]" />
          </div>
          <div className="flex flex-col">
            <span className="text-white text-xl font-medium tracking-tight leading-none">
              Sichtbar<span className="font-bold">Gutes</span>
            </span>
            <span className="text-[#d8e2f0] text-[9px] font-semibold uppercase tracking-wider mt-1">
              Digitalisierung des Ehrenamts
            </span>
          </div>
        </div>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-8 text-[#d8e2f0] text-sm font-medium">
          <button onClick={() => scrollTo('kompass')} className="hover:text-white transition-colors">Förderkompass</button>
          <button onClick={() => scrollTo('ablauf')} className="hover:text-white transition-colors">Ablauf</button>
          <button onClick={() => scrollTo('massnahmen')} className="hover:text-white transition-colors">Leistungen</button>
          <button onClick={() => scrollTo('referenzen')} className="hover:text-white transition-colors">Referenzen</button>
          <button onClick={() => scrollTo('faq')} className="hover:text-white transition-colors">FAQ</button>
        </nav>

        {/* CTA Button */}
        <div className="hidden sm:block">
          <button
            onClick={onCheckClick}
            className="btn-spring bg-[#2f5b7a] hover:bg-[#3a6e94] text-white text-sm font-bold px-5 py-2.5 rounded flex items-center gap-2 shadow-sm border border-[#4a6e8a]"
          >
            <span>Förderfähigkeit prüfen</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-white p-2"
          aria-label="Menü öffnen"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0b1a3a] border-b border-[#2f5b7a] px-6 py-4 flex flex-col gap-4 text-[#d8e2f0]">
          <button onClick={() => scrollTo('kompass')} className="text-left py-2 hover:text-white">01 / Förderkompass</button>
          <button onClick={() => scrollTo('ablauf')} className="text-left py-2 hover:text-white">02 / Ablauf</button>
          <button onClick={() => scrollTo('massnahmen')} className="text-left py-2 hover:text-white">03 / Leistungen</button>
          <button onClick={() => scrollTo('referenzen')} className="text-left py-2 hover:text-white">04 / Referenzen</button>
          <button onClick={() => scrollTo('faq')} className="text-left py-2 hover:text-white">05 / FAQ</button>
          <button
            onClick={() => { setMobileMenuOpen(false); onCheckClick(); }}
            className="w-full bg-[#2f5b7a] text-white text-center py-3 rounded font-bold mt-2"
          >
            Jetzt Förderfähigkeit prüfen
          </button>
        </div>
      )}
    </header>
  );
};
