/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { Katex } from '../components/Katex';
import {
  Play,
  Pause,
  RotateCcw,
  ChevronRight,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  HelpCircle,
} from 'lucide-react';
import { useViewportTier } from '../hooks/useViewportTier';

export interface OddSubtractionSceneProps {
  className?: string;
  initialStep?: number;
  beatIndex?: number;
}

interface SubStep {
  stepNum: number;
  odd: number;
  from: number;
  result: number;
}

const STEPS_25: SubStep[] = [
  { stepNum: 1, odd: 1, from: 25, result: 24 },
  { stepNum: 2, odd: 3, from: 24, result: 21 },
  { stepNum: 3, odd: 5, from: 21, result: 16 },
  { stepNum: 4, odd: 7, from: 16, result: 9 },
  { stepNum: 5, odd: 9, from: 9, result: 0 },
];

const STEPS_81: SubStep[] = [
  { stepNum: 1, odd: 1, from: 81, result: 80 },
  { stepNum: 2, odd: 3, from: 80, result: 77 },
  { stepNum: 3, odd: 5, from: 77, result: 72 },
  { stepNum: 4, odd: 7, from: 72, result: 65 },
  { stepNum: 5, odd: 9, from: 65, result: 56 },
  { stepNum: 6, odd: 11, from: 56, result: 45 },
  { stepNum: 7, odd: 13, from: 45, result: 32 },
  { stepNum: 8, odd: 15, from: 32, result: 17 },
  { stepNum: 9, odd: 17, from: 17, result: 0 },
];

const STEPS_38: SubStep[] = [
  { stepNum: 1, odd: 1, from: 38, result: 37 },
  { stepNum: 2, odd: 3, from: 37, result: 34 },
  { stepNum: 3, odd: 5, from: 34, result: 29 },
  { stepNum: 4, odd: 7, from: 29, result: 22 },
  { stepNum: 5, odd: 9, from: 22, result: 13 },
  { stepNum: 6, odd: 11, from: 13, result: 2 },
  { stepNum: 7, odd: 13, from: 2, result: -11 },
];

