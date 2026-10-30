import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  Sparkles,
  MapPin,
  Calendar,
  Download,
  ArrowUpRight,
  CheckCircle2,
  Phone,
  Clock,
  Layers,
  ChevronRight,
  ChevronLeft,
  X,
  Building,
  Menu,
  MessageCircle,
  Landmark,
  Check,
  Send,
  Eye,
  Key,
  Sun,
  Moon,
  Play,
  Pause,
  Maximize2,
  ArrowRight,
  Compass,
  Award,
} from 'lucide-react';
import {
  CURRENCIES,
  CurrencyCode,
  TYPOLOGIES,
  Typology,
  RoomSpec,
  PROJECT_INFO,
} from './data/inaraData';
import { formatPrice } from './utils/formatCurrency';
import { ArchitecturalFloorplanSVG } from './components/ArchitecturalFloorplanSVG';
import { BrochureModal } from './components/BrochureModal';
import { StrategyAdvisorModal } from './components/StrategyAdvisorModal';

// Clean Hero Cover Scenes (100% free of printed text, watermarks, or typography)
interface HeroCoverScene {
  id: string;
  title: string;
  period: string;
  src: string;
  type: 'image' | 'video';
  badge: string;
  description: string;
}

const HERO_COVER_SCENES: HeroCoverScene[] = [
  {
    id: 'fachada-dourada',
    title: 'Fachada Principal ao Pôr-do-Sol',
    period: 'Fachada & Alameda',
    src: '/media/showcase/inara-fachada-dourada.jpg',
    type: 'image',
    badge: '30 Moradias Duplex',
    description: 'Arquitetura moderna com volumetria elegante, caixilharia ampla e acabamentos contemporâneos.',
  },
  {
    id: 'piscinas-privadas',
    title: 'Piscinas Privativas & Jardim Posterior',
    period: 'Piscinas Privadas',
    src: '/media/cover/inara-pools-twilight.jpg',
    type: 'image',
    badge: 'Lazer Individual',
    description: 'Cada uma das 30 moradias possui a sua piscina privativa, deck solarium e área gourmet no jardim.',
  },
  {
    id: 'clube-lazer',
    title: 'Clube Privativo no Lote 31',
    period: 'Clube & Solarium',
    src: '/media/showcase/inara-clube-piscina.jpg',
    type: 'image',
    badge: '767 m² de Lazer',
    description: 'Piscina de borda infinita, espaço lounge, quadras polidesportivas e portaria com segurança 24h.',
  },
  {
    id: 'video-tour-3d',
    title: 'Tour Arquitetônico 3D da Moradia',
    period: 'Vídeo 3D Walkthrough',
    src: '/media/videos/house-layout-reveal-loop.mp4',
    type: 'video',
    badge: 'Animação 3D HD',
    description: 'Passeio virtual 3D revelando a planta técnica, distribuição dos 2 pisos e integração espacial.',
  },
];

// Official Campaign Graphic Assets (The 5 Key Flyers + Official Collateral)
interface CampaignAsset {
  id: string;
  title: string;
  subtitle: string;
  src: string;
  categoryLabel: string;
  badge: string;
  aspect: string;
}

const CAMPAIGN_ASSETS: CampaignAsset[] = [
  {
    id: 'localizacao-talatona',
    title: 'Morar Bem Também É Estar Bem Localizado',
    subtitle: 'Talatona: Via A4A (Estrada do Rio Cambambe). Próximo de escolas internacionais, Belas Shopping e vias rápidas.',
    src: '/media/campaign/Post Inara 01.png',
    categoryLabel: 'Pilar 01 • Localização',
    badge: 'Talatona Nobre',
    aspect: 'aspect-[4/5]',
  },
  {
    id: 'familia-conforto',
    title: 'Viver Bem Não É Sorte, É Uma Escolha',
    subtitle: 'Ambiente familiar e exclusivo. 30 moradias T4 Duplex com 4 suítes, acabamentos de luxo e piscina privativa.',
    src: '/media/campaign/Post Inara 02.png',
    categoryLabel: 'Pilar 02 • Família & Lazer',
    badge: 'Sonho Realizado',
    aspect: 'aspect-[4/5]',
  },
  {
    id: 'standard-bank',
    title: 'Sabia Que...? Financiamento Standard Bank Angola',
    subtitle: 'Financiamento imobiliário facilitado pelo Standard Bank Angola, até 80% do valor e até 25 anos de amortização.',
    src: '/media/campaign/Post Inara 03.png',
    categoryLabel: 'Pilar 03 • Parceria Bancária',
    badge: 'Crédito à Habitação',
    aspect: 'aspect-square',
  },
  {
    id: 'hero-drone',
    title: 'O Que Está a Nascer Aqui Vai Surpreender-te',
    subtitle: 'Grande vista aérea do canteiro de obras de 10.000 m² do Residencial Inara em Talatona, Luanda.',
    src: '/media/campaign/Inara Residencial.png',
    categoryLabel: 'Pilar 04 • A Obra Real',
    badge: 'Capa Oficial',
    aspect: 'aspect-[3/4]',
  },
  {
    id: 'chaves-futuro',
    title: 'Sua Nova Vida Começa Aqui!',
    subtitle: 'Dê o primeiro passo para garantir a sua moradia de prestígio. Agende já a sua visita ao stand de vendas.',
    src: '/media/campaign/Post Inara 04.png',
    categoryLabel: 'Pilar 05 • Visita ao Stand',
    badge: 'Chave na Mão',
    aspect: 'aspect-[4/5]',
  },
  {
    id: 'capa-estilo',
    title: 'Mais do que uma Casa, um Novo Estilo de Vida',
    subtitle: '30 moradias unifamiliares T4 Duplex na Via A4A em Talatona, com clube de lazer e condomínio fechado.',
    src: '/media/campaign/Capa Hinara 01.png',
    categoryLabel: 'Estilo de Vida',
    badge: '30 Moradias T4',
    aspect: 'aspect-[3/4]',
  },
  {
    id: 'obra-etapas',
    title: 'Evolução das Obras em 4 Etapas',
    subtitle: 'Painel oficial de acompanhamento das fundações, alvenarias e estruturas das 30 moradias.',
    src: '/media/campaign/Inara Residencial 01.png',
    categoryLabel: 'Evolução da Obra',
    badge: 'Status Construtivo',
    aspect: 'aspect-square',
  },
  {
    id: 'sonho-realidade',
    title: 'Transforme o Sonho da Casa Própria em Realidade',
    subtitle: 'Construa um futuro de conforto, estabilidade e valorização patrimonial no coração de Talatona.',
    src: '/media/campaign/Post Inara 05.png',
    categoryLabel: 'Conquista Definitiva',
    badge: 'Realização',
    aspect: 'aspect-square',
  },
];

// Official Phone Contacts
const OFFICIAL_PHONES = [
  { display: '+244 931 943 828', clean: '244931943828' },
  { display: '+244 923 436 077', clean: '244923436077' },
  { display: '+244 931 893 859', clean: '244931893859' },
];

