/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  ArrowRight,
  ChevronRight,
  Layers,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import { Katex } from '../Katex';
import { QuickCheckVisualizerStageProps } from './SquaresQuickCheckVisualizers';

// -----------------------------------------------------------------------------
// SCENE 4: L-SHAPED ODD GNOMONS (scene-4-qc-1)
// -----------------------------------------------------------------------------
export const LShapedOddGnomonVisualizer: React.FC<QuickCheckVisualizerStageProps> = ({
  onNext,
  onReset,
  isCorrect,
  isLastQuestion,
}) => {
  const [layersCount, setLayersCount] = useState<number>(8); // default: 8
  const oddNumbers = [1, 3, 5, 7, 9, 11, 13, 15];
  const layerColors = [
    '#0284C7', // 1
    '#0EA5E9', // 3
    '#0D9488', // 5
    '#10B981', // 7
    '#84CC16', // 9
    '#EAB308', // 11
    '#F97316', // 13
    '#EF4444', // 15
  ];

  const totalSum = layersCount * layersCount;

  return (
    <div
      aria-label="L-Shaped Odd Gnomon Visualizer"
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
            {isCorrect ? '✓ Right! Odd Numbers Make Squares' : 'Review — Odd Numbers Sum'}
          </span>
          <span className="px-2 py-0.5 rounded-md bg-white border border-slate-200/80 text-micro font-bold text-[#005583] tabular-nums">
            L-Shaped Gnomons (n = {layersCount})
          </span>
        </div>

        {onReset && (
          <button
            type="button"
            onClick={onReset}
            className="min-h-[34px] px-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-slate-600 text-micro font-bold flex items-center gap-1.5 cursor-pointer transition-colors shrink-0 shadow-2xs"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Re-try</span>
          </button>
        )}
      </div>

      {/* 2. Controls */}
      <div className="flex items-center justify-between gap-2 text-micro shrink-0 flex-wrap">
        <span className="font-bold text-slate-600 flex items-center gap-1">
          <Layers className="w-3.5 h-3.5 text-[#005583]" />
          <span>Add consecutive odd layers:</span>
        </span>
        <div className="flex items-center gap-1 bg-white p-0.5 rounded-xl border border-slate-200/80">
          {[1, 3, 5, 8].map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => setLayersCount(n)}
              className={`px-2.5 py-0.5 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                layersCount === n
                  ? 'bg-[#005583] text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {n} {n === 1 ? 'Odd' : 'Odds'} ({n}²)
            </button>
          ))}
        </div>
      </div>

      {/* 3. L-Shaped SVG Canvas */}
      <div className="w-full flex-1 min-h-[110px] max-h-[175px] bg-white rounded-2xl border border-slate-200/80 p-2 flex items-center justify-center gap-5 shadow-2xs overflow-hidden">
        <svg
          viewBox="0 0 160 160"
          className="h-full aspect-square max-h-[140px] select-none"
        >
          {Array.from({ length: layersCount }).map((_, lIdx) => {
            const size = lIdx + 1;
            const color = layerColors[lIdx % layerColors.length];
            return (
              <g key={lIdx}>
                {/* Horizontal part of L */}
                {Array.from({ length: size }).map((_, col) => (
                  <rect
                    key={`h-${col}`}
                    x={col * 18 + 8}
                    y={lIdx * 18 + 8}
                    width={15}
                    height={15}
                    rx={3}
                    fill={color}
                    opacity={0.9}
                  />
                ))}
                {/* Vertical part of L */}
                {Array.from({ length: lIdx }).map((_, row) => (
                  <rect
                    key={`v-${row}`}
                    x={lIdx * 18 + 8}
                    y={row * 18 + 8}
                    width={15}
                    height={15}
                    rx={3}
                    fill={color}
                    opacity={0.9}
                  />
                ))}
              </g>
            );
          })}
        </svg>

        <div className="text-left flex flex-col gap-1 text-micro font-bold text-slate-700">
          <div className="text-slate-500 font-sans">
            Odds: {oddNumbers.slice(0, layersCount).join(' + ')}
          </div>
          <div className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-900 border border-emerald-200 font-mono text-micro font-black">
            Sum = {layersCount}² = {totalSum}
          </div>
        </div>
      </div>

      {/* 4. Insight */}
      <div className="px-3 py-1 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-950 font-bold text-micro shrink-0 flex items-center gap-2">
        <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
        <span>
          Sum of the first 8 odd numbers is always <strong>8² = 64</strong>!
        </span>
      </div>

      {/* 5. Footer */}
      <div className="pt-1.5 border-t border-slate-200/70 flex items-center justify-between gap-2 shrink-0">
        <span className="text-micro font-bold text-emerald-700">
          ✓ First 8 odd numbers sum to 64!
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

// -----------------------------------------------------------------------------
// SCENE 4: 20TH ODD NUMBER (scene-4-qc-2)
// -----------------------------------------------------------------------------
export const OddSequenceFormulaVisualizer: React.FC<QuickCheckVisualizerStageProps> = ({
  onNext,
  onReset,
  isCorrect,
  isLastQuestion,
}) => {
  const [nVal, setNVal] = useState<number>(20);
  const oddTerm = 2 * nVal - 1;

  return (
    <div
      aria-label="Odd Sequence Formula Visualizer"
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
            {isCorrect ? '✓ Right! Nth Odd Number' : 'Review — Nth Odd Formula'}
          </span>
          <span className="px-2 py-0.5 rounded-md bg-white border border-slate-200/80 text-micro font-bold text-[#005583] tabular-nums">
            Formula: 2n - 1
          </span>
        </div>

        {onReset && (
          <button
            type="button"
            onClick={onReset}
            className="min-h-[34px] px-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-slate-600 text-micro font-bold flex items-center gap-1.5 cursor-pointer transition-colors shrink-0 shadow-2xs"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Re-try</span>
          </button>
        )}
      </div>

      {/* 2. Controls */}
      <div className="flex items-center justify-between gap-2 text-micro shrink-0 flex-wrap">
        <span className="font-bold text-slate-600">Select term position (n):</span>
        <div className="flex items-center gap-1 bg-white p-0.5 rounded-xl border border-slate-200/80">
          {[1, 5, 10, 20].map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => setNVal(n)}
              className={`px-2.5 py-0.5 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                nVal === n
                  ? 'bg-[#005583] text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              n = {n}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Sequence Tape Stage */}
      <div className="w-full flex-1 min-h-[110px] max-h-[175px] bg-white rounded-2xl border border-slate-200/80 p-2 flex flex-col items-center justify-center gap-3 shadow-2xs overflow-hidden">
        <div className="flex items-center justify-center gap-3 font-mono text-small sm:text-statement font-bold">
          <div className="px-3 py-1.5 rounded-xl bg-slate-100 border text-center">
            2(n) = 2({nVal}) = {2 * nVal}
            <span className="text-[10px] text-slate-500 block font-sans font-bold">Even Double</span>
          </div>

          <div className="text-[#005583] font-black text-title">- 1 =</div>

          <div className="px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-950 text-center shadow-xs">
            {oddTerm}
            <span className="text-[10px] text-emerald-700 block font-sans font-bold">
              {nVal}th Odd Number
            </span>
          </div>
        </div>

        <div className="px-3 py-1 rounded-xl bg-sky-50 border border-sky-200 text-micro font-bold text-slate-800">
          <Katex latex={`\\text{Term } n = 2n - 1 \\xrightarrow{n=20} 2(20) - 1 = 40 - 1 = 39`} />
        </div>
      </div>

      {/* 4. Insight */}
      <div className="px-3 py-1 rounded-xl bg-sky-50 border border-sky-200 text-sky-950 font-bold text-micro shrink-0">
        Every odd number is 1 less than its even pair ($2n$). The 20th odd number is <strong>39</strong>!
      </div>

      {/* 5. Footer */}
      <div className="pt-1.5 border-t border-slate-200/70 flex items-center justify-between gap-2 shrink-0">
        <span className="text-micro font-bold text-emerald-700">
          ✓ The 20th odd number is 39!
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

// -----------------------------------------------------------------------------
// SCENE 4: ODD SUBTRACTION ON 50 (scene-4-qc-3)
// -----------------------------------------------------------------------------
export const OddSubtractionLadderVisualizer: React.FC<QuickCheckVisualizerStageProps> = ({
  onNext,
  onReset,
  isCorrect,
  isLastQuestion,
}) => {
  const [testNum, setTestNum] = useState<number>(50); // 49 vs 50
  const isSquareNum = testNum === 49;

  return (
    <div
      aria-label="Odd Subtraction Ladder Visualizer"
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
            {isCorrect ? '✓ Right! Subtraction Test' : 'Review — Subtraction Test'}
          </span>
          <span className="px-2 py-0.5 rounded-md bg-white border border-slate-200/80 text-micro font-bold text-[#005583] tabular-nums">
            Repeated Odd Subtraction
          </span>
        </div>

        {onReset && (
          <button
            type="button"
            onClick={onReset}
            className="min-h-[34px] px-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-slate-600 text-micro font-bold flex items-center gap-1.5 cursor-pointer transition-colors shrink-0 shadow-2xs"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Re-try</span>
          </button>
        )}
      </div>

      {/* 2. Controls */}
      <div className="flex items-center justify-between gap-2 text-micro shrink-0 flex-wrap">
        <span className="font-bold text-slate-600">Compare test:</span>
        <div className="flex items-center gap-1 bg-white p-0.5 rounded-xl border border-slate-200/80">
          {[50, 49].map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => setTestNum(n)}
              className={`px-2.5 py-0.5 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                testNum === n
                  ? n === 49
                    ? 'bg-emerald-600 text-white shadow-2xs'
                    : 'bg-rose-600 text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Test {n} {n === 49 ? '(Square)' : '(Question 50)'}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Subtraction Ladder Stage */}
      <div className="w-full flex-1 min-h-[110px] max-h-[175px] bg-white rounded-2xl border border-slate-200/80 p-2 flex flex-col items-center justify-center gap-2 shadow-2xs overflow-hidden">
        {testNum === 50 ? (
          <div className="flex flex-col items-center gap-1.5">
            <div className="flex flex-wrap items-center justify-center gap-1 text-[11px] font-mono text-slate-800">
              <span>50 - 1 = 49 →</span>
              <span>46 →</span>
              <span>41 →</span>
              <span>34 →</span>
              <span>25 →</span>
              <span>14 →</span>
              <span className="font-extrabold text-amber-700">14 - 13 = 1 →</span>
              <span className="font-black text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded border border-rose-300">
                1 - 15 = -14 (&lt; 0)
              </span>
            </div>
            <span className="px-3 py-1 rounded-xl bg-rose-50 border border-rose-300 text-rose-800 text-micro font-bold">
              Skipped 0 completely and turned negative! 50 is NOT a square.
            </span>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-1.5">
            <div className="flex flex-wrap items-center justify-center gap-1 text-[11px] font-mono text-slate-800">
              <span>49 - 1 = 48 →</span>
              <span>45 →</span>
              <span>40 →</span>
              <span>33 →</span>
              <span>24 →</span>
              <span>13 →</span>
              <span className="font-black text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-300">
                13 - 13 = 0 (Hits 0 at Step 7!)
              </span>
            </div>
            <span className="px-3 py-1 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-micro font-bold">
              Hit exactly 0 at Step 7 $\rightarrow$ √49 = 7!
            </span>
          </div>
        )}
      </div>

      {/* 4. Insight */}
      <div className="px-3 py-1 rounded-xl bg-rose-50 border border-rose-200 text-rose-950 font-bold text-micro shrink-0">
        Because 50 misses 0 and skips directly to negative 14, the subtraction test proves 50 is NOT a square!
      </div>

      {/* 5. Footer */}
      <div className="pt-1.5 border-t border-slate-200/70 flex items-center justify-between gap-2 shrink-0">
        <span className="text-micro font-bold text-emerald-700">
          ✓ Correct! 50 misses 0 and turns negative.
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

// -----------------------------------------------------------------------------
// SCENE 5: NUMBERS BETWEEN 20² AND 21² (scene-5-qc-1)
// -----------------------------------------------------------------------------
export const BetweenSquaresIntervalVisualizer: React.FC<QuickCheckVisualizerStageProps> = ({
  onNext,
  onReset,
  isCorrect,
  isLastQuestion,
}) => {
  const [baseN, setBaseN] = useState<number>(20);
  const sq1 = baseN * baseN;
  const sq2 = (baseN + 1) * (baseN + 1);
  const countBetween = 2 * baseN;

  return (
    <div
      aria-label="Between Squares Interval Visualizer"
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
            {isCorrect ? '✓ Right! Numbers Between Squares' : 'Review — Non-Squares Between'}
          </span>
          <span className="px-2 py-0.5 rounded-md bg-white border border-slate-200/80 text-micro font-bold text-[#005583] tabular-nums">
            Rule: 2n
          </span>
        </div>

        {onReset && (
          <button
            type="button"
            onClick={onReset}
            className="min-h-[34px] px-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-slate-600 text-micro font-bold flex items-center gap-1.5 cursor-pointer transition-colors shrink-0 shadow-2xs"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Re-try</span>
          </button>
        )}
      </div>

      {/* 2. Controls */}
      <div className="flex items-center justify-between gap-2 text-micro shrink-0 flex-wrap">
        <span className="font-bold text-slate-600">Select base n:</span>
        <div className="flex items-center gap-1 bg-white p-0.5 rounded-xl border border-slate-200/80">
          {[3, 10, 20].map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => setBaseN(n)}
              className={`px-2.5 py-0.5 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                baseN === n
                  ? 'bg-[#005583] text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              n = {n} ({n}² to {n + 1}²)
            </button>
          ))}
        </div>
      </div>

      {/* 3. Interval Stage */}
      <div className="w-full flex-1 min-h-[110px] max-h-[175px] bg-white rounded-2xl border border-slate-200/80 p-2 flex flex-col items-center justify-center gap-3 shadow-2xs overflow-hidden">
        <div className="flex items-center justify-center gap-2 font-mono text-small sm:text-statement font-bold w-full max-w-sm">
          <div className="px-2.5 py-1 rounded-xl bg-slate-100 border text-center">
            {baseN}² = {sq1}
          </div>

          <div className="flex-1 flex flex-col items-center">
            <span className="px-3 py-1 rounded-xl bg-emerald-500 text-white font-black text-micro sm:text-small shadow-xs">
              {countBetween} Non-Squares
            </span>
            <span className="text-[10px] text-emerald-800 font-bold mt-0.5">2 × {baseN}</span>
          </div>

          <div className="px-2.5 py-1 rounded-xl bg-slate-100 border text-center">
            {baseN + 1}² = {sq2}
          </div>
        </div>

        <div className="px-3 py-1 rounded-xl bg-sky-50 border border-sky-200 text-micro font-bold text-slate-800">
          <Katex latex={`(n+1)^2 - n^2 - 1 = (2n + 1) - 1 = 2n = 2(20) = 40`} />
        </div>
      </div>

      {/* 4. Insight */}
      <div className="px-3 py-1 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-950 font-bold text-micro shrink-0">
        Between 20² (400) and 21² (441), there are exactly <strong>2 × 20 = 40</strong> non-square numbers!
      </div>

      {/* 5. Footer */}
      <div className="pt-1.5 border-t border-slate-200/70 flex items-center justify-between gap-2 shrink-0">
        <span className="text-micro font-bold text-emerald-700">
          ✓ Exactly 40 non-square numbers!
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

// -----------------------------------------------------------------------------
// SCENE 5: TRIANGULAR ZIPPER (scene-5-qc-2)
// -----------------------------------------------------------------------------
export const TriangularZipperVisualizer: React.FC<QuickCheckVisualizerStageProps> = ({
  onNext,
  onReset,
  isCorrect,
  isLastQuestion,
}) => {
  const [isZipped, setIsZipped] = useState<boolean>(true);

  return (
    <div
      aria-label="Triangular Zipper Visualizer"
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
            {isCorrect ? '✓ Right! Triangular Numbers Sum' : 'Review — Triangular Zipper'}
          </span>
          <span className="px-2 py-0.5 rounded-md bg-white border border-slate-200/80 text-micro font-bold text-[#005583] tabular-nums">
            T₆ + T₇ = 7²
          </span>
        </div>

        {onReset && (
          <button
            type="button"
            onClick={onReset}
            className="min-h-[34px] px-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-slate-600 text-micro font-bold flex items-center gap-1.5 cursor-pointer transition-colors shrink-0 shadow-2xs"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Re-try</span>
          </button>
        )}
      </div>

      {/* 2. Controls */}
      <div className="flex items-center justify-between gap-2 text-micro shrink-0 flex-wrap">
        <span className="font-bold text-slate-600">Animation state:</span>
        <button
          type="button"
          onClick={() => setIsZipped(!isZipped)}
          className={`px-3 py-1 rounded-xl text-[11px] font-bold border transition-all cursor-pointer ${
            isZipped
              ? 'bg-emerald-600 text-white border-emerald-700 shadow-2xs'
              : 'bg-amber-500 text-white border-amber-600 shadow-2xs'
          }`}
        >
          {isZipped ? '✓ Zipped into 7² Square' : 'Split into Two Triangles'}
        </button>
      </div>

      {/* 3. Zipper Canvas Stage */}
      <div className="w-full flex-1 min-h-[110px] max-h-[175px] bg-white rounded-2xl border border-slate-200/80 p-2 flex items-center justify-center gap-4 shadow-2xs overflow-hidden">
        <div className="flex items-center gap-2 font-mono text-small sm:text-statement font-extrabold">
          <div className="px-3 py-1.5 rounded-xl bg-amber-50 text-amber-900 border border-amber-300 text-center">
            T₆ = 21
            <span className="text-[10px] text-amber-700 block font-sans font-bold">6th Triangle</span>
          </div>

          <span className="text-slate-400 font-bold">+</span>

          <div className="px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-900 border border-emerald-300 text-center">
            T₇ = 28
            <span className="text-[10px] text-emerald-700 block font-sans font-bold">7th Triangle</span>
          </div>

          <span className="text-slate-400 font-bold">=</span>

          <div className="px-3 py-1.5 rounded-xl bg-sky-500 text-white text-center shadow-xs">
            49 = 7²
            <span className="text-[10px] text-sky-100 block font-sans font-bold">Square</span>
          </div>
        </div>
      </div>

      {/* 4. Insight */}
      <div className="px-3 py-1 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-950 font-bold text-micro shrink-0">
        Any two consecutive triangular numbers zip together into a perfect square! Here, <strong>21 and 28</strong> sum to 49 (7²).
      </div>

      {/* 5. Footer */}
      <div className="pt-1.5 border-t border-slate-200/70 flex items-center justify-between gap-2 shrink-0">
        <span className="text-micro font-bold text-emerald-700">
          ✓ 21 and 28 add up to 49!
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

// -----------------------------------------------------------------------------
// SCENE 5: HUNDRED BLOCK FINDER (scene-5-qc-3)
// -----------------------------------------------------------------------------
export const HundredBlockFinderVisualizer: React.FC<QuickCheckVisualizerStageProps> = ({
  onNext,
  onReset,
  isCorrect,
  isLastQuestion,
}) => {
  return (
    <div
      aria-label="Hundred Block Finder Visualizer"
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
            {isCorrect ? '✓ Right! Block of 100' : 'Review — Block of 100'}
          </span>
          <span className="px-2 py-0.5 rounded-md bg-white border border-slate-200/80 text-micro font-bold text-[#005583] tabular-nums">
            Locating 729 (27²)
          </span>
        </div>

        {onReset && (
          <button
            type="button"
            onClick={onReset}
            className="min-h-[34px] px-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-slate-600 text-micro font-bold flex items-center gap-1.5 cursor-pointer transition-colors shrink-0 shadow-2xs"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Re-try</span>
          </button>
        )}
      </div>

      {/* 2. 100-Blocks Stage */}
      <div className="w-full flex-1 min-h-[110px] max-h-[175px] bg-white rounded-2xl border border-slate-200/80 p-2 flex flex-col items-center justify-center gap-2 shadow-2xs overflow-hidden">
        <div className="flex items-center gap-1.5 text-micro font-bold flex-wrap justify-center">
          <span className="px-2 py-0.5 rounded bg-slate-100 border text-slate-500">501–600</span>
          <span className="px-2 py-0.5 rounded bg-slate-100 border text-slate-500">601–700</span>
          <span className="px-3 py-1.5 rounded-xl bg-emerald-600 text-white font-extrabold shadow-xs ring-2 ring-emerald-300 text-small">
            701 – 800 (Holds 729 = 27²)
          </span>
          <span className="px-2 py-0.5 rounded bg-slate-100 border text-slate-500">801–900</span>
        </div>

        <div className="px-3 py-1 rounded-xl bg-sky-50 border border-sky-200 text-micro font-bold text-slate-800">
          700 &lt; <strong>729</strong> ≤ 800 $\implies$ Belongs to block 701 to 800
        </div>
      </div>

      {/* 3. Insight */}
      <div className="px-3 py-1 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-950 font-bold text-micro shrink-0">
        27² = 729. Since 729 lies strictly between 700 and 800, it sits squarely in the <strong>701 to 800</strong> block!
      </div>

      {/* 4. Footer */}
      <div className="pt-1.5 border-t border-slate-200/70 flex items-center justify-between gap-2 shrink-0">
        <span className="text-micro font-bold text-emerald-700">
          ✓ 729 is in the 701 to 800 block!
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