export const OddSubtractionScene: React.FC<OddSubtractionSceneProps> = ({
  className = '',
  initialStep = 0,
  beatIndex,
}) => {
  const [selectedNum, setSelectedNum] = useState<'25' | '81' | '38'>('25');
  const [currentStep, setCurrentStep] = useState<number>(initialStep);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [show729Teaser, setShow729Teaser] = useState<boolean>(false);
  const timerRef = useRef<number | null>(null);
  const { tier, isNarrow } = useViewportTier();
  const isCompact = tier === 'compact';

  const stepsList = selectedNum === '25' ? STEPS_25 : selectedNum === '81' ? STEPS_81 : STEPS_38;
  const maxSteps = stepsList.length;

  useEffect(() => {
    if (beatIndex === undefined) return;
    setIsPlaying(false);
    if (beatIndex === 0) {
      setSelectedNum('25');
      setCurrentStep(5);
    } else if (beatIndex === 1) {
      setSelectedNum('81');
      setCurrentStep(9);
    } else {
      setSelectedNum('38');
      setCurrentStep(7);
    }
  }, [beatIndex]);

  useEffect(() => {
    if (isPlaying) {
      timerRef.current = window.setInterval(() => {
        setCurrentStep((prev) => {
          if (prev >= maxSteps) {
            setIsPlaying(false);
            return maxSteps;
          }
          return prev + 1;
        });
      }, 700);
    } else if (timerRef.current !== null) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    return () => {
      if (timerRef.current !== null) {
        clearInterval(timerRef.current);
      }
    };
  }, [isPlaying, maxSteps]);

  const handleStepNext = () => {
    setIsPlaying(false);
    setCurrentStep((s) => Math.min(maxSteps, s + 1));
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStep(0);
  };

  const isFinished = currentStep >= maxSteps;
  const isSuccess = (selectedNum === '25' || selectedNum === '81') && isFinished;
  const isFailure = selectedNum === '38' && isFinished;

  return (
    <div
      data-no-nav="true"
      className={`w-full max-w-5xl h-full max-h-full min-h-0 overflow-hidden mx-auto flex flex-col justify-between ${
        isCompact ? 'gap-1.5 p-2' : 'gap-2 sm:gap-2.5 p-2.5 sm:p-4'
      } bg-white rounded-3xl border border-slate-200/80 shadow-xs ${className}`}
    >
      {/* Header & Controls */}
      <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1.5 border-b border-slate-100 pb-2 shrink-0">
        <div className="min-w-0">
          {!isCompact && (
            <span className="text-micro font-bold uppercase tracking-wider text-slate-500 hidden sm:block">
              NCERT Method 2 · Repeated Subtraction of Odds
            </span>
          )}
          <h3 className="text-small sm:text-statement font-extrabold text-slate-900 mt-0.5">
            Subtract 1, 3, 5, 7, 9... Until You Reach 0!
          </h3>
        </div>

        {/* Playback actions */}
        <div className="flex items-center gap-1.5 shrink-0 flex-wrap">
          <button
            type="button"
            onClick={handleStepNext}
            disabled={currentStep >= maxSteps}
            className={`min-h-[32px] px-2.5 py-1 rounded-xl text-micro font-bold flex items-center gap-1 transition-all cursor-pointer shrink-0 ${
              currentStep >= maxSteps
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 text-white shadow-2xs'
            }`}
          >
            <span>Step</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={() => {
              if (currentStep >= maxSteps) setCurrentStep(0);
              setIsPlaying((p) => !p);
            }}
            className={`min-h-[32px] px-2.5 py-1 rounded-xl text-micro font-bold flex items-center gap-1 transition-all cursor-pointer shrink-0 ${
              isPlaying
                ? 'bg-amber-600 text-white'
                : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-2xs'
            }`}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isPlaying ? 'Pause' : 'Play'}</span>
          </button>

          <button
            type="button"
            onClick={handleReset}
            className="min-h-[32px] w-8 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-600 cursor-pointer flex items-center justify-center shrink-0"
            title="Reset"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Number Selectors Bar + 729 Inefficiency Challenge Button */}
      <div className="flex flex-wrap items-center justify-between gap-1.5 p-1 rounded-2xl bg-slate-100/90 shrink-0">
        <div className="flex items-center gap-1 flex-wrap">
          <span className="text-micro font-bold text-slate-600 ml-1 mr-0.5">Test:</span>
          {(['25', '81', '38'] as const).map((num) => (
            <button
              key={num}
              type="button"
              onClick={() => {
                setSelectedNum(num);
                setCurrentStep(0);
                setIsPlaying(false);
                setShow729Teaser(false);
              }}
              className={`min-h-[30px] px-2.5 py-0.5 rounded-lg text-micro font-bold cursor-pointer transition-all ${
                selectedNum === num && !show729Teaser
                  ? 'bg-white text-[#005583] shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {num === '25' ? '25 (5 steps)' : num === '81' ? '81 (9 steps)' : '38 (Fails)'}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setShow729Teaser((prev) => !prev)}
          className={`min-h-[30px] px-2.5 py-0.5 rounded-lg text-micro font-bold cursor-pointer transition-all flex items-center gap-1 ${
            show729Teaser
              ? 'bg-[#F27A00] text-white shadow-2xs'
              : 'bg-white text-orange-950 border border-orange-200 hover:bg-orange-50'
          }`}
        >
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Why Not 729? (27 steps!)</span>
        </button>
      </div>

      {/* Main Content Area */}
      {show729Teaser ? (
        <div className="flex flex-col flex-1 min-h-0 justify-center items-center p-3 rounded-2xl bg-orange-50/70 border border-orange-200 text-center animate-fade-rise gap-2">
          <div className="w-10 h-10 rounded-2xl bg-orange-500 text-white flex items-center justify-center font-mono font-black text-body shadow-2xs">
            729
          </div>
          <h4 className="text-small sm:text-statement font-extrabold text-orange-950">
            The 729 Subtraction Challenge
          </h4>
          <p className="text-micro sm:text-small text-slate-700 max-w-xl leading-relaxed">
            Since <strong className="text-slate-900">27² = 729</strong>, repeated subtraction would take{' '}
            <strong className="text-orange-900">27 full subtraction steps</strong>:
          </p>
          <div className="font-mono text-micro sm:text-small font-bold text-orange-900 bg-white px-3 py-1.5 rounded-xl border border-orange-200">
            729 − 1 = 728, 728 − 3 = 725, ... down to ... 53 − 53 = 0
          </div>
          <p className="text-micro sm:text-small font-bold text-slate-800 max-w-lg">
            Subtracting 27 times by hand is slow and error-prone. That is why we need{' '}
            <span className="text-[#005583] underline decoration-[#005583]">Prime Factorization</span> and{' '}
            <span className="text-[#005583] underline decoration-[#005583]">Long Division</span>!
          </p>
          <button
            type="button"
            onClick={() => setShow729Teaser(false)}
            className="min-h-[32px] px-3 py-1 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-micro font-bold cursor-pointer transition-colors"
          >
            Back to Active Test
          </button>
        </div>
      ) : (
        /* Steps Visualizer Container */
        <div
          className={`flex flex-col flex-1 min-h-0 justify-between p-2.5 sm:p-3 rounded-2xl border transition-all animate-fade-rise ${
            isSuccess
              ? 'bg-emerald-50/60 border-emerald-300 ring-2 ring-emerald-400/20'
              : isFailure
              ? 'bg-amber-50/60 border-amber-300 ring-2 ring-amber-400/20'
              : 'bg-slate-50/60 border-slate-200'
          }`}
        >
          {/* Card Top Banner */}
          <div className="flex items-center justify-between pb-1.5 border-b border-slate-200/60 shrink-0">
            <div className="flex items-center gap-2">
              <span
                className={`w-7 h-7 rounded-xl text-white font-mono font-bold text-micro sm:text-small flex items-center justify-center ${
                  selectedNum === '38' ? 'bg-amber-600' : 'bg-emerald-600'
                }`}
              >
                {selectedNum}
              </span>
              <span className="text-micro sm:text-small font-bold text-slate-900">
                Testing {selectedNum} · Goal: Reach exactly 0
              </span>
            </div>

            {isSuccess && (
              <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-micro font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Hits 0 in {maxSteps} steps!</span>
              </span>
            )}
            {isFailure && (
              <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-micro font-bold bg-amber-100 text-amber-900 border border-amber-300">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                <span>Overshot 0! Not a square</span>
              </span>
            )}
          </div>

          {/* Subtraction Rows Grid (2 columns if 81, or single column) */}
          <div className="flex-1 min-h-0 overflow-hidden flex flex-col justify-center">
            {currentStep === 0 ? (
              <div className="text-center p-3 text-micro sm:text-small text-slate-500">
                Tap <strong>Step</strong> or <strong>Play</strong> to begin subtracting consecutive odd numbers!
              </div>
            ) : (
              <div
                className={`grid ${
                  selectedNum === '81' ? 'grid-cols-1 sm:grid-cols-2 gap-1 sm:gap-1.5' : 'grid-cols-1 gap-1'
                } content-center`}
              >
                {stepsList.slice(0, currentStep).map((st) => {
                  const isHitZero = st.result === 0;
                  const isNeg = st.result < 0;
                  return (
                    <div
                      key={st.stepNum}
                      className={`px-2 py-0.5 sm:py-1 rounded-xl border flex items-center justify-between text-micro font-mono transition-all animate-fade-rise ${
                        isHitZero
                          ? 'bg-emerald-100 text-emerald-950 border-emerald-400 font-bold'
                          : isNeg
                          ? 'bg-rose-100 text-rose-950 border-rose-300 font-bold'
                          : 'bg-white text-slate-800 border-slate-200/80'
                      }`}
                    >
                      <div className="flex items-center gap-1.5">
                        <span className="w-4 h-4 rounded-full bg-slate-100 text-[10px] font-bold text-slate-600 flex items-center justify-center">
                          {st.stepNum}
                        </span>
                        <span>
                          {st.from} − <strong className="text-purple-700">{st.odd}</strong> =
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-black text-small tabular-nums">{st.result}</span>
                        {isHitZero && (
                          <span className="text-[10px] font-bold text-emerald-800 bg-white px-1.5 py-0.2 rounded border border-emerald-300">
                            ZERO!
                          </span>
                        )}
                        {isNeg && (
                          <span className="text-[10px] font-bold text-rose-800 bg-white px-1.5 py-0.2 rounded border border-rose-300">
                            &lt; 0
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Outcome Result Banner */}
          <div className="p-1.5 sm:p-2 rounded-xl bg-white border border-slate-200 shrink-0 flex items-center justify-between gap-2">
            <div className="text-micro sm:text-small font-bold text-slate-800">
              {isSuccess ? (
                <span className="text-emerald-800">
                  Reached 0 in <strong>{maxSteps} steps</strong> → <Katex latex={`\\sqrt{${selectedNum}} = ${maxSteps}`} displayMode={false} />
                </span>
              ) : isFailure ? (
                <span className="text-amber-800">
                  Overshot from 2 to −11 (never landed on 0) → <strong>38 is NOT a square!</strong>
                </span>
              ) : (
                <span className="text-slate-600">
                  Current step: <strong>{currentStep} of {maxSteps}</strong>
                </span>
              )}
            </div>

            <span className="text-[11px] text-slate-500 font-medium hidden sm:inline">
              Rule: Every square is the sum of consecutive odd numbers starting from 1.
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export interface OddSubtractionMeterSvgProps {
  startValue: number;
  oddsSubtracted: number[];
  overshotValue?: number | null;
  overshotOdd?: number;
}

export const OddSubtractionMeterSvg: React.FC<OddSubtractionMeterSvgProps> = ({
  startValue,
  oddsSubtracted,
  overshotValue = null,
  overshotOdd = 15,
}) => {
  const totalRemoved = oddsSubtracted.reduce((acc, v) => acc + v, 0);
  const currentRem = startValue - totalRemoved;
  const fillRatio = Math.max(0, Math.min(1, currentRem / Math.max(1, startValue)));

  return (
    <div className="flex items-center justify-center gap-4 w-full max-w-[340px]">
      <svg viewBox="0 0 110 120" className="h-[104px] w-[96px] shrink-0 select-none">
        {/* Fuel Tank Frame */}
        <rect x={28} y={10} width={54} height={82} rx={10} fill="#F8FAFC" stroke="#94A3B8" strokeWidth={2} />
        {/* Zero Target Line */}
        <line x1={18} y1={92} x2={94} y2={92} stroke={overshotValue !== null ? '#DC2626' : '#16A34A'} strokeWidth={2.5} strokeDasharray="4 2" />
        <text x={96} y={96} fill={overshotValue !== null ? '#DC2626' : '#15803D'} fontSize={14} fontWeight={900}>
          0
        </text>
        {/* Remaining Volume Bar */}
        {currentRem > 0 && (
          <rect
            x={32}
            y={90 - fillRatio * 76}
            width={46}
            height={Math.max(6, fillRatio * 76)}
            rx={6}
            fill={currentRem <= 2 ? '#F59E0B' : '#0EA5E9'}
            style={{ transition: 'all 350ms cubic-bezier(0.22, 1, 0.36, 1)' }}
          />
        )}
        {overshotValue !== null && (
          <rect
            x={32}
            y={94}
            width={46}
            height={18}
            rx={5}
            fill="#DC2626"
          />
        )}
        <text x={55} y={54} textAnchor="middle" fill="#0F172A" fontSize={15} fontWeight={900}>
          {overshotValue !== null ? overshotValue : currentRem}
        </text>
      </svg>

      <div className="flex flex-col gap-1 min-w-0">
        <div className="flex flex-wrap gap-1 font-mono font-bold text-micro">
          {oddsSubtracted.map((o) => (
            <span key={o} className="px-1.5 py-0.5 rounded-md bg-purple-50 border border-purple-200 text-purple-800">
              −{o}
            </span>
          ))}
        </div>
        <div className="text-micro font-extrabold text-slate-700">
          {overshotValue !== null
            ? `−${overshotOdd} drops to ${overshotValue} (Misses 0!)`
            : `${startValue} − ${totalRemoved} = ${currentRem}`}
        </div>
      </div>
    </div>
  );
};

export interface BetweenSquaresLineSvgProps {
  n: number;
  highlightGap: boolean;
  showCountBadge?: boolean;
}

export const BetweenSquaresLineSvg: React.FC<BetweenSquaresLineSvgProps> = ({
  n,
  highlightGap,
  showCountBadge = false,
}) => {
  const low = n * n;
  const high = (n + 1) * (n + 1);
  const gap = high - low - 1;

  return (
    <svg viewBox="0 0 360 112" className="h-[104px] w-full max-w-[350px] select-none">
      {/* Main Number Line */}
      <line x1={38} y1={58} x2={322} y2={58} stroke="#64748B" strokeWidth={3} strokeLinecap="round" />

      {/* Highlighted Gap Ribbon */}
      {highlightGap && (
        <rect
          x={74}
          y={46}
          width={212}
          height={24}
          rx={12}
          fill="#DCFCE7"
          stroke="#16A34A"
          strokeWidth={2}
        />
      )}

      {/* Left Square Pillar */}
      <g transform="translate(52, 58)">
        <circle cx={0} cy={0} r={22} fill="#005583" />
        <text x={0} y={-2} textAnchor="middle" fill="#FFFFFF" fontSize={14} fontWeight={900}>
          {low}
        </text>
        <text x={0} y={13} textAnchor="middle" fill="#BAE6FD" fontSize={14} fontWeight={700}>
          {n}²
        </text>
      </g>

      {/* Right Square Pillar */}
      <g transform="translate(308, 58)">
        <circle cx={0} cy={0} r={22} fill="#005583" />
        <text x={0} y={-2} textAnchor="middle" fill="#FFFFFF" fontSize={14} fontWeight={900}>
          {high}
        </text>
        <text x={0} y={13} textAnchor="middle" fill="#BAE6FD" fontSize={14} fontWeight={700}>
          {n + 1}²
        </text>
      </g>

      {/* Gap Count Callout */}
      <text
        x={180}
        y={highlightGap ? 63 : 38}
        textAnchor="middle"
        fill={showCountBadge ? '#15803D' : '#0F172A'}
        fontSize={14}
        fontWeight={900}
      >
        {showCountBadge ? `${gap} non-squares (2 × ${n})` : `${low + 1} … ${high - 1}`}
      </text>
    </svg>
  );
};