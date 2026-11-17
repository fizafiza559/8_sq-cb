/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { COLORS } from '../design/tokens';
import { Katex } from '../components/Katex';
import { Sparkles, Grid, Box, ArrowRight } from 'lucide-react';

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

  useEffect(() => {
    setN(beatIndex === 0 ? 3 : 4);
  }, [beatIndex]);

  const sq = n * n;
  const cb = n * n * n;

  return (
    <div
      data-no-nav="true"
      className={`w-full max-w-4xl mx-auto rounded-3xl border border-slate-200/80 bg-white p-5 sm:p-7 shadow-xs flex flex-col gap-5 ${className}`}
    >
      {/* Header & Side Selector */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <span className="text-micro font-bold uppercase tracking-wider text-slate-500">
            Chapter Recap · Squares &amp; Cubes Side by Side
          </span>
          <h3 className="text-statement font-extrabold text-slate-900 mt-0.5">
            Pick Side n = {n} to Compare Area vs Volume
          </h3>
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          {[2, 3, 4, 5].map((val) => (
            <button
              key={val}
              type="button"
              onClick={() => setN(val)}
              className={`min-h-[40px] px-3.5 py-1.5 rounded-xl font-mono text-small font-extrabold border transition-all cursor-pointer tabular-nums whitespace-nowrap shrink-0 ${
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-5 rounded-2xl bg-orange-50/50 flex flex-col gap-3">
          <div className="flex items-center justify-between gap-2">
            <span className="inline-flex items-center gap-1.5 text-small font-extrabold text-orange-900">
              <Grid className="w-4 h-4 text-[#F27A00] shrink-0" />
              <span>2D Square &amp; Square Root</span>
            </span>
            <span className="font-mono text-micro font-bold text-orange-800 whitespace-nowrap">
              {n} × {n} tiles
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-orange-100 flex items-center justify-center min-h-[120px]">
            <div
              className="grid gap-1"
              style={{ gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))` }}
            >
              {Array.from({ length: sq }).map((_, idx) => (
                <div
                  key={idx}
                  className="w-5 h-5 rounded-md bg-orange-200 border border-[#F27A00]"
                />
              ))}
            </div>
          </div>

          <div className="text-center">
            <Katex
              latex={`${n}^2 = ${sq} \\iff \\sqrt{${sq}} = ${n}`}
              displayMode={false}
            />
          </div>
          <p className="text-micro text-slate-700 text-center">
            Odd number of factors · Ends only in 0, 1, 4, 5, 6, 9
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-purple-50/50 flex flex-col gap-3">
          <div className="flex items-center justify-between gap-2">
            <span className="inline-flex items-center gap-1.5 text-small font-extrabold text-purple-900">
              <Box className="w-4 h-4 text-purple-700 shrink-0" />
              <span>3D Cube &amp; Cube Root</span>
            </span>
            <span className="font-mono text-micro font-bold text-purple-800 whitespace-nowrap">
              {n} × {n} × {n} unit cubes
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-purple-100 flex items-center justify-center min-h-[120px]">
            <div className="flex flex-col items-center gap-1.5">
              <div className="font-mono text-headline font-black text-purple-800 tabular-nums">
                {cb}
              </div>
              <span className="text-micro font-bold text-slate-500">
                {n} stacked layers of {sq} cubes each
              </span>
            </div>
          </div>

          <div className="text-center">
            <Katex
              latex={`${n}^3 = ${cb} \\iff \\sqrt[3]{${cb}} = ${n}`}
              displayMode={false}
            />
          </div>
          <p className="text-micro text-slate-700 text-center">
            Prime factors in triplets · Can end in any digit 0–9
          </p>
        </div>
      </div>

      {/* Next Up Action Strip */}
      <div className="p-4 rounded-2xl bg-slate-50/80 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-small font-bold text-slate-800">
          <Sparkles className="w-4 h-4 text-[#F27A00] shrink-0" />
          <span>Ready to challenge yourself?</span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {onJumpToSquarePairs && (
            <button
              type="button"
              onClick={onJumpToSquarePairs}
              className="min-h-[40px] px-4 py-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 text-slate-800 text-small font-bold flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
            >
              <span>Play Square Pairs 1–17</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
          {onJumpToPractice && (
            <button
              type="button"
              onClick={onJumpToPractice}
              className="min-h-[40px] px-4 py-2 rounded-xl bg-[#005583] hover:bg-[#003F62] text-white text-small font-bold flex items-center gap-1.5 cursor-pointer whitespace-nowrap shadow-2xs"
            >
              <span>Go to Figure It Out Practice</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
