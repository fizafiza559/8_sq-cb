/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  QuickCheckStepShell,
  QuickCheckVisualizerStageProps,
  StepDefinition,
  useSequenceTick,
  useStepProgress,
} from './SquaresQuickCheckVisualizers';
import { CompactIsometricCubeSvg } from '../IsometricCubeRenderer';
import { CubeZeroTriplerSvg } from '../../scenes/CubePatternsScene';
import {
  CubeOddTapeSvg,
  TaxicabBalanceScaleSvg,
} from '../../scenes/CubeOddSumsAndTaxiScene';
import { PrimeFactorCapsulesCanvas } from '../../scenes/SquareRootPrimeEstimateScene';
import { DifferencePyramidBarSvg } from '../../scenes/DifferenceEngineTable';

// -----------------------------------------------------------------------------
// SCENE 9: ISOMETRIC CUBE VOLUME (5 × 5 × 5 = 125)
// -----------------------------------------------------------------------------
export const IsometricCubeVolumeVisualizer: React.FC<QuickCheckVisualizerStageProps> = ({
  onNext,
  onReset,
  isCorrect,
  isLastQuestion,
}) => {
  const { step, maxStep, advance, selectStep } = useStepProgress(3);
  const stackTick = useSequenceTick(step === 2, 4, 260, step);

  const visibleLayers = step === 1 ? 1 : step === 2 ? Math.min(5, 1 + stackTick) : 5;
  const totalCubes = visibleLayers * 25;

  const steps: StepDefinition[] = [
    { label: 'Base layer', cue: 'Step 1: Start with a flat 5 × 5 floor of 25 unit cubes.' },
    { label: 'Stack 5 high', cue: 'Step 2: Stack 5 identical floors high inside the cube!' },
    { label: 'Answer', cue: 'Step 3: 5 × 5 × 5 = 5³ = 125 cubic units!' },
  ];

  return (
    <QuickCheckStepShell
      ariaLabel="Isometric Cube Volume Step-by-Step Solution"
      isCorrect={isCorrect}
      headerTitle={isCorrect ? '✓ Right! Cube Volume' : 'Review — Cube Volume'}
      headerBadge={step < 3 ? 'Edge = 5' : '5³ = 125'}
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
          ? 'The bottom layer holds 5 × 5 = 25 unit cubes.'
          : step === 2
          ? `Layer ${visibleLayers} of 5 stacked → ${visibleLayers} × 25 = ${totalCubes} unit cubes!`
          : '🎉 5 layers of 25 cubes fill 125 cubic units!'
      }
      footerText={step === 3 ? '✓ Volume = 125 cubic units!' : `Step ${step} of 3`}
    >
      <div className="flex items-center justify-center gap-4">
        <CompactIsometricCubeSvg
          n={5}
          visibleLayers={visibleLayers}
          showFinalHighlight={step === 3}
        />
        <div className="px-3 py-1.5 rounded-xl bg-purple-50 border border-purple-200 font-mono font-black text-small text-purple-900 tabular-nums">
          {totalCubes} / 125
        </div>
      </div>
    </QuickCheckStepShell>
  );
};

// -----------------------------------------------------------------------------
// SCENE 10: CUBE ZEROS TRIPLER (200³ → 6 Zeros)
// -----------------------------------------------------------------------------
export const CubeZerosTriplerVisualizer: React.FC<QuickCheckVisualizerStageProps> = ({
  onNext,
  onReset,
  isCorrect,
  isLastQuestion,
}) => {
  const { step, maxStep, advance, selectStep } = useStepProgress(3);

  const steps: StepDefinition[] = [
    { label: 'Count zeros', cue: 'Step 1: Count trailing zeros in 200: 2 zeros!' },
    { label: 'Triple ×3', cue: 'Step 2: Cubing triples every zero: 3 × 2 = 6 zeros!' },
    { label: 'Answer', cue: 'Step 3: 200³ = 8,000,000 — ends in 6 trailing zeros!' },
  ];

  return (
    <QuickCheckStepShell
      ariaLabel="Cube Trailing Zeros Step-by-Step Solution"
      isCorrect={isCorrect}
      headerTitle={isCorrect ? '✓ Right! Zero Tripler' : 'Review — Zero Tripler'}
      headerBadge={step < 3 ? '200³' : '6 Zeros'}
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
          ? '200 has 2 zeros at the end (2 × 100).'
          : step === 2
          ? '100 × 100 × 100 stacks 2 + 2 + 2 = 6 trailing zeros!'
          : '🎉 200³ = 8,000,000! Each zero triples when cubed.'
      }
      footerText={step === 3 ? '✓ 200³ ends in 6 zeros!' : `Step ${step} of 3`}
    >
      <CubeZeroTriplerSvg
        baseZeros={2}
        tripled={step >= 2}
      />
    </QuickCheckStepShell>
  );
};

