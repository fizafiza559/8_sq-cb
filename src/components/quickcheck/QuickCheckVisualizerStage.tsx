/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  LockerGridSolutionVisualizer,
  SquareAreaGridVisualizer,
  LastDigitScannerVisualizer,
  ZeroMultiplierVisualizer,
  ParityDotsVisualizer,
  QuickCheckVisualizerStageProps,
} from './SquaresQuickCheckVisualizers';
import { FactorPairsMorph36QuickCheck } from '../FactorPairsMorph36QuickCheck';
import {
  LShapedOddGnomonVisualizer,
  OddSequenceFormulaVisualizer,
  OddSubtractionLadderVisualizer,
  BetweenSquaresIntervalVisualizer,
  TriangularZipperVisualizer,
  HundredBlockFinderVisualizer,
} from './OddPatternsQuickCheckVisualizers';
import {
  CourtyardPrincipalRootVisualizer,
  PrimeFactorPairGroupingVisualizer,
  RootSandwichNumberLineVisualizer,
} from './RootsQuickCheckVisualizers';
import {
  IsometricCubeVolumeVisualizer,
  CubeZerosTriplerVisualizer,
  TaxicabDualCubeVisualizer,
  CubeOddPyramidVisualizer,
  CubeRootTripletGroupingVisualizer,
  CubeDifferenceEngineVisualizer,
} from './CubesQuickCheckVisualizers';
import {
  BabylonianTabletVisualizer,
  InverseMachineCycleVisualizer,
  SquarePairsDominoVisualizer,
  SquareRoot1764TreeVisualizer,
  TripletCompletionVisualizer,
  CubeRootEstimationVisualizer,
} from './AdvancedQuickCheckVisualizers';

export interface MasterQuickCheckStageProps extends QuickCheckVisualizerStageProps {
  sceneId: string;
  questionIndex: number;
}

export const QuickCheckVisualizerStage: React.FC<MasterQuickCheckStageProps> = ({
  sceneId,
  questionIndex,
  onNext,
  onReset,
  isCorrect,
  isLastQuestion,
}) => {
  const commonProps = { onNext, onReset, isCorrect, isLastQuestion };

  // SCENE 0
  if (sceneId === 'scene-0') {
    return <LockerGridSolutionVisualizer {...commonProps} />;
  }

  // SCENE 1
  if (sceneId === 'scene-1') {
    return <FactorPairsMorph36QuickCheck {...commonProps} />;
  }

  // SCENE 2
  if (sceneId === 'scene-2') {
    return <SquareAreaGridVisualizer {...commonProps} />;
  }

  // SCENE 3
  if (sceneId === 'scene-3') {
    if (questionIndex === 0) return <LastDigitScannerVisualizer {...commonProps} />;
    if (questionIndex === 1) return <ZeroMultiplierVisualizer {...commonProps} />;
    return <ParityDotsVisualizer {...commonProps} />;
  }

  // SCENE 4
  if (sceneId === 'scene-4') {
    if (questionIndex === 0) return <LShapedOddGnomonVisualizer {...commonProps} />;
    if (questionIndex === 1) return <OddSequenceFormulaVisualizer {...commonProps} />;
    return <OddSubtractionLadderVisualizer {...commonProps} />;
  }

  // SCENE 5
  if (sceneId === 'scene-5') {
    if (questionIndex === 0) return <BetweenSquaresIntervalVisualizer {...commonProps} />;
    if (questionIndex === 1) return <TriangularZipperVisualizer {...commonProps} />;
    return <HundredBlockFinderVisualizer {...commonProps} />;
  }

  // SCENE 6
  if (sceneId === 'scene-6') {
    return <CourtyardPrincipalRootVisualizer {...commonProps} />;
  }

  // SCENE 7
  if (sceneId === 'scene-7') {
    return <PrimeFactorPairGroupingVisualizer {...commonProps} />;
  }

  // SCENE 8
  if (sceneId === 'scene-8') {
    return <RootSandwichNumberLineVisualizer {...commonProps} />;
  }

  // SCENE 9
  if (sceneId === 'scene-9') {
    return <IsometricCubeVolumeVisualizer {...commonProps} />;
  }

  // SCENE 10
  if (sceneId === 'scene-10') {
    return <CubeZerosTriplerVisualizer {...commonProps} />;
  }

  // SCENE 11
  if (sceneId === 'scene-11') {
    return <TaxicabDualCubeVisualizer {...commonProps} />;
  }

  // SCENE 12
  if (sceneId === 'scene-12') {
    return <CubeOddPyramidVisualizer {...commonProps} />;
  }

  // SCENE 13
  if (sceneId === 'scene-13') {
    return <CubeRootTripletGroupingVisualizer {...commonProps} />;
  }

  // SCENE 14
  if (sceneId === 'scene-14') {
    return <CubeDifferenceEngineVisualizer {...commonProps} />;
  }

  // SCENE 15
  if (sceneId === 'scene-15') {
    return <BabylonianTabletVisualizer {...commonProps} />;
  }

  // SCENE 16
  if (sceneId === 'scene-16') {
    return <InverseMachineCycleVisualizer {...commonProps} />;
  }

  // SCENE 17
  if (sceneId === 'scene-17') {
    return <SquarePairsDominoVisualizer {...commonProps} />;
  }

  // SCENE 18
  if (sceneId === 'scene-18') {
    return <SquareRoot1764TreeVisualizer {...commonProps} />;
  }

  // SCENE 19
  if (sceneId === 'scene-19') {
    return <TripletCompletionVisualizer {...commonProps} />;
  }

  // SCENE 20
  if (sceneId === 'scene-20') {
    return <CubeRootEstimationVisualizer {...commonProps} />;
  }

  // Fallback
  return (
    <div className="w-full h-full min-h-0 bg-slate-50/80 border border-slate-200/80 rounded-3xl p-4 flex flex-col justify-between">
      <div className="text-small font-bold text-slate-800">Visual Solution</div>
      <button
        type="button"
        onClick={onNext}
        className="self-end px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold"
      >
        Next Question →
      </button>
    </div>
  );
};
