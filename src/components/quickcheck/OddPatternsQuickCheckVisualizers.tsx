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
// SCENE 4 Q0: L-Shaped Odd Gnomon Visualizer (Sum of first 8 odds = 8² = 64)
// -----------------------------------------------------------------------------
export const LShapedOddGnomonVisualizer: React.FC<QuickCheckVisualizerStageProps> = (props) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);

  const cues: Record<1 | 2 | 3, React.ReactNode> = {
    1: <span>Step 1: Start with 1 dot. We add consecutive odd numbers as L-layers!</span>,
    2: <span>Step 2: Each L-layer (+3, +5, +7, +9, +11, +13, +15) wraps into a square!</span>,
    3: <span className="text-emerald-700">Step 3: Sum of 8 odds = 8² = 64!</span>,
  };

  const layers = [
    { count: 1, color: 'bg-rose-500' },
    { count: 3, color: 'bg-amber-500' },
    { count: 5, color: 'bg-emerald-500' },
    { count: 7, color: 'bg-sky-500' },
    { count: 9, color: 'bg-indigo-500' },
    { count: 11, color: 'bg-purple-500' },
    { count: 13, color: 'bg-pink-500' },
    { count: 15, color: 'bg-teal-500' },
  ];

  return (
    <VisualizerFrame
      title="L-Shaped Gnomons"
      badge="First 8 Odds"
      cue={cues[step]}
      step={step}
      setStep={setStep}
      onNext={props.onNext}
      onReset={props.onReset}
      isLastQuestion={props.isLastQuestion}
    >
      {step === 1 && (
        <div className="flex flex-col items-center gap-2 animate-fade-rise">
          <div className="w-6 h-6 rounded-md bg-rose-500 flex items-center justify-center text-white font-mono font-bold text-micro shadow-xs">
            1
          </div>
          <span className="text-micro font-bold text-slate-600">
            Base: 1 = 1² (First odd number)
          </span>
        </div>
      )}

      {step === 2 && (
        <div className="flex flex-col items-center gap-1.5 animate-fade-rise">
          <div className="flex flex-wrap items-center justify-center gap-1 max-w-xs font-mono text-[11px] font-bold">
            {layers.map((l, i) => (
              <span
                key={i}
                className={`px-2 py-0.5 rounded-lg text-white ${l.color} shadow-2xs`}
              >
                +{l.count}
              </span>
            ))}
          </div>
          <span className="text-micro font-bold text-slate-700">
            8 odd layers: 1 + 3 + 5 + 7 + 9 + 11 + 13 + 15
          </span>
        </div>
      )}

      {step === 3 && (
        <div className="flex flex-col items-center gap-2 animate-fade-rise">
          <div className="px-5 py-2 rounded-2xl bg-emerald-600 text-white font-mono font-black text-statement shadow-xs">
            Sum of 8 odds = 8² = 64
          </div>
          <div className="px-3 py-1 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-950 font-bold text-micro text-center">
            The sum of the first n odd natural numbers is ALWAYS n²!
          </div>
        </div>
      )}
    </VisualizerFrame>
  );
};

