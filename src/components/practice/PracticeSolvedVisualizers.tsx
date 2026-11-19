/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { PracticeVisualizerProps } from './NcertSquaresVisualizers';
import {
  QuickCheckStepShell,
  StepDefinition,
  useAnimatedNumber,
  useSequenceTick,
  useStepProgress,
  useStepReady,
} from '../quickcheck/SquaresQuickCheckVisualizers';
import {
  FractionDecimalSquareCanvasSvg,
  SquareAreaCanvasSvg,
} from '../../scenes/FoundationDemoScene';
import { OddGnomonCanvasSvg } from '../../components/DotGridSquareVisualizer';
import { OddSubtractionMeterSvg } from '../../scenes/OddSubtractionScene';
import { PrincipalRootGateSvg } from '../../scenes/RootsPlusMinusScene';
import { LastDigitSortingTraysSvg } from '../../scenes/LastDigitPatternsScene';
import {
  PrimeFactorCapsulesCanvas,
  RootBracketNumberLineSvg,
} from '../../scenes/SquareRootPrimeEstimateScene';
import { CompactIsometricCubeSvg } from '../../components/IsometricCubeRenderer';
import { InverseCubeMachineSvg } from '../../scenes/HistoryVisualStory';
import { TriangularZipperSvg } from '../../scenes/TriangularSquareZipper';
import { DifferencePyramidBarSvg } from '../../scenes/DifferenceEngineTable';

// -----------------------------------------------------------------------------
// EX-1: Fraction & Decimal Square Areas (3/5 & 2.5) -> FoundationDemoScene
// -----------------------------------------------------------------------------
export const Ex1FractionDecimalSquareVisualizer: React.FC<PracticeVisualizerProps> = ({
  onNextQuestion,
  onResetQuestion,
  isLastQuestion,
}) => {
  const { step, maxStep, advance, selectStep, replay } = useStepProgress(3);
  const steps: StepDefinition[] = [
    { label: 'Any Side', cue: 'Step 1: Can squares have fraction or decimal sides? Yes!' },
    { label: 'Multiply', cue: 'Step 2: Partition each square: (3/5)² = 9/25 and (2.5)² = 6.25.' },
    { label: 'Answer', cue: 'Step 3: Only whole-number squares (1, 4, 9…) are perfect squares!' },
  ];

  return (
    <QuickCheckStepShell
      ariaLabel="Worked Example 1 Fraction and Decimal Square Areas"
      isCorrect={true}
      headerTitle="Worked Example 1"
      headerBadge={step < 3 ? 'Sides 3/5 & 2.5' : '9/25 & 6.25'}
      steps={steps}
      step={step}
      maxStep={maxStep}
      onSelectStep={selectStep}
      onAdvance={advance}
      onReset={() => {
        replay();
        onResetQuestion();
      }}
      onNext={!isLastQuestion ? onNextQuestion : undefined}
      isLastQuestion={isLastQuestion}
      nextLabel="Next Question"
      insightTone={step === 3 ? 'success' : 'neutral'}
      insightText={
        step === 1
          ? 'Any positive length builds a square — fractions and decimals included!'
          : step === 2
          ? '(3/5) × (3/5) = 9/25 unit squares, and 2.5 × 2.5 = 6.25 unit squares!'
          : '✓ Areas are 9/25 & 6.25 — "perfect squares" only count natural-number sides!'
      }
      footerText={step === 3 ? '✓ (3/5)² = 9/25 and (2.5)² = 6.25' : `Step ${step} of 3`}
    >
      <FractionDecimalSquareCanvasSvg
        stage={step === 1 ? 'outline' : step === 2 ? 'partition' : 'compare'}
      />
    </QuickCheckStepShell>
  );
};

// -----------------------------------------------------------------------------
// EX-2: Find 36² from 35² = 1225 -> OddGnomonCanvasSvg
// -----------------------------------------------------------------------------
export const Ex2NextSquareVisualizer: React.FC<PracticeVisualizerProps> = ({
  onNextQuestion,
  onResetQuestion,
  isLastQuestion,
}) => {
  const { step, maxStep, advance, selectStep, replay } = useStepProgress(3);
  const animatedTotal = useAnimatedNumber(1296, step === 3, 550, 1225);

  const steps: StepDefinition[] = [
    { label: 'Start 35²', cue: 'Step 1: Start with the known inner square: 35² = 1225.' },
    { label: 'Add L-Border', cue: 'Step 2: Snap on the next odd border: 2(35) + 1 = 71!' },
    { label: 'Answer', cue: 'Step 3: Add them together: 36² = 1225 + 71 = 1296!' },
  ];

  return (
    <QuickCheckStepShell
      ariaLabel="Worked Example 2 Find 36 squared from 35 squared"
      isCorrect={true}
      headerTitle="Worked Example 2"
      headerBadge={step < 3 ? '35² = 1225 → 36²' : '36² = 1296'}
      steps={steps}
      step={step}
      maxStep={maxStep}
      onSelectStep={selectStep}
      onAdvance={advance}
      onReset={() => {
        replay();
        onResetQuestion();
      }}
      onNext={!isLastQuestion ? onNextQuestion : undefined}
      isLastQuestion={isLastQuestion}
      nextLabel="Next Question"
      insightTone={step === 3 ? 'success' : 'neutral'}
      insightText={
        step === 1
          ? 'Picture a 35 × 35 tile block already filled with 1225 squares.'
          : step === 2
          ? 'The 36th odd L-border wraps top & right: 35 + 35 + 1 corner = 71 tiles!'
          : '✓ 1225 + 71 = 1296 — no 2-digit multiplication needed!'
      }
      footerText={step === 3 ? '✓ 36² = 1296!' : `Step ${step} of 3`}
    >
      <div className="flex items-center justify-center gap-4 w-full">
        <OddGnomonCanvasSvg
          layers={7}
          hideOuterLayer={step === 1}
          highlightOuter={step >= 2}
          innerSquareLabel={step === 3 ? '1296' : '35²=1225'}
          outerLabel={step === 2 ? '+71 L-border' : step === 3 ? '36² = 1296' : undefined}
        />
        <div className="flex flex-col gap-1.5 font-mono font-black text-small">
          <span className="px-3 py-1 rounded-xl bg-sky-50 border border-sky-200 text-[#005583]">
            35² = 1225
          </span>
          {step >= 2 && (
            <span className="px-3 py-1 rounded-xl bg-amber-100 border border-amber-400 text-amber-950 animate-fade-rise">
              + 2(35) + 1 = +71
            </span>
          )}
          {step === 3 && (
            <span className="px-3 py-1 rounded-xl bg-emerald-600 text-white shadow-xs animate-fade-rise tabular-nums">
              36² = {animatedTotal} ✓
            </span>
          )}
        </div>
      </div>
    </QuickCheckStepShell>
  );
};

