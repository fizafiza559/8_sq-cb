/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import { Katex } from '../Katex';
import { QuickCheckVisualizerStageProps } from './SquaresQuickCheckVisualizers';

// -----------------------------------------------------------------------------
// SCENE 15: BABYLONIAN CLAY TABLET (scene-15-qc-1)
// -----------------------------------------------------------------------------
export const BabylonianTabletVisualizer: React.FC<QuickCheckVisualizerStageProps> = ({
  onNext,
  onReset,
  isCorrect,
  isLastQuestion,
}) => {
  return (
    <div
      aria-label="Babylonian Tablet Visualizer"
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
            {isCorrect ? '✓ Right! History of Roots' : 'Review — Ancient History'}
          </span>
          <span className="px-2 py-0.5 rounded-md bg-white border border-slate-200/80 text-micro font-bold text-[#005583] tabular-nums">
            Tablet YBC 7289 (Babylonians)
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

      {/* 2. Tablet Stage */}
      <div className="w-full flex-1 min-h-[110px] max-h-[175px] bg-white rounded-2xl border border-slate-200/80 p-2 flex items-center justify-center gap-5 shadow-2xs overflow-hidden">
        <div className="w-24 h-24 rounded-2xl bg-amber-100 border-2 border-amber-400 flex flex-col items-center justify-center p-2 text-center shadow-xs">
          <span className="text-[10px] uppercase font-black text-amber-900 tracking-wider">
            YBC 7289
          </span>
          <span className="font-mono text-micro font-bold text-amber-950 mt-1">
            √2 ≈ 1; 24, 51, 10
          </span>
        </div>

        <div className="text-left flex flex-col gap-1 text-micro text-slate-700">
          <div className="font-bold text-[#005583]">Babylonian Clay Tablet (c. 1800 BCE)</div>
          <div>Calculated the diagonal of a square in sexagesimal (base-60):</div>
          <div className="font-mono font-bold text-slate-900">
            1 + 24/60 + 51/3600 + 10/216000 ≈ 1.41421296
          </div>
        </div>
      </div>

      {/* 3. Insight */}
      <div className="px-3 py-1 rounded-xl bg-amber-50 border border-amber-300 text-amber-950 font-bold text-micro shrink-0">
        The <strong>Babylonians</strong> recorded remarkably accurate square root calculations on clay tablets nearly 4,000 years ago!
      </div>

      {/* 4. Footer */}
      <div className="pt-1.5 border-t border-slate-200/70 flex items-center justify-between gap-2 shrink-0">
        <span className="text-micro font-bold text-emerald-700">
          ✓ Correct: The Babylonians!
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
// SCENE 16: INVERSE OPERATION TO CUBING (scene-16-qc-1)
// -----------------------------------------------------------------------------
export const InverseMachineCycleVisualizer: React.FC<QuickCheckVisualizerStageProps> = ({
  onNext,
  onReset,
  isCorrect,
  isLastQuestion,
}) => {
  return (
    <div
      aria-label="Inverse Machine Visualizer"
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
            {isCorrect ? '✓ Right! Inverse Operations' : 'Review — Inverse of Cubing'}
          </span>
          <span className="px-2 py-0.5 rounded-md bg-white border border-slate-200/80 text-micro font-bold text-[#005583] tabular-nums">
            Inverse = Cube Root
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

      {/* 2. Machine Cycle Stage */}
      <div className="w-full flex-1 min-h-[110px] max-h-[175px] bg-white rounded-2xl border border-slate-200/80 p-2 flex flex-col items-center justify-center gap-3 shadow-2xs overflow-hidden">
        <div className="flex items-center justify-center gap-3 font-mono text-small sm:text-statement font-bold">
          <div className="px-3 py-1.5 rounded-xl bg-slate-100 border text-center">
            4
            <span className="text-[10px] text-slate-500 block font-sans font-bold">Number</span>
          </div>

          <div className="flex flex-col items-center">
            <span className="text-[10px] font-bold text-[#005583]">Cube ()³</span>
            <ArrowRight className="w-4 h-4 text-[#005583]" />
          </div>

          <div className="px-3 py-1.5 rounded-xl bg-sky-50 border border-sky-300 text-[#005583] text-center">
            64
            <span className="text-[10px] text-sky-700 block font-sans font-bold">Cube Result</span>
          </div>

          <div className="flex flex-col items-center">
            <span className="text-[10px] font-bold text-emerald-700">Cube Root ∛</span>
            <ArrowRight className="w-4 h-4 text-emerald-600" />
          </div>

          <div className="px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-950 text-center">
            4
            <span className="text-[10px] text-emerald-700 block font-sans font-bold">Back to Original</span>
          </div>
        </div>

        <div className="px-3 py-1 rounded-xl bg-emerald-50 border border-emerald-300 text-micro font-bold text-emerald-950">
          <Katex latex={`\\sqrt[3]{x^3} = x \\quad \\text{and} \\quad (\\sqrt[3]{x})^3 = x`} />
        </div>
      </div>

      {/* 3. Insight */}
      <div className="px-3 py-1 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-950 font-bold text-micro shrink-0">
        Cubing and taking the cube root undo each other completely — they are exact <strong>inverse operations</strong>!
      </div>

      {/* 4. Footer */}
      <div className="pt-1.5 border-t border-slate-200/70 flex items-center justify-between gap-2 shrink-0">
        <span className="text-micro font-bold text-emerald-700">
          ✓ Inverse of cubing is the cube root!
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
// SCENE 17: SQUARE PAIRS (8 NEXT TO 1) (scene-17-qc-1)
// -----------------------------------------------------------------------------
export const SquarePairsDominoVisualizer: React.FC<QuickCheckVisualizerStageProps> = ({
  onNext,
  onReset,
  isCorrect,
  isLastQuestion,
}) => {
  return (
    <div
      aria-label="Square Pairs Domino Visualizer"
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
            {isCorrect ? '✓ Right! Square Pairs Rule' : 'Review — Square Pairs'}
          </span>
          <span className="px-2 py-0.5 rounded-md bg-white border border-slate-200/80 text-micro font-bold text-[#005583] tabular-nums">
            8 + 1 = 9 = 3²
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

      {/* 2. Domino Stage */}
      <div className="w-full flex-1 min-h-[110px] max-h-[175px] bg-white rounded-2xl border border-slate-200/80 p-2 flex items-center justify-center gap-4 shadow-2xs overflow-hidden">
        <div className="flex items-center gap-3 font-mono text-statement font-black">
          <div className="w-14 h-14 rounded-2xl bg-amber-500 text-white flex flex-col items-center justify-center shadow-xs">
            <span>8</span>
            <span className="text-[9px] uppercase tracking-tighter font-sans font-bold">Tile</span>
          </div>

          <span className="text-slate-400 font-bold">+</span>

          <div className="w-14 h-14 rounded-2xl bg-sky-500 text-white flex flex-col items-center justify-center shadow-xs">
            <span>1</span>
            <span className="text-[9px] uppercase tracking-tighter font-sans font-bold">Tile</span>
          </div>

          <span className="text-slate-400 font-bold">=</span>

          <div className="px-4 py-2 rounded-2xl bg-emerald-600 text-white flex flex-col items-center justify-center shadow-xs">
            <span>9</span>
            <span className="text-[9px] uppercase tracking-tighter font-sans font-bold">3² (Square!)</span>
          </div>
        </div>
      </div>

      {/* 3. Insight */}
      <div className="px-3 py-1 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-950 font-bold text-micro shrink-0">
        8 + 1 = 9 is a perfect square ($3^2$), making 8 and 1 valid adjacent partners in the Square Pairs puzzle!
      </div>

      {/* 4. Footer */}
      <div className="pt-1.5 border-t border-slate-200/70 flex items-center justify-between gap-2 shrink-0">
        <span className="text-micro font-bold text-emerald-700">
          ✓ Sum is 9, which is 3²!
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
// SCENE 18: SQUARE ROOT OF 1764 (scene-18-qc-1)
// -----------------------------------------------------------------------------
export const SquareRoot1764TreeVisualizer: React.FC<QuickCheckVisualizerStageProps> = ({
  onNext,
  onReset,
  isCorrect,
  isLastQuestion,
}) => {
  return (
    <div
      aria-label="Square Root 1764 Visualizer"
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
            {isCorrect ? '✓ Right! Solved Example' : 'Review — Square Root of 1764'}
          </span>
          <span className="px-2 py-0.5 rounded-md bg-white border border-slate-200/80 text-micro font-bold text-[#005583] tabular-nums">
            √1764 = 42
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

      {/* 2. Factor Pairs Stage */}
      <div className="w-full flex-1 min-h-[110px] max-h-[175px] bg-white rounded-2xl border border-slate-200/80 p-2 flex flex-col items-center justify-center gap-2.5 shadow-2xs overflow-hidden">
        <div className="flex items-center gap-2 font-mono text-small font-bold">
          <div className="px-2.5 py-1 rounded-xl bg-sky-100 text-sky-900 border border-sky-300 text-center">
            (2 × 2)
            <span className="text-[10px] block font-sans font-bold">Pair 2</span>
          </div>
          <span>×</span>
          <div className="px-2.5 py-1 rounded-xl bg-sky-100 text-sky-900 border border-sky-300 text-center">
            (3 × 3)
            <span className="text-[10px] block font-sans font-bold">Pair 3</span>
          </div>
          <span>×</span>
          <div className="px-2.5 py-1 rounded-xl bg-amber-100 text-amber-900 border border-amber-300 text-center">
            (7 × 7)
            <span className="text-[10px] block font-sans font-bold">Pair 7</span>
          </div>
        </div>

        <div className="flex items-center gap-2 font-mono text-small font-extrabold text-emerald-950 bg-emerald-50 px-3 py-1 rounded-xl border border-emerald-300">
          <Katex latex={`\\sqrt{1764} = 2 \\times 3 \\times 7 = 42`} />
        </div>
      </div>

      {/* 3. Insight */}
      <div className="px-3 py-1 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-950 font-bold text-micro shrink-0">
        $1764 = (2 \times 2) \times (3 \times 3) \times (7 \times 7)$. Taking one factor from each pair yields $2 \times 3 \times 7 =$ <strong>42</strong>!
      </div>

      {/* 4. Footer */}
      <div className="pt-1.5 border-t border-slate-200/70 flex items-center justify-between gap-2 shrink-0">
        <span className="text-micro font-bold text-emerald-700">
          ✓ √1764 = 42!
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
// SCENE 19: MAKING 1323 A CUBE (scene-19-qc-1)
// -----------------------------------------------------------------------------
export const TripletCompletionVisualizer: React.FC<QuickCheckVisualizerStageProps> = ({
  onNext,
  onReset,
  isCorrect,
  isLastQuestion,
}) => {
  return (
    <div
      aria-label="Triplet Completion Visualizer"
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
            {isCorrect ? '✓ Right! Making a Cube' : 'Review — Making 1323 a Cube'}
          </span>
          <span className="px-2 py-0.5 rounded-md bg-white border border-slate-200/80 text-micro font-bold text-[#005583] tabular-nums">
            Multiply by 7
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

      {/* 2. Triplet Completion Stage */}
      <div className="w-full flex-1 min-h-[110px] max-h-[175px] bg-white rounded-2xl border border-slate-200/80 p-2 flex flex-col items-center justify-center gap-2.5 shadow-2xs overflow-hidden">
        <div className="flex items-center gap-3 font-mono text-small font-bold">
          <div className="px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-900 border border-emerald-300 text-center">
            (3 × 3 × 3)
            <span className="text-[10px] text-emerald-700 block font-sans font-bold">✓ Complete Triplet</span>
          </div>

          <span>×</span>

          <div className="px-3 py-1.5 rounded-xl bg-rose-50 text-rose-900 border border-rose-300 text-center">
            (7 × 7 × <span className="underline font-black text-rose-700">7?</span>)
            <span className="text-[10px] text-rose-700 block font-sans font-bold">Needs One 7!</span>
          </div>
        </div>

        <div className="px-3 py-1 rounded-xl bg-sky-50 border border-sky-200 text-micro font-bold text-[#005583]">
          1323 × 7 = 9261 = (3 × 7)³ = 21³
        </div>
      </div>

      {/* 3. Insight */}
      <div className="px-3 py-1 rounded-xl bg-sky-50 border border-sky-200 text-sky-950 font-bold text-micro shrink-0">
        In $1323 = 3^3 \times 7^2$, the factor 7 is missing one partner to form a triplet. Multiplying by <strong>7</strong> completes the cube!
      </div>

      {/* 4. Footer */}
      <div className="pt-1.5 border-t border-slate-200/70 flex items-center justify-between gap-2 shrink-0">
        <span className="text-micro font-bold text-emerald-700">
          ✓ Smallest multiplier is 7!
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
// SCENE 20: CUBE ROOT OF 13824 (scene-20-qc-1)
// -----------------------------------------------------------------------------
export const CubeRootEstimationVisualizer: React.FC<QuickCheckVisualizerStageProps> = ({
  onNext,
  onReset,
  isCorrect,
  isLastQuestion,
}) => {
  return (
    <div
      aria-label="Cube Root Estimation Visualizer"
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
            {isCorrect ? '✓ Right! Cube Root Estimation' : 'Review — Estimating ∛13824'}
          </span>
          <span className="px-2 py-0.5 rounded-md bg-white border border-slate-200/80 text-micro font-bold text-[#005583] tabular-nums">
            ∛13824 = 24
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

      {/* 2. Digit Splitting Stage */}
      <div className="w-full flex-1 min-h-[110px] max-h-[175px] bg-white rounded-2xl border border-slate-200/80 p-2 flex flex-col items-center justify-center gap-2.5 shadow-2xs overflow-hidden">
        <div className="grid grid-cols-2 gap-3 w-full max-w-sm">
          <div className="p-2 rounded-xl bg-amber-50 border border-amber-300 text-center">
            <span className="font-bold text-amber-900 block text-micro">Tens Digit from [13]:</span>
            <span className="font-mono font-bold text-amber-950 mt-0.5 block">2³ = 8 ≤ 13 &lt; 27</span>
            <span className="text-[10px] text-amber-700 font-extrabold">Tens = 2</span>
          </div>

          <div className="p-2 rounded-xl bg-sky-50 border border-sky-300 text-center">
            <span className="font-bold text-sky-900 block text-micro">Units Digit from [824]:</span>
            <span className="font-mono font-bold text-sky-950 mt-0.5 block">Ends in 4 → 4³ = 64</span>
            <span className="text-[10px] text-sky-700 font-extrabold">Units = 4</span>
          </div>
        </div>

        <div className="flex items-center gap-2 font-mono text-small font-extrabold text-emerald-950 bg-emerald-50 px-3.5 py-1 rounded-xl border border-emerald-300">
          <Katex latex={`\\sqrt[3]{13824} = 24 \\quad (24^3 = 13824)`} />
        </div>
      </div>

      {/* 3. Insight */}
      <div className="px-3 py-1 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-950 font-bold text-micro shrink-0">
        By separating 13824 into 13 and 824, we immediately deduce the tens digit (2) and units digit (4) $\rightarrow$ <strong>24</strong>!
      </div>

      {/* 4. Footer */}
      <div className="pt-1.5 border-t border-slate-200/70 flex items-center justify-between gap-2 shrink-0">
        <span className="text-micro font-bold text-emerald-700">
          ✓ ∛13824 = 24!
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