// -----------------------------------------------------------------------------
// SCENE 4 Q1: Nth Odd Formula (2n − 1)
// -----------------------------------------------------------------------------
export const OddSequenceFormulaVisualizer: React.FC<QuickCheckVisualizerStageProps> = (props) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);

  const cues: Record<1 | 2 | 3, React.ReactNode> = {
    1: <span>Step 1: Look at the positions: 1st=1, 2nd=3, 3rd=5, 4th=7.</span>,
    2: <span>Step 2: Discover the rule: Nth term = 2 × (position) − 1!</span>,
    3: <span className="text-emerald-700">Step 3: 20th odd number = 2(20) − 1 = 39!</span>,
  };

  return (
    <VisualizerFrame
      title="Nth Odd Formula"
      badge="Position 20"
      cue={cues[step]}
      step={step}
      setStep={setStep}
      onNext={props.onNext}
      onReset={props.onReset}
      isLastQuestion={props.isLastQuestion}
    >
      {step === 1 && (
        <div className="flex items-center gap-2 font-mono text-micro font-bold animate-fade-rise">
          <div className="p-1.5 rounded-lg bg-slate-100 border text-center">
            <div className="text-[10px] text-slate-500">n=1</div>
            <div className="text-slate-900 font-extrabold text-small">1</div>
          </div>
          <div className="p-1.5 rounded-lg bg-slate-100 border text-center">
            <div className="text-[10px] text-slate-500">n=2</div>
            <div className="text-slate-900 font-extrabold text-small">3</div>
          </div>
          <div className="p-1.5 rounded-lg bg-slate-100 border text-center">
            <div className="text-[10px] text-slate-500">n=3</div>
            <div className="text-slate-900 font-extrabold text-small">5</div>
          </div>
          <div className="p-1.5 rounded-lg bg-slate-100 border text-center">
            <div className="text-[10px] text-slate-500">n=4</div>
            <div className="text-slate-900 font-extrabold text-small">7</div>
          </div>
          <span className="text-slate-400">...</span>
        </div>
      )}

      {step === 2 && (
        <div className="flex flex-col items-center gap-1.5 animate-fade-rise font-mono">
          <div className="px-3 py-1.5 rounded-xl bg-sky-100 text-[#005583] font-black text-small border border-sky-300">
            Rule: 2n − 1
          </div>
          <div className="text-micro text-slate-600">
            For n=1: 2(1)−1 = 1 | For n=2: 2(2)−1 = 3 | For n=3: 2(3)−1 = 5
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="flex flex-col items-center gap-2 animate-fade-rise font-mono">
          <div className="px-4 py-2 rounded-2xl bg-emerald-600 text-white font-black text-statement shadow-xs">
            2(20) − 1 = 40 − 1 = 39
          </div>
          <div className="px-3 py-1 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-950 font-bold text-micro text-center">
            The 20th odd natural number is <strong>39</strong>!
          </div>
        </div>
      )}
    </VisualizerFrame>
  );
};

// -----------------------------------------------------------------------------
// SCENE 4 Q2: Odd Subtraction Ladder (50 not a square)
// -----------------------------------------------------------------------------
export const OddSubtractionLadderVisualizer: React.FC<QuickCheckVisualizerStageProps> = (props) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);

  const cues: Record<1 | 2 | 3, React.ReactNode> = {
    1: <span>Step 1: Subtract consecutive odds: 1, 3, 5, 7, 9, 11, 13...</span>,
    2: <span>Step 2: Watch 50 hit 1, then skip past 0 into negative (-14)!</span>,
    3: <span className="text-rose-700">Step 3: Never hits 0 $\rightarrow$ 50 is NOT a square!</span>,
  };

  return (
    <VisualizerFrame
      title="Repeated Subtraction"
      badge="Testing 50"
      cue={cues[step]}
      step={step}
      setStep={setStep}
      onNext={props.onNext}
      onReset={props.onReset}
      isLastQuestion={props.isLastQuestion}
    >
      {step === 1 && (
        <div className="flex flex-col items-center gap-1.5 animate-fade-rise font-mono text-micro font-bold">
          <div className="text-slate-800 text-small font-black">Starting: 50</div>
          <div className="text-slate-500">
            Rule: Perfect squares hit EXACTLY 0. Let's subtract odds!
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="flex flex-wrap items-center justify-center gap-1.5 max-w-sm font-mono text-[11px] font-bold animate-fade-rise">
          <span className="px-2 py-0.5 rounded bg-slate-100">50 - 1 = 49</span>
          <span className="px-2 py-0.5 rounded bg-slate-100">49 - 3 = 46</span>
          <span className="px-2 py-0.5 rounded bg-slate-100">46 - 5 = 41</span>
          <span className="px-2 py-0.5 rounded bg-slate-100">41 - 7 = 34</span>
          <span className="px-2 py-0.5 rounded bg-slate-100">34 - 9 = 25</span>
          <span className="px-2 py-0.5 rounded bg-slate-100">25 - 11 = 14</span>
          <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-950 border border-amber-300">
            14 - 13 = 1
          </span>
          <span className="px-2 py-0.5 rounded bg-rose-200 text-rose-950 font-black border border-rose-400">
            1 - 15 = -14 ✗
          </span>
        </div>
      )}

      {step === 3 && (
        <div className="flex flex-col items-center gap-1.5 animate-fade-rise">
          <div className="px-4 py-1.5 rounded-2xl bg-rose-600 text-white font-mono font-black text-statement shadow-xs">
            50 is NOT a Perfect Square
          </div>
          <div className="px-3 py-1 rounded-xl bg-rose-50 border border-rose-300 text-rose-950 font-bold text-micro text-center">
            49 hits 0 after 7 steps (7² = 49). 50 skips right over 0 to -14!
          </div>
        </div>
      )}
    </VisualizerFrame>
  );
};

