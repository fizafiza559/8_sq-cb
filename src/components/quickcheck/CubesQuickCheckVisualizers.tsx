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
// SCENE 9: Isometric Cube Volume Visualizer (Edge 5 → 125)
// -----------------------------------------------------------------------------
export const IsometricCubeVolumeVisualizer: React.FC<QuickCheckVisualizerStageProps> = (props) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);

  const cues: Record<1 | 2 | 3, React.ReactNode> = {
    1: <span>Step 1: An edge-5 cube has 5 square layers of 5×5 unit cubes.</span>,
    2: <span>Step 2: Stack each layer: 25 + 25 + 25 + 25 + 25 = 125 cubes!</span>,
    3: <span className="text-emerald-700">Step 3: Volume = 5 × 5 × 5 = 5³ = 125 cubic units!</span>,
  };

  return (
    <VisualizerFrame
      title="Cube Volume"
      badge="Edge 5 Cube"
      cue={cues[step]}
      step={step}
      setStep={setStep}
      onNext={props.onNext}
      onReset={props.onReset}
      isLastQuestion={props.isLastQuestion}
    >
      {step === 1 && (
        <div className="flex items-center gap-4 animate-fade-rise">
          <div className="w-20 h-20 rounded-xl bg-sky-50 border-2 border-dashed border-[#005583] flex flex-col items-center justify-center">
            <Box className="w-8 h-8 text-[#005583]" />
            <span className="text-[10px] font-bold text-[#005583]">5 × 5 × 5</span>
          </div>
          <div className="text-micro text-slate-600 font-medium">
            Length = 5, Width = 5, Height = 5. Tap to stack the 5 layers!
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="flex flex-col items-center gap-1.5 animate-fade-rise font-mono">
          <div className="flex items-center gap-1">
            {[25, 50, 75, 100, 125].map((val, idx) => (
              <span
                key={idx}
                className="px-2 py-1 rounded-lg bg-sky-100 text-[#005583] font-bold text-micro border border-sky-300"
              >
                L{idx + 1}: {val}
              </span>
            ))}
          </div>
          <span className="text-micro font-bold text-slate-700">
            5 layers of 25 cubes each
          </span>
        </div>
      )}

      {step === 3 && (
        <div className="flex flex-col items-center gap-2 animate-fade-rise font-mono">
          <div className="px-5 py-2 rounded-2xl bg-emerald-600 text-white font-black text-statement shadow-xs">
            5³ = 125 Cubic Units
          </div>
          <div className="px-3 py-1 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-950 font-bold text-micro text-center">
            A cube with edge length s always contains s³ unit cubes!
          </div>
        </div>
      )}
    </VisualizerFrame>
  );
};

// -----------------------------------------------------------------------------
// SCENE 10: Cube Zeros Tripler Visualizer (200³ → 6 zeros)
// -----------------------------------------------------------------------------
export const CubeZerosTriplerVisualizer: React.FC<QuickCheckVisualizerStageProps> = (props) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);

  const cues: Record<1 | 2 | 3, React.ReactNode> = {
    1: <span>Step 1: Count the trailing zeros in 200 — it has 2 zeros.</span>,
    2: <span>Step 2: Cubing TRIPLES trailing zeros: 2 zeros × 3 = 6 zeros!</span>,
    3: <span className="text-emerald-700">Step 3: 200³ = 8,000,000 (exactly 6 zeros)!</span>,
  };

  return (
    <VisualizerFrame
      title="Cube Zeros Rule"
      badge="200³"
      cue={cues[step]}
      step={step}
      setStep={setStep}
      onNext={props.onNext}
      onReset={props.onReset}
      isLastQuestion={props.isLastQuestion}
    >
      {step === 1 && (
        <div className="flex flex-col items-center gap-2 animate-fade-rise font-mono">
          <div className="text-display font-black text-slate-800">
            2
            <span className="text-amber-600 bg-amber-100 px-2 py-0.5 rounded-xl border border-amber-300">
              00
            </span>
          </div>
          <span className="text-micro font-bold text-slate-600">
            Base number has <strong>2 trailing zeros</strong>
          </span>
        </div>
      )}

      {step === 2 && (
        <div className="flex items-center gap-3 animate-fade-rise font-mono">
          <div className="px-3 py-1.5 rounded-xl bg-amber-100 text-amber-950 font-bold text-small border border-amber-300">
            2 zeros
          </div>
          <span className="text-statement font-black text-[#005583]">× 3</span>
          <ArrowRight className="w-4 h-4 text-slate-400" />
          <div className="px-3 py-1.5 rounded-xl bg-emerald-100 text-emerald-950 font-black text-small border border-emerald-400">
            6 zeros
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="flex flex-col items-center gap-1.5 animate-fade-rise font-mono">
          <div className="text-statement font-black text-slate-900">
            200³ = 8,<span className="text-emerald-600 underline">000,000</span>
          </div>
          <div className="px-3 py-1 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-950 font-bold text-micro text-center">
            Trailing zeros ALWAYS triple when you cube! 2 × 3 = 6 zeros.
          </div>
        </div>
      )}
    </VisualizerFrame>
  );
};