// -----------------------------------------------------------------------------
// EX-3: Repeated Subtraction Test: 25 vs 38 -> OddSubtractionMeterSvg
// -----------------------------------------------------------------------------
const SUB_25 = [1, 3, 5, 7, 9];
const SUB_38 = [1, 3, 5, 7, 9, 11];

export const Ex3RepeatedSubtractionVisualizer: React.FC<PracticeVisualizerProps> = ({
  onNextQuestion,
  onResetQuestion,
  isLastQuestion,
}) => {
  const { step, maxStep, advance, selectStep, replay } = useStepProgress(3);
  const tick25 = useSequenceTick(step === 1, SUB_25.length, 240, step);
  const tick38 = useSequenceTick(step === 2, SUB_38.length + 1, 220, step);

  const steps: StepDefinition[] = [
    { label: 'Test 25', cue: 'Step 1: Subtract odds from 25 — hits 0 in 5 steps!' },
    { label: 'Test 38', cue: 'Step 2: Subtract odds from 38 — overshoots 0 down to −11!' },
    { label: 'Answer', cue: 'Step 3: 25 = 5² is a square; 38 is NOT!' },
  ];

  return (
    <QuickCheckStepShell
      ariaLabel="Worked Example 3 Repeated Subtraction 25 vs 38"
      isCorrect={true}
      headerTitle="Worked Example 3"
      headerBadge={step === 1 ? 'Testing 25' : step === 2 ? 'Testing 38' : '25 = 5² | 38 ✗'}
      steps={steps}
      step={step}
      maxStep={maxStep}
      onSelectStep={selectStep}
      onAdvance={advance}
      onReset={() => {
        replay();
        onResetQuestion();
      }}
      onNext={!isLastQuestion ? onNextQuestion : undefined}
      isLastQuestion={isLastQuestion}
      nextLabel="Next Question"
      insightTone={step === 3 ? 'success' : step === 2 ? 'danger' : 'neutral'}
      insightText={
        step === 1
          ? '25 − 1 − 3 − 5 − 7 − 9 = 0! Exact landing in 5 steps means 25 = 5².'
          : step === 2
          ? 'At 2 left, subtracting the next odd (13) jumps straight past 0 to −11!'
          : '✓ Only numbers landing cleanly on 0 are perfect squares!'
      }
      footerText={step === 3 ? '✓ 25 is a square (5²); 38 is NOT!' : `Step ${step} of 3`}
    >
      {step === 1 && (
        <OddSubtractionMeterSvg
          startValue={25}
          oddsSubtracted={SUB_25.slice(0, Math.max(1, tick25))}
        />
      )}
      {step === 2 && (
        <OddSubtractionMeterSvg
          startValue={38}
          oddsSubtracted={SUB_38.slice(0, Math.min(SUB_38.length, Math.max(1, tick38)))}
          overshotValue={tick38 > SUB_38.length ? -11 : null}
          overshotOdd={13}
        />
      )}
      {step === 3 && (
        <div className="flex items-center justify-center gap-3 w-full">
          <div className="px-3.5 py-2.5 rounded-2xl bg-emerald-600 text-white font-mono font-black text-small text-center shadow-xs">
            25 → 0 (5 steps)
            <div className="text-micro font-bold text-emerald-100 mt-0.5">25 = 5² ✓</div>
          </div>
          <div className="px-3.5 py-2.5 rounded-2xl bg-rose-600 text-white font-mono font-black text-small text-center shadow-xs">
            38 → 2 → −11
            <div className="text-micro font-bold text-rose-100 mt-0.5">Misses 0 ✗</div>
          </div>
        </div>
      )}
    </QuickCheckStepShell>
  );
};

// -----------------------------------------------------------------------------
// EX-4: Square Roots and Plus-Minus Roots (64 & 100) -> PrincipalRootGateSvg
// -----------------------------------------------------------------------------
export const Ex4SquareRootsPlusMinusVisualizer: React.FC<PracticeVisualizerProps> = ({
  onNextQuestion,
  onResetQuestion,
  isLastQuestion,
}) => {
  const { step, maxStep, advance, selectStep, replay } = useStepProgress(3);
  const steps: StepDefinition[] = [
    { label: 'Roots of 64', cue: 'Step 1: Both (+8)² and (−8)² equal positive 64!' },
    { label: 'Roots of 100', cue: 'Step 2: Both (+10)² and (−10)² equal positive 100!' },
    { label: 'Answer', cue: 'Step 3: Every positive square has two roots: ±8 and ±10!' },
  ];

  return (
    <QuickCheckStepShell
      ariaLabel="Worked Example 4 Plus-Minus Square Roots"
      isCorrect={true}
      headerTitle="Worked Example 4"
      headerBadge={step < 3 ? 'Two Roots (±)' : '±8 and ±10'}
      steps={steps}
      step={step}
      maxStep={maxStep}
      onSelectStep={selectStep}
      onAdvance={advance}
      onReset={() => {
        replay();
        onResetQuestion();
      }}
      onNext={!isLastQuestion ? onNextQuestion : undefined}
      isLastQuestion={isLastQuestion}
      nextLabel="Next Question"
      insightTone={step === 3 ? 'success' : 'neutral'}
      insightText={
        step === 1
          ? 'Negative × negative = positive! So (−8) × (−8) = 64 too.'
          : step === 2
          ? 'Same rule for 100: (+10)² = 100 and (−10)² = 100!'
          : '✓ Square roots of 64 are ±8, and of 100 are ±10!'
      }
      footerText={step === 3 ? '✓ Roots of 64 = ±8; Roots of 100 = ±10' : `Step ${step} of 3`}
    >
      {step === 1 && (
        <PrincipalRootGateSvg targetSquare={64} mode="both" showPlusMinusOutput={true} />
      )}
      {step === 2 && (
        <PrincipalRootGateSvg targetSquare={100} mode="both" showPlusMinusOutput={true} />
      )}
      {step === 3 && (
        <div className="flex items-center justify-center gap-3 w-full">
          <div className="w-[165px]">
            <PrincipalRootGateSvg targetSquare={64} mode="answer" showPlusMinusOutput={true} />
          </div>
          <div className="w-[165px]">
            <PrincipalRootGateSvg targetSquare={100} mode="answer" showPlusMinusOutput={true} />
          </div>
        </div>
      )}
    </QuickCheckStepShell>
  );
};

