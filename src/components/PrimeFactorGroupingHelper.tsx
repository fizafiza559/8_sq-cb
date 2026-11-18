/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { COLORS } from '../design/tokens';
import {
  Calculator,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Box,
  RotateCcw,
} from 'lucide-react';
import { useViewportTier } from '../hooks/useViewportTier';

export interface PrimeFactorGroupingHelperProps {
  initialNumber?: number;
  beatIndex?: number;
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
  beatIndex,
  className = '',
}) => {
  const [inputVal, setInputVal] = useState<string>(String(initialNumber));
  const [groupMode, setGroupMode] = useState<'square' | 'cube'>('cube');
  const [previousIncomplete, setPreviousIncomplete] = useState<{
    from: number;
    action: string;
  } | null>(null);
  const [compactView, setCompactView] = useState<'repair' | 'steps'>('repair');
  const { tier, isNarrow } = useViewportTier();
  const isCompact = tier === 'compact';
  const useTwoPanels = isCompact || isNarrow;

  useEffect(() => {
    if (beatIndex === undefined) return;
    setPreviousIncomplete(null);
    setGroupMode('cube');
    setInputVal(beatIndex === 0 ? '216' : '3375');
  }, [beatIndex]);

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
      className={`w-full max-w-4xl h-full max-h-full min-h-0 overflow-hidden mx-auto rounded-3xl border border-slate-200/80 bg-white ${
        isCompact ? 'p-2 gap-1.5' : 'p-3 sm:p-4 gap-2 sm:gap-2.5'
      } shadow-xs flex flex-col justify-between ${className}`}
    >
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-2 shrink-0">
        <div className="min-w-0">
          {!isCompact && (
            <span className="text-micro font-bold uppercase tracking-wider text-slate-500 hidden sm:block">
              Prime Triplets for Cubes
            </span>
          )}
          <h3 className="text-small sm:text-statement font-extrabold flex items-center gap-2 mt-0.5" style={{ color: COLORS.headingText }}>
            <Calculator className="w-4 h-4 sm:w-5 sm:h-5 text-[#005583] shrink-0" />
            <span>Group Prime Factors in Teams of {groupMode === 'square' ? 'Two' : 'Three'}</span>
          </h3>
        </div>

        {/* Group Mode Switcher */}
        <div className="flex flex-wrap items-center justify-center gap-1 p-1 rounded-xl bg-slate-100/90 w-full sm:w-auto">
          <button
            type="button"
            onClick={() => {
              setPreviousIncomplete(null);
              setGroupMode('square');
            }}
            className={`${isCompact ? 'min-h-[38px]' : 'min-h-[42px] sm:min-h-[36px]'} px-3 py-1 rounded-lg text-micro font-bold transition-all cursor-pointer ${
              groupMode === 'square'
                ? 'bg-white text-orange-600 shadow-2xs'
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
            className={`${isCompact ? 'min-h-[38px]' : 'min-h-[42px] sm:min-h-[36px]'} px-3 py-1 rounded-lg text-micro font-bold transition-all cursor-pointer ${
              groupMode === 'cube'
                ? 'bg-white text-purple-700 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Triplets of 3 (∛)
          </button>
        </div>
      </div>

      {/* Presets & Input Bar (combined compactly when compact/narrow) */}
      {useTwoPanels ? (
        <div className="flex flex-wrap items-center justify-between gap-1.5 p-2 rounded-2xl bg-slate-50/80 shrink-0">
          <div className="flex items-center gap-1.5 flex-wrap">
            {[3375, 500, 252, 9408].map((pNum) => (
              <button
                key={pNum}
                type="button"
                onClick={() => selectNumber(pNum, null)}
                className={`min-h-[38px] px-2.5 py-1 rounded-xl text-micro font-bold border transition-all cursor-pointer tabular-nums ${
                  num === pNum
                    ? 'bg-[#005583] text-white border-[#003F62]'
                    : 'bg-white text-slate-700 border-slate-200'
                }`}
              >
                {pNum}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-1.5">
            <input
              id="num-input"
              type="number"
              min={2}
              max={999999}
              value={inputVal}
              aria-label="Number to check"
              onChange={(e) => {
                setPreviousIncomplete(null);
                setInputVal(e.target.value);
              }}
              className="w-24 px-2.5 py-1 min-h-[38px] rounded-xl border bg-white text-small font-extrabold text-[#005583] outline-none border-slate-300 focus:border-[#005583]"
            />
            {previousIncomplete && (
              <button
                type="button"
                onClick={() => selectNumber(previousIncomplete.from, null)}
                className="min-h-[38px] px-2.5 py-1 rounded-xl bg-white border border-slate-300 text-micro font-bold text-slate-700 flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3 h-3 shrink-0" />
                <span>{previousIncomplete.from}</span>
              </button>
            )}
          </div>
        </div>
      ) : (
        <>
          {/* Preset Quick Chips */}
          <div className="flex items-center gap-1.5 flex-wrap shrink-0">
            <span className="text-micro font-bold text-slate-500">Examples:</span>
            {PRESET_NUMBERS.map((p) => (
              <button
                key={p.num}
                type="button"
                onClick={() => selectNumber(p.num, null)}
                className={`min-h-[34px] px-2.5 py-1 rounded-xl text-micro font-bold border transition-all cursor-pointer text-left ${
                  num === p.num
                    ? 'bg-[#005583] text-white border-[#003F62] shadow-2xs'
                    : p.num === 500 || p.num === 3375
                    ? 'bg-purple-50 text-purple-900 border-purple-200/80 hover:bg-purple-100'
                    : 'bg-slate-50 text-slate-700 border-slate-200/80 hover:bg-slate-100'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>

          {/* Manual Input Bar */}
          <div className="flex flex-wrap items-center justify-between gap-2 p-2 sm:px-3 rounded-2xl bg-slate-50/80 shrink-0">
            <div className="flex flex-wrap items-center gap-2">
              <label htmlFor="num-input" className="text-small font-bold text-slate-700">
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
                className="w-28 px-3 py-1 rounded-xl border bg-white text-body font-extrabold text-[#005583] outline-none border-slate-300 focus:border-[#005583]"
              />
            </div>

            {previousIncomplete && (
              <button
                type="button"
                onClick={() => selectNumber(previousIncomplete.from, null)}
                className="min-h-[34px] px-3 py-1 rounded-xl bg-white border border-slate-300 hover:bg-slate-100 text-micro font-bold text-slate-700 flex items-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5 shrink-0" />
                <span>Back to {previousIncomplete.from} ({previousIncomplete.action})</span>
              </button>
            )}
          </div>
        </>
      )}

      {/* Compact/Narrow View Switcher between Factors & Fix vs Division Steps */}
      {useTwoPanels && (
        <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-100 shrink-0">
          <button
            type="button"
            onClick={() => setCompactView('repair')}
            className={`flex-1 min-h-[36px] rounded-lg text-micro font-bold cursor-pointer ${
              compactView === 'repair' ? 'bg-white text-[#005583] shadow-2xs' : 'text-slate-600'
            }`}
          >
            Factors &amp; Fix
          </button>
          <button
            type="button"
            onClick={() => setCompactView('steps')}
            className={`flex-1 min-h-[36px] rounded-lg text-micro font-bold cursor-pointer ${
              compactView === 'steps' ? 'bg-white text-[#005583] shadow-2xs' : 'text-slate-600'
            }`}
          >
            Division Ladder ({steps.length})
          </button>
        </div>
      )}

      {(!useTwoPanels || compactView === 'repair') && (
        <div className="flex flex-col gap-2 flex-1 min-h-0 justify-between overflow-hidden">
          {/* Prime Factor Grouping Display */}
          <div className="flex flex-col gap-1.5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-micro sm:text-small font-extrabold" style={{ color: COLORS.headingText }}>
                Prime Factors of {num}:
              </span>
              <span
                className="text-micro font-extrabold px-2.5 py-0.5 rounded-full border text-center"
                style={{
                  backgroundColor: isAlreadyPerfect ? '#DCFCE7' : '#FEF3C7',
                  borderColor: isAlreadyPerfect ? '#86EFAC' : '#FCD34D',
                  color: isAlreadyPerfect ? '#15803D' : '#B45309',
                }}
              >
                {isAlreadyPerfect
                  ? groupMode === 'square'
                    ? 'ALL PAIRS COMPLETE!'
                    : 'ALL TRIPLETS COMPLETE!'
                  : groupMode === 'square'
                  ? 'INCOMPLETE PAIR'
                  : 'INCOMPLETE TRIPLET'}
              </span>
            </div>

            {/* Visual Boxed Groups */}
            <div className="flex items-center gap-1.5 sm:gap-2.5 flex-wrap p-2 sm:p-2.5 rounded-2xl bg-slate-50/75">
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
        <div className={`grid ${isCompact ? 'grid-cols-2' : 'grid-cols-1 sm:grid-cols-2'} gap-2`}>
          {/* Multiply Card */}
          <div className="p-2.5 sm:p-3 rounded-2xl bg-emerald-50/60 flex flex-col justify-between gap-1.5 min-w-0">
            <div className="flex flex-col gap-0.5 min-w-0">
              <div className="flex items-center gap-1.5 text-emerald-800 font-bold text-micro">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>MULTIPLY by {multiplier}</span>
              </div>
              <p className="text-micro sm:text-small text-emerald-900">
                {num} × <strong>{multiplier}</strong> = <strong>{resultingMultiplied}</strong>{' '}
                ({groupMode === 'square' ? `√` : `∛`} = <strong>{resultingMultipliedRoot}</strong>)
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
              className="min-h-[38px] w-full px-2.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-micro sm:text-small font-bold flex items-center justify-center gap-1 shadow-2xs cursor-pointer text-center"
            >
              <span>Apply × {multiplier}</span>
              <ArrowRight className="w-3.5 h-3.5 shrink-0" />
            </button>
          </div>

          {/* Divide Card */}
          <div className="p-2.5 sm:p-3 rounded-2xl bg-purple-50/60 flex flex-col justify-between gap-1.5 min-w-0">
            <div className="flex flex-col gap-0.5 min-w-0">
              <div className="flex items-center gap-1.5 text-purple-800 font-bold text-micro">
                <Sparkles className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                <span>DIVIDE by {divider}</span>
              </div>
              <p className="text-micro sm:text-small text-purple-900">
                {num} ÷ <strong>{divider}</strong> = <strong>{resultingDivided}</strong>{' '}
                ({groupMode === 'square' ? `√` : `∛`} = <strong>{resultingDividedRoot}</strong>)
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
              className="min-h-[38px] w-full px-2.5 py-1.5 rounded-xl bg-purple-700 hover:bg-purple-800 text-white text-micro sm:text-small font-bold flex items-center justify-center gap-1 shadow-2xs cursor-pointer text-center"
            >
              <span>Apply ÷ {divider}</span>
              <ArrowRight className="w-3.5 h-3.5 shrink-0" />
            </button>
          </div>
        </div>
      ) : (
        <div className="p-2.5 rounded-2xl bg-emerald-50/75 text-center space-y-0.5 animate-fade-rise">
          <div className="text-small sm:text-body font-extrabold text-emerald-900">
            One from each {groupMode === 'square' ? 'pair' : 'triplet'}:{' '}
            {Object.entries(factorCounts)
              .flatMap(([f, c]) => Array(Math.floor(c / groupSize)).fill(f))
              .join(' × ')}{' '}
            = {groupMode === 'square' ? Math.round(Math.sqrt(num)) : Math.round(Math.cbrt(num))}
          </div>
          <div className="text-statement sm:text-title font-black text-emerald-800">
            {groupMode === 'square'
              ? `√${num} = ${Math.round(Math.sqrt(num))}`
              : `∛${num} = ${Math.round(Math.cbrt(num))}`}
          </div>
        </div>
      )}
        </div>
      )}

      {/* Step-by-Step Division Ladder */}
      {(!useTwoPanels || compactView === 'steps') && (
        <div className={`p-2 sm:p-2.5 rounded-2xl bg-slate-50/80 space-y-1.5 ${useTwoPanels ? 'flex-1 min-h-0 flex flex-col justify-center' : 'shrink-0'}`}>
          <span className="text-micro font-bold text-slate-700">Prime Division Steps:</span>
          <div className="flex items-center gap-1.5 flex-wrap font-mono text-micro sm:text-small font-bold text-slate-800">
            {steps.map((st, i) => (
              <div key={i} className="flex items-center gap-1">
                <span className="px-2 py-0.5 rounded bg-white border border-slate-200/80">
                  {st.quotient} ÷ <span className="text-rose-600 font-bold">{st.divisor}</span>
                </span>
                {i < steps.length - 1 && <ArrowRight className="w-3 h-3 text-slate-400" />}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
