/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { COLORS } from '../design/tokens';
import { Katex } from '../components/Katex';
import {
  CheckCircle2,
  AlertCircle,
  Search,
  Sparkles,
  GitBranch,
  Target,
} from 'lucide-react';

export interface SquareRootPrimeEstimateSceneProps {
  initialTab?: 'prime-pairs' | 'estimate-1936';
  className?: string;
}

export const SquareRootPrimeEstimateScene: React.FC<SquareRootPrimeEstimateSceneProps> = ({
  initialTab = 'prime-pairs',
  className = '',
}) => {
  const [activeTab, setActiveTab] = useState<'prime-pairs' | 'estimate-1936'>(initialTab);
  const [pairsLocked, setPairsLocked] = useState<boolean>(true);

  // Part B state: Interval Estimation for sqrt(1936)
  const [candidateRoot, setCandidateRoot] = useState<number>(44);
  const [estStep, setEstStep] = useState<1 | 2 | 3 | 4>(4);

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

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
      className={`w-full max-w-4xl mx-auto rounded-3xl border bg-white p-5 sm:p-6 shadow-xs flex flex-col gap-5 ${className}`}
      style={{ borderColor: COLORS.divider }}
    >
      {/* Header & Mode Switcher */}
      <div
        className="flex flex-wrap items-center justify-between gap-3 border-b pb-4"
        style={{ borderColor: COLORS.divider }}
      >
        <div>
          <span className="text-micro font-bold uppercase tracking-wider text-slate-500">
            Animation 7 • Finding &amp; Estimating Square Roots
          </span>
          <h3 className="text-statement font-extrabold text-slate-900 mt-0.5">
            {activeTab === 'prime-pairs'
              ? 'Prime Factor Pairs: Complete (324) vs Lonely Factor (156)'
              : 'Interval Halving Detective: Find √1936'}
          </h3>
        </div>

        <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-100 border border-slate-200">
          <button
            type="button"
            onClick={() => setActiveTab('prime-pairs')}
            className={`min-h-[38px] px-3 py-1.5 rounded-lg text-micro font-bold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'prime-pairs'
                ? 'bg-white text-[#005583] shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <GitBranch className="w-3.5 h-3.5" />
            <span>Prime Pairs (324 vs 156)</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('estimate-1936')}
            className={`min-h-[38px] px-3 py-1.5 rounded-lg text-micro font-bold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'estimate-1936'
                ? 'bg-white text-[#005583] shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Search className="w-3.5 h-3.5" />
            <span>Estimate √1936</span>
          </button>
        </div>
      </div>

      {/* ================================================================= */}
      {/* PART A: PRIME PAIRS ANIMATION (324 vs 156) */}
      {/* ================================================================= */}
      {activeTab === 'prime-pairs' && (
        <div className="flex flex-col gap-5 animate-fade-rise">
          <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
            <p className="text-small font-medium text-slate-700">
              Every prime factor must find a matching partner. Tap the button to lock pairs together!
            </p>
            <button
              type="button"
              onClick={() => setPairsLocked((v) => !v)}
              className={`min-h-[40px] px-4 py-2 rounded-xl text-small font-bold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                pairsLocked
                  ? 'bg-emerald-600 text-white shadow-2xs'
                  : 'bg-[#005583] hover:bg-[#003F62] text-white shadow-2xs'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>{pairsLocked ? 'Pairs Locked (Tap to Separate)' : 'Lock Matching Pairs'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* 324: All Factors Paired */}
            <div className="p-5 rounded-2xl border border-emerald-300 bg-emerald-50/50 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-xl bg-emerald-600 text-white font-mono font-extrabold text-body">
                    324
                  </span>
                  <span className="text-small font-extrabold text-emerald-950">
                    All Factors Paired!
                  </span>
                </div>
                <span className="px-2.5 py-1 rounded-full text-micro font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Square</span>
                </span>
              </div>

              {/* Prime Tree / Pairs Visualization */}
              <div className="p-4 rounded-2xl bg-white border border-emerald-200 flex flex-col items-center gap-3">
                <div className="text-micro font-bold uppercase tracking-wider text-slate-500">
                  324 = 2 × 2 × 3 × 3 × 3 × 3
                </div>

                <div className="flex flex-wrap items-center justify-center gap-2.5">
                  {[
                    { a: 2, b: 2 },
                    { a: 3, b: 3 },
                    { a: 3, b: 3 },
                  ].map((pair, idx) => (
                    <div
                      key={idx}
                      className={`flex items-center gap-1.5 px-3 py-2 rounded-2xl border-2 transition-all duration-500 ${
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
                  <div className="text-body font-extrabold text-emerald-950">
                    <Katex latex={`2 \\times 3 \\times 3 = 18 \\implies \\sqrt{324} = 18`} displayMode={false} />
                  </div>
                </div>
              </div>
            </div>

            {/* 156: Lonely Factors Left Over */}
            <div className="p-5 rounded-2xl border border-amber-300 bg-amber-50/50 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-xl bg-amber-600 text-white font-mono font-extrabold text-body">
                    156
                  </span>
                  <span className="text-small font-extrabold text-amber-950">
                    Factors Left Alone!
                  </span>
                </div>
                <span className="px-2.5 py-1 rounded-full text-micro font-bold bg-amber-100 text-amber-900 border border-amber-300 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>Not a Square</span>
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-amber-200 flex flex-col items-center gap-3">
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
                  <div className="px-3 py-2 rounded-2xl border-2 border-dashed border-amber-500 bg-amber-100/80 flex flex-col items-center gap-1">
                    <span className="w-8 h-8 rounded-full bg-amber-600 text-white font-mono font-black text-small flex items-center justify-center">
                      3
                    </span>
                    <span className="text-[11px] font-extrabold text-amber-950 whitespace-nowrap">
                      Lonely Factor — No Partner
                    </span>
                  </div>

                  {/* Lonely 13 */}
                  <div className="px-3 py-2 rounded-2xl border-2 border-dashed border-amber-500 bg-amber-100/80 flex flex-col items-center gap-1">
                    <span className="w-8 h-8 rounded-full bg-amber-600 text-white font-mono font-black text-small flex items-center justify-center">
                      13
                    </span>
                    <span className="text-[11px] font-extrabold text-amber-950 whitespace-nowrap">
                      Lonely Factor — No Partner
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
          </div>
        </div>
      )}

      {/* ================================================================= */}
      {/* PART B: INTERVAL HALVING FOR √1936 */}
      {/* ================================================================= */}
      {activeTab === 'estimate-1936' && (
        <div className="flex flex-col gap-5 animate-fade-rise">
          {/* 4-Step Detective Guide Chips */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              { step: 1 as const, label: '1. Tens Bracket', hint: '40² to 50²' },
              { step: 2 as const, label: '2. Last Digit 6', hint: 'Ends in 4 or 6' },
              { step: 3 as const, label: '3. Midpoint 45²', hint: '45² = 2025' },
              { step: 4 as const, label: '4. Check 44²', hint: '44 × 44 = 1936' },
            ].map((item) => (
              <button
                key={item.step}
                type="button"
                onClick={() => handleSelectEstStep(item.step)}
                className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col gap-0.5 ${
                  estStep === item.step
                    ? 'bg-[#005583] text-white border-[#003F62] shadow-xs'
                    : 'bg-slate-50 text-slate-800 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <span className="text-small font-extrabold">{item.label}</span>
                <span
                  className={`text-micro ${
                    estStep === item.step ? 'text-sky-100' : 'text-slate-500'
                  }`}
                >
                  {item.hint}
                </span>
              </button>
            ))}
          </div>

          {/* Interactive Number Line Bracket: 40^2 (1600) to 50^2 (2500) */}
          <div className="p-5 rounded-2xl border bg-slate-50/70 border-slate-200 flex flex-col gap-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-small font-extrabold text-slate-900">
                <Target className="w-4 h-4 text-blue-600" />
                <span>Slide to Test Whole Numbers Between 40 and 50</span>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-micro font-extrabold border ${
                  isExact
                    ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                    : candidateSq < targetNum
                    ? 'bg-blue-100 text-blue-900 border-blue-300'
                    : 'bg-amber-100 text-amber-900 border-amber-300'
                }`}
              >
                {candidateRoot}² = {candidateSq}{' '}
                {isExact ? '= 1936 (EXACT HIT!)' : candidateSq < targetNum ? '< 1936 (Too Small)' : '> 1936 (Too Big)'}
              </span>
            </div>

            {/* Number Line Track */}
            <div className="relative pt-8 pb-4 px-2">
              <div className="h-3 rounded-full bg-slate-200 relative overflow-hidden">
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
                <span className="px-2 py-0.5 rounded-md bg-emerald-600 text-white text-[11px] font-black shadow-2xs whitespace-nowrap">
                  Target: 1936
                </span>
                <div className="w-0.5 h-4 bg-emerald-600" />
              </div>

              {/* Candidate Dot */}
              <div
                className="absolute top-7 w-6 h-6 rounded-full border-2 border-white shadow-md -translate-x-1/2 -translate-y-1/2 transition-all duration-200 flex items-center justify-center text-[10px] font-black text-white"
                style={{
                  left: `${((candidateSq - 1600) / (2500 - 1600)) * 100}%`,
                  backgroundColor: isExact ? '#16A34A' : '#005583',
                }}
              >
                {candidateRoot}
              </div>

              {/* Interactive Range & Discrete Quick Buttons 40..50 */}
              <div className="grid grid-cols-11 gap-1 mt-6">
                {Array.from({ length: 11 }, (_, i) => 40 + i).map((val) => {
                  const sq = val * val;
                  const active = candidateRoot === val;
                  const endsInSix = sq % 10 === 6;
                  return (
                    <button
                      key={val}
                      type="button"
                      onClick={() => setCandidateRoot(val)}
                      className={`py-2 px-1 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center ${
                        active
                          ? val === 44
                            ? 'bg-emerald-600 text-white border-emerald-700 shadow-xs scale-105'
                            : 'bg-[#005583] text-white border-[#003F62] shadow-xs'
                          : endsInSix
                          ? 'bg-orange-50 text-orange-950 border-orange-300 hover:bg-orange-100'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      <span className="text-micro font-black">{val}</span>
                      <span className={`text-[10px] font-mono ${active ? 'text-white/90' : 'text-slate-500'}`}>
                        {sq}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step Explanation Card */}
            <div className="p-4 rounded-2xl bg-white border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-small text-slate-800 leading-relaxed">
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

              <div className="text-body font-bold text-[#005583] shrink-0">
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
