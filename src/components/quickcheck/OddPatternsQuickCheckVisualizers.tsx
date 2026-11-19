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
import { OddGnomonCanvasSvg } from '../DotGridSquareVisualizer';
import {
  BetweenSquaresLineSvg,
  OddSubtractionMeterSvg,
} from '../../scenes/OddSubtractionScene';
import {
  HundredBlockExplorerSvg,
  TriangularZipperSvg,
} from '../../scenes/TriangularSquareZipper';

// -----------------------------------------------------------------------------
// SCENE 4 Q0: L-SHAPED ODD GNOMONS (sum of first 8 odd numbers = 64)
// -----------------------------------------------------------------------------
export const LShapedOddGnomonVisualizer: React.FC<QuickCheckVisualizerStageProps> = ({
  onNext,
  onReset,
  isCorrect,
  isLastQuestion,
}) => {
  const { step, maxStep, advance, selectStep } = useStepProgress(3);
  const layerTick = useSequenceTick(step === 2, 7, 220, step);

  const visibleLayers = step === 1 ? 1 : step === 2 ? Math.min(8, 1 + layerTick) : 8;
  const totalSum = visibleLayers * visibleLayers;

  const steps: StepDefinition[] = [
    { label: 'Start at 1', cue: 'Step 1: Start with 1 tile — that makes a 1 × 1 square.' },
    { label: 'Wrap L-frames', cue: 'Step 2: Wrap each next odd L-frame around the corner!' },
    { label: 'Answer', cue: 'Step 3: 8 odd L-frames build an 8 × 8 square = 64!' },
  ];

  return (
    <QuickCheckStepShell
      ariaLabel="L-Shaped Odd Gnomon Step-by-Step Solution"
      isCorrect={isCorrect}
      headerTitle={isCorrect ? '✓ Right! Odd Sums' : 'Review — Odd Sums'}
      headerBadge={step < 3 ? 'First 8 Odds' : '8² = 64'}
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
          ? 'The 1st odd number (1) sits in the corner as a 1 × 1 tile.'
          : step === 2
          ? `Layer ${visibleLayers} (+${2 * visibleLayers - 1}) grows the square to ${visibleLayers}² = ${totalSum}!`
          : '🎉 Adding the first 8 odd numbers always builds 8² = 64!'
      }
      footerText={step === 3 ? '✓ Sum of first 8 odds = 64!' : `Step ${step} of 3`}
    >
      <div className="flex items-center justify-center gap-4">
        <OddGnomonCanvasSvg
          layers={visibleLayers}
          highlightOuter={step === 2}
        />
        <div className="px-3 py-1.5 rounded-xl bg-sky-50 border border-sky-200 font-mono font-black text-small text-[#005583] tabular-nums">
          {visibleLayers}² = {totalSum}
        </div>
      </div>
    </QuickCheckStepShell>
  );
};

// -----------------------------------------------------------------------------
// SCENE 4 Q1: 20th ODD NUMBER (2n - 1 = 39)
// -----------------------------------------------------------------------------
export const OddSequenceFormulaVisualizer: React.FC<QuickCheckVisualizerStageProps> = ({
  onNext,
  onReset,
  isCorrect,
  isLastQuestion,
}) => {
  const { step, maxStep, advance, selectStep } = useStepProgress(3);

  const steps: StepDefinition[] = [
    { label: 'Outer L-frame', cue: 'Step 1: Every nth odd number wraps n + n − 1 tiles!' },
    { label: 'Plug n = 20', cue: 'Step 2: Double 20 (two arms), then subtract 1 shared corner!' },
    { label: 'Answer', cue: 'Step 3: The 20th odd number is 2(20) − 1 = 39!' },
  ];

  return (
    <QuickCheckStepShell
      ariaLabel="nth Odd Formula Step-by-Step Solution"
      isCorrect={isCorrect}
      headerTitle={isCorrect ? '✓ Right! 2n − 1 Rule' : 'Review — 2n − 1 Rule'}
      headerBadge={step < 3 ? '20th Odd' : '2(20) − 1 = 39'}
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
          ? 'An L-frame has two arms of length n that share 1 corner tile!'
          : step === 2
          ? 'For n = 20: two arms of 20 make 40, minus 1 shared corner!'
          : '🎉 2(20) − 1 = 39! That is the 20th odd number.'
      }
      footerText={step === 3 ? '✓ 20th odd number = 39!' : `Step ${step} of 3`}
    >
      <div className="flex items-center justify-center gap-4">
        <OddGnomonCanvasSvg
          layers={step === 1 ? 4 : 6}
          highlightOuter={true}
          outerLabel={step === 1 ? '2n − 1' : undefined}
        />
        <div className="px-3 py-2 rounded-xl bg-orange-50 border border-orange-200 font-mono font-black text-small text-orange-950">
          {step === 1
            ? 'nth odd = 2n − 1'
            : step === 2
            ? '20 + 20 − 1'
            : '2(20) − 1 = 39 ✓'}
        </div>
      </div>
    </QuickCheckStepShell>
  );
};

