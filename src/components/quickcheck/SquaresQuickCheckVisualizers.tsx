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
  Layers,
  Lock,
  RotateCcw,
  Sparkles,
  Unlock,
  XCircle,
} from 'lucide-react';
import { Katex } from '../Katex';

export interface QuickCheckVisualizerStageProps {
  onNext: () => void;
  onReset?: () => void;
  isCorrect: boolean;
  isLastQuestion: boolean;
}

// -----------------------------------------------------------------------------
// Helper: Step Scrubber
// -----------------------------------------------------------------------------
const StepScrubber: React.FC<{
  step: 1 | 2 | 3;
  setStep: React.Dispatch<React.SetStateAction<1 | 2 | 3>>;
}> = ({ step, setStep }) => {
  const stepLabels = ['Step 1', 'Step 2', 'Step 3 (Answer)'];
  return (
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
  );
};

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
      <StepScrubber step={step} setStep={setStep} />

      {/* Single Action Cue (≤ 12 words) */}
      <div className="text-micro font-bold text-slate-700 shrink-0 min-h-[20px] flex items-center">
        {cue}
      </div>

      {/* Central Tappable Canvas Area */}
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
// SCENE 0: The Locker Puzzle (Lockers 1–16)
// -----------------------------------------------------------------------------
export const LockerGridSolutionVisualizer: React.FC<QuickCheckVisualizerStageProps> = (props) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const squares = [1, 4, 9, 16];

  const cues: Record<1 | 2 | 3, React.ReactNode> = {
    1: <span>Step 1: Every factor flips a locker open or closed!</span>,
    2: <span>Step 2: Watch even factor counts close, odd factor counts stay open!</span>,
    3: <span className="text-emerald-700">Step 3: Only perfect squares (1, 4, 9, 16) stay OPEN!</span>,
  };

  return (
    <VisualizerFrame
      title="The Locker Puzzle"
      badge="Lockers 1 to 16"
      cue={cues[step]}
      step={step}
      setStep={setStep}
      onNext={props.onNext}
      onReset={props.onReset}
      isLastQuestion={props.isLastQuestion}
    >
      {step === 1 && (
        <div className="flex flex-col items-center gap-2 animate-fade-rise">
          <div className="flex items-center gap-2 font-mono text-micro font-bold text-slate-700">
            <span>Example: Locker 12 has 6 factors:</span>
            <span className="px-2 py-0.5 rounded bg-sky-100 text-[#005583]">
              1, 2, 3, 4, 6, 12
            </span>
          </div>
          <div className="flex items-center gap-1 text-[11px] font-mono text-slate-600">
            <span>Open</span>
            <span className="text-slate-400">→</span>
            <span>Shut</span>
            <span className="text-slate-400">→</span>
            <span>Open</span>
            <span className="text-slate-400">→</span>
            <span>Shut</span>
            <span className="text-slate-400">→</span>
            <span>Open</span>
            <span className="text-slate-400">→</span>
            <span className="font-extrabold text-rose-600">SHUT (6 flips = closed!)</span>
          </div>
          <span className="text-micro text-slate-500 font-medium">
            Even number of factors = ends up CLOSED.
          </span>
        </div>
      )}

      {step === 2 && (
        <div className="grid grid-cols-8 sm:grid-cols-8 gap-1.5 w-full max-w-md animate-fade-rise">
          {Array.from({ length: 16 }, (_, i) => i + 1).map((num) => {
            const isSq = squares.includes(num);
            return (
              <div
                key={num}
                className={`p-1 rounded-lg text-center font-mono text-micro font-extrabold flex flex-col items-center justify-center transition-all ${
                  isSq
                    ? 'bg-emerald-100 border-2 border-emerald-500 text-emerald-950 scale-105 shadow-xs'
                    : 'bg-slate-100 border border-slate-200 text-slate-400 opacity-60'
                }`}
              >
                <span>{num}</span>
                {isSq ? (
                  <Unlock className="w-3 h-3 text-emerald-600 mt-0.5" />
                ) : (
                  <Lock className="w-2.5 h-2.5 text-slate-400 mt-0.5" />
                )}
              </div>
            );
          })}
        </div>
      )}

      {step === 3 && (
        <div className="flex flex-col items-center gap-2 animate-fade-rise">
          <div className="flex items-center gap-2 font-mono">
            {squares.map((sq) => (
              <div
                key={sq}
                className="px-3 py-1.5 rounded-xl bg-emerald-600 text-white font-black text-small flex items-center gap-1 shadow-xs"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>#{sq}</span>
              </div>
            ))}
          </div>
          <div className="px-3 py-1 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-950 font-bold text-micro text-center max-w-sm">
            🎉 Only squares have an ODD number of factors because their square root pairs with itself!
          </div>
        </div>
      )}
    </VisualizerFrame>
  );
};

