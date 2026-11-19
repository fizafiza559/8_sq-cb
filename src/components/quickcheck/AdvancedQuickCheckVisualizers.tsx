/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Cpu,
  RotateCcw,
  Sparkles,
  Zap,
} from 'lucide-react';
import { QuickCheckVisualizerStageProps } from './SquaresQuickCheckVisualizers';

// -----------------------------------------------------------------------------
// Helper: Card Shell Frame
// -----------------------------------------------------------------------------
interface VisualizerFrameProps {
  title: string;
  badge: string;
  cue: React.ReactNode;
  step: 1 | 2 | 3;
  setStep: React.Dispatch<React.SetStateAction<1 | 2 | 3>>;
  onNext: () => void;
  onReset?: () => void;
  isLastQuestion: boolean;
  children: React.ReactNode;
  footerNote?: string;
}

const VisualizerFrame: React.FC<VisualizerFrameProps> = ({
  title,
  badge,
  cue,
  step,
  setStep,
  onNext,
  onReset,
  isLastQuestion,
  children,
  footerNote,
}) => {
  const advanceStep = () => {
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
        {onReset && (
          <button
            type="button"
            onClick={() => {
              setStep(1);
              onReset();
            }}
            className="min-h-[28px] px-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 text-slate-600 text-[11px] font-bold flex items-center gap-1 cursor-pointer transition-colors shadow-2xs"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>
        )}
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
        onClick={advanceStep}
        title={step < 3 ? 'Tap anywhere to advance →' : undefined}
        className="w-full flex-1 min-h-[110px] max-h-[175px] bg-white rounded-2xl border border-slate-200/80 p-2 flex flex-col items-center justify-center gap-2 shadow-2xs overflow-hidden cursor-pointer select-none transition-colors duration-200 hover:border-[#005583]/40"
      >
        {children}
      </div>

      {/* Footer Navigation */}
      <div className="pt-1 border-t border-slate-200/70 flex items-center justify-between gap-2 shrink-0">
        <span className="text-micro font-bold text-slate-600 truncate">
          {footerNote || (step < 3 ? 'Tap canvas or click next step' : '✓ Solution verified!')}
        </span>
        {step < 3 ? (
          <button
            type="button"
            onClick={advanceStep}
            className="min-h-[32px] px-3.5 rounded-xl bg-[#005583] hover:bg-[#003F62] text-white text-micro font-bold inline-flex items-center gap-1 cursor-pointer transition-colors shadow-2xs"
          >
            <span>Step {step + 1}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        ) : (
          <button
            type="button"
            onClick={onNext}
            className="min-h-[32px] px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-micro font-bold inline-flex items-center gap-1 cursor-pointer transition-colors shadow-2xs"
          >
            <span>{!isLastQuestion ? 'Next Question' : 'See Results'}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
};

// -----------------------------------------------------------------------------
// SCENE 15: Babylonian Tablet Visualizer (YBC 7289 √2)
// -----------------------------------------------------------------------------
export const BabylonianTabletVisualizer: React.FC<QuickCheckVisualizerStageProps> = (props) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);

  const cues: Record<1 | 2 | 3, React.ReactNode> = {
    1: <span>Step 1: 4,000 years ago, Babylonians inscribed √2 on clay tablet YBC 7289.</span>,
    2: <span>Step 2: Base-60 fractions: 1 + 24/60 + 51/3600 + 10/216000!</span>,
    3: <span className="text-emerald-700">Step 3: Equal to 1.41421296 — accurate to 6 decimal places!</span>,
  };

  return (
    <VisualizerFrame
      title="Babylonian Tablet"
      badge="YBC 7289"
      cue={cues[step]}
      step={step}
      setStep={setStep}
      onNext={props.onNext}
      onReset={props.onReset}
      isLastQuestion={props.isLastQuestion}
    >
      {step === 1 && (
        <div className="flex items-center gap-3 animate-fade-rise">
          <div className="w-16 h-16 rounded-2xl bg-amber-100 border-2 border-amber-400 flex flex-col items-center justify-center font-serif text-amber-900 font-bold shadow-xs">
            <span className="text-small">𒎙</span>
            <span className="text-[10px]">YBC 7289</span>
          </div>
          <div className="text-micro text-slate-600 font-medium max-w-[200px]">
            Inscribed with sexagesimal marks: <strong>1; 24, 51, 10</strong>.
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="flex flex-wrap items-center justify-center gap-1.5 font-mono text-micro font-bold animate-fade-rise">
          <span className="px-2 py-1 rounded-lg bg-slate-100 border">1</span>
          <span>+</span>
          <span className="px-2 py-1 rounded-lg bg-sky-100 text-[#005583] border border-sky-300">
            24/60
          </span>
          <span>+</span>
          <span className="px-2 py-1 rounded-lg bg-sky-100 text-[#005583] border border-sky-300">
            51/3600
          </span>
          <span>+</span>
          <span className="px-2 py-1 rounded-lg bg-sky-100 text-[#005583] border border-sky-300">
            10/216000
          </span>
        </div>
      )}

      {step === 3 && (
        <div className="flex flex-col items-center gap-2 animate-fade-rise font-mono">
          <div className="px-4 py-1.5 rounded-2xl bg-emerald-600 text-white font-black text-small shadow-xs">
            1.41421296 ≈ √2 (1.41421356)
          </div>
          <div className="px-3 py-1 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-950 font-bold text-micro text-center">
            Remarkable precision! Off by less than 1 millionth 4,000 years ago!
          </div>
        </div>
      )}
    </VisualizerFrame>
  );
};

// -----------------------------------------------------------------------------
// SCENE 16: Inverse Machine Cycle Visualizer
// -----------------------------------------------------------------------------
export const InverseMachineCycleVisualizer: React.FC<QuickCheckVisualizerStageProps> = (props) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);

  const cues: Record<1 | 2 | 3, React.ReactNode> = {
    1: <span>Step 1: Two machines: Cuber (x³) and Cube Rooter (∛x).</span>,
    2: <span>Step 2: Feed in 4 $\rightarrow$ Cube Machine gives 64 $\rightarrow$ Root Machine returns 4!</span>,
    3: <span className="text-emerald-700">Step 3: ∛(n³) = n and (∛n)³ = n. They are exact inverses!</span>,
  };

  return (
    <VisualizerFrame
      title="Inverse Operations"
      badge="Cube & Cube Root"
      cue={cues[step]}
      step={step}
      setStep={setStep}
      onNext={props.onNext}
      onReset={props.onReset}
      isLastQuestion={props.isLastQuestion}
    >
      {step === 1 && (
        <div className="flex items-center gap-4 font-mono font-bold animate-fade-rise">
          <div className="p-2 rounded-xl bg-sky-50 border border-sky-300 text-center">
            <span className="text-[10px] text-sky-700 block">Machine A</span>
            <span className="text-small text-sky-950">Cube (x³)</span>
          </div>
          <span className="text-slate-400">⟷</span>
          <div className="p-2 rounded-xl bg-amber-50 border border-amber-300 text-center">
            <span className="text-[10px] text-amber-700 block">Machine B</span>
            <span className="text-small text-amber-950">Cube Root (∛x)</span>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="flex items-center gap-2 font-mono text-micro font-bold animate-fade-rise">
          <span className="px-2.5 py-1 rounded-xl bg-slate-100 border text-slate-800">Input: 4</span>
          <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="px-2.5 py-1 rounded-xl bg-sky-100 text-[#005583] border border-sky-300">
            4³ = 64
          </span>
          <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="px-2.5 py-1 rounded-xl bg-emerald-100 text-emerald-950 border border-emerald-400">
            ∛64 = 4
          </span>
        </div>
      )}

      {step === 3 && (
        <div className="flex flex-col items-center gap-1.5 animate-fade-rise font-mono">
          <div className="px-4 py-1.5 rounded-2xl bg-emerald-600 text-white font-black text-small shadow-xs">
            ∛(n³) = (∛n)³ = n
          </div>
          <div className="px-3 py-1 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-950 font-bold text-micro text-center">
            Cube and cube root undo each other completely — just like squaring and square root!
          </div>
        </div>
      )}
    </VisualizerFrame>
  );
};