// -----------------------------------------------------------------------------
// SCENE 11: HARDY-RAMANUJAN TAXICAB SCALE (1729)
// -----------------------------------------------------------------------------
export const TaxicabDualCubeVisualizer: React.FC<QuickCheckVisualizerStageProps> = ({
  onNext,
  onReset,
  isCorrect,
  isLastQuestion,
}) => {
  const { step, maxStep, advance, selectStep } = useStepProgress(3);

  const steps: StepDefinition[] = [
    { label: 'First pan', cue: 'Step 1: Weigh 1³ + 12³ = 1 + 1728 = 1729 on the left!' },
    { label: 'Second pan', cue: 'Step 2: Add 9³ + 10³ = 729 + 1000 = 1729 on the right!' },
    { label: 'Answer', cue: 'Step 3: Both pans balance at 1729 — the smallest Taxicab number!' },
  ];

  return (
    <QuickCheckStepShell
      ariaLabel="Ramanujan Taxicab Scale Step-by-Step Solution"
      isCorrect={isCorrect}
      headerTitle={isCorrect ? '✓ Right! Taxicab 1729' : 'Review — Taxicab 1729'}
      headerBadge={step < 3 ? 'Taxicab 1729' : '1³+12³ = 9³+10³'}
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
          ? 'Way 1: 1³ + 12³ = 1 + 1728 = 1729.'
          : step === 2
          ? 'Way 2: 9³ + 10³ = 729 + 1000 = 1729 — exact balance!'
          : '🎉 1729 = 1³ + 12³ = 9³ + 10³ is the famous Hardy–Ramanujan number!'
      }
      footerText={step === 3 ? '✓ 1³ + 12³ and 9³ + 10³ make 1729!' : `Step ${step} of 3`}
    >
      <TaxicabBalanceScaleSvg
        taxicab={1729}
        showRightPan={step >= 2}
        balanced={step >= 2}
      />
    </QuickCheckStepShell>
  );
};

// -----------------------------------------------------------------------------
// SCENE 12: ODD NUMBERS SUM TO A CUBE (4³ = 13+15+17+19 = 64)
// -----------------------------------------------------------------------------
export const CubeOddPyramidVisualizer: React.FC<QuickCheckVisualizerStageProps> = ({
  onNext,
  onReset,
  isCorrect,
  isLastQuestion,
}) => {
  const { step, maxStep, advance, selectStep } = useStepProgress(3);

  const steps: StepDefinition[] = [
    { label: 'First 3 blocks', cue: 'Step 1: Cubes claim consecutive odd groups ending at 11.' },
    { label: '4th block', cue: 'Step 2: 4³ claims the next 4 consecutive odd numbers!' },
    { label: 'Answer', cue: 'Step 3: 13 + 15 + 17 + 19 = 64 = 4³!' },
  ];

  return (
    <QuickCheckStepShell
      ariaLabel="Cube Odd Sums Step-by-Step Solution"
      isCorrect={isCorrect}
      headerTitle={isCorrect ? '✓ Right! Odd Sums to Cubes' : 'Review — Odd Sums to Cubes'}
      headerBadge={step < 3 ? 'Find 4³' : '13+15+17+19'}
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
          ? '1³ = 1, 2³ = 3+5, and 3³ = 7+9+11 ends right at 11!'
          : step === 2
          ? 'The 4th block picks up right after 11 with 4 odds: 13, 15, 17, 19!'
          : '🎉 13 + 15 + 17 + 19 = 64 = 4³!'
      }
      footerText={step === 3 ? '✓ 4³ = 13 + 15 + 17 + 19!' : `Step ${step} of 3`}
    >
      <CubeOddTapeSvg
        highlightN={step === 1 ? 3 : 4}
      />
    </QuickCheckStepShell>
  );
};

