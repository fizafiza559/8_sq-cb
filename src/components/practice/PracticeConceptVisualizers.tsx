/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  KeyRound,
  RotateCcw,
  Sparkles,
  XCircle,
} from 'lucide-react';
import { PracticeVisualizerProps } from './NcertSquaresVisualizers';

// -----------------------------------------------------------------------------
// Helper: Card Frame for Concept Clearing
// -----------------------------------------------------------------------------
interface ConceptFrameProps {
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

const ConceptFrame: React.FC<ConceptFrameProps> = ({
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
      <div className="px-3 py-2 min-h-[48px] rounded-xl bg-white/95 border border-slate-200/80 text-base sm:text-body font-medium leading-snug text-slate-800 shrink-0 flex items-center shadow-2xs">
        {cue}
      </div>

      {/* Central Canvas */}
      <div
        onClick={advance}
        title={step < 3 ? 'Tap anywhere to advance →' : undefined}
        className="w-full flex-1 min-h-[100px] max-h-[175px] bg-white rounded-2xl border border-slate-200/80 p-2 flex flex-col items-center justify-center gap-2 shadow-2xs overflow-hidden cursor-pointer select-none transition-colors duration-200 hover:border-[#005583]/40"
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
// CC-1: Does Every Number Have an Even Number of Factors?
// -----------------------------------------------------------------------------
export const Cc1OddFactorsVisualizer: React.FC<PracticeVisualizerProps> = (props) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const cues: Record<1 | 2 | 3, React.ReactNode> = {
    1: <span>Step 1: Normal numbers pair factors: 12 has (1,12), (2,6), (3,4) = 6 factors.</span>,
    2: <span>Step 2: In a square number (like 36), the root pairs with itself: 6 × 6!</span>,
    3: <span className="text-emerald-700">Step 3: Only perfect squares have an ODD number of factors!</span>,
  };

  return (
    <ConceptFrame title="Concept Clearing 1" badge="Factor Parity" cue={cues[step]} step={step} setStep={setStep} {...props}>
      {step === 1 && (
        <div className="flex flex-col items-center gap-1 font-mono text-micro font-bold animate-fade-rise">
          <span className="text-small font-black text-slate-800">12 (Non-square):</span>
          <div className="flex items-center gap-1.5 text-slate-600">
            <span className="px-2 py-0.5 rounded bg-slate-100 border">(1, 12)</span>
            <span className="px-2 py-0.5 rounded bg-slate-100 border">(2, 6)</span>
            <span className="px-2 py-0.5 rounded bg-slate-100 border">(3, 4)</span>
          </div>
          <span className="text-slate-500">3 pairs = 6 factors (EVEN count)</span>
        </div>
      )}
      {step === 2 && (
        <div className="flex flex-col items-center gap-1 font-mono text-micro font-bold animate-fade-rise">
          <span className="text-small font-black text-amber-900">36 (Square):</span>
          <div className="flex flex-wrap items-center justify-center gap-1">
            <span className="px-1.5 py-0.5 rounded bg-slate-100 border">(1, 36)</span>
            <span className="px-1.5 py-0.5 rounded bg-slate-100 border">(2, 18)</span>
            <span className="px-1.5 py-0.5 rounded bg-slate-100 border">(3, 12)</span>
            <span className="px-1.5 py-0.5 rounded bg-slate-100 border">(4, 9)</span>
            <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-950 border border-amber-400 font-black animate-pulse">
              [ 6 × 6 ]
            </span>
          </div>
          <span className="text-amber-800 font-extrabold">8 paired + 1 lonely 6 = 9 factors (ODD count)!</span>
        </div>
      )}
      {step === 3 && (
        <div className="flex flex-col items-center gap-1.5 animate-fade-rise font-mono">
          <div className="px-5 py-2 rounded-2xl bg-emerald-600 text-white font-black text-statement shadow-xs">
            Only Squares Have Odd Factors!
          </div>
          <span className="text-micro font-bold text-emerald-950">
            No other natural numbers have an odd number of factors!
          </span>
        </div>
      )}
    </ConceptFrame>
  );
};

// -----------------------------------------------------------------------------
// CC-2: Queen Ratnamanjuri's Safe Passcode (Primes)
// -----------------------------------------------------------------------------
export const Cc2QueenSafeLockerVisualizer: React.FC<PracticeVisualizerProps> = (props) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const cues: Record<1 | 2 | 3, React.ReactNode> = {
    1: <span>Step 1: Touched exactly twice means a locker has EXACTLY 2 factors.</span>,
    2: <span>Step 2: Numbers with only 2 factors (1 and itself) are PRIME numbers!</span>,
    3: <span className="text-emerald-700">Step 3: The first five primes are 2, 3, 5, 7, 11!</span>,
  };

  return (
    <ConceptFrame title="Concept Clearing 2" badge="Queen's Safe Clue" cue={cues[step]} step={step} setStep={setStep} {...props}>
      {step === 1 && (
        <div className="flex items-center gap-3 animate-fade-rise">
          <KeyRound className="w-8 h-8 text-amber-500" />
          <div className="text-micro text-slate-700 font-medium">
            Clue: "The first five locker numbers that were touched exactly twice."
          </div>
        </div>
      )}
      {step === 2 && (
        <div className="flex flex-col items-center gap-1 font-mono text-micro font-bold animate-fade-rise">
          <span className="px-3 py-1.5 rounded-xl bg-sky-100 text-[#005583] border border-sky-300 font-black">
            2 factors (1 and n) = PRIME NUMBER
          </span>
          <span className="text-slate-600">
            Composite numbers have 3+ factors; 1 has only 1 factor.
          </span>
        </div>
      )}
      {step === 3 && (
        <div className="flex flex-col items-center gap-2 animate-fade-rise font-mono">
          <div className="flex items-center gap-1.5">
            {[2, 3, 5, 7, 11].map((p) => (
              <span
                key={p}
                className="w-8 h-8 rounded-xl bg-emerald-600 text-white font-black text-small flex items-center justify-center shadow-xs"
              >
                {p}
              </span>
            ))}
          </div>
          <span className="text-micro font-bold text-emerald-950">
            Passcode is: <strong>2 - 3 - 5 - 7 - 11</strong>!
          </span>
        </div>
      )}
    </ConceptFrame>
  );
};

// -----------------------------------------------------------------------------
// CC-3: Which Squares End in 6?
// -----------------------------------------------------------------------------
export const Cc3SquaresEndingIn6Visualizer: React.FC<PracticeVisualizerProps> = (props) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const cues: Record<1 | 2 | 3, React.ReactNode> = {
    1: <span>Step 1: A square ends in 6 only if its base ends in 4 (4²=16) or 6 (6²=36).</span>,
    2: <span>Step 2: Check bases: 34 (4), 46 (6), 56 (6), 74 (4).</span>,
    3: <span className="text-emerald-700">Step 3: All four squares (34², 46², 56², 74²) end in 6!</span>,
  };

