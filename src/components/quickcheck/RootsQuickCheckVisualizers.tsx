/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  ArrowRight,
  ChevronRight,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import { Katex } from '../Katex';
import { QuickCheckVisualizerStageProps } from './SquaresQuickCheckVisualizers';

// -----------------------------------------------------------------------------
// SCENE 6: PRINCIPAL SQUARE ROOT OF 81 (scene-6-qc-1)
// -----------------------------------------------------------------------------
export const CourtyardPrincipalRootVisualizer: React.FC<QuickCheckVisualizerStageProps> = ({
  onNext,
  onReset,
  isCorrect,
  isLastQuestion,
}) => {
  const [viewMode, setViewMode] = useState<'geometric' | 'algebraic'>('geometric');

  return (
    <div
      aria-label="Principal Square Root Visualizer"
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
            {isCorrect ? '✓ Right! Principal Square Root' : 'Review — Radical Sign & Root'}
          </span>
          <span className="px-2 py-0.5 rounded-md bg-white border border-slate-200/80 text-micro font-bold text-[#005583] tabular-nums">
            √81 = +9
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
        <span className="font-bold text-slate-600">Perspective:</span>
        <div className="flex items-center gap-1 bg-white p-0.5 rounded-xl border border-slate-200/80">
          {(['geometric', 'algebraic'] as const).map((mode) => (
            <button
              key={mode}
              type="button"
              onClick={() => setViewMode(mode)}
              className={`px-2.5 py-0.5 rounded-lg text-[11px] font-bold transition-all cursor-pointer capitalize ${
                viewMode === mode
                  ? 'bg-[#005583] text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {mode === 'geometric' ? 'Courtyard Geometry (Side)' : 'Algebraic Roots (±)'}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Stage */}
      <div className="w-full flex-1 min-h-[110px] max-h-[175px] bg-white rounded-2xl border border-slate-200/80 p-2 flex items-center justify-center gap-5 shadow-2xs overflow-hidden">
        {viewMode === 'geometric' ? (
          <div className="flex items-center gap-4">
            <div className="w-24 h-24 rounded-xl bg-emerald-50 border-2 border-emerald-600 flex flex-col items-center justify-center shadow-xs">
              <span className="text-micro font-bold text-emerald-800">Area = 81</span>
              <span className="text-small font-black text-emerald-950">9 × 9</span>
            </div>

            <div className="text-left flex flex-col gap-1 text-micro font-bold text-slate-700">
              <div className="text-emerald-700">Physical side length must be positive!</div>
              <div className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-900 border border-emerald-200 font-mono text-micro font-black">
                √81 = +9 (Principal Root)
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-4 font-mono text-small font-bold">
              <span className="px-2.5 py-1 rounded-xl bg-slate-100 border text-slate-700">
                (+9)² = 81
              </span>
              <span className="text-slate-400">and</span>
              <span className="px-2.5 py-1 rounded-xl bg-slate-100 border text-slate-700">
                (-9)² = 81
              </span>
            </div>
            <div className="px-3 py-1 rounded-xl bg-sky-50 border border-sky-300 text-sky-950 text-micro font-bold">
              By mathematical definition, the radical sign <Katex latex="\sqrt{81}" /> denotes ONLY the positive root (+9).
            </div>
          </div>
        )}
      </div>

      {/* 4. Insight */}
      <div className="px-3 py-1 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-950 font-bold text-micro shrink-0">
        Every perfect square has two roots ($\pm 9$), but the principal square root is strictly <strong>+9 only</strong>!
      </div>

      {/* 5. Footer */}
      <div className="pt-1.5 border-t border-slate-200/70 flex items-center justify-between gap-2 shrink-0">
        <span className="text-micro font-bold text-emerald-700">
          ✓ Principal square root is +9 only!
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
// SCENE 7: PRIME FACTORISATION OF 144 (scene-7-qc-1)
// -----------------------------------------------------------------------------
export const PrimeFactorPairGroupingVisualizer: React.FC<QuickCheckVisualizerStageProps> = ({
  onNext,
  onReset,
  isCorrect,
  isLastQuestion,
}) => {
  const [stepStage, setStepStage] = useState<number>(2); // 0: Raw, 1: Paired, 2: Extracted

  return (
    <div
      aria-label="Prime Factor Pair Grouping Visualizer"
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
            {isCorrect ? '✓ Right! Prime Factor Method' : 'Review — Prime Factors of 144'}
          </span>
          <span className="px-2 py-0.5 rounded-md bg-white border border-slate-200/80 text-micro font-bold text-[#005583] tabular-nums">
            √144 = 12
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
        <span className="font-bold text-slate-600">Method step:</span>
        <div className="flex items-center gap-1 bg-white p-0.5 rounded-xl border border-slate-200/80">
          {['1. Prime Factors', '2. Pair Up', '3. Root Extraction'].map((label, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setStepStage(idx)}
              className={`px-2.5 py-0.5 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                stepStage === idx
                  ? 'bg-[#005583] text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Factors Stage */}
      <div className="w-full flex-1 min-h-[110px] max-h-[175px] bg-white rounded-2xl border border-slate-200/80 p-2 flex flex-col items-center justify-center gap-2.5 shadow-2xs overflow-hidden">
        {stepStage === 0 ? (
          <div className="font-mono text-small font-bold text-slate-800">
            144 = 2 × 2 × 2 × 2 × 3 × 3
          </div>
        ) : stepStage === 1 ? (
          <div className="flex items-center gap-2 font-mono text-small font-bold">
            <span className="px-2.5 py-1 rounded-xl bg-sky-100 text-sky-900 border border-sky-300">
              (2 × 2)
            </span>
            <span>×</span>
            <span className="px-2.5 py-1 rounded-xl bg-sky-100 text-sky-900 border border-sky-300">
              (2 × 2)
            </span>
            <span>×</span>
            <span className="px-2.5 py-1 rounded-xl bg-amber-100 text-amber-900 border border-amber-300">
              (3 × 3)
            </span>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-2 font-mono text-small font-bold">
              <span className="px-2 py-0.5 rounded bg-sky-100 text-sky-900 border">2</span>
              <span>×</span>
              <span className="px-2 py-0.5 rounded bg-sky-100 text-sky-900 border">2</span>
              <span>×</span>
              <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-900 border">3</span>
              <ArrowRight className="w-4 h-4 text-slate-400" />
              <span className="px-3 py-1 rounded-xl bg-emerald-600 text-white font-black text-statement shadow-xs">
                12
              </span>
            </div>
            <span className="text-[11px] text-slate-500 font-medium">One factor chosen from each pair</span>
          </div>
        )}
      </div>

      {/* 4. Insight */}
      <div className="px-3 py-1 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-950 font-bold text-micro shrink-0">
        Prime factorisation groups 144 into $(2 \times 2) \times (2 \times 2) \times (3 \times 3)$. Taking one from each pair yields $2 \times 2 \times 3 = 12$!
      </div>

      {/* 5. Footer */}
      <div className="pt-1.5 border-t border-slate-200/70 flex items-center justify-between gap-2 shrink-0">
        <span className="text-micro font-bold text-emerald-700">
          ✓ √144 = 12!
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
// SCENE 8: ESTIMATING √85 (scene-8-qc-1)
// -----------------------------------------------------------------------------
export const RootSandwichNumberLineVisualizer: React.FC<QuickCheckVisualizerStageProps> = ({
  onNext,
  onReset,
  isCorrect,
  isLastQuestion,
}) => {
  return (
    <div
      aria-label="Root Estimation Sandwich Visualizer"
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
            {isCorrect ? '✓ Right! Root Estimation' : 'Review — Estimating √85'}
          </span>
          <span className="px-2 py-0.5 rounded-md bg-white border border-slate-200/80 text-micro font-bold text-[#005583] tabular-nums">
            9 &lt; √85 &lt; 10
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

      {/* 2. Number Line Squeeze Stage */}
      <div className="w-full flex-1 min-h-[110px] max-h-[175px] bg-white rounded-2xl border border-slate-200/80 p-2 flex flex-col items-center justify-center gap-3 shadow-2xs overflow-hidden">
        <div className="flex items-center justify-center gap-3 font-mono text-small sm:text-statement font-bold">
          <div className="px-3 py-1.5 rounded-xl bg-sky-50 border border-sky-300 text-sky-950 text-center">
            9² = 81
            <span className="text-[10px] text-sky-700 block font-sans font-bold">Square 9</span>
          </div>

          <div className="text-slate-400 font-black">&lt;</div>

          <div className="px-3.5 py-1.5 rounded-xl bg-amber-500 text-white text-center shadow-xs">
            85
            <span className="text-[10px] text-amber-100 block font-sans font-bold">Test Number</span>
          </div>

          <div className="text-slate-400 font-black">&lt;</div>

          <div className="px-3 py-1.5 rounded-xl bg-sky-50 border border-sky-300 text-sky-950 text-center">
            10² = 100
            <span className="text-[10px] text-sky-700 block font-sans font-bold">Square 10</span>
          </div>
        </div>

        <div className="px-3 py-1 rounded-xl bg-sky-50 border border-sky-200 text-micro font-bold text-slate-800">
          <Katex latex={`\\sqrt{81} < \\sqrt{85} < \\sqrt{100} \\implies 9 < \\sqrt{85} < 10`} />
        </div>
      </div>

      {/* 3. Insight */}
      <div className="px-3 py-1 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-950 font-bold text-micro shrink-0">
        85 lies strictly between 81 (9²) and 100 (10²). Therefore, √85 lies strictly between <strong>9 and 10</strong>!
      </div>

      {/* 4. Footer */}
      <div className="pt-1.5 border-t border-slate-200/70 flex items-center justify-between gap-2 shrink-0">
        <span className="text-micro font-bold text-emerald-700">
          ✓ √85 is between 9 and 10!
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
