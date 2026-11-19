/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Katex } from './Katex';
import {
  CheckCircle2,
  XCircle,
  Sparkles,
  Lock,
  Unlock,
  Box,
  Layers,
  ArrowRight,
  Info,
} from 'lucide-react';

interface QuickCheckVisualizerProps {
  sceneId: string;
  questionIndex: number;
  stepRevealed: number;
  totalSteps: number;
}

export const QuickCheckVisualizer: React.FC<QuickCheckVisualizerProps> = ({
  sceneId,
  questionIndex,
  stepRevealed,
}) => {
  // Locker inspection state for scene-0
  const [inspectedLocker, setInspectedLocker] = useState<number | null>(null);

  // ---------------------------------------------------------------------------
  // SCENE 0: THE LOCKER PUZZLE
  // Q0: Which lockers stay open? (Perfect square numbers)
  // ---------------------------------------------------------------------------
  if (sceneId === 'scene-0') {
    const lockers = Array.from({ length: 16 }, (_, i) => i + 1);
    const squares = [1, 4, 9, 16];

    const getFactors = (n: number) => {
      const factors: number[] = [];
      for (let i = 1; i <= n; i++) {
        if (n % i === 0) factors.push(i);
      }
      return factors;
    };

    const activeLocker = inspectedLocker ?? 16;
    const activeFactors = getFactors(activeLocker);
    const isOddCount = activeFactors.length % 2 !== 0;

    return (
      <div className="w-full flex flex-col items-center justify-center gap-1.5 py-1 text-center select-none">
        <div className="flex items-center justify-between w-full px-1 text-micro font-bold text-slate-700">
          <span className="flex items-center gap-1">
            <Layers className="w-3.5 h-3.5 text-[#005583]" />
            <span>Lockers 1 to 16 (Tap any locker to inspect):</span>
          </span>
          <span className="text-emerald-700 font-extrabold">
            {stepRevealed > 1 ? 'Open = Perfect Squares!' : 'Counting Factors...'}
          </span>
        </div>

        {/* 16 Lockers Grid */}
        <div className="grid grid-cols-8 gap-1 w-full max-w-sm sm:max-w-md mx-auto">
          {lockers.map((num) => {
            const isSquare = squares.includes(num);
            const isSelected = inspectedLocker === num;
            return (
              <button
                key={num}
                type="button"
                onClick={() => setInspectedLocker(num)}
                className={`flex flex-col items-center justify-center py-1 rounded-lg border text-[11px] font-extrabold cursor-pointer transition-all duration-200 ${
                  isSquare
                    ? 'bg-emerald-500 text-white border-emerald-600 shadow-xs ring-1 ring-emerald-300'
                    : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'
                } ${isSelected ? 'scale-110 ring-2 ring-sky-500 z-10' : ''}`}
              >
                <div className="flex items-center gap-0.5">
                  {isSquare ? <Unlock className="w-2.5 h-2.5" /> : <Lock className="w-2.5 h-2.5" />}
                  <span>{num}</span>
                </div>
                <span className="text-[8px] uppercase tracking-tighter">
                  {isSquare ? 'Open' : 'Shut'}
                </span>
              </button>
            );
          })}
        </div>

        {/* Factor Inspector Box */}
        <div className="w-full max-w-md px-2.5 py-1 rounded-xl bg-sky-50 border border-sky-200 text-micro flex items-center justify-between gap-2 text-slate-700">
          <div className="text-left">
            <strong className="text-[#005583]">Locker {activeLocker}:</strong> factors are [
            {activeFactors.join(', ')}] ({activeFactors.length}{' '}
            {activeFactors.length === 1 ? 'factor' : 'factors'} →{' '}
            <span className={isOddCount ? 'text-emerald-700 font-bold' : 'text-slate-600 font-bold'}>
              {isOddCount ? 'Odd Count' : 'Even Count'}
            </span>
            )
          </div>
          <span
            className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase shrink-0 ${
              isOddCount
                ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                : 'bg-slate-200 text-slate-700'
            }`}
          >
            {isOddCount ? 'Stays Open' : 'Closed'}
          </span>
        </div>
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // SCENE 1: FACTOR PARTNERS
  // Q0: How many factors does 36 have? (9)
  // ---------------------------------------------------------------------------
  if (sceneId === 'scene-1') {
    const pairs = [
      { a: 1, b: 36 },
      { a: 2, b: 18 },
      { a: 3, b: 12 },
      { a: 4, b: 9 },
    ];
    return (
      <div className="w-full flex flex-col items-center justify-center gap-1.5 py-1 text-center select-none">
        <div className="text-micro font-bold text-slate-700 flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-[#005583]" />
          <span>Factor Pairs of 36:</span>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-1.5 max-w-md">
          {pairs.map((p, idx) => (
            <div
              key={idx}
              className="px-2 py-1 rounded-lg bg-sky-50 border border-sky-200 text-micro font-bold text-sky-950 shadow-2xs"
            >
              {p.a} × {p.b} <span className="text-slate-500 font-normal">→ 2 factors</span>
            </div>
          ))}
          {/* Square partner */}
          <div className="px-2.5 py-1 rounded-lg bg-amber-500 text-white font-extrabold border border-amber-600 shadow-xs ring-2 ring-amber-300 text-micro animate-pulse">
            6 × 6 → 1 lone factor!
          </div>
        </div>

        <div className="text-micro font-bold text-slate-800 pt-0.5">
          <Katex latex="4 \text{ pairs } (8 \text{ factors}) + 1 \text{ lone partner (6)} = 9 \text{ total factors}" />
        </div>
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // SCENE 2: SQUARES AS AREAS
  // Q0: Area of square with side 8 units? (64)
  // ---------------------------------------------------------------------------
  if (sceneId === 'scene-2') {
    return (
      <div className="w-full flex flex-col items-center justify-center gap-1.5 py-1 text-center select-none">
        <div className="flex items-center gap-4">
          <div className="relative w-24 h-24 sm:w-26 sm:h-26 bg-emerald-50 border-2 border-emerald-600 rounded-xl flex items-center justify-center shadow-xs overflow-hidden">
            <div className="absolute inset-0 grid grid-cols-8 grid-rows-8 divide-x divide-y divide-emerald-200/90">
              {Array.from({ length: 64 }).map((_, i) => (
                <div key={i} className="hover:bg-emerald-300 transition-colors" />
              ))}
            </div>
            <div className="relative z-10 px-2 py-0.5 rounded-lg bg-white/95 border border-emerald-500 text-emerald-950 font-black text-micro sm:text-small shadow-xs">
              Area = 64
            </div>
          </div>

          <div className="text-left flex flex-col gap-1 text-micro sm:text-small font-bold text-slate-700">
            <span className="text-[#005583]">Side Length = 8 units</span>
            <span className="text-slate-600">8 rows of 8 unit tiles</span>
            <div className="px-2 py-1 rounded-lg bg-emerald-50 text-emerald-900 border border-emerald-200 font-mono text-micro font-extrabold">
              8 × 8 = 8² = 64 sq units
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // SCENE 3: LAST DIGITS, ZEROS AND PARITY
  // Q0: Can 3287 be a square? (No, ends in 7)
  // Q1: 300² ends in how many zeros? (4 zeros)
  // Q2: Square of odd number odd or even? (Always odd)
  // ---------------------------------------------------------------------------
  if (sceneId === 'scene-3') {
    if (questionIndex === 0) {
      return (
        <div className="w-full flex flex-col items-center justify-center gap-1.5 py-1 text-center select-none">
          <div className="flex items-center gap-2">
            <span className="text-statement sm:text-title font-mono font-black text-slate-800">
              328<span className="text-rose-600 underline decoration-wavy">7</span>
            </span>
            <span className="px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 text-micro font-bold border border-rose-300">
              Ends in 7
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 w-full max-w-sm text-micro text-left">
            <div className="p-1.5 rounded-xl bg-emerald-50 border border-emerald-200">
              <span className="font-extrabold text-emerald-800 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Possible Square Ends:
              </span>
              <div className="font-mono font-bold text-emerald-950 mt-0.5">0, 1, 4, 5, 6, 9</div>
            </div>

            <div className="p-1.5 rounded-xl bg-rose-50 border border-rose-200">
              <span className="font-extrabold text-rose-800 flex items-center gap-1">
                <XCircle className="w-3.5 h-3.5 text-rose-600" /> NEVER Ends In:
              </span>
              <div className="font-mono font-bold text-rose-950 mt-0.5">2, 3, 7, 8</div>
            </div>
          </div>

          <span className="text-micro font-bold text-rose-700">
            7 is never the last digit of any square number!
          </span>
        </div>
      );
    }

    if (questionIndex === 1) {
      return (
        <div className="w-full flex flex-col items-center justify-center gap-2 py-1 text-center select-none">
          <div className="flex items-center justify-center gap-2 font-mono text-small sm:text-statement font-bold">
            <div className="px-2.5 py-1 rounded-xl bg-slate-100 border border-slate-300">
              3<span className="text-amber-600 font-black">00</span>
              <span className="text-micro text-slate-500 block font-sans font-normal">2 zeros</span>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-400" />
            <div className="px-2.5 py-1 rounded-xl bg-amber-50 border border-amber-300 text-amber-950">
              9<span className="text-amber-600 font-black underline">0000</span>
              <span className="text-micro text-amber-700 block font-sans font-bold">4 zeros</span>
            </div>
          </div>

          <div className="px-3 py-1 rounded-xl bg-sky-50 border border-sky-200 text-micro font-bold text-slate-800">
            Zeros double on squaring: <Katex latex="2 \times 2 = 4 \text{ zeros}" />
          </div>
        </div>
      );
    }

    // questionIndex === 2: Parity
    return (
      <div className="w-full flex flex-col items-center justify-center gap-1.5 py-1 text-center select-none">
        <div className="flex items-center justify-center gap-3">
          <div className="p-2 rounded-xl bg-sky-50 border border-sky-200 text-micro font-bold text-sky-950">
            Odd × Odd = Always Odd!
          </div>
          <div className="font-mono text-micro text-slate-700">
            <div>3² = 9 (Odd)</div>
            <div>7² = 49 (Odd)</div>
            <div>11² = 121 (Odd)</div>
          </div>
        </div>
        <div className="text-micro text-slate-600">
          <Katex latex="(2k+1)^2 = 4k^2 + 4k + 1 = 2(2k^2+2k) + 1 \implies \text{Always Odd}" />
        </div>
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // SCENE 4: ODD NUMBERS MAKE SQUARES
  // Q0: Sum of first 8 odd numbers? (64)
  // Q1: 20th odd number? (39)
  // Q2: Does subtract test show 50 is square? (No, misses 0)
  // ---------------------------------------------------------------------------
  if (sceneId === 'scene-4') {
    if (questionIndex === 0) {
      return (
        <div className="w-full flex flex-col items-center justify-center gap-1.5 py-1 text-center select-none">
          <div className="text-micro font-bold text-slate-700">
            8 Consecutive Odd Numbers Sum:
          </div>
          <div className="flex flex-wrap items-center justify-center gap-1 font-mono text-micro font-bold text-sky-900">
            {[1, 3, 5, 7, 9, 11, 13, 15].map((num, i) => (
              <span key={i} className="px-1.5 py-0.5 rounded bg-sky-50 border border-sky-200">
                {num}
                {i < 7 ? ' +' : ''}
              </span>
            ))}
          </div>
          <div className="px-3 py-1 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-950 font-extrabold text-small">
            <Katex latex="\text{Sum of } n \text{ odd numbers} = n^2 = 8^2 = 64" />
          </div>
        </div>
      );
    }

    if (questionIndex === 1) {
      return (
        <div className="w-full flex flex-col items-center justify-center gap-1.5 py-1 text-center select-none">
          <div className="px-3 py-1.5 rounded-xl bg-sky-50 border border-sky-200 text-micro sm:text-small font-bold text-slate-800">
            Odd number formula: <Katex latex="\text{Term } n = 2n - 1" />
          </div>
          <div className="font-mono text-small font-extrabold text-[#005583]">
            For n = 20: 2(20) - 1 = 40 - 1 = 39
          </div>
        </div>
      );
    }

    // questionIndex === 2: Subtraction test on 50
    return (
      <div className="w-full flex flex-col items-center justify-center gap-1 py-1 text-center select-none">
        <div className="text-micro font-bold text-slate-700">
          Successive Odd Subtraction for 50:
        </div>
        <div className="flex flex-wrap items-center justify-center gap-1 text-[11px] font-mono text-slate-800">
          <span>50 - 1 = 49 →</span>
          <span>46 →</span>
          <span>41 →</span>
          <span>34 →</span>
          <span>25 →</span>
          <span>14 →</span>
          <span className="font-extrabold text-amber-700">14 - 13 = 1 →</span>
          <span className="font-black text-rose-600 bg-rose-50 px-1 rounded border border-rose-200">
            1 - 15 = -14 (&lt; 0)
          </span>
        </div>
        <span className="text-micro font-bold text-rose-700">
          It skipped 0 and turned negative! Therefore, 50 is NOT a square.
        </span>
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // SCENE 5: BETWEEN SQUARES & TRIANGULAR NUMBERS
  // Q0: Numbers between 20² and 21²? (40)
  // Q1: Neighboring triangular numbers adding to 49? (21 & 28)
  // Q2: Block holding 729? (701 to 800)
  // ---------------------------------------------------------------------------
  if (sceneId === 'scene-5') {
    if (questionIndex === 0) {
      return (
        <div className="w-full flex flex-col items-center justify-center gap-1.5 py-1 text-center select-none">
          <div className="flex items-center gap-2 font-mono text-small font-bold">
            <span className="px-2 py-0.5 rounded bg-slate-100 border">20² = 400</span>
            <span className="text-micro text-[#005583] font-sans font-bold">
              [ 40 non-squares ]
            </span>
            <span className="px-2 py-0.5 rounded bg-slate-100 border">21² = 441</span>
          </div>
          <div className="px-3 py-1 rounded-xl bg-sky-50 border border-sky-200 text-micro sm:text-small font-bold text-slate-800">
            Rule: Between <Katex latex="n^2" /> and <Katex latex="(n+1)^2" /> there are{' '}
            <Katex latex="2n = 2(20) = 40" /> non-square numbers!
          </div>
        </div>
      );
    }

    if (questionIndex === 1) {
      return (
        <div className="w-full flex flex-col items-center justify-center gap-1.5 py-1 text-center select-none">
          <div className="flex items-center gap-2 font-mono text-small font-extrabold">
            <span className="px-2.5 py-1 rounded-xl bg-amber-50 text-amber-900 border border-amber-300">
              T₆ = 21
            </span>
            <span className="text-slate-400">+</span>
            <span className="px-2.5 py-1 rounded-xl bg-emerald-50 text-emerald-900 border border-emerald-300">
              T₇ = 28
            </span>
            <span className="text-slate-400">=</span>
            <span className="px-2.5 py-1 rounded-xl bg-sky-500 text-white shadow-xs">
              49 = 7²
            </span>
          </div>
          <span className="text-micro font-bold text-slate-600">
            Any two consecutive triangular numbers zip together into a perfect square!
          </span>
        </div>
      );
    }

    // questionIndex === 2: Block of 100 for 729
    return (
      <div className="w-full flex flex-col items-center justify-center gap-1.5 py-1 text-center select-none">
        <div className="flex items-center gap-1.5 text-micro font-bold">
          <span className="px-2 py-0.5 rounded bg-slate-100 border">601–700</span>
          <span className="px-2.5 py-1 rounded-xl bg-emerald-600 text-white font-extrabold shadow-xs ring-2 ring-emerald-300">
            701 – 800 (Holds 729 = 27²)
          </span>
          <span className="px-2 py-0.5 rounded bg-slate-100 border">801–900</span>
        </div>
        <span className="text-micro text-slate-600 font-medium">
          700 &lt; 729 ≤ 800, so 729 belongs in the 701–800 block.
        </span>
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // SCENE 6: ROOTS AND PLUS-MINUS
  // Q0: Principal square root of 81? (9)
  // ---------------------------------------------------------------------------
  if (sceneId === 'scene-6') {
    return (
      <div className="w-full flex flex-col items-center justify-center gap-1.5 py-1 text-center select-none">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-small font-extrabold font-mono">
            √81 = +9
          </div>
          <div className="text-left text-micro text-slate-700">
            <div>• Radical symbol <Katex latex="\sqrt{}" /> means the <strong>positive (principal)</strong> root.</div>
            <div>• Side lengths of physical squares are always positive (+9).</div>
          </div>
        </div>
        <span className="text-micro text-slate-500">
          Note: While (-9)² = 81 algebraically, the square root notation √81 denotes +9.
        </span>
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // SCENE 7: METHODS FOR FINDING SQUARE ROOTS
  // Q0: √144 by prime factorisation (12)
  // ---------------------------------------------------------------------------
  if (sceneId === 'scene-7') {
    return (
      <div className="w-full flex flex-col items-center justify-center gap-1.5 py-1 text-center select-none">
        <div className="font-mono text-micro sm:text-small text-slate-800">
          144 = 2 × 2 × 2 × 2 × 3 × 3
        </div>
        <div className="flex items-center gap-2 font-mono text-micro font-bold">
          <span className="px-2 py-0.5 rounded bg-sky-100 text-sky-900 border border-sky-300">
            (2 × 2)
          </span>
          <span>×</span>
          <span className="px-2 py-0.5 rounded bg-sky-100 text-sky-900 border border-sky-300">
            (2 × 2)
          </span>
          <span>×</span>
          <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-300">
            (3 × 3)
          </span>
        </div>
        <div className="px-3 py-1 rounded-xl bg-emerald-50 text-emerald-900 font-extrabold text-micro sm:text-small border border-emerald-300">
          Take one factor from each pair: <Katex latex="\sqrt{144} = 2 \times 2 \times 3 = 12" />
        </div>
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // SCENE 8: ESTIMATING ROOTS
  // Q0: Between which two whole numbers does √85 lie? (9 and 10)
  // ---------------------------------------------------------------------------
  if (sceneId === 'scene-8') {
    return (
      <div className="w-full flex flex-col items-center justify-center gap-1.5 py-1 text-center select-none">
        <div className="flex items-center gap-2 font-mono text-small font-bold">
          <div className="px-2 py-1 rounded-lg bg-sky-50 border border-sky-200">
            9² = 81
          </div>
          <span className="text-slate-400">&lt;</span>
          <div className="px-2.5 py-1 rounded-lg bg-amber-500 text-white font-extrabold shadow-xs">
            85
          </div>
          <span className="text-slate-400">&lt;</span>
          <div className="px-2 py-1 rounded-lg bg-sky-50 border border-sky-200">
            10² = 100
          </div>
        </div>
        <div className="px-3 py-0.5 rounded-xl bg-slate-50 border border-slate-200 text-micro font-bold text-slate-800">
          Taking square roots: <Katex latex="9 < \sqrt{85} < 10" />
        </div>
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // SCENE 9: BUILDING CUBES
  // Q0: Volume of cube with edge 5? (125)
  // ---------------------------------------------------------------------------
  if (sceneId === 'scene-9') {
    return (
      <div className="w-full flex flex-col items-center justify-center gap-1.5 py-1 text-center select-none">
        <div className="flex items-center gap-2">
          <Box className="w-8 h-8 text-[#005583]" />
          <div className="text-left font-mono text-micro sm:text-small font-bold text-slate-800">
            <div>Edge = 5 cm</div>
            <div>Volume = 5 × 5 × 5 = 5³</div>
          </div>
        </div>
        <div className="px-3 py-1 rounded-xl bg-emerald-50 text-emerald-950 font-extrabold text-micro sm:text-small border border-emerald-300">
          5 layers of 25 unit cubes = <Katex latex="125 \text{ cm}^3" />
        </div>
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // SCENE 10: CUBE PATTERNS
  // Q0: Trailing zeros of 200³? (6)
  // ---------------------------------------------------------------------------
  if (sceneId === 'scene-10') {
    return (
      <div className="w-full flex flex-col items-center justify-center gap-1.5 py-1 text-center select-none">
        <div className="flex items-center gap-2 font-mono text-small font-bold">
          <div className="px-2.5 py-1 rounded-xl bg-slate-100 border">
            2<span className="text-amber-600 font-black">00</span>
            <span className="text-micro text-slate-500 block font-sans font-normal">2 zeros</span>
          </div>
          <ArrowRight className="w-4 h-4 text-slate-400" />
          <div className="px-2.5 py-1 rounded-xl bg-amber-50 border border-amber-300 text-amber-950">
            8<span className="text-amber-600 font-black underline">000000</span>
            <span className="text-micro text-amber-700 block font-sans font-bold">6 zeros</span>
          </div>
        </div>
        <div className="text-micro font-bold text-slate-700">
          Zeros triple on cubing: <Katex latex="2 \times 3 = 6 \text{ zeros}" />
        </div>
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // SCENE 11: TAXICAB NUMBERS
  // Q0: Two cube pairs adding to 1729? (1³+12³ and 9³+10³)
  // ---------------------------------------------------------------------------
  if (sceneId === 'scene-11') {
    return (
      <div className="w-full flex flex-col items-center justify-center gap-1.5 py-1 text-center select-none">
        <div className="px-2 py-0.5 rounded-full bg-sky-100 text-[#005583] text-micro font-extrabold">
          Ramanujan’s Taxicab Number: 1729
        </div>
        <div className="grid grid-cols-2 gap-2 text-micro font-mono font-bold w-full max-w-xs">
          <div className="p-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950">
            1³ + 12³<br />
            1 + 1728 = 1729
          </div>
          <div className="p-1.5 rounded-xl bg-sky-50 border border-sky-200 text-sky-950">
            9³ + 10³<br />
            729 + 1000 = 1729
          </div>
        </div>
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // SCENE 12: CUBES AND ODD NUMBERS
  // Q0: 4 consecutive odd numbers sum to 4³ (64)? (13+15+17+19)
  // ---------------------------------------------------------------------------
  if (sceneId === 'scene-12') {
    return (
      <div className="w-full flex flex-col items-center justify-center gap-1.5 py-1 text-center select-none">
        <div className="text-micro font-bold text-slate-600">Consecutive Odd Groups:</div>
        <div className="font-mono text-micro text-slate-500">
          <div>Row 1: 1 = 1³</div>
          <div>Row 2: 3 + 5 = 2³</div>
          <div>Row 3: 7 + 9 + 11 = 3³</div>
        </div>
        <div className="px-3 py-1 rounded-xl bg-emerald-50 border border-emerald-300 font-mono text-micro font-extrabold text-emerald-950">
          Row 4: 13 + 15 + 17 + 19 = 64 = 4³
        </div>
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // SCENE 13: CUBE ROOTS
  // Q0: Cube root of 512? (8)
  // ---------------------------------------------------------------------------
  if (sceneId === 'scene-13') {
    return (
      <div className="w-full flex flex-col items-center justify-center gap-1.5 py-1 text-center select-none">
        <div className="font-mono text-micro text-slate-700">
          512 = (2 × 2 × 2) × (2 × 2 × 2) × (2 × 2 × 2)
        </div>
        <div className="flex items-center gap-2 font-mono text-micro font-bold">
          <span className="px-2 py-0.5 rounded bg-sky-100 text-sky-900 border">Triplet 1: 2</span>
          <span className="px-2 py-0.5 rounded bg-sky-100 text-sky-900 border">Triplet 2: 2</span>
          <span className="px-2 py-0.5 rounded bg-sky-100 text-sky-900 border">Triplet 3: 2</span>
        </div>
        <div className="px-3 py-1 rounded-xl bg-emerald-50 text-emerald-950 font-extrabold text-micro sm:text-small border border-emerald-300">
          <Katex latex="\sqrt[3]{512} = 2 \times 2 \times 2 = 8" />
        </div>
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // SCENE 14: SUCCESSIVE DIFFERENCES
  // Q0: First difference between 1³ and 2³? (7)
  // ---------------------------------------------------------------------------
  if (sceneId === 'scene-14') {
    return (
      <div className="w-full flex flex-col items-center justify-center gap-1.5 py-1 text-center select-none">
        <div className="flex items-center gap-2 font-mono text-small font-bold">
          <span className="px-2 py-0.5 rounded bg-slate-100 border">1³ = 1</span>
          <ArrowRight className="w-4 h-4 text-slate-400" />
          <span className="px-2 py-0.5 rounded bg-slate-100 border">2³ = 8</span>
        </div>
        <div className="px-3 py-1 rounded-xl bg-emerald-50 border border-emerald-300 font-mono text-small font-extrabold text-emerald-950">
          Difference = 8 - 1 = 7
        </div>
        <span className="text-micro text-slate-500 font-medium">
          Formula: <Katex latex="1 + 3 \times (1 \times 2) = 1 + 6 = 7" />
        </span>
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // SCENE 15: A PINCH OF HISTORY
  // Q0: Ancient civilization with tablet approximations? (Babylonians)
  // ---------------------------------------------------------------------------
  if (sceneId === 'scene-15') {
    return (
      <div className="w-full flex flex-col items-center justify-center gap-1.5 py-1 text-center select-none">
        <div className="px-3 py-1 rounded-xl bg-amber-50 border border-amber-300 text-amber-950 text-micro font-bold">
          Clay Tablet YBC 7289 (c. 1800–1600 BCE)
        </div>
        <div className="text-micro text-slate-700 max-w-sm">
          Babylonian scribes calculated the diagonal of a square to find:
          <div className="font-mono font-bold text-slate-900 mt-0.5">
            √2 ≈ 1; 24, 51, 10 (base 60) ≈ 1.41421296
          </div>
        </div>
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // SCENE 16: CHAPTER SUMMARY
  // Q0: Operation inverse to cubing? (Cube root)
  // ---------------------------------------------------------------------------
  if (sceneId === 'scene-16') {
    return (
      <div className="w-full flex flex-col items-center justify-center gap-1.5 py-1 text-center select-none">
        <div className="flex items-center justify-center gap-2 font-mono text-small font-bold">
          <div className="px-2.5 py-1 rounded-xl bg-slate-100 border">
            x
          </div>
          <ArrowRight className="w-4 h-4 text-slate-400" />
          <div className="px-2.5 py-1 rounded-xl bg-sky-50 border border-sky-300 text-[#005583]">
            x³ (Cube)
          </div>
          <ArrowRight className="w-4 h-4 text-slate-400" />
          <div className="px-2.5 py-1 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-950 font-extrabold">
            ∛(x³) = x (Cube Root)
          </div>
        </div>
        <span className="text-micro font-bold text-slate-600">
          Cube and Cube Root undo each other, just like Square and Square Root!
        </span>
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // SCENE 17: SQUARE PAIRS
  // Q0: 8 next to 1, is sum a square? (9, Yes 3²)
  // ---------------------------------------------------------------------------
  if (sceneId === 'scene-17') {
    return (
      <div className="w-full flex flex-col items-center justify-center gap-1.5 py-1 text-center select-none">
        <div className="flex items-center gap-2 font-mono text-statement font-black">
          <span className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-xs">
            8
          </span>
          <span className="text-slate-400">+</span>
          <span className="w-10 h-10 rounded-xl bg-sky-500 text-white flex items-center justify-center shadow-xs">
            1
          </span>
          <span className="text-slate-400">=</span>
          <span className="px-3 py-1.5 rounded-xl bg-emerald-500 text-white shadow-xs">
            9 = 3²
          </span>
        </div>
        <span className="text-micro font-bold text-emerald-800">
          8 + 1 = 9 is a perfect square! This pair is a valid puzzle neighbor.
        </span>
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // SCENE 18: SOLVED EXAMPLES
  // Q0: Square root of 1764? (42)
  // ---------------------------------------------------------------------------
  if (sceneId === 'scene-18') {
    return (
      <div className="w-full flex flex-col items-center justify-center gap-1.5 py-1 text-center select-none">
        <div className="font-mono text-micro text-slate-800">
          1764 = (2 × 2) × (3 × 3) × (7 × 7)
        </div>
        <div className="flex items-center gap-2 font-mono text-micro font-bold">
          <span className="px-2 py-0.5 rounded bg-sky-100 text-sky-900 border">Pair: 2</span>
          <span>×</span>
          <span className="px-2 py-0.5 rounded bg-sky-100 text-sky-900 border">Pair: 3</span>
          <span>×</span>
          <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-900 border">Pair: 7</span>
        </div>
        <div className="px-3 py-1 rounded-xl bg-emerald-50 text-emerald-950 font-extrabold text-micro sm:text-small border border-emerald-300">
          <Katex latex="\sqrt{1764} = 2 \times 3 \times 7 = 42" />
        </div>
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // SCENE 19: UNSOLVED EXAMPLES
  // Q0: Smallest number multiplied by 1323 to make cube? (7)
  // ---------------------------------------------------------------------------
  if (sceneId === 'scene-19') {
    return (
      <div className="w-full flex flex-col items-center justify-center gap-1.5 py-1 text-center select-none">
        <div className="font-mono text-micro text-slate-800">
          1323 = (3 × 3 × 3) × (7 × 7)
        </div>
        <div className="flex items-center gap-2 font-mono text-micro font-bold">
          <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-900 border border-emerald-300">
            (3 × 3 × 3) ✓ Complete
          </span>
          <span className="px-2 py-0.5 rounded bg-rose-100 text-rose-900 border border-rose-300">
            (7 × 7 × <strong className="underline text-rose-700">?</strong>) Needs one 7!
          </span>
        </div>
        <span className="text-micro font-bold text-[#005583]">
          Multiply by 7 to complete the triplet: 1323 × 7 = 9261 = 21³
        </span>
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // SCENE 20: CONCEPT CLEARING
  // Q0: Cube root of 13824? (24)
  // ---------------------------------------------------------------------------
  if (sceneId === 'scene-20') {
    return (
      <div className="w-full flex flex-col items-center justify-center gap-1.5 py-1 text-center select-none">
        <div className="grid grid-cols-2 gap-2 text-micro text-left max-w-sm">
          <div className="p-1.5 rounded-xl bg-sky-50 border border-sky-200">
            <span className="font-bold text-[#005583]">Units digit from 824:</span>
            <div className="font-mono font-bold text-slate-800 mt-0.5">Ends in 4 → 4³ = 64 → 4</div>
          </div>
          <div className="p-1.5 rounded-xl bg-amber-50 border border-amber-200">
            <span className="font-bold text-amber-900">Tens digit from 13:</span>
            <div className="font-mono font-bold text-slate-800 mt-0.5">2³ = 8 ≤ 13 &lt; 27 → 2</div>
          </div>
        </div>
        <div className="px-3 py-1 rounded-xl bg-emerald-50 text-emerald-950 font-extrabold text-micro sm:text-small border border-emerald-300">
          <Katex latex="\sqrt[3]{13824} = 24" />
        </div>
      </div>
    );
  }

  // Fallback if no specific animation
  return (
    <div className="w-full flex items-center justify-center py-2 text-micro text-slate-500 italic">
      Step-by-step visual solution preview
    </div>
  );
};