// -----------------------------------------------------------------------------
// SCENE 13: CUBE ROOT BY PRIME TRIPLETS (∛512 = 8)
// -----------------------------------------------------------------------------
export const CubeRootTripletGroupingVisualizer: React.FC<QuickCheckVisualizerStageProps> = ({
  onNext,
  onReset,
  isCorrect,
  isLastQuestion,
}) => {
  const { step, maxStep, advance, selectStep } = useStepProgress(3);

  const steps: StepDefinition[] = [
    { label: 'Split 512', cue: 'Step 1: Factor 512 completely into primes: nine 2s!' },
    { label: 'Lock triplets', cue: 'Step 2: Group the nine 2s into three equal triplets!' },
    { label: 'Answer', cue: 'Step 3: Take 1 from each triplet: 2 × 2 × 2 = 8!' },
  ];

  const groups = [
    { factors: [2, 2, 2] },
    { factors: [2, 2, 2] },
    { factors: [2, 2, 2] },
  ];

  return (
    <QuickCheckStepShell
      ariaLabel="Cube Root Triplets Step-by-Step Solution"
      isCorrect={isCorrect}
      headerTitle={isCorrect ? '✓ Right! Cube Root Triplets' : 'Review — Cube Root Triplets'}
      headerBadge={step < 3 ? 'Find ∛512' : '∛512 = 8'}
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
          ? '512 = 2⁹ — divide by 2 nine times in a row!'
          : step === 2
          ? 'For cube roots, every 3 matching primes lock into 1 triplet capsule!'
          : '🎉 One 2 from each of the 3 triplets gives 2 × 2 × 2 = 8 = ∛512!'
      }
      footerText={step === 3 ? '✓ ∛512 = 8!' : `Step ${step} of 3`}
    >
      <PrimeFactorCapsulesCanvas
        groups={groups}
        locked={step >= 2}
        pickOneIndex={step === 3}
        resultEquation={step === 3 ? '2 × 2 × 2 = 8' : undefined}
      />
    </QuickCheckStepShell>
  );
};

// -----------------------------------------------------------------------------
// SCENE 14: CUBE DIFFERENCE ENGINE (2³ - 1³ = 7)
// -----------------------------------------------------------------------------
export const CubeDifferenceEngineVisualizer: React.FC<QuickCheckVisualizerStageProps> = ({
  onNext,
  onReset,
  isCorrect,
  isLastQuestion,
}) => {
  const { step, maxStep, advance, selectStep } = useStepProgress(3);

  const steps: StepDefinition[] = [
    { label: 'List cubes', cue: 'Step 1: Write the first four cubes: 1, 8, 27, 64.' },
    { label: 'Subtract rows', cue: 'Step 2: Subtract neighbors: 8−1=7, 27−8=19, 64−27=37!' },
    { label: 'Answer', cue: 'Step 3: The very first difference 2³ − 1³ equals 7!' },
  ];

  return (
    <QuickCheckStepShell
      ariaLabel="Cube Difference Engine Step-by-Step Solution"
      isCorrect={isCorrect}
      headerTitle={isCorrect ? '✓ Right! Cube Differences' : 'Review — Cube Differences'}
      headerBadge={step < 3 ? '2³ − 1³' : 'First Diff = 7'}
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
          ? '1³ = 1 and 2³ = 8 sit at the top of the Difference Pyramid!'
          : step === 2
          ? '1st differences are 7, 19, 37 — and their jumps (Level 2) are multiples of 6!'
          : '🎉 2³ − 1³ = 8 − 1 = 7 is the first cube difference!'
      }
      footerText={step === 3 ? '✓ First difference = 7!' : `Step ${step} of 3`}
    >
      <DifferencePyramidBarSvg
        visibleLevels={step === 1 ? 1 : step === 2 ? 3 : 2}
        spotlightFirstDiff={step === 3}
      />
    </QuickCheckStepShell>
  );
};
