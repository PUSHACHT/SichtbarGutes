import { AntragData } from '../types/antrag';

export const initialAntragState: AntragData = {
  // Kapitel 1: Basisdaten & Berechtigung
  antragsDatum: new Date().toISOString().split('T')[0],
  projekttitel: '',
  projektStart: '',
  projektEnde: '',
  foerderschwerpunkt: 'Ehrenamt gewinnen und binden (z.B. Nachwuchsgewinnung & digitale Sichtbarkeit)',
  projektOrt: '',
  vorzeitigerMassnahmenbeginn: false,
  istGemeinnuetzig: true,
  istUnter50k: true,

  // Kapitel 2: Organisation & Vorstand
  vereinsname: '',
  rechtsform: 'Eingetragener Verein (e.V.)',
  registergericht: '',
  registernummer: '',
  finanzamt: '',
  steuernummer: '',
  freistellungsbescheidDatum: '',
  strasse: '',
  plz: '',
  ort: '',
  website: '',
  ansprechpartnerName: '',
  ansprechpartnerFunktion: '1. Vorsitzende/r',
  ansprechpartnerEmail: '',
  ansprechpartnerTelefon: '',
  vorstaende: [
    {
      id: 'v-1',
      name: '',
      role: '1. Vorsitzende/r',
      email: '',
      phone: ''
    }
  ],
  iban: '',
  bic: '',
  kreditinstitut: '',
  kontoinhaber: '',
  anzahlEhrenamtliche: 15,
  anzahlHauptamtliche: 0,

  // Kapitel 3: Finanzplan
  kostenPositionen: [
    {
      id: 'cost-1',
      category: 'werkvertrag',
      description: 'Erstellung barrierefreie Vereins-Website & Content-System',
      amount: 850
    },
    {
      id: 'cost-2',
      category: 'werkvertrag',
      description: 'Produktion 4K Vereins-Kurzporträt & 3 Social-Media Reels',
      amount: 500
    },
    {
      id: 'cost-3',
      category: 'sach',
      description: 'Druck- und Werbematerialien zur Mitgliederwerbung vor Ort',
      amount: 150
    }
  ],
  eigenmittelAnteilProzent: 10,

  // Kapitel 4: Vorhaben & Wirkungsziele
  kurzbeschreibung: '',
  ausgangslage: '',
  hauptziele: '',
  geplanteMassnahmen: '',
  zielgruppen: ['Kinder & Jugendliche', 'Junge Erwachsene & Familien', 'Senioren & Engagierte'],
  einbindungEhrenamt: '',

  // Kapitel 5: Erklärungen
  erklaerungGemeinnuetzigkeit: false,
  erklaerungBesserstellungsverbot: false,
  erklaerungZweckbindung: false,
  erklaerungKeineDoppelfoerderung: false,
  erklaerungSubventionsgesetz: false,
  erklaerungVorsteuerabzugsberechtigt: false
};

