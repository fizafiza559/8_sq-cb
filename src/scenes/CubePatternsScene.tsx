/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { COLORS } from '../design/tokens';
import { Katex } from '../components/Katex';
import { lastDigitOfCube, trailingZeros } from '../math/facts';
import { Box, Sparkles, ArrowLeftRight } from 'lucide-react';

export interface CubePatternsSceneProps {
  beatIndex?: number;
  className?: string;
}

export const CubePatternsScene: React.FC<CubePatternsSceneProps> = ({
  beatIndex = 0,
  className = '',
}) => {
  const [activeTab, setActiveTab] = useState<'digits' | 'zeros'>('digits');
  const [selectedDigit, setSelectedDigit] = useState<number>(2);
  const [zeroBase, setZeroBase] = useState<number>(200);

  useEffect(() => {
    if (beatIndex >= 1) {
      setActiveTab('zeros');
    } else {
      setActiveTab('digits');
    }
  }, [beatIndex]);

  const cubes1to20 = useMemo(
    () =>
      Array.from({ length: 20 }, (_, i) => {
        const n = i + 1;
        const cb = n * n * n;
        return { n, cb, last: cb % 10 };
      }),
    []
  );

  const selectedCubeLast = lastDigitOfCube(selectedDigit);
  const isSwapDigit = [2, 3, 7, 8].includes(selectedDigit);
  const zeroStats = trailingZeros(zeroBase);
  const zeroCube = zeroBase * zeroBase * zeroBase;

  return (
    <div
      data-no-nav="true"
      className={`w-full max-w-4xl max-h-full overflow-y-auto no-scrollbar mx-auto rounded-3xl border border-slate-200/80 bg-white p-3 sm:p-4 shadow-xs flex flex-col gap-2.5 sm:gap-3 ${className}`}
    >
      {/* Header & Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
        <div className="min-w-0">
          <span className="text-micro font-bold uppercase tracking-wider text-slate-500">
            Cube Patterns · Ending Digits &amp; Trailing Zeros
          </span>
          <h3 className="text-statement font-extrabold text-slate-900 mt-0.5">
            {activeTab === 'digits'
              ? 'Cubes Can End in Every Digit (0–9)'
              : 'Trailing Zeros Triple When Cubed (k → 3k)'}
          </h3>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-1 p-1 rounded-xl bg-slate-100/90 w-full sm:w-auto">
          <button
            type="button"
            onClick={() => setActiveTab('digits')}
            className={`min-h-[44px] sm:min-h-[38px] px-3 py-1.5 rounded-lg text-micro font-bold flex items-center gap-1.5 transition-all cursor-pointer shrink-0 ${
              activeTab === 'digits'
                ? 'bg-white text-purple-700 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Box className="w-3.5 h-3.5 shrink-0" />
            <span>Ending Digits (0–9)</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('zeros')}
            className={`min-h-[44px] sm:min-h-[38px] px-3 py-1.5 rounded-lg text-micro font-bold flex items-center gap-1.5 transition-all cursor-pointer shrink-0 ${
              activeTab === 'zeros'
                ? 'bg-white text-purple-700 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 shrink-0" />
            <span>Trailing Zeros (×3)</span>
          </button>
        </div>
      </div>

      {/* TAB 1: CUBE ENDING DIGITS 0-9 & 1^3..20^3 TABLE */}
      {activeTab === 'digits' && (
        <div className="flex flex-col gap-3 animate-fade-rise">
          {/* Interactive Digit Selector 0-9 */}
          <div className="grid grid-cols-5 sm:flex sm:flex-wrap items-center justify-center gap-2 max-w-[280px] sm:max-w-none mx-auto">
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((d) => {
              const isSelected = selectedDigit === d;
              const swaps = [2, 3, 7, 8].includes(d);
              return (
                <button
                  key={d}
                  type="button"
                  onClick={() => setSelectedDigit(d)}
                  className={`w-11 h-11 rounded-2xl font-mono text-body font-black border-2 transition-all cursor-pointer tabular-nums mx-auto sm:mx-0 ${
                    isSelected
                      ? 'bg-purple-700 text-white border-purple-900 shadow-sm scale-105'
                      : swaps
                      ? 'bg-orange-50 text-orange-900 border-orange-200 hover:bg-orange-100'
                      : 'bg-slate-50 text-slate-700 border-slate-200/80 hover:bg-slate-100'
                  }`}
                >
                  {d}
                </button>
              );
            })}
          </div>

          {/* Swap / Same Highlight Card */}
          <div
            className={`p-3 sm:p-4 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-2.5 ${
              isSwapDigit
                ? 'bg-orange-50/70'
                : 'bg-purple-50/60'
            }`}
          >
            <div className="flex flex-col gap-1 min-w-0">
              <div className="flex items-center gap-2 text-small font-extrabold text-slate-900">
                <ArrowLeftRight className="w-4 h-4 text-[#F27A00] shrink-0" />
                <span>
                  {isSwapDigit
                    ? `Special Swap Pair: ${selectedDigit}³ ends in ${selectedCubeLast}!`
                    : `Same Ending Digit: ${selectedDigit}³ still ends in ${selectedCubeLast}!`}
                </span>
              </div>
              <p className="text-small text-slate-700">
                {isSwapDigit
                  ? 'Only 2↔8 and 3↔7 swap their ending digits when cubed. Every digit 0–9 appears once!'
                  : 'For 0, 1, 4, 5, 6, and 9, the cube keeps the exact same ones digit.'}
              </p>
            </div>

            <div className="px-3.5 py-2 rounded-2xl bg-white border border-slate-200/70 font-mono text-statement font-black text-purple-900 shrink-0 tabular-nums text-center">
              {selectedDigit}³ = {selectedDigit * selectedDigit * selectedDigit} (ends in{' '}
              <span className="text-[#F27A00]">{selectedCubeLast}</span>)
            </div>
          </div>

          {/* 1^3 to 20^3 Reference Grid */}
          <div className="grid grid-cols-4 sm:grid-cols-5 lg:grid-cols-10 gap-1.5">
            {cubes1to20.map(({ n, cb, last }) => {
              const matchesSelected = last === selectedCubeLast;
              const str = String(cb);
              return (
                <div
                  key={n}
                  className={`p-1.5 sm:p-2 rounded-xl border text-center transition-all tabular-nums ${
                    matchesSelected
                      ? 'bg-purple-50 border-purple-400 shadow-2xs scale-[1.02]'
                      : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="text-[11px] font-semibold text-slate-500">{n}³</div>
                  <div className="font-mono text-micro sm:text-small font-extrabold text-slate-900">
                    {str.slice(0, -1)}
                    <span className="text-purple-700 underline decoration-2 underline-offset-2">
                      {last}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: TRAILING ZEROS TRIPLER (k -> 3k) */}
      {activeTab === 'zeros' && (
        <div className="flex flex-col gap-3 animate-fade-rise">
          <div className="flex flex-wrap items-center justify-center gap-2">
            {[10, 20, 50, 100, 200, 300].map((val) => (
              <button
                key={val}
                type="button"
                onClick={() => setZeroBase(val)}
                className={`min-h-[44px] sm:min-h-[40px] px-3.5 sm:px-4 py-2 rounded-xl font-mono text-small font-bold border transition-all cursor-pointer tabular-nums shrink-0 ${
                  zeroBase === val
                    ? 'bg-purple-700 text-white border-purple-900 shadow-2xs scale-[1.03]'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-purple-50'
                }`}
              >
                {val}³
              </button>
            ))}
          </div>

          <div className="p-3.5 sm:p-5 rounded-2xl bg-purple-50/50 flex flex-col items-center gap-2.5 text-center">
            <span className="text-micro font-bold uppercase tracking-wider text-purple-800">
              Each Ending Zero Triples
            </span>
            <div className="font-mono text-title font-black text-slate-900 tabular-nums">
              {zeroBase}³ = {zeroCube.toLocaleString()}
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2.5 pt-1">
              <div className="px-3.5 py-2 rounded-xl bg-white border border-purple-100 text-small font-bold text-slate-800">
                Base Zeros: <span className="text-purple-700 font-black">{zeroStats.originalZeros}</span>
              </div>
              <div className="px-3.5 py-2 rounded-xl bg-white border border-purple-100 text-small font-bold text-slate-800">
                Cubed Zeros:{' '}
                <span className="text-[#F27A00] font-black">{zeroStats.cubeZeros}</span> (3 ×{' '}
                {zeroStats.originalZeros})
              </div>
            </div>

            <div className="pt-1 max-w-full flex flex-wrap justify-center">
              <Katex
                latex={`${zeroBase}^3 = ${zeroCube} \\quad (${zeroStats.originalZeros} \\times 3 = ${zeroStats.cubeZeros}\\text{ zeros})`}
                displayMode={false}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