// -----------------------------------------------------------------------------
// SCENE 4 Q2: SUBTRACT TEST ON 50
// -----------------------------------------------------------------------------
export const OddSubtractionLadderVisualizer: React.FC<QuickCheckVisualizerStageProps> = ({
  onNext,
  onReset,
  isCorrect,
  isLastQuestion,
}) => {
  const { step, maxStep, advance, selectStep } = useStepProgress(3);

  const steps: StepDefinition[] = [
    { label: 'Subtract 1–13', cue: 'Step 1: Subtract odd numbers from 50: 1, 3, 5, 7, 9, 11, 13.' },
    { label: 'Overshoot 0', cue: 'Step 2: 1 remains — subtracting 15 crashes to −14!' },
    { label: 'Answer', cue: 'Step 3: Skipping 0 proves 50 is NOT a perfect square!' },
  ];

  return (
    <QuickCheckStepShell
      ariaLabel="Odd Subtraction Ladder Step-by-Step Solution"
      isCorrect={isCorrect}
      headerTitle={isCorrect ? '✓ Right! Subtract Test' : 'Review — Subtract Test'}
      headerBadge={step < 3 ? 'Test 50' : 'Misses 0 ✗'}
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
          ? 'The first 7 odd numbers add up to 49, leaving 50 − 49 = 1.'
          : step === 2
          ? 'The next odd number is 15, so 1 − 15 = −14 (skips right past 0)!'
          : 'Because it never lands on 0, 50 is NOT a square number!'
      }
      footerText={step === 3 ? '✓ 50 skips 0 → Not a square!' : `Step ${step} of 3`}
    >
      <OddSubtractionMeterSvg
        startValue={50}
        oddsSubtracted={
          step === 1 ? [1, 3, 5, 7, 9, 11, 13] : [1, 3, 5, 7, 9, 11, 13, 15]
        }
        overshotValue={step >= 2 ? -14 : null}
      />
    </QuickCheckStepShell>
  );
};

// -----------------------------------------------------------------------------
// SCENE 5 Q0: NUMBERS BETWEEN 20² AND 21²
// -----------------------------------------------------------------------------
export const BetweenSquaresIntervalVisualizer: React.FC<QuickCheckVisualizerStageProps> = ({
  onNext,
  onReset,
  isCorrect,
  isLastQuestion,
}) => {
  const { step, maxStep, advance, selectStep } = useStepProgress(3);

  const steps: StepDefinition[] = [
    { label: 'Mark squares', cue: 'Step 1: Place 20² (400) and 21² (441) on the number line.' },
    { label: 'Highlight gap', cue: 'Step 2: Count the non-squares sitting strictly between them!' },
    { label: 'Answer', cue: 'Step 3: There are 2n = 2 × 20 = 40 numbers in between!' },
  ];

  return (
    <QuickCheckStepShell
      ariaLabel="Between Squares Interval Step-by-Step Solution"
      isCorrect={isCorrect}
      headerTitle={isCorrect ? '✓ Right! Between Squares' : 'Review — Between Squares'}
      headerBadge={step < 3 ? '20² to 21²' : '40 Numbers'}
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
          ? '20² = 400 and the very next square is 21² = 441.'
          : step === 2
          ? 'Integers from 401 to 440 fill the gap between the two squares.'
          : '🎉 Rule 2n: 2 × 20 = 40 non-square numbers lie between 20² and 21²!'
      }
      footerText={step === 3 ? '✓ 40 numbers between 20² and 21²!' : `Step ${step} of 3`}
    >
      <BetweenSquaresLineSvg
        n={20}
        highlightGap={step >= 2}
        showCountBadge={step === 3}
      />
    </QuickCheckStepShell>
  );
};

