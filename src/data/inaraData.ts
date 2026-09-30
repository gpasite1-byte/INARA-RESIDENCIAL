export type CurrencyCode = 'AOA' | 'EUR' | 'BRL' | 'MZN';

export interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  label: string;
  regionLabel: string;
  cityDefault: string;
  phonePlaceholder: string;
  multiplierFromEUR: number;
}

export const PROJECT_INFO = {
  officialName: 'Inara Residencial Talatona',
  slogan: 'Sua casa dos sonhos é agora uma realidade',
  developer: 'F.I.P. – Finest Investment Partners',
  legalRegistration: 'Prédio nº 1062-Talatona da 2ª Secção da Conservatória do Registo Predial de Luanda',
  landAreaM2: '10.000 m²',
  totalLots: 31,
  residentialHouses: 30,
  supportLotAreaM2: '767 m² (Lote 31 - Apoio & Lazer)',
  housingLotsAreaM2: '6.841,52 m²',
  roadAreaM2: '2.391,48 m²',
  houseAbcM2: '217 m²',
  lotsSizeRange: '220 m² a 358 m²',
  logradourosRange: '109 m² a 247 m²',
  address: 'Via A4A (Estrada do Rio Cambambe), Talhão 205/09 • Talatona, Luanda',
  coordinates: '8º55\'33.33"S; 13º11\'40.18"E',
  phones: ['+244 931 893 859', '+244 923 436 077', '+244 929 120 300'],
  email: 'vendas@inara-africa.com',
  vgvAOA: '20.583.500.000 AOA',
};

export const CURRENCIES: Record<CurrencyCode, CurrencyConfig> = {
  AOA: {
    code: 'AOA',
    symbol: 'Kz',
    label: 'Kwanza (Kz)',
    regionLabel: 'Angola (Moeda Oficial)',
    cityDefault: 'Talatona • Luanda',
    phonePlaceholder: '+244 931 893 859',
    multiplierFromEUR: 980,
  },
  EUR: {
    code: 'EUR',
    symbol: '€',
    label: 'Euro (€)',
    regionLabel: 'Portugal / Europa',
    cityDefault: 'Talatona • Luanda',
    phonePlaceholder: '+244 931 893 859',
    multiplierFromEUR: 1,
  },
  BRL: {
    code: 'BRL',
    symbol: 'R$',
    label: 'Real (R$)',
    regionLabel: 'Brasil',
    cityDefault: 'Talatona • Luanda',
    phonePlaceholder: '+244 931 893 859',
    multiplierFromEUR: 6.1,
  },
  MZN: {
    code: 'MZN',
    symbol: 'MT',
    label: 'Metical (MT)',
    regionLabel: 'Moçambique',
    cityDefault: 'Talatona • Luanda',
    phonePlaceholder: '+244 931 893 859',
    multiplierFromEUR: 70,
  },
};

export interface MasterplanHotspot {
  id: string;
  number: string;
  title: string;
  category: 'seguranca' | 'lazer' | 'natureza';
  categoryLabel: string;
  area: string;
  capacity: string;
  schedule: string;
  coordinates: { x: number; y: number }; // percentage on masterplan image
  summary: string;
  highlights: string[];
  image: string;
  video?: string;
}

export const MASTERPLAN_VIDEO = '/media/videos/masterplan-3d-layout.mp4';
export const POOL_VIDEO = '/media/videos/pool-deck-solarium.mp4';

