export interface CostItem {
  id: string;
  category: 'sach' | 'honorar' | 'werkvertrag';
  description: string;
  amount: number;
}

export interface BoardMember {
  id: string;
  name: string;
  role: string;
  email: string;
  phone: string;
}

export interface AntragData {
  // Kapitel 1: Basisdaten & Berechtigung
  antragsDatum: string;
  projekttitel: string;
  projektStart: string;
  projektEnde: string;
  foerderschwerpunkt: string;
  projektOrt: string;
  vorzeitigerMassnahmenbeginn: boolean;
  istGemeinnuetzig: boolean;
  istUnter50k: boolean;

  // Kapitel 2: Organisation & Vorstand
  vereinsname: string;
  rechtsform: string;
  registergericht: string;
  registernummer: string;
  finanzamt: string;
  steuernummer: string;
  freistellungsbescheidDatum: string;
  strasse: string;
  plz: string;
  ort: string;
  website: string;
  ansprechpartnerName: string;
  ansprechpartnerFunktion: string;
  ansprechpartnerEmail: string;
  ansprechpartnerTelefon: string;
  vorstaende: BoardMember[];
  iban: string;
  bic: string;
  kreditinstitut: string;
  kontoinhaber: string;
  anzahlEhrenamtliche: number;
  anzahlHauptamtliche: number;

  // Kapitel 3: Finanzplan
  kostenPositionen: CostItem[];
  eigenmittelAnteilProzent: number; // Standard 10

  // Kapitel 4: Vorhaben & Wirkungsziele
  kurzbeschreibung: string;
  ausgangslage: string;
  hauptziele: string;
  geplanteMassnahmen: string;
  zielgruppen: string[];
  einbindungEhrenamt: string;

  // Kapitel 5: Erklärungen
  erklaerungGemeinnuetzigkeit: boolean;
  erklaerungBesserstellungsverbot: boolean;
  erklaerungZweckbindung: boolean;
  erklaerungKeineDoppelfoerderung: boolean;
  erklaerungSubventionsgesetz: boolean;
  erklaerungVorsteuerabzugsberechtigt: boolean;
}

export type AntragChapter = 
  | 'start'
  | 'basisdaten'
  | 'organisation'
  | 'finanzplan'
  | 'vorhaben'
  | 'erklaerungen'
  | 'review';
