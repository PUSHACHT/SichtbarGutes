import React from 'react';
import { Share2, Users, Video, Globe } from 'lucide-react';

export const Services: React.FC = () => {
  return (
    <section id="massnahmen" className="py-20 px-4 sm:px-8 lg:px-16 bg-white">
      <div className="max-w-[1360px] mx-auto">
        <div className="border-b-2 border-[#162d50] pb-3 mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-[#162d50]">
            03 / UMSETZBARE MAẞNAHMEN
          </span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-bold text-[#162d50] tracking-tight mb-4">
          Schlüsselfertige Digital-Pakete für Vereine
        </h2>
        <p className="text-base sm:text-lg text-[#706e65] max-w-3xl mb-12">
          Alle Maßnahmen sind zu 100 % förderfähig und exakt auf die Nachwuchssuche und Entlastung ehrenamtlicher Vorstände abgestimmt.
        </p>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Card 1: Social Media (Large Left) */}
          <div className="lg:col-span-7 bg-[#f7f8fb] border border-[#dcd8cf] rounded-xl p-8 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-lg bg-[#162d50] text-white flex items-center justify-center mb-6 shadow-sm">
                <Share2 className="w-6 h-6 text-[#d8e2f0]" />
              </div>
              <h3 className="text-2xl font-bold text-[#162d50] mb-3">Instagram & Facebook für Vereine</h3>
              <p className="text-base text-[#706e65] leading-relaxed">
                Professioneller Aufbau Ihrer Social-Media-Kanäle. Wir erstellen maßgeschneiderte Design-Vorlagen, trainieren Ihren Vorstand oder übernehmen die monatliche Redaktionsplanung, um junge Menschen nachhaltig zu begeistern.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#dcd8cf] flex flex-wrap gap-2 text-xs font-medium text-[#162d50]">
              <span className="bg-white px-2.5 py-1 rounded border border-[#dcd8cf]">Reels & Stories</span>
              <span className="bg-white px-2.5 py-1 rounded border border-[#dcd8cf]">Canva-Vorlagen</span>
              <span className="bg-white px-2.5 py-1 rounded border border-[#dcd8cf]">Redaktionsplan</span>
            </div>
          </div>

          {/* Cards 2 & 3: Recruiting & Imagefilm (Stacked Right) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="bg-white border border-[#dcd8cf] rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-[#2f5b7a] text-white flex items-center justify-center">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-bold text-[#162d50]">Recruiting-Kampagnen</h3>
              </div>
              <p className="text-sm text-[#706e65] leading-relaxed">
                Gezielte Ansprache neuer Ehrenamtlicher, Jugendlicher oder Vorstandsmitglieder durch authentische regionale Online-Aufrufe.
              </p>
            </div>

            <div className="bg-white border border-[#dcd8cf] rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-[#2f5b7a] text-white flex items-center justify-center">
                  <Video className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-bold text-[#162d50]">Vereins-Imagefilm</h3>
              </div>
              <p className="text-sm text-[#706e65] leading-relaxed">
                Kompakte, emotionale Kurzporträts Ihres Engagements – wir schicken ein professionelles Medienteam direkt vor Ort zu Ihrem Verein.
              </p>
            </div>
          </div>

          {/* Card 4: Full-width Website Creation */}
          <div className="lg:col-span-12 bg-[#162d50] text-white rounded-xl p-8 border border-[#2f5b7a] shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-[#2f5b7a] text-white flex items-center justify-center">
                  <Globe className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-2xl font-bold">Barrierefreie Website-Erstellung</h3>
              </div>
              <p className="text-sm sm:text-base text-[#d8e2f0] leading-relaxed">
                Moderne, responsive Vereins-Websites gemäß DSGVO und Barrierefreiheits-Standards. Leicht durch den Vorstand pflegbar, blitzschnell und optimiert für alle Smartphones.
              </p>
            </div>
            <span className="shrink-0 px-4 py-2 rounded bg-[#2f5b7a] text-xs font-bold uppercase tracking-wider text-white border border-[#4a6e8a]">
              100% Förderfähig
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
