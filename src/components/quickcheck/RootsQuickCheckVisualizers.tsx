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
// SCENE 6: Courtyard Principal Root Visualizer (√81 = 9)
// -----------------------------------------------------------------------------
export const CourtyardPrincipalRootVisualizer: React.FC<QuickCheckVisualizerStageProps> = (props) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);

  const cues: Record<1 | 2 | 3, React.ReactNode> = {
    1: <span>Step 1: Both (+9)² = 81 and (−9)² = 81. Which is √81?</span>,
    2: <span>Step 2: The radical symbol √ is defined as the POSITIVE root!</span>,
    3: <span className="text-emerald-700">Step 3: √81 = +9 (Principal root)!</span>,
  };

  return (
    <VisualizerFrame
      title="Principal Square Root"
      badge="√81"
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
            <span className="text-micro text-sky-700 block">Option A</span>
            <span className="text-statement text-sky-950 font-black">+9</span>
          </div>
          <span className="text-statement text-slate-400">vs</span>
          <div className="p-2 rounded-xl bg-rose-50 border border-rose-300 text-center">
            <span className="text-micro text-rose-700 block">Option B</span>
            <span className="text-statement text-rose-950 font-black">-9</span>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="flex flex-col items-center gap-1.5 animate-fade-rise">
          <div className="flex items-center gap-3 font-mono">
            <div className="px-3 py-1.5 rounded-xl bg-emerald-100 text-emerald-950 font-black text-small border border-emerald-400">
              +9 Passes Gate ✓
            </div>
            <div className="px-3 py-1.5 rounded-xl bg-rose-100 text-rose-800 font-bold text-micro border border-rose-300 opacity-60 line-through">
              -9 Blocked
            </div>
          </div>
          <span className="text-micro text-slate-600 font-medium">
            In school math, side length and √ always mean the non-negative value.
          </span>
        </div>
      )}

      {step === 3 && (
        <div className="flex flex-col items-center gap-2 animate-fade-rise font-mono">
          <div className="px-5 py-2 rounded-2xl bg-emerald-600 text-white font-black text-statement shadow-xs">
            √81 = 9
          </div>
          <div className="px-3 py-1 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-950 font-bold text-micro text-center">
            +9 is the PRINCIPAL square root. By convention, √ always means the positive answer!
          </div>
        </div>
      )}
    </VisualizerFrame>
  );
};

// -----------------------------------------------------------------------------
// SCENE 7: Prime Factor Pair Grouping Visualizer (√144 = 12)
// -----------------------------------------------------------------------------
export const PrimeFactorPairGroupingVisualizer: React.FC<QuickCheckVisualizerStageProps> = (props) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);

  const cues: Record<1 | 2 | 3, React.ReactNode> = {
    1: <span>Step 1: Prime factorise 144: 2 × 2 × 2 × 2 × 3 × 3.</span>,
    2: <span>Step 2: Group identical factors into pairs: (2×2), (2×2), (3×3).</span>,
    3: <span className="text-emerald-700">Step 3: Take ONE from each pair: 2 × 2 × 3 = 12!</span>,
  };

  return (
    <VisualizerFrame
      title="Prime Factor Pairs"
      badge="√144"
      cue={cues[step]}
      step={step}
      setStep={setStep}
      onNext={props.onNext}
      onReset={props.onReset}
      isLastQuestion={props.isLastQuestion}
    >
      {step === 1 && (
        <div className="flex flex-col items-center gap-1.5 animate-fade-rise font-mono">
          <div className="text-small font-black text-slate-800">
            144 = 2 × 2 × 2 × 2 × 3 × 3
          </div>
          <span className="text-micro text-slate-500 font-medium">
            All prime building blocks revealed
          </span>
        </div>
      )}

      {step === 2 && (
        <div className="flex items-center gap-2 font-mono text-micro font-bold animate-fade-rise">
          <span className="px-3 py-1.5 rounded-xl bg-sky-100 text-[#005583] border border-sky-300">
            (2 × 2)
          </span>
          <span>×</span>
          <span className="px-3 py-1.5 rounded-xl bg-sky-100 text-[#005583] border border-sky-300">
            (2 × 2)
          </span>
          <span>×</span>
          <span className="px-3 py-1.5 rounded-xl bg-amber-100 text-amber-950 border border-amber-300">
            (3 × 3)
          </span>
        </div>
      )}

      {step === 3 && (
        <div className="flex flex-col items-center gap-2 animate-fade-rise font-mono">
          <div className="flex items-center gap-2 text-statement font-black text-emerald-900">
            <span>√144 = 2 × 2 × 3 =</span>
            <span className="px-3.5 py-1.5 rounded-2xl bg-emerald-600 text-white shadow-xs">
              12
            </span>
          </div>
          <div className="px-3 py-1 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-950 font-bold text-micro text-center">
            Pull exactly ONE number out of each locked pair: 2 × 2 × 3 = 12!
          </div>
        </div>
      )}
    </VisualizerFrame>
  );
};

