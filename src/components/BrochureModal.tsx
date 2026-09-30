import React, { useState } from 'react';
import { X, Download, CheckCircle2, FileText, ShieldCheck, Sparkles, Printer } from 'lucide-react';
import { CurrencyCode, TYPOLOGIES } from '../data/inaraData';
import { formatPrice } from '../utils/formatCurrency';

interface BrochureModalProps {
  isOpen: boolean;
  onClose: () => void;
  currency: CurrencyCode;
  cityLabel: string;
}

export const BrochureModal: React.FC<BrochureModalProps> = ({
  isOpen,
  onClose,
  currency,
  cityLabel,
}) => {
  const [email, setEmail] = useState('');
  const [downloaded, setDownloaded] = useState(false);

  if (!isOpen) return null;

  const handleDownload = (e: React.FormEvent) => {
    e.preventDefault();
    setDownloaded(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#151814]/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#F7F4EF] text-[#1C1B18] rounded-lg shadow-2xl border border-[#DFD8CC]">
        {/* Top Bar */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 bg-[#151814] text-[#F7F4EF] border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg overflow-hidden border border-[#B86B43]/50 bg-[#5E6470] shrink-0">
              <img
                src="/media/logo/inara-emblem.jpg"
                alt="Emblema Inara Residencial Talatona"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <span className="text-[10px] font-mono-spec uppercase tracking-widest text-[#B86B43] block">
                DOSSIER TÉCNICO & COMERCIAL • EDIÇÃO OFICIAL 2026
              </span>
              <h3 className="text-lg font-serif-editorial tracking-wide">
                Brochura Digital — Inara Residencial Talatona
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 transition-colors text-[#F7F4EF]/80 hover:text-white"
            aria-label="Fechar janela"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 sm:p-8 space-y-8">
          {/* Executive Summary Banner */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 bg-[#EFEAE1] p-6 rounded-lg border border-[#DFD8CC]">
            <div className="md:col-span-5 rounded overflow-hidden">
              <img
                src="/media/hero/inara-main-hero.jpg"
                alt="Residencial Inara Fachada"
                className="w-full h-full object-cover min-h-[200px]"
              />
            </div>
            <div className="md:col-span-7 flex flex-col justify-between space-y-4">
              <div>
                <span className="text-xs font-mono-spec uppercase tracking-widest text-[#B86B43]">
                  PROJETO OFICIAL: INARA RESIDENCIAL TALATONA
                </span>
                <h4 className="text-2xl font-serif-editorial font-semibold mt-1">
                  “Sua casa dos sonhos é agora uma realidade”
                </h4>
                <p className="text-sm text-[#666159] mt-2 leading-relaxed">
                  Implantado num terreno exclusivo de 10.000 m² com 31 lotes na Via A4A (Estrada do Rio Cambambe), Talatona. Composto por 30 moradias T4 Duplex unifamiliares de 217 m² ABC (100% em suíte com varandas, escritório e piscina privativa) e 1 lote de 767 m² (Lote 31) inteiramente dedicado a clube social, desporto e lazer comunitário.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-3 pt-3 border-t border-[#DFD8CC] font-mono-spec text-xs">
                <div>
                  <span className="text-[#666159] block text-[10px]">MORADIAS T4</span>
                  <strong className="text-sm text-[#1C1B18]">30 Exclusivas</strong>
                </div>
                <div>
                  <span className="text-[#666159] block text-[10px]">CLUBE & LAZER</span>
                  <strong className="text-sm text-[#1C1B18]">Lote 31 (767 m²)</strong>
                </div>
                <div>
                  <span className="text-[#666159] block text-[10px]">TERRENO URBANO</span>
                  <strong className="text-sm text-[#2E5A3C]">10.000 m²</strong>
                </div>
              </div>
            </div>
          </div>

          {/* Caderno de Acabamentos Nobres */}
          <div>
            <h4 className="text-xl font-serif-editorial font-semibold mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#B86B43]" />
              Caderno de Acabamentos & Especificações de Alto Padrão
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm">
              <div className="p-4 bg-white/70 rounded border border-[#DFD8CC]">
                <span className="font-mono-spec text-xs text-[#B86B43] block mb-1">01. REVESTIMENTOS</span>
                <strong className="block text-[#1C1B18] mb-1">Travertino & Madeira Cumaru</strong>
                <p className="text-xs text-[#666159]">
                  Pisos sociais em placas de Travertino Romano levigado (120×120cm) e suítes em soalho multicamada de Carvalho e Cumaru maciço.
                </p>
              </div>
              <div className="p-4 bg-white/70 rounded border border-[#DFD8CC]">
                <span className="font-mono-spec text-xs text-[#B86B43] block mb-1">02. CAIXILHARIA & ACÚSTICA</span>
                <strong className="block text-[#1C1B18] mb-1">Corte Térmico Minimalista</strong>
                <p className="text-xs text-[#666159]">
                  Perfis ocultos de alumínio anodizado bronze com vidro duplo laminado de controlo solar ( atenuação acústica de 42 dB).
                </p>
              </div>
              <div className="p-4 bg-white/70 rounded border border-[#DFD8CC]">
                <span className="font-mono-spec text-xs text-[#B86B43] block mb-1">03. DOMÓTICA & ENERGIA</span>
                <strong className="block text-[#1C1B18] mb-1">Automação & Autonomia Total</strong>
                <p className="text-xs text-[#666159]">
                  Infraestrutura KNX para iluminação/climatização, painéis solares fotovoltaicos, gerador 100% e Wallbox elétrico individual.
                </p>
              </div>
            </div>
          </div>

          {/* Summary Table of Typologies */}
          <div>
            <h4 className="text-xl font-serif-editorial font-semibold mb-3">
              Quadro Síntese de Tipologias & Valores de Lançamento ({currency})
            </h4>
            <div className="overflow-x-auto border border-[#DFD8CC] rounded-lg">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-[#EFEAE1] text-[#1C1B18] font-mono-spec text-xs border-b border-[#DFD8CC]">
                    <th className="py-3 px-4">Tipologia</th>
                    <th className="py-3 px-4">Área Total</th>
                    <th className="py-3 px-4">Suítes / Vagas</th>
                    <th className="py-3 px-4">Disponibilidade</th>
                    <th className="py-3 px-4 text-right">Valor desde</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#DFD8CC] bg-white/60">
                  {TYPOLOGIES.map((t) => (
                    <tr key={t.id} className="hover:bg-[#EFEAE1]/50">
                      <td className="py-3 px-4 font-semibold text-[#1C1B18]">{t.name}</td>
                      <td className="py-3 px-4 font-mono-spec">
                        {t.totalArea} m² ({t.privateArea}m² + {t.terraceArea}m²)
                      </td>
                      <td className="py-3 px-4 font-mono-spec">
                        {t.suites} Suítes • {t.parking} Vagas
                      </td>
                      <td className="py-3 px-4">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-mono-spec bg-[#2E5A3C]/15 text-[#2E5A3C] font-medium">
                          {t.availableUnits} de {t.totalUnits} disponíveis
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right font-mono-spec font-semibold text-[#B86B43]">
                        {formatPrice(t.basePriceEUR, currency)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Download / Email Action Box */}
          <div className="bg-[#151814] text-[#F7F4EF] p-6 rounded-lg flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-[#B86B43] text-xs font-mono-spec uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4" />
                Plantas Cotadas em Escala 1:50 + Tabela Financeira Completa
              </div>
              <h5 className="text-xl font-serif-editorial">
                Receba o PDF de Alta Resolução (48 páginas) ou imprima este resumo
              </h5>
            </div>

            {!downloaded ? (
              <form onSubmit={handleDownload} className="flex flex-col sm:flex-row w-full md:w-auto gap-3">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="O seu melhor e-mail..."
                  className="px-4 py-2.5 rounded bg-white/10 border border-white/20 text-sm text-white placeholder:text-white/50 focus:outline-none focus:border-[#B86B43] min-w-[240px]"
                />
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded bg-[#B86B43] hover:bg-[#96522F] text-white text-sm font-medium transition-colors cursor-pointer shrink-0"
                >
                  <Download className="w-4 h-4" />
                  Descarregar PDF Completo
                </button>
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded border border-white/25 hover:bg-white/10 text-white text-sm transition-colors cursor-pointer shrink-0"
                  title="Imprimir Resumo"
                >
                  <Printer className="w-4 h-4" />
                </button>
              </form>
            ) : (
              <div className="flex items-center gap-3 bg-[#2E5A3C]/30 border border-[#2E5A3C] px-4 py-3 rounded text-sm">
                <CheckCircle2 className="w-5 h-5 text-[#68D391] shrink-0" />
                <div>
                  <strong className="block text-white">Brochura enviada e pronta!</strong>
                  <span className="text-xs text-white/80">
                    Enviámos cópia para {email} com as plantas em alta resolução.
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
