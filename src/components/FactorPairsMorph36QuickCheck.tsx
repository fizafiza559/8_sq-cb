/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  ChevronRight,
  Grid,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import { divisors } from '../math/facts';
import { Katex } from './Katex';
import { useViewportTier } from '../hooks/useViewportTier';

export interface FactorPairsMorph36QuickCheckProps {
  onNext: () => void;
  onReset?: () => void;
  isCorrect: boolean;
  isLastQuestion: boolean;
}

interface FactorPairOption {
  rows: number;
  cols: number;
  label: string;
  isSquarePair?: boolean;
}

const FACTOR_PAIR_OPTIONS_36: FactorPairOption[] = [
  { rows: 1, cols: 36, label: '1 × 36' },
  { rows: 2, cols: 18, label: '2 × 18' },
  { rows: 3, cols: 12, label: '3 × 12' },
  { rows: 4, cols: 9, label: '4 × 9' },
  { rows: 6, cols: 6, label: '6 × 6 (Square!)', isSquarePair: true },
];

export const FactorPairsMorph36QuickCheck: React.FC<FactorPairsMorph36QuickCheckProps> = ({
  onNext,
  onReset,
  isCorrect,
  isLastQuestion,
}) => {
  const { tier, isNarrow } = useViewportTier();
  const isCompact = tier === 'compact';
  const [selectedIdx, setSelectedIdx] = useState<number>(4); // Default to 6x6 square to show the answer!

  const current = FACTOR_PAIR_OPTIONS_36[selectedIdx];

  // SVG Geometry for smooth dot morphing
  const canvasW = 680;
  const canvasH = 220;
  const padX = 24;
  const padY = 20;
  const availW = canvasW - padX * 2;
  const availH = canvasH - padY * 2;

  const stepX = Math.min(42, availW / Math.max(1, current.cols));
  const stepY = Math.min(32, availH / Math.max(1, current.rows));
  const dotRadius =
    current.cols >= 36 ? 6 : current.cols >= 18 ? 9 : current.cols >= 12 ? 11 : 13;

  const gridW = (current.cols - 1) * stepX;
  const gridH = (current.rows - 1) * stepY;
  const originX = (canvasW - gridW) / 2;
  const originY = (canvasH - gridH) / 2;

  const allFactors36 = divisors(36); // [1, 2, 3, 4, 6, 9, 12, 18, 36]

  return (
    <div
      aria-label="36-Dot Morphing Factor Grid"
      className="w-full h-full min-h-0 bg-slate-50/80 border border-slate-200/80 rounded-3xl p-3 sm:p-3.5 flex flex-col justify-between gap-2 overflow-hidden shadow-2xs animate-fade-rise"
    >
      {/* 1. Header Bar */}
      <div className="flex items-center justify-between gap-2 pb-1.5 border-b border-slate-200/70 shrink-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span
            className={`text-micro font-extrabold uppercase tracking-wider ${
              isCorrect ? 'text-emerald-700' : 'text-rose-700'
            }`}
          >
            {isCorrect ? '✓ Right! Factor Pairs of 36' : 'Review — Factor Pairs of 36'}
          </span>
          <span className="px-2 py-0.5 rounded-md bg-white border border-slate-200/80 text-micro font-bold text-[#005583] tabular-nums">
            36 Dots Morphing Grid
          </span>
        </div>

        {onReset && (
          <button
            type="button"
            onClick={onReset}
            aria-label="Re-try question"
            title="Re-try question"
            className="min-h-[34px] px-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-slate-600 text-micro font-bold flex items-center gap-1.5 cursor-pointer transition-colors shrink-0 shadow-2xs"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Re-try</span>
          </button>
        )}
      </div>

      {/* 2. Factor Pair Selector Buttons */}
      <div className="flex flex-col gap-1 shrink-0">
        <div className="flex items-center justify-between text-micro font-bold text-slate-600 px-0.5">
          <span className="flex items-center gap-1">
            <Grid className="w-3.5 h-3.5 text-[#005583]" />
            <span>Tap any rectangle to morph the 36 dots:</span>
          </span>
          <span
            className="font-extrabold tabular-nums"
            style={{ color: current.isSquarePair ? '#C2410C' : '#005583' }}
          >
            {current.rows} × {current.cols} = 36
          </span>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-1.5">
          {FACTOR_PAIR_OPTIONS_36.map((opt, idx) => {
            const isActive = idx === selectedIdx;
            return (
              <button
                key={opt.label}
                type="button"
                onClick={() => setSelectedIdx(idx)}
                className={`min-h-[36px] sm:min-h-[38px] px-2.5 sm:px-3 py-1 rounded-xl text-micro font-bold border transition-all cursor-pointer whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                  isActive
                    ? opt.isSquarePair
                      ? 'bg-[#F27A00] text-white border-[#C2410C] shadow-xs ring-2 ring-orange-300'
                      : 'bg-[#005583] text-white border-[#003F62] shadow-xs'
                    : opt.isSquarePair
                    ? 'bg-orange-50 text-orange-900 border-orange-300 hover:bg-orange-100'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {opt.isSquarePair && <Sparkles className="w-3.5 h-3.5 shrink-0" />}
                <span>{opt.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Morphing Dot Grid Canvas */}
      <div
        className="w-full flex-1 min-h-[120px] max-h-[190px] rounded-2xl p-1.5 flex flex-col items-center justify-center relative overflow-hidden transition-colors duration-300 border border-slate-200/80 shadow-2xs"
        style={{
          backgroundColor: current.isSquarePair ? '#FFFBF5' : '#FFFFFF',
        }}
      >
        <svg
          viewBox={`0 0 ${canvasW} ${canvasH}`}
          className="w-full h-full select-none"
          aria-label={`36 dots arranged as ${current.rows} by ${current.cols}`}
        >
          {/* Subtle bounding box around current rectangle */}
          <rect
            x={originX - dotRadius - 6}
            y={originY - dotRadius - 6}
            width={gridW + (dotRadius + 6) * 2}
            height={gridH + (dotRadius + 6) * 2}
            rx={12}
            fill={current.isSquarePair ? 'rgba(242, 122, 0, 0.08)' : 'rgba(7, 136, 211, 0.05)'}
            stroke={current.isSquarePair ? '#F27A00' : '#93C5FD'}
            strokeWidth={current.isSquarePair ? 2.5 : 1.5}
            strokeDasharray={current.isSquarePair ? 'none' : '5 4'}
            style={{ transition: 'all 450ms cubic-bezier(0.22, 1, 0.36, 1)' }}
          />

          {Array.from({ length: 36 }, (_, idx) => {
            const r = Math.floor(idx / current.cols);
            const c = idx % current.cols;
            const cx = originX + c * stepX;
            const cy = originY + r * stepY;

            return (
              <g
                key={idx}
                style={{
                  transform: `translate(${cx}px, ${cy}px)`,
                  transition: `transform 480ms cubic-bezier(0.22, 1, 0.36, 1) ${(idx % 12) * 8}ms`,
                }}
              >
                <circle
                  cx={0}
                  cy={0}
                  r={dotRadius}
                  fill={current.isSquarePair ? '#F27A00' : '#0788D3'}
                  stroke={current.isSquarePair ? '#9A3412' : '#0369A1'}
                  strokeWidth={1.5}
                />
                {dotRadius >= 10 && (
                  <text
                    x={0}
                    y={3.5}
                    textAnchor="middle"
                    fill="#FFFFFF"
                    fontSize={11}
                    fontWeight={700}
                  >
                    {idx + 1}
                  </text>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      {/* 4. Factors Strip & Explanation Badge */}
      <div className="flex flex-col gap-1.5 shrink-0">
        {/* All 9 Factors of 36 Strip */}
        <div className="px-2.5 py-1 rounded-xl bg-white border border-slate-200/80 flex items-center justify-between gap-1.5 flex-wrap">
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500">
            Factors ({allFactors36.length} total — Odd Count):
          </span>
          <div className="flex flex-wrap items-center gap-1">
            {allFactors36.map((f) => {
              const isSelectedFactor = f === current.rows || f === current.cols;
              const isLoneSix = f === 6;
              return (
                <span
                  key={f}
                  className={`px-1.5 py-0.5 rounded-md font-mono text-[11px] font-extrabold border transition-all tabular-nums ${
                    isLoneSix && current.isSquarePair
                      ? 'bg-[#F27A00] text-white border-[#C2410C] ring-1 ring-orange-400'
                      : isSelectedFactor
                      ? 'bg-[#005583] text-white border-[#003F62]'
                      : isLoneSix
                      ? 'bg-orange-100 text-orange-900 border-orange-300'
                      : 'bg-slate-50 text-slate-700 border-slate-200'
                  }`}
                >
                  {f}
                </span>
              );
            })}
          </div>
        </div>

        {/* Dynamic Insight Box */}
        <div
          className={`p-2 rounded-xl border flex flex-col justify-center gap-0.5 transition-all text-micro leading-snug ${
            current.isSquarePair
              ? 'bg-orange-50 border-orange-300 text-orange-950 font-bold'
              : 'bg-sky-50 border-sky-200 text-sky-950'
          }`}
        >
          {current.isSquarePair ? (
            <div className="flex items-start gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#F27A00] shrink-0 mt-0.5" />
              <div>
                <strong>The Lone Square Partner (6 × 6 = 36):</strong> 6 pairs with itself! It adds only <strong>1 factor</strong> instead of 2.
                <span className="block text-orange-900 font-semibold mt-0.5">
                  4 rectangular pairs (8 factors) + 1 square partner (6) = <strong>9 total factors (Odd count)</strong>.
                </span>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <span className="font-mono font-bold text-[#005583]">
                {current.rows} × {current.cols} = 36
              </span>
              <span className="text-slate-700">
                → Gives <strong>2 distinct factors</strong> ({current.rows} and {current.cols}). Tap <strong>6 × 6</strong> to see the square!
              </span>
            </div>
          )}
        </div>
      </div>

      {/* 5. Footer Bar with Navigation */}
      <div className="pt-1.5 border-t border-slate-200/70 flex items-center justify-between gap-2 shrink-0">
        <span className="text-micro font-bold text-emerald-700">
          ✓ Explored all factor rectangles of 36!
        </span>

        <button
          type="button"
          onClick={onNext}
          className="min-h-[36px] px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-micro font-bold inline-flex items-center gap-1 cursor-pointer transition-colors shrink-0 shadow-2xs"
        >
          <span>{!isLastQuestion ? 'Next Question' : 'See Results'}</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
