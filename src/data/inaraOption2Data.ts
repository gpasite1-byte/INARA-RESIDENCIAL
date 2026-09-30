export type UnitStatus = 'available' | 'reserved' | 'sold';

export interface CondoUnit {
  id: string;
  code: string;
  block: 'Alameda Villas' | 'Bloco A (Nascente)' | 'Bloco B (Parque)';
  typologyCode: 'T2 Garden' | 'T3 Terraço' | 'T4 Duplex' | 'Villa Inara';
  floor: string;
  privateArea: number;
  outdoorArea: number;
  totalArea: number;
  solar: string;
  parkingSpots: number;
  status: UnitStatus;
  priceEUR: number;
  condoFeeEUR: number;
  estimatedRentMonthlyEUR: number;
  highlight: string;
  image: string;
}

export const CONDO_UNITS_MATRIX: CondoUnit[] = [
  // Alameda Villas (Moradias Isoladas)
  {
    id: 'v-01',
    code: 'VILLA 01',
    block: 'Alameda Villas',
    typologyCode: 'Villa Inara',
    floor: 'Lote Esquina • 2 Pisos',
    privateArea: 340,
    outdoorArea: 195,
    totalArea: 535,
    solar: 'Nascente / Sul / Poente',
    parkingSpots: 4,
    status: 'available',
    priceEUR: 1380000,
    condoFeeEUR: 390,
    estimatedRentMonthlyEUR: 7800,
    highlight: 'Lote de gaveto junto ao lago biológico com piscina privativa de 11m já incluída.',
    image: '/images/inara-hero.jpg',
  },
  {
    id: 'v-02',
    code: 'VILLA 02',
    block: 'Alameda Villas',
    typologyCode: 'Villa Inara',
    floor: 'Lote Central • 2 Pisos',
    privateArea: 340,
    outdoorArea: 180,
    totalArea: 520,
    solar: 'Nascente / Sul',
    parkingSpots: 4,
    status: 'sold',
    priceEUR: 1350000,
    condoFeeEUR: 380,
    estimatedRentMonthlyEUR: 7500,
    highlight: 'Frente direta para a alameda das oliveiras centenárias.',
    image: '/images/inara-hero.jpg',
  },
  {
    id: 'v-03',
    code: 'VILLA 03',
    block: 'Alameda Villas',
    typologyCode: 'Villa Inara',
    floor: 'Lote Central • 2 Pisos',
    privateArea: 340,
    outdoorArea: 180,
    totalArea: 520,
    solar: 'Nascente / Sul',
    parkingSpots: 4,
    status: 'reserved',
    priceEUR: 1350000,
    condoFeeEUR: 380,
    estimatedRentMonthlyEUR: 7500,
    highlight: 'Acesso pedonal privativo ao Wellness & Spa.',
    image: '/images/inara-hero.jpg',
  },
  {
    id: 'v-04',
    code: 'VILLA 04',
    block: 'Alameda Villas',
    typologyCode: 'Villa Inara',
    floor: 'Lote Reserva • 2 Pisos',
    privateArea: 340,
    outdoorArea: 210,
    totalArea: 550,
    solar: 'Sul / Poente (Vista Mata)',
    parkingSpots: 4,
    status: 'available',
    priceEUR: 1420000,
    condoFeeEUR: 395,
    estimatedRentMonthlyEUR: 8100,
    highlight: 'Maior jardim privativo do condomínio (210 m²) encostado à reserva florestal.',
    image: '/images/inara-facade-day.jpg',
  },

  // Bloco A (Nascente)
  {
    id: 'a-101',
    code: 'FRAÇÃO A-101',
    block: 'Bloco A (Nascente)',
    typologyCode: 'T2 Garden',
    floor: 'Piso Térreo Garden',
    privateArea: 118,
    outdoorArea: 38,
    totalArea: 156,
    solar: 'Nascente / Sul',
    parkingSpots: 2,
    status: 'available',
    priceEUR: 445000,
    condoFeeEUR: 185,
    estimatedRentMonthlyEUR: 2850,
    highlight: 'Jardim privativo murado em vegetação com entrada independente como numa moradia.',
    image: '/images/inara-interior-living.jpg',
  },
  {
    id: 'a-102',
    code: 'FRAÇÃO A-102',
    block: 'Bloco A (Nascente)',
    typologyCode: 'T2 Garden',
    floor: 'Piso Térreo Garden',
    privateArea: 118,
    outdoorArea: 34,
    totalArea: 152,
    solar: 'Nascente',
    parkingSpots: 2,
    status: 'sold',
    priceEUR: 440000,
    condoFeeEUR: 185,
    estimatedRentMonthlyEUR: 2800,
    highlight: 'Excelente exposição solar matinal e proximidade à piscina.',
    image: '/images/inara-pool-club.jpg',
  },
  {
    id: 'a-201',
    code: 'FRAÇÃO A-201',
    block: 'Bloco A (Nascente)',
    typologyCode: 'T3 Terraço',
    floor: '1º Andar Elevado',
    privateArea: 164,
    outdoorArea: 28,
    totalArea: 192,
    solar: 'Nascente / Sul',
    parkingSpots: 3,
    status: 'available',
    priceEUR: 620000,
    condoFeeEUR: 240,
    estimatedRentMonthlyEUR: 3900,
    highlight: 'Elevador privativo codificado diretamente no hall social e vista sobre o espelho de água.',
    image: '/images/inara-facade-day.jpg',
  },
  {
    id: 'a-202',
    code: 'FRAÇÃO A-202',
    block: 'Bloco A (Nascente)',
    typologyCode: 'T3 Terraço',
    floor: '2º Andar Panorâmico',
    privateArea: 164,
    outdoorArea: 28,
    totalArea: 192,
    solar: 'Nascente / Sul / Poente',
    parkingSpots: 3,
    status: 'reserved',
    priceEUR: 635000,
    condoFeeEUR: 240,
    estimatedRentMonthlyEUR: 4050,
    highlight: 'Vista aberta para a copa das árvores e varanda gourmet com churrasqueira oculta.',
    image: '/images/inara-master-suite.jpg',
  },
  {
    id: 'a-301',
    code: 'PENTHOUSE A-301',
    block: 'Bloco A (Nascente)',
    typologyCode: 'T4 Duplex',
    floor: 'Cobertura Duplex (3º/4º)',
    privateArea: 248,
    outdoorArea: 72,
    totalArea: 320,
    solar: '360° Panorâmica',
    parkingSpots: 4,
    status: 'available',
    priceEUR: 980000,
    condoFeeEUR: 320,
    estimatedRentMonthlyEUR: 5900,
    highlight: 'Única Penthouse Duplex disponível no Bloco A com piscina privativa no terraço superior.',
    image: '/images/inara-interior-living.jpg',
  },

  // Bloco B (Parque Botânico)
  {
    id: 'b-101',
    code: 'FRAÇÃO B-101',
    block: 'Bloco B (Parque)',
    typologyCode: 'T2 Garden',
    floor: 'Piso Térreo Garden',
    privateArea: 118,
    outdoorArea: 42,
    totalArea: 160,
    solar: 'Sul / Poente',
    parkingSpots: 2,
    status: 'available',
    priceEUR: 455000,
    condoFeeEUR: 185,
    estimatedRentMonthlyEUR: 2950,
    highlight: 'Terraço de canto com 42 m² virado diretamente para o Parque Botânico Linear.',
    image: '/images/inara-pool-club.jpg',
  },
  {
    id: 'b-201',
    code: 'FRAÇÃO B-201',
    block: 'Bloco B (Parque)',
    typologyCode: 'T3 Terraço',
    floor: '1º Andar Elevado',
    privateArea: 164,
    outdoorArea: 28,
    totalArea: 192,
    solar: 'Sul / Poente',
    parkingSpots: 3,
    status: 'available',
    priceEUR: 628000,
    condoFeeEUR: 240,
    estimatedRentMonthlyEUR: 3950,
    highlight: 'Silêncio absoluto em frente ao pomar nativo, a 40 metros do Coworking.',
    image: '/images/inara-master-suite.jpg',
  },
  {
    id: 'b-301',
    code: 'PENTHOUSE B-301',
    block: 'Bloco B (Parque)',
    typologyCode: 'T4 Duplex',
    floor: 'Cobertura Duplex (3º/4º)',
    privateArea: 248,
    outdoorArea: 72,
    totalArea: 320,
    solar: '360° Panorâmica',
    parkingSpots: 4,
    status: 'sold',
    priceEUR: 995000,
    condoFeeEUR: 320,
    estimatedRentMonthlyEUR: 6000,
    highlight: 'Pé-direito duplo de 5,80m com vista pôr-do-sol permanente.',
    image: '/images/inara-hero.jpg',
  },
];

