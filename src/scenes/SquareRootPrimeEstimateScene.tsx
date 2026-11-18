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
  HelpCircle,
} from 'lucide-react';
import { useViewportTier } from '../hooks/useViewportTier';

export interface SquareRootPrimeEstimateSceneProps {
  initialTab?: 'sequential-576' | 'prime-pairs' | 'estimate-1936';
  beatIndex?: number;
  className?: string;
}

type TabType = 'sequential-576' | 'prime-pairs' | 'estimate-1936';
type PrimeNumChoice = '324' | '156' | '1156' | '2800';
type EstScenario = '1936' | '250-game' | '125-cloth';

export const SquareRootPrimeEstimateScene: React.FC<SquareRootPrimeEstimateSceneProps> = ({
  initialTab = 'prime-pairs',
  beatIndex,
  className = '',
}) => {
  const [activeTab, setActiveTab] = useState<TabType>(initialTab);
  const [pairsLocked, setPairsLocked] = useState<boolean>(true);

  // Method 1: Sequential Testing state (20 to 25)
  const [seqCandidate, setSeqCandidate] = useState<number>(24);

  // Method 3: Prime Pairs state (324, 156, 1156, 2800)
  const [selectedPrimeNum, setSelectedPrimeNum] = useState<PrimeNumChoice>('324');

  // Method 4: Interval Estimation state (1936, 250 Game, 125 Cloth)
  const [estScenario, setEstScenario] = useState<EstScenario>('1936');
  const [candidateRoot, setCandidateRoot] = useState<number>(44);
  const [estStep, setEstStep] = useState<1 | 2 | 3 | 4>(4);

  const { tier, isNarrow } = useViewportTier();
  const isCompact = tier === 'compact';

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  useEffect(() => {
    if (beatIndex === undefined) return;
    if (initialTab === 'estimate-1936') {
      if (beatIndex === 0) {
        setEstScenario('1936');
        setEstStep(1);
        setCandidateRoot(40);
      } else if (beatIndex === 1) {
        setEstScenario('1936');
        setEstStep(4);
        setCandidateRoot(44);
      } else if (beatIndex === 2) {
        setEstScenario('250-game');
      } else {
        setEstScenario('125-cloth');
      }
    } else if (initialTab === 'sequential-576') {
      setSeqCandidate(beatIndex <= 1 ? 21 : 24);
    } else {
      setPairsLocked(true);
      if (beatIndex === 0) setSelectedPrimeNum('324');
      else if (beatIndex === 1) setSelectedPrimeNum('156');
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
              Methods for Finding Square Roots
            </span>
          )}
          <h3 className="text-small sm:text-statement font-extrabold text-slate-900 mt-0.5">
            {activeTab === 'sequential-576'
              ? 'Method 1: Sequential Testing (576)'
              : activeTab === 'prime-pairs'
              ? 'Method 3: Prime Factor Pairs (324, 156, 1156, 2800)'
              : 'Method 4: Estimating Roots (1936, 250, 125)'}
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
            <span>4. Estimate Roots</span>
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
              <strong className="text-amber-900 font-bold">NCERT Note on Inefficiency:</strong> Testing sequentially works nicely for 24² = 576, but testing large numbers one by one becomes painfully slow.
            </div>
            <div className="font-mono text-small sm:text-body font-black text-emerald-800 shrink-0">
              <Katex latex="24^2 = 576 \implies \sqrt{576} = 24" displayMode={false} />
            </div>
          </div>
        </div>
      )}

      {/* ================================================================= */}
      {/* METHOD 3: PRIME PAIRS (324, 156, 1156, 2800) */}
      {/* ================================================================= */}
      {activeTab === 'prime-pairs' && (
        <div className="flex flex-col justify-between gap-2 flex-1 min-h-0 overflow-hidden animate-fade-rise">
          {/* Controls: Pick textbook number + Lock Pairs button */}
          <div className="flex flex-wrap items-center justify-between gap-2 p-1.5 rounded-2xl bg-slate-50/90 border border-slate-200/60 shrink-0">
            <div className="flex items-center gap-1 flex-wrap">
              <span className="text-micro font-bold text-slate-700 ml-1 mr-0.5">Test Number:</span>
              {(['324', '156', '1156', '2800'] as PrimeNumChoice[]).map((val) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => setSelectedPrimeNum(val)}
                  className={`min-h-[30px] px-2.5 py-0.5 rounded-lg text-micro font-mono font-bold cursor-pointer transition-all ${
                    selectedPrimeNum === val
                      ? 'bg-[#005583] text-white shadow-2xs'
                      : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {val} {val === '324' || val === '1156' ? '✓' : '✗'}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setPairsLocked((v) => !v)}
              className="min-h-[30px] px-3 py-1 rounded-xl text-micro font-bold flex items-center gap-1.5 transition-all cursor-pointer bg-[#005583] hover:bg-[#003F62] text-white shadow-2xs shrink-0"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{pairsLocked ? 'Pairs Locked' : 'Separate Factors'}</span>
            </button>
          </div>

          {/* Active Number Factor Card */}
          <div className="flex-1 min-h-0 flex flex-col justify-center">
            {selectedPrimeNum === '324' && (
              <div className="p-3 sm:p-4 rounded-2xl bg-emerald-50/70 border border-emerald-300 flex flex-col justify-between gap-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-small font-black text-emerald-950">
                    324 = 2 × 2 × 3 × 3 × 3 × 3
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-micro font-bold bg-emerald-100 text-emerald-900 border border-emerald-300">
                    Perfect Square!
                  </span>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-2 my-1">
                  {[
                    { a: 2, b: 2 },
                    { a: 3, b: 3 },
                    { a: 3, b: 3 },
                  ].map((pair, idx) => (
                    <div
                      key={idx}
                      className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl border-2 transition-all ${
                        pairsLocked ? 'bg-emerald-100 border-emerald-500 shadow-2xs' : 'bg-white border-slate-300'
                      }`}
                    >
                      <span className="w-7 h-7 rounded-full bg-emerald-600 text-white font-mono font-bold text-micro flex items-center justify-center">
                        {pair.a}
                      </span>
                      <span className="text-emerald-800 font-bold">×</span>
                      <span className="w-7 h-7 rounded-full bg-emerald-600 text-white font-mono font-bold text-micro flex items-center justify-center">
                        {pair.b}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="p-2 rounded-xl bg-white border border-emerald-200 text-center text-micro sm:text-small font-bold text-emerald-950">
                  Take one from each twin pair: <strong className="text-emerald-700">2 × 3 × 3 = 18</strong>. So <Katex latex="\sqrt{324} = 18" displayMode={false} />!
                </div>
              </div>
            )}

            {selectedPrimeNum === '156' && (
              <div className="p-3 sm:p-4 rounded-2xl bg-amber-50/70 border border-amber-300 flex flex-col justify-between gap-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-small font-black text-amber-950">
                    156 = 2 × 2 × 3 × 13
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-micro font-bold bg-amber-100 text-amber-900 border border-amber-300">
                    NOT a Square!
                  </span>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-2 my-1">
                  <div className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl border-2 bg-emerald-100 border-emerald-500">
                    <span className="w-7 h-7 rounded-full bg-emerald-600 text-white font-mono font-bold text-micro flex items-center justify-center">2</span>
                    <span className="text-emerald-800 font-bold">×</span>
                    <span className="w-7 h-7 rounded-full bg-emerald-600 text-white font-mono font-bold text-micro flex items-center justify-center">2</span>
                  </div>
                  <div className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl border-2 border-dashed border-amber-400 bg-amber-50">
                    <span className="w-7 h-7 rounded-full bg-amber-600 text-white font-mono font-bold text-micro flex items-center justify-center">3</span>
                    <span className="text-[11px] font-bold text-amber-900">Lonely</span>
                  </div>
                  <div className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl border-2 border-dashed border-amber-400 bg-amber-50">
                    <span className="w-7 h-7 rounded-full bg-amber-600 text-white font-mono font-bold text-micro flex items-center justify-center">13</span>
                    <span className="text-[11px] font-bold text-amber-900">Lonely</span>
                  </div>
                </div>

                <div className="p-2 rounded-xl bg-white border border-amber-200 text-center text-micro sm:text-small font-bold text-amber-950">
                  Factors <strong>3</strong> and <strong>13</strong> have no twin partners! Thus 156 cannot be a square.
                </div>
              </div>
            )}

            {selectedPrimeNum === '1156' && (
              <div className="p-3 sm:p-4 rounded-2xl bg-emerald-50/70 border border-emerald-300 flex flex-col justify-between gap-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-small font-black text-emerald-950">
                    1156 = 2 × 2 × 17 × 17
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-micro font-bold bg-emerald-100 text-emerald-900 border border-emerald-300">
                    NCERT Challenge: Square!
                  </span>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-2 my-1">
                  <div className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl border-2 bg-emerald-100 border-emerald-500 shadow-2xs">
                    <span className="w-7 h-7 rounded-full bg-emerald-600 text-white font-mono font-bold text-micro flex items-center justify-center">2</span>
                    <span className="text-emerald-800 font-bold">×</span>
                    <span className="w-7 h-7 rounded-full bg-emerald-600 text-white font-mono font-bold text-micro flex items-center justify-center">2</span>
                  </div>
                  <div className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl border-2 bg-emerald-100 border-emerald-500 shadow-2xs">
                    <span className="w-7 h-7 rounded-full bg-emerald-600 text-white font-mono font-bold text-micro flex items-center justify-center">17</span>
                    <span className="text-emerald-800 font-bold">×</span>
                    <span className="w-7 h-7 rounded-full bg-emerald-600 text-white font-mono font-bold text-micro flex items-center justify-center">17</span>
                  </div>
                </div>

                <div className="p-2 rounded-xl bg-white border border-emerald-200 text-center text-micro sm:text-small font-bold text-emerald-950">
                  Both (2 × 2) and (17 × 17) are paired! Root is <strong className="text-emerald-700">2 × 17 = 34</strong>. <Katex latex="\sqrt{1156} = 34" displayMode={false} />!
                </div>
              </div>
            )}

            {selectedPrimeNum === '2800' && (
              <div className="p-3 sm:p-4 rounded-2xl bg-amber-50/70 border border-amber-300 flex flex-col justify-between gap-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-small font-black text-amber-950">
                    2800 = 2⁴ × 5² × 7
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-micro font-bold bg-amber-100 text-amber-900 border border-amber-300">
                    NCERT Challenge: NOT Square!
                  </span>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-2 my-1">
                  <div className="flex items-center gap-1 px-2 py-1 rounded-xl border bg-emerald-100 border-emerald-400">
                    <span>(2 × 2)</span>
                  </div>
                  <div className="flex items-center gap-1 px-2 py-1 rounded-xl border bg-emerald-100 border-emerald-400">
                    <span>(2 × 2)</span>
                  </div>
                  <div className="flex items-center gap-1 px-2 py-1 rounded-xl border bg-emerald-100 border-emerald-400">
                    <span>(5 × 5)</span>
                  </div>
                  <div className="flex items-center gap-1 px-2.5 py-1 rounded-xl border-2 border-dashed border-amber-400 bg-amber-50">
                    <span className="font-bold text-amber-900">7 (Lonely Factor!)</span>
                  </div>
                </div>

                <div className="p-2 rounded-xl bg-white border border-amber-200 text-center text-micro sm:text-small font-bold text-amber-950">
                  Factor <strong>7</strong> has no partner! To make it a square, we would need to multiply by 7 (giving 19600 = 140²).
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ================================================================= */}
      {/* METHOD 4: ESTIMATING ROOTS (1936, 250 GAME, 125 CLOTH) */}
      {/* ================================================================= */}
      {activeTab === 'estimate-1936' && (
        <div className="flex flex-col justify-between gap-1.5 sm:gap-2 flex-1 min-h-0 overflow-hidden animate-fade-rise">
          {/* Scenario Selector Pills */}
          <div className="flex items-center justify-between gap-1 p-1 rounded-xl bg-slate-100/90 shrink-0">
            <span className="text-micro font-bold text-slate-600 ml-1">NCERT Scenario:</span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setEstScenario('1936')}
                className={`min-h-[30px] px-2.5 py-0.5 rounded-lg text-micro font-bold cursor-pointer transition-all ${
                  estScenario === '1936' ? 'bg-white text-[#005583] shadow-2xs' : 'text-slate-600'
                }`}
              >
                √1936 Halving
              </button>
              <button
                type="button"
                onClick={() => setEstScenario('250-game')}
                className={`min-h-[30px] px-2.5 py-0.5 rounded-lg text-micro font-bold cursor-pointer transition-all ${
                  estScenario === '250-game' ? 'bg-white text-[#005583] shadow-2xs' : 'text-slate-600'
                }`}
              >
                Aribam &amp; Bijou (√250)
              </button>
              <button
                type="button"
                onClick={() => setEstScenario('125-cloth')}
                className={`min-h-[30px] px-2.5 py-0.5 rounded-lg text-micro font-bold cursor-pointer transition-all ${
                  estScenario === '125-cloth' ? 'bg-white text-[#005583] shadow-2xs' : 'text-slate-600'
                }`}
              >
                Akhil's Cloth (125 cm²)
              </button>
            </div>
          </div>

          {/* SCENARIO 1: 1936 DETECTIVE */}
          {estScenario === '1936' && (
            <div className="flex flex-col justify-between flex-1 min-h-0 gap-1.5">
              {/* 4-Step Detective Guide Chips */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-1 shrink-0">
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
                    className={`min-h-[32px] p-1.5 rounded-xl border text-left cursor-pointer flex flex-col gap-0.5 ${
                      estStep === item.step
                        ? 'bg-[#005583] text-white border-[#003F62] shadow-2xs'
                        : 'bg-slate-50 text-slate-800 border-slate-200'
                    }`}
                  >
                    <span className="text-micro font-extrabold leading-tight truncate">{item.label}</span>
                    <span className={`text-[10px] ${estStep === item.step ? 'text-sky-100' : 'text-slate-500'}`}>
                      {item.hint}
                    </span>
                  </button>
                ))}
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
                      className={`min-h-[30px] py-0.5 px-0.5 rounded-xl border text-center cursor-pointer flex flex-col items-center justify-center tabular-nums ${
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
                      <span className={`text-[10px] font-mono ${active ? 'text-white/90' : 'text-slate-500'}`}>
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
                    <span><strong>Step 1:</strong> Since 40² = 1600 and 50² = 2500, √1936 is between 40 and 50.</span>
                  )}
                  {estStep === 2 && (
                    <span><strong>Step 2:</strong> 1936 ends in 6! Test candidates ending in 4 or 6: 44 or 46.</span>
                  )}
                  {estStep === 3 && (
                    <span><strong>Step 3:</strong> Midpoint test: 45² = 2025. Since 1936 &lt; 2025, root must be &lt; 45.</span>
                  )}
                  {estStep === 4 && (
                    <span><strong>Step 4:</strong> Only 44 is left! Verify: 44 × 44 = 1936. Exactly 44!</span>
                  )}
                </div>
                <div className="text-small sm:text-body font-bold text-[#005583] shrink-0">
                  <Katex latex={isExact ? `44 \\times 44 = 1936 \\implies \\sqrt{1936} = 44` : `${candidateRoot}^2 = ${candidateSq}`} displayMode={false} />
                </div>
              </div>
            </div>
          )}

          {/* SCENARIO 2: ARIBAM & BIJOU'S GAME (√250) */}
          {estScenario === '250-game' && (
            <div className="flex flex-col justify-between flex-1 min-h-0 gap-2 p-3 rounded-2xl bg-sky-50/70 border border-sky-200 animate-fade-rise">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#005583]">
                  Aribam and Bijou's Game (Page 9–10)
                </span>
                <h4 className="text-small sm:text-statement font-extrabold text-slate-900 mt-0.5">
                  &ldquo;Aribam says 250. Can Bijou find a number close to √250?&rdquo;
                </h4>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 my-auto">
                <div className="p-2.5 rounded-xl bg-white border border-slate-200 flex flex-col justify-between">
                  <span className="text-micro font-bold text-slate-500">Step 1: Tens Bracket</span>
                  <div className="font-mono text-small font-black text-slate-900 my-1">
                    10² = 100 &lt; 250 &lt; 400 = 20²
                  </div>
                  <span className="text-micro text-slate-600">So 10 &lt; √250 &lt; 20. But this is too wide!</span>
                </div>

                <div className="p-2.5 rounded-xl bg-white border border-slate-200 flex flex-col justify-between">
                  <span className="text-micro font-bold text-slate-500">Step 2: Nearest Integer Squares</span>
                  <div className="font-mono text-small font-black text-[#005583] my-1">
                    15² = 225 &lt; 250 &lt; 256 = 16²
                  </div>
                  <span className="text-micro text-slate-600">So 15 &lt; √250 &lt; 16.</span>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-white border border-sky-300 flex items-center justify-between gap-2 shrink-0">
                <p className="text-micro sm:text-small text-slate-800">
                  Since 256 is much closer to 250 than 225 (<Katex latex="256 - 250 = 6" displayMode={false} /> vs <Katex latex="250 - 225 = 25" displayMode={false} />):
                </p>
                <span className="font-mono text-small sm:text-statement font-black text-emerald-800 shrink-0">
                  √250 ≈ 16 (slightly &lt; 16)
                </span>
              </div>
            </div>
          )}

          {/* SCENARIO 3: AKHIL'S HANDKERCHIEF (125 cm²) */}
          {estScenario === '125-cloth' && (
            <div className="flex flex-col justify-between flex-1 min-h-0 gap-2 p-3 rounded-2xl bg-amber-50/70 border border-amber-200 animate-fade-rise">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800">
                  Akhil's Handkerchief Problem (Page 10)
                </span>
                <h4 className="text-small sm:text-statement font-extrabold text-slate-900 mt-0.5">
                  &ldquo;Square cloth of area 125 cm². Can he cut a handkerchief of side 15 cm?&rdquo;
                </h4>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 my-auto">
                <div className="p-2.5 rounded-xl bg-white border border-amber-200">
                  <span className="text-micro font-bold text-rose-700">Can he cut side 15 cm?</span>
                  <div className="font-mono text-small font-black text-rose-950 my-1">
                    15² = 225 cm² &gt; 125 cm²
                  </div>
                  <span className="text-micro text-slate-600">NO! 225 cm² requires far more cloth than 125 cm².</span>
                </div>

                <div className="p-2.5 rounded-xl bg-white border border-emerald-200">
                  <span className="text-micro font-bold text-emerald-700">Max Integer Handkerchief Side?</span>
                  <div className="font-mono text-small font-black text-emerald-950 my-1">
                    11² = 121 &lt; 125 &lt; 144 = 12²
                  </div>
                  <span className="text-micro text-slate-600">11² = 121 fits inside 125, but 12² = 144 overflows!</span>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-white border border-amber-300 flex items-center justify-between gap-2 shrink-0">
                <p className="text-micro sm:text-small text-slate-800">
                  Largest square handkerchief with an integer side length:
                </p>
                <span className="font-mono text-small sm:text-statement font-black text-emerald-800 shrink-0">
                  Side = 11 cm (Area = 121 cm²)
                </span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};