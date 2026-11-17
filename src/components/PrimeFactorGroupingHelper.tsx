/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { COLORS } from '../design/tokens';
import {
  Calculator,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Box,
  RotateCcw,
} from 'lucide-react';

export interface PrimeFactorGroupingHelperProps {
  initialNumber?: number;
  className?: string;
}

const PRESET_NUMBERS = [
  { num: 3375, label: '3375 (15³ = 3³ × 5³)' },
  { num: 500, label: '500 (5³ × 2² — Incomplete!)' },
  { num: 1323, label: '1323 (3³ × 7²)' },
  { num: 675, label: '675 (NCERT Cube)' },
  { num: 252, label: '252 (Multiply by 7)' },
  { num: 9408, label: '9408 (Divide by 3)' },
  { num: 17576, label: '17576 (26³)' },
];

interface FactorLadderStep {
  divisor: number;
  quotient: number;
}

function computePrimeFactorLadder(n: number): { factors: number[]; steps: FactorLadderStep[] } {
  let temp = n;
  const factors: number[] = [];
  const steps: FactorLadderStep[] = [];
  let d = 2;

  while (d * d <= temp) {
    while (temp % d === 0) {
      factors.push(d);
      steps.push({ divisor: d, quotient: temp });
      temp = Math.floor(temp / d);
    }
    d++;
  }
  if (temp > 1) {
    factors.push(temp);
    steps.push({ divisor: temp, quotient: temp });
    steps.push({ divisor: 1, quotient: 1 });
  } else if (steps.length > 0) {
    steps.push({ divisor: 1, quotient: 1 });
  }

  return { factors, steps };
}

