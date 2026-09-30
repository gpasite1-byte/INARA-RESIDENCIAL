import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  Trees,
  Sparkles,
  MapPin,
  Calendar,
  Download,
  ArrowUpRight,
  CheckCircle2,
  Compass,
  Maximize2,
  Car,
  BedDouble,
  Bath,
  Sun,
  Phone,
  Clock,
  Layers,
  Eye,
  Lightbulb,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  X,
  Building,
  Lock,
  Wifi,
  Zap,
  Droplets,
  Menu,
  Play,
  Film,
} from 'lucide-react';
import {
  CURRENCIES,
  CurrencyCode,
  GALLERY_ITEMS,
  GalleryItem,
  MASTERPLAN_HOTSPOTS,
  MasterplanHotspot,
  TYPOLOGIES,
  Typology,
  RoomSpec,
  MASTERPLAN_VIDEO,
  POOL_VIDEO,
  INTERIOR_DECORADO_IMAGES,
} from './data/inaraData';
import { formatPrice } from './utils/formatCurrency';
import { ArchitecturalFloorplanSVG } from './components/ArchitecturalFloorplanSVG';
import { HomeConfiguratorSection } from './components/HomeConfiguratorSection';
import { BrochureModal } from './components/BrochureModal';
import { StrategyAdvisorModal } from './components/StrategyAdvisorModal';

interface HeroScene {
  id: string;
  title: string;
  subtitle: string;
  src: string;
  badge: string;
  lighting: string;
}

const HERO_SCENES: HeroScene[] = [
  {
    id: 'panoramic-sunset',
    title: 'Entrada Monumental & Vista Panorâmica',
    subtitle: 'Portaria Inara Residence, Clube Social, campo desportivo e pôr-do-sol',
    src: '/media/hero/inara-main-hero.png',
    badge: 'Capa Oficial',
    lighting: 'Entardecer Panorâmico',
  },
  {
    id: 'twilight',
    title: 'Crepúsculo & Iluminação das Moradias',
    subtitle: 'Fachadas iluminadas, carros de luxo e atmosfera dourada',
    src: '/media/hero/inara-hero-twilight.jpg',
    badge: 'Hora Dourada 3D',
    lighting: 'Noturno • Cénico',
  },
  {
    id: 'daylight',
    title: 'Dia Ensolarado & Brises Cumaru',
    subtitle: 'Brises de madeira, palmeiras reais e céu azul límpido',
    src: '/media/hero/inara-hero-daylight.jpg',
    badge: 'Luz Natural 100%',
    lighting: 'Diurno • Sol Pleno',
  },
  {
    id: 'perspective',
    title: 'Perspectiva da Alameda Interna',
    subtitle: 'Alameda pavimentada, relvados impecáveis e arborização',
    src: '/media/hero/inara-hero-perspective.jpg',
    badge: 'Paisagismo & Vias',
    lighting: 'Perspectiva Ampla',
  },
  {
    id: 'clubhouse',
    title: 'Portaria & Clube Privado Lote 31',
    subtitle: 'Entrada monumental, torre travertino e muxarabis',
    src: '/media/hero/inara-hero-clubhouse.jpg',
    badge: 'Acesso Nobre',
    lighting: 'Fachada Principal',
  },
];