// -----------------------------------------------------------------------------
// SCENE 2: Square as Area (Side 8 → 64 sq units)
// -----------------------------------------------------------------------------
export const SquareAreaGridVisualizer: React.FC<QuickCheckVisualizerStageProps> = (props) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);

  const cues: Record<1 | 2 | 3, React.ReactNode> = {
    1: <span>Step 1: A square of side 8 has 8 rows and 8 columns.</span>,
    2: <span>Step 2: Sweep each row — 8 rows of 8 unit squares fill up!</span>,
    3: <span className="text-emerald-700">Step 3: Total area = 8 × 8 = 8² = 64 square units!</span>,
  };

  return (
    <VisualizerFrame
      title="Square as Area"
      badge="Side 8 Grid"
      cue={cues[step]}
      step={step}
      setStep={setStep}
      onNext={props.onNext}
      onReset={props.onReset}
      isLastQuestion={props.isLastQuestion}
    >
      {step === 1 && (
        <div className="flex items-center gap-4 animate-fade-rise">
          <div className="relative w-24 h-24 border-2 border-dashed border-[#005583] rounded-xl flex items-center justify-center bg-sky-50/50">
            <span className="text-micro font-bold text-[#005583]">8 × 8 outline</span>
            <span className="absolute -top-3 px-1.5 rounded bg-white border border-sky-300 text-[10px] font-bold text-[#005583]">
              8 units
            </span>
            <span className="absolute -left-3 rotate-[-90deg] px-1.5 rounded bg-white border border-sky-300 text-[10px] font-bold text-[#005583]">
              8 units
            </span>
          </div>
          <div className="text-micro text-slate-600 font-medium max-w-[180px]">
            Both side lengths are equal to 8. Tap to fill the grid!
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="flex flex-col items-center gap-1.5 animate-fade-rise">
          <div className="grid grid-cols-8 gap-0.5 p-1 rounded-xl bg-slate-100 border border-slate-300">
            {Array.from({ length: 64 }, (_, i) => (
              <div
                key={i}
                className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-2xs bg-emerald-500 shadow-2xs"
                style={{
                  transition: 'opacity 300ms cubic-bezier(0.22, 1, 0.36, 1)',
                  opacity: i < 64 ? 1 : 0,
                }}
              />
            ))}
          </div>
          <span className="font-mono text-micro font-extrabold text-emerald-800">
            Filled 64 unit squares
          </span>
        </div>
      )}

      {step === 3 && (
        <div className="flex flex-col items-center gap-2 animate-fade-rise">
          <div className="px-5 py-2 rounded-2xl bg-emerald-600 text-white font-mono font-black text-statement shadow-xs">
            8 × 8 = 8² = 64
          </div>
          <div className="px-3 py-1 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-950 font-bold text-micro text-center">
            💡 Any square number IS a physical geometric area — that's why it's called "squaring"!
          </div>
        </div>
      )}
    </VisualizerFrame>
  );
};