// -----------------------------------------------------------------------------
// EX-5: Testing Squareness: 576 vs 327 -> LastDigitSortingTraysSvg
// -----------------------------------------------------------------------------
export const Ex5TestingSquarenessVisualizer: React.FC<PracticeVisualizerProps> = ({
  onNextQuestion,
  onResetQuestion,
  isLastQuestion,
}) => {
  const { step, maxStep, advance, selectStep, replay } = useStepProgress(3);
  const ready = useStepReady(step, 50);

  const steps: StepDefinition[] = [
    { label: 'Last Digits', cue: 'Step 1: Spotlight the last digits: 327 ends in 7; 576 in 6.' },
    { label: 'Sort Trays', cue: 'Step 2: Drop into trays — 7 is forbidden; 6 is allowed!' },
    { label: 'Answer', cue: 'Step 3: 327 is NEVER a square; 576 = 24²!' },
  ];

  return (
    <QuickCheckStepShell
      ariaLabel="Worked Example 5 Testing 576 vs 327"
      isCorrect={true}
      headerTitle="Worked Example 5"
      headerBadge={step < 3 ? '327 vs 576' : '576 = 24² ✓'}
      steps={steps}
      step={step}
      maxStep={maxStep}
      onSelectStep={selectStep}
      onAdvance={advance}
      onReset={() => {
        replay();
        onResetQuestion();
      }}
      onNext={!isLastQuestion ? onNextQuestion : undefined}
      isLastQuestion={isLastQuestion}
      nextLabel="Next Question"
      insightTone={step === 3 ? 'success' : step === 2 ? 'warning' : 'neutral'}
      insightText={
        step === 1
          ? 'Before multiplying anything, always check the last digit first!'
          : step === 2
          ? 'Forbidden ending: no square ever ends in 2, 3, 7, or 8 — goodbye 327!'
          : '✓ 576 ends in 6 (allowed!), and testing 24 × 24 gives exactly 576!'
      }
      footerText={step === 3 ? '✓ 327 rejected; 576 = 24²!' : `Step ${step} of 3`}
    >
      {step === 1 && (
        <div className="flex flex-col items-center gap-2 w-full">
          <div className="flex items-center gap-4 font-mono font-black text-statement">
            <span className="px-3 py-1 rounded-xl bg-slate-100 border border-slate-300 text-slate-800">
              32<span className="px-1 rounded bg-rose-100 text-rose-700 ring-2 ring-rose-400">7</span>
            </span>
            <span className="text-micro text-slate-400 font-sans font-bold">vs</span>
            <span className="px-3 py-1 rounded-xl bg-slate-100 border border-slate-300 text-slate-800">
              57<span className="px-1 rounded bg-emerald-100 text-emerald-700 ring-2 ring-emerald-400">6</span>
            </span>
          </div>
          <span className="text-micro font-bold text-slate-600">
            Which ending belongs in the Forbidden tray?
          </span>
        </div>
      )}
      {step === 2 && (
        <LastDigitSortingTraysSvg digit={7} inTray={ready} showStamp={false} />
      )}
      {step === 3 && (
        <LastDigitSortingTraysSvg digit={6} inTray={ready} showStamp={true} />
      )}
    </QuickCheckStepShell>
  );
};

// -----------------------------------------------------------------------------
// EX-6: Prime Factorisation: 324 vs 156 -> PrimeFactorCapsulesCanvas
// -----------------------------------------------------------------------------
export const Ex6PrimeFactorisationVisualizer: React.FC<PracticeVisualizerProps> = ({
  onNextQuestion,
  onResetQuestion,
  isLastQuestion,
}) => {
  const { step, maxStep, advance, selectStep, replay } = useStepProgress(3);
  const ready = useStepReady(step, 50);

  const steps: StepDefinition[] = [
    { label: 'Factor 324', cue: 'Step 1: Factor 324 — every prime locks into twin pairs!' },
    { label: 'Factor 156', cue: 'Step 2: Factor 156 — lonely primes 3 and 13 have no partners!' },
    { label: 'Answer', cue: 'Step 3: 324 = 18² is a square; 156 is NOT!' },
  ];

  return (
    <QuickCheckStepShell
      ariaLabel="Worked Example 6 Prime Factorisation 324 vs 156"
      isCorrect={true}
      headerTitle="Worked Example 6"
      headerBadge={step < 3 ? '324 vs 156' : '√324 = 18'}
      steps={steps}
      step={step}
      maxStep={maxStep}
      onSelectStep={selectStep}
      onAdvance={advance}
      onReset={() => {
        replay();
        onResetQuestion();
      }}
      onNext={!isLastQuestion ? onNextQuestion : undefined}
      isLastQuestion={isLastQuestion}
      nextLabel="Next Question"
      insightTone={step === 3 ? 'success' : step === 2 ? 'danger' : 'neutral'}
      insightText={
        step === 1
          ? '324 = (2×2) × (3×3) × (3×3). Pick one from each pair: 2 × 3 × 3 = 18!'
          : step === 2
          ? '156 = (2×2) × 3 × 13 — primes 3 and 13 are stranded alone!'
          : '✓ 324 is a perfect square (18²); 156 cannot form two equal groups!'
      }
      footerText={step === 3 ? '✓ 324 = 18²; 156 is not a square!' : `Step ${step} of 3`}
    >
      {step === 1 && (
        <PrimeFactorCapsulesCanvas
          groups={[{ factors: [2, 2] }, { factors: [3, 3] }, { factors: [3, 3] }]}
          locked={ready}
          pickOneIndex={ready}
          resultEquation="324 → 2 × 3 × 3 = 18"
        />
      )}
      {step === 2 && (
        <PrimeFactorCapsulesCanvas
          groups={[
            { factors: [2, 2] },
            { factors: [3], missingSlot: true },
            { factors: [13], missingSlot: true },
          ]}
          locked={false}
        />
      )}
      {step === 3 && (
        <PrimeFactorCapsulesCanvas
          groups={[{ factors: [2, 2] }, { factors: [3, 3] }, { factors: [3, 3] }]}
          locked={true}
          pickOneIndex={true}
          resultEquation="324 = 18² ✓  |  156 ✗"
        />
      )}
    </QuickCheckStepShell>
  );
};

