/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Katex } from '../components/Katex';
import { Sparkles, Grid, Box, ArrowRight } from 'lucide-react';
import { useViewportTier } from '../hooks/useViewportTier';

export interface ChapterSummarySceneProps {
  beatIndex?: number;
  onJumpToPractice?: () => void;
  onJumpToSquarePairs?: () => void;
  className?: string;
}

export const ChapterSummaryScene: React.FC<ChapterSummarySceneProps> = ({
  beatIndex = 0,
  onJumpToPractice,
  onJumpToSquarePairs,
  className = '',
}) => {
  const [n, setN] = useState<number>(3);
  const { tier, isNarrow } = useViewportTier();
  const isCompact = tier === 'compact';

  useEffect(() => {
    setN(beatIndex === 0 ? 3 : 4);
  }, [beatIndex]);

  const sq = n * n;
  const cb = n * n * n;

  return (
    <div
      data-no-nav="true"
      className={`w-full max-w-4xl h-full max-h-full min-h-0 overflow-hidden mx-auto rounded-3xl border border-slate-200/80 bg-white ${
        isCompact ? 'p-2 gap-1.5' : 'p-2.5 sm:p-4 gap-2 sm:gap-2.5'
      } shadow-xs flex flex-col justify-between ${className}`}
    >
      {/* Header & Side Selector */}
      <div className="flex flex-wrap items-center justify-between gap-1.5 border-b border-slate-100 pb-2 shrink-0">
        <div className="min-w-0">
          {!isCompact && (
            <span className="text-micro font-bold uppercase tracking-wider text-slate-500 hidden sm:block">
              Chapter Recap · Squares &amp; Cubes Side by Side
            </span>
          )}
          <h3 className="text-small sm:text-statement font-extrabold text-slate-900 mt-0.5">
            Pick Side n = {n} to Compare Area vs Volume
          </h3>
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          {[2, 3, 4, 5].map((val) => (
            <button
              key={val}
              type="button"
              onClick={() => setN(val)}
              className={`${isCompact ? 'min-h-[36px] px-2.5' : 'min-h-[40px] px-3'} py-1 rounded-xl font-mono text-micro sm:text-small font-extrabold border transition-all cursor-pointer tabular-nums shrink-0 ${
                n === val
                  ? 'bg-[#005583] text-white border-[#003F62] shadow-2xs'
                  : 'bg-slate-50 text-slate-700 border-slate-200/80 hover:bg-slate-100'
              }`}
            >
              n = {val}
            </button>
          ))}
        </div>
      </div>

      {/* 2D Square vs 3D Cube Summary Cards */}
      <div className={`grid ${isCompact ? 'grid-cols-2' : 'grid-cols-1 md:grid-cols-2'} gap-2 sm:gap-3 flex-1 min-h-0 overflow-hidden`}>
        <div className={`${isCompact || isNarrow ? 'p-2 gap-1.5' : 'p-3 sm:p-4 gap-2'} rounded-2xl bg-orange-50/50 flex flex-col justify-between min-h-0`}>
          <div className="flex items-center justify-between gap-2">
            <span className="inline-flex items-center gap-1.5 text-micro sm:text-small font-extrabold text-orange-900">
              <Grid className="w-4 h-4 text-[#F27A00] shrink-0" />
              <span>2D Square</span>
            </span>
            <span className="font-mono text-micro font-bold text-orange-800 whitespace-nowrap">
              {n} × {n} tiles
            </span>
          </div>

          <div className="p-2 rounded-2xl bg-white border border-orange-100 flex items-center justify-center flex-1 min-h-[60px]">
            <div
              className="grid gap-1"
              style={{ gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))` }}
            >
              {Array.from({ length: sq }).map((_, idx) => (
                <div
                  key={idx}
                  className={`${isCompact || isNarrow ? 'w-3 h-3' : 'w-4 h-4 sm:w-5 sm:h-5'} rounded-sm sm:rounded-md bg-orange-200 border border-[#F27A00]`}
                />
              ))}
            </div>
          </div>

          <div className="text-center max-w-full flex flex-wrap justify-center">
            <Katex
              latex={`${n}^2 = ${sq} \\iff \\sqrt{${sq}} = ${n}`}
              displayMode={false}
            />
          </div>
          {!isCompact && (
            <p className="text-micro text-slate-700 text-center hidden sm:block">
              Odd number of factors · Ends only in 0, 1, 4, 5, 6, 9
            </p>
          )}
        </div>

        <div className={`${isCompact || isNarrow ? 'p-2 gap-1.5' : 'p-3 sm:p-4 gap-2'} rounded-2xl bg-purple-50/50 flex flex-col justify-between min-h-0`}>
          <div className="flex items-center justify-between gap-2">
            <span className="inline-flex items-center gap-1.5 text-micro sm:text-small font-extrabold text-purple-900">
              <Box className="w-4 h-4 text-purple-700 shrink-0" />
              <span>3D Cube</span>
            </span>
            <span className="font-mono text-micro font-bold text-purple-800 whitespace-nowrap">
              {n} × {n} × {n} cubes
            </span>
          </div>

          <div className="p-2 rounded-2xl bg-white border border-purple-100 flex items-center justify-center flex-1 min-h-[60px]">
            <div className="flex flex-col items-center gap-0.5">
              <div className="font-mono text-statement sm:text-headline font-black text-purple-800 tabular-nums">
                {cb}
              </div>
              <span className="text-[11px] sm:text-micro font-bold text-slate-500 text-center">
                {n} layers of {sq} cubes
              </span>
            </div>
          </div>

          <div className="text-center max-w-full flex flex-wrap justify-center">
            <Katex
              latex={`${n}^3 = ${cb} \\iff \\sqrt[3]{${cb}} = ${n}`}
              displayMode={false}
            />
          </div>
          {!isCompact && (
            <p className="text-micro text-slate-700 text-center hidden sm:block">
              Prime factors in triplets · Can end in any digit 0–9
            </p>
          )}
        </div>
      </div>

      {/* Next Up Action Strip */}
      <div className={`${isCompact ? 'p-1.5 px-2' : 'p-2 sm:p-2.5'} rounded-2xl bg-slate-50/80 flex flex-wrap items-center justify-between gap-2 shrink-0`}>
        <div className="hidden sm:flex items-center gap-2 text-small font-bold text-slate-800">
          <Sparkles className="w-4 h-4 text-[#F27A00] shrink-0" />
          <span>Ready to challenge yourself?</span>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 w-full sm:w-auto justify-center sm:justify-end">
          {onJumpToSquarePairs && (
            <button
              type="button"
              onClick={onJumpToSquarePairs}
              className={`${isCompact ? 'min-h-[36px] px-2.5 text-micro' : 'min-h-[40px] px-3 text-micro sm:text-small'} py-1.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 text-slate-800 font-bold flex items-center gap-1.5 cursor-pointer text-center`}
            >
              <span>Square Pairs 1–17</span>
              <ArrowRight className="w-3.5 h-3.5 shrink-0" />
            </button>
          )}
          {onJumpToPractice && (
            <button
              type="button"
              onClick={onJumpToPractice}
              className={`${isCompact ? 'min-h-[36px] px-2.5 text-micro' : 'min-h-[40px] px-3 text-micro sm:text-small'} py-1.5 rounded-xl bg-[#005583] hover:bg-[#003F62] text-white font-bold flex items-center gap-1.5 cursor-pointer shadow-2xs text-center`}
            >
              <span>Practice Problems</span>
              <ArrowRight className="w-3.5 h-3.5 shrink-0" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