export const MASTERPLAN_HOTSPOTS: MasterplanHotspot[] = [
  {
    id: 'portaria',
    number: '01',
    title: 'Portaria 24h & Controlo de Acesso Blindado',
    category: 'seguranca',
    categoryLabel: 'Segurança & Infraestrutura',
    area: 'Via A4A',
    capacity: 'Acesso Controlado 24h',
    schedule: 'Operação Ininterrupta 24h/7',
    coordinates: { x: 19, y: 76 },
    summary:
      'Portaria blindada de segurança com eclusa de controlo, localizada na Via A4A (Estrada do Rio Cambambe), garantindo total privacidade, vigilância ininterrupta e proteção para as 30 famílias.',
    highlights: [
      'Segurança 24 horas com acesso controlado e circuito fechado de TV',
      'Entrada direta pela Via A4A asfaltada ligando Talatona à Av. Luanda Sul',
      'Muro perimetral e iluminação de segurança em todo o loteamento de 10.000 m²',
    ],
    image: '/media/facades/inara-frente.jpg',
  },
  {
    id: 'piscina',
    number: '02',
    title: 'Piscina de Borda Infinita & Deck Solarium',
    category: 'lazer',
    categoryLabel: 'Lazer & Bem-Estar',
    area: 'Lote 31 (767 m²)',
    capacity: 'Uso Exclusivo Moradores',
    schedule: '06h00 — 22h00',
    coordinates: { x: 48, y: 52 },
    summary:
      'Área de lazer aquático com deck solarium para o condomínio, complementando a piscina privativa individual que cada uma das 30 moradias possui no seu próprio quintal.',
    highlights: [
      'Piscina privativa em cada uma das 30 moradias com deck ajardinado',
      'Piscina de resort no lote de apoio e clube social comunitário',
      'Deck em madeira para solarium e convívio ao ar livre',
    ],
    image: '/media/pool/pool-club-private.jpg',
    video: '/media/videos/pool-deck-solarium.mp4',
  },
  {
    id: 'wellness',
    number: '03',
    title: 'Ginásio Equipado & Fitness Panorâmico',
    category: 'lazer',
    categoryLabel: 'Lazer & Bem-Estar',
    area: 'Edifício de Lazer',
    capacity: 'Equipamentos Completos',
    schedule: '05h30 — 23h00',
    coordinates: { x: 36, y: 40 },
    summary:
      'Espaço de treino físico climatizado com equipamentos de cardio, musculação e área funcional, concebido para manter a saúde e o bem-estar sem sair de casa.',
    highlights: [
      'Equipamentos de musculação e passadeiras ergonómicas modernas',
      'Espaço climatizado e integrado às comodidades do condomínio',
      'Acesso livre e exclusivo para os residentes das moradias',
    ],
    image: '/media/interiors/interior-11.jpg',
  },
  {
    id: 'gourmet',
    number: '04',
    title: 'Salão de Festas & Espaço Churrasqueira',
    category: 'lazer',
    categoryLabel: 'Lazer & Bem-Estar',
    area: 'Lote de Apoio',
    capacity: 'Eventos Familiares',
    schedule: 'Reserva Exclusiva de Moradores',
    coordinates: { x: 61, y: 44 },
    summary:
      'Salão de festas amplo e elegante para celebrações, reuniões e eventos sociais, equipado com bancada gourmet, churrasqueira comunitária e copa de apoio.',
    highlights: [
      'Salão de festas fechado e climatizado com copa de apoio',
      'Churrasqueira comunitária além da churrasqueira privativa de cada moradia',
      'Integração fluida com as áreas exteriores ajardinadas do clube',
    ],
    image: '/media/interiors/interior-21.jpg',
  },
  {
    id: 'desporto',
    number: '05',
    title: 'Quadra Multiuso Desportiva',
    category: 'natureza',
    categoryLabel: 'Natureza & Desporto',
    area: 'Polidesportivo',
    capacity: 'Desportos Coletivos & Individuais',
    schedule: '07h00 — 22h00 (Iluminação LED)',
    coordinates: { x: 76, y: 58 },
    summary:
      'Campo polidesportivo de alto padrão para futebol, basquetebol, voleibol e ténis, cercado com rede protetora e iluminação noturna para jogos em família.',
    highlights: [
      'Piso com excelente absorção de impacto e marcações oficiais',
      'Iluminação LED para treinos e partidas noturnas',
      'Vedação de segurança e bancada sombreada para espectadores',
    ],
    image: '/media/facades/exterior-sunset-2.jpg',
  },
  {
    id: 'cinema',
    number: '06',
    title: 'Sala de Cinema Privada & Sala de Jogos',
    category: 'lazer',
    categoryLabel: 'Lazer & Entretenimento',
    area: 'Piso de Lazer',
    capacity: 'Sala Acústica',
    schedule: 'Acesso Privado',
    coordinates: { x: 54, y: 25 },
    summary:
      'Sala de cinema com acústica refinada e poltronas reclináveis para sessões exclusivas com a família e amigos, integrada à sala de jogos com bilhar e entretenimento.',
    highlights: [
      'Tela de alta definição e sistema de som surround imersivo',
      'Sala de jogos com mesa de bilhar e jogos de salão',
      'Ambiente climatizado e isolado acusticamente',
    ],
    image: '/media/interiors/interior-16.jpg',
  },
  {
    id: 'implantacao',
    number: '07',
    title: 'Loteamento Fechado de 10.000 m² (30 Moradias)',
    category: 'seguranca',
    categoryLabel: 'Segurança & Infraestrutura',
    area: '10.000 m² Terreno',
    capacity: '30 Moradias + Lote Apoio',
    schedule: '24h Infraestrutura Urbana',
    coordinates: { x: 29, y: 60 },
    summary:
      'Terreno urbano com topografia plana e arruamentos pavimentados de 2.391 m², rede elétrica de qualidade, abastecimento de água e rede de esgotos no eixo mais valorizado de Talatona.',
    highlights: [
      '30 Moradias T4 de 217 m² implantadas em lotes de 220 m² a 358 m²',
      'Lote 31 com 767 m² inteiramente dedicado a equipamentos comunitários',
      'Legalizado: Prédio nº 1062-Talatona da 2ª Secção do Registo Predial de Luanda',
    ],
    image: '/media/facades/inara-traseira.jpg',
  },
];