// -----------------------------------------------------------------------------
// SCENE 3 Q0: Last Digit Scanner (3287 ends in 7)
// -----------------------------------------------------------------------------
export const LastDigitScannerVisualizer: React.FC<QuickCheckVisualizerStageProps> = (props) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);

  const cues: Record<1 | 2 | 3, React.ReactNode> = {
    1: <span>Step 1: Look ONLY at the units (last) digit of 3287!</span>,
    2: <span>Step 2: Check the sorting tray — is 7 allowed or forbidden?</span>,
    3: <span className="text-rose-700">Step 3: 3287 ends in 7, so it CANNOT be a square!</span>,
  };

  return (
    <VisualizerFrame
      title="Last Digit Scanner"
      badge="Testing 3287"
      cue={cues[step]}
      step={step}
      setStep={setStep}
      onNext={props.onNext}
      onReset={props.onReset}
      isLastQuestion={props.isLastQuestion}
    >
      {step === 1 && (
        <div className="flex flex-col items-center gap-2 animate-fade-rise font-mono">
          <div className="text-display font-black text-slate-800 tracking-wider">
            328
            <span className="text-rose-600 bg-rose-100 px-2 py-0.5 rounded-xl border-2 border-rose-500 animate-pulse">
              7
            </span>
          </div>
          <span className="text-micro font-bold text-slate-500">
            Spotlight is locked onto the last digit: 7
          </span>
        </div>
      )}

      {step === 2 && (
        <div className="flex flex-col gap-2 w-full max-w-sm animate-fade-rise">
          <div className="p-2 rounded-xl bg-rose-50 border-2 border-rose-400 flex items-center justify-between">
            <span className="text-micro font-extrabold text-rose-900">
              🚫 FORBIDDEN Trays: [2, 3, <strong className="underline text-rose-600">7</strong>, 8]
            </span>
            <span className="px-2 py-0.5 rounded bg-rose-200 text-rose-900 font-mono font-black text-micro animate-bounce">
              Lands Here!
            </span>
          </div>
          <div className="p-2 rounded-xl bg-slate-100 border border-slate-200 opacity-60 flex items-center justify-between text-micro text-slate-600">
            <span>Allowed Trays: [0, 1, 4, 5, 6, 9]</span>
            <span className="text-[10px]">Empty</span>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="flex flex-col items-center gap-1.5 animate-fade-rise">
          <div className="px-4 py-1.5 rounded-2xl bg-rose-600 text-white font-mono font-black text-statement shadow-xs">
            IMPOSSIBLE ✗
          </div>
          <div className="px-3 py-1 rounded-xl bg-rose-50 border border-rose-300 text-rose-950 font-bold text-micro text-center">
            No perfect square ever ends in 2, 3, 7, or 8. Since 3287 ends in 7, it fails instantly!
          </div>
        </div>
      )}
    </VisualizerFrame>
  );
};

// -----------------------------------------------------------------------------
// SCENE 3 Q1: Zero Multiplier (300² → 4 zeros)
// -----------------------------------------------------------------------------
export const ZeroMultiplierVisualizer: React.FC<QuickCheckVisualizerStageProps> = (props) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);

  const cues: Record<1 | 2 | 3, React.ReactNode> = {
    1: <span>Step 1: Count the trailing zeros in 300 — it has 2 zeros.</span>,
    2: <span>Step 2: Squaring doubles trailing zeros (2 zeros × 2 = 4 zeros)!</span>,
    3: <span className="text-emerald-700">Step 3: 300² = 90,000 (exactly 4 zeros)!</span>,
  };

  return (
    <VisualizerFrame
      title="Zero Multiplier Rule"
      badge="Squaring 300"
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
            3
            <span className="text-amber-600 bg-amber-100 px-2 py-0.5 rounded-xl border border-amber-300">
              00
            </span>
          </div>
          <div className="text-micro font-bold text-amber-700">
            Base number has <strong>2 trailing zeros</strong>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="flex items-center gap-3 animate-fade-rise font-mono">
          <div className="px-3 py-1.5 rounded-xl bg-amber-100 text-amber-950 font-bold text-small border border-amber-300">
            2 zeros
          </div>
          <span className="text-statement font-black text-[#005583]">× 2</span>
          <ArrowRight className="w-4 h-4 text-slate-400" />
          <div className="px-3 py-1.5 rounded-xl bg-emerald-100 text-emerald-950 font-black text-small border border-emerald-400">
            4 zeros
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="flex flex-col items-center gap-1.5 animate-fade-rise font-mono">
          <div className="text-statement font-black text-slate-900">
            300² = 9<span className="text-emerald-600 underline">0000</span>
          </div>
          <div className="px-3 py-1 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-950 font-bold text-micro text-center">
            Trailing zeros ALWAYS double when you square! 2 × 2 = 4 zeros.
          </div>
        </div>
      )}
    </VisualizerFrame>
  );
};

