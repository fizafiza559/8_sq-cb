/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  ArrowRight,
  ChevronRight,
  Grid,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import { PracticeVisualizerProps } from './NcertSquaresVisualizers';

// -----------------------------------------------------------------------------
// FIO-7: Numbers Between Consecutive Squares
// -----------------------------------------------------------------------------
export const Fio7NumbersBetweenVisualizer: React.FC<PracticeVisualizerProps> = ({
  onNextQuestion,
  onResetQuestion,
  isLastQuestion,
}) => {
  const [step, setStep] = useState<number>(1);

  return (
    <div
      aria-label="FIO-7 Numbers Between Squares Visualizer"
      className="w-full h-full min-h-0 bg-slate-50/80 border border-slate-200/80 rounded-3xl p-3 sm:p-3.5 flex flex-col justify-between gap-2 overflow-hidden shadow-2xs animate-fade-rise"
    >
      {/* 1. Header & Step Bar */}
      <div className="flex items-center justify-between gap-2 pb-1.5 border-b border-slate-200/70 shrink-0">
        <div className="flex items-center gap-1.5">
          {[1, 2, 3].map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setStep(s)}
              className={`px-2.5 py-0.5 rounded-lg text-[11px] font-extrabold cursor-pointer transition-all ${
                step === s
                  ? 'bg-[#005583] text-white shadow-2xs'
                  : step > s
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-white text-slate-500 border border-slate-200'
              }`}
            >
              Step {s} {s === 3 ? '(Answer)' : ''}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => {
            setStep(1);
            onResetQuestion();
          }}
          className="min-h-[30px] px-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 text-slate-600 text-[11px] font-bold flex items-center gap-1 cursor-pointer transition-colors shadow-2xs"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset</span>
        </button>
      </div>

      {/* 2. Step Title */}
      <div className="text-micro font-bold text-slate-700 shrink-0">
        {step === 1 && <span>Step 1: Formula rule — Between n² and (n+1)², there are exactly 2n non-squares!</span>}
        {step === 2 && <span>Step 2: Part (i) For 16 and 17: 2 × 16 = 32 numbers</span>}
        {step === 3 && <span>Step 3: Part (ii) For 99 and 100: 2 × 99 = 198 numbers!</span>}
      </div>

      {/* 3. Generative Stage */}
      <div
        onClick={() => step < 3 && setStep(step + 1)}
        className="w-full flex-1 min-h-[120px] max-h-[185px] bg-white rounded-2xl border border-slate-200/80 p-2 flex flex-col items-center justify-center gap-2 shadow-2xs overflow-hidden cursor-pointer"
      >
        {step === 1 && (
          <div className="flex flex-col items-center gap-2 animate-fade-rise">
            <div className="flex items-center gap-2 font-mono text-small font-bold">
              <span className="px-3 py-1 rounded-xl bg-slate-100 border">n²</span>
              <span className="px-3 py-1 rounded-xl bg-sky-100 text-[#005583] font-black">
                [ 2n non-squares ]
              </span>
              <span className="px-3 py-1 rounded-xl bg-slate-100 border">(n+1)²</span>
            </div>
            <span className="text-micro text-slate-600 font-medium">
              (n+1)² - n² - 1 = (2n + 1) - 1 = <strong>2n</strong>
            </span>
          </div>
        )}

        {step === 2 && (
          <div className="flex flex-col items-center gap-2 animate-fade-rise">
            <div className="flex items-center gap-2 font-mono text-micro sm:text-small font-bold">
              <span className="px-2.5 py-1 rounded-xl bg-slate-100 border">16² = 256</span>
              <span className="px-3 py-1.5 rounded-xl bg-emerald-600 text-white font-black shadow-xs">
                2(16) = 32 numbers
              </span>
              <span className="px-2.5 py-1 rounded-xl bg-slate-100 border">17² = 289</span>
            </div>
            <span className="text-micro text-emerald-800 font-bold">
              Between 256 and 289 lie numbers 257 to 288 (32 numbers).
            </span>
          </div>
        )}

        {step === 3 && (
          <div className="flex flex-col items-center gap-2 animate-fade-rise">
            <div className="flex items-center gap-2 font-mono text-micro sm:text-small font-bold">
              <span className="px-2.5 py-1 rounded-xl bg-slate-100 border">99² = 9801</span>
              <span className="px-3 py-1.5 rounded-xl bg-emerald-600 text-white font-black shadow-xs">
                2(99) = 198 numbers
              </span>
              <span className="px-2.5 py-1 rounded-xl bg-slate-100 border">100² = 10000</span>
            </div>
            <div className="px-3 py-1 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-950 font-bold text-micro text-center">
              (i) <strong>32 numbers</strong> lie between 16² and 17². (ii) <strong>198 numbers</strong> lie between 99² and 100².
            </div>
          </div>
        )}
      </div>

      {/* 4. Footer */}
      <div className="pt-1.5 border-t border-slate-200/70 flex items-center justify-between gap-2 shrink-0">
        <span className="text-micro font-bold text-slate-600">
          {step < 3 ? 'Tap card for next step' : '✓ Solution complete!'}
        </span>

        {step < 3 ? (
          <button
            type="button"
            onClick={() => setStep(step + 1)}
            className="min-h-[34px] px-3.5 rounded-xl bg-[#005583] hover:bg-[#003F62] text-white text-micro font-bold inline-flex items-center gap-1 cursor-pointer transition-colors shadow-2xs"
          >
            <span>Step {step + 1}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        ) : (
          <button
            type="button"
            onClick={onNextQuestion}
            className="min-h-[34px] px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-micro font-bold inline-flex items-center gap-1 cursor-pointer transition-colors shadow-2xs"
          >
            <span>{!isLastQuestion ? 'Next Question' : 'Done'}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
};

// -----------------------------------------------------------------------------
// FIO-8: Fill in the Pythagorean Square Pattern
// -----------------------------------------------------------------------------
export const Fio8PythagoreanPatternVisualizer: React.FC<PracticeVisualizerProps> = ({
  onNextQuestion,
  onResetQuestion,
  isLastQuestion,
}) => {
  const [step, setStep] = useState<number>(1);

  return (
    <div
      aria-label="FIO-8 Pythagorean Square Pattern Visualizer"
      className="w-full h-full min-h-0 bg-slate-50/80 border border-slate-200/80 rounded-3xl p-3 sm:p-3.5 flex flex-col justify-between gap-2 overflow-hidden shadow-2xs animate-fade-rise"
    >
      {/* 1. Header & Step Bar */}
      <div className="flex items-center justify-between gap-2 pb-1.5 border-b border-slate-200/70 shrink-0">
        <div className="flex items-center gap-1.5">
          {[1, 2, 3].map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setStep(s)}
              className={`px-2.5 py-0.5 rounded-lg text-[11px] font-extrabold cursor-pointer transition-all ${
                step === s
                  ? 'bg-[#005583] text-white shadow-2xs'
                  : step > s
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-white text-slate-500 border border-slate-200'
              }`}
            >
              Step {s} {s === 3 ? '(Answer)' : ''}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => {
            setStep(1);
            onResetQuestion();
          }}
          className="min-h-[30px] px-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 text-slate-600 text-[11px] font-bold flex items-center gap-1 cursor-pointer transition-colors shadow-2xs"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset</span>
        </button>
      </div>

      {/* 2. Step Title */}
      <div className="text-micro font-bold text-slate-700 shrink-0">
        {step === 1 && <span>Step 1: First two terms are consecutive: n and n+1 (e.g. 4 and 5)</span>}
        {step === 2 && <span>Step 2: The 3rd term is their product: 4 × 5 = 20²</span>}
        {step === 3 && <span>Step 3: The right side is 1 more than 3rd term: 20 + 1 = 21²!</span>}
      </div>

      {/* 3. Generative Stage */}
      <div
        onClick={() => step < 3 && setStep(step + 1)}
        className="w-full flex-1 min-h-[120px] max-h-[185px] bg-white rounded-2xl border border-slate-200/80 p-2 flex flex-col items-center justify-center gap-2 shadow-2xs overflow-hidden cursor-pointer"
      >
        <div className="flex flex-col gap-1.5 font-mono text-micro sm:text-small font-bold text-slate-800 animate-fade-rise">
          <div>1² + 2² + 2² = 3²</div>
          <div>2² + 3² + 6² = 7²</div>
          <div>3² + 4² + 12² = 13²</div>

          {/* Target Line 1 */}
          <div className="flex items-center gap-1.5">
            <span>4² + 5² +</span>
            <span
              className={`px-2 py-0.5 rounded-lg border transition-all ${
                step >= 2
                  ? 'bg-amber-100 text-amber-950 border-amber-300 font-black'
                  : 'bg-slate-100 text-slate-400 border-dashed'
              }`}
            >
              {step >= 2 ? '20²' : '___²'}
            </span>
            <span>=</span>
            <span
              className={`px-2 py-0.5 rounded-lg border transition-all ${
                step >= 3
                  ? 'bg-emerald-600 text-white font-black'
                  : 'bg-slate-100 text-slate-400 border-dashed'
              }`}
            >
              {step >= 3 ? '21²' : '___²'}
            </span>
          </div>

          {/* Target Line 2 */}
          <div className="flex items-center gap-1.5">
            <span>9² + 10² +</span>
            <span
              className={`px-2 py-0.5 rounded-lg border transition-all ${
                step >= 2
                  ? 'bg-amber-100 text-amber-950 border-amber-300 font-black'
                  : 'bg-slate-100 text-slate-400 border-dashed'
              }`}
            >
              {step >= 2 ? '90²' : '___²'}
            </span>
            <span>=</span>
            <span
              className={`px-2 py-0.5 rounded-lg border transition-all ${
                step >= 3
                  ? 'bg-emerald-600 text-white font-black'
                  : 'bg-slate-100 text-slate-400 border-dashed'
              }`}
            >
              {step >= 3 ? '91²' : '___²'}
            </span>
          </div>
        </div>
      </div>

      {/* 4. Footer */}
      <div className="pt-1.5 border-t border-slate-200/70 flex items-center justify-between gap-2 shrink-0">
        <span className="text-micro font-bold text-slate-600">
          {step < 3 ? 'Tap card for next step' : '✓ Solution complete!'}
        </span>

        {step < 3 ? (
          <button
            type="button"
            onClick={() => setStep(step + 1)}
            className="min-h-[34px] px-3.5 rounded-xl bg-[#005583] hover:bg-[#003F62] text-white text-micro font-bold inline-flex items-center gap-1 cursor-pointer transition-colors shadow-2xs"
          >
            <span>Step {step + 1}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        ) : (
          <button
            type="button"
            onClick={onNextQuestion}
            className="min-h-[34px] px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-micro font-bold inline-flex items-center gap-1 cursor-pointer transition-colors shadow-2xs"
          >
            <span>{!isLastQuestion ? 'Next Question' : 'Done'}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
};

// -----------------------------------------------------------------------------
// FIO-9: Tiny Squares and Prime Factorisation
// -----------------------------------------------------------------------------
export const Fio9TinySquaresVisualizer: React.FC<PracticeVisualizerProps> = ({
  onNextQuestion,
  onResetQuestion,
  isLastQuestion,
}) => {
  const [step, setStep] = useState<number>(1);

  return (
    <div
      aria-label="FIO-9 Tiny Squares Visualizer"
      className="w-full h-full min-h-0 bg-slate-50/80 border border-slate-200/80 rounded-3xl p-3 sm:p-3.5 flex flex-col justify-between gap-2 overflow-hidden shadow-2xs animate-fade-rise"
    >
      {/* 1. Header & Step Bar */}
      <div className="flex items-center justify-between gap-2 pb-1.5 border-b border-slate-200/70 shrink-0">
        <div className="flex items-center gap-1.5">
          {[1, 2, 3].map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setStep(s)}
              className={`px-2.5 py-0.5 rounded-lg text-[11px] font-extrabold cursor-pointer transition-all ${
                step === s
                  ? 'bg-[#005583] text-white shadow-2xs'
                  : step > s
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-white text-slate-500 border border-slate-200'
              }`}
            >
              Step {s} {s === 3 ? '(Answer)' : ''}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => {
            setStep(1);
            onResetQuestion();
          }}
          className="min-h-[30px] px-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 text-slate-600 text-[11px] font-bold flex items-center gap-1 cursor-pointer transition-colors shadow-2xs"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset</span>
        </button>
      </div>

      {/* 2. Step Title */}
      <div className="text-micro font-bold text-slate-700 shrink-0">
        {step === 1 && <span>Step 1: Big squares = 9 × 9 = 81 big squares</span>}
        {step === 2 && <span>Step 2: Multiply by tiny squares: 81 × 25 = 2025 tiny squares</span>}
        {step === 3 && <span>Step 3: Prime factorisation: 3⁴ × 5² = (3² × 5)² = 45²!</span>}
      </div>

      {/* 3. Generative Stage */}
      <div
        onClick={() => step < 3 && setStep(step + 1)}
        className="w-full flex-1 min-h-[120px] max-h-[185px] bg-white rounded-2xl border border-slate-200/80 p-2 flex flex-col items-center justify-center gap-2 shadow-2xs overflow-hidden cursor-pointer"
      >
        {step === 1 && (
          <div className="flex items-center gap-4 animate-fade-rise">
            <div className="w-16 h-16 rounded-xl bg-sky-50 border-2 border-sky-400 flex items-center justify-center">
              <Grid className="w-8 h-8 text-[#005583]" />
            </div>
            <div className="font-mono text-small font-bold text-slate-800">
              9 rows × 9 cols = 81 big squares
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="flex items-center gap-3 animate-fade-rise">
            <div className="px-3 py-1.5 rounded-xl bg-slate-100 border text-center font-mono font-bold text-micro">
              81 Big Squares
            </div>
            <span className="text-slate-400 font-bold">×</span>
            <div className="px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-300 text-amber-950 font-mono font-bold text-micro">
              25 Tiny Each
            </div>
            <span className="text-slate-400 font-bold">=</span>
            <div className="px-3.5 py-1.5 rounded-xl bg-emerald-600 text-white font-mono font-black text-small shadow-xs">
              2025
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="flex flex-col items-center gap-1.5 animate-fade-rise">
            <div className="flex items-center gap-2 font-mono text-small font-bold">
              <span>2025 = 3⁴ × 5² =</span>
              <span className="px-3 py-1 rounded-xl bg-emerald-600 text-white font-black shadow-xs">
                45²
              </span>
            </div>
            <span className="text-micro font-bold text-emerald-800">
              Even prime exponents confirm 2025 is a perfect square!
            </span>
          </div>
        )}
      </div>

      {/* 4. Footer */}
      <div className="pt-1.5 border-t border-slate-200/70 flex items-center justify-between gap-2 shrink-0">
        <span className="text-micro font-bold text-slate-600">
          {step < 3 ? 'Tap card for next step' : '✓ Solution complete!'}
        </span>

        {step < 3 ? (
          <button
            type="button"
            onClick={() => setStep(step + 1)}
            className="min-h-[34px] px-3.5 rounded-xl bg-[#005583] hover:bg-[#003F62] text-white text-micro font-bold inline-flex items-center gap-1 cursor-pointer transition-colors shadow-2xs"
          >
            <span>Step {step + 1}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        ) : (
          <button
            type="button"
            onClick={onNextQuestion}
            className="min-h-[34px] px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-micro font-bold inline-flex items-center gap-1 cursor-pointer transition-colors shadow-2xs"
          >
            <span>{!isLastQuestion ? 'Next Question' : 'Done'}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
};
