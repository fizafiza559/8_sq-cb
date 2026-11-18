/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Katex } from '../components/Katex';
import {
  CheckCircle2,
  AlertCircle,
  Search,
  Sparkles,
  GitBranch,
  Target,
} from 'lucide-react';
import { useViewportTier } from '../hooks/useViewportTier';

export interface SquareRootPrimeEstimateSceneProps {
  initialTab?: 'prime-pairs' | 'estimate-1936';
  beatIndex?: number;
  className?: string;
}

export const SquareRootPrimeEstimateScene: React.FC<SquareRootPrimeEstimateSceneProps> = ({
  initialTab = 'prime-pairs',
  beatIndex,
  className = '',
}) => {
  const [activeTab, setActiveTab] = useState<'prime-pairs' | 'estimate-1936'>(initialTab);
  const [pairsLocked, setPairsLocked] = useState<boolean>(true);

  // Part B state: Interval Estimation for sqrt(1936)
  const [candidateRoot, setCandidateRoot] = useState<number>(44);
  const [estStep, setEstStep] = useState<1 | 2 | 3 | 4>(4);
  const [mobilePairCard, setMobilePairCard] = useState<'324' | '156'>('324');
  const { tier, isNarrow } = useViewportTier();
  const isCompact = tier === 'compact';
  const useSingleCard = isCompact || isNarrow;

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  useEffect(() => {
    if (beatIndex === undefined) return;
    if (initialTab === 'estimate-1936') {
      if (beatIndex === 0) {
        setEstStep(1);
        setCandidateRoot(40);
      } else {
        setEstStep(4);
        setCandidateRoot(44);
      }
    } else {
      setPairsLocked(true);
    }
  }, [beatIndex, initialTab]);

  const targetNum = 1936;
  const candidateSq = candidateRoot * candidateRoot;
  const isExact = candidateSq === targetNum;

  const handleSelectEstStep = (step: 1 | 2 | 3 | 4) => {
    setEstStep(step);
    if (step === 1) setCandidateRoot(40);
    if (step === 2) setCandidateRoot(46);
    if (step === 3) setCandidateRoot(45);
    if (step === 4) setCandidateRoot(44);
  };

  return (
    <div
      data-no-nav="true"
      className={`w-full max-w-4xl h-full max-h-full min-h-0 overflow-hidden mx-auto rounded-3xl border border-slate-200/80 bg-white ${
        isCompact ? 'p-2 gap-1.5' : 'p-3 sm:p-4 gap-2 sm:gap-2.5'
      } shadow-xs flex flex-col justify-between ${className}`}
    >
      {/* Header & Mode Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-2 shrink-0">
        <div className="min-w-0">
          {!isCompact && (
            <span className="text-micro font-bold uppercase tracking-wider text-slate-500 hidden sm:block">
              Finding &amp; Estimating Square Roots
            </span>
          )}
          <h3 className="text-small sm:text-statement font-extrabold text-slate-900 mt-0.5">
            {activeTab === 'prime-pairs'
              ? 'Prime Factor Pairs: 324 vs 156'
              : 'Interval Halving Detective: Find √1936'}
          </h3>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-1 p-1 rounded-xl bg-slate-100/90 w-full sm:w-auto">
          <button
            type="button"
            onClick={() => setActiveTab('prime-pairs')}
            className={`${isCompact ? 'min-h-[38px]' : 'min-h-[42px] sm:min-h-[36px]'} px-3 py-1 rounded-lg text-micro font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'prime-pairs'
                ? 'bg-white text-[#005583] shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <GitBranch className="w-3.5 h-3.5 shrink-0" />
            <span>Prime Pairs (324 vs 156)</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('estimate-1936')}
            className={`${isCompact ? 'min-h-[38px]' : 'min-h-[42px] sm:min-h-[36px]'} px-3 py-1 rounded-lg text-micro font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'estimate-1936'
                ? 'bg-white text-[#005583] shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Search className="w-3.5 h-3.5 shrink-0" />
            <span>Estimate √1936</span>
          </button>
        </div>
      </div>

      {/* ================================================================= */}
      {/* PART A: PRIME PAIRS ANIMATION (324 vs 156) */}
      {/* ================================================================= */}
      {activeTab === 'prime-pairs' && (
        <div className="flex flex-col justify-between gap-2 flex-1 min-h-0 overflow-hidden animate-fade-rise">
          <div className={`flex flex-wrap items-center justify-between gap-2 ${isCompact ? 'p-1.5 px-2.5' : 'p-2 sm:px-3.5'} rounded-2xl bg-slate-50/80 shrink-0`}>
            {!isCompact && (
              <p className="text-micro sm:text-small font-medium text-slate-700 min-w-0">
                Every prime factor needs a matching partner. Tap to lock pairs!
              </p>
            )}
            <button
              type="button"
              onClick={() => setPairsLocked((v) => !v)}
              className={`${isCompact ? 'min-h-[38px] w-full justify-center' : 'min-h-[40px]'} px-3.5 py-1.5 rounded-xl text-micro sm:text-small font-bold flex items-center gap-2 transition-all cursor-pointer text-center ${
                pairsLocked
                  ? 'bg-emerald-600 text-white shadow-2xs'
                  : 'bg-[#005583] hover:bg-[#003F62] text-white shadow-2xs'
              }`}
            >
              <Sparkles className="w-4 h-4 shrink-0" />
              <span>{pairsLocked ? 'Pairs Locked (Tap to Separate)' : 'Lock Matching Pairs'}</span>
            </button>
          </div>

          {useSingleCard && (
            <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-100 shrink-0">
              <button
                type="button"
                onClick={() => setMobilePairCard('324')}
                className={`flex-1 min-h-[36px] rounded-lg text-micro font-bold cursor-pointer ${
                  mobilePairCard === '324' ? 'bg-white text-emerald-700 shadow-2xs' : 'text-slate-600'
                }`}
              >
                324 (All Paired ✓)
              </button>
              <button
                type="button"
                onClick={() => setMobilePairCard('156')}
                className={`flex-1 min-h-[36px] rounded-lg text-micro font-bold cursor-pointer ${
                  mobilePairCard === '156' ? 'bg-white text-amber-800 shadow-2xs' : 'text-slate-600'
                }`}
              >
                156 (Lonely Factors ✗)
              </button>
            </div>
          )}

          <div className={`grid ${useSingleCard ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'} gap-2.5 flex-1 min-h-0`}>
            {/* 324: All Factors Paired */}
            {(!useSingleCard || mobilePairCard === '324') && (
            <div className="p-2.5 sm:p-3.5 rounded-2xl bg-emerald-50/50 flex flex-col justify-between gap-2 min-h-0">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-xl bg-emerald-600 text-white font-mono font-extrabold text-body">
                    324
                  </span>
                  <span className="text-small font-extrabold text-emerald-950">
                    All Factors Paired!
                  </span>
                </div>
                <span className="px-2.5 py-1 rounded-full text-micro font-bold bg-emerald-100 text-emerald-800 flex items-center gap-1 shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Square</span>
                </span>
              </div>

              {/* Prime Tree / Pairs Visualization */}
              <div className="p-3 sm:p-4 rounded-2xl bg-white border border-emerald-100 flex flex-col items-center gap-2.5">
                <div className="text-micro font-bold uppercase tracking-wider text-slate-500">
                  324 = 2 × 2 × 3 × 3 × 3 × 3
                </div>

                <div className="flex flex-wrap items-center justify-center gap-2">
                  {[
                    { a: 2, b: 2 },
                    { a: 3, b: 3 },
                    { a: 3, b: 3 },
                  ].map((pair, idx) => (
                    <div
                      key={idx}
                      className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-2xl border-2 transition-all duration-500 ${
                        pairsLocked
                          ? 'bg-emerald-100 border-emerald-500 shadow-2xs scale-100'
                          : 'bg-slate-50 border-dashed border-slate-300 gap-3'
                      }`}
                    >
                      <span className="w-8 h-8 rounded-full bg-emerald-600 text-white font-mono font-black text-small flex items-center justify-center">
                        {pair.a}
                      </span>
                      <span className="text-emerald-800 font-bold">×</span>
                      <span className="w-8 h-8 rounded-full bg-emerald-600 text-white font-mono font-black text-small flex items-center justify-center">
                        {pair.b}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Pick one from each pair */}
                <div className="w-full pt-2 border-t border-emerald-100 flex flex-col items-center gap-1 text-center">
                  <span className="text-micro font-bold text-emerald-800">
                    Take 1 number from each green pair:
                  </span>
                  <div className="text-body font-extrabold text-emerald-950 max-w-full flex flex-wrap justify-center">
                    <Katex latex={`2 \\times 3 \\times 3 = 18 \\implies \\sqrt{324} = 18`} displayMode={false} />
                  </div>
                </div>
              </div>
            </div>
            )}

            {/* 156: Lonely Factors Left Over */}
            {(!useSingleCard || mobilePairCard === '156') && (
            <div className="p-2.5 sm:p-3.5 rounded-2xl bg-amber-50/50 flex flex-col justify-between gap-2 min-h-0">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-xl bg-amber-600 text-white font-mono font-extrabold text-body">
                    156
                  </span>
                  <span className="text-small font-extrabold text-amber-950">
                    Factors Left Alone!
                  </span>
                </div>
                <span className="px-2.5 py-1 rounded-full text-micro font-bold bg-amber-100 text-amber-900 flex items-center gap-1 shrink-0">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>Not a Square</span>
                </span>
              </div>

              <div className="p-3 sm:p-4 rounded-2xl bg-white border border-amber-100 flex flex-col items-center gap-2.5">
                <div className="text-micro font-bold uppercase tracking-wider text-slate-500">
                  156 = 2 × 2 × 3 × 13
                </div>

                <div className="flex flex-wrap items-center justify-center gap-2.5">
                  {/* Paired 2 x 2 */}
                  <div
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-2xl border-2 transition-all duration-500 ${
                      pairsLocked
                        ? 'bg-emerald-100 border-emerald-500 shadow-2xs'
                        : 'bg-slate-50 border-dashed border-slate-300 gap-3'
                    }`}
                  >
                    <span className="w-8 h-8 rounded-full bg-emerald-600 text-white font-mono font-black text-small flex items-center justify-center">
                      2
                    </span>
                    <span className="text-emerald-800 font-bold">×</span>
                    <span className="w-8 h-8 rounded-full bg-emerald-600 text-white font-mono font-black text-small flex items-center justify-center">
                      2
                    </span>
                  </div>

                  {/* Lonely 3 */}
                  <div className="px-3 py-2 rounded-2xl border-2 border-dashed border-amber-400 bg-amber-50/90 flex flex-col items-center gap-1">
                    <span className="w-8 h-8 rounded-full bg-amber-600 text-white font-mono font-black text-small flex items-center justify-center">
                      3
                    </span>
                    <span className="text-[11px] font-extrabold text-amber-950 whitespace-nowrap">
                      Lonely Factor
                    </span>
                  </div>

                  {/* Lonely 13 */}
                  <div className="px-3 py-2 rounded-2xl border-2 border-dashed border-amber-400 bg-amber-50/90 flex flex-col items-center gap-1">
                    <span className="w-8 h-8 rounded-full bg-amber-600 text-white font-mono font-black text-small flex items-center justify-center">
                      13
                    </span>
                    <span className="text-[11px] font-extrabold text-amber-950 whitespace-nowrap">
                      Lonely Factor
                    </span>
                  </div>
                </div>

                <div className="w-full pt-2 border-t border-amber-100 text-center">
                  <p className="text-small font-semibold text-amber-950">
                    <strong>3</strong> and <strong>13</strong> have no partners, so 156 cannot be a whole square!
                  </p>
                </div>
              </div>
            </div>
            )}
          </div>
        </div>
      )}

      {/* ================================================================= */}
      {/* PART B: INTERVAL HALVING FOR √1936 */}
      {/* ================================================================= */}
      {activeTab === 'estimate-1936' && (
        <div className="flex flex-col justify-between gap-2 flex-1 min-h-0 overflow-hidden animate-fade-rise">
          {/* 4-Step Detective Guide Chips */}
          <div className={`grid ${isCompact ? 'grid-cols-4' : 'grid-cols-2 sm:grid-cols-4'} gap-1.5 shrink-0`}>
            {[
              { step: 1 as const, label: '1. Tens Bracket', hint: '40²–50²' },
              { step: 2 as const, label: '2. Last Digit 6', hint: 'Ends 4 or 6' },
              { step: 3 as const, label: '3. Midpoint 45²', hint: '45²=2025' },
              { step: 4 as const, label: '4. Check 44²', hint: '44×44=1936' },
            ].map((item) => (
              <button
                key={item.step}
                type="button"
                onClick={() => handleSelectEstStep(item.step)}
                className={`${isCompact ? 'min-h-[38px] p-1.5' : 'min-h-[42px] p-2'} rounded-2xl border text-left transition-all cursor-pointer flex flex-col gap-0.5 ${
                  estStep === item.step
                    ? 'bg-[#005583] text-white border-[#003F62] shadow-xs'
                    : 'bg-slate-50 text-slate-800 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <span className="text-[11px] sm:text-small font-extrabold leading-tight truncate">{item.label}</span>
                <span
                  className={`text-[10px] sm:text-micro ${
                    estStep === item.step ? 'text-sky-100' : 'text-slate-500'
                  }`}
                >
                  {item.hint}
                </span>
              </button>
            ))}
          </div>

          {/* Interactive Number Line Bracket: 40^2 (1600) to 50^2 (2500) */}
          <div className={`${isCompact ? 'p-2 gap-1.5' : 'p-2.5 sm:p-3.5 gap-2.5'} rounded-2xl bg-slate-50/75 flex flex-col justify-between flex-1 min-h-0 overflow-hidden`}>
            <div className="flex flex-wrap items-center justify-between gap-2 shrink-0">
              <div className="flex items-center gap-1.5 text-micro sm:text-small font-extrabold text-slate-900">
                <Target className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Slide to Test 40–50</span>
              </div>
              <span
                className={`px-2.5 py-0.5 rounded-full text-micro font-extrabold border ${
                  isExact
                    ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                    : candidateSq < targetNum
                    ? 'bg-blue-100 text-blue-900 border-blue-300'
                    : 'bg-amber-100 text-amber-900 border-amber-300'
                }`}
              >
                {candidateRoot}² = {candidateSq}{' '}
                {isExact ? '= 1936 (EXACT!)' : candidateSq < targetNum ? '< 1936' : '> 1936'}
              </span>
            </div>

            {/* Number Line Track */}
            <div className="relative pt-6 pb-1 px-2 shrink-0">
              <div className="h-2.5 rounded-full bg-slate-200 relative overflow-hidden">
                {/* Target marker for 1936 between 1600 and 2500 */}
                <div
                  className="absolute top-0 bottom-0 bg-emerald-500/25"
                  style={{
                    left: `${((1936 - 1600) / (2500 - 1600)) * 100}%`,
                    width: '6px',
                    transform: 'translateX(-50%)',
                  }}
                />
              </div>

              {/* Target 1936 Flag */}
              <div
                className="absolute top-0 flex flex-col items-center -translate-x-1/2"
                style={{ left: `${((1936 - 1600) / (2500 - 1600)) * 100}%` }}
              >
                <span className="px-2 py-0.5 rounded-md bg-emerald-600 text-white text-[10px] font-black shadow-2xs whitespace-nowrap">
                  1936
                </span>
                <div className="w-0.5 h-3 bg-emerald-600" />
              </div>

              {/* Candidate Dot */}
              <div
                className="absolute top-7 w-5 h-5 rounded-full border-2 border-white shadow-md -translate-x-1/2 -translate-y-1/2 transition-all duration-200 flex items-center justify-center text-[10px] font-black text-white"
                style={{
                  left: `${((candidateSq - 1600) / (2500 - 1600)) * 100}%`,
                  backgroundColor: isExact ? '#16A34A' : '#005583',
                }}
              >
                {candidateRoot}
              </div>

              {/* Interactive Range & Discrete Quick Buttons 40..50 */}
              <div className={`grid ${isCompact ? 'grid-cols-11 mt-3' : 'grid-cols-6 sm:grid-cols-11 mt-4'} gap-1`}>
                {Array.from({ length: 11 }, (_, i) => 40 + i).map((val) => {
                  const sq = val * val;
                  const active = candidateRoot === val;
                  const endsInSix = sq % 10 === 6;
                  return (
                    <button
                      key={val}
                      type="button"
                      onClick={() => setCandidateRoot(val)}
                      className={`${isCompact ? 'min-h-[36px] py-1' : 'min-h-[40px] sm:min-h-[44px] py-1.5'} px-0.5 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center tabular-nums ${
                        active
                          ? val === 44
                            ? 'bg-emerald-600 text-white border-emerald-700 shadow-xs scale-105'
                            : 'bg-[#005583] text-white border-[#003F62] shadow-xs'
                          : endsInSix
                          ? 'bg-orange-50 text-orange-950 border-orange-200 hover:bg-orange-100'
                          : 'bg-white text-slate-700 border-slate-200/80 hover:bg-slate-100'
                      }`}
                    >
                      <span className="text-[11px] font-black leading-tight">{val}</span>
                      <span className={`text-[9px] font-mono leading-tight ${active ? 'text-white/90' : 'text-slate-500'}`}>
                        {sq}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step Explanation Card */}
            <div className={`${isCompact ? 'p-2' : 'p-2.5'} rounded-2xl bg-white border border-slate-200/70 flex flex-col sm:flex-row items-center justify-between gap-2 shrink-0`}>
              <div className="text-small text-slate-800 leading-relaxed min-w-0">
                {estStep === 1 && (
                  <span>
                    <strong>Step 1:</strong> Since <strong>40² = 1600</strong> and{' '}
                    <strong>50² = 2500</strong>, √1936 must be between <strong>40 and 50</strong>.
                  </span>
                )}
                {estStep === 2 && (
                  <span>
                    <strong>Step 2:</strong> 1936 ends in <strong>6</strong>! Only numbers ending in{' '}
                    <strong>4</strong> or <strong>6</strong> square to end in 6 (so try 44 or 46).
                  </span>
                )}
                {estStep === 3 && (
                  <span>
                    <strong>Step 3:</strong> Midpoint test: <strong>45² = 2025</strong>. Since{' '}
                    1936 &lt; 2025, the answer must be smaller than 45!
                  </span>
                )}
                {estStep === 4 && (
                  <span>
                    <strong>Step 4:</strong> Only 44 is left! Verify:{' '}
                    <strong>44 × 44 = 1936</strong>, so each wall of the courtyard has 44 tiles.
                  </span>
                )}
              </div>

              <div className="text-body font-bold text-[#005583] shrink-0 max-w-full flex flex-wrap justify-center">
                <Katex
                  latex={
                    isExact
                      ? `44 \\times 44 = 1936 \\implies \\sqrt{1936} = 44`
                      : `${candidateRoot}^2 = ${candidateSq}`
                  }
                  displayMode={false}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
