/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  Lock,
  Unlock,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  Crown,
  Scroll,
  HelpCircle,
  CheckCircle2,
  Gem,
  KeyRound,
  ArrowRight,
  Grid,
  ChevronRight,
} from 'lucide-react';
import { COLORS } from '../design/tokens';
import { lockers, divisors, toggleCount, isSquare } from '../math/facts';
import { Katex } from '../components/Katex';

export interface FactorPairsMorph36Props {
  beatIndex?: number;
  className?: string;
}

interface FactorPairOption {
  rows: number;
  cols: number;
  label: string;
  isSquarePair?: boolean;
}

const FACTOR_PAIR_OPTIONS_36: FactorPairOption[] = [
  { rows: 1, cols: 36, label: '1 × 36' },
  { rows: 2, cols: 18, label: '2 × 18' },
  { rows: 3, cols: 12, label: '3 × 12' },
  { rows: 4, cols: 9, label: '4 × 9' },
  { rows: 6, cols: 6, label: '6 × 6 (Square!)', isSquarePair: true },
];

export const FactorPairsMorph36: React.FC<FactorPairsMorph36Props> = ({
  beatIndex,
  className = '',
}) => {
  const [selectedIdx, setSelectedIdx] = useState<number>(4);

  useEffect(() => {
    if (beatIndex === undefined) return;
    setSelectedIdx(beatIndex === 0 ? 3 : 4);
  }, [beatIndex]);

  const current = FACTOR_PAIR_OPTIONS_36[selectedIdx];

  // Viewport geometry for 36 smoothly positioned dots
  const canvasW = 680;
  const canvasH = 260;
  const padX = 28;
  const padY = 26;
  const availW = canvasW - padX * 2;
  const availH = canvasH - padY * 2;

  const stepX = Math.min(44, availW / Math.max(1, current.cols));
  const stepY = Math.min(36, availH / Math.max(1, current.rows));
  const dotRadius =
    current.cols >= 36 ? 6.5 : current.cols >= 18 ? 10 : current.cols >= 12 ? 12 : 14;

  const gridW = (current.cols - 1) * stepX;
  const gridH = (current.rows - 1) * stepY;
  const originX = (canvasW - gridW) / 2;
  const originY = (canvasH - gridH) / 2;

  const allFactors36 = divisors(36); // [1, 2, 3, 4, 6, 9, 12, 18, 36]

  return (
    <div
      data-no-nav="true"
      className={`w-full max-w-4xl mx-auto rounded-3xl border border-slate-200/80 bg-white p-5 sm:p-7 shadow-2xs flex flex-col gap-5 ${className}`}
    >
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <span className="text-micro font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
            <Grid className="w-3.5 h-3.5 text-orange-500" />
            <span>Why Square Numbers Have Odd Factors</span>
          </span>
          <h3 className="text-statement font-extrabold text-slate-900 mt-0.5">
            Morphing All 36 Tiles into Partner Rectangles
          </h3>
        </div>

        <span
          className="text-micro font-bold tabular-nums whitespace-nowrap"
          style={{
            color: current.isSquarePair ? '#C2410C' : '#1E40AF',
          }}
        >
          {current.rows} rows × {current.cols} cols = 36 tiles
        </span>
      </div>

      {/* Factor Pair Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {FACTOR_PAIR_OPTIONS_36.map((opt, idx) => {
          const isActive = idx === selectedIdx;
          return (
            <button
              key={opt.label}
              type="button"
              onClick={() => setSelectedIdx(idx)}
              className={`min-h-[42px] px-4 py-2 rounded-xl text-small font-bold border transition-all cursor-pointer whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                isActive
                  ? opt.isSquarePair
                    ? 'bg-[#F27A00] text-white border-[#C2410C]'
                    : 'bg-[#005583] text-white border-[#003F62]'
                  : opt.isSquarePair
                  ? 'bg-orange-50/80 text-orange-800 border-orange-200 hover:bg-orange-100'
                  : 'bg-slate-50 text-slate-700 border-slate-200/80 hover:bg-slate-100'
              }`}
            >
              {opt.isSquarePair && <Sparkles className="w-3.5 h-3.5 shrink-0" />}
              <span>{opt.label}</span>
            </button>
          );
        })}
      </div>

      {/* Morphing Dot Grid Canvas */}
      <div
        className="w-full rounded-2xl p-3 flex flex-col items-center justify-center relative overflow-hidden transition-colors duration-300"
        style={{
          backgroundColor: current.isSquarePair ? '#FFFBF5' : '#F8FAFC',
        }}
      >
        <svg
          viewBox={`0 0 ${canvasW} ${canvasH}`}
          className="w-full h-auto max-h-[260px] select-none"
          aria-label={`36 dots arranged as ${current.rows} by ${current.cols}`}
        >
          {/* Subtle bounding box around current rectangle */}
          <rect
            x={originX - dotRadius - 8}
            y={originY - dotRadius - 8}
            width={gridW + (dotRadius + 8) * 2}
            height={gridH + (dotRadius + 8) * 2}
            rx={14}
            fill={current.isSquarePair ? 'rgba(242, 122, 0, 0.08)' : 'rgba(7, 136, 211, 0.05)'}
            stroke={current.isSquarePair ? '#F27A00' : '#93C5FD'}
            strokeWidth={current.isSquarePair ? 2.5 : 1.5}
            strokeDasharray={current.isSquarePair ? 'none' : '6 4'}
            style={{ transition: 'all 450ms cubic-bezier(0.22, 1, 0.36, 1)' }}
          />

          {Array.from({ length: 36 }, (_, idx) => {
            const r = Math.floor(idx / current.cols);
            const c = idx % current.cols;
            const cx = originX + c * stepX;
            const cy = originY + r * stepY;

            return (
              <g
                key={idx}
                style={{
                  transform: `translate(${cx}px, ${cy}px)`,
                  transition: `transform 480ms cubic-bezier(0.22, 1, 0.36, 1) ${(idx % 12) * 8}ms`,
                }}
              >
                <circle
                  cx={0}
                  cy={0}
                  r={dotRadius}
                  fill={current.isSquarePair ? '#F27A00' : '#0788D3'}
                  stroke={current.isSquarePair ? '#9A3412' : '#0369A1'}
                  strokeWidth={1.5}
                />
                {dotRadius >= 11 && (
                  <text
                    x={0}
                    y={3.5}
                    textAnchor="middle"
                    fill="#FFFFFF"
                    fontSize={9}
                    fontWeight={700}
                  >
                    {idx + 1}
                  </text>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      {/* Factor Partners & Lone 6x6 Explanation Badge */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch border-t border-slate-100 pt-4">
        {/* All 9 Factors of 36 Strip */}
        <div className="p-4 rounded-2xl bg-slate-50/80 flex flex-col gap-2.5 justify-center">
          <span className="text-micro font-bold uppercase tracking-wider text-slate-500">
            All Factors of 36 ({allFactors36.length} total — Odd Count)
          </span>
          <div className="flex flex-wrap items-center gap-1.5">
            {allFactors36.map((f) => {
              const isSelectedFactor = f === current.rows || f === current.cols;
              const isLoneSix = f === 6;
              return (
                <span
                  key={f}
                  className={`px-2.5 py-1 rounded-lg font-mono text-small font-bold border transition-all tabular-nums ${
                    isLoneSix && current.isSquarePair
                      ? 'bg-[#F27A00] text-white border-[#C2410C]'
                      : isSelectedFactor
                      ? 'bg-[#005583] text-white border-[#003F62]'
                      : isLoneSix
                      ? 'bg-orange-100 text-orange-900 border-orange-300'
                      : 'bg-white text-slate-700 border-slate-200/80'
                  }`}
                >
                  {f}
                </span>
              );
            })}
          </div>
        </div>

        {/* Dynamic Insight Badge */}
        <div
          className={`p-4 rounded-2xl border flex flex-col justify-center gap-1.5 transition-all ${
            current.isSquarePair
              ? 'bg-orange-50/75 border-orange-200/90 text-orange-950'
              : 'bg-sky-50/60 border-sky-200/80 text-blue-950'
          }`}
        >
          {current.isSquarePair ? (
            <>
              <div className="flex items-center gap-2 font-extrabold text-small text-orange-900">
                <Sparkles className="w-4 h-4 text-[#F27A00] shrink-0" />
                <span>The Lone 6 × 6 Square!</span>
              </div>
              <p className="text-small leading-relaxed text-orange-950">
                6 pairs with itself! No distinct partner → <strong>ODD number of factors (9 factors)</strong>. That&apos;s why Locker #36 stays OPEN!
              </p>
            </>
          ) : (
            <>
              <div className="font-extrabold text-small text-blue-900 flex items-center gap-2">
                <Katex latex={`${current.rows} \\times ${current.cols} = 36`} displayMode={false} />
                <span>gives 2 distinct partners</span>
              </div>
              <p className="text-small leading-relaxed text-slate-700">
                Both <strong>{current.rows}</strong> and <strong>{current.cols}</strong> flip Locker #36—those two flips cancel each other out. Tap <strong>6 × 6 (Square!)</strong> to find the lone factor!
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

interface LockerStorySectionProps {
  subTabId: 'locker-story' | 'factor-pairs';
  stepIndex: number;
  onAdvanceStep?: () => void;
}

export const LockerStorySection: React.FC<LockerStorySectionProps> = ({
  subTabId,
  stepIndex,
  onAdvanceStep,
}) => {
  // Current active storyboard panel: 0 = Queen's Decree, 1 = Secret Vault & Guess, 2 = Solution Animation
  const [panelIndex, setPanelIndex] = useState<number>(() => Math.min(2, Math.max(0, stepIndex)));

  // Sync with prop stepIndex if prop changes
  useEffect(() => {
    if (stepIndex >= 0 && stepIndex <= 2) {
      setPanelIndex(stepIndex);
    }
  }, [stepIndex]);

  // Guessing state in Panel 1
  const [studentGuess, setStudentGuess] = useState<string | null>(null);
  const [guessedLockerSet, setGuessedLockerSet] = useState<Set<number>>(new Set());

  // Simulation & step-by-step solution state in Panel 3
  const [currentPerson, setCurrentPerson] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [inspectedLocker, setInspectedLocker] = useState<number>(36);
  const [solutionStep, setSolutionStep] = useState<number>(1);

  // Timer ref for playback
  const playTimerRef = useRef<number | null>(null);

  useEffect(() => {
    if (isPlaying) {
      const intervalMs = Math.max(80, Math.floor(400 / playbackSpeed));
      playTimerRef.current = window.setInterval(() => {
        setCurrentPerson((prev) => {
          if (prev >= 100) {
            setIsPlaying(false);
            return 100;
          }
          return prev + 1;
        });
      }, intervalMs);
    } else {
      if (playTimerRef.current !== null) {
        clearInterval(playTimerRef.current);
        playTimerRef.current = null;
      }
    }
    return () => {
      if (playTimerRef.current !== null) {
        clearInterval(playTimerRef.current);
      }
    };
  }, [isPlaying, playbackSpeed]);

  if (subTabId === 'factor-pairs') {
    return (
      <div className="w-full py-2 pb-10 animate-fade-rise">
        <FactorPairsMorph36 />
      </div>
    );
  }

  const lockerStates = lockers(currentPerson, 100);
  const touchedByCurrent =
    currentPerson > 0
      ? Array.from({ length: 100 }, (_, i) => i + 1).filter((num) => num % currentPerson === 0)
      : [];

  const handleToggleLockerGuess = (num: number) => {
    setGuessedLockerSet((prev) => {
      const next = new Set(prev);
      if (next.has(num)) next.delete(num);
      else next.add(num);
      return next;
    });
  };

  const renderLockerSimulator = () => (
    <div
      data-no-nav="true"
      className="w-full bg-white p-4 sm:p-7 rounded-3xl border border-slate-200/80 shadow-2xs flex flex-col gap-5"
    >
      {/* Control Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            type="button"
            onClick={() => setIsPlaying((p) => !p)}
            className={`min-h-[44px] px-4 py-2 rounded-xl text-small font-bold flex items-center gap-2 cursor-pointer transition-colors whitespace-nowrap shrink-0 ${
              isPlaying
                ? 'bg-amber-600 text-white'
                : 'bg-emerald-600 text-white hover:bg-emerald-700'
            }`}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            <span>{isPlaying ? 'Pause' : 'Play 100 Walkers'}</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setIsPlaying(false);
              setCurrentPerson(0);
            }}
            className="min-h-[44px] w-11 rounded-xl border border-slate-200/80 bg-slate-50 hover:bg-slate-100 text-slate-600 flex items-center justify-center cursor-pointer shrink-0"
            title="Reset to 0"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-1 bg-slate-100/90 p-1 rounded-xl">
            {[1, 2, 5].map((spd) => (
              <button
                key={spd}
                type="button"
                onClick={() => setPlaybackSpeed(spd)}
                className={`min-h-[34px] px-2.5 py-1 rounded-lg text-micro font-bold cursor-pointer transition-colors ${
                  playbackSpeed === spd
                    ? 'bg-white text-slate-900 shadow-2xs'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {spd}x
              </button>
            ))}
          </div>
        </div>

        {/* Status Indicator */}
        <div className="flex items-center gap-2">
          <span className="text-small text-slate-500">Walker:</span>
          <span className="font-mono text-small sm:text-statement font-bold text-[#005583] bg-sky-50/80 px-3 py-1 rounded-xl tabular-nums">
            {currentPerson === 0 ? 'Start (0)' : `${currentPerson} / 100`}
          </span>
        </div>
      </div>

      {/* Scrubber Slider & Quick Jump Presets */}
      <div className="flex flex-col gap-2.5">
        <div className="flex items-center gap-3">
          <span className="text-micro font-semibold text-slate-500 shrink-0 tabular-nums">0</span>
          <input
            type="range"
            min={0}
            max={100}
            value={currentPerson}
            onChange={(e) => {
              setIsPlaying(false);
              setCurrentPerson(parseInt(e.target.value, 10));
            }}
            aria-label="Select walker number 0 to 100"
            className="flex-1 accent-emerald-600 cursor-pointer h-2.5 bg-slate-200 rounded-lg"
          />
          <span className="text-micro font-semibold text-slate-500 shrink-0 tabular-nums">100</span>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
          {[
            { label: '0 (Reset)', val: 0 },
            { label: '1 (Open All)', val: 1 },
            { label: '2 (Evens)', val: 2 },
            { label: 'Person 3', val: 3 },
            { label: 'Person 4', val: 4 },
            { label: 'Person 10', val: 10 },
            { label: 'All 100 (Final)', val: 100 },
          ].map((preset) => (
            <button
              key={preset.val}
              type="button"
              onClick={() => {
                setIsPlaying(false);
                setCurrentPerson(preset.val);
              }}
              className={`min-h-[36px] px-3 py-1 rounded-xl text-micro font-semibold shrink-0 border cursor-pointer transition-colors whitespace-nowrap ${
                currentPerson === preset.val
                  ? 'bg-[#005583] text-white border-[#003F62]'
                  : 'bg-slate-50/80 text-slate-600 hover:bg-slate-100 border-slate-200/80'
              }`}
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* 100 Locker Interactive Grid */}
      <div className="w-full flex flex-col items-center gap-3.5">
        <div className="grid grid-cols-10 gap-1 sm:gap-1.5 w-full max-w-[680px]">
          {Array.from({ length: 100 }, (_, i) => i + 1).map((num) => {
            const isOpen = lockerStates[num - 1];
            const isTouched = touchedByCurrent.includes(num);
            const isSq = isSquare(num);
            const isInspected = inspectedLocker === num;

            let cellStyle = 'bg-slate-100/90 text-slate-500 border-slate-200/80';
            if (isOpen) {
              if (isSq && currentPerson === 100) {
                cellStyle =
                  'bg-amber-300 text-amber-950 border-amber-500 font-black';
              } else {
                cellStyle =
                  'bg-emerald-100 text-emerald-950 border-emerald-300 font-bold';
              }
            }

            return (
              <button
                key={num}
                type="button"
                onClick={() => setInspectedLocker(num)}
                aria-label={`Locker ${num}: ${isOpen ? 'open' : 'closed'}`}
                className={`relative aspect-square rounded-md sm:rounded-lg flex flex-col items-center justify-center font-bold text-[11px] sm:text-xs border transition-all cursor-pointer tabular-nums ${cellStyle} ${
                  isTouched ? 'ring-2 ring-pink-500 ring-offset-1 scale-[1.03]' : ''
                } ${isInspected ? 'ring-2 ring-[#005583] ring-offset-1 sm:ring-offset-2' : ''}`}
              >
                <span className="leading-none">{num}</span>
                {isOpen ? (
                  <Unlock className="hidden sm:block w-2.5 h-2.5 text-emerald-700 mt-0.5" />
                ) : (
                  <Lock className="hidden sm:block w-2.5 h-2.5 text-slate-400 mt-0.5" />
                )}
              </button>
            );
          })}
        </div>

        {/* Calm Unboxed Legend */}
        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-micro sm:text-small text-slate-600 pt-1">
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 rounded-sm bg-amber-300 border border-amber-500 inline-block" />
            <span className="font-semibold text-amber-900">10 Open Squares</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 rounded-sm bg-emerald-100 border border-emerald-300 inline-block" />
            <span>Open</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 rounded-sm bg-slate-100 border border-slate-300 inline-block" />
            <span>Closed</span>
          </div>
          {touchedByCurrent.length > 0 && (
            <div className="flex items-center gap-1.5">
              <span className="w-3.5 h-3.5 rounded-sm ring-2 ring-pink-500 inline-block" />
              <span className="text-pink-700 font-medium">Flipped by Person {currentPerson}</span>
            </div>
          )}
        </div>
      </div>

      {/* Individual Locker Inspector Panel (soft tonal wash, hairline separation) */}
      <div
        className={`p-4 sm:p-5 rounded-2xl flex flex-col gap-2.5 mt-1 ${
          toggleCount(inspectedLocker) % 2 === 1
            ? 'bg-amber-50/75 border border-amber-200/80 text-amber-950'
            : 'bg-slate-50/80 border border-slate-200/60 text-slate-800'
        }`}
      >
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-statement font-bold text-slate-900">
              Locker #{inspectedLocker}
            </span>
            {isSquare(inspectedLocker) && (
              <span className="text-micro font-bold text-amber-800">
                · Perfect Square ({Math.round(Math.sqrt(inspectedLocker))}²)
              </span>
            )}
          </div>

          <span
            className={`text-micro font-bold ${
              toggleCount(inspectedLocker) % 2 === 1
                ? 'text-emerald-700'
                : 'text-slate-500'
            }`}
          >
            {toggleCount(inspectedLocker) % 2 === 1 ? 'Remains Open' : 'Remains Closed'}
          </span>
        </div>

        <p className="text-small sm:text-body leading-relaxed">
          Flipped by <strong>{toggleCount(inspectedLocker)}</strong> walkers (factors):{' '}
          <span className="font-mono font-bold text-[#005583]">
            {divisors(inspectedLocker).join(', ')}
          </span>
        </p>

        <p className="text-small text-slate-600 leading-relaxed">
          {toggleCount(inspectedLocker) % 2 === 1
            ? `Because ${inspectedLocker} is a square (${Math.round(
                Math.sqrt(inspectedLocker)
              )} × ${Math.round(
                Math.sqrt(inspectedLocker)
              )}), it has an odd count of factors (${toggleCount(
                inspectedLocker
              )} flips), leaving it open.`
            : `Because ${inspectedLocker} is not a square, its factors come in pairs. ${toggleCount(
                inspectedLocker
              )} is an even count of flips, leaving it closed.`}
        </p>
      </div>
    </div>
  );

  return (
    <div data-no-nav="true" className="w-full max-w-4xl mx-auto flex flex-col gap-5 py-1 pb-12 animate-fade-rise">
      {/* Storyboard Navigation Header */}
      <div className="w-full bg-white p-2 sm:p-2.5 rounded-2xl border border-slate-200/80 flex items-center justify-between gap-2 overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setPanelIndex(0)}
            className={`min-h-[42px] px-3.5 py-2 rounded-xl text-small font-bold flex items-center gap-2 transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
              panelIndex === 0
                ? 'bg-amber-600 text-white'
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Crown className="w-4 h-4 shrink-0" />
            <span>1. Queen&apos;s Decree</span>
          </button>

          <button
            type="button"
            onClick={() => setPanelIndex(1)}
            className={`min-h-[42px] px-3.5 py-2 rounded-xl text-small font-bold flex items-center gap-2 transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
              panelIndex === 1
                ? 'bg-[#005583] text-white'
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <HelpCircle className="w-4 h-4 shrink-0" />
            <span>2. Vault &amp; Guess</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setPanelIndex(2);
              if (currentPerson === 0) setCurrentPerson(100);
            }}
            className={`min-h-[42px] px-3.5 py-2 rounded-xl text-small font-bold flex items-center gap-2 transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
              panelIndex === 2
                ? 'bg-emerald-600 text-white'
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Sparkles className="w-4 h-4 shrink-0" />
            <span>3. Solution &amp; Animation</span>
          </button>
        </div>

        <span className="text-micro font-semibold text-slate-400 px-3 shrink-0 hidden sm:block tabular-nums">
          Panel {panelIndex + 1} of 3
        </span>
      </div>

      {/* ================================================================= */}
      {/* PANEL 1: THE QUEEN'S ROYAL DECREE + IMMEDIATE 100-LOCKER GRID */}
      {/* ================================================================= */}
      {panelIndex === 0 && (
        <div className="w-full flex flex-col gap-6 animate-fade-rise">
          {/* Main Hero Card with User Image */}
          <div className="w-full bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-xs flex flex-col md:flex-row">
            {/* Left: Queen Court Image */}
            <div className="md:w-1/2 relative bg-amber-950 min-h-[240px] md:min-h-[320px] overflow-hidden">
              <img
                src="/assets/aistudio/Gemini_Generated_Image_j5vt77j5vt77j5vt__1__8ec11c4a.png"
                alt="Queen Ratnamanjuri reading her royal decree to Khoisnam and relatives"
                className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-4 right-4 text-white">
                <span className="text-micro uppercase font-bold tracking-widest text-amber-300">
                  Palace of Ratnas
                </span>
                <p className="text-small font-bold text-slate-100">
                  Queen Ratnamanjuri addresses her son Khoisnam and 99 relatives.
                </p>
              </div>
            </div>

            {/* Right: The Queen's Will & Riddle Statement */}
            <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between gap-5 bg-gradient-to-br from-amber-50/50 via-white to-amber-50/30">
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2 text-amber-800">
                  <Scroll className="w-5 h-5 text-amber-600" />
                  <span className="text-micro font-extrabold uppercase tracking-widest">
                    Royal Testament &amp; Will
                  </span>
                </div>

                <h3 className="text-title font-black text-slate-900 tracking-tight leading-tight">
                  The Royal Decree of Queen Ratnamanjuri
                </h3>

                <blockquote className="p-4 rounded-2xl bg-amber-100/70 border border-amber-300/80 text-body text-amber-950 font-serif italic leading-relaxed relative">
                  &ldquo;I have created a puzzle. If all 100 of you answer it at the same time, you
                  will share the ratnas (precious stones) equally. However, if you are the first one
                  to solve the problem, you will get to keep the entire inheritance to yourself. Good
                  luck.&rdquo;
                </blockquote>

                <p className="text-small text-slate-700 leading-relaxed">
                  Test the <strong>100-locker grid</strong> right below, or enter the vault to make your prediction!
                </p>
              </div>

              <div className="pt-2 flex items-center justify-between gap-2 flex-wrap">
                <span className="text-micro text-slate-500 font-medium">
                  Grade 8 NCERT Mathematics · Chapter 1 Opening Story
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setPanelIndex(1);
                    onAdvanceStep?.();
                  }}
                  className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-small font-bold flex items-center gap-2 shadow-2xs transition-colors cursor-pointer"
                >
                  <span>Enter Secret Vault</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Immediate Interactive 100-Locker Grid */}
          {renderLockerSimulator()}
        </div>
      )}

      {/* ================================================================= */}
      {/* PANEL 2: THE SECRET VAULT & STUDENT GUESSING CHALLENGE */}
      {/* ================================================================= */}
      {panelIndex === 1 && (
        <div className="w-full flex flex-col gap-6 animate-fade-rise">
          {/* Top Story Panel with Image */}
          <div className="w-full bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-xs flex flex-col md:flex-row">
            {/* Vault Image */}
            <div className="md:w-5/12 relative bg-stone-900 min-h-[240px] md:min-h-[320px] overflow-hidden">
              <img
                src="/assets/aistudio/Gemini_Generated_Image_j5vt77j5vt77j5vt_bba255c4.png"
                alt="Advisor explaining the locker rule to Prince Khoisnam"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-4 right-4 text-white">
                <span className="text-micro uppercase font-bold tracking-widest text-blue-300">
                  The Secret Stone Vault
                </span>
                <p className="text-small font-bold text-slate-100">
                  100 wooden lockers line the ancient walls, all closed.
                </p>
              </div>
            </div>

            {/* Minister Explanation */}
            <div className="md:w-7/12 p-6 flex flex-col justify-between gap-4">
              <div className="flex flex-col gap-2.5">
                <span className="text-micro font-bold uppercase tracking-wider text-blue-600">
                  The Royal Minister Explains The Rules
                </span>
                <h3 className="text-statement font-extrabold text-slate-900 leading-snug">
                  100 People Walk in Line — How Will the Doors Move?
                </h3>
                <ul className="space-y-2 text-small text-slate-700">
                  <li className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-md bg-blue-100 text-blue-800 font-bold text-micro flex items-center justify-center shrink-0 mt-0.5">
                      1
                    </span>
                    <span>
                      <strong>Person 1</strong> opens every single locker (1 to 100).
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-md bg-blue-100 text-blue-800 font-bold text-micro flex items-center justify-center shrink-0 mt-0.5">
                      2
                    </span>
                    <span>
                      <strong>Person 2</strong> flips every 2nd locker (closes 2, 4, 6, 8...).
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-md bg-blue-100 text-blue-800 font-bold text-micro flex items-center justify-center shrink-0 mt-0.5">
                      k
                    </span>
                    <span>
                      <strong>Person k</strong> flips every k-th locker (k, 2k, 3k, 4k...).
                    </span>
                  </li>
                </ul>
              </div>

              <div className="p-3.5 rounded-2xl bg-blue-50/60 text-small text-blue-950 font-medium">
                💡 <strong>Key Clue:</strong> If a locker is flipped an <em>odd</em> number of times,
                it remains <strong>OPEN</strong>. If flipped an <em>even</em> number of times, it ends
                up <strong>CLOSED</strong>!
              </div>
            </div>
          </div>

          {/* Student Prediction Challenge */}
          <div className="w-full bg-white p-5 sm:p-7 rounded-3xl border border-slate-200/80 shadow-2xs flex flex-col gap-5">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div>
                <span className="text-micro font-bold uppercase tracking-wider text-amber-700 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  <span>Student Challenge</span>
                </span>
                <h4 className="text-statement font-bold text-slate-900 mt-0.5">
                  Make Your Prediction: Which Lockers Stay Open?
                </h4>
              </div>
              <span className="text-micro text-slate-400">Pick a conjecture</span>
            </div>

            {/* Prediction Choices */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                {
                  id: 'evens',
                  label: 'All Even Lockers (2, 4, 6, 8...)',
                  desc: 'Because half the people flip evens.',
                  isCorrect: false,
                },
                {
                  id: 'primes',
                  label: 'Only Prime Lockers (2, 3, 5, 7...)',
                  desc: 'Because primes have few divisors.',
                  isCorrect: false,
                },
                {
                  id: 'squares',
                  label: 'Perfect Square Lockers (1, 4, 9, 16, 25, 36, 49, 64, 81, 100)',
                  desc: 'Because they have an ODD number of factors!',
                  isCorrect: true,
                },
                {
                  id: 'odds',
                  label: 'All Odd Lockers (1, 3, 5, 7...)',
                  desc: 'Because person 1 opened them.',
                  isCorrect: false,
                },
              ].map((opt) => {
                const isSelected = studentGuess === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setStudentGuess(opt.id)}
                    className={`min-h-[48px] p-4 rounded-2xl border text-left transition-colors cursor-pointer flex flex-col gap-1.5 ${
                      isSelected
                        ? opt.isCorrect
                          ? 'bg-emerald-50/80 border-emerald-500 ring-2 ring-emerald-500/20'
                          : 'bg-amber-50/80 border-amber-400 ring-2 ring-amber-400/20'
                        : 'bg-slate-50/60 hover:bg-slate-100/70 border-slate-200/80'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-small font-bold text-slate-900">{opt.label}</span>
                      {isSelected && (
                        <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-micro shrink-0">
                          ✓
                        </span>
                      )}
                    </div>
                    <span className="text-micro text-slate-500">{opt.desc}</span>
                  </button>
                );
              })}
            </div>

            {/* Interactive Quick Guesser Grid */}
            <div className="flex flex-col gap-2.5 pt-2 border-t border-slate-100">
              <div className="flex items-center justify-between text-small">
                <span className="font-semibold text-slate-700">
                  Or tap lockers (1–50) to mark your guess:
                </span>
                <span className="text-micro font-bold text-[#005583] tabular-nums">
                  {guessedLockerSet.size} selected
                </span>
              </div>

              <div className="grid grid-cols-10 gap-1 sm:gap-1.5 w-full max-w-[620px] mx-auto py-1">
                {Array.from({ length: 50 }, (_, i) => i + 1).map((num) => {
                  const isPicked = guessedLockerSet.has(num);
                  return (
                    <button
                      key={num}
                      type="button"
                      onClick={() => handleToggleLockerGuess(num)}
                      className={`aspect-square rounded-md sm:rounded-lg text-[11px] sm:text-micro font-bold border transition-colors cursor-pointer flex items-center justify-center tabular-nums ${
                        isPicked
                          ? 'bg-[#005583] text-white border-[#003F62]'
                          : 'bg-slate-50 text-slate-600 border-slate-200/80 hover:bg-slate-100'
                      }`}
                    >
                      {num}
                    </button>
                  );
                })}
              </div>
              <p className="text-center text-micro text-slate-500">
                Tap numbers 1–50 above to toggle your prediction
              </p>
            </div>

            {/* Bottom Action */}
            <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
              {studentGuess ? (
                <div className="flex items-center gap-2 text-small">
                  <CheckCircle2
                    className={`w-4 h-4 ${
                      studentGuess === 'squares' ? 'text-emerald-600' : 'text-amber-600'
                    }`}
                  />
                  <span className="font-medium text-slate-800">
                    {studentGuess === 'squares'
                      ? 'Incredible intuition! You spotted the mathematical secret.'
                      : 'Interesting theory! Let’s run the royal animation to test it.'}
                  </span>
                </div>
              ) : (
                <span className="text-small text-slate-500">
                  Pick a prediction or proceed to see the full animation!
                </span>
              )}

              <button
                type="button"
                onClick={() => {
                  setPanelIndex(2);
                  setCurrentPerson(0);
                  setIsPlaying(true);
                  onAdvanceStep?.();
                }}
                className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-small font-bold flex items-center gap-2 shadow-2xs transition-colors cursor-pointer"
              >
                <span>Run Royal Simulation</span>
                <Play className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================================================================= */}
      {/* PANEL 3: THE SOLUTION ANIMATION & GOLDEN TREASURE REVEALED */}
      {/* ================================================================= */}
      {panelIndex === 2 && (
        <div className="w-full flex flex-col gap-6 animate-fade-rise">
          {/* Top Storyboard Panel with Solution Image */}
          <div className="w-full bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-xs flex flex-col md:flex-row">
            {/* Treasure Image */}
            <div className="md:w-5/12 relative bg-amber-950 min-h-[240px] md:min-h-[300px] overflow-hidden">
              <img
                src="/assets/aistudio/Gemini_Generated_Image_j5vt77j5vt77j5vt__2__ad378f1a.png"
                alt="Prince Khoisnam reveals the open lockers with ratnas treasure"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-4 right-4 text-white">
                <span className="text-micro uppercase font-bold tracking-widest text-amber-300">
                  The Treasure Revealed
                </span>
                <p className="text-small font-bold text-slate-100">
                  Khoisnam smiles as exactly 10 lockers open to reveal glittering ratnas!
                </p>
              </div>
            </div>

            {/* Step-by-Step Solution & Passcode Card */}
            <div
              onClick={() => {
                if (solutionStep >= 3) return;
                const sel = window.getSelection()?.toString();
                if (sel && sel.length > 0) return;
                setSolutionStep((s) => Math.min(3, s + 1));
              }}
              className={`md:w-7/12 p-6 flex flex-col justify-between gap-4 ${
                solutionStep < 3 ? 'cursor-pointer' : ''
              }`}
            >
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <div className="flex items-center gap-2 text-emerald-700">
                    <Gem className="w-4 h-4 text-emerald-600" />
                    <span className="text-micro font-bold uppercase tracking-wider">
                      The 10 Open Lockers
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-900 text-micro font-bold tabular-nums">
                      Step {solutionStep} of 3
                    </span>
                  </div>

                  {solutionStep < 3 && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSolutionStep(3);
                      }}
                      className="text-micro font-bold text-[#005583] hover:underline cursor-pointer px-2 py-1 rounded-md hover:bg-blue-50"
                    >
                      Show all steps
                    </button>
                  )}
                </div>

                <h3 className="text-statement font-extrabold text-slate-900 leading-snug">
                  Why Do Exactly 10 Lockers Stay Open?
                </h3>

                {/* Step 1 */}
                <div className="p-3.5 rounded-2xl bg-slate-50/80 text-small text-slate-700 leading-relaxed animate-fade-rise">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-5 h-5 rounded-md bg-blue-100 text-blue-800 text-micro font-bold flex items-center justify-center shrink-0 tabular-nums">
                      1
                    </span>
                    <span className="font-bold text-slate-900">Distinct pairs close normal lockers</span>
                  </div>
                  Locker #L is flipped once by each of its <strong>divisors</strong>. Normal numbers
                  have divisors in <em>distinct pairs</em> (like 1×12, 2×6, 3×4 for 12), so their
                  factor count is <strong>even</strong> (Closed).
                </div>

                {/* Step 2 */}
                {solutionStep >= 2 && (
                  <div className="p-3.5 rounded-2xl bg-emerald-50/60 text-small text-slate-700 leading-relaxed animate-fade-rise">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="w-5 h-5 rounded-md bg-emerald-100 text-emerald-800 text-micro font-bold flex items-center justify-center shrink-0 tabular-nums">
                        2
                      </span>
                      <span className="font-bold text-slate-900">Lone square factor keeps them open</span>
                    </div>
                    Only <strong>square numbers</strong> have a factor multiplied by itself (like 6×6
                    for 36), which has no distinct partner. Thus square numbers have an{' '}
                    <strong className="text-amber-700 font-bold">ODD number of factors</strong> and stay{' '}
                    <strong className="text-emerald-700 font-bold">OPEN</strong>!
                  </div>
                )}

                {/* Step 3: Passcode & Summary */}
                {solutionStep >= 3 && (
                  <div className="p-3.5 rounded-2xl bg-amber-50/70 flex items-center justify-between gap-3 animate-fade-rise">
                    <div className="flex items-center gap-2.5">
                      <KeyRound className="w-5 h-5 text-amber-700 shrink-0" />
                      <div>
                        <span className="text-micro font-bold uppercase tracking-wider text-amber-800">
                          Step 3 · The 10 Open Lockers &amp; Safe Passcode
                        </span>
                        <p className="text-small text-amber-950 font-bold">
                          Squares 1, 4, 9, 16, 25, 36, 49, 64, 81, 100 stay open! Primes touched twice:{' '}
                          <span className="font-mono text-emerald-800 font-black">2 - 3 - 5 - 7 - 11</span>
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {solutionStep < 3 && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSolutionStep((s) => Math.min(3, s + 1));
                  }}
                  className="w-full min-h-[42px] px-4 py-2 rounded-xl border-2 border-dashed border-[#005583]/40 bg-sky-50/80 hover:bg-sky-100 text-[#005583] text-small font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>Tap to display Step {solutionStep + 1} of 3</span>
                  <ChevronRight className="w-4 h-4 shrink-0" />
                </button>
              )}
            </div>
          </div>

          {/* Interactive Simulation Controls */}
          {renderLockerSimulator()}
        </div>
      )}
    </div>
  );
};
