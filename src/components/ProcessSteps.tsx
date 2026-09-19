import React from 'react';

export const ProcessSteps: React.FC = () => {
  return (
    <section id="ablauf" className="py-20 px-4 sm:px-8 lg:px-16 bg-[#f7f8fb] border-y border-[#dcd8cf]">
      <div className="max-w-[1360px] mx-auto">
        <div className="border-b-2 border-[#162d50] pb-3 mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-[#162d50]">
            02 / ABLAUF DER BEANTRAGUNG
          </span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-bold text-[#162d50] tracking-tight mb-12">
          In 3 einfachen Schritten zur Förderung
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Step 1 */}
          <div className="bg-[#162d50] text-white p-8 rounded-xl shadow-md border border-[#2f5b7a] flex flex-col justify-between">
            <div>
              <span className="text-4xl font-bold text-amber-400 block mb-4">01</span>
              <h3 className="text-xl font-bold mb-3">2-Minuten Schnell-Check</h3>
              <p className="text-sm text-[#d8e2f0] leading-relaxed">
                Sie tragen kurz Ihre Vereinsdaten und PLZ ein. Wir prüfen innerhalb weniger Stunden die Förderfähigkeit im DSEE-Register.
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-[#2f5b7a] text-xs text-amber-300 font-medium">
              Aufwand für Sie: ca. 2 Minuten
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-white text-[#2b2a27] p-8 rounded-xl shadow-sm border border-[#dcd8cf] flex flex-col justify-between">
            <div>
              <span className="text-4xl font-bold text-[#2f5b7a] block mb-4">02</span>
              <h3 className="text-xl font-bold text-[#162d50] mb-3">Antrag durch SichtbarGutes</h3>
              <p className="text-sm text-[#706e65] leading-relaxed">
                Wir formulieren den formalen Förderantrag, strukturieren den Kostenplan und reichen alle Unterlagen rechtssicher bei der DSEE ein.
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-[#dcd8cf] text-xs text-[#162d50] font-semibold">
              Aufwand für Sie: 0 Stunden Papierkram
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-white text-[#2b2a27] p-8 rounded-xl shadow-sm border border-[#dcd8cf] flex flex-col justify-between">
            <div>
              <span className="text-4xl font-bold text-[#4a6e8a] block mb-4">03</span>
              <h3 className="text-xl font-bold text-[#162d50] mb-3">Schlüsselfertige Umsetzung</h3>
              <p className="text-sm text-[#706e65] leading-relaxed">
                Nach Bewilligung setzen wir Ihre neue Website, Videos oder Social-Media-Kampagnen direkt um. Sie gewinnen neue Mitglieder.
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-[#dcd8cf] text-xs text-emerald-700 font-semibold">
              Ergebnis: Neue Reichweite & Nachwuchs
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