export const PrimeFactorGroupingHelper: React.FC<PrimeFactorGroupingHelperProps> = ({
  initialNumber = 3375,
  className = '',
}) => {
  const [inputVal, setInputVal] = useState<string>(String(initialNumber));
  const [groupMode, setGroupMode] = useState<'square' | 'cube'>('cube');
  const [previousIncomplete, setPreviousIncomplete] = useState<{
    from: number;
    action: string;
  } | null>(null);

  const num = Math.max(2, Math.min(999999, parseInt(inputVal, 10) || 12));
  const { factors, steps } = computePrimeFactorLadder(num);

  // Count occurrences of each prime
  const factorCounts: Record<number, number> = {};
  factors.forEach((f) => {
    factorCounts[f] = (factorCounts[f] || 0) + 1;
  });

  const groupSize = groupMode === 'square' ? 2 : 3;

  // Compute multiplier & divider needed
  let multiplier = 1;
  let divider = 1;
  let isAlreadyPerfect = true;

  Object.entries(factorCounts).forEach(([factorStr, count]) => {
    const factor = parseInt(factorStr, 10);
    const remainder = count % groupSize;
    if (remainder !== 0) {
      isAlreadyPerfect = false;
      const neededToComplete = groupSize - remainder;
      multiplier *= Math.pow(factor, neededToComplete);
      divider *= Math.pow(factor, remainder);
    }
  });

  const resultingMultiplied = num * multiplier;
  const resultingMultipliedRoot =
    groupMode === 'square'
      ? Math.round(Math.sqrt(resultingMultiplied))
      : Math.round(Math.cbrt(resultingMultiplied));

  const resultingDivided = Math.floor(num / divider);
  const resultingDividedRoot =
    groupMode === 'square'
      ? Math.round(Math.sqrt(resultingDivided))
      : Math.round(Math.cbrt(resultingDivided));

  const selectNumber = (val: number, note: { from: number; action: string } | null = null) => {
    setPreviousIncomplete(note);
    setInputVal(String(val));
  };

  return (
    <div
      data-no-nav="true"
      className={`w-full max-w-4xl mx-auto rounded-3xl border bg-white p-5 md:p-6 shadow-xs flex flex-col gap-5 ${className}`}
      style={{ borderColor: COLORS.divider }}
    >
      {/* Header */}
      <div
        className="flex flex-wrap items-center justify-between gap-3 border-b pb-4"
        style={{ borderColor: COLORS.divider }}
      >
        <div>
          <span className="text-micro font-bold uppercase tracking-wider text-slate-500">
            Animation 9 • Prime Triplets for Cubes
          </span>
          <h3 className="text-statement font-extrabold flex items-center gap-2 mt-0.5" style={{ color: COLORS.headingText }}>
            <Calculator className="w-5 h-5 text-[#005583]" />
            <span>Group Prime Factors in Teams of Three</span>
          </h3>
        </div>

        {/* Group Mode Switcher */}
        <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-100 border border-slate-200">
          <button
            type="button"
            onClick={() => {
              setPreviousIncomplete(null);
              setGroupMode('square');
            }}
            className={`px-3 py-1.5 rounded-lg text-micro font-bold transition-all cursor-pointer whitespace-nowrap ${
              groupMode === 'square'
                ? 'bg-white text-orange-600 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Pairs of 2 (√)
          </button>
          <button
            type="button"
            onClick={() => {
              setPreviousIncomplete(null);
              setGroupMode('cube');
            }}
            className={`px-3 py-1.5 rounded-lg text-micro font-bold transition-all cursor-pointer whitespace-nowrap ${
              groupMode === 'cube'
                ? 'bg-white text-purple-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Triplets of 3 (∛)
          </button>
        </div>
      </div>

      {/* Preset Quick Chips */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-micro font-bold text-slate-500">Try Examples:</span>
        {PRESET_NUMBERS.map((p) => (
          <button
            key={p.num}
            type="button"
            onClick={() => selectNumber(p.num, null)}
            className={`min-h-[36px] px-3 py-1 rounded-xl text-micro font-bold border transition-all cursor-pointer whitespace-nowrap ${
              num === p.num
                ? 'bg-[#005583] text-white border-[#003F62] shadow-xs'
                : p.num === 500 || p.num === 3375
                ? 'bg-purple-50 text-purple-900 border-purple-200 hover:bg-purple-100'
                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Manual Input Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl border bg-slate-50 border-slate-200">
        <div className="flex items-center gap-3">
          <label htmlFor="num-input" className="text-small font-bold text-slate-700 whitespace-nowrap">
            Number to Check:
          </label>
          <input
            id="num-input"
            type="number"
            min={2}
            max={999999}
            value={inputVal}
            onChange={(e) => {
              setPreviousIncomplete(null);
              setInputVal(e.target.value);
            }}
            className="w-32 px-3 py-1.5 rounded-xl border bg-white text-statement font-extrabold text-[#005583] outline-none border-slate-300 focus:border-[#005583]"
          />
        </div>

        {previousIncomplete && (
          <button
            type="button"
            onClick={() => selectNumber(previousIncomplete.from, null)}
            className="px-3 py-1.5 rounded-xl bg-white border border-slate-300 hover:bg-slate-100 text-micro font-bold text-slate-700 flex items-center gap-1.5 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Back to {previousIncomplete.from} ({previousIncomplete.action})</span>
          </button>
        )}
      </div>

      {/* Prime Factor Grouping Display */}
      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-small font-extrabold" style={{ color: COLORS.headingText }}>
            Prime Factors of {num}:
          </span>
          <span
            className="text-micro font-extrabold px-3 py-1 rounded-full border"
            style={{
              backgroundColor: isAlreadyPerfect ? '#DCFCE7' : '#FEF3C7',
              borderColor: isAlreadyPerfect ? '#86EFAC' : '#FCD34D',
              color: isAlreadyPerfect ? '#15803D' : '#B45309',
            }}
          >
            {isAlreadyPerfect
              ? groupMode === 'square'
                ? 'ALL PAIRS COMPLETE — PERFECT SQUARE!'
                : 'ALL TRIPLETS COMPLETE — PERFECT CUBE!'
              : groupMode === 'square'
              ? 'INCOMPLETE PAIR — NOT A PERFECT SQUARE'
              : 'INCOMPLETE TRIPLET — NOT A PERFECT CUBE'}
          </span>
        </div>

        {/* Visual Boxed Groups */}
        <div className="flex items-center gap-3 flex-wrap p-4 rounded-2xl bg-slate-50/50 border border-slate-200">
          {Object.entries(factorCounts).map(([factorStr, count]) => {
            const factor = parseInt(factorStr, 10);
            const fullGroupsCount = Math.floor(count / groupSize);
            const remainder = count % groupSize;
            const groups: React.ReactNode[] = [];

            for (let g = 0; g < fullGroupsCount; g++) {
              groups.push(
                <div
                  key={`group-${factor}-${g}`}
                  className="px-3.5 py-2 rounded-2xl border-2 flex items-center gap-2 shadow-2xs transition-all animate-fade-rise"
                  style={{
                    backgroundColor: groupMode === 'square' ? COLORS.area.tint : COLORS.volume.tint,
                    borderColor: groupMode === 'square' ? COLORS.area.solid : COLORS.volume.solid,
                  }}
                >
                  {groupMode === 'cube' && (
                    <Box
                      className="w-4 h-4 shrink-0"
                      style={{ color: COLORS.volume.solid }}
                    />
                  )}
                  <span
                    className="text-body font-extrabold font-mono"
                    style={{ color: groupMode === 'square' ? COLORS.area.text : COLORS.volume.text }}
                  >
                    ({Array(groupSize).fill(factor).join(' × ')})
                  </span>
                  <CheckCircle2
                    className="w-4 h-4 shrink-0"
                    style={{ color: groupMode === 'square' ? COLORS.area.solid : COLORS.volume.solid }}
                  />
                </div>
              );
            }

            if (remainder > 0) {
              groups.push(
                <div
                  key={`incomplete-${factor}`}
                  className="px-3.5 py-2 rounded-2xl border-2 border-dashed flex items-center gap-2 bg-rose-50 border-rose-400 animate-fade-rise"
                >
                  <span className="text-body font-extrabold font-mono text-rose-800">
                    ({Array(remainder).fill(factor).join(' × ')})
                  </span>
                  <span className="text-micro font-bold px-2 py-0.5 rounded-lg bg-rose-200 text-rose-900">
                    Needs {groupSize - remainder} more {factor}
                  </span>
                </div>
              );
            }

            return (
              <div key={factor} className="flex items-center gap-2 flex-wrap">
                {groups}
              </div>
            );
          })}
        </div>
      </div>

      {/* Interactive Repair Cards when Incomplete */}
      {!isAlreadyPerfect ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Multiply Card */}
          <div className="p-4 rounded-2xl border bg-emerald-50/70 border-emerald-200 flex flex-col justify-between gap-3 shadow-2xs">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2 text-emerald-800 font-bold text-small">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span>Smallest Number to MULTIPLY:</span>
              </div>
              <div className="text-statement font-black text-emerald-950">
                Multiply by {multiplier}
              </div>
              <p className="text-small text-emerald-900">
                {num} × <strong>{multiplier}</strong> = <strong>{resultingMultiplied}</strong>{' '}
                ({groupMode === 'square' ? `√${resultingMultiplied}` : `∛${resultingMultiplied}`} ={' '}
                <strong>{resultingMultipliedRoot}</strong>)
              </p>
            </div>
            <button
              type="button"
              onClick={() =>
                selectNumber(resultingMultiplied, {
                  from: num,
                  action: `before × ${multiplier}`,
                })
              }
              className="min-h-[40px] w-full px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-small font-bold flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer"
            >
              <span>
                Make it a {groupMode} by multiplying (× {multiplier})
              </span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Divide Card */}
          <div className="p-4 rounded-2xl border bg-purple-50/70 border-purple-200 flex flex-col justify-between gap-3 shadow-2xs">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2 text-purple-800 font-bold text-small">
                <Sparkles className="w-4 h-4 text-purple-600" />
                <span>Smallest Number to DIVIDE:</span>
              </div>
              <div className="text-statement font-black text-purple-950">
                Divide by {divider}
              </div>
              <p className="text-small text-purple-900">
                {num} ÷ <strong>{divider}</strong> = <strong>{resultingDivided}</strong>{' '}
                ({groupMode === 'square' ? `√${resultingDivided}` : `∛${resultingDivided}`} ={' '}
                <strong>{resultingDividedRoot}</strong>)
              </p>
            </div>
            <button
              type="button"
              onClick={() =>
                selectNumber(resultingDivided, {
                  from: num,
                  action: `before ÷ ${divider}`,
                })
              }
              className="min-h-[40px] w-full px-4 py-2 rounded-xl bg-purple-700 hover:bg-purple-800 text-white text-small font-bold flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer"
            >
              <span>
                Make it a {groupMode} by dividing (÷ {divider})
              </span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        <div className="p-4 rounded-2xl border bg-emerald-50 border-emerald-300 text-center space-y-1 animate-fade-rise">
          <div className="text-body font-extrabold text-emerald-900">
            One from each {groupMode === 'square' ? 'pair' : 'triplet'}:{' '}
            {Object.entries(factorCounts)
              .flatMap(([f, c]) => Array(Math.floor(c / groupSize)).fill(f))
              .join(' × ')}{' '}
            = {groupMode === 'square' ? Math.round(Math.sqrt(num)) : Math.round(Math.cbrt(num))}
          </div>
          <div className="text-title font-black text-emerald-800">
            {groupMode === 'square'
              ? `√${num} = ${Math.round(Math.sqrt(num))}`
              : `∛${num} = ${Math.round(Math.cbrt(num))}`}
          </div>
        </div>
      )}

      {/* Step-by-Step Division Ladder */}
      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
        <span className="text-micro font-bold text-slate-700">Prime Division Steps:</span>
        <div className="flex items-center gap-2 flex-wrap font-mono text-small font-bold text-slate-800">
          {steps.map((st, i) => (
            <div key={i} className="flex items-center gap-1.5">
              <span className="px-2 py-0.5 rounded bg-white border border-slate-200">
                {st.quotient} ÷ <span className="text-rose-600 font-bold">{st.divisor}</span>
              </span>
              {i < steps.length - 1 && <ArrowRight className="w-3.5 h-3.5 text-slate-400" />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
