import React from 'react';
import { Check, Info } from 'lucide-react';

export const Foerderkompass: React.FC = () => {
  return (
    <section id="kompass" className="py-20 px-4 sm:px-8 lg:px-16 bg-white">
      <div className="max-w-[1360px] mx-auto">
        {/* Section Header */}
        <div className="border-b-2 border-[#162d50] pb-3 mb-10 flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-[#162d50]">
            01 / REGIONALER FÖRDERKOMPASS
          </span>
          <span className="text-xs text-[#706e65] hidden sm:inline">Offizielle DSEE-Kriterien</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Text */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#162d50] tracking-tight">
              Ist Ihr Verein förderfähig?
            </h2>
            <p className="text-base sm:text-lg text-[#706e65] leading-relaxed">
              Die Richtlinien der Deutschen Stiftung für Engagement und Ehrenamt (DSEE) sind klar definiert. Als spezialisierter Partner prüfen wir Ihren Status vorab und sorgen für einen 100% rechtssicheren Antrag.
            </p>
            <div className="p-4 bg-[#f7f8fb] border border-[#dcd8cf] rounded-lg mt-4 flex items-start gap-3">
              <Info className="w-5 h-5 text-[#2f5b7a] shrink-0 mt-0.5" />
              <p className="text-sm text-[#2b2a27]">
                <strong>Gut zu wissen:</strong> Über 85 % aller eingetragenen Sport-, Kultur-, Musik- und Rettungsvereine im ländlichen Raum erfüllen alle Voraussetzungen auf Anhieb.
              </p>
            </div>
          </div>

          {/* Right Checklist Box */}
          <div className="lg:col-span-5 bg-white border border-[#dcd8cf] rounded-xl p-6 sm:p-8 shadow-sm">
            <h3 className="text-lg font-bold text-[#162d50] mb-5 pb-3 border-b border-[#dcd8cf]">
              Die 4 Zulassungskriterien:
            </h3>

            <ul className="space-y-4 text-sm text-[#2b2a27]">
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 rounded bg-[#4a6e8a] flex items-center justify-center text-white shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <span><strong>Gemeinnützigkeit:</strong> Gültiger Freistellungsbescheid des Finanzamts (e.V., Stiftung oder gGmbH).</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 rounded bg-[#4a6e8a] flex items-center justify-center text-white shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <span><strong>Regionale Lage:</strong> Vereinssitz in einer deutschen Kommune mit unter 50.000 Einwohnern.</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 rounded bg-[#4a6e8a] flex items-center justify-center text-white shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <span><strong>Ehrenamt:</strong> Der Vorstand und die Vereinsführung agieren überwiegend ehrenamtlich.</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 rounded bg-[#4a6e8a] flex items-center justify-center text-white shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <span><strong>Verwendungszweck:</strong> Vorhaben zur Stärkung der Mitgliederwerbung, Nachwuchs & Sichtbarkeit.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
