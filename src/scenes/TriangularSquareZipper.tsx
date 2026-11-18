/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { COLORS } from '../design/tokens';
import { Katex } from '../components/Katex';
import { Sparkles, Play, RotateCcw, ArrowRight, Table, Layers } from 'lucide-react';
import { useViewportTier } from '../hooks/useViewportTier';

export interface TriangularSquareZipperProps {
  initialN?: 2 | 3 | 4 | 5 | 6;
  beatIndex?: number;
  className?: string;
}

type TabType = 'zipper' | 'blocks100';

interface BlockData {
  label: string;
  start: number;
  end: number;
  count: number;
  squares: { n: number; sq: number }[];
}

export const TriangularSquareZipper: React.FC<TriangularSquareZipperProps> = ({
  initialN = 4,
  beatIndex,
  className = '',
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('zipper');
  const [n, setN] = useState<2 | 3 | 4 | 5 | 6>(initialN);
  const [zipPercent, setZipPercent] = useState<number>(0);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [selectedBlockIdx, setSelectedBlockIdx] = useState<number>(0);

  const { tier, isNarrow } = useViewportTier();
  const isCompact = tier === 'compact';
  const svgMaxH = isCompact ? 115 : isNarrow ? 150 : tier === 'standard' ? 185 : 235;

  useEffect(() => {
    if (beatIndex === undefined) return;
    setIsAnimating(false);
    if (beatIndex <= 1) {
      setActiveTab('zipper');
      setN(3);
      setZipPercent(beatIndex === 0 ? 0 : 100);
    } else if (beatIndex === 2) {
      setActiveTab('zipper');
      setN(4);
      setZipPercent(0);
    } else if (beatIndex === 3) {
      setActiveTab('zipper');
      setN(4);
      setZipPercent(100);
    } else if (beatIndex >= 4) {
      setActiveTab('blocks100');
    }
  }, [beatIndex]);

  useEffect(() => {
    if (!isAnimating) return;
    let rafId = 0;
    const startVal = zipPercent >= 98 ? 0 : zipPercent;
    const startTime = performance.now();
    const duration = 900;

    const tick = (now: number) => {
      const elapsed = Math.min(1, (now - startTime) / duration);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - elapsed, 3);
      setZipPercent(Math.round(startVal + (100 - startVal) * eased));
      if (elapsed < 1) {
        rafId = requestAnimationFrame(tick);
      } else {
        setIsAnimating(false);
      }
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [isAnimating]);

  // Compute 100-blocks (1-100 through 901-1000)
  const blocks: BlockData[] = useMemo(() => {
    return Array.from({ length: 10 }, (_, b) => {
      const start = b * 100 + 1;
      const end = (b + 1) * 100;
      const squares: { n: number; sq: number }[] = [];
      for (let i = 1; i * i <= 1000; i++) {
        const sq = i * i;
        if (sq >= start && sq <= end) {
          squares.push({ n: i, sq });
        }
      }
      return {
        label: `${start}–${end}`,
        start,
        end,
        count: squares.length,
        squares,
      };
    });
  }, []);

  const tPrev = (n * (n - 1)) / 2;
  const tCurr = (n * (n + 1)) / 2;
  const totalSquare = n * n;

  const progress = zipPercent / 100;
  const isLocked = zipPercent >= 98;

  // Adaptive SVG geometry based on n
  const svgW = 540;
  const svgH = 260;
  const spacingMap = { 2: 54, 3: 44, 4: 36, 5: 29, 6: 24 };
  const dotRMap = { 2: 18, 3: 15, 4: 12.5, 5: 10, 6: 8.5 };
  const spacing = spacingMap[n];
  const dotR = dotRMap[n];

  const squareW = (n - 1) * spacing;
  const baseLeftX = zipPercent > 0 ? 110 + (170 - 110) * progress : 110;
  const baseTopY = (svgH - squareW) / 2;

  // Orange Staircase T_n
  const orangeDots: { x: number; y: number; key: string; num: number }[] = [];
  let oCount = 0;
  for (let r = 0; r < n; r++) {
    for (let c = 0; c <= r; c++) {
      oCount++;
      orangeDots.push({
        key: `o-${r}-${c}`,
        num: oCount,
        x: baseLeftX + c * spacing,
        y: baseTopY + r * spacing,
      });
    }
  }

  // Blue Staircase T_{n-1}
  const blueStartBaseX = 350;
  const blueStartCenterY = svgH / 2;
  const prevRows = n - 1;
  const blueGridH = (prevRows - 1) * spacing;
  const blueStartTopY = blueStartCenterY - blueGridH / 2;

  const blueDots: { x: number; y: number; key: string; num: number }[] = [];
  let bCount = 0;
  for (let r = 0; r < prevRows; r++) {
    for (let c = 0; c <= r; c++) {
      bCount++;
      const sx = blueStartBaseX + c * spacing;
      const sy = blueStartTopY + r * spacing;

      const targetRow = prevRows - 1 - r;
      const targetCol = n - 1 - c;
      const tx = baseLeftX + targetCol * spacing;
      const ty = baseTopY + targetRow * spacing;

      const arcLift = Math.sin(progress * Math.PI) * -28;
      blueDots.push({
        key: `b-${r}-${c}`,
        num: bCount,
        x: sx + (tx - sx) * progress,
        y: sy + (ty - sy) * progress + arcLift,
      });
    }
  }

  return (
    <div
      data-no-nav="true"
      className={`w-full max-w-5xl h-full max-h-full min-h-0 overflow-hidden mx-auto rounded-3xl border border-slate-200/80 bg-white ${
        isCompact ? 'p-2 gap-1.5' : 'p-3 sm:p-4 gap-2 sm:gap-2.5'
      } shadow-xs flex flex-col justify-between ${className}`}
    >
      {/* Top Header & Tab Toggle */}
      <div className="flex flex-wrap items-center justify-between gap-1.5 border-b border-slate-100 pb-2 shrink-0">
        <div className="min-w-0">
          {!isCompact && (
            <span className="text-micro font-bold uppercase tracking-wider text-slate-500 hidden sm:flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#F27A00] shrink-0" />
              <span>NCERT Class 8 · Ganita Prakash Page 7</span>
            </span>
          )}
          <h3 className="text-small sm:text-statement font-extrabold text-slate-900 mt-0.5">
            {activeTab === 'zipper'
              ? 'Triangular Numbers Zip Into Squares!'
              : 'Count Squares in Each Block of 100 (1 to 1000)'}
          </h3>
        </div>

        {/* Tab switchers */}
        <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-100/90 shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab('zipper')}
            className={`min-h-[32px] px-2.5 py-1 rounded-lg text-micro font-bold flex items-center gap-1 cursor-pointer transition-all ${
              activeTab === 'zipper'
                ? 'bg-white text-[#005583] shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Triangular Zipper</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('blocks100')}
            className={`min-h-[32px] px-2.5 py-1 rounded-lg text-micro font-bold flex items-center gap-1 cursor-pointer transition-all ${
              activeTab === 'blocks100'
                ? 'bg-white text-[#005583] shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Table className="w-3.5 h-3.5" />
            <span>100-Block Explorer</span>
          </button>
        </div>
      </div>

      {/* TAB 1: TRIANGULAR ZIPPER */}
      {activeTab === 'zipper' && (
        <div className="flex flex-col flex-1 min-h-0 justify-between gap-1.5 sm:gap-2 animate-fade-rise overflow-hidden">
          {/* Controls: n presets + zipper slider */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-1.5 shrink-0">
            {/* n Presets */}
            <div className="flex flex-wrap items-center gap-1">
              <span className="text-micro font-bold text-slate-600 mr-1 hidden sm:inline">Term:</span>
              {([2, 3, 4, 5, 6] as const).map((val) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => {
                    setIsAnimating(false);
                    setN(val);
                  }}
                  className={`min-h-[32px] px-2 py-0.5 rounded-lg text-micro font-bold border transition-all cursor-pointer tabular-nums ${
                    n === val
                      ? 'bg-[#005583] text-white border-[#003F62] shadow-2xs'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  n = {val} ({val * val})
                </button>
              ))}
            </div>

            {/* Zipper Actions */}
            <div className="flex items-center gap-1.5 w-full sm:w-auto justify-end">
              <input
                type="range"
                min={0}
                max={100}
                step={1}
                value={zipPercent}
                onChange={(e) => {
                  setIsAnimating(false);
                  setZipPercent(parseInt(e.target.value, 10));
                }}
                aria-label="Zip triangular staircases together"
                className="w-24 sm:w-32 accent-[#F27A00] cursor-pointer h-2 bg-slate-200 rounded-lg"
              />
              <button
                type="button"
                onClick={() => {
                  if (zipPercent >= 98) setZipPercent(0);
                  setIsAnimating(true);
                }}
                className="min-h-[32px] px-3 py-1 rounded-xl bg-[#F27A00] hover:bg-[#D96B00] text-white text-micro font-bold flex items-center gap-1 shadow-2xs cursor-pointer shrink-0"
              >
                <Play className="w-3.5 h-3.5" />
                <span>{zipPercent >= 98 ? 'Replay' : 'Zip'}</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsAnimating(false);
                  setZipPercent(0);
                }}
                className="min-h-[32px] w-8 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-slate-600 flex items-center justify-center cursor-pointer shrink-0"
                title="Separate Triangles"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* SVG Zipper Canvas */}
          <div
            className="w-full flex-1 min-h-0 rounded-2xl border p-1 flex flex-col items-center justify-center overflow-hidden transition-colors duration-300"
            style={{
              borderColor: isLocked ? '#F27A00' : COLORS.divider,
              backgroundColor: isLocked ? '#FFFBF5' : '#FFFFFF',
              backgroundImage: `radial-gradient(${COLORS.canvasGrid} 1.5px, transparent 1.5px)`,
              backgroundSize: '20px 20px',
            }}
          >
            <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-full h-auto select-none" style={{ maxHeight: `${svgMaxH}px` }}>
              {/* Square Target Frame */}
              <rect
                x={baseLeftX - dotR - 8}
                y={baseTopY - dotR - 8}
                width={squareW + (dotR + 8) * 2}
                height={squareW + (dotR + 8) * 2}
                rx={14}
                fill={isLocked ? 'rgba(242, 122, 0, 0.08)' : 'rgba(148, 163, 184, 0.05)'}
                stroke={isLocked ? '#F27A00' : '#CBD5E1'}
                strokeWidth={isLocked ? 3 : 1.5}
                strokeDasharray={isLocked ? 'none' : '5 4'}
              />

              {/* Labels when apart */}
              {zipPercent < 40 && (
                <g opacity={1 - zipPercent / 40}>
                  <text
                    x={baseLeftX + squareW / 2}
                    y={Math.max(16, baseTopY - dotR - 12)}
                    textAnchor="middle"
                    fill="#C2410C"
                    fontSize={13}
                    fontWeight={800}
                  >
                    T{n} = {tCurr} dots
                  </text>
                  <text
                    x={blueStartBaseX + ((prevRows - 1) * spacing) / 2}
                    y={Math.max(16, blueStartTopY - dotR - 12)}
                    textAnchor="middle"
                    fill="#0369A1"
                    fontSize={13}
                    fontWeight={800}
                  >
                    T{n - 1} = {tPrev} dots
                  </text>
                </g>
              )}

              {/* Locked Square Label */}
              {isLocked && (
                <text
                  x={baseLeftX + squareW / 2}
                  y={Math.max(16, baseTopY - dotR - 14)}
                  textAnchor="middle"
                  fill="#9A3412"
                  fontSize={14}
                  fontWeight={900}
                >
                  Perfect {n} × {n} Square = {totalSquare} dots!
                </text>
              )}

              {/* Orange Dots */}
              {orangeDots.map((d) => (
                <g key={d.key}>
                  <circle cx={d.x} cy={d.y} r={dotR} fill="#F27A00" stroke="#9A3412" strokeWidth={1.5} />
                  {n <= 4 && (
                    <text x={d.x} y={d.y + (dotR > 12 ? 4 : 3)} textAnchor="middle" fill="#FFFFFF" fontSize={dotR > 12 ? 12 : 10} fontWeight={800}>
                      {d.num}
                    </text>
                  )}
                </g>
              ))}

              {/* Blue Dots */}
              {blueDots.map((d) => (
                <g key={d.key}>
                  <circle cx={d.x} cy={d.y} r={dotR} fill="#0788D3" stroke="#075985" strokeWidth={1.5} />
                  {n <= 4 && (
                    <text x={d.x} y={d.y + (dotR > 12 ? 4 : 3)} textAnchor="middle" fill="#FFFFFF" fontSize={dotR > 12 ? 12 : 10} fontWeight={800}>
                      {d.num}
                    </text>
                  )}
                </g>
              ))}
            </svg>
          </div>

          {/* Equation Footer */}
          <div className="p-2 sm:p-2.5 rounded-2xl bg-slate-50/90 border border-slate-200/60 flex flex-col sm:flex-row items-center justify-between gap-1.5 shrink-0 text-center">
            <div className="flex flex-wrap items-center justify-center gap-1.5 text-micro sm:text-small font-bold text-slate-800">
              <span className="inline-flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-[#0788D3]" />
                <span>T{n - 1} ({tPrev} dots)</span>
              </span>
              <span>+</span>
              <span className="inline-flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-[#F27A00]" />
                <span>T{n} ({tCurr} dots)</span>
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
              <span className="font-extrabold text-slate-900">
                {n}² = {totalSquare}
              </span>
            </div>

            <div className="text-small sm:text-body font-bold text-[#005583]">
              <Katex
                latex={`T_{${n - 1}} + T_{${n}} = ${tPrev} + ${tCurr} = ${totalSquare} = ${n}^2`}
                displayMode={false}
              />
            </div>
          </div>

          {/* 8th Grade Friendly Tip */}
          <div className="px-2.5 py-1.5 rounded-xl bg-orange-50/80 border border-orange-200/70 text-micro text-orange-950 flex items-center justify-between gap-2 shrink-0">
            <span>
              💡 <strong>Kid's Rule:</strong> Triangular numbers stack like bowling pins (1, 3, 6, 10, 15). Flip the smaller triangle upside-down, and they fit together like puzzle pieces into a perfect square!
            </span>
          </div>
        </div>
      )}

      {/* TAB 2: 100-BLOCK EXPLORER (1 TO 1000) */}
      {activeTab === 'blocks100' && (
        <div className="flex flex-col flex-1 min-h-0 justify-between gap-2 animate-fade-rise overflow-hidden">
          {/* Question Banner */}
          <div className="p-2 sm:p-2.5 rounded-2xl bg-sky-50/70 border border-sky-200/60 flex flex-col sm:flex-row items-center justify-between gap-2 shrink-0">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#005583]">NCERT Question</span>
              <p className="text-micro sm:text-small font-extrabold text-slate-900 mt-0.5">
                How many squares are in each 100-block? What is the largest square less than 1000?
              </p>
            </div>
            <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border border-sky-300 shadow-2xs shrink-0">
              <span className="text-micro text-slate-600 font-medium">Largest &lt; 1000:</span>
              <span className="font-mono text-small sm:text-statement font-black text-[#F27A00]">
                31² = 961
              </span>
              <span className="text-[11px] text-slate-500 font-bold">(32² = 1024)</span>
            </div>
          </div>

          {/* 10 Blocks Horizontal Grid */}
          <div className="grid grid-cols-5 sm:grid-cols-10 gap-1.5 flex-1 min-h-0 content-center">
            {blocks.map((b, idx) => {
              const isSelected = selectedBlockIdx === idx;
              return (
                <button
                  key={b.label}
                  type="button"
                  onClick={() => setSelectedBlockIdx(idx)}
                  className={`p-2 rounded-2xl border text-center transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-orange-50 border-[#F27A00] ring-2 ring-orange-200 shadow-sm'
                      : 'bg-slate-50 hover:bg-slate-100 border-slate-200'
                  }`}
                >
                  <span className="text-[10px] sm:text-[11px] font-bold text-slate-500 block truncate">{b.label}</span>
                  <div className="my-1">
                    <span className="font-mono text-title sm:text-headline font-black text-slate-900 tabular-nums">
                      {b.count}
                    </span>
                    <span className="text-[10px] text-slate-500 block">square{b.count > 1 ? 's' : ''}</span>
                  </div>
                  <div
                    className={`h-1.5 w-full rounded-full ${
                      b.count >= 10 ? 'bg-emerald-500' : b.count >= 4 ? 'bg-sky-500' : b.count >= 2 ? 'bg-amber-500' : 'bg-rose-500'
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Selected Block Details & Key Insight */}
          <div className="p-2 sm:p-2.5 rounded-2xl bg-slate-50/90 border border-slate-200/70 flex flex-col sm:flex-row items-center justify-between gap-2 shrink-0">
            <div className="flex flex-wrap items-center gap-1.5 text-micro sm:text-small">
              <span className="font-bold text-slate-700">
                Block [{blocks[selectedBlockIdx].label}]:
              </span>
              <span className="font-mono font-bold text-[#005583]">
                {blocks[selectedBlockIdx].squares.map((s) => `${s.n}²=${s.sq}`).join(', ')}
              </span>
            </div>

            <div className="text-micro sm:text-small font-bold text-slate-600 text-center sm:text-right">
              Total squares below 1000 = <strong className="text-slate-900">31</strong> (gaps widen by 2n+1, so squares become rarer!)
            </div>
          </div>
        </div>
      )}
    </div>
  );
};