// -----------------------------------------------------------------------------
// SCENE 5 Q0: Between Squares Interval (20² and 21²)
// -----------------------------------------------------------------------------
export const BetweenSquaresIntervalVisualizer: React.FC<QuickCheckVisualizerStageProps> = (props) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);

  const cues: Record<1 | 2 | 3, React.ReactNode> = {
    1: <span>Step 1: Check the boundary squares: 20² = 400 and 21² = 441.</span>,
    2: <span>Step 2: Gap formula: (n+1)² − n² − 1 = 2n numbers!</span>,
    3: <span className="text-emerald-700">Step 3: 2 × 20 = exactly 40 non-square numbers!</span>,
  };

  return (
    <VisualizerFrame
      title="Between Squares"
      badge="20² to 21²"
      cue={cues[step]}
      step={step}
      setStep={setStep}
      onNext={props.onNext}
      onReset={props.onReset}
      isLastQuestion={props.isLastQuestion}
    >
      {step === 1 && (
        <div className="flex items-center gap-4 font-mono font-bold animate-fade-rise">
          <div className="p-2 rounded-xl bg-slate-100 border text-center">
            <span className="text-[10px] text-slate-500 block">Start</span>
            <span className="text-small text-slate-800">20² = 400</span>
          </div>
          <span className="text-slate-400">... gap ...</span>
          <div className="p-2 rounded-xl bg-slate-100 border text-center">
            <span className="text-[10px] text-slate-500 block">End</span>
            <span className="text-small text-slate-800">21² = 441</span>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="flex flex-col items-center gap-2 animate-fade-rise font-mono">
          <div className="px-3.5 py-1.5 rounded-xl bg-sky-100 text-[#005583] font-black text-small border border-sky-300">
            Between n² and (n+1)² there are 2n numbers
          </div>
          <div className="text-micro text-slate-600">
            441 − 400 − 1 = 40 numbers (401 through 440)
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="flex flex-col items-center gap-2 animate-fade-rise font-mono">
          <div className="px-5 py-2 rounded-2xl bg-emerald-600 text-white font-black text-statement shadow-xs">
            2 × 20 = 40 Non-Squares
          </div>
          <div className="px-3 py-1 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-950 font-bold text-micro text-center">
            Between any consecutive squares n² and (n+1)², there are always <strong>2n</strong> non-squares!
          </div>
        </div>
      )}
    </VisualizerFrame>
  );
};