export function App() {
  // Market & Currency Customization State
  const [currency, setCurrency] = useState<CurrencyCode>('AOA');
  const [customCity, setCustomCity] = useState<string>('Talatona • Luanda');

  // Mobile Menu State
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Hero Interactive Perspective State
  const [activeHeroIndex, setActiveHeroIndex] = useState(0);
  const [heroAutoPlay, setHeroAutoPlay] = useState(false);

  useEffect(() => {
    if (!heroAutoPlay) return;
    const timer = setInterval(() => {
      setActiveHeroIndex((prev) => (prev + 1) % HERO_SCENES.length);
    }, 6500);
    return () => clearInterval(timer);
  }, [heroAutoPlay]);

  // Concept Section Daylight / Twilight Toggle
  const [conceptNightMode, setConceptNightMode] = useState(false);

  // Masterplan Interactive State
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'seguranca' | 'lazer' | 'natureza'>('all');
  const [activeHotspot, setActiveHotspot] = useState<MasterplanHotspot>(MASTERPLAN_HOTSPOTS[1]); // Default to Pool Club
  const [masterplanMode, setMasterplanMode] = useState<'map' | 'video'>('map');
  const [hotspotVideoActive, setHotspotVideoActive] = useState(false);

  // Multi-page navigation state
  type ActivePage = 'home' | 'conceito' | 'implantacao' | 'plantas' | 'lazer' | 'localizacao' | 'tudo';
  const [activePage, setActivePage] = useState<ActivePage>('home');

  const navigateToPage = (page: ActivePage) => {
    setActivePage(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToClubeLazer = () => {
    setMobileMenuOpen(false);
    if (activePage !== 'home') {
      setActivePage('home');
      setTimeout(() => {
        const el = document.getElementById('lazer');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById('lazer');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Typology & Floorplan Selector State
  type ViewMode = 'blueprint' | 'video' | 'insolacao' | 'interior' | 'exterior';
  const [activeTypology, setActiveTypology] = useState<Typology>(TYPOLOGIES[0]); // Default T4 Opção A
  const [viewMode, setViewMode] = useState<ViewMode>('blueprint');
  const [activeRoom, setActiveRoom] = useState<RoomSpec>(TYPOLOGIES[0].rooms[0]);
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(20);

  // Gallery Lightbox State
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);

  // Interior Decorado Gallery State
  const [decoradoVisibleCount, setDecoradoVisibleCount] = useState<number>(12);
  const [selectedDecoradoIndex, setSelectedDecoradoIndex] = useState<number | null>(null);

  // Fullscreen Video Modal State
  const [videoModal, setVideoModal] = useState<{ title: string; url: string; subtitle?: string } | null>(null);

  // Modals State
  const [isBrochureOpen, setIsBrochureOpen] = useState(false);
  const [isStrategyOpen, setIsStrategyOpen] = useState(false);

  // Private Visit Lead Form State
  const [formName, setFormName] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formTypology, setFormTypology] = useState(TYPOLOGIES[0].name);
  const [formVisitType, setFormVisitType] = useState<'presencial' | 'video' | 'tabela'>('presencial');
  const [formDate, setFormDate] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSelectTypology = (typo: Typology) => {
    setActiveTypology(typo);
    setActiveRoom(typo.rooms[0]);
  };

  const handleRequestTypologyProposal = (typo: Typology) => {
    setFormTypology(typo.name);
    navigateToPage('localizacao');
    setTimeout(() => {
      const el = document.getElementById('agendar');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 150);
  };

  const handleSaveConfigurationToLead = (summaryText: string, typologyName: string) => {
    setFormTypology(`${typologyName} (Personalizada)`);
    navigateToPage('localizacao');
    setTimeout(() => {
      const el = document.getElementById('agendar');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 150);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  const filteredHotspots =
    selectedCategory === 'all'
      ? MASTERPLAN_HOTSPOTS
      : MASTERPLAN_HOTSPOTS.filter((h) => h.category === selectedCategory);

  // Financial calculation for selected typology
  const downPaymentAmount = Math.round((activeTypology.basePriceEUR * downPaymentPercent) / 100);
  const constructionAmount = Math.round(activeTypology.basePriceEUR * 0.3);
  const finalBalanceAmount = activeTypology.basePriceEUR - downPaymentAmount - constructionAmount;

  return (
    <div className="min-h-screen bg-[#F7F4EF] text-[#1C1B18] relative">
      {/* Top Consultoria Banner for the Project Owner */}
      <div className="bg-[#151814] text-[#F7F4EF] border-b border-white/10 px-4 py-2 text-xs">
        <div className="max-w-[1380px] mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#B86B43] text-white font-mono-spec text-[10px] uppercase tracking-wider">
              <Lightbulb className="w-3 h-3" /> Consultoria Incluída
            </span>
            <span className="text-white/85 hidden sm:inline">
              Criámos o site completo do <strong>Residencial Inara</strong> + o seu Guia Estratégico de Lançamento.
            </span>
          </div>

          <div className="flex items-center gap-4 ml-auto">
            {/* Currency Quick Switcher */}
            <div className="flex items-center gap-1 bg-white/10 rounded p-0.5 font-mono-spec text-[11px]">
              {(Object.keys(CURRENCIES) as CurrencyCode[]).map((code) => (
                <button
                  key={code}
                  type="button"
                  onClick={() => {
                    setCurrency(code);
                    setCustomCity(CURRENCIES[code].cityDefault);
                  }}
                  className={`px-2 py-0.5 rounded transition-colors cursor-pointer ${
                    currency === code
                      ? 'bg-[#B86B43] text-white font-medium'
                      : 'text-white/70 hover:text-white'
                  }`}
                  title={`Mudar moeda para ${CURRENCIES[code].label}`}
                >
                  {code}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setIsStrategyOpen(true)}
              className="inline-flex items-center gap-1.5 text-[#D9A86C] hover:text-white font-medium transition-colors cursor-pointer"
            >
              <span>Ver Conselhos p/ o seu Condomínio</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Single Floating Glassmorphic Navigation Header with Enlarged Logo */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-[#F7F4EF]/95 border-b border-[#DFD8CC] transition-all">
        <div className="max-w-[1380px] mx-auto px-4 sm:px-8 h-24 sm:h-28 flex items-center justify-between">
          {/* Architectural Monogram & Brand with Official Logo */}
          <button
            type="button"
            onClick={() => navigateToPage('home')}
            className="flex items-center gap-4 group cursor-pointer text-left"
          >
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 lg:w-22 lg:h-22 rounded-2xl overflow-hidden border-2 border-[#DFD8CC] group-hover:border-[#B86B43] transition-all bg-[#4B5260] shadow-md flex items-center justify-center shrink-0">
              <img
                src="/media/logo/inara-emblem.jpg"
                alt="Logomarca Oficial INARA RESIDÊNCIAL TALATONA"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              />
            </div>
            <div>
              <span className="block font-serif-editorial text-2xl sm:text-3xl lg:text-[34px] font-bold tracking-tight text-[#1C1B18] leading-none">
                INARA
              </span>
              <span className="block font-mono-spec text-[11px] sm:text-xs lg:text-[13px] uppercase tracking-[0.24em] text-[#B86B43] mt-1.5 font-bold">
                RESIDÊNCIAL TALATONA
              </span>
            </div>
          </button>

          {/* Page-Based Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm font-medium">
            <button
              type="button"
              onClick={() => navigateToPage('home')}
              className={`py-2 text-[13px] uppercase font-mono-spec tracking-wider transition-all cursor-pointer ${
                activePage === 'home'
                  ? 'text-[#B86B43] border-b-2 border-[#B86B43] font-bold'
                  : 'text-[#1C1B18]/75 hover:text-[#B86B43]'
              }`}
            >
              Início
            </button>
            <button
              type="button"
              onClick={() => navigateToPage('conceito')}
              className={`py-2 text-[13px] uppercase font-mono-spec tracking-wider transition-all cursor-pointer ${
                activePage === 'conceito'
                  ? 'text-[#B86B43] border-b-2 border-[#B86B43] font-bold'
                  : 'text-[#1C1B18]/75 hover:text-[#B86B43]'
              }`}
            >
              O Conceito
            </button>
            <button
              type="button"
              onClick={() => navigateToPage('implantacao')}
              className={`py-2 text-[13px] uppercase font-mono-spec tracking-wider transition-all cursor-pointer ${
                activePage === 'implantacao'
                  ? 'text-[#B86B43] border-b-2 border-[#B86B43] font-bold'
                  : 'text-[#1C1B18]/75 hover:text-[#B86B43]'
              }`}
            >
              Implantação
            </button>
            <button
              type="button"
              onClick={() => navigateToPage('plantas')}
              className={`py-2 text-[13px] uppercase font-mono-spec tracking-wider transition-all cursor-pointer ${
                activePage === 'plantas'
                  ? 'text-[#B86B43] border-b-2 border-[#B86B43] font-bold'
                  : 'text-[#1C1B18]/75 hover:text-[#B86B43]'
              }`}
            >
              Plantas & Tipologias
            </button>
            <button
              type="button"
              onClick={navigateToClubeLazer}
              className={`py-2 text-[13px] uppercase font-mono-spec tracking-wider transition-all cursor-pointer ${
                activePage === 'lazer'
                  ? 'text-[#B86B43] border-b-2 border-[#B86B43] font-bold'
                  : 'text-[#1C1B18]/75 hover:text-[#B86B43]'
              }`}
            >
              Clube & Lazer
            </button>
            <button
              type="button"
              onClick={() => navigateToPage('localizacao')}
              className={`py-2 text-[13px] uppercase font-mono-spec tracking-wider transition-all cursor-pointer ${
                activePage === 'localizacao'
                  ? 'text-[#B86B43] border-b-2 border-[#B86B43] font-bold'
                  : 'text-[#1C1B18]/75 hover:text-[#B86B43]'
              }`}
            >
              Localização
            </button>
          </nav>

          {/* Primary CTA + Brochure Trigger */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsBrochureOpen(true)}
              className="px-4 py-2.5 rounded border border-[#DFD8CC] hover:border-[#1C1B18] text-xs font-mono-spec uppercase tracking-wider text-[#1C1B18] transition-colors cursor-pointer"
            >
              Brochura PDF
            </button>
            <button
              type="button"
              onClick={() => navigateToPage('localizacao')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded bg-[#B86B43] hover:bg-[#96522F] text-white text-xs font-mono-spec uppercase tracking-wider font-medium transition-colors shadow-sm cursor-pointer"
            >
              <span>Agendar Visita</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Menu Trigger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded border border-[#DFD8CC] text-[#1C1B18]"
            aria-label="Abrir menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#F7F4EF] border-b border-[#DFD8CC] px-6 py-5 space-y-4">
            <div className="flex flex-col space-y-3 text-sm font-medium">
              <button
                type="button"
                onClick={() => navigateToPage('home')}
                className={`py-1.5 text-left font-mono-spec uppercase text-xs tracking-wider ${
                  activePage === 'home' ? 'text-[#B86B43] font-bold' : 'text-[#1C1B18]'
                }`}
              >
                00. Início / Visão Geral
              </button>
              <button
                type="button"
                onClick={() => navigateToPage('conceito')}
                className={`py-1.5 text-left font-mono-spec uppercase text-xs tracking-wider ${
                  activePage === 'conceito' ? 'text-[#B86B43] font-bold' : 'text-[#1C1B18]'
                }`}
              >
                01. O Conceito & Arquitetura
              </button>
              <button
                type="button"
                onClick={() => navigateToPage('implantacao')}
                className={`py-1.5 text-left font-mono-spec uppercase text-xs tracking-wider ${
                  activePage === 'implantacao' ? 'text-[#B86B43] font-bold' : 'text-[#1C1B18]'
                }`}
              >
                02. Implantação & Masterplan
              </button>
              <button
                type="button"
                onClick={() => navigateToPage('plantas')}
                className={`py-1.5 text-left font-mono-spec uppercase text-xs tracking-wider ${
                  activePage === 'plantas' ? 'text-[#B86B43] font-bold' : 'text-[#1C1B18]'
                }`}
              >
                03. Plantas & Tipologias T4 Duplex
              </button>
              <button
                type="button"
                onClick={navigateToClubeLazer}
                className={`py-1.5 text-left font-mono-spec uppercase text-xs tracking-wider ${
                  activePage === 'lazer' ? 'text-[#B86B43] font-bold' : 'text-[#1C1B18]'
                }`}
              >
                04. Galeria & Clube de Lazer (Lote 31)
              </button>
              <button
                type="button"
                onClick={() => navigateToPage('localizacao')}
                className={`py-1.5 text-left font-mono-spec uppercase text-xs tracking-wider ${
                  activePage === 'localizacao' ? 'text-[#B86B43] font-bold' : 'text-[#1C1B18]'
                }`}
              >
                05. Localização & Obra (Via A4A)
              </button>
            </div>
            <div className="pt-3 border-t border-[#DFD8CC] flex flex-col gap-2">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsBrochureOpen(true);
                }}
                className="w-full py-2.5 rounded border border-[#1C1B18] text-xs font-mono-spec uppercase tracking-wider"
              >
                Descarregar Dossier PDF
              </button>
              <button
                type="button"
                onClick={() => navigateToPage('localizacao')}
                className="w-full py-2.5 rounded bg-[#B86B43] text-white text-center text-xs font-mono-spec uppercase tracking-wider"
              >
                Agendar Atendimento Privado
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Dedicated Page Header Banner (for non-home and non-tudo pages) */}
      {activePage !== 'home' && activePage !== 'tudo' && (
        <div className="bg-[#EFEAE1] border-b border-[#DFD8CC] py-6 px-4 sm:px-8">
          <div className="max-w-[1380px] mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono-spec text-[#666159] uppercase tracking-wider mb-1">
                <button
                  type="button"
                  onClick={() => navigateToPage('home')}
                  className="hover:text-[#B86B43] cursor-pointer inline-flex items-center gap-1"
                >
                  <span>INÍCIO</span>
                </button>
                <span>/</span>
                <span className="text-[#B86B43] font-bold">
                  {activePage === 'conceito' && 'O CONCEITO ARQUITETÓNICO'}
                  {activePage === 'implantacao' && 'MASTERPLAN & IMPLANTAÇÃO'}
                  {activePage === 'plantas' && 'PLANTAS & TIPOLOGIAS T4 DUPLEX'}
                  {activePage === 'lazer' && 'CLUBE PRIVADO & LAZER'}
                  {activePage === 'localizacao' && 'LOCALIZAÇÃO & AGENDAMENTO'}
                </span>
              </div>
              <h1 className="font-serif-editorial text-2xl sm:text-3xl lg:text-4xl text-[#1C1B18]">
                {activePage === 'conceito' && 'O Conceito & Filosofia Arquitetónica'}
                {activePage === 'implantacao' && 'Implantação Geral & Masterplan dos 31 Lotes'}
                {activePage === 'plantas' && 'Plantas Técnicas 2D & Modelos T4 Duplex'}
                {activePage === 'lazer' && 'Clube Privado Lote 31 & Galeria de Lazer'}
                {activePage === 'localizacao' && 'Localização em Talatona (Via A4A) & Visita Privada'}
              </h1>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => navigateToPage('home')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-white/80 hover:bg-white text-xs font-mono-spec uppercase tracking-wider text-[#1C1B18] border border-[#DFD8CC] cursor-pointer transition-colors"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Início</span>
              </button>
              <button
                type="button"
                onClick={() => navigateToPage('tudo')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#1C1B18] hover:bg-[#B86B43] text-xs font-mono-spec uppercase tracking-wider text-white cursor-pointer transition-colors"
              >
                <span>Ver Apresentação Contínua</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          1. FULL-VIEWPORT ARCHITECTURAL HERO PRESENTATION
      ===================================================================== */}
      {(activePage === 'home' || activePage === 'tudo') && (
        <>
          <section className="relative min-h-[82vh] lg:min-h-[88vh] flex flex-col justify-end overflow-hidden bg-[#151814]">
            {/* Background Architectural Render with Smooth Crossfade */}
            <div className="absolute inset-0 z-0">
              {HERO_SCENES.map((scene, idx) => (
                <img
                  key={scene.id}
                  src={scene.src}
                  alt={scene.title}
                  className={`absolute inset-0 w-full h-full object-cover object-center transition-all duration-1000 ease-in-out ${
                    idx === activeHeroIndex
                      ? 'opacity-100 scale-100'
                      : 'opacity-0 scale-105 pointer-events-none'
                  }`}
                />
              ))}

              {/* Soft, bottom-only transparent gradient: 0% overlay on top 50%, leaving the sky, palm trees, and architecture crystal clear */}
              <div
                className="absolute inset-0 z-[1] pointer-events-none"
                style={{
                  background:
                    'linear-gradient(to top, rgba(15, 18, 14, 0.92) 0%, rgba(15, 18, 14, 0.55) 24%, rgba(15, 18, 14, 0.15) 38%, transparent 52%)',
                }}
              />
            </div>

            {/* Main Hero Content: Positioned at Bottom-Left with Maximum Openness and Refined Typography */}
            <div className="relative z-10 max-w-[1380px] w-full mx-auto px-4 sm:px-8 pb-10 sm:pb-14">
              <div className="max-w-3xl lg:max-w-4xl space-y-3 sm:space-y-4">
                {/* Architectural Sub-Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-[#D9A86C] font-mono-spec text-[10px] sm:text-[11px] uppercase tracking-[0.22em]">
                  <span>Talatona • Luanda</span>
                  <span className="w-1 h-1 rounded-full bg-[#D9A86C]" />
                  <span>30 Moradias T4 Duplex</span>
                </div>

                {/* Display Headline Requested by User */}
                <h1 className="font-serif-editorial text-2xl sm:text-4xl lg:text-[50px] xl:text-[54px] text-white font-normal leading-[1.12] tracking-tight drop-shadow-lg">
                  Inara Residêncial Talatona —{' '}
                  <span className="italic text-[#E8D5B5] font-light">
                    “Sua casa dos sonhos é agora uma realidade”
                  </span>
                </h1>

                {/* Subtitle / Descriptive Text Requested by User */}
                <p className="text-xs sm:text-sm lg:text-[15px] xl:text-base text-white/90 font-light leading-relaxed max-w-3xl drop-shadow-md">
                  Condomínio fechado de alto padrão com 30 moradias T4 Duplex de 217 m² ABC (100% em suíte com varandas privativas, escritório independente, piscina privativa e 2 vagas) num terreno nobre de 10.000 m² em Talatona, com clube de lazer completo no Lote 31 (767 m²).
                </p>

                {/* Clean, Refined Single Action Button + Smooth Scroll Link */}
                <div className="pt-2 flex flex-wrap items-center gap-4">
                  <button
                    type="button"
                    onClick={() => navigateToPage('localizacao')}
                    className="inline-flex items-center gap-2.5 px-6 py-3 rounded-lg bg-[#B86B43] hover:bg-[#96522F] text-white text-xs font-mono-spec uppercase tracking-wider font-semibold transition-all shadow-xl cursor-pointer"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Agendar Atendimento Privado</span>
                  </button>

                  <button
                    type="button"
                    onClick={navigateToClubeLazer}
                    className="inline-flex items-center gap-2 px-4 py-3 rounded-lg text-white/90 hover:text-white text-xs font-mono-spec uppercase tracking-wider hover:bg-white/10 transition-all cursor-pointer"
                  >
                    <span>Explorar Clube & Lazer</span>
                    <ChevronDown className="w-3.5 h-3.5 text-[#D9A86C]" />
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Architectural Metrics Ribbon: Positioned outside the Hero so it leaves the cover image completely unobstructed */}
          <div className="relative z-20 border-y border-[#DFD8CC]/20 bg-[#151814] text-[#F7F4EF]">
            <div className="max-w-[1380px] mx-auto px-4 sm:px-8 py-5 grid grid-cols-2 md:grid-cols-5 gap-6">
              <div className="border-r border-white/10 pr-4">
                <span className="block font-mono-spec text-[10px] uppercase tracking-widest text-[#D9A86C]">
                  EXCLUSIVIDADE
                </span>
                <strong className="font-serif-editorial text-2xl sm:text-3xl font-normal">
                  30 Moradias
                </strong>
                <span className="block text-xs text-white/65 mt-0.5">Condomínio fechado unifamiliar</span>
              </div>

              <div className="md:border-r border-white/10 pr-4">
                <span className="block font-mono-spec text-[10px] uppercase tracking-widest text-[#D9A86C]">
                  TERRENO URBANO
                </span>
                <strong className="font-serif-editorial text-2xl sm:text-3xl font-normal">
                  10.000 m²
                </strong>
                <span className="block text-xs text-white/65 mt-0.5">31 Lotes (Lotes 220 m² a 358 m²)</span>
              </div>

              <div className="border-r border-white/10 pr-4">
                <span className="block font-mono-spec text-[10px] uppercase tracking-widest text-[#D9A86C]">
                  TIPOLOGIA OFICIAL
                </span>
                <strong className="font-serif-editorial text-2xl sm:text-3xl font-normal">
                  T4 Duplex (217 m²)
                </strong>
                <span className="block text-xs text-white/65 mt-0.5">4 Suítes + Escritório + Piscina</span>
              </div>

              <div className="md:border-r border-white/10 pr-4">
                <span className="block font-mono-spec text-[10px] uppercase tracking-widest text-[#D9A86C]">
                  CLUBE & LAZER
                </span>
                <strong className="font-serif-editorial text-2xl sm:text-3xl font-normal">
                  Lote 31 (767 m²)
                </strong>
                <span className="block text-xs text-white/65 mt-0.5">Cinema, ginásio, festas, quadra</span>
              </div>

              <div className="col-span-2 md:col-span-1 flex items-center justify-between md:block">
                <div>
                  <span className="block font-mono-spec text-[10px] uppercase tracking-widest text-[#68D391]">
                    VALOR DE LANÇAMENTO
                  </span>
                  <strong className="font-serif-editorial text-2xl sm:text-3xl font-normal text-white">
                    Desde {formatPrice(TYPOLOGIES[0].basePriceEUR, currency)}
                  </strong>
                  <span className="block text-xs text-white/65 mt-0.5">Financiamento ou pagamento faseado</span>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* =====================================================================
          2. O CONCEITO & FILOSOFIA ARQUITETÓNICA (ASYMMETRIC EDITORIAL)
      ===================================================================== */}
      {(activePage === 'conceito' || activePage === 'tudo') && (
      <section id="conceito" className="py-20 sm:py-28 px-4 sm:px-8 max-w-[1380px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Asymmetric Architectural Visual + Day/Night Light Study */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative rounded-lg overflow-hidden border border-[#DFD8CC] shadow-xl group">
              <img
                src={
                  conceptNightMode
                    ? '/media/hero/inara-hero-twilight.jpg'
                    : '/media/concept/inara-insolacao-ventilacao.jpg'
                }
                alt="Insolação Natural e Ventilação Cruzada — Residencial Inara"
                className="w-full aspect-[4/3] object-cover transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#151814]/80 via-transparent to-transparent" />

              {/* Day / Night Lighting Study Toggle */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                <span className="px-3 py-1 rounded bg-[#151814]/80 backdrop-blur-md text-[#F7F4EF] font-mono-spec text-[11px] uppercase tracking-wider">
                  {conceptNightMode
                    ? 'ESTUDO LUMINOTÉCNICO NOTURNO (HORA DOURADA)'
                    : 'INSOLAÇÃO NATURAL & VENTILAÇÃO CRUZADA'}
                </span>
                <button
                  type="button"
                  onClick={() => setConceptNightMode(!conceptNightMode)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#F7F4EF] text-[#1C1B18] hover:bg-[#B86B43] hover:text-white text-xs font-mono-spec font-medium transition-colors shadow cursor-pointer"
                >
                  <Sun className="w-3.5 h-3.5" />
                  <span>{conceptNightMode ? 'Ver Luz Diurna' : 'Simular Entardecer'}</span>
                </button>
              </div>

              {/* Architectural Caption Overlay */}
              <div className="absolute bottom-4 left-4 right-4 text-[#F7F4EF] flex items-end justify-between">
                <div>
                  <span className="text-[10px] font-mono-spec uppercase tracking-widest text-[#D9A86C] block">
                    SIGNIFICADO DE INARA • &ldquo;A QUE ILUMINA&rdquo;
                  </span>
                  <p className="font-serif-editorial text-xl">
                    Brises móveis em Cumaru filtram o sol tropical ao longo das estações.
                  </p>
                </div>
              </div>
            </div>

            {/* Secondary Architectural Materiality Strip */}
            <div className="grid grid-cols-3 gap-3 pt-1">
              <div className="p-3.5 rounded bg-[#EFEAE1] border border-[#DFD8CC]">
                <span className="font-mono-spec text-[10px] text-[#B86B43] uppercase block">
                  MATÉRIA 01
                </span>
                <strong className="font-serif-editorial text-base text-[#1C1B18]">
                  Travertino Bruto
                </strong>
                <p className="text-[11px] text-[#666159] mt-0.5">
                  Inércia térmica e nobreza intemporal nas fachadas ventiladas.
                </p>
              </div>
              <div className="p-3.5 rounded bg-[#EFEAE1] border border-[#DFD8CC]">
                <span className="font-mono-spec text-[10px] text-[#B86B43] uppercase block">
                  MATÉRIA 02
                </span>
                <strong className="font-serif-editorial text-base text-[#1C1B18]">
                  Madeira Cumaru
                </strong>
                <p className="text-[11px] text-[#666159] mt-0.5">
                  Certificação florestal sustentável e resistência natural ao tempo.
                </p>
              </div>
              <div className="p-3.5 rounded bg-[#EFEAE1] border border-[#DFD8CC]">
                <span className="font-mono-spec text-[10px] text-[#B86B43] uppercase block">
                  MATÉRIA 03
                </span>
                <strong className="font-serif-editorial text-base text-[#1C1B18]">
                  Vidro Extraclaro
                </strong>
                <p className="text-[11px] text-[#666159] mt-0.5">
                  Transparência máxima com proteção acústica e UV de 98%.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Narrative + 3 Condominium Value Pillars */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-mono-spec uppercase tracking-[0.2em] text-[#B86B43]">
              <span>01 • O CONCEITO RESIDENCIAL INARA</span>
            </div>

            <h2 className="font-serif-editorial text-3xl sm:text-5xl text-[#1C1B18] font-normal leading-[1.12]">
              Desenhado para a luz. Construído com sofisticação em Talatona.
            </h2>

            <p className="text-[#666159] text-base leading-relaxed">
              <strong className="text-[#1C1B18] font-medium">Inara</strong> significa{' '}
              <em>&ldquo;raio de luz&rdquo;</em>. Um condomínio fechado de 30 moradias de alto padrão
              com arquitetura moderna e harmoniosa na Via A4A (Estrada do Rio Cambambe), Talatona.
              Desenvolvido pela <strong className="text-[#1C1B18]">F.I.P. – Finest Investment Partners</strong> para
              proporcionar um ambiente familiar e tranquilo com máxima privacidade, conforto e infraestrutura completa.
            </p>

            {/* The 3 Essential Condominium Pillars */}
            <div className="space-y-4 pt-2">
              <div className="p-5 rounded-lg bg-[#EFEAE1] border border-[#DFD8CC] flex items-start gap-4">
                <div className="w-10 h-10 rounded bg-[#1C1B18] text-[#D9A86C] flex items-center justify-center shrink-0 mt-0.5">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif-editorial text-xl font-semibold text-[#1C1B18]">
                    1. Segurança 24h & Portaria com Acesso Controlado
                  </h3>
                  <p className="text-sm text-[#666159] mt-1 leading-relaxed">
                    Portaria blindada de segurança com eclusa de controlo localizada diretamente na Via A4A
                    (Estrada do Rio Cambambe), garantindo vigilância contínua 24h/7, muro perimetral iluminado,
                    circuito fechado de televisão (CFTV) e total proteção familiar.
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-lg bg-[#EFEAE1] border border-[#DFD8CC] flex items-start gap-4">
                <div className="w-10 h-10 rounded bg-[#3A4D3E] text-[#F7F4EF] flex items-center justify-center shrink-0 mt-0.5">
                  <Trees className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif-editorial text-xl font-semibold text-[#1C1B18]">
                    2. Moradias T4 Duplex de 217 m² (100% Suítes com Varanda)
                  </h3>
                  <p className="text-sm text-[#666159] mt-1 leading-relaxed">
                    R/C com sala ampla de estar e jantar, escritório de trabalho independente, cozinha com ilha,
                    lavandaria, WC social, quintal com piscina privativa, churrasqueira e 2 vagas. 1º Piso com 4 quartos em
                    suíte, todos com varanda privativa.
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-lg bg-[#EFEAE1] border border-[#DFD8CC] flex items-start gap-4">
                <div className="w-10 h-10 rounded bg-[#B86B43] text-white flex items-center justify-center shrink-0 mt-0.5">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif-editorial text-xl font-semibold text-[#1C1B18]">
                    3. Clube de Lazer & Desporto no Lote 31 (767 m²)
                  </h3>
                  <p className="text-sm text-[#666159] mt-1 leading-relaxed">
                    Edifício de apoio e lazer com 383,5 m² de área construída + 383,5 m² de exterior: Salão de festas,
                    ginásio equipado, sala de cinema privada com acústica, sala de jogos, churrasqueira comunitária e
                    quadra multiuso desportiva com iluminação LED.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      )}

      {/* =====================================================================
          3. INTERACTIVE MASTERPLAN & AMENITIES HOTSPOT VIEWER (#implantacao)
      ===================================================================== */}
      {(activePage === 'implantacao' || activePage === 'tudo') && (
      <section id="implantacao" className="py-20 sm:py-28 bg-[#EFEAE1] border-y border-[#DFD8CC]">
        <div className="max-w-[1380px] mx-auto px-4 sm:px-8 space-y-10">
          {/* Section Header + Category Filter Pills */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <span className="font-mono-spec text-xs uppercase tracking-[0.2em] text-[#B86B43] block">
                02 • IMPLANTAÇÃO GERAL & INFRAESTRUTURA DE LAZER
              </span>
              <h2 className="font-serif-editorial text-3xl sm:text-5xl text-[#1C1B18] font-normal mt-2">
                Masterplan Interativo — Explore cada recanto do Inara
              </h2>
              <p className="text-sm sm:text-base text-[#666159] mt-2 max-w-2xl">
                Clique nos pontos numerados sobre a perspetiva de implantação geral para conhecer em
                detalhe a segurança, os espaços de convívio e o parque botânico.
              </p>
            </div>

            {/* Masterplan View Toggle + Category Filter Buttons */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              {/* View Switcher: Map vs 3D Video */}
              <div className="flex items-center bg-[#DFD8CC]/70 p-1 rounded-lg">
                <button
                  type="button"
                  onClick={() => setMasterplanMode('map')}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded text-xs font-mono-spec uppercase tracking-wider transition-all cursor-pointer ${
                    masterplanMode === 'map'
                      ? 'bg-[#1C1B18] text-[#F7F4EF] shadow-sm font-medium'
                      : 'text-[#666159] hover:text-[#1C1B18]'
                  }`}
                >
                  <Compass className="w-3.5 h-3.5 text-[#D9A86C]" />
                  <span>Mapa 2D & Hotspots</span>
                </button>
                <button
                  type="button"
                  onClick={() => setMasterplanMode('video')}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded text-xs font-mono-spec uppercase tracking-wider transition-all cursor-pointer ${
                    masterplanMode === 'video'
                      ? 'bg-[#B86B43] text-white shadow-sm font-medium'
                      : 'text-[#666159] hover:text-[#1C1B18]'
                  }`}
                >
                  <Film className="w-3.5 h-3.5" />
                  <span>Vídeo 3D do Masterplan</span>
                </button>
              </div>

              {/* Category Filter Pills (Active when in map mode) */}
              {masterplanMode === 'map' && (
                <div className="flex flex-wrap items-center gap-1.5">
                  {[
                    { id: 'all', label: 'Todos (07)' },
                    { id: 'lazer', label: 'Lazer' },
                    { id: 'seguranca', label: 'Segurança' },
                    { id: 'natureza', label: 'Natureza' },
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => {
                        setSelectedCategory(cat.id as typeof selectedCategory);
                        const firstMatch =
                          cat.id === 'all'
                            ? MASTERPLAN_HOTSPOTS[0]
                            : MASTERPLAN_HOTSPOTS.find((h) => h.category === cat.id);
                        if (firstMatch) {
                          setActiveHotspot(firstMatch);
                          setHotspotVideoActive(false);
                        }
                      }}
                      className={`px-3 py-1.5 rounded text-xs font-mono-spec uppercase tracking-wider transition-all cursor-pointer ${
                        selectedCategory === cat.id
                          ? 'bg-[#1C1B18] text-[#F7F4EF]'
                          : 'bg-[#F7F4EF] text-[#666159] border border-[#DFD8CC] hover:border-[#1C1B18]'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Interactive Masterplan Grid: 7 Cols Map + 5 Cols Synchronized Detail Card */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left: Interactive Aerial Masterplan Map with Clickable Pins OR 3D Video Player */}
            <div className="lg:col-span-7 flex flex-col justify-between bg-[#F7F4EF] p-3 sm:p-4 rounded-lg border border-[#DFD8CC] shadow-md">
              {masterplanMode === 'video' ? (
                <div className="relative w-full aspect-[16/10] rounded overflow-hidden bg-[#151814]">
                  <video
                    src={MASTERPLAN_VIDEO}
                    controls
                    autoPlay
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 px-3 py-1.5 rounded bg-[#151814]/85 backdrop-blur-md text-[#F7F4EF] font-mono-spec text-[10px] tracking-wider flex items-center gap-2 border border-white/15">
                    <Film className="w-3.5 h-3.5 text-[#D9A86C]" />
                    <span>TERRENO 10.000 m² • REVEAL 3D VOLUMETRIA</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setMasterplanMode('map')}
                    className="absolute top-3 right-3 px-3 py-1.5 rounded bg-[#1C1B18]/80 hover:bg-[#1C1B18] text-white text-[11px] font-mono-spec uppercase tracking-wider border border-white/20 transition-all cursor-pointer"
                  >
                    Voltar aos Pontos 2D
                  </button>
                </div>
              ) : (
                <div className="relative w-full aspect-[16/10] rounded overflow-hidden bg-[#151814]">
                  <img
                    src="/media/masterplan/masterplan-3d-perspective.jpg"
                    alt="Implantação Aérea Residencial Inara"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-[#151814]/20" />

                  {/* Compass & Scale Stamp on Map */}
                  <div className="absolute top-3 left-3 px-3 py-1.5 rounded bg-[#151814]/80 backdrop-blur-md text-[#F7F4EF] font-mono-spec text-[10px] tracking-wider flex items-center gap-2 border border-white/15">
                    <Compass className="w-3.5 h-3.5 text-[#D9A86C]" />
                    <span>TERRENO 10.000 m² • 31 LOTES • TALATONA</span>
                  </div>

                  {/* Button to quickly watch 3D video on top of the map */}
                  <button
                    type="button"
                    onClick={() => setMasterplanMode('video')}
                    className="absolute top-3 right-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#B86B43] hover:bg-[#96522F] text-white text-[10px] font-mono-spec uppercase tracking-wider shadow-lg transition-all cursor-pointer"
                  >
                    <Play className="w-3 h-3 fill-current" />
                    <span>Ver Vídeo 3D</span>
                  </button>

                  {/* Clickable Numbered Hotspot Pins */}
                  {filteredHotspots.map((spot) => {
                    const isSelected = activeHotspot.id === spot.id;
                    return (
                      <button
                        key={spot.id}
                        type="button"
                        onClick={() => {
                          setActiveHotspot(spot);
                          setHotspotVideoActive(false);
                        }}
                        style={{
                          left: `${spot.coordinates.x}%`,
                          top: `${spot.coordinates.y}%`,
                        }}
                        className={`-translate-x-1/2 -translate-y-1/2 absolute z-20 flex items-center gap-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                          isSelected
                            ? 'bg-[#B86B43] text-white px-3 py-1.5 shadow-xl scale-110 ring-4 ring-white/80'
                            : 'bg-[#151814]/90 text-[#F7F4EF] hover:bg-[#B86B43] w-9 h-9 justify-center border border-white/60 hotspot-pulse'
                        }`}
                        aria-label={`Selecionar ponto ${spot.number}: ${spot.title}`}
                      >
                        <span className="font-mono-spec text-xs font-bold">{spot.number}</span>
                        {isSelected && (
                          <span className="text-[11px] font-medium whitespace-nowrap pr-1 hidden sm:inline">
                            {spot.title.split('&')[0]}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Bottom Quick-Select Strip for All 7 Pins */}
              <div className="mt-3 pt-3 border-t border-[#DFD8CC] grid grid-cols-2 sm:grid-cols-4 gap-2">
                {MASTERPLAN_HOTSPOTS.map((spot) => {
                  const isSelected = activeHotspot.id === spot.id && masterplanMode === 'map';
                  return (
                    <button
                      key={spot.id}
                      type="button"
                      onClick={() => {
                        setActiveHotspot(spot);
                        setMasterplanMode('map');
                        setHotspotVideoActive(false);
                      }}
                      className={`px-2.5 py-2 rounded text-left transition-all cursor-pointer flex items-center gap-2 ${
                        isSelected
                          ? 'bg-[#1C1B18] text-[#F7F4EF]'
                          : 'bg-[#EFEAE1]/70 hover:bg-[#EFEAE1] text-[#1C1B18]'
                      }`}
                    >
                      <span
                        className={`font-mono-spec text-[11px] px-1.5 py-0.5 rounded ${
                          isSelected ? 'bg-[#B86B43] text-white' : 'bg-[#DFD8CC] text-[#1C1B18]'
                        }`}
                      >
                        {spot.number}
                      </span>
                      <span className="text-xs font-medium truncate">{spot.title}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right: Synchronized Hotspot Detail Card */}
            <div className="lg:col-span-5 bg-[#F7F4EF] rounded-lg border border-[#DFD8CC] shadow-md overflow-hidden flex flex-col justify-between">
              <div>
                {/* Hotspot Photography or Video */}
                <div className="relative h-60 sm:h-64 overflow-hidden bg-[#151814]">
                  {activeHotspot.video && hotspotVideoActive ? (
                    <video
                      src={activeHotspot.video}
                      controls
                      autoPlay
                      loop
                      playsInline
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <img
                      src={activeHotspot.image}
                      alt={activeHotspot.title}
                      className="w-full h-full object-cover transition-all duration-500"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#151814]/80 via-transparent to-transparent pointer-events-none" />
                  
                  <div className="absolute top-4 left-4 flex items-center gap-2 z-10">
                    <span className="px-2.5 py-1 rounded bg-[#B86B43] text-white font-mono-spec text-xs font-bold">
                      PONTO {activeHotspot.number}
                    </span>
                    <span className="px-2.5 py-1 rounded bg-[#151814]/80 backdrop-blur-sm text-white font-mono-spec text-[11px] uppercase">
                      {activeHotspot.categoryLabel}
                    </span>
                  </div>

                  {activeHotspot.video && (
                    <div className="absolute top-4 right-4 z-10">
                      <button
                        type="button"
                        onClick={() => setHotspotVideoActive(!hotspotVideoActive)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#151814]/85 hover:bg-[#B86B43] text-white font-mono-spec text-[10px] uppercase tracking-wider border border-white/20 transition-all cursor-pointer shadow-md"
                      >
                        {hotspotVideoActive ? (
                          <>
                            <Eye className="w-3 h-3" />
                            <span>Ver Foto</span>
                          </>
                        ) : (
                          <>
                            <Play className="w-3 h-3 fill-current text-[#D9A86C]" />
                            <span>Ver Vídeo 4K</span>
                          </>
                        )}
                      </button>
                    </div>
                  )}

                  <div className="absolute bottom-4 left-4 right-4 text-white z-10">
                    <h3 className="font-serif-editorial text-2xl sm:text-3xl font-normal">
                      {activeHotspot.title}
                    </h3>
                  </div>
                </div>

                {/* Technical Specs Bar */}
                <div className="grid grid-cols-3 divide-x divide-[#DFD8CC] border-b border-[#DFD8CC] bg-[#EFEAE1]/60 font-mono-spec text-xs">
                  <div className="p-3">
                    <span className="text-[10px] text-[#666159] block">ÁREA DEDICADA</span>
                    <strong className="text-[#1C1B18]">{activeHotspot.area}</strong>
                  </div>
                  <div className="p-3">
                    <span className="text-[10px] text-[#666159] block">CAPACIDADE</span>
                    <strong className="text-[#1C1B18]">{activeHotspot.capacity}</strong>
                  </div>
                  <div className="p-3">
                    <span className="text-[10px] text-[#666159] block">FUNCIONAMENTO</span>
                    <strong className="text-[#2E5A3C]">{activeHotspot.schedule}</strong>
                  </div>
                </div>

                {/* Description & Highlights */}
                <div className="p-6 space-y-4">
                  <p className="text-sm text-[#666159] leading-relaxed">{activeHotspot.summary}</p>

                  <div className="space-y-2 pt-2">
                    <span className="font-mono-spec text-[11px] uppercase tracking-wider text-[#1C1B18] font-semibold block">
                      DIFERENCIAIS TÉCNICOS & EQUIPAMENTOS:
                    </span>
                    {activeHotspot.highlights.map((item, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-[#1C1B18]">
                        <CheckCircle2 className="w-4 h-4 text-[#3A4D3E] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer Navigation */}
              <div className="px-6 py-4 bg-[#EFEAE1] border-t border-[#DFD8CC] flex items-center justify-between">
                <span className="font-mono-spec text-xs text-[#666159]">
                  Espaço entregue 100% equipado e decorado
                </span>
                <a
                  href="#agendar"
                  className="inline-flex items-center gap-1.5 text-xs font-mono-spec uppercase tracking-wider font-semibold text-[#B86B43] hover:text-[#1C1B18] transition-colors"
                >
                  <span>Conhecer Pessoalmente</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      )}

      {/* =====================================================================
          4. INTERACTIVE TYPOLOGY & FLOOR PLAN SELECTOR (#plantas)
      ===================================================================== */}
      {(activePage === 'plantas' || activePage === 'tudo') && (
        <>
          <section id="plantas" className="py-20 sm:py-28 px-4 sm:px-8 max-w-[1380px] mx-auto space-y-12">
        {/* Header & Typology Selector Tabs */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-[#DFD8CC] pb-8">
          <div>
            <span className="font-mono-spec text-xs uppercase tracking-[0.2em] text-[#B86B43] block">
              03 • PLANTAS TÉCNICAS & TIPOLOGIAS EXCLUSIVAS
            </span>
            <h2 className="font-serif-editorial text-3xl sm:text-5xl text-[#1C1B18] font-normal mt-2">
              Quatro Formas de Habitar o Residencial Inara
            </h2>
            <p className="text-sm sm:text-base text-[#666159] mt-2 max-w-2xl">
              Selecione a tipologia ideal para a sua família ou portfólio de investimento. Interaja
              com a planta técnica cotada ou visualize os acabamentos interiores.
            </p>
          </div>

          {/* Typology Tabs */}
          <div className="grid grid-cols-2 sm:flex items-center gap-2 bg-[#EFEAE1] p-1.5 rounded-lg border border-[#DFD8CC]">
            {TYPOLOGIES.map((t) => {
              const active = activeTypology.id === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => handleSelectTypology(t)}
                  className={`px-4 py-2.5 rounded-md text-xs font-mono-spec uppercase tracking-wider transition-all cursor-pointer ${
                    active
                      ? 'bg-[#1C1B18] text-[#F7F4EF] shadow font-semibold'
                      : 'text-[#666159] hover:text-[#1C1B18]'
                  }`}
                >
                  <span className="block">{t.code}</span>
                  <span className="text-[10px] opacity-75">{t.totalArea} m²</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Typology Main Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left 7 Columns: Interactive 2D Blueprint SVG OR Interior/Exterior Photography */}
          <div className="lg:col-span-7 space-y-4">
            {/* View Mode Switcher Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 bg-[#EFEAE1] px-4 py-2.5 rounded-lg border border-[#DFD8CC]">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => setViewMode('blueprint')}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded text-xs font-mono-spec uppercase tracking-wider transition-colors cursor-pointer ${
                    viewMode === 'blueprint'
                      ? 'bg-[#B86B43] text-white font-medium shadow-sm'
                      : 'bg-white/80 text-[#1C1B18] hover:bg-white'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>Planta Técnica 2D</span>
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('video')}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded text-xs font-mono-spec uppercase tracking-wider transition-colors cursor-pointer ${
                    viewMode === 'video'
                      ? 'bg-[#B86B43] text-white font-medium shadow-sm'
                      : 'bg-white/80 text-[#1C1B18] hover:bg-white'
                  }`}
                >
                  <Play className="w-3.5 h-3.5" />
                  <span>Vídeo 3D do Layout</span>
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('insolacao')}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded text-xs font-mono-spec uppercase tracking-wider transition-colors cursor-pointer ${
                    viewMode === 'insolacao'
                      ? 'bg-[#B86B43] text-white font-medium shadow-sm'
                      : 'bg-white/80 text-[#1C1B18] hover:bg-white'
                  }`}
                >
                  <Sun className="w-3.5 h-3.5" />
                  <span>Insolação & Piscina Privativa</span>
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('interior')}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded text-xs font-mono-spec uppercase tracking-wider transition-colors cursor-pointer ${
                    viewMode === 'interior'
                      ? 'bg-[#B86B43] text-white font-medium shadow-sm'
                      : 'bg-white/80 text-[#1C1B18] hover:bg-white'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Interior Decorado</span>
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('exterior')}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded text-xs font-mono-spec uppercase tracking-wider transition-colors cursor-pointer ${
                    viewMode === 'exterior'
                      ? 'bg-[#B86B43] text-white font-medium shadow-sm'
                      : 'bg-white/80 text-[#1C1B18] hover:bg-white'
                  }`}
                >
                  <Building className="w-3.5 h-3.5" />
                  <span>Fachada Frontal</span>
                </button>
              </div>

              <span className="font-mono-spec text-xs text-[#2E5A3C] font-medium">
                ● {activeTypology.availableUnits} de {activeTypology.totalUnits} unidades disponíveis
              </span>
            </div>

            {/* Conditional Render: Interactive SVG Floorplan vs 3D Video Loop vs Insolacao vs Photo */}
            {viewMode === 'blueprint' ? (
              <div className="rounded-lg overflow-hidden border border-[#DFD8CC] shadow-md bg-[#F7F4EF]">
                <ArchitecturalFloorplanSVG
                  typology={activeTypology}
                  activeRoom={activeRoom}
                  onSelectRoom={setActiveRoom}
                />
              </div>
            ) : viewMode === 'video' ? (
              <div className="relative rounded-lg overflow-hidden border border-[#DFD8CC] bg-[#151814] aspect-[16/10] shadow-xl group">
                <video
                  src="/media/videos/house-layout-reveal-loop.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  controls
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#151814]/80 via-transparent to-transparent pointer-events-none" />

                <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-auto">
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#151814]/85 backdrop-blur-md text-[#F7F4EF] font-mono-spec text-[11px] uppercase tracking-wider border border-white/20">
                    <span className="w-2 h-2 rounded-full bg-[#B86B43] animate-pulse" />
                    <span>VÍDEO 3D DO LAYOUT A ROLAR CONTINUAMENTE</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => setViewMode('blueprint')}
                    className="px-3 py-1.5 rounded bg-white/20 hover:bg-white/30 backdrop-blur-md text-white text-xs font-mono-spec uppercase tracking-wider cursor-pointer"
                  >
                    Ver Planta Técnica 2D
                  </button>
                </div>

                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-white pointer-events-none">
                  <div>
                    <span className="font-mono-spec text-[10px] uppercase tracking-widest text-[#D9A86C] block">
                      REVELAÇÃO VOLUMÉTRICA 3D • MORADIA T4 DUPLEX (217 m²)
                    </span>
                    <h4 className="font-serif-editorial text-2xl">{activeTypology.name}</h4>
                    <p className="text-xs text-white/80 max-w-lg mt-1 font-light">
                      Vídeo 3D oficial demonstrando a transição fluida entre R/C (sala, escritório, cozinha) e 1º Piso (4 suítes com varandas).
                    </p>
                  </div>
                </div>
              </div>
            ) : viewMode === 'insolacao' ? (
              <div className="relative rounded-lg overflow-hidden border border-[#DFD8CC] bg-[#151814] aspect-[16/10] shadow-xl group">
                <img
                  src="/media/concept/inara-insolacao-ventilacao.jpg"
                  alt="Insolação Natural e Ventilação Cruzada — Quintal Privativo com Piscina"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#151814]/85 via-transparent to-transparent" />
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                  <span className="px-3 py-1.5 rounded-full bg-[#151814]/85 backdrop-blur-md text-[#F7F4EF] font-mono-spec text-[11px] uppercase tracking-wider border border-white/20">
                    🌿 INSOLAÇÃO NATURAL & VENTILAÇÃO CRUZADA
                  </span>
                  <button
                    type="button"
                    onClick={() => setViewMode('blueprint')}
                    className="px-3 py-1.5 rounded bg-white/20 hover:bg-white/30 backdrop-blur-md text-white text-xs font-mono-spec uppercase tracking-wider cursor-pointer"
                  >
                    Voltar à Planta 2D
                  </button>
                </div>
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-white">
                  <div>
                    <span className="font-mono-spec text-[10px] uppercase tracking-widest text-[#D9A86C] block">
                      ORIENTAÇÃO SOLAR NORTE-SUL • QUINTAL COM PISCINA PRIVATIVA
                    </span>
                    <h4 className="font-serif-editorial text-2xl">
                      Fachada Traseira & Lazer Privativo das 30 Moradias
                    </h4>
                    <p className="text-xs text-white/80 max-w-lg mt-1 font-light">
                      Cada moradia T4 possui quintal ajardinado, piscina privativa e brises em madeira Cumaru, maximizando a luz natural e a ventilação cruzada constante de Talatona.
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="relative rounded-lg overflow-hidden border border-[#DFD8CC] bg-[#151814] aspect-[16/10]">
                <img
                  src={
                    viewMode === 'interior'
                      ? activeTypology.interiorImage
                      : activeTypology.exteriorImage
                  }
                  alt={activeTypology.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#151814]/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-white">
                  <div>
                    <span className="font-mono-spec text-[10px] uppercase tracking-widest text-[#D9A86C] block">
                      {viewMode === 'interior'
                        ? 'ACABAMENTOS DE SÉRIE • DECORADO MODELO'
                        : 'ARQUITETURA EXTERIOR & VOLUMETRIA'}
                    </span>
                    <h4 className="font-serif-editorial text-2xl">{activeTypology.name}</h4>
                  </div>
                  <button
                    type="button"
                    onClick={() => setViewMode('blueprint')}
                    className="px-3 py-1.5 rounded bg-white/20 hover:bg-white/30 backdrop-blur-md text-xs font-mono-spec uppercase tracking-wider cursor-pointer"
                  >
                    Voltar à Planta 2D
                  </button>
                </div>
              </div>
            )}

            {/* Room Quick-Selector Pills */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="text-xs font-mono-spec text-[#666159] mr-1">DIVISÕES:</span>
              {activeTypology.rooms.map((room, idx) => (
                <button
                  key={room.id}
                  type="button"
                  onClick={() => {
                    setActiveRoom(room);
                    setViewMode('blueprint');
                  }}
                  className={`px-3 py-1.5 rounded text-xs font-mono-spec transition-colors cursor-pointer ${
                    activeRoom.id === room.id
                      ? 'bg-[#B86B43] text-white font-medium'
                      : 'bg-[#EFEAE1] text-[#1C1B18] hover:border-[#B86B43] border border-[#DFD8CC]'
                  }`}
                >
                  0{idx + 1}. {room.name} ({room.area})
                </button>
              ))}
            </div>
          </div>

          {/* Right 5 Columns: Architectural Specification Sheet & Payment Simulator */}
          <div className="lg:col-span-5 bg-[#EFEAE1] rounded-lg border border-[#DFD8CC] p-6 sm:p-8 space-y-6">
            <div>
              <span className="inline-block px-2.5 py-1 rounded bg-[#B86B43]/15 text-[#B86B43] font-mono-spec text-[11px] font-semibold uppercase tracking-wider">
                {activeTypology.badge}
              </span>
              <h3 className="font-serif-editorial text-3xl sm:text-4xl text-[#1C1B18] mt-2">
                {activeTypology.name}
              </h3>
              <p className="text-sm text-[#666159] mt-2 leading-relaxed">
                {activeTypology.description}
              </p>
            </div>

            {/* Key Architectural Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="bg-[#F7F4EF] p-3 rounded border border-[#DFD8CC]">
                <Maximize2 className="w-4 h-4 text-[#B86B43] mb-1" />
                <span className="font-mono-spec text-[10px] text-[#666159] block">ÁREA TOTAL</span>
                <strong className="font-mono-spec text-sm text-[#1C1B18]">
                  {activeTypology.totalArea} m²
                </strong>
              </div>
              <div className="bg-[#F7F4EF] p-3 rounded border border-[#DFD8CC]">
                <BedDouble className="w-4 h-4 text-[#B86B43] mb-1" />
                <span className="font-mono-spec text-[10px] text-[#666159] block">SUÍTES</span>
                <strong className="font-mono-spec text-sm text-[#1C1B18]">
                  {activeTypology.suites} Suítes
                </strong>
              </div>
              <div className="bg-[#F7F4EF] p-3 rounded border border-[#DFD8CC]">
                <Bath className="w-4 h-4 text-[#B86B43] mb-1" />
                <span className="font-mono-spec text-[10px] text-[#666159] block">BANHOS</span>
                <strong className="font-mono-spec text-sm text-[#1C1B18]">
                  {activeTypology.bathrooms} WCs
                </strong>
              </div>
              <div className="bg-[#F7F4EF] p-3 rounded border border-[#DFD8CC]">
                <Car className="w-4 h-4 text-[#B86B43] mb-1" />
                <span className="font-mono-spec text-[10px] text-[#666159] block">GARAGEM</span>
                <strong className="font-mono-spec text-sm text-[#1C1B18]">
                  {activeTypology.parking} Vagas EV
                </strong>
              </div>
            </div>

            {/* Included Highlights */}
            <div className="space-y-2 border-t border-[#DFD8CC] pt-4">
              <span className="font-mono-spec text-[11px] uppercase tracking-wider text-[#1C1B18] font-semibold block">
                ESPECIFICAÇÕES DESTA UNIDADE:
              </span>
              {activeTypology.features.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-[#666159]">
                  <CheckCircle2 className="w-4 h-4 text-[#3A4D3E] shrink-0 mt-0.5" />
                  <span className="text-[#1C1B18]/90">{feat}</span>
                </div>
              ))}
            </div>

            {/* Interactive Launch Investment & Payment Plan Simulator */}
            <div className="bg-[#F7F4EF] p-5 rounded-lg border border-[#DFD8CC] space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-mono-spec text-[10px] uppercase tracking-widest text-[#666159] block">
                    VALOR DE TABELA DE LANÇAMENTO
                  </span>
                  <strong className="font-serif-editorial text-3xl text-[#1C1B18]">
                    {formatPrice(activeTypology.basePriceEUR, currency)}
                  </strong>
                </div>
                <span className="px-2.5 py-1 rounded bg-[#2E5A3C]/15 text-[#2E5A3C] font-mono-spec text-[11px] font-medium">
                  Tabela Fase I
                </span>
              </div>

              {/* Downpayment Slider */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono-spec">
                  <span className="text-[#666159]">Simular Sinal de Reserva ({downPaymentPercent}%):</span>
                  <strong className="text-[#B86B43]">
                    {formatPrice(downPaymentAmount, currency)}
                  </strong>
                </div>
                <input
                  type="range"
                  min={10}
                  max={50}
                  step={5}
                  value={downPaymentPercent}
                  onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                  className="w-full accent-[#B86B43] cursor-pointer"
                />
                <div className="grid grid-cols-2 gap-2 pt-2 text-[11px] font-mono-spec text-[#666159]">
                  <div className="p-2 rounded bg-[#EFEAE1]">
                    <span className="block text-[10px]">DURANTE OBRA (30%)</span>
                    <strong className="text-[#1C1B18]">
                      {formatPrice(constructionAmount, currency)}
                    </strong>
                  </div>
                  <div className="p-2 rounded bg-[#EFEAE1]">
                    <span className="block text-[10px]">CHAVE / FINANC. ({70 - downPaymentPercent}%)</span>
                    <strong className="text-[#1C1B18]">
                      {formatPrice(finalBalanceAmount, currency)}
                    </strong>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleRequestTypologyProposal(activeTypology)}
                className="w-full py-3.5 px-5 rounded bg-[#1C1B18] hover:bg-[#B86B43] text-[#F7F4EF] text-xs font-mono-spec uppercase tracking-wider font-medium transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Solicitar Planta Cotada & Reserva ({activeTypology.code})</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Program Inara Tailor-Made Acabamentos Configurator */}
      <HomeConfiguratorSection
        currency={currency}
        onSaveConfigurationToLead={handleSaveConfigurationToLead}
      />
      </>
      )}

      {/* =====================================================================
          5. CURATED BENTO VISUAL GALLERY & LIGHTBOX (#lazer)
      ===================================================================== */}
      {(activePage === 'home' || activePage === 'lazer' || activePage === 'tudo') && (
      <section id="lazer" className="py-20 sm:py-28 bg-[#151814] text-[#F7F4EF]">
        <div className="max-w-[1380px] mx-auto px-4 sm:px-8 space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="font-mono-spec text-xs uppercase tracking-[0.2em] text-[#D9A86C] block">
                04 • GALERIA ARQUITETÓNICA & VIVER COMO NUM RESORT
              </span>
              <h2 className="font-serif-editorial text-3xl sm:text-5xl text-[#F7F4EF] font-normal mt-2">
                A estética da tranquilidade em cada detalhe
              </h2>
            </div>
            <p className="text-sm text-white/70 max-w-md">
              Clique em qualquer fotografia para ampliar em ecrã inteiro e inspecionar a
              materialidade das fachadas, piscinas e interiores do Residencial Inara.
            </p>
          </div>

          {/* 5-Item Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 auto-rows-[280px]">
            {GALLERY_ITEMS.map((item) => (
              <div
                key={item.id}
                onClick={() => setLightboxItem(item)}
                className={`${item.spanClass} relative rounded-lg overflow-hidden border border-white/10 group cursor-pointer`}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#151814]/90 via-[#151814]/20 to-transparent" />
                <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/50 backdrop-blur-md border border-white/20 flex items-center justify-center text-white opacity-80 group-hover:opacity-100 group-hover:bg-[#B86B43] transition-all">
                  <Maximize2 className="w-4 h-4" />
                </div>
                <div className="absolute bottom-5 left-5 right-5">
                  <span className="font-mono-spec text-[10px] uppercase tracking-widest text-[#D9A86C] block">
                    {item.category}
                  </span>
                  <h3 className="font-serif-editorial text-2xl text-white mt-0.5">{item.title}</h3>
                  <p className="text-xs text-white/75 mt-1 line-clamp-2">{item.caption}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Two Official Project Videos Showcase */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            {/* Masterplan Video Card */}
            <div
              onClick={() =>
                setVideoModal({
                  title: 'Vídeo 3D Oficial — Implantação e Volumetria',
                  subtitle: 'TERRENO 10.000 m² • 31 LOTES • TALATONA',
                  url: MASTERPLAN_VIDEO,
                })
              }
              className="relative rounded-lg overflow-hidden border border-white/15 bg-white/5 p-4 sm:p-5 group cursor-pointer hover:border-[#D9A86C]/60 transition-all flex flex-col justify-between"
            >
              <div className="relative aspect-[16/9] rounded overflow-hidden bg-black/60 mb-4">
                <img
                  src="/media/facades/exterior-sunset-2.jpg"
                  alt="Pré-visualização do Vídeo 3D do Masterplan"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-[#151814]/50 group-hover:bg-[#151814]/30 transition-colors flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-[#B86B43] text-white flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                    <Play className="w-6 h-6 fill-current ml-0.5" />
                  </div>
                </div>
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-[#151814]/80 backdrop-blur-md text-[#F7F4EF] font-mono-spec text-[10px] uppercase tracking-wider flex items-center gap-1.5 border border-white/15">
                  <Film className="w-3 h-3 text-[#D9A86C]" />
                  <span>VÍDEO 3D EXCLUSIVO</span>
                </div>
              </div>
              <div>
                <span className="font-mono-spec text-[10px] uppercase tracking-widest text-[#D9A86C] block">
                  TOPOGRAFIA & ARQUITETURA
                </span>
                <h4 className="font-serif-editorial text-2xl text-white mt-1">
                  Implantação 10.000 m² • 30 Moradias & Clube Lote 31
                </h4>
                <p className="text-xs text-white/70 mt-2 leading-relaxed">
                  Apresentação tridimensional completa mostrando a distribuição das 30 moradias T4 Duplex, os 2.391 m² de arruamentos internos pavimentados e o clube comunitário com piscina e lazer no Lote 31.
                </p>
              </div>
            </div>

            {/* Pool Deck Video Card */}
            <div
              onClick={() =>
                setVideoModal({
                  title: 'Vídeo da Piscina de Borda Infinita & Deck Solarium',
                  subtitle: 'EXPERIÊNCIA SENSORIAL DE RESORT PRIVADO',
                  url: POOL_VIDEO,
                })
              }
              className="relative rounded-lg overflow-hidden border border-white/15 bg-white/5 p-4 sm:p-5 group cursor-pointer hover:border-[#D9A86C]/60 transition-all flex flex-col justify-between"
            >
              <div className="relative aspect-[16/9] rounded overflow-hidden bg-black/60 mb-4">
                <img
                  src="/media/pool/pool-club-private.jpg"
                  alt="Pré-visualização do Vídeo da Piscina"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-[#151814]/50 group-hover:bg-[#151814]/30 transition-colors flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-[#B86B43] text-white flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                    <Play className="w-6 h-6 fill-current ml-0.5" />
                  </div>
                </div>
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-[#151814]/80 backdrop-blur-md text-[#F7F4EF] font-mono-spec text-[10px] uppercase tracking-wider flex items-center gap-1.5 border border-white/15">
                  <Film className="w-3 h-3 text-[#D9A86C]" />
                  <span>VÍDEO 4K CINEMATOGRÁFICO</span>
                </div>
              </div>
              <div>
                <span className="font-mono-spec text-[10px] uppercase tracking-widest text-[#D9A86C] block">
                  LAZER DE RESORT
                </span>
                <h4 className="font-serif-editorial text-2xl text-white mt-1">
                  Piscina de Borda Infinita & Deck Solarium
                </h4>
                <p className="text-xs text-white/70 mt-2 leading-relaxed">
                  Experiência imersiva junto à raia de 25m em pedra vulcânica natural, deck em madeira Cumaru e áreas de relaxamento rodeadas pelo verde nativo.
                </p>
              </div>
            </div>
          </div>

          {/* Full Interior Decorado 43-Photo Collection */}
          <div className="pt-8 border-t border-white/15 space-y-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <span className="font-mono-spec text-xs uppercase tracking-[0.2em] text-[#D9A86C] block">
                  ACABAMENTOS & MOBILIÁRIO AUTORAL
                </span>
                <h3 className="font-serif-editorial text-2xl sm:text-4xl text-white mt-1">
                  Interiores Decorados — Coleção de 43 Ambientes
                </h3>
                <p className="text-xs sm:text-sm text-white/70 mt-1 max-w-2xl">
                  Cada detalhe reflete o design orgânico contemporâneo: pedra travertino levigada, carvalho natural, iluminação zenital difusa e integração total com as varandas.
                </p>
              </div>
              <div className="font-mono-spec text-xs text-[#D9A86C] bg-white/5 border border-white/15 px-3 py-1.5 rounded self-start md:self-auto">
                Exibindo {Math.min(decoradoVisibleCount, INTERIOR_DECORADO_IMAGES.length)} de 43 Fotografias
              </div>
            </div>

            {/* Grid of Decorado Photos */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {INTERIOR_DECORADO_IMAGES.slice(0, decoradoVisibleCount).map((photo, idx) => (
                <div
                  key={photo.id}
                  onClick={() => setSelectedDecoradoIndex(idx)}
                  className="group relative aspect-[4/3] rounded-lg overflow-hidden border border-white/10 bg-white/5 cursor-pointer"
                >
                  <img
                    src={photo.src}
                    alt={photo.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#151814]/90 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-white">
                    <span className="font-mono-spec text-[10px] text-white/90 truncate">
                      Ambiente {String(idx + 1).padStart(2, '0')}
                    </span>
                    <Maximize2 className="w-3.5 h-3.5 text-[#D9A86C] opacity-75 group-hover:opacity-100 shrink-0" />
                  </div>
                </div>
              ))}
            </div>

            {/* Load More Button */}
            <div className="flex justify-center pt-2">
              {decoradoVisibleCount < INTERIOR_DECORADO_IMAGES.length ? (
                <button
                  type="button"
                  onClick={() => setDecoradoVisibleCount((prev) => Math.min(prev + 12, INTERIOR_DECORADO_IMAGES.length))}
                  className="px-6 py-3 rounded bg-[#B86B43] hover:bg-[#96522F] text-white font-mono-spec text-xs uppercase tracking-wider font-medium transition-all shadow-md cursor-pointer"
                >
                  Carregar Mais Ambientes ({INTERIOR_DECORADO_IMAGES.length - decoradoVisibleCount} restantes)
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setDecoradoVisibleCount(12)}
                  className="px-6 py-3 rounded bg-white/10 hover:bg-white/20 text-white font-mono-spec text-xs uppercase tracking-wider transition-all border border-white/20 cursor-pointer"
                >
                  Recolher para 12 Ambientes
                </button>
              )}
            </div>
          </div>

          {/* Smart Condominium Infrastructure Strip */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-6 border-t border-white/15">
            <div className="p-5 rounded-lg bg-white/5 border border-white/10 flex items-start gap-3.5">
              <Lock className="w-5 h-5 text-[#D9A86C] shrink-0 mt-0.5" />
              <div>
                <h4 className="font-serif-editorial text-lg text-white">App Exclusiva Inara</h4>
                <p className="text-xs text-white/65 mt-1">
                  Convites QR Code para visitantes, reserva do Espaço Gourmet e quadra de Padel pelo
                  telemóvel.
                </p>
              </div>
            </div>
            <div className="p-5 rounded-lg bg-white/5 border border-white/10 flex items-start gap-3.5">
              <Zap className="w-5 h-5 text-[#D9A86C] shrink-0 mt-0.5" />
              <div>
                <h4 className="font-serif-editorial text-lg text-white">Autonomia Energética</h4>
                <p className="text-xs text-white/65 mt-1">
                  Gerador silencioso que alimenta 100% das áreas comuns e residências em caso de
                  falha da rede.
                </p>
              </div>
            </div>
            <div className="p-5 rounded-lg bg-white/5 border border-white/10 flex items-start gap-3.5">
              <Droplets className="w-5 h-5 text-[#D9A86C] shrink-0 mt-0.5" />
              <div>
                <h4 className="font-serif-editorial text-lg text-white">Reserva Hídrica & Furo</h4>
                <p className="text-xs text-white/65 mt-1">
                  Estação própria de tratamento e filtragem de água com autonomia superior a 72
                  horas.
                </p>
              </div>
            </div>
            <div className="p-5 rounded-lg bg-white/5 border border-white/10 flex items-start gap-3.5">
              <Wifi className="w-5 h-5 text-[#D9A86C] shrink-0 mt-0.5" />
              <div>
                <h4 className="font-serif-editorial text-lg text-white">Wi-Fi 6 no Parque</h4>
                <p className="text-xs text-white/65 mt-1">
                  Cobertura de fibra ótica empresarial em todo o clube, piscina, coworking e jardins.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      )}

      {/* Home Navigation Portal: 4 Dedicated Chapters for Início */}
      {activePage === 'home' && (
        <section className="py-16 sm:py-24 px-4 sm:px-8 max-w-[1380px] mx-auto space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#DFD8CC] pb-6">
            <div>
              <span className="font-mono-spec text-xs uppercase tracking-[0.2em] text-[#B86B43] block">
                EXPLORE AS OUTRAS ÁREAS DO EMPREENDIMENTO
              </span>
              <h2 className="font-serif-editorial text-3xl sm:text-5xl text-[#1C1B18] font-normal mt-2">
                Conheça Cada Detalhe do Residencial Inara
              </h2>
            </div>
            <button
              type="button"
              onClick={() => navigateToPage('tudo')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded bg-[#1C1B18] hover:bg-[#B86B43] text-white text-xs font-mono-spec uppercase tracking-wider font-medium cursor-pointer transition-colors shadow-sm self-start md:self-auto"
            >
              <span>📄 Ver Apresentação Contínua</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1: Conceito */}
            <div
              onClick={() => navigateToPage('conceito')}
              className="group cursor-pointer rounded-2xl overflow-hidden border border-[#DFD8CC] hover:border-[#B86B43] bg-white transition-all duration-300 hover:shadow-xl flex flex-col"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-[#151814]">
                <img
                  src="/media/concept/inara-insolacao-ventilacao.jpg"
                  alt="O Conceito Arquitetónico"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white font-mono-spec text-[10px] uppercase tracking-wider border border-white/20">
                  01 • ARQUITETURA
                </span>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="font-serif-editorial text-2xl text-[#1C1B18] group-hover:text-[#B86B43] transition-colors">
                    O Conceito & Biofilia
                  </h3>
                  <p className="text-xs text-[#666159] mt-2 leading-relaxed">
                    Insolação natural calculada, ventilação cruzada permanente e brises em madeira Cumaru nas 30 moradias exclusivas.
                  </p>
                </div>
                <div className="inline-flex items-center gap-2 text-xs font-mono-spec uppercase tracking-wider font-semibold text-[#B86B43]">
                  <span>Abrir O Conceito</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            </div>

            {/* Card 2: Implantação */}
            <div
              onClick={() => navigateToPage('implantacao')}
              className="group cursor-pointer rounded-2xl overflow-hidden border border-[#DFD8CC] hover:border-[#B86B43] bg-white transition-all duration-300 hover:shadow-xl flex flex-col"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-[#151814]">
                <img
                  src="/media/hero/inara-hero-perspective.jpg"
                  alt="Implantação & Masterplan"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white font-mono-spec text-[10px] uppercase tracking-wider border border-white/20">
                  02 • MASTERPLAN
                </span>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="font-serif-editorial text-2xl text-[#1C1B18] group-hover:text-[#B86B43] transition-colors">
                    Implantação Geral (10.000 m²)
                  </h3>
                  <p className="text-xs text-[#666159] mt-2 leading-relaxed">
                    31 lotes nobres com alamedas arborizadas, portaria blindada 24h com eclusa e Clube Privado no Lote 31.
                  </p>
                </div>
                <div className="inline-flex items-center gap-2 text-xs font-mono-spec uppercase tracking-wider font-semibold text-[#B86B43]">
                  <span>Ver Masterplan 3D</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            </div>

            {/* Card 3: Plantas & Tipologias */}
            <div
              onClick={() => navigateToPage('plantas')}
              className="group cursor-pointer rounded-2xl overflow-hidden border border-[#DFD8CC] hover:border-[#B86B43] bg-white transition-all duration-300 hover:shadow-xl flex flex-col"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-[#151814]">
                <img
                  src="/media/hero/inara-hero-daylight.jpg"
                  alt="Plantas & Tipologias"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white font-mono-spec text-[10px] uppercase tracking-wider border border-white/20">
                  03 • PLANTAS TÉCNICAS 2D
                </span>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="font-serif-editorial text-2xl text-[#1C1B18] group-hover:text-[#B86B43] transition-colors">
                    Plantas Técnicas & Modelos T4
                  </h3>
                  <p className="text-xs text-[#666159] mt-2 leading-relaxed">
                    Planta Técnica 2D cotada, vídeo 3D de revelação volumétrica, simulador financeiro e configurador de acabamentos.
                  </p>
                </div>
                <div className="inline-flex items-center gap-2 text-xs font-mono-spec uppercase tracking-wider font-semibold text-[#B86B43]">
                  <span>Inspecionar Plantas 2D</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            </div>

            {/* Card 4: Localização & Agendamento */}
            <div
              onClick={() => navigateToPage('localizacao')}
              className="group cursor-pointer rounded-2xl overflow-hidden border border-[#DFD8CC] hover:border-[#B86B43] bg-white transition-all duration-300 hover:shadow-xl flex flex-col"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-[#151814]">
                <img
                  src="/media/hero/inara-hero-twilight.jpg"
                  alt="Localização & Visita"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white font-mono-spec text-[10px] uppercase tracking-wider border border-white/20">
                  04 • TALATONA & VISITA VIP
                </span>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="font-serif-editorial text-2xl text-[#1C1B18] group-hover:text-[#B86B43] transition-colors">
                    Localização & Visita na Via A4A
                  </h3>
                  <p className="text-xs text-[#666159] mt-2 leading-relaxed">
                    Via A4A a 2 min do Talatona Plaza e Morabeza. Matriz de acessos e agendamento presencial no stand.
                  </p>
                </div>
                <div className="inline-flex items-center gap-2 text-xs font-mono-spec uppercase tracking-wider font-semibold text-[#B86B43]">
                  <span>Ver Localização & Agendar</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* =====================================================================
          6. LOCATION, PROXIMITY MATRIX & CONSTRUCTION STATUS (#localizacao)
      ===================================================================== */}
      {(activePage === 'localizacao' || activePage === 'tudo') && (
        <>
          <section id="localizacao" className="py-20 sm:py-28 px-4 sm:px-8 max-w-[1380px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left 6 Cols: Neighborhood Proximity & Architectural Radar Map */}
          <div className="lg:col-span-6 space-y-6">
            <span className="font-mono-spec text-xs uppercase tracking-[0.2em] text-[#B86B43] block">
              05 • LOCALIZAÇÃO PRIVILEGIADA & ENVOLVENTE NOBRE
            </span>
            <h2 className="font-serif-editorial text-3xl sm:text-5xl text-[#1C1B18] font-normal">
              Localização privilegiada na Via A4A em Talatona.
            </h2>
            <p className="text-sm sm:text-base text-[#666159] leading-relaxed">
              Situado na <strong className="text-[#1C1B18]">Via A4A (Estrada do Rio Cambambe)</strong>, Talhão 205/09 (a Noroeste do Condomínio Morabeza), no Bairro de Talatona, Luanda. Acesso asfaltado direto ligando Talatona à Avenida Luanda Sul e à Rua do Kamorteiro, a poucos minutos dos principais centros empresariais, comerciais e de ensino.
            </p>

            {/* Proximity Time Matrix from Presentation PDF */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {[
                {
                  time: '02 MIN',
                  place: 'Condomínio Morabeza & Talatona Plaza',
                  desc: 'Vizinhança nobre de embaixadas e condomínios',
                },
                {
                  time: '04 MIN',
                  place: 'Belas Shopping & Supermercados',
                  desc: 'Centros comerciais, farmácias e restauração',
                },
                {
                  time: '05 MIN',
                  place: 'CCT (Convenções) & Hotel HCTA',
                  desc: 'Eventos corporativos e hotelaria de prestígio',
                },
                {
                  time: '06 MIN',
                  place: 'Escola Portuguesa & Colégios Internacionais',
                  desc: 'Ensino internacional de excelência para a família',
                },
                {
                  time: '08 MIN',
                  place: 'SIAC Talatona & Inara Business Park',
                  desc: 'Serviços administrativos e polos empresariais',
                },
                {
                  time: '15 KM',
                  place: 'Aeroporto Internacional 4 de Fevereiro',
                  desc: 'Acesso rodoviário rápido pela Via Expressa',
                },
              ].map((loc, i) => (
                <div
                  key={i}
                  className="p-4 rounded-lg bg-[#EFEAE1] border border-[#DFD8CC] flex items-start gap-3.5"
                >
                  <span className="px-2.5 py-1 rounded bg-[#1C1B18] text-[#D9A86C] font-mono-spec text-xs font-bold shrink-0">
                    {loc.time}
                  </span>
                  <div>
                    <strong className="text-sm text-[#1C1B18] block">{loc.place}</strong>
                    <span className="text-xs text-[#666159]">{loc.desc}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Legal Coordinates Card */}
            <div className="p-4 rounded-lg bg-[#EFEAE1]/70 border border-[#DFD8CC] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs font-mono-spec">
              <div>
                <span className="text-[#666159] block text-[10px]">REGISTO PREDIAL OFICIAL:</span>
                <strong className="text-[#1C1B18]">Prédio nº 1062-Talatona da 2ª Secção (Luanda)</strong>
              </div>
              <div className="sm:text-right">
                <span className="text-[#666159] block text-[10px]">COORDENADAS GPS:</span>
                <strong className="text-[#B86B43]">8º55&apos;33.33&quot;S; 13º11&apos;40.18&quot;E</strong>
              </div>
            </div>
          </div>

          {/* Right 6 Cols: Transparent Construction Progress & Quality Assurance */}
          <div className="lg:col-span-6 bg-[#EFEAE1] p-6 sm:p-8 rounded-lg border border-[#DFD8CC] space-y-6">
            <div className="flex items-center justify-between border-b border-[#DFD8CC] pb-4">
              <div>
                <span className="font-mono-spec text-[11px] uppercase tracking-widest text-[#2E5A3C] font-semibold block">
                  PROMOTOR & PROJETO LEGALIZADO
                </span>
                <h3 className="font-serif-editorial text-2xl sm:text-3xl text-[#1C1B18]">
                  F.I.P. – Finest Investment Partners
                </h3>
              </div>
              <div className="text-right font-mono-spec">
                <span className="text-[10px] text-[#666159] block">VGV GLOBAL AVALIADO</span>
                <strong className="text-sm text-[#B86B43]">20.583.500.000 AOA</strong>
              </div>
            </div>

            {/* Progress Bars */}
            <div className="space-y-4">
              {[
                { label: 'Direito de Superfície & Registo Predial (Prédio 1062)', pct: 100 },
                { label: 'Projeto Urbanístico de Loteamento (31 Lotes)', pct: 100 },
                { label: 'Peças Técnicas e Arquitetura Moradias T4 Duplex (217 m²)', pct: 100 },
                { label: 'Delimitação Perimetral e Muro do Terreno (10.000 m²)', pct: 100 },
                { label: 'Infraestruturas Urbanas (Água, Esgotos e Eletricidade)', pct: 85 },
              ].map((step, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex justify-between text-xs font-mono-spec">
                    <span className="text-[#1C1B18] font-medium">{step.label}</span>
                    <span className="text-[#B86B43] font-bold">{step.pct}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-[#DFD8CC] overflow-hidden">
                    <div
                      className="h-full rounded-full bg-[#3A4D3E] transition-all duration-700"
                      style={{ width: `${step.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 rounded bg-[#F7F4EF] border border-[#DFD8CC] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <Building className="w-5 h-5 text-[#B86B43] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-xs text-[#1C1B18] block">
                    Visite o Terreno & Atendimento Comercial
                  </strong>
                  <span className="text-xs text-[#666159]">
                    Via A4A (Estrada do Rio Cambambe), Talhão 205/09, Talatona.
                  </span>
                </div>
              </div>
              <a
                href="#agendar"
                className="px-4 py-2 rounded bg-[#1C1B18] hover:bg-[#B86B43] text-white font-mono-spec text-xs uppercase tracking-wider shrink-0 transition-colors"
              >
                Solicitar Contacto
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          7. PRIVATE VISIT & BROCHURE LEAD CAPTURE SECTION (#agendar)
      ===================================================================== */}
      <section id="agendar" className="py-20 sm:py-28 bg-[#151814] text-[#F7F4EF] blueprint-grid-dark">
        <div className="max-w-[1380px] mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left 5 Columns: Private Concierge Invitation */}
            <div className="lg:col-span-5 space-y-6">
              <span className="font-mono-spec text-xs uppercase tracking-[0.2em] text-[#D9A86C] block">
                06 • ATENDIMENTO PRIVADO & RESERVAS
              </span>
              <h2 className="font-serif-editorial text-3xl sm:text-5xl text-white font-normal leading-tight">
                Agende uma experiência privada no Residencial Inara.
              </h2>
              <p className="text-sm sm:text-base text-white/75 leading-relaxed">
                O nosso diretor comercial e a equipa de arquitetura estão disponíveis para o receber
                no Stand & Casa Modelo com total privacidade, ou para realizar uma apresentação
                exclusiva por videochamada.
              </p>

              <div className="space-y-4 pt-2 border-t border-white/15">
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-[#D9A86C]">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-mono-spec text-[10px] uppercase tracking-wider text-white/60 block">
                      LOCALIZAÇÃO DO EMPREENDIMENTO
                    </span>
                    <strong className="text-sm text-white">
                      Via A4A (Estrada do Rio Cambambe), Talhão 205/09 • Talatona, Luanda
                    </strong>
                  </div>
                </div>

                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-[#D9A86C]">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-mono-spec text-[10px] uppercase tracking-wider text-white/60 block">
                      HORÁRIO DE ATENDIMENTO
                    </span>
                    <strong className="text-sm text-white">
                      Segunda a Sábado • 08h30 às 18h30 (Com agendamento prévio)
                    </strong>
                  </div>
                </div>

                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-[#D9A86C]">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-mono-spec text-[10px] uppercase tracking-wider text-white/60 block">
                      TELEFONES OFICIAIS & WHATSAPP
                    </span>
                    <strong className="text-sm text-white font-mono-spec">
                      931 893 859 / 923 436 077 / 929 120 300
                    </strong>
                    <span className="block text-xs text-[#D9A86C] font-mono-spec mt-0.5">
                      vendas@inara-africa.com
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right 7 Columns: Clean Architectural Conversion Form */}
            <div className="lg:col-span-7 bg-[#F7F4EF] text-[#1C1B18] p-6 sm:p-10 rounded-lg border border-[#DFD8CC] shadow-2xl">
              {!formSubmitted ? (
                <form onSubmit={handleFormSubmit} className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[#DFD8CC]">
                    <div>
                      <h3 className="font-serif-editorial text-2xl sm:text-3xl font-semibold text-[#1C1B18]">
                        Solicitar Atendimento ou Tabela de Preços
                      </h3>
                      <p className="text-xs text-[#666159]">
                        Resposta personalizada em menos de 30 minutos úteis.
                      </p>
                    </div>
                    <span className="font-mono-spec text-[11px] px-2.5 py-1 rounded bg-[#2E5A3C]/15 text-[#2E5A3C] font-medium self-start sm:self-center">
                      Confidencialidade Garantida
                    </span>
                  </div>

                  {/* Modality Selector */}
                  <div>
                    <label className="block font-mono-spec text-[11px] uppercase tracking-wider text-[#666159] mb-2">
                      1. Como prefere ser atendido?
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      {[
                        { id: 'presencial', label: 'Visita Presencial ao Local' },
                        { id: 'video', label: 'Reunião Online (Vídeo)' },
                        { id: 'tabela', label: 'Receber Tabela & Plantas' },
                      ].map((mode) => (
                        <button
                          key={mode.id}
                          type="button"
                          onClick={() => setFormVisitType(mode.id as typeof formVisitType)}
                          className={`py-2.5 px-3 rounded text-xs font-medium border text-center transition-all cursor-pointer ${
                            formVisitType === mode.id
                              ? 'bg-[#1C1B18] text-white border-[#1C1B18]'
                              : 'bg-white text-[#1C1B18] border-[#DFD8CC] hover:border-[#B86B43]'
                          }`}
                        >
                          {mode.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Name & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-[#1C1B18] mb-1.5">
                        Nome Completo *
                      </label>
                      <input
                        type="text"
                        required
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                        placeholder="Ex: Dr. António Albuquerque"
                        className="w-full px-4 py-3 rounded bg-white border border-[#DFD8CC] text-sm focus:outline-none focus:border-[#B86B43]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[#1C1B18] mb-1.5">
                        Telemóvel / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formPhone}
                        onChange={(e) => setFormPhone(e.target.value)}
                        placeholder={CURRENCIES[currency].phonePlaceholder}
                        className="w-full px-4 py-3 rounded bg-white border border-[#DFD8CC] text-sm focus:outline-none focus:border-[#B86B43]"
                      />
                    </div>
                  </div>

                  {/* Email, Preferred Typology & Date */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-[#1C1B18] mb-1.5">
                        E-mail Corporativo ou Pessoal *
                      </label>
                      <input
                        type="email"
                        required
                        value={formEmail}
                        onChange={(e) => setFormEmail(e.target.value)}
                        placeholder="nome@dominio.com"
                        className="w-full px-4 py-3 rounded bg-white border border-[#DFD8CC] text-sm focus:outline-none focus:border-[#B86B43]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-[#1C1B18] mb-1.5">
                        Tipologia de Interesse
                      </label>
                      <select
                        value={formTypology}
                        onChange={(e) => setFormTypology(e.target.value)}
                        className="w-full px-3.5 py-3 rounded bg-white border border-[#DFD8CC] text-sm focus:outline-none focus:border-[#B86B43]"
                      >
                        {TYPOLOGIES.map((t) => (
                          <option key={t.id} value={t.name}>
                            {t.name} ({t.totalArea} m²)
                          </option>
                        ))}
                        <option value="Investimento Múltiplas Unidades">
                          Investimento (Múltiplas Unidades)
                        </option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-[#1C1B18] mb-1.5">
                        Data Preferencial (Opcional)
                      </label>
                      <input
                        type="date"
                        value={formDate}
                        onChange={(e) => setFormDate(e.target.value)}
                        className="w-full px-3.5 py-3 rounded bg-white border border-[#DFD8CC] text-sm focus:outline-none focus:border-[#B86B43]"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 px-6 rounded bg-[#B86B43] hover:bg-[#96522F] text-white font-mono-spec text-xs uppercase tracking-widest font-semibold transition-colors shadow-md cursor-pointer"
                  >
                    Confirmar Solicitação & Desbloquear Tabela Exclusiva
                  </button>
                </form>
              ) : (
                <div className="py-8 px-4 text-center space-y-5">
                  <div className="w-14 h-14 rounded-full bg-[#2E5A3C]/15 text-[#2E5A3C] flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div className="space-y-2">
                    <span className="font-mono-spec text-xs uppercase tracking-widest text-[#B86B43]">
                      SOLICITAÇÃO REGISTADA COM PRIORIDADE VIP
                    </span>
                    <h3 className="font-serif-editorial text-3xl text-[#1C1B18]">
                      Obrigado, {formName}. O seu atendimento foi reservado.
                    </h3>
                    <p className="text-sm text-[#666159] max-w-lg mx-auto">
                      O nosso consultor sénior entrará em contacto através do número{' '}
                      <strong className="text-[#1C1B18]">{formPhone}</strong> com a proposta
                      detalhada para a tipologia <strong className="text-[#1C1B18]">{formTypology}</strong>.
                    </p>
                  </div>
                  <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
                    <button
                      type="button"
                      onClick={() => setIsBrochureOpen(true)}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded bg-[#1C1B18] text-white text-xs font-mono-spec uppercase tracking-wider cursor-pointer"
                    >
                      <Download className="w-4 h-4" />
                      Abrir Dossier & Tabela Agora
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormSubmitted(false)}
                      className="px-4 py-2.5 rounded border border-[#DFD8CC] text-xs font-mono-spec uppercase tracking-wider text-[#666159] hover:text-[#1C1B18] cursor-pointer"
                    >
                      Nova Solicitação
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      </>
      )}

      {/* Bottom Page-to-Page Navigation Bar */}
      {activePage !== 'home' && activePage !== 'tudo' && (
        <div className="bg-[#EFEAE1] border-t border-[#DFD8CC] py-8 px-4 sm:px-8">
          <div className="max-w-[1380px] mx-auto flex flex-wrap items-center justify-between gap-4">
            {activePage === 'conceito' && (
              <>
                <button
                  type="button"
                  onClick={() => navigateToPage('home')}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded bg-white hover:bg-[#F7F4EF] text-xs font-mono-spec uppercase tracking-wider border border-[#DFD8CC] cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Voltar ao Início</span>
                </button>
                <button
                  type="button"
                  onClick={() => navigateToPage('implantacao')}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded bg-[#B86B43] hover:bg-[#96522F] text-white text-xs font-mono-spec uppercase tracking-wider font-semibold cursor-pointer shadow-sm ml-auto"
                >
                  <span>Seguinte: Implantação Geral</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </>
            )}
            {activePage === 'implantacao' && (
              <>
                <button
                  type="button"
                  onClick={() => navigateToPage('conceito')}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded bg-white hover:bg-[#F7F4EF] text-xs font-mono-spec uppercase tracking-wider border border-[#DFD8CC] cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Anterior: O Conceito</span>
                </button>
                <button
                  type="button"
                  onClick={() => navigateToPage('plantas')}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded bg-[#B86B43] hover:bg-[#96522F] text-white text-xs font-mono-spec uppercase tracking-wider font-semibold cursor-pointer shadow-sm ml-auto"
                >
                  <span>Seguinte: Plantas & Tipologias</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </>
            )}
            {activePage === 'plantas' && (
              <>
                <button
                  type="button"
                  onClick={() => navigateToPage('implantacao')}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded bg-white hover:bg-[#F7F4EF] text-xs font-mono-spec uppercase tracking-wider border border-[#DFD8CC] cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Anterior: Implantação</span>
                </button>
                <button
                  type="button"
                  onClick={() => navigateToPage('lazer')}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded bg-[#B86B43] hover:bg-[#96522F] text-white text-xs font-mono-spec uppercase tracking-wider font-semibold cursor-pointer shadow-sm ml-auto"
                >
                  <span>Seguinte: Clube & Lazer</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </>
            )}
            {activePage === 'lazer' && (
              <>
                <button
                  type="button"
                  onClick={() => navigateToPage('plantas')}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded bg-white hover:bg-[#F7F4EF] text-xs font-mono-spec uppercase tracking-wider border border-[#DFD8CC] cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Anterior: Plantas & Tipologias</span>
                </button>
                <button
                  type="button"
                  onClick={() => navigateToPage('localizacao')}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded bg-[#B86B43] hover:bg-[#96522F] text-white text-xs font-mono-spec uppercase tracking-wider font-semibold cursor-pointer shadow-sm ml-auto"
                >
                  <span>Seguinte: Localização & Agendamento</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </>
            )}
            {activePage === 'localizacao' && (
              <>
                <button
                  type="button"
                  onClick={() => navigateToPage('lazer')}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded bg-white hover:bg-[#F7F4EF] text-xs font-mono-spec uppercase tracking-wider border border-[#DFD8CC] cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Anterior: Clube & Lazer</span>
                </button>
                <button
                  type="button"
                  onClick={() => navigateToPage('home')}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded bg-[#B86B43] hover:bg-[#96522F] text-white text-xs font-mono-spec uppercase tracking-wider font-semibold cursor-pointer shadow-sm ml-auto"
                >
                  <span>Voltar à Apresentação Principal</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* =====================================================================
          FOOTER
      ===================================================================== */}
      <footer className="bg-[#111310] text-[#F7F4EF]/70 border-t border-white/10 py-12 px-4 sm:px-8 text-xs">
        <div className="max-w-[1380px] mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="space-y-3">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-lg overflow-hidden border border-white/20 bg-[#5E6470] shrink-0">
                <img
                  src="/media/logo/inara-emblem.jpg"
                  alt="Emblema Oficial Inara Residencial Talatona"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <span className="font-serif-editorial text-2xl text-white tracking-wider block leading-none">
                  INARA RESIDÊNCIAL TALATONA
                </span>
                <span className="font-mono-spec text-[10px] uppercase tracking-[0.2em] text-[#D9A86C] mt-1 block">
                  CONDOMÍNIO PRIVADO DE 30 MORADIAS • TALATONA
                </span>
              </div>
            </div>
            <p className="text-white/60 max-w-md text-xs leading-relaxed">
              Promovido por <strong>F.I.P. – Finest Investment Partners</strong>. Terreno urbano de 10.000 m² (31 lotes), Prédio nº 1062-Talatona da 2ª Secção da Conservatória do Registo Predial de Luanda. Contactos de Vendas: 931 893 859 / 923 436 077 / 929 120 300 • vendas@inara-africa.com.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 font-mono-spec text-[11px]">
            <button
              type="button"
              onClick={() => setIsBrochureOpen(true)}
              className="hover:text-white transition-colors cursor-pointer"
            >
              DOSSIER TÉCNICO (PDF)
            </button>
            <button
              type="button"
              onClick={() => setIsStrategyOpen(true)}
              className="text-[#D9A86C] hover:text-white transition-colors cursor-pointer"
            >
              GUIA DO CONDOMÍNIO
            </button>
            <button
              type="button"
              onClick={() => navigateToPage('implantacao')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              MASTERPLAN (10.000 m²)
            </button>
            <button
              type="button"
              onClick={() => navigateToPage('plantas')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              MORADIAS T4 DUPLEX
            </button>
          </div>
        </div>
      </footer>

      {/* Floating Strategy / Consultant Helper Button */}
      <button
        type="button"
        onClick={() => setIsStrategyOpen(true)}
        className="fixed bottom-5 right-5 z-30 flex items-center gap-2.5 px-4 py-3 rounded-full bg-[#1C1B18] hover:bg-[#B86B43] text-[#F7F4EF] shadow-2xl border border-[#D9A86C]/40 transition-all cursor-pointer group"
        title="Ver conselhos estratégicos e personalizar moeda/cidade"
      >
        <Lightbulb className="w-4 h-4 text-[#D9A86C] group-hover:text-white" />
        <span className="font-mono-spec text-xs font-medium">
          Conselhos p/ o Condomínio & Personalizar
        </span>
      </button>

      {/* Fullscreen Gallery Lightbox Modal */}
      {lightboxItem && (
        <div
          className="fixed inset-0 z-50 bg-[#151814]/95 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setLightboxItem(null)}
        >
          <div
            className="relative max-w-5xl w-full bg-[#1C1B18] rounded-lg overflow-hidden border border-white/15"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 text-white">
              <div>
                <span className="font-mono-spec text-[10px] uppercase tracking-widest text-[#D9A86C] block">
                  {lightboxItem.category}
                </span>
                <h4 className="font-serif-editorial text-2xl">{lightboxItem.title}</h4>
              </div>
              <button
                type="button"
                onClick={() => setLightboxItem(null)}
                className="p-2 rounded-full hover:bg-white/10 text-white/80 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <img
              src={lightboxItem.image}
              alt={lightboxItem.title}
              className="w-full max-h-[72vh] object-cover"
            />
            <div className="p-4 bg-[#151814] text-xs text-white/80 flex items-center justify-between">
              <span>{lightboxItem.caption}</span>
              <span className="font-mono-spec text-[#D9A86C]">RESIDENCIAL INARA</span>
            </div>
          </div>
        </div>
      )}

      {/* Fullscreen Video Modal */}
      {videoModal && (
        <div
          className="fixed inset-0 z-50 bg-[#151814]/95 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setVideoModal(null)}
        >
          <div
            className="relative max-w-5xl w-full bg-[#1C1B18] rounded-lg overflow-hidden border border-white/20 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-4 bg-[#151814] border-b border-white/10 text-white">
              <div>
                <span className="font-mono-spec text-[10px] uppercase tracking-widest text-[#D9A86C] block">
                  {videoModal.subtitle || 'VÍDEO OFICIAL RESIDENCIAL INARA'}
                </span>
                <h4 className="font-serif-editorial text-2xl">{videoModal.title}</h4>
              </div>
              <button
                type="button"
                onClick={() => setVideoModal(null)}
                className="p-2 rounded-full hover:bg-white/10 text-white/80 hover:text-white transition-colors cursor-pointer"
                aria-label="Fechar vídeo"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="aspect-[16/9] w-full bg-black">
              <video
                src={videoModal.url}
                controls
                autoPlay
                playsInline
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      )}

      {/* Fullscreen Interior Decorado Lightbox Modal with Next/Prev Arrows */}
      {selectedDecoradoIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-[#151814]/95 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setSelectedDecoradoIndex(null)}
        >
          <div
            className="relative max-w-5xl w-full bg-[#1C1B18] rounded-lg overflow-hidden border border-white/20 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 text-white">
              <div>
                <span className="font-mono-spec text-[10px] uppercase tracking-widest text-[#D9A86C] block">
                  COLEÇÃO DE INTERIORES DECORADOS • AMBIENTE {String(selectedDecoradoIndex + 1).padStart(2, '0')} DE 43
                </span>
                <h4 className="font-serif-editorial text-2xl">
                  {INTERIOR_DECORADO_IMAGES[selectedDecoradoIndex].title}
                </h4>
              </div>
              <button
                type="button"
                onClick={() => setSelectedDecoradoIndex(null)}
                className="p-2 rounded-full hover:bg-white/10 text-white/80 hover:text-white transition-colors cursor-pointer"
                aria-label="Fechar galeria"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative flex items-center justify-center bg-black/40">
              <img
                src={INTERIOR_DECORADO_IMAGES[selectedDecoradoIndex].src}
                alt={INTERIOR_DECORADO_IMAGES[selectedDecoradoIndex].title}
                className="w-full max-h-[72vh] object-contain"
              />

              {/* Prev Button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedDecoradoIndex((prev) =>
                    prev !== null && prev > 0 ? prev - 1 : INTERIOR_DECORADO_IMAGES.length - 1
                  );
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-[#151814]/80 hover:bg-[#B86B43] text-white flex items-center justify-center border border-white/20 transition-all cursor-pointer shadow-lg"
                aria-label="Ambiente anterior"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Next Button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedDecoradoIndex((prev) =>
                    prev !== null && prev < INTERIOR_DECORADO_IMAGES.length - 1 ? prev + 1 : 0
                  );
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-[#151814]/80 hover:bg-[#B86B43] text-white flex items-center justify-center border border-white/20 transition-all cursor-pointer shadow-lg"
                aria-label="Próximo ambiente"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 bg-[#151814] text-xs text-white/80 flex items-center justify-between">
              <span>Utilize as setas para percorrer os 43 ambientes decorados em alta resolução.</span>
              <span className="font-mono-spec text-[#D9A86C]">RESIDENCIAL INARA</span>
            </div>
          </div>
        </div>
      )}

      {/* Brochure Executive Modal */}
      <BrochureModal
        isOpen={isBrochureOpen}
        onClose={() => setIsBrochureOpen(false)}
        currency={currency}
        cityLabel={customCity}
      />

      {/* Strategy & Market Customizer Drawer */}
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
export default App;
