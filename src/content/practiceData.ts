/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface PracticeStep {
  title: string;
  latex?: string;
  explanation: string;
}

export interface PracticeQuestion {
  id: string;
  category: 'ncert-unsolved' | 'solved-examples' | 'concept-clearing';
  topic: 'Squares' | 'Square Roots' | 'Cubes' | 'Cube Roots' | 'Patterns & Puzzles';
  title: string;
  source: string;
  statement: string;
  statementLatex?: string;
  predictionOptions?: string[];
  correctOptionIndex?: number;
  answer: string;
  answerLatex?: string;
  steps: PracticeStep[];
  keyRule: string;
  difficulty: 'Easy' | 'Medium' | 'Challenging';
}

export const PRACTICE_QUESTIONS: PracticeQuestion[] = [
  // =========================================================================
  // 1. NCERT UNSOLVED EXERCISES (FIGURE IT OUT)
  // =========================================================================
  {
    id: 'fio-1',
    category: 'ncert-unsolved',
    topic: 'Squares',
    title: 'Which Numbers are Not Perfect Squares?',
    source: 'Figure It Out • Pages 10-11, Q1',
    statement: 'Which of the following numbers are not perfect squares?\n(i) 2032   (ii) 2048   (iii) 1027   (iv) 1089',
    predictionOptions: [
      'Only (i) 2032',
      '(i), (ii), and (iii)',
      'All four numbers',
      'None of them'
    ],
    correctOptionIndex: 1,
    answer: '(i) 2032, (ii) 2048, and (iii) 1027 are NOT perfect squares. (iv) 1089 is a perfect square.',
    answerLatex: '33^2 = 1089',
    steps: [
      {
        title: 'Rule of Last Digits',
        explanation: 'Every square number must end in 0, 1, 4, 5, 6, or 9. No square can ever end in 2, 3, 7, or 8.'
      },
      {
        title: 'Examine each number',
        explanation: '2032 ends in 2 (never a square). 2048 ends in 8 (never a square). 1027 ends in 7 (never a square).'
      },
      {
        title: 'Check 1089',
        latex: '33 \\times 33 = 1089',
        explanation: '1089 ends in 9. Testing 33 × 33 gives exactly 1089, so 1089 is a perfect square.'
      }
    ],
    keyRule: 'Numbers ending in 2, 3, 7, or 8 are never perfect squares.',
    difficulty: 'Easy'
  },
  {
    id: 'fio-2',
    category: 'ncert-unsolved',
    topic: 'Squares',
    title: 'Which Square Ends in the Digit 4?',
    source: 'Figure It Out • Pages 10-11, Q2',
    statement: 'Which one among 64², 108², 292², 36² has the last digit 4?',
    statementLatex: '64^2,\\; 108^2,\\; 292^2,\\; 36^2',
    predictionOptions: [
      'Only 108²',
      'Both 108² and 292²',
      'Only 64²',
      'All of them'
    ],
    correctOptionIndex: 1,
    answer: '108² and 292² both have last digit 4.',
    steps: [
      {
        title: 'Last digit depends on base units digit',
        latex: 'd^2 \\pmod{10}',
        explanation: 'The last digit of a square depends solely on the units digit of the base number.'
      },
      {
        title: 'Test each base digit',
        explanation: 'For 64: 4² = 16 (ends in 6). For 108: 8² = 64 (ends in 4). For 292: 2² = 4 (ends in 4). For 36: 6² = 36 (ends in 6).'
      },
      {
        title: 'Verify full values',
        latex: '108^2 = 11664,\\quad 292^2 = 85264',
        explanation: 'Both 11664 and 85264 end in 4.'
      }
    ],
    keyRule: 'Squares end in 4 only when the base number ends in 2 or 8.',
    difficulty: 'Easy'
  },
  {
    id: 'fio-3',
    category: 'ncert-unsolved',
    topic: 'Squares',
    title: 'Value of 126² from 125²',
    source: 'Figure It Out • Pages 10-11, Q3',
    statement: 'Given that 125² = 15625, what is the value of 126²?',
    statementLatex: '125^2 = 15625 \\implies 126^2 = ?',
    predictionOptions: [
      '15625 + 126 = 15751',
      '15625 + 262 = 15887',
      '15625 + 251 = 15876',
      '15625 + 512 = 16137'
    ],
    correctOptionIndex: 2,
    answer: '126² = 15625 + 251 = 15876',
    answerLatex: '126^2 = 15876',
    steps: [
      {
        title: 'Consecutive square difference identity',
        latex: '(n+1)^2 = n^2 + 2n + 1',
        explanation: 'The difference between consecutive squares is 2n + 1 (the next odd number).'
      },
      {
        title: 'Substitute n = 125',
        latex: '2(125) + 1 = 250 + 1 = 251',
        explanation: 'We add 251 to 125².'
      },
      {
        title: 'Compute total',
        latex: '126^2 = 15625 + 251 = 15876',
        explanation: 'So 126² = 15876.'
      }
    ],
    keyRule: 'Consecutive squares differ by 2n + 1.',
    difficulty: 'Medium'
  },
  {
    id: 'fio-4',
    category: 'ncert-unsolved',
    topic: 'Square Roots',
    title: 'Side Length of Square Area 441 m²',
    source: 'Figure It Out • Pages 10-11, Q4',
    statement: 'Find the length of the side of a square whose area is 441 m².',
    statementLatex: '\\text{Area} = s^2 = 441\\text{ m}^2 \\implies s = ?',
    predictionOptions: [
      '19 m',
      '21 m',
      '29 m',
      '31 m'
    ],
    correctOptionIndex: 1,
    answer: 'Side length is 21 metres.',
    answerLatex: 's = \\sqrt{441} = 21\\text{ m}',
    steps: [
      {
        title: 'Formula for square area',
        latex: '\\text{Area} = \\text{side} \\times \\text{side} = s^2',
        explanation: 'Given s² = 441, the side is the square root of 441.'
      },
      {
        title: 'Prime factorisation of 441',
        latex: '441 = 3 \\times 3 \\times 7 \\times 7 = (3 \\times 7)^2',
        explanation: 'Group the prime factors into equal pairs: (3 × 7) × (3 × 7).'
      },
      {
        title: 'Extract square root',
        latex: 's = 3 \\times 7 = 21\\text{ m}',
        explanation: 'The length of the side is 21 m.'
      }
    ],
    keyRule: 'Side length = √(Area).',
    difficulty: 'Easy'
  },
  {
    id: 'fio-5',
    category: 'ncert-unsolved',
    topic: 'Squares',
    title: 'Smallest Square Divisible by 4, 9, and 10',
    source: 'Figure It Out • Pages 10-11, Q5',
    statement: 'Find the smallest square number that is divisible by each of the following numbers: 4, 9, and 10.',
    predictionOptions: [
      '180',
      '360',
      '900',
      '3600'
    ],
    correctOptionIndex: 2,
    answer: '900 is the smallest square number divisible by 4, 9, and 10.',
    answerLatex: '900 = 30^2',
    steps: [
      {
        title: 'Find prime factors of given numbers',
        latex: '4 = 2^2,\\quad 9 = 3^2,\\quad 10 = 2 \\times 5',
        explanation: 'The LCM requires the highest power of each prime factor.'
      },
      {
        title: 'Calculate LCM',
        latex: '\\text{LCM}(4, 9, 10) = 2^2 \\times 3^2 \\times 5^1 = 180',
        explanation: '180 is divisible by all three, but prime factor 5 has an odd power (5¹).'
      },
      {
        title: 'Make all prime powers even',
        latex: '180 \\times 5 = 2^2 \\times 3^2 \\times 5^2 = 900',
        explanation: 'Multiplying by 5 gives 900, which is 30², a perfect square!'
      }
    ],
    keyRule: 'In a perfect square, all prime factors must have even exponents.',
    difficulty: 'Medium'
  },
  {
    id: 'fio-6',
    category: 'ncert-unsolved',
    topic: 'Square Roots',
    title: 'Multiply 9408 to Make a Perfect Square',
    source: 'Figure It Out • Pages 10-11, Q6',
    statement: 'Find the smallest number by which 9408 must be multiplied so that the product is a perfect square. Find the square root of the product.',
    predictionOptions: [
      'Multiply by 2; root is 137',
      'Multiply by 3; root is 168',
      'Multiply by 7; root is 256',
      'Multiply by 6; root is 180'
    ],
    correctOptionIndex: 1,
    answer: 'Multiply by 3. The product is 28224, and √28224 = 168.',
    answerLatex: '\\sqrt{9408 \\times 3} = \\sqrt{28224} = 168',
    steps: [
      {
        title: 'Prime factorisation of 9408',
        latex: '9408 = 2^6 \\times 3^1 \\times 7^2',
        explanation: 'Break 9408 into prime factors. The powers of 2 and 7 are even, but 3 has power 1.'
      },
      {
        title: 'Identify unpaired factor',
        explanation: 'Prime factor 3 has no pair. To make the power even, multiply by 3.'
      },
      {
        title: 'Calculate square root of product',
        latex: '28224 = 2^6 \\times 3^2 \\times 7^2 \\implies \\sqrt{28224} = 2^3 \\times 3 \\times 7 = 8 \\times 21 = 168',
        explanation: 'The new square is 28224 with square root 168.'
      }
    ],
    keyRule: 'Multiply by the unpaired prime factors to make all exponents even.',
    difficulty: 'Medium'
  },
  {
    id: 'fio-7',
    category: 'ncert-unsolved',
    topic: 'Patterns & Puzzles',
    title: 'Numbers Between Consecutive Squares',
    source: 'Figure It Out • Pages 10-11, Q7',
    statement: 'How many numbers lie between the squares of the following numbers?\n(i) 16 and 17\n(ii) 99 and 100',
    predictionOptions: [
      '(i) 16, (ii) 99',
      '(i) 32, (ii) 198',
      '(i) 33, (ii) 199',
      '(i) 64, (ii) 200'
    ],
    correctOptionIndex: 1,
    answer: '(i) 32 numbers lie between 16² and 17². (ii) 198 numbers lie between 99² and 100².',
    answerLatex: '\\text{Between } n^2 \\text{ and } (n+1)^2 \\text{ lies } 2n',
    steps: [
      {
        title: 'Formula for count between consecutive squares',
        latex: '(n+1)^2 - n^2 - 1 = 2n',
        explanation: 'Between n² and (n+1)², there are always exactly 2n non-square numbers.'
      },
      {
        title: 'Part (i) For 16 and 17',
        latex: '2 \\times 16 = 32',
        explanation: '16² = 256 and 17² = 289. Between them are 257, 258, ..., 288, which is 289 - 256 - 1 = 32.'
      },
      {
        title: 'Part (ii) For 99 and 100',
        latex: '2 \\times 99 = 198',
        explanation: '99² = 9801 and 100² = 10000. Between them are 198 non-square numbers.'
      }
    ],
    keyRule: 'There are exactly 2n non-square numbers between n² and (n+1)²',
    difficulty: 'Easy'
  },
  {
    id: 'fio-8',
    category: 'ncert-unsolved',
    topic: 'Patterns & Puzzles',
    title: 'Fill in the Pythagorean Square Pattern',
    source: 'Figure It Out • Pages 10-11, Q8',
    statement: 'Fill in the missing numbers:\n1² + 2² + 2² = 3²\n2² + 3² + 6² = 7²\n3² + 4² + 12² = 13²\n4² + 5² + 20² = (___)²\n9² + 10² + (___)² = (___)²',
    predictionOptions: [
      '21² and 90², 91²',
      '20² and 99², 100²',
      '25² and 90², 95²',
      '21² and 19², 20²'
    ],
    correctOptionIndex: 0,
    answer: '4² + 5² + 20² = 21² and 9² + 10² + 90² = 91²',
    answerLatex: 'n^2 + (n+1)^2 + [n(n+1)]^2 = [n(n+1)+1]^2',
    steps: [
      {
        title: 'Observe the pattern structure',
        explanation: 'The first two numbers are consecutive: n and (n+1). For example, 1 and 2, 2 and 3, 3 and 4.'
      },
      {
        title: 'Observe the 3rd term',
        latex: '\\text{3rd term} = n \\times (n+1)',
        explanation: 'In line 1: 1×2 = 2. In line 2: 2×3 = 6. In line 3: 3×4 = 12. In line 4: 4×5 = 20.'
      },
      {
        title: 'Observe the result on the right',
        latex: '\\text{Right term} = \\text{3rd term} + 1',
        explanation: 'Right term is always 1 more than 3rd term. For 4 and 5: 20 + 1 = 21². For 9 and 10: 9×10 = 90, so 90 + 1 = 91².'
      }
    ],
    keyRule: 'n² + (n+1)² + [n(n+1)]² = [n(n+1)+1]²',
    difficulty: 'Medium'
  },
  {
    id: 'fio-9',
    category: 'ncert-unsolved',
    topic: 'Squares',
    title: 'Tiny Squares and Prime Factorisation',
    source: 'Figure It Out • Pages 10-11, Q9',
    statement: 'In an illustration, there is a grid of 9 by 9 big squares. Each big square contains 25 tiny squares. How many tiny squares are there in total? Write the prime factorisation.',
    predictionOptions: [
      '1800 tiny squares; 2³ × 3² × 5²',
      '2025 tiny squares; 3⁴ × 5²',
      '2000 tiny squares; 2⁴ × 5³',
      '2250 tiny squares; 2 × 3² × 5³'
    ],
    correctOptionIndex: 1,
    answer: 'There are 2025 tiny squares. Prime factorisation is 3⁴ × 5² = 45².',
    answerLatex: '2025 = 3^4 \\times 5^2 = (3^2 \\times 5)^2 = 45^2',
    steps: [
      {
        title: 'Count total big squares',
        latex: '9 \\times 9 = 81\\text{ big squares}',
        explanation: 'A 9 by 9 grid has 81 big squares.'
      },
      {
        title: 'Multiply by tiny squares per big square',
        latex: '81 \\times 25 = 2025\\text{ tiny squares}',
        explanation: 'Each big square has 25 tiny squares, giving 2025.'
      },
      {
        title: 'Prime factorisation of 2025',
        latex: '2025 = 9 \\times 9 \\times 25 = (3^2) \\times (3^2) \\times (5^2) = 3^4 \\times 5^2',
        explanation: 'All powers are even (4 and 2), confirming 2025 = 45² is a perfect square!'
      }
    ],
    keyRule: 'Total count = 9 × 9 × 25 = 2025 = 3⁴ × 5².',
    difficulty: 'Easy'
  },
  {
    id: 'fio-10',
    category: 'ncert-unsolved',
    topic: 'Cube Roots',
    title: 'Cube Roots of 27000 and 10648',
    source: 'Figure It Out • Pages 16-17, Q1',
    statement: 'Find the cube roots of 27000 and 10648.',
    statementLatex: '\\sqrt[3]{27000},\\quad \\sqrt[3]{10648}',
    predictionOptions: [
      '30 and 22',
      '27 and 24',
      '30 and 28',
      '33 and 22'
    ],
    correctOptionIndex: 0,
    answer: '∛27000 = 30 and ∛10648 = 22.',
    answerLatex: '\\sqrt[3]{27000} = 30,\\quad \\sqrt[3]{10648} = 22',
    steps: [
      {
        title: 'Split 27000 into cube factors',
        latex: '27000 = 27 \\times 1000 = 3^3 \\times 10^3 = (3 \\times 10)^3',
        explanation: 'Cube root of 27 is 3, cube root of 1000 is 10. 3 × 10 = 30.'
      },
      {
        title: 'Prime factorise 10648',
        latex: '10648 = 8 \\times 1331 = 2^3 \\times 11^3',
        explanation: 'Grouping into triplets of primes gives 2³ × 11³.'
      },
      {
        title: 'Extract cube root of 10648',
        latex: '\\sqrt[3]{10648} = 2 \\times 11 = 22',
        explanation: 'So ∛10648 = 22.'
      }
    ],
    keyRule: '∛(a × b) = ∛a × ∛b.',
    difficulty: 'Easy'
  },
  {
    id: 'fio-11',
    category: 'ncert-unsolved',
    topic: 'Cubes',
    title: 'Multiply 1323 to Make a Cube Number',
    source: 'Figure It Out • Pages 16-17, Q2',
    statement: 'What number will you multiply by 1323 to make it a cube number?',
    predictionOptions: [
      'Multiply by 3',
      'Multiply by 7',
      'Multiply by 21',
      'Multiply by 9'
    ],
    correctOptionIndex: 1,
    answer: 'Multiply by 7 to get 9261, which is 21³.',
    answerLatex: '1323 \\times 7 = 9261 = 21^3',
    steps: [
      {
        title: 'Find prime factors of 1323',
        latex: '1323 = 3 \\times 3 \\times 3 \\times 7 \\times 7 = 3^3 \\times 7^2',
        explanation: '3 appears as a triplet (3³), but 7 appears only twice (7²).'
      },
      {
        title: 'Find what is missing for a triplet',
        explanation: 'To complete the triplet of 7s, we need one more 7.'
      },
      {
        title: 'Multiply by 7',
        latex: '1323 \\times 7 = 3^3 \\times 7^3 = (3 \\times 7)^3 = 21^3 = 9261',
        explanation: 'The resulting cube number is 9261 = 21³.'
      }
    ],
    keyRule: 'In a perfect cube, every prime factor exponent must be a multiple of 3.',
    difficulty: 'Medium'
  },
  {
    id: 'fio-12',
    category: 'ncert-unsolved',
    topic: 'Cubes',
    title: 'True or False Cube Reasoning',
    source: 'Figure It Out • Pages 16-17, Q3',
    statement: 'State True or False with reasoning:\n(i) The cube of any odd number is even.\n(ii) There is no perfect cube that ends with 8.\n(iii) The cube of a 2-digit number may be a 3-digit number.\n(iv) The cube of a 2-digit number may have 7 or more digits.\n(v) Cube numbers have an odd number of factors.',
    predictionOptions: [
      'All 5 statements are False',
      '(i) and (ii) True, rest False',
      '(v) is True, rest False',
      '(iii) and (iv) True'
    ],
    correctOptionIndex: 0,
    answer: 'All five statements are FALSE.',
    steps: [
      {
        title: '(i) Cube of odd is even? FALSE',
        latex: '3^3 = 27,\\quad 5^3 = 125',
        explanation: 'Odd × odd × odd is always odd.'
      },
      {
        title: '(ii) No cube ends with 8? FALSE',
        latex: '2^3 = 8,\\quad 12^3 = 1728',
        explanation: 'Any number ending in 2 has a cube ending in 8.'
      },
      {
        title: '(iii) 2-digit cube can be 3-digit? FALSE',
        latex: '10^3 = 1000\\text{ (4 digits)}',
        explanation: 'The smallest 2-digit number is 10, and 10³ = 1000 has 4 digits. It can never have 3 digits.'
      },
      {
        title: '(iv) 2-digit cube can have 7+ digits? FALSE',
        latex: '99^3 = 970299\\text{ (6 digits)}',
        explanation: 'The largest 2-digit number is 99, and 99³ has only 6 digits. It cannot have 7 or more digits.'
      },
      {
        title: '(v) Cubes have odd number of factors? FALSE',
        explanation: 'Only perfect squares have an odd number of factors. Cubes like 8 (factors 1, 2, 4, 8) and 27 (factors 1, 3, 9, 27) have 4 factors (even).'
      }
    ],
    keyRule: 'Only perfect squares have an odd number of factors.',
    difficulty: 'Medium'
  },
  {
    id: 'fio-13',
    category: 'ncert-unsolved',
    topic: 'Cube Roots',
    title: 'Guessing Cube Roots Without Factorisation',
    source: 'Figure It Out • Pages 16-17, Q4',
    statement: 'Guess the cube roots of 1331, 4913, 12167, and 32768 without factorisation using tens-range and last-digit rules.',
    predictionOptions: [
      '11, 17, 23, 32',
      '11, 13, 27, 34',
      '11, 19, 21, 38',
      '13, 17, 23, 36'
    ],
    correctOptionIndex: 0,
    answer: '∛1331 = 11, ∛4913 = 17, ∛12167 = 23, ∛32768 = 32.',
    answerLatex: '\\sqrt[3]{1331}=11,\\; \\sqrt[3]{4913}=17,\\; \\sqrt[3]{12167}=23,\\; \\sqrt[3]{32768}=32',
    steps: [
      {
        title: 'Step 1: Unique last digits of cubes',
        explanation: 'Cubes map uniquely: 1→1, 2→8, 3→7, 4→4, 5→5, 6→6, 7→3, 8→2, 9→9, 0→0.'
      },
      {
        title: '1331 and 4913',
        latex: '10^3 = 1000 < 1331, 4913 < 8000 = 20^3',
        explanation: 'Both lie in teens (10–20). 1331 ends in 1 → 11. 4913 ends in 3 → base ends in 7 → 17.'
      },
      {
        title: '12167 and 32768',
        latex: '20^3 = 8000 < 12167 < 27000 = 30^3;\\quad 30^3 < 32768 < 40^3 = 64000',
        explanation: '12167 ends in 7 → base ends in 3 → 23. 32768 ends in 8 → base ends in 2 → 32.'
      }
    ],
    keyRule: 'The last digit of a cube uniquely determines the last digit of its cube root.',
    difficulty: 'Medium'
  },
  {
    id: 'fio-14',
    category: 'ncert-unsolved',
    topic: 'Patterns & Puzzles',
    title: 'Which Difference is the Greatest?',
    source: 'Figure It Out • Pages 16-17, Q5',
    statement: 'Which of the following is the greatest? Explain your reasoning.\n(i) 67³ - 66³\n(ii) 43³ - 42³\n(iii) 67² - 66²\n(iv) 43² - 42²',
    predictionOptions: [
      '(i) 67³ - 66³',
      '(ii) 43³ - 42³',
      '(iii) 67² - 66²',
      '(iv) 43² - 42²'
    ],
    correctOptionIndex: 0,
    answer: '(i) 67³ - 66³ is the greatest (value = 13267).',
    answerLatex: '67^3 - 66^3 = 13267 > 5419 > 133 > 85',
    steps: [
      {
        title: 'Evaluate square differences (iii) and (iv)',
        latex: 'a^2 - b^2 = (a-b)(a+b) = a+b',
        explanation: '67² - 66² = 67 + 66 = 133. 43² - 42² = 43 + 42 = 85.'
      },
      {
        title: 'Evaluate cube difference (ii)',
        latex: '43^3 - 42^3 = 43^2 + (43 \\times 42) + 42^2 = 1849 + 1806 + 1764 = 5419',
        explanation: 'Since a - b = 1, a³ - b³ = a² + ab + b².'
      },
      {
        title: 'Evaluate cube difference (i)',
        latex: '67^3 - 66^3 = 67^2 + (67 \\times 66) + 66^2 = 4489 + 4422 + 4356 = 13267',
        explanation: '13267 is by far the largest value among all four.'
      }
    ],
    keyRule: 'Consecutive cube differences grow rapidly as the base numbers increase.',
    difficulty: 'Challenging'
  },

  // =========================================================================
  // 2. SOLVED EXAMPLES (TEXTBOOK WORKED EXAMPLES)
  // =========================================================================
  {
    id: 'ex-1',
    category: 'solved-examples',
    topic: 'Squares',
    title: 'Area of Squares with Fraction or Decimal Sides',
    source: 'NCERT Example • Page 3',
    statement: 'Can we have a square of sidelength 3/5 or 2.5 units? Find their areas in square units.',
    answer: 'Yes! Area of (3/5) is 9/25 sq units, and area of (2.5) is 6.25 sq units.',
    answerLatex: '(3/5)^2 = 9/25,\\quad (2.5)^2 = 6.25',
    steps: [
      {
        title: 'Square of a fraction',
        latex: '\\left(\\frac{3}{5}\\right)^2 = \\frac{3}{5} \\times \\frac{3}{5} = \\frac{9}{25}',
        explanation: 'Multiply numerator by numerator and denominator by denominator.'
      },
      {
        title: 'Square of a decimal',
        latex: '(2.5)^2 = 2.5 \\times 2.5 = 6.25',
        explanation: 'Two decimal places in total.'
      }
    ],
    keyRule: 'Squares of natural numbers are called perfect squares.',
    difficulty: 'Easy'
  },
  {
    id: 'ex-2',
    category: 'solved-examples',
    topic: 'Squares',
    title: 'Find 36² from 35² = 1225',
    source: 'NCERT Example • Page 6',
    statement: 'Given that 35² = 1225, find 36² using the consecutive odd numbers pattern.',
    answer: '36² = 1225 + 71 = 1296.',
    answerLatex: '36^2 = 1296',
    steps: [
      {
        title: 'Identify the 36th odd number',
        latex: '2n - 1 = 2(36) - 1 = 72 - 1 = 71',
        explanation: 'The nth odd number is given by 2n - 1.'
      },
      {
        title: 'Add to the previous sum',
        latex: '36^2 = 35^2 + 71 = 1225 + 71 = 1296',
        explanation: 'Adding the 36th odd number produces 36².'
      }
    ],
    keyRule: 'The sum of the first n odd numbers is n².',
    difficulty: 'Easy'
  },
  {
    id: 'ex-3',
    category: 'solved-examples',
    topic: 'Squares',
    title: 'Repeated Subtraction Test: 25 vs 38',
    source: 'NCERT Example • Page 6',
    statement: 'Test whether 25 and 38 are perfect squares by successively subtracting consecutive odd numbers starting from 1.',
    answer: '25 reaches 0 after 5 steps (so 25 = 5²). 38 skips 0 (reaches 2 then -11), so 38 is NOT a square.',
    steps: [
      {
        title: 'Testing 25',
        latex: '25 - 1 = 24;\\; 24 - 3 = 21;\\; 21 - 5 = 16;\\; 16 - 7 = 9;\\; 9 - 9 = 0',
        explanation: 'Reaches exactly 0 in 5 steps! Thus 25 = 5².'
      },
      {
        title: 'Testing 38',
        latex: '38 - 1 = 37 \\to 34 \\to 29 \\to 22 \\to 13 \\to 2;\\quad 2 - 13 = -11',
        explanation: 'It jumps from 2 straight to -11, never hitting 0. Thus 38 is not a perfect square.'
      }
    ],
    keyRule: 'A natural number is a square if and only if repeatedly subtracting consecutive odds reaches 0.',
    difficulty: 'Medium'
  },
  {
    id: 'ex-4',
    category: 'solved-examples',
    topic: 'Square Roots',
    title: 'Square Roots and Plus-Minus Roots',
    source: 'NCERT Example • Page 8',
    statement: 'What are the square roots of 64 and 100? Why does every perfect square have two roots?',
    answer: '√64 = ±8 and √100 = ±10.',
    answerLatex: '\\sqrt{64} = \\pm 8,\\quad \\sqrt{100} = \\pm 10',
    steps: [
      {
        title: 'Check positive root',
        latex: '(+8) \\times (+8) = 64',
        explanation: 'Positive 8 squared is 64.'
      },
      {
        title: 'Check negative root',
        latex: '(-8) \\times (-8) = 64',
        explanation: 'Negative times negative is positive, so (-8)² is also 64!'
      },
      {
        title: 'Convention',
        explanation: 'Every positive number has two real square roots (±). By convention in Class 8, the symbol √ denotes the positive square root.'
      }
    ],
    keyRule: 'Every perfect square has two integer square roots: one positive and one negative.',
    difficulty: 'Easy'
  },
  {
    id: 'ex-5',
    category: 'solved-examples',
    topic: 'Squares',
    title: 'Testing Squareness: 576 vs 327',
    source: 'NCERT Example • Page 8',
    statement: 'Given 576 and 327, how do we determine if either is a perfect square?',
    answer: '327 can NEVER be a square because it ends in 7. 576 ends in 6 and equals 24².',
    answerLatex: '24^2 = 576',
    steps: [
      {
        title: 'Check last digits',
        explanation: '327 ends in 7. Since no square ends in 2, 3, 7, or 8, 327 is immediately ruled out.'
      },
      {
        title: 'Examine 576',
        explanation: '576 ends in 6, which is allowed (base ending in 4 or 6). 20² = 400 and 30² = 900.'
      },
      {
        title: 'Testing candidates 24 or 26',
        latex: '24 \\times 24 = 576',
        explanation: '24² = 576, so 576 is a perfect square with square root 24.'
      }
    ],
    keyRule: 'Last digit eliminates non-squares, but cannot prove a number is a square.',
    difficulty: 'Easy'
  },
  {
    id: 'ex-6',
    category: 'solved-examples',
    topic: 'Square Roots',
    title: 'Prime Factorisation: 324 vs 156',
    source: 'NCERT Example • Page 9',
    statement: 'Use prime factorisation to check whether 324 and 156 are perfect squares.',
    answer: '324 is a perfect square (√324 = 18). 156 is not a perfect square.',
    answerLatex: '\\sqrt{324} = 18',
    steps: [
      {
        title: 'Factorise 324',
        latex: '324 = 2 \\times 2 \\times 3 \\times 3 \\times 3 \\times 3 = (2 \\times 2) \\times (3 \\times 3) \\times (3 \\times 3)',
        explanation: 'Factors divide into two identical groups: (2 × 3 × 3) × (2 × 3 × 3) = 18².'
      },
      {
        title: 'Factorise 156',
        latex: '156 = 2 \\times 2 \\times 3 \\times 13',
        explanation: '3 and 13 have no pairs. Therefore 156 cannot be a square.'
      }
    ],
    keyRule: 'A number is a perfect square if prime factors can be split into two identical groups.',
    difficulty: 'Medium'
  },
  {
    id: 'ex-7',
    category: 'solved-examples',
    topic: 'Square Roots',
    title: 'Checking 1156 and 2800',
    source: 'NCERT Example • Page 9',
    statement: 'Find whether 1156 and 2800 are perfect squares using prime factorisation.',
    answer: '1156 is a perfect square (34²). 2800 is NOT a square (prime 7 is unpaired).',
    answerLatex: '\\sqrt{1156} = 34',
    steps: [
      {
        title: 'Factorise 1156',
        latex: '1156 = 2 \\times 2 \\times 17 \\times 17 = 2^2 \\times 17^2 = (2 \\times 17)^2 = 34^2',
        explanation: 'All prime factors occur in pairs, so √1156 = 34.'
      },
      {
        title: 'Factorise 2800',
        latex: '2800 = 2^4 \\times 5^2 \\times 7^1',
        explanation: '7 appears with power 1 (unpaired). So 2800 is not a perfect square.'
      }
    ],
    keyRule: 'Every prime exponent in a perfect square must be even.',
    difficulty: 'Medium'
  },
  {
    id: 'ex-8',
    category: 'solved-examples',
    topic: 'Square Roots',
    title: 'Estimating Square Root of 1936',
    source: 'NCERT Example • Page 9',
    statement: 'Estimate and determine the square root of 1936.',
    answer: '√1936 = 44.',
    answerLatex: '\\sqrt{1936} = 44',
    steps: [
      {
        title: 'Step 1: Tens bracket',
        latex: '40^2 = 1600 < 1936 < 2500 = 50^2',
        explanation: 'So the square root is between 40 and 50.'
      },
      {
        title: 'Step 2: Units digit candidate',
        explanation: '1936 ends in 6, so candidate roots are 44 or 46.'
      },
      {
        title: 'Step 3: Midpoint test 45²',
        latex: '45^2 = (40+5)^2 = 1600 + 400 + 25 = 2025',
        explanation: 'Since 1936 < 2025, the root must be less than 45, which leaves 44!'
      },
      {
        title: 'Verify 44²',
        latex: '44 \\times 44 = 1936',
        explanation: 'Confirmed! √1936 = 44.'
      }
    ],
    keyRule: 'Use midpoint 45² to halve the candidate range.',
    difficulty: 'Medium'
  },
  {
    id: 'ex-9',
    category: 'solved-examples',
    topic: 'Square Roots',
    title: 'Aribam and Bijou: Estimating √250',
    source: 'NCERT Example • Page 10',
    statement: 'Aribam asks Bijou for a number close to √250. How does Bijou estimate it?',
    answer: '√250 is approximately 15.8 (just below 16).',
    answerLatex: '15 < \\sqrt{250} < 16',
    steps: [
      {
        title: 'Nearest perfect squares',
        latex: '15^2 = 225,\\quad 16^2 = 256',
        explanation: '250 lies between 225 and 256.'
      },
      {
        title: 'Compare distances',
        latex: '250 - 225 = 25,\\quad 256 - 250 = 6',
        explanation: '250 is much closer to 256 than to 225.'
      },
      {
        title: 'Conclusion',
        explanation: '√250 is very close to 16, but slightly less than 16 (approx 15.81).'
      }
    ],
    keyRule: 'Estimate non-square roots by finding the two nearest surrounding perfect squares.',
    difficulty: 'Easy'
  },
  {
    id: 'ex-10',
    category: 'solved-examples',
    topic: 'Square Roots',
    title: "Akhil's Square Cloth of Area 125 cm²",
    source: 'NCERT Example • Page 10',
    statement: 'Akhil has a cloth of 125 cm². Can he cut a 15 cm square handkerchief? What is the maximum integer side handkerchief he can cut?',
    answer: 'No, he cannot cut a 15 cm handkerchief (requires 225 cm²). The maximum integer side length is 11 cm.',
    steps: [
      {
        title: 'Check 15 cm requirement',
        latex: '15 \\times 15 = 225\\text{ cm}^2 > 125\\text{ cm}^2',
        explanation: 'A 15 cm handkerchief needs 225 cm², which exceeds 125 cm².'
      },
      {
        title: 'Find nearest perfect squares to 125',
        latex: '11^2 = 121 \\le 125 < 12^2 = 144',
        explanation: '121 cm² fits inside 125 cm², but 144 cm² does not.'
      },
      {
        title: 'Result',
        explanation: 'The maximum integer side handkerchief that can be cut is 11 cm.'
      }
    ],
    keyRule: 'Side length is bounded by the largest perfect square ≤ available area.',
    difficulty: 'Medium'
  },
  {
    id: 'ex-11',
    category: 'solved-examples',
    topic: 'Cubes',
    title: 'Unit Cubes in an Edge-4 Cube',
    source: 'NCERT Example • Page 12',
    statement: 'How many 1 cm unit cubes make a cube of side 4 cm?',
    answer: '64 unit cubes (4 layers of 16).',
    answerLatex: '4^3 = 4 \\times 4 \\times 4 = 64',
    steps: [
      {
        title: 'Count cubes per layer',
        latex: '4 \\times 4 = 16\\text{ unit cubes per layer}',
        explanation: 'Each horizontal slice is a 4 by 4 square layer.'
      },
      {
        title: 'Multiply by height (4 layers)',
        latex: '16 \\times 4 = 64\\text{ unit cubes}',
        explanation: '4 layers of 16 give 64 unit cubes in total.'
      }
    ],
    keyRule: 'Volume of cube = edge³.',
    difficulty: 'Easy'
  },
  {
    id: 'ex-12',
    category: 'solved-examples',
    topic: 'Cube Roots',
    title: 'Testing Cubes: 3375 vs 500',
    source: 'NCERT Example • Page 14',
    statement: 'Use prime factorisation to check whether 3375 and 500 are perfect cubes.',
    answer: '3375 is a perfect cube (15³). 500 is NOT a cube (2 appears only twice).',
    answerLatex: '\\sqrt[3]{3375} = 15',
    steps: [
      {
        title: 'Factorise 3375',
        latex: '3375 = (3 \\times 3 \\times 3) \\times (5 \\times 5 \\times 5) = 3^3 \\times 5^3 = (3 \\times 5)^3 = 15^3',
        explanation: 'Factors form two complete triplets of 3s and 5s, giving 15³.'
      },
      {
        title: 'Factorise 500',
        latex: '500 = 2 \\times 2 \\times 5 \\times 5 \\times 5 = 2^2 \\times 5^3',
        explanation: '5 forms a triplet, but 2 has only power 2. Hence 500 is not a perfect cube.'
      }
    ],
    keyRule: 'A number is a perfect cube if all prime factors can be split into three identical groups.',
    difficulty: 'Medium'
  },
  {
    id: 'ex-13',
    category: 'solved-examples',
    topic: 'Cubes',
    title: 'Prime Factorisation of Cubes (4, 6, 12, 15)',
    source: 'NCERT Example • Page 15',
    statement: 'Compare the prime factorisation of 4, 6, 12, 15 with their cubes.',
    answer: 'Each prime factor appears exactly 3 times as many times in the cube.',
    steps: [
      {
        title: '4 and 4³',
        latex: '4 = 2^2 \\implies 4^3 = 64 = 2^6 = (2^2)^3',
        explanation: 'Exponent 2 multiplies by 3 to become 6.'
      },
      {
        title: '6 and 6³',
        latex: '6 = 2 \\times 3 \\implies 6^3 = 216 = 2^3 \\times 3^3',
        explanation: 'Both 2 and 3 get cubed.'
      },
      {
        title: '12 and 12³',
        latex: '12 = 2^2 \\times 3 \\implies 12^3 = 1728 = 2^6 \\times 3^3',
        explanation: 'Exponents are multiples of 3.'
      }
    ],
    keyRule: 'Each prime factor in a number appears 3 times as often in its cube.',
    difficulty: 'Easy'
  },
  {
    id: 'ex-14',
    category: 'solved-examples',
    topic: 'Cube Roots',
    title: 'Cube Roots of 64, 512, and 729',
    source: 'NCERT Example • Page 15',
    statement: 'Find the cube roots of (i) 64, (ii) 512, and (iii) 729.',
    answer: '∛64 = 4, ∛512 = 8, and ∛729 = 9.',
    answerLatex: '\\sqrt[3]{64}=4,\\quad \\sqrt[3]{512}=8,\\quad \\sqrt[3]{729}=9',
    steps: [
      {
        title: '∛64',
        latex: '4 \\times 4 \\times 4 = 64 \\implies \\sqrt[3]{64} = 4',
        explanation: '4 cubed is 64.'
      },
      {
        title: '∛512',
        latex: '8 \\times 8 \\times 8 = 512 \\implies \\sqrt[3]{512} = 8',
        explanation: '8 cubed is 512.'
      },
      {
        title: '∛729',
        latex: '9 \\times 9 \\times 9 = 729 \\implies \\sqrt[3]{729} = 9',
        explanation: '9 cubed is 729.'
      }
    ],
    keyRule: '∛(n³) = n.',
    difficulty: 'Easy'
  },
  {
    id: 'ex-15',
    category: 'solved-examples',
    topic: 'Patterns & Puzzles',
    title: 'Triangular Numbers Sum to Squares',
    source: 'NCERT Example • Page 7',
    statement: 'How do consecutive triangular numbers (1, 3, 6, 10, 15) form square numbers?',
    answer: 'Adding any two consecutive triangular numbers always produces a square number: 1+3=4, 3+6=9, 6+10=16, 10+15=25.',
    answerLatex: 'T_{n-1} + T_n = n^2',
    steps: [
      {
        title: 'First pairs',
        latex: '1 + 3 = 4 = 2^2;\\quad 3 + 6 = 9 = 3^2',
        explanation: '1 and 3 make 2², 3 and 6 make 3².'
      },
      {
        title: 'Next pairs',
        latex: '6 + 10 = 16 = 4^2;\\quad 10 + 15 = 25 = 5^2',
        explanation: '6 and 10 make 4², 10 and 15 make 5².'
      },
      {
        title: 'Visual reason',
        explanation: 'Two triangular dot arrangements slide together along their diagonals to form a perfect square grid!'
      }
    ],
    keyRule: 'The sum of two consecutive triangular numbers is a square number.',
    difficulty: 'Easy'
  },
  {
    id: 'ex-16',
    category: 'solved-examples',
    topic: 'Patterns & Puzzles',
    title: 'Successive Differences of Cubes',
    source: 'NCERT Example • Page 15',
    statement: 'Compute successive differences across levels for perfect cubes (1, 8, 27, 64, 125, 216). What constant appears?',
    answer: 'At Level 3, the difference is always constant: 6!',
    steps: [
      {
        title: 'Cubes list',
        explanation: '1, 8, 27, 64, 125, 216.'
      },
      {
        title: 'Level 1 differences',
        latex: '8-1=7,\\; 27-8=19,\\; 64-27=37,\\; 125-64=61,\\; 216-125=91',
        explanation: 'Level 1: 7, 19, 37, 61, 91.'
      },
      {
        title: 'Level 2 differences',
        latex: '19-7=12,\\; 37-19=18,\\; 61-37=24,\\; 91-61=30',
        explanation: 'Level 2: 12, 18, 24, 30 (multiples of 6).'
      },
      {
        title: 'Level 3 differences',
        latex: '18-12=6,\\; 24-18=6,\\; 30-24=6',
        explanation: 'All differences at Level 3 equal 6! (Because for n³, 3! = 6).'
      }
    ],
    keyRule: 'For cubes (degree 3), the 3rd level of differences is always constant 6.',
    difficulty: 'Medium'
  },

  // =========================================================================
  // 3. CONCEPT CLEARING & IN-TEXT QUESTIONS
  // =========================================================================
  {
    id: 'cc-1',
    category: 'concept-clearing',
    topic: 'Squares',
    title: 'Does Every Number Have an Even Number of Factors?',
    source: 'NCERT Concept • Page 2',
    statement: 'Does every number have an even number of factors? Which numbers have an odd number of factors?',
    predictionOptions: [
      'Yes, all numbers have even factors',
      'No, only perfect squares have an odd number of factors',
      'No, prime numbers have odd factors',
      'No, even numbers have odd factors'
    ],
    correctOptionIndex: 1,
    answer: 'No! Only perfect square numbers have an odd number of factors.',
    steps: [
      {
        title: 'Factor partnering',
        explanation: 'Factors usually come in distinct pairs (a × b = n). For example, 6 has (1,6) and (2,3), giving 4 factors.'
      },
      {
        title: 'What makes squares special?',
        latex: 'k \\times k = n',
        explanation: 'In a square number like 36, the pair 6 × 6 pairs a number with itself, adding only ONE distinct factor.'
      },
      {
        title: 'Conclusion',
        explanation: 'Because one factor has no distinct partner, total factor count is 2p + 1 (always odd).'
      }
    ],
    keyRule: 'A number has an odd number of factors if and only if it is a perfect square.',
    difficulty: 'Easy'
  },
  {
    id: 'cc-2',
    category: 'concept-clearing',
    topic: 'Patterns & Puzzles',
    title: "Queen Ratnamanjuri's Safe Passcode",
    source: 'NCERT Story • Page 3',
    statement: 'The clue in the Queen’s safe reads: "The passcode consists of the first five locker numbers that were touched exactly twice." Which are these five lockers?',
    predictionOptions: [
      '1, 2, 3, 4, 5',
      '2, 3, 5, 7, 11',
      '1, 4, 9, 16, 25',
      '2, 4, 6, 8, 10'
    ],
    correctOptionIndex: 1,
    answer: 'The passcode is 2-3-5-7-11.',
    steps: [
      {
        title: 'Understanding "touched twice"',
        explanation: 'A locker is touched by Person k if k is a factor of that locker number.'
      },
      {
        title: 'Exactly two factors means PRIME',
        explanation: 'Numbers with exactly two factors (1 and itself) are prime numbers.'
      },
      {
        title: 'First five primes',
        explanation: 'The first five prime numbers are 2, 3, 5, 7, and 11.'
      }
    ],
    keyRule: 'Numbers with exactly two factors are prime numbers.',
    difficulty: 'Easy'
  },
  {
    id: 'cc-3',
    category: 'concept-clearing',
    topic: 'Squares',
    title: 'Which Squares End in 6?',
    source: 'NCERT In-Text • Page 5',
    statement: 'Which of the following numbers have the digit 6 in the units place?\n(i) 38²  (ii) 34²  (iii) 46²  (iv) 56²  (v) 74²  (vi) 82²',
    predictionOptions: [
      '38² and 82²',
      '34², 46², 56², 74²',
      'Only 46² and 56²',
      'All of them'
    ],
    correctOptionIndex: 1,
    answer: '34², 46², 56², and 74² all end in 6.',
    steps: [
      {
        title: 'When does a square end in 6?',
        latex: '4^2 = 16,\\quad 6^2 = 36',
        explanation: 'A square ends in 6 only if its base number ends in 4 or 6.'
      },
      {
        title: 'Check the base units digits',
        explanation: '34 (ends in 4), 46 (ends in 6), 56 (ends in 6), 74 (ends in 4) all end in 4 or 6.'
      },
      {
        title: 'Exclude 38 and 82',
        explanation: '38 ends in 8 (square ends in 4). 82 ends in 2 (square ends in 4).'
      }
    ],
    keyRule: 'A square ends in 6 if and only if the base number ends in 4 or 6.',
    difficulty: 'Easy'
  },
  {
    id: 'cc-4',
    category: 'concept-clearing',
    topic: 'Squares',
    title: 'Zeros at the End of a Square Number',
    source: 'NCERT In-Text • Page 5',
    statement: 'If a number contains 3 zeros at the end, how many zeros will its square have? Can a square have an odd number of zeros at the end?',
    predictionOptions: [
      '3 zeros; Yes, squares can have odd zeros',
      '6 zeros; No, squares always have an even number of zeros',
      '9 zeros; No',
      '5 zeros; Yes'
    ],
    correctOptionIndex: 1,
    answer: 'The square will have 6 zeros. Squares can NEVER end in an odd number of zeros.',
    answerLatex: '(10^k)^2 = 10^{2k}',
    steps: [
      {
        title: 'Power of 10 doubling',
        latex: '(a \\times 10^k)^2 = a^2 \\times 10^{2k}',
        explanation: 'When squaring, the number of trailing zeros is doubled (2k).'
      },
      {
        title: 'For 3 zeros',
        latex: 'k = 3 \\implies 2k = 6\\text{ zeros}',
        explanation: 'For example, 1000² = 1,000,000 (6 zeros).'
      },
      {
        title: 'Even count rule',
        explanation: 'Since 2k is always an even integer, a square number can never end in 1, 3, 5, or any odd count of zeros.'
      }
    ],
    keyRule: 'The number of trailing zeros in a square is always even (2k).',
    difficulty: 'Easy'
  },
  {
    id: 'cc-5',
    category: 'concept-clearing',
    topic: 'Squares',
    title: 'Parity of a Number and its Square',
    source: 'NCERT In-Text • Page 5',
    statement: 'What can you say about the parity of a number and its square?',
    predictionOptions: [
      'All squares are even',
      'All squares are odd',
      'Even numbers give even squares; odd numbers give odd squares',
      'Even numbers give odd squares'
    ],
    correctOptionIndex: 2,
    answer: 'Square of an even number is always even; square of an odd number is always odd.',
    steps: [
      {
        title: 'Even numbers',
        latex: '(2m)^2 = 4m^2 = 2(2m^2)\\text{ (even)}',
        explanation: 'Any multiple of 2 squared remains a multiple of 4 (even).'
      },
      {
        title: 'Odd numbers',
        latex: '(2m+1)^2 = 4m^2 + 4m + 1 = 2(2m^2+2m) + 1\\text{ (odd)}',
        explanation: 'Any odd number squared leaves remainder 1 when divided by 2 (odd).'
      }
    ],
    keyRule: 'Even² = Even, and Odd² = Odd.',
    difficulty: 'Easy'
  },
  {
    id: 'cc-6',
    category: 'concept-clearing',
    topic: 'Cubes',
    title: 'Can a Cube End with Exactly Two Zeros (00)?',
    source: 'NCERT In-Text • Page 13',
    statement: 'Can a perfect cube end with exactly two zeros (00)? Explain why or why not.',
    predictionOptions: [
      'Yes, like 100',
      'No, cube zeros must be a multiple of 3 (3, 6, 9...)',
      'Yes, for multiples of 20',
      'Only if the base is even'
    ],
    correctOptionIndex: 1,
    answer: 'No! The number of zeros at the end of a perfect cube must always be a multiple of 3.',
    answerLatex: '(a \\times 10^k)^3 = a^3 \\times 10^{3k}',
    steps: [
      {
        title: 'Zero tripling in cubes',
        latex: '(10^k)^3 = 10^{3k}',
        explanation: 'If a number ends with k zeros, its cube ends with 3k zeros.'
      },
      {
        title: 'Multiples of 3',
        explanation: 'Possible zero counts at the end of a cube are 0, 3, 6, 9... It can never be 1, 2, 4, or 5.'
      },
      {
        title: 'Conclusion',
        explanation: 'A cube cannot end with exactly two zeros (00). (100 is 10², not a cube).'
      }
    ],
    keyRule: 'The number of trailing zeros in a perfect cube is always a multiple of 3.',
    difficulty: 'Easy'
  },
  {
    id: 'cc-7',
    category: 'concept-clearing',
    topic: 'Cubes',
    title: 'Ramanujan Taxicab Numbers (1729, 4104, 13832)',
    source: 'NCERT Story • Page 13',
    statement: 'Explain why 1729, 4104, and 13832 are called Taxicab numbers. Express each as the sum of two positive cubes in two different ways.',
    predictionOptions: [
      'They are divisible by 17 and 29',
      'They can each be expressed as the sum of two cubes in two different ways',
      'They are prime cubes',
      'They were bus routes in Cambridge'
    ],
    correctOptionIndex: 1,
    answer: 'They can each be written as the sum of two positive cubes in two different ways.',
    steps: [
      {
        title: '1729 (Hardy-Ramanujan Number)',
        latex: '1729 = 1^3 + 12^3 = 1 + 1728 = 9^3 + 10^3 = 729 + 1000',
        explanation: 'Smallest number expressible as sum of two cubes in two ways.'
      },
      {
        title: '4104 (Second Taxicab Number)',
        latex: '4104 = 2^3 + 16^3 = 8 + 4096 = 9^3 + 15^3 = 729 + 3375',
        explanation: 'Both pairs sum to 4104.'
      },
      {
        title: '13832 (Third Taxicab Number)',
        latex: '13832 = 2^3 + 24^3 = 8 + 13824 = 18^3 + 20^3 = 5832 + 8000',
        explanation: 'Both pairs sum to 13832.'
      }
    ],
    keyRule: 'Taxicab numbers can be expressed as the sum of two positive cubes in two different ways.',
    difficulty: 'Medium'
  },
  {
    id: 'cc-8',
    category: 'concept-clearing',
    topic: 'Cubes',
    title: 'Sum of Consecutive Odds for Cubes (91 to 109)',
    source: 'NCERT In-Text • Page 14',
    statement: 'Without adding, find the sum of: 91 + 93 + 95 + 97 + 99 + 101 + 103 + 105 + 107 + 109.',
    predictionOptions: [
      '500',
      '1000 (10³)',
      '1250',
      '729 (9³)'
    ],
    correctOptionIndex: 1,
    answer: 'The sum is 10³ = 1000.',
    answerLatex: '91 + 93 + \\dots + 109 = 10^3 = 1000',
    steps: [
      {
        title: 'Pattern of odd sums for cubes',
        latex: '1 = 1^3;\\quad 3+5=2^3=8;\\quad 7+9+11=3^3=27',
        explanation: 'The cube n³ is the sum of n consecutive odd numbers.'
      },
      {
        title: 'Count the terms in the series',
        explanation: '91, 93, 95, 97, 99, 101, 103, 105, 107, 109 has exactly 10 odd numbers.'
      },
      {
        title: 'Direct result',
        latex: '10^3 = 1000',
        explanation: 'This is the 10th block of consecutive odd numbers, which sums directly to 10³ = 1000!'
      }
    ],
    keyRule: 'n³ is the sum of a specific group of n consecutive odd numbers.',
    difficulty: 'Easy'
  },
  {
    id: 'cc-9',
    category: 'concept-clearing',
    topic: 'Patterns & Puzzles',
    title: 'The Square Pairs Puzzle (1 to 17 in a Row)',
    source: 'NCERT Puzzle • Page 18',
    statement: 'Can you arrange numbers 1 to 17 without repetition in a row such that every adjacent pair adds up to a square number?',
    predictionOptions: [
      'Impossible for 1 to 17',
      'Yes, there is exactly one unique arrangement (up to reversal)',
      'There are over 100 ways',
      'Only if 17 is in the middle'
    ],
    correctOptionIndex: 1,
    answer: 'Yes! Arrangement: 16 - 9 - 7 - 2 - 14 - 11 - 5 - 4 - 12 - 13 - 3 - 6 - 10 - 15 - 1 - 8 - 17.',
    steps: [
      {
        title: 'Check end anchors (16 and 17)',
        explanation: '16 can only pair with 9 (16+9=25). 17 can only pair with 8 (17+8=25). So 16 and 17 must be the two end numbers of the row!'
      },
      {
        title: 'Step from 16 inward',
        latex: '16+9=25 \\implies 9+7=16 \\implies 7+2=9 \\implies 2+14=16',
        explanation: 'Each step is forced by available unused numbers that sum to a square (4, 9, 16, 25).'
      },
      {
        title: 'Complete sequence',
        latex: '16, 9, 7, 2, 14, 11, 5, 4, 12, 13, 3, 6, 10, 15, 1, 8, 17',
        explanation: 'Check adjacent pairs: 16+9=25, 9+7=16, 7+2=9, 2+14=16, 14+11=25, 11+5=16, 5+4=9, 4+12=16, 12+13=25, 13+3=16, 3+6=9, 6+10=16, 10+15=25, 15+1=16, 1+8=9, 8+17=25.'
      }
    ],
    keyRule: 'Every adjacent pair sums to a square: 9, 16, or 25.',
    difficulty: 'Challenging'
  },
  {
    id: 'cc-10',
    category: 'concept-clearing',
    topic: 'Patterns & Puzzles',
    title: 'Circle of Square Pairs (1 to 32)',
    source: 'NCERT Puzzle • Page 18',
    statement: 'Can you arrange the numbers 1 to 32 in a circle without repetition such that every adjacent pair adds to a square?',
    predictionOptions: [
      'No, because 32 cannot pair',
      'Yes! They form a closed Hamiltonian cycle',
      'Only if odd numbers are separated',
      'Only for numbers up to 25'
    ],
    correctOptionIndex: 1,
    answer: 'Yes! All numbers from 1 to 32 can be arranged in a continuous loop where every neighbor sums to a square.',
    steps: [
      {
        title: 'Graph of square sums',
        explanation: 'Draw a vertex for each number 1 to 32. Connect two numbers with an edge if their sum is a square (4, 9, 16, 25, 36, 49).'
      },
      {
        title: 'Degree of vertices',
        explanation: 'In the range 1..32, every vertex has degree at least 2 in the square-sum graph.'
      },
      {
        title: 'Closed circle (Cycle)',
        latex: '1-8-28-21-4-32-17-19-30-6-27-22-14-11-25-24-12-13-23-26-10-15-1-? \\dots',
        explanation: 'Because every number can connect to at least two partners, the graph forms a complete closed cycle of 32 numbers.'
      }
    ],
    keyRule: 'In a circle, each number must have at least two square-sum partners.',
    difficulty: 'Challenging'
  }
];