  return (
    <ConceptFrame title="Concept Clearing 3" badge="Units Digit 6" cue={cues[step]} step={step} setStep={setStep} {...props}>
      {step === 1 && (
        <div className="flex items-center gap-3 font-mono font-bold animate-fade-rise">
          <span className="px-3 py-1.5 rounded-xl bg-sky-100 text-[#005583] border">
            Ends in 4 → 4² = 1<strong className="underline">6</strong>
          </span>
          <span className="px-3 py-1.5 rounded-xl bg-sky-100 text-[#005583] border">
            Ends in 6 → 6² = 3<strong className="underline">6</strong>
          </span>
        </div>
      )}
      {step === 2 && (
        <div className="flex items-center gap-2 font-mono text-micro font-bold animate-fade-rise">
          <span className="px-2 py-1 rounded bg-slate-100 border">3<strong className="text-emerald-600">4</strong>²</span>
          <span className="px-2 py-1 rounded bg-slate-100 border">4<strong className="text-emerald-600">6</strong>²</span>
          <span className="px-2 py-1 rounded bg-slate-100 border">5<strong className="text-emerald-600">6</strong>²</span>
          <span className="px-2 py-1 rounded bg-slate-100 border">7<strong className="text-emerald-600">4</strong>²</span>
        </div>
      )}
      {step === 3 && (
        <div className="flex flex-col items-center gap-1.5 animate-fade-rise font-mono">
          <div className="px-5 py-2 rounded-2xl bg-emerald-600 text-white font-black text-statement shadow-xs">
            34², 46², 56², 74² all end in 6!
          </div>
          <span className="text-micro font-bold text-slate-700">
            Every number ending in 4 or 6 produces a square ending in 6!
          </span>
        </div>
      )}
    </ConceptFrame>
  );
};

