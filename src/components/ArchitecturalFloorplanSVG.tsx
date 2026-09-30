import React from 'react';
import { RoomSpec, Typology } from '../data/inaraData';

interface ArchitecturalFloorplanSVGProps {
  typology: Typology;
  activeRoom: RoomSpec;
  onSelectRoom: (room: RoomSpec) => void;
}

export const ArchitecturalFloorplanSVG: React.FC<ArchitecturalFloorplanSVGProps> = ({
  typology,
  activeRoom,
  onSelectRoom,
}) => {
  return (
    <div className="relative w-full h-full bg-[#F7F4EF] blueprint-grid rounded-lg border border-[#DFD8CC] p-4 sm:p-6 flex flex-col justify-between">
      {/* Top Blueprint Header Stamp */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-2 border-b border-[#DFD8CC] text-xs font-mono-spec text-[#666159]">
        <div className="flex items-center gap-3">
          <span className="px-2 py-0.5 bg-[#1C1B18] text-[#F7F4EF] font-medium tracking-wider">
            PRANCHA ARQ-{typology.code.replace(/\s+/g, '-')}
          </span>
          <span>ESCALA S/E • COTAS EM METROS</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-[#3A4D3E] font-medium">
            <span className="w-2 h-2 rounded-full bg-[#3A4D3E] inline-block" />
            SOL: {typology.solarOrientation.toUpperCase()}
          </span>
          <span className="hidden sm:inline">CLIQUE NAS DIVISÕES PARA INSPECIONAR</span>
        </div>
      </div>

      {/* Main Interactive SVG Floorplan */}
      <div className="relative w-full aspect-[16/9] min-h-[270px] flex items-center justify-center">
        <svg
          viewBox="0 0 640 330"
          className="w-full h-full select-none"
          role="img"
          aria-label={`Planta técnica interativa da tipologia ${typology.name}`}
        >
          <defs>
            <pattern id="woodDeck" width="8" height="8" patternUnits="userSpaceOnUse">
              <line x1="0" y1="0" x2="8" y2="0" stroke="#B86B43" strokeWidth="0.6" strokeOpacity="0.35" />
              <line x1="0" y1="4" x2="8" y2="4" stroke="#B86B43" strokeWidth="0.6" strokeOpacity="0.35" />
            </pattern>
            <pattern id="tileGrid" width="12" height="12" patternUnits="userSpaceOnUse">
              <path
                d="M 12 0 L 0 0 0 12"
                fill="none"
                stroke="#1C1B18"
                strokeWidth="0.4"
                strokeOpacity="0.14"
              />
            </pattern>
          </defs>

          {/* Outer Dimension Lines */}
          <g stroke="#666159" strokeWidth="0.75" opacity="0.65">
            <line x1="55" y1="22" x2="585" y2="22" />
            <line x1="55" y1="17" x2="55" y2="27" />
            <line x1="585" y1="17" x2="585" y2="27" />
            <text
              x="320"
              y="17"
              textAnchor="middle"
              fontSize="9"
              fill="#666159"
              fontFamily="JetBrains Mono, monospace"
            >
              COTA TOTAL PRIVATIVA: {typology.privateArea} m² + {typology.terraceArea} m² EXTERIOR
            </text>

            <line x1="28" y1="45" x2="28" y2="290" />
            <line x1="23" y1="45" x2="33" y2="45" />
            <line x1="23" y1="290" x2="33" y2="290" />
            <text
              x="20"
              y="168"
              textAnchor="middle"
              fontSize="8.5"
              fill="#666159"
              fontFamily="JetBrains Mono, monospace"
              transform="rotate(-90 20 168)"
            >
              PÉ-DIREITO: {typology.ceilingHeight.toUpperCase()}
            </text>
          </g>

          {/* Structural Perimeter Envelope */}
          <rect
            x="50"
            y="36"
            width="542"
            height="262"
            fill="#EFEAE1"
            stroke="#1C1B18"
            strokeWidth="3.5"
          />

          {/* Interactive Rooms */}
          {typology.rooms.map((room, idx) => {
            const isSelected = activeRoom.id === room.id;
            const isOutdoor =
              room.id.includes('terrace') ||
              room.id.includes('balcony') ||
              room.id.includes('rooftop') ||
              room.id.includes('garden');

            return (
              <g
                key={room.id}
                onClick={() => onSelectRoom(room)}
                className="cursor-pointer transition-all duration-200 group"
              >
                {/* Room Fill */}
                <rect
                  x={room.rect.x}
                  y={room.rect.y}
                  width={room.rect.w}
                  height={room.rect.h}
                  fill={
                    isSelected
                      ? 'rgba(184, 107, 67, 0.22)'
                      : isOutdoor
                      ? 'url(#woodDeck)'
                      : 'url(#tileGrid)'
                  }
                  stroke={isSelected ? '#B86B43' : '#1C1B18'}
                  strokeWidth={isSelected ? '2.4' : '1.4'}
                />

                {/* Hover Subtle Overlay */}
                <rect
                  x={room.rect.x}
                  y={room.rect.y}
                  width={room.rect.w}
                  height={room.rect.h}
                  fill="#B86B43"
                  opacity="0"
                  className="group-hover:opacity-10 transition-opacity"
                />

                {/* Architectural Door Swing Arc or Window Line */}
                <path
                  d={`M ${room.rect.x + 14} ${room.rect.y + room.rect.h} A 16 16 0 0 1 ${
                    room.rect.x + 30
                  } ${room.rect.y + room.rect.h - 16}`}
                  fill="none"
                  stroke="#666159"
                  strokeWidth="0.8"
                  strokeDasharray="2 2"
                />

                {/* Room Index Pill */}
                <circle
                  cx={room.rect.x + 18}
                  cy={room.rect.y + 18}
                  r="9"
                  fill={isSelected ? '#B86B43' : '#1C1B18'}
                />
                <text
                  x={room.rect.x + 18}
                  y={room.rect.y + 21}
                  textAnchor="middle"
                  fontSize="8.5"
                  fontWeight="600"
                  fill="#F7F4EF"
                  fontFamily="JetBrains Mono, monospace"
                >
                  0{idx + 1}
                </text>

                {/* Room Name */}
                <text
                  x={room.rect.x + room.rect.w / 2}
                  y={room.rect.y + room.rect.h / 2 - 4}
                  textAnchor="middle"
                  fontSize="10.5"
                  fontWeight="600"
                  fill={isSelected ? '#96522F' : '#1C1B18'}
                  fontFamily="Plus Jakarta Sans, sans-serif"
                >
                  {room.name}
                </text>

                {/* Room Area + Dimensions */}
                <text
                  x={room.rect.x + room.rect.w / 2}
                  y={room.rect.y + room.rect.h / 2 + 11}
                  textAnchor="middle"
                  fontSize="9.5"
                  fill="#666159"
                  fontFamily="JetBrains Mono, monospace"
                >
                  {room.area} • ({room.dimensions})
                </text>
              </g>
            );
          })}

          {/* Compass Rose (North Arrow) */}
          <g transform="translate(612, 58)">
            <circle cx="0" cy="0" r="16" fill="#F7F4EF" stroke="#1C1B18" strokeWidth="1" />
            <polygon points="0,-12 4,4 0,0 -4,4" fill="#B86B43" />
            <text
              x="0"
              y="12"
              textAnchor="middle"
              fontSize="7.5"
              fontWeight="700"
              fill="#1C1B18"
              fontFamily="JetBrains Mono, monospace"
            >
              N
            </text>
          </g>

          {/* Botanical Garden Border Below Terrace */}
          <g transform="translate(55, 305)">
            <rect x="0" y="0" width="530" height="16" rx="3" fill="#3A4D3E" fillOpacity="0.14" />
            <text
              x="265"
              y="11"
              textAnchor="middle"
              fontSize="8.5"
              fill="#3A4D3E"
              fontWeight="600"
              fontFamily="JetBrains Mono, monospace"
            >
              ▲ FRENTE AJARDINADA • VISTA PARA O PARQUE BOTÂNICO & ESPELHO DE ÁGUA ▲
            </text>
          </g>
        </svg>
      </div>

      {/* Selected Room Inspector Bar */}
      <div className="mt-3 pt-3 border-t border-[#DFD8CC] flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#EFEAE1]/80 px-4 py-3 rounded-md">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono-spec uppercase tracking-wider px-2 py-0.5 rounded bg-[#B86B43] text-white">
              Divisão Selecionada
            </span>
            <h4 className="font-semibold text-sm text-[#1C1B18]">{activeRoom.name}</h4>
          </div>
          <p className="text-xs text-[#666159] mt-1">{activeRoom.description}</p>
        </div>
        <div className="flex items-center gap-4 shrink-0 font-mono-spec text-xs">
          <div className="bg-[#F7F4EF] px-3 py-1.5 rounded border border-[#DFD8CC]">
            <span className="text-[#666159] block text-[10px]">ÁREA ÚTIL</span>
            <strong className="text-[#1C1B18]">{activeRoom.area}</strong>
          </div>
          <div className="bg-[#F7F4EF] px-3 py-1.5 rounded border border-[#DFD8CC]">
            <span className="text-[#666159] block text-[10px]">DIMENSÕES</span>
            <strong className="text-[#1C1B18]">{activeRoom.dimensions}</strong>
          </div>
        </div>
      </div>
    </div>
  );
};