export interface RoomSpec {
  id: string;
  name: string;
  area: string;
  dimensions: string;
  description: string;
  rect: { x: number; y: number; w: number; h: number };
}

export interface Typology {
  id: string;
  code: string;
  name: string;
  subtitle: string;
  badge: string;
  privateArea: number;
  terraceArea: number;
  totalArea: number;
  suites: number;
  bathrooms: number;
  parking: number;
  solarOrientation: string;
  ceilingHeight: string;
  basePriceEUR: number;
  availableUnits: number;
  totalUnits: number;
  description: string;
  interiorImage: string;
  exteriorImage: string;
  features: string[];
  rooms: RoomSpec[];
}

export const TYPOLOGIES: Typology[] = [
  {
    id: 't4-opcao-a',
    code: 'T4 OPÇÃO A',
    name: 'Moradia T4 Duplex — Layout Opção A',
    subtitle: '4 Suítes com varanda, escritório independente no R/C, piscina privativa e barbecue integrado.',
    badge: 'MODELO DE REFERÊNCIA • R/C + 1º PISO',
    privateArea: 217,
    terraceArea: 109,
    totalArea: 326,
    suites: 4,
    bathrooms: 5,
    parking: 2,
    solarOrientation: 'Nascente / Poente',
    ceilingHeight: '3,10 m livres',
    basePriceEUR: 710000,
    availableUnits: 7,
    totalUnits: 16,
    description:
      'A Opção A destaca-se pela sua distribuição funcional impecável: piso térreo com ampla sala de estar e jantar em conceito aberto, escritório independente para trabalho focado, cozinha com ilha e acesso direto ao quintal com piscina e churrasqueira. No piso superior, 4 amplas suítes com varandas privativas.',
    interiorImage: '/media/living/living-natural-light.jpg',
    exteriorImage: '/media/facades/inara-frente.jpg',
    features: [
      '4 Quartos 100% em suíte, todas com varanda privativa no 1º piso',
      'Escritório privativo independente no piso térreo (R/C)',
      'Quintal ajardinado com piscina privativa e barbecue integrado',
      'Sala ampla de estar e jantar integrada à cozinha com ilha',
      'Estacionamento privativo para 2 viaturas na entrada',
    ],
    rooms: [
      {
        id: 'living',
        name: 'Sala de Estar & Jantar Integrada',
        area: '42,5 m²',
        dimensions: '7,20m × 5,90m',
        description: 'Amplo living aberto com portas de correr panorâmicas com saída direta para a piscina privativa e varanda gourmet.',
        rect: { x: 55, y: 45, w: 235, h: 155 },
      },
      {
        id: 'piscina',
        name: 'Quintal com Piscina Privativa & BBQ',
        area: '109,0 m²',
        dimensions: '10,90m × 10,00m',
        description: 'Logradouro privativo ajardinado com piscina individual, solarium e churrasqueira para convívio familiar.',
        rect: { x: 55, y: 205, w: 345, h: 85 },
      },
      {
        id: 'escritorio',
        name: 'Escritório Independente (R/C)',
        area: '14,2 m²',
        dimensions: '4,00m × 3,55m',
        description: 'Gabinete executivo de trabalho isolado acusticamente com luz natural e vista para o jardim frontal.',
        rect: { x: 295, y: 45, w: 105, h: 155 },
      },
      {
        id: 'master',
        name: 'Suíte Master com Varanda & Closet',
        area: '28,5 m²',
        dimensions: '5,90m × 4,80m',
        description: 'Suíte principal no 1º piso com varanda privativa, roupeiro walk-in e casa de banho com dupla cuba.',
        rect: { x: 405, y: 45, w: 180, h: 125 },
      },
      {
        id: 'suites',
        name: '3 Suítes Familiares com Varanda',
        area: '60,0 m²',
        dimensions: 'Piso 1 Ala Íntima',
        description: 'Três suítes plenas com casas de banho privativas e varandas privativas com vistas desafogadas.',
        rect: { x: 405, y: 175, w: 180, h: 115 },
      },
    ],
  },
  {
    id: 't4-opcao-b',
    code: 'T4 OPÇÃO B',
    name: 'Moradia T4 Duplex — Layout Opção B',
    subtitle: 'Grand Living com ligação contínua ao deck da piscina, 4 suítes, master expandida e escritório.',
    badge: 'DESIGN CONTEMPORÂNEO • CONCEITO FLUIDO',
    privateArea: 217,
    terraceArea: 109,
    totalArea: 326,
    suites: 4,
    bathrooms: 5,
    parking: 2,
    solarOrientation: 'Norte / Sul Panorâmica',
    ceilingHeight: '3,10 m livres',
    basePriceEUR: 730000,
    availableUnits: 5,
    totalUnits: 12,
    description:
      'A Opção B prioriza a máxima fluidez social entre a área interna e a piscina privativa. O living alongado integra-se de ponta a ponta com a área gourmet exterior e o solarium. No piso superior, a Suíte Master possui proporções generosas com closet expandido e varanda frontal.',
    interiorImage: '/media/suites/suite-master-acoustic.jpg',
    exteriorImage: '/media/facades/inara-traseira.jpg',
    features: [
      'Conceito living contínuo com abertura total para o deck e piscina privativa',
      '4 Suítes plenas com varandas privativas (Suíte Master com closet ampliado)',
      'Gabinete de escritório no piso térreo com casa de banho social anexa',
      'Cozinha gourmet americana com despensa e lavandaria técnica',
      'Garagem frontal privativa para 2 viaturas com iluminação embutida',
    ],
    rooms: [
      {
        id: 'living-b',
        name: 'Grand Living Integrado ao Deck',
        area: '46,0 m²',
        dimensions: '7,80m × 5,90m',
        description: 'Espaço social unificado com caixilharia de vidro de correr oculta ligando estar, jantar e exterior.',
        rect: { x: 55, y: 45, w: 240, h: 150 },
      },
      {
        id: 'deck-b',
        name: 'Deck Exterior, Piscina & Churrasqueira',
        area: '109,0 m²',
        dimensions: '11,00m × 9,90m',
        description: 'Área de lazer ao ar livre com piscina privativa, deck solarium e espaço barbecue para fins de semana.',
        rect: { x: 55, y: 200, w: 350, h: 90 },
      },
      {
        id: 'cozinha-b',
        name: 'Cozinha Gourmet & Área de Serviço',
        area: '21,5 m²',
        dimensions: '5,35m × 4,00m',
        description: 'Bancada em quartzito, armários modernos e lavandaria independente com ventilação natural.',
        rect: { x: 300, y: 45, w: 105, h: 150 },
      },
      {
        id: 'master-b',
        name: 'Suíte Master Presidencial com Closet',
        area: '34,0 m²',
        dimensions: '6,80m × 5,00m',
        description: 'Quarto master generoso com varanda privativa voltada ao jardim e sala de banho refinada.',
        rect: { x: 410, y: 45, w: 175, h: 135 },
      },
      {
        id: 'suites-b',
        name: '3 Suítes Independentes com Varanda',
        area: '58,0 m²',
        dimensions: 'Piso 1 Ala Íntima',
        description: 'Três suítes aconchegantes com piso nobre, estores motorizados e varandas individuais.',
        rect: { x: 410, y: 185, w: 175, h: 105 },
      },
    ],
  },
  {
    id: 't4-gaveto',
    code: 'T4 GAVETO',
    name: 'Moradia T4 Duplex — Lote Gaveto (Lote 1)',
    subtitle: 'Lote ampliado de 358 m² com logradouro privativo de 247 m², piscina maior e 3 frentes de luz.',
    badge: 'LOTE PREMIUM EXCLUSIVO • LOTE 1',
    privateArea: 217,
    terraceArea: 247,
    totalArea: 464,
    suites: 4,
    bathrooms: 5,
    parking: 3,
    solarOrientation: '3 Frentes (Nascente / Sul / Poente)',
    ceilingHeight: '3,20 m livres',
    basePriceEUR: 810000,
    availableUnits: 1,
    totalUnits: 2,
    description:
      'A joia do condomínio: situada no Lote 1 de gaveto, esta moradia beneficia de um terreno extraordinário de 358 m² com logradouro privativo de 247 m² (mais do dobro dos lotes normais). Permite uma piscina de maior dimensão, jardim privativo extenso e 3 vagas de estacionamento.',
    interiorImage: '/media/interiors/interior-10.jpg',
    exteriorImage: '/media/facades/facade-golden-hour-1.jpg',
    features: [
      'Terreno ampliado de 358 m² com 247 m² de logradouro privativo exclusivo',
      'Piscina privativa expandida com deck solarium e amplo jardim perimetral',
      '4 Suítes completas com varandas e 3 frentes de iluminação solar natural',
      'Escritório privativo com acesso independente no piso térreo',
      'Capacidade para até 3 viaturas no estacionamento privativo',
    ],
    rooms: [
      {
        id: 'gaveto-living',
        name: 'Grand Living & Galeria de Entrada',
        area: '48,5 m²',
        dimensions: '8,20m × 5,90m',
        description: 'Salão majestoso de gaveto com amplas aberturas envidraçadas e ventilação cruzada constante.',
        rect: { x: 55, y: 40, w: 250, h: 145 },
      },
      {
        id: 'gaveto-jardim',
        name: 'Logradouro Ampliado de 247 m² & Piscina Maior',
        area: '247,0 m²',
        dimensions: '19,00m × 13,00m',
        description: 'Jardim perimetral espaçoso, piscina privativa estendida, deck para espreguiçadeiras e churrasqueira.',
        rect: { x: 55, y: 190, w: 365, h: 100 },
      },
      {
        id: 'gaveto-escritorio',
        name: 'Gabinete Executivo & Lavabo',
        area: '16,5 m²',
        dimensions: '4,40m × 3,75m',
        description: 'Escritório privativo isolado da área social com vista para o jardim lateral ajardinado.',
        rect: { x: 310, y: 40, w: 110, h: 145 },
      },
      {
        id: 'gaveto-master',
        name: 'Master Suíte Gaveto com Varanda Panorâmica',
        area: '36,0 m²',
        dimensions: '7,20m × 5,00m',
        description: 'Suíte master de esquina com closet walk-in e varanda angular de vistas amplas.',
        rect: { x: 425, y: 40, w: 160, h: 130 },
      },
      {
        id: 'gaveto-suites',
        name: '3 Suítes Familiares com Varanda',
        area: '62,0 m²',
        dimensions: 'Piso 1 Ala Íntima',
        description: 'Três suítes confortáveis com roupeiros lacados e varandas privativas ensolaradas.',
        rect: { x: 425, y: 175, w: 160, h: 115 },
      },
    ],
  },
  {
    id: 'clube-lote-31',
    code: 'LOTE 31',
    name: 'Clube Social, Desporto & Lazer (Lote 31)',
    subtitle: 'Lote de 767 m² dedicado ao condomínio: Cinema privativo, Ginásio, Jogos, Salão de Festas e Quadra.',
    badge: 'INFRAESTRUTURA COMPLETA • USO EXCLUSIVO',
    privateArea: 384,
    terraceArea: 384,
    totalArea: 767,
    suites: 0,
    bathrooms: 6,
    parking: 12,
    solarOrientation: 'Central Condomínio',
    ceilingHeight: '3,50 m livres',
    basePriceEUR: 710000,
    availableUnits: 1,
    totalUnits: 1,
    description:
      'O coração comunitário do Inara Residencial Talatona. Localizado no Lote 31, este espaço de 767 m² combina 383,5 m² de instalações cobertas (Cinema acústico, Sala de jogos, Salão de festas climatizado com churrasqueira e Ginásio panorâmico) e 383,5 m² de lazer exterior com Quadra Multiuso e Piscina de resort.',
    interiorImage: '/media/interiors/interior-16.jpg',
    exteriorImage: '/media/pool/pool-club-private.jpg',
    features: [
      'Sala de Cinema Privada com acústica profissional e poltronas confortáveis',
      'Ginásio moderno totalmente equipado com áreas de cardio e musculação',
      'Salão de Festas com copa completa e churrasqueira para celebrações',
      'Sala de Jogos com mesa de bilhar e área de entretenimento familiar',
      'Quadra Multiuso polidesportiva com iluminação noturna LED e rede de proteção',
    ],
    rooms: [
      {
        id: 'clube-salao',
        name: 'Salão de Festas & Churrasqueira Social',
        area: '140,0 m²',
        dimensions: 'Piso Térreo Clube',
        description: 'Espaço climatizado para festas e recepções equipado com copa, bancadas em pedra e churrasqueira.',
        rect: { x: 55, y: 40, w: 250, h: 145 },
      },
      {
        id: 'clube-exterior',
        name: 'Quadra Multiuso & Piscina Resort',
        area: '383,5 m²',
        dimensions: 'Área Exterior Lote 31',
        description: 'Polidesportivo iluminado para desportos e piscina de lazer comunitária com solarium.',
        rect: { x: 55, y: 190, w: 365, h: 100 },
      },
      {
        id: 'clube-cinema',
        name: 'Sala de Cinema Privada & Jogos',
        area: '68,0 m²',
        dimensions: 'Setor Audiovisual',
        description: 'Sala de projeção com tratamento acústico e sala de jogos com mesa de bilhar.',
        rect: { x: 310, y: 40, w: 110, h: 145 },
      },
      {
        id: 'clube-fitness',
        name: 'Ginásio Equipado & Fitness Panorâmico',
        area: '78,0 m²',
        dimensions: 'Ala Fitness',
        description: 'Aparelhos de musculação, esteiras ergonómicas e espaço para treino funcional.',
        rect: { x: 425, y: 40, w: 160, h: 130 },
      },
      {
        id: 'clube-apoio',
        name: 'Balneários, Vestiários & Recepção',
        area: '45,0 m²',
        dimensions: 'Serviços de Apoio',
        description: 'Casas de banho completas, vestiários masculinos e femininos e controlo de acesso.',
        rect: { x: 425, y: 175, w: 160, h: 115 },
      },
    ],
  },
];

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  caption: string;
  image: string;
  spanClass: string;
}

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Fachada Principal & Espelho de Água na Hora Dourada',
    category: 'Arquitetura Exterior',
    caption: 'Balanços estruturais em travertino e brises em madeira Cumaru refletidos na lâmina de água.',
    image: '/media/facades/facade-golden-hour-1.jpg',
    spanClass: 'md:col-span-7 md:row-span-2',
  },
  {
    id: 'gal-2',
    title: 'Living Integrado com Luz Natural Difusa',
    category: 'Interiores Autorais',
    caption: 'Pé-direito generoso, materiais orgânicos quentes e caixilharia minimalista de piso ao teto.',
    image: '/media/living/living-natural-light.jpg',
    spanClass: 'md:col-span-5 md:row-span-1',
  },
  {
    id: 'gal-3',
    title: 'Piscina de Borda Infinita & Clube Privado',
    category: 'Lazer de Resort',
    caption: 'Raia de 25 metros climatizada rodeada por vegetação tropical nativa preservada.',
    image: '/media/pool/pool-club-private.jpg',
    spanClass: 'md:col-span-5 md:row-span-1',
  },
  {
    id: 'gal-4',
    title: 'Villas & Jardins Privativos ao Entardecer',
    category: 'Paisagismo Botânico',
    caption: 'Iluminação cénica de baixo impacto que valoriza os caminhos pedonais e a privacidade.',
    image: '/media/facades/exterior-sunset-1.jpg',
    spanClass: 'md:col-span-6 md:row-span-1',
  },
  {
    id: 'gal-5',
    title: 'Suítes Master & Conforto Acústico',
    category: 'Refúgio Íntimo',
    caption: 'Madeira natural certificada, iluminação indireta quente e ligação visual com o verde.',
    image: '/media/suites/suite-master-acoustic.jpg',
    spanClass: 'md:col-span-6 md:row-span-1',
  },
];

