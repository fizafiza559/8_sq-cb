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
  Scroll,
  ArrowRight,
  ArrowLeft,
  Grid,
  ChevronRight,
} from 'lucide-react';
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
      className={`w-full max-w-4xl max-h-full overflow-y-auto no-scrollbar mx-auto rounded-3xl border border-slate-200/80 bg-white p-3 sm:p-4 shadow-2xs flex flex-col gap-2.5 sm:gap-3 ${className}`}
    >
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
        <div className="min-w-0">
          <span className="text-micro font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
            <Grid className="w-3.5 h-3.5 text-orange-500 shrink-0" />
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
      <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
        {FACTOR_PAIR_OPTIONS_36.map((opt, idx) => {
          const isActive = idx === selectedIdx;
          return (
            <button
              key={opt.label}
              type="button"
              onClick={() => setSelectedIdx(idx)}
              className={`min-h-[44px] px-3 sm:px-4 py-1.5 rounded-xl text-micro sm:text-small font-bold border transition-all cursor-pointer whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
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
        className="w-full rounded-2xl p-2 sm:p-3 flex flex-col items-center justify-center relative overflow-hidden transition-colors duration-300"
        style={{
          backgroundColor: current.isSquarePair ? '#FFFBF5' : '#F8FAFC',
        }}
      >
        <svg
          viewBox={`0 0 ${canvasW} ${canvasH}`}
          className="w-full h-auto max-h-[160px] sm:max-h-[220px] lg:max-h-[245px] select-none"
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 sm:gap-3 items-stretch border-t border-slate-100 pt-2.5">
        {/* All 9 Factors of 36 Strip */}
        <div className="p-3 sm:p-3.5 rounded-2xl bg-slate-50/80 flex flex-col gap-2 justify-center">
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

interface DialogueTurn {
  speaker: string;
  role: 'narrator' | 'queen' | 'prince' | 'relative';
  line: string;
}

const STEP1_DIALOGUE: DialogueTurn[] = [
  {
    speaker: 'Court Chronicler',
    role: 'narrator',
    line: 'Queen Ratnamanjuri has 100 children and relatives. Inside her palace, she sets a puzzle about 100 lockers.',
  },
  {
    speaker: 'Queen Ratnamanjuri',
    role: 'queen',
    line: '“Whoever solves my puzzle first keeps everything—the entire royal inheritance.”',
  },
  {
    speaker: 'Prince Khoisnam',
    role: 'prince',
    line: '“A puzzle of 100 lockers? Tell us how it works, Mother!”',
  },
  {
    speaker: 'Queen Ratnamanjuri',
    role: 'queen',
    line: '“Step into the Secret Vault, and watch the rules unfold.”',
  },
];

const STEP2_DIALOGUE: DialogueTurn[] = [
  {
    speaker: 'A Relative',
    role: 'relative',
    line: '“Look along the stone walls—every single one of the 100 lockers is closed!”',
  },
  {
    speaker: 'Queen Ratnamanjuri',
    role: 'queen',
    line: '“100 people will walk past one by one. Person 1 opens every locker.”',
  },
  {
    speaker: 'Prince Khoisnam',
    role: 'prince',
    line: '“Then Person 2 changes every 2nd locker, and Person 3 changes every 3rd?”',
  },
  {
    speaker: 'Queen Ratnamanjuri',
    role: 'queen',
    line: '“Yes, until Person 100 changes locker 100. Each change flips a locker: closed becomes open, open becomes closed.”',
  },
  {
    speaker: 'Queen Ratnamanjuri',
    role: 'queen',
    line: '“Which lockers will still be open at the end?”',
  },
];

const HEADING_FONT = "'Cinzel', Georgia, serif";
const BODY_FONT = "'Cormorant Garamond', Georgia, serif";

const PARCHMENT_PALETTE = {
  ink: '#3B2A1A',
  inkSoft: '#5E4630',
  inkMuted: '#7A5F43',
  paperBorder: '#C7A977',
  gold: '#B8862B',
  goldDark: '#7C5610',
  sealRed: '#8B2E1F',
  woodClosedTop: '#5E4836',
  woodClosedBottom: '#433224',
  woodClosedBorder: '#2C2016',
  woodOpenTop: '#F6E9CE',
  woodOpenBottom: '#E0C69A',
  woodOpenBorder: '#8D6738',
};

const PARCHMENT_SURFACE: React.CSSProperties = {
  background: 'linear-gradient(148deg, #FBF2E1 0%, #F1DFBE 56%, #E7CDA0 100%)',
  borderColor: PARCHMENT_PALETTE.paperBorder,
  boxShadow: 'inset 0 0 28px rgba(132, 92, 38, 0.09), 0 4px 16px rgba(59, 42, 26, 0.08)',
  color: PARCHMENT_PALETTE.ink,
  fontFamily: BODY_FONT,
};

const INSET_PARCHMENT: React.CSSProperties = {
  background: 'rgba(255, 250, 240, 0.62)',
  borderColor: '#D2B88C',
  color: PARCHMENT_PALETTE.ink,
};

export const LockerStorySection: React.FC<LockerStorySectionProps> = ({
  subTabId: _subTabId,
  stepIndex,
  onAdvanceStep,
}) => {
  // Strictly synced to stepIndex: 0 = Queen's Decree, 1 = Secret Vault, 2 = Royal Walk
  const [panelIndex, setPanelIndex] = useState<number>(() => Math.min(2, Math.max(0, stepIndex)));

  // Tap-induced dialogue reveal counts for Steps 1 and 2
  const [decreeTurn, setDecreeTurn] = useState<number>(1);
  const [vaultTurn, setVaultTurn] = useState<number>(1);

  // Separate pages in Step 3: 'walk' (Try the Walk) | 'solution' (The Solution)
  const [step3Page, setStep3Page] = useState<'walk' | 'solution'>('walk');

  // Royal Walk simulation state (starts paused at 0)
  const [currentPerson, setCurrentPerson] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [inspectedLocker, setInspectedLocker] = useState<number>(36);
  const [solutionStep, setSolutionStep] = useState<number>(1);

  const playTimerRef = useRef<number | null>(null);

  // Sync panelIndex strictly from stepIndex prop without jumping currentPerson
  useEffect(() => {
    if (stepIndex >= 0 && stepIndex <= 2) {
      setPanelIndex(stepIndex);
      if (stepIndex !== 2) {
        setIsPlaying(false);
      }
    }
  }, [stepIndex]);

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
    } else if (playTimerRef.current !== null) {
      clearInterval(playTimerRef.current);
      playTimerRef.current = null;
    }
    return () => {
      if (playTimerRef.current !== null) {
        clearInterval(playTimerRef.current);
      }
    };
  }, [isPlaying, playbackSpeed]);

  const lockerStates = lockers(currentPerson, 100);
  const openCount = lockerStates.filter(Boolean).length;
  const touchedByCurrent =
    currentPerson > 0
      ? Array.from({ length: 100 }, (_, i) => i + 1).filter((num) => num % currentPerson === 0)
      : [];

  const inspectedFlipCount = toggleCount(inspectedLocker);
  const inspectedDivisors = divisors(inspectedLocker);
  const inspectedIsSquare = isSquare(inspectedLocker);
  const inspectedEndsOpen = inspectedFlipCount % 2 === 1;
  const inspectedRoot = Math.round(Math.sqrt(inspectedLocker));

  const renderDialogueCard = (
    turns: DialogueTurn[],
    visibleCount: number,
    onNextTurn: () => void,
    onShowAll: () => void
  ) => {
    const hasMore = visibleCount < turns.length;

    return (
      <div
        role={hasMore ? 'button' : undefined}
        tabIndex={hasMore ? 0 : undefined}
        onClick={() => {
          if (!hasMore) return;
          const sel = window.getSelection()?.toString();
          if (sel && sel.length > 0) return;
          onNextTurn();
        }}
        onKeyDown={(e) => {
          if (hasMore && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            onNextTurn();
          }
        }}
        className={`flex flex-col gap-2.5 rounded-2xl border p-3.5 sm:p-4 transition-colors ${
          hasMore ? 'cursor-pointer' : ''
        }`}
        style={INSET_PARCHMENT}
      >
        <div className="flex items-center justify-between gap-2">
          <span
            className="text-[14px] font-semibold tabular-nums"
            style={{ color: PARCHMENT_PALETTE.inkMuted, fontFamily: BODY_FONT }}
          >
            Dialogue · {visibleCount} of {turns.length}
          </span>
          {hasMore && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onShowAll();
              }}
              className="min-h-[44px] px-3 py-1.5 rounded-lg text-[14px] font-bold underline underline-offset-2 cursor-pointer"
              style={{ color: PARCHMENT_PALETTE.sealRed, fontFamily: BODY_FONT }}
            >
              Show all
            </button>
          )}
        </div>

        <div className="flex flex-col gap-2">
          {turns.slice(0, visibleCount).map((item, idx) => {
            const isQueen = item.role === 'queen';
            const isNarrator = item.role === 'narrator';
            return (
              <div
                key={idx}
                className="rounded-xl border px-3 py-2.5 animate-fade-rise"
                style={{
                  background: isQueen
                    ? 'linear-gradient(135deg, rgba(184, 134, 43, 0.16), rgba(251, 242, 225, 0.9))'
                    : isNarrator
                    ? 'rgba(235, 217, 186, 0.45)'
                    : 'rgba(255, 252, 245, 0.75)',
                  borderColor: isQueen ? PARCHMENT_PALETTE.gold : '#D5BD94',
                }}
              >
                <div
                  className="text-[13px] font-bold tracking-wide"
                  style={{
                    fontFamily: HEADING_FONT,
                    color: isQueen ? PARCHMENT_PALETTE.goldDark : PARCHMENT_PALETTE.sealRed,
                  }}
                >
                  {item.speaker}
                </div>
                <p
                  className="text-[17px] sm:text-[18px] leading-snug mt-0.5 font-semibold"
                  style={{
                    fontFamily: BODY_FONT,
                    color: PARCHMENT_PALETTE.ink,
                    fontStyle: isQueen ? 'italic' : 'normal',
                  }}
                >
                  {item.line}
                </p>
              </div>
            );
          })}
        </div>

        {hasMore && (
          <div
            className="text-[15px] font-bold text-center pt-1 animate-pulse"
            style={{ color: PARCHMENT_PALETTE.sealRed, fontFamily: BODY_FONT }}
          >
            Tap dialogue to continue ({visibleCount} of {turns.length})
          </div>
        )}
      </div>
    );
  };

  const renderWoodenLockerGrid = (compact = false) => (
    <div className="w-full flex flex-col items-center gap-2">
      <div
        className={`grid grid-cols-10 gap-0.5 sm:gap-1.5 w-full ${
          compact
            ? 'max-w-[min(320px,36dvh)] sm:max-w-[min(390px,38dvh)]'
            : 'max-w-[min(336px,38dvh)] sm:max-w-[min(430px,42dvh)]'
        }`}
      >
        {Array.from({ length: 100 }, (_, i) => i + 1).map((num) => {
          const isOpen = lockerStates[num - 1];
          const isTouched = touchedByCurrent.includes(num);
          const isSq = isSquare(num);
          const isInspected = inspectedLocker === num;
          const isGoldSquare = isOpen && isSq && currentPerson === 100;

          let doorStyle: React.CSSProperties;
          if (isGoldSquare) {
            doorStyle = {
              background: 'linear-gradient(145deg, #E5BC58 0%, #B8862B 100%)',
              borderColor: PARCHMENT_PALETTE.goldDark,
              color: '#2A1A08',
            };
          } else if (isOpen) {
            doorStyle = {
              background: `linear-gradient(150deg, ${PARCHMENT_PALETTE.woodOpenTop} 0%, ${PARCHMENT_PALETTE.woodOpenBottom} 100%)`,
              borderColor: PARCHMENT_PALETTE.woodOpenBorder,
              color: PARCHMENT_PALETTE.ink,
            };
          } else {
            doorStyle = {
              background: `linear-gradient(155deg, ${PARCHMENT_PALETTE.woodClosedTop} 0%, ${PARCHMENT_PALETTE.woodClosedBottom} 100%)`,
              borderColor: PARCHMENT_PALETTE.woodClosedBorder,
              color: '#EFE3CE',
            };
          }

          let boxShadow = 'inset 0 1px 0 rgba(255,255,255,0.14)';
          if (isTouched && isInspected) {
            boxShadow = `0 0 0 2px ${PARCHMENT_PALETTE.sealRed}, 0 0 0 4px ${PARCHMENT_PALETTE.ink}`;
          } else if (isTouched) {
            boxShadow = `0 0 0 2px ${PARCHMENT_PALETTE.sealRed}`;
          } else if (isInspected) {
            boxShadow = `0 0 0 2px ${PARCHMENT_PALETTE.ink}`;
          }

          return (
            <button
              key={num}
              type="button"
              onClick={() => setInspectedLocker(num)}
              aria-label={`Locker ${num}: ${isOpen ? 'open' : 'closed'}${isSq ? ', perfect square' : ''}`}
              className="relative aspect-square rounded-md border flex flex-col items-center justify-center font-bold text-[11px] sm:text-[12px] transition-transform cursor-pointer tabular-nums overflow-hidden"
              style={{
                ...doorStyle,
                boxShadow,
                transform: isTouched ? 'scale(1.04)' : undefined,
              }}
            >
              {/* Thin iron hinge band */}
              <span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-[2px] opacity-60"
                style={{
                  backgroundColor: isOpen ? '#8C6738' : '#231910',
                }}
              />
              {/* Door ajar interior shadow strip on open doors */}
              {isOpen && (
                <span
                  aria-hidden="true"
                  className="absolute left-0 inset-y-0 w-[3px] sm:w-[4px]"
                  style={{
                    backgroundColor: isGoldSquare ? '#6E4B0D' : '#6A4E31',
                  }}
                />
              )}
              <span className="leading-none relative z-10">{num}</span>
              {!compact && (
                <span className="hidden sm:block mt-0.5 relative z-10">
                  {isOpen ? (
                    <Unlock
                      className="w-2.5 h-2.5"
                      style={{ color: isGoldSquare ? '#3B2305' : PARCHMENT_PALETTE.goldDark }}
                    />
                  ) : (
                    <Lock className="w-2.5 h-2.5 opacity-75" style={{ color: '#D7C5A8' }} />
                  )}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Legend */}
      <div
        className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 text-[14px] sm:text-[15px] font-semibold pt-0.5"
        style={{ color: PARCHMENT_PALETTE.inkSoft, fontFamily: BODY_FONT }}
      >
        <div className="flex items-center gap-1.5">
          <span
            className="w-3.5 h-3.5 rounded-sm border inline-block"
            style={{
              backgroundColor: PARCHMENT_PALETTE.gold,
              borderColor: PARCHMENT_PALETTE.goldDark,
            }}
          />
          <span style={{ color: PARCHMENT_PALETTE.ink }}>10 Open Squares (at 100)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span
            className="w-3.5 h-3.5 rounded-sm border inline-block"
            style={{
              backgroundColor: PARCHMENT_PALETTE.woodOpenTop,
              borderColor: PARCHMENT_PALETTE.woodOpenBorder,
            }}
          />
          <span>Open</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span
            className="w-3.5 h-3.5 rounded-sm border inline-block"
            style={{
              backgroundColor: PARCHMENT_PALETTE.woodClosedTop,
              borderColor: PARCHMENT_PALETTE.woodClosedBorder,
            }}
          />
          <span>Closed</span>
        </div>
        {touchedByCurrent.length > 0 && (
          <div className="flex items-center gap-1.5">
            <span
              className="w-3.5 h-3.5 rounded-sm inline-block"
              style={{
                boxShadow: `0 0 0 2px ${PARCHMENT_PALETTE.sealRed}`,
              }}
            />
            <span style={{ color: PARCHMENT_PALETTE.sealRed }}>
              Flipped by Person {currentPerson}
            </span>
          </div>
        )}
      </div>
    </div>
  );

  const renderWalkControls = (compact = false) => (
    <div className="flex flex-col gap-2.5">
      {/* Control Bar */}
      <div
        className="flex flex-wrap items-center justify-between gap-2 border-b pb-2.5"
        style={{ borderColor: '#D6BE93' }}
      >
        <div className="flex items-center gap-2 flex-wrap">
          <button
            type="button"
            onClick={() => {
              if (currentPerson >= 100 && !isPlaying) {
                setCurrentPerson(0);
              }
              setIsPlaying((p) => !p);
            }}
            className="min-h-[44px] px-4 py-2 rounded-xl text-[15px] font-bold flex items-center gap-1.5 cursor-pointer transition-opacity hover:opacity-90 whitespace-nowrap shrink-0"
            style={{
              backgroundColor: isPlaying ? PARCHMENT_PALETTE.sealRed : PARCHMENT_PALETTE.goldDark,
              color: '#FFF9EE',
              fontFamily: HEADING_FONT,
            }}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            <span>{isPlaying ? 'Pause' : 'Play Walk'}</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setIsPlaying(false);
              setCurrentPerson(0);
            }}
            className="min-h-[44px] min-w-[44px] rounded-xl border flex items-center justify-center cursor-pointer transition-colors shrink-0"
            style={{
              backgroundColor: 'rgba(255, 250, 240, 0.8)',
              borderColor: PARCHMENT_PALETTE.paperBorder,
              color: PARCHMENT_PALETTE.ink,
            }}
            aria-label="Reset walk to 0"
            title="Reset to 0"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <div
            className="flex items-center gap-1 p-1 rounded-xl border"
            style={{
              backgroundColor: 'rgba(227, 204, 165, 0.5)',
              borderColor: '#CEB282',
            }}
          >
            {[1, 2, 5].map((spd) => {
              const active = playbackSpeed === spd;
              return (
                <button
                  key={spd}
                  type="button"
                  onClick={() => setPlaybackSpeed(spd)}
                  className="min-h-[44px] min-w-[44px] px-2.5 py-1 rounded-lg text-[14px] font-bold cursor-pointer tabular-nums transition-colors"
                  style={{
                    backgroundColor: active ? PARCHMENT_PALETTE.ink : 'transparent',
                    color: active ? '#FFF9EE' : PARCHMENT_PALETTE.inkSoft,
                    fontFamily: BODY_FONT,
                  }}
                >
                  {spd}x
                </button>
              );
            })}
          </div>
        </div>

        {/* Walker Status Counter */}
        <div
          className="px-3 py-1.5 rounded-xl border flex items-center gap-2 tabular-nums"
          style={{
            backgroundColor: 'rgba(255, 250, 240, 0.78)',
            borderColor: PARCHMENT_PALETTE.paperBorder,
          }}
        >
          <span
            className="text-[15px] font-semibold"
            style={{ color: PARCHMENT_PALETTE.inkMuted, fontFamily: BODY_FONT }}
          >
            Walker:
          </span>
          <span
            className="text-[16px] font-bold"
            style={{ color: PARCHMENT_PALETTE.ink, fontFamily: HEADING_FONT }}
          >
            {currentPerson === 0 ? 'Start (0)' : `${currentPerson} / 100`}
          </span>
          <span style={{ color: PARCHMENT_PALETTE.paperBorder }} aria-hidden="true">
            ·
          </span>
          <span
            className="text-[15px] font-bold"
            style={{ color: PARCHMENT_PALETTE.goldDark, fontFamily: BODY_FONT }}
          >
            {openCount} Open
          </span>
        </div>
      </div>

      {/* Single 0-100 Scrubber Directly Above Grid */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2.5">
          <span
            className="text-[14px] font-bold tabular-nums shrink-0"
            style={{ color: PARCHMENT_PALETTE.inkSoft, fontFamily: BODY_FONT }}
          >
            0
          </span>
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
            className="flex-1 cursor-pointer h-2.5 rounded-lg"
            style={{ accentColor: PARCHMENT_PALETTE.sealRed }}
          />
          <span
            className="text-[14px] font-bold tabular-nums shrink-0"
            style={{ color: PARCHMENT_PALETTE.inkSoft, fontFamily: BODY_FONT }}
          >
            100
          </span>
        </div>

        {/* Presets (Wrapped for zero horizontal scroll on 360px phones) */}
        {!compact ? (
          <div className="flex flex-wrap items-center justify-center gap-1.5">
            {[
              { label: '0 (Reset)', val: 0 },
              { label: '1 (Open All)', val: 1 },
              { label: '2 (Evens)', val: 2 },
              { label: 'Person 3', val: 3 },
              { label: 'Person 4', val: 4 },
              { label: 'Person 10', val: 10 },
              { label: 'All 100 (Final)', val: 100 },
            ].map((preset) => {
              const isSelected = currentPerson === preset.val;
              return (
                <button
                  key={preset.val}
                  type="button"
                  onClick={() => {
                    setIsPlaying(false);
                    setCurrentPerson(preset.val);
                  }}
                  className="min-h-[44px] px-3 py-1.5 rounded-xl text-[14px] font-bold border cursor-pointer transition-colors whitespace-nowrap tabular-nums"
                  style={{
                    backgroundColor: isSelected
                      ? PARCHMENT_PALETTE.sealRed
                      : 'rgba(255, 250, 240, 0.72)',
                    borderColor: isSelected
                      ? PARCHMENT_PALETTE.sealRed
                      : PARCHMENT_PALETTE.paperBorder,
                    color: isSelected ? '#FFF9EE' : PARCHMENT_PALETTE.ink,
                    fontFamily: BODY_FONT,
                  }}
                >
                  {preset.label}
                </button>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-wrap items-center justify-center gap-1.5">
            {[
              { label: '0 (Reset)', val: 0 },
              { label: 'Person 10', val: 10 },
              { label: 'All 100 (Final)', val: 100 },
            ].map((preset) => {
              const isSelected = currentPerson === preset.val;
              return (
                <button
                  key={preset.val}
                  type="button"
                  onClick={() => {
                    setIsPlaying(false);
                    setCurrentPerson(preset.val);
                  }}
                  className="min-h-[44px] px-3 py-1.5 rounded-xl text-[14px] font-bold border cursor-pointer transition-colors whitespace-nowrap tabular-nums"
                  style={{
                    backgroundColor: isSelected
                      ? PARCHMENT_PALETTE.sealRed
                      : 'rgba(255, 250, 240, 0.72)',
                    borderColor: isSelected
                      ? PARCHMENT_PALETTE.sealRed
                      : PARCHMENT_PALETTE.paperBorder,
                    color: isSelected ? '#FFF9EE' : PARCHMENT_PALETTE.ink,
                    fontFamily: BODY_FONT,
                  }}
                >
                  {preset.label}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div
      data-no-nav="true"
      className="w-full max-w-4xl max-h-full overflow-y-auto overflow-x-hidden no-scrollbar mx-auto flex flex-col gap-3 py-1 pb-2 animate-fade-rise"
      style={{
        fontFamily: BODY_FONT,
        color: PARCHMENT_PALETTE.ink,
      }}
    >
      {/* ================================================================= */}
      {/* STEP 1: THE QUEEN'S DECREE (STORY + TAP DIALOGUE ONLY)            */}
      {/* ================================================================= */}
      {panelIndex === 0 && (
        <div
          className="w-full rounded-3xl border overflow-hidden flex flex-col md:flex-row animate-fade-rise"
          style={PARCHMENT_SURFACE}
        >
          {/* Left: Queen Court Image */}
          <div
            className="md:w-5/12 relative h-[150px] sm:h-[195px] md:h-auto md:min-h-[320px] overflow-hidden"
            style={{ backgroundColor: '#2E2014' }}
          >
            <img
              src="/assets/aistudio/Gemini_Generated_Image_j5vt77j5vt77j5vt__1__8ec11c4a.png"
              alt="Queen Ratnamanjuri reading her royal decree to Khoisnam and relatives"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center"
            />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  'linear-gradient(to top, rgba(32, 20, 11, 0.9) 0%, rgba(32, 20, 11, 0.25) 55%, transparent 100%)',
              }}
            />
            <div className="absolute bottom-2.5 left-3.5 right-3.5 text-[#FAF1DF]">
              <div
                className="text-[12px] font-bold tracking-wider"
                style={{ fontFamily: HEADING_FONT, color: '#E8C57B' }}
              >
                Palace of Ratnas
              </div>
              <p className="text-[15px] sm:text-[16px] font-semibold leading-snug">
                Queen Ratnamanjuri gathers her 100 children and relatives.
              </p>
            </div>
          </div>

          {/* Right: Tap-Induced Royal Dialogue & Single CTA */}
          <div className="md:w-7/12 p-3.5 sm:p-5 flex flex-col justify-between gap-3">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2" style={{ color: PARCHMENT_PALETTE.goldDark }}>
                <Scroll className="w-4 h-4 shrink-0" />
                <span className="text-[13px] font-bold tracking-wide" style={{ fontFamily: HEADING_FONT }}>
                  Chapter 1 · The Queen&apos;s Decree
                </span>
              </div>

              <h2
                className="text-[22px] sm:text-[26px] font-bold leading-tight"
                style={{ fontFamily: HEADING_FONT, color: PARCHMENT_PALETTE.ink }}
              >
                The Royal Puzzle of 100 Lockers
              </h2>

              {renderDialogueCard(
                STEP1_DIALOGUE,
                decreeTurn,
                () => setDecreeTurn((t) => Math.min(STEP1_DIALOGUE.length, t + 1)),
                () => setDecreeTurn(STEP1_DIALOGUE.length)
              )}
            </div>

            <div className="flex items-center justify-end pt-1">
              <button
                type="button"
                onClick={() => {
                  setPanelIndex(1);
                  onAdvanceStep?.();
                }}
                className="min-h-[44px] w-full sm:w-auto px-5 py-2.5 rounded-xl text-[15px] font-bold flex items-center justify-center gap-2 cursor-pointer transition-opacity hover:opacity-90"
                style={{
                  backgroundColor: PARCHMENT_PALETTE.goldDark,
                  color: '#FFF9EE',
                  fontFamily: HEADING_FONT,
                }}
              >
                <span>Continue to the Vault</span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================================================================= */}
      {/* STEP 2: THE SECRET VAULT (STORY + TAP DIALOGUE ONLY, NO QUIZ)     */}
      {/* ================================================================= */}
      {panelIndex === 1 && (
        <div
          className="w-full rounded-3xl border overflow-hidden flex flex-col md:flex-row animate-fade-rise"
          style={PARCHMENT_SURFACE}
        >
          {/* Left: Secret Vault Image */}
          <div
            className="md:w-5/12 relative h-[150px] sm:h-[195px] md:h-auto md:min-h-[320px] overflow-hidden"
            style={{ backgroundColor: '#2B2118' }}
          >
            <img
              src="/assets/aistudio/Gemini_Generated_Image_j5vt77j5vt77j5vt_bba255c4.png"
              alt="Advisor and Prince Khoisnam inside the Secret Stone Vault with 100 closed wooden lockers"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center"
            />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  'linear-gradient(to top, rgba(32, 20, 11, 0.9) 0%, rgba(32, 20, 11, 0.25) 55%, transparent 100%)',
              }}
            />
            <div className="absolute bottom-2.5 left-3.5 right-3.5 text-[#FAF1DF]">
              <div
                className="text-[12px] font-bold tracking-wider"
                style={{ fontFamily: HEADING_FONT, color: '#E8C57B' }}
              >
                The Secret Stone Vault
              </div>
              <p className="text-[15px] sm:text-[16px] font-semibold leading-snug">
                100 closed wooden lockers line the ancient chamber walls.
              </p>
            </div>
          </div>

          {/* Right: Tap-Induced Rule Dialogue & Single CTA */}
          <div className="md:w-7/12 p-3.5 sm:p-5 flex flex-col justify-between gap-3">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2" style={{ color: PARCHMENT_PALETTE.sealRed }}>
                <Lock className="w-4 h-4 shrink-0" />
                <span className="text-[13px] font-bold tracking-wide" style={{ fontFamily: HEADING_FONT }}>
                  Chapter 2 · The Secret Vault
                </span>
              </div>

              <h2
                className="text-[22px] sm:text-[26px] font-bold leading-tight"
                style={{ fontFamily: HEADING_FONT, color: PARCHMENT_PALETTE.ink }}
              >
                How the 100 Doors Flip
              </h2>

              {renderDialogueCard(
                STEP2_DIALOGUE,
                vaultTurn,
                () => setVaultTurn((t) => Math.min(STEP2_DIALOGUE.length, t + 1)),
                () => setVaultTurn(STEP2_DIALOGUE.length)
              )}
            </div>

            <div className="flex items-center justify-end pt-1">
              <button
                type="button"
                onClick={() => {
                  setCurrentPerson(0);
                  setIsPlaying(false);
                  setStep3Page('walk');
                  setPanelIndex(2);
                  onAdvanceStep?.();
                }}
                className="min-h-[44px] w-full sm:w-auto px-5 py-2.5 rounded-xl text-[15px] font-bold flex items-center justify-center gap-2 cursor-pointer transition-opacity hover:opacity-90"
                style={{
                  backgroundColor: PARCHMENT_PALETTE.sealRed,
                  color: '#FFF9EE',
                  fontFamily: HEADING_FONT,
                }}
              >
                <span>Watch the Royal Walk</span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================================================================= */}
      {/* STEP 3: THE ROYAL WALK (TWO SEPARATE PAGES TO AVOID CLUTTER)      */}
      {/* ================================================================= */}
      {panelIndex === 2 && (
        <div className="w-full flex flex-col gap-3 animate-fade-rise">
          {/* Page Switcher Header */}
          <div
            className="w-full rounded-2xl border p-2 flex flex-wrap items-center justify-between gap-2"
            style={PARCHMENT_SURFACE}
          >
            <div className="flex items-center gap-1.5 flex-wrap">
              <button
                type="button"
                onClick={() => setStep3Page('walk')}
                className="min-h-[44px] px-3.5 py-2 rounded-xl text-[14px] font-bold cursor-pointer transition-colors"
                style={{
                  backgroundColor:
                    step3Page === 'walk' ? PARCHMENT_PALETTE.ink : 'rgba(255, 250, 240, 0.7)',
                  color: step3Page === 'walk' ? '#FFF9EE' : PARCHMENT_PALETTE.ink,
                  fontFamily: HEADING_FONT,
                }}
              >
                1. Try the Walk
              </button>

              <button
                type="button"
                onClick={() => setStep3Page('solution')}
                className="min-h-[44px] px-3.5 py-2 rounded-xl text-[14px] font-bold cursor-pointer transition-colors"
                style={{
                  backgroundColor:
                    step3Page === 'solution' ? PARCHMENT_PALETTE.goldDark : 'rgba(255, 250, 240, 0.7)',
                  color: step3Page === 'solution' ? '#FFF9EE' : PARCHMENT_PALETTE.ink,
                  fontFamily: HEADING_FONT,
                }}
              >
                2. The Solution
              </button>
            </div>

            <span
              className="text-[14px] font-semibold px-2 tabular-nums"
              style={{ color: PARCHMENT_PALETTE.inkMuted, fontFamily: BODY_FONT }}
            >
              {step3Page === 'walk' ? 'Page 1 of 2 · Explore' : 'Page 2 of 2 · Solution'}
            </span>
          </div>

          {/* --------------------------------------------------------------- */}
          {/* PAGE 1: TRY THE WALK (SANDBOX GRID + CONTROLS + INSPECTOR)      */}
          {/* --------------------------------------------------------------- */}
          {step3Page === 'walk' && (
            <div
              className="w-full rounded-3xl border p-3.5 sm:p-5 flex flex-col gap-3.5 animate-fade-rise"
              style={PARCHMENT_SURFACE}
            >
              {renderWalkControls(false)}

              {renderWoodenLockerGrid(false)}

              {/* Inspector Panel */}
              <div
                className="p-3.5 sm:p-4 rounded-2xl border flex flex-col gap-1.5"
                style={{
                  background: inspectedIsSquare
                    ? 'rgba(184, 134, 43, 0.14)'
                    : 'rgba(255, 250, 240, 0.7)',
                  borderColor: inspectedIsSquare ? PARCHMENT_PALETTE.gold : '#CEB282',
                }}
              >
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span
                      className="text-[18px] font-bold tabular-nums"
                      style={{ fontFamily: HEADING_FONT, color: PARCHMENT_PALETTE.ink }}
                    >
                      Locker #{inspectedLocker}
                    </span>
                    {inspectedIsSquare && (
                      <span
                        className="text-[15px] font-bold tabular-nums"
                        style={{ color: PARCHMENT_PALETTE.goldDark }}
                      >
                        · Square ({inspectedRoot} × {inspectedRoot})
                      </span>
                    )}
                  </div>

                  <span
                    className="text-[15px] font-bold"
                    style={{
                      fontFamily: HEADING_FONT,
                      color: inspectedEndsOpen ? PARCHMENT_PALETTE.goldDark : PARCHMENT_PALETTE.sealRed,
                    }}
                  >
                    {inspectedEndsOpen ? 'Ends Open' : 'Ends Closed'}
                  </span>
                </div>

                <p className="text-[16px] leading-snug" style={{ color: PARCHMENT_PALETTE.ink }}>
                  Flipped by <strong className="tabular-nums">{inspectedFlipCount}</strong>{' '}
                  {inspectedFlipCount === 1 ? 'person' : 'people'} (factors):{' '}
                  <span className="font-bold tabular-nums" style={{ color: PARCHMENT_PALETTE.sealRed }}>
                    {inspectedDivisors.join(', ')}
                  </span>
                </p>

                <p className="text-[16px] leading-snug" style={{ color: PARCHMENT_PALETTE.inkSoft }}>
                  {inspectedEndsOpen
                    ? `Because ${inspectedLocker} is a square (${inspectedRoot} × ${inspectedRoot}), it has an odd count of factors (${inspectedFlipCount} flips) and stays open.`
                    : `Because ${inspectedLocker} is not a square, its factors come in pairs (${inspectedFlipCount} flips), so it ends closed.`}
                </p>
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setStep3Page('solution')}
                  className="min-h-[44px] px-4 py-2 rounded-xl text-[15px] font-bold flex items-center gap-2 cursor-pointer transition-opacity hover:opacity-90"
                  style={{
                    backgroundColor: PARCHMENT_PALETTE.goldDark,
                    color: '#FFF9EE',
                    fontFamily: HEADING_FONT,
                  }}
                >
                  <span>Next: See the Solution</span>
                  <ArrowRight className="w-4 h-4 shrink-0" />
                </button>
              </div>
            </div>
          )}

          {/* --------------------------------------------------------------- */}
          {/* PAGE 2: THE SOLUTION (PROOF STEPS + SYNCED ROYAL WALK)          */}
          {/* --------------------------------------------------------------- */}
          {step3Page === 'solution' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 animate-fade-rise">
              {/* Left: Treasure Image + 3-Step Reveal Solution */}
              <div
                className="lg:col-span-6 rounded-3xl border overflow-hidden flex flex-col justify-between"
                style={PARCHMENT_SURFACE}
              >
                <div
                  className="relative h-[120px] sm:h-[155px] overflow-hidden shrink-0"
                  style={{ backgroundColor: '#2E2014' }}
                >
                  <img
                    src="/assets/aistudio/Gemini_Generated_Image_j5vt77j5vt77j5vt__2__ad378f1a.png"
                    alt="Prince Khoisnam reveals the 10 open lockers filled with royal ratnas"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center"
                  />
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        'linear-gradient(to top, rgba(32, 20, 11, 0.9) 0%, rgba(32, 20, 11, 0.2) 60%, transparent 100%)',
                    }}
                  />
                  <div className="absolute bottom-2.5 left-4 right-4 text-[#FAF1DF]">
                    <div
                      className="text-[12px] font-bold tracking-wider"
                      style={{ fontFamily: HEADING_FONT, color: '#E8C57B' }}
                    >
                      The Treasure Revealed
                    </div>
                    <p className="text-[16px] font-semibold leading-snug">
                      Exactly 10 lockers open to reveal the royal ratnas.
                    </p>
                  </div>
                </div>

                <div
                  role={solutionStep < 3 ? 'button' : undefined}
                  tabIndex={solutionStep < 3 ? 0 : undefined}
                  onClick={() => {
                    if (solutionStep >= 3) return;
                    const sel = window.getSelection()?.toString();
                    if (sel && sel.length > 0) return;
                    setSolutionStep((s) => Math.min(3, s + 1));
                  }}
                  onKeyDown={(e) => {
                    if (solutionStep < 3 && (e.key === 'Enter' || e.key === ' ')) {
                      e.preventDefault();
                      setSolutionStep((s) => Math.min(3, s + 1));
                    }
                  }}
                  className={`p-4 flex-1 flex flex-col justify-between gap-3 ${
                    solutionStep < 3 ? 'cursor-pointer' : ''
                  }`}
                >
                  <div className="flex flex-col gap-2.5">
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <span
                        className="text-[14px] font-bold tabular-nums"
                        style={{ color: PARCHMENT_PALETTE.goldDark, fontFamily: BODY_FONT }}
                      >
                        Proof · Step {solutionStep} of 3
                      </span>
                      {solutionStep < 3 && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSolutionStep(3);
                          }}
                          className="min-h-[44px] px-3 py-1.5 rounded-lg text-[14px] font-bold underline underline-offset-2 cursor-pointer"
                          style={{ color: PARCHMENT_PALETTE.sealRed }}
                        >
                          Show all steps
                        </button>
                      )}
                    </div>

                    <h3
                      className="text-[20px] sm:text-[22px] font-bold leading-snug"
                      style={{ fontFamily: HEADING_FONT, color: PARCHMENT_PALETTE.ink }}
                    >
                      Why Do Exactly 10 Lockers Stay Open?
                    </h3>

                    {/* Step 1 */}
                    <div
                      className="p-3 rounded-xl border text-[16px] leading-snug animate-fade-rise"
                      style={INSET_PARCHMENT}
                    >
                      <span
                        className="font-bold mr-1.5 tabular-nums"
                        style={{ fontFamily: HEADING_FONT, color: PARCHMENT_PALETTE.sealRed }}
                      >
                        1.
                      </span>
                      Most numbers have their factors in pairs, e.g.{' '}
                      <strong className="tabular-nums">12 = 1×12, 2×6, 3×4</strong>, so they are flipped
                      an even number of times and end closed.
                    </div>

                    {/* Step 2 */}
                    {solutionStep >= 2 && (
                      <div
                        className="p-3 rounded-xl border text-[16px] leading-snug animate-fade-rise"
                        style={{
                          background: 'rgba(184, 134, 43, 0.14)',
                          borderColor: PARCHMENT_PALETTE.gold,
                        }}
                      >
                        <span
                          className="font-bold mr-1.5 tabular-nums"
                          style={{ fontFamily: HEADING_FONT, color: PARCHMENT_PALETTE.goldDark }}
                        >
                          2.
                        </span>
                        A square number has one factor that pairs with itself, e.g.{' '}
                        <strong className="tabular-nums">6×6 = 36</strong>, so it has an odd number of
                        factors and stays open.
                      </div>
                    )}

                    {/* Step 3 */}
                    {solutionStep >= 3 && (
                      <div
                        className="p-3 rounded-xl border text-[16px] leading-snug animate-fade-rise"
                        style={{
                          background: 'rgba(184, 134, 43, 0.22)',
                          borderColor: PARCHMENT_PALETTE.goldDark,
                        }}
                      >
                        <span
                          className="font-bold mr-1.5 tabular-nums"
                          style={{ fontFamily: HEADING_FONT, color: PARCHMENT_PALETTE.ink }}
                        >
                          3.
                        </span>
                        The open lockers are{' '}
                        <strong className="tabular-nums">
                          1, 4, 9, 16, 25, 36, 49, 64, 81, 100
                        </strong>
                        : exactly 10 lockers.
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
                      className="min-h-[44px] w-full px-4 py-2 rounded-xl border border-dashed text-[15px] font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                      style={{
                        borderColor: PARCHMENT_PALETTE.sealRed,
                        backgroundColor: 'rgba(139, 46, 31, 0.08)',
                        color: PARCHMENT_PALETTE.sealRed,
                        fontFamily: HEADING_FONT,
                      }}
                    >
                      <span>Tap to reveal Step {solutionStep + 1} of 3</span>
                      <ChevronRight className="w-4 h-4 shrink-0" />
                    </button>
                  )}
                </div>
              </div>

              {/* Right: Synchronized Royal Walk Animation */}
              <div
                className="lg:col-span-6 rounded-3xl border p-3.5 sm:p-4 flex flex-col justify-between gap-3"
                style={PARCHMENT_SURFACE}
              >
                {renderWalkControls(true)}

                {renderWoodenLockerGrid(true)}

                <div
                  className="p-3 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                  style={INSET_PARCHMENT}
                >
                  <div className="text-[16px] leading-snug">
                    <strong className="tabular-nums">Locker #{inspectedLocker}</strong> ·{' '}
                    <span className="tabular-nums">{inspectedFlipCount} flips</span> (
                    <span className="font-semibold tabular-nums">
                      {inspectedDivisors.join(', ')}
                    </span>
                    ) →{' '}
                    <strong
                      style={{
                        color: inspectedEndsOpen
                          ? PARCHMENT_PALETTE.goldDark
                          : PARCHMENT_PALETTE.sealRed,
                      }}
                    >
                      {inspectedEndsOpen ? 'Stays Open' : 'Ends Closed'}
                    </strong>
                  </div>

                  <button
                    type="button"
                    onClick={() => setStep3Page('walk')}
                    className="min-h-[44px] px-3.5 py-2 rounded-xl border text-[14px] font-bold flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
                    style={{
                      borderColor: PARCHMENT_PALETTE.paperBorder,
                      backgroundColor: 'rgba(255, 250, 240, 0.85)',
                      color: PARCHMENT_PALETTE.ink,
                      fontFamily: HEADING_FONT,
                    }}
                  >
                    <ArrowLeft className="w-4 h-4 shrink-0" />
                    <span>Back to Walk</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

