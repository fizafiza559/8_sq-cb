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
import {
  BabylonianTabletSvg,
  InverseCubeMachineSvg,
} from '../../scenes/HistoryVisualStory';
import { SquarePairsRowSvg } from '../../scenes/SquarePairsPuzzle';
import {
  PrimeFactorCapsulesCanvas,
  RootBracketNumberLineSvg,
} from '../../scenes/SquareRootPrimeEstimateScene';

// -----------------------------------------------------------------------------
// SCENE 15: BABYLONIAN CLAY TABLET (YBC 7289)
// -----------------------------------------------------------------------------
export const BabylonianTabletVisualizer: React.FC<QuickCheckVisualizerStageProps> = ({
  onNext,
  onReset,
  isCorrect,
  isLastQuestion,
}) => {
  const { step, maxStep, advance, selectStep } = useStepProgress(3);

  const steps: StepDefinition[] = [
    { label: 'Inspect tablet', cue: 'Step 1: Examine this 4,000-year-old clay tablet with √2!' },
    { label: 'Decode wedges', cue: 'Step 2: Translate its base-60 wedges into decimals!' },
    { label: 'Answer', cue: 'Step 3: The Babylonians carved √2 nearly 4,000 years ago!' },
  ];

  return (
    <QuickCheckStepShell
      ariaLabel="Babylonian Clay Tablet Step-by-Step Solution"
      isCorrect={isCorrect}
      headerTitle={isCorrect ? '✓ Right! History of Roots' : 'Review — History of Roots'}
      headerBadge={step < 3 ? 'Tablet YBC 7289' : 'Babylonians'}
      steps={steps}
      step={step}
      maxStep={maxStep}
      onSelectStep={selectStep}
      onAdvance={advance}
      onReset={onReset}
      onNext={onNext}
      isLastQuestion={isLastQuestion}
      insightTone={step === 3 ? 'warning' : 'neutral'}
      insightText={
        step === 1
          ? 'Mesopotamian scribes pressed cuneiform wedges into wet clay.'
          : step === 2
          ? '1 + 24/60 + 51/3600 + 10/216000 = 1.414213 — accurate to 6 decimals!'
          : '🎉 The Babylonians made these square-root tablets around 1800 BCE!'
      }
      footerText={step === 3 ? '✓ Ancient Babylonians carved it!' : `Step ${step} of 3`}
    >
      <BabylonianTabletSvg
        stage={step === 1 ? 'tablet' : step === 2 ? 'wedges' : 'answer'}
      />
    </QuickCheckStepShell>
  );
};

// -----------------------------------------------------------------------------
// SCENE 16: INVERSE OF CUBING (Cube Root ∛)
// -----------------------------------------------------------------------------
export const InverseMachineCycleVisualizer: React.FC<QuickCheckVisualizerStageProps> = ({
  onNext,
  onReset,
  isCorrect,
  isLastQuestion,
}) => {
  const { step, maxStep, advance, selectStep } = useStepProgress(3);

  const steps: StepDefinition[] = [
    { label: 'Cube forward', cue: 'Step 1: Cubing multiplies an edge 3 times: 4³ = 64.' },
    { label: 'Walk backward', cue: 'Step 2: To undo cubing, walk backward from 64 to 4!' },
    { label: 'Answer', cue: 'Step 3: The cube root (∛) is the exact inverse of cubing!' },
  ];

  return (
    <QuickCheckStepShell
      ariaLabel="Inverse of Cubing Step-by-Step Solution"
      isCorrect={isCorrect}
      headerTitle={isCorrect ? '✓ Right! Cube Root Inverse' : 'Review — Cube Root Inverse'}
      headerBadge={step < 3 ? 'n³ ↔ ∛V' : 'Cube Root'}
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
          ? 'Cubing turns edge 4 into total volume 64 (4 × 4 × 4).'
          : step === 2
          ? 'Taking the cube root unwraps volume 64 back to edge 4!'
          : '🎉 Just as √ undoes squaring, cube root (∛) undoes cubing!'
      }
      footerText={step === 3 ? '✓ Inverse of cubing is Cube Root!' : `Step ${step} of 3`}
    >
      <InverseCubeMachineSvg
        baseN={4}
        phase={step === 1 ? 'forward' : step === 2 ? 'reverse' : 'cycle'}
      />
    </QuickCheckStepShell>
  );
};

