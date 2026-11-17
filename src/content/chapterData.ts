/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Chapter, RefresherMiniClip } from '../types';

export const sampleRefresherClip: RefresherMiniClip = {
  id: 'refresher-multiplication',
  title: 'Refresher: Multiplication as Arrays',
  beats: [
    {
      id: 'r-1',
      headline: 'Multiplication forms a rectangular grid.',
      focusWord: 'grid',
      focusColor: 'area',
      narration: 'Multiplying two numbers makes rows and columns.',
      latex: ['3 \\times 4 = 12'],
    },
    {
      id: 'r-2',
      headline: 'Equal rows and columns make a square.',
      focusWord: 'square',
      focusColor: 'number',
      narration: 'When rows equal columns, it is a perfect square.',
      latex: ['3 \\times 3 = 9 = 3^2'],
    },
  ],
};

export const chapterData: Chapter = {
  id: 'class8-squares-cubes',
  title: 'Class 8 Maths: A Square and A Cube',
  description: 'NCERT Class 8 Chapter 1 Complete Notes, Solved & Unsolved Problems',
  scenes: [
    // --- SECTION 1: Lockers and Square Numbers ---
    {
      id: 'scene-0',
      title: 'The Locker Puzzle',
      subtitle: '100 closed lockers and 100 people walking by.',
      storyHook: 'A royal queen hides jewels in 100 lockers, but her guards keep flipping the locks—can you guess which ones stay open?',
      refresherId: 'refresher-multiplication',
      beats: [
        {
          id: 'lp-1',
          headline: 'One hundred closed lockers in a row.',
          focusWord: 'closed lockers',
          focusColor: 'lockerClosed',
          narration: 'All one hundred doors start locked tight.',
          latex: ['\\text{Locker state: All Closed}'],
        },
        {
          id: 'lp-2',
          headline: 'Person one opens every locker door.',
          focusWord: 'opens',
          focusColor: 'lockerOpen',
          narration: 'Person one touches every single door and opens it.',
          latex: ['1, 2, 3, \\dots, 100 \\text{ are open}'],
        },
        {
          id: 'lp-3',
          headline: 'Which lockers stay open at the end?',
          focusWord: 'stay open',
          focusColor: 'pair',
          narration: 'Guess which doors remain open after person one hundred!',
          latex: ['\\text{Open doors} = 1, 4, 9, 16, 25, \\dots'],
          interactive: true,
          params: { person: 100 },
        },
      ],
      quickCheck: [
        {
          prompt: 'Which lockers stay open at the end of the puzzle?',
          options: ['All lockers', 'Perfect square numbers', 'Prime numbers', 'Even numbers'],
          correctIndex: 1,
          explanation: 'Only lockers with an odd number of factors (perfect squares) stay open.',
          solutionSteps: [
            {
              title: 'Count the flips per locker',
              text: 'A locker changes state once for every factor it has (an odd count of flips leaves it OPEN).',
            },
            {
              title: 'Spot who has an odd factor count',
              latex: '36 = 6 \\times 6 \\implies \\text{lone middle factor } 6',
              text: 'Most numbers pair up factors evenly, but perfect squares have one middle factor paired with itself.',
            },
            {
              title: 'Identify the open lockers',
              latex: '1, 4, 9, 16, 25, 36, 49, 64, 81, 100',
              text: 'Therefore, only the perfect square lockers stay open at the end.',
            },
          ],
        },
      ],
    },
    {
      id: 'scene-1',
      title: 'Factor Partners',
      subtitle: 'Why factors usually come in pairs.',
      beats: [
        {
          id: 'fp-1',
          headline: 'Factors are numbers that divide evenly.',
          focusWord: 'factors',
          focusColor: 'number',
          narration: 'For example, 6 has factors 1, 2, 3, and 6.',
          latex: ['1 \\times 6 = 6, \\quad 2 \\times 3 = 6'],
        },
        {
          id: 'fp-2',
          headline: 'Partner factors always come in pairs.',
          focusWord: 'pairs',
          focusColor: 'pair',
          narration: 'Distinct factor partners mean an even total count.',
          latex: ['\\text{Factors of } 6: \\{1, 2, 3, 6\\} \\text{ (4 factors)}'],
        },
      ],
      quickCheck: [
        {
          prompt: 'How many factors does the number 36 have?',
          options: ['6', '7', '9', '12'],
          correctIndex: 2,
          explanation: '36 has 9 factors: 1, 2, 3, 4, 6, 9, 12, 18, 36.',
          solutionSteps: [
            {
              title: 'List the factor pairs of 36',
              latex: '1\\times 36,\\; 2\\times 18,\\; 3\\times 12,\\; 4\\times 9',
              text: 'That gives 4 distinct pairs, which is 8 factors so far.',
            },
            {
              title: 'Include the lone square partner',
              latex: '6 \\times 6 = 36',
              text: '6 pairs with itself, adding just 1 more unique factor.',
            },
            {
              title: 'Count all unique factors',
              latex: '8 + 1 = 9\\text{ factors}',
              text: 'So 36 has 9 factors in total: 1, 2, 3, 4, 6, 9, 12, 18, 36.',
            },
          ],
        },
      ],
    },
    {
      id: 'scene-2',
      title: 'Squares as Areas',
      subtitle: 'Geometric view of multiplying a number by itself.',
      beats: [
        {
          id: 'sa-1',
          headline: 'A square has equal length and width.',
          focusWord: 'equal length',
          focusColor: 'area',
          narration: 'Area equals side times side.',
          latex: ['A = s \\times s = s^2'],
        },
        {
          id: 'sa-2',
          headline: 'Tap to see side length and area.',
          focusWord: 'side length',
          focusColor: 'number',
          narration: 'Observe how area grows as side length increases.',
          latex: ['n = 5 \\implies 5^2 = 25'],
          interactive: true,
          params: { side: 5 },
        },
      ],
      quickCheck: [
        {
          prompt: 'What is the area of a square of side 8 units?',
          options: ['16', '32', '64', '80'],
          correctIndex: 2,
          explanation: 'Area = 8 × 8 = 64 square units.',
          solutionSteps: [
            {
              title: 'Use the square area formula',
              latex: '\\text{Area} = \\text{side} \\times \\text{side} = s^2',
              text: 'A square has equal length and width, so multiply the side by itself.',
            },
            {
              title: 'Substitute side = 8',
              latex: '8 \\times 8 = 64\\text{ sq. units}',
              text: 'The area of the square is 64 square units.',
            },
          ],
        },
      ],
    },

    // --- SECTION 2: Patterns in Squares ---
    {
      id: 'scene-3',
      title: 'Last Digits, Zeros and Parity',
      subtitle: 'What digits can square numbers end with?',
      storyHook: "Ancient builders didn't use calculators; they grew squares by adding one bent corner at a time.",
      beats: [
        {
          id: 'ld-1',
          headline: 'Look at the last digits of 1² to 30².',
          focusWord: 'last digits',
          focusColor: 'number',
          narration: 'Check the ending digits as numbers grow up to 30 squared.',
          latex: ['1^2=1, \\; 4^2=16, \\; 9^2=81, \\; 10^2=100'],
        },
        {
          id: 'ld-2',
          headline: 'No square ever ends in 2, 3, 7, or 8.',
          focusWord: '2, 3, 7 or 8',
          focusColor: 'odd',
          narration: 'Square numbers only end in 0, 1, 4, 5, 6, or 9.',
          latex: ['\\text{Never squares: } 23, 47, 82, 133, 2078'],
        },
        {
          id: 'ld-3',
          headline: 'Ending in 6 does not guarantee a square.',
          focusWord: 'Ending in 6',
          focusColor: 'pair',
          narration: '16 and 36 are squares, but 26 is not a square.',
          latex: ['16 = 4^2, \\quad 36 = 6^2, \\quad 26 \\neq s^2'],
        },
        {
          id: 'ld-4',
          headline: 'Try the Last Digit Machine.',
          focusWord: 'Last Digit Machine',
          focusColor: 'area',
          narration: 'Tap any digit to see what its square ends with.',
          latex: ['\\text{Input digits: } 0 \\dots 9'],
          interactive: true,
          params: { digit: 4 },
        },
        {
          id: 'ld-5',
          headline: 'Which of these squares end in 6?',
          focusWord: 'end in 6',
          focusColor: 'number',
          narration: 'Look at the ones digit: 34², 46², 56², and 74² end in 6.',
          latex: ['34^2 \\to 6, \\; 46^2 \\to 6, \\; 56^2 \\to 6, \\; 74^2 \\to 6'],
        },
        {
          id: 'ld-6',
          headline: 'Trailing zeros double when you square.',
          focusWord: 'double',
          focusColor: 'volume',
          narration: 'One zero becomes two zeros. Two zeros become four zeros.',
          latex: ['10^2 = 100, \\quad 100^2 = 10000 (2k \\text{ zeros})'],
        },
        {
          id: 'ld-7',
          headline: 'Even squares stay even, odd squares stay odd.',
          focusWord: 'even',
          focusColor: 'odd',
          narration: 'Square an even number for an even result, or odd for odd.',
          latex: ['(2k)^2 = 4k^2 \\text{ (even)}, \\quad (2k+1)^2 = 4k^2+4k+1 \\text{ (odd)}'],
        },
      ],
      quickCheck: [
        {
          prompt: 'Can 3287 be a square?',
          options: ['Yes', 'No, because it ends in 7', 'Yes, because it is odd'],
          correctIndex: 1,
          explanation: 'No square ends in 2, 3, 7, or 8.',
          solutionSteps: [
            {
              title: 'Check the last digit of 3287',
              text: 'The ones digit of 3287 is 7.',
            },
            {
              title: 'Apply the square ending rule',
              latex: '\\text{Allowed endings: } 0, 1, 4, 5, 6, 9',
              text: 'No perfect square ever ends in 2, 3, 7, or 8—so 3287 cannot be a square.',
            },
          ],
        },
        {
          prompt: '300² ends in how many zeros?',
          options: ['2 zeros', '3 zeros', '4 zeros'],
          correctIndex: 2,
          explanation: 'Two zeros at the end of 300 become four zeros in 300² = 90000.',
          solutionSteps: [
            {
              title: 'Count the zeros in 300',
              latex: '300 = 3 \\times 100 \\text{ (2 zeros)}',
              text: '300 ends with 2 trailing zeros.',
            },
            {
              title: 'Double the zeros when squaring',
              latex: '300^2 = 300 \\times 300 = 90000',
              text: 'Squaring doubles the trailing zeros: 2 × 2 = 4 zeros.',
            },
          ],
        },
        {
          prompt: 'Is the square of an odd number odd or even?',
          options: ['Always odd', 'Always even', 'Depends on the number'],
          correctIndex: 0,
          explanation: 'The square of any odd number is always odd.',
          solutionSteps: [
            {
              title: 'Multiply odd × odd',
              latex: '3^2 = 9,\\quad 5^2 = 25,\\quad 7^2 = 49',
              text: 'An odd number times another odd number can never contain a factor of 2.',
            },
            {
              title: 'Conclude the parity',
              text: 'Therefore, the square of an odd number is always odd.',
            },
          ],
        },
      ],
    },
    {
      id: 'scene-4',
      title: 'Odd Numbers Make Squares',
      subtitle: 'Successive differences and L-frames.',
      beats: [
        {
          id: 'on-1',
          headline: 'Gaps between squares are always odd numbers.',
          focusWord: 'odd numbers',
          focusColor: 'odd',
          narration: 'Look at the jumps: 3, 5, 7, and 9.',
          latex: ['4-1=3, \\; 9-4=5, \\; 16-9=7, \\; 25-16=9'],
        },
        {
          id: 'on-2',
          headline: 'Bent L-frames add up to n squared.',
          focusWord: 'L-frames',
          focusColor: 'area',
          narration: 'Add odd numbers from 1 to build bigger squares.',
          latex: ['1 + 3 + 5 + \\dots + (2n-1) = n^2'],
        },
        {
          id: 'on-3',
          headline: 'Wrap L-frames around the dot grid.',
          focusWord: 'dot grid',
          focusColor: 'number',
          narration: 'Move the slider to grow each square one L-frame at a time.',
          latex: ['35^2 = 1225 \\implies 36^2 = 1225 + 71 = 1296'],
          interactive: true,
          params: { n: 5 },
        },
        {
          id: 'on-4',
          headline: 'Try the Subtract Test on 25.',
          focusWord: 'Subtract Test',
          focusColor: 'root',
          narration: 'Subtract 1, 3, 5, 7, 9. Landing on 0 proves a square!',
          latex: ['25 - 1 - 3 - 5 - 7 - 9 = 0 \\text{ (Square)}'],
          interactive: true,
        },
        {
          id: 'on-5',
          headline: 'Test 38 by subtracting odd numbers.',
          focusWord: '38',
          focusColor: 'odd',
          narration: '38 skips past 0 to −11. That means 38 is not a square.',
          latex: ['38 - 1 - 3 - 5 - 7 - 9 - 11 = 2, \\text{ next is } -11'],
          interactive: true,
        },
      ],
      quickCheck: [
        {
          prompt: 'What is the sum of the first 8 odd numbers?',
          options: ['16', '36', '64', '81'],
          correctIndex: 2,
          explanation: 'Sum of first n odd numbers is n². 8² = 64.',
          solutionSteps: [
            {
              title: 'Recall the odd-sum square pattern',
              latex: '1 + 3 + 5 + \\dots + (2n-1) = n^2',
              text: 'Adding the first n consecutive odd numbers always forms the square n².',
            },
            {
              title: 'Substitute n = 8',
              latex: '8^2 = 8 \\times 8 = 64',
              text: 'So the sum of the first 8 odd numbers is 64.',
            },
          ],
        },
        {
          prompt: 'What is the 20th odd number?',
          options: ['39', '40', '41'],
          correctIndex: 0,
          explanation: 'The nth odd number is 2n - 1. For n = 20, 2(20) - 1 = 39.',
          solutionSteps: [
            {
              title: 'Use the nth odd number formula',
              latex: '\\text{nth odd number} = 2n - 1',
              text: 'Every odd L-frame adds 2n - 1 dots to step from (n-1)² to n².',
            },
            {
              title: 'Plug in n = 20',
              latex: '2(20) - 1 = 40 - 1 = 39',
              text: 'The 20th odd number is 39.',
            },
          ],
        },
        {
          prompt: 'Does the subtract test show that 50 is a square?',
          options: ['Yes', 'No, it misses 0'],
          correctIndex: 1,
          explanation: '50 is not a square; subtracting odd numbers skips over 0.',
          solutionSteps: [
            {
              title: 'Subtract the first 7 odd numbers (sum = 49)',
              latex: '50 - (1+3+5+7+9+11+13) = 50 - 49 = 1',
              text: 'After 7 steps, 1 remains.',
            },
            {
              title: 'Try the 8th subtraction',
              latex: '1 - 15 = -14 \\neq 0',
              text: 'It jumps past 0 to -14, proving 50 is NOT a perfect square.',
            },
          ],
        },
      ],
    },
    {
      id: 'scene-5',
      title: 'Between Squares & Triangular Numbers',
      subtitle: 'Non-square gaps and triangular numbers summing to squares.',
      beats: [
        {
          id: 'bt-1',
          headline: 'Numbers hiding between two squares.',
          focusWord: 'between',
          focusColor: 'number',
          narration: 'Count 2n non-squares between n² and (n+1)². Try 16² and 17²!',
          latex: ['\\text{Count} = 2n \\quad (q - p - 1)'],
        },
        {
          id: 'bt-2',
          headline: 'How many squares live in each hundred?',
          focusWord: 'each hundred',
          focusColor: 'area',
          narration: 'Below 1000, there are 31 squares. The largest is 961.',
          latex: ['31^2 = 961'],
        },
        {
          id: 'bt-3',
          headline: 'Triangular numbers stack dots like stairs.',
          focusWord: 'Triangular numbers',
          focusColor: 'odd',
          narration: 'Look at 1, 3, 6, 10, 15. Slide the zipper to see them join!',
          latex: ['T_1=1, \\; T_2=3, \\; T_3=6, \\; T_4=10, \\; T_5=15'],
          interactive: true,
        },
        {
          id: 'bt-4',
          headline: 'Two neighbor triangles zip into one square!',
          focusWord: 'zip',
          focusColor: 'pair',
          narration: 'Tap Zip Together to lock T(n−1) and T(n) into n².',
          latex: ['T_{n-1} + T_n = n^2'],
          interactive: true,
        },
      ],
      quickCheck: [
        {
          prompt: 'How many numbers lie between 20² and 21²?',
          options: ['20', '40', '41'],
          correctIndex: 1,
          explanation: 'Between n² and (n+1)² there are 2n numbers. 2 × 20 = 40.',
          solutionSteps: [
            {
              title: 'Use the between-squares rule',
              latex: '\\text{Non-squares between } n^2 \\text{ and } (n+1)^2 = 2n',
              text: 'There are always 2n whole numbers strictly between n² and (n+1)².',
            },
            {
              title: 'Calculate for n = 20',
              latex: '2 \\times 20 = 40',
              text: 'Or check directly: 441 - 400 - 1 = 40 numbers.',
            },
          ],
        },
        {
          prompt: 'Which two neighboring triangular numbers add up to 49?',
          options: ['15 and 21', '21 and 28', '28 and 36'],
          correctIndex: 1,
          explanation: '21 + 28 = 49 (which is 7²).',
          solutionSteps: [
            {
              title: 'Find T₆ and T₇',
              latex: 'T_6 = 21, \\quad T_7 = 28',
              text: 'Neighbors T(n-1) and T(n) always zip together to make n².',
            },
            {
              title: 'Add them to verify 7²',
              latex: '21 + 28 = 49 = 7^2',
              text: 'So the two triangular numbers are 21 and 28.',
            },
          ],
        },
        {
          prompt: 'Which block of 100 holds the square 729 (27²)?',
          options: ['601 to 700', '701 to 800', '801 to 900'],
          correctIndex: 1,
          explanation: '729 lies in the 701 to 800 block.',
          solutionSteps: [
            {
              title: 'Compare 729 to hundred boundaries',
              latex: '700 < 729 \\le 800',
              text: '729 is larger than 700 and smaller than 800.',
            },
            {
              title: 'Pick the matching block',
              text: 'Therefore, 729 sits inside the 701 to 800 block.',
            },
          ],
        },
      ],
    },

    // --- SECTION 3: Square Roots ---
    {
      id: 'scene-6',
      title: 'Roots and Plus-Minus',
      subtitle: 'What is a square root?',
      storyHook: 'If a square courtyard covers 1936 tiles, how many steps does it take to walk along one wall?',
      beats: [
        {
          id: 'rm-1',
          headline: 'Square root undoes squaring.',
          focusWord: 'undoes',
          focusColor: 'root',
          narration: 'If 6² is 36, then the square root of 36 is 6.',
          latex: ['\\sqrt{36} = 6'],
          interactive: true,
        },
        {
          id: 'rm-2',
          headline: 'Plus and minus give the same square.',
          focusWord: 'same square',
          focusColor: 'odd',
          narration: 'Both (+5)² and (−5)² equal 25!',
          latex: ['(+5)^2 = 25, \\quad (-5)^2 = 25'],
          interactive: true,
        },
      ],
      quickCheck: [
        {
          prompt: 'What is the principal square root of 81?',
          options: ['-9', '9', '18', '81'],
          correctIndex: 1,
          explanation: 'The principal square root of 81 is 9.',
          solutionSteps: [
            {
              title: 'Find what times itself equals 81',
              latex: '9 \\times 9 = 81 \\quad\\text{and}\\quad (-9) \\times (-9) = 81',
              text: 'Both +9 and -9 square to 81.',
            },
            {
              title: 'Pick the positive (principal) root',
              latex: '\\sqrt{81} = 9',
              text: 'The symbol √ always stands for the non-negative root, which is 9.',
            },
          ],
        },
      ],
    },
    {
      id: 'scene-7',
      title: 'Finding Roots',
      subtitle: 'Repeated subtraction and prime factorisation methods.',
      beats: [
        {
          id: 'fr-1',
          headline: 'Subtract odd numbers to find the root.',
          focusWord: 'Subtract',
          focusColor: 'root',
          narration: 'Tap Step Subtraction to count how many odds reach zero.',
          latex: ['25 - 1 - 3 - 5 - 7 - 9 = 0 \\implies \\sqrt{25} = 5'],
          interactive: true,
        },
        {
          id: 'fr-2',
          headline: 'Pair up prime factors to find the root.',
          focusWord: 'Pair up',
          focusColor: 'number',
          narration: 'Pick one number from each prime pair. Lonely factors mean not square!',
          latex: ['324 = 2^2 \\times 3^4 \\implies \\sqrt{324} = 18'],
          interactive: true,
        },
      ],
      quickCheck: [
        {
          prompt: 'Find √144 using prime factorisation.',
          options: ['10', '11', '12', '14'],
          correctIndex: 2,
          explanation: '144 = 12 × 12, so √144 = 12.',
          solutionSteps: [
            {
              title: 'Break 144 into prime factors',
              latex: '144 = (2 \\times 2) \\times (2 \\times 2) \\times (3 \\times 3)',
              text: 'Group the identical prime factors into pairs.',
            },
            {
              title: 'Take one factor from each pair',
              latex: '\\sqrt{144} = 2 \\times 2 \\times 3 = 12',
              text: 'Multiplying one number from each pair gives 12.',
            },
          ],
        },
      ],
    },
    {
      id: 'scene-8',
      title: 'Estimating Roots',
      subtitle: 'Finding approximate roots for non-perfect squares.',
      beats: [
        {
          id: 'er-1',
          headline: 'Trap the square root between two tens.',
          focusWord: 'Trap',
          focusColor: 'root',
          narration: 'Since 1600 < 1936 < 2500, √1936 sits between 40 and 50.',
          latex: ['40^2 = 1600 < 1936 < 2500 = 50^2'],
          interactive: true,
        },
        {
          id: 'er-2',
          headline: 'Check the last digit and test 45².',
          focusWord: '45²',
          focusColor: 'number',
          narration: '1936 ends in 6, so try 44 or 46. Check 44²!',
          latex: ['44^2 = 1936 \\implies \\sqrt{1936} = 44'],
          interactive: true,
        },
      ],
      quickCheck: [
        {
          prompt: 'Between which two whole numbers does √85 lie?',
          options: ['8 and 9', '9 and 10', '10 and 11'],
          correctIndex: 1,
          explanation: '9² = 81 and 10² = 100. So √85 is between 9 and 10.',
          solutionSteps: [
            {
              title: 'Trap 85 between two neighbor squares',
              latex: '81 < 85 < 100',
              text: 'Find the closest perfect squares below and above 85.',
            },
            {
              title: 'Take square roots across the inequality',
              latex: '9 < \\sqrt{85} < 10',
              text: 'Since √81 = 9 and √100 = 10, √85 lies between 9 and 10.',
            },
          ],
        },
      ],
    },

    // --- SECTION 4: Cubes and Cube Roots ---
    {
      id: 'scene-9',
      title: 'Building Cubes',
      subtitle: 'Multiplying a number three times.',
      storyHook: 'Stacking flat tile floors into a tall building creates volume—and leads to a famous hospital taxi puzzle.',
      beats: [
        {
          id: 'bc-1',
          headline: 'A cube multiplies a number three times.',
          focusWord: 'three times',
          focusColor: 'volume',
          narration: 'Length times breadth times height gives a solid cube!',
          latex: ['n \\times n \\times n = n^3, \\quad 3^3 = 27'],
          interactive: true,
        },
        {
          id: 'bc-2',
          headline: 'Stack 16-cube layers to build 64.',
          focusWord: '64',
          focusColor: 'volume',
          narration: 'Tap Explode Layers to count all four flat sheets inside 4³.',
          latex: ['\\text{Volume} = 4^3 = 64'],
          interactive: true,
          params: { n: 4, layer: 4 },
        },
      ],
      quickCheck: [
        {
          prompt: 'What is the volume of a cube with edge 5 units?',
          options: ['25', '75', '125', '150'],
          correctIndex: 2,
          explanation: 'Volume = 5 × 5 × 5 = 125 cubic units.',
          solutionSteps: [
            {
              title: 'Use the cube volume formula',
              latex: 'V = e \\times e \\times e = e^3',
              text: 'Multiply length × breadth × height for the cube.',
            },
            {
              title: 'Substitute edge = 5',
              latex: '5^3 = 5 \\times 5 \\times 5 = 25 \\times 5 = 125',
              text: 'The volume is 125 cubic units.',
            },
          ],
        },
      ],
    },
    {
      id: 'scene-10',
      title: 'Cube Patterns',
      subtitle: 'Ending digits of cube numbers.',
      beats: [
        {
          id: 'cp-1',
          headline: 'Cubes can end in any digit!',
          focusWord: 'any digit',
          focusColor: 'number',
          narration: 'Unlike squares, cube endings cover every digit from 0 to 9.',
          latex: ['\\text{Cubes can end in } 0, 1, 2, 3, 4, 5, 6, 7, 8, 9'],
        },
        {
          id: 'cp-2',
          headline: 'Trailing zeros triple when you cube.',
          focusWord: 'triple',
          focusColor: 'volume',
          narration: 'One zero becomes three zeros. Two zeros become six zeros!',
          latex: ['10^3 = 1000 \\text{ (3 zeros)}'],
        },
      ],
      quickCheck: [
        {
          prompt: 'How many trailing zeros does the cube of 200 have?',
          options: ['3', '6', '9'],
          correctIndex: 1,
          explanation: '200³ = 8,000,000 (6 zeros). Each zero triples when cubed.',
          solutionSteps: [
            {
              title: 'Count zeros in the base number',
              latex: '200 = 2 \\times 100 \\text{ (2 zeros)}',
              text: '200 ends with 2 zeros.',
            },
            {
              title: 'Triple the zero count when cubing',
              latex: '200^3 = 200 \\times 200 \\times 200 = 8{,}000{,}000',
              text: '2 zeros × 3 = 6 trailing zeros.',
            },
          ],
        },
      ],
    },
    {
      id: 'scene-11',
      title: 'Taxicab Numbers',
      subtitle: 'Numbers that are the sum of two cubes in two different ways.',
      beats: [
        {
          id: 'tc-1',
          headline: 'Meet 1729, Hardy and Ramanujan’s taxi number!',
          focusWord: '1729',
          focusColor: 'pair',
          narration: 'Compare two cube pairs on the balance scale. Both weigh 1729!',
          latex: ['1729 = 1^3 + 12^3 = 9^3 + 10^3'],
          interactive: true,
        },
        {
          id: 'tc-2',
          headline: 'Test different cube weights on each pan.',
          focusWord: 'cube weights',
          focusColor: 'volume',
          narration: 'Tap weights to tilt the scale, then balance it at 1729.',
          latex: ['4104 = 2^3 + 16^3 = 9^3 + 15^3'],
          interactive: true,
        },
      ],
      quickCheck: [
        {
          prompt: 'Which two cube pairs add up to 1729?',
          options: ['1³ + 12³ and 9³ + 10³', '2³ + 11³ and 3³ + 10³', '5³ + 10³ and 6³ + 9³'],
          correctIndex: 0,
          explanation: '1³+12³ = 1+1728=1729, and 9³+10³ = 729+1000=1729.',
          solutionSteps: [
            {
              title: 'Check the first cube pair',
              latex: '1^3 + 12^3 = 1 + 1728 = 1729',
              text: '1 cubed plus 12 cubed gives 1729.',
            },
            {
              title: 'Check the second cube pair',
              latex: '9^3 + 10^3 = 729 + 1000 = 1729',
              text: '9 cubed plus 10 cubed also equals 1729!',
            },
          ],
        },
      ],
    },
    {
      id: 'scene-12',
      title: 'Cubes and Odd Numbers',
      subtitle: 'Expressing any cube as a sum of consecutive odd numbers.',
      beats: [
        {
          id: 'co-1',
          headline: 'Every cube equals a run of odd numbers.',
          focusWord: 'odd numbers',
          focusColor: 'odd',
          narration: 'Tap any cube button on the tape to see its odd sum.',
          latex: ['2^3 = 3 + 5 = 8', '3^3 = 7 + 9 + 11 = 27'],
          interactive: true,
        },
        {
          id: 'co-2',
          headline: 'Count how many odd numbers make n cubed.',
          focusWord: 'n cubed',
          focusColor: 'volume',
          narration: '3³ uses 3 odds. 4³ uses the next 4 odds!',
          latex: ['13 + 15 + 17 + 19 = 64 = 4^3'],
          interactive: true,
        },
      ],
      quickCheck: [
        {
          prompt: 'What sum of 4 consecutive odd numbers equals 4³ (64)?',
          options: ['11+13+15+17', '13+15+17+19', '15+17+19+21'],
          correctIndex: 1,
          explanation: '13 + 15 + 17 + 19 = 64 = 4³.',
          solutionSteps: [
            {
              title: 'Recall where the 4th block begins',
              latex: '1^3=1,\\; 2^3=3+5,\\; 3^3=7+9+11',
              text: 'The 3rd block ends at 11, so the 4th block starts at 13.',
            },
            {
              title: 'Add the next 4 consecutive odd numbers',
              latex: '13 + 15 + 17 + 19 = 64 = 4^3',
              text: 'Their sum is 64, which equals 4³.',
            },
          ],
        },
      ],
    },
    {
      id: 'scene-13',
      title: 'Cube Roots',
      subtitle: 'Finding the edge length from volume.',
      storyHook: 'To pack rubik cubes into a mystery shipping crate, you need prime factors grouped in teams of three.',
      beats: [
        {
          id: 'cr-1',
          headline: 'Cube root finds the edge of a cube.',
          focusWord: 'edge',
          focusColor: 'root',
          narration: 'Ask yourself: which number times itself three times gives this volume?',
          latex: ['\\sqrt[3]{216} = 6 \\text{ because } 6^3 = 216'],
          interactive: true,
        },
        {
          id: 'cr-2',
          headline: 'Group prime factors in teams of three.',
          focusWord: 'teams of three',
          focusColor: 'number',
          narration: 'Try 3375 and 500! Fix incomplete triplets by multiplying or dividing.',
          latex: ['3375 = 3^3 \\times 5^3 \\implies \\sqrt[3]{3375} = 15'],
          interactive: true,
        },
      ],
      quickCheck: [
        {
          prompt: 'What is the cube root of 512?',
          options: ['6', '7', '8', '9'],
          correctIndex: 2,
          explanation: '8 × 8 × 8 = 512, so ∛512 = 8.',
          solutionSteps: [
            {
              title: 'Factor 512 by 2 and group in triplets',
              latex: '512 = (2\\times 2\\times 2) \\times (2\\times 2\\times 2) \\times (2\\times 2\\times 2)',
              text: '512 breaks into three identical groups of (2 × 2 × 2).',
            },
            {
              title: 'Take one number from each triplet',
              latex: '\\sqrt[3]{512} = 2 \\times 2 \\times 2 = 8',
              text: 'So ∛512 = 8 (check: 8 × 8 × 8 = 512).',
            },
          ],
        },
      ],
    },
    {
      id: 'scene-14',
      title: 'Successive Differences',
      subtitle: 'Finding patterns by subtracting consecutive terms.',
      beats: [
        {
          id: 'sd-1',
          headline: 'Subtract neighbor terms to build a difference tree.',
          focusWord: 'difference tree',
          focusColor: 'volume',
          narration: 'Look at how cubes drop: 1st diffs, multiples of 6, then 6!',
          latex: ['1, 8, 27, 64 \\implies \\text{Diffs: } 7, 19, 37'],
          interactive: true,
        },
        {
          id: 'sd-2',
          headline: 'Squares stop at 2. Cubes stop at 6!',
          focusWord: 'stop at 6',
          focusColor: 'number',
          narration: 'Switch between Squares and Cubes to watch both subtraction pyramids.',
          latex: ['\\text{Squares level 2} = 2, \\quad \\text{Cubes level 3} = 6'],
          interactive: true,
        },
      ],
      quickCheck: [
        {
          prompt: 'What is the first difference between 1³ and 2³?',
          options: ['7', '19', '27'],
          correctIndex: 0,
          explanation: '8 - 1 = 7.',
          solutionSteps: [
            {
              title: 'Compute the first two cubes',
              latex: '1^3 = 1, \\quad 2^3 = 8',
              text: 'Evaluate 1 cubed and 2 cubed.',
            },
            {
              title: 'Subtract the consecutive cubes',
              latex: '2^3 - 1^3 = 8 - 1 = 7',
              text: 'The first difference is 7.',
            },
          ],
        },
      ],
    },

    // --- SECTION 5: History and Puzzles ---
    {
      id: 'scene-15',
      title: 'A Pinch of History',
      subtitle: 'Ancient mathematicians and square roots on clay tablets.',
      beats: [
        {
          id: 'ph-1',
          headline: 'Aryabhata named squares Varga and cubes Ghana.',
          focusWord: 'Varga',
          focusColor: 'area',
          narration: 'March 16 soldiers into a square squad, or stack 27 bricks solid!',
          latex: ['\\text{Varga } (4^2 = 16), \\quad \\text{Ghana } (3^3 = 27)'],
          interactive: true,
        },
        {
          id: 'ph-2',
          headline: 'Mūla means the root that grows the tree.',
          focusWord: 'Mūla',
          focusColor: 'number',
          narration: 'The hidden side 6 grows a 36-tile canopy above the soil!',
          latex: ['\\text{Varga-mūla } \\sqrt{36}=6, \\quad \\text{Ghana-mūla } \\sqrt[3]{64}=4'],
          interactive: true,
        },
      ],
      quickCheck: [
        {
          prompt: 'Which ancient civilization left clay tablets with square root approximations?',
          options: ['Babylonians', 'Romans', 'Greeks'],
          correctIndex: 0,
          explanation: 'Babylonian clay tablets dating back 4000 years contain square root calculations.',
          solutionSteps: [
            {
              title: 'Look back 4,000 years in history',
              text: 'Mesopotamian scribes pressed wedge-shaped cuneiform numbers into wet clay tablets.',
            },
            {
              title: 'Identify the civilization',
              text: 'Babylonian clay tablets (like YBC 7289) show accurate square root approximations.',
            },
          ],
        },
      ],
    },
    {
      id: 'scene-16',
      title: 'Chapter Summary',
      subtitle: 'Quick review of squares, roots, cubes, and cube roots.',
      beats: [
        {
          id: 'cs-1',
          headline: 'Squares make areas. Cubes build volumes.',
          focusWord: 'areas',
          focusColor: 'number',
          narration: 'Use square roots and cube roots to work backwards to the side.',
          latex: ['s^2 = A \\iff \\sqrt{A} = s', 'e^3 = V \\iff \\sqrt[3]{V} = e'],
        },
        {
          id: 'cs-2',
          headline: 'Now test your skills in Practice!',
          focusWord: 'Practice',
          focusColor: 'pair',
          narration: 'Try the Square Pairs game next, then tackle Figure It Out!',
          latex: ['\\text{Chapter 1 Complete}'],
        },
      ],
      quickCheck: [
        {
          prompt: 'What operation is the inverse of cubing a number?',
          options: ['Square root', 'Cube root', 'Division'],
          correctIndex: 1,
          explanation: 'Cube root is the exact inverse operation of cubing.',
          solutionSteps: [
            {
              title: 'Compare forward and reverse operations',
              latex: 'n^3 = V \\iff \\sqrt[3]{V} = n',
              text: 'Cubing turns an edge into volume; taking the cube root turns volume back into the edge.',
            },
            {
              title: 'Name the inverse operation',
              text: 'So the inverse of cubing is taking the cube root.',
            },
          ],
        },
      ],
    },
    {
      id: 'scene-17',
      title: 'Square Pairs',
      subtitle: 'Arrange 1 to 17 so every neighbor sum is a square!',
      beats: [
        {
          id: 'sp-1',
          headline: 'Arrange 1 to 17 so neighbor sums make squares.',
          focusWord: 'neighbor sums',
          focusColor: 'pair',
          narration: 'Tap or drag cards into slots until every bridge glows green!',
          latex: ['3 + 6 = 9 = 3^2, \\quad 6 + 10 = 16 = 4^2'],
          interactive: true,
        },
        {
          id: 'sp-2',
          headline: 'Stuck? Check where 16 and 17 must sit!',
          focusWord: '16 and 17',
          focusColor: 'number',
          narration: '16 and 17 each have only one partner, so they sit at ends.',
          latex: ['16 + 9 = 25, \\quad 17 + 8 = 25'],
          interactive: true,
        },
      ],
      quickCheck: [
        {
          prompt: 'If 8 is placed next to 1, what is their sum and is it a square?',
          options: ['9 (Yes, 3²)', '10 (No)', '7 (No)'],
          correctIndex: 0,
          explanation: '8 + 1 = 9, which is 3², a perfect square.',
          solutionSteps: [
            {
              title: 'Add the two adjacent numbers',
              latex: '8 + 1 = 9',
              text: 'Sum the pair sitting side by side.',
            },
            {
              title: 'Check if the sum is a perfect square',
              latex: '9 = 3 \\times 3 = 3^2',
              text: 'Yes! 9 is 3², so this pair makes a green square bridge.',
            },
          ],
        },
      ],
    },

    // --- SECTION 6: Practice (Categories 1, 2, 3) ---
    {
      id: 'scene-18',
      title: '1) Solved Examples & Solutions',
      subtitle: 'Step-by-step worked problems from NCERT Chapter 1.',
      beats: [
        {
          id: 'se-1',
          headline: 'Solved 1: Is 324 a perfect square?',
          focusWord: 'Solved 1',
          focusColor: 'root',
          narration: '324 = 2 × 2 × 3 × 3 × 3 × 3 = (2 × 3 × 3)² = 18², so √324 = 18.',
          latex: ['324 = (2 \\times 3 \\times 3)^2 = 18^2, \\quad \\sqrt{324} = 18'],
        },
        {
          id: 'se-2',
          headline: 'Solved 2: Estimating square root of 1936.',
          focusWord: 'Solved 2',
          focusColor: 'number',
          narration: '1936 lies between 40² (1600) and 50² (2500). Ends in 6, so root ends in 4 or 6. 44² = 1936.',
          latex: ['40 < \\sqrt{1936} < 50 \\implies 44'],
        },
      ],
      quickCheck: [
        {
          prompt: 'What is the square root of 1764?',
          options: ['38', '42', '46'],
          correctIndex: 1,
          explanation: '42 × 42 = 1764.',
          solutionSteps: [
            {
              title: 'Trap 1764 between squares of tens',
              latex: '40^2 = 1600 < 1764 < 2500 = 50^2',
              text: 'So √1764 is between 40 and 50.',
            },
            {
              title: 'Check the last digit (4)',
              text: 'Since 1764 ends in 4, its root must end in 2 or 8 (try 42 or 48).',
            },
            {
              title: 'Verify by multiplying',
              latex: '42 \\times 42 = 1764 \\implies \\sqrt{1764} = 42',
              text: '42² equals 1764, so √1764 = 42.',
            },
          ],
        },
      ],
    },
    {
      id: 'scene-19',
      title: '2) Unsolved with PDF Solutions',
      subtitle: 'Figure It Out exercises with complete solved answers.',
      beats: [
        {
          id: 'us-1',
          headline: 'Problem: Smallest multiplier for 9408 to be a square.',
          focusWord: 'multiply 9408',
          focusColor: 'pair',
          narration: '9408 = 2⁶ × 3¹ × 7². Multiplying by 3 gives 28224, whose square root is 168.',
          latex: ['9408 \\times 3 = 28224 \\implies \\sqrt{28224} = 168'],
        },
        {
          id: 'us-2',
          headline: 'Problem: Smallest square divisible by 4, 9, and 10.',
          focusWord: 'divisible',
          focusColor: 'number',
          narration: 'LCM is 180 = 2² × 3² × 5. Multiply by 5 to get 900 = 30².',
          latex: ['2^2 \\times 3^2 \\times 5^2 = 900'],
        },
      ],
      quickCheck: [
        {
          prompt: 'What smallest number multiplied by 1323 makes it a cube number?',
          options: ['3', '7', '11'],
          correctIndex: 1,
          explanation: '1323 = 3³ × 7². Multiply by 7 to get 3³ × 7³ = 9261 (21³).',
          solutionSteps: [
            {
              title: 'Prime factorise 1323',
              latex: '1323 = 3 \\times 3 \\times 3 \\times 7 \\times 7 = 3^3 \\times 7^2',
              text: 'Group prime factors into triplets (teams of three).',
            },
            {
              title: 'Find the missing factor for a complete triplet',
              latex: '7^2 \\times 7 = 7^3',
              text: 'The 3s form a full triplet, while 7 appears only twice—it needs one more 7.',
            },
            {
              title: 'Verify the new cube',
              latex: '1323 \\times 7 = 9261 = 21^3',
              text: 'Multiplying by 7 makes it a perfect cube!',
            },
          ],
        },
      ],
    },
    {
      id: 'scene-20',
      title: '3) Concept Clearing Problems',
      subtitle: 'True/False reasoning, taxicab numbers, and algebraic identities.',
      beats: [
        {
          id: 'cc-1',
          headline: 'Concept: Cube of odd numbers and digit bounds.',
          focusWord: 'Concept',
          focusColor: 'volume',
          narration: 'False: Cube of odd number is odd. False: Cubes can end in 8 (ex: 2³=8, 12³=1728).',
          latex: ['3^3 = 27 (odd), \\quad 12^3 = 1728 (ends in 8)'],
        },
        {
          id: 'cc-2',
          headline: 'Concept: Which is greatest? 67³ - 66³ vs 67² - 66².',
          focusWord: 'greatest',
          focusColor: 'pair',
          narration: 'Using a³ - b³ = (a - b)(a² + ab + b²), 67³ - 66³ = 13267, which is much greater than 133.',
          latex: ['67^3 - 66^3 = 13267 > 133'],
        },
      ],
      quickCheck: [
        {
          prompt: 'What is the cube root of 13824?',
          options: ['22', '24', '26'],
          correctIndex: 1,
          explanation: '24 × 24 × 24 = 13824.',
          solutionSteps: [
            {
              title: 'Prime factorise 13824',
              latex: '13824 = 2^9 \\times 3^3 = (2^3)^3 \\times 3^3',
              text: 'Group the factors into triplets of three.',
            },
            {
              title: 'Take one factor from each triplet',
              latex: '\\sqrt[3]{13824} = 2^3 \\times 3 = 8 \\times 3 = 24',
              text: 'Check: 24 × 24 × 24 = 13824, so the cube root is 24.',
            },
          ],
        },
      ],
    },
  ],
};
