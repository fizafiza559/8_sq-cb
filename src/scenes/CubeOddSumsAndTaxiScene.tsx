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
  beatIndex?: number;
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

type TaxicabId = 1729 | 4104 | 13832;

interface PanPair {
  id: string;
  a: number;
  b: number;
  aCube: number;
  bCube: number;
  total: number;
  label: string;
}

interface TaxicabConfig {
  target: TaxicabId;
  way1: PanPair;
  way2: PanPair;
  decoy: PanPair;
  latex: string;
}

function makePan(a: number, b: number): PanPair {
  const aCube = a * a * a;
  const bCube = b * b * b;
  const total = aCube + bCube;
  return {
    id: `${a}_${b}`,
    a,
    b,
    aCube,
    bCube,
    total,
    label: `${a}³ + ${b}³ = ${aCube} + ${bCube} = ${total}`,
  };
}

const TAXICAB_PRESETS: Record<TaxicabId, TaxicabConfig> = {
  1729: {
    target: 1729,
    way1: makePan(1, 12),
    way2: makePan(9, 10),
    decoy: makePan(2, 11),
    latex: '1729 = 1^3 + 12^3 = 9^3 + 10^3',
  },
  4104: {
    target: 4104,
    way1: makePan(2, 16),
    way2: makePan(9, 15),
    decoy: makePan(4, 14),
    latex: '4104 = 2^3 + 16^3 = 9^3 + 15^3',
  },
  13832: {
    target: 13832,
    way1: makePan(2, 24),
    way2: makePan(18, 20),
    decoy: makePan(10, 22),
    latex: '13832 = 2^3 + 24^3 = 18^3 + 20^3',
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
    <div className="flex flex-col items-center gap-1 min-w-0">
      <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="overflow-visible max-w-full h-auto">
        <polygon points={topPoints} fill={topFill} stroke={stroke} strokeWidth={1.4} strokeLinejoin="round" />
        <polygon points={leftPoints} fill={leftFill} stroke={stroke} strokeWidth={1.4} strokeLinejoin="round" />
        <polygon points={rightPoints} fill={rightFill} stroke={stroke} strokeWidth={1.4} strokeLinejoin="round" />
      </svg>
      <span className="text-[10px] sm:text-[11px] font-extrabold font-mono text-slate-800 whitespace-nowrap tabular-nums">
        {label}
      </span>
    </div>
  );
}

