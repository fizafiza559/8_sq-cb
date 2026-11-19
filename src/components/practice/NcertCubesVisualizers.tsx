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
  XCircle,
} from 'lucide-react';
import { PracticeVisualizerProps } from './NcertSquaresVisualizers';

// -----------------------------------------------------------------------------
// FIO-10: Cube Roots of 27000 and 10648
// -----------------------------------------------------------------------------
export const Fio10CubeRootsVisualizer: React.FC<PracticeVisualizerProps> = ({
  onNextQuestion,
  onResetQuestion,
  isLastQuestion,
}) => {
  const [step, setStep] = useState<number>(1);

  return (
    <div
      aria-label="FIO-10 Cube Roots Visualizer"
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
        {step === 1 && <span>Step 1: Part 1 — Split 27,000 into 27 × 1,000 $\rightarrow$ 3 × 10 = 30!</span>}
        {step === 2 && <span>Step 2: Part 2 — Prime factorise 10,648 into triplets: 2³ × 11³</span>}
        {step === 3 && <span>Step 3: Extract root of 10,648: 2 × 11 = 22!</span>}
      </div>

      {/* 3. Generative Stage */}
      <div
        onClick={() => step < 3 && setStep(step + 1)}
        className="w-full flex-1 min-h-[120px] max-h-[185px] bg-white rounded-2xl border border-slate-200/80 p-2 flex flex-col items-center justify-center gap-2 shadow-2xs overflow-hidden cursor-pointer"
      >
        {step === 1 && (
          <div className="flex flex-col items-center gap-2 animate-fade-rise">
            <div className="flex items-center gap-2 font-mono text-small font-bold">
              <span>∛(27,000) =</span>
              <span className="px-2 py-1 rounded bg-sky-50 border text-[#005583]">∛(27)</span>
              <span>×</span>
              <span className="px-2 py-1 rounded bg-sky-50 border text-[#005583]">∛(1000)</span>
            </div>
            <div className="flex items-center gap-2 font-mono text-statement font-black text-emerald-950 bg-emerald-50 px-3.5 py-1 rounded-xl border border-emerald-300">
              3 × 10 = 30
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="flex flex-col items-center gap-2 animate-fade-rise">
            <div className="font-mono text-micro font-bold text-slate-800">
              10,648 = (2 × 2 × 2) × (11 × 11 × 11)
            </div>
            <div className="flex items-center gap-2 font-mono text-small font-bold">
              <span className="px-2.5 py-1 rounded-xl bg-sky-100 text-sky-900 border">2³</span>
              <span>×</span>
              <span className="px-2.5 py-1 rounded-xl bg-amber-100 text-amber-900 border">11³</span>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="flex flex-col items-center gap-2 animate-fade-rise">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1.5 rounded-xl bg-emerald-600 text-white font-mono font-bold text-micro sm:text-small shadow-xs">
                ∛27000 = 30
              </span>
              <span className="px-3 py-1.5 rounded-xl bg-emerald-600 text-white font-mono font-bold text-micro sm:text-small shadow-xs">
                ∛10648 = 22
              </span>
            </div>
            <div className="px-3 py-1 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-950 font-bold text-micro text-center">
              Cube roots are <strong>30</strong> and <strong>22</strong>.
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
// FIO-11: Multiply 1323 to Make a Cube Number
// -----------------------------------------------------------------------------
export const Fio11Multiply1323Visualizer: React.FC<PracticeVisualizerProps> = ({
  onNextQuestion,
  onResetQuestion,
  isLastQuestion,
}) => {
  const [step, setStep] = useState<number>(1);

  return (
    <div
      aria-label="FIO-11 Multiply 1323 Visualizer"
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
        {step === 1 && <span>Step 1: Prime factors: 1323 = 3³ × 7²</span>}
        {step === 2 && <span>Step 2: Triplet test: 3 has 3 factors (✓), but 7 only has 2 factors!</span>}
        {step === 3 && <span>Step 3: Multiply by 7 $\rightarrow$ 1323 × 7 = 9261 = 21³!</span>}
      </div>

      {/* 3. Generative Stage */}
      <div
        onClick={() => step < 3 && setStep(step + 1)}
        className="w-full flex-1 min-h-[120px] max-h-[185px] bg-white rounded-2xl border border-slate-200/80 p-2 flex flex-col items-center justify-center gap-2 shadow-2xs overflow-hidden cursor-pointer"
      >
        {step === 1 && (
          <div className="font-mono text-small font-bold text-slate-800 animate-fade-rise">
            1323 = 3 × 3 × 3 × 7 × 7
          </div>
        )}

        {step === 2 && (
          <div className="flex items-center gap-2 font-mono text-micro font-bold animate-fade-rise">
            <span className="px-2.5 py-1 rounded-xl bg-emerald-100 text-emerald-900 border border-emerald-300">
              (3 × 3 × 3) ✓ Complete
            </span>
            <span>×</span>
            <span className="px-2.5 py-1 rounded-xl bg-rose-100 text-rose-900 border border-rose-300 animate-pulse">
              (7 × 7 × <span className="underline font-black text-rose-700">7?</span>) Needs one 7!
            </span>
          </div>
        )}

        {step === 3 && (
          <div className="flex flex-col items-center gap-1.5 animate-fade-rise">
            <div className="flex items-center gap-2 font-mono text-small font-bold">
              <span>1323 × 7 =</span>
              <span className="px-3.5 py-1.5 rounded-xl bg-emerald-600 text-white font-black shadow-xs">
                9261 = 21³
              </span>
            </div>
            <span className="text-micro font-bold text-emerald-800">
              Multiply by <strong>7</strong> to make a perfect cube!
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
// FIO-12: True/False Cube Reasoning (5-Beat Carousel)
// -----------------------------------------------------------------------------
export const Fio12TrueFalseVisualizer: React.FC<PracticeVisualizerProps> = ({
  onNextQuestion,
  onResetQuestion,
  isLastQuestion,
}) => {
  const [subIdx, setSubIdx] = useState<number>(0);
  const statements = [
    { text: 'Cube of any odd number is even', proof: '3³ = 27 (Odd!)', verdict: 'FALSE' },
    { text: 'No cube ends with 8', proof: '2³ = 8, 12³ = 1728 (Ends in 8!)', verdict: 'FALSE' },
    { text: 'Cube of 2-digit number may be 3-digit', proof: 'Smallest is 10³ = 1000 (4 digits!)', verdict: 'FALSE' },
    { text: 'Cube of 2-digit number may have 7+ digits', proof: 'Largest is 99³ = 970,299 (Only 6 digits!)', verdict: 'FALSE' },
    { text: 'Cubes have an odd number of factors', proof: '8 has factors [1, 2, 4, 8] (4 factors, even!)', verdict: 'FALSE' },
  ];

  const current = statements[subIdx];

  return (
    <div
      aria-label="FIO-12 True or False Cube Reasoning Visualizer"
      className="w-full h-full min-h-0 bg-slate-50/80 border border-slate-200/80 rounded-3xl p-3 sm:p-3.5 flex flex-col justify-between gap-2 overflow-hidden shadow-2xs animate-fade-rise"
    >
      {/* 1. Header & Step Bar */}
      <div className="flex items-center justify-between gap-2 pb-1.5 border-b border-slate-200/70 shrink-0">
        <div className="flex items-center gap-1">
          {statements.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setSubIdx(idx)}
              className={`px-2 py-0.5 rounded-lg text-[10px] font-extrabold cursor-pointer transition-all ${
                subIdx === idx
                  ? 'bg-rose-600 text-white shadow-2xs'
                  : 'bg-white text-slate-600 border border-slate-200'
              }`}
            >
              Statement {idx + 1}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => {
            setSubIdx(0);
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
        Testing Statement {subIdx + 1} of 5 with a direct counterexample:
      </div>

      {/* 3. Generative Stage */}
      <div
        onClick={() => setSubIdx((subIdx + 1) % statements.length)}
        className="w-full flex-1 min-h-[120px] max-h-[185px] bg-white rounded-2xl border border-slate-200/80 p-2.5 flex flex-col items-center justify-center gap-2.5 shadow-2xs overflow-hidden cursor-pointer"
      >
        <div className="text-small font-extrabold text-slate-900 text-center leading-snug">
          "{current.text}"
        </div>

        <div className="px-3.5 py-1.5 rounded-xl bg-slate-100 border text-center font-mono font-bold text-micro text-slate-800">
          Counterexample: <span className="text-[#005583]">{current.proof}</span>
        </div>

        <div className="px-4 py-1 rounded-xl bg-rose-600 text-white font-black text-small uppercase tracking-wider shadow-xs animate-bounce">
          {current.verdict}
        </div>
      </div>

      {/* 4. Footer */}
      <div className="pt-1.5 border-t border-slate-200/70 flex items-center justify-between gap-2 shrink-0">
        <span className="text-micro font-bold text-rose-700">
          All five statements are FALSE!
        </span>

        {subIdx < statements.length - 1 ? (
          <button
            type="button"
            onClick={() => setSubIdx(subIdx + 1)}
            className="min-h-[34px] px-3.5 rounded-xl bg-[#005583] hover:bg-[#003F62] text-white text-micro font-bold inline-flex items-center gap-1 cursor-pointer transition-colors shadow-2xs"
          >
            <span>Statement {subIdx + 2}</span>
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
// FIO-13: Guessing Cube Roots Without Factorisation
// -----------------------------------------------------------------------------
export const Fio13GuessCubeRootsVisualizer: React.FC<PracticeVisualizerProps> = ({
  onNextQuestion,
  onResetQuestion,
  isLastQuestion,
}) => {
  const [step, setStep] = useState<number>(1);

  return (
    <div
      aria-label="FIO-13 Guessing Cube Roots Visualizer"
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
        {step === 1 && <span>Step 1: The unique last-digit map: 1→1, 2↔8, 3↔7, 4→4, 5→5, 6→6, 9→9</span>}
        {step === 2 && <span>Step 2: Teens range (10–20): 1331 ends in 1 $\rightarrow$ 11; 4913 ends in 3 $\rightarrow$ 17</span>}
        {step === 3 && <span>Step 3: Twenties & Thirties: 12167 ends in 7 $\rightarrow$ 23; 32768 ends in 8 $\rightarrow$ 32!</span>}
      </div>

      {/* 3. Generative Stage */}
      <div
        onClick={() => step < 3 && setStep(step + 1)}
        className="w-full flex-1 min-h-[120px] max-h-[185px] bg-white rounded-2xl border border-slate-200/80 p-2 flex flex-col items-center justify-center gap-2 shadow-2xs overflow-hidden cursor-pointer"
      >
        {step === 1 && (
          <div className="flex flex-wrap items-center justify-center gap-1.5 font-mono text-micro font-bold text-slate-800 animate-fade-rise">
            <span className="px-2 py-0.5 rounded bg-sky-50 border">1³ ends in 1</span>
            <span className="px-2 py-0.5 rounded bg-amber-50 border">2³ ends in 8</span>
            <span className="px-2 py-0.5 rounded bg-amber-50 border">3³ ends in 7</span>
            <span className="px-2 py-0.5 rounded bg-sky-50 border">4³ ends in 4</span>
            <span className="px-2 py-0.5 rounded bg-sky-50 border">5³ ends in 5</span>
            <span className="px-2 py-0.5 rounded bg-sky-50 border">6³ ends in 6</span>
            <span className="px-2 py-0.5 rounded bg-amber-50 border">7³ ends in 3</span>
            <span className="px-2 py-0.5 rounded bg-amber-50 border">8³ ends in 2</span>
            <span className="px-2 py-0.5 rounded bg-sky-50 border">9³ ends in 9</span>
          </div>
        )}

        {step === 2 && (
          <div className="grid grid-cols-2 gap-3 w-full max-w-sm animate-fade-rise">
            <div className="p-2 rounded-xl bg-emerald-50 border border-emerald-300 text-center font-mono font-bold">
              <div className="text-micro text-slate-500">1,33[1]</div>
              <div className="text-small text-emerald-950 font-black mt-0.5">∛1331 = 11</div>
            </div>
            <div className="p-2 rounded-xl bg-emerald-50 border border-emerald-300 text-center font-mono font-bold">
              <div className="text-micro text-slate-500">4,91[3]</div>
              <div className="text-small text-emerald-950 font-black mt-0.5">∛4913 = 17</div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="grid grid-cols-2 gap-3 w-full max-w-sm animate-fade-rise">
            <div className="p-2 rounded-xl bg-sky-50 border border-sky-300 text-center font-mono font-bold">
              <div className="text-micro text-slate-500">12,16[7]</div>
              <div className="text-small text-sky-950 font-black mt-0.5">∛12167 = 23</div>
            </div>
            <div className="p-2 rounded-xl bg-sky-50 border border-sky-300 text-center font-mono font-bold">
              <div className="text-micro text-slate-500">32,76[8]</div>
              <div className="text-small text-sky-950 font-black mt-0.5">∛32768 = 32</div>
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
// FIO-14: Which Difference is the Greatest?
// -----------------------------------------------------------------------------
export const Fio14GreatestDifferenceVisualizer: React.FC<PracticeVisualizerProps> = ({
  onNextQuestion,
  onResetQuestion,
  isLastQuestion,
}) => {
  const [step, setStep] = useState<number>(1);

  return (
    <div
      aria-label="FIO-14 Greatest Difference Visualizer"
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
        {step === 1 && <span>Step 1: Square differences are small: 67² - 66² = 133, 43² - 42² = 85</span>}
        {step === 2 && <span>Step 2: Cube difference (ii): 43³ - 42³ = 5419</span>}
        {step === 3 && <span>Step 3: Cube difference (i): 67³ - 66³ = 13,267 (The Towering Winner)!</span>}
      </div>

      {/* 3. Generative Stage */}
      <div
        onClick={() => step < 3 && setStep(step + 1)}
        className="w-full flex-1 min-h-[120px] max-h-[185px] bg-white rounded-2xl border border-slate-200/80 p-2 flex flex-col items-center justify-center gap-2 shadow-2xs overflow-hidden cursor-pointer"
      >
        <div className="flex items-end justify-center gap-4 h-28 w-full max-w-sm px-2 animate-fade-rise">
          {/* Bar 1: 43² - 42² */}
          <div className="flex flex-col items-center gap-1">
            <span className="text-[10px] font-mono font-bold text-slate-500">85</span>
            <div className="w-12 bg-slate-200 rounded-t-md h-3" />
            <span className="text-[9px] font-mono text-slate-600">43²-42²</span>
          </div>

          {/* Bar 2: 67² - 66² */}
          <div className="flex flex-col items-center gap-1">
            <span className="text-[10px] font-mono font-bold text-slate-500">133</span>
            <div className="w-12 bg-slate-300 rounded-t-md h-4" />
            <span className="text-[9px] font-mono text-slate-600">67²-66²</span>
          </div>

          {/* Bar 3: 43³ - 42³ */}
          <div className="flex flex-col items-center gap-1">
            <span className="text-[10px] font-mono font-bold text-amber-700">
              {step >= 2 ? '5419' : '...'}
            </span>
            <div
              className={`w-12 rounded-t-md transition-all duration-300 ${
                step >= 2 ? 'bg-amber-400 h-14' : 'bg-slate-100 h-1'
              }`}
            />
            <span className="text-[9px] font-mono text-slate-600">43³-42³</span>
          </div>

          {/* Bar 4: 67³ - 66³ */}
          <div className="flex flex-col items-center gap-1">
            <span className="text-[11px] font-mono font-black text-emerald-700">
              {step >= 3 ? '13,267' : '...'}
            </span>
            <div
              className={`w-12 rounded-t-md transition-all duration-500 ${
                step >= 3 ? 'bg-emerald-600 h-24 ring-2 ring-emerald-300' : 'bg-slate-100 h-1'
              }`}
            />
            <span className="text-[9px] font-mono text-emerald-950 font-bold">67³-66³</span>
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