// -----------------------------------------------------------------------------
// EX-7: Checking 1156 and 2800 -> PrimeFactorCapsulesCanvas
// -----------------------------------------------------------------------------
export const Ex7Checking1156And2800Visualizer: React.FC<PracticeVisualizerProps> = ({
  onNextQuestion,
  onResetQuestion,
  isLastQuestion,
}) => {
  const { step, maxStep, advance, selectStep, replay } = useStepProgress(3);
  const ready = useStepReady(step, 50);

  const steps: StepDefinition[] = [
    { label: 'Check 1156', cue: 'Step 1: Factor 1156 — pairs of 2 and 17 lock cleanly!' },
    { label: 'Check 2800', cue: 'Step 2: Factor 2800 — lonely prime 7 breaks the square!' },
    { label: 'Answer', cue: 'Step 3: 1156 = 34² is a square; 2800 is NOT!' },
  ];

  return (
    <QuickCheckStepShell
      ariaLabel="Worked Example 7 Checking 1156 and 2800"
      isCorrect={true}
      headerTitle="Worked Example 7"
      headerBadge={step < 3 ? '1156 vs 2800' : '1156 = 34² ✓'}
      steps={steps}
      step={step}
      maxStep={maxStep}
      onSelectStep={selectStep}
      onAdvance={advance}
      onReset={() => {
        replay();
        onResetQuestion();
      }}
      onNext={!isLastQuestion ? onNextQuestion : undefined}
      isLastQuestion={isLastQuestion}
      nextLabel="Next Question"
      insightTone={step === 3 ? 'success' : step === 2 ? 'danger' : 'neutral'}
      insightText={
        step === 1
          ? '1156 = (2×2) × (17×17). One from each capsule gives 2 × 17 = 34!'
          : step === 2
          ? '2800 = (2×2) × (2×2) × (5×5) × 7 — lonely factor 7 has no twin!'
          : '✓ 1156 is 34², while 2800 fails because of unpaired 7!'
      }
      footerText={step === 3 ? '✓ 1156 = 34²; 2800 is not a square!' : `Step ${step} of 3`}
    >
      {step === 1 && (
        <PrimeFactorCapsulesCanvas
          groups={[{ factors: [2, 2] }, { factors: [17, 17] }]}
          locked={ready}
          pickOneIndex={ready}
          resultEquation="√1156 = 2 × 17 = 34"
        />
      )}
      {step === 2 && (
        <PrimeFactorCapsulesCanvas
          groups={[
            { factors: [2, 2] },
            { factors: [2, 2] },
            { factors: [5, 5] },
            { factors: [7], missingSlot: true },
          ]}
          locked={false}
        />
      )}
      {step === 3 && (
        <PrimeFactorCapsulesCanvas
          groups={[{ factors: [2, 2] }, { factors: [17, 17] }]}
          locked={true}
          pickOneIndex={true}
          resultEquation="1156 = 34² ✓  |  2800 ✗"
        />
      )}
    </QuickCheckStepShell>
  );
};

// -----------------------------------------------------------------------------
// EX-8: Estimating Square Root of 1936 -> RootBracketNumberLineSvg
// -----------------------------------------------------------------------------
export const Ex8EstimatingRoot1936Visualizer: React.FC<PracticeVisualizerProps> = ({
  onNextQuestion,
  onResetQuestion,
  isLastQuestion,
}) => {
  const { step, maxStep, advance, selectStep, replay } = useStepProgress(3);
  const steps: StepDefinition[] = [
    { label: 'Tens Fence', cue: 'Step 1: Trap 1936 between tens squares: 40² = 1600 and 50² = 2500.' },
    { label: 'Midpoint 45²', cue: 'Step 2: Test midpoint 45² = 2025 — 1936 sits below it!' },
    { label: 'Answer', cue: 'Step 3: Ends in 6 below 45, so √1936 = 44!' },
  ];

  return (
    <QuickCheckStepShell
      ariaLabel="Worked Example 8 Estimating Square Root of 1936"
      isCorrect={true}
      headerTitle="Worked Example 8"
      headerBadge={step < 3 ? '40 < √1936 < 50' : '√1936 = 44'}
      steps={steps}
      step={step}
      maxStep={maxStep}
      onSelectStep={selectStep}
      onAdvance={advance}
      onReset={() => {
        replay();
        onResetQuestion();
      }}
      onNext={!isLastQuestion ? onNextQuestion : undefined}
      isLastQuestion={isLastQuestion}
      nextLabel="Next Question"
      insightTone={step === 3 ? 'success' : 'neutral'}
      insightText={
        step === 1
          ? 'Since 1600 < 1936 < 2500, its root lives between 40 and 50!'
          : step === 2
          ? '1936 ends in 6 (candidates 44 or 46). Midpoint 45² = 2025 puts 1936 below 45!'
          : '✓ Only candidate below 45 ending in 6 is 44 — and 44 × 44 = 1936!'
      }
      footerText={step === 3 ? '✓ √1936 = 44!' : `Step ${step} of 3`}
    >
      {step === 1 && (
        <RootBracketNumberLineSvg
          lowVal={1600}
          lowLabel="40²"
          targetVal={1936}
          targetLabel="1936"
          highVal={2500}
          highLabel="50²"
        />
      )}
      {step === 2 && (
        <RootBracketNumberLineSvg
          lowVal={1600}
          lowLabel="40²"
          targetVal={1936}
          targetLabel="1936 < 2025"
          highVal={2025}
          highLabel="45² = 2025"
        />
      )}
      {step === 3 && (
        <RootBracketNumberLineSvg
          lowVal={1600}
          lowLabel="40²"
          targetVal={1936}
          targetLabel="44² = 1936"
          highVal={2025}
          highLabel="45²"
          highlightAnswer={true}
        />
      )}
    </QuickCheckStepShell>
  );
};