// -----------------------------------------------------------------------------
// SCENE 17: Square Pairs Domino Visualizer (8 + 1 = 9 = 3²)
// -----------------------------------------------------------------------------
export const SquarePairsDominoVisualizer: React.FC<QuickCheckVisualizerStageProps> = (props) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);

  const cues: Record<1 | 2 | 3, React.ReactNode> = {
    1: <span>Step 1: We need adjacent numbers whose sum equals a square number!</span>,
    2: <span>Step 2: Test pairs: 1+2=3 (no), 2+3=5 (no)... 8+1=9 (9 = 3²)!</span>,
    3: <span className="text-emerald-700">Step 3: 8 + 1 = 9 = 3²! Tiles 8 and 1 pair up!</span>,
  };

  return (
    <VisualizerFrame
      title="Square Pairs Domino"
      badge="Sum to Square"
      cue={cues[step]}
      step={step}
      setStep={setStep}
      onNext={props.onNext}
      onReset={props.onReset}
      isLastQuestion={props.isLastQuestion}
    >
      {step === 1 && (
        <div className="flex flex-wrap items-center justify-center gap-1 font-mono text-micro font-bold animate-fade-rise">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
            <span
              key={n}
              className="w-7 h-7 rounded-lg bg-slate-100 border border-slate-300 flex items-center justify-center text-slate-700"
            >
              {n}
            </span>
          ))}
        </div>
      )}

      {step === 2 && (
        <div className="flex items-center gap-2 font-mono text-small font-bold animate-fade-rise">
          <span className="w-9 h-9 rounded-xl bg-sky-100 text-[#005583] border border-sky-300 flex items-center justify-center font-black">
            8
          </span>
          <span className="text-slate-400">+</span>
          <span className="w-9 h-9 rounded-xl bg-sky-100 text-[#005583] border border-sky-300 flex items-center justify-center font-black">
            1
          </span>
          <span className="text-slate-400">=</span>
          <span className="px-3 py-1.5 rounded-xl bg-emerald-100 text-emerald-950 border border-emerald-400 font-black">
            9 = 3² ✓
          </span>
        </div>
      )}

      {step === 3 && (
        <div className="flex flex-col items-center gap-2 animate-fade-rise font-mono">
          <div className="px-5 py-2 rounded-2xl bg-emerald-600 text-white font-black text-statement shadow-xs">
            8 + 1 = 9 = 3²
          </div>
          <div className="px-3 py-1 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-950 font-bold text-micro text-center">
            The pair 8 and 1 adds to 9, which is the perfect square 3²!
          </div>
        </div>
      )}
    </VisualizerFrame>
  );
};

