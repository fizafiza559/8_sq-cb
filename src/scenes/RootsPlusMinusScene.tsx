/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { COLORS } from '../design/tokens';
import { Katex } from '../components/Katex';
import { ShieldAlert, Compass, PlusCircle, ArrowRight, Sparkles, HelpCircle } from 'lucide-react';
import { useViewportTier } from '../hooks/useViewportTier';

export interface RootsPlusMinusSceneProps {
  beatIndex?: number;
  className?: string;
}

type SceneTab = 'intro' | 'courtyard' | 'plusminus';

export const RootsPlusMinusScene: React.FC<RootsPlusMinusSceneProps> = ({
  beatIndex = 0,
  className = '',
}) => {
  const [activeTab, setActiveTab] = useState<SceneTab>('intro');
  const [courtyardSide, setCourtyardSide] = useState<number>(7); // 7x7 = 49 sq cm
  const [pmNumber, setPmNumber] = useState<number>(64); // sqrt(64) = +/- 8
  const { tier, isNarrow } = useViewportTier();
  const isCompact = tier === 'compact';

  useEffect(() => {
    if (beatIndex === 0) {
      setActiveTab('intro');
    } else if (beatIndex === 1) {
      setActiveTab('courtyard');
      setCourtyardSide(7);
    } else {
      setActiveTab('plusminus');
      setPmNumber(beatIndex === 2 ? 64 : 100);
    }
  }, [beatIndex]);

  const courtyardArea = courtyardSide * courtyardSide;
  const pmRoot = Math.round(Math.sqrt(pmNumber));

  const svgMaxH = isCompact ? 115 : isNarrow ? 145 : tier === 'standard' ? 175 : 205;

  return (
    <div
      data-no-nav="true"
      className={`w-full max-w-5xl h-full max-h-full min-h-0 overflow-hidden mx-auto rounded-3xl border border-slate-200/80 bg-white ${
        isCompact ? 'p-2 gap-1.5' : 'p-3 sm:p-4 gap-2 sm:gap-2.5'
      } shadow-xs flex flex-col justify-between ${className}`}
    >
      {/* Top Header & Tab Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-1.5 border-b border-slate-100 pb-2 shrink-0">
        <div className="min-w-0">
          {!isCompact && (
            <span className="text-micro font-bold uppercase tracking-wider text-slate-500 hidden sm:block">
              NCERT Class 8 · Ganita Prakash Pages 7–8
            </span>
          )}
          <h3 className="text-small sm:text-statement font-extrabold text-slate-900 mt-0.5">
            {activeTab === 'intro'
              ? 'This Portion is for Square Roots!'
              : activeTab === 'courtyard'
              ? 'Finding the Side from Area (49 cm²)'
              : 'Two Roots: Why Every Square Has Both + and – Roots'}
          </h3>
        </div>

        <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-100/90 shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab('intro')}
            className={`min-h-[32px] px-2.5 py-1 rounded-lg text-micro font-bold flex items-center gap-1 cursor-pointer transition-all ${
              activeTab === 'intro'
                ? 'bg-white text-[#005583] shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Intro: Square Root</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('courtyard')}
            className={`min-h-[32px] px-2.5 py-1 rounded-lg text-micro font-bold flex items-center gap-1 cursor-pointer transition-all ${
              activeTab === 'courtyard'
                ? 'bg-white text-[#005583] shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Courtyard 49 cm²</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('plusminus')}
            className={`min-h-[32px] px-2.5 py-1 rounded-lg text-micro font-bold flex items-center gap-1 cursor-pointer transition-all ${
              activeTab === 'plusminus'
                ? 'bg-white text-[#005583] shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>± Roots Explorer</span>
          </button>
        </div>
      </div>

      {/* ================================================================= */}
      {/* TAB 0: INTRO SLIDE - THIS PORTION IS FOR SQUARE ROOTS */}
      {/* ================================================================= */}
      {activeTab === 'intro' && (
        <div className="flex flex-col flex-1 min-h-0 justify-between gap-2 animate-fade-rise overflow-hidden">
          {/* Welcome Banner */}
          <div className="p-2 sm:p-2.5 rounded-2xl bg-sky-50/80 border border-sky-200/70 flex items-center justify-between gap-2 shrink-0">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-xl bg-[#005583] text-white flex items-center justify-center font-bold text-statement shadow-2xs">
                √
              </span>
              <div>
                <h4 className="text-small sm:text-statement font-extrabold text-slate-900 leading-tight">
                  This portion is for Square Roots!
                </h4>
                <p className="text-micro sm:text-small text-slate-600">
                  Squaring builds the area forward. The square root walks backwards!
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setActiveTab('courtyard')}
              className="min-h-[32px] px-3 py-1 rounded-xl bg-[#005583] text-white text-micro font-bold flex items-center gap-1 shadow-2xs hover:bg-[#003F62] cursor-pointer shrink-0"
            >
              <span>See Courtyard</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Side-by-Side Dual Contrast Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 flex-1 min-h-0 items-center">
            {/* Card 1: Squaring */}
            <div className="p-3 sm:p-4 rounded-2xl bg-orange-50/70 border border-orange-200 flex flex-col justify-between h-full">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-orange-800">
                  Step 1: Squaring (Build Forward)
                </span>
                <span className="px-2 py-0.5 rounded-full text-micro font-bold bg-orange-100 text-orange-900 border border-orange-300">
                  Side → Area
                </span>
              </div>

              <div className="my-2 text-center">
                <div className="text-statement sm:text-title font-mono font-black text-orange-950">
                  4² = 4 × 4 = 16
                </div>
                <p className="text-micro sm:text-small text-slate-700 mt-1">
                  You know the side is <strong>4 cm</strong>. Multiply side by side to find the total area: <strong>16 cm²</strong>.
                </p>
              </div>

              <div className="p-2 rounded-xl bg-white border border-orange-200 text-center text-micro font-bold text-orange-900">
                &ldquo;Squaring means building the square.&rdquo;
              </div>
            </div>

            {/* Card 2: Square Root */}
            <div className="p-3 sm:p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 flex flex-col justify-between h-full">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800">
                  Step 2: Square Root (Walk Backward)
                </span>
                <span className="px-2 py-0.5 rounded-full text-micro font-bold bg-emerald-100 text-emerald-900 border border-emerald-300">
                  Area → Side
                </span>
              </div>

              <div className="my-2 text-center">
                <div className="text-statement sm:text-title font-mono font-black text-emerald-950">
                  √16 = 4
                </div>
                <p className="text-micro sm:text-small text-slate-700 mt-1">
                  You are given the area <strong>16 cm²</strong>. Ask: <em>&ldquo;What number multiplied by itself gives 16?&rdquo;</em> The side is <strong>4 cm</strong>!
                </p>
              </div>

              <div className="p-2 rounded-xl bg-white border border-emerald-200 text-center text-micro font-bold text-emerald-900">
                &ldquo;The root un-squares the area back to its side.&rdquo;
              </div>
            </div>
          </div>

          {/* Core Rule Footer */}
          <div className="p-2 sm:p-2.5 rounded-2xl bg-slate-50/90 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-1.5 shrink-0 text-center sm:text-left">
            <span className="text-micro sm:text-small text-slate-700 font-medium">
              The symbol <strong className="font-mono text-base text-[#005583]">√</strong> is called the <strong>radical symbol</strong>. It means &ldquo;find the original side length&rdquo;.
            </span>
            <div className="font-mono text-small sm:text-body font-bold text-[#005583] shrink-0">
              <Katex latex="y = x^2 \iff x = \sqrt{y}" displayMode={false} />
            </div>
          </div>
        </div>
      )}

      {/* ================================================================= */}
      {/* TAB 1: COURTYARD AREA (49 cm²) */}
      {/* ================================================================= */}
      {activeTab === 'courtyard' && (
        <div className="flex flex-col flex-1 min-h-0 justify-between gap-1.5 sm:gap-2 animate-fade-rise overflow-hidden">
          {/* Question Prompt */}
          <div className="p-2 sm:p-2.5 rounded-2xl bg-amber-50/70 border border-amber-200/60 flex flex-col sm:flex-row items-center justify-between gap-1.5 shrink-0">
            <p className="text-micro sm:text-small font-bold text-amber-950">
              &ldquo;The area of a square courtyard is <strong className="text-amber-900">{courtyardArea} sq. cm</strong>. What is the length of its side?&rdquo;
            </p>
            <div className="flex items-center gap-1">
              <span className="text-micro font-bold text-slate-600 mr-1 hidden sm:inline">Try Area:</span>
              {[16, 25, 36, 49, 64, 81].map((a) => {
                const s = Math.round(Math.sqrt(a));
                return (
                  <button
                    key={a}
                    type="button"
                    onClick={() => setCourtyardSide(s)}
                    className={`min-h-[30px] px-2 py-0.5 rounded-lg text-micro font-bold border transition-all cursor-pointer tabular-nums ${
                      courtyardArea === a
                        ? 'bg-[#F27A00] text-white border-[#D96B00] shadow-2xs'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {a}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Floor Visualizer SVG */}
          <div
            className="w-full flex-1 min-h-0 rounded-2xl border p-1.5 flex flex-col items-center justify-center overflow-hidden transition-colors"
            style={{
              borderColor: COLORS.divider,
              backgroundColor: '#FAFCFF',
              backgroundImage: `radial-gradient(${COLORS.canvasGrid} 1.5px, transparent 1.5px)`,
              backgroundSize: '20px 20px',
            }}
          >
            <svg
              viewBox="0 0 460 220"
              className="w-full h-auto select-none"
              style={{ maxHeight: `${svgMaxH}px` }}
            >
              {(() => {
                const maxDim = 170;
                const cellSize = Math.min(24, Math.floor(maxDim / courtyardSide));
                const totalPx = cellSize * courtyardSide;
                const ox = (460 - totalPx) / 2;
                const oy = (220 - totalPx) / 2 + 6;

                return (
                  <g>
                    {/* Top dimension label */}
                    <line x1={ox} y1={oy - 8} x2={ox + totalPx} y2={oy - 8} stroke="#005583" strokeWidth={1.5} />
                    <text x={ox + totalPx / 2} y={oy - 12} textAnchor="middle" fill="#005583" fontSize={13} fontWeight={800}>
                      Side = {courtyardSide} cm
                    </text>

                    {/* Left dimension label */}
                    <line x1={ox - 8} y1={oy} x2={ox - 8} y2={oy + totalPx} stroke="#005583" strokeWidth={1.5} />
                    <text
                      x={ox - 14}
                      y={oy + totalPx / 2}
                      textAnchor="middle"
                      fill="#005583"
                      fontSize={13}
                      fontWeight={800}
                      transform={`rotate(-90 ${ox - 14} ${oy + totalPx / 2})`}
                    >
                      Side = {courtyardSide} cm
                    </text>

                    {/* Grid of tiles */}
                    {Array.from({ length: courtyardSide }).map((_, r) =>
                      Array.from({ length: courtyardSide }).map((__, c) => (
                        <rect
                          key={`${r}-${c}`}
                          x={ox + c * cellSize}
                          y={oy + r * cellSize}
                          width={cellSize}
                          height={cellSize}
                          fill="#FFF7ED"
                          stroke="#FDBA74"
                          strokeWidth={1}
                        />
                      ))
                    )}

                    {/* Center Area Badge */}
                    <rect
                      x={ox + totalPx / 2 - 62}
                      y={oy + totalPx / 2 - 18}
                      width={124}
                      height={36}
                      rx={10}
                      fill="#FFFFFF"
                      stroke="#F27A00"
                      strokeWidth={2}
                      className="drop-shadow-xs"
                    />
                    <text
                      x={ox + totalPx / 2}
                      y={oy + totalPx / 2 + 5}
                      textAnchor="middle"
                      fill="#C2410C"
                      fontSize={14}
                      fontWeight={900}
                    >
                      Area = {courtyardArea} cm²
                    </text>
                  </g>
                );
              })()}
            </svg>
          </div>

          {/* Definition Footer */}
          <div className="p-2 sm:p-2.5 rounded-2xl bg-slate-50/90 border border-slate-200/60 flex flex-col sm:flex-row items-center justify-between gap-1.5 shrink-0 text-center">
            <div className="text-micro sm:text-small font-bold text-slate-800">
              Since <strong className="text-slate-900">{courtyardSide} × {courtyardSide} = {courtyardArea}</strong>, the side is <strong className="text-[#005583]">{courtyardSide} cm</strong>.
            </div>
            <div className="text-small sm:text-body font-bold text-[#005583]">
              <Katex
                latex={`y = x^2 \\implies x = \\sqrt{y} \\quad (\\sqrt{${courtyardArea}} = ${courtyardSide})`}
                displayMode={false}
              />
            </div>
          </div>
        </div>
      )}

      {/* ================================================================= */}
      {/* TAB 2: +/- INTEGER ROOTS & NCERT CONVENTION */}
      {/* ================================================================= */}
      {activeTab === 'plusminus' && (
        <div className="flex flex-col flex-1 min-h-0 justify-between gap-2 animate-fade-rise overflow-hidden">
          {/* Preset Buttons */}
          <div className="flex items-center justify-between gap-2 shrink-0">
            <span className="text-micro font-bold text-slate-700">Choose Perfect Square:</span>
            <div className="flex items-center gap-1.5">
              {[36, 64, 100, 144].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setPmNumber(num)}
                  className={`min-h-[32px] px-2.5 py-0.5 rounded-lg text-micro font-mono font-bold border transition-all cursor-pointer ${
                    pmNumber === num
                      ? 'bg-[#005583] text-white border-[#003F62] shadow-2xs'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>

          {/* Two Roots Dual Card */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-3 flex-1 min-h-0 items-center">
            {/* Positive Root */}
            <div className="p-3 sm:p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200 flex flex-col items-center justify-center text-center h-full">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800">
                Positive Root (+{pmRoot})
              </span>
              <div className="text-statement sm:text-title font-mono font-black text-emerald-950 my-1 tabular-nums">
                (+{pmRoot}) × (+{pmRoot}) = {pmNumber}
              </div>
              <p className="text-micro sm:text-small text-emerald-900 font-medium">
                Positive times positive gives positive {pmNumber}.
              </p>
            </div>

            {/* Negative Root */}
            <div className="p-3 sm:p-3.5 rounded-2xl bg-indigo-50/70 border border-indigo-200 flex flex-col items-center justify-center text-center h-full">
              <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-800">
                Negative Root (–{pmRoot})
              </span>
              <div className="text-statement sm:text-title font-mono font-black text-indigo-950 my-1 tabular-nums">
                (–{pmRoot}) × (–{pmRoot}) = {pmNumber}
              </div>
              <p className="text-micro sm:text-small text-indigo-900 font-medium">
                Negative times negative also gives positive {pmNumber}!
              </p>
            </div>
          </div>

          {/* Combined Symbolic Formula */}
          <div className="p-2 sm:p-2.5 rounded-2xl bg-slate-50/90 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-1.5 shrink-0 text-center">
            <span className="text-micro sm:text-small font-bold text-slate-700">
              Every perfect square has two integer square roots:
            </span>
            <div className="text-small sm:text-body font-mono font-extrabold text-[#005583]">
              <Katex
                latex={`\\sqrt{${pmNumber}} = \\pm ${pmRoot} \\quad \\text{and in general} \\quad \\sqrt{n^2} = \\pm n`}
                displayMode={false}
              />
            </div>
          </div>

          {/* Official NCERT Convention Notice */}
          <div className="p-2 sm:p-2.5 rounded-2xl bg-amber-50/90 border border-amber-300/80 flex items-center gap-2.5 shrink-0">
            <ShieldAlert className="w-5 h-5 text-amber-700 shrink-0" />
            <div className="text-micro sm:text-small text-amber-950 font-medium leading-tight">
              <strong className="text-amber-900 font-bold">NCERT Class 8 Convention:</strong> In this chapter, we only take the <strong>positive square root</strong> (called the <em>principal square root</em>), because physical side lengths can never be negative!
            </div>
          </div>
        </div>
      )}
    </div>
  );
};