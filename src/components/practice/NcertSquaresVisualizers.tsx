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
  RotateCcw,
  Sparkles,
  XCircle,
} from 'lucide-react';
import { Katex } from '../Katex';
import { PracticeQuestion } from '../../content/practiceData';

export interface PracticeVisualizerProps {
  question: PracticeQuestion;
  onNextQuestion: () => void;
  onResetQuestion: () => void;
  isLastQuestion: boolean;
}

// -----------------------------------------------------------------------------
// FIO-1: Which Numbers are Not Perfect Squares? (2032, 2048, 1027, 1089)
// -----------------------------------------------------------------------------
export const Fio1NotSquaresVisualizer: React.FC<PracticeVisualizerProps> = ({
  onNextQuestion,
  onResetQuestion,
  isLastQuestion,
}) => {
  const [step, setStep] = useState<number>(1); // 1, 2, 3
  const candidates = [
    { num: 2032, last: 2, isSq: false },
    { num: 2048, last: 8, isSq: false },
    { num: 1027, last: 7, isSq: false },
    { num: 1089, last: 9, isSq: true, root: 33 },
  ];

  return (
    <div
      aria-label="FIO-1 Not Perfect Squares Visualizer"
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

      {/* 2. Step Title & Single Action Cue */}
      <div className="text-micro font-bold text-slate-700 shrink-0">
        {step === 1 && (
          <span className="text-[#005583] flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Step 1: Look ONLY at the units (last) digit of each number</span>
          </span>
        )}
        {step === 2 && (
          <span className="text-rose-700 flex items-center gap-1">
            <XCircle className="w-3.5 h-3.5 text-rose-600" />
            <span>Step 2: Filter by the Rule — No square can ever end in 2, 3, 7, or 8!</span>
          </span>
        )}
        {step === 3 && (
          <span className="text-emerald-700 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Step 3: Verification — 1089 ends in 9 and equals 33²!</span>
          </span>
        )}
      </div>

      {/* 3. Generative Visual Stage */}
      <div
        onClick={() => step < 3 && setStep(step + 1)}
        className="w-full flex-1 min-h-[120px] max-h-[185px] bg-white rounded-2xl border border-slate-200/80 p-2 flex flex-col items-center justify-center gap-2 shadow-2xs overflow-hidden cursor-pointer"
      >
        {/* STEP 1: Spotlight on Units Digits */}
        {step === 1 && (
          <div className="grid grid-cols-4 gap-2 w-full max-w-sm">
            {candidates.map((c) => (
              <div
                key={c.num}
                className="p-2 rounded-xl bg-slate-50 border border-slate-200 text-center font-mono font-bold animate-fade-rise"
              >
                <div className="text-slate-500 text-micro">Candidate</div>
                <div className="text-small sm:text-statement text-slate-800">
                  {Math.floor(c.num / 10)}
                  <span className="text-amber-600 font-black px-1 rounded bg-amber-100 ring-2 ring-amber-400">
                    {c.last}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* STEP 2: The Filter Trays */}
        {step === 2 && (
          <div className="flex flex-col gap-2 w-full max-w-md animate-fade-rise">
            <div className="p-2 rounded-xl bg-rose-50 border border-rose-300">
              <span className="text-[10px] font-extrabold uppercase text-rose-800 block">
                ❌ Eliminated (Ends in 2, 3, 7, or 8):
              </span>
              <div className="flex items-center gap-2 mt-1">
                <span className="px-2 py-0.5 rounded bg-rose-100 text-rose-900 font-mono font-bold text-micro">
                  203<strong className="underline">2</strong>
                </span>
                <span className="px-2 py-0.5 rounded bg-rose-100 text-rose-900 font-mono font-bold text-micro">
                  204<strong className="underline">8</strong>
                </span>
                <span className="px-2 py-0.5 rounded bg-rose-100 text-rose-900 font-mono font-bold text-micro">
                  102<strong className="underline">7</strong>
                </span>
              </div>
            </div>

            <div className="p-2 rounded-xl bg-emerald-50 border border-emerald-300 flex items-center justify-between">
              <span className="text-[11px] font-bold text-emerald-900">
                Possible Square: 108<strong className="underline">9</strong> (Ends in 9)
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-200 text-emerald-950 font-black">
                Survives!
              </span>
            </div>
          </div>
        )}

        {/* STEP 3: Final Verification */}
        {step === 3 && (
          <div className="flex flex-col items-center gap-2 animate-fade-rise">
            <div className="flex items-center gap-3">
              <div className="px-4 py-2 rounded-2xl bg-emerald-600 text-white font-mono font-black text-statement shadow-xs">
                33 × 33 = 1089
              </div>
            </div>
            <div className="px-3 py-1 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-950 font-bold text-micro text-center">
              (i) 2032, (ii) 2048, and (iii) 1027 are <strong>NOT</strong> squares. Only <strong>1089</strong> is a square!
            </div>
          </div>
        )}
      </div>

      {/* 4. Footer & Next Action */}
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
// FIO-2: Which Square Ends in the Digit 4? (64², 108², 292², 36²)
// -----------------------------------------------------------------------------
export const Fio2EndsInFourVisualizer: React.FC<PracticeVisualizerProps> = ({
  onNextQuestion,
  onResetQuestion,
  isLastQuestion,
}) => {
  const [step, setStep] = useState<number>(1);

  return (
    <div
      aria-label="FIO-2 Which Square Ends in 4 Visualizer"
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
        {step === 1 && <span>Step 1: Focus only on the units digit of each base</span>}
        {step === 2 && <span>Step 2: Square each units digit to find the ending</span>}
        {step === 3 && <span>Step 3: Verification — 108² and 292² both end in 4!</span>}
      </div>

      {/* 3. Generative Stage */}
      <div
        onClick={() => step < 3 && setStep(step + 1)}
        className="w-full flex-1 min-h-[120px] max-h-[185px] bg-white rounded-2xl border border-slate-200/80 p-2 flex flex-col items-center justify-center gap-2 shadow-2xs overflow-hidden cursor-pointer"
      >
        {step === 1 && (
          <div className="grid grid-cols-4 gap-2 w-full max-w-sm animate-fade-rise">
            {[
              { base: '6', unit: '4' },
              { base: '10', unit: '8' },
              { base: '29', unit: '2' },
              { base: '3', unit: '6' },
            ].map((item, i) => (
              <div key={i} className="p-2 rounded-xl bg-slate-50 border text-center font-mono font-bold">
                <span className="opacity-30">{item.base}</span>
                <span className="text-amber-600 font-black text-small px-1 rounded bg-amber-100 ring-2 ring-amber-300">
                  {item.unit}
                </span>
                <span className="text-micro block mt-1 font-sans text-slate-500">units digit</span>
              </div>
            ))}
          </div>
        )}

        {step === 2 && (
          <div className="grid grid-cols-4 gap-2 w-full max-w-sm animate-fade-rise">
            {[
              { base: '64²', calc: '4² = 16', end: '6', match: false },
              { base: '108²', calc: '8² = 64', end: '4', match: true },
              { base: '292²', calc: '2² = 4', end: '4', match: true },
              { base: '36²', calc: '6² = 36', end: '6', match: false },
            ].map((item, i) => (
              <div
                key={i}
                className={`p-2 rounded-xl border text-center font-mono text-micro font-bold ${
                  item.match
                    ? 'bg-emerald-50 border-emerald-400 text-emerald-950 ring-2 ring-emerald-300 shadow-xs'
                    : 'bg-slate-50 border-slate-200 text-slate-500 opacity-60'
                }`}
              >
                <div className="text-slate-700">{item.base}</div>
                <div className="text-slate-600 mt-0.5">{item.calc}</div>
                <div
                  className={`mt-1 font-black text-small ${
                    item.match ? 'text-emerald-700' : 'text-slate-400'
                  }`}
                >
                  Ends in {item.end}
                </div>
              </div>
            ))}
          </div>
        )}

        {step === 3 && (
          <div className="flex flex-col items-center gap-2 animate-fade-rise">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1.5 rounded-xl bg-emerald-600 text-white font-mono font-bold text-micro sm:text-small shadow-xs">
                108² = 11,664 (ends in 4)
              </span>
              <span className="px-3 py-1.5 rounded-xl bg-emerald-600 text-white font-mono font-bold text-micro sm:text-small shadow-xs">
                292² = 85,264 (ends in 4)
              </span>
            </div>
            <div className="px-3 py-1 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-950 font-bold text-micro text-center">
              Both <strong>108²</strong> and <strong>292²</strong> have last digit 4.
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
// FIO-3: Value of 126² from 125²
// -----------------------------------------------------------------------------
export const Fio3NextSquareVisualizer: React.FC<PracticeVisualizerProps> = ({
  onNextQuestion,
  onResetQuestion,
  isLastQuestion,
}) => {
  const [step, setStep] = useState<number>(1);

  return (
    <div
      aria-label="FIO-3 126² from 125² Visualizer"
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
        {step === 1 && <span>Step 1: Start with known base square: 125² = 15,625</span>}
        {step === 2 && <span>Step 2: Add next odd number: 2n + 1 = 2(125) + 1 = 251</span>}
        {step === 3 && <span>Step 3: Sum total: 15,625 + 251 = 15,876!</span>}
      </div>

      {/* 3. Generative Stage */}
      <div
        onClick={() => step < 3 && setStep(step + 1)}
        className="w-full flex-1 min-h-[120px] max-h-[185px] bg-white rounded-2xl border border-slate-200/80 p-2 flex flex-col items-center justify-center gap-2 shadow-2xs overflow-hidden cursor-pointer"
      >
        {step === 1 && (
          <div className="flex items-center gap-3 animate-fade-rise">
            <div className="w-20 h-20 rounded-xl bg-sky-50 border-2 border-sky-400 flex flex-col items-center justify-center shadow-xs">
              <span className="text-micro font-bold text-sky-800">125 × 125</span>
              <span className="text-small font-black text-sky-950 mt-0.5">15,625</span>
            </div>
            <div className="text-micro text-slate-600 font-medium">
              Base square already known: <strong>125² = 15,625</strong>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="flex items-center gap-3 animate-fade-rise">
            <div className="relative w-20 h-20 rounded-xl bg-sky-50 border-2 border-sky-400 flex items-center justify-center">
              <span className="text-micro font-bold text-sky-800">15,625</span>
              {/* L-border */}
              <div className="absolute -top-1 -right-1 w-full h-full border-t-4 border-r-4 border-amber-500 rounded-tr-xl pointer-events-none" />
            </div>

            <div className="text-left font-mono text-micro font-bold text-slate-800">
              <div className="text-amber-600 font-extrabold">+ L-border (2n + 1):</div>
              <div>2(125) + 1 = 250 + 1 = 251</div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="flex items-center gap-2 font-mono text-small font-bold animate-fade-rise">
            <span className="px-2.5 py-1 rounded-xl bg-slate-100 border">15,625</span>
            <span>+</span>
            <span className="px-2.5 py-1 rounded-xl bg-amber-100 text-amber-950 border border-amber-300">
              251
            </span>
            <span>=</span>
            <span className="px-3.5 py-1.5 rounded-xl bg-emerald-600 text-white font-black shadow-xs">
              15,876
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

// -----------------------------------------------------------------------------
// FIO-4: Side Length of Square Area 441 m²
// -----------------------------------------------------------------------------
export const Fio4Area441Visualizer: React.FC<PracticeVisualizerProps> = ({
  onNextQuestion,
  onResetQuestion,
  isLastQuestion,
}) => {
  const [step, setStep] = useState<number>(1);

  return (
    <div
      aria-label="FIO-4 Area 441 m² Side Visualizer"
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
        {step === 1 && <span>Step 1: Set up formula: Side s = √(Area) = √441</span>}
        {step === 2 && <span>Step 2: Prime factorise 441: (3 × 7) × (3 × 7) = 21 × 21</span>}
        {step === 3 && <span>Step 3: Side length = 21 metres!</span>}
      </div>

      {/* 3. Generative Stage */}
      <div
        onClick={() => step < 3 && setStep(step + 1)}
        className="w-full flex-1 min-h-[120px] max-h-[185px] bg-white rounded-2xl border border-slate-200/80 p-2 flex flex-col items-center justify-center gap-2 shadow-2xs overflow-hidden cursor-pointer"
      >
        {step === 1 && (
          <div className="flex items-center gap-4 animate-fade-rise">
            <div className="w-20 h-20 rounded-xl bg-emerald-50 border-2 border-dashed border-emerald-500 flex flex-col items-center justify-center">
              <span className="text-micro font-bold text-emerald-800">Area = 441 m²</span>
              <span className="text-micro text-slate-500 mt-1">s = ?</span>
            </div>
            <div className="font-mono font-bold text-slate-800 text-micro">
              s² = 441 $\implies$ s = √441
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="flex flex-col items-center gap-2 animate-fade-rise">
            <div className="font-mono text-micro font-bold text-slate-800">
              441 = 3 × 3 × 7 × 7
            </div>
            <div className="flex items-center gap-2 font-mono text-micro font-bold">
              <span className="px-2.5 py-1 rounded-xl bg-sky-100 text-sky-900 border">
                (3 × 7) = 21
              </span>
              <span>×</span>
              <span className="px-2.5 py-1 rounded-xl bg-sky-100 text-sky-900 border">
                (3 × 7) = 21
              </span>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="flex items-center gap-4 animate-fade-rise">
            <div className="w-20 h-20 rounded-xl bg-emerald-50 border-2 border-emerald-600 flex flex-col items-center justify-center shadow-xs">
              <span className="text-micro font-bold text-emerald-800">Area = 441 m²</span>
              <span className="text-small font-black text-emerald-950 mt-1">21 × 21</span>
            </div>
            <div className="px-3 py-1.5 rounded-xl bg-emerald-600 text-white font-mono font-black text-statement shadow-xs">
              Side = 21 m
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
// FIO-5: Smallest Square Divisible by 4, 9, and 10
// -----------------------------------------------------------------------------
export const Fio5SmallestDivisibleSquareVisualizer: React.FC<PracticeVisualizerProps> = ({
  onNextQuestion,
  onResetQuestion,
  isLastQuestion,
}) => {
  const [step, setStep] = useState<number>(1);

  return (
    <div
      aria-label="FIO-5 Smallest Square Divisible Visualizer"
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
        {step === 1 && <span>Step 1: Compute LCM of 4, 9, 10: 2² × 3² × 5¹ = 180</span>}
        {step === 2 && <span>Step 2: Check prime powers — 5 has an odd power (5¹)!</span>}
        {step === 3 && <span>Step 3: Multiply by 5 to make power even: 180 × 5 = 900 (30²)!</span>}
      </div>

      {/* 3. Generative Stage */}
      <div
        onClick={() => step < 3 && setStep(step + 1)}
        className="w-full flex-1 min-h-[120px] max-h-[185px] bg-white rounded-2xl border border-slate-200/80 p-2 flex flex-col items-center justify-center gap-2 shadow-2xs overflow-hidden cursor-pointer"
      >
        {step === 1 && (
          <div className="flex items-center gap-2 font-mono text-micro font-bold animate-fade-rise">
            <span className="px-2 py-1 rounded-lg bg-slate-100 border">4 = 2²</span>
            <span className="px-2 py-1 rounded-lg bg-slate-100 border">9 = 3²</span>
            <span className="px-2 py-1 rounded-lg bg-slate-100 border">10 = 2 × 5</span>
            <ArrowRight className="w-4 h-4 text-slate-400" />
            <span className="px-2.5 py-1 rounded-xl bg-sky-100 text-sky-950 font-black">
              LCM = 180
            </span>
          </div>
        )}

        {step === 2 && (
          <div className="flex items-center gap-2 font-mono text-micro font-bold animate-fade-rise">
            <span className="px-2 py-1 rounded bg-emerald-50 border border-emerald-300 text-emerald-900">
              2² (Even ✓)
            </span>
            <span>×</span>
            <span className="px-2 py-1 rounded bg-emerald-50 border border-emerald-300 text-emerald-900">
              3² (Even ✓)
            </span>
            <span>×</span>
            <span className="px-2.5 py-1 rounded bg-amber-100 border border-amber-300 text-amber-950 animate-pulse">
              5¹ (ODD ✗)
            </span>
          </div>
        )}

        {step === 3 && (
          <div className="flex flex-col items-center gap-1.5 animate-fade-rise">
            <div className="flex items-center gap-2 font-mono text-micro font-bold">
              <span>180 × 5 =</span>
              <span className="px-3.5 py-1.5 rounded-xl bg-emerald-600 text-white font-black text-statement shadow-xs">
                900 = 30²
              </span>
            </div>
            <span className="text-micro font-bold text-emerald-800">
              900 is the smallest square number divisible by 4, 9, and 10!
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

// -----------------------------------------------------------------------------
// FIO-6: Multiply 9408 to Make a Perfect Square
// -----------------------------------------------------------------------------
export const Fio6Multiply9408Visualizer: React.FC<PracticeVisualizerProps> = ({
  onNextQuestion,
  onResetQuestion,
  isLastQuestion,
}) => {
  const [step, setStep] = useState<number>(1);

  return (
    <div
      aria-label="FIO-6 Multiply 9408 Visualizer"
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
        {step === 1 && <span>Step 1: Prime factorise 9408: 2⁶ × 3¹ × 7²</span>}
        {step === 2 && <span>Step 2: Identify unpaired factor — 3 has no partner!</span>}
        {step === 3 && <span>Step 3: Multiply by 3 $\rightarrow$ Product = 28,224, √28224 = 168!</span>}
      </div>

      {/* 3. Generative Stage */}
      <div
        onClick={() => step < 3 && setStep(step + 1)}
        className="w-full flex-1 min-h-[120px] max-h-[185px] bg-white rounded-2xl border border-slate-200/80 p-2 flex flex-col items-center justify-center gap-2 shadow-2xs overflow-hidden cursor-pointer"
      >
        {step === 1 && (
          <div className="flex flex-col items-center gap-1 font-mono text-micro font-bold animate-fade-rise">
            <div>9408 = 2 × 2 × 2 × 2 × 2 × 2 × 3 × 7 × 7</div>
            <div className="text-slate-500 font-sans mt-0.5">Six 2s, one 3, and two 7s</div>
          </div>
        )}

        {step === 2 && (
          <div className="flex items-center gap-2 font-mono text-micro font-bold animate-fade-rise">
            <span className="px-2 py-1 rounded bg-sky-100 text-sky-900 border">2⁶ (Paired ✓)</span>
            <span>×</span>
            <span className="px-2.5 py-1 rounded bg-rose-100 text-rose-900 border border-rose-300 animate-pulse">
              3¹ (Unpaired ✗)
            </span>
            <span>×</span>
            <span className="px-2 py-1 rounded bg-sky-100 text-sky-900 border">7² (Paired ✓)</span>
          </div>
        )}

        {step === 3 && (
          <div className="flex flex-col items-center gap-2 animate-fade-rise">
            <div className="flex items-center gap-2 font-mono text-micro font-bold">
              <span>9408 × 3 = 28,224</span>
              <ArrowRight className="w-4 h-4 text-slate-400" />
              <span className="px-3 py-1 rounded-xl bg-emerald-600 text-white font-black text-small">
                √28224 = 168
              </span>
            </div>
            <span className="text-micro font-bold text-emerald-800">
              Multiply by <strong>3</strong>. Square root of product is <strong>168</strong>!
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
