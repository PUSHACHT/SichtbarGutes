import React from 'react';
import logoWhite from '../assets/logo-white.svg';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0b1a3a] text-white border-t border-[#162d50] pt-12 pb-16 px-4 sm:px-8 lg:px-16">
      <div className="max-w-[1360px] mx-auto space-y-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-8 border-b border-[#162d50]">
          {/* Brand */}
          <div className="flex flex-col gap-2 max-w-sm">
            <img 
              src={logoWhite} 
              alt="SichtbarGutes" 
              className="h-8 w-auto object-contain self-start" 
            />
            <p className="text-xs text-[#d8e2f0] leading-relaxed">
              Initiative zur Stärkung der ländlichen Vereinskultur durch gezielten, digitalen Bürokratieabbau und Bundesförderung.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-6 text-sm text-[#d8e2f0] font-medium">
            <a href="#kompass" className="hover:text-white transition-colors">Förderkompass</a>
            <a href="#ablauf" className="hover:text-white transition-colors">Ablauf</a>
            <a href="#massnahmen" className="hover:text-white transition-colors">Leistungen</a>
            <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
            <a href="#schnell-check" className="hover:text-white transition-colors">Antragsservice</a>
          </div>
        </div>

        {/* Bottom Legal Notice */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#706e65]">
          <p>© 2026 SichtbarGutes. Ein privatwirtschaftliches Angebot für eingetragene Vereine. Keine offizielle Behördenseite.</p>
          <p className="font-mono text-[11px]">Plattform-Version 4.1-DBA · Lighthouse 99 · DSGVO-konform</p>
        </div>
      </div>
    </footer>
  );
};