// -----------------------------------------------------------------------------
// SCENE 3 Q2: Parity Dots (Odd² is always odd)
// -----------------------------------------------------------------------------
export const ParityDotsVisualizer: React.FC<QuickCheckVisualizerStageProps> = (props) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);

  const cues: Record<1 | 2 | 3, React.ReactNode> = {
    1: <span>Step 1: Any odd number (like 5) leaves 1 lonely unpaired dot.</span>,
    2: <span>Step 2: Squaring odd × odd pairs everything except one corner!</span>,
    3: <span className="text-emerald-700">Step 3: (Odd)² is ALWAYS odd. No exceptions!</span>,
  };

  return (
    <VisualizerFrame
      title="Parity Rule"
      badge="Odd Numbers"
      cue={cues[step]}
      step={step}
      setStep={setStep}
      onNext={props.onNext}
      onReset={props.onReset}
      isLastQuestion={props.isLastQuestion}
    >
      {step === 1 && (
        <div className="flex flex-col items-center gap-2 animate-fade-rise">
          <div className="flex items-center gap-2">
            <div className="flex gap-1 p-1.5 rounded-xl bg-sky-50 border border-sky-200">
              <div className="w-3.5 h-3.5 rounded-full bg-[#005583]" />
              <div className="w-3.5 h-3.5 rounded-full bg-[#005583]" />
            </div>
            <div className="flex gap-1 p-1.5 rounded-xl bg-sky-50 border border-sky-200">
              <div className="w-3.5 h-3.5 rounded-full bg-[#005583]" />
              <div className="w-3.5 h-3.5 rounded-full bg-[#005583]" />
            </div>
            <div className="p-1.5 rounded-xl bg-amber-100 border border-amber-400 animate-pulse">
              <div className="w-3.5 h-3.5 rounded-full bg-amber-600" />
            </div>
          </div>
          <span className="text-micro font-bold text-slate-600">
            5 = 2 pairs + <strong className="text-amber-600">1 lonely dot</strong>
          </span>
        </div>
      )}

      {step === 2 && (
        <div className="flex flex-col items-center gap-1.5 animate-fade-rise">
          <div className="grid grid-cols-5 gap-1 p-1.5 rounded-xl bg-slate-50 border border-slate-200">
            {Array.from({ length: 25 }, (_, idx) => {
              const isCorner = idx === 24;
              return (
                <div
                  key={idx}
                  className={`w-3 h-3 rounded-full ${
                    isCorner ? 'bg-amber-500 animate-pulse ring-2 ring-amber-300' : 'bg-[#005583]'
                  }`}
                />
              );
            })}
          </div>
          <span className="text-[11px] font-bold text-slate-700">
            24 dots make 12 pairs + <strong className="text-amber-600">1 leftover dot!</strong>
          </span>
        </div>
      )}

      {step === 3 && (
        <div className="flex flex-col items-center gap-1.5 animate-fade-rise font-mono">
          <div className="px-4 py-1.5 rounded-2xl bg-emerald-600 text-white font-black text-small shadow-xs">
            Odd × Odd = ALWAYS ODD
          </div>
          <div className="px-3 py-1 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-950 font-bold text-micro text-center">
            Even² is always Even (0, 4, 16, 36...). Odd² is always Odd (1, 9, 25, 49...).
          </div>
        </div>
      )}
    </VisualizerFrame>
  );
};
