/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { COLORS } from '../design/tokens';
import { Katex } from '../components/Katex';
import { lastDigitOfSquare, trailingZeros, isSquare } from '../math/facts';
import { Grid3X3, Cpu, Sparkles, CheckCircle2, XCircle } from 'lucide-react';

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
      className={`w-full max-w-4xl mx-auto rounded-3xl border border-slate-200/80 bg-white p-5 sm:p-7 shadow-xs flex flex-col gap-5 ${className}`}
    >
      {/* Header & Mode Switcher */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <span className="text-micro font-bold uppercase tracking-wider text-slate-500">
            Square Patterns · Last Digits, Zeros &amp; Parity
          </span>
          <h3 className="text-statement font-extrabold text-slate-900 mt-0.5">
            {activeTab === 'table'
              ? '1² to 30² Ending Digits Explorer'
              : activeTab === 'machine'
              ? 'Last Digit Machine (0–9)'
              : 'Trailing Zeros & Even/Odd Parity'}
          </h3>
        </div>

        <div className="flex flex-wrap items-center gap-1 p-1 rounded-xl bg-slate-100/90">
          <button
            type="button"
            onClick={() => setActiveTab('table')}
            className={`min-h-[40px] px-3 py-1.5 rounded-lg text-micro font-bold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap shrink-0 ${
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
            className={`min-h-[40px] px-3 py-1.5 rounded-lg text-micro font-bold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap shrink-0 ${
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
            className={`min-h-[40px] px-3 py-1.5 rounded-lg text-micro font-bold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap shrink-0 ${
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
        <div className="flex flex-col gap-4 animate-fade-rise">
          {/* Allowed vs Forbidden Digits Summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="p-3.5 rounded-2xl bg-emerald-50/70 flex flex-wrap items-center justify-between gap-2.5">
              <div className="flex items-center gap-2 text-small font-bold text-emerald-950">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Squares CAN end in:</span>
              </div>
              <div className="flex flex-wrap items-center gap-1.5 font-mono font-extrabold text-small tabular-nums">
                {[0, 1, 4, 5, 6, 9].map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setDigitFilter(digitFilter === d ? 'all' : d)}
                    className={`w-8 h-8 rounded-lg border cursor-pointer transition-colors ${
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

            <div className="p-3.5 rounded-2xl bg-rose-50/70 flex flex-wrap items-center justify-between gap-2.5">
              <div className="flex items-center gap-2 text-small font-bold text-rose-950">
                <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>NEVER end in:</span>
              </div>
              <div className="flex flex-wrap items-center gap-1.5 font-mono font-extrabold text-small tabular-nums">
                {[2, 3, 7, 8].map((d) => (
                  <span
                    key={d}
                    className="w-8 h-8 rounded-lg bg-white text-rose-700 border border-rose-200 flex items-center justify-center"
                  >
                    {d}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* 30 Squares Grid */}
          <div className="grid grid-cols-5 sm:grid-cols-6 gap-2">
            {squares1to30.map(({ n, sq, lastDigit }) => {
              const highlighted = digitFilter === 'all' || digitFilter === lastDigit;
              const str = String(sq);
              const prefix = str.slice(0, -1);
              const last = str.slice(-1);

              return (
                <div
                  key={n}
                  className={`p-2 rounded-xl border text-center transition-all tabular-nums ${
                    highlighted
                      ? digitFilter !== 'all'
                        ? 'bg-orange-50 border-orange-400 shadow-2xs scale-[1.02]'
                        : 'bg-slate-50 border-slate-200'
                      : 'bg-slate-50/40 border-slate-100 opacity-35'
                  }`}
                >
                  <div className="text-[11px] font-semibold text-slate-500">{n}²</div>
                  <div className="font-mono text-small font-extrabold text-slate-900">
                    <span>{prefix}</span>
                    <span className="text-[#F27A00] underline decoration-2 underline-offset-2">
                      {last}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Square Trap Checker (16, 36 vs 26, 47, 2078) */}
          <div className="p-3.5 sm:px-4 rounded-2xl bg-slate-50/80 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-micro font-bold text-slate-600 mr-1">Test Trap Numbers:</span>
              {[16, 26, 36, 47, 82, 2078].map((cand) => (
                <button
                  key={cand}
                  type="button"
                  onClick={() => setCheckCandidate(cand)}
                  className={`min-h-[36px] px-3 py-1 rounded-xl font-mono text-micro font-bold border cursor-pointer transition-colors tabular-nums ${
                    checkCandidate === cand
                      ? 'bg-[#005583] text-white border-[#003F62]'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {cand}
                </button>
              ))}
            </div>

            <div className="text-small font-bold text-slate-800 text-center sm:text-right">
              {isSquare(checkCandidate) ? (
                <span className="text-emerald-700">
                  {checkCandidate} = {Math.round(Math.sqrt(checkCandidate))}² (Perfect Square!)
                </span>
              ) : [2, 3, 7, 8].includes(checkCandidate % 10) ? (
                <span className="text-rose-700">
                  {checkCandidate} ends in {checkCandidate % 10} — impossible for any square!
                </span>
              ) : (
                <span className="text-amber-800">
                  {checkCandidate} ends in {checkCandidate % 10}, yet 5²=25 &lt; 26 &lt; 36=6² (Not a square!)
                </span>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: LAST DIGIT MACHINE (0-9) */}
      {activeTab === 'machine' && (
        <div className="flex flex-col gap-5 animate-fade-rise">
          <div className="grid grid-cols-5 sm:flex sm:flex-wrap items-center justify-center gap-2 max-w-[280px] sm:max-w-none mx-auto">
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((d) => {
              const isSelected = selectedDigit === d;
              const isPartner = partnerDigit === d;
              return (
                <button
                  key={d}
                  type="button"
                  onClick={() => setSelectedDigit(d)}
                  className={`w-11 h-11 rounded-2xl font-mono text-body font-black border-2 transition-all cursor-pointer tabular-nums mx-auto sm:mx-0 ${
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
            {/* Machine Result Card */}
            <div className="p-5 rounded-2xl bg-blue-50/60 flex flex-col items-center justify-center gap-2 text-center">
              <span className="text-micro font-bold uppercase tracking-wider text-blue-700">
                Squaring a number ending in {selectedDigit}
              </span>
              <div className="text-title sm:text-headline font-black font-mono text-[#005583] tabular-nums">
                {selectedDigit}² = {selectedDigit * selectedDigit} → ends in{' '}
                <span className="text-[#F27A00]">{selectedSquareLast}</span>
              </div>
              <p className="text-small text-slate-700">
                {partnerDigit !== null ? (
                  <>
                    Notice twin partner <strong>{partnerDigit}</strong>: {partnerDigit}² ={' '}
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
            <div className="p-5 rounded-2xl bg-slate-50/80 flex flex-col justify-center gap-3">
              <span className="text-micro font-bold uppercase tracking-wider text-slate-600">
                Check Multi-Digit Examples Ending in {selectedDigit}
              </span>
              <div className="flex flex-col gap-2 font-mono text-small font-bold tabular-nums">
                {[10 + selectedDigit, 30 + selectedDigit, 70 + selectedDigit].map((num) => (
                  <div
                    key={num}
                    className="px-3.5 py-2 rounded-xl bg-white border border-slate-200/70 flex items-center justify-between"
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fade-rise">
          {/* Trailing Zeros Doubler */}
          <div className="p-5 rounded-2xl bg-purple-50/50 flex flex-col gap-4">
            <div>
              <span className="text-micro font-bold uppercase tracking-wider text-purple-800">
                Trailing Zeros Double (k → 2k)
              </span>
              <h4 className="text-statement font-extrabold text-slate-900 mt-0.5">
                Squaring Doubles Ending Zeros
              </h4>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {[10, 30, 100, 300, 2000].map((val) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => setZeroBase(val)}
                  className={`min-h-[38px] px-3 py-1 rounded-xl font-mono text-micro font-bold border cursor-pointer transition-all tabular-nums ${
                    zeroBase === val
                      ? 'bg-purple-700 text-white border-purple-800 shadow-2xs'
                      : 'bg-white text-slate-700 border-slate-200/80 hover:bg-purple-50'
                  }`}
                >
                  {val}
                </button>
              ))}
            </div>

            <div className="p-4 rounded-2xl bg-white border border-purple-100 flex flex-col gap-2 text-center">
              <div className="font-mono text-body font-black text-slate-900 tabular-nums">
                {zeroBase}² = {zeroBaseSquared.toLocaleString()}
              </div>
              <div className="text-small text-purple-900 font-semibold">
                {zeroStats.originalZeros} trailing {zeroStats.originalZeros === 1 ? 'zero' : 'zeros'} →{' '}
                <strong>{zeroStats.squareZeros} trailing zeros</strong>!
              </div>
              <p className="text-micro text-slate-500">
                A square can NEVER end in an odd number of zeros (like 1000).
              </p>
            </div>
          </div>

          {/* Parity Tester */}
          <div className="p-5 rounded-2xl bg-emerald-50/50 flex flex-col gap-4">
            <div>
              <span className="text-micro font-bold uppercase tracking-wider text-emerald-800">
                Even / Odd Parity Rule
              </span>
              <h4 className="text-statement font-extrabold text-slate-900 mt-0.5">
                Even² = Even · Odd² = Odd
              </h4>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {[12, 13, 24, 25, 42, 71].map((val) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => setTestParityN(val)}
                  className={`min-h-[38px] px-3 py-1 rounded-xl font-mono text-micro font-bold border cursor-pointer transition-all tabular-nums ${
                    testParityN === val
                      ? 'bg-emerald-700 text-white border-emerald-800 shadow-2xs'
                      : 'bg-white text-slate-700 border-slate-200/80 hover:bg-emerald-50'
                  }`}
                >
                  {val} ({val % 2 === 0 ? 'Even' : 'Odd'})
                </button>
              ))}
            </div>

            <div className="p-4 rounded-2xl bg-white border border-emerald-100 flex flex-col items-center gap-2 text-center overflow-x-auto">
              <div className="font-mono text-body font-black text-slate-900 tabular-nums">
                {testParityN}² = {testParityN * testParityN}
              </div>
              <Katex
                latex={
                  testParityN % 2 === 0
                    ? `${testParityN}\\text{ is even} \\implies ${testParityN * testParityN}\\text{ is even}`
                    : `${testParityN}\\text{ is odd} \\implies ${testParityN * testParityN}\\text{ is odd}`
                }
                displayMode={false}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