// -----------------------------------------------------------------------------
// SCENE 11: Taxicab Dual Cube Visualizer (1729)
// -----------------------------------------------------------------------------
export const TaxicabDualCubeVisualizer: React.FC<QuickCheckVisualizerStageProps> = (props) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);

  const cues: Record<1 | 2 | 3, React.ReactNode> = {
    1: <span>Step 1: 1729 is the smallest number with a very rare property.</span>,
    2: <span>Step 2: Way 1: 1³ + 12³ = 1729. Way 2: 9³ + 10³ = 1729!</span>,
    3: <span className="text-emerald-700">Step 3: Smallest sum of two cubes in two different ways!</span>,
  };

  return (
    <VisualizerFrame
      title="Ramanujan Taxicab"
      badge="Number 1729"
      cue={cues[step]}
      step={step}
      setStep={setStep}
      onNext={props.onNext}
      onReset={props.onReset}
      isLastQuestion={props.isLastQuestion}
    >
      {step === 1 && (
        <div className="flex flex-col items-center gap-1.5 animate-fade-rise font-mono">
          <div className="text-display font-black text-[#005583] tracking-widest">
            1729
          </div>
          <span className="text-micro font-bold text-slate-500">
            "A very interesting number!" — Srinivasa Ramanujan
          </span>
        </div>
      )}

      {step === 2 && (
        <div className="flex flex-col gap-2 w-full max-w-sm animate-fade-rise font-mono text-micro font-bold">
          <div className="p-2 rounded-xl bg-sky-50 border border-sky-300 flex items-center justify-between">
            <span>Way 1: 1³ + 12³</span>
            <span className="text-[#005583]">1 + 1728 = 1729</span>
          </div>
          <div className="p-2 rounded-xl bg-amber-50 border border-amber-300 flex items-center justify-between">
            <span>Way 2: 9³ + 10³</span>
            <span className="text-amber-800">729 + 1000 = 1729</span>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="flex flex-col items-center gap-1.5 animate-fade-rise font-mono">
          <div className="px-5 py-2 rounded-2xl bg-emerald-600 text-white font-black text-statement shadow-xs">
            1³ + 12³ = 9³ + 10³ = 1729
          </div>
          <div className="px-3 py-1 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-950 font-bold text-micro text-center">
            The Hardy-Ramanujan number is the smallest dual-sum-of-two-cubes!
          </div>
        </div>
      )}
    </VisualizerFrame>
  );
};

// -----------------------------------------------------------------------------
// SCENE 12: Cube Odd Pyramid Visualizer (3³ = 7 + 9 + 11 = 27)
// -----------------------------------------------------------------------------
export const CubeOddPyramidVisualizer: React.FC<QuickCheckVisualizerStageProps> = (props) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);

  const cues: Record<1 | 2 | 3, React.ReactNode> = {
    1: <span>Step 1: Every cube n³ is a sum of n consecutive odd numbers.</span>,
    2: <span>Step 2: For 3³: start at 7, then 9, then 11 (3 consecutive odds).</span>,
    3: <span className="text-emerald-700">Step 3: 7 + 9 + 11 = 27 = 3³! Perfectly matches!</span>,
  };

  return (
    <VisualizerFrame
      title="Cubes as Odd Sums"
      badge="3³ = 27"
      cue={cues[step]}
      step={step}
      setStep={setStep}
      onNext={props.onNext}
      onReset={props.onReset}
      isLastQuestion={props.isLastQuestion}
    >
      {step === 1 && (
        <div className="flex flex-col items-center gap-1.5 animate-fade-rise font-mono text-micro font-bold">
          <div>1 = 1³</div>
          <div>3 + 5 = 8 = 2³</div>
          <div className="text-[#005583] text-small font-black">
            7 + 9 + 11 = ? = 3³
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="flex items-center gap-2 font-mono text-small font-bold animate-fade-rise">
          <span className="px-3 py-1.5 rounded-xl bg-sky-100 text-sky-950 border border-sky-300">
            7
          </span>
          <span className="text-slate-400">+</span>
          <span className="px-3 py-1.5 rounded-xl bg-sky-100 text-sky-950 border border-sky-300">
            9
          </span>
          <span className="text-slate-400">+</span>
          <span className="px-3 py-1.5 rounded-xl bg-sky-100 text-sky-950 border border-sky-300">
            11
          </span>
        </div>
      )}

      {step === 3 && (
        <div className="flex flex-col items-center gap-2 animate-fade-rise font-mono">
          <div className="px-5 py-2 rounded-2xl bg-emerald-600 text-white font-black text-statement shadow-xs">
            7 + 9 + 11 = 27 = 3³
          </div>
          <div className="px-3 py-1 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-950 font-bold text-micro text-center">
            n³ is always the sum of n consecutive odd numbers starting at n² − n + 1!
          </div>
        </div>
      )}
    </VisualizerFrame>
  );
};

