/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { Katex } from '../components/Katex';
import { lastDigitOfCube, trailingZeros } from '../math/facts';
import { Box, Sparkles, ArrowLeftRight } from 'lucide-react';
import { useViewportTier } from '../hooks/useViewportTier';

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
  const { tier, isNarrow } = useViewportTier();
  const isCompact = tier === 'compact';

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
      className={`w-full max-w-4xl h-full max-h-full min-h-0 overflow-hidden mx-auto rounded-3xl border border-slate-200/80 bg-white ${isCompact ? 'p-2 gap-1.5' : 'p-2.5 sm:p-4 gap-2 sm:gap-2.5'
        } shadow-xs flex flex-col justify-between ${className}`}
    >
      {/* Header & Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 border-b border-slate-100 pb-2 shrink-0">
        <div className="min-w-0">
          {!isCompact && (
            <span className="text-micro font-bold uppercase tracking-wider text-slate-500 hidden sm:block">
              Cube Patterns · Ending Digits &amp; Trailing Zeros
            </span>
          )}
          <h3 className="text-small sm:text-statement font-extrabold text-slate-900 mt-0.5">
            {activeTab === 'digits'
              ? 'Cubes Can End in Every Digit (0–9)'
              : 'Trailing Zeros Triple When Cubed (k → 3k)'}
          </h3>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-1 p-1 rounded-xl bg-slate-100/90 w-full sm:w-auto">
          <button
            type="button"
            onClick={() => setActiveTab('digits')}
            className={`${isCompact ? 'min-h-[38px]' : 'min-h-[42px] sm:min-h-[36px]'} px-3 py-1 rounded-lg text-micro font-bold flex items-center gap-1.5 transition-all cursor-pointer shrink-0 ${activeTab === 'digits'
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
            className={`${isCompact ? 'min-h-[38px]' : 'min-h-[42px] sm:min-h-[36px]'} px-3 py-1 rounded-lg text-micro font-bold flex items-center gap-1.5 transition-all cursor-pointer shrink-0 ${activeTab === 'zeros'
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
        <div className="flex flex-col justify-between gap-2 flex-1 min-h-0 overflow-hidden animate-fade-rise">
          {/* Interactive Digit Selector 0-9 */}
          <div className={`grid ${isCompact ? 'grid-cols-10' : 'grid-cols-5 sm:flex sm:flex-wrap'} items-center justify-center gap-1.5 sm:gap-2 mx-auto shrink-0`}>
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((d) => {
              const isSelected = selectedDigit === d;
              const swaps = [2, 3, 7, 8].includes(d);
              return (
                <button
                  key={d}
                  type="button"
                  onClick={() => setSelectedDigit(d)}
                  className={`${isCompact || isNarrow ? 'w-9 h-9 rounded-xl text-small' : 'w-10 h-10 sm:w-11 sm:h-11 rounded-2xl text-body'} font-mono font-black border-2 transition-all cursor-pointer tabular-nums mx-auto sm:mx-0 ${isSelected
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
            className={`${isCompact ? 'p-2' : 'p-2.5 sm:p-3.5'} rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-2 shrink-0 ${isSwapDigit
                ? 'bg-orange-50/70'
                : 'bg-purple-50/60'
              }`}
          >
            <div className="flex flex-col gap-0.5 min-w-0">
              <div className="flex items-center gap-2 text-micro sm:text-small font-extrabold text-slate-900">
                <ArrowLeftRight className="w-4 h-4 text-[#F27A00] shrink-0" />
                <span>
                  {isSwapDigit
                    ? `Special Swap Pair: ${selectedDigit}³ ends in ${selectedCubeLast}!`
                    : `Same Ending Digit: ${selectedDigit}³ still ends in ${selectedCubeLast}!`}
                </span>
              </div>
              {!isCompact && (
                <p className="text-micro sm:text-small text-slate-700 hidden sm:block">
                  {isSwapDigit
                    ? 'Only 2↔8 and 3↔7 swap their ending digits when cubed. Every digit 0–9 appears once!'
                    : 'For 0, 1, 4, 5, 6, and 9, the cube keeps the exact same ones digit.'}
                </p>
              )}
            </div>

            <div className="px-3 py-1.5 rounded-2xl bg-white border border-slate-200/70 font-mono text-small sm:text-statement font-black text-purple-900 shrink-0 tabular-nums text-center">
              {selectedDigit}³ = {selectedDigit * selectedDigit * selectedDigit} (ends in{' '}
              <span className="text-[#F27A00]">{selectedCubeLast}</span>)
            </div>
          </div>

          {/* 1^3 to 20^3 Reference Grid */}
          <div className={`grid ${isCompact ? 'grid-cols-10 gap-1' : 'grid-cols-4 sm:grid-cols-5 lg:grid-cols-10 gap-1 sm:gap-1.5'} flex-1 min-h-0 content-center`}>
            {cubes1to20.map(({ n, cb, last }) => {
              const matchesSelected = last === selectedCubeLast;
              const str = String(cb);
              return (
                <div
                  key={n}
                  className={`${isCompact || isNarrow ? 'p-1 rounded-lg' : 'p-1.5 rounded-xl'} border text-center transition-all tabular-nums flex flex-col justify-center ${matchesSelected
                      ? 'bg-purple-50 border-purple-400 shadow-2xs scale-[1.02]'
                      : 'bg-slate-50 border-slate-200'
                    }`}
                >
                  <div className="text-[10px] font-semibold text-slate-500 leading-tight">{n}³</div>
                  <div className="font-mono text-[11px] sm:text-small font-extrabold text-slate-900 leading-tight">
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
        <div className={`flex flex-col flex-1 min-h-0 overflow-hidden justify-center ${isCompact ? 'gap-1.5' : 'gap-2.5 sm:gap-3'} animate-fade-rise`}>
          <div className="flex flex-wrap items-center justify-center gap-1.5 shrink-0">
            {[10, 20, 50, 100, 200, 300].map((val) => (
              <button
                key={val}
                type="button"
                onClick={() => setZeroBase(val)}
                className={`${isCompact ? 'min-h-[32px] px-2.5 py-0.5 text-micro' : 'min-h-[40px] sm:min-h-[36px] px-3 sm:px-4 py-1 text-small'
                  } rounded-xl font-mono font-bold border transition-all cursor-pointer tabular-nums shrink-0 ${zeroBase === val
                    ? 'bg-purple-700 text-white border-purple-900 shadow-2xs scale-[1.03]'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-purple-50'
                  }`}
              >
                {val}³
              </button>
            ))}
          </div>

          <div className={`${isCompact || isNarrow ? 'p-2.5 gap-1.5' : 'p-3.5 sm:p-5 gap-2.5'} rounded-2xl bg-purple-50/50 flex flex-col items-center text-center`}>
            <span className="text-[11px] sm:text-micro font-bold uppercase tracking-wider text-purple-800">
              Each Ending Zero Triples
            </span>
            <div className={`font-mono ${isCompact ? 'text-statement' : 'text-title'} font-black text-slate-900 tabular-nums`}>
              {zeroBase}³ = {zeroCube.toLocaleString()}
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2 pt-0.5">
              <div className={`${isCompact ? 'px-2.5 py-1 text-micro' : 'px-3.5 py-1.5 text-small'} rounded-xl bg-white border border-purple-100 font-bold text-slate-800`}>
                Base Zeros: <span className="text-purple-700 font-black">{zeroStats.originalZeros}</span>
              </div>
              <div className={`${isCompact ? 'px-2.5 py-1 text-micro' : 'px-3.5 py-1.5 text-small'} rounded-xl bg-white border border-purple-100 font-bold text-slate-800`}>
                Cubed Zeros:{' '}
                <span className="text-[#F27A00] font-black">{zeroStats.cubeZeros}</span> (3 ×{' '}
                {zeroStats.originalZeros})
              </div>
            </div>

            {!isCompact && (
              <div className="pt-0.5 max-w-full flex flex-wrap justify-center">
                <Katex
                  latex={`${zeroBase}^3 = ${zeroCube} \\quad (${zeroStats.originalZeros} \\times 3 = ${zeroStats.cubeZeros}\\text{ zeros})`}
                  displayMode={false}
                />
              </div>
            )}

            {/* NCERT Question: Can a cube end in 00? */}
            <div className="w-full p-2 rounded-xl bg-white border border-purple-200 text-center text-micro font-bold text-purple-950 mt-1">
              ❓ <strong>Can a cube end with exactly two zeroes (00)?</strong><br />
              <span className="text-purple-700">NO!</span> Because ending zeros triple when cubed (k → 3k), a cube can only end in <strong>3, 6, 9... zeros</strong>. Never exactly 2 zeros!
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
