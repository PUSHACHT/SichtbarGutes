import t_E9DBcbFIn9s from '../assets/thumbnails/short-E9DBcbFIn9s.jpg';
import t_AN2gwlrf7UU from '../assets/thumbnails/short-AN2gwlrf7UU.jpg';
import t_KDPfzfbX2KY from '../assets/thumbnails/short-KDPfzfbX2KY.jpg';
import t_h367fM_YFbQ from '../assets/thumbnails/short-h367fM_YFbQ.jpg';
import t_3sVGHKCd2pM from '../assets/thumbnails/short-3sVGHKCd2pM.jpg';
import t_IiEUmU2I0ZE from '../assets/thumbnails/short-IiEUmU2I0ZE.jpg';
import t_UEQg_nbto7o from '../assets/thumbnails/short-UEQg-nbto7o.jpg';
import t_PaBuvUkvseE from '../assets/thumbnails/short-PaBuvUkvseE.jpg';
import t_gOVPWVikbyM from '../assets/thumbnails/short-gOVPWVikbyM.jpg';

import thumbHZQ from '../assets/thumbnails/long-HZQn5xHfyOM.jpg';
import thumb1sr from '../assets/thumbnails/long-1srCmXos4lk.jpg';

import piJugendhilfeImg from '../assets/web-previews/pi-jugendhilfe.png';

export interface ShortformReel {
  title: string;
  desc: string;
  kpi: string;
  company: string;
  badge: string;
  videoId: string;
  thumb: string;
}

export interface LongformProject {
  title: string;
  desc: string;
  kpi: string;
  company: string;
  duration: string;
  videoId: string;
  thumb: string;
}

export interface WebProject {
  title: string;
  desc: string;
  kpi: string;
  company: string;
  url: string;
  displayUrl: string;
  badge: string;
  previewImage: string;
  allowsIframe: boolean;
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  organization: string;
  highlight: string;
}

export const shortformReels: ShortformReel[] = [
  {
    title: 'VEREINSSPORT & COMMUNITY DYNAMIK',
    desc: 'Mitreißende Sport- und Teameinblicke für Social Media zur gezielten Nachwuchs- & Mitgliedergewinnung.',
    kpi: '+320% höhere Interaktionsrate & Reichweite',
    company: 'Sport & Gemeinschaft',
    badge: 'Vereinssport',
    videoId: 'E9DBcbFIn9s',
    thumb: t_E9DBcbFIn9s,
  },
  {
    title: 'SPORTTREFF KAMPAGNE & RECRUITING',
    desc: 'Moderner Einblick in das Sport- & Trainingserlebnis zur gezielten Neukundengewinnung.',
    kpi: '85 Neumitglieder-Anfragen im Kampagnenzeitraum',
    company: 'Sport & Fitness Club',
    badge: 'Mitglieder',
    videoId: 'AN2gwlrf7UU',
    thumb: t_AN2gwlrf7UU,
  },
  {
    title: 'COMMUNITY EVENT & VEREINSFEST',
    desc: 'Community-Building & Event-Highlights mit packendem Social-Media-Schnitt für ländliche Veranstaltungen.',
    kpi: 'Über 45.000 organische Videoaufrufe im Kommunalraum',
    company: 'Ehrenamt & Events',
    badge: 'Event',
    videoId: 'KDPfzfbX2KY',
    thumb: t_KDPfzfbX2KY,
  },
  {
    title: 'ACHTSAMKEIT & GESUNDHEITSSPORT',
    desc: 'Ästhetische Outdoor-Aufnahmen mit Fokus auf Entspannung, Vitalität und Gesundheit.',
    kpi: 'Ausgebuchte Sommer-Kurse innerhalb von 48h',
    company: 'Gesundheit & Prävention',
    badge: 'Prävention',
    videoId: 'h367fM_YFbQ',
    thumb: t_h367fM_YFbQ,
  },
  {
    title: 'KULTUR & REGIONALE IDENTITÄT',
    desc: 'Emotionales & ansprechendes Storytelling zur Stärkung der ländlichen Vereinskultur.',
    kpi: '1.4M Impressionen auf Social-Media-Kanälen',
    company: 'Kultur & Tradition',
    badge: 'Kultur',
    videoId: '3sVGHKCd2pM',
    thumb: t_3sVGHKCd2pM,
  },
  {
    title: 'COMMUNITY AFTER WORK & NETZWERK',
    desc: 'Event-Begleitung & Networking-Highlights für lokale Begegnungsstätten.',
    kpi: 'Verdopplung der Event-Teilnehmerzahl',
    company: 'Begegnungszentrum',
    badge: 'Community',
    videoId: 'IiEUmU2I0ZE',
    thumb: t_IiEUmU2I0ZE,
  },
  {
    title: 'JUBILÄUM & FESTLICHE HIGHLIGHTS',
    desc: 'Feierliches Vereinsjubiläum & Besucher-Highlights dynamisch dokumentiert.',
    kpi: '35.000 lokale Shares & Interaktionen',
    company: 'Regionalzentrum',
    badge: 'Jubiläum',
    videoId: 'UEQg-nbto7o',
    thumb: t_UEQg_nbto7o,
  },
  {
    title: 'GEMEINWESEN & KOMMUNALER DIALOG',
    desc: 'Modernes Gemeinschaftserlebnis dynamisch auf Kamera festgehalten.',
    kpi: '+175% Reichweite in der Heimatregion',
    company: 'Kommunalverband',
    badge: 'Kommunal',
    videoId: 'PaBuvUkvseE',
    thumb: t_PaBuvUkvseE,
  },
  {
    title: 'VEREINSGASTRONOMIE & BEGEGNUNG',
    desc: 'Einladende Kulinarik- und Geselligkeitsmomente im Vereinsheim in Szene gesetzt.',
    kpi: '+40% mehr Gäste & Veranstaltungsbuchungen',
    company: 'Vereinsheim',
    badge: 'Gastronomie',
    videoId: 'gOVPWVikbyM',
    thumb: t_gOVPWVikbyM,
  },
];