export interface FinishOption {
  id: string;
  name: string;
  material: string;
  description: string;
  priceDeltaEUR: number;
  swatchColor: string;
  previewImage: string;
}

export const FLOORING_FINISHES: FinishOption[] = [
  {
    id: 'travertino',
    name: 'Travertino Romano Levigado',
    material: 'Pedra Natural Italiana (120×120 cm)',
    description: 'Incluído no padrão de série. Frescura térmica natural e veios minerais suaves.',
    priceDeltaEUR: 0,
    swatchColor: '#E4DDD0',
    previewImage:
      'https://images.pexels.com/photos/27604139/pexels-photo-27604139.png?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
  },
  {
    id: 'carvalho',
    name: 'Carvalho Europeu & Cumaru Natural',
    material: 'Madeira Nobre Multicamada (Réguas Largas)',
    description: 'Ambiente acolhedor e acústico em toda a zona social e suítes, com rodapé oculto.',
    priceDeltaEUR: 8500,
    swatchColor: '#A6754B',
    previewImage:
      'https://images.pexels.com/photos/6908555/pexels-photo-6908555.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
  },
  {
    id: 'limestone',
    name: 'Mármore Gris & Nogueira Escura',
    material: 'Pedra Cinza Acetinada + Painéis em Nogueira',
    description: 'Estética contemporânea cosmopolita de alto contraste com iluminação linear embutida.',
    priceDeltaEUR: 14000,
    swatchColor: '#5B5955',
    previewImage:
      'https://images.pexels.com/photos/27604128/pexels-photo-27604128.png?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
  },
];

