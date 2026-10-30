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
  const [selectedTypo, setSelectedTypo] = useState<Typology>(TYPOLOGIES[0]);
  const [entryPct, setEntryPct] = useState<number>(25);
  const [loanYears, setLoanYears] = useState<number>(25);
  const [activeRingIndex, setActiveRingIndex] = useState<number>(0);

  // Financing Calculations
  const basePrice = selectedTypo.basePriceEUR;
  const entryAmount = Math.round((basePrice * entryPct) / 100);
  const construction24MonthsTotal = Math.round(basePrice * 0.25);
  const monthlyConstructionInstallment = Math.round(construction24MonthsTotal / 24);
  const bankLoanPrincipal = basePrice - entryAmount - construction24MonthsTotal;

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
  const estimatedValueAtDelivery = Math.round(basePrice * 1.28);
  const capitalGainEUR = estimatedValueAtDelivery - basePrice;
  const estimatedMonthlyRentEUR = Math.round((basePrice * 0.076) / 12);
  const annualRentEUR = estimatedMonthlyRentEUR * 12;

  return (
    <section
      id="simulador-roi"
      className="py-20 sm:py-28 bg-[#EFF4F9] border-y border-[#E2E8F0]"
    >
      <div className="max-w-[1380px] mx-auto px-4 sm:px-8 space-y-20">
        {/* PART 1: DUAL FINANCIAL & INVESTOR ROI CALCULATOR */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left 5 Columns: Mode Switcher & Inputs */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#0A1128] text-[#C59A52] font-mono-spec text-xs uppercase tracking-widest font-semibold">
              <Calculator className="w-3.5 h-3.5" />
              <span>SIMULADOR FINANCEIRO & RENTABILIDADE</span>
            </div>

            <h2 className="font-serif-editorial text-3xl sm:text-5xl text-[#0F172A] font-normal leading-tight">
              Planeie a compra ou calcule o retorno do seu investimento.
            </h2>

            <p className="text-sm text-[#475569] leading-relaxed">
              Condomínios fechados com segurança 24h e lazer completo lideram a procura de
              arrendamento executivo (expatriados, diplomatas e diretores) e registam a maior
              valorização patrimonial entre o lançamento na planta e a entrega das chaves.
            </p>

            {/* Dual Mode Switcher */}
            <div className="grid grid-cols-2 gap-2 p-1.5 rounded-xl bg-white border border-[#E2E8F0] shadow-sm">
              <button
                type="button"
                onClick={() => setCalcMode('investor')}
                className={`py-3 px-4 rounded-lg text-xs font-mono-spec uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2 ${
                  calcMode === 'investor'
                    ? 'bg-[#0D213F] text-white font-semibold shadow'
                    : 'text-[#64748B] hover:text-[#0F172A]'
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
                    ? 'bg-[#0A1128] text-white font-semibold shadow'
                    : 'text-[#64748B] hover:text-[#0F172A]'
                }`}
              >
                <Landmark className="w-4 h-4" />
                <span>Plano de Pagamento</span>
              </button>
            </div>

            {/* Typology Selector for Calculator */}
            <div className="space-y-2">
              <label className="block font-mono-spec text-xs uppercase text-[#64748B] font-medium">
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
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                        active
                          ? 'bg-white border-[#C59A52] ring-2 ring-[#C59A52]/25 shadow-sm'
                          : 'bg-white/80 border-[#E2E8F0] hover:border-[#CBD5E1]'
                      }`}
                    >
                      <strong className="block text-xs font-mono-spec text-[#0F172A]">
                        {t.name}
                      </strong>
                      <span className="text-xs font-mono-spec text-[#C59A52] font-bold">
                        {formatPrice(t.basePriceEUR, currency)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Sliders when in Financing Mode */}
            {calcMode === 'financing' && (
              <div className="bg-white p-5 rounded-xl border border-[#E2E8F0] space-y-4 shadow-sm">
                <div>
                  <div className="flex justify-between text-xs font-mono-spec mb-1">
                    <span className="text-[#64748B]">Sinal de Entrada ({entryPct}%):</span>
                    <strong className="text-[#0F172A]">
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
                    className="w-full accent-[#C59A52] cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono-spec mb-1">
                    <span className="text-[#64748B]">Prazo Financiamento Pós-Chave:</span>
                    <strong className="text-[#0F172A]">{loanYears} Anos</strong>
                  </div>
                  <input
                    type="range"
                    min={5}
                    max={35}
                    step={5}
                    value={loanYears}
                    onChange={(e) => setLoanYears(Number(e.target.value))}
                    className="w-full accent-[#C59A52] cursor-pointer"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Right 7 Columns: Dynamic Results Dashboard */}
          <div className="lg:col-span-7">
            {calcMode === 'investor' ? (
              <div className="bg-[#0A1128] text-[#F8FAFC] p-6 sm:p-10 rounded-2xl border border-white/10 shadow-2xl space-y-8">
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/15 pb-6">
                  <div>
                    <span className="font-mono-spec text-xs uppercase tracking-widest text-[#C59A52] block font-semibold">
                      ESTUDO DE VIABILIDADE PATRIMONIAL • {selectedTypo.code}
                    </span>
                    <h3 className="font-serif-editorial text-3xl text-white mt-1">
                      Projeção de Valorização & Renda Anual
                    </h3>
                  </div>
                  <span className="px-3.5 py-1.5 rounded-full bg-[#C59A52]/20 border border-[#C59A52]/40 text-[#C59A52] font-mono-spec text-xs font-bold">
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
                    <span className="font-mono-spec text-[10px] uppercase tracking-wider text-[#C59A52] block font-semibold">
                      3. RENDA MENSAL ARRENDAMENTO
                    </span>
                    <strong className="font-serif-editorial text-2xl sm:text-3xl text-[#C59A52] block mt-1">
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
              <div className="bg-white p-6 sm:p-10 rounded-2xl border border-[#E2E8F0] shadow-xl space-y-8">
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#E2E8F0] pb-6">
                  <div>
                    <span className="font-mono-spec text-xs uppercase tracking-widest text-[#C59A52] block font-semibold">
                      CRONOGRAMA FINANCEIRO SUAVE • {selectedTypo.code}
                    </span>
                    <h3 className="font-serif-editorial text-3xl text-[#0F172A] mt-1">
                      Fluxo de Pagamento sem Juros durante a Obra
                    </h3>
                  </div>
                  <span className="px-3.5 py-1.5 rounded-lg bg-[#0A1128] text-white font-mono-spec text-xs font-semibold">
                    Valor Total: {formatPrice(basePrice, currency)}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-5 rounded-xl bg-[#EFF4F9] border border-[#E2E8F0]">
                    <div className="flex items-center justify-between text-xs font-mono-spec text-[#64748B] mb-2">
                      <span>ETAPA 1 • ATO / SINAL</span>
                      <Percent className="w-4 h-4 text-[#C59A52]" />
                    </div>
                    <strong className="font-serif-editorial text-2xl sm:text-3xl text-[#0F172A] block">
                      {formatPrice(entryAmount, currency)}
                    </strong>
                    <span className="text-xs text-[#64748B] mt-1 block">
                      {entryPct}% na assinatura do Contrato-Promessa
                    </span>
                  </div>

                  <div className="p-5 rounded-xl bg-[#EFF4F9] border border-[#E2E8F0]">
                    <div className="flex items-center justify-between text-xs font-mono-spec text-[#64748B] mb-2">
                      <span>ETAPA 2 • 24 MESES OBRA</span>
                      <Calculator className="w-4 h-4 text-[#C59A52]" />
                    </div>
                    <strong className="font-serif-editorial text-2xl sm:text-3xl text-[#C59A52] block">
                      {formatPrice(monthlyConstructionInstallment, currency)}/mês
                    </strong>
                    <span className="text-xs text-[#64748B] mt-1 block">
                      Total de 25% direto c/ promotor sem juros bancários
                    </span>
                  </div>

                  <div className="p-5 rounded-xl bg-[#0A1128] text-white">
                    <div className="flex items-center justify-between text-xs font-mono-spec text-[#C59A52] mb-2">
                      <span>ETAPA 3 • PÓS-CHAVES</span>
                      <Key className="w-4 h-4 text-[#C59A52]" />
                    </div>
                    <strong className="font-serif-editorial text-2xl sm:text-3xl text-white block">
                      {formatPrice(estimatedBankMonthly, currency)}/mês
                    </strong>
                    <span className="text-xs text-white/70 mt-1 block">
                      Saldo de {formatPrice(bankLoanPrincipal, currency)} em {loanYears} anos
                    </span>
                  </div>
                </div>

                <p className="text-xs text-[#64748B] italic">
                  * Simulação meramente indicativa. Permite amortizações intercalares ou pagamento
                  a pronto com 6% de desconto imediato sobre a tabela de lançamento.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* PART 2: INTERACTIVE 4-RING SECURITY PROTOCOL DIAGRAM */}
        <div className="bg-white p-6 sm:p-10 rounded-2xl border border-[#E2E8F0] space-y-8 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#E2E8F0] pb-6">
            <div>
              <span className="font-mono-spec text-xs uppercase tracking-[0.2em] text-[#0D213F] font-semibold block">
                ARQUITETURA DE PROTEÇÃO FAMILIAR
              </span>
              <h3 className="font-serif-editorial text-3xl sm:text-4xl text-[#0F172A] mt-1">
                Protocolo de Segurança em 4 Anéis Concêntricos
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-[#475569] max-w-md leading-relaxed">
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
                        ? 'bg-[#0A1128] text-white border-[#0A1128] shadow-lg'
                        : 'bg-[#EFF4F9] text-[#0F172A] border-[#E2E8F0] hover:border-[#C59A52]'
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <span
                        className={`px-2.5 py-1 rounded font-mono-spec text-xs font-bold ${
                          active ? 'bg-[#C59A52] text-[#0A1128]' : 'bg-[#E2E8F0] text-[#0F172A]'
                        }`}
                      >
                        {ring.ring}
                      </span>
                      <div>
                        <strong className="text-sm block">{ring.title}</strong>
                        <span
                          className={`text-xs ${
                            active ? 'text-white/70' : 'text-[#64748B]'
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
            <div className="lg:col-span-7 bg-[#EFF4F9] p-6 sm:p-8 rounded-xl border border-[#E2E8F0] space-y-5">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#0D213F] text-white flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6 text-[#C59A52]" />
                </div>
                <div>
                  <span className="font-mono-spec text-xs uppercase tracking-widest text-[#C59A52] font-bold">
                    {SECURITY_RINGS[activeRingIndex].ring} ATIVO
                  </span>
                  <h4 className="font-serif-editorial text-2xl sm:text-3xl text-[#0F172A]">
                    {SECURITY_RINGS[activeRingIndex].title}
                  </h4>
                </div>
              </div>

              <p className="text-sm text-[#475569] leading-relaxed">
                {SECURITY_RINGS[activeRingIndex].subtitle}
              </p>

              <div className="space-y-3 pt-2">
                {SECURITY_RINGS[activeRingIndex].details.map((detail, i) => (
                  <div
                    key={i}
                    className="p-3.5 rounded-lg bg-white border border-[#E2E8F0] flex items-start gap-3 text-xs sm:text-sm text-[#0F172A] shadow-sm"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#0D213F] shrink-0 mt-0.5" />
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
