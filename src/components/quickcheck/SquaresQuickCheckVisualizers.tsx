/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import {
  ArrowRight,
  ChevronRight,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import { LockerGridCanvas } from '../../sections/LockerStorySection';
import { SquareAreaCanvasSvg } from '../../scenes/FoundationDemoScene';
import {
  LastDigitSortingTraysSvg,
  SquareZerosParitySvg,
} from '../../scenes/LastDigitPatternsScene';

export interface QuickCheckVisualizerStageProps {
  onNext: () => void;
  onReset?: () => void;
  isCorrect: boolean;
  isLastQuestion: boolean;
}

// -----------------------------------------------------------------------------
// SHARED STEP-BY-STEP HELPERS & SHELL (Gold Standard Primitives)
// -----------------------------------------------------------------------------

export function useStepProgress(totalSteps: number = 3) {
  const [step, setStep] = useState<number>(1);
  const [maxStep, setMaxStep] = useState<number>(1);

  const advance = () => {
    setStep((prev) => {
      const next = prev < totalSteps ? prev + 1 : prev;
      setMaxStep((m) => Math.max(m, next));
      return next;
    });
  };

  const selectStep = (target: number) => {
    if (target <= maxStep && target >= 1 && target <= totalSteps) {
      setStep(target);
    }
  };

  const replay = () => {
    setStep(1);
    setMaxStep(1);
  };

  return { step, maxStep, advance, selectStep, replay };
}

export function useStepReady(step: number, delayMs: number = 35): boolean {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(false);
    const timer = window.setTimeout(() => setReady(true), delayMs);
    return () => window.clearTimeout(timer);
  }, [step, delayMs]);

  return ready;
}

export function useSequenceTick(
  active: boolean,
  maxTick: number,
  intervalMs: number = 320,
  resetKey: unknown = 0
): number {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    setTick(0);
    if (!active || maxTick <= 0) return;

    let current = 0;
    const id = window.setInterval(() => {
      current += 1;
      setTick(current);
      if (current >= maxTick) {
        window.clearInterval(id);
      }
    }, intervalMs);

    return () => window.clearInterval(id);
  }, [active, maxTick, intervalMs, resetKey]);

  return tick;
}

export function useAnimatedNumber(
  target: number,
  active: boolean,
  durationMs: number = 650,
  startVal: number = 0
): number {
  const [value, setValue] = useState(active ? startVal : target);

  useEffect(() => {
    if (!active) {
      setValue(startVal);
      return;
    }

    let rafId = 0;
    const startTime = performance.now();

    const frame = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / durationMs);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(startVal + (target - startVal) * eased));
      if (progress < 1) {
        rafId = requestAnimationFrame(frame);
      }
    };

    rafId = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(rafId);
  }, [target, active, durationMs, startVal]);

  return value;
}

export interface StepDefinition {
  label: string;
  cue: string;
}

interface QuickCheckStepShellProps {
  ariaLabel: string;
  isCorrect: boolean;
  headerTitle: string;
  headerBadge: string;
  steps: StepDefinition[];
  step: number;
  maxStep: number;
  onSelectStep: (s: number) => void;
  onAdvance: () => void;
  onReset?: () => void;
  onNext?: () => void;
  isLastQuestion?: boolean;
  nextLabel?: string;
  insightText: React.ReactNode;
  insightTone?: 'neutral' | 'success' | 'warning' | 'danger';
  footerText: string;
  children: React.ReactNode;
}