// -----------------------------------------------------------------------------
// CC-4: Zeros at the End of a Square Number
// -----------------------------------------------------------------------------
export const Cc4ZerosEndOfSquareVisualizer: React.FC<PracticeVisualizerProps> = (props) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const cues: Record<1 | 2 | 3, React.ReactNode> = {
    1: <span>Step 1: If base has 3 trailing zeros (like 1,000)...</span>,
    2: <span>Step 2: Squaring doubles trailing zeros: 3 zeros × 2 = 6 zeros!</span>,
    3: <span className="text-emerald-700">Step 3: Square has 6 zeros. Squares NEVER have odd zeros!</span>,
  };

  return (
    <ConceptFrame title="Concept Clearing 4" badge="Trailing Zeros Rule" cue={cues[step]} step={step} setStep={setStep} {...props}>
      {step === 1 && (
        <div className="flex flex-col items-center gap-1 font-mono font-bold animate-fade-rise">
          <span className="text-statement font-black text-slate-800">
            1,<span className="text-amber-600 underline">000</span>
          </span>
          <span className="text-micro text-slate-500">Base ends with 3 zeros</span>
        </div>
      )}
      {step === 2 && (
        <div className="flex items-center gap-3 font-mono text-micro font-bold animate-fade-rise">
          <span className="px-3 py-1.5 rounded-xl bg-amber-100 text-amber-950 border">3 zeros</span>
          <span className="text-small font-black text-[#005583]">× 2</span>
          <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="px-3 py-1.5 rounded-xl bg-emerald-100 text-emerald-950 border font-black">6 zeros</span>
        </div>
      )}
      {step === 3 && (
        <div className="flex flex-col items-center gap-1.5 animate-fade-rise font-mono">
          <div className="px-5 py-2 rounded-2xl bg-emerald-600 text-white font-black text-statement shadow-xs">
            1,000,000 (6 Zeros)
          </div>
          <span className="text-micro font-bold text-slate-700">
            A square number can NEVER end in an odd number of zeros (1, 3, 5...)!
          </span>
        </div>
      )}
    </ConceptFrame>
  );
};

// -----------------------------------------------------------------------------
// CC-5: Parity of a Number and its Square
// -----------------------------------------------------------------------------
export const Cc5ParitySquareVisualizer: React.FC<PracticeVisualizerProps> = (props) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const cues: Record<1 | 2 | 3, React.ReactNode> = {
    1: <span>Step 1: Check Even numbers: 2²=4, 4²=16, 6²=36, 8²=64 (All EVEN).</span>,
    2: <span>Step 2: Check Odd numbers: 1²=1, 3²=9, 5²=25, 7²=49 (All ODD).</span>,
    3: <span className="text-emerald-700">Step 3: Even² is ALWAYS Even; Odd² is ALWAYS Odd!</span>,
  };

  return (
    <ConceptFrame title="Concept Clearing 5" badge="Parity Conservation" cue={cues[step]} step={step} setStep={setStep} {...props}>
      {step === 1 && (
        <div className="flex items-center gap-2 font-mono text-micro font-bold animate-fade-rise">
          <span className="px-2 py-1 rounded bg-sky-100 text-[#005583] border">2² = 4</span>
          <span className="px-2 py-1 rounded bg-sky-100 text-[#005583] border">4² = 16</span>
          <span className="px-2 py-1 rounded bg-sky-100 text-[#005583] border">6² = 36</span>
          <span className="px-2 py-1 rounded bg-sky-100 text-[#005583] border">8² = 64</span>
        </div>
      )}
      {step === 2 && (
        <div className="flex items-center gap-2 font-mono text-micro font-bold animate-fade-rise">
          <span className="px-2 py-1 rounded bg-amber-100 text-amber-950 border">1² = 1</span>
          <span className="px-2 py-1 rounded bg-amber-100 text-amber-950 border">3² = 9</span>
          <span className="px-2 py-1 rounded bg-amber-100 text-amber-950 border">5² = 25</span>
          <span className="px-2 py-1 rounded bg-amber-100 text-amber-950 border">7² = 49</span>
        </div>
      )}
      {step === 3 && (
        <div className="flex flex-col items-center gap-1.5 animate-fade-rise font-mono">
          <div className="flex items-center gap-2">
            <span className="px-3.5 py-1.5 rounded-2xl bg-sky-600 text-white font-black text-small">
              Even² = Even
            </span>
            <span className="px-3.5 py-1.5 rounded-2xl bg-amber-600 text-white font-black text-small">
              Odd² = Odd
            </span>
          </div>
          <span className="text-micro font-bold text-slate-700">
            Parity never flips when squaring!
          </span>
        </div>
      )}
    </ConceptFrame>
  );
};