export const musterAntragData: AntragData = {
  // Kapitel 1: Basisdaten & Berechtigung
  antragsDatum: new Date().toISOString().split('T')[0],
  projekttitel: 'Digitale Nachwuchsgewinnung & moderne Vereinspräsenz im ländlichen Raum',
  projektStart: '2026-10-01',
  projektEnde: '2026-12-31',
  foerderschwerpunkt: 'Ehrenamt gewinnen und binden (z.B. Nachwuchsgewinnung & digitale Sichtbarkeit)',
  projektOrt: '15859 Storkow (Mark)',
  vorzeitigerMassnahmenbeginn: false,
  istGemeinnuetzig: true,
  istUnter50k: true,

  // Kapitel 2: Organisation & Vorstand
  vereinsname: 'Förderverein Kultur & Sport Storkow e.V.',
  rechtsform: 'Eingetragener Verein (e.V.)',
  registergericht: 'Amtsgericht Frankfurt (Oder)',
  registernummer: 'VR 4321 FF',
  finanzamt: 'Finanzamt Frankfurt (Oder)',
  steuernummer: '061/141/08921',
  freistellungsbescheidDatum: '2025-04-12',
  strasse: 'Burgstraße 14',
  plz: '15859',
  ort: 'Storkow (Mark)',
  website: 'https://kultur-sport-storkow.de',
  ansprechpartnerName: 'Hagen Teimann',
  ansprechpartnerFunktion: '1. Vorsitzender',
  ansprechpartnerEmail: 'vorstand@kultur-sport-storkow.de',
  ansprechpartnerTelefon: '033678 / 554320',
  vorstaende: [
    {
      id: 'v-1',
      name: 'Hagen Teimann',
      role: '1. Vorsitzender',
      email: 'vorstand@kultur-sport-storkow.de',
      phone: '033678 / 554320'
    },
    {
      id: 'v-2',
      name: 'Klaas Herting',
      role: 'Schatzmeister / Stellvertreter',
      email: 'finanzen@kultur-sport-storkow.de',
      phone: '033678 / 554321'
    }
  ],
  iban: 'DE44 1705 6099 0012 3456 78',
  bic: 'MBSBDEBBXXX',
  kreditinstitut: 'Mittelbrandenburgische Sparkasse',
  kontoinhaber: 'Förderverein Kultur & Sport Storkow e.V.',
  anzahlEhrenamtliche: 28,
  anzahlHauptamtliche: 0,

  // Kapitel 3: Finanzplan
  kostenPositionen: [
    {
      id: 'cost-1',
      category: 'werkvertrag',
      description: 'Relaunch einer barrierefreien, mobilen Vereins-Website mit Anmeldeformular',
      amount: 850
    },
    {
      id: 'cost-2',
      category: 'werkvertrag',
      description: 'Produktion von 3 kurzen Recruiting-Reels für Instagram & Vereins-Imagefilm',
      amount: 500
    },
    {
      id: 'cost-3',
      category: 'sach',
      description: 'Flyer und regionale Aushänge mit QR-Code zum Online-Portal',
      amount: 150
    }
  ],
  eigenmittelAnteilProzent: 10,

  // Kapitel 4: Vorhaben & Wirkungsziele
  kurzbeschreibung: 'Das Projekt modernisiert den Außenauftritt unseres Vereins, um gezielt jüngere Mitglieder und ehrenamtliche Helfer über digitale Kanäle und mobile Medien anzusprechen.',
  ausgangslage: 'Bisher stützt sich der Verein auf veraltete Infotafeln und Mundpropaganda. Vor allem im Alterssegment 16–35 Jahre fehlt die digitale Erreichbarkeit über Smartphones und soziale Medien.',
  hauptziele: '1. Gewinnung von mind. 10 neuen aktiven Ehrenamtlichen im Projektzeitraum.\n2. Steigerung der digitalen Sichtbarkeit in der Region durch barrierefreien Webauftritt.\n3. Entlastung des Vorstands durch digitale Anfrage- und Helferformulare.',
  geplanteMassnahmen: '• Konzeption und Bereitstellung einer responsive Website mit Fokus auf Ehrenamts-Rekrutierung.\n• Dreharbeiten vor Ort für 3 kurze Video-Clips, die das Vereinsleben lebendig darstellen.\n• Durchführung einer lokalen Social-Media-Kampagne und Verteilung von Infoflyern mit QR-Codes.',
  zielgruppen: ['Kinder & Jugendliche', 'Junge Erwachsene & Familien', 'Senioren & Engagierte', 'Lokale Neubürger'],
  einbindungEhrenamt: 'Die Vereinsmitglieder wirken aktiv an den Dreharbeiten mit, liefern inhaltliche Texte und betreuen nach Abschluss der Schulung eigenständig die neuen digitalen Kanäle.',

  // Kapitel 5: Erklärungen
  erklaerungGemeinnuetzigkeit: true,
  erklaerungBesserstellungsverbot: true,
  erklaerungZweckbindung: true,
  erklaerungKeineDoppelfoerderung: true,
  erklaerungSubventionsgesetz: true,
  erklaerungVorsteuerabzugsberechtigt: false
};
