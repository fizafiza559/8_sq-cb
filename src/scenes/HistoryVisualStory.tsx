/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { COLORS } from '../design/tokens';
import { Katex } from '../components/Katex';
import { Grid, Box, Trees, Sparkles } from 'lucide-react';

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

  // Keep synced with beat changes when parent advances beats
  React.useEffect(() => {
    setActiveSlide(slideIndex === 1 ? 1 : 0);
  }, [slideIndex]);

  return (
    <div
      data-no-nav="true"
      className={`w-full max-w-4xl mx-auto rounded-3xl border bg-white p-4 sm:p-6 shadow-xs flex flex-col gap-5 ${className}`}
      style={{ borderColor: COLORS.divider }}
    >
      {/* Header & 2-Slide Switcher */}
      <div
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b pb-4"
        style={{ borderColor: COLORS.divider }}
      >
        <div>
          <div className="flex items-center gap-2 text-micro text-slate-500 font-semibold">
            <span>A Pinch of History</span>
            <span aria-hidden="true">·</span>
            <span>Aryabhata (499 CE)</span>
          </div>
          <h3 className="text-statement font-extrabold text-slate-900 mt-0.5">
            {activeSlide === 0
              ? 'Slide 1: Varga (Square Army) & Ghana (Solid Cube)'
              : 'Slide 2: Mūla (The Root That Grows the Shape)'}
          </h3>
        </div>

        <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-100 border border-slate-200 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setActiveSlide(0)}
            className={`min-h-[38px] px-3 py-1.5 rounded-lg text-micro font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeSlide === 0
                ? 'bg-white text-[#005583] shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Grid className="w-3.5 h-3.5" />
            <span>1. Varga &amp; Ghana</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveSlide(1)}
            className={`min-h-[38px] px-3 py-1.5 rounded-lg text-micro font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeSlide === 1
                ? 'bg-white text-emerald-700 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Trees className="w-3.5 h-3.5" />
            <span>2. Mūla (Root)</span>
          </button>
        </div>
      </div>

      {/* ================================================================= */}
      {/* SLIDE 1: VARGA (SOLDIERS IN ROWS -> SQUARE) & GHANA (SOLID CUBE)  */}
      {/* ================================================================= */}
      {activeSlide === 0 && (
        <div className="flex flex-col gap-5 animate-fade-rise">
          <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setFormationMode('varga');
                  setIsAligned(true);
                }}
                className={`min-h-[40px] px-4 py-2 rounded-xl text-small font-bold border transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                  formationMode === 'varga'
                    ? 'bg-[#0788D3] text-white border-[#0369A1] shadow-2xs'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <Grid className="w-4 h-4" />
                <span>Varga (Square)</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setFormationMode('ghana');
                  setIsAligned(true);
                }}
                className={`min-h-[40px] px-4 py-2 rounded-xl text-small font-bold border transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                  formationMode === 'ghana'
                    ? 'bg-[#F27A00] text-white border-[#C2410C] shadow-2xs'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <Box className="w-4 h-4" />
                <span>Ghana (Cube)</span>
              </button>
            </div>

            <button
              type="button"
              onClick={() => setIsAligned((a) => !a)}
              className="min-h-[40px] px-4 py-2 rounded-xl bg-white border border-slate-300 hover:bg-slate-100 text-small font-bold text-slate-800 cursor-pointer whitespace-nowrap"
            >
              {formationMode === 'varga'
                ? isAligned
                  ? 'Scatter Line (1 × 16)'
                  : 'March into Varga (4 × 4)'
                : isAligned
                ? 'Unstack Layers'
                : 'Stack into Ghana (3 × 3 × 3)'}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
            {/* SVG Canvas */}
            <div className="md:col-span-7 rounded-2xl border border-slate-200 bg-slate-50/60 p-3 flex items-center justify-center">
              {formationMode === 'varga' ? (
                <svg viewBox="0 0 420 250" className="w-full h-auto max-h-[250px] select-none">
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
                    fontSize={12}
                    fontWeight={800}
                  >
                    {isAligned
                      ? 'Varga: 4 rows × 4 soldiers = 16 (Equal Squad!)'
                      : 'Marching line: 2 rows × 8 soldiers = 16'}
                  </text>
                </svg>
              ) : (
                <svg viewBox="0 0 420 250" className="w-full h-auto max-h-[250px] select-none">
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
                    fontSize={12}
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
            <div className="md:col-span-5 flex flex-col gap-3">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col gap-2">
                <span className="text-micro font-bold text-[#005583]">
                  Sanskrit Word Origin
                </span>
                <h4 className="text-statement font-extrabold text-slate-900">
                  {formationMode === 'varga'
                    ? 'Varga = Squad of Soldiers'
                    : 'Ghana = Dense Solid Block'}
                </h4>
                <p className="text-small text-slate-700 leading-relaxed">
                  {formationMode === 'varga'
                    ? 'In 499 CE, Aryabhata used varga for equal rows and columns—just like soldiers marching in a square squad!'
                    : 'Ancient Indian scholars called a cube ghana—meaning a dense, solid 3D block packed equally on all three sides.'}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200 flex items-center justify-center">
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
        <div className="flex flex-col gap-5 animate-fade-rise">
          <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
            <span className="text-small font-bold text-slate-700">
              See what Mūla (Root) grows:
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setRootExample('square')}
                className={`min-h-[38px] px-3.5 py-1.5 rounded-xl text-small font-bold border transition-all cursor-pointer whitespace-nowrap ${
                  rootExample === 'square'
                    ? 'bg-emerald-600 text-white border-emerald-700 shadow-2xs'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                Varga-mūla (√36 = 6)
              </button>
              <button
                type="button"
                onClick={() => setRootExample('cube')}
                className={`min-h-[38px] px-3.5 py-1.5 rounded-xl text-small font-bold border transition-all cursor-pointer whitespace-nowrap ${
                  rootExample === 'cube'
                    ? 'bg-purple-700 text-white border-purple-800 shadow-2xs'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                Ghana-mūla (∛64 = 4)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
            {/* Botanical Root -> Canopy SVG */}
            <div className="md:col-span-7 rounded-2xl border border-slate-200 bg-gradient-to-b from-sky-50/70 via-white to-amber-50/70 p-3 flex items-center justify-center">
              <svg viewBox="0 0 420 260" className="w-full h-auto max-h-[260px] select-none">
                {/* Soil Horizon */}
                <line x1={20} y1={170} x2={400} y2={170} stroke="#B45309" strokeWidth={2.5} strokeDasharray="6 4" />
                <text x={36} y={188} fill="#92400E" fontSize={11} fontWeight={700}>
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
                  fontSize={10}
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
                <text x={210} y={40} textAnchor="middle" fill="#15803D" fontSize={11} fontWeight={800}>
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
                    <text x={72} y={32} fill="#6D28D9" fontSize={12} fontWeight={900}>
                      × 4 layers = 64
                    </text>
                  </g>
                )}
              </svg>
            </div>

            {/* Meaning Box */}
            <div className="md:col-span-5 flex flex-col gap-3">
              <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 flex flex-col gap-2">
                <div className="flex items-center gap-1.5 text-micro font-bold text-emerald-800">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Why Do We Say &ldquo;Root&rdquo;?</span>
                </div>
                <h4 className="text-statement font-extrabold text-slate-900">
                  Mūla Means Tree Root
                </h4>
                <p className="text-small text-slate-700 leading-relaxed">
                  Just as a tiny root underground grows a whole tree, the number{' '}
                  <strong>{rootExample === 'square' ? '6' : '4'}</strong> is the hidden side that grows{' '}
                  <strong>{rootExample === 'square' ? '36' : '64'}</strong>!
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center">
                <Katex
                  latex={
                    rootExample === 'square'
                      ? `\\sqrt{36} = 6 \\; (\\text{varga-mūla})`
                      : `\\sqrt[3]{64} = 4 \\; (\\text{ghana-mūla})`
                  }
                  displayMode={false}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