// -----------------------------------------------------------------------------
// SCENE 13: Cube Root Triplet Grouping (∛512 = 8)
// -----------------------------------------------------------------------------
export const CubeRootTripletGroupingVisualizer: React.FC<QuickCheckVisualizerStageProps> = (props) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);

  const cues: Record<1 | 2 | 3, React.ReactNode> = {
    1: <span>Step 1: Prime factorise 512: nine 2s (2 × 2 × ... × 2).</span>,
    2: <span>Step 2: Group into TRIPLETS of 3 identical factors: (2³), (2³), (2³).</span>,
    3: <span className="text-emerald-700">Step 3: Pull ONE 2 from each triplet: 2 × 2 × 2 = 8!</span>,
  };

  return (
    <VisualizerFrame
      title="Prime Triplet Grouping"
      badge="∛512"
      cue={cues[step]}
      step={step}
      setStep={setStep}
      onNext={props.onNext}
      onReset={props.onReset}
      isLastQuestion={props.isLastQuestion}
    >
      {step === 1 && (
        <div className="flex flex-col items-center gap-1.5 animate-fade-rise font-mono text-micro font-bold">
          <div className="text-slate-800 text-small font-black">512 = 2⁹</div>
          <div className="text-slate-500">2 × 2 × 2 × 2 × 2 × 2 × 2 × 2 × 2</div>
        </div>
      )}

      {step === 2 && (
        <div className="flex items-center gap-2 font-mono text-micro font-bold animate-fade-rise">
          <span className="px-3 py-1.5 rounded-xl bg-sky-100 text-[#005583] border border-sky-300">
            (2 × 2 × 2)
          </span>
          <span>×</span>
          <span className="px-3 py-1.5 rounded-xl bg-sky-100 text-[#005583] border border-sky-300">
            (2 × 2 × 2)
          </span>
          <span>×</span>
          <span className="px-3 py-1.5 rounded-xl bg-sky-100 text-[#005583] border border-sky-300">
            (2 × 2 × 2)
          </span>
        </div>
      )}

      {step === 3 && (
        <div className="flex flex-col items-center gap-2 animate-fade-rise font-mono">
          <div className="flex items-center gap-2 text-statement font-black text-emerald-900">
            <span>∛512 = 2 × 2 × 2 =</span>
            <span className="px-3.5 py-1.5 rounded-2xl bg-emerald-600 text-white shadow-xs">
              8
            </span>
          </div>
          <div className="px-3 py-1 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-950 font-bold text-micro text-center">
            Pull ONE factor from each locked triplet: 2 × 2 × 2 = 8!
          </div>
        </div>
      )}
    </VisualizerFrame>
  );
};

// -----------------------------------------------------------------------------
// SCENE 14: Cube Difference Engine (Successive Differences)
// -----------------------------------------------------------------------------
export const CubeDifferenceEngineVisualizer: React.FC<QuickCheckVisualizerStageProps> = (props) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);

  const cues: Record<1 | 2 | 3, React.ReactNode> = {
    1: <span>Step 1: Look at successive cubes: 1, 8, 27, 64, 125, 216, 343...</span>,
    2: <span>Step 2: First differences: 7, 19, 37, 61, 91, 127. Formula = 1 + 3n(n-1)!</span>,
    3: <span className="text-emerald-700">Step 3: 67³ − 66³ = 1 + 3(67)(66) = 13,267!</span>,
  };

  return (
    <VisualizerFrame
      title="Cube Difference Engine"
      badge="Consecutive Cubes"
      cue={cues[step]}
      step={step}
      setStep={setStep}
      onNext={props.onNext}
      onReset={props.onReset}
      isLastQuestion={props.isLastQuestion}
    >
      {step === 1 && (
        <div className="flex flex-wrap items-center justify-center gap-1.5 font-mono text-micro font-bold animate-fade-rise">
          <span className="px-2 py-0.5 rounded bg-slate-100">1³=1</span>
          <span className="px-2 py-0.5 rounded bg-slate-100">2³=8</span>
          <span className="px-2 py-0.5 rounded bg-slate-100">3³=27</span>
          <span className="px-2 py-0.5 rounded bg-slate-100">4³=64</span>
          <span className="px-2 py-0.5 rounded bg-slate-100">5³=125</span>
        </div>
      )}

      {step === 2 && (
        <div className="flex flex-col items-center gap-1.5 animate-fade-rise font-mono">
          <div className="text-micro font-bold text-slate-700">
            Formula: n³ − (n-1)³ = 1 + 3 · n · (n-1)
          </div>
          <div className="flex items-center gap-1 text-[11px] font-bold text-[#005583]">
            <span>Diffs: 7, 19, 37, 61, 91... (Second differences are always 6, 12, 18, 24...)</span>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="flex flex-col items-center gap-2 animate-fade-rise font-mono">
          <div className="px-5 py-2 rounded-2xl bg-emerald-600 text-white font-black text-statement shadow-xs">
            67³ − 66³ = 13,267
          </div>
          <div className="px-3 py-1 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-950 font-bold text-micro text-center">
            1 + 3 × 67 × 66 = 1 + 13,266 = <strong>13,267</strong>!
          </div>
        </div>
      )}
    </VisualizerFrame>
  );
};
