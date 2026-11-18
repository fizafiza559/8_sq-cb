/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type SectionId = 'sec-0' | 'sec-1' | 'sec-2' | 'sec-3' | 'sec-4' | 'sec-5';

export type SubTabId =
  | 'locker-puzzle'
  | 'factor-partners'
  | 'squares-areas'
  | 'last-digits'
  | 'odd-squares'
  | 'between-triangular'
  | 'roots-plus-minus'
  | 'finding-roots'
  | 'estimating-roots'
  | 'building-cubes'
  | 'cube-patterns'
  | 'taxicab-numbers'
  | 'cubes-odd-numbers'
  | 'cube-roots'
  | 'successive-differences'
  | 'pinch-history'
  | 'chapter-summary'
  | 'square-pairs'
  | 'ncert-unsolved'
  | 'solved-examples'
  | 'concept-clearing';

export interface SubTabConfig {
  id: SubTabId;
  label: string;
  sceneIndex?: number;
}

export interface SectionConfig {
  id: SectionId;
  label: string;
  shortLabel: string;
  storyHook?: string;
  subTabs: SubTabConfig[];
}

export const CHAPTER_SECTIONS: SectionConfig[] = [
  {
    id: 'sec-0',
    label: '1. Lockers and Square Numbers',
    shortLabel: '1. Lockers & Squares',
    storyHook: '100 closed lockers and 100 people walking past. Which doors stay open? The answer is hidden inside factor pairs.',
    subTabs: [
      { id: 'locker-puzzle', label: 'The Locker Puzzle', sceneIndex: 0 },
      { id: 'factor-partners', label: 'Factor Partners', sceneIndex: 1 },
      { id: 'squares-areas', label: 'Squares as Areas', sceneIndex: 2 },
    ],
  },
  {
    id: 'sec-1',
    label: '2. Patterns in Squares',
    shortLabel: '2. Patterns',
    storyHook: 'Look at the ending digits of square numbers. Why are 2, 3, 7, and 8 mysteriously banned from the end?',
    subTabs: [
      { id: 'last-digits', label: 'Last Digits, Zeros & Parity', sceneIndex: 3 },
      { id: 'odd-squares', label: 'Odd Numbers Make Squares', sceneIndex: 4 },
      { id: 'between-triangular', label: 'Between Squares & Triangular', sceneIndex: 5 },
    ],
  },
  {
    id: 'sec-2',
    label: '3. Square Roots',
    shortLabel: '3. Square Roots',
    storyHook: 'If a square courtyard covers 1936 tiles, how many paces does it take to walk along one wall? Track the root backwards.',
    subTabs: [
      { id: 'roots-plus-minus', label: 'Roots and Plus-Minus', sceneIndex: 6 },
      { id: 'finding-roots', label: 'Methods for Finding Square Roots', sceneIndex: 7 },
      { id: 'estimating-roots', label: 'Estimating Roots', sceneIndex: 8 },
    ],
  },
  {
    id: 'sec-3',
    label: '4. Cubes and Cube Roots',
    shortLabel: '4. Cubes & Roots',
    storyHook: 'Why did doubling the width of a box make it 8 times heavier? Enter the 3D world of cubes and Ramanujan’s taxi mystery.',
    subTabs: [
      { id: 'building-cubes', label: 'Building Cubes', sceneIndex: 9 },
      { id: 'cube-patterns', label: 'Cube Patterns', sceneIndex: 10 },
      { id: 'taxicab-numbers', label: 'Taxicab Numbers', sceneIndex: 11 },
      { id: 'cubes-odd-numbers', label: 'Cubes and Odd Numbers', sceneIndex: 12 },
      { id: 'cube-roots', label: 'Cube Roots', sceneIndex: 13 },
      { id: 'successive-differences', label: 'Successive Differences', sceneIndex: 14 },
    ],
  },
  {
    id: 'sec-4',
    label: '5. History and Puzzles',
    shortLabel: '5. History & Puzzles',
    storyHook: "From ancient altar builders to Ramanujan's hospital visit: explore the history and solve the 1–17 square pairs puzzle.",
    subTabs: [
      { id: 'pinch-history', label: 'A Pinch of History', sceneIndex: 15 },
      { id: 'chapter-summary', label: 'Chapter Summary', sceneIndex: 16 },
      { id: 'square-pairs', label: 'Square Pairs', sceneIndex: 17 },
    ],
  },
  {
    id: 'sec-5',
    label: '6. Practice',
    shortLabel: '6. Practice',
    storyHook: 'Sharpen your intuition with NCERT textbook challenges, spot factor traps, and test your estimation speed.',
    subTabs: [
      { id: 'ncert-unsolved', label: 'NCERT Unsolved Exercises' },
      { id: 'solved-examples', label: 'Solved Examples' },
      { id: 'concept-clearing', label: 'Concept Clearing & In-Text' },
    ],
  },
];
