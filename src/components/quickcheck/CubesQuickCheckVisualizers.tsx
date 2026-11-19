/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  ArrowRight,
  Box,
  ChevronRight,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import { Katex } from '../Katex';
import { QuickCheckVisualizerStageProps } from './SquaresQuickCheckVisualizers';

// -----------------------------------------------------------------------------
// SCENE 9: VOLUME OF CUBE WITH EDGE 5 (scene-9-qc-1)
// -----------------------------------------------------------------------------
export const IsometricCubeVolumeVisualizer: React.FC<QuickCheckVisualizerStageProps> = ({
  onNext,
  onReset,
  isCorrect,
  isLastQuestion,
}) => {
  const [layers, setLayers] = useState<number>(5);

  return (
    <div
      aria-label="Cube Volume Visualizer"
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
            {isCorrect ? '✓ Right! Cube Volume' : 'Review — Cube Volume'}
          </span>
          <span className="px-2 py-0.5 rounded-md bg-white border border-slate-200/80 text-micro font-bold text-[#005583] tabular-nums">
            Edge = 5 units
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
        <span className="font-bold text-slate-600">Assemble layers (1 to 5):</span>
        <div className="flex items-center gap-1 bg-white p-0.5 rounded-xl border border-slate-200/80">
          {[1, 2, 3, 4, 5].map((l) => (
            <button
              key={l}
              type="button"
              onClick={() => setLayers(l)}
              className={`px-2 py-0.5 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                layers === l
                  ? 'bg-[#005583] text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {l} {l === 1 ? 'Layer' : 'Layers'} ({l * 25})
            </button>
          ))}
        </div>
      </div>

      {/* 3. Stage */}
      <div className="w-full flex-1 min-h-[110px] max-h-[175px] bg-white rounded-2xl border border-slate-200/80 p-2 flex items-center justify-center gap-6 shadow-2xs overflow-hidden">
        <div className="flex items-center gap-3">
          <div className="w-20 h-20 rounded-2xl bg-sky-50 border-2 border-sky-400 flex flex-col items-center justify-center shadow-xs">
            <Box className="w-8 h-8 text-[#005583]" />
            <span className="text-[11px] font-black text-sky-950 mt-1">5 × 5 × 5</span>
          </div>

          <div className="text-left flex flex-col gap-1 text-micro font-bold text-slate-700">
            <div>Base layer = 5 × 5 = 25 unit cubes</div>
            <div>{layers} layers stacked = {layers} × 25 = {layers * 25} cubes</div>
            <div className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-900 border border-emerald-200 font-mono text-micro font-black">
              Volume = 5³ = 125 unit cubes
            </div>
          </div>
        </div>
      </div>

      {/* 4. Insight */}
      <div className="px-3 py-1 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-950 font-bold text-micro shrink-0">
        A cube with edge 5 has 5 layers of 25 unit cubes each: $5 \times 5 \times 5 = 5^3 = 125$!
      </div>

      {/* 5. Footer */}
      <div className="pt-1.5 border-t border-slate-200/70 flex items-center justify-between gap-2 shrink-0">
        <span className="text-micro font-bold text-emerald-700">
          ✓ Volume = 125 unit cubes!
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
// SCENE 10: TRAILING ZEROS OF 200³ (scene-10-qc-1)
// -----------------------------------------------------------------------------
export const CubeZerosTriplerVisualizer: React.FC<QuickCheckVisualizerStageProps> = ({
  onNext,
  onReset,
  isCorrect,
  isLastQuestion,
}) => {
  return (
    <div
      aria-label="Cube Zeros Tripler Visualizer"
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
            {isCorrect ? '✓ Right! Cube Zeros Rule' : 'Review — Cube Trailing Zeros'}
          </span>
          <span className="px-2 py-0.5 rounded-md bg-white border border-slate-200/80 text-micro font-bold text-[#005583] tabular-nums">
            Zeros Triple on Cubing
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

      {/* 2. Zeros Tripling Stage */}
      <div className="w-full flex-1 min-h-[110px] max-h-[175px] bg-white rounded-2xl border border-slate-200/80 p-2 flex flex-col items-center justify-center gap-3 shadow-2xs overflow-hidden">
        <div className="flex items-center justify-center gap-3 font-mono text-small sm:text-statement font-bold">
          <div className="px-3 py-1.5 rounded-xl bg-slate-100 border text-center">
            2<span className="text-amber-600 font-black">00</span>
            <span className="text-[10px] text-slate-500 block font-sans font-bold">2 zeros</span>
          </div>

          <div className="flex flex-col items-center">
            <span className="text-micro font-bold text-amber-600">Cube (× 3)</span>
            <ArrowRight className="w-5 h-5 text-amber-500" />
          </div>

          <div className="px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-300 text-amber-950 text-center">
            8<span className="text-amber-600 font-black underline">000000</span>
            <span className="text-[10px] text-amber-700 block font-sans font-bold">6 zeros</span>
          </div>
        </div>

        <div className="px-3 py-1 rounded-xl bg-sky-50 border border-sky-200 text-micro font-bold text-slate-800">
          <Katex latex={`(2 \\times 10^2)^3 = 2^3 \\times (10^2)^3 = 8 \\times 10^6 = 8,000,000`} />
        </div>
      </div>

      {/* 3. Insight */}
      <div className="px-3 py-1 rounded-xl bg-amber-50 border border-amber-200 text-amber-950 font-bold text-micro shrink-0">
        Cubing triples the number of trailing zeros: $2 \times 3 = 6$ zeros in $200^3$!
      </div>

      {/* 4. Footer */}
      <div className="pt-1.5 border-t border-slate-200/70 flex items-center justify-between gap-2 shrink-0">
        <span className="text-micro font-bold text-emerald-700">
          ✓ Trailing zeros = 6!
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
// SCENE 11: TAXICAB 1729 DUAL CUBES (scene-11-qc-1)
// -----------------------------------------------------------------------------
export const TaxicabDualCubeVisualizer: React.FC<QuickCheckVisualizerStageProps> = ({
  onNext,
  onReset,
  isCorrect,
  isLastQuestion,
}) => {
  const [activeWay, setActiveWay] = useState<'both' | 'way1' | 'way2'>('both');

  return (
    <div
      aria-label="Taxicab Dual Cube Visualizer"
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
            {isCorrect ? '✓ Right! Ramanujan 1729' : 'Review — Taxicab 1729'}
          </span>
          <span className="px-2 py-0.5 rounded-md bg-white border border-slate-200/80 text-micro font-bold text-[#005583] tabular-nums">
            Hardy-Ramanujan Number
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
        <span className="font-bold text-slate-600">Explore sum representations:</span>
        <div className="flex items-center gap-1 bg-white p-0.5 rounded-xl border border-slate-200/80">
          {(['both', 'way1', 'way2'] as const).map((w) => (
            <button
              key={w}
              type="button"
              onClick={() => setActiveWay(w)}
              className={`px-2.5 py-0.5 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                activeWay === w
                  ? 'bg-[#005583] text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {w === 'both' ? 'Both Ways' : w === 'way1' ? '1³ + 12³' : '9³ + 10³'}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Stage */}
      <div className="w-full flex-1 min-h-[110px] max-h-[175px] bg-white rounded-2xl border border-slate-200/80 p-2 flex items-center justify-center gap-4 shadow-2xs overflow-hidden">
        <div className="grid grid-cols-2 gap-3 w-full max-w-sm">
          <div
            className={`p-2 rounded-2xl border flex flex-col items-center justify-center text-center transition-all ${
              activeWay === 'way2' ? 'opacity-40' : 'bg-emerald-50 border-emerald-300'
            }`}
          >
            <span className="font-mono font-black text-small text-emerald-950">1³ + 12³</span>
            <span className="text-[11px] text-emerald-800 font-bold">1 + 1728 = 1729</span>
          </div>

          <div
            className={`p-2 rounded-2xl border flex flex-col items-center justify-center text-center transition-all ${
              activeWay === 'way1' ? 'opacity-40' : 'bg-sky-50 border-sky-300'
            }`}
          >
            <span className="font-mono font-black text-small text-sky-950">9³ + 10³</span>
            <span className="text-[11px] text-sky-800 font-bold">729 + 1000 = 1729</span>
          </div>
        </div>
      </div>

      {/* 4. Insight */}
      <div className="px-3 py-1 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-950 font-bold text-micro shrink-0">
        1729 is the smallest number that can be expressed as the sum of two cubes in two different ways!
      </div>

      {/* 5. Footer */}
      <div className="pt-1.5 border-t border-slate-200/70 flex items-center justify-between gap-2 shrink-0">
        <span className="text-micro font-bold text-emerald-700">
          ✓ 1³ + 12³ and 9³ + 10³!
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
// SCENE 12: CUBES AND ODD NUMBERS (scene-12-qc-1)
// -----------------------------------------------------------------------------
export const CubeOddPyramidVisualizer: React.FC<QuickCheckVisualizerStageProps> = ({
  onNext,
  onReset,
  isCorrect,
  isLastQuestion,
}) => {
  const [activeRow, setActiveRow] = useState<number>(4);

  return (
    <div
      aria-label="Cube Odd Numbers Pyramid Visualizer"
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
            {isCorrect ? '✓ Right! Cubes as Odd Sums' : 'Review — Cubes as Odd Sums'}
          </span>
          <span className="px-2 py-0.5 rounded-md bg-white border border-slate-200/80 text-micro font-bold text-[#005583] tabular-nums">
            Row 4 = 4³ = 64
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
        <span className="font-bold text-slate-600">Select pyramid row:</span>
        <div className="flex items-center gap-1 bg-white p-0.5 rounded-xl border border-slate-200/80">
          {[1, 2, 3, 4].map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setActiveRow(r)}
              className={`px-2.5 py-0.5 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                activeRow === r
                  ? 'bg-amber-500 text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Row {r} ({r}³)
            </button>
          ))}
        </div>
      </div>

      {/* 3. Stage */}
      <div className="w-full flex-1 min-h-[110px] max-h-[175px] bg-white rounded-2xl border border-slate-200/80 p-2 flex flex-col items-center justify-center gap-1.5 shadow-2xs overflow-hidden font-mono text-micro font-bold">
        <div className={activeRow === 1 ? 'px-2 py-0.5 rounded bg-amber-100 text-amber-950 ring-1 ring-amber-400' : 'text-slate-400'}>
          Row 1: 1 = 1³ = 1
        </div>
        <div className={activeRow === 2 ? 'px-2 py-0.5 rounded bg-amber-100 text-amber-950 ring-1 ring-amber-400' : 'text-slate-400'}>
          Row 2: 3 + 5 = 2³ = 8
        </div>
        <div className={activeRow === 3 ? 'px-2 py-0.5 rounded bg-amber-100 text-amber-950 ring-1 ring-amber-400' : 'text-slate-400'}>
          Row 3: 7 + 9 + 11 = 3³ = 27
        </div>
        <div className={activeRow === 4 ? 'px-3 py-1 rounded-xl bg-amber-500 text-white shadow-xs text-small' : 'text-slate-400'}>
          Row 4: 13 + 15 + 17 + 19 = 4³ = 64
        </div>
      </div>

      {/* 4. Insight */}
      <div className="px-3 py-1 rounded-xl bg-amber-50 border border-amber-300 text-amber-950 font-bold text-micro shrink-0">
        The 4 consecutive odd numbers summing to 4³ (64) are <strong>13 + 15 + 17 + 19</strong>!
      </div>

      {/* 5. Footer */}
      <div className="pt-1.5 border-t border-slate-200/70 flex items-center justify-between gap-2 shrink-0">
        <span className="text-micro font-bold text-emerald-700">
          ✓ 13 + 15 + 17 + 19 = 64!
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
// SCENE 13: CUBE ROOT OF 512 (scene-13-qc-1)
// -----------------------------------------------------------------------------
export const CubeRootTripletGroupingVisualizer: React.FC<QuickCheckVisualizerStageProps> = ({
  onNext,
  onReset,
  isCorrect,
  isLastQuestion,
}) => {
  return (
    <div
      aria-label="Cube Root Triplet Grouping Visualizer"
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
            {isCorrect ? '✓ Right! Cube Root of 512' : 'Review — Cube Root by Triplets'}
          </span>
          <span className="px-2 py-0.5 rounded-md bg-white border border-slate-200/80 text-micro font-bold text-[#005583] tabular-nums">
            ∛512 = 8
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

      {/* 2. Triplets Stage */}
      <div className="w-full flex-1 min-h-[110px] max-h-[175px] bg-white rounded-2xl border border-slate-200/80 p-2 flex flex-col items-center justify-center gap-3 shadow-2xs overflow-hidden">
        <div className="flex items-center gap-2 font-mono text-small font-bold">
          <div className="px-2.5 py-1 rounded-xl bg-sky-100 text-sky-900 border border-sky-300 text-center">
            (2 × 2 × 2)
            <span className="text-[10px] block font-sans font-bold">Triplet 1</span>
          </div>
          <span>×</span>
          <div className="px-2.5 py-1 rounded-xl bg-sky-100 text-sky-900 border border-sky-300 text-center">
            (2 × 2 × 2)
            <span className="text-[10px] block font-sans font-bold">Triplet 2</span>
          </div>
          <span>×</span>
          <div className="px-2.5 py-1 rounded-xl bg-sky-100 text-sky-900 border border-sky-300 text-center">
            (2 × 2 × 2)
            <span className="text-[10px] block font-sans font-bold">Triplet 3</span>
          </div>
        </div>

        <div className="flex items-center gap-2 font-mono text-small font-extrabold text-emerald-950 bg-emerald-50 px-3 py-1 rounded-xl border border-emerald-300">
          <Katex latex={`\\sqrt[3]{512} = 2 \\times 2 \\times 2 = 8`} />
        </div>
      </div>

      {/* 3. Insight */}
      <div className="px-3 py-1 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-950 font-bold text-micro shrink-0">
        For cube roots, we group factors into triplets (groups of 3). One factor from each of the 3 triplets yields $2 \times 2 \times 2 = 8$!
      </div>

      {/* 4. Footer */}
      <div className="pt-1.5 border-t border-slate-200/70 flex items-center justify-between gap-2 shrink-0">
        <span className="text-micro font-bold text-emerald-700">
          ✓ ∛512 = 8!
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
// SCENE 14: SUCCESSIVE DIFFERENCES (scene-14-qc-1)
// -----------------------------------------------------------------------------
export const CubeDifferenceEngineVisualizer: React.FC<QuickCheckVisualizerStageProps> = ({
  onNext,
  onReset,
  isCorrect,
  isLastQuestion,
}) => {
  return (
    <div
      aria-label="Cube Difference Engine Visualizer"
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
            {isCorrect ? '✓ Right! Successive Differences' : 'Review — Cube Differences'}
          </span>
          <span className="px-2 py-0.5 rounded-md bg-white border border-slate-200/80 text-micro font-bold text-[#005583] tabular-nums">
            2³ - 1³ = 7
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

      {/* 2. Difference Ladder Stage */}
      <div className="w-full flex-1 min-h-[110px] max-h-[175px] bg-white rounded-2xl border border-slate-200/80 p-2 flex flex-col items-center justify-center gap-3 shadow-2xs overflow-hidden">
        <div className="flex items-center justify-center gap-3 font-mono text-small sm:text-statement font-bold">
          <div className="px-3 py-1.5 rounded-xl bg-slate-100 border text-center">
            2³ = 8
          </div>

          <span className="text-slate-400 font-black">-</span>

          <div className="px-3 py-1.5 rounded-xl bg-slate-100 border text-center">
            1³ = 1
          </div>

          <span className="text-slate-400 font-black">=</span>

          <div className="px-3.5 py-1.5 rounded-xl bg-emerald-600 text-white text-center shadow-xs">
            7
          </div>
        </div>

        <div className="px-3 py-1 rounded-xl bg-sky-50 border border-sky-200 text-micro font-bold text-slate-800">
          <Katex latex={`1 + 3 \\times (1 \\times 2) = 1 + 6 = 7`} />
        </div>
      </div>

      {/* 3. Insight */}
      <div className="px-3 py-1 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-950 font-bold text-micro shrink-0">
        The difference between consecutive cubes $2^3$ (8) and $1^3$ (1) is $8 - 1 =$ <strong>7</strong>!
      </div>

      {/* 4. Footer */}
      <div className="pt-1.5 border-t border-slate-200/70 flex items-center justify-between gap-2 shrink-0">
        <span className="text-micro font-bold text-emerald-700">
          ✓ Difference = 7!
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
