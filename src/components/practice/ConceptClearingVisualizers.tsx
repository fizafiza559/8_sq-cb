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
} from '../quickcheck/SquaresQuickCheckVisualizers';
import { LockerGridCanvas } from '../../sections/LockerStorySection';
import {
  LastDigitSortingTraysSvg,
  SquareZerosParitySvg,
} from '../../scenes/LastDigitPatternsScene';
import { CubeZeroTriplerSvg } from '../../scenes/CubePatternsScene';
import {
  CubeOddTapeSvg,
  TaxicabBalanceScaleSvg,
} from '../../scenes/CubeOddSumsAndTaxiScene';
import {
  SquarePairsCircleSvg,
  SquarePairsRowSvg,
} from '../../scenes/SquarePairsPuzzle';

// -----------------------------------------------------------------------------
// CC-1: EVEN vs ODD NUMBER OF FACTORS (Lockers 1–16)
// -----------------------------------------------------------------------------
export const Cc1FactorParityVisualizer: React.FC<QuickCheckVisualizerStageProps> = ({
  onNext,
  onReset,
  isCorrect,
  isLastQuestion,
}) => {
  const { step, maxStep, advance, selectStep } = useStepProgress(3);
  const lockers16 = Array.from({ length: 16 }, (_, i) => i + 1);
  const squares = [1, 4, 9, 16];

  const steps: StepDefinition[] = [
    { label: 'Normal pairs', cue: 'Step 1: Regular numbers pair every factor cleanly (e.g. 6 = 1×6, 2×3).' },
    { label: 'Self-partner', cue: 'Step 2: Square numbers pair a middle factor with itself (6 × 6 = 36)!' },
    { label: 'Answer', cue: 'Step 3: Only perfect squares have an ODD number of factors!' },
  ];

  return (
    <QuickCheckStepShell
      ariaLabel="Concept Clearing 1 Factor Parity"
      isCorrect={isCorrect}
      headerTitle={isCorrect ? '✓ Spot On! Factor Pairs' : 'Review — Odd Factor Count'}
      headerBadge={step < 3 ? 'Factors of 1–16' : 'Only Perfect Squares'}
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
          ? '6 has 4 factors (1, 2, 3, 6) — two clean pairs give an EVEN total!'
          : step === 2
          ? 'In 36 = 6 × 6, factor 6 pairs with itself instead of adding a new partner.'
          : '🎉 So ONLY perfect squares have an odd factor count (2p + 1)!'
      }
      footerText={step === 3 ? '✓ Only perfect squares have odd factors!' : `Step ${step} of 3`}
    >
      {step === 1 ? (
        <div className="flex items-center justify-center gap-3 font-mono font-black text-small">
          <span className="px-3 py-1.5 rounded-xl bg-sky-50 border border-sky-300 text-[#005583]">
            6 → (1 × 6) &amp; (2 × 3) = 4 factors (Even)
          </span>
        </div>
      ) : (
        <LockerGridCanvas
          numbers={lockers16}
          openNumbers={squares}
          highlightNumbers={step === 3 ? squares : []}
          columns={8}
        />
      )}
    </QuickCheckStepShell>
  );
};

// -----------------------------------------------------------------------------
// CC-2: QUEEN RATNAMANJURI'S SAFE PASSCODE (2, 3, 5, 7, 11)
// -----------------------------------------------------------------------------
export const Cc2PrimePasscodeVisualizer: React.FC<QuickCheckVisualizerStageProps> = ({
  onNext,
  onReset,
  isCorrect,
  isLastQuestion,
}) => {
  const { step, maxStep, advance, selectStep } = useStepProgress(3);
  const lockers15 = Array.from({ length: 15 }, (_, i) => i + 1);
  const primes = [2, 3, 5, 7, 11];

  const steps: StepDefinition[] = [
    { label: 'Two touches', cue: 'Step 1: "Touched twice" means a locker has ONLY 2 factors!' },
    { label: 'Spot primes', cue: 'Step 2: Only Person 1 and the number itself touch prime lockers!' },
    { label: 'Answer', cue: 'Step 3: The first five primes unlock the safe: 2, 3, 5, 7, 11!' },
  ];

  return (
    <QuickCheckStepShell
      ariaLabel="Concept Clearing 2 Prime Passcode"
      isCorrect={isCorrect}
      headerTitle={isCorrect ? '✓ Vault Unlocked! Primes' : 'Review — Safe Passcode'}
      headerBadge={step < 3 ? 'Lockers 1–15' : '2 - 3 - 5 - 7 - 11'}
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
          ? 'Locker #1 is touched once. Composite lockers like #4 or #6 get touched 3+ times!'
          : step === 2
          ? 'Primes only divide by 1 and themselves — exactly TWO visits!'
          : '🎉 The first five prime lockers are 2, 3, 5, 7, and 11!'
      }
      footerText={step === 3 ? '✓ Passcode = 2, 3, 5, 7, 11!' : `Step ${step} of 3`}
    >
      <LockerGridCanvas
        numbers={lockers15}
        openNumbers={step >= 2 ? primes : []}
        highlightNumbers={step === 3 ? primes : []}
        touchedNumbers={step === 2 ? primes : []}
        columns={5}
        maxWidthClass="max-w-[270px]"
      />
    </QuickCheckStepShell>
  );
};