// -----------------------------------------------------------------------------
// EX-9: Aribam & Bijou Estimating √250 -> RootBracketNumberLineSvg
// -----------------------------------------------------------------------------
export const Ex9AribamBijouRoot250Visualizer: React.FC<PracticeVisualizerProps> = ({
  onNextQuestion,
  onResetQuestion,
  isLastQuestion,
}) => {
  const { step, maxStep, advance, selectStep, replay } = useStepProgress(3);
  const steps: StepDefinition[] = [
    { label: 'Trap 250', cue: 'Step 1: Bracket 250 between 15² = 225 and 16² = 256.' },
    { label: 'Check Gaps', cue: 'Step 2: Compare gaps: 25 away from 225, only 6 from 256!' },
    { label: 'Answer', cue: 'Step 3: √250 hugs 16 closely — about 15.8!' },
  ];

  return (
    <QuickCheckStepShell
      ariaLabel="Worked Example 9 Estimating Root 250"
      isCorrect={true}
      headerTitle="Worked Example 9"
      headerBadge={step < 3 ? '15² < 250 < 16²' : '√250 ≈ 15.8'}
      steps={steps}
      step={step}
      maxStep={maxStep}
      onSelectStep={selectStep}
      onAdvance={advance}
      onReset={() => {
        replay();
        onResetQuestion();
      }}
      onNext={!isLastQuestion ? onNextQuestion : undefined}
      isLastQuestion={isLastQuestion}
      nextLabel="Next Question"
      insightTone={step === 3 ? 'success' : 'neutral'}
      insightText={
        step === 1
          ? '15² = 225 is just below 250, and 16² = 256 is just above 250!'
          : step === 2
          ? 'Gap to 225 is 25, while gap to 256 is only 6 — 250 hugs 16²!'
          : '✓ Bijou estimates √250 ≈ 15.8 (just slightly below 16)!'
      }
      footerText={step === 3 ? '✓ √250 ≈ 15.8 (close to 16)!' : `Step ${step} of 3`}
    >
      <div className="flex flex-col items-center gap-1 w-full">
        <RootBracketNumberLineSvg
          lowVal={225}
          lowLabel="15² = 225"
          targetVal={250}
          targetLabel={step === 3 ? '√250 ≈ 15.8' : '250'}
          highVal={256}
          highLabel="16² = 256"
          highlightAnswer={step === 3}
        />
        {step >= 2 && (
          <div className="flex items-center gap-2 font-mono font-black text-micro animate-fade-rise">
            <span className="px-2 py-0.5 rounded-lg bg-slate-100 border border-slate-300 text-slate-700">
              250 − 225 = 25
            </span>
            <span className="px-2 py-0.5 rounded-lg bg-emerald-100 border border-emerald-400 text-emerald-900">
              256 − 250 = 6 (Closer!)
            </span>
          </div>
        )}
      </div>
    </QuickCheckStepShell>
  );
};

// -----------------------------------------------------------------------------
// EX-10: Akhil's Square Cloth (125 cm²) -> SquareAreaCanvasSvg
// -----------------------------------------------------------------------------
export const Ex10AkhilClothVisualizer: React.FC<PracticeVisualizerProps> = ({
  onNextQuestion,
  onResetQuestion,
  isLastQuestion,
}) => {
  const { step, maxStep, advance, selectStep, replay } = useStepProgress(3);
  const animated121 = useAnimatedNumber(121, step >= 2, 550, 0);

  const steps: StepDefinition[] = [
    { label: 'Try 15 cm', cue: 'Step 1: 15 cm handkerchief needs 225 cm² — exceeds 125 cm² cloth!' },
    { label: 'Fit 11 cm', cue: 'Step 2: Sweep 11 × 11 tiles = 121 cm² inside the cloth.' },
    { label: 'Answer', cue: 'Step 3: Largest integer handkerchief side is 11 cm!' },
  ];

  return (
    <QuickCheckStepShell
      ariaLabel="Worked Example 10 Akhil Square Cloth 125 cm squared"
      isCorrect={true}
      headerTitle="Worked Example 10"
      headerBadge={step === 1 ? 'Cloth = 125 cm²' : 'Max Side = 11 cm'}
      steps={steps}
      step={step}
      maxStep={maxStep}
      onSelectStep={selectStep}
      onAdvance={advance}
      onReset={() => {
        replay();
        onResetQuestion();
      }}
      onNext={!isLastQuestion ? onNextQuestion : undefined}
      isLastQuestion={isLastQuestion}
      nextLabel="Next Question"
      insightTone={step === 3 ? 'success' : step === 1 ? 'warning' : 'neutral'}
      insightText={
        step === 1
          ? '15² = 225 cm² overflows 125 cm² cloth — cutting 15 cm is impossible!'
          : step === 2
          ? '11² = 121 cm² fits inside 125 cm², while 12² = 144 cm² is too big!'
          : '✓ Akhil can cut a 11 cm × 11 cm handkerchief (using 121 cm²)!'
      }
      footerText={step === 3 ? '✓ Max integer side = 11 cm!' : `Step ${step} of 3`}
    >
      <div className="flex items-center justify-center gap-4 w-full">
        {step === 1 ? (
          <SquareAreaCanvasSvg
            side={15}
            filledCount={125}
            pulseOutline={true}
            showTotalBadge={true}
            fillColor="#F59E0B"
            strokeColor="#B45309"
            customBadgeText="125 / 225"
          />
        ) : (
          <SquareAreaCanvasSvg
            side={11}
            filledCount={animated121}
            showTotalBadge={step === 3}
            customBadgeText="11² = 121 cm²"
          />
        )}
        <div className="flex flex-col gap-1.5 font-mono font-black text-micro">
          <span className="px-2.5 py-1 rounded-xl bg-amber-50 border border-amber-300 text-amber-950">
            Cloth: 125 cm²
          </span>
          {step === 1 ? (
            <span className="px-2.5 py-1 rounded-xl bg-rose-100 border border-rose-400 text-rose-900">
              15² = 225 ✗
            </span>
          ) : (
            <span className="px-2.5 py-1 rounded-xl bg-emerald-600 text-white shadow-xs">
              11² = 121 ≤ 125 ✓
            </span>
          )}
        </div>
      </div>
    </QuickCheckStepShell>
  );
};

