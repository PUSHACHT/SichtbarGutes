import React, { useState } from 'react';
import { ArrowRight, ShieldCheck, CheckCircle2, Sparkles, Building2 } from 'lucide-react';

interface HeroProps {
  onStartQuickCheck: (plz: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartQuickCheck }) => {
  const [plzInput, setPlzInput] = useState('');

  const handlePlzSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onStartQuickCheck(plzInput);
  };

  return (
    <section className="bg-gradient-to-b from-[#162d50] via-[#162d50] to-[#1b3864] text-white pt-16 pb-20 px-4 sm:px-8 lg:px-16 relative overflow-hidden">
      {/* Decorative background grid */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#d8e2f0_1px,transparent_1px)] [background-size:24px_24px]"></div>

      <div className="max-w-[1360px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center relative z-10">
        {/* Left Column (Golden Ratio ~63% width) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#2f5b7a]/40 border border-[#4a6e8a]/60 text-[#d8e2f0] text-xs font-bold uppercase tracking-wider w-fit">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>100% Behördlich Gefördert · 0% Bürokratie</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.08] text-white">
            Fördergelder & neuer Nachwuchs für Ihren Verein.
          </h1>

          {/* Subline */}
          <p className="text-lg sm:text-xl text-[#d8e2f0] leading-relaxed max-w-2xl font-normal">
            Bis zu <span className="text-white font-bold underline decoration-[#4a6e8a]">1.500 € Bundesförderung</span> durch die DSEE für professionelle Websites, Recruiting-Kampagnen & Vereinsfilme im ländlichen Raum. Wir übernehmen den gesamten bürokratischen Antrag.
          </p>

          {/* Interactive Fast Check Input */}
          <form onSubmit={handlePlzSubmit} className="mt-2 flex flex-col sm:flex-row gap-3 max-w-xl">
            <div className="relative flex-1">
              <input
                type="text"
                value={plzInput}
                onChange={(e) => setPlzInput(e.target.value)}
                placeholder="Postleitzahl Ihres Vereins (z. B. 38640)"
                maxLength={5}
                className="w-full px-4 py-3.5 rounded bg-white text-[#2b2a27] font-medium placeholder:text-[#706e65] text-base focus:outline-none focus:ring-2 focus:ring-amber-400 shadow-md"
              />
            </div>
            <button
              type="submit"
              className="btn-spring bg-[#2f5b7a] hover:bg-[#3d7299] text-white font-bold px-6 py-3.5 rounded flex items-center justify-center gap-2 shadow-lg border border-[#4a6e8a] whitespace-nowrap text-base"
            >
              <span>Förderung prüfen</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>

          {/* Trust bulletpoints below form */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-[#d8e2f0] pt-2">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Dauer: 2 Minuten</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Eigenanteil erst nach Bewilligung</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Förderperiode 2026</span>
            </div>
          </div>
        </div>

        {/* Right Column: DSEE Conditions Box (Golden Ratio ~37% width) */}
        <div className="lg:col-span-5">
          <div className="bg-[#0b1a3a]/80 backdrop-blur-md border border-[#2f5b7a] rounded-xl p-6 sm:p-8 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-[#2f5b7a] pb-4 mb-6">
              <span className="text-xs font-bold uppercase tracking-wider text-[#d8e2f0]">
                AKTUELLE FÖRDERKONDITIONEN 2026
              </span>
              <span className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/40">
                Offen
              </span>
            </div>

            <div className="space-y-4">
              <div className="border-b border-[#2f5b7a]/50 pb-3">
                <span className="text-xs text-[#d8e2f0] block mb-0.5 font-normal">Trägerinstitution</span>
                <span className="text-base font-bold text-white flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-[#4a6e8a]" />
                  DSEE (Deutsche Stiftung für Engagement & Ehrenamt)
                </span>
              </div>

              <div className="border-b border-[#2f5b7a]/50 pb-3">
                <span className="text-xs text-[#d8e2f0] block mb-0.5 font-normal">Maximale Förderhöhe</span>
                <span className="text-2xl font-bold text-white">1.500,00 € <span className="text-sm font-normal text-[#d8e2f0]">(90% Quote)</span></span>
              </div>

              <div className="border-b border-[#2f5b7a]/50 pb-3">
                <span className="text-xs text-[#d8e2f0] block mb-0.5 font-normal">Eigenanteil des Vereins</span>
                <span className="text-base font-bold text-white">
                  10% (max. 150,00 €) <span className="text-xs text-amber-300 font-semibold block sm:inline sm:ml-2">· erst nach Bewilligung</span>
                </span>
              </div>

              <div>
                <span className="text-xs text-[#d8e2f0] block mb-1 font-normal">Förderfähige Maßnahmen</span>
                <div className="flex flex-wrap gap-1.5">
                  <span className="text-xs bg-[#162d50] text-[#d8e2f0] px-2.5 py-1 rounded border border-[#2f5b7a]">Websites</span>
                  <span className="text-xs bg-[#162d50] text-[#d8e2f0] px-2.5 py-1 rounded border border-[#2f5b7a]">Social Media</span>
                  <span className="text-xs bg-[#162d50] text-[#d8e2f0] px-2.5 py-1 rounded border border-[#2f5b7a]">Imagefilme</span>
                  <span className="text-xs bg-[#162d50] text-[#d8e2f0] px-2.5 py-1 rounded border border-[#2f5b7a]">Mitgliedergewinnung</span>
                </div>
              </div>
            </div>

            {/* Zero Risk Assurance Banner */}
            <div className="mt-6 pt-4 border-t border-[#2f5b7a] flex items-center gap-3 text-xs text-[#d8e2f0] bg-[#162d50]/60 p-3 rounded-lg">
              <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
              <span><strong>Transparente Abwicklung:</strong> Keine Vorkasse – der 10%-Eigenanteil wird erst nach offizieller DSEE-Bewilligung fällig.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
