/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { PracticeQuestion } from '../../content/practiceData';
import {
  Fio1NotSquaresVisualizer,
  Fio2EndsInFourVisualizer,
  Fio3NextSquareVisualizer,
  Fio4Area441Visualizer,
  Fio5SmallestDivisibleSquareVisualizer,
  Fio6Multiply9408Visualizer,
  PracticeVisualizerProps,
} from './NcertSquaresVisualizers';
import {
  Fio7NumbersBetweenVisualizer,
  Fio8PythagoreanPatternVisualizer,
  Fio9TinySquaresVisualizer,
} from './NcertPatternsVisualizers';
import {
  Fio10CubeRootsVisualizer,
  Fio11Multiply1323Visualizer,
  Fio12TrueFalseVisualizer,
  Fio13GuessCubeRootsVisualizer,
  Fio14GreatestDifferenceVisualizer,
} from './NcertCubesVisualizers';

export const NcertUnsolvedVisualizerStage: React.FC<PracticeVisualizerProps> = (props) => {
  const { question } = props;

  switch (question.id) {
    case 'fio-1':
      return <Fio1NotSquaresVisualizer {...props} />;
    case 'fio-2':
      return <Fio2EndsInFourVisualizer {...props} />;
    case 'fio-3':
      return <Fio3NextSquareVisualizer {...props} />;
    case 'fio-4':
      return <Fio4Area441Visualizer {...props} />;
    case 'fio-5':
      return <Fio5SmallestDivisibleSquareVisualizer {...props} />;
    case 'fio-6':
      return <Fio6Multiply9408Visualizer {...props} />;
    case 'fio-7':
      return <Fio7NumbersBetweenVisualizer {...props} />;
    case 'fio-8':
      return <Fio8PythagoreanPatternVisualizer {...props} />;
    case 'fio-9':
      return <Fio9TinySquaresVisualizer {...props} />;
    case 'fio-10':
      return <Fio10CubeRootsVisualizer {...props} />;
    case 'fio-11':
      return <Fio11Multiply1323Visualizer {...props} />;
    case 'fio-12':
      return <Fio12TrueFalseVisualizer {...props} />;
    case 'fio-13':
      return <Fio13GuessCubeRootsVisualizer {...props} />;
    case 'fio-14':
      return <Fio14GreatestDifferenceVisualizer {...props} />;
    default:
      return null;
  }
};
