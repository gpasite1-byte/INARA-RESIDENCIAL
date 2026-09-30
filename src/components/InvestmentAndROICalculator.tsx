import React, { useState } from 'react';
import {
  Calculator,
  TrendingUp,
  ShieldCheck,
  Percent,
  Key,
  Landmark,
  CheckCircle2,
} from 'lucide-react';
import { CurrencyCode, TYPOLOGIES, Typology } from '../data/inaraData';
import { SECURITY_RINGS } from '../data/inaraOption2Data';
import { formatPrice } from '../utils/formatCurrency';

interface InvestmentAndROICalculatorProps {
  currency: CurrencyCode;
}

export const InvestmentAndROICalculator: React.FC<InvestmentAndROICalculatorProps> = ({
  currency,
}) => {
  const [calcMode, setCalcMode] = useState<'financing' | 'investor'>('investor');
  const [selectedTypo, setSelectedTypo] = useState<Typology>(TYPOLOGIES[0]); // T2 Garden is great for ROI
  const [entryPct, setEntryPct] = useState<number>(25);
  const [loanYears, setLoanYears] = useState<number>(25);
  const [activeRingIndex, setActiveRingIndex] = useState<number>(0);

  // Financing Calculations
  const basePrice = selectedTypo.basePriceEUR;
  const entryAmount = Math.round((basePrice * entryPct) / 100);
  const construction24MonthsTotal = Math.round(basePrice * 0.25); // 25% during 24 months construction
  const monthlyConstructionInstallment = Math.round(construction24MonthsTotal / 24);
  const bankLoanPrincipal = basePrice - entryAmount - construction24MonthsTotal;

  // Approximate monthly mortgage payment at 4.2% annual rate
  const monthlyInterestRate = 0.042 / 12;
  const totalMonths = loanYears * 12;
  const estimatedBankMonthly =
    bankLoanPrincipal > 0
      ? Math.round(
          (bankLoanPrincipal *
            (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, totalMonths))) /
            (Math.pow(1 + monthlyInterestRate, totalMonths) - 1)
        )
      : 0;

  // Investor ROI Calculations
  const estimatedValueAtDelivery = Math.round(basePrice * 1.28); // +28% appreciation from Phase I launch to keys
  const capitalGainEUR = estimatedValueAtDelivery - basePrice;
  const estimatedMonthlyRentEUR = Math.round((basePrice * 0.076) / 12); // ~7.6% gross annual yield in gated executive condos
  const annualRentEUR = estimatedMonthlyRentEUR * 12;

  return (
    <section
      id="simulador-roi"
      className="py-20 sm:py-28 bg-[#EFEAE1] border-y border-[#DFD8CC]"
    >
      <div className="max-w-[1380px] mx-auto px-4 sm:px-8 space-y-20">
        {/* PART 1: DUAL FINANCIAL & INVESTOR ROI CALCULATOR */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left 5 Columns: Mode Switcher & Inputs */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#1C1B18] text-[#D9A86C] font-mono-spec text-xs uppercase tracking-widest">
              <Calculator className="w-3.5 h-3.5" />
              <span>SIMULADOR FINANCEIRO & RENTABILIDADE</span>
            </div>

            <h2 className="font-serif-editorial text-3xl sm:text-5xl text-[#1C1B18] font-normal leading-tight">
              Planeie a compra ou calcule o retorno do seu investimento.
            </h2>

            <p className="text-sm text-[#666159] leading-relaxed">
              Condomínios fechados com segurança 24h e lazer completo lideram a procura de
              arrendamento executivo (expatriados, diplomatas e diretores) e registam a maior
              valorização patrimonial entre o lançamento na planta e a entrega das chaves.
            </p>

            {/* Dual Mode Switcher */}
            <div className="grid grid-cols-2 gap-2 p-1.5 rounded-xl bg-[#F7F4EF] border border-[#DFD8CC]">
              <button
                type="button"
                onClick={() => setCalcMode('investor')}
                className={`py-3 px-4 rounded-lg text-xs font-mono-spec uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2 ${
                  calcMode === 'investor'
                    ? 'bg-[#2E5A3C] text-white font-semibold shadow'
                    : 'text-[#666159] hover:text-[#1C1B18]'
                }`}
              >
                <TrendingUp className="w-4 h-4" />
                <span>Visão Investidor (ROI)</span>
              </button>
              <button
                type="button"
                onClick={() => setCalcMode('financing')}
                className={`py-3 px-4 rounded-lg text-xs font-mono-spec uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2 ${
                  calcMode === 'financing'
                    ? 'bg-[#1C1B18] text-white font-semibold shadow'
                    : 'text-[#666159] hover:text-[#1C1B18]'
                }`}
              >
                <Landmark className="w-4 h-4" />
                <span>Plano de Pagamento</span>
              </button>
            </div>

            {/* Typology Selector for Calculator */}
            <div className="space-y-2">
              <label className="block font-mono-spec text-xs uppercase text-[#666159]">
                1. Escolha a Tipologia para Simular:
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                {TYPOLOGIES.map((t) => {
                  const active = selectedTypo.id === t.id;
                  return (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setSelectedTypo(t)}
                      className={`p-3 rounded-lg border text-left transition-all cursor-pointer ${
                        active
                          ? 'bg-white border-[#B86B43] ring-2 ring-[#B86B43]/25'
                          : 'bg-[#F7F4EF] border-[#DFD8CC] hover:border-[#1C1B18]'
                      }`}
                    >
                      <strong className="block text-xs font-mono-spec text-[#1C1B18]">
                        {t.name}
                      </strong>
                      <span className="text-xs font-mono-spec text-[#B86B43] font-semibold">
                        {formatPrice(t.basePriceEUR, currency)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Sliders when in Financing Mode */}
            {calcMode === 'financing' && (
              <div className="bg-[#F7F4EF] p-5 rounded-xl border border-[#DFD8CC] space-y-4">
                <div>
                  <div className="flex justify-between text-xs font-mono-spec mb-1">
                    <span className="text-[#666159]">Sinal de Entrada ({entryPct}%):</span>
                    <strong className="text-[#1C1B18]">
                      {formatPrice(entryAmount, currency)}
                    </strong>
                  </div>
                  <input
                    type="range"
                    min={15}
                    max={60}
                    step={5}
                    value={entryPct}
                    onChange={(e) => setEntryPct(Number(e.target.value))}
                    className="w-full accent-[#B86B43] cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono-spec mb-1">
                    <span className="text-[#666159]">Prazo Financiamento Pós-Chave:</span>
                    <strong className="text-[#1C1B18]">{loanYears} Anos</strong>
                  </div>
                  <input
                    type="range"
                    min={5}
                    max={35}
                    step={5}
                    value={loanYears}
                    onChange={(e) => setLoanYears(Number(e.target.value))}
                    className="w-full accent-[#B86B43] cursor-pointer"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Right 7 Columns: Dynamic Results Dashboard */}
          <div className="lg:col-span-7">
            {calcMode === 'investor' ? (
              <div className="bg-[#151814] text-[#F7F4EF] p-6 sm:p-10 rounded-2xl border border-[#DFD8CC] shadow-xl space-y-8">
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/15 pb-6">
                  <div>
                    <span className="font-mono-spec text-xs uppercase tracking-widest text-emerald-400 block">
                      ESTUDO DE VIABILIDADE PATRIMONIAL • {selectedTypo.code}
                    </span>
                    <h3 className="font-serif-editorial text-3xl text-white mt-1">
                      Projeção de Valorização & Renda Anual
                    </h3>
                  </div>
                  <span className="px-3 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-mono-spec text-xs font-bold">
                    YIELD EST. 7,6% A.A.
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-5 rounded-xl bg-white/5 border border-white/10">
                    <span className="font-mono-spec text-[10px] uppercase tracking-wider text-white/60 block">
                      1. COMPRA NA TABELA ZERO (HOJE)
                    </span>
                    <strong className="font-serif-editorial text-2xl sm:text-3xl text-white block mt-1">
                      {formatPrice(basePrice, currency)}
                    </strong>
                    <span className="text-xs text-white/55 mt-1 block">
                      Preço por m² bonificado de lançamento
                    </span>
                  </div>

                  <div className="p-5 rounded-xl bg-emerald-950/40 border border-emerald-500/30">
                    <span className="font-mono-spec text-[10px] uppercase tracking-wider text-emerald-300 block">
                      2. VALOR EST. NA ENTREGA (+28%)
                    </span>
                    <strong className="font-serif-editorial text-2xl sm:text-3xl text-emerald-400 block mt-1">
                      {formatPrice(estimatedValueAtDelivery, currency)}
                    </strong>
                    <span className="text-xs text-emerald-200/80 mt-1 block">
                      Ganho de capital: +{formatPrice(capitalGainEUR, currency)}
                    </span>
                  </div>

                  <div className="p-5 rounded-xl bg-white/5 border border-white/10">
                    <span className="font-mono-spec text-[10px] uppercase tracking-wider text-[#D9A86C] block">
                      3. RENDA MENSAL ARRENDAMENTO
                    </span>
                    <strong className="font-serif-editorial text-2xl sm:text-3xl text-[#D9A86C] block mt-1">
                      {formatPrice(estimatedMonthlyRentEUR, currency)}
                    </strong>
                    <span className="text-xs text-white/60 mt-1 block">
                      Acumulado anual: {formatPrice(annualRentEUR, currency)}/ano
                    </span>
                  </div>
                </div>

                <div className="p-5 rounded-xl bg-white/5 border border-white/10 space-y-2.5 text-xs text-white/80">
                  <strong className="text-white font-mono-spec uppercase tracking-wider block">
                    Porque o Residencial Inara tem alta liquidez para investidores:
                  </strong>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>
                      <strong>Gestão Inara Concierge:</strong> Serviço opcional de administração de
                      arrendamento de longa duração para empresas multinacionais e quadros executivos.
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>
                      <strong>Baixa Taxa de Vacância:</strong> Condomínios fechados com segurança
                      armada 24h, gerador 100% e escola próxima têm lista de espera permanente.
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-[#F7F4EF] p-6 sm:p-10 rounded-2xl border border-[#DFD8CC] shadow-xl space-y-8">
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#DFD8CC] pb-6">
                  <div>
                    <span className="font-mono-spec text-xs uppercase tracking-widest text-[#B86B43] block">
                      CRONOGRAMA FINANCEIRO SUAVE • {selectedTypo.code}
                    </span>
                    <h3 className="font-serif-editorial text-3xl text-[#1C1B18] mt-1">
                      Fluxo de Pagamento sem Juros durante a Obra
                    </h3>
                  </div>
                  <span className="px-3 py-1 rounded bg-[#1C1B18] text-white font-mono-spec text-xs">
                    Valor Total: {formatPrice(basePrice, currency)}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-5 rounded-xl bg-[#EFEAE1] border border-[#DFD8CC]">
                    <div className="flex items-center justify-between text-xs font-mono-spec text-[#666159] mb-2">
                      <span>ETAPA 1 • ATO / SINAL</span>
                      <Percent className="w-4 h-4 text-[#B86B43]" />
                    </div>
                    <strong className="font-serif-editorial text-2xl sm:text-3xl text-[#1C1B18] block">
                      {formatPrice(entryAmount, currency)}
                    </strong>
                    <span className="text-xs text-[#666159] mt-1 block">
                      {entryPct}% na assinatura do Contrato-Promessa
                    </span>
                  </div>

                  <div className="p-5 rounded-xl bg-[#EFEAE1] border border-[#DFD8CC]">
                    <div className="flex items-center justify-between text-xs font-mono-spec text-[#666159] mb-2">
                      <span>ETAPA 2 • 24 MESES OBRA</span>
                      <Calculator className="w-4 h-4 text-[#B86B43]" />
                    </div>
                    <strong className="font-serif-editorial text-2xl sm:text-3xl text-[#B86B43] block">
                      {formatPrice(monthlyConstructionInstallment, currency)}/mês
                    </strong>
                    <span className="text-xs text-[#666159] mt-1 block">
                      Total de 25% direto c/ promotor sem juros bancários
                    </span>
                  </div>

                  <div className="p-5 rounded-xl bg-[#1C1B18] text-white">
                    <div className="flex items-center justify-between text-xs font-mono-spec text-[#D9A86C] mb-2">
                      <span>ETAPA 3 • PÓS-CHAVES</span>
                      <Key className="w-4 h-4 text-[#D9A86C]" />
                    </div>
                    <strong className="font-serif-editorial text-2xl sm:text-3xl text-white block">
                      {formatPrice(estimatedBankMonthly, currency)}/mês
                    </strong>
                    <span className="text-xs text-white/70 mt-1 block">
                      Saldo de {formatPrice(bankLoanPrincipal, currency)} em {loanYears} anos
                    </span>
                  </div>
                </div>

                <p className="text-xs text-[#666159] italic">
                  * Simulação meramente indicativa. Permite amortizações intercalares ou pagamento
                  a pronto com 6% de desconto imediato sobre a tabela de lançamento.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* PART 2: INTERACTIVE 4-RING SECURITY PROTOCOL DIAGRAM */}
        <div className="bg-[#F7F4EF] p-6 sm:p-10 rounded-2xl border border-[#DFD8CC] space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#DFD8CC] pb-6">
            <div>
              <span className="font-mono-spec text-xs uppercase tracking-[0.2em] text-[#3A4D3E] font-semibold block">
                ARQUITETURA DE PROTEÇÃO FAMILIAR
              </span>
              <h3 className="font-serif-editorial text-3xl sm:text-4xl text-[#1C1B18] mt-1">
                Protocolo de Segurança em 4 Anéis Concêntricos
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-[#666159] max-w-md">
              Clique em cada anel de proteção para entender como o Residencial Inara garante
              tranquilidade absoluta 24 horas por dia.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Ring Selector Tabs */}
            <div className="lg:col-span-5 space-y-3">
              {SECURITY_RINGS.map((ring, idx) => {
                const active = activeRingIndex === idx;
                return (
                  <button
                    key={ring.ring}
                    type="button"
                    onClick={() => setActiveRingIndex(idx)}
                    className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                      active
                        ? 'bg-[#151814] text-white border-[#151814] shadow-lg'
                        : 'bg-[#EFEAE1] text-[#1C1B18] border-[#DFD8CC] hover:border-[#B86B43]'
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <span
                        className={`px-2.5 py-1 rounded font-mono-spec text-xs font-bold ${
                          active ? 'bg-[#B86B43] text-white' : 'bg-[#DFD8CC] text-[#1C1B18]'
                        }`}
                      >
                        {ring.ring}
                      </span>
                      <div>
                        <strong className="text-sm block">{ring.title}</strong>
                        <span
                          className={`text-xs ${
                            active ? 'text-white/70' : 'text-[#666159]'
                          } line-clamp-1`}
                        >
                          {ring.subtitle}
                        </span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Active Ring Details Card */}
            <div className="lg:col-span-7 bg-[#EFEAE1] p-6 sm:p-8 rounded-xl border border-[#DFD8CC] space-y-5">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#3A4D3E] text-white flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <span className="font-mono-spec text-xs uppercase tracking-widest text-[#B86B43] font-bold">
                    {SECURITY_RINGS[activeRingIndex].ring} ATIVO
                  </span>
                  <h4 className="font-serif-editorial text-2xl sm:text-3xl text-[#1C1B18]">
                    {SECURITY_RINGS[activeRingIndex].title}
                  </h4>
                </div>
              </div>

              <p className="text-sm text-[#666159] leading-relaxed">
                {SECURITY_RINGS[activeRingIndex].subtitle}
              </p>

              <div className="space-y-3 pt-2">
                {SECURITY_RINGS[activeRingIndex].details.map((detail, i) => (
                  <div
                    key={i}
                    className="p-3.5 rounded-lg bg-[#F7F4EF] border border-[#DFD8CC] flex items-start gap-3 text-xs sm:text-sm text-[#1C1B18]"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#3A4D3E] shrink-0 mt-0.5" />
                    <span>{detail}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