// -----------------------------------------------------------------------------
// EX-11: Unit Cubes in Edge-4 Cube -> CompactIsometricCubeSvg
// -----------------------------------------------------------------------------
export const Ex11UnitCubesEdge4Visualizer: React.FC<PracticeVisualizerProps> = ({
  onNextQuestion,
  onResetQuestion,
  isLastQuestion,
}) => {
  const { step, maxStep, advance, selectStep, replay } = useStepProgress(3);
  const layerTick = useSequenceTick(step === 2, 4, 280, step);
  const visibleLayers = step === 1 ? 1 : step === 2 ? Math.max(1, layerTick) : 4;

  const steps: StepDefinition[] = [
    { label: '1 Layer', cue: 'Step 1: Bottom layer holds 4 × 4 = 16 unit cubes.' },
    { label: 'Stack 4', cue: 'Step 2: Stack 4 layers up: 16 → 32 → 48 → 64!' },
    { label: 'Answer', cue: 'Step 3: Total volume = 4³ = 64 unit cubes!' },
  ];

  return (
    <QuickCheckStepShell
      ariaLabel="Worked Example 11 Unit Cubes in Edge 4 Cube"
      isCorrect={true}
      headerTitle="Worked Example 11"
      headerBadge={step < 3 ? `Layers: ${visibleLayers} / 4` : '4³ = 64 Cubes'}
      steps={steps}
      step={step}
      maxStep={maxStep}
      onSelectStep={selectStep}
      onAdvance={advance}
      onReset={() => {
        replay();
        onResetQuestion();
      }}
      onNext={!isLastQuestion ? onNextQuestion : undefined}
      isLastQuestion={isLastQuestion}
      nextLabel="Next Question"
      insightTone={step === 3 ? 'success' : 'neutral'}
      insightText={
        step === 1
          ? 'Each horizontal slice is a 4 × 4 flat square containing 16 cubes.'
          : step === 2
          ? 'Four stacked slices give 4 × 16 = 64 cubes filling the whole frame!'
          : '✓ Edge-4 cube takes 4 × 4 × 4 = 64 unit cubes!'
      }
      footerText={step === 3 ? '✓ 4³ = 64 unit cubes!' : `Step ${step} of 3`}
    >
      <div className="flex items-center justify-center gap-4 w-full">
        <CompactIsometricCubeSvg
          n={4}
          visibleLayers={visibleLayers}
          showFinalHighlight={step === 3}
        />
        <div className="flex flex-col gap-1 font-mono font-black text-micro">
          {[1, 2, 3, 4].map((layer) => {
            const active = layer <= visibleLayers;
            return (
              <span
                key={layer}
                className={`px-2.5 py-0.5 rounded-lg border transition-all ${
                  active
                    ? step === 3
                      ? 'bg-emerald-600 text-white border-emerald-700'
                      : 'bg-purple-100 text-purple-900 border-purple-400'
                    : 'bg-slate-50 text-slate-400 border-slate-200'
                }`}
              >
                L{layer}: {layer * 16} cubes
              </span>
            );
          })}
        </div>
      </div>
    </QuickCheckStepShell>
  );
};

// -----------------------------------------------------------------------------
// EX-12: Testing Cubes: 3375 vs 500 -> PrimeFactorCapsulesCanvas
// -----------------------------------------------------------------------------
export const Ex12TestingCubesVisualizer: React.FC<PracticeVisualizerProps> = ({
  onNextQuestion,
  onResetQuestion,
  isLastQuestion,
}) => {
  const { step, maxStep, advance, selectStep, replay } = useStepProgress(3);
  const ready = useStepReady(step, 50);

  const steps: StepDefinition[] = [
    { label: 'Test 3375', cue: 'Step 1: Factor 3375 — primes 3 and 5 form full triplets!' },
    { label: 'Test 500', cue: 'Step 2: Factor 500 — prime 2 is missing its third partner!' },
    { label: 'Answer', cue: 'Step 3: 3375 = 15³ is a cube; 500 is NOT!' },
  ];

  return (
    <QuickCheckStepShell
      ariaLabel="Worked Example 12 Testing Cubes 3375 vs 500"
      isCorrect={true}
      headerTitle="Worked Example 12"
      headerBadge={step < 3 ? '3375 vs 500' : '∛3375 = 15'}
      steps={steps}
      step={step}
      maxStep={maxStep}
      onSelectStep={selectStep}
      onAdvance={advance}
      onReset={() => {
        replay();
        onResetQuestion();
      }}
      onNext={!isLastQuestion ? onNextQuestion : undefined}
      isLastQuestion={isLastQuestion}
      nextLabel="Next Question"
      insightTone={step === 3 ? 'success' : step === 2 ? 'danger' : 'neutral'}
      insightText={
        step === 1
          ? '3375 = (3×3×3) × (5×5×5). Pick one per triplet: 3 × 5 = 15!'
          : step === 2
          ? '500 = 2 × 2 × (5×5×5) — only two 2s, missing a 3rd partner!'
          : '✓ 3375 is 15³, while 500 is NOT a perfect cube!'
      }
      footerText={step === 3 ? '✓ 3375 = 15³; 500 is not a cube!' : `Step ${step} of 3`}
    >
      {step === 1 && (
        <PrimeFactorCapsulesCanvas
          groups={[{ factors: [3, 3, 3] }, { factors: [5, 5, 5] }]}
          locked={ready}
          pickOneIndex={ready}
          resultEquation="∛3375 = 3 × 5 = 15"
        />
      )}
      {step === 2 && (
        <PrimeFactorCapsulesCanvas
          groups={[
            { factors: [2, 2], missingSlot: true },
            { factors: [5, 5, 5] },
          ]}
          locked={false}
        />
      )}
      {step === 3 && (
        <PrimeFactorCapsulesCanvas
          groups={[{ factors: [3, 3, 3] }, { factors: [5, 5, 5] }]}
          locked={true}
          pickOneIndex={true}
          resultEquation="3375 = 15³ ✓  |  500 ✗"
        />
      )}
    </QuickCheckStepShell>
  );
};

