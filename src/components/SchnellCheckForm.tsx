import React, { useState, useEffect } from 'react';
import { ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';

interface SchnellCheckFormProps {
  initialPlz?: string;
}

export const SchnellCheckForm: React.FC<SchnellCheckFormProps> = ({ initialPlz = '' }) => {
  const [verein, setVerein] = useState('');
  const [plz, setPlz] = useState(initialPlz);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isGemeinnuetzig, setIsGemeinnuetzig] = useState(true);
  const [isUnter50k, setIsUnter50k] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialPlz) {
      setPlz(initialPlz);
    }
  }, [initialPlz]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 800);
  };

  return (
    <section id="schnell-check" className="py-20 px-4 sm:px-8 lg:px-16 bg-[#162d50] text-white relative">
      <div className="max-w-[1360px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Side: Instructions */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#2f5b7a]/40 border border-[#4a6e8a]/60 text-[#d8e2f0] text-xs font-bold uppercase tracking-wider w-fit">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>06 / ANTRAGSSERVICE STARTEN</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight leading-tight">
            Jetzt Förderfähigkeit kostenneutral prüfen.
          </h2>

          <p className="text-lg text-[#d8e2f0] leading-relaxed">
            Kostenlos und unverbindlich: Innerhalb von 24 Stunden prüfen wir Ihre DSEE-Kriterien und melden uns mit einer klaren Fördereinschätzung bei Ihrem Vorstand.
          </p>

          <div className="bg-[#0b1a3a]/60 border border-[#2f5b7a] rounded-xl p-6 space-y-3 mt-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Ihr persönlicher Ansprechpartner:</h4>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#2f5b7a] border-2 border-amber-300 flex items-center justify-center font-bold text-lg text-white">
                K/H
              </div>
              <div>
                <p className="font-bold text-white text-base">Klaas & Hagen</p>
                <p className="text-xs text-[#d8e2f0]">Vertriebsleitung & Förderberatung SichtbarGutes</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Formular */}
        <div className="lg:col-span-6">
          <div className="bg-white text-[#2b2a27] rounded-xl p-6 sm:p-10 shadow-2xl border border-[#dcd8cf]">
            {submitted ? (
              <div className="text-center py-8 space-y-4 animate-fadeIn">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-[#162d50]">Vielen Dank für Ihre Anfrage!</h3>
                <p className="text-base text-[#706e65] max-w-md mx-auto">
                  Wir haben Ihre Daten für <strong>{verein || 'Ihren Verein'}</strong> erhalten. Wir prüfen die Postleitzahl <strong>{plz}</strong> im DSEE-Register und Klaas meldet sich innerhalb von 24 Stunden persönlich bei Ihnen.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-sm text-[#2f5b7a] font-bold underline hover:text-[#162d50]"
                  >
                    Weitere Anfrage stellen
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h3 className="text-2xl font-bold text-[#162d50] mb-2">
                  2-Minuten Schnell-Check
                </h3>
                <p className="text-xs text-[#706e65] mb-4">
                  Tragen Sie Ihre Daten ein – alle Angaben werden streng vertraulich behandelt.
                </p>

                {/* Micro-Qualification Switches */}
                <div className="space-y-2.5 bg-[#f7f8fb] p-4 rounded-lg border border-[#dcd8cf]">
                  <label className="flex items-center gap-3 cursor-pointer text-xs font-semibold text-[#162d50]">
                    <input
                      type="checkbox"
                      checked={isGemeinnuetzig}
                      onChange={(e) => setIsGemeinnuetzig(e.target.checked)}
                      className="w-4 h-4 rounded text-[#2f5b7a] focus:ring-[#2f5b7a]"
                    />
                    <span>Eingetragener Verein (e. V.) mit Freistellungsbescheid vorhanden</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer text-xs font-semibold text-[#162d50]">
                    <input
                      type="checkbox"
                      checked={isUnter50k}
                      onChange={(e) => setIsUnter50k(e.target.checked)}
                      className="w-4 h-4 rounded text-[#2f5b7a] focus:ring-[#2f5b7a]"
                    />
                    <span>Vereinssitz in einer Gemeinde unter 50.000 Einwohnern</span>
                  </label>
                </div>

                {/* Input Fields */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-[#2b2a27] mb-1">Vereinsname *</label>
                    <input
                      type="text"
                      required
                      value={verein}
                      onChange={(e) => setVerein(e.target.value)}
                      placeholder="z. B. Freiwillige Feuerwehr Musterdorf e.V."
                      className="w-full px-3.5 py-2.5 rounded border border-[#dcd8cf] text-sm focus:outline-none focus:ring-2 focus:ring-[#2f5b7a]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#2b2a27] mb-1">Postleitzahl & Ort *</label>
                      <input
                        type="text"
                        required
                        value={plz}
                        onChange={(e) => setPlz(e.target.value)}
                        placeholder="z. B. 38640 Goslar"
                        className="w-full px-3.5 py-2.5 rounded border border-[#dcd8cf] text-sm focus:outline-none focus:ring-2 focus:ring-[#2f5b7a]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#2b2a27] mb-1">Ansprechpartner *</label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Vor- und Nachname"
                        className="w-full px-3.5 py-2.5 rounded border border-[#dcd8cf] text-sm focus:outline-none focus:ring-2 focus:ring-[#2f5b7a]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#2b2a27] mb-1">E-Mail-Adresse *</label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="vorstand@verein.de"
                        className="w-full px-3.5 py-2.5 rounded border border-[#dcd8cf] text-sm focus:outline-none focus:ring-2 focus:ring-[#2f5b7a]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#2b2a27] mb-1">Telefonnummer (optional)</label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Für Rückfragen zum Antrag"
                        className="w-full px-3.5 py-2.5 rounded border border-[#dcd8cf] text-sm focus:outline-none focus:ring-2 focus:ring-[#2f5b7a]"
                      />
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-spring w-full bg-[#2f5b7a] hover:bg-[#162d50] text-white font-bold py-4 rounded-lg flex items-center justify-center gap-2 shadow-lg text-base mt-6"
                >
                  <span>{loading ? 'Prüfung läuft...' : 'Antragsberechtigung jetzt absenden'}</span>
                  <ArrowRight className="w-5 h-5" />
                </button>

                <p className="text-[11px] text-[#706e65] text-center pt-2">
                  🔒 100% DSGVO-konform. Keine Weitergabe an Dritte. 0 € Kosten bei Ablehnung.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
