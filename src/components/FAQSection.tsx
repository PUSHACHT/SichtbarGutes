import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Was genau ist die DSEE?',
      a: 'Die Deutsche Stiftung für Engagement und Ehrenamt (DSEE) ist eine bundesunmittelbare Stiftung des öffentlichen Rechts mit Sitz in Neustrelitz. Sie wurde 2020 von der Bundesregierung gegründet, um ehrenamtliche Strukturen und die Digitalisierung im ländlichen Raum gezielt mit Fördermitteln zu stärken.'
    },
    {
      q: 'Wie hoch fällt die Förderung konkret aus?',
      a: 'Das maximale Fördervolumen im Mikroförderprogramm beträgt 1.500,00 € pro Verein und Kalenderjahr. Bei einer Förderquote von 90 % übernimmt die DSEE 1.350,00 €. Ihr Verein trägt einen Eigenanteil von exakt 10 % (maximal 150,00 €) – und zwar erst nach offizieller Bewilligung.'
    },
    {
      q: 'Ist mein Verein berechtigt?',
      a: 'Förderfähig sind alle gemeinnützigen Vereine (e. V.), Stiftungen oder gGmbHs mit gültigem Freistellungsbescheid, die ihren Vereinssitz in einer Gemeinde oder Kommune mit unter 50.000 Einwohnern haben und überwiegend ehrenamtlich geführt werden.'
    },
    {
      q: 'Welche Pflichten und welchen Aufwand hat der Vorstand?',
      a: 'Für Ihren Vorstand entsteht praktisch kein Aufwand. Wir übernehmen die Strukturierung, Formulierung und fristgerechte Einreichung der Antragsunterlagen. Sie müssen uns lediglich Ihre Grunddaten bestätigen und nach Fertigstellung das Projektergebnis abnehmen.'
    },
    {
      q: 'Was passiert, wenn der Antrag abgelehnt wird?',
      a: 'Die Umsetzung der Maßnahmen und die Zahlung des vertraglichen 10%-Eigenanteils erfolgen erst nach offiziellem, rechtskräftigem Bewilligungsbescheid der DSEE. Sie leisten zu keinem Zeitpunkt eine Vorauszahlung.'
    }
  ];

  return (
    <section id="faq" className="py-20 px-4 sm:px-8 lg:px-16 bg-[#f7f8fb] border-y border-[#dcd8cf]">
      <div className="max-w-[1000px] mx-auto">
        <div className="border-b-2 border-[#162d50] pb-3 mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-[#162d50]">
            05 / HÄUFIG GESTELLTE FRAGEN
          </span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-bold text-[#162d50] tracking-tight mb-10">
          Antworten für Vereinsvorstände
        </h2>

        <div className="divide-y divide-[#dcd8cf]">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={idx} className="py-5">
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between text-left gap-4 group"
                >
                  <span className="text-lg font-bold text-[#162d50] group-hover:text-[#2f5b7a] transition-colors">
                    {faq.q}
                  </span>
                  <div className="w-7 h-7 rounded-full bg-white border border-[#dcd8cf] flex items-center justify-center text-[#162d50] shrink-0">
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>
                {isOpen && (
                  <p className="mt-3 text-base text-[#706e65] leading-relaxed pr-8 animate-fadeIn">
                    {faq.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
