/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { COLORS } from '../design/tokens';
import { Katex } from '../components/Katex';
import { Scale, Sparkles, Box, Layers } from 'lucide-react';

export interface CubeOddSumsAndTaxiSceneProps {
  initialTab?: 'odd-sums' | 'taxicab';
  className?: string;
}

interface OddCubeGroup {
  n: number;
  odds: number[];
  sum: number;
  startIndex: number;
}

const ODD_CUBE_GROUPS: OddCubeGroup[] = [
  { n: 1, odds: [1], sum: 1, startIndex: 0 },
  { n: 2, odds: [3, 5], sum: 8, startIndex: 1 },
  { n: 3, odds: [7, 9, 11], sum: 27, startIndex: 3 },
  { n: 4, odds: [13, 15, 17, 19], sum: 64, startIndex: 6 },
  { n: 5, odds: [21, 23, 25, 27, 29], sum: 125, startIndex: 10 },
];

const ALL_ODDS_TAPE = ODD_CUBE_GROUPS.flatMap((g) => g.odds);

type PanChoice = '1_12' | '9_10' | '2_11';

interface PanOption {
  id: PanChoice;
  a: number;
  b: number;
  aCube: number;
  bCube: number;
  total: number;
  label: string;
}

const PAN_OPTIONS: Record<PanChoice, PanOption> = {
  '1_12': {
    id: '1_12',
    a: 1,
    b: 12,
    aCube: 1,
    bCube: 1728,
    total: 1729,
    label: '1³ + 12³ = 1 + 1728 = 1729',
  },
  '9_10': {
    id: '9_10',
    a: 9,
    b: 10,
    aCube: 729,
    bCube: 1000,
    total: 1729,
    label: '9³ + 10³ = 729 + 1000 = 1729',
  },
  '2_11': {
    id: '2_11',
    a: 2,
    b: 11,
    aCube: 8,
    bCube: 1331,
    total: 1339,
    label: '2³ + 11³ = 8 + 1331 = 1339',
  },
};

function MiniIsoCube({
  size,
  label,
  topFill,
  leftFill,
  rightFill,
  stroke,
}: {
  size: number;
  label: string;
  topFill: string;
  leftFill: string;
  rightFill: string;
  stroke: string;
}) {
  const halfW = size * 0.866;
  const qH = size * 0.5;
  const cx = halfW + 4;
  const topY = 4;

  const topPoints = `${cx},${topY} ${cx + halfW},${topY + qH} ${cx},${topY + 2 * qH} ${cx - halfW},${topY + qH}`;
  const leftPoints = `${cx - halfW},${topY + qH} ${cx},${topY + 2 * qH} ${cx},${topY + 2 * qH + size} ${cx - halfW},${topY + qH + size}`;
  const rightPoints = `${cx},${topY + 2 * qH} ${cx + halfW},${topY + qH} ${cx + halfW},${topY + qH + size} ${cx},${topY + 2 * qH + size}`;

  const w = halfW * 2 + 8;
  const h = size * 2 + 12;

  return (
    <div className="flex flex-col items-center gap-1">
      <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="overflow-visible">
        <polygon points={topPoints} fill={topFill} stroke={stroke} strokeWidth={1.4} strokeLinejoin="round" />
        <polygon points={leftPoints} fill={leftFill} stroke={stroke} strokeWidth={1.4} strokeLinejoin="round" />
        <polygon points={rightPoints} fill={rightFill} stroke={stroke} strokeWidth={1.4} strokeLinejoin="round" />
      </svg>
      <span className="text-[11px] font-extrabold font-mono text-slate-800 whitespace-nowrap">
        {label}
      </span>
    </div>
  );
}