export interface DecoradoPhoto {
  id: string;
  src: string;
  title: string;
  category: string;
}

export const INTERIOR_DECORADO_IMAGES: DecoradoPhoto[] = Array.from({ length: 43 }, (_, i) => ({
  id: `decorado-${i + 1}`,
  src: `/media/interiors/interior-${i + 1}.jpg`,
  title: `Interior Decorado Inara • Ambiente ${String(i + 1).padStart(2, '0')}`,
  category: 'Interior Decorado',
}));


export interface StrategicAdvice {
  step: string;
  title: string;
  whyItMatters: string;
  howWeImplementedIt: string;
  sectionAnchor: string;
}

export const CONDOMINIUM_STRATEGY_ADVICE: StrategicAdvice[] = [
  {
    step: '01',
    title: 'Identidade Luminosa & Storytelling ("Porquê Inara?")',
    whyItMatters:
      'Compradores de condomínio fechado em Talatona procuram privacidade, estatuto tranquilo e segurança sólida para a família. O nome "Inara" (que significa "raio de luz / iluminada") guia a assinatura "Sua casa dos sonhos é agora uma realidade".',
    howWeImplementedIt:
      'Criámos uma narrativa editorial sobre as 30 moradias T4 Duplex unifamiliares na Via A4A com acabamentos nobres, piscina privativa individual e condomínio murado com portaria blindada.',
    sectionAnchor: '#conceito',
  },
  {
    step: '02',
    title: 'Mapa de Implantação (Masterplan) Interativo (10.000 m²)',
    whyItMatters:
      'A maior dúvida num loteamento fechado é compreender a disposição dos lotes, acessos rodoviários e o clube de lazer comunitário em relação à moradia.',
    howWeImplementedIt:
      'Desenvolvemos um Masterplan Interativo com 7 hotspots reais: Portaria 24h na Via A4A, Piscina de Resort, Ginásio, Salão de Festas com Churrasqueira, Quadra Multiuso, Sala de Cinema/Jogos e Loteamento Geral de 31 lotes.',
    sectionAnchor: '#implantacao',
  },
  {
    step: '03',
    title: 'Plantas Técnicas Cotadas (Opção A, Opção B e Gaveto)',
    whyItMatters:
      'Mostrar as opções de planta de 217 m² com 100% suítes, escritório independente e piscina privativa esclarece imediatamente os compradores mais exigentes.',
    howWeImplementedIt:
      'Incluímos um seletor interativo com as plantas cotadas em SVG da Moradia T4 Opção A, Opção B, Lote Gaveto 1 (358 m² de lote) e as instalações do Clube do Lote 31.',
    sectionAnchor: '#plantas',
  },
  {
    step: '04',
    title: 'Segurança 24h, Lote 31 de Lazer & Legalização Total',
    whyItMatters:
      'A certeza jurídica do registo predial e o valor intrínseco de equipamentos comunitários próprios (cinema, ginásio, festas e quadra) aceleram a decisão de compra.',
    howWeImplementedIt:
      'Destacamos a transparência documental (Prédio nº 1062-Talatona da 2ª Secção do Registo Predial de Luanda, promotor F.I.P.) e a avaliação independente FISPLAN.',
    sectionAnchor: '#localizacao',
  },
  {
    step: '05',
    title: 'Captação de Leads Diretos (Contactos Oficiais & Dossier)',
    whyItMatters:
      'Facilitar o contacto por WhatsApp e chamada direta com telefones locais em Luanda aumenta a taxa de agendamento de visitas ao terreno em Talatona.',
    howWeImplementedIt:
      'Disponibilizamos os números oficiais (+244 931 893 859 / 923 436 077 / 929 120 300), email oficial (vendas@inara-africa.com) e download do Dossier Executivo.',
    sectionAnchor: '#agendar',
  },
];