export const CubeOddSumsAndTaxiScene: React.FC<CubeOddSumsAndTaxiSceneProps> = ({
  initialTab = 'taxicab',
  beatIndex,
  className = '',
}) => {
  const [activeTab, setActiveTab] = useState<'odd-sums' | 'taxicab'>(initialTab);
  const [selectedN, setSelectedN] = useState<number>(3);

  // Taxicab scale state
  const [taxicabId, setTaxicabId] = useState<TaxicabId>(1729);
  const [leftPanMode, setLeftPanMode] = useState<'way1' | 'decoy'>('way1');
  const [rightPanMode, setRightPanMode] = useState<'way2' | 'decoy'>('way2');

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  // Smoothly update internal state when advancing beats
  useEffect(() => {
    if (beatIndex === undefined) return;
    if (initialTab === 'taxicab') {
      if (beatIndex === 0) {
        setTaxicabId(1729);
        setLeftPanMode('way1');
        setRightPanMode('way2');
      } else {
        setTaxicabId(4104);
        setLeftPanMode('way1');
        setRightPanMode('way2');
      }
    } else if (initialTab === 'odd-sums') {
      setSelectedN(beatIndex === 0 ? 3 : 4);
    }
  }, [beatIndex, initialTab]);

  const activeGroup = ODD_CUBE_GROUPS.find((g) => g.n === selectedN) || ODD_CUBE_GROUPS[2];
  const cfg = TAXICAB_PRESETS[taxicabId];
  const leftPan = leftPanMode === 'way1' ? cfg.way1 : cfg.decoy;
  const rightPan = rightPanMode === 'way2' ? cfg.way2 : cfg.decoy;

  const diff = rightPan.total - leftPan.total;
  const tiltDeg = diff === 0 ? 0 : diff > 0 ? 9 : -9;
  const isBalancedTarget =
    leftPan.total === cfg.target &&
    rightPan.total === cfg.target &&
    leftPan.id !== rightPan.id;

  const scaleCubeSize = (val: number) => Math.max(12, Math.min(36, Math.round(10 + val * 1.1)));

  return (
    <div
      data-no-nav="true"
      className={`w-full max-w-4xl max-h-full overflow-y-auto no-scrollbar mx-auto rounded-3xl border border-slate-200/80 bg-white p-3 sm:p-4 shadow-xs flex flex-col gap-2.5 sm:gap-3 ${className}`}
    >
      {/* Header & Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
        <div className="min-w-0">
          <span className="text-micro font-bold uppercase tracking-wider text-slate-500">
            Cubes From Odd Numbers &amp; Taxicab Numbers
          </span>
          <h3 className="text-statement font-extrabold text-slate-900 mt-0.5">
            {activeTab === 'odd-sums'
              ? 'Every Cube Is a Sum of Consecutive Odd Numbers'
              : `Taxicab Number ${cfg.target}: Dual Balance Scale`}
          </h3>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-1 p-1 rounded-xl bg-slate-100/90 w-full sm:w-auto">
          <button
            type="button"
            onClick={() => setActiveTab('odd-sums')}
            className={`min-h-[44px] sm:min-h-[38px] px-3 py-1.5 rounded-lg text-micro font-bold flex items-center gap-1.5 transition-all cursor-pointer shrink-0 ${
              activeTab === 'odd-sums'
                ? 'bg-white text-purple-700 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Layers className="w-3.5 h-3.5 shrink-0" />
            <span>Odd Sums Tape (n³)</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('taxicab')}
            className={`min-h-[44px] sm:min-h-[38px] px-3 py-1.5 rounded-lg text-micro font-bold flex items-center gap-1.5 transition-all cursor-pointer shrink-0 ${
              activeTab === 'taxicab'
                ? 'bg-white text-[#F27A00] shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Scale className="w-3.5 h-3.5 shrink-0" />
            <span>Taxicab Scale</span>
          </button>
        </div>
      </div>

      {/* ================================================================= */}
      {/* PART A: CONSECUTIVE ODD SUMS TAPE */}
      {/* ================================================================= */}
      {activeTab === 'odd-sums' && (
        <div className="flex flex-col gap-3 animate-fade-rise">
          {/* Cube selector buttons */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
            {ODD_CUBE_GROUPS.map((g) => {
              const active = g.n === selectedN;
              return (
                <button
                  key={g.n}
                  type="button"
                  onClick={() => setSelectedN(g.n)}
                  className={`min-h-[44px] sm:min-h-[40px] px-3 sm:px-4 py-1.5 rounded-xl text-small font-bold border transition-all cursor-pointer shrink-0 ${
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
          <div className="p-2.5 sm:p-3 rounded-2xl bg-slate-50/80 flex flex-col gap-2.5">
            <span className="text-micro font-bold uppercase tracking-wider text-slate-500">
              Consecutive Odd Numbers Tape (Tap any block to jump to its cube)
            </span>

            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
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
                    className={`relative min-w-[44px] min-h-[44px] px-2 py-1.5 rounded-xl border-2 font-mono text-small font-black transition-all cursor-pointer flex flex-col items-center justify-center ${
                      isSelected
                        ? 'bg-[#F27A00] text-white border-[#9A3412] shadow-sm -translate-y-0.5'
                        : 'bg-white text-slate-600 border-slate-200/80 hover:border-purple-300'
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
          <div className="p-3 sm:p-4 rounded-2xl bg-purple-50/60 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex flex-col gap-1 min-w-0">
              <span className="text-micro font-bold uppercase tracking-wider text-purple-800">
                Highlighted Group for {activeGroup.n}³
              </span>
              <p className="text-small text-slate-800">
                Take the next <strong>{activeGroup.n}</strong> consecutive odd numbers in line:
              </p>
            </div>

            <div className="text-body sm:text-title font-extrabold text-purple-950 bg-white px-3.5 py-2 rounded-2xl border border-purple-100 max-w-full flex flex-wrap justify-center text-center">
              <Katex
                latex={`${activeGroup.odds.join(' + ')} = ${activeGroup.sum} = ${activeGroup.n}^3`}
                displayMode={false}
              />
            </div>
          </div>
        </div>
      )}

      {/* ================================================================= */}
      {/* PART B: RAMANUJAN TAXICAB DUAL BALANCE SCALE (1729, 4104, 13832) */}
      {/* ================================================================= */}
      {activeTab === 'taxicab' && (
        <div className="flex flex-col gap-2.5 sm:gap-3 animate-fade-rise">
          {/* Taxicab Number Preset Pills */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              <span className="text-micro font-bold text-slate-500">Taxicab Number:</span>
              {([1729, 4104, 13832] as TaxicabId[]).map((id) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => {
                    setTaxicabId(id);
                    setLeftPanMode('way1');
                    setRightPanMode('way2');
                  }}
                  className={`min-h-[44px] sm:min-h-[40px] px-3.5 sm:px-4 py-1.5 rounded-xl font-mono text-small font-extrabold border transition-all cursor-pointer shrink-0 tabular-nums ${
                    taxicabId === id
                      ? 'bg-[#F27A00] text-white border-[#C2410C] shadow-2xs scale-[1.02]'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-orange-50'
                  }`}
                >
                  {id} {id === 1729 ? '(Smallest!)' : ''}
                </button>
              ))}
            </div>
          </div>

          {/* Hardy-Ramanujan Mini Story */}
          <div className="p-2.5 sm:p-3 rounded-2xl bg-amber-50/60 flex items-start gap-2.5">
            <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <p className="text-micro sm:text-small text-amber-950 leading-snug">
              <strong>The Hospital Taxi Story:</strong> G.H. Hardy told Srinivasa Ramanujan his taxi number{' '}
              <strong>1729</strong> seemed dull. Ramanujan replied right away: &ldquo;No! It is the smallest number equal to the sum of two cubes in <strong>two different ways</strong>!&rdquo;
            </p>
          </div>

          {/* Pan Weight Selector Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <div className="p-2.5 sm:p-3 rounded-2xl bg-slate-50/80 flex flex-col gap-1.5 min-w-0">
              <span className="text-micro font-bold uppercase tracking-wider text-slate-600">
                Left Scale Pan
              </span>
              <div className="flex flex-wrap gap-1.5">
                {(['way1', 'decoy'] as const).map((modeKey) => {
                  const opt = modeKey === 'way1' ? cfg.way1 : cfg.decoy;
                  return (
                    <button
                      key={modeKey}
                      type="button"
                      onClick={() => setLeftPanMode(modeKey)}
                      className={`min-h-[44px] sm:min-h-[38px] px-3 py-1.5 rounded-xl text-micro font-bold border cursor-pointer transition-all text-center whitespace-normal tabular-nums ${
                        leftPanMode === modeKey
                          ? 'bg-[#005583] text-white border-[#003F62] shadow-2xs'
                          : 'bg-white text-slate-700 border-slate-200/80 hover:bg-slate-100'
                      }`}
                    >
                      {opt.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="p-2.5 sm:p-3 rounded-2xl bg-slate-50/80 flex flex-col gap-1.5 min-w-0">
              <span className="text-micro font-bold uppercase tracking-wider text-slate-600">
                Right Scale Pan
              </span>
              <div className="flex flex-wrap gap-1.5">
                {(['way2', 'decoy'] as const).map((modeKey) => {
                  const opt = modeKey === 'way2' ? cfg.way2 : cfg.decoy;
                  return (
                    <button
                      key={modeKey}
                      type="button"
                      onClick={() => setRightPanMode(modeKey)}
                      className={`min-h-[44px] sm:min-h-[38px] px-3 py-1.5 rounded-xl text-micro font-bold border cursor-pointer transition-all text-center whitespace-normal tabular-nums ${
                        rightPanMode === modeKey
                          ? 'bg-[#F27A00] text-white border-[#C2410C] shadow-2xs'
                          : 'bg-white text-slate-700 border-slate-200/80 hover:bg-slate-100'
                      }`}
                    >
                      {opt.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Interactive Dual Balance Scale Visual */}
          <div className="p-3 sm:p-4 rounded-2xl bg-slate-50/60 flex flex-col items-center gap-3 overflow-hidden">
            {/* Balance Status Pill */}
            <div
              className={`px-4 py-1.5 rounded-full text-micro sm:text-small font-extrabold border transition-all tabular-nums text-center ${
                isBalancedTarget
                  ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                  : diff === 0
                  ? 'bg-blue-100 text-blue-900 border-blue-200'
                  : 'bg-amber-100 text-amber-900 border-amber-200'
              }`}
            >
              {isBalancedTarget
                ? `BALANCED AT ${cfg.target}! Both Ways Weigh Exactly the Same!`
                : diff === 0
                ? `Balanced at ${leftPan.total} (Same cubes on both sides)`
                : leftPan.total > rightPan.total
                ? `Left pan is heavier (${leftPan.total} > ${rightPan.total})!`
                : `Right pan is heavier (${rightPan.total} > ${leftPan.total})!`}
            </div>

            {/* Balance Beam + Proportional Cubes */}
            <div className="w-full max-w-[680px] flex flex-col items-center pt-4 px-1">
              {/* Tilting Beam Container */}
              <div
                className="w-full grid grid-cols-2 gap-2.5 sm:gap-10 items-end transition-transform duration-500 ease-out origin-center"
                style={{ transform: `rotate(${tiltDeg}deg)` }}
              >
                {/* PAN A */}
                <div className="flex flex-col items-center gap-1.5 min-w-0">
                  <div className="min-h-[92px] sm:min-h-[116px] w-full p-2 sm:p-3 rounded-2xl bg-white border-2 border-[#0788D3] shadow-2xs flex flex-wrap sm:flex-nowrap items-end justify-center gap-1.5 sm:gap-4">
                    <MiniIsoCube
                      size={scaleCubeSize(leftPan.a)}
                      label={`${leftPan.a}³ = ${leftPan.aCube}`}
                      topFill="#DBEAFE"
                      leftFill="#60A5FA"
                      rightFill="#93C5FD"
                      stroke="#1D4ED8"
                    />
                    <span className="text-body sm:text-statement font-black text-slate-400 pb-3 sm:pb-4">+</span>
                    <MiniIsoCube
                      size={scaleCubeSize(leftPan.b)}
                      label={`${leftPan.b}³ = ${leftPan.bCube}`}
                      topFill="#FED7AA"
                      leftFill="#FB923C"
                      rightFill="#FDBA74"
                      stroke="#C2410C"
                    />
                  </div>
                  <div className="w-4/5 h-2 sm:h-2.5 rounded-full bg-slate-700" />
                  <span className="px-2.5 sm:px-3 py-1 rounded-xl bg-blue-50 border border-blue-200/80 font-mono text-micro sm:text-small font-black text-blue-950 tabular-nums whitespace-nowrap">
                    Pan A: {leftPan.total}
                  </span>
                </div>

                {/* PAN B */}
                <div className="flex flex-col items-center gap-1.5 min-w-0">
                  <div className="min-h-[92px] sm:min-h-[116px] w-full p-2 sm:p-3 rounded-2xl bg-white border-2 border-[#F27A00] shadow-2xs flex flex-wrap sm:flex-nowrap items-end justify-center gap-1.5 sm:gap-4">
                    <MiniIsoCube
                      size={scaleCubeSize(rightPan.a)}
                      label={`${rightPan.a}³ = ${rightPan.aCube}`}
                      topFill="#EDE9FE"
                      leftFill="#A78BFA"
                      rightFill="#C4B5FD"
                      stroke="#6D28D9"
                    />
                    <span className="text-body sm:text-statement font-black text-slate-400 pb-3 sm:pb-4">+</span>
                    <MiniIsoCube
                      size={scaleCubeSize(rightPan.b)}
                      label={`${rightPan.b}³ = ${rightPan.bCube}`}
                      topFill="#DCFCE7"
                      leftFill="#4ADE80"
                      rightFill="#86EFAC"
                      stroke="#15803D"
                    />
                  </div>
                  <div className="w-4/5 h-2 sm:h-2.5 rounded-full bg-slate-700" />
                  <span className="px-2.5 sm:px-3 py-1 rounded-xl bg-orange-50 border border-orange-200/80 font-mono text-micro sm:text-small font-black text-orange-950 tabular-nums whitespace-nowrap">
                    Pan B: {rightPan.total}
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
            <div className="p-2.5 sm:p-3 rounded-2xl bg-white border border-slate-200/70 text-center flex items-center gap-2 flex-wrap justify-center max-w-full">
              <Box className="w-4 h-4 text-[#F27A00] shrink-0" />
              <Katex latex={cfg.latex} displayMode={false} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