export const QuickCheckStepShell: React.FC<QuickCheckStepShellProps> = ({
  ariaLabel,
  isCorrect,
  headerTitle,
  headerBadge,
  steps,
  step,
  maxStep,
  onSelectStep,
  onAdvance,
  onReset,
  onNext,
  isLastQuestion = false,
  nextLabel,
  insightText,
  insightTone = 'neutral',
  footerText,
  children,
}) => {
  const totalSteps = steps.length;
  const currentStepDef = steps[Math.max(0, Math.min(totalSteps - 1, step - 1))];
  const isFinalStep = step >= totalSteps;

  const insightStyles = {
    neutral: 'bg-sky-50 border-sky-200 text-sky-950',
    success: 'bg-emerald-50 border-emerald-300 text-emerald-950',
    warning: 'bg-amber-50 border-amber-300 text-amber-950',
    danger: 'bg-rose-50 border-rose-200 text-rose-950',
  }[insightTone];

  const resolvedNextLabel = nextLabel ?? (!isLastQuestion ? 'Next Question' : 'See Results');

  return (
    <div
      aria-label={ariaLabel}
      className="w-full h-full min-h-0 bg-slate-50/80 border border-slate-200/80 rounded-3xl p-3 sm:p-3.5 flex flex-col justify-between gap-2 overflow-hidden shadow-2xs animate-fade-rise"
    >
      {/* 1. Header Bar */}
      <div className="flex items-center justify-between gap-2 pb-1.5 border-b border-slate-200/70 shrink-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span
            className={`text-micro font-extrabold uppercase tracking-wider ${
              isCorrect ? 'text-emerald-700' : 'text-rose-700'
            }`}
          >
            {headerTitle}
          </span>
          <span className="px-2.5 py-0.5 rounded-md bg-white border border-slate-200/80 text-micro font-bold text-[#005583] tabular-nums">
            {headerBadge}
          </span>
        </div>

        {onReset && (
          <button
            type="button"
            onClick={onReset}
            className="min-h-[34px] px-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-slate-600 text-micro font-bold flex items-center gap-1.5 cursor-pointer transition-colors shrink-0 shadow-2xs"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Re-try</span>
          </button>
        )}
      </div>

      {/* 2. Step Scrubber + Single-Action Cue */}
      <div className="flex flex-col gap-1.5 shrink-0">
        <div className="flex items-center gap-1 flex-wrap" role="tablist" aria-label="Solution steps">
          {steps.map((sDef, idx) => {
            const sNum = idx + 1;
            const isActive = sNum === step;
            const isUnlocked = sNum <= maxStep;
            const isAnswerPill = sNum === totalSteps;
            return (
              <React.Fragment key={sDef.label}>
                <button
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  disabled={!isUnlocked}
                  onClick={() => onSelectStep(sNum)}
                  className={`px-2.5 py-1 rounded-full text-micro font-bold border transition-all inline-flex items-center gap-1 ${
                    isActive
                      ? isAnswerPill
                        ? 'bg-emerald-600 text-white border-emerald-700 shadow-xs'
                        : 'bg-[#005583] text-white border-[#003F62] shadow-xs'
                      : isUnlocked
                      ? 'bg-white border-slate-200 text-[#005583] hover:bg-slate-100 cursor-pointer'
                      : 'bg-slate-100 border-slate-200 text-slate-400 cursor-default'
                  }`}
                >
                  <span>{sNum}.</span>
                  <span>{sDef.label}</span>
                </button>
                {idx < steps.length - 1 && (
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                )}
              </React.Fragment>
            );
          })}
        </div>

        <p className="text-micro font-bold text-[#002538] px-0.5 leading-snug">
          {currentStepDef.cue}
        </p>
      </div>

      {/* 3. Tappable Generative Visual Canvas (max-h-[175px]) */}
      <div
        role={!isFinalStep ? 'button' : undefined}
        tabIndex={!isFinalStep ? 0 : undefined}
        title={!isFinalStep ? 'Tap anywhere to advance →' : undefined}
        onClick={!isFinalStep ? onAdvance : undefined}
        onKeyDown={
          !isFinalStep
            ? (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onAdvance();
                }
              }
            : undefined
        }
        aria-label={!isFinalStep ? 'Tap canvas to advance to next step' : undefined}
        className={`w-full flex-1 min-h-[116px] max-h-[175px] bg-white rounded-2xl border border-slate-200/80 p-2.5 flex flex-col items-center justify-center relative overflow-hidden shadow-2xs transition-colors ${
          !isFinalStep ? 'cursor-pointer hover:border-sky-300' : ''
        }`}
      >
        {children}

        {!isFinalStep && (
          <div className="mt-1.5 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-sky-50 border border-sky-200 text-micro font-bold text-[#005583] shrink-0">
            <span>Tap anywhere for Step {step + 1}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </div>
        )}
      </div>

      {/* 4. Dynamic Insight Box */}
      <div
        className={`px-3 py-1.5 rounded-xl border font-bold text-micro shrink-0 flex items-center gap-2 leading-snug transition-colors ${insightStyles}`}
      >
        <Sparkles className="w-4 h-4 shrink-0 opacity-85" />
        <div className="min-w-0">{insightText}</div>
      </div>

      {/* 5. Footer Bar */}
      <div className="pt-1.5 border-t border-slate-200/70 flex items-center justify-between gap-2 shrink-0">
        <span className="text-micro font-bold text-emerald-700 truncate">{footerText}</span>

        {onNext && !isLastQuestion && (
          <button
            type="button"
            onClick={onNext}
            className="min-h-[36px] px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-micro font-bold inline-flex items-center gap-1 cursor-pointer transition-colors shrink-0 shadow-2xs"
          >
            <span>{resolvedNextLabel}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        )}
        {onNext && isLastQuestion && !nextLabel && (
          <button
            type="button"
            onClick={onNext}
            className="min-h-[36px] px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-micro font-bold inline-flex items-center gap-1 cursor-pointer transition-colors shrink-0 shadow-2xs"
          >
            <span>{resolvedNextLabel}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
};

// -----------------------------------------------------------------------------
// SCENE 0: LOCKERS 1–16 (Reuses LockerGridCanvas from LockerStorySection)
// -----------------------------------------------------------------------------
const LOCKER_12_GUARDS = [1, 2, 3, 4, 6, 12];

export const LockerGridSolutionVisualizer: React.FC<QuickCheckVisualizerStageProps> = ({
  onNext,
  onReset,
  isCorrect,
  isLastQuestion,
}) => {
  const { step, maxStep, advance, selectStep } = useStepProgress(3);
  const flipTick = useSequenceTick(step === 1, LOCKER_12_GUARDS.length, 360, step);

  const lockers16 = Array.from({ length: 16 }, (_, i) => i + 1);
  const squares16 = [1, 4, 9, 16];
  const is12Open = flipTick % 2 === 1;

  const steps: StepDefinition[] = [
    { label: 'Flip #12', cue: 'Step 1: Every factor flips a locker open or shut.' },
    { label: 'Flip all 16', cue: 'Step 2: Even-factor lockers close; odd-factor lockers stay open!' },
    { label: 'Answer', cue: 'Step 3: Only perfect squares (1, 4, 9, 16) stay OPEN!' },
  ];

  return (
    <QuickCheckStepShell
      ariaLabel="Locker Puzzle Step-by-Step Solution"
      isCorrect={isCorrect}
      headerTitle={isCorrect ? '✓ Right! Locker Puzzle' : 'Review — Locker Puzzle'}
      headerBadge={step < 3 ? 'Lockers 1–16' : 'Squares Stay Open'}
      steps={steps}
      step={step}
      maxStep={maxStep}
      onSelectStep={selectStep}
      onAdvance={advance}
      onReset={onReset}
      onNext={onNext}
      isLastQuestion={isLastQuestion}
      insightTone={step === 3 ? 'success' : 'neutral'}
      insightText={
        step === 1
          ? 'Locker #12 has 6 factors (1, 2, 3, 4, 6, 12). Six flips leave it SHUT!'
          : step === 2
          ? 'Most numbers pair off and shut. Only 1, 4, 9, and 16 stay OPEN!'
          : '🎉 Perfect squares have an odd factor count, so they stay OPEN!'
      }
      footerText={step === 3 ? '✓ Perfect squares stay open!' : `Step ${step} of 3`}
    >
      {step === 1 && (
        <div className="flex flex-col items-center gap-2">
          <LockerGridCanvas
            numbers={[12]}
            openNumbers={is12Open ? [12] : []}
            touchedNumbers={flipTick > 0 ? [12] : []}
            columns={1}
            maxWidthClass="max-w-[72px]"
          />
          <div className="flex items-center gap-1 flex-wrap justify-center">
            {LOCKER_12_GUARDS.map((g, idx) => {
              const hit = idx < flipTick;
              return (
                <span
                  key={g}
                  className={`px-2 py-0.5 rounded-lg text-micro font-mono font-bold border transition-all ${
                    hit
                      ? idx % 2 === 0
                        ? 'bg-emerald-50 border-emerald-400 text-emerald-800'
                        : 'bg-slate-100 border-slate-300 text-slate-700'
                      : 'bg-white border-slate-200 text-slate-400'
                  }`}
                >
                  ÷{g}
                </span>
              );
            })}
          </div>
        </div>
      )}

      {step >= 2 && (
        <LockerGridCanvas
          numbers={lockers16}
          openNumbers={squares16}
          highlightNumbers={step === 3 ? squares16 : []}
          columns={8}
        />
      )}
    </QuickCheckStepShell>
  );
};

// -----------------------------------------------------------------------------
// SCENE 2: SQUARE AS AREA (Side 8 -> 64)
// -----------------------------------------------------------------------------
export const SquareAreaGridVisualizer: React.FC<QuickCheckVisualizerStageProps> = ({
  onNext,
  onReset,
  isCorrect,
  isLastQuestion,
}) => {
  const { step, maxStep, advance, selectStep } = useStepProgress(3);
  const rowTick = useSequenceTick(step === 2, 8, 170, step);
  const filledCount = step === 1 ? 0 : step === 2 ? Math.min(64, rowTick * 8) : 64;

  const steps: StepDefinition[] = [
    { label: 'Side 8', cue: 'Step 1: A square side 8 means 8 rows and 8 columns.' },
    { label: 'Sweep rows', cue: 'Step 2: Sweep row by row — 64 unit squares fill up!' },
    { label: 'Answer', cue: 'Step 3: Area = 8 × 8 = 8² = 64 square units!' },
  ];

  return (
    <QuickCheckStepShell
      ariaLabel="Square Area Step-by-Step Solution"
      isCorrect={isCorrect}
      headerTitle={isCorrect ? '✓ Right! Square Area' : 'Review — Square Area'}
      headerBadge={step < 3 ? 'Side = 8' : 'Area = 64'}
      steps={steps}
      step={step}
      maxStep={maxStep}
      onSelectStep={selectStep}
      onAdvance={advance}
      onReset={onReset}
      onNext={onNext}
      isLastQuestion={isLastQuestion}
      insightTone={step === 3 ? 'success' : 'neutral'}
      insightText={
        step === 1
          ? 'Equal width and height make an 8 × 8 square frame.'
          : step === 2
          ? `${Math.min(8, rowTick)} of 8 rows filled — running total = ${filledCount} tiles!`
          : '🎉 8 rows of 8 tiles pack 64 square units inside!'
      }
      footerText={step === 3 ? '✓ Area = 64 sq. units!' : `Step ${step} of 3`}
    >
      <div className="flex items-center justify-center gap-4">
        <SquareAreaCanvasSvg
          side={8}
          filledCount={filledCount}
          pulseOutline={step === 1}
          showTotalBadge={step === 3}
        />
        <div className="px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 font-mono font-black text-small text-emerald-900 tabular-nums">
          {filledCount} / 64
        </div>
      </div>
    </QuickCheckStepShell>
  );
};

// -----------------------------------------------------------------------------
// SCENE 3 Q0: LAST DIGIT SCANNER (3287)
// -----------------------------------------------------------------------------
export const LastDigitScannerVisualizer: React.FC<QuickCheckVisualizerStageProps> = ({
  onNext,
  onReset,
  isCorrect,
  isLastQuestion,
}) => {
  const { step, maxStep, advance, selectStep } = useStepProgress(3);
  const ready = useStepReady(step);

  const steps: StepDefinition[] = [
    { label: 'Spotlight 7', cue: 'Step 1: Look ONLY at the last digit: 7.' },
    { label: 'Sort trays', cue: 'Step 2: Check trays — 7 lands in FORBIDDEN [2, 3, 7, 8]!' },
    { label: 'Answer', cue: 'Step 3: 3287 can NEVER be a square. IMPOSSIBLE ✗!' },
  ];

  return (
    <QuickCheckStepShell
      ariaLabel="Last Digit Scanner Step-by-Step Solution"
      isCorrect={isCorrect}
      headerTitle={isCorrect ? '✓ Right! Last Digit Rule' : 'Review — Last Digit Rule'}
      headerBadge={step < 3 ? 'Check 3287' : 'Ends in 7 ✗'}
      steps={steps}
      step={step}
      maxStep={maxStep}
      onSelectStep={selectStep}
      onAdvance={advance}
      onReset={onReset}
      onNext={onNext}
      isLastQuestion={isLastQuestion}
      insightTone={step === 3 ? 'danger' : 'neutral'}
      insightText={
        step === 1
          ? 'Ignore 3, 2, and 8 at the front — only the last digit 7 decides!'
          : step === 2
          ? 'Squares only end in 0, 1, 4, 5, 6, or 9. Digit 7 is forbidden!'
          : 'No square number ever ends in 2, 3, 7, or 8 — so 3287 cannot be a square!'
      }
      footerText={step === 3 ? '✓ 3287 is NOT a square!' : `Step ${step} of 3`}
    >
      {step === 1 && (
        <div className="flex items-center justify-center gap-1.5 font-mono text-title font-black">
          {['3', '2', '8'].map((d, i) => (
            <span
              key={i}
              className="w-10 h-11 rounded-xl bg-slate-100 text-slate-400 flex items-center justify-center"
            >
              {d}
            </span>
          ))}
          <span
            className="w-11 h-12 rounded-xl bg-rose-600 text-white border-2 border-rose-700 flex items-center justify-center shadow-sm transition-transform duration-500"
            style={{ transform: ready ? 'scale(1.12)' : 'scale(0.9)' }}
          >
            7
          </span>
        </div>
      )}

      {step >= 2 && (
        <LastDigitSortingTraysSvg
          digit={7}
          inTray={true}
          showStamp={step === 3}
        />
      )}
    </QuickCheckStepShell>
  );
};

// -----------------------------------------------------------------------------
// SCENE 3 Q1: TRAILING ZEROS DOUBLER (300²)
// -----------------------------------------------------------------------------
export const ZeroMultiplierVisualizer: React.FC<QuickCheckVisualizerStageProps> = ({
  onNext,
  onReset,
  isCorrect,
  isLastQuestion,
}) => {
  const { step, maxStep, advance, selectStep } = useStepProgress(3);

  const steps: StepDefinition[] = [
    { label: 'Count zeros', cue: 'Step 1: Count the trailing zeros inside 300: 2 zeros!' },
    { label: 'Double them', cue: 'Step 2: Squaring doubles the zeros: 2 × 2 = 4 zeros!' },
    { label: 'Answer', cue: 'Step 3: 300² = 90,000 — ends in 4 trailing zeros!' },
  ];

  return (
    <QuickCheckStepShell
      ariaLabel="Trailing Zeros Step-by-Step Solution"
      isCorrect={isCorrect}
      headerTitle={isCorrect ? '✓ Right! Trailing Zeros' : 'Review — Trailing Zeros'}
      headerBadge={step < 3 ? '300²' : '4 Zeros'}
      steps={steps}
      step={step}
      maxStep={maxStep}
      onSelectStep={selectStep}
      onAdvance={advance}
      onReset={onReset}
      onNext={onNext}
      isLastQuestion={isLastQuestion}
      insightTone={step === 3 ? 'success' : 'neutral'}
      insightText={
        step === 1
          ? '300 has 2 trailing zeros at the end (3 × 100).'
          : step === 2
          ? '300 × 300 gives 9 followed by 2 + 2 = 4 zeros!'
          : '🎉 300² = 90,000! Every ending zero doubles when squared.'
      }
      footerText={step === 3 ? '✓ 300² ends in 4 zeros!' : `Step ${step} of 3`}
    >
      <SquareZerosParitySvg
        mode="zeros"
        baseZeros={2}
        expanded={step >= 2}
      />
    </QuickCheckStepShell>
  );
};

// -----------------------------------------------------------------------------
// SCENE 3 Q2: PARITY DOTS (Odd² is always Odd)
// -----------------------------------------------------------------------------
export const ParityDotsVisualizer: React.FC<QuickCheckVisualizerStageProps> = ({
  onNext,
  onReset,
  isCorrect,
  isLastQuestion,
}) => {
  const { step, maxStep, advance, selectStep } = useStepProgress(3);

  const steps: StepDefinition[] = [
    { label: 'Spot odd dot', cue: 'Step 1: An odd number always has 1 unpaired dot!' },
    { label: 'Odd × Odd', cue: 'Step 2: Odd × Odd leaves a single corner dot unpaired!' },
    { label: 'Answer', cue: 'Step 3: The square of an odd number is ALWAYS ODD!' },
  ];

  return (
    <QuickCheckStepShell
      ariaLabel="Parity Rule Step-by-Step Solution"
      isCorrect={isCorrect}
      headerTitle={isCorrect ? '✓ Right! Odd Parity' : 'Review — Odd Parity'}
      headerBadge={step < 3 ? 'Odd² Parity' : 'Always Odd'}
      steps={steps}
      step={step}
      maxStep={maxStep}
      onSelectStep={selectStep}
      onAdvance={advance}
      onReset={onReset}
      onNext={onNext}
      isLastQuestion={isLastQuestion}
      insightTone={step === 3 ? 'success' : 'neutral'}
      insightText={
        step === 1
          ? '5 dots make two pairs plus 1 leftover orange dot — so 5 is odd!'
          : step === 2
          ? '3² = 9, 5² = 25, 7² = 49 — without any factor of 2, the product stays odd!'
          : '🎉 Every odd number squared is ALWAYS odd!'
      }
      footerText={step === 3 ? '✓ Odd² is always odd!' : `Step ${step} of 3`}
    >
      <SquareZerosParitySvg
        mode="parity"
        parityNum={step === 1 ? 5 : step === 2 ? 7 : 5}
      />
    </QuickCheckStepShell>
  );
};
