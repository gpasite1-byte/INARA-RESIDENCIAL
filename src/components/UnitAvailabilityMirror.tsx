import React, { useState } from 'react';
import {
  CheckCircle2,
  Clock,
  Lock,
  Sun,
  Car,
  Maximize2,
  TrendingUp,
  ArrowUpRight,
  Filter,
  Building2,
} from 'lucide-react';
import { CONDO_UNITS_MATRIX, CondoUnit, UnitStatus } from '../data/inaraOption2Data';
import { CurrencyCode } from '../data/inaraData';
import { formatPrice } from '../utils/formatCurrency';

interface UnitAvailabilityMirrorProps {
  currency: CurrencyCode;
  onSelectUnitForReservation: (unit: CondoUnit) => void;
}

export const UnitAvailabilityMirror: React.FC<UnitAvailabilityMirrorProps> = ({
  currency,
  onSelectUnitForReservation,
}) => {
  const [blockFilter, setBlockFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | UnitStatus>('all');
  const [selectedUnit, setSelectedUnit] = useState<CondoUnit>(CONDO_UNITS_MATRIX[0]);

  const filteredUnits = CONDO_UNITS_MATRIX.filter((u) => {
    const matchBlock = blockFilter === 'all' || u.block === blockFilter;
    const matchStatus = statusFilter === 'all' || u.status === statusFilter;
    return matchBlock && matchStatus;
  });

  const availableCount = CONDO_UNITS_MATRIX.filter((u) => u.status === 'available').length;
  const reservedCount = CONDO_UNITS_MATRIX.filter((u) => u.status === 'reserved').length;
  const soldCount = CONDO_UNITS_MATRIX.filter((u) => u.status === 'sold').length;

  const getStatusBadge = (status: UnitStatus) => {
    if (status === 'available') {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono-spec font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          DISPONÍVEL
        </span>
      );
    }
    if (status === 'reserved') {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono-spec font-semibold bg-amber-500/15 text-amber-300 border border-amber-500/30">
          <Clock className="w-3 h-3" />
          RESERVADO
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono-spec font-semibold bg-white/10 text-white/50 border border-white/10">
        <Lock className="w-3 h-3" />
        VENDIDO
      </span>
    );
  };

  return (
    <section id="espelho-vendas" className="py-20 sm:py-28 bg-[#0E110E] text-[#F7F4EF] border-y border-white/10">
      <div className="max-w-[1380px] mx-auto px-4 sm:px-8 space-y-10">
        {/* Header & Live Sales Thermometer */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-white/10">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#D9A86C]/15 border border-[#D9A86C]/30 text-[#D9A86C] font-mono-spec text-xs uppercase tracking-widest">
              <Building2 className="w-3.5 h-3.5" />
              <span>FERRAMENTA EXCLUSIVA • ESPELHO DE VENDAS EM TEMPO REAL</span>
            </div>
            <h2 className="font-serif-editorial text-3xl sm:text-5xl text-white font-normal">
              Disponibilidade por Lote & Fração Autónoma
            </h2>
            <p className="text-sm sm:text-base text-white/70 max-w-2xl">
              Consulte em tempo real quais as Moradias (Villas) e Apartamentos disponíveis no
              Residencial Inara. Clique em qualquer unidade da grelha para inspecionar a posição
              solar, valor de tabela e estimativa de renda mensal.
            </p>
          </div>

          {/* Live Status Counter Pill */}
          <div className="flex flex-wrap items-center gap-4 bg-white/5 border border-white/10 p-4 rounded-xl font-mono-spec text-xs">
            <div className="flex items-center gap-2 pr-4 border-r border-white/10">
              <span className="w-3 h-3 rounded-full bg-emerald-400" />
              <div>
                <span className="text-white/60 block text-[10px]">DISPONÍVEIS</span>
                <strong className="text-white text-sm">{availableCount} Frações</strong>
              </div>
            </div>
            <div className="flex items-center gap-2 pr-4 border-r border-white/10">
              <span className="w-3 h-3 rounded-full bg-amber-400" />
              <div>
                <span className="text-white/60 block text-[10px]">EM RESERVA</span>
                <strong className="text-white text-sm">{reservedCount} Frações</strong>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-white/30" />
              <div>
                <span className="text-white/60 block text-[10px]">VENDIDAS (FASE I)</span>
                <strong className="text-white text-sm">{soldCount} Frações</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Filters Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 text-xs font-mono-spec text-white/60 mr-2">
              <Filter className="w-3.5 h-3.5 text-[#D9A86C]" />
              FILTRAR SETOR:
            </span>
            {['all', 'Alameda Villas', 'Bloco A (Nascente)', 'Bloco B (Parque)'].map((b) => (
              <button
                key={b}
                type="button"
                onClick={() => setBlockFilter(b)}
                className={`px-3.5 py-2 rounded-lg text-xs font-mono-spec uppercase tracking-wider transition-all cursor-pointer ${
                  blockFilter === b
                    ? 'bg-[#D9A86C] text-[#0E110E] font-bold shadow'
                    : 'bg-white/5 text-white/75 border border-white/10 hover:border-white/30'
                }`}
              >
                {b === 'all' ? 'Todo o Condomínio' : b}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            {[
              { id: 'all', label: 'Todos Estados' },
              { id: 'available', label: 'Só Disponíveis' },
              { id: 'reserved', label: 'Reservados' },
            ].map((st) => (
              <button
                key={st.id}
                type="button"
                onClick={() => setStatusFilter(st.id as typeof statusFilter)}
                className={`px-3 py-1.5 rounded text-xs font-mono-spec transition-colors cursor-pointer ${
                  statusFilter === st.id
                    ? 'bg-white text-[#0E110E] font-semibold'
                    : 'bg-white/5 text-white/65 hover:text-white'
                }`}
              >
                {st.label}
              </button>
            ))}
          </div>
        </div>

        {/* Main Interactive Grid + Selected Unit Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left 7 Columns: Interactive Unit Cards Matrix */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {filteredUnits.map((unit) => {
              const isSelected = selectedUnit.id === unit.id;
              const isSold = unit.status === 'sold';

              return (
                <button
                  key={unit.id}
                  type="button"
                  onClick={() => setSelectedUnit(unit)}
                  className={`text-left p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between gap-3 ${
                    isSelected
                      ? 'bg-[#1B221C] border-[#D9A86C] ring-2 ring-[#D9A86C]/40 shadow-xl'
                      : isSold
                      ? 'bg-white/[0.02] border-white/10 opacity-60 hover:opacity-90'
                      : 'bg-white/[0.05] border-white/10 hover:border-white/30 hover:bg-white/[0.08]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 w-full">
                    <div>
                      <span className="font-mono-spec text-[10px] uppercase tracking-widest text-[#D9A86C] block">
                        {unit.block}
                      </span>
                      <h3 className="font-serif-editorial text-2xl text-white font-semibold mt-0.5">
                        {unit.code}
                      </h3>
                    </div>
                    {getStatusBadge(unit.status)}
                  </div>

                  <div className="grid grid-cols-3 gap-2 py-2 border-y border-white/10 font-mono-spec text-xs w-full">
                    <div>
                      <span className="text-[10px] text-white/50 block">TIPOLOGIA</span>
                      <strong className="text-white">{unit.typologyCode}</strong>
                    </div>
                    <div>
                      <span className="text-[10px] text-white/50 block">ÁREA TOTAL</span>
                      <strong className="text-white">{unit.totalArea} m²</strong>
                    </div>
                    <div>
                      <span className="text-[10px] text-white/50 block">PISO / LOTE</span>
                      <strong className="text-white truncate block">{unit.floor.split('•')[0]}</strong>
                    </div>
                  </div>

                  <div className="flex items-center justify-between w-full pt-0.5">
                    <div>
                      <span className="font-mono-spec text-[10px] text-white/50 block">
                        VALOR DE TABELA
                      </span>
                      <strong className="font-mono-spec text-sm text-[#D9A86C]">
                        {unit.status === 'sold' ? 'Unidade Comercializada' : formatPrice(unit.priceEUR, currency)}
                      </strong>
                    </div>
                    <span className="text-xs font-mono-spec text-white/70 underline">
                      Ver Ficha →
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right 5 Columns: Sticky Detailed Unit Dossier */}
          <div className="lg:col-span-5 bg-[#161B17] rounded-2xl border border-[#D9A86C]/40 overflow-hidden shadow-2xl sticky top-24">
            <div className="relative h-56 overflow-hidden">
              <img
                src={selectedUnit.image}
                alt={selectedUnit.code}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#161B17] via-[#161B17]/30 to-transparent" />
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                <span className="px-3 py-1 rounded bg-black/70 backdrop-blur-md text-[#D9A86C] font-mono-spec text-xs font-semibold">
                  {selectedUnit.block}
                </span>
                {getStatusBadge(selectedUnit.status)}
              </div>
              <div className="absolute bottom-4 left-5 right-5">
                <span className="font-mono-spec text-xs uppercase tracking-widest text-white/75 block">
                  {selectedUnit.typologyCode} • {selectedUnit.floor}
                </span>
                <h3 className="font-serif-editorial text-3xl sm:text-4xl text-white">
                  {selectedUnit.code}
                </h3>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <p className="text-sm text-white/80 leading-relaxed bg-white/5 p-3.5 rounded-lg border border-white/10">
                <strong className="text-[#D9A86C] block text-xs font-mono-spec uppercase mb-1">
                  Diferencial desta Fração:
                </strong>
                {selectedUnit.highlight}
              </p>

              {/* Specs Grid */}
              <div className="grid grid-cols-2 gap-3 font-mono-spec text-xs">
                <div className="p-3 rounded-lg bg-white/5 border border-white/10 flex items-center gap-3">
                  <Maximize2 className="w-4 h-4 text-[#D9A86C] shrink-0" />
                  <div>
                    <span className="text-[10px] text-white/50 block">ÁREA PRIVATIVA + EXT.</span>
                    <strong className="text-white">
                      {selectedUnit.privateArea}m² + {selectedUnit.outdoorArea}m²
                    </strong>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-white/5 border border-white/10 flex items-center gap-3">
                  <Sun className="w-4 h-4 text-[#D9A86C] shrink-0" />
                  <div>
                    <span className="text-[10px] text-white/50 block">ORIENTAÇÃO SOLAR</span>
                    <strong className="text-white">{selectedUnit.solar}</strong>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-white/5 border border-white/10 flex items-center gap-3">
                  <Car className="w-4 h-4 text-[#D9A86C] shrink-0" />
                  <div>
                    <span className="text-[10px] text-white/50 block">ESTACIONAMENTO</span>
                    <strong className="text-white">{selectedUnit.parkingSpots} Vagas Box EV</strong>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-white/5 border border-white/10 flex items-center gap-3">
                  <TrendingUp className="w-4 h-4 text-emerald-400 shrink-0" />
                  <div>
                    <span className="text-[10px] text-white/50 block">RENDA EST. ARRENDAMENTO</span>
                    <strong className="text-emerald-400">
                      {formatPrice(selectedUnit.estimatedRentMonthlyEUR, currency)}/mês
                    </strong>
                  </div>
                </div>
              </div>

              {/* Financial Box */}
              <div className="p-4 rounded-xl bg-black/40 border border-white/10 flex items-center justify-between">
                <div>
                  <span className="font-mono-spec text-[10px] uppercase tracking-wider text-white/55 block">
                    PREÇO DE LANÇAMENTO DA UNIDADE
                  </span>
                  <strong className="font-serif-editorial text-3xl text-[#D9A86C]">
                    {formatPrice(selectedUnit.priceEUR, currency)}
                  </strong>
                </div>
                <div className="text-right font-mono-spec text-xs">
                  <span className="text-[10px] text-white/55 block">CONDOMÍNIO EST.</span>
                  <strong className="text-white">
                    {formatPrice(selectedUnit.condoFeeEUR, currency)}/mês
                  </strong>
                </div>
              </div>

              {/* Action CTA */}
              {selectedUnit.status !== 'sold' ? (
                <button
                  type="button"
                  onClick={() => onSelectUnitForReservation(selectedUnit)}
                  className="w-full py-4 px-5 rounded-lg bg-[#B86B43] hover:bg-[#96522F] text-white font-mono-spec text-xs uppercase tracking-widest font-semibold transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>
                    {selectedUnit.status === 'available'
                      ? `Bloquear Pré-Reserva da ${selectedUnit.code}`
                      : `Entrar na Lista de Espera da ${selectedUnit.code}`}
                  </span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              ) : (
                <div className="w-full py-3.5 px-4 rounded-lg bg-white/10 text-white/60 font-mono-spec text-xs text-center">
                  Esta unidade já foi comercializada. Selecione uma unidade disponível na grelha.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
