import React from 'react';
import {
  X,
  Lightbulb,
  CheckCircle2,
  Globe,
  MapPin,
  ArrowRight,
  Building2,
  Shield,
  Sparkles,
} from 'lucide-react';
import {
  CONDOMINIUM_STRATEGY_ADVICE,
  CURRENCIES,
  CurrencyCode,
} from '../data/inaraData';

interface StrategyAdvisorModalProps {
  isOpen: boolean;
  onClose: () => void;
  currency: CurrencyCode;
  onChangeCurrency: (c: CurrencyCode) => void;
  customCity: string;
  onChangeCustomCity: (city: string) => void;
}

export const StrategyAdvisorModal: React.FC<StrategyAdvisorModalProps> = ({
  isOpen,
  onClose,
  currency,
  onChangeCurrency,
  customCity,
  onChangeCustomCity,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-[#151814]/75 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl h-full overflow-y-auto bg-[#F7F4EF] text-[#1C1B18] shadow-2xl border-l border-[#DFD8CC] flex flex-col justify-between">
        {/* Sticky Header */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-5 bg-[#151814] text-[#F7F4EF] border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#B86B43]/20 border border-[#B86B43] flex items-center justify-center text-[#B86B43]">
              <Lightbulb className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono-spec uppercase tracking-widest text-[#B86B43] block">
                CONSULTORIA IMOBILIÁRIA & DIGITAL
              </span>
              <h3 className="text-lg font-serif-editorial font-semibold">
                O que fazer para apresentar o Condomínio Residencial Inara?
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 text-white/80 hover:text-white transition-colors"
            aria-label="Fechar consultoria"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 sm:p-8 space-y-8">
          {/* Live Market & Currency Customizer for the Project Owner */}
          <div className="bg-[#EFEAE1] p-5 rounded-lg border border-[#B86B43]/40 space-y-4">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 text-xs font-mono-spec uppercase tracking-wider text-[#B86B43] font-semibold">
                <Sparkles className="w-4 h-4" />
                Personalizador Rápido do Seu Empreendimento
              </span>
              <span className="text-[11px] font-mono-spec text-[#666159]">
                Ajuste ao seu mercado
              </span>
            </div>
            <p className="text-xs text-[#666159] leading-relaxed">
              Adapte instantaneamente a moeda e a localização exibidas em todo o website do{' '}
              <strong className="text-[#1C1B18]">Residencial Inara</strong> (Portugal, Angola, Brasil ou Moçambique):
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-[#1C1B18] mb-1.5 flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-[#B86B43]" />
                  Mercado & Moeda das Tabelas
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {(Object.keys(CURRENCIES) as CurrencyCode[]).map((code) => {
                    const item = CURRENCIES[code];
                    const active = currency === code;
                    return (
                      <button
                        key={code}
                        type="button"
                        onClick={() => {
                          onChangeCurrency(code);
                          onChangeCustomCity(item.cityDefault);
                        }}
                        className={`px-3 py-2 rounded text-xs font-mono-spec text-left border transition-all cursor-pointer ${
                          active
                            ? 'bg-[#1C1B18] text-[#F7F4EF] border-[#1C1B18] font-semibold'
                            : 'bg-white/80 text-[#1C1B18] border-[#DFD8CC] hover:border-[#B86B43]'
                        }`}
                      >
                        <span className="block">{item.label}</span>
                        <span className="text-[10px] opacity-75">{item.regionLabel}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#1C1B18] mb-1.5 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#B86B43]" />
                  Cidade / Bairro do Condomínio
                </label>
                <input
                  type="text"
                  value={customCity}
                  onChange={(e) => onChangeCustomCity(e.target.value)}
                  placeholder="Ex: Talatona • Luanda"
                  className="w-full px-3.5 py-2.5 rounded bg-white border border-[#DFD8CC] text-sm text-[#1C1B18] focus:outline-none focus:border-[#B86B43]"
                />
                <span className="block text-[11px] text-[#666159] mt-1.5">
                  Experimente escrever o bairro exato do seu terreno (ex: <em>Talatona, Luanda</em> ou <em>Cascais, Lisboa</em>).
                </span>
              </div>
            </div>
          </div>

          {/* Strategic Recommendations */}
          <div className="space-y-4">
            <div>
              <h4 className="text-2xl font-serif-editorial font-semibold text-[#1C1B18]">
                Os 5 Pilares Essenciais para Vender um Condomínio Fechado
              </h4>
              <p className="text-sm text-[#666159] mt-1">
                Para que o website do <strong>Residencial Inara</strong> converta visitantes em reservas reais, já implementámos neste projeto as 5 melhores práticas do mercado imobiliário de alto padrão:
              </p>
            </div>

            <div className="space-y-4">
              {CONDOMINIUM_STRATEGY_ADVICE.map((item) => (
                <div
                  key={item.step}
                  className="p-5 bg-white/80 rounded-lg border border-[#DFD8CC] hover:border-[#B86B43] transition-colors space-y-2.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-2 text-xs font-mono-spec font-semibold text-[#B86B43]">
                      <span className="w-6 h-6 rounded-full bg-[#B86B43]/15 flex items-center justify-center">
                        {item.step}
                      </span>
                      RECOMENDAÇÃO ESTRATÉGICA
                    </span>
                    <a
                      href={item.sectionAnchor}
                      onClick={onClose}
                      className="inline-flex items-center gap-1 text-xs font-medium text-[#3A4D3E] hover:text-[#B86B43] transition-colors"
                    >
                      Ver no site <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>

                  <h5 className="text-lg font-serif-editorial font-semibold text-[#1C1B18]">
                    {item.title}
                  </h5>

                  <p className="text-xs text-[#666159] leading-relaxed">
                    <strong className="text-[#1C1B18]">Porque é crucial:</strong> {item.whyItMatters}
                  </p>

                  <div className="pt-2 border-t border-[#DFD8CC]/60 flex items-start gap-2 text-xs text-[#2E5A3C]">
                    <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>
                      <strong>Como aplicámos no Residencial Inara:</strong> {item.howWeImplementedIt}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Extra Offline / Commercial Tips */}
          <div className="bg-[#151814] text-[#F7F4EF] p-6 rounded-lg space-y-4">
            <div className="flex items-center gap-2 text-[#B86B43] text-xs font-mono-spec uppercase tracking-wider">
              <Building2 className="w-4 h-4" />
              Próximos Passos Fora do Website (Stand de Vendas)
            </div>
            <h5 className="text-xl font-serif-editorial">
              3 Ações Complementares que Recomendamos para o Lançamento
            </h5>
            <ul className="space-y-2.5 text-xs text-white/80 leading-relaxed">
              <li className="flex items-start gap-2">
                <Shield className="w-4 h-4 text-[#B86B43] shrink-0 mt-0.5" />
                <span>
                  <strong className="text-white">1. Stand no Local com Torre de Observação ou Casa Modelo:</strong>{' '}
                  Quando o cliente agenda a visita pelo site, recebê-lo no terreno com café gourmet, amostras reais das pedras/madeiras e vista da implantação fecha 40% mais negócios.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Shield className="w-4 h-4 text-[#B86B43] shrink-0 mt-0.5" />
                <span>
                  <strong className="text-white">2. Vídeo com Drone do Terreno Real + Inserção 3D:</strong>{' '}
                  Grave um voo de drone ao pôr-do-sol mostrando os acessos asfaltados e a vizinhança até à portaria do Residencial Inara.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Shield className="w-4 h-4 text-[#B86B43] shrink-0 mt-0.5" />
                <span>
                  <strong className="text-white">3. Pré-Lançamento para Lista VIP ("Friends & Family"):</strong>{' '}
                  Reserve as primeiras 8 a 10 unidades com condição especial de tabela zero para gerar escassez imediata antes da abertura ao público geral.
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 z-20 p-4 bg-[#EFEAE1] border-t border-[#DFD8CC] flex items-center justify-between">
          <span className="text-xs text-[#666159]">
            O website já está 100% funcional com todas estas secções.
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded bg-[#1C1B18] hover:bg-[#B86B43] text-white text-xs font-medium transition-colors cursor-pointer"
          >
            Explorar o Website Residencial Inara
          </button>
        </div>
      </div>
    </div>
  );
};
