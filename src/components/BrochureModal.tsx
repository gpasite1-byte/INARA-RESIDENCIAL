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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0A1128]/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#F8FAFC] text-[#0F172A] rounded-2xl shadow-2xl border border-[#E2E8F0]">
        {/* Top Bar */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 bg-gradient-to-r from-[#0052CC] via-[#0066FF] to-[#3B0764] text-white border-b border-white/10">
          <div className="flex items-center gap-3">
            <img
              src="/media/logo/inara-logomarca-oficial.jpg"
              alt="INARA RESIDÊNCIAL TALATONA"
              className="h-12 w-auto rounded-lg shadow-sm border border-white/20 object-contain"
            />
            <div className="border-l border-white/20 pl-3">
              <span className="text-[10px] font-mono-spec uppercase tracking-widest text-[#00D2FF] block font-bold">
                DOSSIER TÉCNICO & COMERCIAL • EDIÇÃO OFICIAL 2026
              </span>
              <h3 className="text-sm sm:text-base font-bold tracking-wide">
                Brochura Digital — Inara Residencial Talatona
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 transition-colors text-white/80 hover:text-white cursor-pointer"
            aria-label="Fechar janela"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 sm:p-8 space-y-8">
          {/* Executive Summary Banner */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 bg-slate-50 p-6 rounded-2xl border border-slate-200">
            <div className="md:col-span-5 rounded-xl overflow-hidden shadow-md">
              <img
                src="/media/campaign/Capa Hinara 01.png"
                alt="Residencial Inara Obra e Fachada"
                className="w-full h-full object-cover min-h-[200px]"
              />
            </div>
            <div className="md:col-span-7 flex flex-col justify-between space-y-4">
              <div>
                <span className="text-xs font-mono-spec uppercase tracking-widest text-[#0052CC] font-bold">
                  PROJETO OFICIAL: INARA RESIDENCIAL TALATONA
                </span>
                <h4 className="text-2xl font-bold mt-1 text-[#0F172A]">
                  “Mais do que uma casa, um novo estilo de vida”
                </h4>
                <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                  Implantado num terreno exclusivo de 10.000 m² com 31 lotes na Via A4A (Estrada do Rio Cambambe), Talatona. Composto por 30 moradias T4 Duplex unifamiliares de 217 m² ABC (100% em suíte com varandas, escritório e piscina privativa) e 1 lote de 767 m² (Lote 31) inteiramente dedicado a clube social, desporto e lazer comunitário. Financiamento garantido através do <strong>Standard Bank Angola</strong>.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-3 pt-3 border-t border-slate-200 font-mono-spec text-xs">
                <div>
                  <span className="text-slate-500 block text-[10px]">MORADIAS T4</span>
                  <strong className="text-sm text-[#0F172A]">30 Exclusivas</strong>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">CLUBE & LAZER</span>
                  <strong className="text-sm text-[#0F172A]">Lote 31 (767 m²)</strong>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">FINANCIAMENTO</span>
                  <strong className="text-sm text-[#0052CC]">Standard Bank</strong>
                </div>
              </div>
            </div>
          </div>

          {/* Caderno de Acabamentos Nobres */}
          <div>
            <h4 className="text-xl font-bold mb-4 flex items-center gap-2 text-[#0F172A]">
              <Sparkles className="w-5 h-5 text-[#0052CC]" />
              Caderno de Acabamentos & Especificações de Alto Padrão
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm">
              <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm">
                <span className="font-mono-spec text-xs text-[#0052CC] font-bold block mb-1">01. REVESTIMENTOS</span>
                <strong className="block text-[#0F172A] mb-1">Travertino & Madeira Cumaru</strong>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Pisos sociais em placas de Travertino levigado (120×120cm) e suítes em soalho de Carvalho e Cumaru maciço.
                </p>
              </div>
              <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm">
                <span className="font-mono-spec text-xs text-[#0052CC] font-bold block mb-1">02. CAIXILHARIA & ACÚSTICA</span>
                <strong className="block text-[#0F172A] mb-1">Corte Térmico Minimalista</strong>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Perfis ocultos de alumínio anodizado grafite com vidro duplo laminado de controlo solar (atenuação de 42 dB).
                </p>
              </div>
              <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm">
                <span className="font-mono-spec text-xs text-[#0052CC] font-bold block mb-1">03. DOMÓTICA & ENERGIA</span>
                <strong className="block text-[#0F172A] mb-1">Automação & Autonomia Total</strong>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Infraestrutura KNX para iluminação e climatização, gerador 100%, painéis solares e Wallbox elétrico individual.
                </p>
              </div>
            </div>
          </div>

          {/* Summary Table of Typologies */}
          <div>
            <h4 className="text-xl font-bold mb-3 text-[#0F172A]">
              Quadro Síntese de Tipologias & Valores de Lançamento ({currency})
            </h4>
            <div className="overflow-x-auto border border-slate-200 rounded-2xl shadow-sm">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-slate-100 text-[#0F172A] font-mono-spec text-xs border-b border-slate-200">
                    <th className="py-3 px-4">Tipologia</th>
                    <th className="py-3 px-4">Área Total</th>
                    <th className="py-3 px-4">Suítes / Vagas</th>
                    <th className="py-3 px-4">Disponibilidade</th>
                    <th className="py-3 px-4 text-right">Valor desde</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 bg-white">
                  {TYPOLOGIES.map((t) => (
                    <tr key={t.id} className="hover:bg-blue-50/50 transition-colors">
                      <td className="py-3 px-4 font-bold text-[#0F172A]">{t.name}</td>
                      <td className="py-3 px-4 font-mono-spec">
                        {t.totalArea} m² ({t.privateArea}m² + {t.terraceArea}m²)
                      </td>
                      <td className="py-3 px-4 font-mono-spec">
                        {t.suites} Suítes • {t.parking} Vagas
                      </td>
                      <td className="py-3 px-4">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-mono-spec bg-emerald-100 text-emerald-700 font-bold">
                          {t.availableUnits} de {t.totalUnits} disponíveis
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right font-mono-spec font-bold text-[#0052CC]">
                        {formatPrice(t.basePriceEUR, currency)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Download / Email Action Box */}
          <div className="bg-gradient-to-r from-[#0052CC] via-[#0066FF] to-[#3B0764] text-white p-6 sm:p-8 rounded-2xl border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-[#00D2FF] text-xs font-mono-spec uppercase tracking-wider font-bold">
                <ShieldCheck className="w-4 h-4" />
                Plantas Cotadas em Escala 1:50 + Financiamento Standard Bank
              </div>
              <h5 className="text-xl font-bold">
                Receba o Dossier Técnico Oficial em PDF (Alta Resolução)
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
                  className="px-4 py-2.5 rounded-full bg-white/10 border border-white/20 text-sm text-white placeholder:text-white/60 focus:outline-none focus:border-[#00D2FF] min-w-[240px]"
                />
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-white text-[#0052CC] hover:bg-slate-100 font-bold text-sm transition-all shadow-md cursor-pointer shrink-0"
                >
                  <Download className="w-4 h-4" />
                  Descarregar PDF
                </button>
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full border border-white/25 hover:bg-white/10 text-white text-sm transition-colors cursor-pointer shrink-0"
                  title="Imprimir Resumo"
                >
                  <Printer className="w-4 h-4" />
                </button>
              </form>
            ) : (
              <div className="flex items-center gap-3 bg-emerald-950/60 border border-emerald-500/50 px-4 py-3 rounded-full text-sm">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
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
