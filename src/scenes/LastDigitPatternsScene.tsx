/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { Katex } from '../components/Katex';
import { lastDigitOfSquare, trailingZeros, isSquare } from '../math/facts';
import { Grid3X3, Cpu, Sparkles, CheckCircle2, XCircle } from 'lucide-react';
import { useViewportTier } from '../hooks/useViewportTier';

export interface LastDigitPatternsSceneProps {
  beatIndex?: number;
  className?: string;
}

type PatternTab = 'table' | 'machine' | 'zeros-parity';

const LAST_DIGIT_PARTNERS: Record<number, number | null> = {
  0: null,
  1: 9,
  2: 8,
  3: 7,
  4: 6,
  5: null,
  6: 4,
  7: 3,
  8: 2,
  9: 1,
};

export const LastDigitPatternsScene: React.FC<LastDigitPatternsSceneProps> = ({
  beatIndex = 0,
  className = '',
}) => {
  const [activeTab, setActiveTab] = useState<PatternTab>('table');
  const [selectedDigit, setSelectedDigit] = useState<number>(4);
  const [digitFilter, setDigitFilter] = useState<number | 'all'>('all');
  const [zeroBase, setZeroBase] = useState<number>(300);
  const [testParityN, setTestParityN] = useState<number>(13);
  const [checkCandidate, setCheckCandidate] = useState<number>(26);
  const { tier, isNarrow } = useViewportTier();
  const isCompact = tier === 'compact';

  // Sync smoothly with story beats without remounting
  useEffect(() => {
    if (beatIndex <= 2) {
      setActiveTab('table');
      if (beatIndex === 2) {
        setDigitFilter(6);
        setCheckCandidate(26);
      } else {
        setDigitFilter('all');
      }
    } else if (beatIndex === 3 || beatIndex === 4) {
      setActiveTab('machine');
      setSelectedDigit(beatIndex === 4 ? 6 : 4);
    } else {
      setActiveTab('zeros-parity');
      setZeroBase(beatIndex === 5 ? 300 : 100);
    }
  }, [beatIndex]);

  const squares1to30 = useMemo(
    () =>
      Array.from({ length: 30 }, (_, idx) => {
        const n = idx + 1;
        const sq = n * n;
        return { n, sq, lastDigit: sq % 10 };
      }),
    []
  );

  const selectedSquareLast = lastDigitOfSquare(selectedDigit);
  const partnerDigit = LAST_DIGIT_PARTNERS[selectedDigit];
  const zeroStats = trailingZeros(zeroBase);
  const zeroBaseSquared = zeroBase * zeroBase;

  return (
    <div
      data-no-nav="true"
      className={`w-full max-w-5xl lg:max-w-6xl h-full max-h-full min-h-0 overflow-hidden mx-auto rounded-3xl border border-slate-200/80 bg-white ${
        isCompact ? 'p-2 gap-1.5' : 'p-3 sm:p-4 md:p-5 gap-2.5 sm:gap-3'
      } shadow-xs flex flex-col justify-between ${className}`}
    >
      {/* Header & Mode Switcher */}
      <div className={`flex ${isCompact ? 'flex-row items-center pb-1.5' : 'flex-col md:flex-row md:items-center pb-2'} justify-between gap-1.5 border-b border-slate-100 shrink-0`}>
        <div className="min-w-0">
          {!isCompact && (
            <span className="text-micro font-bold uppercase tracking-wider text-slate-500 hidden sm:block">
              Square Patterns · Last Digits, Zeros &amp; Parity
            </span>
          )}
          <h3 className={`${isCompact ? 'text-micro truncate' : 'text-small sm:text-statement'} font-extrabold text-slate-900 mt-0.5`}>
            {activeTab === 'table'
              ? '1² to 30² Ending Digits Explorer'
              : activeTab === 'machine'
              ? 'Last Digit Machine (0–9)'
              : 'Trailing Zeros & Even/Odd Parity'}
          </h3>
        </div>

        <div className={`flex flex-wrap items-center gap-1 p-1 rounded-xl bg-slate-100/90 ${isCompact ? 'w-auto shrink-0' : 'w-full md:w-auto'} justify-center`}>
          <button
            type="button"
            onClick={() => setActiveTab('table')}
            className={`${isCompact ? 'min-h-[32px] px-2.5 py-1' : 'min-h-[40px] sm:min-h-[36px] px-3 py-1'} rounded-lg text-micro font-bold flex items-center gap-1 transition-all cursor-pointer shrink-0 ${
              activeTab === 'table'
                ? 'bg-white text-[#005583] shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Grid3X3 className="w-3.5 h-3.5" />
            <span>1–30 Table</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('machine')}
            className={`${isCompact ? 'min-h-[32px] px-2.5 py-1' : 'min-h-[40px] sm:min-h-[36px] px-3 py-1'} rounded-lg text-micro font-bold flex items-center gap-1 transition-all cursor-pointer shrink-0 ${
              activeTab === 'machine'
                ? 'bg-white text-[#005583] shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>Digit Machine</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('zeros-parity')}
            className={`${isCompact ? 'min-h-[32px] px-2.5 py-1' : 'min-h-[40px] sm:min-h-[36px] px-3 py-1'} rounded-lg text-micro font-bold flex items-center gap-1 transition-all cursor-pointer shrink-0 ${
              activeTab === 'zeros-parity'
                ? 'bg-white text-[#005583] shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Zeros &amp; Parity</span>
          </button>
        </div>
      </div>

      {/* TAB 1: 1^2 to 30^2 ENDING DIGITS TABLE */}
      {activeTab === 'table' && (
        <div className="flex flex-col justify-between gap-1.5 sm:gap-2 flex-1 min-h-0 overflow-hidden animate-fade-rise">
          {/* Allowed vs Forbidden Digits Summary */}
          <div className={`grid ${isCompact ? 'grid-cols-2' : 'grid-cols-1 md:grid-cols-2'} gap-1.5 sm:gap-2 shrink-0`}>
            <div className={`${isCompact || isNarrow ? 'p-1.5 px-2' : 'p-2 sm:p-2.5'} rounded-2xl bg-emerald-50/70 flex flex-wrap items-center justify-between gap-1.5`}>
              <div className="flex items-center gap-1.5 text-micro sm:text-small font-bold text-emerald-950">
                <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600 shrink-0" />
                <span>Can end in:</span>
              </div>
              <div className="flex flex-wrap items-center gap-1 font-mono font-extrabold text-micro sm:text-small tabular-nums">
                {[0, 1, 4, 5, 6, 9].map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setDigitFilter(digitFilter === d ? 'all' : d)}
                    className={`${isCompact || isNarrow ? 'w-7 h-7' : 'w-8 h-8'} rounded-lg border cursor-pointer transition-colors ${
                      digitFilter === d
                        ? 'bg-emerald-600 text-white border-emerald-700'
                        : 'bg-white text-emerald-900 border-emerald-200 hover:bg-emerald-100'
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            <div className={`${isCompact || isNarrow ? 'p-1.5 px-2' : 'p-2 sm:p-2.5'} rounded-2xl bg-rose-50/70 flex flex-wrap items-center justify-between gap-1.5`}>
              <div className="flex items-center gap-1.5 text-micro sm:text-small font-bold text-rose-950">
                <XCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-rose-600 shrink-0" />
                <span>NEVER:</span>
              </div>
              <div className="flex flex-wrap items-center gap-1 font-mono font-extrabold text-micro sm:text-small tabular-nums">
                {[2, 3, 7, 8].map((d) => (
                  <span
                    key={d}
                    className={`${isCompact || isNarrow ? 'w-7 h-7' : 'w-8 h-8'} rounded-lg bg-white text-rose-700 border border-rose-200 flex items-center justify-center`}
                  >
                    {d}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* 30 Squares Grid */}
          <div
            className={`grid ${
              isCompact
                ? 'grid-cols-10 gap-1'
                : 'grid-cols-5 sm:grid-cols-6 lg:grid-cols-10 gap-1.5 sm:gap-2 lg:gap-2.5'
            } flex-1 min-h-0 content-center`}
          >
            {squares1to30.map(({ n, sq, lastDigit }) => {
              const highlighted = digitFilter === 'all' || digitFilter === lastDigit;
              const str = String(sq);
              const prefix = str.slice(0, -1);
              const last = str.slice(-1);

              return (
                <div
                  key={n}
                  className={`${
                    isCompact || isNarrow
                      ? 'p-1 rounded-lg'
                      : 'p-2 sm:p-2.5 lg:p-3 rounded-2xl'
                  } border-2 text-center transition-all tabular-nums flex flex-col justify-center shadow-2xs ${
                    highlighted
                      ? digitFilter !== 'all'
                        ? 'bg-orange-50 border-[#F27A00] shadow-sm scale-[1.04] ring-2 ring-orange-200'
                        : 'bg-slate-50/90 border-slate-200 hover:border-slate-300'
                      : 'bg-slate-50/30 border-slate-100 opacity-30'
                  }`}
                >
                  <div className="text-[11px] sm:text-micro font-bold text-slate-500 leading-tight">{n}²</div>
                  <div className="font-mono text-micro sm:text-statement md:text-title font-black text-slate-900 leading-tight mt-0.5">
                    <span>{prefix}</span>
                    <span className="text-[#F27A00] underline decoration-2 sm:decoration-3 underline-offset-2">
                      {last}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Square Trap Checker (16, 36 vs 26, 47, 327, 576, 2078) */}
          <div className={`${isCompact ? 'p-1.5 px-2' : 'p-2 sm:px-3'} rounded-2xl bg-slate-50/90 border border-slate-200/60 flex flex-col sm:flex-row items-center justify-between gap-1.5 shrink-0`}>
            <div className="flex items-center justify-center sm:justify-start gap-1 flex-wrap">
              <span className="text-micro font-bold text-slate-700 mr-0.5">Test Candidate:</span>
              {[16, 26, 36, 47, 327, 576, 2078].map((cand) => (
                <button
                  key={cand}
                  type="button"
                  onClick={() => setCheckCandidate(cand)}
                  className={`${isCompact ? 'min-h-[30px] px-1.5' : 'min-h-[34px] sm:min-h-[30px] px-2'} py-0.5 rounded-lg font-mono text-micro font-bold border cursor-pointer transition-colors tabular-nums ${
                    checkCandidate === cand
                      ? 'bg-[#005583] text-white border-[#003F62] shadow-2xs'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {cand}
                </button>
              ))}
            </div>

            <div className="text-micro sm:text-small font-bold text-slate-800 text-center sm:text-right leading-tight">
              {checkCandidate === 327 ? (
                <span className="text-rose-700">
                  <strong>327</strong> ends in 7 → Squares <em>never</em> end in 2, 3, 7, 8 (Definitively Not a Square!)
                </span>
              ) : checkCandidate === 576 ? (
                <span className="text-emerald-700">
                  <strong>576</strong> ends in 6 (satisfies condition) &amp; <strong>24² = 576</strong> (Square! But ending alone doesn't guarantee it)
                </span>
              ) : isSquare(checkCandidate) ? (
                <span className="text-emerald-700">
                  <strong>{checkCandidate}</strong> = {Math.round(Math.sqrt(checkCandidate))}² (Square!)
                </span>
              ) : [2, 3, 7, 8].includes(checkCandidate % 10) ? (
                <span className="text-rose-700">
                  <strong>{checkCandidate}</strong> ends in {checkCandidate % 10} → squares NEVER end in 2, 3, 7, or 8!
                </span>
              ) : (
                <span className="text-amber-800">
                  <strong>{checkCandidate}</strong> ends in {checkCandidate % 10} (valid ending), yet is NOT a square!
                </span>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: LAST DIGIT MACHINE (0-9) */}
      {activeTab === 'machine' && (
        <div className={`flex flex-col flex-1 min-h-0 overflow-hidden justify-center ${isCompact ? 'gap-1.5' : 'gap-2.5 sm:gap-3.5'} animate-fade-rise`}>
          <div className={`${isCompact ? 'flex flex-wrap justify-center gap-1.5' : 'grid grid-cols-5 sm:flex sm:flex-wrap items-center justify-center gap-1.5 sm:gap-2 max-w-[260px] sm:max-w-none mx-auto'} shrink-0`}>
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((d) => {
              const isSelected = selectedDigit === d;
              const isPartner = partnerDigit === d;
              return (
                <button
                  key={d}
                  type="button"
                  onClick={() => setSelectedDigit(d)}
                  className={`${
                    isCompact ? 'w-8 h-8 rounded-xl text-small' : isNarrow ? 'w-10 h-9 rounded-xl text-small' : 'w-10 h-10 sm:w-11 sm:h-11 rounded-2xl text-body'
                  } font-mono font-black border-2 transition-all cursor-pointer tabular-nums mx-auto sm:mx-0 ${
                    isSelected
                      ? 'bg-[#005583] text-white border-[#003F62] shadow-sm scale-105'
                      : isPartner
                      ? 'bg-orange-100 text-orange-950 border-[#F27A00]'
                      : 'bg-slate-50 text-slate-700 border-slate-200/80 hover:bg-slate-100'
                  }`}
                >
                  {d}
                </button>
              );
            })}
          </div>

          <div className={`grid ${isCompact ? 'grid-cols-2 gap-2' : 'grid-cols-1 md:grid-cols-2 gap-2 sm:gap-3'} items-stretch min-h-0`}>
            {/* Machine Result Card */}
            <div className={`${isCompact || isNarrow ? 'p-2.5 gap-1' : 'p-3.5 sm:p-4 gap-2'} rounded-2xl bg-blue-50/60 flex flex-col items-center justify-center text-center`}>
              <span className="text-[11px] sm:text-micro font-bold uppercase tracking-wider text-blue-700">
                Ends in {selectedDigit}
              </span>
              <div className={`${isCompact ? 'text-statement' : 'text-title sm:text-headline'} font-black font-mono text-[#005583] tabular-nums`}>
                {selectedDigit}² = {selectedDigit * selectedDigit} → ends in{' '}
                <span className="text-[#F27A00]">{selectedSquareLast}</span>
              </div>
              <p className="text-micro sm:text-small text-slate-700">
                {partnerDigit !== null ? (
                  <>
                    Twin partner <strong>{partnerDigit}</strong>: {partnerDigit}² ={' '}
                    {partnerDigit * partnerDigit} also ends in{' '}
                    <strong>{selectedSquareLast}</strong>!
                  </>
                ) : (
                  <>
                    <strong>{selectedDigit}</strong> is the only digit whose square ends in{' '}
                    <strong>{selectedSquareLast}</strong>!
                  </>
                )}
              </p>
            </div>

            {/* Real Multi-Digit Check */}
            <div className={`${isCompact || isNarrow ? 'p-2.5 gap-1.5' : 'p-3.5 sm:p-4 gap-2.5'} rounded-2xl bg-slate-50/80 flex flex-col justify-center`}>
              <span className="text-[11px] sm:text-micro font-bold uppercase tracking-wider text-slate-600">
                Multi-Digit Examples Ending in {selectedDigit}
              </span>
              <div className="flex flex-col gap-1 font-mono text-micro sm:text-small font-bold tabular-nums">
                {[10 + selectedDigit, 30 + selectedDigit, 70 + selectedDigit].map((num) => (
                  <div
                    key={num}
                    className={`px-2.5 ${isCompact || isNarrow ? 'py-1' : 'py-1.5'} rounded-xl bg-white border border-slate-200/70 flex items-center justify-between`}
                  >
                    <span>{num}²</span>
                    <span className="text-[#005583]">
                      {String(num * num).slice(0, -1)}
                      <span className="text-[#F27A00] font-black">{(num * num) % 10}</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: TRAILING ZEROS & PARITY */}
      {activeTab === 'zeros-parity' && (
        <div className={`grid ${isCompact ? 'grid-cols-2 gap-2' : 'grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 lg:gap-6'} flex-1 min-h-0 overflow-hidden items-center animate-fade-rise`}>
          {/* Trailing Zeros Doubler */}
          <div className={`${isCompact || isNarrow ? 'p-2.5 gap-2' : 'p-4 sm:p-5 md:p-6 gap-3 sm:gap-4'} rounded-3xl bg-purple-50/60 border border-purple-100 flex flex-col justify-between h-full`}>
            <div>
              <span className="text-micro sm:text-small font-black uppercase tracking-wider text-purple-800">
                Trailing Zeros Double (k → 2k)
              </span>
              <h4 className="text-statement sm:text-title font-extrabold text-slate-900 mt-1">
                Squaring Doubles Ending Zeros
              </h4>
            </div>

            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {[10, 30, 100, 300, 2000].map((val) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => setZeroBase(val)}
                  className={`${isCompact || isNarrow ? 'min-h-[34px] px-2.5 py-1 text-micro' : 'min-h-[44px] px-3.5 py-1.5 text-small sm:text-statement'} rounded-xl font-mono font-bold border cursor-pointer transition-all tabular-nums ${
                    zeroBase === val
                      ? 'bg-purple-700 text-white border-purple-800 shadow-sm scale-105'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-purple-50'
                  }`}
                >
                  {val}
                </button>
              ))}
            </div>

            <div className={`${isCompact || isNarrow ? 'p-2.5 gap-1' : 'p-4 sm:p-5 gap-2'} rounded-2xl bg-white border border-purple-200/80 shadow-xs flex flex-col text-center`}>
              <div className={`font-mono ${isCompact ? 'text-statement' : 'text-title sm:text-headline'} font-black text-slate-900 tabular-nums`}>
                {zeroBase}² = {zeroBaseSquared.toLocaleString()}
              </div>
              <div className="text-small sm:text-statement text-purple-900 font-extrabold">
                <span className="text-blue-700">{zeroStats.originalZeros} {zeroStats.originalZeros === 1 ? 'zero' : 'zeros'}</span>
                {' '}→{' '}
                <span className="text-purple-700 underline decoration-2">{zeroStats.squareZeros} trailing zeros</span>!
              </div>
              <p className="text-micro sm:text-small text-slate-500 mt-1">
                A square number can NEVER end in an odd number of zeros (e.g. 1000 is impossible).
              </p>
            </div>
          </div>

          {/* Parity Tester */}
          <div className={`${isCompact || isNarrow ? 'p-2.5 gap-2' : 'p-4 sm:p-5 md:p-6 gap-3 sm:gap-4'} rounded-3xl bg-emerald-50/60 border border-emerald-100 flex flex-col justify-between h-full`}>
            <div>
              <span className="text-micro sm:text-small font-black uppercase tracking-wider text-emerald-800">
                Even / Odd Parity Rule
              </span>
              <h4 className="text-statement sm:text-title font-extrabold text-slate-900 mt-1">
                Even² = Even · Odd² = Odd
              </h4>
            </div>

            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {[12, 13, 24, 25, 42, 71].map((val) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => setTestParityN(val)}
                  className={`${isCompact || isNarrow ? 'min-h-[34px] px-2.5 py-1 text-micro' : 'min-h-[44px] px-3.5 py-1.5 text-small sm:text-statement'} rounded-xl font-mono font-bold border cursor-pointer transition-all tabular-nums ${
                    testParityN === val
                      ? 'bg-emerald-700 text-white border-emerald-800 shadow-sm scale-105'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-emerald-50'
                  }`}
                >
                  {val} ({val % 2 === 0 ? 'Even' : 'Odd'})
                </button>
              ))}
            </div>

            <div className={`${isCompact || isNarrow ? 'p-2.5 gap-1' : 'p-4 sm:p-5 gap-2'} rounded-2xl bg-white border border-emerald-200/80 shadow-xs flex flex-col items-center text-center`}>
              <div className={`font-mono ${isCompact ? 'text-statement' : 'text-title sm:text-headline'} font-black text-slate-900 tabular-nums`}>
                {testParityN}² = {testParityN * testParityN}
              </div>
              <div className="max-w-full flex flex-wrap justify-center font-bold text-small sm:text-statement">
                <Katex
                  latex={
                    testParityN % 2 === 0
                      ? `\\mathbf{${testParityN}}\\text{ is even} \\implies \\mathbf{${testParityN * testParityN}}\\text{ is even}`
                      : `\\mathbf{${testParityN}}\\text{ is odd} \\implies \\mathbf{${testParityN * testParityN}}\\text{ is odd}`
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

export interface LastDigitSortingTraysSvgProps {
  digit: number;
  inTray?: boolean;
  showStamp?: boolean;
}

export const LastDigitSortingTraysSvg: React.FC<LastDigitSortingTraysSvgProps> = ({
  digit,
  inTray = false,
  showStamp = false,
}) => {
  const isForbidden = [2, 3, 7, 8].includes(digit);
  const allowedDigits = [0, 1, 4, 5, 6, 9];
  const forbiddenDigits = [2, 3, 7, 8];

  return (
    <div className="w-full max-w-[360px] flex flex-col items-center gap-2">
      <div className="grid grid-cols-2 gap-2.5 w-full">
        {/* Allowed Tray */}
        <div
          className={`p-2 rounded-2xl border-2 text-center transition-all duration-400 ${
            inTray && !isForbidden
              ? 'bg-emerald-100 border-emerald-500 scale-[1.03]'
              : 'bg-emerald-50/70 border-emerald-200'
          }`}
          style={{ transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)' }}
        >
          <div className="text-micro font-extrabold text-emerald-800 flex items-center justify-center gap-1 mb-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>Allowed</span>
          </div>
          <div className="flex items-center justify-center gap-1 font-mono font-black text-micro flex-wrap">
            {allowedDigits.map((d) => {
              const hit = inTray && d === digit;
              return (
                <span
                  key={d}
                  className={`w-6 h-6 rounded-lg flex items-center justify-center border transition-all duration-300 ${
                    hit
                      ? 'bg-emerald-600 text-white border-emerald-700 scale-115 shadow-xs'
                      : 'bg-white text-emerald-900 border-emerald-200'
                  }`}
                >
                  {d}
                </span>
              );
            })}
          </div>
        </div>

        {/* Forbidden Tray */}
        <div
          className={`p-2 rounded-2xl border-2 text-center transition-all duration-400 ${
            inTray && isForbidden
              ? 'bg-rose-100 border-rose-500 scale-[1.03] shadow-xs'
              : 'bg-rose-50/70 border-rose-200'
          }`}
          style={{ transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)' }}
        >
          <div className="text-micro font-extrabold text-rose-800 flex items-center justify-center gap-1 mb-1">
            <XCircle className="w-3.5 h-3.5 text-rose-600 shrink-0" />
            <span>Forbidden</span>
          </div>
          <div className="flex items-center justify-center gap-1 font-mono font-black text-micro flex-wrap">
            {forbiddenDigits.map((d) => {
              const hit = inTray && d === digit;
              return (
                <span
                  key={d}
                  className={`w-6 h-6 rounded-lg flex items-center justify-center border transition-all duration-300 ${
                    hit
                      ? 'bg-rose-600 text-white border-rose-700 scale-120 shadow-xs'
                      : 'bg-white text-rose-700 border-rose-200'
                  }`}
                >
                  {d}
                </span>
              );
            })}
          </div>
        </div>
      </div>

      {showStamp && (
        <div
          className={`px-3 py-1 rounded-xl font-black text-micro tracking-wide border-2 ${
            isForbidden
              ? 'bg-rose-600 text-white border-rose-700'
              : 'bg-emerald-600 text-white border-emerald-700'
          }`}
        >
          {isForbidden ? 'IMPOSSIBLE ✗ (Never a Square)' : 'ALLOWED ENDING ✓'}
        </div>
      )}
    </div>
  );
};

export interface SquareZerosParitySvgProps {
  mode: 'zeros' | 'parity';
  baseZeros?: number;
  expanded?: boolean;
  parityNum?: number;
}

export const SquareZerosParitySvg: React.FC<SquareZerosParitySvgProps> = ({
  mode,
  baseZeros = 2,
  expanded = false,
  parityNum = 5,
}) => {
  if (mode === 'zeros') {
    const outZeros = expanded ? baseZeros * 2 : baseZeros;
    return (
      <div className="flex flex-col items-center gap-2">
        <div className="flex items-center gap-2 font-mono font-black text-body">
          <span className="px-2.5 py-1 rounded-xl bg-sky-50 border border-sky-200 text-[#005583]">
            3 × 10^{baseZeros}
          </span>
          <span className="text-slate-400">→</span>
          <div className="flex items-center gap-1">
            {Array.from({ length: outZeros }).map((_, i) => (
              <span
                key={i}
                className="w-7 h-8 rounded-lg bg-purple-600 text-white font-mono font-black text-small flex items-center justify-center shadow-2xs transition-all duration-300"
                style={{ transitionDelay: `${i * 75}ms` }}
              >
                0
              </span>
            ))}
          </div>
        </div>
        <span className="text-micro font-bold text-purple-800">
          {expanded
            ? `${baseZeros} zeros × 2 = ${outZeros} zeros (ALWAYS EVEN!)`
            : `${baseZeros} trailing zeros waiting to double`}
        </span>
      </div>
    );
  }

  // Parity SVG dot pairing (odd = leftover dot; odd x odd = odd)
  const isOdd = parityNum % 2 === 1;
  return (
    <svg viewBox="0 0 260 110" className="h-[104px] w-auto select-none">
      {/* Input Number Parity Dots */}
      <g transform="translate(16, 18)">
        <text x={36} y={-2} textAnchor="middle" fill="#0F172A" fontSize={14} fontWeight={800}>
          {parityNum} ({isOdd ? 'Odd' : 'Even'})
        </text>
        {Array.from({ length: Math.min(7, parityNum) }).map((_, i) => {
          const col = i % 2;
          const row = Math.floor(i / 2);
          const isSingle = isOdd && i === Math.min(7, parityNum) - 1;
          return (
            <circle
              key={i}
              cx={col * 22 + 24}
              cy={row * 18 + 16}
              r={6.5}
              fill={isSingle ? '#F27A00' : '#0788D3'}
              stroke={isSingle ? '#9A3412' : '#0369A1'}
              strokeWidth={1.5}
            />
          );
        })}
      </g>

      <text x={115} y={56} textAnchor="middle" fill="#64748B" fontSize={18} fontWeight={900}>
        →
      </text>

      {/* Squared Parity Output Box */}
      <g transform="translate(142, 18)">
        <rect
          x={0}
          y={4}
          width={106}
          height={68}
          rx={14}
          fill={isOdd ? '#FFF7ED' : '#ECFDF5'}
          stroke={isOdd ? '#F27A00' : '#16A34A'}
          strokeWidth={2}
        />
        <text x={53} y={32} textAnchor="middle" fill="#0F172A" fontSize={15} fontWeight={900}>
          {parityNum}² = {parityNum * parityNum}
        </text>
        <text
          x={53}
          y={54}
          textAnchor="middle"
          fill={isOdd ? '#C2410C' : '#15803D'}
          fontSize={14}
          fontWeight={800}
        >
          {isOdd ? 'Always ODD' : 'Always EVEN'}
        </text>
      </g>
    </svg>
  );
};