// -----------------------------------------------------------------------------
// CC-6: Can a Cube End with Exactly Two Zeros (00)?
// -----------------------------------------------------------------------------
export const Cc6CubeEndingTwoZerosVisualizer: React.FC<PracticeVisualizerProps> = (props) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const cues: Record<1 | 2 | 3, React.ReactNode> = {
    1: <span>Step 1: If base has k zeros, cubing multiplies zeros by 3: 3k zeros!</span>,
    2: <span>Step 2: 1 zero $\rightarrow$ 3 zeros (1000); 2 zeros $\rightarrow$ 6 zeros (1,000,000).</span>,
    3: <span className="text-rose-700">Step 3: Zeros must be a multiple of 3 $\rightarrow$ NEVER 2 zeros!</span>,
  };

  return (
    <ConceptFrame title="Concept Clearing 6" badge="Cube Zeros Rule" cue={cues[step]} step={step} setStep={setStep} {...props}>
      {step === 1 && (
        <div className="flex items-center gap-3 font-mono font-bold animate-fade-rise">
          <div className="p-2 rounded-xl bg-slate-100 border text-center">
            <span className="text-small text-slate-800 font-black">(10^k)³ = 10^(3k)</span>
          </div>
          <span className="text-micro text-slate-600">Trailing zeros always triple</span>
        </div>
      )}
      {step === 2 && (
        <div className="flex items-center gap-3 font-mono text-micro font-bold animate-fade-rise">
          <span className="px-2.5 py-1 rounded bg-sky-100 text-[#005583] border">10³ = 1,000 (3)</span>
          <span className="px-2.5 py-1 rounded bg-sky-100 text-[#005583] border">100³ = 1,000,000 (6)</span>
        </div>
      )}
      {step === 3 && (
        <div className="flex flex-col items-center gap-1.5 animate-fade-rise font-mono">
          <div className="px-5 py-2 rounded-2xl bg-rose-600 text-white font-black text-statement shadow-xs">
            NO! Never Exactly 2 Zeros
          </div>
          <span className="text-micro font-bold text-slate-700">
            A perfect cube cannot end in 2 zeros because 2 is not divisible by 3!
          </span>
        </div>
      )}
    </ConceptFrame>
  );
};

// -----------------------------------------------------------------------------
// CC-7: Ramanujan Taxicab Numbers (1729, 4104, 13832)
// -----------------------------------------------------------------------------
export const Cc7TaxicabNumbersVisualizer: React.FC<PracticeVisualizerProps> = (props) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const cues: Record<1 | 2 | 3, React.ReactNode> = {
    1: <span>Step 1: 1729 = 1³ + 12³ = 9³ + 10³ (First Taxicab number).</span>,
    2: <span>Step 2: 4104 = 2³ + 16³ = 9³ + 15³; 13832 = 2³ + 24³ = 18³ + 20³!</span>,
    3: <span className="text-emerald-700">Step 3: Each can be written as the sum of two cubes in 2 ways!</span>,
  };

  return (
    <ConceptFrame title="Concept Clearing 7" badge="Taxicab Numbers" cue={cues[step]} step={step} setStep={setStep} {...props}>
      {step === 1 && (
        <div className="flex flex-col items-center gap-1 font-mono text-micro font-bold animate-fade-rise">
          <div className="text-small font-black text-[#005583]">1729:</div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-sky-100 text-[#005583]">1³ + 12³</span>
            <span>=</span>
            <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-900">9³ + 10³</span>
          </div>
        </div>
      )}
      {step === 2 && (
        <div className="flex flex-col gap-1.5 w-full max-w-sm font-mono text-[11px] font-bold animate-fade-rise">
          <div className="p-1 rounded bg-slate-100 border flex justify-between">
            <span>4104:</span>
            <span>2³ + 16³ = 9³ + 15³</span>
          </div>
          <div className="p-1 rounded bg-slate-100 border flex justify-between">
            <span>13832:</span>
            <span>2³ + 24³ = 18³ + 20³</span>
          </div>
        </div>
      )}
      {step === 3 && (
        <div className="flex flex-col items-center gap-1.5 animate-fade-rise font-mono">
          <div className="px-5 py-2 rounded-2xl bg-emerald-600 text-white font-black text-statement shadow-xs">
            Taxicab Numbers (Ta(n))
          </div>
          <span className="text-micro font-bold text-slate-700">
            Named after Hardy-Ramanujan's hospital visit taxicab!
          </span>
        </div>
      )}
    </ConceptFrame>
  );
};

