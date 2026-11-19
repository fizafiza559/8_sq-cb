/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  ArrowRight,
  Box,
  CheckCircle2,
  ChevronRight,
  RotateCcw,
  Sparkles,
  XCircle,
} from 'lucide-react';
import { PracticeVisualizerProps } from './NcertSquaresVisualizers';

// -----------------------------------------------------------------------------
// Helper: Card Frame for Solved Examples
// -----------------------------------------------------------------------------
interface SolvedFrameProps {
  title: string;
  badge: string;
  cue: React.ReactNode;
  step: 1 | 2 | 3;
  setStep: React.Dispatch<React.SetStateAction<1 | 2 | 3>>;
  onNextQuestion: () => void;
  onResetQuestion: () => void;
  isLastQuestion: boolean;
  children: React.ReactNode;
}

const SolvedFrame: React.FC<SolvedFrameProps> = ({
  title,
  badge,
  cue,
  step,
  setStep,
  onNextQuestion,
  onResetQuestion,
  isLastQuestion,
  children,
}) => {
  const advance = () => {
    if (step < 3) setStep((s) => (s + 1) as 1 | 2 | 3);
  };

  const stepLabels = ['Step 1', 'Step 2', 'Step 3 (Answer)'];

  return (
    <div className="w-full h-full min-h-0 bg-slate-50/80 border border-slate-200/80 rounded-3xl p-3 sm:p-3.5 flex flex-col justify-between gap-1.5 overflow-hidden shadow-2xs animate-fade-rise">
      {/* Header Bar */}
      <div className="flex items-center justify-between gap-2 pb-1 border-b border-slate-200/70 shrink-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-micro font-extrabold uppercase tracking-wider text-[#005583]">
            {title}
          </span>
          <span className="px-2 py-0.5 rounded-md bg-white border border-slate-200/80 text-[11px] font-bold text-slate-700 tabular-nums">
            {badge}
          </span>
        </div>
        <button
          type="button"
          onClick={() => {
            setStep(1);
            onResetQuestion();
          }}
          className="min-h-[28px] px-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 text-slate-600 text-[11px] font-bold flex items-center gap-1 cursor-pointer transition-colors shadow-2xs"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset</span>
        </button>
      </div>

      {/* Step Scrubber */}
      <div className="flex items-center gap-1.5 shrink-0 py-0.5">
        {stepLabels.map((label, idx) => {
          const stepNum = (idx + 1) as 1 | 2 | 3;
          const isActive = step === stepNum;
          const isPast = step > stepNum;
          return (
            <React.Fragment key={stepNum}>
              <button
                type="button"
                onClick={() => isPast && setStep(stepNum)}
                className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border transition-all ${
                  isActive
                    ? 'bg-[#005583] text-white border-[#003F62] shadow-2xs'
                    : isPast
                    ? 'bg-white border-slate-200 text-[#005583] cursor-pointer hover:bg-slate-50'
                    : 'bg-slate-100 border-slate-200 text-slate-400 cursor-default'
                }`}
              >
                {label}
              </button>
              {idx < 2 && <span className="text-slate-300 text-[11px]">→</span>}
            </React.Fragment>
          );
        })}
      </div>

      {/* Single Action Cue */}
      <div className="text-micro font-bold text-slate-700 shrink-0 min-h-[20px] flex items-center">
        {cue}
      </div>

      {/* Central Canvas */}
      <div
        onClick={advance}
        title={step < 3 ? 'Tap anywhere to advance →' : undefined}
        className="w-full flex-1 min-h-[110px] max-h-[175px] bg-white rounded-2xl border border-slate-200/80 p-2 flex flex-col items-center justify-center gap-2 shadow-2xs overflow-hidden cursor-pointer select-none transition-colors duration-200 hover:border-[#005583]/40"
      >
        {children}
      </div>

      {/* Footer Navigation */}
      <div className="pt-1 border-t border-slate-200/70 flex items-center justify-between gap-2 shrink-0">
        <span className="text-micro font-bold text-slate-600 truncate">
          {step < 3 ? 'Tap canvas or click next step' : '✓ Solution verified!'}
        </span>
        {step < 3 ? (
          <button
            type="button"
            onClick={advance}
            className="min-h-[32px] px-3.5 rounded-xl bg-[#005583] hover:bg-[#003F62] text-white text-micro font-bold inline-flex items-center gap-1 cursor-pointer transition-colors shadow-2xs"
          >
            <span>Step {step + 1}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        ) : (
          <button
            type="button"
            onClick={onNextQuestion}
            className="min-h-[32px] px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-micro font-bold inline-flex items-center gap-1 cursor-pointer transition-colors shadow-2xs"
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
// EX-1: Area of Squares with Fraction or Decimal Sides (3/5 and 2.5)
// -----------------------------------------------------------------------------
export const Ex1FractionDecimalSquareVisualizer: React.FC<PracticeVisualizerProps> = (props) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const cues: Record<1 | 2 | 3, React.ReactNode> = {
    1: <span>Step 1: Can square sides be fractions or decimals? Yes, any real length!</span>,
    2: <span>Step 2: (3/5)² = (3×3)/(5×5) = 9/25. (2.5)² = 2.5 × 2.5 = 6.25.</span>,
    3: <span className="text-emerald-700">Step 3: Areas are 9/25 sq units and 6.25 sq units!</span>,
  };

  return (
    <SolvedFrame title="Worked Example 1" badge="Fraction & Decimal Squares" cue={cues[step]} step={step} setStep={setStep} {...props}>
      {step === 1 && (
        <div className="flex items-center gap-4 font-mono font-bold animate-fade-rise">
          <div className="p-2 rounded-xl bg-sky-50 border border-sky-300 text-center">
            <span className="text-[10px] text-sky-700 block">Fraction Side</span>
            <span className="text-statement text-sky-950 font-black">3/5</span>
          </div>
          <span className="text-slate-400">and</span>
          <div className="p-2 rounded-xl bg-amber-50 border border-amber-300 text-center">
            <span className="text-[10px] text-amber-700 block">Decimal Side</span>
            <span className="text-statement text-amber-950 font-black">2.5</span>
          </div>
        </div>
      )}
      {step === 2 && (
        <div className="flex flex-col gap-2 font-mono text-micro font-bold animate-fade-rise">
          <div className="p-1.5 rounded-lg bg-sky-50 border border-sky-200">
            (3/5)² = (3/5) × (3/5) = <strong className="text-[#005583]">9/25</strong>
          </div>
          <div className="p-1.5 rounded-lg bg-amber-50 border border-amber-200">
            (2.5)² = 2.5 × 2.5 = <strong className="text-amber-800">6.25</strong>
          </div>
        </div>
      )}
      {step === 3 && (
        <div className="flex flex-col items-center gap-1.5 animate-fade-rise font-mono">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1.5 rounded-xl bg-emerald-600 text-white font-black text-small">
              (3/5)² = 9/25
            </span>
            <span className="px-3 py-1.5 rounded-xl bg-emerald-600 text-white font-black text-small">
              (2.5)² = 6.25
            </span>
          </div>
          <span className="text-micro text-emerald-950 font-bold">
            Only squares of natural numbers (1, 4, 9...) are called "perfect squares"!
          </span>
        </div>
      )}
    </SolvedFrame>
  );
};

// -----------------------------------------------------------------------------
// EX-2: Find 36² from 35² = 1225
// -----------------------------------------------------------------------------
export const Ex2NextSquareVisualizer: React.FC<PracticeVisualizerProps> = (props) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const cues: Record<1 | 2 | 3, React.ReactNode> = {
    1: <span>Step 1: Start with known square: 35² = 1225.</span>,
    2: <span>Step 2: Add next odd number: 2n + 1 = 2(35) + 1 = 71!</span>,
    3: <span className="text-emerald-700">Step 3: 1225 + 71 = 1296 = 36²!</span>,
  };

  return (
    <SolvedFrame title="Worked Example 2" badge="Find 36² from 35²" cue={cues[step]} step={step} setStep={setStep} {...props}>
      {step === 1 && (
        <div className="flex items-center gap-3 font-mono font-bold animate-fade-rise">
          <div className="w-20 h-20 rounded-xl bg-sky-50 border-2 border-sky-400 flex flex-col items-center justify-center">
            <span className="text-[10px] text-sky-700">35 × 35</span>
            <span className="text-small font-black text-sky-950">1225</span>
          </div>
          <span className="text-micro text-slate-600 font-medium">
            Base square: 35² = 1225
          </span>
        </div>
      )}
      {step === 2 && (
        <div className="flex items-center gap-3 font-mono text-micro font-bold animate-fade-rise">
          <span className="px-2.5 py-1 rounded-xl bg-slate-100 border">1225</span>
          <span>+</span>
          <span className="px-3 py-1.5 rounded-xl bg-amber-100 text-amber-950 border border-amber-400 font-black">
            2(35) + 1 = 71
          </span>
        </div>
      )}
      {step === 3 && (
        <div className="flex flex-col items-center gap-1.5 animate-fade-rise font-mono">
          <div className="px-5 py-2 rounded-2xl bg-emerald-600 text-white font-black text-statement shadow-xs">
            36² = 1225 + 71 = 1296
          </div>
          <span className="text-micro font-bold text-emerald-950">
            Adding 2n + 1 always yields the next consecutive square!
          </span>
        </div>
      )}
    </SolvedFrame>
  );
};

// -----------------------------------------------------------------------------
// EX-3: Repeated Subtraction Test: 25 vs 38
// -----------------------------------------------------------------------------
export const Ex3RepeatedSubtractionVisualizer: React.FC<PracticeVisualizerProps> = (props) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const cues: Record<1 | 2 | 3, React.ReactNode> = {
    1: <span>Step 1: Test 25: 25 - 1 - 3 - 5 - 7 - 9 = 0 (Hits 0 in 5 steps!).</span>,
    2: <span>Step 2: Test 38: 38 - 1 - 3 - 5 - 7 - 9 - 11 = 2, then 2 - 13 = -11 (Misses 0!).</span>,
    3: <span className="text-emerald-700">Step 3: 25 = 5² (square); 38 is NOT a square!</span>,
  };

  return (
    <SolvedFrame title="Worked Example 3" badge="Repeated Subtraction" cue={cues[step]} step={step} setStep={setStep} {...props}>
      {step === 1 && (
        <div className="flex flex-col items-center gap-1.5 font-mono text-micro font-bold animate-fade-rise">
          <span className="text-slate-800 text-small font-black">25 reaches 0:</span>
          <span className="text-[#005583]">25 - 1 = 24 → 24 - 3 = 21 → 21 - 5 = 16 → 16 - 7 = 9 → 9 - 9 = 0 ✓</span>
          <span className="text-emerald-700 font-extrabold">5 steps = 5² = 25!</span>
        </div>
      )}
      {step === 2 && (
        <div className="flex flex-col items-center gap-1.5 font-mono text-micro font-bold animate-fade-rise">
          <span className="text-slate-800 text-small font-black">38 misses 0:</span>
          <span className="text-slate-600">38 - 1 = 37 ... - 11 = 2 → 2 - 13 = -11 ✗</span>
          <span className="text-rose-600 font-extrabold">Skips over 0!</span>
        </div>
      )}
      {step === 3 && (
        <div className="flex flex-col items-center gap-1.5 animate-fade-rise font-mono">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1.5 rounded-xl bg-emerald-600 text-white font-black text-small">
              25 = 5² (Square)
            </span>
            <span className="px-3 py-1.5 rounded-xl bg-rose-600 text-white font-black text-small">
              38 ≠ Square
            </span>
          </div>
          <span className="text-micro font-bold text-slate-700">
            A number is a square if and only if repeated odd subtraction reaches exactly 0!
          </span>
        </div>
      )}
    </SolvedFrame>
  );
};

// -----------------------------------------------------------------------------
// EX-4: Square Roots and Plus-Minus Roots
// -----------------------------------------------------------------------------
export const Ex4SquareRootsPlusMinusVisualizer: React.FC<PracticeVisualizerProps> = (props) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const cues: Record<1 | 2 | 3, React.ReactNode> = {
    1: <span>Step 1: (+8)² = 64 and (−8)² = 64. Both square to 64!</span>,
    2: <span>Step 2: (+10)² = 100 and (−10)² = 100. Both square to 100!</span>,
    3: <span className="text-emerald-700">Step 3: Square roots are ±8 and ±10!</span>,
  };

  return (
    <SolvedFrame title="Worked Example 4" badge="Plus-Minus Square Roots" cue={cues[step]} step={step} setStep={setStep} {...props}>
      {step === 1 && (
        <div className="flex items-center gap-3 font-mono font-bold animate-fade-rise">
          <span className="px-3 py-1.5 rounded-xl bg-sky-100 text-[#005583] border">(+8)² = 64</span>
          <span className="text-slate-400">and</span>
          <span className="px-3 py-1.5 rounded-xl bg-purple-100 text-purple-950 border">(−8)² = 64</span>
        </div>
      )}
      {step === 2 && (
        <div className="flex items-center gap-3 font-mono font-bold animate-fade-rise">
          <span className="px-3 py-1.5 rounded-xl bg-sky-100 text-[#005583] border">(+10)² = 100</span>
          <span className="text-slate-400">and</span>
          <span className="px-3 py-1.5 rounded-xl bg-purple-100 text-purple-950 border">(−10)² = 100</span>
        </div>
      )}
      {step === 3 && (
        <div className="flex flex-col items-center gap-1.5 animate-fade-rise font-mono">
          <div className="px-5 py-2 rounded-2xl bg-emerald-600 text-white font-black text-statement shadow-xs">
            Roots of 64 are ±8; Roots of 100 are ±10
          </div>
          <span className="text-micro font-bold text-emerald-950">
            Every positive square number has two roots: one positive, one negative!
          </span>
        </div>
      )}
    </SolvedFrame>
  );
};

// -----------------------------------------------------------------------------
// EX-5: Testing Squareness: 576 vs 327
// -----------------------------------------------------------------------------
export const Ex5TestingSquarenessVisualizer: React.FC<PracticeVisualizerProps> = (props) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const cues: Record<1 | 2 | 3, React.ReactNode> = {
    1: <span>Step 1: Inspect units digits: 327 ends in 7, 576 ends in 6.</span>,
    2: <span>Step 2: 7 is forbidden! No square ever ends in 2, 3, 7, or 8!</span>,
    3: <span className="text-emerald-700">Step 3: 327 is NOT a square. 576 = 24² is a square!</span>,
  };

  return (
    <SolvedFrame title="Worked Example 5" badge="Testing 576 vs 327" cue={cues[step]} step={step} setStep={setStep} {...props}>
      {step === 1 && (
        <div className="flex items-center gap-4 font-mono font-bold animate-fade-rise">
          <div className="p-2 rounded-xl bg-slate-100 border text-center">
            <span className="text-statement font-black text-slate-800">
              32<span className="text-rose-600 underline">7</span>
            </span>
          </div>
          <span className="text-slate-400">vs</span>
          <div className="p-2 rounded-xl bg-slate-100 border text-center">
            <span className="text-statement font-black text-slate-800">
              57<span className="text-emerald-600 underline">6</span>
            </span>
          </div>
        </div>
      )}
      {step === 2 && (
        <div className="flex flex-col gap-1.5 w-full max-w-sm font-mono text-micro font-bold animate-fade-rise">
          <div className="p-1.5 rounded-lg bg-rose-50 border border-rose-300 text-rose-900">
            ❌ 327 ends in 7 → Instantly eliminated!
          </div>
          <div className="p-1.5 rounded-lg bg-emerald-50 border border-emerald-300 text-emerald-900">
            ✓ 576 ends in 6 → Test 24 × 24 = 576!
          </div>
        </div>
      )}
      {step === 3 && (
        <div className="flex flex-col items-center gap-1.5 animate-fade-rise font-mono">
          <div className="px-5 py-2 rounded-2xl bg-emerald-600 text-white font-black text-statement shadow-xs">
            576 = 24² ✓
          </div>
          <span className="text-micro font-bold text-slate-700">
            327 can NEVER be a square. 576 is the square of 24!
          </span>
        </div>
      )}
    </SolvedFrame>
  );
};

// -----------------------------------------------------------------------------
// EX-6: Prime Factorisation: 324 vs 156
// -----------------------------------------------------------------------------
export const Ex6PrimeFactorisationVisualizer: React.FC<PracticeVisualizerProps> = (props) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const cues: Record<1 | 2 | 3, React.ReactNode> = {
    1: <span>Step 1: 324 = (2×2) × (3×3) × (3×3). All factors pair up!</span>,
    2: <span>Step 2: 156 = (2×2) × 3 × 13. Factors 3 and 13 are unpaired!</span>,
    3: <span className="text-emerald-700">Step 3: 324 = 18² (square); 156 is NOT a square!</span>,
  };

  return (
    <SolvedFrame title="Worked Example 6" badge="Prime Pairs: 324 vs 156" cue={cues[step]} step={step} setStep={setStep} {...props}>
      {step === 1 && (
        <div className="flex flex-col items-center gap-1 font-mono text-micro font-bold animate-fade-rise">
          <div className="text-small font-black text-emerald-900">324 Prime Pairs:</div>
          <div className="flex items-center gap-1.5">
            <span className="px-2 py-1 rounded bg-sky-100 text-[#005583] border">(2×2)</span>
            <span className="px-2 py-1 rounded bg-sky-100 text-[#005583] border">(3×3)</span>
            <span className="px-2 py-1 rounded bg-sky-100 text-[#005583] border">(3×3)</span>
          </div>
          <span className="text-emerald-700">All primes grouped in pairs ✓</span>
        </div>
      )}
      {step === 2 && (
        <div className="flex flex-col items-center gap-1 font-mono text-micro font-bold animate-fade-rise">
          <div className="text-small font-black text-rose-900">156 Prime Breakdown:</div>
          <div className="flex items-center gap-1.5">
            <span className="px-2 py-1 rounded bg-sky-100 border">(2×2)</span>
            <span>×</span>
            <span className="px-2 py-1 rounded bg-rose-100 text-rose-900 border border-rose-300">3 (alone)</span>
            <span>×</span>
            <span className="px-2 py-1 rounded bg-rose-100 text-rose-900 border border-rose-300">13 (alone)</span>
          </div>
          <span className="text-rose-600">Cannot pair up factors ✗</span>
        </div>
      )}
      {step === 3 && (
        <div className="flex flex-col items-center gap-1.5 animate-fade-rise font-mono">
          <div className="px-5 py-2 rounded-2xl bg-emerald-600 text-white font-black text-statement shadow-xs">
            √324 = 2 × 3 × 3 = 18
          </div>
          <span className="text-micro font-bold text-slate-700">
            324 is a perfect square; 156 is not a perfect square!
          </span>
        </div>
      )}
    </SolvedFrame>
  );
};

// -----------------------------------------------------------------------------
// EX-7: Checking 1156 and 2800
// -----------------------------------------------------------------------------
export const Ex7Checking1156And2800Visualizer: React.FC<PracticeVisualizerProps> = (props) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const cues: Record<1 | 2 | 3, React.ReactNode> = {
    1: <span>Step 1: 1156 = 2² × 17² = (2 × 17)² = 34² (Paired!).</span>,
    2: <span>Step 2: 2800 = 2⁴ × 5² × 7. Prime 7 is lonely (unpaired)!</span>,
    3: <span className="text-emerald-700">Step 3: 1156 is a square (34²); 2800 is NOT a square!</span>,
  };

  return (
    <SolvedFrame title="Worked Example 7" badge="1156 vs 2800" cue={cues[step]} step={step} setStep={setStep} {...props}>
      {step === 1 && (
        <div className="flex flex-col items-center gap-1 font-mono text-micro font-bold animate-fade-rise">
          <span className="text-small font-black text-emerald-900">1156 = 2² × 17²</span>
          <span className="text-[#005583]">√1156 = 2 × 17 = 34 ✓</span>
        </div>
      )}
      {step === 2 && (
        <div className="flex flex-col items-center gap-1 font-mono text-micro font-bold animate-fade-rise">
          <span className="text-small font-black text-rose-900">2800 = 2⁴ × 5² × 7</span>
          <span className="text-rose-600">Prime 7 is not paired ✗</span>
        </div>
      )}
      {step === 3 && (
        <div className="flex flex-col items-center gap-1.5 animate-fade-rise font-mono">
          <div className="px-5 py-2 rounded-2xl bg-emerald-600 text-white font-black text-statement shadow-xs">
            1156 = 34² (Square)
          </div>
          <span className="text-micro font-bold text-slate-700">
            2800 cannot be a square because 7 has no partner!
          </span>
        </div>
      )}
    </SolvedFrame>
  );
};

// -----------------------------------------------------------------------------
// EX-8: Estimating Square Root of 1936
// -----------------------------------------------------------------------------
export const Ex8EstimatingRoot1936Visualizer: React.FC<PracticeVisualizerProps> = (props) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const cues: Record<1 | 2 | 3, React.ReactNode> = {
    1: <span>Step 1: 40² = 1600 &lt; 1936 &lt; 2500 = 50² $\rightarrow$ root is in 40s.</span>,
    2: <span>Step 2: Ends in 6 $\rightarrow$ either 44 or 46. Test 45² = 2025 &gt; 1936!</span>,
    3: <span className="text-emerald-700">Step 3: Since 1936 &lt; 2025, √1936 must be 44!</span>,
  };

  return (
    <SolvedFrame title="Worked Example 8" badge="Estimating √1936" cue={cues[step]} step={step} setStep={setStep} {...props}>
      {step === 1 && (
        <div className="flex items-center gap-2 font-mono text-micro font-bold animate-fade-rise">
          <span className="px-2 py-1 rounded bg-slate-100 border">40² = 1600</span>
          <span>&lt;</span>
          <span className="px-2.5 py-1 rounded bg-amber-100 border border-amber-300 font-black">1936</span>
          <span>&lt;</span>
          <span className="px-2 py-1 rounded bg-slate-100 border">50² = 2500</span>
        </div>
      )}
      {step === 2 && (
        <div className="flex flex-col items-center gap-1 font-mono text-micro font-bold animate-fade-rise">
          <div>Candidates ending in 6: <strong>44</strong> or <strong>46</strong></div>
          <div className="px-3 py-1 rounded-lg bg-sky-100 text-[#005583] border">
            Midpoint: 45² = 2025 &gt; 1936
          </div>
        </div>
      )}
      {step === 3 && (
        <div className="flex flex-col items-center gap-1.5 animate-fade-rise font-mono">
          <div className="px-5 py-2 rounded-2xl bg-emerald-600 text-white font-black text-statement shadow-xs">
            √1936 = 44
          </div>
          <span className="text-micro font-bold text-emerald-950">
            Verify: 44 × 44 = 1936!
          </span>
        </div>
      )}
    </SolvedFrame>
  );
};

// -----------------------------------------------------------------------------
// EX-9: Aribam and Bijou: Estimating √250
// -----------------------------------------------------------------------------
export const Ex9AribamBijouRoot250Visualizer: React.FC<PracticeVisualizerProps> = (props) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const cues: Record<1 | 2 | 3, React.ReactNode> = {
    1: <span>Step 1: Trap 250: 15² = 225 &lt; 250 &lt; 256 = 16².</span>,
    2: <span>Step 2: 250 is 25 away from 225, but only 6 away from 256!</span>,
    3: <span className="text-emerald-700">Step 3: √250 is approximately 15.8 (just below 16)!</span>,
  };

  return (
    <SolvedFrame title="Worked Example 9" badge="Estimating √250" cue={cues[step]} step={step} setStep={setStep} {...props}>
      {step === 1 && (
        <div className="flex items-center gap-2 font-mono text-micro font-bold animate-fade-rise">
          <span className="px-2 py-1 rounded bg-slate-100 border">15² = 225</span>
          <span>&lt;</span>
          <span className="px-2.5 py-1 rounded bg-amber-100 border border-amber-300 font-black">250</span>
          <span>&lt;</span>
          <span className="px-2 py-1 rounded bg-slate-100 border">16² = 256</span>
        </div>
      )}
      {step === 2 && (
        <div className="flex items-center gap-3 font-mono text-micro font-bold animate-fade-rise">
          <div className="p-1.5 rounded-lg bg-slate-100 border">Gap: 250 - 225 = 25</div>
          <div className="p-1.5 rounded-lg bg-emerald-100 text-emerald-900 border border-emerald-300 font-black">
            Gap: 256 - 250 = 6 (Much closer!)
          </div>
        </div>
      )}
      {step === 3 && (
        <div className="flex flex-col items-center gap-1.5 animate-fade-rise font-mono">
          <div className="px-5 py-2 rounded-2xl bg-emerald-600 text-white font-black text-statement shadow-xs">
            √250 ≈ 15.8 (Close to 16)
          </div>
          <span className="text-micro font-bold text-emerald-950">
            250 is not a perfect square, but it's very close to 16!
          </span>
        </div>
      )}
    </SolvedFrame>
  );
};

// -----------------------------------------------------------------------------
// EX-10: Akhil's Square Cloth Area 125 cm²
// -----------------------------------------------------------------------------
export const Ex10AkhilClothVisualizer: React.FC<PracticeVisualizerProps> = (props) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const cues: Record<1 | 2 | 3, React.ReactNode> = {
    1: <span>Step 1: Cloth area is 125 cm². A 15 cm handkerchief needs 15² = 225 cm²!</span>,
    2: <span>Step 2: 125 &lt; 225 $\rightarrow$ 15 cm is impossible! Nearest square below is 11² = 121.</span>,
    3: <span className="text-emerald-700">Step 3: Maximum integer side handkerchief he can cut is 11 cm!</span>,
  };

  return (
    <SolvedFrame title="Worked Example 10" badge="Akhil's Cloth (125 cm²)" cue={cues[step]} step={step} setStep={setStep} {...props}>
      {step === 1 && (
        <div className="flex items-center gap-4 font-mono font-bold animate-fade-rise">
          <div className="p-2 rounded-xl bg-amber-50 border border-amber-300 text-center">
            <span className="text-[10px] text-amber-700 block">Available Cloth</span>
            <span className="text-small text-amber-950 font-black">125 cm²</span>
          </div>
          <span className="text-slate-400">vs</span>
          <div className="p-2 rounded-xl bg-rose-50 border border-rose-300 text-center">
            <span className="text-[10px] text-rose-700 block">15 cm Needs</span>
            <span className="text-small text-rose-950 font-black">225 cm²</span>
          </div>
        </div>
      )}
      {step === 2 && (
        <div className="flex items-center gap-2 font-mono text-micro font-bold animate-fade-rise">
          <span className="px-2.5 py-1 rounded-xl bg-emerald-100 text-emerald-950 border border-emerald-400 font-black">
            11² = 121 cm² ≤ 125 cm²
          </span>
          <span>&lt;</span>
          <span className="px-2.5 py-1 rounded-xl bg-slate-100 border">
            12² = 144 cm²
          </span>
        </div>
      )}
      {step === 3 && (
        <div className="flex flex-col items-center gap-1.5 animate-fade-rise font-mono">
          <div className="px-5 py-2 rounded-2xl bg-emerald-600 text-white font-black text-statement shadow-xs">
            Max Handkerchief Side = 11 cm
          </div>
          <span className="text-micro font-bold text-slate-700">
            Cannot cut 15 cm. Largest integer handkerchief is 11 cm × 11 cm!
          </span>
        </div>
      )}
    </SolvedFrame>
  );
};

// -----------------------------------------------------------------------------
// EX-11: Unit Cubes in an Edge-4 Cube
// -----------------------------------------------------------------------------
export const Ex11UnitCubesEdge4Visualizer: React.FC<PracticeVisualizerProps> = (props) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const cues: Record<1 | 2 | 3, React.ReactNode> = {
    1: <span>Step 1: An edge-4 cube has 4 layers. Each layer has 4 × 4 = 16 cubes.</span>,
    2: <span>Step 2: 4 layers × 16 cubes per layer = 64 unit cubes!</span>,
    3: <span className="text-emerald-700">Step 3: Total = 4 × 4 × 4 = 4³ = 64 unit cubes!</span>,
  };

  return (
    <SolvedFrame title="Worked Example 11" badge="Edge-4 Cube" cue={cues[step]} step={step} setStep={setStep} {...props}>
      {step === 1 && (
        <div className="flex items-center gap-3 animate-fade-rise">
          <div className="w-16 h-16 rounded-xl bg-sky-50 border-2 border-sky-400 flex flex-col items-center justify-center font-mono font-bold text-[#005583]">
            <Box className="w-6 h-6" />
            <span className="text-[10px]">4 × 4</span>
          </div>
          <span className="text-micro font-bold text-slate-600">
            Each horizontal square layer has 16 unit cubes.
          </span>
        </div>
      )}
      {step === 2 && (
        <div className="flex items-center gap-1 font-mono text-micro font-bold animate-fade-rise">
          {[16, 32, 48, 64].map((v, i) => (
            <span key={i} className="px-2 py-1 rounded bg-sky-100 text-[#005583] border">
              L{i+1}: {v}
            </span>
          ))}
        </div>
      )}
      {step === 3 && (
        <div className="flex flex-col items-center gap-1.5 animate-fade-rise font-mono">
          <div className="px-5 py-2 rounded-2xl bg-emerald-600 text-white font-black text-statement shadow-xs">
            4³ = 64 Unit Cubes
          </div>
          <span className="text-micro font-bold text-emerald-950">
            Volume = edge³ = 4 × 4 × 4 = 64!
          </span>
        </div>
      )}
    </SolvedFrame>
  );
};

// -----------------------------------------------------------------------------
// EX-12: Testing Cubes: 3375 vs 500
// -----------------------------------------------------------------------------
export const Ex12TestingCubesVisualizer: React.FC<PracticeVisualizerProps> = (props) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const cues: Record<1 | 2 | 3, React.ReactNode> = {
    1: <span>Step 1: 3375 = 3³ × 5³ = (3 × 5)³ = 15³. All prime triplets!</span>,
    2: <span>Step 2: 500 = 2² × 5³. Prime 2 appears only twice (not a triplet)!</span>,
    3: <span className="text-emerald-700">Step 3: 3375 is a perfect cube; 500 is NOT a cube!</span>,
  };

  return (
    <SolvedFrame title="Worked Example 12" badge="Testing Cubes: 3375 vs 500" cue={cues[step]} step={step} setStep={setStep} {...props}>
      {step === 1 && (
        <div className="flex flex-col items-center gap-1 font-mono text-micro font-bold animate-fade-rise">
          <span className="text-small font-black text-emerald-900">3375 = (3³) × (5³)</span>
          <span className="text-[#005583]">Both prime factors form complete triplets ✓</span>
        </div>
      )}
      {step === 2 && (
        <div className="flex flex-col items-center gap-1 font-mono text-micro font-bold animate-fade-rise">
          <span className="text-small font-black text-rose-900">500 = 2² × 5³</span>
          <span className="text-rose-600">Prime 2 has only 2 factors (needs 3!) ✗</span>
        </div>
      )}
      {step === 3 && (
        <div className="flex flex-col items-center gap-1.5 animate-fade-rise font-mono">
          <div className="px-5 py-2 rounded-2xl bg-emerald-600 text-white font-black text-statement shadow-xs">
            ∛3375 = 15 (Cube)
          </div>
          <span className="text-micro font-bold text-slate-700">
            3375 is 15³; 500 is not a perfect cube!
          </span>
        </div>
      )}
    </SolvedFrame>
  );
};

// -----------------------------------------------------------------------------
// EX-13: Prime Factorisation of Cubes (4, 6, 12, 15)
// -----------------------------------------------------------------------------
export const Ex13PrimeFactorCubesVisualizer: React.FC<PracticeVisualizerProps> = (props) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const cues: Record<1 | 2 | 3, React.ReactNode> = {
    1: <span>Step 1: Check bases: 4 = 2², 6 = 2×3, 12 = 2²×3, 15 = 3×5.</span>,
    2: <span>Step 2: Cubes: 4³ = 2⁶, 6³ = 2³×3³, 12³ = 2⁶×3³, 15³ = 3³×5³.</span>,
    3: <span className="text-emerald-700">Step 3: In a cube, every prime exponent is multiplied by 3!</span>,
  };

  return (
    <SolvedFrame title="Worked Example 13" badge="Prime Factor Exponents" cue={cues[step]} step={step} setStep={setStep} {...props}>
      {step === 1 && (
        <div className="flex flex-wrap items-center justify-center gap-2 font-mono text-micro font-bold animate-fade-rise">
          <span className="px-2 py-1 rounded bg-slate-100 border">4 = 2²</span>
          <span className="px-2 py-1 rounded bg-slate-100 border">6 = 2 × 3</span>
          <span className="px-2 py-1 rounded bg-slate-100 border">12 = 2² × 3</span>
          <span className="px-2 py-1 rounded bg-slate-100 border">15 = 3 × 5</span>
        </div>
      )}
      {step === 2 && (
        <div className="flex flex-wrap items-center justify-center gap-2 font-mono text-micro font-bold animate-fade-rise">
          <span className="px-2 py-1 rounded bg-sky-100 text-[#005583] border">4³ = 2⁶</span>
          <span className="px-2 py-1 rounded bg-sky-100 text-[#005583] border">6³ = 2³ × 3³</span>
          <span className="px-2 py-1 rounded bg-sky-100 text-[#005583] border">12³ = 2⁶ × 3³</span>
          <span className="px-2 py-1 rounded bg-sky-100 text-[#005583] border">15³ = 3³ × 5³</span>
        </div>
      )}
      {step === 3 && (
        <div className="flex flex-col items-center gap-1.5 animate-fade-rise font-mono">
          <div className="px-5 py-2 rounded-2xl bg-emerald-600 text-white font-black text-statement shadow-xs">
            Exponents Multiply by 3!
          </div>
          <span className="text-micro font-bold text-emerald-950">
            Every prime factor appears in multiples of 3 in any cube!
          </span>
        </div>
      )}
    </SolvedFrame>
  );
};

// -----------------------------------------------------------------------------
// EX-14: Cube Roots of 64, 512, and 729
// -----------------------------------------------------------------------------
export const Ex14CubeRoots64512729Visualizer: React.FC<PracticeVisualizerProps> = (props) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const cues: Record<1 | 2 | 3, React.ReactNode> = {
    1: <span>Step 1: Check known cube powers: 4³ = 64, 8³ = 512, 9³ = 729.</span>,
    2: <span>Step 2: Apply cube root operation: ∛(n³) = n.</span>,
    3: <span className="text-emerald-700">Step 3: ∛64 = 4, ∛512 = 8, ∛729 = 9!</span>,
  };

  return (
    <SolvedFrame title="Worked Example 14" badge="Cube Roots: 64, 512, 729" cue={cues[step]} step={step} setStep={setStep} {...props}>
      {step === 1 && (
        <div className="flex items-center gap-2 font-mono text-micro font-bold animate-fade-rise">
          <span className="px-2 py-1 rounded bg-slate-100 border">4³ = 64</span>
          <span className="px-2 py-1 rounded bg-slate-100 border">8³ = 512</span>
          <span className="px-2 py-1 rounded bg-slate-100 border">9³ = 729</span>
        </div>
      )}
      {step === 2 && (
        <div className="flex items-center gap-2 font-mono text-small font-bold animate-fade-rise">
          <span className="px-2.5 py-1 rounded bg-sky-100 text-[#005583] border">∛64 = 4</span>
          <span className="px-2.5 py-1 rounded bg-sky-100 text-[#005583] border">∛512 = 8</span>
          <span className="px-2.5 py-1 rounded bg-sky-100 text-[#005583] border">∛729 = 9</span>
        </div>
      )}
      {step === 3 && (
        <div className="flex flex-col items-center gap-1.5 animate-fade-rise font-mono">
          <div className="px-5 py-2 rounded-2xl bg-emerald-600 text-white font-black text-statement shadow-xs">
            ∛64 = 4, ∛512 = 8, ∛729 = 9
          </div>
          <span className="text-micro font-bold text-emerald-950">
            Cube root is the number whose cube equals the radicand!
          </span>
        </div>
      )}
    </SolvedFrame>
  );
};

// -----------------------------------------------------------------------------
// EX-15: Triangular Numbers Sum to Squares
// -----------------------------------------------------------------------------
export const Ex15TriangularNumbersSquareVisualizer: React.FC<PracticeVisualizerProps> = (props) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const cues: Record<1 | 2 | 3, React.ReactNode> = {
    1: <span>Step 1: Triangular numbers sequence: 1, 3, 6, 10, 15...</span>,
    2: <span>Step 2: Add consecutive pairs: 1+3=4 (2²), 3+6=9 (3²), 6+10=16 (4²)...</span>,
    3: <span className="text-emerald-700">Step 3: Two consecutive triangular numbers ALWAYS sum to a square!</span>,
  };

  return (
    <SolvedFrame title="Worked Example 15" badge="Triangular Numbers" cue={cues[step]} step={step} setStep={setStep} {...props}>
      {step === 1 && (
        <div className="flex items-center gap-2 font-mono text-micro font-bold animate-fade-rise">
          <span className="px-2 py-1 rounded bg-slate-100 border">T₁=1</span>
          <span className="px-2 py-1 rounded bg-slate-100 border">T₂=3</span>
          <span className="px-2 py-1 rounded bg-slate-100 border">T₃=6</span>
          <span className="px-2 py-1 rounded bg-slate-100 border">T₄=10</span>
          <span className="px-2 py-1 rounded bg-slate-100 border">T₅=15</span>
        </div>
      )}
      {step === 2 && (
        <div className="flex flex-wrap items-center justify-center gap-2 font-mono text-micro font-bold animate-fade-rise">
          <span className="px-2 py-1 rounded bg-sky-100 text-[#005583] border">1 + 3 = 4 (2²)</span>
          <span className="px-2 py-1 rounded bg-sky-100 text-[#005583] border">3 + 6 = 9 (3²)</span>
          <span className="px-2 py-1 rounded bg-sky-100 text-[#005583] border">6 + 10 = 16 (4²)</span>
          <span className="px-2 py-1 rounded bg-sky-100 text-[#005583] border">10 + 15 = 25 (5²)</span>
        </div>
      )}
      {step === 3 && (
        <div className="flex flex-col items-center gap-1.5 animate-fade-rise font-mono">
          <div className="px-5 py-2 rounded-2xl bg-emerald-600 text-white font-black text-statement shadow-xs">
            T(n-1) + T(n) = n²
          </div>
          <span className="text-micro font-bold text-emerald-950">
            Consecutive triangular numbers always assemble into a perfect square grid!
          </span>
        </div>
      )}
    </SolvedFrame>
  );
};

// -----------------------------------------------------------------------------
// EX-16: Successive Differences of Cubes
// -----------------------------------------------------------------------------
export const Ex16SuccessiveDiffsCubesVisualizer: React.FC<PracticeVisualizerProps> = (props) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const cues: Record<1 | 2 | 3, React.ReactNode> = {
    1: <span>Step 1: Level 0 cubes: 1, 8, 27, 64, 125, 216...</span>,
    2: <span>Step 2: Level 1 diffs: 7, 19, 37, 61, 91. Level 2 diffs: 12, 18, 24, 30.</span>,
    3: <span className="text-emerald-700">Step 3: Level 3 differences are ALWAYS constant: 6!</span>,
  };

  return (
    <SolvedFrame title="Worked Example 16" badge="Cube Differences" cue={cues[step]} step={step} setStep={setStep} {...props}>
      {step === 1 && (
        <div className="flex items-center gap-1.5 font-mono text-micro font-bold animate-fade-rise">
          <span className="px-2 py-1 rounded bg-slate-100 border">1³=1</span>
          <span className="px-2 py-1 rounded bg-slate-100 border">2³=8</span>
          <span className="px-2 py-1 rounded bg-slate-100 border">3³=27</span>
          <span className="px-2 py-1 rounded bg-slate-100 border">4³=64</span>
          <span className="px-2 py-1 rounded bg-slate-100 border">5³=125</span>
        </div>
      )}
      {step === 2 && (
        <div className="flex flex-col items-center gap-1 font-mono text-[11px] font-bold animate-fade-rise">
          <div className="text-slate-600">L1 diffs: 7, 19, 37, 61, 91...</div>
          <div className="text-[#005583]">L2 diffs: 12, 18, 24, 30...</div>
        </div>
      )}
      {step === 3 && (
        <div className="flex flex-col items-center gap-1.5 animate-fade-rise font-mono">
          <div className="px-5 py-2 rounded-2xl bg-emerald-600 text-white font-black text-statement shadow-xs">
            Level 3 Constant = 6!
          </div>
          <span className="text-micro font-bold text-emerald-950">
            For any cubic sequence, the third differences are always constant (equal to 3! = 6)!
          </span>
        </div>
      )}
    </SolvedFrame>
  );
};

// -----------------------------------------------------------------------------
// Master Stage Router for Solved Examples
// -----------------------------------------------------------------------------
export const PracticeSolvedVisualizerStage: React.FC<PracticeVisualizerProps> = (props) => {
  switch (props.question.id) {
    case 'ex-1':
      return <Ex1FractionDecimalSquareVisualizer {...props} />;
    case 'ex-2':
      return <Ex2NextSquareVisualizer {...props} />;
    case 'ex-3':
      return <Ex3RepeatedSubtractionVisualizer {...props} />;
    case 'ex-4':
      return <Ex4SquareRootsPlusMinusVisualizer {...props} />;
    case 'ex-5':
      return <Ex5TestingSquarenessVisualizer {...props} />;
    case 'ex-6':
      return <Ex6PrimeFactorisationVisualizer {...props} />;
    case 'ex-7':
      return <Ex7Checking1156And2800Visualizer {...props} />;
    case 'ex-8':
      return <Ex8EstimatingRoot1936Visualizer {...props} />;
    case 'ex-9':
      return <Ex9AribamBijouRoot250Visualizer {...props} />;
    case 'ex-10':
      return <Ex10AkhilClothVisualizer {...props} />;
    case 'ex-11':
      return <Ex11UnitCubesEdge4Visualizer {...props} />;
    case 'ex-12':
      return <Ex12TestingCubesVisualizer {...props} />;
    case 'ex-13':
      return <Ex13PrimeFactorCubesVisualizer {...props} />;
    case 'ex-14':
      return <Ex14CubeRoots64512729Visualizer {...props} />;
    case 'ex-15':
      return <Ex15TriangularNumbersSquareVisualizer {...props} />;
    case 'ex-16':
      return <Ex16SuccessiveDiffsCubesVisualizer {...props} />;
    default:
      return null;
  }
};
