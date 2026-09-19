import React from 'react';
import { Play, Globe, Video, Smartphone } from 'lucide-react';

export const PortfolioReferences: React.FC = () => {
  return (
    <section id="referenzen" className="py-20 px-4 sm:px-8 lg:px-16 bg-white">
      <div className="max-w-[1360px] mx-auto">
        <div className="border-b-2 border-[#162d50] pb-3 mb-10 flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-[#162d50]">
            05 / PORTFOLIO & REFERENZEN
          </span>
          <span className="text-xs text-[#706e65]">Auswahl umgesetzter Vereinsprojekte</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-bold text-[#162d50] tracking-tight mb-8">
          Echte Beispiele aus der Praxis
        </h2>

        {/* Media Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Shorts Column (9:16 vertical reels) */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <div className="flex items-center gap-2 text-sm font-bold uppercase text-[#162d50] tracking-wider">
              <Smartphone className="w-4 h-4 text-[#2f5b7a]" />
              <span>Social Media Clips (Shorts/Reels)</span>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[
                { title: 'TSV Musterstadt', sub: 'Instagram Reel', views: '2.4k' },
                { title: 'SV Dorfverein', sub: 'TikTok Clip', views: '4.8k' },
                { title: 'FC Heimat', sub: 'Recruiting', views: '1.9k' }
              ].map((item, idx) => (
                <div key={idx} className="group cursor-pointer">
                  <div className="aspect-[9/16] bg-[#162d50] rounded-lg border border-[#2f5b7a] flex flex-col items-center justify-center relative overflow-hidden transition-transform group-hover:scale-105 shadow-sm">
                    <div className="w-10 h-10 rounded-full bg-[#2f5b7a] flex items-center justify-center text-white group-hover:bg-amber-400 group-hover:text-[#162d50] transition-colors">
                      <Play className="w-4 h-4 fill-current ml-0.5" />
                    </div>
                    <span className="absolute bottom-2 right-2 text-[10px] bg-black/60 px-1.5 py-0.5 rounded text-white font-mono">
                      {item.views}
                    </span>
                  </div>
                  <p className="text-xs font-bold text-[#162d50] mt-2 truncate">{item.title}</p>
                  <p className="text-[11px] text-[#706e65]">{item.sub}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Longform Column (16:9 Imagefilms) */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <div className="flex items-center gap-2 text-sm font-bold uppercase text-[#162d50] tracking-wider">
              <Video className="w-4 h-4 text-[#2f5b7a]" />
              <span>Vereins-Imagefilme</span>
            </div>
            <div className="space-y-4">
              {[
                { title: 'Sportverein Bergdorf e.V.', desc: 'Großer Mitglieder-Gewinnungsfilm' },
                { title: 'Kulturverein Lichtenberg', desc: 'Porträt für 50-jähriges Jubiläum' }
              ].map((item, idx) => (
                <div key={idx} className="group cursor-pointer">
                  <div className="aspect-video bg-[#162d50] rounded-lg border border-[#2f5b7a] flex items-center justify-center relative overflow-hidden transition-transform group-hover:scale-[1.02] shadow-sm">
                    <div className="w-12 h-12 rounded-full bg-[#2f5b7a] flex items-center justify-center text-white group-hover:bg-amber-400 group-hover:text-[#162d50] transition-colors">
                      <Play className="w-5 h-5 fill-current ml-0.5" />
                    </div>
                  </div>
                  <p className="text-sm font-bold text-[#162d50] mt-2">{item.title}</p>
                  <p className="text-xs text-[#706e65]">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Website Mockups Column */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <div className="flex items-center gap-2 text-sm font-bold uppercase text-[#162d50] tracking-wider">
              <Globe className="w-4 h-4 text-[#2f5b7a]" />
              <span>Websites & Portale</span>
            </div>
            <div className="space-y-4">
              {[
                { name: 'Freiwillige Feuerwehr Waldstadt', tag: 'Modernes Bürgerportal' },
                { name: 'Musikverein Sonnental e.V.', tag: 'Online-Mitgliederantrag' }
              ].map((item, idx) => (
                <div key={idx} className="group cursor-pointer">
                  <div className="bg-[#162d50] rounded-lg border border-[#2f5b7a] overflow-hidden shadow-sm transition-transform group-hover:scale-[1.02]">
                    <div className="bg-[#0b1a3a] px-3 py-2 flex items-center gap-1.5 border-b border-[#2f5b7a]">
                      <span className="w-2 h-2 rounded-full bg-red-400/80"></span>
                      <span className="w-2 h-2 rounded-full bg-amber-400/80"></span>
                      <span className="w-2 h-2 rounded-full bg-emerald-400/80"></span>
                      <span className="text-[10px] text-[#d8e2f0] ml-2 font-mono truncate">www.{item.name.toLowerCase().replace(/[^a-z0-9]/g, '')}.de</span>
                    </div>
                    <div className="h-28 flex items-center justify-center bg-gradient-to-br from-[#162d50] to-[#1b3864]">
                      <Globe className="w-8 h-8 text-[#d8e2f0]/40" />
                    </div>
                  </div>
                  <p className="text-sm font-bold text-[#162d50] mt-2">{item.name}</p>
                  <p className="text-xs text-[#706e65]">{item.tag}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
