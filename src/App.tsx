import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  Check, 
  Play, 
  Plus, 
  Minus, 
  Menu, 
  X,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  ExternalLink,
  Monitor,
  Globe,
  Video,
  Phone
} from 'lucide-react';
import imgRow from './assets/imgRow.svg';
import heroVideo from './assets/header-video.mp4';
import logoWhite from './assets/logo-white.svg';
import { 
  shortformReels, 
  longformProjects, 
  webProjects, 
  testimonials 
} from './data/portfolioData';
import { AntragsAssistent } from './components/AntragsAssistent';
import { Reveal } from './components/Reveal';

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [scrollY, setScrollY] = useState(0);

  // Parallax Scroll Listener
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Responsive Items Per Page for Shortform Slider
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [shortformIndex, setShortformIndex] = useState(0);
  const [playingShortIdx, setPlayingShortIdx] = useState<number | null>(null);
  const [longformIndex, setLongformIndex] = useState(0);
  const [isPlayingLongform, setIsPlayingLongform] = useState(false);
  const [webIndex, setWebIndex] = useState(0);
  const [activeLiveIframe, setActiveLiveIframe] = useState<number | null>(null);

  useEffect(() => {
    const updateItemsPerPage = () => {
      if (window.innerWidth >= 1024) {
        setItemsPerPage(3);
      } else if (window.innerWidth >= 768) {
        setItemsPerPage(2);
      } else {
        setItemsPerPage(1);
      }
    };
    updateItemsPerPage();
    window.addEventListener('resize', updateItemsPerPage);
    return () => window.removeEventListener('resize', updateItemsPerPage);
  }, []);

  // Shortform Carousel Handlers
  const totalShortformPages = Math.ceil(shortformReels.length / itemsPerPage);
  const currentShortformPage = Math.min(
    Math.floor(shortformIndex / itemsPerPage),
    totalShortformPages - 1
  );

  const handleShortformNext = () => {
    setPlayingShortIdx(null);
    setShortformIndex((prev) => {
      const maxStart = Math.max(0, shortformReels.length - itemsPerPage);
      if (prev >= maxStart) return 0;
      return Math.min(prev + itemsPerPage, maxStart);
    });
  };

  const handleShortformPrev = () => {
    setPlayingShortIdx(null);
    setShortformIndex((prev) => {
      const maxStart = Math.max(0, shortformReels.length - itemsPerPage);
      if (prev <= 0) return maxStart;
      return Math.max(0, prev - itemsPerPage);
    });
  };

  const handleShortformDotClick = (page: number) => {
    setPlayingShortIdx(null);
    const maxStart = Math.max(0, shortformReels.length - itemsPerPage);
    setShortformIndex(Math.min(page * itemsPerPage, maxStart));
  };

  // Longform Carousel Handlers
  const handleLongformPrev = () => {
    setIsPlayingLongform(false);
    setLongformIndex((prev) => (prev - 1 + longformProjects.length) % longformProjects.length);
  };
  const handleLongformNext = () => {
    setIsPlayingLongform(false);
    setLongformIndex((prev) => (prev + 1) % longformProjects.length);
  };

  // Web Projects Carousel Handlers
  const handleWebPrev = () => {
    setActiveLiveIframe(null);
    setWebIndex((prev) => (prev - 1 + webProjects.length) % webProjects.length);
  };
  const handleWebNext = () => {
    setActiveLiveIframe(null);
    setWebIndex((prev) => (prev + 1) % webProjects.length);
  };

  // Form State
  const [verein, setVerein] = useState('');
  const [plz, setPlz] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isGemeinnuetzig, setIsGemeinnuetzig] = useState(true);
  const [isUnter50k, setIsUnter50k] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const faqs = [
    {
      q: "Was genau ist die DSEE?",
      a: "Die Deutsche Stiftung für Engagement und Ehrenamt ist eine bundesunmittelbare Stiftung des öffentlichen Rechts. Sie unterstützt ländliche Ehrenämter direkt durch zielgerichtete Fördermodule."
    },
    {
      q: "Wie hoch fällt die Förderung konkret aus?",
      a: "Das maximale Projektbudget beträgt 1.500 €. Bei einer Förderquote von 90% übernimmt die DSEE 1.350 €. Ihr Verein trägt einen Eigenanteil von exakt 10% (maximal 150 €) – und zwar erst nach offizieller Bewilligung."
    },
    {
      q: "Ist mein Verein berechtigt?",
      a: "Förderfähig sind gemeinnützige Vereine, Stiftungen oder gGmbHs, die ehrenamtlich organisiert sind und ihren Sitz in Gemeinden bzw. Kommunen unter 50.000 Einwohnern haben."
    },
    {
      q: "Welche Pflichten hat der Verein?",
      a: "Es gilt das Besserstellungs- und Jährlichkeitsprinzip. Wir strukturieren Ihr Vorhaben so, dass alle formalen Dokumentationspflichten ohne Aufwand für Ihren Vorstand erfüllt werden."
    },
    {
      q: "Was passiert, wenn der Antrag abgelehnt wird?",
      a: "Sollte ein Antrag wider Erwarten von der DSEE abgelehnt werden, tragen wir das Risiko: Für Ihren Verein entstehen in diesem Fall exakt 0,00 € Kosten. Keine Vorkasse, kein Risiko."
    }
  ];

  return (
    <div className="bg-white flex flex-col items-start w-full font-sans text-[#2b2a27]">
      
      {/* 1. NAVIGATION BAR */}
      <header className="bg-[#162d50] w-full px-6 sm:px-12 lg:px-[64px] py-[20px] flex items-center justify-between sticky top-0 z-50">
        {/* Logo */}
        <div 
          className="flex items-center cursor-pointer select-none group" 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <img 
            src={logoWhite} 
            alt="SichtbarGutes - Digitalisierung des Ehrenamts" 
            className="h-[38px] sm:h-[44px] w-auto object-contain transition-transform duration-200 group-hover:scale-[1.02]" 
          />
        </div>

        {/* Desktop Links */}
        <nav className="hidden lg:flex items-center gap-[32px] text-[#d8e2f0] text-[15px] font-medium whitespace-nowrap">
          <button onClick={() => scrollToSection('massnahmen')} className="hover:text-white transition-colors">Leistungen</button>
          <button onClick={() => scrollToSection('ablauf')} className="hover:text-white transition-colors">So funktioniert's</button>
          <button onClick={() => scrollToSection('antrag-assistent')} className="hover:text-white text-[#d8e2f0] transition-colors flex items-center gap-1.5 font-semibold">
            <span className="size-2 rounded-full bg-emerald-400" />
            <span>Antragsassistent</span>
          </button>
          <button onClick={() => scrollToSection('faq')} className="hover:text-white transition-colors">FAQ</button>
          <button onClick={() => scrollToSection('kontakt')} className="hover:text-white transition-colors">Kontakt</button>
        </nav>

        {/* CTA Button */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={() => scrollToSection('antrag-assistent')}
            className="border border-[#d8e2f0] hover:bg-white hover:text-[#162d50] text-white text-[13px] font-bold px-[16px] py-[10px] whitespace-nowrap transition-colors"
          >
            Antrag erstellen
          </button>
          <button
            onClick={() => scrollToSection('kontakt')}
            className="bg-[#2f5b7a] hover:bg-[#3b6d91] text-white text-[14px] font-bold px-[20px] py-[12px] whitespace-nowrap transition-colors"
          >
            Förderfähigkeit prüfen
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden text-white p-2"
          aria-label="Menü"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-[#0b1a3a] border-t border-[#2f5b7a] p-6 flex flex-col gap-4 text-[#d8e2f0] text-sm">
            <button onClick={() => scrollToSection('massnahmen')} className="text-left py-2 hover:text-white">Leistungen</button>
            <button onClick={() => scrollToSection('ablauf')} className="text-left py-2 hover:text-white">So funktioniert's</button>
            <button onClick={() => scrollToSection('antrag-assistent')} className="text-left py-2 hover:text-white font-bold text-white flex items-center gap-2">
              <span className="size-2 rounded-full bg-emerald-400" />
              <span>DSEE-Antragsassistent (PDF)</span>
            </button>
            <button onClick={() => scrollToSection('faq')} className="text-left py-2 hover:text-white">FAQ</button>
            <button onClick={() => scrollToSection('kontakt')} className="text-left py-2 hover:text-white">Kontakt</button>
            <button 
              onClick={() => scrollToSection('antrag-assistent')}
              className="bg-white text-[#162d50] text-center py-2.5 font-bold mt-2"
            >
              Antrag online vorbereiten
            </button>
            <button 
              onClick={() => scrollToSection('kontakt')}
              className="bg-[#2f5b7a] text-white text-center py-3 font-bold"
            >
              Förderfähigkeit prüfen
            </button>
          </div>
        )}
      </header>

      {/* 2. HERO SECTION MIT VIDEO BACKGROUND & PARALLAX OVERLAY */}
      <section className="bg-[#0b1a3a] w-full min-h-[calc(100dvh-88px)] px-6 sm:px-12 lg:px-[64px] py-[48px] lg:py-[64px] text-white relative overflow-hidden flex items-center">
        
        {/* Ambient Video Background Layer with Subtle Parallax */}
        <div 
          className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
          style={{
            transform: `translate3d(0, ${scrollY * 0.3}px, 0) scale(1.08)`,
            willChange: 'transform',
          }}
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src={heroVideo} type="video/mp4" />
          </video>
          {/* Blue Overlay (~25% opacity) so the video is clearly visible */}
          <div className="absolute inset-0 bg-[#162d50]/25 bg-gradient-to-r from-[#0b1a3a]/60 via-[#162d50]/30 to-black/20"></div>
        </div>

        <div className="max-w-[1360px] w-full mx-auto flex flex-col gap-[32px] items-start relative z-10 my-auto">
          
          {/* Hero Box with gentle entry reveal and slight scroll parallax */}
          <div 
            className="drop-shadow-[0px_0px_52.2px_rgba(0,0,0,0.5)] flex flex-col gap-[28px] items-start w-full max-w-4xl transition-opacity duration-300"
            style={{
              transform: `translate3d(0, ${scrollY * 0.12}px, 0)`,
              opacity: Math.max(0, 1 - scrollY / 700),
              willChange: 'transform, opacity',
            }}
          >
            <div className="flex flex-col gap-[16px] items-start w-full font-bold">
              <p className="text-[12px] uppercase text-[#d8e2f0] tracking-wider">
                DSEE-DIGITALFÖRDERUNG FÜR EHRENÄMTER
              </p>
              <div className="text-4xl sm:text-5xl lg:text-[64px] leading-[1.05] tracking-tight">
                <p>Fördergelder für Vereine</p>
                <p>im ländlichen Raum.</p>
              </div>
            </div>

            <p className="text-[18px] leading-[1.6] text-white font-normal max-w-2xl">
              100% digitalisiert, 0% Bürokratie – Bis zu 1.500 € Förderung durch die DSEE für Ihre professionelle digitale Sichtbarkeit im Kommunalraum.
            </p>

            <div className="flex flex-wrap gap-[14px] items-center w-full sm:w-auto pt-2">
              <button
                onClick={() => scrollToSection('kontakt')}
                className="bg-[#2f5b7a] hover:bg-[#3b6d91] text-white text-[15px] font-bold px-[24px] py-[14px] flex items-center justify-center gap-[10px] whitespace-nowrap transition-colors shadow-sm cursor-pointer"
              >
                <span>Förderfähigkeit in 2 Min. prüfen</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => scrollToSection('antrag-assistent')}
                className="bg-white/10 hover:bg-white/20 border border-white text-[15px] font-bold px-[22px] py-[14px] text-white flex items-center gap-2 whitespace-nowrap transition-colors cursor-pointer"
              >
                <span>Antrag online erstellen</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href="tel:0800000000"
                className="bg-emerald-600/90 hover:bg-emerald-600 border border-emerald-400/40 text-[15px] font-bold px-[22px] py-[14px] text-white flex items-center gap-2.5 whitespace-nowrap transition-colors cursor-pointer shadow-sm"
              >
                <Phone className="w-4 h-4 text-emerald-100" />
                <span>Jetzt anrufen</span>
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* 3. AKTUELLE FÖRDERKONDITIONEN (HORIZONTALE BLAUE LEISTE) */}
      <section className="bg-[#162d50] border-t border-b border-[#2f5b7a]/40 w-full px-6 sm:px-12 lg:px-[64px] py-[28px] text-white">
        <div className="max-w-[1360px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 items-start justify-between">
          
          {/* 1. Trägerinstitution */}
          <Reveal direction="up" delay={50}>
            <div className="flex flex-col gap-[6px] items-start border-b sm:border-b-0 sm:border-r border-[#2f5b7a]/60 pb-4 sm:pb-0 sm:pr-6">
              <p className="text-[#d8e2f0] text-[11px] font-bold uppercase tracking-wider">Trägerinstitution</p>
              <p className="text-white text-[16px] font-bold leading-snug">DSEE (Deutsche Stiftung für Engagement und Ehrenamt)</p>
            </div>
          </Reveal>

          {/* 2. Maximale Förderhöhe */}
          <Reveal direction="up" delay={150}>
            <div className="flex flex-col gap-[6px] items-start border-b sm:border-b-0 lg:border-r border-[#2f5b7a]/60 pb-4 sm:pb-0 sm:pr-6">
              <p className="text-[#d8e2f0] text-[11px] font-bold uppercase tracking-wider">Maximale Förderhöhe</p>
              <div className="flex items-baseline gap-2">
                <p className="text-white text-[24px] font-bold leading-none">1.500,00 €</p>
                <span className="text-xs text-emerald-400 font-semibold">(90% Quote)</span>
              </div>
              <p className="text-[#d8e2f0] text-[11px]">Bis zu 1.350 € Zuschuss</p>
            </div>
          </Reveal>

          {/* 3. Erforderlicher Eigenanteil */}
          <Reveal direction="up" delay={250}>
            <div className="flex flex-col gap-[6px] items-start border-b sm:border-b-0 sm:border-r border-[#2f5b7a]/60 pb-4 sm:pb-0 sm:pr-6">
              <p className="text-[#d8e2f0] text-[11px] font-bold uppercase tracking-wider">Erforderlicher Eigenanteil</p>
              <p className="text-white text-[20px] font-bold leading-none">
                10% <span className="text-[14px] font-normal text-[#d8e2f0]">(max. 150,00 €)</span>
              </p>
              <p className="text-xs text-[#d8e2f0] mt-0.5">Erst nach Bewilligung fällig</p>
            </div>
          </Reveal>

          {/* 4. Förderfähige Maßnahmen */}
          <Reveal direction="up" delay={350}>
            <div className="flex flex-col gap-[6px] items-start">
              <p className="text-[#d8e2f0] text-[11px] font-bold uppercase tracking-wider">Förderfähige Maßnahmen</p>
              <p className="text-white text-[16px] font-bold leading-snug">Websites, Social Media, Rekrutierung</p>
              <p className="text-[#d8e2f0] text-[11px]">100% digital & bürokratiefrei</p>
            </div>
          </Reveal>

        </div>
      </section>

      {/* 4. SEKTION 01 / REGIONALER FÖRDERKOMPASS */}
      <section id="kompass" className="bg-white w-full px-6 sm:px-12 lg:px-[64px] py-[72px]">
        <div className="max-w-[1360px] mx-auto flex flex-col gap-[40px] items-start">
          <Reveal direction="up" className="w-full">
            <div className="border-b-2 border-[#162d50] py-[12px] w-full">
              <p className="text-[#162d50] text-[12px] font-bold uppercase tracking-wider">
                01 / REGIONALER FÖRDERKOMPASS
              </p>
            </div>
          </Reveal>

          <div className="flex flex-col lg:flex-row gap-[32px] items-start w-full">
            <Reveal direction="left" delay={100} className="w-full lg:w-[813px]">
              <div className="flex flex-col gap-[16px] items-start w-full">
                <h2 className="text-[#162d50] text-3xl sm:text-[40px] font-bold leading-[1.15]">
                  Ist Ihr Verein förderfähig?
                </h2>
                <p className="text-[#706e65] text-[16px] leading-[1.6]">
                  Die Richtlinien der Deutschen Stiftung für Engagement und Ehrenamt (DSEE) sind präzise formuliert. Wir helfen Ihnen, die Kriterien rechtssicher zu erfüllen.
                </p>
              </div>
            </Reveal>

            <Reveal direction="right" delay={200} className="w-full lg:w-[475px]">
              <div className="bg-white border border-[#dcd8cf] p-[32px] flex flex-col gap-[24px] items-start w-full shadow-sm">
                <p className="text-[#162d50] text-[16px] font-bold">
                  Zulassungskriterien der DSEE:
                </p>
                <div className="flex flex-col gap-[16px] items-start w-full">
                  {[
                    "Gemeinnützigkeit: Der Verein besitzt einen gültigen Freistellungsbescheid des Finanzamts.",
                    "Regionale Lage: Sitz in einer deutschen Kommune oder Gemeinde mit weniger als 50.000 Einwohnern.",
                    "Ehrenamt: Der Vorstand agiert überwiegend ehrenamtlich organisiert.",
                    "Verwendungszweck: Fokus auf Verbesserung der digitalen Mitglieder- oder Öffentlichkeitsarbeit."
                  ].map((text, idx) => (
                    <div key={idx} className="flex gap-[12px] items-start w-full">
                      <div className="bg-[#4a6e8a] flex items-center justify-center p-[4px] size-[20px] shrink-0 mt-0.5 text-white">
                        <Check className="size-[12px] stroke-[3]" />
                      </div>
                      <p className="text-[#2b2a27] text-[16px] leading-[1.5] flex-1">
                        {text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 5. SEKTION 02 / ABLAUF DER BEANTRAGUNG */}
      <section id="ablauf" className="bg-white w-full px-6 sm:px-12 lg:px-[64px] py-[72px]">
        <div className="max-w-[1360px] mx-auto flex flex-col gap-[40px] items-start">
          <Reveal direction="up" className="w-full">
            <div className="border-b-2 border-[#162d50] py-[12px] w-full">
              <p className="text-[#162d50] text-[12px] font-bold uppercase tracking-wider">
                02 / ABLAUF DER BEANTRAGUNG
              </p>
            </div>
          </Reveal>

          <div className="flex flex-col gap-[24px] items-start w-full">
            <Reveal direction="up" delay={100}>
              <h2 className="text-[#162d50] text-3xl sm:text-[40px] font-bold">
                In 3 Schritten zur Förderung
              </h2>
            </Reveal>

            <div className="flex flex-col gap-[24px] items-start w-full">
              {/* Box 01 (Full width dark in Figma) */}
              <Reveal direction="up" delay={150} className="w-full">
                <div className="bg-[#162d50] border border-[#162d50] p-[40px] flex flex-col gap-[20px] items-start w-full text-white shadow-md">
                  <p className="text-[32px] font-bold">01</p>
                  <p className="text-[24px] font-bold">Schnell-Check</p>
                  <p className="text-[#d8e2f0] text-[16px] leading-[1.6]">
                    Sie füllen unser zweiminütiges Formular aus. Wir validieren automatisch Ihren regionalen Anspruch.
                  </p>
                </div>
              </Reveal>

              {/* Row: Box 02 (813px) & Box 03 (flexible) */}
              <div className="flex flex-col lg:flex-row gap-[24px] items-stretch w-full">
                <Reveal direction="up" delay={250} className="w-full lg:w-[813px]">
                  <div className="bg-white border border-[#dcd8cf] p-[32px] flex flex-col justify-between gap-[20px] items-start w-full h-full shadow-sm">
                    <div className="flex flex-col gap-[12px] items-start">
                      <p className="text-[#162d50] text-[24px] font-bold">02</p>
                      <p className="text-[#162d50] text-[18px] font-bold">Antragserstellung & Einreichung</p>
                      <p className="text-[#2b2a27] text-[16px] leading-[1.6]">
                        SichtbarGutes übernimmt die vollständige Formulierung und Einreichung des bürokratischen Antrags – oder Sie nutzen direkt unseren interaktiven DSEE-Antragsassistenten.
                      </p>
                    </div>
                    <button
                      onClick={() => scrollToSection('antrag-assistent')}
                      className="text-xs bg-[#f4f7fa] hover:bg-[#162d50] text-[#162d50] hover:text-white font-bold px-4 py-2 border border-[#dcd8cf] hover:border-[#162d50] flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <span>Zum Online-Assistenten & PDF-Export</span>
                      <ArrowRight className="size-3.5" />
                    </button>
                  </div>
                </Reveal>

                <Reveal direction="up" delay={350} className="flex-1 w-full">
                  <div className="bg-white border border-[#dcd8cf] p-[32px] flex flex-col gap-[16px] items-start w-full h-full shadow-sm">
                    <p className="text-[#2f5b7a] text-[24px] font-bold">03</p>
                    <p className="text-[#162d50] text-[18px] font-bold">Projektstart</p>
                    <p className="text-[#706e65] text-[15px] leading-[1.6]">
                      Nach Bewilligung setzen wir Ihre Website, Kampagne oder Ihren Imagefilm direkt fachgerecht um.
                    </p>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. SEKTION 03 / FÖRDERFÄHIGE DSEE-LEISTUNGSPAKETE */}
      <section id="massnahmen" className="bg-white w-full px-6 sm:px-12 lg:px-[64px] py-[72px]">
        <div className="max-w-[1360px] mx-auto flex flex-col gap-[40px] items-start">
          <Reveal direction="up" className="w-full">
            <div className="border-b-2 border-[#162d50] py-[12px] w-full">
              <p className="text-[#162d50] text-[12px] font-bold uppercase tracking-wider">
                03 / FÖRDERFÄHIGE DSEE-LEISTUNGSPAKETE
              </p>
            </div>
          </Reveal>

          <Reveal direction="up" delay={100} className="w-full">
            <div className="flex flex-col gap-[16px] items-start w-full">
              <h2 className="text-[#162d50] text-3xl sm:text-[40px] font-bold tracking-tight">
                Maßgeschneiderte 1.500 € Förderpakete für Ihren Verein
              </h2>
              <p className="text-[#706e65] text-[16px] leading-[1.6] max-w-3xl">
                Unsere Pakete schöpfen den maximalen DSEE-Förderrahmen von 1.500 € exakt aus. Ihr Verein profitiert von 90 % staatlicher Förderung (1.350 €) und trägt lediglich 10 % Eigenanteil (150 €) – fällig erst nach offizieller Bewilligung.
              </p>
            </div>
          </Reveal>

          {/* 2 Package Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px] items-stretch w-full">
            
            {/* Paket 01: Digitale Vereins-Präsenz */}
            <Reveal direction="up" delay={150} className="h-full">
              <div className="bg-white border-2 border-[#162d50] p-[32px] flex flex-col justify-between gap-[24px] relative shadow-md h-full">
                <div className="flex flex-col gap-[20px] items-start">
                  <div className="flex items-center justify-between w-full">
                    <span className="bg-[#162d50] text-white text-[10px] font-bold px-2.5 py-1 uppercase tracking-wider">
                      Beliebtestes Paket
                    </span>
                    <div className="size-8 bg-[#f4f7fa] border border-[#dcd8cf] flex items-center justify-center text-[#162d50]">
                      <Globe className="size-4 text-[#2f5b7a]" />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <h3 className="text-[#162d50] text-[22px] font-bold leading-snug">
                      Digitale Vereins-Präsenz
                    </h3>
                    <p className="text-[#706e65] text-[13px] leading-relaxed">
                      Website-Relaunch kombiniert mit einem authentischen Imagefilm zur modernen Außendarstellung.
                    </p>
                  </div>

                  {/* Price Box */}
                  <div className="bg-[#f4f7fa] border border-[#dcd8cf] p-4 w-full flex flex-col gap-2">
                    <div className="flex items-baseline justify-between">
                      <span className="text-xs text-[#706e65]">Gesamtprojektwert:</span>
                      <span className="text-base font-bold text-[#162d50]">1.500,00 €</span>
                    </div>
                    <div className="flex items-baseline justify-between border-t border-[#dcd8cf] pt-2">
                      <span className="text-xs text-[#2f5b7a] font-bold">DSEE-Zuschuss (90 %):</span>
                      <span className="text-base font-bold text-emerald-700">1.350,00 €</span>
                    </div>
                    <div className="flex items-baseline justify-between border-t border-[#dcd8cf] pt-2">
                      <span className="text-xs text-[#162d50] font-bold">Eigenanteil Verein (10 %):</span>
                      <span className="text-base font-bold text-[#162d50]">150,00 €</span>
                    </div>
                    <p className="text-[10px] text-[#706e65] pt-1 border-t border-[#dcd8cf]">
                      Eigenanteil erst nach Bewilligung fällig
                    </p>
                  </div>

                  {/* Deliverables */}
                  <div className="flex flex-col gap-2.5 w-full pt-2">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-[#162d50]">Enthaltene Leistungen:</p>
                    {[
                      "Barrierefreie Website (mobil-optimiert & DSGVO-konform)",
                      "4K-Imagefilm (2–5 Min.) mit Drehtag vor Ort",
                      "Digitale Kontakt- & Helferformulare",
                      "Print-Design: Infoflyer mit QR-Code zum Portal",
                      "Vollständige Antragserstellung durch SichtbarGutes"
                    ].map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-[13px] text-[#2b2a27]">
                        <div className="bg-[#2f5b7a] flex items-center justify-center size-[16px] shrink-0 mt-0.5 text-white">
                          <Check className="size-[10px] stroke-[3]" />
                        </div>
                        <span className="leading-tight">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-2 pt-4 border-t border-[#dcd8cf] w-full">
                  <button
                    onClick={() => scrollToSection('kontakt')}
                    className="w-full bg-[#162d50] hover:bg-[#2f5b7a] text-white font-bold py-3 px-4 text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <span>Paket im Schnell-Check anfragen</span>
                    <ArrowRight className="size-3.5" />
                  </button>
                </div>
              </div>
            </Reveal>

            {/* Paket 02: Media & Video-Recruiting */}
            <Reveal direction="up" delay={300} className="h-full">
              <div className="bg-white border border-[#dcd8cf] hover:border-[#2f5b7a] p-[32px] flex flex-col justify-between gap-[24px] relative shadow-sm transition-all h-full">
                <div className="flex flex-col gap-[20px] items-start">
                  <div className="flex items-center justify-between w-full">
                    <span className="bg-[#2f5b7a] text-white text-[10px] font-bold px-2.5 py-1 uppercase tracking-wider">
                      Nachwuchs-Fokus
                    </span>
                    <div className="size-8 bg-[#f4f7fa] border border-[#dcd8cf] flex items-center justify-center text-[#162d50]">
                      <Video className="size-4 text-[#2f5b7a]" />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <h3 className="text-[#162d50] text-[22px] font-bold leading-snug">
                      Media & Video-Recruiting
                    </h3>
                    <p className="text-[#706e65] text-[13px] leading-relaxed">
                      Professionelle Videoproduktion zur zielgerichteten Ansprache junger Mitglieder auf Social Media.
                    </p>
                  </div>

                  {/* Price Box */}
                  <div className="bg-[#f4f7fa] border border-[#dcd8cf] p-4 w-full flex flex-col gap-2">
                    <div className="flex items-baseline justify-between">
                      <span className="text-xs text-[#706e65]">Gesamtprojektwert:</span>
                      <span className="text-base font-bold text-[#162d50]">1.500,00 €</span>
                    </div>
                    <div className="flex items-baseline justify-between border-t border-[#dcd8cf] pt-2">
                      <span className="text-xs text-[#2f5b7a] font-bold">DSEE-Zuschuss (90 %):</span>
                      <span className="text-base font-bold text-emerald-700">1.350,00 €</span>
                    </div>
                    <div className="flex items-baseline justify-between border-t border-[#dcd8cf] pt-2">
                      <span className="text-xs text-[#162d50] font-bold">Eigenanteil Verein (10 %):</span>
                      <span className="text-base font-bold text-[#162d50]">150,00 €</span>
                    </div>
                    <p className="text-[10px] text-[#706e65] pt-1 border-t border-[#dcd8cf]">
                      Eigenanteil erst nach Bewilligung fällig
                    </p>
                  </div>

                  {/* Deliverables */}
                  <div className="flex flex-col gap-2.5 w-full pt-2">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-[#162d50]">Enthaltene Leistungen:</p>
                    {[
                      "4K-Hauptfilm (2–5 Min.) für lokale Präsentationen",
                      "2x Social-Media Reels (9:16) für Instagram & TikTok",
                      "Mittelformat-Porträt (1–3 Min.) für Helferporträts",
                      "Professionelle Drohnen-Aufnahmen inklusive",
                      "Social-Media Redaktionsplan & Veröffentlichungs-Leitfaden"
                    ].map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-[13px] text-[#2b2a27]">
                        <div className="bg-[#2f5b7a] flex items-center justify-center size-[16px] shrink-0 mt-0.5 text-white">
                          <Check className="size-[10px] stroke-[3]" />
                        </div>
                        <span className="leading-tight">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-2 pt-4 border-t border-[#dcd8cf] w-full">
                  <button
                    onClick={() => scrollToSection('kontakt')}
                    className="w-full bg-[#2f5b7a] hover:bg-[#162d50] text-white font-bold py-3 px-4 text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <span>Paket im Schnell-Check anfragen</span>
                    <ArrowRight className="size-3.5" />
                  </button>
                </div>
              </div>
            </Reveal>

          </div>

          {/* Individual Configuration Bottom Banner */}
          <Reveal direction="up" delay={400} className="w-full">
            <div className="bg-[#162d50] border border-[#162d50] p-[28px] sm:p-[36px] flex flex-col sm:flex-row items-center justify-between gap-6 w-full text-white shadow-lg">
              <div className="flex flex-col gap-2 text-center sm:text-left">
                <p className="text-xl sm:text-2xl font-bold">
                  Individuelle Maßnahmen-Kombination gewünscht?
                </p>
                <p className="text-[#d8e2f0] text-sm max-w-2xl leading-relaxed">
                  Stellen Sie Ihre bevorzugten Bausteine im interaktiven DSEE-Antragsassistenten passgenau zusammen und exportieren Sie Ihren fertigen Antrag direkt als PDF.
                </p>
              </div>
              <button
                onClick={() => scrollToSection('antrag-assistent')}
                className="bg-[#2f5b7a] hover:bg-[#3b6d91] text-white font-bold text-xs uppercase tracking-wider px-6 py-3.5 flex items-center gap-2 whitespace-nowrap transition-colors shrink-0 cursor-pointer"
              >
                <span>Zum Antragsassistenten</span>
                <ArrowRight className="size-4" />
              </button>
            </div>
          </Reveal>

        </div>
      </section>

      {/* 7. SEKTION 04 / VERTRAUENSFAKTOREN */}
      <section className="bg-white w-full px-6 sm:px-12 lg:px-[64px] py-[72px]">
        <div className="max-w-[1360px] mx-auto flex flex-col gap-[40px] items-start">
          <Reveal direction="up" className="w-full">
            <div className="border-b-2 border-[#162d50] py-[12px] w-full">
              <p className="text-[#162d50] text-[12px] font-bold uppercase tracking-wider">
                04 / VERTRAUENSFAKTOREN
              </p>
            </div>
          </Reveal>

          <div className="flex flex-col gap-[32px] items-start w-full">
            <Reveal direction="up" delay={100}>
              <h2 className="text-[#162d50] text-3xl sm:text-[40px] font-bold">
                Warum SichtbarGutes wählen?
              </h2>
            </Reveal>

            {/* Row 1: Left 813px, Right 475px */}
            <div className="flex flex-col lg:flex-row gap-[32px] items-stretch w-full">
              <Reveal direction="left" delay={150} className="w-full lg:w-[813px]">
                <div className="bg-white border border-[#dcd8cf] p-[32px] flex flex-col gap-[16px] items-start w-full h-full shadow-sm">
                  <p className="text-[#162d50] text-[20px] font-bold">
                    DSEE-Expertise
                  </p>
                  <p className="text-[#2b2a27] text-[15px] leading-[1.6]">
                    Wir arbeiten konsequent nach den strengen Vergaberichtlinien der Stiftung. Fehlerfreie Anträge garantieren hohe Bewilligungsquoten.
                  </p>
                </div>
              </Reveal>

              <Reveal direction="right" delay={250} className="w-full lg:w-[475px]">
                <div className="bg-white border border-[#dcd8cf] p-[32px] flex flex-col gap-[16px] items-start w-full h-full shadow-sm">
                  <p className="text-[#162d50] text-[18px] font-bold">
                    Null Risiko
                  </p>
                  <p className="text-[#706e65] text-[14px] leading-[1.6]">
                    Sie zahlen ausschließlich den vertraglichen Eigenanteil von 10% nach erfolgreicher Bewilligung. Keine Vorkasse.
                  </p>
                </div>
              </Reveal>
            </div>

            {/* Row 2: Left 475px, Right 813px */}
            <div className="flex flex-col lg:flex-row gap-[32px] items-stretch w-full">
              <Reveal direction="left" delay={200} className="w-full lg:w-[475px]">
                <div className="bg-white border border-[#dcd8cf] p-[32px] flex flex-col gap-[16px] items-start w-full h-full shadow-sm">
                  <p className="text-[#162d50] text-[18px] font-bold">
                    Persönlicher Support
                  </p>
                  <p className="text-[#706e65] text-[14px] leading-[1.6]">
                    Ein qualifizierter Berater steht Ihrem Vereinsvorstand während der gesamten Antrags- und Umsetzungsphase direkt zur Seite.
                  </p>
                </div>
              </Reveal>

              <Reveal direction="right" delay={300} className="w-full lg:w-[813px]">
                <div className="bg-[#162d50] border border-[#162d50] p-[32px] flex flex-col gap-[16px] items-start w-full h-full text-white shadow-md">
                  <p className="text-[20px] font-bold">
                    Kommunale Basis
                  </p>
                  <p className="text-[#d8e2f0] text-[15px] leading-[1.6]">
                    Wir verstehen ländliche Gegebenheiten und richten Webdesigns und Kampagnen exakt auf ländliche Zielgruppen aus.
                  </p>
                </div>
              </Reveal>
            </div>

          </div>
        </div>
      </section>

      {/* 8. SEKTION 05 / PORTFOLIO & REFERENZEN */}
      <section id="referenzen" className="bg-white w-full px-6 sm:px-12 lg:px-[64px] py-[72px] overflow-hidden">
        <div className="max-w-[1360px] mx-auto flex flex-col gap-[56px] items-start">
          
          {/* Section Header */}
          <Reveal direction="up" className="w-full">
            <div className="flex flex-col gap-[16px] items-start w-full">
              <div className="border-b-2 border-[#162d50] py-[12px] w-full">
                <p className="text-[#162d50] text-[12px] font-bold uppercase tracking-wider">
                  05 / PORTFOLIO & REFERENZEN
                </p>
              </div>
              <h2 className="text-[#162d50] text-3xl sm:text-[40px] font-bold tracking-tight">
                Unsere realisierten Projekte & Video-Showcases
              </h2>
              <p className="text-[#706e65] text-[16px] leading-[1.6] max-w-3xl">
                Authentische, DSEE-förderfähige Medienproduktionen für Vereine, Stiftungen und Kommunen im ländlichen Raum – ehrenamtliches Engagement lebendig eingefangen und sichtbar gemacht.
              </p>
            </div>
          </Reveal>

          {/* A. SHOWCASES LONGFORM (16:9 IMAGEFILME) */}
          <Reveal direction="up" delay={150} className="w-full">
            <div className="flex flex-col gap-[24px] items-start w-full">
              <div className="flex items-center justify-between w-full border-b border-[#dcd8cf] pb-[12px]">
                <div className="flex items-center gap-3">
                  <span className="text-[#2f5b7a] text-[14px] font-bold uppercase tracking-wider">
                    Showcases Longform (16:9 Imagefilme & Porträts)
                  </span>
                  <span className="bg-[#d8e2f0] text-[#162d50] text-[11px] font-bold px-2 py-0.5 uppercase">
                    4K Master
                  </span>
                </div>

                {/* Mobile Controls */}
                <div className="flex items-center gap-2 lg:hidden">
                  <button
                    onClick={handleLongformPrev}
                    className="size-[36px] bg-white border border-[#dcd8cf] hover:border-[#162d50] hover:bg-[#f4f7fa] flex items-center justify-center text-[#162d50]"
                    aria-label="Vorheriger Film"
                  >
                    <ChevronLeft className="size-5" />
                  </button>
                  <button
                    onClick={handleLongformNext}
                    className="size-[36px] bg-white border border-[#dcd8cf] hover:border-[#162d50] hover:bg-[#f4f7fa] flex items-center justify-center text-[#162d50]"
                    aria-label="Nächster Film"
                  >
                    <ChevronRight className="size-5" />
                  </button>
                </div>
              </div>

              {/* Slider Container with Desktop Floating Arrows */}
              <div className="relative w-full">
                {/* Desktop Left Float Arrow */}
                <button
                  onClick={handleLongformPrev}
                  className="hidden lg:flex absolute -left-5 xl:-left-7 top-1/2 -translate-y-1/2 z-20 size-12 rounded-full bg-white/95 hover:bg-[#162d50] text-[#162d50] hover:text-white border border-[#dcd8cf] hover:border-[#162d50] items-center justify-center transition-all duration-300 hover:shadow-xl cursor-pointer shadow-md group"
                  aria-label="Vorheriger Film"
                >
                  <ChevronLeft className="size-6 transition-transform group-hover:-translate-x-0.5" />
                </button>

                {/* Desktop Right Float Arrow */}
                <button
                  onClick={handleLongformNext}
                  className="hidden lg:flex absolute -right-5 xl:-right-7 top-1/2 -translate-y-1/2 z-20 size-12 rounded-full bg-white/95 hover:bg-[#162d50] text-[#162d50] hover:text-white border border-[#dcd8cf] hover:border-[#162d50] items-center justify-center transition-all duration-300 hover:shadow-xl cursor-pointer shadow-md group"
                  aria-label="Nächster Film"
                >
                  <ChevronRight className="size-6 transition-transform group-hover:translate-x-0.5" />
                </button>

                {/* Animated Slider Track */}
                <div className="overflow-hidden w-full py-2">
                  <div 
                    className="flex transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] items-stretch"
                    style={{
                      transform: `translate3d(-${longformIndex * 100}%, 0, 0)`,
                    }}
                  >
                    {longformProjects.map((project, idx) => {
                      const isPlaying = isPlayingLongform && longformIndex === idx;

                      return (
                        <div key={`${project.title}-${idx}`} className="w-full min-w-full shrink-0 px-1">
                          <div className="grid grid-cols-1 lg:grid-cols-12 gap-[24px] items-stretch w-full">
                            {/* Left: 16:9 Player Frame */}
                            <div className="lg:col-span-7 bg-[#0b1a3a] aspect-video w-full relative overflow-hidden border border-[#2f5b7a] shadow-xl group">
                              {isPlaying ? (
                                <iframe
                                  className="absolute inset-0 w-full h-full border-0"
                                  src={`https://www.youtube-nocookie.com/embed/${project.videoId}?autoplay=1&rel=0`}
                                  title={project.title}
                                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                  allowFullScreen
                                />
                              ) : (
                                <div 
                                  onClick={() => {
                                    setLongformIndex(idx);
                                    setIsPlayingLongform(true);
                                  }}
                                  className="absolute inset-0 w-full h-full p-4 sm:p-6 flex flex-col justify-between cursor-pointer"
                                >
                                  <img 
                                    src={project.thumb} 
                                    alt={project.title} 
                                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                                  />
                                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b1a3a]/90 via-black/30 to-black/30" />

                                  {/* Top Duration Badge */}
                                  <div className="flex items-center justify-end z-10">
                                    <span className="bg-[#0b1a3a]/90 text-white text-xs px-3 py-1 border border-[#2f5b7a] font-medium">
                                      {project.duration}
                                    </span>
                                  </div>

                                  {/* Center Play Button */}
                                  <div className="absolute inset-0 flex items-center justify-center z-10">
                                    <div className="size-[64px] bg-[#162d50]/90 border-2 border-[#d8e2f0] flex items-center justify-center group-hover:scale-110 group-hover:bg-[#2f5b7a] transition-all shadow-2xl">
                                      <Play className="size-[26px] text-white fill-white ml-1" />
                                    </div>
                                  </div>

                                  {/* Bottom Bar Info */}
                                  <div className="z-10 bg-[#0b1a3a]/95 backdrop-blur-md p-3.5 flex items-center justify-between border border-[#2f5b7a]">
                                    <div>
                                      <p className="text-white font-bold text-sm">{project.company}</p>
                                      <p className="text-[#d8e2f0] text-xs">Mit Klick wird das Video von YouTube geladen</p>
                                    </div>
                                    <span className="text-white font-bold text-xs bg-[#2f5b7a] hover:bg-[#3b6d91] px-3.5 py-1.5 transition-colors">
                                      Video starten
                                    </span>
                                  </div>
                                </div>
                              )}
                            </div>

                            {/* Right: Info & KPI Box */}
                            <div className="lg:col-span-5 bg-[#162d50] border border-[#2f5b7a] p-[32px] text-white flex flex-col justify-between shadow-xl">
                              <div className="flex flex-col gap-4">
                                <div className="inline-block bg-[#2f5b7a] text-white text-[11px] font-bold px-2.5 py-1 uppercase tracking-wider w-max">
                                  4K Imagefilm & Dokumentation
                                </div>
                                <h3 className="text-2xl sm:text-[26px] font-bold leading-tight text-white">
                                  {project.title}
                                </h3>
                                <p className="text-[#d8e2f0] text-[15px] leading-[1.6]">
                                  {project.desc}
                                </p>
                              </div>

                              <div className="flex flex-col gap-4 pt-6 mt-4 border-t border-[#2f5b7a]">
                                <div className="flex flex-col gap-1">
                                  <p className="text-[12px] font-bold uppercase tracking-wider text-[#d8e2f0] flex items-center gap-1.5">
                                    <TrendingUp className="size-4 text-[#d8e2f0]" />
                                    <span>Gutes sichtbar gemacht:</span>
                                  </p>
                                  <p className="text-white text-[16px] font-semibold leading-[1.4]">
                                    {project.kpi}
                                  </p>
                                </div>

                                {/* Project Selector Tabs */}
                                <div className="flex flex-col gap-2 pt-2">
                                  <p className="text-[11px] text-[#d8e2f0] uppercase font-semibold">Weitere Filmprojekte wählen:</p>
                                  <div className="grid grid-cols-2 gap-2">
                                    {longformProjects.map((p, pIdx) => (
                                      <button
                                        key={pIdx}
                                        onClick={() => {
                                          setLongformIndex(pIdx);
                                          setIsPlayingLongform(false);
                                        }}
                                        className={`text-left p-2 border text-[11px] font-medium leading-tight transition-colors cursor-pointer ${
                                          pIdx === longformIndex 
                                            ? 'bg-[#2f5b7a] border-white text-white' 
                                            : 'bg-[#0b1a3a]/80 border-[#2f5b7a] text-[#d8e2f0] hover:bg-[#2f5b7a]/40'
                                        }`}
                                      >
                                        <span className="block truncate font-bold">{p.company}</span>
                                        <span className="text-[10px] opacity-80">{p.duration}</span>
                                      </button>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Dots */}
                <div className="flex justify-center items-center gap-2 pt-4">
                  {longformProjects.map((_, dot) => (
                    <button
                      key={dot}
                      onClick={() => {
                        setLongformIndex(dot);
                        setIsPlayingLongform(false);
                      }}
                      className={`w-3 h-3 rounded-full transition-all cursor-pointer ${
                        dot === longformIndex ? 'bg-[#162d50] scale-110' : 'bg-[#dcd8cf] hover:bg-[#2f5b7a]'
                      }`}
                      aria-label={`Film ${dot + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          {/* B. SHOWCASES WEBPROJEKTE (PI JUGENDHILFE REFERENZ-WEBSITE) */}
          <Reveal direction="up" delay={200} className="w-full">
            <div className="flex flex-col gap-[24px] items-start w-full pt-[24px]">
              <div className="flex items-center justify-between w-full border-b border-[#dcd8cf] pb-[12px]">
                <div className="flex items-center gap-3">
                  <span className="text-[#2f5b7a] text-[14px] font-bold uppercase tracking-wider">
                    Showcases Webprojekte & Digitale Portale
                  </span>
                  <span className="bg-[#d8e2f0] text-[#162d50] text-[11px] font-bold px-2 py-0.5 uppercase">
                    Referenz-Website
                  </span>
                </div>

                {/* Mobile Controls */}
                {webProjects.length > 1 && (
                  <div className="flex items-center gap-2 lg:hidden">
                    <button
                      onClick={handleWebPrev}
                      className="size-[36px] bg-white border border-[#dcd8cf] hover:border-[#162d50] hover:bg-[#f4f7fa] flex items-center justify-center text-[#162d50]"
                      aria-label="Vorherige Webseite"
                    >
                      <ChevronLeft className="size-5" />
                    </button>
                    <button
                      onClick={handleWebNext}
                      className="size-[36px] bg-white border border-[#dcd8cf] hover:border-[#162d50] hover:bg-[#f4f7fa] flex items-center justify-center text-[#162d50]"
                      aria-label="Nächste Webseite"
                    >
                      <ChevronRight className="size-5" />
                    </button>
                  </div>
                )}
              </div>

              {/* Slider Container with Desktop Floating Arrows */}
              <div className="relative w-full">
                {/* Desktop Left Float Arrow */}
                {webProjects.length > 1 && (
                  <button
                    onClick={handleWebPrev}
                    className="hidden lg:flex absolute -left-5 xl:-left-7 top-1/2 -translate-y-1/2 z-20 size-12 rounded-full bg-white/95 hover:bg-[#162d50] text-[#162d50] hover:text-white border border-[#dcd8cf] hover:border-[#162d50] items-center justify-center transition-all duration-300 hover:shadow-xl cursor-pointer shadow-md group"
                    aria-label="Vorherige Webseite"
                  >
                    <ChevronLeft className="size-6 transition-transform group-hover:-translate-x-0.5" />
                  </button>
                )}

                {/* Desktop Right Float Arrow */}
                {webProjects.length > 1 && (
                  <button
                    onClick={handleWebNext}
                    className="hidden lg:flex absolute -right-5 xl:-right-7 top-1/2 -translate-y-1/2 z-20 size-12 rounded-full bg-white/95 hover:bg-[#162d50] text-[#162d50] hover:text-white border border-[#dcd8cf] hover:border-[#162d50] items-center justify-center transition-all duration-300 hover:shadow-xl cursor-pointer shadow-md group"
                    aria-label="Nächste Webseite"
                  >
                    <ChevronRight className="size-6 transition-transform group-hover:translate-x-0.5" />
                  </button>
                )}

                {/* Animated Slider Track */}
                <div className="overflow-hidden w-full py-2">
                  <div 
                    className="flex transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] items-stretch"
                    style={{
                      transform: `translate3d(-${webIndex * 100}%, 0, 0)`,
                    }}
                  >
                    {webProjects.map((project, idx) => (
                      <div key={`${project.title}-${idx}`} className="w-full min-w-full shrink-0 px-1">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch w-full">
                          {/* Description Card (Left) */}
                          <div className="lg:col-span-5 bg-[#162d50] border border-[#2f5b7a] p-[32px] text-white flex flex-col justify-between shadow-xl order-2 lg:order-1">
                            <div className="flex flex-col gap-4">
                              <div className="inline-block bg-[#2f5b7a] text-white text-[11px] font-bold px-2.5 py-1 uppercase tracking-wider w-max">
                                {project.badge}
                              </div>
                              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug">
                                {project.title}
                              </h3>
                              <p className="text-[#d8e2f0] text-[15px] leading-[1.6]">
                                {project.desc}
                              </p>
                            </div>

                            <div className="pt-6 mt-4 border-t border-[#2f5b7a] flex flex-col gap-2">
                              <div className="flex items-center gap-2 text-[#d8e2f0] text-sm font-bold uppercase tracking-wider">
                                <ExternalLink className="size-4 text-[#d8e2f0]" />
                                <span>Gutes sichtbar gemacht:</span>
                              </div>
                              <p className="text-white text-[15px] font-semibold">
                                {project.kpi}
                              </p>
                            </div>
                          </div>

                          {/* Browser Window Frame (Right) */}
                          <div className="lg:col-span-7 bg-[#0b1a3a] border border-[#2f5b7a] aspect-[16/10] w-full flex flex-col overflow-hidden shadow-2xl order-1 lg:order-2 group relative">
                            {/* Browser Window Header */}
                            <div className="bg-[#162d50] h-[36px] px-4 flex items-center justify-between shrink-0 border-b border-[#2f5b7a] z-20">
                              <div className="flex items-center gap-2">
                                <img src={imgRow} alt="Browser Controls" className="h-2.5 object-contain" />
                              </div>
                              
                              {/* Live URL Bar */}
                              <a
                                href={project.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[11px] font-mono text-[#d8e2f0] bg-[#0b1a3a] hover:text-white px-3 py-1 flex items-center gap-1.5 truncate max-w-[200px] sm:max-w-none transition-colors border border-[#2f5b7a]/80"
                                title={`Öffne ${project.url}`}
                              >
                                <span className="size-1.5 rounded-full bg-emerald-400 shrink-0 animate-pulse" />
                                <span>https://{project.displayUrl}</span>
                                <ExternalLink className="size-3 opacity-70 ml-0.5" />
                              </a>

                              <div className="flex items-center gap-2">
                                {project.allowsIframe && (
                                  <button
                                    onClick={() => setActiveLiveIframe(activeLiveIframe === idx ? null : idx)}
                                    className={`text-[11px] px-2.5 py-0.5 border transition-colors cursor-pointer flex items-center gap-1 ${
                                      activeLiveIframe === idx
                                        ? 'bg-[#2f5b7a] text-white font-bold border-white'
                                        : 'bg-[#0b1a3a] text-[#d8e2f0] hover:bg-[#2f5b7a] border-[#2f5b7a]'
                                    }`}
                                    title={activeLiveIframe === idx ? "Zurück zur Vorschau" : "Live-Interaktivität aktivieren"}
                                  >
                                    <Monitor className="size-3" />
                                    <span className="hidden sm:inline">{activeLiveIframe === idx ? "Vorschau" : "Live View"}</span>
                                  </button>
                                )}
                              </div>
                            </div>

                            {/* Browser Live Viewport */}
                            <div className="flex-1 w-full h-full relative overflow-hidden bg-[#0b1a3a] flex flex-col justify-end">
                              {activeLiveIframe === idx && project.allowsIframe ? (
                                <div className="w-full h-full bg-white relative">
                                  <iframe
                                    src={project.url}
                                    title={project.title}
                                    className="w-full h-full border-0"
                                    sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                                    loading="lazy"
                                  />
                                </div>
                              ) : (
                                <div className="relative w-full h-full overflow-hidden flex flex-col justify-end group/view">
                                  <img
                                    src={project.previewImage}
                                    alt={project.title}
                                    className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                                  />
                                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b1a3a]/90 via-[#0b1a3a]/20 to-transparent pointer-events-none" />

                                  {/* Floating Action Bar */}
                                  <div className="relative z-10 p-4 sm:p-5 flex flex-wrap items-center justify-between gap-2 backdrop-blur-[2px]">
                                    <div className="hidden sm:block">
                                      <p className="text-white text-xs font-bold drop-shadow">{project.company}</p>
                                      <p className="text-[#d8e2f0] text-[10px] font-medium drop-shadow">Echtzeit Web-Showcase</p>
                                    </div>

                                    <div className="flex items-center gap-2">
                                      <a
                                        href={project.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="h-8 sm:h-9 px-3.5 sm:px-4 bg-[#2f5b7a] hover:bg-[#3b6d91] text-white text-xs font-bold flex items-center justify-center transition-colors shadow-lg"
                                      >
                                        <span>Website live ansehen</span>
                                        <ExternalLink className="size-3.5 ml-1.5" />
                                      </a>

                                      {project.allowsIframe && (
                                        <button
                                          onClick={() => setActiveLiveIframe(idx)}
                                          className="h-8 sm:h-9 px-3 bg-[#0b1a3a]/90 hover:bg-[#162d50] border border-[#2f5b7a] text-white text-xs font-medium flex items-center justify-center transition-colors cursor-pointer"
                                        >
                                          <Monitor className="size-3.5 sm:mr-1.5 text-[#d8e2f0]" />
                                          <span className="hidden sm:inline">Interaktiv</span>
                                        </button>
                                      )}

                                      <button
                                        onClick={() => scrollToSection('kontakt')}
                                        className="h-8 sm:h-9 px-3 border border-[#dcd8cf] hover:border-white bg-[#162d50]/80 text-white text-xs font-medium flex items-center justify-center transition-colors cursor-pointer"
                                      >
                                        Anfragen
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Dots */}
                {webProjects.length > 1 && (
                  <div className="flex justify-center items-center gap-2 pt-4">
                    {webProjects.map((_, dot) => (
                      <button
                        key={dot}
                        onClick={() => {
                          setActiveLiveIframe(null);
                          setWebIndex(dot);
                        }}
                        className={`w-3 h-3 rounded-full transition-all cursor-pointer ${
                          dot === webIndex ? 'bg-[#162d50] scale-110' : 'bg-[#dcd8cf] hover:bg-[#2f5b7a]'
                        }`}
                        aria-label={`Webseite ${dot + 1}`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </Reveal>

          {/* C. SHOWCASES SHORTFORM (9:16) */}
          <Reveal direction="up" delay={250} className="w-full">
            <div className="flex flex-col gap-[24px] items-start w-full relative pt-[24px]">
              <div className="flex items-center justify-between w-full border-b border-[#dcd8cf] pb-[12px]">
                <div className="flex items-center gap-3">
                  <span className="text-[#2f5b7a] text-[14px] font-bold uppercase tracking-wider">
                    Showcases Shortform (9:16 Reels & TikToks)
                  </span>
                  <span className="bg-[#d8e2f0] text-[#162d50] text-[11px] font-bold px-2 py-0.5 uppercase">
                    Mobile First
                  </span>
                </div>

                {/* Mobile / Header Controls */}
                <div className="flex items-center gap-2 lg:hidden">
                  <button
                    onClick={handleShortformPrev}
                    className="size-[36px] bg-white border border-[#dcd8cf] hover:border-[#162d50] hover:bg-[#f4f7fa] flex items-center justify-center text-[#162d50] transition-colors"
                    aria-label="Vorheriges Reel"
                  >
                    <ChevronLeft className="size-5" />
                  </button>
                  <button
                    onClick={handleShortformNext}
                    className="size-[36px] bg-white border border-[#dcd8cf] hover:border-[#162d50] hover:bg-[#f4f7fa] flex items-center justify-center text-[#162d50] transition-colors"
                    aria-label="Nächstes Reel"
                  >
                    <ChevronRight className="size-5" />
                  </button>
                </div>
              </div>

              {/* Slider Container with Desktop Floating Side Arrows */}
              <div className="relative w-full">
                {/* Desktop Left Float Arrow */}
                <button
                  onClick={handleShortformPrev}
                  className="hidden lg:flex absolute -left-5 xl:-left-7 top-1/2 -translate-y-1/2 z-20 size-12 rounded-full bg-white/95 hover:bg-[#162d50] text-[#162d50] hover:text-white border border-[#dcd8cf] hover:border-[#162d50] items-center justify-center transition-all duration-300 hover:shadow-xl cursor-pointer shadow-md group"
                  aria-label="Vorherige Reels"
                >
                  <ChevronLeft className="size-6 transition-transform group-hover:-translate-x-0.5" />
                </button>

                {/* Desktop Right Float Arrow */}
                <button
                  onClick={handleShortformNext}
                  className="hidden lg:flex absolute -right-5 xl:-right-7 top-1/2 -translate-y-1/2 z-20 size-12 rounded-full bg-white/95 hover:bg-[#162d50] text-[#162d50] hover:text-white border border-[#dcd8cf] hover:border-[#162d50] items-center justify-center transition-all duration-300 hover:shadow-xl cursor-pointer shadow-md group"
                  aria-label="Nächste Reels"
                >
                  <ChevronRight className="size-6 transition-transform group-hover:translate-x-0.5" />
                </button>

                {/* Animated Slider Track */}
                <div className="overflow-hidden w-full py-2">
                  <div 
                    className="flex transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] items-stretch"
                    style={{
                      transform: `translate3d(-${shortformIndex * (100 / itemsPerPage)}%, 0, 0)`,
                    }}
                  >
                    {shortformReels.map((reel, idx) => {
                      const isPlaying = playingShortIdx === idx;

                      return (
                        <div 
                          key={`${reel.videoId}-${idx}`} 
                          className="w-full min-w-full md:w-1/2 md:min-w-[50%] lg:w-1/3 lg:min-w-[33.333333%] shrink-0 px-2 sm:px-3"
                        >
                          <div className="bg-white border border-[#dcd8cf] p-[20px] flex flex-col justify-between gap-[16px] hover:border-[#2f5b7a] transition-all group h-full shadow-sm">
                            {/* 9:16 Video Frame Card */}
                            <div className="bg-[#0b1a3a] w-full aspect-[9/16] relative overflow-hidden border border-[#2f5b7a]/30 shadow-inner">
                              {isPlaying ? (
                                <iframe
                                  className="absolute inset-0 w-full h-full border-0"
                                  src={`https://www.youtube-nocookie.com/embed/${reel.videoId}?autoplay=1&rel=0`}
                                  title={reel.title}
                                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                  allowFullScreen
                                />
                              ) : (
                                <div 
                                  onClick={() => setPlayingShortIdx(idx)}
                                  className="absolute inset-0 w-full h-full p-4 flex flex-col justify-between cursor-pointer"
                                >
                                  <img 
                                    src={reel.thumb} 
                                    alt={reel.company} 
                                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                                  />
                                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b1a3a]/90 via-black/20 to-black/40" />

                                  {/* Badge */}
                                  <div className="flex items-center justify-end z-10">
                                    <span className="bg-[#2f5b7a] text-white text-[10px] font-bold px-2.5 py-1 uppercase tracking-wider">
                                      {reel.badge}
                                    </span>
                                  </div>

                                  {/* Play Icon */}
                                  <div className="absolute inset-0 flex items-center justify-center z-10">
                                    <div className="size-[48px] bg-[#162d50]/90 border border-[#d8e2f0] flex items-center justify-center group-hover:scale-110 group-hover:bg-[#2f5b7a] transition-all shadow-xl">
                                      <Play className="size-[20px] text-white fill-white ml-0.5" />
                                    </div>
                                  </div>

                                  {/* Footer Privacy Info */}
                                  <div className="z-10 bg-[#0b1a3a]/90 backdrop-blur-sm p-2.5 border border-[#2f5b7a]/50">
                                    <p className="text-white text-xs font-bold truncate">{reel.company}</p>
                                    <p className="text-[#d8e2f0] text-[10px] flex items-center gap-1.5 mt-0.5">
                                      <span className="size-1.5 rounded-full bg-emerald-400" />
                                      <span>2-Klick YouTube (DSGVO)</span>
                                    </p>
                                  </div>
                                </div>
                              )}
                            </div>

                            {/* Meta & KPI Box */}
                            <div className="flex flex-col gap-3 justify-between flex-1">
                              <div className="flex flex-col gap-2">
                                <h3 className="text-[#162d50] text-[16px] font-bold leading-snug">
                                  {reel.title}
                                </h3>
                                <p className="text-[#706e65] text-[13px] leading-[1.5]">
                                  {reel.desc}
                                </p>
                              </div>

                              <div className="pt-3 border-t border-[#dcd8cf] flex flex-col gap-1 bg-[#f4f7fa] p-3">
                                <p className="text-[11px] font-bold uppercase tracking-wider text-[#2f5b7a] flex items-center gap-1.5">
                                  <TrendingUp className="size-3.5 text-[#2f5b7a]" />
                                  <span>Gutes eingefangen & Wirkung:</span>
                                </p>
                                <p className="text-[#162d50] text-[13px] font-medium leading-[1.4]">
                                  {reel.kpi}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Dots Indicator */}
                <div className="flex justify-center items-center gap-2 pt-4">
                  {Array.from({ length: totalShortformPages }).map((_, page) => (
                    <button
                      key={page}
                      onClick={() => handleShortformDotClick(page)}
                      className={`transition-all cursor-pointer rounded-full ${
                        page === currentShortformPage 
                          ? 'w-8 h-2.5 bg-[#162d50]' 
                          : 'w-2.5 h-2.5 bg-[#dcd8cf] hover:bg-[#2f5b7a]'
                      }`}
                      aria-label={`Slide ${page + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          {/* D. KUNDENSTIMMEN & VEREINSFEEDBACK */}
          <div className="flex flex-col gap-[28px] items-start w-full pt-[32px] border-t border-[#dcd8cf]">
            <Reveal direction="up" className="w-full">
              <div className="flex flex-col gap-2 items-start w-full">
                <span className="text-[#2f5b7a] text-[12px] font-bold uppercase tracking-wider">
                  ERFAHRUNGSBERICHTE AUS DER PRAXIS
                </span>
                <h3 className="text-[#162d50] text-2xl sm:text-[32px] font-bold">
                  Was Vereinsvorstände über SichtbarGutes berichten
                </h3>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-[24px] items-stretch w-full">
              {testimonials.map((item, idx) => (
                <Reveal key={idx} direction="up" delay={idx * 150} className="h-full">
                  <div className="bg-white border border-[#dcd8cf] p-[28px] flex flex-col justify-between gap-6 hover:border-[#162d50] transition-all relative shadow-sm h-full">
                    <div className="flex flex-col gap-4">
                      <span className="text-5xl font-serif font-bold text-[#2f5b7a] leading-none select-none">
                        „
                      </span>
                      <p className="text-[#2b2a27] text-[15px] leading-[1.6] italic">
                        "{item.quote}"
                      </p>
                    </div>

                    <div className="flex flex-col gap-3 pt-4 border-t border-[#dcd8cf]">
                      <div className="flex flex-col">
                        <p className="text-[#162d50] font-bold text-[16px]">
                          {item.name}
                        </p>
                        <p className="text-[#706e65] text-[13px]">
                          {item.role} · <span className="text-[#162d50] font-medium">{item.organization}</span>
                        </p>
                      </div>

                      <div className="bg-[#d8e2f0]/60 text-[#162d50] text-[11px] font-semibold px-2.5 py-1 flex items-center gap-1.5 border border-[#2f5b7a]/20">
                        <CheckCircle2 className="size-3.5 text-emerald-700 shrink-0" />
                        <span>{item.highlight}</span>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 9. SEKTION 06 / DSEE-ANTRAGSASSISTENT (GEFÜHRTER ONLINE-ANTRAG & PDF-EXPORT) */}
      <section id="antrag-assistent" className="bg-[#f4f7fa] w-full px-6 sm:px-12 lg:px-[64px] py-[72px] border-t border-b border-[#dcd8cf]">
        <div className="max-w-[1360px] mx-auto flex flex-col gap-[36px] items-start">
          <Reveal direction="up" className="w-full">
            <div className="border-b-2 border-[#162d50] py-[12px] w-full">
              <p className="text-[#162d50] text-[12px] font-bold uppercase tracking-wider">
                06 / DSEE-MIKROANTRAG ONLINE-ASSISTENT
              </p>
            </div>
          </Reveal>

          <Reveal direction="up" delay={100} className="w-full">
            <div className="flex flex-col gap-[12px] items-start w-full">
              <h2 className="text-[#162d50] text-3xl sm:text-[40px] font-bold tracking-tight">
                Förderantrag digital vorbereiten & als PDF exportieren
              </h2>
              <p className="text-[#706e65] text-[16px] leading-[1.6] max-w-3xl">
                Sparen Sie sich das manuelle Ausfüllen des 14-seitigen DSEE-Antrags: Erfassen Sie Ihre Daten im Assistenten oder laden Sie mit einem Klick die Musterdaten zum Testen. Ihr fertiger Antrag steht sofort als druckfertiges DIN-A4-PDF bereit.
              </p>
            </div>
          </Reveal>

          {/* Assistant Component */}
          <Reveal direction="up" delay={200} className="w-full">
            <AntragsAssistent />
          </Reveal>
        </div>
      </section>

      {/* 10. SEKTION 07 / HÄUFIG GESTELLTE FRAGEN (FAQ) */}
      <section id="faq" className="bg-white w-full px-6 sm:px-12 lg:px-[64px] py-[72px]">
        <div className="max-w-[1360px] mx-auto flex flex-col gap-[40px] items-start">
          <Reveal direction="up" className="w-full">
            <div className="border-b-2 border-[#162d50] py-[12px] w-full">
              <p className="text-[#162d50] text-[12px] font-bold uppercase tracking-wider">
                07 / HÄUFIG GESTELLTE FRAGEN
              </p>
            </div>
          </Reveal>

          <div className="flex flex-col gap-[24px] items-start w-full">
            <Reveal direction="up" delay={100}>
              <h2 className="text-[#162d50] text-3xl sm:text-[40px] font-bold">
                Antworten für Vereinsvorstände
              </h2>
            </Reveal>

            <div className="flex flex-col items-start w-full divide-y divide-[#dcd8cf]">
              {faqs.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <Reveal key={idx} direction="up" delay={idx * 60} className="w-full">
                    <div className="py-[24px] flex flex-col gap-[12px] items-start w-full">
                      <button
                        onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                        className="flex items-center justify-between w-full text-left cursor-pointer group"
                      >
                        <p className="text-[#162d50] text-[18px] font-bold group-hover:text-[#2f5b7a] transition-colors">
                          {faq.q}
                        </p>
                        <div className="size-[16px] shrink-0 text-[#162d50]">
                          {isOpen ? <Minus className="size-4" /> : <Plus className="size-4" />}
                        </div>
                      </button>
                      {isOpen && (
                        <p className="text-[#706e65] text-[15px] leading-[1.6] w-full pr-8">
                          {faq.a}
                        </p>
                      )}
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 11. SEKTION 08 / ANTRAGSSERVICE STARTEN (CONTACT & FORM) */}
      <section id="kontakt" className="bg-[#162d50] w-full px-6 sm:px-12 lg:px-[64px] py-[72px] text-white">
        <div className="max-w-[1360px] mx-auto flex flex-col lg:flex-row gap-[32px] items-start">
          
          {/* Left Text (813px in Figma) */}
          <Reveal direction="left" delay={100} className="w-full lg:w-[813px] shrink-0">
            <div className="flex flex-col gap-[24px] items-start w-full">
              <p className="text-[#d8e2f0] text-[12px] uppercase font-bold tracking-wider">
                ANTRAGSSERVICE STARTEN
              </p>
              <div className="text-3xl sm:text-4xl lg:text-[48px] font-bold leading-[1.1]">
                <p>Jetzt Förderfähigkeit</p>
                <p>kostenneutral prüfen.</p>
              </div>
              <p className="text-[#d8e2f0] text-[18px] leading-[1.6]">
                Kostenlos und unverbindlich – innerhalb von 48 Stunden erhalten Sie Ihre formelle behördliche Förderungsanalyse.
              </p>
            </div>
          </Reveal>

          {/* Right Form Box (475px in Figma) */}
          <Reveal direction="right" delay={200} className="w-full lg:w-[475px] shrink-0">
            <div className="bg-white border border-[#dcd8cf] p-[32px] flex flex-col gap-[20px] items-start w-full text-[#2b2a27] shadow-xl">
              {submitted ? (
                <div className="text-center py-6 w-full space-y-3">
                  <div className="size-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="size-8" />
                  </div>
                  <h3 className="text-xl font-bold text-[#162d50]">Antrag eingegangen!</h3>
                  <p className="text-sm text-[#706e65]">
                    Vielen Dank. Wir prüfen die Förderfähigkeit für <strong>{verein || 'Ihren Verein'}</strong> und melden uns schnellstmöglich bei Ihnen.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-xs text-[#2f5b7a] font-bold underline"
                  >
                    Neue Prüfung starten
                  </button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="flex flex-col gap-[16px] w-full">
                  <p className="text-[#162d50] text-[18px] font-bold">
                    Schnell-Check für Vereine
                  </p>

                  {/* Qualifikations-Prüfung */}
                  <div className="bg-[#f7f8fb] p-3 border border-[#dcd8cf] space-y-2 text-xs">
                    <label className="flex items-center gap-2 cursor-pointer font-medium text-[#162d50]">
                      <input
                        type="checkbox"
                        checked={isGemeinnuetzig}
                        onChange={(e) => setIsGemeinnuetzig(e.target.checked)}
                        className="accent-[#2f5b7a]"
                      />
                      <span>Eingetragener Verein (e.V.) / Freistellung</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer font-medium text-[#162d50]">
                      <input
                        type="checkbox"
                        checked={isUnter50k}
                        onChange={(e) => setIsUnter50k(e.target.checked)}
                        className="accent-[#2f5b7a]"
                      />
                      <span>Gemeinde unter 50.000 Einwohner</span>
                    </label>
                  </div>

                  {/* Field: Vereinsname */}
                  <div className="flex flex-col gap-[6px] items-start w-full">
                    <label className="text-[#2b2a27] text-[13px] font-bold">Vereinsname</label>
                    <input
                      type="text"
                      required
                      value={verein}
                      onChange={(e) => setVerein(e.target.value)}
                      placeholder="z.B. Freiwillige Feuerwehr Musterdorf e.V."
                      className="border border-[#dcd8cf] p-[12px] text-[14px] text-[#2b2a27] placeholder:text-[#706e65] w-full focus:outline-none focus:border-[#2f5b7a]"
                    />
                  </div>

                  {/* Field: Postleitzahl & Ort */}
                  <div className="flex flex-col gap-[6px] items-start w-full">
                    <label className="text-[#2b2a27] text-[13px] font-bold">Postleitzahl & Ort</label>
                    <input
                      type="text"
                      required
                      value={plz}
                      onChange={(e) => setPlz(e.target.value)}
                      placeholder="z.B. 12345 Schöna"
                      className="border border-[#dcd8cf] p-[12px] text-[14px] text-[#2b2a27] placeholder:text-[#706e65] w-full focus:outline-none focus:border-[#2f5b7a]"
                    />
                  </div>

                  {/* Field: Ansprechpartner */}
                  <div className="flex flex-col gap-[6px] items-start w-full">
                    <label className="text-[#2b2a27] text-[13px] font-bold">Ansprechpartner</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Vor- und Nachname"
                      className="border border-[#dcd8cf] p-[12px] text-[14px] text-[#2b2a27] placeholder:text-[#706e65] w-full focus:outline-none focus:border-[#2f5b7a]"
                    />
                  </div>

                  {/* Field: E-Mail-Adresse */}
                  <div className="flex flex-col gap-[6px] items-start w-full">
                    <label className="text-[#2b2a27] text-[13px] font-bold">E-Mail-Adresse</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@verein.de"
                      className="border border-[#dcd8cf] p-[12px] text-[14px] text-[#2b2a27] placeholder:text-[#706e65] w-full focus:outline-none focus:border-[#2f5b7a]"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="bg-[#2f5b7a] hover:bg-[#162d50] text-white text-[15px] font-bold px-[28px] py-[14px] flex items-center justify-center gap-[10px] w-full transition-colors mt-2"
                  >
                    <span>Antragsberechtigung jetzt absenden</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </Reveal>

        </div>
      </section>

      {/* 12. FOOTER */}
      <footer className="bg-[#0b1a3a] text-white w-full px-6 sm:px-12 lg:px-[64px] pt-[40px] pb-[32px] flex flex-col gap-[24px] items-start">
        <div className="flex flex-col sm:flex-row items-start justify-between w-full gap-8">
          <div className="flex flex-col gap-[16px] items-start w-full max-w-[320px]">
            <img 
              src={logoWhite} 
              alt="SichtbarGutes" 
              className="h-[34px] w-auto object-contain" 
            />
            <p className="text-[#d8e2f0] text-[13px] leading-[1.5]">
              Initiative zur Stärkung der ländlichen Vereinskultur durch gezielten, digitalen Bürokratieabbau.
            </p>
          </div>

          <div className="flex flex-wrap gap-[32px] items-start text-[#d8e2f0] text-[14px] font-medium">
            <a href="#kompass" className="hover:text-white transition-colors">Förderkompass</a>
            <a href="#ablauf" className="hover:text-white transition-colors">Ablauf</a>
            <a href="#massnahmen" className="hover:text-white transition-colors">Leistungen</a>
            <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
            <a href="#kontakt" className="hover:text-white transition-colors">DSEE-Schnittstelle</a>
          </div>
        </div>

        <div className="border-t border-[#162d50] pt-[24px] flex flex-col sm:flex-row items-start sm:items-center justify-between w-full text-[#706e65] text-[12px] gap-2">
          <p>© 2026 SichtbarGutes. Ein privatwirtschaftliches Angebot für eingetragene Vereine. Keine offizielle Behördenseite.</p>
          <p>Plattform-Version 4.1-DBA · Lighthouse 99</p>
        </div>
      </footer>

    </div>
  );
}