// -----------------------------------------------------------------------------
// SCENE 8: Root Sandwich Number Line Visualizer (Estimating √85)
// -----------------------------------------------------------------------------
export const RootSandwichNumberLineVisualizer: React.FC<QuickCheckVisualizerStageProps> = (props) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);

  const cues: Record<1 | 2 | 3, React.ReactNode> = {
    1: <span>Step 1: Trap 85 between known squares: 81 (9²) and 100 (10²).</span>,
    2: <span>Step 2: Take square roots: 9 &lt; √85 &lt; 10.</span>,
    3: <span className="text-emerald-700">Step 3: 85 is close to 81, so √85 ≈ 9.2 (between 9 and 10)!</span>,
  };

  return (
    <VisualizerFrame
      title="Estimating Roots"
      badge="√85 Sandwich"
      cue={cues[step]}
      step={step}
      setStep={setStep}
      onNext={props.onNext}
      onReset={props.onReset}
      isLastQuestion={props.isLastQuestion}
    >
      {step === 1 && (
        <div className="flex items-center gap-3 font-mono font-bold animate-fade-rise">
          <span className="px-2.5 py-1 rounded-xl bg-slate-100 border text-slate-700">81 (9²)</span>
          <span className="text-slate-400">&lt;</span>
          <span className="px-3 py-1.5 rounded-xl bg-amber-100 text-amber-950 border-2 border-amber-400 font-black">
            85
          </span>
          <span className="text-slate-400">&lt;</span>
          <span className="px-2.5 py-1 rounded-xl bg-slate-100 border text-slate-700">100 (10²)</span>
        </div>
      )}

      {step === 2 && (
        <div className="flex items-center gap-2 font-mono text-small font-bold animate-fade-rise">
          <span className="px-3 py-1.5 rounded-xl bg-sky-100 text-sky-900 border">9</span>
          <span className="text-slate-400">&lt;</span>
          <span className="px-3.5 py-1.5 rounded-xl bg-emerald-100 text-emerald-950 border-2 border-emerald-500 font-black">
            √85
          </span>
          <span className="text-slate-400">&lt;</span>
          <span className="px-3 py-1.5 rounded-xl bg-sky-100 text-sky-900 border">10</span>
        </div>
      )}

      {step === 3 && (
        <div className="flex flex-col items-center gap-2 animate-fade-rise font-mono">
          <div className="px-5 py-2 rounded-2xl bg-emerald-600 text-white font-black text-statement shadow-xs">
            9 &lt; √85 &lt; 10 (≈ 9.22)
          </div>
          <div className="px-3 py-1 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-950 font-bold text-micro text-center">
            Since 85 is much closer to 81 (gap 4) than 100 (gap 15), √85 is close to 9.2!
          </div>
        </div>
      )}
    </VisualizerFrame>
  );
};