export default function App() {
  const [currency, setCurrency] = useState<CurrencyCode>('AOA');
  const [customCity, setCustomCity] = useState<string>('Talatona • Luanda');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Clean Hero Cover Scene Selector
  const [activeCoverIdx, setActiveCoverIdx] = useState(0);

  // Lightbox State for campaign artwork
  const [lightboxAsset, setLightboxAsset] = useState<CampaignAsset | null>(null);

  // Modals
  const [isBrochureOpen, setIsBrochureOpen] = useState(false);
  const [isStrategyOpen, setIsStrategyOpen] = useState(false);

  // Architectural Floorplan Selector
  const [activeTypology, setActiveTypology] = useState<Typology>(TYPOLOGIES[0]);
  const [activeRoom, setActiveRoom] = useState<RoomSpec>(TYPOLOGIES[0].rooms[0]);

  // Standard Bank Financing Calculator State
  const [downPaymentPct, setDownPaymentPct] = useState<number>(20);
  const [mortgageYears, setMortgageYears] = useState<number>(20);

  // Lead Visit Form State
  const [formName, setFormName] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formDate, setFormDate] = useState('');
  const [formMessage, setFormMessage] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -90;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  // Financing math
  const basePriceEUR = activeTypology.basePriceEUR;
  const downPaymentAmountEUR = Math.round((basePriceEUR * downPaymentPct) / 100);
  const loanAmountEUR = basePriceEUR - downPaymentAmountEUR;
  const monthlyInterestRate = 0.05 / 12;
  const totalMonths = mortgageYears * 12;
  const monthlyPaymentEUR =
    loanAmountEUR > 0
      ? Math.round(
          (loanAmountEUR *
            (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, totalMonths))) /
            (Math.pow(1 + monthlyInterestRate, totalMonths) - 1)
        )
      : 0;

  return (
    <div className="min-h-screen bg-white text-[#0F172A] antialiased selection:bg-[#0052CC]/20 selection:text-[#0052CC] font-sans">
      {/* =====================================================================
          TOP BAR (Finest Investment Partners & Direct Official Contacts)
      ===================================================================== */}
      <div className="bg-gradient-to-r from-[#0052CC] via-[#0066FF] to-[#3B0764] text-white px-4 py-2.5 text-xs">
        <div className="max-w-[1380px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-2.5">
          <div className="flex items-center gap-3 font-medium">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-sm text-[11px] font-bold tracking-wide">
              <Sparkles className="w-3 h-3 text-[#00D2FF]" />
              LANÇAMENTO OFICIAL
            </span>
            <span className="hidden md:inline text-white/95">
              30 Moradias T4 Duplex de Alto Padrão em Talatona • Financiamento <strong>Standard Bank Angola</strong>
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11.5px]">
            <div className="flex items-center gap-2 text-white/95">
              <Phone className="w-3.5 h-3.5 text-[#00D2FF]" />
              <span className="font-mono-spec font-medium hidden sm:inline">Vendas:</span>
              <a
                href={`tel:${OFFICIAL_PHONES[0].clean}`}
                className="font-mono-spec font-bold hover:text-[#00D2FF] transition-colors"
              >
                {OFFICIAL_PHONES[0].display}
              </a>
            </div>

            <div className="h-3 w-px bg-white/25 hidden sm:block" />

            <div className="flex items-center gap-1 bg-black/25 px-2 py-0.5 rounded-md border border-white/15">
              {(['AOA', 'EUR', 'BRL'] as CurrencyCode[]).map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCurrency(c)}
                  className={`px-1.5 py-0.5 rounded text-[10px] font-mono-spec transition-colors cursor-pointer ${
                    currency === c ? 'bg-white text-[#0052CC] font-bold' : 'text-white/70 hover:text-white'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================================
          MAIN HEADER & NAVIGATION (Dual Brand Identity & Clean Montserrat Font)
      ===================================================================== */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm transition-all">
        <div className="max-w-[1380px] mx-auto px-4 sm:px-8 h-20 sm:h-24 flex items-center justify-between">
          {/* Dual Brand: Inara Residencial Talatona + Finest Investment Partners */}
          <div className="flex items-center gap-4 sm:gap-6">
            {/* Inara Brand Logo with Official Logomarca */}
            <button
              type="button"
              onClick={() => scrollToSection('hero')}
              className="flex items-center gap-3.5 group text-left cursor-pointer"
            >
              {/* Official Inara Globe Emblem from WhatsApp Image 2026-09-22 at 09.19.11 */}
              <img
                src="/media/logo/inara-emblem-blue.png"
                alt="Logomarca Inara Residencial Talatona"
                className="w-11 h-11 sm:w-13 sm:h-13 object-contain group-hover:scale-105 transition-transform shrink-0"
              />

              <div>
                <span className="block text-2xl sm:text-3xl font-black tracking-tight text-slate-900 leading-none">
                  INARA
                </span>
                <span className="block text-[10px] sm:text-[11px] font-extrabold uppercase tracking-[0.25em] text-[#0052CC] mt-1">
                  RESIDÊNCIAL · TALATONA
                </span>
              </div>
            </button>

            <div className="hidden lg:block h-10 w-px bg-slate-200" />

            {/* Finest Investment Partners Official Sub-Brand */}
            <div className="hidden lg:flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#581C87] via-[#0052CC] to-[#00D2FF] p-0.5 flex items-center justify-center shadow-xs">
                <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
                  <span className="text-[#0052CC] font-black text-xs leading-none">F</span>
                </div>
              </div>
              <div>
                <span className="block text-[11px] font-extrabold text-slate-900 tracking-wider uppercase leading-tight">
                  FINEST
                </span>
                <span className="block text-[8px] font-semibold text-slate-500 uppercase tracking-widest leading-none">
                  INVESTMENT PARTNERS
                </span>
              </div>
            </div>
          </div>

          {/* Desktop Nav Links (Clean Montserrat Typography) */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 font-bold text-xs uppercase tracking-wider text-slate-700">
            <button
              onClick={() => scrollToSection('hero')}
              className="hover:text-[#0052CC] transition-colors cursor-pointer py-1"
            >
              Início
            </button>
            <button
              onClick={() => scrollToSection('obra')}
              className="hover:text-[#0052CC] transition-colors cursor-pointer flex items-center gap-1.5 py-1"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>A Obra Real</span>
            </button>
            <button
              onClick={() => scrollToSection('plantas')}
              className="hover:text-[#0052CC] transition-colors cursor-pointer py-1"
            >
              Moradias T4
            </button>
            <button
              onClick={() => scrollToSection('financiamento')}
              className="hover:text-[#0052CC] transition-colors cursor-pointer text-[#0052CC] py-1 font-extrabold flex items-center gap-1.5"
            >
              <Landmark className="w-3.5 h-3.5" />
              <span>Standard Bank</span>
            </button>
            <button
              onClick={() => scrollToSection('localizacao')}
              className="hover:text-[#0052CC] transition-colors cursor-pointer py-1"
            >
              Localização
            </button>
            <button
              onClick={() => scrollToSection('campanha')}
              className="hover:text-[#0052CC] transition-colors cursor-pointer py-1"
            >
              A Campanha
            </button>
          </nav>

          {/* Header Action Button (Official Campaign Style) */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsBrochureOpen(true)}
              className="px-4 py-2.5 rounded-full border border-slate-300 hover:border-[#0052CC] text-slate-700 hover:text-[#0052CC] text-xs font-bold tracking-wide transition-all cursor-pointer flex items-center gap-2"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Brochura PDF</span>
            </button>

            <button
              type="button"
              onClick={() => scrollToSection('agendar')}
              className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#581C87] to-[#0052CC] hover:from-[#4C1D95] hover:to-[#004085] text-white text-xs font-bold tracking-wide transition-all shadow-md shadow-blue-500/20 hover:shadow-lg cursor-pointer flex items-center gap-2"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Agendar Visita</span>
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 rounded-xl border border-slate-200 text-slate-800"
            aria-label="Abrir menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-slate-200 px-6 py-6 space-y-4">
            <div className="flex flex-col gap-3 font-bold text-sm uppercase tracking-wider text-slate-800">
              <button
                onClick={() => scrollToSection('hero')}
                className="text-left py-2 hover:text-[#0052CC]"
              >
                Início
              </button>
              <button
                onClick={() => scrollToSection('obra')}
                className="text-left py-2 hover:text-[#0052CC] flex items-center gap-2"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>A Obra Real</span>
              </button>
              <button
                onClick={() => scrollToSection('plantas')}
                className="text-left py-2 hover:text-[#0052CC]"
              >
                Moradias T4 Duplex
              </button>
              <button
                onClick={() => scrollToSection('financiamento')}
                className="text-left py-2 text-[#0052CC]"
              >
                Financiamento Standard Bank
              </button>
              <button
                onClick={() => scrollToSection('localizacao')}
                className="text-left py-2 hover:text-[#0052CC]"
              >
                Localização em Talatona
              </button>
              <button
                onClick={() => scrollToSection('campanha')}
                className="text-left py-2 hover:text-[#0052CC]"
              >
                A Campanha Oficial
              </button>
            </div>

            <div className="pt-4 border-t border-slate-200 flex flex-col gap-2.5">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsBrochureOpen(true);
                }}
                className="w-full py-3 rounded-xl border border-slate-300 text-slate-800 text-xs font-bold uppercase tracking-wider text-center"
              >
                Descarregar Dossier PDF
              </button>
              <button
                onClick={() => scrollToSection('agendar')}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#581C87] to-[#0052CC] text-white text-xs font-bold uppercase tracking-wider text-center shadow"
              >
                Agende a Sua Visita ao Stand
              </button>
            </div>
          </div>
        )}
      </header>

      {/* =====================================================================
          1. HERO COVER (Clean Architectural & Lifestyle Showcase - 100% Free of Embedded Text)
      ===================================================================== */}
      <section id="hero" className="relative min-h-[88vh] lg:min-h-[94vh] flex items-center overflow-hidden bg-[#0A1A3A]">
        {/* Background Clean Media Layer (100% Text-Free Architectural Visuals) */}
        <div className="absolute inset-0 z-0">
          {HERO_COVER_SCENES.map((scene, idx) => (
            <div
              key={scene.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                idx === activeCoverIdx ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}
            >
              {scene.type === 'video' ? (
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover object-center"
                >
                  <source src={scene.src} type="video/mp4" />
                </video>
              ) : (
                <img
                  src={scene.src}
                  alt={scene.title}
                  className="w-full h-full object-cover object-center"
                />
              )}
              {/* Luminous royal blue/slate gradient: clear text readability on left; architecture visible on right */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#07132C]/95 via-[#0A1A3A]/85 to-[#07132C]/40 lg:w-3/4" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#07132C]/90 via-transparent to-transparent sm:hidden" />
            </div>
          ))}
        </div>

        {/* Hero Foreground Grid */}
        <div className="relative z-10 max-w-[1380px] w-full mx-auto px-4 sm:px-8 py-16 sm:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left 7 Cols: Punchy Campaign Headlines in Montserrat */}
            <div className="lg:col-span-7 space-y-6">
              {/* Location Pill Banner */}
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#00D2FF] text-xs font-bold tracking-wider uppercase">
                <MapPin className="w-3.5 h-3.5 text-[#00D2FF]" />
                <span>Talatona • Via A4A (Estrada do Rio Cambambe)</span>
              </div>

              {/* Main Headline (Clean Montserrat Bold Typography matching the flyers) */}
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.08] tracking-tight">
                Morar bem também é <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D2FF] via-[#38BDF8] to-[#93C5FD]">
                  estar bem localizado
                </span>
              </h1>

              {/* Official Slogan Pill from Flyer 2 & 4 */}
              <div className="inline-flex flex-wrap items-center gap-2 px-4 py-2 rounded-2xl bg-gradient-to-r from-[#0052CC] to-[#00A3FF] text-white text-xs sm:text-sm font-bold shadow-lg shadow-blue-500/20">
                <span className="tracking-wide">→ INARA Residencial Talatona</span>
                <span className="text-blue-100 font-normal">| Sua casa dos sonhos é agora uma realidade</span>
              </div>

              {/* Campaign Narrative */}
              <p className="text-base sm:text-lg text-slate-200 font-normal leading-relaxed max-w-xl">
                Mais do que uma moradia, um estilo de vida de excelência. Condomínio privado de <strong>30 moradias T4 Duplex unifamiliares de 217 m²</strong> com 4 suítes, piscina privativa individual e clube exclusivo no Lote 31.
              </p>

              {/* 3 Core Trust Pillars */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-1 text-white/95 text-xs sm:text-sm font-semibold">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#00D2FF] shrink-0" />
                  <span>30 Moradias T4 Duplex</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#00D2FF] shrink-0" />
                  <span>Terreno de 10.000 m²</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#00D2FF] shrink-0" />
                  <span>Standard Bank Angola</span>
                </div>
              </div>

              {/* High-Impact Campaign Buttons */}
              <div className="pt-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <button
                  type="button"
                  onClick={() => scrollToSection('agendar')}
                  className="inline-flex items-center justify-center gap-3 px-7 py-4 rounded-full bg-gradient-to-r from-[#581C87] to-[#0052CC] hover:from-[#4C1D95] hover:to-[#004085] text-white text-sm font-bold tracking-wide transition-all shadow-xl shadow-blue-600/30 hover:scale-[1.02] cursor-pointer"
                >
                  <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                    <Calendar className="w-3.5 h-3.5 text-white" />
                  </div>
                  <span>Agende já a sua visita e descubra o seu futuro lar</span>
                </button>

                <button
                  type="button"
                  onClick={() => scrollToSection('financiamento')}
                  className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/25 text-white text-sm font-bold transition-all cursor-pointer"
                >
                  <Landmark className="w-4 h-4 text-[#00D2FF]" />
                  <span>Financiamento Standard Bank</span>
                </button>
              </div>
            </div>

            {/* Right 5 Cols: Interactive Floating Lifestyle Vignette Card (Flyer 2 Motif) */}
            <div className="lg:col-span-5 hidden lg:block">
              <div className="rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 p-6 shadow-2xl text-white space-y-6">
                <div className="flex items-center justify-between border-b border-white/15 pb-4">
                  <div>
                    <span className="text-[11px] font-mono-spec uppercase tracking-wider text-[#00D2FF] block font-bold">
                      INARA RESIDENCIAL TALATONA
                    </span>
                    <h3 className="text-xl font-bold text-white mt-0.5">
                      Viver bem não é sorte, é uma escolha.
                    </h3>
                  </div>
                  <div className="w-9 h-9 rounded-2xl bg-white/20 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-[#00D2FF]" />
                  </div>
                </div>

                {/* The 3 Circular Preview Portals from Flyer 2 */}
                <div className="space-y-3">
                  <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
                    Espaços Exclusivos da Moradia T4:
                  </span>

                  <div className="grid grid-cols-3 gap-3 text-center">
                    {/* Circle 1: Suíte Master */}
                    <div
                      onClick={() => setActiveCoverIdx(0)}
                      className="group/item cursor-pointer flex flex-col items-center gap-2"
                    >
                      <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-white shadow-lg group-hover/item:border-[#00D2FF] group-hover/item:scale-105 transition-all">
                        <img
                          src="/media/showcase/inara-suite-master.jpg"
                          alt="Suíte Master com Varanda Privativa"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="text-[11px] font-bold text-slate-200 group-hover/item:text-[#00D2FF] transition-colors leading-tight">
                        Suíte Master
                      </span>
                    </div>

                    {/* Circle 2: Living Integrado */}
                    <div
                      onClick={() => setActiveCoverIdx(2)}
                      className="group/item cursor-pointer flex flex-col items-center gap-2"
                    >
                      <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-white shadow-lg group-hover/item:border-[#00D2FF] group-hover/item:scale-105 transition-all">
                        <img
                          src="/media/showcase/inara-living-luz.jpg"
                          alt="Sala com Luz Natural Difusa"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="text-[11px] font-bold text-slate-200 group-hover/item:text-[#00D2FF] transition-colors leading-tight">
                        Living com Luz
                      </span>
                    </div>

                    {/* Circle 3: Piscina Privada */}
                    <div
                      onClick={() => setActiveCoverIdx(1)}
                      className="group/item cursor-pointer flex flex-col items-center gap-2"
                    >
                      <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-white shadow-lg group-hover/item:border-[#00D2FF] group-hover/item:scale-105 transition-all">
                        <img
                          src="/media/cover/inara-pools-twilight.jpg"
                          alt="Piscina Privativa Individual"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="text-[11px] font-bold text-slate-200 group-hover/item:text-[#00D2FF] transition-colors leading-tight">
                        Piscina Privativa
                      </span>
                    </div>
                  </div>
                </div>

                {/* Floating Bottom Badge */}
                <div className="p-3.5 rounded-2xl bg-black/30 border border-white/10 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <Landmark className="w-4 h-4 text-[#00D2FF]" />
                    <span>Financiamento até 80%</span>
                  </div>
                  <strong className="text-[#00D2FF] font-bold">Standard Bank Angola</strong>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Clean Scene Selector (Fachada / Piscinas / Clube / Vídeo 3D) */}
        <div className="absolute bottom-6 right-6 sm:right-12 z-20 flex flex-wrap items-center gap-2 bg-slate-950/80 backdrop-blur-md p-1.5 rounded-full border border-white/20 shadow-xl">
          {HERO_COVER_SCENES.map((scene, idx) => (
            <button
              key={scene.id}
              onClick={() => setActiveCoverIdx(idx)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                idx === activeCoverIdx
                  ? 'bg-gradient-to-r from-[#00D2FF] to-[#0052CC] text-white shadow-md'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              {scene.type === 'video' ? (
                <Play className="w-3.5 h-3.5 text-cyan-300" />
              ) : idx === 0 ? (
                <Sun className="w-3.5 h-3.5 text-amber-300" />
              ) : idx === 1 ? (
                <Moon className="w-3.5 h-3.5 text-cyan-300" />
              ) : (
                <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
              )}
              <span>{scene.period}</span>
            </button>
          ))}
        </div>
      </section>

      {/* =====================================================================
          2. METRICS & HIGHLIGHTS RIBBON
      ===================================================================== */}
      <div className="bg-[#07132C] text-white border-b border-slate-800">
        <div className="max-w-[1380px] mx-auto px-4 sm:px-8 py-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="space-y-1">
            <span className="block text-3xl sm:text-4xl font-black text-[#00D2FF]">30</span>
            <span className="block text-xs uppercase tracking-widest text-slate-300 font-bold">
              Moradias Exclusivas T4
            </span>
            <span className="block text-[11px] text-slate-400">100% Suítes com Varandas</span>
          </div>

          <div className="space-y-1">
            <span className="block text-3xl sm:text-4xl font-black text-[#00D2FF]">10.000 m²</span>
            <span className="block text-xs uppercase tracking-widest text-slate-300 font-bold">
              Terreno Nobre na Via A4A
            </span>
            <span className="block text-[11px] text-slate-400">31 Lotes Urbanizados em Talatona</span>
          </div>

          <div className="space-y-1">
            <span className="block text-3xl sm:text-4xl font-black text-[#00D2FF]">Lote 31</span>
            <span className="block text-xs uppercase tracking-widest text-slate-300 font-bold">
              Clube Social & Lazer
            </span>
            <span className="block text-[11px] text-slate-400">767 m² de Equipamentos Privativos</span>
          </div>

          <div className="space-y-1">
            <span className="block text-3xl sm:text-4xl font-black text-[#00D2FF]">Standard Bank</span>
            <span className="block text-xs uppercase tracking-widest text-slate-300 font-bold">
              Parceiro Oficial
            </span>
            <span className="block text-[11px] text-slate-400">Crédito à Habitação Facilitado</span>
          </div>
        </div>
      </div>

      {/* =====================================================================
          3. PILAR 04 & OBRA REAL ("O QUE ESTÁ A NASCER AQUI VAI SURPREENDER-TE")
      ===================================================================== */}
      <section id="obra" className="py-20 sm:py-28 bg-slate-50 border-y border-slate-200">
        <div className="max-w-[1380px] mx-auto px-4 sm:px-8 space-y-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left 6 Cols: Real Construction Multi-Stage Panel */}
            <div className="lg:col-span-6 space-y-4">
              <div className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-2xl bg-slate-900 group">
                <img
                  src="/media/campaign/Inara Residencial 01.png"
                  alt="Status da Construção das 30 Moradias Inara Talatona"
                  className="w-full h-auto object-cover group-hover:scale-102 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 px-4 py-1.5 rounded-full bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider shadow">
                  ● OBRAS EM RITMO ACELERADO
                </div>
              </div>
            </div>

            {/* Right 6 Cols: Engineering Transparency & Construction Stages */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-100 text-[#0052CC] text-xs font-bold uppercase tracking-widest">
                <Building className="w-3.5 h-3.5" />
                <span>PILAR 04 • ENGENHARIA & TRANSPARÊNCIA</span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-black text-[#0F172A] tracking-tight leading-tight">
                O Que Está a Nascer Aqui <br />
                <span className="text-[#0052CC]">Vai Surpreender-te</span>
              </h2>

              <p className="text-slate-600 text-base leading-relaxed">
                No <strong>Residencial Inara</strong>, cada cliente acompanha a evolução real da sua futura moradia. As obras estão em pleno andamento na Via A4A em Talatona, com alvenarias estruturais e fundações rigorosamente executadas pela equipa da <strong>Finest Investment Partners</strong>.
              </p>

              {/* Construction Stages Checklist */}
              <div className="space-y-3.5 pt-2">
                <div className="p-4 rounded-2xl bg-white border border-slate-200 flex items-start gap-3.5 shadow-sm">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 font-bold" />
                  </div>
                  <div>
                    <strong className="text-sm text-slate-900 block font-bold">Etapa 01: Terraplanagem & Infraestruturas Viárias</strong>
                    <p className="text-xs text-slate-500 mt-0.5">Ruas internas, rede de água, saneamento e valas técnicas de eletricidade e fibra ótica.</p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200 flex items-start gap-3.5 shadow-sm">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 font-bold" />
                  </div>
                  <div>
                    <strong className="text-sm text-slate-900 block font-bold">Etapa 02: Fundações & Lajes de Betão Armado</strong>
                    <p className="text-xs text-slate-500 mt-0.5">Estrutura antissísmica, vigas de reforço e contenções de alto padrão de engenharia.</p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-blue-200 bg-blue-50/50 flex items-start gap-3.5 shadow-sm">
                  <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0 mt-0.5">
                    <Clock className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <strong className="text-sm text-[#0052CC] block font-bold">Etapa 03: Alvenarias dos 2 Pisos & Coberturas (Em Curso)</strong>
                    <p className="text-xs text-slate-600 mt-0.5">Paredes duplas com isolamento termoacústico e divisão interna dos 4 quartos em suíte.</p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200 flex items-start gap-3.5 shadow-sm opacity-80">
                  <div className="w-6 h-6 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Key className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <strong className="text-sm text-slate-900 block font-bold">Etapa 04: Acabamentos Nobres & Entrega das Chaves</strong>
                    <p className="text-xs text-slate-500 mt-0.5">Revestimentos, caixilharia, louças sanitárias, pintura e ligação ao clube privativo.</p>
                  </div>
                </div>
              </div>

              {/* CTA to Visit Construction Site */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => scrollToSection('agendar')}
                  className="px-6 py-3.5 rounded-full bg-[#0052CC] hover:bg-[#004085] text-white font-bold text-xs uppercase tracking-wider transition-colors shadow cursor-pointer inline-flex items-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Visitar o Canteiro de Obras em Talatona</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          4. PILAR 03 — PARCERIA STANDARD BANK ANGOLA ("SABIA QUE...?")
      ===================================================================== */}
      <section id="financiamento" className="py-20 sm:py-28 px-4 sm:px-8 max-w-[1380px] mx-auto">
        <div className="rounded-3xl bg-gradient-to-br from-[#0052CC] via-[#0066FF] to-[#3B0764] text-white p-8 sm:p-14 lg:p-16 shadow-2xl overflow-hidden relative">
          <div className="absolute inset-0 blueprint-grid-dark opacity-20 pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left 5 Cols: Campaign Artwork Card */}
            <div className="lg:col-span-5 flex justify-center">
              <div
                onClick={() =>
                  setLightboxAsset(
                    CAMPAIGN_ASSETS.find((a) => a.id === 'standard-bank') || null
                  )
                }
                className="cursor-pointer group relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20 max-w-sm"
              >
                <img
                  src="/media/campaign/Post Inara 03.png"
                  alt="Sabia que...? Financiamento Standard Bank Angola"
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute bottom-3 left-3 right-3 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full text-center text-xs font-semibold text-white/90">
                  Clique para ampliar o comunicado oficial
                </div>
              </div>
            </div>

            {/* Right 7 Cols: Financing Benefits & Calculator */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white/20 backdrop-blur-md text-[#00D2FF] text-xs font-bold uppercase tracking-widest">
                <Landmark className="w-4 h-4" />
                <span>PILAR 03 • PARCERIA FINANCEIRA ESTRATÉGICA</span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
                Sabia Que...? <br />
                <span className="text-[#00D2FF]">Pode Financiar pelo Standard Bank Angola</span>
              </h2>

              <p className="text-slate-100 text-base sm:text-lg leading-relaxed">
                O <strong>INARA Residencial Talatona</strong> oferece aos seus clientes a possibilidade de <strong>financiamento bancário através do Standard Bank Angola</strong>, facilitando o caminho para a realização do sonho da casa própria com suporte e agilidade.
              </p>

              {/* 3 Bank Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-2">
                <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
                  <span className="text-xs uppercase tracking-wider text-[#00D2FF] font-bold block mb-1">
                    Até 80% Financiado
                  </span>
                  <p className="text-xs text-slate-200">
                    Pague apenas a entrada de 20% e parcele o restante pelo banco.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
                  <span className="text-xs uppercase tracking-wider text-[#00D2FF] font-bold block mb-1">
                    Até 25 Anos de Prazo
                  </span>
                  <p className="text-xs text-slate-200">
                    Prestações calculadas de forma suave para planejar o futuro da família.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
                  <span className="text-xs uppercase tracking-wider text-[#00D2FF] font-bold block mb-1">
                    Apoio Documental
                  </span>
                  <p className="text-xs text-slate-200">
                    A equipa da Finest Investment Partners apoia na instrução do dossiê.
                  </p>
                </div>
              </div>

              {/* Quick Interactive Mortgage Calculator */}
              <div className="p-6 rounded-2xl bg-black/40 border border-white/20 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/15 pb-3">
                  <span className="text-xs uppercase tracking-wider text-[#00D2FF] font-bold">
                    Simulação Rápida • Moradia T4 Duplex ({formatPrice(basePriceEUR, currency)})
                  </span>
                  <span className="text-xs text-slate-300">
                    Entrada: {downPaymentPct}% • {mortgageYears} Anos
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-slate-300 mb-1">
                      Sinal de Entrada ({downPaymentPct}%):
                    </label>
                    <input
                      type="range"
                      min={15}
                      max={50}
                      step={5}
                      value={downPaymentPct}
                      onChange={(e) => setDownPaymentPct(Number(e.target.value))}
                      className="w-full accent-[#00D2FF] cursor-pointer"
                    />
                    <strong className="text-sm font-mono-spec text-white block mt-1">
                      {formatPrice(downPaymentAmountEUR, currency)}
                    </strong>
                  </div>

                  <div>
                    <label className="block text-xs text-slate-300 mb-1">
                      Prazo do Crédito ({mortgageYears} Anos):
                    </label>
                    <input
                      type="range"
                      min={5}
                      max={25}
                      step={5}
                      value={mortgageYears}
                      onChange={(e) => setMortgageYears(Number(e.target.value))}
                      className="w-full accent-[#00D2FF] cursor-pointer"
                    />
                    <strong className="text-sm font-mono-spec text-[#00D2FF] block mt-1">
                      Estimativa: ~{formatPrice(monthlyPaymentEUR, currency)} / mês
                    </strong>
                  </div>
                </div>

                <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
                  <span className="text-[11px] text-slate-300 italic">
                    * Simulação indicativa sujeita a aprovação pelo Standard Bank Angola.
                  </span>
                  <button
                    type="button"
                    onClick={() => scrollToSection('agendar')}
                    className="px-5 py-2.5 rounded-full bg-white text-[#0052CC] hover:bg-slate-100 font-bold text-xs uppercase tracking-wider transition-colors shadow cursor-pointer"
                  >
                    Pedir Simulação Oficial ao Stand
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          5. PILAR 02 — MORADIAS T4 DUPLEX & PLANTA TÉCNICA INTERATIVA
      ===================================================================== */}
      <section id="plantas" className="py-20 sm:py-28 px-4 sm:px-8 max-w-[1380px] mx-auto space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-200">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 text-[#0052CC] text-xs font-bold uppercase tracking-widest">
              <Layers className="w-3.5 h-3.5" />
              <span>PILAR 02 • ARQUITETURA & PLANTAS TÉCNICAS</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-[#0F172A] tracking-tight">
              30 Moradias T4 Duplex de 217 m²
            </h2>
            <p className="text-slate-600 text-sm sm:text-base max-w-2xl leading-relaxed">
              Explore a prancha técnica interativa de arquitetura. Clique em cada divisão da planta para inspecionar áreas úteis, dimensões e orientação solar.
            </p>
          </div>

          {/* Typology Switcher */}
          <div className="bg-slate-100 p-1.5 rounded-2xl flex gap-1.5 border border-slate-200">
            {TYPOLOGIES.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => {
                  setActiveTypology(t);
                  setActiveRoom(t.rooms[0]);
                }}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  activeTypology.id === t.id
                    ? 'bg-[#0052CC] text-white shadow-md'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {t.name}
              </button>
            ))}
          </div>
        </div>

        {/* Technical Blueprint Floorplan Viewer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8">
            <ArchitecturalFloorplanSVG
              typology={activeTypology}
              activeRoom={activeRoom}
              onSelectRoom={setActiveRoom}
            />
          </div>

          {/* Right 4 Cols: Typology Features & Official Specs */}
          <div className="lg:col-span-4 space-y-6">
            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 space-y-4 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase font-bold tracking-widest text-[#0052CC]">
                  ESPECIFICAÇÕES DA MORADIA
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold">
                  {activeTypology.availableUnits} Disponíveis
                </span>
              </div>

              <h3 className="text-2xl font-bold text-slate-900">
                {activeTypology.name} ({activeTypology.totalArea} m²)
              </h3>

              <div className="divide-y divide-slate-200 text-xs sm:text-sm">
                <div className="py-2.5 flex items-center justify-between">
                  <span className="text-slate-500">Área Bruta de Construção:</span>
                  <strong className="text-slate-900 font-mono-spec">217 m²</strong>
                </div>
                <div className="py-2.5 flex items-center justify-between">
                  <span className="text-slate-500">Quartos / Suítes:</span>
                  <strong className="text-slate-900 font-bold">4 Quartos (100% Suítes)</strong>
                </div>
                <div className="py-2.5 flex items-center justify-between">
                  <span className="text-slate-500">Varandas Privativas:</span>
                  <strong className="text-slate-900">Em todas as suítes</strong>
                </div>
                <div className="py-2.5 flex items-center justify-between">
                  <span className="text-slate-500">Piscina Privativa:</span>
                  <strong className="text-slate-900 text-[#0052CC] font-bold">Incluída no Jardim</strong>
                </div>
                <div className="py-2.5 flex items-center justify-between">
                  <span className="text-slate-500">Churrasqueira & Lazer:</span>
                  <strong className="text-slate-900">Espaço Gourmet Integrado</strong>
                </div>
                <div className="py-2.5 flex items-center justify-between">
                  <span className="text-slate-500">Vagas de Garagem:</span>
                  <strong className="text-slate-900">2 Vagas Privativas</strong>
                </div>
                <div className="py-2.5 flex items-center justify-between">
                  <span className="text-slate-500">Valor de Tabela:</span>
                  <strong className="text-base text-[#0052CC] font-black font-mono-spec">
                    {formatPrice(activeTypology.basePriceEUR, currency)}
                  </strong>
                </div>
              </div>

              <button
                type="button"
                onClick={() => scrollToSection('agendar')}
                className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#581C87] to-[#0052CC] text-white font-bold text-xs uppercase tracking-wider transition-all shadow hover:shadow-lg cursor-pointer text-center block"
              >
                Bloquear Reserva desta Moradia
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          6. PILAR 01 — LOCALIZAÇÃO PRIVILEGIADA EM TALATONA ("MORAR BEM TAMBÉM É ESTAR BEM LOCALIZADO")
      ===================================================================== */}
      <section id="localizacao" className="py-20 sm:py-28 bg-slate-50 border-y border-slate-200">
        <div className="max-w-[1380px] mx-auto px-4 sm:px-8 space-y-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left 6 Cols: Narrative & Distances */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-100 text-[#0052CC] text-xs font-bold uppercase tracking-widest">
                <MapPin className="w-3.5 h-3.5" />
                <span>PILAR 01 • LOCALIZAÇÃO PRIVILEGIADA EM TALATONA</span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-black text-[#0F172A] tracking-tight leading-tight">
                Morar Bem Também É <br />
                <span className="text-[#0052CC]">Estar Bem Localizado</span>
              </h2>

              <p className="text-slate-600 text-base leading-relaxed">
                Implantado num terreno nobre de <strong>10.000 m²</strong> na <strong>Via A4A (Estrada do Rio Cambambe)</strong>, o Residencial Inara coloca a sua família no coração pulsante e valorizado de Talatona, com acesso fácil a tudo o que precisa.
              </p>

              {/* Distances Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm">
                  <span className="text-xs font-bold text-[#0052CC] uppercase tracking-wider block">
                    Escolas Internacionais
                  </span>
                  <p className="text-xs text-slate-500 mt-1">
                    Escola Portuguesa de Luanda e Colégio Internacional a poucos minutos.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm">
                  <span className="text-xs font-bold text-[#0052CC] uppercase tracking-wider block">
                    Shopping & Conveniência
                  </span>
                  <p className="text-xs text-slate-500 mt-1">
                    Belas Shopping, supermercados gourmet e restaurantes de referência.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm">
                  <span className="text-xs font-bold text-[#0052CC] uppercase tracking-wider block">
                    Centros Empresariais & Bancos
                  </span>
                  <p className="text-xs text-slate-500 mt-1">
                    Bancos, embaixadas, SIAC e edifícios corporativos de Talatona.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm">
                  <span className="text-xs font-bold text-[#0052CC] uppercase tracking-wider block">
                    Saúde & Clínicas
                  </span>
                  <p className="text-xs text-slate-500 mt-1">
                    Hospitais de referência, clínicas privadas e farmácias 24 horas.
                  </p>
                </div>
              </div>
            </div>

            {/* Right 6 Cols: Official Location Graphic Asset */}
            <div className="lg:col-span-6 flex justify-center">
              <div
                onClick={() =>
                  setLightboxAsset(
                    CAMPAIGN_ASSETS.find((a) => a.id === 'localizacao-talatona') || null
                  )
                }
                className="cursor-pointer group relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white max-w-md"
              >
                <img
                  src="/media/campaign/Post Inara 01.png"
                  alt="Morar bem também é estar bem localizado em Talatona"
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute bottom-4 left-4 right-4 bg-slate-950/80 backdrop-blur-md px-4 py-2 rounded-full text-center text-xs font-semibold text-white">
                  Clique para ampliar o flyer oficial
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          7. A CAMPANHA OFICIAL — GALERIA DAS PEÇAS GRÁFICAS
      ===================================================================== */}
      <section id="campanha" className="py-20 sm:py-28 px-4 sm:px-8 max-w-[1380px] mx-auto">
        <div className="space-y-12">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-200">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#0052CC] font-bold text-xs uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5" />
                <span>IDENTIDADE & PEÇAS OFICIAIS</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-black text-[#0F172A] tracking-tight">
                Peças da Campanha Residencial Inara
              </h2>
              <p className="text-slate-600 text-sm sm:text-base max-w-2xl leading-relaxed">
                Todas as peças oficiais criadas para a divulgação do empreendimento. Clique para ampliar em alta resolução com a arte completa.
              </p>
            </div>

            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              8 Peças Oficiais Disponíveis
            </span>
          </div>

          {/* Campaign Pieces Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {CAMPAIGN_ASSETS.map((asset) => (
              <div
                key={asset.id}
                onClick={() => setLightboxAsset(asset)}
                className="group cursor-pointer rounded-3xl overflow-hidden border border-slate-200 bg-white hover:border-[#0052CC] transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 flex flex-col"
              >
                <div className={`relative ${asset.aspect} overflow-hidden bg-slate-900`}>
                  <img
                    src={asset.src}
                    alt={asset.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                  {/* Badge */}
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-[#0052CC] font-bold text-[10px] uppercase tracking-wider shadow">
                    {asset.badge}
                  </span>

                  {/* Zoom Icon */}
                  <div className="absolute bottom-4 right-4 w-9 h-9 rounded-full bg-white/90 text-[#0052CC] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all shadow-lg">
                    <Eye className="w-4 h-4" />
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#0052CC] block">
                      {asset.categoryLabel}
                    </span>
                    <h3 className="font-bold text-base sm:text-lg text-slate-900 group-hover:text-[#0052CC] transition-colors mt-0.5 leading-snug">
                      {asset.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1.5 leading-relaxed line-clamp-2">
                      {asset.subtitle}
                    </p>
                  </div>

                  <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0052CC]">
                    <span>Inspecionar Peça</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          8. PILAR 05 — AGENDAMENTO DE VISITA NO STAND ("SUA NOVA VIDA COMEÇA AQUI!")
      ===================================================================== */}
      <section id="agendar" className="py-20 sm:py-28 bg-gradient-to-br from-slate-950 via-[#0A192F] to-[#1E1B4B] text-white">
        <div className="max-w-[1380px] mx-auto px-4 sm:px-8 space-y-12">
          <div className="max-w-2xl mx-auto text-center space-y-3">
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white/10 backdrop-blur-md text-[#00D2FF] text-xs font-bold uppercase tracking-widest">
              <Calendar className="w-3.5 h-3.5" />
              <span>PILAR 05 • STAND DE VENDAS NO TERRENO</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Sua Nova Vida Começa Aqui!
            </h2>
            <p className="text-slate-300 text-sm sm:text-base">
              Venha conhecer a implantação, a maquete física e o ritmo de obras na Via A4A em Talatona. A nossa equipa de consultores está pronta para atendê-lo.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-4xl mx-auto">
            {/* Left 7 Cols: Form */}
            <div className="lg:col-span-7 bg-white/5 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-white/15 shadow-2xl">
              {!formSubmitted ? (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                      O Seu Nome Completo
                    </label>
                    <input
                      type="text"
                      required
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      placeholder="Ex: Dr. António Silva"
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-slate-400 text-sm focus:outline-none focus:border-[#00D2FF]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                        Telefone / WhatsApp
                      </label>
                      <input
                        type="tel"
                        required
                        value={formPhone}
                        onChange={(e) => setFormPhone(e.target.value)}
                        placeholder="+244 9..."
                        className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-slate-400 text-sm focus:outline-none focus:border-[#00D2FF]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                        E-mail
                      </label>
                      <input
                        type="email"
                        required
                        value={formEmail}
                        onChange={(e) => setFormEmail(e.target.value)}
                        placeholder="seu@email.com"
                        className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-slate-400 text-sm focus:outline-none focus:border-[#00D2FF]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                      Data Preferida para Visita
                    </label>
                    <input
                      type="date"
                      value={formDate}
                      onChange={(e) => setFormDate(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white text-sm focus:outline-none focus:border-[#00D2FF]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                      Mensagem ou Questão
                    </label>
                    <textarea
                      rows={3}
                      value={formMessage}
                      onChange={(e) => setFormMessage(e.target.value)}
                      placeholder="Gostaria de agendar visita e receber a tabela oficial de lançamento..."
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-slate-400 text-sm focus:outline-none focus:border-[#00D2FF]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-full bg-gradient-to-r from-[#581C87] to-[#0052CC] hover:from-[#4C1D95] hover:to-[#004085] text-white font-bold text-xs uppercase tracking-widest transition-all shadow-xl shadow-blue-500/30 cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Confirmar Agendamento de Visita</span>
                  </button>
                </form>
              ) : (
                <div className="py-8 text-center space-y-3">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold text-white">Pedido Recebido com Sucesso!</h4>
                  <p className="text-xs text-slate-300 max-w-sm mx-auto">
                    Agradecemos o seu interesse, {formName}. O nosso consultor entrará em contacto pelo número {formPhone} para confirmar a sua visita.
                  </p>
                  <button
                    type="button"
                    onClick={() => setFormSubmitted(false)}
                    className="text-xs text-[#00D2FF] underline mt-2"
                  >
                    Enviar nova solicitação
                  </button>
                </div>
              )}
            </div>

            {/* Right 5 Cols: Direct WhatsApp & Phone Contacts */}
            <div className="lg:col-span-5 space-y-4">
              <div className="p-6 rounded-3xl bg-white/5 border border-white/15 space-y-4">
                <span className="text-xs font-bold uppercase tracking-widest text-[#00D2FF] block">
                  CONTATO DIRETO IMEDIATO
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Fale diretamente pelo WhatsApp ou ligue para a nossa equipa de vendas:
                </p>

                <div className="space-y-2.5">
                  {OFFICIAL_PHONES.map((phone, i) => (
                    <a
                      key={i}
                      href={`https://wa.me/${phone.clean}?text=Ol%C3%A1!%20Tenho%20interesse%20no%20INARA%20Residencial%20Talatona%20e%20gostaria%20de%20informa%C3%A7%C3%B5es%20e%20agendar%20visita.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3.5 rounded-2xl bg-white/10 hover:bg-emerald-500/20 border border-white/15 hover:border-emerald-500/50 flex items-center justify-between text-white text-xs font-mono-spec transition-all group"
                    >
                      <div className="flex items-center gap-3">
                        <MessageCircle className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                        <strong>{phone.display}</strong>
                      </div>
                      <span className="text-[10px] text-emerald-300 uppercase tracking-wider font-bold">
                        WhatsApp →
                      </span>
                    </a>
                  ))}
                </div>

                <div className="pt-3 border-t border-white/10 text-xs text-slate-300 space-y-1.5">
                  <p>
                    <strong>Email Oficial:</strong>{' '}
                    <a href="mailto:vendas@inara-africa.com" className="text-[#00D2FF] underline">
                      vendas@inara-africa.com
                    </a>
                  </p>
                  <p>
                    <strong>Stand de Vendas:</strong> Via A4A (Estrada do Rio Cambambe), Talhão 205/09 • Talatona, Luanda.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          9. FOOTER BANNER IDÊNTICO AOS FLYERS DA CAMPANHA
      ===================================================================== */}
      <div className="bg-gradient-to-r from-[#3B0764] via-[#0A256C] to-[#0052CC] text-white py-6 px-4 sm:px-8 border-t border-white/10">
        <div className="max-w-[1380px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Phone block with icon in white rounded card */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="w-10 h-10 rounded-2xl bg-white text-[#0052CC] flex items-center justify-center shrink-0 shadow">
              <Phone className="w-5 h-5 fill-current" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-200 block">
                CONTACTO
              </span>
              <div className="font-mono-spec font-bold text-xs sm:text-sm tracking-wide">
                <span>931 943 828</span>
                <span className="mx-2 text-blue-300">•</span>
                <span>923 436 077</span>
                <span className="mx-2 text-blue-300">•</span>
                <span>931 893 859</span>
              </div>
            </div>
          </div>

          {/* Email block with icon in white rounded card */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="w-10 h-10 rounded-2xl bg-white text-[#0052CC] flex items-center justify-center shrink-0 shadow">
              <Send className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-200 block">
                Entre em Contacto
              </span>
              <a
                href="mailto:vendas@inara-africa.com"
                className="font-mono-spec font-bold text-xs sm:text-sm hover:text-[#00D2FF] transition-colors"
              >
                vendas@inara-africa.com
              </a>
            </div>
          </div>

          {/* Social block with icon in white rounded card */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="w-10 h-10 rounded-2xl bg-white text-[#0052CC] flex items-center justify-center shrink-0 shadow">
              <Sparkles className="w-5 h-5 text-[#0052CC]" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-200 block">
                Redes Oficiais
              </span>
              <span className="font-bold text-xs sm:text-sm tracking-wide">
                INARA RESIDENCIAL
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================================
          10. FOOTER INSTITUCIONAL & LEGAL
      ===================================================================== */}
      <footer className="bg-slate-950 text-white border-t border-slate-800 py-12 px-4 sm:px-8">
        <div className="max-w-[1380px] mx-auto space-y-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-slate-800">
            <div className="flex items-center gap-3.5">
              <img
                src="/media/logo/inara-emblem-white.png"
                alt="Logomarca Oficial Inara Residencial"
                className="w-12 h-12 sm:w-14 sm:h-14 object-contain shrink-0"
              />
              <div>
                <span className="text-xl font-black block leading-none tracking-tight">
                  INARA RESIDENCIAL TALATONA
                </span>
                <span className="text-xs text-slate-400 mt-1 block">
                  Promovido por <strong>Finest Investment Partners</strong> • Financiamento <strong>Standard Bank Angola</strong>
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-slate-300">
              <button
                onClick={() => scrollToSection('hero')}
                className="hover:text-[#00D2FF] transition-colors cursor-pointer"
              >
                Início
              </button>
              <button
                onClick={() => scrollToSection('obra')}
                className="hover:text-[#00D2FF] transition-colors cursor-pointer"
              >
                Obra
              </button>
              <button
                onClick={() => scrollToSection('plantas')}
                className="hover:text-[#00D2FF] transition-colors cursor-pointer"
              >
                Plantas
              </button>
              <button
                onClick={() => scrollToSection('financiamento')}
                className="hover:text-[#00D2FF] transition-colors cursor-pointer"
              >
                Standard Bank
              </button>
              <button
                onClick={() => scrollToSection('localizacao')}
                className="hover:text-[#00D2FF] transition-colors cursor-pointer"
              >
                Localização
              </button>
              <button
                onClick={() => scrollToSection('campanha')}
                className="hover:text-[#00D2FF] transition-colors cursor-pointer"
              >
                Campanha
              </button>
              <button
                onClick={() => setIsBrochureOpen(true)}
                className="hover:text-[#00D2FF] transition-colors cursor-pointer text-[#00D2FF]"
              >
                Brochura PDF
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <p>
              © {new Date().getFullYear()} Inara Residencial Talatona. Todos os direitos reservados. {PROJECT_INFO.legalRegistration}.
            </p>
            <div className="flex items-center gap-4 font-mono-spec">
              <span>Instagram: @INARA RESIDENCIAL</span>
              <span>Facebook: INARA RESIDENCIAL</span>
            </div>
          </div>
        </div>
      </footer>

      {/* =====================================================================
          LIGHTBOX MODAL FOR CAMPAIGN ASSETS
      ===================================================================== */}
      {lightboxAsset && (
        <div
          onClick={() => setLightboxAsset(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn cursor-pointer"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl max-h-[92vh] w-full bg-slate-900 rounded-3xl overflow-hidden border border-slate-700 shadow-2xl flex flex-col"
          >
            <div className="flex items-center justify-between px-6 py-4 bg-slate-950 border-b border-slate-800 text-white">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#00D2FF] block">
                  {lightboxAsset.categoryLabel} • {lightboxAsset.badge}
                </span>
                <h4 className="text-base font-bold">{lightboxAsset.title}</h4>
              </div>
              <button
                onClick={() => setLightboxAsset(null)}
                className="p-2 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-auto p-4 flex items-center justify-center bg-black/50">
              <img
                src={lightboxAsset.src}
                alt={lightboxAsset.title}
                className="max-h-[75vh] w-auto object-contain rounded-xl shadow-2xl"
              />
            </div>

            <div className="px-6 py-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span>{lightboxAsset.subtitle}</span>
              <a
                href={lightboxAsset.src}
                download
                className="px-4 py-2 rounded-full bg-[#0052CC] hover:bg-[#004085] text-white font-bold transition-colors"
              >
                Descarregar Original
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Brochure Dossier Modal */}
      <BrochureModal
        isOpen={isBrochureOpen}
        onClose={() => setIsBrochureOpen(false)}
        currency={currency}
        cityLabel={customCity}
      />

      {/* Strategic Advisor Modal */}
      <StrategyAdvisorModal
        isOpen={isStrategyOpen}
        onClose={() => setIsStrategyOpen(false)}
        currency={currency}
        onChangeCurrency={setCurrency}
        customCity={customCity}
        onChangeCustomCity={setCustomCity}
      />
    </div>
  );
}