// -----------------------------------------------------------------------------
// CC-3: WHICH SQUARES END IN 6? (34², 46², 56², 74²)
// -----------------------------------------------------------------------------
export const Cc3SquaresEndInSixVisualizer: React.FC<QuickCheckVisualizerStageProps> = ({
  onNext,
  onReset,
  isCorrect,
  isLastQuestion,
}) => {
  const { step, maxStep, advance, selectStep } = useStepProgress(3);
  const candidates = [
    { label: '38²', last: 8, sqLast: 4, ok: false },
    { label: '34²', last: 4, sqLast: 6, ok: true },
    { label: '46²', last: 6, sqLast: 6, ok: true },
    { label: '56²', last: 6, sqLast: 6, ok: true },
    { label: '74²', last: 4, sqLast: 6, ok: true },
    { label: '82²', last: 2, sqLast: 4, ok: false },
  ];

  const steps: StepDefinition[] = [
    { label: 'Check rule', cue: 'Step 1: Squares ending in 6 come from bases ending in 4 or 6!' },
    { label: 'Scan list', cue: 'Step 2: Filter the 6 numbers by their ones digit (4 or 6).' },
    { label: 'Answer', cue: 'Step 3: 34², 46², 56², and 74² all end in 6!' },
  ];

  return (
    <QuickCheckStepShell
      ariaLabel="Concept Clearing 3 End in 6"
      isCorrect={isCorrect}
      headerTitle={isCorrect ? '✓ Spot On! Ones Digit' : 'Review — Ending in 6'}
      headerBadge={step < 3 ? 'Filter Bases' : '34², 46², 56², 74²'}
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
          ? 'Since 4² = 16 and 6² = 36, look only for bases ending in 4 or 6!'
          : step === 2
          ? '38² and 82² end in 4 (since 8²=64 and 2²=4), so cross them out!'
          : '🎉 34², 46², 56², and 74² are the four squares that end in 6!'
      }
      footerText={step === 3 ? '✓ 34², 46², 56², 74² end in 6!' : `Step ${step} of 3`}
    >
      {step === 1 ? (
        <LastDigitSortingTraysSvg digit={6} inTray={true} />
      ) : (
        <div className="flex flex-wrap items-center justify-center gap-2">
          {candidates.map((c) => (
            <div
              key={c.label}
              className={`px-2.5 py-1.5 rounded-xl border-2 font-mono font-black text-small transition-all ${
                c.ok
                  ? 'bg-emerald-50 border-emerald-500 text-emerald-950 scale-105'
                  : 'bg-rose-50 border-rose-200 text-rose-400 opacity-60 line-through'
              }`}
            >
              {c.label} → {c.sqLast}
            </div>
          ))}
        </div>
      )}
    </QuickCheckStepShell>
  );
};

// -----------------------------------------------------------------------------
// CC-4: ZEROS AT END OF A SQUARE (3 zeros -> 6 zeros; Never odd)
// -----------------------------------------------------------------------------
export const Cc4SquareZerosRuleVisualizer: React.FC<QuickCheckVisualizerStageProps> = ({
  onNext,
  onReset,
  isCorrect,
  isLastQuestion,
}) => {
  const { step, maxStep, advance, selectStep } = useStepProgress(3);

  const steps: StepDefinition[] = [
    { label: 'Base zeros', cue: 'Step 1: Start with a number ending in 3 zeros (like 1000).' },
    { label: 'Double to 6', cue: 'Step 2: Squaring doubles the zeros: 3 × 2 = 6 trailing zeros!' },
    { label: 'Answer', cue: 'Step 3: 6 zeros! Squares ALWAYS end in an EVEN number of zeros!' },
  ];

  return (
    <QuickCheckStepShell
      ariaLabel="Concept Clearing 4 Trailing Zeros"
      isCorrect={isCorrect}
      headerTitle={isCorrect ? '✓ Spot On! Zero Doubling' : 'Review — Trailing Zeros'}
      headerBadge={step < 3 ? '3 Zeros Squared' : '6 Zeros · Never Odd'}
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
          ? 'Example: 1000 ends in 3 zeros (10³).'
          : step === 2
          ? '1000² = 1,000,000 → 3 × 2 = 6 zeros!'
          : '🎉 Since 2k is always even, a square can NEVER end in 1, 3, 5... odd zeros!'
      }
      footerText={step === 3 ? '✓ 6 zeros · No odd zeros allowed!' : `Step ${step} of 3`}
    >
      <SquareZerosParitySvg
        mode="zeros"
        baseZeros={3}
        expanded={step >= 2}
      />
    </QuickCheckStepShell>
  );
};

