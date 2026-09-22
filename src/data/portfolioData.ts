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
import bleibergLogo from '../assets/bleibergquelle-logo.png';

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
  quoteShort: string;
  quoteFull: string;
  name: string;
  organization: string;
  logo: string;
  rating: number;
}

export const shortformReels: ShortformReel[] = [
  {
    title: 'VEREINSSPORT & COMMUNITY DYNAMIK',
    desc: 'Mitreißende Sport- und Teameinblicke für Social Media zur gezielten Nachwuchs- & Mitgliedergewinnung.',
    kpi: 'Vereinsdynamik und Zusammenhalt emotional sichtbar gemacht',
    company: 'Sport & Gemeinschaft',
    badge: 'Vereinssport',
    videoId: 'E9DBcbFIn9s',
    thumb: t_E9DBcbFIn9s,
  },
  {
    title: 'SPORTTREFF KAMPAGNE & RECRUITING',
    desc: 'Moderner Einblick in das Sport- & Trainingserlebnis zur gezielten Ansprache neuer Mitglieder.',
    kpi: 'Sportbegeisterung spürbar eingefangen & Nachwuchs begeistert',
    company: 'Sport & Fitness Club',
    badge: 'Mitglieder',
    videoId: 'AN2gwlrf7UU',
    thumb: t_AN2gwlrf7UU,
  },
  {
    title: 'COMMUNITY EVENT & VEREINSFEST',
    desc: 'Community-Building & Event-Highlights mit packendem Social-Media-Schnitt für ländliche Veranstaltungen.',
    kpi: 'Gemeinschaftsfest im Ort lebendig und nahbar dokumentiert',
    company: 'Ehrenamt & Events',
    badge: 'Event',
    videoId: 'KDPfzfbX2KY',
    thumb: t_KDPfzfbX2KY,
  },
  {
    title: 'ACHTSAMKEIT & GESUNDHEITSSPORT',
    desc: 'Ästhetische Outdoor-Aufnahmen mit Fokus auf Entspannung, Vitalität und Gesundheit im Verein.',
    kpi: 'Präventionssport im Grünen erlebbar & attraktiv in Szene gesetzt',
    company: 'Gesundheit & Prävention',
    badge: 'Prävention',
    videoId: 'h367fM_YFbQ',
    thumb: t_h367fM_YFbQ,
  },
  {
    title: 'KULTUR & REGIONALE IDENTITÄT',
    desc: 'Emotionales & ansprechendes Storytelling zur Stärkung der ländlichen Vereinskultur.',
    kpi: 'Tradition, Kultur und Heimatgefühl für alle Generationen eingefangen',
    company: 'Kultur & Tradition',
    badge: 'Kultur',
    videoId: '3sVGHKCd2pM',
    thumb: t_3sVGHKCd2pM,
  },
  {
    title: 'COMMUNITY AFTER WORK & NETZWERK',
    desc: 'Event-Begleitung & Begegnungsmomente für lokale Initiativen und Treffpunkte.',
    kpi: 'Lokale Begegnungsstätte als lebendiger Treffpunkt sichtbar gemacht',
    company: 'Begegnungszentrum',
    badge: 'Community',
    videoId: 'IiEUmU2I0ZE',
    thumb: t_IiEUmU2I0ZE,
  },
  {
    title: 'JUBILÄUM & FESTLICHE HIGHLIGHTS',
    desc: 'Feierliches Vereinsjubiläum & ehrenamtliche Helfer dynamisch dokumentiert.',
    kpi: 'Jahrzehntelange Vereinsgeschichte mit Stolz und Herz gewürdigt',
    company: 'Regionalzentrum',
    badge: 'Jubiläum',
    videoId: 'UEQg-nbto7o',
    thumb: t_UEQg_nbto7o,
  },
  {
    title: 'GEMEINWESEN & KOMMUNALER DIALOG',
    desc: 'Modernes Gemeinschaftserlebnis und bürgerschaftlicher Zusammenhalt vor Ort.',
    kpi: 'Bürgerschaftliches Engagement und Dialog auf Augenhöhe transportiert',
    company: 'Kommunalverband',
    badge: 'Kommunal',
    videoId: 'PaBuvUkvseE',
    thumb: t_PaBuvUkvseE,
  },
  {
    title: 'VEREINSGASTRONOMIE & BEGEGNUNG',
    desc: 'Einladende Kulinarik- und Geselligkeitsmomente im Vereinsheim in Szene gesetzt.',
    kpi: 'Gemütlichkeit & Geselligkeit im Vereinsheim greifbar gemacht',
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
    kpi: 'Soziales Engagement und Berufung mit Herz authentisch porträtiert',
    company: 'Berufskolleg Bleibergquelle',
    duration: '03:45 Min',
    videoId: 'HZQn5xHfyOM',
    thumb: thumbHZQ,
  },
  {
    title: 'VEREINSPORTRAIT & BILDUNGSINITIATIVE',
    desc: 'Authentischer Einblick in Bildung, Gemeinschaft und modernen Campus-Alltag zur nachhaltigen Schüler- & Ehrenamtsförderung.',
    kpi: 'Gemeinschaft, Campusleben & Bildungschancen nahbar vermittelt',
    company: 'Berufskolleg Bleibergquelle',
    duration: '04:12 Min',
    videoId: '1srCmXos4lk',
    thumb: thumb1sr,
  },
];

export const webProjects: WebProject[] = [
  {
    title: 'PI JUGENDHILFE · MODERNE WEBSITE & BÜRGERPORTAL',
    desc: 'Ambulante Hilfen zur Erziehung im regionalen Raum. Psychologisch fundiert, strukturiert und vertrauensvoll digital dargestellt.',
    kpi: 'Niedrigschwelliger, vertrauensvoller Erstkontakt für Familien & Ämter geschaffen',
    company: 'Praxis für interdisziplinäre Jugendhilfe',
    url: 'https://www.pi-jugendhilfe.com/',
    displayUrl: 'www.pi-jugendhilfe.com',
    badge: 'Webseite & Bürgernähe',
    previewImage: piJugendhilfeImg,
    allowsIframe: true,
  },
];

export const testimonials: Testimonial[] = [
  {
    quoteShort: '„Smith Visuals hat einen ganzen Drehtag von acht Stunden bei uns übernommen und in dieser Zeit acht Imagefilme professionell umgesetzt. Von der ersten Minute an war de...',
    quoteFull: '„Smith Visuals hat einen ganzen Drehtag von acht Stunden bei uns übernommen und in dieser Zeit acht Imagefilme professionell umgesetzt. Von der ersten Minute an war der Ablauf perfekt strukturiert, zielgerichtet und hochprofessionell. Das Team hat unsere Arbeit und Werte mit höchster Sorgfalt und Empathie in Szene gesetzt.“',
    name: 'Berufskolleg Bleibergquelle',
    organization: 'Berufskolleg Bleibergquelle',
    logo: bleibergLogo,
    rating: 5,
  },
];