// -----------------------------------------------------------------------------
// SCENE 18: Square Root 1764 Tree Visualizer (√1764 = 42)
// -----------------------------------------------------------------------------
export const SquareRoot1764TreeVisualizer: React.FC<QuickCheckVisualizerStageProps> = (props) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);

  const cues: Record<1 | 2 | 3, React.ReactNode> = {
    1: <span>Step 1: Prime factorise 1764: 2 × 2 × 3 × 3 × 7 × 7.</span>,
    2: <span>Step 2: Group identical pairs: (2²), (3²), (7²).</span>,
    3: <span className="text-emerald-700">Step 3: √1764 = 2 × 3 × 7 = 42!</span>,
  };

  return (
    <VisualizerFrame
      title="Prime Pair Tree"
      badge="√1764"
      cue={cues[step]}
      step={step}
      setStep={setStep}
      onNext={props.onNext}
      onReset={props.onReset}
      isLastQuestion={props.isLastQuestion}
    >
      {step === 1 && (
        <div className="flex flex-col items-center gap-1.5 animate-fade-rise font-mono text-micro font-bold">
          <div className="text-small text-slate-800 font-black">
            1764 = 2 × 2 × 3 × 3 × 7 × 7
          </div>
          <span className="text-slate-500">Every prime factor appears twice!</span>
        </div>
      )}

      {step === 2 && (
        <div className="flex items-center gap-2 font-mono text-micro font-bold animate-fade-rise">
          <span className="px-3 py-1.5 rounded-xl bg-sky-100 text-[#005583] border border-sky-300">
            (2 × 2)
          </span>
          <span>×</span>
          <span className="px-3 py-1.5 rounded-xl bg-amber-100 text-amber-950 border border-amber-300">
            (3 × 3)
          </span>
          <span>×</span>
          <span className="px-3 py-1.5 rounded-xl bg-purple-100 text-purple-950 border border-purple-300">
            (7 × 7)
          </span>
        </div>
      )}

      {step === 3 && (
        <div className="flex flex-col items-center gap-2 animate-fade-rise font-mono">
          <div className="flex items-center gap-2 text-statement font-black text-emerald-900">
            <span>√1764 = 2 × 3 × 7 =</span>
            <span className="px-3.5 py-1.5 rounded-2xl bg-emerald-600 text-white shadow-xs">
              42
            </span>
          </div>
          <div className="px-3 py-1 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-950 font-bold text-micro text-center">
            Take one prime from each pair: 2 × 3 × 7 = <strong>42</strong>!
          </div>
        </div>
      )}
    </VisualizerFrame>
  );
};