export const longformProjects: LongformProject[] = [
  {
    title: 'AUSBILDUNG, GEMEINSCHAFT & ERZIEHUNG',
    desc: 'Persönliche Einblicke und emotionale Erfahrungsberichte über gemeinnützige Bildungsarbeit zur gezielten Fachkräfte- & Nachwuchsgewinnung.',
    kpi: 'Verdopplung der qualifizierten Bewerbungen im Kampagnenzeitraum',
    company: 'Berufskolleg Bleibergquelle',
    duration: '03:45 Min',
    videoId: 'HZQn5xHfyOM',
    thumb: thumbHZQ,
  },
  {
    title: 'VEREINSPORTRAIT & BILDUNGSINITIATIVE',
    desc: 'Authentischer Einblick in Bildung, Gemeinschaft und modernen Campus-Alltag zur nachhaltigen Schüler- & Ehrenamtsförderung.',
    kpi: '+280% mehr Anmeldungen und neue Förderer',
    company: 'Berufskolleg Bleibergquelle',
    duration: '04:12 Min',
    videoId: '1srCmXos4lk',
    thumb: thumb1sr,
  },
];

export const webProjects: WebProject[] = [
  {
    title: 'PI JUGENDHILFE WEB EXPERIENCE & CMS',
    desc: 'Ambulante Hilfen zur Erziehung im regionalen Raum. Psychologisch fundiert, strukturiert und vertrauensvoll digital dargestellt.',
    kpi: '+160% mehr qualifizierte Erstkontakte von Familien & Ämtern',
    company: 'Praxis für interdisziplinäre Jugendhilfe',
    url: 'https://www.pi-jugendhilfe.com/',
    displayUrl: 'www.pi-jugendhilfe.com',
    badge: 'Jugendhilfe & CMS',
    previewImage: piJugendhilfeImg,
    allowsIframe: true,
  },
];

export const testimonials: Testimonial[] = [
  {
    quote: 'Dank SichtbarGutes und der 90%-Förderung der DSEE haben wir endlich einen professionellen Imagefilm und Social-Media-Clips, die unsere Jugendarbeit genau so zeigen, wie sie ist. Die Antragstellung war in wenigen Tagen erledigt – ohne jeglichen bürokratischen Stress für unseren Vorstand.',
    name: 'Thomas Becker',
    role: '1. Vorsitzender',
    organization: 'TSV & Jugendförderung e.V.',
    highlight: '90% DSEE-Zuschuss bewilligt · 40% mehr Neumitglieder',
  },
  {
    quote: 'Für einen kleinen Verein im ländlichen Raum sind 1.500 € Projektbudget ein enormer Hebel. Wir mussten lediglich 150 € Eigenanteil beisteuern und haben dafür eine topaktuelle, barrierefreie Website und hochwertige Videoinhalte erhalten. Höchste Empfehlung!',
    name: 'Dr. Marianne Weber',
    role: 'Vorstand Öffentlichkeitsarbeit',
    organization: 'Kultur- & Heimatverein Sonnenwald',
    highlight: '150 € Eigenanteil · 100% Zufriedenheit',
  },
  {
    quote: 'Das Team hat uns von der ersten DSEE-Prüfung bis zur finalen Ausspielung der Reels begleitet. Unsere Reichweite in der Region hat sich verdreifacht, und wir konnten endlich neue Trainerinnen und Trainer gewinnen.',
    name: 'Markus Lindner',
    role: 'Abteilungsleiter',
    organization: 'Freiwillige Helfer & Sportgemeinschaft',
    highlight: '+320% Social-Media-Reichweite',
  },
];