// -----------------------------------------------------------------------------
// CC-5: PARITY OF A NUMBER AND ITS SQUARE
// -----------------------------------------------------------------------------
export const Cc5ParityVisualizer: React.FC<QuickCheckVisualizerStageProps> = ({
  onNext,
  onReset,
  isCorrect,
  isLastQuestion,
}) => {
  const { step, maxStep, advance, selectStep } = useStepProgress(3);

  const steps: StepDefinition[] = [
    { label: 'Test Even', cue: 'Step 1: Even numbers keep their factor of 2 → Even² is EVEN!' },
    { label: 'Test Odd', cue: 'Step 2: Odd numbers leave 1 dot unpaired → Odd² is ODD!' },
    { label: 'Answer', cue: 'Step 3: Even² = Even, and Odd² = Odd — parity stays the same!' },
  ];

  return (
    <QuickCheckStepShell
      ariaLabel="Concept Clearing 5 Parity"
      isCorrect={isCorrect}
      headerTitle={isCorrect ? '✓ Spot On! Parity' : 'Review — Parity Rule'}
      headerBadge={step < 3 ? 'Even & Odd' : 'Parity Preserved'}
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
          ? '4² = 16 and 6² = 36 — multiplying even by even always stays even!'
          : step === 2
          ? '5² = 25 and 7² = 49 — multiplying odd by odd always stays odd!'
          : '🎉 Squaring NEVER flips parity: Even² = Even, Odd² = Odd!'
      }
      footerText={step === 3 ? '✓ Even² = Even, Odd² = Odd!' : `Step ${step} of 3`}
    >
      <SquareZerosParitySvg
        mode="parity"
        parityNum={step === 1 ? 4 : 5}
      />
    </QuickCheckStepShell>
  );
};

// -----------------------------------------------------------------------------
// CC-6: CAN A CUBE END WITH 00?
// -----------------------------------------------------------------------------
export const Cc6CubeTwoZerosVisualizer: React.FC<QuickCheckVisualizerStageProps> = ({
  onNext,
  onReset,
  isCorrect,
  isLastQuestion,
}) => {
  const { step, maxStep, advance, selectStep } = useStepProgress(3);

  const steps: StepDefinition[] = [
    { label: 'Zeros triple', cue: 'Step 1: When cubing, k zeros triple into 3k trailing zeros!' },
    { label: 'Skip 2', cue: 'Step 2: Multiples of 3 are 3, 6, 9… — 2 zeros is impossible!' },
    { label: 'Answer', cue: 'Step 3: NO! A perfect cube can NEVER end in exactly 00!' },
  ];

  return (
    <QuickCheckStepShell
      ariaLabel="Concept Clearing 6 Cube Two Zeros"
      isCorrect={isCorrect}
      headerTitle={isCorrect ? '✓ Spot On! Cube Zeros' : 'Review — 00 in Cubes'}
      headerBadge={step < 3 ? 'Check 00' : 'Impossible ✗'}
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
          ? '1 zero → 3 zeros (10³ = 1000). 2 zeros → 6 zeros (100³ = 1,000,000)!'
          : step === 2
          ? 'There is no integer k where 3 × k = 2! Notice 100 = 10², not a cube.'
          : 'No perfect cube can ever end with exactly two zeros (00)!'
      }
      footerText={step === 3 ? '✓ No — cube zeros are multiples of 3!' : `Step ${step} of 3`}
    >
      <CubeZeroTriplerSvg
        baseZeros={1}
        tripled={true}
        showImpossible00={step >= 2}
      />
    </QuickCheckStepShell>
  );
};