export const CubeOddSumsAndTaxiScene: React.FC<CubeOddSumsAndTaxiSceneProps> = ({
  initialTab = 'taxicab',
  className = '',
}) => {
  const [activeTab, setActiveTab] = useState<'odd-sums' | 'taxicab'>(initialTab);
  const [selectedN, setSelectedN] = useState<number>(3);

  // Taxicab scale state
  const [leftPanKey, setLeftPanKey] = useState<PanChoice>('1_12');
  const [rightPanKey, setRightPanKey] = useState<PanChoice>('9_10');

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  const activeGroup = ODD_CUBE_GROUPS.find((g) => g.n === selectedN) || ODD_CUBE_GROUPS[2];
  const leftPan = PAN_OPTIONS[leftPanKey];
  const rightPan = PAN_OPTIONS[rightPanKey];

  const diff = rightPan.total - leftPan.total;
  const tiltDeg = diff === 0 ? 0 : diff > 0 ? 9 : -9;
  const isBalanced1729 = leftPan.total === 1729 && rightPan.total === 1729 && leftPan.id !== rightPan.id;

  return (
    <div
      data-no-nav="true"
      className={`w-full max-w-4xl mx-auto rounded-3xl border bg-white p-5 sm:p-6 shadow-xs flex flex-col gap-5 ${className}`}
      style={{ borderColor: COLORS.divider }}
    >
      {/* Header & Tabs */}
      <div
        className="flex flex-wrap items-center justify-between gap-3 border-b pb-4"
        style={{ borderColor: COLORS.divider }}
      >
        <div>
          <span className="text-micro font-bold uppercase tracking-wider text-slate-500">
            Animation 10 • Cubes From Odd Numbers &amp; Hardy-Ramanujan 1729
          </span>
          <h3 className="text-statement font-extrabold text-slate-900 mt-0.5">
            {activeTab === 'odd-sums'
              ? 'Every Cube Is a Sum of Consecutive Odd Numbers'
              : 'Taxicab Number 1729: Dual Balance Scale'}
          </h3>
        </div>

        <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-100 border border-slate-200">
          <button
            type="button"
            onClick={() => setActiveTab('odd-sums')}
            className={`min-h-[38px] px-3 py-1.5 rounded-lg text-micro font-bold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'odd-sums'
                ? 'bg-white text-purple-700 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Odd Sums Tape (n³)</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('taxicab')}
            className={`min-h-[38px] px-3 py-1.5 rounded-lg text-micro font-bold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'taxicab'
                ? 'bg-white text-[#F27A00] shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Scale className="w-3.5 h-3.5" />
            <span>Taxicab 1729 Scale</span>
          </button>
        </div>
      </div>

      {/* ================================================================= */}
      {/* PART A: CONSECUTIVE ODD SUMS TAPE */}
      {/* ================================================================= */}
      {activeTab === 'odd-sums' && (
        <div className="flex flex-col gap-5 animate-fade-rise">
          {/* Cube selector buttons */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {ODD_CUBE_GROUPS.map((g) => {
              const active = g.n === selectedN;
              return (
                <button
                  key={g.n}
                  type="button"
                  onClick={() => setSelectedN(g.n)}
                  className={`min-h-[40px] px-4 py-2 rounded-xl text-small font-bold border transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                    active
                      ? 'bg-purple-700 text-white border-purple-800 shadow-xs scale-[1.03]'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-purple-50'
                  }`}
                >
                  {g.n}³ = {g.sum} ({g.n} {g.n === 1 ? 'odd' : 'odds'})
                </button>
              );
            })}
          </div>

          {/* Horizontal Consecutive Odds Number Tape */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col gap-3">
            <span className="text-micro font-bold uppercase tracking-wider text-slate-500">
              Consecutive Odd Numbers Tape (Tap any block to jump to its cube)
            </span>

            <div className="flex flex-wrap items-center gap-2">
              {ALL_ODDS_TAPE.map((oddVal, idx) => {
                const ownerGroup = ODD_CUBE_GROUPS.find(
                  (g) => idx >= g.startIndex && idx < g.startIndex + g.n
                )!;
                const isSelected = ownerGroup.n === selectedN;
                const isGroupStart = idx === ownerGroup.startIndex;

                return (
                  <button
                    key={oddVal}
                    type="button"
                    onClick={() => setSelectedN(ownerGroup.n)}
                    className={`relative min-w-[46px] min-h-[46px] px-2.5 py-2 rounded-xl border-2 font-mono text-small font-black transition-all cursor-pointer flex flex-col items-center justify-center ${
                      isSelected
                        ? 'bg-[#F27A00] text-white border-[#9A3412] shadow-sm -translate-y-1'
                        : 'bg-white text-slate-600 border-slate-200 hover:border-purple-300'
                    }`}
                  >
                    <span>{oddVal}</span>
                    {isGroupStart && (
                      <span
                        className={`text-[9px] font-extrabold leading-none mt-0.5 ${
                          isSelected ? 'text-amber-100' : 'text-purple-700'
                        }`}
                      >
                        {ownerGroup.n}³
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Highlighted Sum Equation Card */}
          <div className="p-5 rounded-2xl border border-purple-200 bg-purple-50/60 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex flex-col gap-1">
              <span className="text-micro font-bold uppercase tracking-wider text-purple-800">
                Highlighted Group for {activeGroup.n}³
              </span>
              <p className="text-small text-slate-800">
                Take the next <strong>{activeGroup.n}</strong> consecutive odd numbers in line:
              </p>
            </div>

            <div className="text-title font-extrabold text-purple-950 bg-white px-4 py-2.5 rounded-2xl border border-purple-200 shadow-2xs">
              <Katex
                latex={`${activeGroup.odds.join(' + ')} = ${activeGroup.sum} = ${activeGroup.n}^3`}
                displayMode={false}
              />
            </div>
          </div>
        </div>
      )}

      {/* ================================================================= */}
      {/* PART B: RAMANUJAN TAXICAB 1729 INTERACTIVE BALANCE SCALE */}
      {/* ================================================================= */}
      {activeTab === 'taxicab' && (
        <div className="flex flex-col gap-5 animate-fade-rise">
          {/* Hardy-Ramanujan Mini Story */}
          <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <p className="text-small text-amber-950 leading-relaxed">
              <strong>The Hospital Taxi Story:</strong> G.H. Hardy told Srinivasa Ramanujan his taxi number{' '}
              <strong>1729</strong> seemed dull. Ramanujan replied right away: &ldquo;No! It is the smallest number equal to the sum of two cubes in <strong>two different ways</strong>!&rdquo;
            </p>
          </div>

          {/* Pan Weight Selector Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col gap-2">
              <span className="text-micro font-bold uppercase tracking-wider text-slate-600">
                Left Scale Pan
              </span>
              <div className="flex flex-wrap gap-1.5">
                {(['1_12', '2_11'] as PanChoice[]).map((k) => (
                  <button
                    key={k}
                    type="button"
                    onClick={() => setLeftPanKey(k)}
                    className={`min-h-[38px] px-3 py-1.5 rounded-xl text-micro font-bold border cursor-pointer transition-all whitespace-nowrap ${
                      leftPanKey === k
                        ? 'bg-[#005583] text-white border-[#003F62] shadow-2xs'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {PAN_OPTIONS[k].label}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col gap-2">
              <span className="text-micro font-bold uppercase tracking-wider text-slate-600">
                Right Scale Pan
              </span>
              <div className="flex flex-wrap gap-1.5">
                {(['9_10', '2_11'] as PanChoice[]).map((k) => (
                  <button
                    key={k}
                    type="button"
                    onClick={() => setRightPanKey(k)}
                    className={`min-h-[38px] px-3 py-1.5 rounded-xl text-micro font-bold border cursor-pointer transition-all whitespace-nowrap ${
                      rightPanKey === k
                        ? 'bg-[#F27A00] text-white border-[#C2410C] shadow-2xs'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {PAN_OPTIONS[k].label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Interactive Dual Balance Scale Visual */}
          <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 flex flex-col items-center gap-4 overflow-hidden">
            {/* Balance Status Pill */}
            <div
              className={`px-4 py-1.5 rounded-full text-small font-extrabold border transition-all ${
                isBalanced1729
                  ? 'bg-emerald-100 text-emerald-900 border-emerald-400'
                  : diff === 0
                  ? 'bg-blue-100 text-blue-900 border-blue-300'
                  : 'bg-amber-100 text-amber-900 border-amber-300'
              }`}
            >
              {isBalanced1729
                ? 'BALANCED AT 1729! Both Ways Weigh Exactly the Same!'
                : diff === 0
                ? `Balanced at ${leftPan.total} (Same cubes on both sides)`
                : leftPan.total > rightPan.total
                ? `Left pan is heavier (${leftPan.total} > ${rightPan.total})!`
                : `Right pan is heavier (${rightPan.total} > ${leftPan.total})!`}
            </div>

            {/* Balance Beam + Proportional Cubes */}
            <div className="w-full max-w-[680px] flex flex-col items-center pt-4">
              {/* Tilting Beam Container */}
              <div
                className="w-full grid grid-cols-2 gap-6 sm:gap-12 items-end transition-transform duration-500 ease-out origin-center"
                style={{ transform: `rotate(${tiltDeg}deg)` }}
              >
                {/* PAN A */}
                <div className="flex flex-col items-center gap-2">
                  <div className="min-h-[120px] w-full p-3 rounded-2xl bg-white border-2 border-[#0788D3] shadow-xs flex items-end justify-center gap-4">
                    <MiniIsoCube
                      size={leftPan.a === 1 ? 12 : 16}
                      label={`${leftPan.a}³ = ${leftPan.aCube}`}
                      topFill="#DBEAFE"
                      leftFill="#60A5FA"
                      rightFill="#93C5FD"
                      stroke="#1D4ED8"
                    />
                    <span className="text-statement font-black text-slate-400 pb-4">+</span>
                    <MiniIsoCube
                      size={leftPan.b === 12 ? 36 : 33}
                      label={`${leftPan.b}³ = ${leftPan.bCube}`}
                      topFill="#FED7AA"
                      leftFill="#FB923C"
                      rightFill="#FDBA74"
                      stroke="#C2410C"
                    />
                  </div>
                  <div className="w-4/5 h-2.5 rounded-full bg-slate-700" />
                  <span className="px-3 py-1 rounded-xl bg-blue-50 border border-blue-200 font-mono text-small font-black text-blue-950">
                    Pan A Total: {leftPan.total}
                  </span>
                </div>

                {/* PAN B */}
                <div className="flex flex-col items-center gap-2">
                  <div className="min-h-[120px] w-full p-3 rounded-2xl bg-white border-2 border-[#F27A00] shadow-xs flex items-end justify-center gap-4">
                    <MiniIsoCube
                      size={rightPan.a === 9 ? 28 : 16}
                      label={`${rightPan.a}³ = ${rightPan.aCube}`}
                      topFill="#EDE9FE"
                      leftFill="#A78BFA"
                      rightFill="#C4B5FD"
                      stroke="#6D28D9"
                    />
                    <span className="text-statement font-black text-slate-400 pb-4">+</span>
                    <MiniIsoCube
                      size={rightPan.b === 10 ? 31 : 33}
                      label={`${rightPan.b}³ = ${rightPan.bCube}`}
                      topFill="#DCFCE7"
                      leftFill="#4ADE80"
                      rightFill="#86EFAC"
                      stroke="#15803D"
                    />
                  </div>
                  <div className="w-4/5 h-2.5 rounded-full bg-slate-700" />
                  <span className="px-3 py-1 rounded-xl bg-orange-50 border border-orange-200 font-mono text-small font-black text-orange-950">
                    Pan B Total: {rightPan.total}
                  </span>
                </div>
              </div>

              {/* Fulcrum Triangle */}
              <div className="flex flex-col items-center -mt-1">
                <div className="w-full max-w-[360px] h-2 rounded-full bg-slate-800" />
                <svg width="56" height="32" viewBox="0 0 56 32">
                  <polygon points="28,0 52,32 4,32" fill="#334155" />
                  <circle cx="28" cy="10" r="4" fill="#F8FAFC" />
                </svg>
              </div>
            </div>

            {/* Equation Badge */}
            <div className="p-3.5 rounded-2xl bg-white border border-slate-200 text-center flex items-center gap-2 flex-wrap justify-center">
              <Box className="w-4 h-4 text-[#F27A00]" />
              <Katex
                latex={`1729 = 1^3 + 12^3 = 9^3 + 10^3`}
                displayMode={false}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