// -----------------------------------------------------------------------------
// EX-13: Prime Factorisation of Cubes (4, 6, 12, 15) -> PrimeFactorCapsulesCanvas
// -----------------------------------------------------------------------------
export const Ex13PrimeFactorCubesVisualizer: React.FC<PracticeVisualizerProps> = ({
  onNextQuestion,
  onResetQuestion,
  isLastQuestion,
}) => {
  const { step, maxStep, advance, selectStep, replay } = useStepProgress(3);
  const ready = useStepReady(step, 50);

  const steps: StepDefinition[] = [
    { label: 'Base Primes', cue: 'Step 1: Inspect prime factors of 4, 6, 12, and 15.' },
    { label: 'Triple Them', cue: 'Step 2: Cube each number — every prime factor triples into 3s!' },
    { label: 'Answer', cue: 'Step 3: Cubing always multiplies every prime exponent by 3!' },
  ];

  return (
    <QuickCheckStepShell
      ariaLabel="Worked Example 13 Prime Factorisation of Cubes"
      isCorrect={true}
      headerTitle="Worked Example 13"
      headerBadge={step < 3 ? '4, 6, 12, 15' : 'Exponents × 3'}
      steps={steps}
      step={step}
      maxStep={maxStep}
      onSelectStep={selectStep}
      onAdvance={advance}
      onReset={() => {
        replay();
        onResetQuestion();
      }}
      onNext={!isLastQuestion ? onNextQuestion : undefined}
      isLastQuestion={isLastQuestion}
      nextLabel="Next Question"
      insightTone={step === 3 ? 'success' : 'neutral'}
      insightText={
        step === 1
          ? '4 = 2², 6 = 2×3, 12 = 2²×3, 15 = 3×5.'
          : step === 2
          ? '4³ = 2⁶, 6³ = 2³×3³, 12³ = 2⁶×3³, 15³ = 3³×5³!'
          : '✓ Every prime factor appears 3 times as often inside its cube!'
      }
      footerText={step === 3 ? '✓ Cubing triples every prime exponent!' : `Step ${step} of 3`}
    >
      {step === 1 && (
        <div className="flex flex-col items-center gap-1.5 w-full">
          <PrimeFactorCapsulesCanvas
            groups={[{ factors: [2, 2] }, { factors: [2, 3] }, { factors: [3, 5] }]}
            locked={false}
          />
          <div className="flex flex-wrap justify-center gap-2 font-mono font-black text-micro text-[#005583]">
            <span>4=2²</span>
            <span>·</span>
            <span>6=2×3</span>
            <span>·</span>
            <span>12=2²×3</span>
            <span>·</span>
            <span>15=3×5</span>
          </div>
        </div>
      )}
      {step === 2 && (
        <PrimeFactorCapsulesCanvas
          groups={[{ factors: [2, 2, 2] }, { factors: [3, 3, 3] }, { factors: [5, 5, 5] }]}
          locked={ready}
          resultEquation="6³ = 2³×3³  |  15³ = 3³×5³"
        />
      )}
      {step === 3 && (
        <PrimeFactorCapsulesCanvas
          groups={[
            { factors: [2, 2, 2] },
            { factors: [2, 2, 2] },
            { factors: [3, 3, 3] },
          ]}
          locked={true}
          resultEquation="12 = 2²×3  →  12³ = 2⁶×3³ ✓"
        />
      )}
    </QuickCheckStepShell>
  );
};

// -----------------------------------------------------------------------------
// EX-14: Cube Roots of 64, 512, 729 -> InverseCubeMachineSvg
// -----------------------------------------------------------------------------
const EX14_ITEMS = [4, 8, 9];

export const Ex14CubeRoots64512729Visualizer: React.FC<PracticeVisualizerProps> = ({
  onNextQuestion,
  onResetQuestion,
  isLastQuestion,
}) => {
  const { step, maxStep, advance, selectStep, replay } = useStepProgress(3);
  const tick = useSequenceTick(step <= 2, EX14_ITEMS.length, 650, step);
  const currentBase = EX14_ITEMS[tick % EX14_ITEMS.length];

  const steps: StepDefinition[] = [
    { label: 'Cube Forward', cue: 'Step 1: Feed 4, 8, and 9 forward to cube them.' },
    { label: 'Reverse ∛', cue: 'Step 2: Reverse the machine with ∛ to recover original edges!' },
    { label: 'Answer', cue: 'Step 3: ∛64 = 4, ∛512 = 8, and ∛729 = 9!' },
  ];

  return (
    <QuickCheckStepShell
      ariaLabel="Worked Example 14 Cube Roots of 64, 512, and 729"
      isCorrect={true}
      headerTitle="Worked Example 14"
      headerBadge={step < 3 ? '∛64, ∛512, ∛729' : '4, 8, and 9'}
      steps={steps}
      step={step}
      maxStep={maxStep}
      onSelectStep={selectStep}
      onAdvance={advance}
      onReset={() => {
        replay();
        onResetQuestion();
      }}
      onNext={!isLastQuestion ? onNextQuestion : undefined}
      isLastQuestion={isLastQuestion}
      nextLabel="Next Question"
      insightTone={step === 3 ? 'success' : 'neutral'}
      insightText={
        step === 1
          ? '4³ = 64, 8³ = 512, and 9³ = 729 — cubing turns edge into volume!'
          : step === 2
          ? 'Cube root ∛ walks backward from volume right back to edge n!'
          : '✓ ∛64 = 4, ∛512 = 8, and ∛729 = 9!'
      }
      footerText={step === 3 ? '✓ ∛64 = 4, ∛512 = 8, ∛729 = 9!' : `Step ${step} of 3`}
    >
      {step <= 2 ? (
        <InverseCubeMachineSvg
          baseN={currentBase}
          phase={step === 1 ? 'forward' : 'reverse'}
        />
      ) : (
        <div className="flex flex-col items-center gap-1.5 w-full">
          <InverseCubeMachineSvg baseN={9} phase="cycle" />
          <div className="flex items-center justify-center gap-2 font-mono font-black text-micro">
            <span className="px-2.5 py-0.5 rounded-lg bg-emerald-600 text-white">∛64 = 4</span>
            <span className="px-2.5 py-0.5 rounded-lg bg-emerald-600 text-white">∛512 = 8</span>
            <span className="px-2.5 py-0.5 rounded-lg bg-emerald-600 text-white">∛729 = 9</span>
          </div>
        </div>
      )}
    </QuickCheckStepShell>
  );
};