// -----------------------------------------------------------------------------
// SCENE 17: SQUARE PAIRS DOMINO (8 + 1 = 9 = 3²)
// -----------------------------------------------------------------------------
export const SquarePairsDominoVisualizer: React.FC<QuickCheckVisualizerStageProps> = ({
  onNext,
  onReset,
  isCorrect,
  isLastQuestion,
}) => {
  const { step, maxStep, advance, selectStep } = useStepProgress(3);

  const steps: StepDefinition[] = [
    { label: 'Place 8 & 1', cue: 'Step 1: Slide domino 8 right next to domino 1.' },
    { label: 'Snap & add', cue: 'Step 2: Snap them together to add the neighbors: 8 + 1 = 9!' },
    { label: 'Answer', cue: 'Step 3: Yes — 9 = 3² is a perfect square!' },
  ];

  return (
    <QuickCheckStepShell
      ariaLabel="Square Pairs Domino Step-by-Step Solution"
      isCorrect={isCorrect}
      headerTitle={isCorrect ? '✓ Right! Square Pairs' : 'Review — Square Pairs'}
      headerBadge={step < 3 ? 'Check 8 & 1' : '9 = 3² ✓'}
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
          ? 'In the Square Pairs puzzle, neighbors must add up to a square!'
          : step === 2
          ? '8 + 1 snaps together to give 9.'
          : '🎉 Since 9 = 3 × 3 = 3², placing 8 beside 1 makes a legal square pair!'
      }
      footerText={step === 3 ? '✓ 8 + 1 = 9 (3²)!' : `Step ${step} of 3`}
    >
      <SquarePairsRowSvg
        pairs={[8, 1]}
        snapped={step >= 2}
        showSquareBadge={step === 3 ? '9 = 3² (Perfect Square ✓)' : undefined}
      />
    </QuickCheckStepShell>
  );
};

// -----------------------------------------------------------------------------
// SCENE 18: SQUARE ROOT OF 1764 (42)
// -----------------------------------------------------------------------------
export const SquareRoot1764TreeVisualizer: React.FC<QuickCheckVisualizerStageProps> = ({
  onNext,
  onReset,
  isCorrect,
  isLastQuestion,
}) => {
  const { step, maxStep, advance, selectStep } = useStepProgress(3);

  const steps: StepDefinition[] = [
    { label: 'Trap 1764', cue: 'Step 1: 1764 sits between 40² (1600) and 50² (2500).' },
    { label: 'Lock pairs', cue: 'Step 2: Prime factor 1764 into (2×2) × (3×3) × (7×7)!' },
    { label: 'Answer', cue: 'Step 3: Take 1 from each pair: 2 × 3 × 7 = 42!' },
  ];

  const groups = [
    { factors: [2, 2] },
    { factors: [3, 3] },
    { factors: [7, 7] },
  ];

  return (
    <QuickCheckStepShell
      ariaLabel="Square Root 1764 Step-by-Step Solution"
      isCorrect={isCorrect}
      headerTitle={isCorrect ? '✓ Right! √1764 = 42' : 'Review — √1764'}
      headerBadge={step < 3 ? 'Find √1764' : '√1764 = 42'}
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
          ? '1764 ends in 4 and lies closer to 1600 than 2500 — try 42!'
          : step === 2
          ? 'Every prime splits cleanly into twin pairs: (2×2), (3×3), (7×7)!'
          : '🎉 2 × 3 × 7 = 42, and 42 × 42 = 1764!'
      }
      footerText={step === 3 ? '✓ √1764 = 42!' : `Step ${step} of 3`}
    >
      {step === 1 ? (
        <RootBracketNumberLineSvg
          lowVal={1600}
          lowLabel="40²"
          targetVal={1764}
          targetLabel="1764"
          highVal={2500}
          highLabel="50²"
        />
      ) : (
        <PrimeFactorCapsulesCanvas
          groups={groups}
          locked={true}
          pickOneIndex={step === 3}
          resultEquation={step === 3 ? '2 × 3 × 7 = 42' : undefined}
        />
      )}
    </QuickCheckStepShell>
  );
};