// -----------------------------------------------------------------------------
// SCENE 5 Q1: TRIANGULAR NUMBERS ZIP TO 49 (T₆=21 + T₇=28 = 7²)
// -----------------------------------------------------------------------------
export const TriangularZipperVisualizer: React.FC<QuickCheckVisualizerStageProps> = ({
  onNext,
  onReset,
  isCorrect,
  isLastQuestion,
}) => {
  const { step, maxStep, advance, selectStep } = useStepProgress(3);

  const steps: StepDefinition[] = [
    { label: 'Staircases', cue: 'Step 1: Place triangular dot staircases T₆ (21) and T₇ (28).' },
    { label: 'Zip together', cue: 'Step 2: Flip T₆ upside-down and zip it into T₇!' },
    { label: 'Answer', cue: 'Step 3: 21 + 28 = 49 = 7²! They lock into a 7 × 7 square!' },
  ];

  return (
    <QuickCheckStepShell
      ariaLabel="Triangular Zipper Step-by-Step Solution"
      isCorrect={isCorrect}
      headerTitle={isCorrect ? '✓ Right! Triangle Zipper' : 'Review — Triangle Zipper'}
      headerBadge={step < 3 ? 'Make 49 (7²)' : '21 + 28 = 49'}
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
          ? 'T₇ has 28 orange dots and T₆ has 21 blue dots.'
          : step === 2
          ? 'Rotating the smaller blue staircase fills every empty corner cleanly!'
          : '🎉 Two neighbor triangles always zip into a square: 21 + 28 = 49!'
      }
      footerText={step === 3 ? '✓ 21 and 28 add up to 49!' : `Step ${step} of 3`}
    >
      <TriangularZipperSvg
        n={7}
        zipPercent={step === 1 ? 0 : step === 2 ? 62 : 100}
      />
    </QuickCheckStepShell>
  );
};

// -----------------------------------------------------------------------------
// SCENE 5 Q2: 100-BLOCK FINDER (729 in 701–800)
// -----------------------------------------------------------------------------
export const HundredBlockFinderVisualizer: React.FC<QuickCheckVisualizerStageProps> = ({
  onNext,
  onReset,
  isCorrect,
  isLastQuestion,
}) => {
  const { step, maxStep, advance, selectStep } = useStepProgress(3);

  const steps: StepDefinition[] = [
    { label: '100-blocks', cue: 'Step 1: Divide 1 to 1000 into ten 100-number blocks.' },
    { label: 'Locate 729', cue: 'Step 2: 729 is greater than 700 and less than 800!' },
    { label: 'Answer', cue: 'Step 3: 27² = 729 lives inside the 701 to 800 block!' },
  ];

  return (
    <QuickCheckStepShell
      ariaLabel="100-Block Finder Step-by-Step Solution"
      isCorrect={isCorrect}
      headerTitle={isCorrect ? '✓ Right! 100-Block Explorer' : 'Review — 100-Block Explorer'}
      headerBadge={step < 3 ? 'Find 729' : '701 to 800'}
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
          ? 'Notice how squares get rarer in higher 100-blocks (10 down to 1 or 2)!'
          : step === 2
          ? 'Only one square lives in 701–800: 27² = 729!'
          : '🎉 729 sits squarely inside the 701 to 800 block!'
      }
      footerText={step === 3 ? '✓ 729 is in 701 to 800!' : `Step ${step} of 3`}
    >
      <HundredBlockExplorerSvg
        highlightBlockIdx={step === 1 ? -1 : 7}
        spotlightSquare={step === 3 ? { n: 27, sq: 729 } : undefined}
      />
    </QuickCheckStepShell>
  );
};