// -----------------------------------------------------------------------------
// CC-7: TAXICAB NUMBERS (1729, 4104, 13832)
// -----------------------------------------------------------------------------
export const Cc7TaxicabVisualizer: React.FC<QuickCheckVisualizerStageProps> = ({
  onNext,
  onReset,
  isCorrect,
  isLastQuestion,
}) => {
  const { step, maxStep, advance, selectStep } = useStepProgress(3);

  const steps: StepDefinition[] = [
    { label: '1729', cue: 'Step 1: 1729 balances as BOTH 1³ + 12³ and 9³ + 10³!' },
    { label: '4104', cue: 'Step 2: 4104 balances as BOTH 2³ + 16³ and 9³ + 15³!' },
    { label: 'Answer', cue: 'Step 3: Each Taxicab number equals two cubes in TWO ways!' },
  ];

  return (
    <QuickCheckStepShell
      ariaLabel="Concept Clearing 7 Taxicab Numbers"
      isCorrect={isCorrect}
      headerTitle={isCorrect ? '✓ Spot On! Taxicabs' : 'Review — Taxicab Numbers'}
      headerBadge={step === 1 ? '1729' : step === 2 ? '4104' : '1729 · 4104 · 13832'}
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
          ? 'Hardy’s taxi #1729 = 1³ + 12³ = 9³ + 10³ (the smallest Taxicab number)!'
          : step === 2
          ? 'The next one is 4104 = 2³ + 16³ = 9³ + 15³!'
          : '🎉 Also 13832 = 2³ + 24³ = 18³ + 20³ — two distinct cube pairs each!'
      }
      footerText={step === 3 ? '✓ Sum of two cubes in 2 ways!' : `Step ${step} of 3`}
    >
      <TaxicabBalanceScaleSvg
        taxicab={step === 1 ? 1729 : step === 2 ? 4104 : 13832}
        showRightPan={true}
        balanced={true}
      />
    </QuickCheckStepShell>
  );
};

// -----------------------------------------------------------------------------
// CC-8: SUM OF 91 + 93 + ... + 109 = 10³ = 1000
// -----------------------------------------------------------------------------
export const Cc8OddCubeSum1000Visualizer: React.FC<QuickCheckVisualizerStageProps> = ({
  onNext,
  onReset,
  isCorrect,
  isLastQuestion,
}) => {
  const { step, maxStep, advance, selectStep } = useStepProgress(3);

  const steps: StepDefinition[] = [
    { label: 'Cube blocks', cue: 'Step 1: Every n³ equals a block of n consecutive odd numbers!' },
    { label: 'Count terms', cue: 'Step 2: Count 91, 93, 95… up to 109 — there are 10 odds!' },
    { label: 'Answer', cue: 'Step 3: No adding needed: 10 consecutive odds = 10³ = 1,000!' },
  ];

  return (
    <QuickCheckStepShell
      ariaLabel="Concept Clearing 8 Odd Cube Sum 1000"
      isCorrect={isCorrect}
      headerTitle={isCorrect ? '✓ Spot On! 10³ = 1000' : 'Review — Odd Cube Sum'}
      headerBadge={step < 3 ? '10 Odd Terms' : '10³ = 1,000'}
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
          ? '1³ has 1 odd, 2³ has 2 odds, 3³ has 3 odds, 4³ has 4 odds…'
          : step === 2
          ? '91 through 109 is the 10th consecutive odd block (10 terms total)!'
          : '🎉 The 10th block sums straight to 10³ = 1,000!'
      }
      footerText={step === 3 ? '✓ Sum = 10³ = 1,000!' : `Step ${step} of 3`}
    >
      <CubeOddTapeSvg
        highlightN={4}
        challengeRange={step >= 2}
      />
    </QuickCheckStepShell>
  );
};