// -----------------------------------------------------------------------------
// EX-15: Triangular Numbers Sum to Squares -> TriangularZipperSvg
// -----------------------------------------------------------------------------
export const Ex15TriangularNumbersSquareVisualizer: React.FC<PracticeVisualizerProps> = ({
  onNextQuestion,
  onResetQuestion,
  isLastQuestion,
}) => {
  const { step, maxStep, advance, selectStep, replay } = useStepProgress(3);
  const zipAnim = useAnimatedNumber(100, step >= 2, 650, 0);

  const steps: StepDefinition[] = [
    { label: 'Two Triangles', cue: 'Step 1: Line up consecutive triangular dot stacks: 1, 3, 6, 10.' },
    { label: 'Zip Together', cue: 'Step 2: Zip T₃ (6) and T₄ (10) together along the diagonal!' },
    { label: 'Answer', cue: 'Step 3: Consecutive triangular numbers ALWAYS zip into a perfect square!' },
  ];

  return (
    <QuickCheckStepShell
      ariaLabel="Worked Example 15 Triangular Numbers Sum to Squares"
      isCorrect={true}
      headerTitle="Worked Example 15"
      headerBadge={step < 3 ? '1, 3, 6, 10, 15' : 'T(n−1) + T(n) = n²'}
      steps={steps}
      step={step}
      maxStep={maxStep}
      onSelectStep={selectStep}
      onAdvance={advance}
      onReset={() => {
        replay();
        onResetQuestion();
      }}
      onNext={!isLastQuestion ? onNextQuestion : undefined}
      isLastQuestion={isLastQuestion}
      nextLabel="Next Question"
      insightTone={step === 3 ? 'success' : 'neutral'}
      insightText={
        step === 1
          ? 'Orange triangle holds T₄ = 10 dots; blue upside-down triangle holds T₃ = 6 dots!'
          : step === 2
          ? 'Slide them together: 6 + 10 = 16 dots locked in a 4 × 4 square!'
          : '✓ 1+3=4 (2²), 3+6=9 (3²), 6+10=16 (4²), 10+15=25 (5²)!'
      }
      footerText={step === 3 ? '✓ T(n−1) + T(n) = n² always!' : `Step ${step} of 3`}
    >
      <div className="flex flex-col items-center gap-1 w-full">
        <TriangularZipperSvg n={4} zipPercent={step === 1 ? 0 : step === 2 ? zipAnim : 100} />
        {step === 3 && (
          <div className="flex flex-wrap justify-center gap-1.5 font-mono font-black text-micro text-emerald-900">
            <span className="px-2 py-0.5 rounded-lg bg-emerald-50 border border-emerald-300">1+3=4</span>
            <span className="px-2 py-0.5 rounded-lg bg-emerald-50 border border-emerald-300">3+6=9</span>
            <span className="px-2 py-0.5 rounded-lg bg-emerald-50 border border-emerald-300">6+10=16</span>
            <span className="px-2 py-0.5 rounded-lg bg-emerald-50 border border-emerald-300">10+15=25</span>
          </div>
        )}
      </div>
    </QuickCheckStepShell>
  );
};

// -----------------------------------------------------------------------------
// EX-16: Successive Differences of Cubes -> DifferencePyramidBarSvg
// -----------------------------------------------------------------------------
const EX16_CUBES = [1, 8, 27, 64, 125, 216];

export const Ex16SuccessiveDiffsCubesVisualizer: React.FC<PracticeVisualizerProps> = ({
  onNextQuestion,
  onResetQuestion,
  isLastQuestion,
}) => {
  const { step, maxStep, advance, selectStep, replay } = useStepProgress(3);
  const steps: StepDefinition[] = [
    { label: 'Level 0 Cubes', cue: 'Step 1: Start with Level 0 cubes: 1, 8, 27, 64, 125, 216.' },
    { label: 'Level 1 & 2', cue: 'Step 2: Subtract neighbours twice to reveal Level 1 and Level 2.' },
    { label: 'Answer', cue: 'Step 3: Level 3 differences lock at a constant 6!' },
  ];

  return (
    <QuickCheckStepShell
      ariaLabel="Worked Example 16 Successive Differences of Cubes"
      isCorrect={true}
      headerTitle="Worked Example 16"
      headerBadge={step < 3 ? 'Cube Pyramid' : 'Level 3 = 6!'}
      steps={steps}
      step={step}
      maxStep={maxStep}
      onSelectStep={selectStep}
      onAdvance={advance}
      onReset={() => {
        replay();
        onResetQuestion();
      }}
      onNext={!isLastQuestion ? onNextQuestion : undefined}
      isLastQuestion={isLastQuestion}
      nextLabel="Next Question"
      insightTone={step === 3 ? 'success' : 'neutral'}
      insightText={
        step === 1
          ? 'Level 0 lists the first six cubes: 1³ to 6³.'
          : step === 2
          ? 'Level 1 jumps (7, 19, 37, 61, 91), Level 2 climbs by 6s (12, 18, 24, 30)!'
          : '✓ Subtracting one more time locks every cube sequence at constant 6!'
      }
      footerText={step === 3 ? '✓ Level 3 difference is always constant 6!' : `Step ${step} of 3`}
    >
      <DifferencePyramidBarSvg
        cubes={EX16_CUBES}
        visibleLevels={step === 1 ? 1 : step === 2 ? 3 : 4}
        spotlightConstant6={step === 3}
      />
    </QuickCheckStepShell>
  );
};

// -----------------------------------------------------------------------------
// Master Stage Router for Solved Examples (keyed by question.id for clean reset)
// -----------------------------------------------------------------------------
export const PracticeSolvedVisualizerStage: React.FC<PracticeVisualizerProps> = (props) => {
  const id = props.question.id;
  switch (id) {
    case 'ex-1':
      return <Ex1FractionDecimalSquareVisualizer key={id} {...props} />;
    case 'ex-2':
      return <Ex2NextSquareVisualizer key={id} {...props} />;
    case 'ex-3':
      return <Ex3RepeatedSubtractionVisualizer key={id} {...props} />;
    case 'ex-4':
      return <Ex4SquareRootsPlusMinusVisualizer key={id} {...props} />;
    case 'ex-5':
      return <Ex5TestingSquarenessVisualizer key={id} {...props} />;
    case 'ex-6':
      return <Ex6PrimeFactorisationVisualizer key={id} {...props} />;
    case 'ex-7':
      return <Ex7Checking1156And2800Visualizer key={id} {...props} />;
    case 'ex-8':
      return <Ex8EstimatingRoot1936Visualizer key={id} {...props} />;
    case 'ex-9':
      return <Ex9AribamBijouRoot250Visualizer key={id} {...props} />;
    case 'ex-10':
      return <Ex10AkhilClothVisualizer key={id} {...props} />;
    case 'ex-11':
      return <Ex11UnitCubesEdge4Visualizer key={id} {...props} />;
    case 'ex-12':
      return <Ex12TestingCubesVisualizer key={id} {...props} />;
    case 'ex-13':
      return <Ex13PrimeFactorCubesVisualizer key={id} {...props} />;
    case 'ex-14':
      return <Ex14CubeRoots64512729Visualizer key={id} {...props} />;
    case 'ex-15':
      return <Ex15TriangularNumbersSquareVisualizer key={id} {...props} />;
    case 'ex-16':
      return <Ex16SuccessiveDiffsCubesVisualizer key={id} {...props} />;
    default:
      return null;
  }
};