// -----------------------------------------------------------------------------
// SCENE 5 Q1: Triangular Zipper Visualizer (T(n-1) + T(n) = n²)
// -----------------------------------------------------------------------------
export const TriangularZipperVisualizer: React.FC<QuickCheckVisualizerStageProps> = (props) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);

  const cues: Record<1 | 2 | 3, React.ReactNode> = {
    1: <span>Step 1: Look at two consecutive triangular numbers, say T₃=6 and T₄=10.</span>,
    2: <span>Step 2: Flip the smaller triangle and snap it into the larger one!</span>,
    3: <span className="text-emerald-700">Step 3: 6 + 10 = 16 = 4²! Always forms a square!</span>,
  };

  return (
    <VisualizerFrame
      title="Triangular Zipper"
      badge="T₃ + T₄ = 4²"
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
            <span className="text-[10px] text-sky-700 block">T₃</span>
            <span className="text-small text-sky-950 font-black">6 dots</span>
          </div>
          <span className="text-statement text-slate-400">+</span>
          <div className="p-2 rounded-xl bg-amber-50 border border-amber-300 text-center">
            <span className="text-[10px] text-amber-700 block">T₄</span>
            <span className="text-small text-amber-950 font-black">10 dots</span>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="flex flex-col items-center gap-1.5 animate-fade-rise">
          <div className="grid grid-cols-4 gap-1 p-2 rounded-xl bg-slate-50 border border-slate-300">
            {Array.from({ length: 16 }, (_, idx) => {
              const r = Math.floor(idx / 4);
              const c = idx % 4;
              const isT3 = r < c;
              return (
                <div
                  key={idx}
                  className={`w-3.5 h-3.5 rounded-full ${
                    isT3 ? 'bg-sky-500' : 'bg-amber-500'
                  }`}
                />
              );
            })}
          </div>
          <span className="text-[11px] font-bold text-slate-700">
            6 blue dots (T₃) + 10 amber dots (T₄) fit seamlessly!
          </span>
        </div>
      )}

      {step === 3 && (
        <div className="flex flex-col items-center gap-2 animate-fade-rise font-mono">
          <div className="px-5 py-2 rounded-2xl bg-emerald-600 text-white font-black text-statement shadow-xs">
            T(n-1) + T(n) = n²
          </div>
          <div className="px-3 py-1 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-950 font-bold text-micro text-center">
            Any two consecutive triangular numbers zip together to form a square number!
          </div>
        </div>
      )}
    </VisualizerFrame>
  );
};

// -----------------------------------------------------------------------------
// SCENE 5 Q2: Hundred Block Finder
// -----------------------------------------------------------------------------
export const HundredBlockFinderVisualizer: React.FC<QuickCheckVisualizerStageProps> = (props) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);

  const cues: Record<1 | 2 | 3, React.ReactNode> = {
    1: <span>Step 1: Check candidate square numbers around 100.</span>,
    2: <span>Step 2: 9² = 81, 10² = 100, 11² = 121.</span>,
    3: <span className="text-emerald-700">Step 3: 100 = 10²! 100 is itself a perfect square!</span>,
  };

  return (
    <VisualizerFrame
      title="Square Numbers Check"
      badge="Number 100"
      cue={cues[step]}
      step={step}
      setStep={setStep}
      onNext={props.onNext}
      onReset={props.onReset}
      isLastQuestion={props.isLastQuestion}
    >
      {step === 1 && (
        <div className="flex items-center gap-3 font-mono font-bold animate-fade-rise">
          <div className="p-2 rounded-xl bg-slate-100 border text-center">
            <span className="text-small text-slate-700">Target: 100</span>
          </div>
          <span className="text-micro text-slate-500">Is 100 a perfect square?</span>
        </div>
      )}

      {step === 2 && (
        <div className="flex items-center gap-2 font-mono text-micro font-bold animate-fade-rise">
          <span className="px-2.5 py-1 rounded-xl bg-slate-100 border">9² = 81</span>
          <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="px-3 py-1.5 rounded-xl bg-emerald-100 text-emerald-950 border-2 border-emerald-500 font-black">
            10² = 100
          </span>
          <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="px-2.5 py-1 rounded-xl bg-slate-100 border">11² = 121</span>
        </div>
      )}

      {step === 3 && (
        <div className="flex flex-col items-center gap-2 animate-fade-rise font-mono">
          <div className="px-5 py-2 rounded-2xl bg-emerald-600 text-white font-black text-statement shadow-xs">
            100 = 10² ✓
          </div>
          <div className="px-3 py-1 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-950 font-bold text-micro text-center">
            100 is an exact perfect square — 10 rows of 10!
          </div>
        </div>
      )}
    </VisualizerFrame>
  );
};