// -----------------------------------------------------------------------------
// CC-8: Sum of Consecutive Odds for Cubes (91 to 109)
// -----------------------------------------------------------------------------
export const Cc8SumOddsCubesVisualizer: React.FC<PracticeVisualizerProps> = (props) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const cues: Record<1 | 2 | 3, React.ReactNode> = {
    1: <span>Step 1: Count terms: 91, 93, 95, 97, 99, 101, 103, 105, 107, 109 $\rightarrow$ 10 terms.</span>,
    2: <span>Step 2: 10 consecutive odds in the series equals the 10th cube: 10³!</span>,
    3: <span className="text-emerald-700">Step 3: Sum is 10³ = 1,000 without manual addition!</span>,
  };

  return (
    <ConceptFrame title="Concept Clearing 8" badge="Sum of Odds (91 to 109)" cue={cues[step]} step={step} setStep={setStep} {...props}>
      {step === 1 && (
        <div className="flex flex-wrap items-center justify-center gap-1 font-mono text-[11px] font-bold animate-fade-rise max-w-sm">
          {[91, 93, 95, 97, 99, 101, 103, 105, 107, 109].map((n) => (
            <span key={n} className="px-1.5 py-0.5 rounded bg-slate-100 border">{n}</span>
          ))}
          <span className="w-full text-center text-micro text-[#005583] mt-1 font-extrabold">
            Exactly 10 consecutive odd numbers!
          </span>
        </div>
      )}
      {step === 2 && (
        <div className="flex items-center gap-2 font-mono text-small font-bold animate-fade-rise">
          <span className="px-3 py-1.5 rounded-xl bg-sky-100 text-[#005583] border">
            10 consecutive terms
          </span>
          <ArrowRight className="w-4 h-4 text-slate-400" />
          <span className="px-3 py-1.5 rounded-xl bg-amber-100 text-amber-950 border font-black">
            10³
          </span>
        </div>
      )}
      {step === 3 && (
        <div className="flex flex-col items-center gap-1.5 animate-fade-rise font-mono">
          <div className="px-5 py-2 rounded-2xl bg-emerald-600 text-white font-black text-statement shadow-xs">
            Sum = 10³ = 1,000
          </div>
          <span className="text-micro font-bold text-emerald-950">
            Consecutive odd groups evaluate to cubes without adding term-by-term!
          </span>
        </div>
      )}
    </ConceptFrame>
  );
};

// -----------------------------------------------------------------------------
// CC-9: The Square Pairs Puzzle (1 to 17 in a Row)
// -----------------------------------------------------------------------------
export const Cc9SquarePairsPuzzleVisualizer: React.FC<PracticeVisualizerProps> = (props) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const cues: Record<1 | 2 | 3, React.ReactNode> = {
    1: <span>Step 1: Check end caps: 1 and 17 have only ONE valid partner (1+8=9, 17+8=25).</span>,
    2: <span>Step 2: 1 and 17 must be at the two ends! Fill inward step-by-step.</span>,
    3: <span className="text-emerald-700">Step 3: Valid sequence: 16-9-7-2-14-11-5-4-12-13-3-6-10-15-1-8-17!</span>,
  };

  return (
    <ConceptFrame title="Concept Clearing 9" badge="Square Pairs (1 to 17)" cue={cues[step]} step={step} setStep={setStep} {...props}>
      {step === 1 && (
        <div className="flex items-center gap-3 font-mono text-micro font-bold animate-fade-rise">
          <div className="p-2 rounded-xl bg-sky-50 border border-sky-300 text-center">
            <span className="block text-sky-700">1 pairs only with 8</span>
            <span className="font-black text-sky-950">1 + 8 = 9 (3²)</span>
          </div>
          <div className="p-2 rounded-xl bg-amber-50 border border-amber-300 text-center">
            <span className="block text-amber-700">17 pairs only with 8</span>
            <span className="font-black text-amber-950">17 + 8 = 25 (5²)</span>
          </div>
        </div>
      )}
      {step === 2 && (
        <div className="flex flex-col items-center gap-1 font-mono text-micro font-bold animate-fade-rise">
          <span className="text-[#005583]">End caps locked: [1] ... [17]</span>
          <span className="text-slate-600">8 connects to 1 and 17 near the end!</span>
        </div>
      )}
      {step === 3 && (
        <div className="flex flex-col items-center gap-1.5 animate-fade-rise font-mono">
          <div className="text-[10px] font-black text-emerald-900 bg-emerald-50 px-2 py-1 rounded-xl border border-emerald-300 max-w-sm text-center">
            16-9-7-2-14-11-5-4-12-13-3-6-10-15-1-8-17
          </div>
          <span className="text-micro font-bold text-emerald-950">
            Every adjacent pair sums to 9, 16, or 25!
          </span>
        </div>
      )}
    </ConceptFrame>
  );
};