export const OUTDOOR_PACKAGES: FinishOption[] = [
  {
    id: 'standard-deck',
    name: 'Terraço Gourmet de Série',
    material: 'Bancada em Pedra + Ponto Gás/Água',
    description: 'Incluído de série em todas as unidades. Guarda-corpo panorâmico em vidro extraclaro.',
    priceDeltaEUR: 0,
    swatchColor: '#C9B99F',
    previewImage:
      'https://images.pexels.com/photos/12715498/pexels-photo-12715498.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
  },
  {
    id: 'jacuzzi-pack',
    name: 'Pack Spa Privativo & Parrilla Inox',
    material: 'Jacuzzi Aquecido 5 Lugares + Deck Cumaru',
    description: 'Hidromassagem aquecida embutida no deck de madeira maciça e churrasqueira gourmet.',
    priceDeltaEUR: 19500,
    swatchColor: '#3A6B78',
    previewImage:
      'https://images.pexels.com/photos/28915352/pexels-photo-28915352.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
  },
  {
    id: 'plunge-pool',
    name: 'Pack Piscina Privativa & Fire Pit',
    material: 'Piscina em Pedra Vulcânica + Lareira Exterior',
    description: 'Disponível para T2 Garden, T4 Duplex e Villas. Tratamento salino e iluminação LED.',
    priceDeltaEUR: 34000,
    swatchColor: '#1E4E4A',
    previewImage:
      'https://images.pexels.com/photos/36394726/pexels-photo-36394726.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
  },
];

export const SMART_PACKAGES: FinishOption[] = [
  {
    id: 'smart-base',
    name: 'Infraestrutura Smart Ready (Série)',
    material: 'Fechadura Biométrica + Ponto Wallbox EV',
    description: 'Incluído de série: acesso digital na porta principal, fibra ótica e pré-instalação AC.',
    priceDeltaEUR: 0,
    swatchColor: '#8C8880',
    previewImage: '',
  },
  {
    id: 'smart-knx',
    name: 'Automação Integral KNX + Som Invisível',
    material: 'Cenários de Luz, Cortinas Motorizadas & Áudio',
    description: 'Controlo por voz/App de toda a climatização, estores blackout e som Kef no teto.',
    priceDeltaEUR: 12500,
    swatchColor: '#B86B43',
    previewImage: '',
  },
  {
    id: 'smart-zero',
    name: 'Pack Autonomia Solar + Bateria Doméstica',
    material: 'Painéis Fotovoltaicos + Powerwall + KNX',
    description: 'Redução de até 80% na fatura energética e autonomia contínua silenciosa.',
    priceDeltaEUR: 24000,
    swatchColor: '#2E5A3C',
    previewImage: '',
  },
];

export interface SecurityRing {
  ring: string;
  title: string;
  subtitle: string;
  details: string[];
}

export const SECURITY_RINGS: SecurityRing[] = [
  {
    ring: 'ANEL 01',
    title: 'Perímetro Inteligente & Deteção Precoce',
    subtitle: 'Barreira física e ótica ao redor dos 12.500 m² do condomínio.',
    details: [
      'Muro perimetral de 3,20m com sensores de vibração em fibra ótica',
      'Câmaras térmicas noturnas com analítica de Inteligência Artificial (deteta intrusão antes da aproximação)',
      'Iluminação perimetral redundante ligada ao gerador de emergência',
    ],
  },
  {
    ring: 'ANEL 02',
    title: 'Portaria Blindada Nível III-A com Eclusa Dupla',
    subtitle: 'Nenhum veículo ou visitante entra sem dupla validação independente.',
    details: [
      'Sistema de eclusa (gaiola): o segundo portão só abre após o fecho completo do primeiro',
      'Leitura ótica de matrículas (LPR) + Reconhecimento facial para moradores sem abrir o vidro',
      'Sala de segurança climatizada 24h com botão de pânico silencioso interligado à força tática',
    ],
  },
  {
    ring: 'ANEL 03',
    title: 'Gestão de Entregas & Prestadores sem Contacto',
    subtitle: 'Estafetas e entregas não circulam pelas alamedas residenciais.',
    details: [
      'Smart Lockers (cacifos refrigerados e secos) junto à portaria para encomendas e compras',
      'Entrada de serviço independente com registo biométrico temporário para funcionários',
      'Convites de visitantes gerados pelo morador na App Inara com QR Code de validade horária',
    ],
  },
  {
    ring: 'ANEL 04',
    title: 'Circulação Interna Segura & Vigilância Silenciosa',
    subtitle: 'Ruas internas onde as crianças podem andar de bicicleta com total tranquilidade.',
    details: [
      'Velocidade máxima controlada por radar pedagógico (20 km/h) e passeios largos arborizados',
      'Ronda preventiva 24h em veículos 100% elétricos silenciosos',
      'Monitorização das áreas de lazer e parque infantil acessível pelos pais na App',
    ],
  },
];
