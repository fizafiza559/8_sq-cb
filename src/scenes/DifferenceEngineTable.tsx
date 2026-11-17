/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { COLORS } from '../design/tokens';
import { Katex } from '../components/Katex';
import { successiveDifferences } from '../math/facts';
import { ChevronDown, RotateCcw, Sparkles, GitCommitHorizontal } from 'lucide-react';

export interface DifferenceEngineTableProps {
  initialMode?: 'squares' | 'cubes';
  className?: string;
}

export const DifferenceEngineTable: React.FC<DifferenceEngineTableProps> = ({
  initialMode = 'cubes',
  className = '',
}) => {
  const [mode, setMode] = useState<'squares' | 'cubes'>(initialMode);
  const [termCount, setTermCount] = useState<number>(6);
  const maxLevels = mode === 'squares' ? 2 : 3;
  const [revealedLevel, setRevealedLevel] = useState<number>(maxLevels);
  const [focusedNode, setFocusedNode] = useState<{ level: number; idx: number } | null>({
    level: 1,
    idx: 1,
  });

  // Compute sequence directly via math formulas (Accuracy Rule)
  const baseSequence = useMemo(
    () =>
      Array.from({ length: termCount }, (_, i) => {
        const n = i + 1;
        return mode === 'squares' ? n * n : n * n * n;
      }),
    [mode, termCount]
  );

  const levels = useMemo(() => successiveDifferences(baseSequence), [baseSequence]);

  const handleModeChange = (nextMode: 'squares' | 'cubes') => {
    setMode(nextMode);
    const nextMax = nextMode === 'squares' ? 2 : 3;
    setRevealedLevel(nextMax);
    setFocusedNode({ level: 1, idx: 1 });
  };

  const levelMeta = (levelIdx: number) => {
    if (levelIdx === 0) {
      return {
        title: mode === 'squares' ? 'Squares (n²)' : 'Cubes (n³)',
        rule: mode === 'squares' ? '1, 4, 9, 16...' : '1, 8, 27, 64...',
        accent: COLORS.primary,
        bg: '#F8FAFF',
        border: COLORS.divider,
        text: COLORS.headingText,
      };
    }
    if (levelIdx === 1) {
      return {
        title: '1st Differences',
        rule: mode === 'squares' ? 'Odd numbers (2n + 1)' : '3n² + 3n + 1',
        accent: '#0788D3',
        bg: '#EFF6FF',
        border: '#93C5FD',
        text: '#0369A1',
      };
    }
    if (levelIdx === 2) {
      return {
        title: '2nd Differences',
        rule: mode === 'squares' ? 'Constant = 2!' : 'Multiples of 6 (6, 12, 18...)',
        accent: mode === 'squares' ? '#16A34A' : '#8B5CF6',
        bg: mode === 'squares' ? '#DCFCE7' : '#F5F3FF',
        border: mode === 'squares' ? '#4ADE80' : '#C4B5FD',
        text: mode === 'squares' ? '#15803D' : '#6D28D9',
      };
    }
    return {
      title: '3rd Differences',
      rule: 'Constant = 6!',
      accent: '#16A34A',
      bg: '#DCFCE7',
      border: '#4ADE80',
      text: '#15803D',
    };
  };

  // Parent details when a difference node is clicked
  const inspectedDetail = useMemo(() => {
    if (!focusedNode || focusedNode.level === 0) return null;
    const { level, idx } = focusedNode;
    const upper = levels[level - 1];
    const curr = levels[level];
    if (!upper || !curr || idx < 0 || idx >= curr.length) return null;
    const leftParent = upper[idx];
    const rightParent = upper[idx + 1];
    const diffVal = curr[idx];
    return { level, idx, leftParent, rightParent, diffVal };
  }, [focusedNode, levels]);

  return (
    <div
      data-no-nav="true"
      className={`w-full max-w-4xl mx-auto rounded-3xl border bg-white p-4 sm:p-6 shadow-xs flex flex-col gap-5 ${className}`}
      style={{ borderColor: COLORS.divider }}
    >
      {/* Header & Mode Controls */}
      <div
        className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b pb-4"
        style={{ borderColor: COLORS.divider }}
      >
        <div>
          <div className="flex items-center gap-2 text-micro text-slate-500 font-semibold">
            <GitCommitHorizontal className="w-3.5 h-3.5 text-[#005583]" />
            <span>Animation 11</span>
            <span aria-hidden="true">·</span>
            <span>Successive Differences Engine</span>
          </div>
          <h3 className="text-statement font-extrabold text-slate-900 mt-0.5">
            Live Subtraction Pyramid: {mode === 'squares' ? 'Squares (n²)' : 'Cubes (n³)'}
          </h3>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Mode Segmented Toggle */}
          <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-100 border border-slate-200">
            <button
              type="button"
              onClick={() => handleModeChange('squares')}
              className={`min-h-[38px] px-3 py-1.5 rounded-lg text-micro font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                mode === 'squares'
                  ? 'bg-white text-[#0788D3] shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Squares (Level 2)
            </button>
            <button
              type="button"
              onClick={() => handleModeChange('cubes')}
              className={`min-h-[38px] px-3 py-1.5 rounded-lg text-micro font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                mode === 'cubes'
                  ? 'bg-white text-[#8B5CF6] shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Cubes (Level 3)
            </button>
          </div>
        </div>
      </div>

      {/* Step & Term Count Controls */}
      <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3 flex-wrap">
          <span className="text-small font-bold text-slate-700 whitespace-nowrap">
            Terms shown:
          </span>
          <div className="flex items-center gap-1.5">
            {[5, 6, 7, 8].map((cnt) => (
              <button
                key={cnt}
                type="button"
                onClick={() => {
                  setTermCount(cnt);
                  setFocusedNode(null);
                }}
                className={`min-h-[38px] w-10 rounded-xl text-small font-bold border transition-all cursor-pointer tabular-nums ${
                  termCount === cnt
                    ? 'bg-[#005583] text-white border-[#003F62] shadow-2xs'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {cnt}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => {
              if (revealedLevel >= maxLevels) {
                setRevealedLevel(0);
                setFocusedNode(null);
              } else {
                setRevealedLevel((l) => Math.min(maxLevels, l + 1));
              }
            }}
            className="min-h-[40px] flex-1 sm:flex-none px-4 py-2 rounded-xl bg-[#005583] hover:bg-[#003F62] text-white text-small font-bold flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer whitespace-nowrap shrink-0"
          >
            <ChevronDown className="w-4 h-4" />
            <span>
              {revealedLevel >= maxLevels ? 'Restart Pyramid' : `Reveal Level ${revealedLevel + 1}`}
            </span>
          </button>

          <button
            type="button"
            onClick={() => {
              setRevealedLevel(maxLevels);
              setFocusedNode({ level: 1, idx: 1 });
            }}
            className="min-h-[40px] px-3 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 text-micro font-bold flex items-center gap-1 cursor-pointer whitespace-nowrap shrink-0"
            title="Show all levels"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>All</span>
          </button>
        </div>
      </div>

      {/* Live Subtraction Tree (Pyramid Rows) */}
      <div className="w-full overflow-x-auto pb-1">
        <div className="min-w-[500px] flex flex-col gap-3 p-3 sm:p-4 rounded-2xl border border-slate-200 bg-slate-50/40">
          {levels.slice(0, revealedLevel + 1).map((row, levelIdx) => {
            const meta = levelMeta(levelIdx);
            const isConstantRow = levelIdx === maxLevels;

            return (
              <div key={`lvl-${levelIdx}`} className="flex flex-col gap-1.5 animate-fade-rise">
                {/* Row Descriptor (Unboxed Clean Metadata) */}
                <div className="flex items-center justify-between text-micro px-1">
                  <span className="font-extrabold" style={{ color: meta.text }}>
                    {meta.title}
                  </span>
                  <span className="text-slate-500 font-medium">{meta.rule}</span>
                </div>

                {/* Centered Nodes */}
                <div className="flex items-center justify-center gap-2 sm:gap-3">
                  {row.map((val, idx) => {
                    const isSelected =
                      focusedNode?.level === levelIdx && focusedNode?.idx === idx;
                    const isParentHighlight =
                      focusedNode !== null &&
                      focusedNode.level === levelIdx + 1 &&
                      (idx === focusedNode.idx || idx === focusedNode.idx + 1);

                    return (
                      <button
                        key={`node-${levelIdx}-${idx}`}
                        type="button"
                        onClick={() => {
                          if (levelIdx > 0) setFocusedNode({ level: levelIdx, idx });
                        }}
                        className={`min-w-[46px] sm:min-w-[54px] min-h-[42px] px-2.5 py-1.5 rounded-xl border-2 font-mono text-small font-extrabold tabular-nums transition-all flex flex-col items-center justify-center ${
                          levelIdx > 0 ? 'cursor-pointer hover:scale-105' : 'cursor-default'
                        } ${
                          isSelected
                            ? 'ring-2 ring-[#005583] ring-offset-1 scale-105 shadow-xs'
                            : isParentHighlight
                            ? 'ring-2 ring-amber-400 scale-105'
                            : ''
                        }`}
                        style={{
                          backgroundColor: isConstantRow ? '#DCFCE7' : meta.bg,
                          borderColor: isConstantRow ? '#16A34A' : meta.border,
                          color: meta.text,
                        }}
                      >
                        <span>{val}</span>
                        {levelIdx === 0 && (
                          <span className="text-[10px] font-sans font-semibold opacity-70">
                            {idx + 1}
                            {mode === 'squares' ? '²' : '³'}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Interactive Subtraction Inspector & Formula Banner */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-stretch">
        {/* Clicked Subtraction Detail */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-center gap-1">
          <span className="text-micro font-bold text-slate-500">
            Tap any difference box to check it
          </span>
          {inspectedDetail ? (
            <div className="flex items-center gap-2 text-body font-extrabold text-slate-900 font-mono tabular-nums">
              <span>{inspectedDetail.rightParent}</span>
              <span className="text-slate-400">−</span>
              <span>{inspectedDetail.leftParent}</span>
              <span className="text-slate-400">=</span>
              <span className="px-2 py-0.5 rounded-lg bg-white border border-slate-300 text-[#005583]">
                {inspectedDetail.diffVal}
              </span>
            </div>
          ) : (
            <p className="text-small text-slate-600">
              Each lower number equals the right parent minus the left parent above it.
            </p>
          )}
        </div>

        {/* Formula Summary */}
        <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 flex flex-col justify-center gap-1.5">
          <div className="flex items-center gap-1.5 text-small font-extrabold text-emerald-900">
            <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              {mode === 'squares'
                ? 'Squares lock at Level 2 (Constant 2)'
                : 'Cubes lock at Level 3 (Constant 6)'}
            </span>
          </div>
          <div className="text-small text-emerald-950 overflow-x-auto">
            <Katex
              latex={
                mode === 'squares'
                  ? `(n+1)^2 - n^2 = 2n + 1 \\implies \\text{Const } 2`
                  : `(n+1)^3 - n^3 = 3n^2 + 3n + 1 \\implies 6k \\implies \\text{Const } 6`
              }
              displayMode={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