// -----------------------------------------------------------------------------
// CC-10: Circle of Square Pairs (1 to 32)
// -----------------------------------------------------------------------------
export const Cc10CircleSquarePairsVisualizer: React.FC<PracticeVisualizerProps> = (props) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const cues: Record<1 | 2 | 3, React.ReactNode> = {
    1: <span>Step 1: In a closed circle, every number must have at least TWO square partners!</span>,
    2: <span>Step 2: For 1 to 32, every integer has 2+ partners that sum to squares.</span>,
    3: <span className="text-emerald-700">Step 3: Yes! 1 to 32 forms a complete continuous circle!</span>,
  };

  return (
    <ConceptFrame title="Concept Clearing 10" badge="Circle of Square Pairs" cue={cues[step]} step={step} setStep={setStep} {...props}>
      {step === 1 && (
        <div className="flex items-center gap-3 font-mono font-bold animate-fade-rise">
          <div className="w-16 h-16 rounded-full border-2 border-dashed border-[#005583] flex items-center justify-center bg-sky-50 text-[10px] text-[#005583] text-center">
            Circle Loop
          </div>
          <span className="text-micro text-slate-600 max-w-[200px]">
            Every node in a circle must have degree 2 (two neighbors).
          </span>
        </div>
      )}
      {step === 2 && (
        <div className="flex flex-col items-center gap-1 font-mono text-micro font-bold animate-fade-rise">
          <span className="px-3 py-1 rounded-xl bg-emerald-100 text-emerald-950 border border-emerald-300">
            All integers 1 to 32 have degree ≥ 2
          </span>
          <span className="text-slate-600">Hamiltonian cycle exists!</span>
        </div>
      )}
      {step === 3 && (
        <div className="flex flex-col items-center gap-1.5 animate-fade-rise font-mono">
          <div className="px-5 py-2 rounded-2xl bg-emerald-600 text-white font-black text-statement shadow-xs">
            YES! Circle is Possible
          </div>
          <span className="text-micro font-bold text-emerald-950">
            Numbers 1 to 32 form a closed necklace of square-summing neighbors!
          </span>
        </div>
      )}
    </ConceptFrame>
  );
};

// -----------------------------------------------------------------------------
// Master Stage Router for Concept Clearing
// -----------------------------------------------------------------------------
export const PracticeConceptVisualizerStage: React.FC<PracticeVisualizerProps> = (props) => {
  switch (props.question.id) {
    case 'cc-1':
      return <Cc1OddFactorsVisualizer {...props} />;
    case 'cc-2':
      return <Cc2QueenSafeLockerVisualizer {...props} />;
    case 'cc-3':
      return <Cc3SquaresEndingIn6Visualizer {...props} />;
    case 'cc-4':
      return <Cc4ZerosEndOfSquareVisualizer {...props} />;
    case 'cc-5':
      return <Cc5ParitySquareVisualizer {...props} />;
    case 'cc-6':
      return <Cc6CubeEndingTwoZerosVisualizer {...props} />;
    case 'cc-7':
      return <Cc7TaxicabNumbersVisualizer {...props} />;
    case 'cc-8':
      return <Cc8SumOddsCubesVisualizer {...props} />;
    case 'cc-9':
      return <Cc9SquarePairsPuzzleVisualizer {...props} />;
    case 'cc-10':
      return <Cc10CircleSquarePairsVisualizer {...props} />;
    default:
      return null;
  }
};