// -----------------------------------------------------------------------------
// SCENE 19: TRIPLET COMPLETION FOR 1323 (× 7 → 21³)
// -----------------------------------------------------------------------------
export const TripletCompletionVisualizer: React.FC<QuickCheckVisualizerStageProps> = ({
  onNext,
  onReset,
  isCorrect,
  isLastQuestion,
}) => {
  const { step, maxStep, advance, selectStep } = useStepProgress(3);

  const steps: StepDefinition[] = [
    { label: 'Group 1323', cue: 'Step 1: Factor 1323 into primes: 3 × 3 × 3 × 7 × 7.' },
    { label: 'Spot missing', cue: 'Step 2: Look — (7 × 7) has an empty dashed slot!' },
    { label: 'Answer', cue: 'Step 3: Multiply by 7 to complete (7 × 7 × 7) = 9261 (21³)!' },
  ];

  const groups =
    step === 1
      ? [{ factors: [3, 3, 3] }, { factors: [7, 7] }]
      : step === 2
      ? [{ factors: [3, 3, 3] }, { factors: [7, 7], missingSlot: true }]
      : [{ factors: [3, 3, 3] }, { factors: [7, 7], missingSlot: true, filledBy: 7 }];

  return (
    <QuickCheckStepShell
      ariaLabel="Complete Triplet Step-by-Step Solution"
      isCorrect={isCorrect}
      headerTitle={isCorrect ? '✓ Right! Complete Triplet' : 'Review — Complete Triplet'}
      headerBadge={step < 3 ? 'Fix 1323' : 'Multiply by 7'}
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
          ? 'The 3s already form a full triplet (3 × 3 × 3)!'
          : step === 2
          ? 'The lonely (7 × 7) pair needs ONE more 7 to become a triplet!'
          : '🎉 Multiply 1323 by 7 to get 9261 = 21³!'
      }
      footerText={step === 3 ? '✓ Smallest multiplier is 7!' : `Step ${step} of 3`}
    >
      <PrimeFactorCapsulesCanvas
        groups={groups}
        locked={step === 3}
        resultEquation={step === 3 ? '1323 × 7 = 9261 = 21³' : undefined}
      />
    </QuickCheckStepShell>
  );
};

// -----------------------------------------------------------------------------
// SCENE 20: CUBE ROOT OF 13824 BY GROUPING / ESTIMATION (24)
// -----------------------------------------------------------------------------
export const CubeRootEstimationVisualizer: React.FC<QuickCheckVisualizerStageProps> = ({
  onNext,
  onReset,
  isCorrect,
  isLastQuestion,
}) => {
  const { step, maxStep, advance, selectStep } = useStepProgress(3);

  const steps: StepDefinition[] = [
    { label: 'Split digits', cue: 'Step 1: Split 13,824 into two parts: (13) and (824).' },
    { label: 'Match ends', cue: 'Step 2: 2³=8 < 13 < 27=3³ gives tens=2; 4³=64 gives ones=4!' },
    { label: 'Answer', cue: 'Step 3: Tens 2 + Ones 4 = 24! Check: 24³ = 13,824!' },
  ];

  return (
    <QuickCheckStepShell
      ariaLabel="Cube Root Estimation Step-by-Step Solution"
      isCorrect={isCorrect}
      headerTitle={isCorrect ? '✓ Right! ∛13824 = 24' : 'Review — ∛13824'}
      headerBadge={step < 3 ? 'Find ∛13824' : '∛13824 = 24'}
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
          ? 'Group the last 3 digits (824) and keep the front digits (13) separate!'
          : step === 2
          ? '13 sits between 2³(8) and 3³(27), and 824 ends in 4 (only 4³ ends in 4)!'
          : '🎉 Combine tens 2 and ones 4 → ∛13824 = 24!'
      }
      footerText={step === 3 ? '✓ ∛13824 = 24!' : `Step ${step} of 3`}
    >
      {step === 1 ? (
        <div className="flex items-center justify-center gap-3 font-mono font-black text-title">
          <span className="px-3.5 py-2 rounded-2xl bg-sky-50 border-2 border-sky-400 text-[#005583]">
            13
          </span>
          <span className="text-slate-400">|</span>
          <span className="px-3.5 py-2 rounded-2xl bg-orange-50 border-2 border-[#F27A00] text-orange-950">
            824
          </span>
        </div>
      ) : step === 2 ? (
        <RootBracketNumberLineSvg
          lowVal={8000}
          lowLabel="20³"
          targetVal={13824}
          targetLabel="13824"
          highVal={27000}
          highLabel="30³"
        />
      ) : (
        <PrimeFactorCapsulesCanvas
          groups={[
            { factors: [2, 2, 2] },
            { factors: [2, 2, 2] },
            { factors: [2, 2, 2] },
            { factors: [3, 3, 3] },
          ]}
          locked={true}
          pickOneIndex={true}
          resultEquation="2 × 2 × 2 × 3 = 24"
        />
      )}
    </QuickCheckStepShell>
  );
};