// -----------------------------------------------------------------------------
// SCENE 19: Triplet Completion Visualizer (1323 × 7 = 9261)
// -----------------------------------------------------------------------------
export const TripletCompletionVisualizer: React.FC<QuickCheckVisualizerStageProps> = (props) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);

  const cues: Record<1 | 2 | 3, React.ReactNode> = {
    1: <span>Step 1: Prime factorise 1323: 3 × 3 × 3 × 7 × 7.</span>,
    2: <span>Step 2: Factor 3 has a triplet (3³), but 7 only has a pair (7²)!</span>,
    3: <span className="text-emerald-700">Step 3: Multiply by 7 $\rightarrow$ 1323 × 7 = 9261 = 21³!</span>,
  };

  return (
    <VisualizerFrame
      title="Triplet Completion"
      badge="Multiply 1323"
      cue={cues[step]}
      step={step}
      setStep={setStep}
      onNext={props.onNext}
      onReset={props.onReset}
      isLastQuestion={props.isLastQuestion}
    >
      {step === 1 && (
        <div className="flex flex-col items-center gap-1.5 animate-fade-rise font-mono text-micro font-bold">
          <div className="text-small text-slate-800 font-black">
            1323 = 3 × 3 × 3 × 7 × 7
          </div>
          <span className="text-slate-500">Need triplets of 3 identical factors for a cube!</span>
        </div>
      )}

      {step === 2 && (
        <div className="flex items-center gap-2 font-mono text-micro font-bold animate-fade-rise">
          <span className="px-3 py-1.5 rounded-xl bg-emerald-100 text-emerald-950 border border-emerald-400">
            (3 × 3 × 3) ✓ Complete
          </span>
          <span>×</span>
          <span className="px-3 py-1.5 rounded-xl bg-amber-100 text-amber-950 border-2 border-dashed border-amber-500 animate-pulse">
            (7 × 7 × <strong className="underline text-amber-700">_?</strong>)
          </span>
        </div>
      )}

      {step === 3 && (
        <div className="flex flex-col items-center gap-2 animate-fade-rise font-mono">
          <div className="flex items-center gap-2 text-statement font-black text-emerald-900">
            <span>1323 × 7 =</span>
            <span className="px-3.5 py-1.5 rounded-2xl bg-emerald-600 text-white shadow-xs">
              9261 = 21³
            </span>
          </div>
          <div className="px-3 py-1 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-950 font-bold text-micro text-center">
            Multiply by <strong>7</strong> so the factor 7 completes its triplet!
          </div>
        </div>
      )}
    </VisualizerFrame>
  );
};

// -----------------------------------------------------------------------------
// SCENE 20: Cube Root Estimation Visualizer (∛13824 = 24)
// -----------------------------------------------------------------------------
export const CubeRootEstimationVisualizer: React.FC<QuickCheckVisualizerStageProps> = (props) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);

  const cues: Record<1 | 2 | 3, React.ReactNode> = {
    1: <span>Step 1: Split 13,824 into groups of 3: left [13] | right [824].</span>,
    2: <span>Step 2: 2³ ≤ 13 &lt; 3³ $\rightarrow$ Tens digit is 2. 824 ends in 4 $\rightarrow$ Units digit is 4.</span>,
    3: <span className="text-emerald-700">Step 3: Combine digits: ∛13824 = 24!</span>,
  };

  return (
    <VisualizerFrame
      title="Cube Root Estimation"
      badge="∛13824"
      cue={cues[step]}
      step={step}
      setStep={setStep}
      onNext={props.onNext}
      onReset={props.onReset}
      isLastQuestion={props.isLastQuestion}
    >
      {step === 1 && (
        <div className="flex items-center gap-2 font-mono font-bold animate-fade-rise">
          <div className="p-2 rounded-xl bg-sky-100 text-[#005583] border border-sky-300 text-center">
            <span className="text-[10px] block text-sky-700">Group 2 (Tens)</span>
            <span className="text-statement font-black">13</span>
          </div>
          <span className="text-statement text-slate-400">|</span>
          <div className="p-2 rounded-xl bg-amber-100 text-amber-950 border border-amber-300 text-center">
            <span className="text-[10px] block text-amber-700">Group 1 (Units)</span>
            <span className="text-statement font-black">824</span>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="flex flex-col gap-1.5 w-full max-w-sm font-mono text-micro font-bold animate-fade-rise">
          <div className="p-1.5 rounded-lg bg-sky-50 border border-sky-200 flex items-center justify-between">
            <span>2³ = 8 ≤ 13 &lt; 27 = 3³</span>
            <span className="text-[#005583]">Tens digit = 2</span>
          </div>
          <div className="p-1.5 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-between">
            <span>824 ends in 4 (4³ = 64)</span>
            <span className="text-amber-800">Units digit = 4</span>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="flex flex-col items-center gap-2 animate-fade-rise font-mono">
          <div className="flex items-center gap-2 text-statement font-black text-emerald-900">
            <span>∛13824 =</span>
            <span className="px-4 py-2 rounded-2xl bg-emerald-600 text-white shadow-xs">
              24
            </span>
          </div>
          <div className="px-3 py-1 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-950 font-bold text-micro text-center">
            24³ = 24 × 24 × 24 = 13,824! Digit-grouping method gives exact root!
          </div>
        </div>
      )}
    </VisualizerFrame>
  );
};
