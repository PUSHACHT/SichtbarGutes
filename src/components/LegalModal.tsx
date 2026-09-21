import React, { useEffect } from 'react';
import { X, Shield, FileText, Scale, Printer, ExternalLink, AlertCircle } from 'lucide-react';

export type LegalTab = 'impressum' | 'datenschutz' | 'agb';

interface LegalModalProps {
  isOpen: boolean;
  activeTab: LegalTab;
  onClose: () => void;
  onSelectTab: (tab: LegalTab) => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({
  isOpen,
  activeTab,
  onClose,
  onSelectTab,
}) => {
  // Close on Escape key and handle body scroll lock
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div 
        className="bg-white w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl border border-[#dcd8cf] relative overflow-hidden animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-[#0b1a3a] px-6 py-4 flex items-center justify-between border-b border-[#162d50] text-white shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded bg-[#162d50] flex items-center justify-center text-[#d8e2f0] border border-[#2f5b7a]">
              {activeTab === 'impressum' && <FileText className="w-5 h-5" />}
              {activeTab === 'datenschutz' && <Shield className="w-5 h-5" />}
              {activeTab === 'agb' && <Scale className="w-5 h-5" />}
            </div>
            <div>
              <p className="text-xs font-mono uppercase tracking-wider text-[#d8e2f0]">SichtbarGutes · Rechtliche Dokumente</p>
              <h2 className="text-lg font-bold text-white">
                {activeTab === 'impressum' && 'Impressum'}
                {activeTab === 'datenschutz' && 'Datenschutzerklärung'}
                {activeTab === 'agb' && 'Allgemeine Geschäftsbedingungen (AGB)'}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="p-2 text-[#d8e2f0] hover:text-white hover:bg-[#162d50] transition-colors rounded"
              title="Drucken"
              aria-label="Drucken"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-[#d8e2f0] hover:text-white hover:bg-[#162d50] transition-colors rounded"
              title="Schließen"
              aria-label="Schließen"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-[#f4f7fa] border-b border-[#dcd8cf] px-6 flex items-center gap-2 sm:gap-4 overflow-x-auto shrink-0">
          <button
            onClick={() => onSelectTab('impressum')}
            className={`py-3 px-3 sm:px-4 text-xs sm:text-sm font-bold border-b-2 flex items-center gap-2 whitespace-nowrap transition-colors ${
              activeTab === 'impressum'
                ? 'border-[#162d50] text-[#162d50]'
                : 'border-transparent text-[#706e65] hover:text-[#162d50]'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Impressum</span>
          </button>
          <button
            onClick={() => onSelectTab('datenschutz')}
            className={`py-3 px-3 sm:px-4 text-xs sm:text-sm font-bold border-b-2 flex items-center gap-2 whitespace-nowrap transition-colors ${
              activeTab === 'datenschutz'
                ? 'border-[#162d50] text-[#162d50]'
                : 'border-transparent text-[#706e65] hover:text-[#162d50]'
            }`}
          >
            <Shield className="w-4 h-4" />
            <span>Datenschutz</span>
          </button>
          <button
            onClick={() => onSelectTab('agb')}
            className={`py-3 px-3 sm:px-4 text-xs sm:text-sm font-bold border-b-2 flex items-center gap-2 whitespace-nowrap transition-colors ${
              activeTab === 'agb'
                ? 'border-[#162d50] text-[#162d50]'
                : 'border-transparent text-[#706e65] hover:text-[#162d50]'
            }`}
          >
            <Scale className="w-4 h-4" />
            <span>AGB</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 text-[#2b2a27] text-sm leading-relaxed space-y-6">
          
          {/* TAB 1: IMPRESSUM */}
          {activeTab === 'impressum' && (
            <div className="space-y-6 max-w-3xl">
              <div className="border-b border-[#dcd8cf] pb-4">
                <span className="bg-[#d8e2f0] text-[#162d50] text-[11px] font-bold px-2 py-0.5 uppercase tracking-wider">
                  Angaben gemäß § 5 DDG (Digitale-Dienste-Gesetz)
                </span>
                <h1 className="text-2xl font-bold text-[#162d50] mt-2">Impressum</h1>
              </div>

              {/* Betreiber */}
              <section className="space-y-2">
                <h3 className="text-base font-bold text-[#162d50]">Diensteanbieter & Verantwortlicher:</h3>
                <div className="bg-[#f4f7fa] p-4 border border-[#dcd8cf] font-mono text-xs sm:text-sm space-y-1">
                  <p className="font-bold text-[#162d50]">Klaas Herting</p>
                  <p>SichtbarGutes</p>
                  <p>Hermann-Gmeiner-Straße 39</p>
                  <p>53229 Bonn</p>
                  <p>Deutschland</p>
                </div>
              </section>

              {/* Kontakt */}
              <section className="space-y-2">
                <h3 className="text-base font-bold text-[#162d50]">Kontaktmöglichkeiten:</h3>
                <div className="space-y-1">
                  <p><strong>Telefon:</strong> <a href="tel:+4915221765943" className="text-[#2f5b7a] hover:underline">+49 152 21765943</a></p>
                  <p><strong>E-Mail:</strong> <a href="mailto:k.herting@outlook.de" className="text-[#2f5b7a] hover:underline">k.herting@outlook.de</a></p>
                  <p><strong>Webseite:</strong> <span className="font-mono">https://pushacht.github.io/SichtbarGutes/</span></p>
                </div>
              </section>

              {/* Vertretung & Rechtsform */}
              <section className="space-y-2">
                <h3 className="text-base font-bold text-[#162d50]">Rechtsform & Vertretungsberechtigung:</h3>
                <p>
                  SichtbarGutes ist ein privatwirtschaftliches Beratungs- und Medienangebot für gemeinnützige Vereine und Organisationen.
                </p>
                <div className="p-3 bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-amber-600 mt-0.5" />
                  <div>
                    <strong>[Platzhalter Rechtsform / Handelsregister]:</strong> Einzelunternehmen / Freiberufliche Tätigkeit (Inhaber: Klaas Herting). Sofern eine Gesellschaft bürgerlichen Rechts (GbR) oder Eintragung im Handelsregister (z. B. Amtsgericht Bonn) erfolgt, bitte hier Handelsregisternummer und vertretungsberechtigte Gesellschafter ergänzen.
                  </div>
                </div>
              </section>

              {/* Umsatzsteuer-ID */}
              <section className="space-y-2">
                <h3 className="text-base font-bold text-[#162d50]">Umsatzsteuer-Identifikationsnummer:</h3>
                <div className="p-3 bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-amber-600 mt-0.5" />
                  <div>
                    <strong>[Platzhalter USt-IdNr.]:</strong> Gemäß § 27 a Umsatzsteuergesetz: <em>USt-IdNr. beantragt / entfällt nach § 19 UStG (Kleinunternehmerregelung)</em>. Bei Zuteilung bitte hier eintragen (z. B. DE...).
                  </div>
                </div>
              </section>

              {/* Redaktionell Verantwortlich */}
              <section className="space-y-2">
                <h3 className="text-base font-bold text-[#162d50]">Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV:</h3>
                <p>
                  Klaas Herting<br />
                  Hermann-Gmeiner-Straße 39<br />
                  53229 Bonn
                </p>
              </section>

              {/* Streitschlichtung */}
              <section className="space-y-2">
                <h3 className="text-base font-bold text-[#162d50]">EU-Streitschlichtung & Verbraucherstreitbeilegung:</h3>
                <p>
                  Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{' '}
                  <a 
                    href="https://ec.europa.eu/consumers/odr/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[#2f5b7a] hover:underline inline-flex items-center gap-1"
                  >
                    <span>https://ec.europa.eu/consumers/odr/</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>.
                </p>
                <p className="text-xs text-[#706e65]">
                  Wir sind weder verpflichtet noch bereit, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
                </p>
              </section>

              {/* Haftungshinweise */}
              <section className="space-y-2 text-xs text-[#706e65] pt-4 border-t border-[#dcd8cf]">
                <h4 className="font-bold text-[#162d50]">Haftung für Inhalte und Links</h4>
                <p>
                  Als Diensteanbieter sind wir gemäß § 7 Abs. 1 DDG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 DDG sind wir jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen. Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen.
                </p>
              </section>
            </div>
          )}

          {/* TAB 2: DATENSCHUTZ */}
          {activeTab === 'datenschutz' && (
            <div className="space-y-6 max-w-3xl">
              <div className="border-b border-[#dcd8cf] pb-4">
                <span className="bg-[#d8e2f0] text-[#162d50] text-[11px] font-bold px-2 py-0.5 uppercase tracking-wider">
                  Informationen nach Art. 13, 14 und 21 DSGVO
                </span>
                <h1 className="text-2xl font-bold text-[#162d50] mt-2">Datenschutzerklärung</h1>
              </div>

              {/* 1. Datenschutz auf einen Blick */}
              <section className="space-y-3">
                <h3 className="text-base font-bold text-[#162d50]">1. Datenschutz auf einen Blick</h3>
                <p>
                  Der Schutz Ihrer persönlichen Daten ist uns ein wichtiges Anliegen. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend den gesetzlichen Datenschutzvorschriften (DSGVO, BDSG, TTDSG) sowie dieser Datenschutzerklärung.
                </p>
              </section>

              {/* 2. Verantwortliche Stelle */}
              <section className="space-y-2 bg-[#f4f7fa] p-4 border border-[#dcd8cf]">
                <h3 className="text-base font-bold text-[#162d50]">2. Verantwortliche Stelle</h3>
                <p>Verantwortlicher für die Datenverarbeitung auf dieser Website ist:</p>
                <div className="font-mono text-xs sm:text-sm space-y-0.5 text-[#162d50]">
                  <p className="font-bold">Klaas Herting</p>
                  <p>SichtbarGutes</p>
                  <p>Hermann-Gmeiner-Straße 39, 53229 Bonn</p>
                  <p>Telefon: +49 152 21765943</p>
                  <p>E-Mail: k.herting@outlook.de</p>
                </div>
              </section>

              {/* 3. Hosting & Bereitstellung */}
              <section className="space-y-3">
                <h3 className="text-base font-bold text-[#162d50]">3. Bereitstellung der Website & Hosting (GitHub Pages)</h3>
                <p>
                  Diese Website wird als statische Webanwendung über <strong>GitHub Pages</strong> gehostet, einem Dienst der GitHub Inc., 88 Colin P Kelly Jr St, San Francisco, CA 94107, USA.
                </p>
                <p className="text-xs text-[#706e65]">
                  Beim Aufruf unserer Webseiten erfasst der Host-Server automatisiert Zugriffsdaten in sogenannten Server-Log-Dateien (z. B. IP-Adresse des anfragenden Geräts, Datum und Uhrzeit des Zugriffs, übertragene Datenmenge, Browsertyp und -version, Betriebssystem). Die Rechtsgrundlage hierfür ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an einer sicheren, stabilen und fehlerfreien Bereitstellung unserer Webseite).
                </p>
              </section>

              {/* 4. Schnell-Check & Kontaktformular */}
              <section className="space-y-3">
                <h3 className="text-base font-bold text-[#162d50]">4. Datenerfassung über Schnell-Check & Kontaktformulare</h3>
                <p>
                  Wenn Sie uns über das Schnell-Check-Formular oder per E-Mail Anfragen zukommen lassen, werden Ihre Angaben (insbesondere Vereinsname, Postleitzahl, Ort, Name des Ansprechpartners, E-Mail-Adresse und ggf. Telefonnummer) zur Prüfung der Förderkriterien und Bearbeitung Ihrer Anfrage bei uns gespeichert.
                </p>
                <ul className="list-disc list-inside space-y-1 text-xs">
                  <li><strong>Zweck:</strong> Prüfung der Förderberechtigung (DSEE-Mikroförderung für ländliche Räume), unverbindliche Erstberatung und Angebotserstellung.</li>
                  <li><strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. b DSGVO (Durchführung vorvertraglicher Maßnahmen auf Anfrage der betroffenen Person) und Art. 6 Abs. 1 lit. a DSGVO (Einwilligung).</li>
                  <li><strong>Speicherdauer:</strong> Die Daten verbleiben bei uns, bis Sie uns zur Löschung auffordern, Ihre Einwilligung widerrufen oder der Zweck für die Datenspeicherung entfällt (z. B. nach abgeschlossener Beratung), sofern keine gesetzlichen Aufbewahrungsfristen entgegenstehen.</li>
                </ul>
              </section>

              {/* 5. Geplanter CRM-Einsatz: Pipedrive */}
              <section className="space-y-3 bg-[#eef3f8] p-5 border border-[#2f5b7a]/30">
                <div className="flex items-center gap-2 text-[#162d50] font-bold text-base">
                  <Shield className="w-5 h-5 text-[#2f5b7a]" />
                  <h3>5. Kunden- & Interessentenverwaltung via CRM (Pipedrive)</h3>
                </div>
                <p>
                  Zur professionellen, strukturierten und schnellen Abwicklung von Vereinsanfragen und Antragsbegleitungen nutzen wir bzw. binden wir künftig das Customer-Relationship-Management-System (CRM) <strong>Pipedrive</strong> ein.
                </p>
                <div className="space-y-2 text-xs text-[#2b2a27]">
                  <p>
                    <strong>Dienstanbieter:</strong> Pipedrive OÜ, Mustamäe tee 3a, 10615 Tallinn, Estland (EU) bzw. Pipedrive Inc., 460 Park Ave South, New York, NY 10016, USA.
                  </p>
                  <p>
                    <strong>Verarbeitete Datenkategorien:</strong> Kontaktdaten (Name, E-Mail, Telefonnummer), Vereinsdaten (Name, Anschrift, Vereinsregisternummer, PLZ), Bearbeitungsstatus des DSEE-Förderantrags sowie Dokumentations- und Gesprächsnotizen.
                  </p>
                  <p>
                    <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an einer effizienten, strukturierten Verwaltung unserer Kundenbeziehungen und zügigen Beratung im Antragsverfahren) sowie Art. 6 Abs. 1 lit. b DSGVO (Vertragsanbahnung und Durchführung).
                  </p>
                  <p>
                    <strong>Auftragsverarbeitung & Garantien:</strong> Wir schließen mit Pipedrive einen Auftragsverarbeitungsvertrag (AVV / Data Processing Addendum) gemäß Art. 28 DSGVO ab. Soweit Daten in die USA übertragen werden, garantiert Pipedrive ein angemessenes Datenschutzniveau auf Basis von EU-Standardvertragsklauseln (SCC) und der Zertifizierung unter dem EU-U.S. Data Privacy Framework.
                  </p>
                </div>
                <div className="p-2.5 bg-white border border-[#dcd8cf] text-xs text-[#706e65]">
                  <strong>[Placeholder CRM-Status]:</strong> Vor der finalen Live-Synchronisation der Formulare mit der Pipedrive-API wird das Data Processing Addendum in Pipedrive bestätigt und der genaue EU-Serverstandort (Frankfurt am Main / EU Data Center von Pipedrive) verankert.
                </div>
              </section>

              {/* 6. Medien & YouTube 2-Klick */}
              <section className="space-y-3">
                <h3 className="text-base font-bold text-[#162d50]">6. YouTube-Videos (DSGVO-konforme 2-Klick-Lösung)</h3>
                <p>
                  Auf unserer Website sind Referenzvideos und Shorts von YouTube (Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland) eingebunden. 
                </p>
                <p className="text-xs text-[#706e65]">
                  Zum Schutz Ihrer Privatsphäre setzen wir eine <strong>2-Klick-Lösung</strong> über die Domain <code className="bg-[#f4f7fa] px-1 py-0.5 border">youtube-nocookie.com</code> ein: Beim bloßen Laden der Seite werden keine personenbezogenen Daten oder Tracking-Cookies an YouTube übertragen. Erst wenn Sie aktiv auf die Video-Vorschau klicken, willigen Sie gemäß <strong>Art. 6 Abs. 1 lit. a DSGVO</strong> ein, dass das Video geladen und eine Verbindung zu den Servern von Google hergestellt wird.
                </p>
              </section>

              {/* 7. Betroffenenrechte */}
              <section className="space-y-3">
                <h3 className="text-base font-bold text-[#162d50]">7. Ihre Rechte als betroffene Person</h3>
                <p>Sie haben im Rahmen der geltenden gesetzlichen Bestimmungen jederzeit das Recht auf:</p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <li className="p-2 bg-[#f4f7fa] border border-[#dcd8cf]"><strong>Auskunft (Art. 15 DSGVO):</strong> Über Ihre bei uns gespeicherten personenbezogenen Daten.</li>
                  <li className="p-2 bg-[#f4f7fa] border border-[#dcd8cf]"><strong>Berichtigung (Art. 16 DSGVO):</strong> Berichtigung unrichtiger oder unvollständiger Daten.</li>
                  <li className="p-2 bg-[#f4f7fa] border border-[#dcd8cf]"><strong>Löschung (Art. 17 DSGVO):</strong> Löschung Ihrer bei uns hinterlegten Daten.</li>
                  <li className="p-2 bg-[#f4f7fa] border border-[#dcd8cf]"><strong>Einschränkung (Art. 18 DSGVO):</strong> Einschränkung der Verarbeitung Ihrer Daten.</li>
                  <li className="p-2 bg-[#f4f7fa] border border-[#dcd8cf]"><strong>Datenübertragbarkeit (Art. 20 DSGVO):</strong> Aushändigung Ihrer Daten in strukturiertem Format.</li>
                  <li className="p-2 bg-[#f4f7fa] border border-[#dcd8cf]"><strong>Widerspruch (Art. 21 DSGVO):</strong> Gegen die Verarbeitung bei berechtigtem Interesse.</li>
                </ul>
                <p className="text-xs text-[#706e65] pt-2">
                  Möchten Sie von Ihren Rechten Gebrauch machen oder eine erteilte Einwilligung widerrufen, genügt eine formlose E-Mail an: <a href="mailto:k.herting@outlook.de" className="text-[#2f5b7a] font-bold underline">k.herting@outlook.de</a>.
                </p>
                <p className="text-xs text-[#706e65]">
                  Darüber hinaus steht Ihnen ein Beschwerderecht bei der zuständigen Datenschutz-Aufsichtsbehörde zu (z. B. Landesbeauftragte für Datenschutz und Informationsfreiheit Nordrhein-Westfalen - LDI NRW, Kavalleriestr. 2-4, 40213 Düsseldorf).
                </p>
              </section>

              {/* 8. Web-Analyse / Cookie Platzhalter */}
              <section className="space-y-2">
                <div className="p-3 bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-amber-600 mt-0.5" />
                  <div>
                    <strong>[Platzhalter Web-Analyse / Cookies]:</strong> Auf dieser Website werden derzeit keine zustimmungspflichtigen Tracking-Cookies (z. B. Google Analytics oder Meta-Pixel) eingesetzt. Sollte künftig ein Analysetool integriert werden, wird ein rechtskonformer Cookie-Consent-Banner (z. B. Klaro / Usercentrics) vorgeschaltet und dieser Abschnitt um die spezifischen Speicherfristen und Opt-Out-Möglichkeiten ergänzt.
                  </div>
                </div>
              </section>
            </div>
          )}

          {/* TAB 3: AGB */}
          {activeTab === 'agb' && (
            <div className="space-y-6 max-w-3xl">
              <div className="border-b border-[#dcd8cf] pb-4">
                <span className="bg-[#d8e2f0] text-[#162d50] text-[11px] font-bold px-2 py-0.5 uppercase tracking-wider">
                  Vertragsbedingungen für Dienstleistungen & Antragsbegleitung
                </span>
                <h1 className="text-2xl font-bold text-[#162d50] mt-2">Allgemeine Geschäftsbedingungen (AGB)</h1>
              </div>

              {/* § 1 Geltungsbereich */}
              <section className="space-y-2">
                <h3 className="text-base font-bold text-[#162d50]">§ 1 Geltungsbereich & Vertragsgegenstand</h3>
                <p>
                  (1) Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für alle Verträge, Beratungen und Dienstleistungen zwischen <strong>SichtbarGutes (Inhaber: Klaas Herting)</strong> und Auftraggebern (nachfolgend „Verein“ bzw. „Kunde“), insbesondere eingetragenen Vereinen (e.V.), gemeinnützigen Organisationen und Körperschaften des öffentlichen oder privaten Rechts.
                </p>
                <p>
                  (2) Gegenstand der Dienstleistung sind Konzeption, Gestaltung, Produktion und Bereitstellung digitaler Medien (insbesondere Vereinswebsites, CMS-Einrichtungen, Imagefilme im 16:9-Format, Social-Media-Shorts/Reels im 9:16-Format) sowie die begleitende Unterstützung bei der Antragsstellung für Förderprogramme (insbesondere das DSEE-Mikroförderprogramm der Deutschen Stiftung für Engagement und Ehrenamt).
                </p>
                <p className="text-xs text-[#706e65]">
                  (3) <strong>Klarstellung:</strong> SichtbarGutes ist weder eine Behörde noch ein Träger öffentlicher Fördermittel. SichtbarGutes erbringt keine Rechts- oder Steuerberatung. Die Bewilligung und Auszahlung von Fördergeldern obliegt ausschließlich dem jeweiligen Fördermittelgeber.
                </p>
              </section>

              {/* § 2 Vertragsschluss */}
              <section className="space-y-2">
                <h3 className="text-base font-bold text-[#162d50]">§ 2 Angebot & Vertragsschluss</h3>
                <p>
                  (1) Die Darstellung der Angebote auf der Website stellt kein rechtlich bindendes Angebot, sondern eine Aufforderung zur unverbindlichen Kontaktaufnahme und Schnellprüfung dar.
                </p>
                <p>
                  (2) Der Vertrag kommt zustande, sobald der Kunde ein individuelles schriftliches Angebot von SichtbarGutes (auch per E-Mail) bestätigt oder beide Parteien einen entsprechenden Dienstleistungs- bzw. Werkvertrag unterzeichnen.
                </p>
              </section>

              {/* § 3 Mitwirkungspflichten */}
              <section className="space-y-2">
                <h3 className="text-base font-bold text-[#162d50]">§ 3 Mitwirkungspflichten des Kunden</h3>
                <p>
                  (1) Der Verein stellt sicher, dass alle für die Durchführung des Auftrags erforderlichen Informationen, Texte, Bildrechte, Logos und behördlichen Vereinsnachweise (z. B. Freistellungsbescheid, Auszug aus dem Vereinsregister) rechtzeitig, wahrheitsgemäß und vollständig bereitgestellt werden.
                </p>
                <p>
                  (2) Der Verein benennt eine entscheidungsbefugte Ansprechperson für Freigaben, Feedbackschleifen und die Zeichnung der offiziellen Förderantragsunterlagen.
                </p>
              </section>

              {/* § 4 Vergütung, Eigenanteil & Zahlungsbedingungen */}
              <section className="space-y-2">
                <h3 className="text-base font-bold text-[#162d50]">§ 4 Vergütung, Eigenanteil & Zahlungsbedingungen</h3>
                <p>
                  (1) Die Vergütung richtet sich nach dem im jeweiligen Einzelvertrag vereinbarten Leistungsumfang.
                </p>
                <p>
                  (2) Soweit ein Projekt im Rahmen der DSEE-Mikroförderung mit einem 90%-Fördersatz realisiert wird, beträgt der Eigenanteil des Vereins in der Regel 10 % des Gesamtvolumens (Beispiel: Bei 1.666 € Gesamtpaketpreis beläuft sich der Förderzuschuss auf 1.500 € und der Vereinseigenanteil auf 166 €).
                </p>
                <p>
                  (3) Rechnungsbeträge sind, sofern im Vertrag nicht anders festgelegt, innerhalb von 14 Tagen nach Rechnungsstellung ohne Abzug zur Zahlung fällig.
                </p>
                <div className="p-2.5 bg-amber-50 border border-amber-200 text-xs text-amber-900">
                  <strong>[Placeholder Zahlungsmodalitäten]:</strong> <em>Banküberweisung auf Geschäftskonto [IBAN: bei Rechnungsstellung angegeben] / Vorkasse des Eigenanteils vor Produktionsbeginn / Meilensteinabrechnung nach gegenseitiger schriftlicher Vereinbarung.</em>
                </div>
              </section>

              {/* § 5 Nutzungsrechte & Urheberrecht */}
              <section className="space-y-2">
                <h3 className="text-base font-bold text-[#162d50]">§ 5 Nutzungsrechte & Urheberrecht</h3>
                <p>
                  (1) Mit vollständiger Begleichung der fälligen Vergütung räumt SichtbarGutes dem Verein ein einfaches, zeitlich und räumlich unbeschränktes Recht ein, die erstellten Webseiten, Grafiken und Videos für satzungsgemäße Vereins- und Öffentlichkeitszwecke zu nutzen.
                </p>
                <p>
                  (2) Die Übertragung von Nutzungsrechten an Dritte oder die kommerzielle Weiterveräußerung bedarf der vorherigen schriftlichen Zustimmung von SichtbarGutes.
                </p>
                <p>
                  (3) SichtbarGutes ist berechtigt, die erstellten Arbeitsergebnisse in anonymisierter oder mit dem Kunden abgestimmter Form als Referenz für die Eigenwerbung (z. B. im Portfolio oder auf der Website) zu präsentieren.
                </p>
              </section>

              {/* § 6 Haftung */}
              <section className="space-y-2">
                <h3 className="text-base font-bold text-[#162d50]">§ 6 Gewährleistung & Haftung</h3>
                <p>
                  (1) SichtbarGutes haftet unbeschränkt für Schäden aus der Verletzung des Lebens, des Körpers oder der Gesundheit, die auf einer vorsätzlichen oder fahrlässigen Pflichtverletzung beruhen, sowie für sonstige Schäden bei Vorsatz oder grober Fahrlässigkeit.
                </p>
                <p>
                  (2) Bei leichter Fahrlässigkeit haftet SichtbarGutes nur bei Verletzung wesentlicher Vertragspflichten (Kardinalpflichten), begrenzt auf den bei Vertragsschluss typischerweise vorhersehbaren Schaden.
                </p>
                <p>
                  (3) Da die Entscheidung über Förderanträge im Ermessen der zuständigen Förderstellen liegt, übernimmt SichtbarGutes keine Gewähr oder Erfolgsgarantie für die positive Bewilligung eines Förderantrags, sofern eine Ablehnung nicht auf einer grob pflichtwidrigen Zuarbeit von SichtbarGutes beruht.
                </p>
              </section>

              {/* § 7 Schlussbestimmungen */}
              <section className="space-y-2 pt-4 border-t border-[#dcd8cf]">
                <h3 className="text-base font-bold text-[#162d50]">§ 7 Schlussbestimmungen & Gerichtsstand</h3>
                <p>
                  (1) Es gilt das Recht der Bundesrepublik Deutschland unter Ausschluss des UN-Kaufrechts.
                </p>
                <p>
                  (2) Sofern der Kunde Kaufmann, juristische Person des öffentlichen Rechts oder ein öffentlich-rechtliches Sondervermögen ist, ist Bonn ausschließlicher Gerichtsstand für alle Streitigkeiten aus diesem Vertrag.
                </p>
                <p>
                  (3) Sollten einzelne Bestimmungen dieser AGB ganz oder teilweise unwirksam sein oder werden, berührt dies die Wirksamkeit der übrigen Bestimmungen nicht.
                </p>
                <p className="text-xs text-[#706e65] pt-2">
                  Stand: September 2026 · SichtbarGutes (Klaas Herting, Bonn)
                </p>
              </section>

            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="bg-[#f4f7fa] px-6 py-3 border-t border-[#dcd8cf] flex items-center justify-between text-xs text-[#706e65] shrink-0">
          <span>SichtbarGutes · Rechtliche Dokumente</span>
          <button
            onClick={onClose}
            className="bg-[#162d50] hover:bg-[#2f5b7a] text-white px-4 py-1.5 font-bold transition-colors"
          >
            Schließen
          </button>
        </div>
      </div>
    </div>
  );
};
