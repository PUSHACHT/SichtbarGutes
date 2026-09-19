import React from 'react';

export const TrustStrip: React.FC = () => {
  return (
    <section className="bg-[#162d50] border-y border-[#2f5b7a]/60 py-6 px-4 sm:px-8 lg:px-16 text-white shadow-inner">
      <div className="max-w-[1360px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-left">
        <div className="border-r-0 md:border-r border-[#2f5b7a]/40 pr-4">
          <p className="text-3xl lg:text-4xl font-bold tracking-tight text-white mb-1">90%</p>
          <p className="text-xs text-[#d8e2f0] font-normal leading-snug">Förderquote für antragsberechtigte Vereine</p>
        </div>
        <div className="border-r-0 md:border-r border-[#2f5b7a]/40 pr-4">
          <p className="text-3xl lg:text-4xl font-bold tracking-tight text-white mb-1">1.500 €</p>
          <p className="text-xs text-[#d8e2f0] font-normal leading-snug">Maximaler Zuschuss pro Vereinsprojekt</p>
        </div>
        <div className="border-r-0 md:border-r border-[#2f5b7a]/40 pr-4">
          <p className="text-3xl lg:text-4xl font-bold tracking-tight text-white mb-1">100%</p>
          <p className="text-xs text-[#d8e2f0] font-normal leading-snug">Digitale Antragstellung & Entlastung</p>
        </div>
        <div>
          <p className="text-3xl lg:text-4xl font-bold tracking-tight text-white mb-1">600.000+</p>
          <p className="text-xs text-[#d8e2f0] font-normal leading-snug">Förderfähige Vereine im Bundesgebiet</p>
        </div>
      </div>
    </section>
  );
};
