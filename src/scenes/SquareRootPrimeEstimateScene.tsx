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
  ListOrdered,
  ArrowRight,
} from 'lucide-react';
import { useViewportTier } from '../hooks/useViewportTier';

export interface SquareRootPrimeEstimateSceneProps {
  initialTab?: 'sequential-576' | 'prime-pairs' | 'estimate-1936';
  beatIndex?: number;
  className?: string;
}

type TabType = 'sequential-576' | 'prime-pairs' | 'estimate-1936';

export const SquareRootPrimeEstimateScene: React.FC<SquareRootPrimeEstimateSceneProps> = ({
  initialTab = 'prime-pairs',
  beatIndex,
  className = '',
}) => {
  const [activeTab, setActiveTab] = useState<TabType>(initialTab);
  const [pairsLocked, setPairsLocked] = useState<boolean>(true);

  // Method 1: Sequential Testing state (20 to 25)
  const [seqCandidate, setSeqCandidate] = useState<number>(24);

  // Method 4: Interval Estimation for sqrt(1936)
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
    } else if (initialTab === 'sequential-576') {
      setSeqCandidate(beatIndex <= 1 ? 21 : 24);
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

  const seqSquares = [
    { n: 20, sq: 400, status: 'too-small' },
    { n: 21, sq: 441, status: 'too-small' },
    { n: 22, sq: 484, status: 'too-small' },
    { n: 23, sq: 529, status: 'too-small' },
    { n: 24, sq: 576, status: 'exact' },
    { n: 25, sq: 625, status: 'too-large' },
  ];

  return (
    <div
      data-no-nav="true"
      className={`w-full max-w-5xl h-full max-h-full min-h-0 overflow-hidden mx-auto rounded-3xl border border-slate-200/80 bg-white ${
        isCompact ? 'p-2 gap-1.5' : 'p-3 sm:p-4 gap-2 sm:gap-2.5'
      } shadow-xs flex flex-col justify-between ${className}`}
    >
      {/* Header & Mode Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-1.5 border-b border-slate-100 pb-2 shrink-0">
        <div className="min-w-0">
          {!isCompact && (
            <span className="text-micro font-bold uppercase tracking-wider text-slate-500 hidden sm:block">
              NCERT Methods for Finding Square Roots
            </span>
          )}
          <h3 className="text-small sm:text-statement font-extrabold text-slate-900 mt-0.5">
            {activeTab === 'sequential-576'
              ? 'Method 1: Sequential Testing (576)'
              : activeTab === 'prime-pairs'
              ? 'Method 3: Prime Factor Pairs (324 vs 156)'
              : 'Method 4: Interval Halving Detective (√1936)'}
          </h3>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-1 p-1 rounded-xl bg-slate-100/90 w-full sm:w-auto">
          <button
            type="button"
            onClick={() => setActiveTab('sequential-576')}
            className={`min-h-[32px] px-2.5 py-1 rounded-lg text-micro font-bold flex items-center gap-1 transition-all cursor-pointer ${
              activeTab === 'sequential-576'
                ? 'bg-white text-[#005583] shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <ListOrdered className="w-3.5 h-3.5 shrink-0" />
            <span>1. Sequential (576)</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('prime-pairs')}
            className={`min-h-[32px] px-2.5 py-1 rounded-lg text-micro font-bold flex items-center gap-1 transition-all cursor-pointer ${
              activeTab === 'prime-pairs'
                ? 'bg-white text-[#005583] shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <GitBranch className="w-3.5 h-3.5 shrink-0" />
            <span>3. Prime Pairs</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('estimate-1936')}
            className={`min-h-[32px] px-2.5 py-1 rounded-lg text-micro font-bold flex items-center gap-1 transition-all cursor-pointer ${
              activeTab === 'estimate-1936'
                ? 'bg-white text-[#005583] shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Search className="w-3.5 h-3.5 shrink-0" />
            <span>4. Estimate 1936</span>
          </button>
        </div>
      </div>

      {/* ================================================================= */}
      {/* METHOD 1: SEQUENTIAL TESTING FOR 576 */}
      {/* ================================================================= */}
      {activeTab === 'sequential-576' && (
        <div className="flex flex-col justify-between gap-2 flex-1 min-h-0 overflow-hidden animate-fade-rise">
          {/* Question Callout */}
          <div className="p-2 sm:p-2.5 rounded-2xl bg-sky-50/70 border border-sky-200/60 flex flex-col sm:flex-row items-center justify-between gap-1.5 shrink-0">
            <p className="text-micro sm:text-small font-bold text-slate-800">
              Is <strong>576</strong> a perfect square? We know <Katex latex="20^2 = 400" displayMode={false} />. Test squares in order:
            </p>
            <div className="flex items-center gap-1">
              <span className="text-micro font-bold text-slate-600 mr-1 hidden sm:inline">Jump to:</span>
              {[20, 21, 22, 23, 24, 25].map((val) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => setSeqCandidate(val)}
                  className={`min-h-[30px] px-2 py-0.5 rounded-lg text-micro font-bold border transition-all cursor-pointer tabular-nums ${
                    seqCandidate === val
                      ? 'bg-[#005583] text-white border-[#003F62] shadow-2xs'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {val}²
                </button>
              ))}
            </div>
          </div>

          {/* Sequential Ladder Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-1.5 sm:gap-2 flex-1 min-h-0 content-center">
            {seqSquares.map((item) => {
              const isSelected = seqCandidate === item.n;
              const isFound = item.n === 24;
              return (
                <div
                  key={item.n}
                  onClick={() => setSeqCandidate(item.n)}
                  className={`p-2 sm:p-2.5 rounded-2xl border text-center transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? isFound
                        ? 'bg-emerald-50 border-emerald-500 ring-2 ring-emerald-300 shadow-sm'
                        : 'bg-blue-50 border-blue-500 ring-2 ring-blue-300 shadow-sm'
                      : isFound
                      ? 'bg-emerald-50/50 border-emerald-200 hover:bg-emerald-50'
                      : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <span className="text-micro sm:text-small font-bold text-slate-600">{item.n}²</span>
                  <div className="my-1">
                    <span className="font-mono text-statement sm:text-title font-black text-slate-900 tabular-nums">
                      {item.sq}
                    </span>
                  </div>
                  <span
                    className={`text-[10px] sm:text-[11px] font-bold px-1.5 py-0.5 rounded-md ${
                      item.status === 'exact'
                        ? 'bg-emerald-600 text-white'
                        : item.status === 'too-small'
                        ? 'bg-slate-200 text-slate-700'
                        : 'bg-rose-100 text-rose-700'
                    }`}
                  >
                    {item.status === 'exact' ? 'MATCH = 576' : item.sq < 576 ? '< 576' : '> 576'}
                  </span>
                </div>
              );
            })}
          </div>

          {/* NCERT Limitation Banner */}
          <div className="p-2 sm:p-2.5 rounded-2xl bg-amber-50/80 border border-amber-200 flex flex-col sm:flex-row items-center justify-between gap-1.5 shrink-0 text-center sm:text-left">
            <div className="text-micro sm:text-small text-amber-950 font-medium">
              <strong className="text-amber-900 font-bold">NCERT Note on Inefficiency:</strong> Sequential testing works well for 24² = 576, but testing larger numbers (like 1936 or 7056) one by one becomes tedious and slow!
            </div>
            <div className="font-mono text-small sm:text-body font-black text-emerald-800 shrink-0">
              <Katex latex="24^2 = 576 \implies \sqrt{576} = 24" displayMode={false} />
            </div>
          </div>
        </div>
      )}

      {/* ================================================================= */}
      {/* METHOD 3: PRIME PAIRS (324 vs 156) */}
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
              className={`${isCompact ? 'min-h-[34px] w-full justify-center' : 'min-h-[36px]'} px-3 py-1 rounded-xl text-micro sm:text-small font-bold flex items-center gap-2 transition-all cursor-pointer text-center ${
                pairsLocked
                  ? 'bg-emerald-600 text-white shadow-2xs'
                  : 'bg-[#005583] hover:bg-[#003F62] text-white shadow-2xs'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 shrink-0" />
              <span>{pairsLocked ? 'Pairs Locked (Tap to Separate)' : 'Lock Matching Pairs'}</span>
            </button>
          </div>

          {useSingleCard && (
            <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-100 shrink-0">
              <button
                type="button"
                onClick={() => setMobilePairCard('324')}
                className={`flex-1 min-h-[32px] rounded-lg text-micro font-bold cursor-pointer ${
                  mobilePairCard === '324' ? 'bg-white text-emerald-700 shadow-2xs' : 'text-slate-600'
                }`}
              >
                324 (All Paired ✓)
              </button>
              <button
                type="button"
                onClick={() => setMobilePairCard('156')}
                className={`flex-1 min-h-[32px] rounded-lg text-micro font-bold cursor-pointer ${
                  mobilePairCard === '156' ? 'bg-white text-amber-800 shadow-2xs' : 'text-slate-600'
                }`}
              >
                156 (Lonely Factors ✗)
              </button>
            </div>
          )}

          <div className={`grid ${useSingleCard ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'} gap-2 flex-1 min-h-0`}>
            {/* 324: All Factors Paired */}
            {(!useSingleCard || mobilePairCard === '324') && (
              <div className="p-2.5 sm:p-3 rounded-2xl bg-emerald-50/50 flex flex-col justify-between gap-1.5 min-h-0 border border-emerald-200">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-xl bg-emerald-600 text-white font-mono font-extrabold text-micro sm:text-small">
                      324
                    </span>
                    <span className="text-micro sm:text-small font-extrabold text-emerald-950">
                      All Factors Paired!
                    </span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-micro font-bold bg-emerald-100 text-emerald-800 flex items-center gap-1 shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Square</span>
                  </span>
                </div>

                {/* Prime Tree / Pairs Visualization */}
                <div className="p-2 sm:p-2.5 rounded-2xl bg-white border border-emerald-100 flex flex-col items-center gap-2">
                  <div className="text-micro font-bold uppercase tracking-wider text-slate-500">
                    324 = 2 × 2 × 3 × 3 × 3 × 3
                  </div>

                  <div className="flex flex-wrap items-center justify-center gap-1.5">
                    {[
                      { a: 2, b: 2 },
                      { a: 3, b: 3 },
                      { a: 3, b: 3 },
                    ].map((pair, idx) => (
                      <div
                        key={idx}
                        className={`flex items-center gap-1 px-2 py-1 rounded-xl border transition-all duration-300 ${
                          pairsLocked
                            ? 'bg-emerald-100 border-emerald-500 shadow-2xs'
                            : 'bg-slate-50 border-dashed border-slate-300 gap-2'
                        }`}
                      >
                        <span className="w-6 h-6 rounded-full bg-emerald-600 text-white font-mono font-black text-micro flex items-center justify-center">
                          {pair.a}
                        </span>
                        <span className="text-emerald-800 font-bold">×</span>
                        <span className="w-6 h-6 rounded-full bg-emerald-600 text-white font-mono font-black text-micro flex items-center justify-center">
                          {pair.b}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Pick one from each pair */}
                  <div className="w-full pt-1.5 border-t border-emerald-100 flex flex-col items-center gap-0.5 text-center">
                    <span className="text-micro font-bold text-emerald-800">
                      Take 1 number from each pair:
                    </span>
                    <div className="text-micro sm:text-small font-extrabold text-emerald-950">
                      <Katex latex={`2 \\times 3 \\times 3 = 18 \\implies \\sqrt{324} = 18`} displayMode={false} />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 156: Lonely Factors Left Over */}
            {(!useSingleCard || mobilePairCard === '156') && (
              <div className="p-2.5 sm:p-3 rounded-2xl bg-amber-50/50 flex flex-col justify-between gap-1.5 min-h-0 border border-amber-200">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-xl bg-amber-600 text-white font-mono font-extrabold text-micro sm:text-small">
                      156
                    </span>
                    <span className="text-micro sm:text-small font-extrabold text-amber-950">
                      Lonely Factors Left!
                    </span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-micro font-bold bg-amber-100 text-amber-900 flex items-center gap-1 shrink-0">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>Not Square</span>
                  </span>
                </div>

                <div className="p-2 sm:p-2.5 rounded-2xl bg-white border border-amber-100 flex flex-col items-center gap-2">
                  <div className="text-micro font-bold uppercase tracking-wider text-slate-500">
                    156 = 2 × 2 × 3 × 13
                  </div>

                  <div className="flex flex-wrap items-center justify-center gap-1.5">
                    {/* Paired 2 x 2 */}
                    <div
                      className={`flex items-center gap-1 px-2 py-1 rounded-xl border transition-all duration-300 ${
                        pairsLocked
                          ? 'bg-emerald-100 border-emerald-500 shadow-2xs'
                          : 'bg-slate-50 border-dashed border-slate-300 gap-2'
                      }`}
                    >
                      <span className="w-6 h-6 rounded-full bg-emerald-600 text-white font-mono font-black text-micro flex items-center justify-center">
                        2
                      </span>
                      <span className="text-emerald-800 font-bold">×</span>
                      <span className="w-6 h-6 rounded-full bg-emerald-600 text-white font-mono font-black text-micro flex items-center justify-center">
                        2
                      </span>
                    </div>

                    {/* Lonely 3 */}
                    <div className="px-2 py-1 rounded-xl border border-dashed border-amber-400 bg-amber-50 flex items-center gap-1">
                      <span className="w-6 h-6 rounded-full bg-amber-600 text-white font-mono font-black text-micro flex items-center justify-center">
                        3
                      </span>
                      <span className="text-[10px] font-extrabold text-amber-950">Lonely</span>
                    </div>

                    {/* Lonely 13 */}
                    <div className="px-2 py-1 rounded-xl border border-dashed border-amber-400 bg-amber-50 flex items-center gap-1">
                      <span className="w-6 h-6 rounded-full bg-amber-600 text-white font-mono font-black text-micro flex items-center justify-center">
                        13
                      </span>
                      <span className="text-[10px] font-extrabold text-amber-950">Lonely</span>
                    </div>
                  </div>

                  <div className="w-full pt-1.5 border-t border-amber-100 text-center">
                    <p className="text-micro sm:text-small font-semibold text-amber-950">
                      <strong>3</strong> and <strong>13</strong> have no partners, so 156 cannot be a square!
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ================================================================= */}
      {/* METHOD 4: INTERVAL HALVING FOR √1936 */}
      {/* ================================================================= */}
      {activeTab === 'estimate-1936' && (
        <div className="flex flex-col justify-between gap-1.5 sm:gap-2 flex-1 min-h-0 overflow-hidden animate-fade-rise">
          {/* 4-Step Detective Guide Chips */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1 sm:gap-1.5 shrink-0">
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
                className={`min-h-[34px] p-1.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col gap-0.5 ${
                  estStep === item.step
                    ? 'bg-[#005583] text-white border-[#003F62] shadow-2xs'
                    : 'bg-slate-50 text-slate-800 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <span className="text-micro font-extrabold leading-tight truncate">{item.label}</span>
                <span className={`text-[10px] ${estStep === item.step ? 'text-sky-100' : 'text-slate-500'}`}>
                  {item.hint}
                </span>
              </button>
            ))}
          </div>

          {/* Interactive Bracket: 40^2 to 50^2 */}
          <div className="p-2 sm:p-2.5 rounded-2xl bg-slate-50/75 border border-slate-200 flex flex-col justify-between flex-1 min-h-0 overflow-hidden">
            <div className="flex flex-wrap items-center justify-between gap-1.5 shrink-0">
              <div className="flex items-center gap-1.5 text-micro sm:text-small font-extrabold text-slate-900">
                <Target className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <span>Test Numbers in Bracket 40–50</span>
              </div>
              <span
                className={`px-2 py-0.5 rounded-full text-micro font-extrabold border ${
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

            {/* Quick Buttons 40..50 */}
            <div className="grid grid-cols-6 sm:grid-cols-11 gap-1 my-1">
              {Array.from({ length: 11 }, (_, i) => 40 + i).map((val) => {
                const sq = val * val;
                const active = candidateRoot === val;
                const endsInSix = sq % 10 === 6;
                return (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setCandidateRoot(val)}
                    className={`min-h-[32px] py-1 px-0.5 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center tabular-nums ${
                      active
                        ? val === 44
                          ? 'bg-emerald-600 text-white border-emerald-700 shadow-2xs scale-105'
                          : 'bg-[#005583] text-white border-[#003F62] shadow-2xs'
                        : endsInSix
                        ? 'bg-orange-50 text-orange-950 border-orange-200 hover:bg-orange-100'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <span className="text-micro font-black leading-tight">{val}</span>
                    <span className={`text-[10px] font-mono leading-tight ${active ? 'text-white/90' : 'text-slate-500'}`}>
                      {sq}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Step Explanation Card */}
            <div className="p-2 rounded-xl bg-white border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-1.5 shrink-0">
              <div className="text-micro sm:text-small text-slate-800 leading-snug min-w-0">
                {estStep === 1 && (
                  <span>
                    <strong>Step 1:</strong> Since <strong>40² = 1600</strong> and <strong>50² = 2500</strong>, √1936 must live between <strong>40 and 50</strong>.
                  </span>
                )}
                {estStep === 2 && (
                  <span>
                    <strong>Step 2:</strong> 1936 ends in <strong>6</strong>! Only numbers ending in <strong>4</strong> or <strong>6</strong> square to end in 6 (test 44 or 46).
                  </span>
                )}
                {estStep === 3 && (
                  <span>
                    <strong>Step 3:</strong> Midpoint test: <strong>45² = 2025</strong>. Since 1936 &lt; 2025, the root is less than 45!
                  </span>
                )}
                {estStep === 4 && (
                  <span>
                    <strong>Step 4:</strong> 44 is left! Verify: <strong>44 × 44 = 1936</strong>. √1936 = 44!
                  </span>
                )}
              </div>

              <div className="text-small sm:text-body font-bold text-[#005583] shrink-0">
                <Katex
                  latex={isExact ? `44 \\times 44 = 1936 \\implies \\sqrt{1936} = 44` : `${candidateRoot}^2 = ${candidateSq}`}
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