/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Katex } from '../components/Katex';
import { Grid, Box, Trees, Sparkles } from 'lucide-react';
import { useViewportTier } from '../hooks/useViewportTier';

export interface HistoryVisualStoryProps {
  slideIndex?: number; // 0 = Varga & Ghana (ph-1), 1 = Mula (ph-2)
  className?: string;
}

export const HistoryVisualStory: React.FC<HistoryVisualStoryProps> = ({
  slideIndex = 0,
  className = '',
}) => {
  const [activeSlide, setActiveSlide] = useState<0 | 1>(slideIndex === 1 ? 1 : 0);
  const [formationMode, setFormationMode] = useState<'varga' | 'ghana'>('varga');
  const [isAligned, setIsAligned] = useState<boolean>(true);
  const [rootExample, setRootExample] = useState<'square' | 'cube'>('square');
  const { tier, isNarrow } = useViewportTier();
  const isCompact = tier === 'compact';
  const svgMaxH = isCompact ? 115 : isNarrow ? 145 : tier === 'standard' ? 185 : 220;

  // Keep synced with beat changes when parent advances beats
  React.useEffect(() => {
    setActiveSlide(slideIndex === 1 ? 1 : 0);
  }, [slideIndex]);

  return (
    <div
      data-no-nav="true"
      className={`w-full max-w-4xl h-full max-h-full min-h-0 overflow-hidden mx-auto rounded-3xl border border-slate-200/80 bg-white ${
        isCompact ? 'p-2 gap-1.5' : 'p-2.5 sm:p-4 gap-2 sm:gap-2.5'
      } shadow-xs flex flex-col justify-between ${className}`}
    >
      {/* Header & 2-Slide Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 border-b border-slate-100 pb-2 shrink-0">
        <div className="min-w-0">
          {!isCompact && (
            <div className="hidden sm:flex items-center gap-2 text-micro text-slate-500 font-semibold">
              <span>A Pinch of History</span>
              <span aria-hidden="true">·</span>
              <span>Aryabhata (499 CE)</span>
            </div>
          )}
          <h3 className="text-small sm:text-statement font-extrabold text-slate-900 mt-0.5">
            {activeSlide === 0
              ? 'Slide 1: Varga (Square Army) & Ghana (Solid Cube)'
              : 'Slide 2: Mūla (The Root That Grows the Shape)'}
          </h3>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-1 p-1 rounded-xl bg-slate-100/90 w-full sm:w-auto">
          <button
            type="button"
            onClick={() => setActiveSlide(0)}
            className={`min-h-[44px] sm:min-h-[38px] px-3 py-1.5 rounded-lg text-micro font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeSlide === 0
                ? 'bg-white text-[#005583] shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Grid className="w-3.5 h-3.5 shrink-0" />
            <span>1. Varga &amp; Ghana</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveSlide(1)}
            className={`min-h-[44px] sm:min-h-[38px] px-3 py-1.5 rounded-lg text-micro font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeSlide === 1
                ? 'bg-white text-emerald-700 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Trees className="w-3.5 h-3.5 shrink-0" />
            <span>2. Mūla (Root)</span>
          </button>
        </div>
      </div>

      {/* ================================================================= */}
      {/* SLIDE 1: VARGA (SOLDIERS IN ROWS -> SQUARE) & GHANA (SOLID CUBE)  */}
      {/* ================================================================= */}
      {activeSlide === 0 && (
        <div className="flex flex-col justify-between gap-2 flex-1 min-h-0 overflow-hidden animate-fade-rise">
          <div className={`flex flex-wrap items-center justify-between gap-2 ${isCompact ? 'p-1.5 px-2' : 'p-2 sm:px-3.5'} rounded-2xl bg-slate-50/80 shrink-0`}>
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              <button
                type="button"
                onClick={() => {
                  setFormationMode('varga');
                  setIsAligned(true);
                }}
                className={`${isCompact ? 'min-h-[36px] px-2.5 text-micro' : 'min-h-[40px] px-3.5 text-small'} py-1 rounded-xl font-bold border transition-all cursor-pointer flex items-center gap-1.5 ${
                  formationMode === 'varga'
                    ? 'bg-[#0788D3] text-white border-[#0369A1] shadow-2xs'
                    : 'bg-white text-slate-700 border-slate-200/80 hover:bg-slate-100'
                }`}
              >
                <Grid className="w-3.5 h-3.5 shrink-0" />
                <span>Varga (Square)</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setFormationMode('ghana');
                  setIsAligned(true);
                }}
                className={`${isCompact ? 'min-h-[36px] px-2.5 text-micro' : 'min-h-[40px] px-3.5 text-small'} py-1 rounded-xl font-bold border transition-all cursor-pointer flex items-center gap-1.5 ${
                  formationMode === 'ghana'
                    ? 'bg-[#F27A00] text-white border-[#C2410C] shadow-2xs'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <Box className="w-3.5 h-3.5 shrink-0" />
                <span>Ghana (Cube)</span>
              </button>
            </div>

            <button
              type="button"
              onClick={() => setIsAligned((a) => !a)}
              className={`${isCompact ? 'min-h-[36px] px-2.5 text-micro' : 'min-h-[40px] px-3.5 text-small'} py-1 rounded-xl bg-white border border-slate-300 hover:bg-slate-100 font-bold text-slate-800 cursor-pointer text-center`}
            >
              {formationMode === 'varga'
                ? isAligned
                  ? 'Scatter (2 × 8)'
                  : 'March into Varga (4 × 4)'
                : isAligned
                ? 'Unstack Layers'
                : 'Stack Ghana (3 × 3 × 3)'}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-2.5 items-center flex-1 min-h-0 overflow-hidden">
            {/* SVG Canvas */}
            <div className="md:col-span-7 rounded-2xl bg-slate-50/70 p-1.5 sm:p-2 flex items-center justify-center min-h-0">
              {formationMode === 'varga' ? (
                <svg viewBox="0 0 420 250" className="w-full h-auto select-none" style={{ maxHeight: `${svgMaxH}px` }}>
                  {/* Ground Square Highlight when aligned */}
                  <rect
                    x={126}
                    y={36}
                    width={168}
                    height={168}
                    rx={14}
                    fill={isAligned ? 'rgba(7, 136, 211, 0.08)' : 'transparent'}
                    stroke={isAligned ? '#0788D3' : 'transparent'}
                    strokeWidth={2}
                    strokeDasharray="6 4"
                    style={{ transition: 'all 400ms ease' }}
                  />

                  {/* 16 Soldiers (shield + helmet SVG tokens) */}
                  {Array.from({ length: 16 }, (_, idx) => {
                    const targetRow = Math.floor(idx / 4);
                    const targetCol = idx % 4;
                    const xAligned = 148 + targetCol * 41;
                    const yAligned = 58 + targetRow * 41;

                    // Scattered 2x8 marching rows
                    const scatterRow = Math.floor(idx / 8);
                    const scatterCol = idx % 8;
                    const xScatter = 52 + scatterCol * 44;
                    const yScatter = 90 + scatterRow * 58;

                    const px = isAligned ? xAligned : xScatter;
                    const py = isAligned ? yAligned : yScatter;

                    return (
                      <g
                        key={idx}
                        style={{
                          transform: `translate(${px}px, ${py}px)`,
                          transition: `transform 520ms cubic-bezier(0.22, 1, 0.36, 1) ${idx * 12}ms`,
                        }}
                      >
                        <circle
                          cx={0}
                          cy={0}
                          r={14}
                          fill={isAligned ? '#0788D3' : '#64748B'}
                          stroke="#FFFFFF"
                          strokeWidth={2}
                        />
                        {/* Shield crest */}
                        <circle cx={0} cy={-4} r={4} fill="#FDE68A" />
                        <path
                          d="M -6 8 C -6 2, 6 2, 6 8 Z"
                          fill="#E0F2FE"
                        />
                      </g>
                    );
                  })}

                  <text
                    x={210}
                    y={232}
                    textAnchor="middle"
                    fill="#0369A1"
                    fontSize={14}
                    fontWeight={800}
                  >
                    {isAligned
                      ? 'Varga: 4 rows × 4 soldiers = 16 (Equal Squad!)'
                      : 'Marching line: 2 rows × 8 soldiers = 16'}
                  </text>
                </svg>
              ) : (
                <svg viewBox="0 0 420 250" className="w-full h-auto select-none" style={{ maxHeight: `${svgMaxH}px` }}>
                  {/* 3x3x3 Isometric Ghana Solid Block */}
                  {Array.from({ length: 3 }).map((_, z) =>
                    Array.from({ length: 3 }).map((__, y) =>
                      Array.from({ length: 3 }).map((___, x) => {
                        const s = 24;
                        const zLift = isAligned ? z : z * 1.65;
                        const cx = 210 + (x - y) * s * 0.866;
                        const cy =
                          (isAligned ? 142 : 168) + (x + y) * s * 0.5 - zLift * s;

                        const p0 = `${cx},${cy - s}`;
                        const p1 = `${cx + s * 0.866},${cy - s * 0.5}`;
                        const p2 = `${cx},${cy}`;
                        const p3 = `${cx - s * 0.866},${cy - s * 0.5}`;

                        const pRightBottom = `${cx + s * 0.866},${cy + s * 0.5}`;
                        const pCenterBottom = `${cx},${cy + s}`;
                        const pLeftBottom = `${cx - s * 0.866},${cy + s * 0.5}`;

                        return (
                          <g
                            key={`${x}-${y}-${z}`}
                            style={{ transition: 'transform 450ms ease' }}
                          >
                            <polygon
                              points={`${p0} ${p1} ${p2} ${p3}`}
                              fill="#FED7AA"
                              stroke="#EA580C"
                              strokeWidth={1}
                            />
                            <polygon
                              points={`${p1} ${pRightBottom} ${pCenterBottom} ${p2}`}
                              fill="#FB923C"
                              stroke="#C2410C"
                              strokeWidth={1}
                            />
                            <polygon
                              points={`${p3} ${p2} ${pCenterBottom} ${pLeftBottom}`}
                              fill="#F97316"
                              stroke="#9A3412"
                              strokeWidth={1}
                            />
                          </g>
                        );
                      })
                    )
                  )}

                  <text
                    x={210}
                    y={236}
                    textAnchor="middle"
                    fill="#9A3412"
                    fontSize={14}
                    fontWeight={800}
                  >
                    {isAligned
                      ? 'Ghana: Solid 3 × 3 × 3 block = 27 unit bricks'
                      : '3 flat 3×3 layers ready to stack into a Ghana'}
                  </text>
                </svg>
              )}
            </div>

            {/* Cultural Meaning Card */}
            <div className="md:col-span-5 flex flex-col gap-2">
              <div className={`${isCompact ? 'p-2' : 'p-2.5 sm:p-3.5'} rounded-2xl bg-slate-50/80 flex flex-col gap-1`}>
                <span className="text-micro font-bold text-[#005583]">
                  Sanskrit Word Origin
                </span>
                <h4 className="text-small sm:text-statement font-extrabold text-slate-900">
                  {formationMode === 'varga'
                    ? 'Varga = Squad of Soldiers'
                    : 'Ghana = Dense Solid Block'}
                </h4>
                {!isCompact && (
                  <p className="text-micro sm:text-small text-slate-700 leading-snug">
                    {formationMode === 'varga'
                      ? 'In 499 CE, Aryabhata used varga for equal rows and columns—like soldiers in a square squad!'
                      : 'Ancient Indian scholars called a cube ghana—meaning a dense, solid 3D block.'}
                  </p>
                )}
              </div>

              <div className={`${isCompact ? 'p-1.5' : 'p-2.5'} rounded-2xl bg-blue-50/60 flex flex-wrap items-center justify-center text-center`}>
                <Katex
                  latex={
                    formationMode === 'varga'
                      ? `\\text{Varga: } 4 \\times 4 = 16`
                      : `\\text{Ghana: } 3 \\times 3 \\times 3 = 27`
                  }
                  displayMode={false}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================================================================= */}
      {/* SLIDE 2: MULA (TREE ROOT THAT GENERATES THE WHOLE STRUCTURE)      */}
      {/* ================================================================= */}
      {activeSlide === 1 && (
        <div className="flex flex-col justify-between gap-2 flex-1 min-h-0 overflow-hidden animate-fade-rise">
          <div className={`flex flex-wrap items-center justify-between gap-2 ${isCompact ? 'p-1.5 px-2' : 'p-2 sm:px-3.5'} rounded-2xl bg-slate-50/80 shrink-0`}>
            <span className="text-micro sm:text-small font-bold text-slate-700">
              See what Mūla (Root) grows:
            </span>
            <div className="flex flex-wrap items-center gap-1.5">
              <button
                type="button"
                onClick={() => setRootExample('square')}
                className={`${isCompact ? 'min-h-[36px] px-2.5 text-micro' : 'min-h-[40px] px-3.5 text-small'} py-1 rounded-xl font-bold border transition-all cursor-pointer ${
                  rootExample === 'square'
                    ? 'bg-emerald-600 text-white border-emerald-700 shadow-2xs'
                    : 'bg-white text-slate-700 border-slate-200/80 hover:bg-slate-100'
                }`}
              >
                Varga-mūla (√36 = 6)
              </button>
              <button
                type="button"
                onClick={() => setRootExample('cube')}
                className={`${isCompact ? 'min-h-[36px] px-2.5 text-micro' : 'min-h-[40px] px-3.5 text-small'} py-1 rounded-xl font-bold border transition-all cursor-pointer ${
                  rootExample === 'cube'
                    ? 'bg-purple-700 text-white border-purple-800 shadow-2xs'
                    : 'bg-white text-slate-700 border-slate-200/80 hover:bg-slate-100'
                }`}
              >
                Ghana-mūla (∛64 = 4)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-2.5 items-center flex-1 min-h-0 overflow-hidden">
            {/* Botanical Root -> Canopy SVG */}
            <div className="md:col-span-7 rounded-2xl bg-gradient-to-b from-sky-50/70 via-white to-amber-50/70 p-1.5 sm:p-2 flex items-center justify-center min-h-0">
              <svg viewBox="0 0 420 260" className="w-full h-auto select-none" style={{ maxHeight: `${svgMaxH}px` }}>
                {/* Soil Horizon */}
                <line x1={20} y1={170} x2={400} y2={170} stroke="#B45309" strokeWidth={2.5} strokeDasharray="6 4" />
                <text x={36} y={188} fill="#92400E" fontSize={14} fontWeight={700}>
                  Underground Mūla (Root)
                </text>

                {/* Trunk */}
                <path
                  d="M 200 172 L 204 115 L 216 115 L 220 172 Z"
                  fill="#92400E"
                />

                {/* Roots spreading down from Mula */}
                <path
                  d="M 210 170 C 200 192, 168 205, 145 224 M 210 170 C 210 198, 210 215, 210 236 M 210 170 C 222 192, 252 205, 275 224"
                  stroke="#B45309"
                  strokeWidth={4}
                  strokeLinecap="round"
                  fill="none"
                />

                {/* Highlighted Root Seed Pill */}
                <circle
                  cx={210}
                  cy={208}
                  r={24}
                  fill="#FEF3C7"
                  stroke="#D97706"
                  strokeWidth={2.5}
                />
                <text
                  x={210}
                  y={205}
                  textAnchor="middle"
                  fill="#92400E"
                  fontSize={14}
                  fontWeight={800}
                >
                  MŪLA
                </text>
                <text
                  x={210}
                  y={220}
                  textAnchor="middle"
                  fill="#78350F"
                  fontSize={14}
                  fontWeight={900}
                >
                  {rootExample === 'square' ? '6' : '4'}
                </text>

                {/* Canopy Frame Showing Grown Square or Cube */}
                <ellipse cx={210} cy={78} rx={115} ry={60} fill="#DCFCE7" stroke="#16A34A" strokeWidth={2} />
                <text x={210} y={40} textAnchor="middle" fill="#15803D" fontSize={14} fontWeight={800}>
                  {rootExample === 'square'
                    ? 'Canopy Grows 6 × 6 = 36 Squares'
                    : 'Canopy Grows 4 × 4 × 4 = 64 Cubes'}
                </text>

                {rootExample === 'square' ? (
                  <g transform="translate(174, 52)">
                    {Array.from({ length: 6 }).map((_, r) =>
                      Array.from({ length: 6 }).map((__, c) => (
                        <rect
                          key={`${r}-${c}`}
                          x={c * 12}
                          y={r * 12}
                          width={10}
                          height={10}
                          rx={2}
                          fill="#0788D3"
                        />
                      ))
                    )}
                  </g>
                ) : (
                  <g transform="translate(182, 54)">
                    {Array.from({ length: 4 }).map((_, r) =>
                      Array.from({ length: 4 }).map((__, c) => (
                        <rect
                          key={`${r}-${c}`}
                          x={c * 14}
                          y={r * 14}
                          width={12}
                          height={12}
                          rx={2}
                          fill="#8B5CF6"
                        />
                      ))
                    )}
                    <text x={72} y={32} fill="#6D28D9" fontSize={14} fontWeight={900}>
                      × 4 layers = 64
                    </text>
                  </g>
                )}
              </svg>
            </div>

            {/* Meaning Box */}
            <div className="md:col-span-5 flex flex-col gap-2">
              <div className={`${isCompact ? 'p-2' : 'p-2.5 sm:p-3.5'} rounded-2xl bg-emerald-50/60 flex flex-col gap-1`}>
                <div className="flex items-center gap-1.5 text-micro font-bold text-emerald-800">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Why Do We Say &ldquo;Root&rdquo;?</span>
                </div>
                <h4 className="text-small sm:text-statement font-extrabold text-slate-900">
                  Mūla Means Tree Root
                </h4>
                {!isCompact && (
                  <p className="text-micro sm:text-small text-slate-700 leading-snug">
                    Just as a tiny root grows a whole tree,{' '}
                    <strong>{rootExample === 'square' ? '6' : '4'}</strong> is the side that grows{' '}
                    <strong>{rootExample === 'square' ? '36' : '64'}</strong>!
                  </p>
                )}
              </div>

              <div className={`${isCompact ? 'p-1.5' : 'p-2.5'} rounded-2xl bg-slate-50/80 flex flex-wrap items-center justify-center text-center`}>
                <Katex
                  latex={
                    rootExample === 'square'
                      ? `\\sqrt{36} = 6 \\; (\\text{varga-mūla})`
                      : `\\sqrt[3]{64} = 4 \\; (\\text{ghana-mūla})`
                  }
                  displayMode={false}
                />
              </div>

              {!isCompact && (
                <div className="p-2 rounded-xl bg-amber-50/70 border border-amber-200/60 text-[11px] text-amber-950 leading-snug">
                  <strong>World History Journey:</strong> Brahmagupta (628 CE) called root <em>pada</em> (foot/basis). Later, <em>mūla</em> was translated into Arabic as <em>jidhr</em> and Latin as <em>radix</em> (the plant root), which gave birth to our symbol <strong className="font-mono text-xs">√</strong> (radical)!
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export interface BabylonianTabletSvgProps {
  stage: 'tablet' | 'wedges' | 'answer';
}

export const BabylonianTabletSvg: React.FC<BabylonianTabletSvgProps> = ({ stage }) => {
  return (
    <svg viewBox="0 0 340 116" className="h-[112px] w-full max-w-[340px] select-none">
      {/* Clay Tablet */}
      <g transform="translate(16, 10)">
        <rect x={0} y={0} width={96} height={96} rx={22} fill="#FDE68A" stroke="#B45309" strokeWidth={2.5} />
        <rect x={22} y={20} width={52} height={52} fill="none" stroke="#92400E" strokeWidth={2} />
        <line x1={22} y1={20} x2={74} y2={72} stroke="#DC2626" strokeWidth={2.5} strokeDasharray="4 2" />
        <text x={48} y={88} textAnchor="middle" fill="#78350F" fontSize={14} fontWeight={900}>
          YBC 7289
        </text>
      </g>

      {/* Right Info Area */}
      {stage === 'tablet' && (
        <g transform="translate(130, 34)">
          <text x={0} y={14} fill="#78350F" fontSize={15} fontWeight={900}>
            1800 BCE Clay Tablet
          </text>
          <text x={0} y={38} fill="#475569" fontSize={14} fontWeight={700}>
            Unit square + diagonal √2
          </text>
        </g>
      )}

      {stage === 'wedges' && (
        <g transform="translate(124, 20)">
          <rect x={0} y={0} width={202} height={34} rx={10} fill="#FFFBEB" stroke="#D97706" strokeWidth={1.5} />
          <text x={101} y={22} textAnchor="middle" fill="#92400E" fontSize={14} fontWeight={900}>
            1 + 24/60 + 51/3600 + ...
          </text>
          <rect x={0} y={44} width={202} height={34} rx={10} fill="#EFF6FF" stroke="#0284C7" strokeWidth={1.5} />
          <text x={101} y={66} textAnchor="middle" fill="#005583" fontSize={14} fontWeight={900}>
            ≈ 1.414213 (√2!)
          </text>
        </g>
      )}

      {stage === 'answer' && (
        <g transform="translate(128, 28)">
          <rect x={0} y={0} width={196} height={56} rx={14} fill="#D97706" />
          <text x={98} y={34} textAnchor="middle" fill="#FFFFFF" fontSize={16} fontWeight={900}>
            The Babylonians ✓
          </text>
        </g>
      )}
    </svg>
  );
};

export interface InverseCubeMachineSvgProps {
  baseN: number;
  phase: 'forward' | 'reverse' | 'cycle';
}

export const InverseCubeMachineSvg: React.FC<InverseCubeMachineSvgProps> = ({
  baseN,
  phase,
}) => {
  const cubeVal = baseN * baseN * baseN;
  return (
    <svg viewBox="0 0 340 114" className="h-[108px] w-full max-w-[340px] select-none">
      {/* Edge Box */}
      <rect x={12} y={30} width={66} height={52} rx={12} fill="#EFF6FF" stroke="#0284C7" strokeWidth={2} />
      <text x={45} y={62} textAnchor="middle" fill="#005583" fontSize={16} fontWeight={900}>
        {baseN}
      </text>

      {/* Top Forward Arc: x^3 */}
      <path d="M 80 34 Q 170 4 256 34" fill="none" stroke="#F27A00" strokeWidth={phase === 'forward' || phase === 'cycle' ? 3 : 1.5} />
      <rect x={126} y={4} width={88} height={26} rx={8} fill={phase === 'forward' ? '#F27A00' : '#FFF7ED'} stroke="#F27A00" strokeWidth={1.5} />
      <text x={170} y={22} textAnchor="middle" fill={phase === 'forward' ? '#FFFFFF' : '#9A3412'} fontSize={14} fontWeight={900}>
        Cube (³)
      </text>

      {/* Volume Box */}
      <rect x={260} y={30} width={68} height={52} rx={12} fill="#F5F3FF" stroke="#7C3AED" strokeWidth={2} />
      <text x={294} y={62} textAnchor="middle" fill="#5B21B6" fontSize={16} fontWeight={900}>
        {cubeVal}
      </text>

      {/* Bottom Reverse Arc: cbrt */}
      {phase !== 'forward' && (
        <g>
          <path d="M 256 80 Q 170 110 80 80" fill="none" stroke="#16A34A" strokeWidth={3} />
          <rect x={110} y={84} width={120} height={26} rx={8} fill="#16A34A" />
          <text x={170} y={102} textAnchor="middle" fill="#FFFFFF" fontSize={14} fontWeight={900}>
            Cube Root (∛)
          </text>
        </g>
      )}
    </svg>
  );
};

