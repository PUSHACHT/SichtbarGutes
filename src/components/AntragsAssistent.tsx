import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Sparkles, 
  RotateCcw, 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  Download, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  AlertCircle,
  Building2,
  Calculator,
  Target,
  ShieldCheck,
  Info
} from 'lucide-react';
import { AntragData, AntragChapter, CostItem, BoardMember } from '../types/antrag';
import { initialAntragState, musterAntragData } from '../data/antragMusterdaten';
import { generateAntragPDF } from '../utils/pdfGenerator';

const STORAGE_KEY = 'dsee-mikro-antrag';

interface Props {
  onClose?: () => void;
  isModal?: boolean;
}

export const AntragsAssistent: React.FC<Props> = ({ onClose, isModal = false }) => {
  const [data, setData] = useState<AntragData>(initialAntragState);
  const [currentChapter, setCurrentChapter] = useState<AntragChapter>('start');
  const [hasSavedDraft, setHasSavedDraft] = useState(false);
  const [saveToast, setSaveToast] = useState(false);
  const [pdfGenerated, setPdfGenerated] = useState(false);

  // Check LocalStorage on Mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.vereinsname) {
          setHasSavedDraft(true);
        }
      }
    } catch (e) {
      console.error('Failed to read localStorage draft', e);
    }
  }, []);

  // Save to LocalStorage on Data Change
  const updateData = (fields: Partial<AntragData>) => {
    setData((prev) => {
      const next = { ...prev, ...fields };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        setHasSavedDraft(true);
        setSaveToast(true);
        setTimeout(() => setSaveToast(false), 2000);
      } catch (e) {
        console.error('Failed to save to localStorage', e);
      }
      return next;
    });
  };

  const handleLoadSample = () => {
    setData(musterAntragData);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(musterAntragData));
    setHasSavedDraft(true);
    setCurrentChapter('basisdaten');
  };

  const handleResumeDraft = () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setData(JSON.parse(saved));
      }
    } catch (e) {
      console.error(e);
    }
    setCurrentChapter('basisdaten');
  };

  const handleStartFresh = () => {
    setData(initialAntragState);
    localStorage.removeItem(STORAGE_KEY);
    setHasSavedDraft(false);
    setCurrentChapter('basisdaten');
  };

  // Calculations for Financial Chapter
  const totalCosts = data.kostenPositionen.reduce((sum, item) => sum + (Number(item.amount) || 0), 0);
  const eigenmittel = Math.round(totalCosts * (data.eigenmittelAnteilProzent / 100) * 100) / 100;
  const dseeFoerderung = Math.round((totalCosts - eigenmittel) * 100) / 100;
  const isBudgetValid = totalCosts > 0 && totalCosts <= 1500;

  // Add / Remove Cost Items
  const handleAddCostItem = () => {
    const newItem: CostItem = {
      id: 'cost-' + Date.now(),
      category: 'werkvertrag',
      description: '',
      amount: 100
    };
    updateData({ kostenPositionen: [...data.kostenPositionen, newItem] });
  };

  const handleRemoveCostItem = (id: string) => {
    updateData({ kostenPositionen: data.kostenPositionen.filter((item) => item.id !== id) });
  };

  const handleUpdateCostItem = (id: string, field: keyof CostItem, value: any) => {
    const updated = data.kostenPositionen.map((item) => {
      if (item.id === id) {
        return { ...item, [field]: value };
      }
      return item;
    });
    updateData({ kostenPositionen: updated });
  };

  // Add / Remove Board Members
  const handleAddBoardMember = () => {
    const newMember: BoardMember = {
      id: 'v-' + Date.now(),
      name: '',
      role: 'Vorstand',
      email: '',
      phone: ''
    };
    updateData({ vorstaende: [...data.vorstaende, newMember] });
  };

  const handleRemoveBoardMember = (id: string) => {
    if (data.vorstaende.length <= 1) return;
    updateData({ vorstaende: data.vorstaende.filter((m) => m.id !== id) });
  };

  const handleUpdateBoardMember = (id: string, field: keyof BoardMember, value: string) => {
    const updated = data.vorstaende.map((m) => {
      if (m.id === id) {
        return { ...m, [field]: value };
      }
      return m;
    });
    updateData({ vorstaende: updated });
  };

  const handleConfirmAllDeclarations = () => {
    updateData({
      erklaerungGemeinnuetzigkeit: true,
      erklaerungBesserstellungsverbot: true,
      erklaerungZweckbindung: true,
      erklaerungKeineDoppelfoerderung: true,
      erklaerungSubventionsgesetz: true
    });
  };

  // Navigation steps
  const chapters: { id: AntragChapter; title: string; subtitle: string; icon: any }[] = [
    { id: 'basisdaten', title: '1. Basisdaten', subtitle: 'Titel & Zeitraum', icon: FileText },
    { id: 'organisation', title: '2. Organisation', subtitle: 'Verein & Vorstand', icon: Building2 },
    { id: 'finanzplan', title: '3. Finanzplan', subtitle: 'Kosten & 90% Quote', icon: Calculator },
    { id: 'vorhaben', title: '4. Vorhaben', subtitle: 'Ziele & Maßnahmen', icon: Target },
    { id: 'erklaerungen', title: '5. Erklärungen', subtitle: 'Rechtliches', icon: ShieldCheck },
    { id: 'review', title: '6. Abschluss', subtitle: 'PDF-Export', icon: Download },
  ];

  const currentChapterIndex = chapters.findIndex((c) => c.id === currentChapter);

  const goToNextChapter = () => {
    if (currentChapterIndex < chapters.length - 1) {
      setCurrentChapter(chapters[currentChapterIndex + 1].id);
      window.scrollTo({ top: document.getElementById('antrags-assistent')?.offsetTop || 0, behavior: 'smooth' });
    }
  };

  const goToPrevChapter = () => {
    if (currentChapterIndex > 0) {
      setCurrentChapter(chapters[currentChapterIndex - 1].id);
      window.scrollTo({ top: document.getElementById('antrags-assistent')?.offsetTop || 0, behavior: 'smooth' });
    } else {
      setCurrentChapter('start');
    }
  };

  const handleDownloadPDF = () => {
    generateAntragPDF(data);
    setPdfGenerated(true);
  };

  return (
    <div id="antrags-assistent" className="w-full bg-white border border-[#dcd8cf] shadow-xl overflow-hidden text-[#2b2a27]">
      
      {/* 1. ASSISTANT TOP BAR */}
      <div className="bg-[#0b1a3a] text-white p-6 sm:px-8 sm:py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-[#2f5b7a]">
        <div className="flex items-center gap-3">
          <div className="size-10 bg-[#162d50] border border-[#2f5b7a] flex items-center justify-center text-white shrink-0">
            <FileText className="size-5 text-[#d8e2f0]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#d8e2f0] bg-[#2f5b7a] px-2 py-0.5">
                DSEE-Mikroförderung (1.500 €)
              </span>
              <span className="text-xs text-[#d8e2f0]/80">Interaktiver Assistent</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white mt-0.5">
              DSEE-Mikroantrag Schritt für Schritt erstellen
            </h3>
          </div>
        </div>

        {/* Action Controls Top Right */}
        <div className="flex items-center gap-2 self-stretch md:self-auto justify-end">
          {saveToast && (
            <span className="text-xs text-emerald-400 flex items-center gap-1 bg-[#162d50] px-2.5 py-1 border border-emerald-500/30">
              <Check className="size-3.5" /> Automatisch gespeichert
            </span>
          )}

          {currentChapter !== 'start' && (
            <button
              onClick={() => setCurrentChapter('start')}
              className="text-xs bg-[#162d50] hover:bg-[#2f5b7a] text-[#d8e2f0] hover:text-white px-3 py-1.5 border border-[#2f5b7a] transition-colors"
            >
              Startscreen
            </button>
          )}

          {onClose && isModal && (
            <button
              onClick={onClose}
              className="text-xs bg-red-900/40 hover:bg-red-900 text-white px-3 py-1.5 transition-colors"
            >
              Schließen
            </button>
          )}
        </div>
      </div>

      {/* 2. STARTSCREEN */}
      {currentChapter === 'start' && (
        <div className="p-6 sm:p-12 flex flex-col items-center justify-center max-w-3xl mx-auto text-center gap-8">
          
          <div className="flex flex-col items-center gap-4">
            <div className="inline-flex items-center gap-2 bg-[#f4f7fa] text-[#162d50] border border-[#dcd8cf] px-3.5 py-1 text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="size-3.5 text-[#2f5b7a]" />
              <span>100% Sicher · Daten bleiben auf Ihrem PC · Sofortiger PDF-Download</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold text-[#162d50] tracking-tight leading-tight max-w-2xl">
              In wenigen Minuten zum prüffähigen DSEE-Förderantrag
            </h2>
            <p className="text-[#706e65] text-base sm:text-lg leading-relaxed max-w-2xl">
              Erfassen Sie alle erforderlichen Angaben des offiziellen DSEE-Mikroförderantrags in 5 geführten Schritten. Ihr fertiges Antrags-PDF steht am Ende sofort zum Ausdrucken und Einreichen bereit.
            </p>
          </div>

          {/* Central Hero CTA Card */}
          <div className="w-full bg-gradient-to-b from-white to-[#f4f7fa] border-2 border-[#162d50] p-8 sm:p-10 shadow-lg flex flex-col items-center gap-6">
            <div className="size-16 bg-[#162d50] text-white flex items-center justify-center shadow-md">
              <FileText className="size-8 text-white" />
            </div>

            <div className="flex flex-col items-center gap-2">
              <h3 className="text-xl sm:text-2xl font-bold text-[#162d50]">
                Neuen Förderantrag starten
              </h3>
              <p className="text-sm text-[#706e65] max-w-md">
                Kostenlos, ohne Registrierung. Ihre Eingaben werden automatisch lokal im Browser zwischengespeichert.
              </p>
            </div>

            {/* Main Primary CTA Button */}
            <button
              onClick={handleStartFresh}
              className="w-full sm:w-auto min-w-[280px] bg-[#162d50] hover:bg-[#2f5b7a] text-white font-bold py-4 px-8 text-base uppercase tracking-wider flex items-center justify-center gap-3 transition-all duration-200 shadow-md hover:shadow-xl cursor-pointer group"
            >
              <Plus className="size-5 transition-transform group-hover:rotate-90 duration-300" />
              <span>Jetzt Antrag erstellen</span>
              <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
            </button>

            {/* Trust & Features Strip */}
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 pt-4 border-t border-[#dcd8cf] w-full text-xs text-[#2b2a27]">
              <div className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="size-4 text-emerald-600 shrink-0" />
                <span>5 übersichtliche Schritte</span>
              </div>
              <div className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="size-4 text-emerald-600 shrink-0" />
                <span>Automatischer PDF-Export</span>
              </div>
              <div className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="size-4 text-emerald-600 shrink-0" />
                <span>100% kostenfrei & privat</span>
              </div>
            </div>

            {/* Secondary Option: Sample data / Resume draft */}
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-[#706e65] pt-1">
              <button
                onClick={handleLoadSample}
                className="hover:text-[#162d50] font-semibold underline flex items-center gap-1 cursor-pointer transition-colors"
              >
                <Sparkles className="size-3.5 text-[#2f5b7a]" />
                <span>Mit Beispieldaten testen</span>
              </button>

              {hasSavedDraft && (
                <>
                  <span className="text-[#dcd8cf]">·</span>
                  <button
                    onClick={handleResumeDraft}
                    className="text-[#2f5b7a] hover:text-[#162d50] font-bold underline flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <RotateCcw className="size-3.5" />
                    <span>Gespeicherten Entwurf fortsetzen</span>
                  </button>
                </>
              )}
            </div>

          </div>

          <div className="bg-[#f4f7fa] p-4 border border-[#dcd8cf] flex items-center gap-3 text-xs text-[#706e65] max-w-2xl text-left">
            <Info className="size-5 text-[#2f5b7a] shrink-0" />
            <p>
              <strong>Hinweis:</strong> Diese Arbeitshilfe basiert auf den offiziellen Richtlinien des DSEE-Mikroförderprogramms. Alle Daten verbleiben lokal auf Ihrem Endgerät und werden nicht an Dritte übertragen.
            </p>
          </div>
        </div>
      )}

      {/* 3. WIZARD CHAPTERS WORKFLOW */}
      {currentChapter !== 'start' && (
        <div className="flex flex-col w-full">
          
          {/* Chapter Navigation Tabs */}
          <div className="bg-[#f4f7fa] border-b border-[#dcd8cf] px-4 sm:px-8 py-3 overflow-x-auto scrollbar-thin">
            <div className="flex items-center gap-2 sm:gap-4 min-w-max">
              {chapters.map((chap, idx) => {
                const isActive = currentChapter === chap.id;
                const isPast = idx < currentChapterIndex;
                const IconComponent = chap.icon;

                return (
                  <button
                    key={chap.id}
                    onClick={() => setCurrentChapter(chap.id)}
                    className={`flex items-center gap-2 px-3 py-2 text-xs font-bold transition-all border ${
                      isActive
                        ? 'bg-[#162d50] text-white border-[#162d50] shadow-sm'
                        : isPast
                        ? 'bg-white text-[#162d50] border-[#dcd8cf] hover:border-[#2f5b7a]'
                        : 'bg-transparent text-[#706e65] border-transparent hover:text-[#162d50]'
                    }`}
                  >
                    <IconComponent className={`size-3.5 ${isActive ? 'text-white' : isPast ? 'text-[#2f5b7a]' : 'text-gray-400'}`} />
                    <span>{chap.title}</span>
                    {isPast && <Check className="size-3 text-emerald-600 ml-0.5" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Form Chapter Content */}
          <div className="p-6 sm:p-10 max-w-4xl mx-auto w-full">
            
            {/* KAPITEL 1: BASISDATEN & BERECHTIGUNG */}
            {currentChapter === 'basisdaten' && (
              <div className="flex flex-col gap-6">
                <div>
                  <h3 className="text-2xl font-bold text-[#162d50]">1. Basisdaten & Berechtigungsprüfung</h3>
                  <p className="text-sm text-[#706e65] mt-1">
                    Geben Sie hier die grundlegenden Projektdaten und den Durchführungsort an.
                  </p>
                </div>

                {/* DSEE Eligibility Checkbox Alert */}
                <div className="bg-[#f4f7fa] border border-[#2f5b7a]/30 p-4 flex flex-col gap-3">
                  <p className="text-xs font-bold uppercase tracking-wider text-[#162d50] flex items-center gap-1.5">
                    <ShieldCheck className="size-4 text-[#2f5b7a]" /> DSEE-Fördervoraussetzungen:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <label className="flex items-center gap-2 cursor-pointer font-medium text-[#2b2a27]">
                      <input
                        type="checkbox"
                        checked={data.istGemeinnuetzig}
                        onChange={(e) => updateData({ istGemeinnuetzig: e.target.checked })}
                        className="accent-[#2f5b7a] size-4"
                      />
                      <span>Organisation ist gemeinnützig anerkannt</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer font-medium text-[#2b2a27]">
                      <input
                        type="checkbox"
                        checked={data.istUnter50k}
                        onChange={(e) => updateData({ istUnter50k: e.target.checked })}
                        className="accent-[#2f5b7a] size-4"
                      />
                      <span>Gemeinde hat unter 50.000 Einwohner</span>
                    </label>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2 flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-[#2b2a27]">Projekttitel *</label>
                    <input
                      type="text"
                      value={data.projekttitel}
                      onChange={(e) => updateData({ projekttitel: e.target.value })}
                      placeholder="z.B. Digitale Nachwuchsgewinnung & Website-Relaunch"
                      className="border border-[#dcd8cf] p-3 text-sm focus:outline-none focus:border-[#2f5b7a]"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-[#2b2a27]">Projektstart *</label>
                    <input
                      type="date"
                      value={data.projektStart}
                      onChange={(e) => updateData({ projektStart: e.target.value })}
                      className="border border-[#dcd8cf] p-3 text-sm focus:outline-none focus:border-[#2f5b7a]"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-[#2b2a27]">Projektende *</label>
                    <input
                      type="date"
                      value={data.projektEnde}
                      onChange={(e) => updateData({ projektEnde: e.target.value })}
                      className="border border-[#dcd8cf] p-3 text-sm focus:outline-none focus:border-[#2f5b7a]"
                    />
                  </div>

                  <div className="sm:col-span-2 flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-[#2b2a27]">Durchführungsort (PLZ & Ort) *</label>
                    <input
                      type="text"
                      value={data.projektOrt}
                      onChange={(e) => updateData({ projektOrt: e.target.value })}
                      placeholder="z.B. 15859 Storkow (Mark)"
                      className="border border-[#dcd8cf] p-3 text-sm focus:outline-none focus:border-[#2f5b7a]"
                    />
                  </div>

                  <div className="sm:col-span-2 flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-[#2b2a27]">DSEE-Förderschwerpunkt</label>
                    <select
                      value={data.foerderschwerpunkt}
                      onChange={(e) => updateData({ foerderschwerpunkt: e.target.value })}
                      className="border border-[#dcd8cf] p-3 text-sm focus:outline-none focus:border-[#2f5b7a] bg-white"
                    >
                      <option value="Ehrenamt gewinnen und binden (z.B. Nachwuchsgewinnung & digitale Sichtbarkeit)">
                        1. Ehrenamt gewinnen und binden (z.B. Nachwuchsgewinnung & digitale Sichtbarkeit)
                      </option>
                      <option value="Ehrenamtliche Strukturen digitalisieren und professionalisieren">
                        2. Ehrenamtliche Strukturen digitalisieren und professionalisieren
                      </option>
                      <option value="Gemeinschaft & Engagement im ländlichen Raum stärken">
                        3. Gemeinschaft & Engagement im ländlichen Raum stärken
                      </option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* KAPITEL 2: ORGANISATION & VORSTAND */}
            {currentChapter === 'organisation' && (
              <div className="flex flex-col gap-6">
                <div>
                  <h3 className="text-2xl font-bold text-[#162d50]">2. Organisation & Vorstand</h3>
                  <p className="text-sm text-[#706e65] mt-1">
                    Angaben zum eingetragenen Verein, Freistellungsbescheid und den vertretungsberechtigten Personen.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2 flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-[#2b2a27]">Vollständiger Vereinsname *</label>
                    <input
                      type="text"
                      value={data.vereinsname}
                      onChange={(e) => updateData({ vereinsname: e.target.value })}
                      placeholder="z.B. Förderverein Kultur & Sport Storkow e.V."
                      className="border border-[#dcd8cf] p-3 text-sm focus:outline-none focus:border-[#2f5b7a]"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-[#2b2a27]">Amtsgericht / Registergericht</label>
                    <input
                      type="text"
                      value={data.registergericht}
                      onChange={(e) => updateData({ registergericht: e.target.value })}
                      placeholder="z.B. Amtsgericht Frankfurt (Oder)"
                      className="border border-[#dcd8cf] p-3 text-sm focus:outline-none focus:border-[#2f5b7a]"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-[#2b2a27]">Registernummer (VR-Nr.)</label>
                    <input
                      type="text"
                      value={data.registernummer}
                      onChange={(e) => updateData({ registernummer: e.target.value })}
                      placeholder="z.B. VR 4321 FF"
                      className="border border-[#dcd8cf] p-3 text-sm focus:outline-none focus:border-[#2f5b7a]"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-[#2b2a27]">Zuständiges Finanzamt</label>
                    <input
                      type="text"
                      value={data.finanzamt}
                      onChange={(e) => updateData({ finanzamt: e.target.value })}
                      placeholder="z.B. Finanzamt Frankfurt (Oder)"
                      className="border border-[#dcd8cf] p-3 text-sm focus:outline-none focus:border-[#2f5b7a]"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-[#2b2a27]">Steuernummer</label>
                    <input
                      type="text"
                      value={data.steuernummer}
                      onChange={(e) => updateData({ steuernummer: e.target.value })}
                      placeholder="z.B. 061/141/08921"
                      className="border border-[#dcd8cf] p-3 text-sm focus:outline-none focus:border-[#2f5b7a]"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-[#2b2a27]">Straße & Hausnummer</label>
                    <input
                      type="text"
                      value={data.strasse}
                      onChange={(e) => updateData({ strasse: e.target.value })}
                      placeholder="z.B. Burgstraße 14"
                      className="border border-[#dcd8cf] p-3 text-sm focus:outline-none focus:border-[#2f5b7a]"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div className="col-span-1 flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-[#2b2a27]">PLZ</label>
                      <input
                        type="text"
                        value={data.plz}
                        onChange={(e) => updateData({ plz: e.target.value })}
                        placeholder="15859"
                        className="border border-[#dcd8cf] p-3 text-sm focus:outline-none focus:border-[#2f5b7a]"
                      />
                    </div>
                    <div className="col-span-2 flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-[#2b2a27]">Ort</label>
                      <input
                        type="text"
                        value={data.ort}
                        onChange={(e) => updateData({ ort: e.target.value })}
                        placeholder="Storkow (Mark)"
                        className="border border-[#dcd8cf] p-3 text-sm focus:outline-none focus:border-[#2f5b7a]"
                      />
                    </div>
                  </div>
                </div>

                {/* Vorstandsliste */}
                <div className="pt-4 border-t border-[#dcd8cf] flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-[#162d50]">Vertretungsberechtigte Vorstände</h4>
                    <button
                      onClick={handleAddBoardMember}
                      className="text-xs text-[#2f5b7a] font-bold hover:underline flex items-center gap-1"
                    >
                      <Plus className="size-3.5" /> Weiteren Vorstand hinzufügen
                    </button>
                  </div>

                  {data.vorstaende.map((m) => (
                    <div key={m.id} className="bg-[#f4f7fa] p-3 border border-[#dcd8cf] grid grid-cols-1 sm:grid-cols-4 gap-2 items-center">
                      <input
                        type="text"
                        value={m.name}
                        onChange={(e) => handleUpdateBoardMember(m.id, 'name', e.target.value)}
                        placeholder="Name, Vorname"
                        className="border border-[#dcd8cf] p-2 text-xs bg-white"
                      />
                      <input
                        type="text"
                        value={m.role}
                        onChange={(e) => handleUpdateBoardMember(m.id, 'role', e.target.value)}
                        placeholder="Funktion (z.B. 1. Vorsitz)"
                        className="border border-[#dcd8cf] p-2 text-xs bg-white"
                      />
                      <input
                        type="email"
                        value={m.email}
                        onChange={(e) => handleUpdateBoardMember(m.id, 'email', e.target.value)}
                        placeholder="E-Mail"
                        className="border border-[#dcd8cf] p-2 text-xs bg-white"
                      />
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={m.phone}
                          onChange={(e) => handleUpdateBoardMember(m.id, 'phone', e.target.value)}
                          placeholder="Telefon"
                          className="border border-[#dcd8cf] p-2 text-xs bg-white flex-1"
                        />
                        {data.vorstaende.length > 1 && (
                          <button
                            onClick={() => handleRemoveBoardMember(m.id)}
                            className="text-red-500 hover:text-red-700 p-1"
                            title="Löschen"
                          >
                            <Trash2 className="size-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Bankverbindung */}
                <div className="pt-4 border-t border-[#dcd8cf] flex flex-col gap-3">
                  <h4 className="text-sm font-bold text-[#162d50]">Bankverbindung des Vereins (für Fördermittel-Auszahlung)</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="sm:col-span-2 flex flex-col gap-1">
                      <label className="text-[11px] font-bold text-[#2b2a27]">IBAN</label>
                      <input
                        type="text"
                        value={data.iban}
                        onChange={(e) => updateData({ iban: e.target.value })}
                        placeholder="DE00 0000 0000 0000 0000 00"
                        className="border border-[#dcd8cf] p-2.5 text-xs"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[11px] font-bold text-[#2b2a27]">BIC</label>
                      <input
                        type="text"
                        value={data.bic}
                        onChange={(e) => updateData({ bic: e.target.value })}
                        placeholder="z.B. GENODE..."
                        className="border border-[#dcd8cf] p-2.5 text-xs"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* KAPITEL 3: FINANZPLAN & LIVE-RECHNER */}
            {currentChapter === 'finanzplan' && (
              <div className="flex flex-col gap-6">
                <div>
                  <h3 className="text-2xl font-bold text-[#162d50]">3. Finanzplan & DSEE-Kalkulator</h3>
                  <p className="text-sm text-[#706e65] mt-1">
                    Stellen Sie hier Ihre geplanten Ausgaben zusammen. Die 90% Förderung und der 10% Eigenanteil werden in Echtzeit berechnet.
                  </p>
                </div>

                {/* KPI Overview Banner */}
                <div className="bg-[#162d50] text-white p-5 border border-[#2f5b7a] grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[11px] text-[#d8e2f0] uppercase font-bold">Gesamtausgaben</span>
                    <span className="text-2xl font-bold">{totalCosts.toFixed(2)} €</span>
                    <span className="text-[10px] text-[#d8e2f0]">Maximal 1.500,00 €</span>
                  </div>
                  <div className="flex flex-col gap-0.5 border-t sm:border-t-0 sm:border-l border-[#2f5b7a] sm:pl-4 pt-2 sm:pt-0">
                    <span className="text-[11px] text-emerald-400 uppercase font-bold">DSEE-Förderung (90 %)</span>
                    <span className="text-2xl font-bold text-emerald-300">{dseeFoerderung.toFixed(2)} €</span>
                    <span className="text-[10px] text-[#d8e2f0]">Zuschuss von der Stiftung</span>
                  </div>
                  <div className="flex flex-col gap-0.5 border-t sm:border-t-0 sm:border-l border-[#2f5b7a] sm:pl-4 pt-2 sm:pt-0">
                    <span className="text-[11px] text-[#d8e2f0] uppercase font-bold">Vereins-Eigenanteil (10 %)</span>
                    <span className="text-2xl font-bold">{eigenmittel.toFixed(2)} €</span>
                    <span className="text-[10px] text-[#d8e2f0]">Erst nach Bewilligung fällig</span>
                  </div>
                </div>

                {!isBudgetValid && totalCosts > 1500 && (
                  <div className="bg-amber-50 border border-amber-300 p-3 text-xs text-amber-800 flex items-center gap-2">
                    <AlertCircle className="size-4 shrink-0 text-amber-600" />
                    <span>Hinweis: Das Gesamtbudget überschreitet 1.500 €. Bei DSEE-Mikroförderung beträgt das Maximum exakt 1.500 €.</span>
                  </div>
                )}

                {/* Kostenpositionen Tabelle */}
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-[#162d50]">Geplante Ausgaben & Maßnahmen</h4>
                    <button
                      onClick={handleAddCostItem}
                      className="text-xs bg-[#2f5b7a] hover:bg-[#162d50] text-white font-bold px-3 py-1.5 flex items-center gap-1 transition-colors"
                    >
                      <Plus className="size-3.5" /> Position hinzufügen
                    </button>
                  </div>

                  <div className="flex flex-col gap-2">
                    {data.kostenPositionen.map((pos) => (
                      <div key={pos.id} className="bg-[#f4f7fa] p-3 border border-[#dcd8cf] grid grid-cols-1 sm:grid-cols-12 gap-2 items-center">
                        <div className="sm:col-span-3">
                          <select
                            value={pos.category}
                            onChange={(e) => handleUpdateCostItem(pos.id, 'category', e.target.value)}
                            className="w-full border border-[#dcd8cf] p-2 text-xs bg-white"
                          >
                            <option value="werkvertrag">Werkvertrag (z.B. Website)</option>
                            <option value="honorar">Honorar (z.B. Schulung)</option>
                            <option value="sach">Sachausgabe (z.B. Flyer)</option>
                          </select>
                        </div>
                        <div className="sm:col-span-6">
                          <input
                            type="text"
                            value={pos.description}
                            onChange={(e) => handleUpdateCostItem(pos.id, 'description', e.target.value)}
                            placeholder="Beschreibung der Maßnahme / Anschaffung"
                            className="w-full border border-[#dcd8cf] p-2 text-xs bg-white"
                          />
                        </div>
                        <div className="sm:col-span-2 flex items-center gap-1">
                          <input
                            type="number"
                            min="0"
                            step="10"
                            value={pos.amount}
                            onChange={(e) => handleUpdateCostItem(pos.id, 'amount', parseFloat(e.target.value) || 0)}
                            className="w-full border border-[#dcd8cf] p-2 text-xs bg-white text-right font-bold"
                          />
                          <span className="text-xs text-[#706e65]">€</span>
                        </div>
                        <div className="sm:col-span-1 flex justify-end">
                          <button
                            onClick={() => handleRemoveCostItem(pos.id)}
                            className="text-red-500 hover:text-red-700 p-1"
                            title="Position entfernen"
                          >
                            <Trash2 className="size-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* KAPITEL 4: VORHABEN & ZIELE */}
            {currentChapter === 'vorhaben' && (
              <div className="flex flex-col gap-6">
                <div>
                  <h3 className="text-2xl font-bold text-[#162d50]">4. Vorhaben, Ziele & Wirkung</h3>
                  <p className="text-sm text-[#706e65] mt-1">
                    Beschreiben Sie die Ausgangssituation, Ihre Projektziele und wie Ehrenamtliche eingebunden werden.
                  </p>
                </div>

                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-[#2b2a27]">Kurzbeschreibung des Vorhabens (Abstract) *</label>
                    <textarea
                      rows={3}
                      value={data.kurzbeschreibung}
                      onChange={(e) => updateData({ kurzbeschreibung: e.target.value })}
                      placeholder="Worum geht es in dem Projekt in 2-3 Sätzen?"
                      className="border border-[#dcd8cf] p-3 text-sm focus:outline-none focus:border-[#2f5b7a]"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-[#2b2a27]">Ausgangslage im Verein & Handlungsbedarf</label>
                    <textarea
                      rows={3}
                      value={data.ausgangslage}
                      onChange={(e) => updateData({ ausgangslage: e.target.value })}
                      placeholder="Vor welchen Herausforderungen steht der Verein bisher?"
                      className="border border-[#dcd8cf] p-3 text-sm focus:outline-none focus:border-[#2f5b7a]"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-[#2b2a27]">Konkrete Projektziele *</label>
                    <textarea
                      rows={3}
                      value={data.hauptziele}
                      onChange={(e) => updateData({ hauptziele: e.target.value })}
                      placeholder="Welche messbaren Resultate sollen erreicht werden?"
                      className="border border-[#dcd8cf] p-3 text-sm focus:outline-none focus:border-[#2f5b7a]"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-[#2b2a27]">Einbindung von Ehrenamtlichen & Mitgliedern</label>
                    <textarea
                      rows={2}
                      value={data.einbindungEhrenamt}
                      onChange={(e) => updateData({ einbindungEhrenamt: e.target.value })}
                      placeholder="Wie wirken ehrenamtliche Helfer aktiv am Projekt mit?"
                      className="border border-[#dcd8cf] p-3 text-sm focus:outline-none focus:border-[#2f5b7a]"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* KAPITEL 5: ERKLÄRUNGEN */}
            {currentChapter === 'erklaerungen' && (
              <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-[#162d50]">5. Rechtliche Erklärungen</h3>
                    <p className="text-sm text-[#706e65] mt-1">
                      Pflichtbestätigungen gemäß den Förderrichtlinien der Deutschen Stiftung für Engagement und Ehrenamt.
                    </p>
                  </div>
                  <button
                    onClick={handleConfirmAllDeclarations}
                    className="text-xs bg-[#2f5b7a] hover:bg-[#162d50] text-white font-bold px-3 py-1.5 flex items-center gap-1 transition-colors shrink-0"
                  >
                    <Check className="size-3.5" /> Alle Punkte bestätigen
                  </button>
                </div>

                <div className="flex flex-col gap-3">
                  {[
                    {
                      key: 'erklaerungGemeinnuetzigkeit',
                      label: 'Gemeinnützigkeit & Freistellungsbescheid',
                      desc: 'Der Verein bestätigt, dass die Gemeinnützigkeit durch das zuständige Finanzamt anerkannt ist und ein gültiger Freistellungsbescheid vorliegt.'
                    },
                    {
                      key: 'erklaerungBesserstellungsverbot',
                      label: 'Besserstellungsverbot & Sparsamkeit',
                      desc: 'Die Mittel werden wirtschaftlich und sparsam verwendet. Beschäftigte oder Auftragnehmer werden nicht besser gestellt als vergleichbare Bundesbedienstete.'
                    },
                    {
                      key: 'erklaerungZweckbindung',
                      label: 'Zweckbindung der Fördermittel',
                      desc: 'Die Zuwendung wird ausschließlich für die im Antrag benannten Maßnahmen zur Ehrenamtsstärkung verwendet.'
                    },
                    {
                      key: 'erklaerungKeineDoppelfoerderung',
                      label: 'Keine Doppelförderung',
                      desc: 'Für die hier beantragten Ausgaben werden keine weiteren öffentlichen Zuschüsse bei anderen Stellen in Anspruch genommen.'
                    },
                    {
                      key: 'erklaerungSubventionsgesetz',
                      label: 'Subventionsgesetz (§ 264 StGB)',
                      desc: 'Die subventionserheblichen Tatsachen und die Strafbarkeit falscher Angaben gemäß § 264 StGB sind zur Kenntnis genommen worden.'
                    }
                  ].map((item) => {
                    const isChecked = (data as any)[item.key];
                    return (
                      <label
                        key={item.key}
                        className={`p-4 border flex items-start gap-3 cursor-pointer transition-colors ${
                          isChecked ? 'bg-white border-[#2f5b7a]' : 'bg-[#f4f7fa] border-[#dcd8cf]'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={(e) => updateData({ [item.key]: e.target.checked } as any)}
                          className="accent-[#2f5b7a] size-4 mt-1"
                        />
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-[#162d50]">{item.label}</span>
                          <span className="text-xs text-[#706e65] mt-0.5">{item.desc}</span>
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>
            )}

            {/* KAPITEL 6: REVIEW & PDF-EXPORT */}
            {currentChapter === 'review' && (
              <div className="flex flex-col gap-6">
                <div>
                  <h3 className="text-2xl font-bold text-[#162d50]">6. Zusammenfassung & PDF-Erstellung</h3>
                  <p className="text-sm text-[#706e65] mt-1">
                    Überprüfen Sie Ihren Antrag und laden Sie das fertige DIN-A4-Dokument herunter.
                  </p>
                </div>

                {/* PDF Download Action Banner */}
                <div className="bg-[#0b1a3a] text-white p-6 sm:p-8 border border-[#2f5b7a] flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
                  <div className="flex flex-col gap-2 text-center sm:text-left">
                    <div className="flex items-center gap-2 justify-center sm:justify-start">
                      <span className="text-xs bg-emerald-500 text-white font-bold px-2 py-0.5">Bereit zum Download</span>
                      <span className="text-xs text-[#d8e2f0]">Format: DIN A4 PDF</span>
                    </div>
                    <h4 className="text-xl sm:text-2xl font-bold text-white">
                      DSEE-Förderantrag jetzt generieren
                    </h4>
                    <p className="text-xs text-[#d8e2f0] max-w-md">
                      Erzeugt ein formelles, mehrseitiges Antragsdokument mit allen Stammdaten, Finanzierungsplan und Unterschriftenfeld.
                    </p>
                  </div>

                  <button
                    onClick={handleDownloadPDF}
                    className="bg-[#2f5b7a] hover:bg-[#3b6d91] text-white font-bold text-base px-6 py-4 flex items-center gap-3 transition-colors shrink-0 shadow-lg cursor-pointer"
                  >
                    <Download className="size-5" />
                    <span>PDF herunterladen</span>
                  </button>
                </div>

                {pdfGenerated && (
                  <div className="bg-emerald-50 border border-emerald-300 p-4 text-xs text-emerald-900 flex items-center gap-3">
                    <CheckCircle2 className="size-5 text-emerald-600 shrink-0" />
                    <div>
                      <p className="font-bold">PDF erfolgreich generiert!</p>
                      <p className="text-emerald-700">Die Datei wurde in Ihren Download-Ordner geladen. Sie können den Antrag nun ausdrucken oder digital signieren.</p>
                    </div>
                  </div>
                )}

                {/* Review Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-[#f4f7fa] p-4 border border-[#dcd8cf] flex flex-col gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#2f5b7a]">1. Basisdaten</span>
                    <p className="text-sm font-bold text-[#162d50]">{data.projekttitel || 'Kein Titel'}</p>
                    <p className="text-xs text-[#706e65]">Zeitraum: {data.projektStart || '-'} bis {data.projektEnde || '-'}</p>
                    <p className="text-xs text-[#706e65]">Ort: {data.projektOrt || '-'}</p>
                  </div>

                  <div className="bg-[#f4f7fa] p-4 border border-[#dcd8cf] flex flex-col gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#2f5b7a]">2. Organisation</span>
                    <p className="text-sm font-bold text-[#162d50]">{data.vereinsname || 'Kein Vereinsname'}</p>
                    <p className="text-xs text-[#706e65]">VR-Nr.: {data.registernummer || '-'}</p>
                    <p className="text-xs text-[#706e65]">Vorstand: {data.vorstaende.map((v) => v.name).filter(Boolean).join(', ') || '-'}</p>
                  </div>

                  <div className="bg-[#f4f7fa] p-4 border border-[#dcd8cf] flex flex-col gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#2f5b7a]">3. Finanzierung</span>
                    <p className="text-sm font-bold text-[#162d50]">{totalCosts.toFixed(2)} € Gesamtvolumen</p>
                    <p className="text-xs text-emerald-700 font-semibold">90% DSEE-Zuschuss: {dseeFoerderung.toFixed(2)} €</p>
                    <p className="text-xs text-[#706e65]">10% Eigenanteil: {eigenmittel.toFixed(2)} €</p>
                  </div>

                  <div className="bg-[#f4f7fa] p-4 border border-[#dcd8cf] flex flex-col gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#2f5b7a]">4. Rechtliches</span>
                    <p className="text-xs text-[#162d50] flex items-center gap-1">
                      <Check className="size-3.5 text-emerald-600" /> Gemeinnützigkeit & Freistellung bestätigt
                    </p>
                    <p className="text-xs text-[#162d50] flex items-center gap-1">
                      <Check className="size-3.5 text-emerald-600" /> Besserstellungsverbot akzeptiert
                    </p>
                    <p className="text-xs text-[#162d50] flex items-center gap-1">
                      <Check className="size-3.5 text-emerald-600" /> Zweckbindung & Subventionsklausel
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* WIZARD BOTTOM CONTROLS */}
            <div className="mt-8 pt-6 border-t border-[#dcd8cf] flex items-center justify-between">
              <button
                onClick={goToPrevChapter}
                className="bg-white hover:bg-gray-50 border border-[#dcd8cf] text-[#2b2a27] font-bold text-xs sm:text-sm px-4 sm:px-6 py-2.5 sm:py-3 flex items-center gap-2 transition-colors cursor-pointer"
              >
                <ArrowLeft className="size-4" />
                <span>Zurück</span>
              </button>

              {currentChapterIndex < chapters.length - 1 ? (
                <button
                  onClick={goToNextChapter}
                  className="bg-[#2f5b7a] hover:bg-[#162d50] text-white font-bold text-xs sm:text-sm px-5 sm:px-8 py-2.5 sm:py-3 flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <span>Weiter zu {chapters[currentChapterIndex + 1].title}</span>
                  <ArrowRight className="size-4" />
                </button>
              ) : (
                <button
                  onClick={handleDownloadPDF}
                  className="bg-[#2f5b7a] hover:bg-[#162d50] text-white font-bold text-xs sm:text-sm px-6 sm:px-8 py-2.5 sm:py-3 flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <Download className="size-4" />
                  <span>Antrags-PDF herunterladen</span>
                </button>
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
