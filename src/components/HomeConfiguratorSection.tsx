import React, { useState } from 'react';
import { Check, Sliders, Layers, Sun, Cpu, ArrowUpRight } from 'lucide-react';
import {
  FLOORING_FINISHES,
  OUTDOOR_PACKAGES,
  SMART_PACKAGES,
  FinishOption,
} from '../data/inaraOption2Data';
import { CurrencyCode, TYPOLOGIES, Typology } from '../data/inaraData';
import { formatPrice } from '../utils/formatCurrency';

interface HomeConfiguratorSectionProps {
  currency: CurrencyCode;
  onSaveConfigurationToLead: (summaryText: string, typologyName: string) => void;
}

export const HomeConfiguratorSection: React.FC<HomeConfiguratorSectionProps> = ({
  currency,
  onSaveConfigurationToLead,
}) => {
  const [selectedTypology, setSelectedTypology] = useState<Typology>(TYPOLOGIES[0]);
  const [selectedFloor, setSelectedFloor] = useState<FinishOption>(FLOORING_FINISHES[0]);
  const [selectedOutdoor, setSelectedOutdoor] = useState<FinishOption>(OUTDOOR_PACKAGES[0]);
  const [selectedSmart, setSelectedSmart] = useState<FinishOption>(SMART_PACKAGES[0]);
  const [activePreviewMode, setActivePreviewMode] = useState<'interior' | 'outdoor'>('interior');

  const extrasTotalEUR =
    selectedFloor.priceDeltaEUR +
    selectedOutdoor.priceDeltaEUR +
    selectedSmart.priceDeltaEUR;

  const finalConfiguredPriceEUR = selectedTypology.basePriceEUR + extrasTotalEUR;

  const handleSendConfiguration = () => {
    const summary = `${selectedTypology.name} | Piso: ${selectedFloor.name} | Lazer: ${selectedOutdoor.name} | Tech: ${selectedSmart.name}`;
    onSaveConfigurationToLead(summary, selectedTypology.name);
  };

  return (
    <section id="configurador" className="py-20 sm:py-28 px-4 sm:px-8 max-w-[1380px] mx-auto">
      <div className="space-y-12">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-[#DFD8CC] pb-8">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#B86B43]/15 text-[#B86B43] font-mono-spec text-xs uppercase tracking-widest">
              <Sliders className="w-3.5 h-3.5" />
              <span>PROGRAMA INARA TAILOR-MADE • PERSONALIZAÇÃO EM OBRA</span>
            </div>
            <h2 className="font-serif-editorial text-3xl sm:text-5xl text-[#1C1B18] font-normal">
              Configure os Acabamentos da Sua Residência
            </h2>
            <p className="text-sm sm:text-base text-[#666159] max-w-2xl">
              No Residencial Inara, entregamos a sua casa pronta a habitar à sua medida. Escolha a
              base da tipologia, personalize os revestimentos naturais, o kit de lazer no terraço e
              a domótica integrada — sem obras pós-entrega.
            </p>
          </div>

          {/* Step 0: Base Typology Selector */}
          <div className="bg-[#EFEAE1] p-1.5 rounded-xl border border-[#DFD8CC] flex flex-wrap gap-1.5">
            {TYPOLOGIES.map((t) => {
              const active = selectedTypology.id === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setSelectedTypology(t)}
                  className={`px-3.5 py-2 rounded-lg text-xs font-mono-spec uppercase tracking-wider transition-all cursor-pointer ${active
                    ? 'bg-[#1C1B18] text-[#F7F4EF] font-semibold shadow'
                    : 'text-[#666159] hover:text-[#1C1B18]'
                    }`}
                >
                  {t.code}
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Configurator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left 7 Columns: Live Visual Preview & Material Moodboard */}
          <div className="lg:col-span-7 space-y-4 lg:sticky lg:top-24">
            <div className="relative rounded-2xl overflow-hidden border border-[#DFD8CC] shadow-xl bg-[#151814] aspect-[16/10]">
              <img
                src={
                  activePreviewMode === 'interior'
                    ? selectedFloor.previewImage
                    : selectedOutdoor.previewImage
                }
                alt=" Simulação de Acabamentos Residencial Inara"
                className="w-full h-full object-cover transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#151814]/90 via-transparent to-black/30" />

              {/* Top Toggle: Interior vs Terraço */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                <div className="flex items-center gap-2 bg-black/65 backdrop-blur-md p-1 rounded-lg border border-white/15">
                  <button
                    type="button"
                    onClick={() => setActivePreviewMode('interior')}
                    className={`px-3 py-1.5 rounded text-xs font-mono-spec uppercase transition-colors cursor-pointer ${activePreviewMode === 'interior'
                      ? 'bg-[#B86B43] text-white'
                      : 'text-white/75 hover:text-white'
                      }`}
                  >
                    Ambiente Interior
                  </button>
                  <button
                    type="button"
                    onClick={() => setActivePreviewMode('outdoor')}
                    className={`px-3 py-1.5 rounded text-xs font-mono-spec uppercase transition-colors cursor-pointer ${activePreviewMode === 'outdoor'
                      ? 'bg-[#B86B43] text-white'
                      : 'text-white/75 hover:text-white'
                      }`}
                  >
                    Terraço & Lazer Exterior
                  </button>
                </div>

                <span className="px-3 py-1.5 rounded bg-black/65 backdrop-blur-md text-[#D9A86C] font-mono-spec text-xs border border-white/15 hidden sm:inline-block">
                  {selectedTypology.name} ({selectedTypology.totalArea} m²)
                </span>
              </div>

              {/* Bottom Active Material Swatches Overlay */}
              <div className="absolute bottom-4 left-4 right-4 bg-[#151814]/85 backdrop-blur-md p-4 rounded-xl border border-white/15 text-white grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="flex items-center gap-2.5">
                  <span
                    className="w-7 h-7 rounded-full border border-white/40 shrink-0"
                    style={{ backgroundColor: selectedFloor.swatchColor }}
                  />
                  <div className="overflow-hidden">
                    <span className="text-[10px] font-mono-spec text-[#D9A86C] block">
                      PISO & REVESTIMENTO
                    </span>
                    <strong className="text-xs truncate block">{selectedFloor.name}</strong>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <span
                    className="w-7 h-7 rounded-full border border-white/40 shrink-0"
                    style={{ backgroundColor: selectedOutdoor.swatchColor }}
                  />
                  <div className="overflow-hidden">
                    <span className="text-[10px] font-mono-spec text-[#D9A86C] block">
                      LAZER NO TERRAÇO
                    </span>
                    <strong className="text-xs truncate block">{selectedOutdoor.name}</strong>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <span
                    className="w-7 h-7 rounded-full border border-white/40 shrink-0"
                    style={{ backgroundColor: selectedSmart.swatchColor }}
                  />
                  <div className="overflow-hidden">
                    <span className="text-[10px] font-mono-spec text-[#D9A86C] block">
                      DOMÓTICA & ENERGIA
                    </span>
                    <strong className="text-xs truncate block">{selectedSmart.name}</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* Live Budget Summary Bar */}
            <div className="bg-[#151814] text-[#F7F4EF] p-6 rounded-2xl border border-[#DFD8CC] flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-lg">
              <div className="space-y-1">
                <span className="font-mono-spec text-[10px] uppercase tracking-widest text-[#D9A86C] block">
                  ORÇAMENTO CHAVE NA MÃO (UNIDADE + PERSONALIZAÇÃO)
                </span>
                <div className="flex items-baseline gap-3">
                  <strong className="font-serif-editorial text-3xl sm:text-4xl text-white">
                    {formatPrice(finalConfiguredPriceEUR, currency)}
                  </strong>
                  {extrasTotalEUR > 0 ? (
                    <span className="font-mono-spec text-xs text-emerald-400">
                      (Inclui +{formatPrice(extrasTotalEUR, currency)} em upgrades)
                    </span>
                  ) : (
                    <span className="font-mono-spec text-xs text-white/60">
                      (Acabamentos de Série Incluídos)
                    </span>
                  )}
                </div>
              </div>

              <button
                type="button"
                onClick={handleSendConfiguration}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-[#B86B43] hover:bg-[#96522F] text-white font-mono-spec text-xs uppercase tracking-wider font-semibold transition-colors cursor-pointer shrink-0"
              >
                <span>Guardar Configuração & Pedir Proposta</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right 5 Columns: 3-Step Interactive Finishings Selector */}
          <div className="lg:col-span-5 space-y-6">
            {/* Step 1: Flooring & Interior Wood */}
            <div className="bg-[#EFEAE1] p-5 rounded-xl border border-[#DFD8CC] space-y-3.5">
              <div className="flex items-center gap-2 text-xs font-mono-spec uppercase tracking-wider text-[#B86B43] font-semibold">
                <Layers className="w-4 h-4" />
                <span>PASSO 1 • PISO SOCIAL & MADEIRAS NATURAIS</span>
              </div>

              <div className="space-y-2.5">
                {FLOORING_FINISHES.map((opt) => {
                  const active = selectedFloor.id === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => {
                        setSelectedFloor(opt);
                        setActivePreviewMode('interior');
                      }}
                      className={`w-full text-left p-3.5 rounded-lg border transition-all cursor-pointer flex items-start gap-3 ${active
                        ? 'bg-white border-[#B86B43] ring-2 ring-[#B86B43]/25 shadow-sm'
                        : 'bg-[#F7F4EF] border-[#DFD8CC] hover:border-[#1C1B18]'
                        }`}
                    >
                      <span
                        className="w-6 h-6 rounded-full border border-black/20 shrink-0 mt-0.5 flex items-center justify-center"
                        style={{ backgroundColor: opt.swatchColor }}
                      >
                        {active && <Check className="w-3.5 h-3.5 text-white drop-shadow" />}
                      </span>
                      <div className="flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <strong className="text-sm text-[#1C1B18]">{opt.name}</strong>
                          <span className="font-mono-spec text-xs font-semibold text-[#B86B43]">
                            {opt.priceDeltaEUR === 0
                              ? 'Incluído'
                              : `+ ${formatPrice(opt.priceDeltaEUR, currency)}`}
                          </span>
                        </div>
                        <span className="text-[11px] font-mono-spec text-[#666159] block">
                          {opt.material}
                        </span>
                        <p className="text-xs text-[#666159] mt-1">{opt.description}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Outdoor Terrace & Pool/Jacuzzi Kit */}
            <div className="bg-[#EFEAE1] p-5 rounded-xl border border-[#DFD8CC] space-y-3.5">
              <div className="flex items-center gap-2 text-xs font-mono-spec uppercase tracking-wider text-[#B86B43] font-semibold">
                <Sun className="w-4 h-4" />
                <span>PASSO 2 • KIT LAZER PRIVATIVO NO TERRAÇO / JARDIM</span>
              </div>

              <div className="space-y-2.5">
                {OUTDOOR_PACKAGES.map((opt) => {
                  const active = selectedOutdoor.id === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => {
                        setSelectedOutdoor(opt);
                        setActivePreviewMode('outdoor');
                      }}
                      className={`w-full text-left p-3.5 rounded-lg border transition-all cursor-pointer flex items-start gap-3 ${active
                        ? 'bg-white border-[#B86B43] ring-2 ring-[#B86B43]/25 shadow-sm'
                        : 'bg-[#F7F4EF] border-[#DFD8CC] hover:border-[#1C1B18]'
                        }`}
                    >
                      <span
                        className="w-6 h-6 rounded-full border border-black/20 shrink-0 mt-0.5 flex items-center justify-center"
                        style={{ backgroundColor: opt.swatchColor }}
                      >
                        {active && <Check className="w-3.5 h-3.5 text-white drop-shadow" />}
                      </span>
                      <div className="flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <strong className="text-sm text-[#1C1B18]">{opt.name}</strong>
                          <span className="font-mono-spec text-xs font-semibold text-[#B86B43]">
                            {opt.priceDeltaEUR === 0
                              ? 'Incluído'
                              : `+ ${formatPrice(opt.priceDeltaEUR, currency)}`}
                          </span>
                        </div>
                        <span className="text-[11px] font-mono-spec text-[#666159] block">
                          {opt.material}
                        </span>
                        <p className="text-xs text-[#666159] mt-1">{opt.description}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Domotics & Solar Energy */}
            <div className="bg-[#EFEAE1] p-5 rounded-xl border border-[#DFD8CC] space-y-3.5">
              <div className="flex items-center gap-2 text-xs font-mono-spec uppercase tracking-wider text-[#B86B43] font-semibold">
                <Cpu className="w-4 h-4" />
                <span>PASSO 3 • AUTOMAÇÃO KNX & EFICIÊNCIA SOLAR</span>
              </div>

              <div className="space-y-2.5">
                {SMART_PACKAGES.map((opt) => {
                  const active = selectedSmart.id === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setSelectedSmart(opt)}
                      className={`w-full text-left p-3.5 rounded-lg border transition-all cursor-pointer flex items-start gap-3 ${active
                        ? 'bg-white border-[#B86B43] ring-2 ring-[#B86B43]/25 shadow-sm'
                        : 'bg-[#F7F4EF] border-[#DFD8CC] hover:border-[#1C1B18]'
                        }`}
                    >
                      <span
                        className="w-6 h-6 rounded-full border border-black/20 shrink-0 mt-0.5 flex items-center justify-center"
                        style={{ backgroundColor: opt.swatchColor }}
                      >
                        {active && <Check className="w-3.5 h-3.5 text-white drop-shadow" />}
                      </span>
                      <div className="flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <strong className="text-sm text-[#1C1B18]">{opt.name}</strong>
                          <span className="font-mono-spec text-xs font-semibold text-[#B86B43]">
                            {opt.priceDeltaEUR === 0
                              ? 'Incluído'
                              : `+ ${formatPrice(opt.priceDeltaEUR, currency)}`}
                          </span>
                        </div>
                        <span className="text-[11px] font-mono-spec text-[#666159] block">
                          {opt.material}
                        </span>
                        <p className="text-xs text-[#666159] mt-1">{opt.description}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
