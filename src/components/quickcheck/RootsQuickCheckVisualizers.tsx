/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  QuickCheckStepShell,
  QuickCheckVisualizerStageProps,
  StepDefinition,
  useStepProgress,
} from './SquaresQuickCheckVisualizers';
import { PrincipalRootGateSvg } from '../../scenes/RootsPlusMinusScene';
import {
  PrimeFactorCapsulesCanvas,
  RootBracketNumberLineSvg,
} from '../../scenes/SquareRootPrimeEstimateScene';

// -----------------------------------------------------------------------------
// SCENE 6: PRINCIPAL SQUARE ROOT OF 81 (√81 = +9)
// -----------------------------------------------------------------------------
export const CourtyardPrincipalRootVisualizer: React.FC<QuickCheckVisualizerStageProps> = ({
  onNext,
  onReset,
  isCorrect,
  isLastQuestion,
}) => {
  const { step, maxStep, advance, selectStep } = useStepProgress(3);

  const steps: StepDefinition[] = [
    { label: 'Two roots', cue: 'Step 1: Both (+9)² and (−9)² equal 81!' },
    { label: 'Positive gate', cue: 'Step 2: The √ symbol only passes positive side lengths.' },
    { label: 'Answer', cue: 'Step 3: The principal square root √81 is +9!' },
  ];

  return (
    <QuickCheckStepShell
      ariaLabel="Principal Square Root Step-by-Step Solution"
      isCorrect={isCorrect}
      headerTitle={isCorrect ? '✓ Right! Principal Root' : 'Review — Principal Root'}
      headerBadge={step < 3 ? 'Find √81' : '√81 = +9'}
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
          ? 'Negative times negative is positive, so both +9 and −9 square to 81.'
          : step === 2
          ? 'Lengths cannot be negative, so the √ gate blocks −9 and passes +9!'
          : '🎉 Principal square root √81 = +9 (positive side length)!'
      }
      footerText={step === 3 ? '✓ Principal root of 81 is 9!' : `Step ${step} of 3`}
    >
      <PrincipalRootGateSvg
        targetSquare={81}
        mode={step === 1 ? 'both' : step === 2 ? 'gate' : 'answer'}
      />
    </QuickCheckStepShell>
  );
};

// -----------------------------------------------------------------------------
// SCENE 7: PRIME FACTORIZATION FOR √144 = 12
// -----------------------------------------------------------------------------
export const PrimeFactorPairGroupingVisualizer: React.FC<QuickCheckVisualizerStageProps> = ({
  onNext,
  onReset,
  isCorrect,
  isLastQuestion,
}) => {
  const { step, maxStep, advance, selectStep } = useStepProgress(3);

  const steps: StepDefinition[] = [
    { label: 'Split 144', cue: 'Step 1: Break 144 into primes: 2 × 2 × 2 × 2 × 3 × 3.' },
    { label: 'Lock pairs', cue: 'Step 2: Lock identical primes into twin pairs!' },
    { label: 'Answer', cue: 'Step 3: Pick 1 from each pair: 2 × 2 × 3 = 12!' },
  ];

  const groups = [
    { factors: [2, 2] },
    { factors: [2, 2] },
    { factors: [3, 3] },
  ];

  return (
    <QuickCheckStepShell
      ariaLabel="Prime Factor Pairing Step-by-Step Solution"
      isCorrect={isCorrect}
      headerTitle={isCorrect ? '✓ Right! Prime Pairs' : 'Review — Prime Pairs'}
      headerBadge={step < 3 ? 'Factor 144' : '√144 = 12'}
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
          ? 'Divide repeatedly by small primes: 144 = 2 × 2 × 2 × 2 × 3 × 3.'
          : step === 2
          ? 'Every prime has a twin partner: (2×2), (2×2), and (3×3)!'
          : '🎉 Take one prime from each pair: 2 × 2 × 3 = 12, so √144 = 12!'
      }
      footerText={step === 3 ? '✓ √144 = 12!' : `Step ${step} of 3`}
    >
      <PrimeFactorCapsulesCanvas
        groups={groups}
        locked={step >= 2}
        pickOneIndex={step === 3}
        resultEquation={step === 3 ? '2 × 2 × 3 = 12' : undefined}
      />
    </QuickCheckStepShell>
  );
};

// -----------------------------------------------------------------------------
// SCENE 8: ROOT SANDWICH NUMBER LINE (√85 between 9 and 10)
// -----------------------------------------------------------------------------
export const RootSandwichNumberLineVisualizer: React.FC<QuickCheckVisualizerStageProps> = ({
  onNext,
  onReset,
  isCorrect,
  isLastQuestion,
}) => {
  const { step, maxStep, advance, selectStep } = useStepProgress(3);

  const steps: StepDefinition[] = [
    { label: 'Trap 85', cue: 'Step 1: Trap 85 between two neighbor squares: 81 and 100.' },
    { label: 'Root fences', cue: 'Step 2: Take the square root of the two fences: 9 and 10!' },
    { label: 'Answer', cue: 'Step 3: Since 81 < 85 < 100, √85 lies between 9 and 10!' },
  ];

  return (
    <QuickCheckStepShell
      ariaLabel="Root Estimation Number Line Step-by-Step Solution"
      isCorrect={isCorrect}
      headerTitle={isCorrect ? '✓ Right! Estimate Roots' : 'Review — Estimate Roots'}
      headerBadge={step < 3 ? 'Trap √85' : '9 < √85 < 10'}
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
          ? '81 is just below 85, and 100 is just above 85!'
          : step === 2
          ? '√81 = 9 on the left and √100 = 10 on the right!'
          : '🎉 √85 is trapped between 9 and 10 (and closer to 9)!'
      }
      footerText={step === 3 ? '✓ √85 is between 9 and 10!' : `Step ${step} of 3`}
    >
      <RootBracketNumberLineSvg
        lowVal={81}
        lowLabel={step >= 2 ? '√81 = 9' : '9²'}
        targetVal={85}
        targetLabel={step === 3 ? '√85 ∈ (9, 10)' : '85'}
        highVal={100}
        highLabel={step >= 2 ? '√100 = 10' : '10²'}
        highlightAnswer={step === 3}
      />
    </QuickCheckStepShell>
  );
};
