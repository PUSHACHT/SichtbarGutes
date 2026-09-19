import React from 'react';
import { Award, ShieldAlert, HeartHandshake, Compass } from 'lucide-react';

export const TrustFactors: React.FC = () => {
  return (
    <section className="py-20 px-4 sm:px-8 lg:px-16 bg-[#f7f8fb] border-y border-[#dcd8cf]">
      <div className="max-w-[1360px] mx-auto">
        <div className="border-b-2 border-[#162d50] pb-3 mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-[#162d50]">
            04 / VERTRAUENSFAKTOREN
          </span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-bold text-[#162d50] tracking-tight mb-12">
          Warum Vereine auf SichtbarGutes vertrauen
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white border border-[#dcd8cf] rounded-xl p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <Award className="w-6 h-6 text-[#2f5b7a]" />
              <h3 className="text-xl font-bold text-[#162d50]">DSEE-Expertise & Vergaberecht</h3>
            </div>
            <p className="text-base text-[#706e65] leading-relaxed">
              Wir arbeiten streng nach den offiziellen Richtlinien der Stiftung. Präzise formulierte Anträge sichern Ihnen maximale Bewilligungschancen ohne zeitraubende Nachforderungen.
            </p>
          </div>

          <div className="bg-white border border-[#dcd8cf] rounded-xl p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <ShieldAlert className="w-6 h-6 text-emerald-600" />
              <h3 className="text-xl font-bold text-[#162d50]">Null Risiko & Keine Vorkasse</h3>
            </div>
            <p className="text-base text-[#706e65] leading-relaxed">
              Der 10%-Eigenanteil (max. 150 €) wird erst nach rechtskräftigem Zuwendungsbescheid fällig. Wird der Antrag abgelehnt, tragen wir das Risiko – für Sie bleibt es 100% kostenlos.
            </p>
          </div>

          <div className="bg-white border border-[#dcd8cf] rounded-xl p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <HeartHandshake className="w-6 h-6 text-[#2f5b7a]" />
              <h3 className="text-xl font-bold text-[#162d50]">Feste persönliche Ansprechpartner</h3>
            </div>
            <p className="text-base text-[#706e65] leading-relaxed">
              Keine anonyme Ticket-Hotline: Ein fester Berater (Klaas / Hagen) begleitet Ihren Vorstand von der ersten PLZ-Prüfung bis zur finalen Fertigstellung.
            </p>
          </div>

          <div className="bg-[#162d50] text-white border border-[#2f5b7a] rounded-xl p-8 shadow-md">
            <div className="flex items-center gap-3 mb-4">
              <Compass className="w-6 h-6 text-amber-300" />
              <h3 className="text-xl font-bold">Kommunale Basis im ländlichen Raum</h3>
            </div>
            <p className="text-base text-[#d8e2f0] leading-relaxed">
              Wir kennen die Realität kleiner Gemeinden: Ehrenamt nach Feierabend, begrenzte Budgets und Zusammenhalt im Dorf. Unsere Medien sprechen genau diese Sprache.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
