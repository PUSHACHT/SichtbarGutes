import { jsPDF } from 'jspdf';
import { AntragData } from '../types/antrag';

export function generateAntragPDF(data: AntragData) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = 210;
  const pageHeight = 297;
  const margin = 20;
  const contentWidth = pageWidth - 2 * margin;

  let y = margin;

  const totalCosts = data.kostenPositionen.reduce((sum, item) => sum + (Number(item.amount) || 0), 0);
  const eigenmittel = Math.round(totalCosts * (data.eigenmittelAnteilProzent / 100) * 100) / 100;
  const foerderung = Math.round((totalCosts - eigenmittel) * 100) / 100;

  function checkPageBreak(neededHeight: number) {
    if (y + neededHeight > pageHeight - 25) {
      addFooter();
      doc.addPage();
      y = margin;
      addHeaderSmall();
    }
  }

  function addFooter() {
    const pageNum = doc.getNumberOfPages();
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(112, 110, 101); // #706e65
    doc.text(
      'Arbeitshilfe auf Basis des DSEE-Musterantrags (Mikroförderung) · SichtbarGutes',
      margin,
      pageHeight - 10
    );
    doc.text(
      `Seite ${pageNum}`,
      pageWidth - margin,
      pageHeight - 10,
      { align: 'right' }
    );
  }

  function addHeaderSmall() {
    doc.setFillColor(22, 45, 80); // #162d50
    doc.rect(margin, y, contentWidth, 8, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(255, 255, 255);
    doc.text('DSEE-MIKROFÖRDERANTRAG — EHRENAMT GEWINNEN & BINDEN', margin + 3, y + 5.5);
    y += 14;
  }

  // === SEITE 1: HEADER ===
  // Primary Banner
  doc.setFillColor(11, 26, 58); // #0b1a3a
  doc.rect(margin, y, contentWidth, 24, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(255, 255, 255);
  doc.text('ANTRAG AUF DSEE-MIKROFÖRDERUNG', margin + 6, y + 9);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(216, 226, 240); // #d8e2f0
  doc.text('Deutsche Stiftung für Engagement und Ehrenamt · Förderbereich Digitalisierung & Sichtbarkeit', margin + 6, y + 16);
  y += 30;

  // Metadata Strip
  doc.setFillColor(244, 247, 250); // #f4f7fa
  doc.rect(margin, y, contentWidth, 12, 'F');
  doc.setDrawColor(220, 216, 207);
  doc.rect(margin, y, contentWidth, 12, 'S');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(22, 45, 80);
  doc.text(`Antragsdatum: ${data.antragsDatum || new Date().toISOString().split('T')[0]}`, margin + 4, y + 7.5);
  doc.text(`Status: Vollständig vorbereiteter Antrag`, margin + contentWidth - 4, y + 7.5, { align: 'right' });
  y += 18;

  // KAPITEL 1
  checkPageBreak(35);
  doc.setFillColor(22, 45, 80);
  doc.rect(margin, y, contentWidth, 7, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(255, 255, 255);
  doc.text('1. BASISDATEN & PROJEKTÜBERSICHT', margin + 3, y + 5);
  y += 11;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(43, 42, 39);
  doc.text('Projekttitel:', margin, y);
  doc.setFont('helvetica', 'normal');
  const titleLines = doc.splitTextToSize(data.projekttitel || 'Nicht angegeben', contentWidth - 30);
  doc.text(titleLines, margin + 30, y);
  y += titleLines.length * 4.5 + 2;

  checkPageBreak(15);
  doc.setFont('helvetica', 'bold');
  doc.text('Projektzeitraum:', margin, y);
  doc.setFont('helvetica', 'normal');
  doc.text(`${data.projektStart || '-'} bis ${data.projektEnde || '-'}`, margin + 30, y);
  y += 6;

  doc.setFont('helvetica', 'bold');
  doc.text('Durchführungsort:', margin, y);
  doc.setFont('helvetica', 'normal');
  doc.text(`${data.projektOrt || '-'} (Gemeinde < 50.000 Einwohner)`, margin + 30, y);
  y += 6;

  doc.setFont('helvetica', 'bold');
  doc.text('Förderschwerpunkt:', margin, y);
  doc.setFont('helvetica', 'normal');
  const spLines = doc.splitTextToSize(data.foerderschwerpunkt || 'Ehrenamt gewinnen und binden', contentWidth - 35);
  doc.text(spLines, margin + 35, y);
  y += spLines.length * 4.5 + 4;

  // KAPITEL 2
  checkPageBreak(45);
  doc.setFillColor(22, 45, 80);
  doc.rect(margin, y, contentWidth, 7, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(255, 255, 255);
  doc.text('2. ORGANISATION & ANTRAGSTELLER', margin + 3, y + 5);
  y += 11;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(43, 42, 39);
  doc.text('Antragstellende Organisation:', margin, y);
  doc.setFont('helvetica', 'normal');
  doc.text(`${data.vereinsname || '-'} (${data.rechtsform || 'e.V.'})`, margin + 50, y);
  y += 6;

  doc.setFont('helvetica', 'bold');
  doc.text('Vereinsregister / VR-Nr.:', margin, y);
  doc.setFont('helvetica', 'normal');
  doc.text(`${data.registergericht || '-'}, ${data.registernummer || '-'}`, margin + 50, y);
  y += 6;

  doc.setFont('helvetica', 'bold');
  doc.text('Finanzamt / Steuernummer:', margin, y);
  doc.setFont('helvetica', 'normal');
  doc.text(`${data.finanzamt || '-'} (St.-Nr.: ${data.steuernummer || '-'}) · Freistellung: ${data.freistellungsbescheidDatum || '-'}`, margin + 50, y);
  y += 6;

  doc.setFont('helvetica', 'bold');
  doc.text('Anschrift & Website:', margin, y);
  doc.setFont('helvetica', 'normal');
  doc.text(`${data.strasse || '-'}, ${data.plz || ''} ${data.ort || ''} | ${data.website || '-'}`, margin + 50, y);
  y += 6;

  doc.setFont('helvetica', 'bold');
  doc.text('Ansprechpartner/in:', margin, y);
  doc.setFont('helvetica', 'normal');
  doc.text(`${data.ansprechpartnerName || '-'} (${data.ansprechpartnerFunktion || '-'}) | ${data.ansprechpartnerEmail || '-'} | Tel.: ${data.ansprechpartnerTelefon || '-'}`, margin + 50, y);
  y += 6;

  doc.setFont('helvetica', 'bold');
  doc.text('Bankverbindung:', margin, y);
  doc.setFont('helvetica', 'normal');
  doc.text(`IBAN: ${data.iban || '-'} | BIC: ${data.bic || '-'} | Institut: ${data.kreditinstitut || '-'}`, margin + 50, y);
  y += 6;

  doc.setFont('helvetica', 'bold');
  doc.text('Mitgliederstruktur:', margin, y);
  doc.setFont('helvetica', 'normal');
  doc.text(`${data.anzahlEhrenamtliche || 0} ehrenamtlich Tätige / ${data.anzahlHauptamtliche || 0} Hauptamtliche`, margin + 50, y);
  y += 10;

  // KAPITEL 3: FINANZPLAN & RECHNER
  checkPageBreak(50);
  doc.setFillColor(22, 45, 80);
  doc.rect(margin, y, contentWidth, 7, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(255, 255, 255);
  doc.text('3. FINANZPLAN & AUSGABENAUFSTELLUNG (MAX. 1.500 €)', margin + 3, y + 5);
  y += 11;

  // Kosten-Tabelle Header
  doc.setFillColor(244, 247, 250);
  doc.rect(margin, y, contentWidth, 6, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(22, 45, 80);
  doc.text('Kategorie', margin + 2, y + 4.2);
  doc.text('Bezeichnung der Ausgabe / Maßnahme', margin + 35, y + 4.2);
  doc.text('Betrag (€)', margin + contentWidth - 2, y + 4.2, { align: 'right' });
  y += 7;

  // Positionen
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(43, 42, 39);

  data.kostenPositionen.forEach((pos) => {
    checkPageBreak(8);
    const catLabel = pos.category === 'werkvertrag' ? 'Werkvertrag' : pos.category === 'honorar' ? 'Honorar' : 'Sachausgabe';
    doc.text(catLabel, margin + 2, y + 4);
    const descLines = doc.splitTextToSize(pos.description || '-', contentWidth - 65);
    doc.text(descLines, margin + 35, y + 4);
    doc.text(`${(Number(pos.amount) || 0).toFixed(2)} €`, margin + contentWidth - 2, y + 4, { align: 'right' });
    y += Math.max(6, descLines.length * 4.5);
  });

  // Summen-Box
  checkPageBreak(25);
  y += 2;
  doc.setFillColor(216, 226, 240); // #d8e2f0
  doc.rect(margin, y, contentWidth, 16, 'F');
  doc.setDrawColor(47, 91, 122);
  doc.rect(margin, y, contentWidth, 16, 'S');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(22, 45, 80);
  doc.text(`Gesamtausgaben (Projektbudget):`, margin + 4, y + 5.5);
  doc.text(`${totalCosts.toFixed(2)} €`, margin + 70, y + 5.5);

  doc.text(`Beantragte DSEE-Förderung (90 %):`, margin + 4, y + 11.5);
  doc.text(`${foerderung.toFixed(2)} €`, margin + 70, y + 11.5);

  doc.text(`Erforderlicher Eigenanteil (10 %):`, margin + 110, y + 11.5);
  doc.text(`${eigenmittel.toFixed(2)} €`, margin + contentWidth - 4, y + 11.5, { align: 'right' });
  y += 22;

  // KAPITEL 4: VORHABEN
  checkPageBreak(50);
  doc.setFillColor(22, 45, 80);
  doc.rect(margin, y, contentWidth, 7, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(255, 255, 255);
  doc.text('4. VORHABEN, ZIELE & WIRKUNG', margin + 3, y + 5);
  y += 11;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(43, 42, 39);
  doc.text('Kurzbeschreibung & Ausgangslage:', margin, y);
  y += 4.5;
  doc.setFont('helvetica', 'normal');
  const kurzLines = doc.splitTextToSize(data.kurzbeschreibung || data.ausgangslage || 'Keine Angabe', contentWidth);
  doc.text(kurzLines, margin, y);
  y += kurzLines.length * 4.2 + 4;

  checkPageBreak(30);
  doc.setFont('helvetica', 'bold');
  doc.text('Geplante Maßnahmen & Ehrenamts-Einbindung:', margin, y);
  y += 4.5;
  doc.setFont('helvetica', 'normal');
  const massLines = doc.splitTextToSize(data.geplanteMassnahmen || data.einbindungEhrenamt || 'Keine Angabe', contentWidth);
  doc.text(massLines, margin, y);
  y += massLines.length * 4.2 + 4;

  checkPageBreak(20);
  doc.setFont('helvetica', 'bold');
  doc.text('Zielgruppen:', margin, y);
  doc.setFont('helvetica', 'normal');
  doc.text(data.zielgruppen.join(', ') || 'Alle Bürgerinnen und Bürger', margin + 25, y);
  y += 10;

  // KAPITEL 5: ERKLÄRUNGEN
  checkPageBreak(45);
  doc.setFillColor(22, 45, 80);
  doc.rect(margin, y, contentWidth, 7, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(255, 255, 255);
  doc.text('5. VERBINDLICHE ERKLÄRUNGEN DER ORGANISATION', margin + 3, y + 5);
  y += 11;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(43, 42, 39);

  const erklaerungen = [
    'Die Organisation ist gemeinnützig und besitzt einen gültigen Freistellungsbescheid.',
    'Das Besserstellungsverbot und die Vergaberichtlinien der DSEE werden eingehalten.',
    'Die Fördermittel werden ausschließlich zweckgebunden für das beschriebene Vorhaben eingesetzt.',
    'Es liegt keine Doppelförderung für dieselben Maßnahmen durch andere Zuwendungsgeber vor.',
    'Die Subventionsklauseln gemäß § 264 StGB sind zur Kenntnis genommen worden.'
  ];

  erklaerungen.forEach((erk) => {
    checkPageBreak(7);
    doc.text('[X]', margin, y + 3.5);
    const elines = doc.splitTextToSize(erk, contentWidth - 10);
    doc.text(elines, margin + 8, y + 3.5);
    y += Math.max(5, elines.length * 3.8);
  });

  // UNTERSCHRIFTENFELD
  checkPageBreak(35);
  y += 6;
  doc.setDrawColor(220, 216, 207);
  doc.line(margin, y, margin + 75, y);
  doc.line(margin + 90, y, margin + contentWidth, y);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(112, 110, 101);
  doc.text('Ort, Datum', margin, y + 4);
  doc.text('Rechtsverbindliche Unterschrift(en) des Vorstands', margin + 90, y + 4);

  // Footer for last page
  addFooter();

  // Save document
  const fileName = `DSEE-Mikroantrag_${(data.vereinsname || 'Verein').replace(/[^a-zA-Z0-9]/g, '_')}.pdf`;
  doc.save(fileName);
}
