/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Grid,
  Layers,
  Lock,
  RotateCcw,
  Sparkles,
  Unlock,
  XCircle,
} from 'lucide-react';
import { Katex } from '../Katex';
import { useViewportTier } from '../../hooks/useViewportTier';

export interface QuickCheckVisualizerStageProps {
  onNext: () => void;
  onReset?: () => void;
  isCorrect: boolean;
  isLastQuestion: boolean;
}

// -----------------------------------------------------------------------------
// SCENE 0: THE LOCKER PUZZLE (scene-0-qc-1)
// -----------------------------------------------------------------------------
export const LockerGridSolutionVisualizer: React.FC<QuickCheckVisualizerStageProps> = ({
  onNext,
  onReset,
  isCorrect,
  isLastQuestion,
}) => {
  const lockers = Array.from({ length: 16 }, (_, i) => i + 1);
  const squares = [1, 4, 9, 16];
  const [selectedLocker, setSelectedLocker] = useState<number>(16);
  const [filterMode, setFilterMode] = useState<'all' | 'squares' | 'non-squares'>('all');

  const getFactors = (n: number) => {
    const res: number[] = [];
    for (let i = 1; i <= n; i++) {
      if (n % i === 0) res.push(i);
    }
    return res;
  };

  const activeFactors = getFactors(selectedLocker);
  const isSquareLocker = squares.includes(selectedLocker);

  return (
    <div
      aria-label="Locker Puzzle Interactive Grid"
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
            {isCorrect ? '✓ Right! Lockers Solution' : 'Review — The Locker Solution'}
          </span>
          <span className="px-2 py-0.5 rounded-md bg-white border border-slate-200/80 text-micro font-bold text-[#005583] tabular-nums">
            Lockers 1 to 16 Test
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

      {/* 2. Filter Controls */}
      <div className="flex items-center justify-between gap-2 text-micro shrink-0 flex-wrap">
        <span className="font-bold text-slate-600 flex items-center gap-1">
          <Layers className="w-3.5 h-3.5 text-[#005583]" />
          <span>Tap any locker to inspect its flips:</span>
        </span>
        <div className="flex items-center gap-1 bg-white p-0.5 rounded-xl border border-slate-200/80">
          {(['all', 'squares', 'non-squares'] as const).map((mode) => (
            <button
              key={mode}
              type="button"
              onClick={() => setFilterMode(mode)}
              className={`px-2 py-0.5 rounded-lg text-[11px] font-bold transition-all cursor-pointer capitalize ${
                filterMode === mode
                  ? 'bg-[#005583] text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {mode === 'all' ? 'All (16)' : mode === 'squares' ? 'Squares (Open)' : 'Non-Squares (Shut)'}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Lockers Grid */}
      <div className="w-full flex-1 min-h-[110px] max-h-[175px] bg-white rounded-2xl border border-slate-200/80 p-2 flex items-center justify-center shadow-2xs overflow-hidden">
        <div className="grid grid-cols-8 gap-1.5 w-full max-w-md mx-auto">
          {lockers.map((num) => {
            const isSq = squares.includes(num);
            const isSelected = selectedLocker === num;
            const isDimmed =
              (filterMode === 'squares' && !isSq) || (filterMode === 'non-squares' && isSq);

            return (
              <button
                key={num}
                type="button"
                onClick={() => setSelectedLocker(num)}
                className={`flex flex-col items-center justify-center py-1 rounded-xl border text-[11px] font-extrabold cursor-pointer transition-all duration-200 ${
                  isSq
                    ? 'bg-emerald-500 text-white border-emerald-600 shadow-xs ring-1 ring-emerald-300'
                    : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'
                } ${isSelected ? 'scale-110 ring-2 ring-sky-500 z-10' : ''} ${
                  isDimmed ? 'opacity-25 grayscale' : 'opacity-100'
                }`}
              >
                <div className="flex items-center gap-0.5">
                  {isSq ? <Unlock className="w-2.5 h-2.5" /> : <Lock className="w-2.5 h-2.5" />}
                  <span>{num}</span>
                </div>
                <span className="text-[8px] uppercase tracking-tighter">
                  {isSq ? 'Open' : 'Shut'}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Dynamic Factor Inspector Box */}
      <div className="px-3 py-1.5 rounded-xl bg-sky-50 border border-sky-200 text-micro flex items-center justify-between gap-2 text-slate-800 shrink-0">
        <div className="text-left">
          <strong className="text-[#005583]">Locker #{selectedLocker}:</strong> Factors are [
          {activeFactors.join(', ')}] ({activeFactors.length}{' '}
          {activeFactors.length === 1 ? 'factor' : 'factors'} →{' '}
          <strong className={isSquareLocker ? 'text-emerald-700' : 'text-slate-600'}>
            {isSquareLocker ? 'Odd Count' : 'Even Count'}
          </strong>
          )
        </div>
        <span
          className={`px-2 py-0.5 rounded-lg text-[10px] font-black uppercase shrink-0 ${
            isSquareLocker
              ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
              : 'bg-slate-200 text-slate-700'
          }`}
        >
          {isSquareLocker ? 'Stays Open!' : 'Stays Closed'}
        </span>
      </div>

      {/* 5. Dynamic Takeaway & Footer */}
      <div className="pt-1.5 border-t border-slate-200/70 flex items-center justify-between gap-2 shrink-0">
        <span className="text-micro font-bold text-emerald-700">
          ✓ Factor pairs flip and cancel out — only squares have an unpaired factor!
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
// SCENE 2: SQUARES AS AREAS (scene-2-qc-1)
// -----------------------------------------------------------------------------
export const SquareAreaGridVisualizer: React.FC<QuickCheckVisualizerStageProps> = ({
  onNext,
  onReset,
  isCorrect,
  isLastQuestion,
}) => {
  const [side, setSide] = useState<number>(8);
  const area = side * side;

  return (
    <div
      aria-label="Square Area Interactive Grid"
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
            {isCorrect ? '✓ Right! Geometric Area Solution' : 'Review — Squares as Area'}
          </span>
          <span className="px-2 py-0.5 rounded-md bg-white border border-slate-200/80 text-micro font-bold text-[#005583] tabular-nums">
            Side × Side = Area
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

      {/* 2. Side Length Selector */}
      <div className="flex items-center justify-between gap-2 text-micro shrink-0 flex-wrap">
        <span className="font-bold text-slate-600 flex items-center gap-1">
          <Grid className="w-3.5 h-3.5 text-[#005583]" />
          <span>Adjust square side length:</span>
        </span>
        <div className="flex items-center gap-1 bg-white p-0.5 rounded-xl border border-slate-200/80">
          {[4, 6, 8, 10].map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setSide(s)}
              className={`px-2.5 py-0.5 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                side === s
                  ? 'bg-emerald-600 text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Side = {s}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Geometric Area Visual Grid */}
      <div className="w-full flex-1 min-h-[110px] max-h-[175px] bg-white rounded-2xl border border-slate-200/80 p-2 flex items-center justify-center gap-4 shadow-2xs overflow-hidden">
        <div
          className="relative aspect-square h-full max-h-[140px] bg-emerald-50 border-2 border-emerald-600 rounded-xl flex items-center justify-center shadow-xs overflow-hidden transition-all duration-300"
          style={{ width: `${Math.min(140, side * 14)}px` }}
        >
          <div
            className="absolute inset-0 grid divide-x divide-y divide-emerald-200/90"
            style={{
              gridTemplateColumns: `repeat(${side}, minmax(0, 1fr))`,
              gridTemplateRows: `repeat(${side}, minmax(0, 1fr))`,
            }}
          >
            {Array.from({ length: area }).map((_, i) => (
              <div key={i} className="hover:bg-emerald-300/60 transition-colors" />
            ))}
          </div>

          <div className="relative z-10 px-2 py-0.5 rounded-lg bg-white/95 border border-emerald-500 text-emerald-950 font-black text-micro sm:text-small shadow-xs">
            Area = {area}
          </div>
        </div>

        <div className="text-left flex flex-col gap-1 text-micro font-bold text-slate-700">
          <div className="text-[#005583]">Width = {side} units</div>
          <div className="text-[#005583]">Height = {side} units</div>
          <div className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-900 border border-emerald-200 font-mono text-micro font-black">
            {side} × {side} = {side}² = {area} sq units
          </div>
        </div>
      </div>

      {/* 4. Dynamic Insight Box */}
      <div className="px-3 py-1 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-950 font-bold text-micro shrink-0 flex items-center gap-2">
        <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
        <span>
          For side 8: <strong>8 rows × 8 columns = 64 unit squares</strong>. Squaring a number geometrically calculates the area!
        </span>
      </div>

      {/* 5. Footer */}
      <div className="pt-1.5 border-t border-slate-200/70 flex items-center justify-between gap-2 shrink-0">
        <span className="text-micro font-bold text-emerald-700">
          ✓ Side 8 produces exactly 64 square units!
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
// SCENE 3: LAST DIGITS SCANNER (scene-3-qc-1)
// -----------------------------------------------------------------------------
export const LastDigitScannerVisualizer: React.FC<QuickCheckVisualizerStageProps> = ({
  onNext,
  onReset,
  isCorrect,
  isLastQuestion,
}) => {
  const [testNumber, setTestNumber] = useState<number>(3287);

  const getEndingDigit = (n: number) => n % 10;
  const ending = getEndingDigit(testNumber);
  const allowed = [0, 1, 4, 5, 6, 9];
  const forbidden = [2, 3, 7, 8];
  const isAllowed = allowed.includes(ending);

  return (
    <div
      aria-label="Last Digits Scanner"
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
            {isCorrect ? '✓ Right! Last Digits Rule' : 'Review — Last Digits Pattern'}
          </span>
          <span className="px-2 py-0.5 rounded-md bg-white border border-slate-200/80 text-micro font-bold text-[#005583] tabular-nums">
            Units Digit Inspection
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

      {/* 2. Candidate Selector */}
      <div className="flex items-center justify-between gap-2 text-micro shrink-0 flex-wrap">
        <span className="font-bold text-slate-600">Select test candidate:</span>
        <div className="flex items-center gap-1 bg-white p-0.5 rounded-xl border border-slate-200/80">
          {[3287, 576, 1089, 2032].map((num) => (
            <button
              key={num}
              type="button"
              onClick={() => setTestNumber(num)}
              className={`px-2.5 py-0.5 rounded-lg text-[11px] font-mono font-bold transition-all cursor-pointer ${
                testNumber === num
                  ? 'bg-[#005583] text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {num}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Scanner Stage */}
      <div className="w-full flex-1 min-h-[110px] max-h-[175px] bg-white rounded-2xl border border-slate-200/80 p-2 flex flex-col items-center justify-center gap-2 shadow-2xs overflow-hidden">
        {/* Big Digit Spotlight */}
        <div className="flex items-center gap-2">
          <span className="text-title font-mono font-black text-slate-800">
            {Math.floor(testNumber / 10)}
            <span
              className={`px-1 rounded-lg border-2 ${
                isAllowed
                  ? 'text-emerald-700 bg-emerald-50 border-emerald-500'
                  : 'text-rose-600 bg-rose-50 border-rose-500 underline decoration-wavy'
              }`}
            >
              {ending}
            </span>
          </span>
          <span
            className={`px-2.5 py-0.5 rounded-full text-micro font-extrabold border ${
              isAllowed
                ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                : 'bg-rose-100 text-rose-800 border-rose-300'
            }`}
          >
            {isAllowed ? `Ends in ${ending} (Possible Square)` : `Ends in ${ending} (Impossible!)`}
          </span>
        </div>

        {/* Allowed vs Forbidden Shelves */}
        <div className="grid grid-cols-2 gap-2 w-full max-w-sm text-micro text-left">
          <div className="p-1.5 rounded-xl bg-emerald-50 border border-emerald-200">
            <span className="font-extrabold text-emerald-800 flex items-center gap-1 text-[11px]">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> Allowed Ends:
            </span>
            <div className="font-mono font-bold text-emerald-950 mt-0.5">0, 1, 4, 5, 6, 9</div>
          </div>

          <div className="p-1.5 rounded-xl bg-rose-50 border border-rose-200">
            <span className="font-extrabold text-rose-800 flex items-center gap-1 text-[11px]">
              <XCircle className="w-3.5 h-3.5 text-rose-600 shrink-0" /> NEVER Ends In:
            </span>
            <div className="font-mono font-bold text-rose-950 mt-0.5">2, 3, 7, 8</div>
          </div>
        </div>
      </div>

      {/* 4. Dynamic Insight */}
      <div className="px-3 py-1 rounded-xl bg-rose-50 border border-rose-200 text-rose-950 font-bold text-micro shrink-0">
        3287 ends in <strong>7</strong>. Since no integer squared ends in 2, 3, 7, or 8, 3287 can NEVER be a square!
      </div>

      {/* 5. Footer */}
      <div className="pt-1.5 border-t border-slate-200/70 flex items-center justify-between gap-2 shrink-0">
        <span className="text-micro font-bold text-emerald-700">
          ✓ Correct! 3287 fails the last-digit test immediately.
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
// SCENE 3: ZERO DOUBLING RULE (scene-3-qc-2)
// -----------------------------------------------------------------------------
export const ZeroMultiplierVisualizer: React.FC<QuickCheckVisualizerStageProps> = ({
  onNext,
  onReset,
  isCorrect,
  isLastQuestion,
}) => {
  const [baseZeroCount, setBaseZeroCount] = useState<number>(2); // 300 has 2 zeros
  const baseNumber = 3 * Math.pow(10, baseZeroCount);
  const squaredNumber = baseNumber * baseNumber;
  const squaredZeroCount = baseZeroCount * 2;

  return (
    <div
      aria-label="Zero Doubling Rule Visualizer"
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
            {isCorrect ? '✓ Right! Trailing Zeros Rule' : 'Review — Trailing Zeros'}
          </span>
          <span className="px-2 py-0.5 rounded-md bg-white border border-slate-200/80 text-micro font-bold text-[#005583] tabular-nums">
            Zeros Double on Squaring
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

      {/* 2. Base Zeros Selector */}
      <div className="flex items-center justify-between gap-2 text-micro shrink-0 flex-wrap">
        <span className="font-bold text-slate-600">Select base zeros:</span>
        <div className="flex items-center gap-1 bg-white p-0.5 rounded-xl border border-slate-200/80">
          {[1, 2, 3].map((z) => (
            <button
              key={z}
              type="button"
              onClick={() => setBaseZeroCount(z)}
              className={`px-2.5 py-0.5 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                baseZeroCount === z
                  ? 'bg-amber-500 text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {3 * Math.pow(10, z)} ({z} {z === 1 ? 'zero' : 'zeros'})
            </button>
          ))}
        </div>
      </div>

      {/* 3. Animated Doubling Stage */}
      <div className="w-full flex-1 min-h-[110px] max-h-[175px] bg-white rounded-2xl border border-slate-200/80 p-2 flex flex-col items-center justify-center gap-2.5 shadow-2xs overflow-hidden">
        <div className="flex items-center justify-center gap-3 font-mono text-small sm:text-statement font-bold">
          <div className="px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-300 text-center">
            3<span className="text-amber-600 font-black">{'0'.repeat(baseZeroCount)}</span>
            <span className="text-[10px] text-slate-500 block font-sans font-bold">
              {baseZeroCount} {baseZeroCount === 1 ? 'zero' : 'zeros'}
            </span>
          </div>

          <div className="flex flex-col items-center">
            <span className="text-micro font-bold text-amber-600">Square (× 2)</span>
            <ArrowRight className="w-5 h-5 text-amber-500" />
          </div>

          <div className="px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-300 text-amber-950 text-center">
            9<span className="text-amber-600 font-black underline">{'0'.repeat(squaredZeroCount)}</span>
            <span className="text-[10px] text-amber-700 block font-sans font-bold">
              {squaredZeroCount} zeros
            </span>
          </div>
        </div>

        <div className="px-3 py-1 rounded-xl bg-sky-50 border border-sky-200 text-micro font-bold text-slate-800">
          <Katex latex={`(3 \\times 10^${baseZeroCount})^2 = 9 \\times 10^{${baseZeroCount} \\times 2} = 9 \\times 10^${squaredZeroCount}`} />
        </div>
      </div>

      {/* 4. Insight Box */}
      <div className="px-3 py-1 rounded-xl bg-amber-50 border border-amber-200 text-amber-950 font-bold text-micro shrink-0">
        300 ends in 2 zeros $\rightarrow$ on squaring, zeros double: $2 \times 2 = 4$ zeros ($90,000$).
      </div>

      {/* 5. Footer */}
      <div className="pt-1.5 border-t border-slate-200/70 flex items-center justify-between gap-2 shrink-0">
        <span className="text-micro font-bold text-emerald-700">
          ✓ Trailing zeros always double on squaring!
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
// SCENE 3: PARITY OF SQUARES (scene-3-qc-3)
// -----------------------------------------------------------------------------
export const ParityDotsVisualizer: React.FC<QuickCheckVisualizerStageProps> = ({
  onNext,
  onReset,
  isCorrect,
  isLastQuestion,
}) => {
  const [oddVal, setOddVal] = useState<number>(3); // 3, 5, 7

  return (
    <div
      aria-label="Square Parity Visualizer"
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
            {isCorrect ? '✓ Right! Square Parity' : 'Review — Square Parity'}
          </span>
          <span className="px-2 py-0.5 rounded-md bg-white border border-slate-200/80 text-micro font-bold text-[#005583] tabular-nums">
            Odd × Odd = Always Odd
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

      {/* 2. Odd Value Selector */}
      <div className="flex items-center justify-between gap-2 text-micro shrink-0 flex-wrap">
        <span className="font-bold text-slate-600">Select odd number:</span>
        <div className="flex items-center gap-1 bg-white p-0.5 rounded-xl border border-slate-200/80">
          {[3, 5, 7, 9].map((val) => (
            <button
              key={val}
              type="button"
              onClick={() => setOddVal(val)}
              className={`px-2.5 py-0.5 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                oddVal === val
                  ? 'bg-[#005583] text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {val}² = {val * val}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Parity Visual Stage */}
      <div className="w-full flex-1 min-h-[110px] max-h-[175px] bg-white rounded-2xl border border-slate-200/80 p-2 flex items-center justify-center gap-6 shadow-2xs overflow-hidden">
        <div className="flex flex-col items-center gap-1">
          <div className="px-3 py-1 rounded-xl bg-sky-50 border border-sky-300 text-sky-950 font-bold text-micro">
            Odd = (2k + 1)
          </div>
          <span className="text-[11px] text-slate-500 font-medium">Pairs with 1 leftover dot</span>
        </div>

        <ArrowRight className="w-5 h-5 text-slate-400" />

        <div className="flex flex-col items-center gap-1">
          <div className="px-3 py-1 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-950 font-bold text-micro">
            (2k + 1)² = 4k² + 4k + 1
          </div>
          <span className="text-[11px] text-emerald-800 font-bold">Even part + 1 = ALWAYS ODD</span>
        </div>
      </div>

      {/* 4. Insight Box */}
      <div className="px-3 py-1 rounded-xl bg-sky-50 border border-sky-200 text-sky-950 font-bold text-micro shrink-0">
        Any odd number squared leaves an unpaired remainder of 1. Odd × Odd is ALWAYS ODD!
      </div>

      {/* 5. Footer */}
      <div className="pt-1.5 border-t border-slate-200/70 flex items-center justify-between gap-2 shrink-0">
        <span className="text-micro font-bold text-emerald-700">
          ✓ Square of an odd number is always odd!
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