// -----------------------------------------------------------------------------
// CC-9: SQUARE PAIRS ROW (1 to 17)
// -----------------------------------------------------------------------------
export const Cc9SquarePairsRow17Visualizer: React.FC<QuickCheckVisualizerStageProps> = ({
  onNext,
  onReset,
  isCorrect,
  isLastQuestion,
}) => {
  const { step, maxStep, advance, selectStep } = useStepProgress(3);

  const steps: StepDefinition[] = [
    { label: 'Find ends', cue: 'Step 1: 16 only pairs with 9; 17 only pairs with 8 — forced ends!' },
    { label: 'Link chain', cue: 'Step 2: Step inward so every adjacent pair sums to 9, 16, or 25!' },
    { label: 'Answer', cue: 'Step 3: Yes! 16-9-7-2-14-11-5-4-12-13-3-6-10-15-1-8-17!' },
  ];

  return (
    <QuickCheckStepShell
      ariaLabel="Concept Clearing 9 Square Pairs Row"
      isCorrect={isCorrect}
      headerTitle={isCorrect ? '✓ Spot On! Row of 17' : 'Review — Row of 1–17'}
      headerBadge={step < 3 ? 'Ends 16 & 17' : 'Unique Row ✓'}
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
          ? '16+9=25 and 17+8=25 are their ONLY square partners up to 17!'
          : step === 2
          ? 'Every step is forced along the chain from 16 all the way to 17!'
          : '🎉 There is 1 unique arrangement (plus its reverse) from 16 to 17!'
      }
      footerText={step === 3 ? '✓ Unique 1–17 row exists!' : `Step ${step} of 3`}
    >
      <SquarePairsRowSvg
        pairs={step === 1 ? [16, 9] : [16, 9, 7, 2, 14]}
        snapped={step >= 2}
        showSquareBadge={
          step === 3 ? '… 12-13-3-6-10-15-1-8-17 (Every pair = Square!)' : undefined
        }
      />
    </QuickCheckStepShell>
  );
};

// -----------------------------------------------------------------------------
// CC-10: CIRCLE OF SQUARE PAIRS (1 to 32)
// -----------------------------------------------------------------------------
export const Cc10SquarePairsCircle32Visualizer: React.FC<QuickCheckVisualizerStageProps> = ({
  onNext,
  onReset,
  isCorrect,
  isLastQuestion,
}) => {
  const { step, maxStep, advance, selectStep } = useStepProgress(3);

  const steps: StepDefinition[] = [
    { label: 'Two partners', cue: 'Step 1: From 1 to 32, every number has 2+ square partners!' },
    { label: 'Join ends', cue: 'Step 2: Even 32 pairs with 17 (49=7²) and 4 (36=6²)!' },
    { label: 'Answer', cue: 'Step 3: Yes! 1 to 32 forms a complete closed circle!' },
  ];

  return (
    <QuickCheckStepShell
      ariaLabel="Concept Clearing 10 Circle of 32"
      isCorrect={isCorrect}
      headerTitle={isCorrect ? '✓ Spot On! Circle of 32' : 'Review — Circle of 32'}
      headerBadge={step < 3 ? '1 to 32 Loop' : 'Closed Cycle ✓'}
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
          ? 'Unlike 1–17 (where 16 and 17 were stuck as dead ends), 1–32 has no dead ends!'
          : step === 2
          ? '32 connects both to 17 (sum 49) and 4 (sum 36) to close the ring!'
          : '🎉 Yes! All 32 numbers lock into a closed Hamiltonian cycle!'
      }
      footerText={step === 3 ? '✓ Closed circle of 1–32 exists!' : `Step ${step} of 3`}
    >
      <SquarePairsCircleSvg
        highlightSeam={step >= 2}
        completed={step === 3}
      />
    </QuickCheckStepShell>
  );
};

// -----------------------------------------------------------------------------
// STAGE ROUTER FOR CONCEPT CLEARING (cc-1 .. cc-10)
// -----------------------------------------------------------------------------
export interface ConceptClearingStageProps extends QuickCheckVisualizerStageProps {
  questionId: string;
}

export const ConceptClearingVisualizerStage: React.FC<ConceptClearingStageProps> = ({
  questionId,
  ...commonProps
}) => {
  switch (questionId) {
    case 'cc-1':
      return <Cc1FactorParityVisualizer {...commonProps} />;
    case 'cc-2':
      return <Cc2PrimePasscodeVisualizer {...commonProps} />;
    case 'cc-3':
      return <Cc3SquaresEndInSixVisualizer {...commonProps} />;
    case 'cc-4':
      return <Cc4SquareZerosRuleVisualizer {...commonProps} />;
    case 'cc-5':
      return <Cc5ParityVisualizer {...commonProps} />;
    case 'cc-6':
      return <Cc6CubeTwoZerosVisualizer {...commonProps} />;
    case 'cc-7':
      return <Cc7TaxicabVisualizer {...commonProps} />;
    case 'cc-8':
      return <Cc8OddCubeSum1000Visualizer {...commonProps} />;
    case 'cc-9':
      return <Cc9SquarePairsRow17Visualizer {...commonProps} />;
    case 'cc-10':
      return <Cc10SquarePairsCircle32Visualizer {...commonProps} />;
    default:
      return null;
  }
};
